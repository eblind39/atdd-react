import axios from "axios";

import { Book } from '../../types/books';
import * as actionTypes from '../actions/actionTypes';
import * as actions from '../actions/actions';
import store from './store';

describe('store', () => {
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

    it('fetch books from remote', () => {
        axios.get = jest.fn().mockImplementation(() => Promise.resolve({ data: books }));

        return store.dispatch(actions.fetchBooks() as any).then(() => {
            const state = store.getState();
            expect(state.books.length).toEqual(1);
            expect(state.books).toEqual(books);
        });
    });
});