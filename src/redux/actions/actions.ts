import * as ActionTypes from './actionTypes';
import axios from 'axios';
import { API_URL } from '../../app/config';

const setSearchTerm = (term: string) => {
    return {
        type: ActionTypes.SET_SEARCH_TERM,
        term
    }
}

const fetchBooks = () => {
    return (dispatch: any, getState: any) => {
        const state = getState();
        dispatch({ type: ActionTypes.FETCH_BOOKS_PENDING });
        return axios.get(`${API_URL}/books?q=${state.term || ''}`)
            .then((res) => {dispatch({ type: ActionTypes.FETCH_BOOKS_SUCCESS, books: res.data })
            .catch((err: any) => dispatch({ type: ActionTypes.FETCH_BOOKS_FAILED, err: err.message }))
        });
    }
}

export { setSearchTerm, fetchBooks };