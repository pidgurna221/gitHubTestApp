import axios from 'axios';

export function getList(params) {
    const { limit, offset } = params;
    return dispatch => new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: `https://api.github.com/users?since=${offset}&per_page=${limit}`
        })
            .then(resp => {
                if (!offset) {
                    dispatch(setList(resp.data));
                } else {
                    dispatch(updateList(resp.data));
                }
                resolve(resp);
            }).catch(error => {
                reject(error);
            });
    });
}

export function getFollowersList(endPoint) {
    return dispatch => new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: endPoint
        })
            .then(resp => {
                dispatch(setFollowersList(resp.data));
                resolve(resp);
            }).catch(error => {
                reject(error);
            });
    });
}

export function setList(data) {
    return { type: 'SET_LIST', payload: data };
}

export function updateList(data) {
    return { type: 'UPDATE_LIST', payload: data };
}

export function setFollowersList(data) {
    return { type: 'SET_FOLLOWERS_LIST', payload: data };
}







