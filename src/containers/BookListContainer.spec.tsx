import React from 'react'
import {render, screen} from '@testing-library/react'
import configureMockStore, {MockStoreEnhanced} from 'redux-mock-store'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import BookListContainer from './BookListContainer'

describe('<BookListContainer />', () => {
    const books = [
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
    ]
    const loading = 'succeeded'
    const error = ''

    let store: MockStoreEnhanced<unknown, {}>

    function setup(): JSX.Element {
        const middlewares = [thunk]
        store = configureMockStore(middlewares)({books, loading, error})
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <BookListContainer />
                </BrowserRouter>
            </Provider>
        )
    }

    afterEach(() => {
        store.clearActions()
    })

    it('should contain book-item', () => {
        const {container} = render(setup())

        screen.debug()

        const titles = [...container.querySelectorAll('h5')].map(
            title => title.innerText,
        )

        expect(titles).toEqual(['Refactoring', 'Domain-driven design'])
        expect(titles.length).toBe(2)
    })
})
