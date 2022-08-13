import React from 'react'
import {screen, render, fireEvent} from '@testing-library/react'

import Login from './login'

beforeEach(() => render(<Login />))

describe('when login page is mounted', () => {
    it('must display the login title', () => {
        expect(screen.getByText(/login/i)).toBeInTheDocument()
    })
    it('must have a form with the following fields: email, password and a submit button', () => {
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
        expect(screen.getByRole('button', {name: /send/i})).toBeInTheDocument()
    })
})
