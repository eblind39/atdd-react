import * as actionTypes from '../actions/actionTypes';
import { ActionType, BooksState } from '../types/reduxcustom';

const reducer = (state: BooksState, actionType: ActionType) => {
    switch(actionType.type) {
        case actionTypes.FETCH_BOOKS_PENDING:
            return { ...state, loading: true };
        case actionTypes.FETCH_BOOKS_SUCCESS:
            return { ...state, books: actionType.books }
        default:
            return state;
    }
}

export default reducer;