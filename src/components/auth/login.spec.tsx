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

describe('when the user leaves empty fields and clicks the submit button', () => {
    it('display required messages as the format: "The [field name] is required"', () => {
        ;(screen.getByLabelText(/email/i) as HTMLInputElement).value = ''
        ;(screen.getByLabelText(/password/i) as HTMLInputElement).value = ''
        expect(
            screen.queryByText(/the email is required/i),
        ).not.toBeInTheDocument()
        expect(
            screen.queryByText(/the password is required/i),
        ).not.toBeInTheDocument()
        fireEvent.click(screen.getByRole('button', {name: /send/i}))
        expect(screen.getByText(/the email is required/i)).toBeInTheDocument()
        expect(
            screen.getByText(/the password is required/i),
        ).toBeInTheDocument()
    })
})

describe('when the user fills the fields and clicks the submit button', () => {
    it('must not display the required messages', () => {
        ;(screen.getByLabelText(/email/i) as HTMLInputElement).value =
            'john.doe@test.com'
        ;(screen.getByLabelText(/password/i) as HTMLInputElement).value =
            'Aa123456789!@#'
        fireEvent.click(screen.getByRole('button', {name: /send/i}))
        expect(
            screen.queryByText(/the email is required/i),
        ).not.toBeInTheDocument()
        expect(
            screen.queryByText(/the password is required/i),
        ).not.toBeInTheDocument()
    })
})

describe('when the user fills and blur the email input with invalid email', () => {
    it('must display a validation message "The email is invalid. Example: john.doe@domain.com"', () => {
        const emailInput = screen.getByLabelText('email')
        fireEvent.change(emailInput, {
            target: {value: 'invalid.email'},
        })
        fireEvent.blur(emailInput)

        expect(
            screen.getByText(
                /the email is invalid. Example: john.doe@domain.com/i,
            ),
        ).toBeInTheDocument()
    })
})
