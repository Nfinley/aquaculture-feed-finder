import reduxContants from '../reduxContants';
import axios from 'axios';
// import fetch from 'whatwg-fetch';

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
        console.log(field);
        let newRow = {
            feed_name: field.feed_name,
            supplier: field.supplier,
            supported_species: field.supported_species[0] || 'Contact Supplier',
            lifestage: field.fish_lifestage || 'Contact Supplier',
            cost: field.cost_per_kg || 'Contact Supplier',
            sustainability_rating: field.sustainability_rating || Math.floor(Math.random() * Math.floor(6)),
            certifications: field.certifications,
            location: field.supplier_location,
            protein_percentage: field.protein_percentage,
            supplier_link: field.supplier_link || 'N/A',
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
            .then((response) => dispatch(feedDataSuccess(processFeedData(response))))
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