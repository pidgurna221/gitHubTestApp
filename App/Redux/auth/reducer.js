const initialState = {
    list: null,
    followersList: null
};

const auth = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_LIST': {
            return {
                ...state,
                list: action.payload,
            };
        }
        case 'UPDATE_LIST': {
            return {
                ...state,
                list: state.list.concat(action.payload)
            };
        }
        case 'SET_FOLLOWERS_LIST': {
            return {
                ...state,
                followersList: action.payload,
            };
        }
        default:
            return state;
    }
};

export default auth;
