import reducer from './reducer';
import * as actionTypes from '../actions/actionTypes';
import { Book } from '../../types/books';
import { ActionType, BooksState } from '../types/reduxcustom';

describe('reducer', () => {
    it('show loading when request is sent', () => {
        const initState: BooksState = { loading: false, books: [], term: '' };
        const action: ActionType = { type: actionTypes.FETCH_BOOKS_PENDING, books: [] };
        const state: BooksState = reducer(initState, action);
        expect(state.loading).toBeTruthy();
    });
    it('add books to state when request successful', () => {
        const books: Book[] = [
            { 
                id: 1, 
                name: 'Refactoring', 
                image: "https://images-na.ssl-images-amazon.com/images/I/41odjJlPgHL._SY445_SX342_QL70_ML2_.jpg",
                description: "For more than twenty years, experienced programmers worldwide have relied on Martin Fowler’s Refactoring to improve the design of existing code and to enhance software maintainability, as well as to make existing code easier to understand."
            },
            { 
                id: 2, 
                name: 'Domain-driven design', 
                "image": "https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9780/3218/9780321834577.jpg",
                "description": "For software developers of all experience levels looking to improve their results, and design and implement domain-driven enterprise applications consistently with the best current state of professional practice"
            },
        ];

        const action: ActionType = {
            type: actionTypes.FETCH_BOOKS_SUCCESS,
            books
        };

        const state: BooksState = reducer({ loading: false, books, term: '' }, action);
        expect(state.books).toBe(books);
    });
});