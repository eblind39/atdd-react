import React from 'react'
import {fireEvent, render, screen} from '@testing-library/react'
import App from '../../App'
import {setupServer} from 'msw/node'
import {handlers} from '../../mocks/handlers'
import {renderWithRouter} from '../../utils'
import {fillInputs} from '../../__fixtures__/loginutils'
import {EnumStrings} from '../../types/strings'
import AuthContext from '../../services/auth-context'

const server = setupServer(...handlers)

const getSendButton = (): HTMLButtonElement =>
    screen.getByRole('button', {name: /send/i})

const renderWithAuthCtx = (isAuth: boolean = false) => {
    const values = {
        isAuth,
        handleSuccessLogin: jest.fn(),
    }

    return (
        <AuthContext.Provider value={values}>
            <App />
        </AuthContext.Provider>
    )
}

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())

describe('when the user is not authenticated and enters in admin page', () => {
    it('must be redirected to login page', () => {
        renderWithRouter(renderWithAuthCtx(), {route: '/admin'})
        expect(screen.getByText(/login page/i)).toBeInTheDocument()
    })
})

describe('when the user is not authenticated and enters in employee page', () => {
    it('must be redirected to login page', () => {
        renderWithRouter(renderWithAuthCtx(), {route: '/employee'})
        expect(screen.getByText(/login page/i)).toBeInTheDocument()
    })
})

describe('when the user is authenticated and enters in admin page', () => {
    it('must enter to admin page', async () => {
        renderWithRouter(renderWithAuthCtx(true), {route: '/login'})
        fillInputs({email: EnumStrings.EMAIL_ADMIN})
        fireEvent.click(getSendButton())
        expect(await screen.findByText(/admin page/i)).toBeInTheDocument()
    })
})

describe('when the user is authenticated and enters in employee page', () => {
    it('must enter to employee page', async () => {
        renderWithRouter(renderWithAuthCtx(true), {route: '/login'})
        fillInputs({email: EnumStrings.EMAIL_EMPLOYEE})
        fireEvent.click(getSendButton())
        expect(await screen.findByText(/employee page/i)).toBeInTheDocument()
    })
})

describe('when the admin is authenticated and enters in login page', () => {
    it('must be redirected to admin page', async () => {
        renderWithRouter(renderWithAuthCtx(true), {route: '/login'})
        fillInputs({email: EnumStrings.EMAIL_ADMIN})
        fireEvent.click(getSendButton())
        expect(await screen.findByText(/admin page/i)).toBeInTheDocument()
    })
})
