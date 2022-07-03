import axios from 'axios'
import _ from 'lodash'
import {Book} from '../../../src/types/books'
/// <reference types="cypress" />

const deleteBooks = () => {
    let books: Book[]
    const fetchBooks = async () => {
        const resp = await fetch('http://localhost:3007/books')
        books = await resp.json()
    }

    fetchBooks() // truncate books collection
        .then(() => {
            books.forEach(book => {
                fetch(`http://localhost:3007/books/${book.id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
            })
        })
}

const createBooks = () => {
    const books: Book[] = [
        {
            id: 1,
            name: 'Refactoring',
            image: 'image-url',
            description: 'description',
        },
        {
            id: 2,
            name: 'Domain-driven design',
            image: 'image-url',
            description: 'description',
        },
        {
            id: 3,
            name: 'Javascript - The Good Parts',
            image: 'image-url',
            description: 'description',
        },
    ]

    books.forEach(book => {
        // fetch(`http://localhost:3007/books`, {
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json; charset=UTF-8;'
        //     },
        //     body: JSON.stringify(book),
        // });
        axios.post('http://localhost:3007/books', book, {
            headers: {'Content-Type': 'application/json'},
        })
    })
}

const gotoApp = () => {
    cy.visit('http://localhost:3000/books')
}

const checkAppTitle = () => {
    cy.get('h2[data-test="heading"]').contains('Bookish')
}

const checkBookListWith = (expectation: string[]) => {
    cy.get('div[data-test="book-list"]').should('exist')
    // cy.get('div.book-item').should('have.length', 2);
    cy.get('div.book-title').should(books => {
        expect(books).to.have.length(3)
        const titles = [...books].map(x => x.innerHTML)
        expect(titles).to.deep.equal(expectation)
    })
}

before(() => {
    // deleteBooks();
})

/* Visiting the app before each test. */
beforeEach(() => {
    // createBooks();
    gotoApp()
})

afterEach(() => {
    // deleteBooks();
})

describe('Bookish App', () => {
    it('Visits the bookish', () => {
        checkAppTitle()
    })
    it('Shows a book list', () => {
        checkBookListWith([
            'Refactoring',
            'Domain-driven design',
            'Javascript - The Good Parts',
        ])
    })
    it('Goes to the detail page', () => {
        cy.get('div.book-item').contains('View Details').eq(0).click()
        cy.url().should('include', '/books/1')
        cy.get('h2.book-title').contains('Book Detail 1')
    })
    it('Searches for a title', () => {
        cy.get('div.book-item').should('have.length', 3)
        cy.get('[data-test="search"] input').type('Refactoring')
        cy.get('div.book-item').should('have.length', 1)
        cy.get('div.book-item').eq(0).contains('Refactoring')
    })
})
