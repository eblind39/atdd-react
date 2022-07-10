import React from 'react'
import {screen, render, fireEvent, waitFor} from '@testing-library/react'
import configureMockStore, {MockStoreEnhanced} from 'redux-mock-store'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {HTTPStatusCodes} from '../../types/HttpCodes'

import Form from './Form'

const server = setupServer(
    rest.post('/productsMSW', (req, res, ctx) => {
        const name = req.params['name']
        const size = req.params['size']
        const type = req.params['type']
        if (name && size && type) {
            return res(ctx.status(HTTPStatusCodes.RESOURCE_CREATED))
        }

        return res(ctx.status(HTTPStatusCodes.RESOURCE_CREATED))
    }),
)

// Enable API mocking before tests.
beforeAll(() => server.listen({onUnhandledRequest: 'bypass'}))

beforeEach(() => {})

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => server.close())

describe('products form', () => {
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

    it('mounted > There must be a create product form page', () => {
        render(setup())
        expect(screen.queryByText(/create product/i)).toBeInTheDocument()

        // expect(
        //     screen.getByRole('heading', {name: /create product/i}),
        // ).toBeInTheDocument()
    })
    it('mounted > Should exists the fields: name, size, type (electronic,furniture, clothing)', () => {
        const {container} = render(setup())
        expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/size/i)).toBeInTheDocument()
        const typeLabel = container.querySelector('#type-label')
        expect(typeLabel?.innerHTML).toMatch(/type/i)

        expect(screen.queryByText(/electronic/i)).toBeInTheDocument()
        expect(screen.queryByText(/furniture/i)).toBeInTheDocument()
        expect(screen.queryByText(/clothing/i)).toBeInTheDocument()
    })
    it('mounted > should exists the submit button', () => {
        const {container} = render(setup())
        const btns = container.getElementsByTagName('button')
        expect(btns).toHaveLength(1)
        expect(btns[0].innerHTML).toMatch(/submit/i)
    })
    it('onblur > display a validation error message for input name', () => {
        render(setup())

        expect(
            screen.queryByText(/the name is required/i),
        ).not.toBeInTheDocument()

        fireEvent.blur(screen.getByLabelText(/name/i), {
            target: {name: 'name', value: ''},
        })

        expect(screen.queryByText(/the name is required/i)).toBeInTheDocument()
    })
    it('onblur > display a validation error message for input size', () => {
        render(setup())

        expect(
            screen.queryByText(/the size is required/i),
        ).not.toBeInTheDocument()

        fireEvent.blur(screen.getByLabelText(/size/i), {
            target: {name: 'size', value: ''},
        })

        expect(screen.queryByText(/the size is required/i)).toBeInTheDocument()
    })
    // it('onblur > display a validation error message for select type', () => {
    //     const {container} = render(setup())

    //     expect(
    //         screen.queryByText(/the type is required/i),
    //     ).not.toBeInTheDocument()

    //     const selectType = container.getElementsByTagName('select')[0]
    //     if (selectType)
    //         fireEvent.blur(selectType, {target: {name: 'type', value: ''}})

    //     expect(screen.queryByText(/the type is required/i)).toBeInTheDocument()
    // })
    it('submit > should display validations messages', async () => {
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

        await waitFor(() => {
            expect(submitBtn).not.toBeDisabled()
        })
    })
    it('submit > button must be disabled until request is completed.', async () => {
        const {container} = render(setup())
        const submitBtn = container.getElementsByTagName('button')[0]

        expect(submitBtn).not.toBeDisabled()
        fireEvent.click(submitBtn)
        expect(submitBtn).toBeDisabled()

        await waitFor(() => {
            expect(submitBtn).not.toBeDisabled()
        })
    })
    it('after submit > on data saved display Product stored', async () => {
        const {container} = render(setup())
        const submitBtn = container.getElementsByTagName('button')[0]
        fireEvent.click(submitBtn)
        await waitFor(() => {
            expect(screen.getByText(/product stored/i)).toBeInTheDocument()
        })
    })
})
