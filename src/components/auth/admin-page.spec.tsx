import React from 'react'
import {render, screen, fireEvent} from '@testing-library/react'
import {setupServer} from 'msw/node'
import {handlers} from '../../mocks/handlers'
import {renderWithRouter} from '../../utils'
import {fillInputs} from '../../__fixtures__/loginutils'
import {EnumStrings} from '../../types/strings'
import AuthGuard from '../auth-guard'
import App from '../../App'
// import AdminPage from '../../containers/AdminPage'

const getSendButton = (): HTMLButtonElement =>
    screen.getByRole('button', {name: /send/i})

const renderWithAuthCtx = (isAuth: boolean = false) => {
    return (
        <AuthGuard isAuth={isAuth}>
            <App />
        </AuthGuard>
    )
}

const server = setupServer(...handlers)

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())

describe('when the admin page is mounted', () => {
    it('must display the admin username', async () => {
        renderWithRouter(renderWithAuthCtx(true), {route: '/login'})
        fillInputs({email: EnumStrings.EMAIL_ADMIN})
        fireEvent.click(getSendButton())
        expect(await screen.findByText(/admin page/i)).toBeInTheDocument()
        expect(await screen.findByText(/john doe/i)).toBeInTheDocument()
    })
})

describe('when the admin goes to employee page', () => {
    it('must have access', async () => {
        renderWithRouter(renderWithAuthCtx(true), {route: '/login'})
        fillInputs({email: EnumStrings.EMAIL_ADMIN})
        fireEvent.click(getSendButton())

        expect(await screen.findByText(/employee/i)).toBeInTheDocument()

        fireEvent.click(screen.getByText(/employee/i))

        expect(await screen.findByText(/employee page/i)).toBeInTheDocument()
    })
})
