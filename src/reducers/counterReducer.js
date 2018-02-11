import reduxContants from '../reduxContants';

const initialState = {
    count: 0,
    isIncrementing: false,
    isDecrementing: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case reduxContants.INCREMENT_REQUESTED:
            return {
                ...state,
                isIncrementing: true
            }

        case reduxContants.INCREMENT:
            return {
                ...state,
                count: state.count + 1,
                isIncrementing: !state.isIncrementing
            }

        case reduxContants.DECREMENT_REQUESTED:
            return {
                ...state,
                isDecrementing: true
            }

        case reduxContants.DECREMENT:
            return {
                ...state,
                count: state.count - 1,
                isDecrementing: !state.isDecrementing
            }

        default:
            return state
    }
}
