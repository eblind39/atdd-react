import React from 'react'
import {render, screen} from '@testing-library/react'
import {BrowserRouter} from 'react-router-dom'
import App from '../../App'

describe('when the user is not authenticated and enters on admin page', () => {
    it('must be redirected to login page', () => {
        window.history.pushState({}, '', '/admin')

        render(
            <BrowserRouter>
                <App />
            </BrowserRouter>,
        )

        expect(screen.getByText(/login page/i)).toBeInTheDocument()
    })
})

describe('when the user is not authenticated and enters on employee page', () => {
    it('must be redirected to login page', () => {
        window.history.pushState({}, '', '/employee')

        render(
            <BrowserRouter>
                <App />
            </BrowserRouter>,
        )

        expect(screen.getByText(/login page/i)).toBeInTheDocument()
    })
})
