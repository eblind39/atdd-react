import * as actions from './actions';
import * as ActionTypes from './actionTypes';
import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Book } from '../../types/books';
import store from '../store/store';

const middlewares = [thunk, logger];
const mockStore = configureMockStore(middlewares);

describe('BookListContainer related actions', () => {
    it('sets the search keyword', () => {
        const term: string = '';
        const expected = {
            type: ActionTypes.SET_SEARCH_TERM,
            term
        }

        const action = actions.setSearchTerm(term);
        expect(action).toEqual(expected);
    });
    it('fetches data succesfully', () => {
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

        axios.get = jest.fn().mockImplementation(() => {
                        Promise.resolve({ data: books })
                    });
        
        const expectedActions = [
            { type: ActionTypes.FETCH_BOOKS_PENDING },
            { type: ActionTypes.FETCH_BOOKS_SUCCESS, books }
        ];

        const store = mockStore({ books: [] });

        return store.dispatch(actions.fetchBooks() as any).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
    it('fetch data with error', () => {
        axios.get = jest.fn().mockImplementation(() => {
                        Promise.reject({ message: 'Something went wrong' })
                    });
        
        const expectedActions = [
            { type: ActionTypes.FETCH_BOOKS_PENDING },
            { type: ActionTypes.FETCH_BOOKS_FAILED, err: 'Something went wrong' }
        ];

        const store = mockStore({ books: [] });

        return store.dispatch(actions.fetchBooks() as any).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
    it('search data with term', () => {
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

        axios.get = jest.fn().mockImplementation(() => {
                        Promise.resolve({ data: books })
                    });

        store.dispatch(actions.setSearchTerm('Refactoring'));

        return store.dispatch(actions.fetchBooks() as any).then(() => {
            const state = store.getState();
            expect(state.term).toEqual('Refactoring');
            expect(axios.get).toHaveBeenCalledWith(`http://localhost:3007/books?q=Refactoring`)
        });
    });
});