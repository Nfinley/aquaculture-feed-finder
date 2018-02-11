import reduxContants from '../reduxContants';

export function feedDataSuccess(data) {
    return {
        type: reduxContants.FETCH_FEED_DATA_SUCCESS,
        data
    }
}

//THUNKS
function processFeedData(responseData) {
    const feedData = responseData.data;
    let dataArray = [];
    feedData.map(field => {
        const speciesName = field.supported_species.toString().replace(/;/g, ', ')

        // Generates the sus rating based on certs and composition
        // let hasFishMeal = false;
        // field.composition !== null && field.composition.map(text => {
        //     if (text.includes('fish meal' || 'fish oil')) {
        //         hasFishMeal = true;
        //         return;
        //     } else {
        //         hasFishMeal = 'No Fish Meal'
        //     }
        // });
        // let noCert = field.certifications !== '' || field.certifications !== null ? true : false;
        // field.certifications !== null && field.certifications.map(cert => {
        //     if(cert !== '' || cert !== null){
        //         noCert = true;
        //         return;
        //     }
        // });
        // let susRating;
        // if(!hasFishMeal && noCert){
        //     susRating = 'Unkown';
        // } else if (hasFishMeal && !noCert){
        //     susRating = 1;
        // } else if (hasFishMeal && noCert){
        //     susRating = 2;
        // } else if(hasFishMeal === 'No Fish Meal'){
        //     susRating = 3;
        // }

        let newRow = {
            feed_name: field.feed_name,
            supplier: field.supplier,
            supported_species: speciesName || 'Contact Supplier',
            lifestage: field.fish_lifestage || 'Contact Supplier',
            cost: field.cost_per_kg || 'Contact Supplier',
            sustainability_rating: field.sustainability_rating || 'Unknown',
            certifications: field.certifications,
            location: field.supplier_location,
            protein_percentage: field.protein_percentage,
            supplier_contact: field.supplier_contact || 'N/A',
        }
        dataArray.push(newRow);
    })
    return dataArray;
}


export function fetchFeeds(fishType, fishLifeStage, location) {
    return function (dispatch) {
        return fetch(`https://otjwhle2zi.execute-api.us-west-2.amazonaws.com/prod/feeds2?species=${fishType}&location=${location}&lifestage=${fishLifeStage}`, {
            method: 'GET',
            headers: new Headers({
                'Access-Control-Request-Method': 'GET',
                'Access-Control-Request-Headers': 'Accept',
                'Content-Type': 'application/json',
                'Origin': 'origin',
                'X-Api-Key': 'wnehdjr2Cu3sNx2GlkOGJ1IDY9CaU6sB7GNTwEGK'
            }),
            cache: 'no-cache'
        })
            .then(responseCallback.bind(this, dispatch))
            .then((response) => {
                console.log("Response", response);
                dispatch(feedDataSuccess(processFeedData(response)))
            })
            .catch(function (error) {
                console.error(error);
            });
    }
}


export function responseCallback(dispatch, response) {
    if (response.status >= 200 && response.status < 300) {
        return response.json();
    } else {
        return response.json().then(err => {
            throw err;
        });
    }
}