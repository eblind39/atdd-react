import React from 'react'
import {screen, render, fireEvent} from '@testing-library/react'
import configureMockStore, {MockStoreEnhanced} from 'redux-mock-store'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'

import Form from './Form'

beforeEach(() => {})

describe('when the form is mounted', () => {
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
                    <Form />
                </BrowserRouter>
            </Provider>
        )
    }

    it('There must be a create product form page', () => {
        render(setup())
        expect(screen.queryByText(/create product/i)).toBeInTheDocument()

        // expect(
        //     screen.getByRole('heading', {name: /create product/i}),
        // ).toBeInTheDocument()
    })
    it('Should exists the fields: name, size, type (electronic,furniture, clothing)', () => {
        const {container} = render(setup())
        expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/size/i)).toBeInTheDocument()
        const typeLabel = container.querySelector('#type-label')
        expect(typeLabel?.innerHTML).toMatch(/type/i)

        expect(screen.queryByText(/electronic/i)).toBeInTheDocument()
        expect(screen.queryByText(/furniture/i)).toBeInTheDocument()
        expect(screen.queryByText(/clothing/i)).toBeInTheDocument()
    })
    it('should exists the submit button', () => {
        const {container} = render(setup())
        const btns = container.getElementsByTagName('button')
        expect(btns).toHaveLength(1)
        expect(btns[0].innerHTML).toMatch(/submit/i)
    })
    it('submit > should display validations messages', () => {
        const {container} = render(setup())

        expect(
            screen.queryByText(/the name is required/i),
        ).not.toBeInTheDocument()
        expect(
            screen.queryByText(/the size is required/i),
        ).not.toBeInTheDocument()
        expect(
            screen.queryByText(/the type is required/i),
        ).not.toBeInTheDocument()

        const submitBtn = container.getElementsByTagName('button')[0]
        fireEvent.click(submitBtn)

        expect(screen.queryByText(/the name is required/i)).toBeInTheDocument()
        expect(screen.queryByText(/the size is required/i)).toBeInTheDocument()
        expect(screen.queryByText(/the type is required/i)).toBeInTheDocument()
    })
})
