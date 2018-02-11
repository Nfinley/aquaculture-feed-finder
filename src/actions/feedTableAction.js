import reduxContants from '../reduxContants';
import axios from 'axios';

export function feedDataSuccess(data){
    return {
        type: reduxContants.FETCH_FEED_DATA,
        data
    }
}


//THUNKS
export function fetchFeeds(fishType, fishLifeStage, location){
    return function (dispatch){
        return axios.get('../dummyData.json')
            .then(data => {
                console.log(data)
                return dispatch(feedDataSuccess(data))
            })
    }
}

