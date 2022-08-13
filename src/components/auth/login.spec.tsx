import React from 'react'
import {screen, render, fireEvent} from '@testing-library/react'

import Login from './login'

const pwValidationMsg =
    'The password must contain at least 8 characters, 1 capital letter, 1 lowercase letter, and 1 special character'

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
        const emailInput = screen.getByLabelText(/email/i)
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

describe('when the user fills and blur the email input with valid email', () => {
    it('must clear the validation message for email', () => {
        const emailInput = screen.getByLabelText('email')
        fireEvent.change(emailInput, {
            target: {value: 'john.doe@domain.com'},
        })
        fireEvent.blur(emailInput)

        expect(
            screen.queryByText(
                /the email is invalid. Example: john.doe@domain.com/i,
            ),
        ).not.toBeInTheDocument()
    })
})

describe('when the user fills and blur the password input with a value with 7 characters length', () => {
    it('must display the validation message: "The password must contain at least 8 characters, 1 capital letter, 1 lowercase letter, and 1 special character"', () => {
        const passwordInput = screen.getByLabelText(/password/i)
        fireEvent.change(passwordInput, {
            target: {value: '1234567'},
        })
        fireEvent.blur(passwordInput)

        expect(screen.getByText(pwValidationMsg)).toBeInTheDocument()
    })
})

describe('when the user fills and blur the password input with a value without one uppercase character', () => {
    it('must display the validation message: "The password must contain at least 8 characters, 1 capital letter, 1 lowercase letter, and 1 special character"', () => {
        const passwordInput = screen.getByLabelText(/password/i)
        fireEvent.change(passwordInput, {
            target: {value: 'ernestogut1234'},
        })
        fireEvent.blur(passwordInput)

        expect(screen.getByText(pwValidationMsg)).toBeInTheDocument()
    })
})

describe('when the user fills and blur the password input with a value without a number', () => {
    it('must display the validation message: "The password must contain at least 8 characters, 1 capital letter, 1 lowercase letter, and 1 special character"', () => {
        const passwordInput = screen.getByLabelText(/password/i)
        fireEvent.change(passwordInput, {
            target: {value: 'Ernestogut'},
        })
        fireEvent.blur(passwordInput)

        expect(screen.getByText(pwValidationMsg)).toBeInTheDocument()
    })
})

describe('when the user fills and blur the password input with a value without a special character', () => {
    it('must display the validation message: "The password must contain at least 8 characters, 1 capital letter, 1 lowercase letter, and 1 special character"', () => {
        const passwordInput = screen.getByLabelText(/password/i)
        fireEvent.change(passwordInput, {
            target: {value: 'Ernestogut12345'},
        })
        fireEvent.blur(passwordInput)

        expect(screen.getByText(pwValidationMsg)).toBeInTheDocument()
    })
})
