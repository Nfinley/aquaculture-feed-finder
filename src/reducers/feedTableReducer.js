import reduxContants from '../reduxContants';

export default function feedDataReducer(state = [], action) {
    switch(action.type) {
        case reduxContants.FETCH_FEED_DATA_SUCCESS:
            return action.data;
        default:
            return state;
    }
}