import React from 'react'
import {screen, render, fireEvent, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import configureMockStore, {MockStoreEnhanced} from 'redux-mock-store'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import {ResponseTransformer, rest} from 'msw'
import {setupServer} from 'msw/node'
import {HTTPStatusCodes} from '../../types/HttpCodes'

import Form from './Form'

interface ProductBody {
    name: string
    size: string
    type: string
}

const server = setupServer(
    rest.post<ProductBody, ResponseTransformer>(
        '/productsMSW',
        (req, res, ctx) => {
            const {name, size, type}: ProductBody = req.body

            if (name && size) {
                return res(ctx.status(HTTPStatusCodes.RESOURCE_CREATED))
            }

            return res(ctx.status(HTTPStatusCodes.INTERNAL_SERVER_ERROR))
        },
    ),
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
    it('after submit > on data saved display Product stored & clean fields', async () => {
        const {container} = render(setup())
        const submitBtn = container.getElementsByTagName('button')[0]

        const name = container.querySelector('#name')
        const size = container.querySelector('#size')
        const type = container.querySelector(`input[name="type"]`)
        if (name) fireEvent.change(name, {target: {value: 'Socks2'}})
        if (size) fireEvent.change(size, {target: {value: 'L2'}})
        if (type) fireEvent.change(type, {target: {value: '3'}})

        fireEvent.click(submitBtn)

        // const msgExp = await screen.findByText(/product stored/i)
        // expect(msgExp).toBeInTheDocument()

        await waitFor(() => {
            expect(screen.getByText(/product stored/i)).toBeInTheDocument()
        })

        expect(name).toHaveValue('')
        expect(size).toHaveValue('')
        expect(type).toHaveValue('')
    })
    it('on server error > display "Unexpected error, please try again"', async () => {
        const {container} = render(setup())
        const submitBtn = container.getElementsByTagName('button')[0]

        fireEvent.click(submitBtn)

        // const msgExp = await screen.findByText(
        //     /unexpected error, please try again/i,
        // )
        // expect(msgExp).toBeInTheDocument()

        await waitFor(() => {
            expect(
                screen.getByText(/unexpected error, please try again/i),
            ).toBeInTheDocument()
        })
    })
    it('on bad request > display "The form is invalid, the fields [field1,... fieldN] are required"', async () => {
        server.use(
            rest.post<ProductBody, ResponseTransformer>(
                '/productsMSW',
                (req, res, ctx) => {
                    return res(
                        ctx.status(HTTPStatusCodes.BAD_REQUEST),
                        ctx.json({
                            message:
                                'The form is invalid, the fields name, size, type are required',
                        }),
                    )
                },
            ),
        )

        const {container} = render(setup())
        const submitBtn = container.getElementsByTagName('button')[0]

        fireEvent.click(submitBtn)

        const msgExp = await screen.findByText(
            /the form is invalid, the fields name, size, type are required/i,
        )
        expect(msgExp).toBeInTheDocument()

        // // await waitFor(() => {
        // //     expect(
        // //         screen.getByText(
        // //             /the form is invalid, the fields name, size, type are required/i,
        // //         ),
        // //     ).toBeInTheDocument()
        // // })
    })
    it.skip('on no connection > display "Connection error, please try again"', async () => {
        server.use(
            rest.post<ProductBody, ResponseTransformer>(
                '/productsMSW',
                (req, res, ctx) => res.networkError('Failed to connect'),
            ),
        )

        const {container} = render(setup())
        const submitBtn = container.getElementsByTagName('button')[0]

        fireEvent.click(submitBtn)

        // const msgExp = await screen.findByText(
        //     /connection error, please try again/i,
        // )
        // expect(msgExp).toBeInTheDocument()

        await waitFor(() => {
            expect(
                screen.getByText(/connection error, please try again/i),
            ).toBeInTheDocument()
        })
    })
})
