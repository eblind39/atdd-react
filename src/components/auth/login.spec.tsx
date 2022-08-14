import React from 'react'
import {
    screen,
    render,
    fireEvent,
    waitFor,
    waitForElementToBeRemoved,
} from '@testing-library/react'
import {setupServer} from 'msw/node'
import {handlers} from '../../mocks/handlers'

import Login from './login'

const server = setupServer(...handlers)

const pwValidationMsg =
    'The password must contain at least 8 characters, 1 capital letter, 1 lowercase letter, and 1 special character'

const getSendButton = () => screen.getByRole('button', {name: /send/i})

const fillInputWithValidValues = () => {
    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    fireEvent.change(emailInput, {
        target: {value: 'john.doe@test.com'},
    })
    fireEvent.change(passwordInput, {
        target: {value: 'Aa123456789!@#1.'},
    })
}

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())

beforeEach(() => render(<Login />))

describe('when login page is mounted', () => {
    it('must display the login title', () => {
        expect(screen.getByText(/login/i)).toBeInTheDocument()
    })
    it('must have a form with the following fields: email, password and a submit button', () => {
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
        expect(getSendButton()).toBeInTheDocument()
    })
})

describe('when the user leaves empty fields and clicks the submit button', () => {
    it('display required messages as the format: "The [field name] is required"', async () => {
        ;(screen.getByLabelText(/email/i) as HTMLInputElement).value = ''
        ;(screen.getByLabelText(/password/i) as HTMLInputElement).value = ''
        expect(
            screen.queryByText(/the email is required/i),
        ).not.toBeInTheDocument()
        expect(
            screen.queryByText(/the password is required/i),
        ).not.toBeInTheDocument()
        fireEvent.click(getSendButton())
        expect(screen.getByText(/the email is required/i)).toBeInTheDocument()
        expect(
            screen.getByText(/the password is required/i),
        ).toBeInTheDocument()

        await waitFor(() => {
            expect(getSendButton()).not.toBeDisabled()
        })
    })
})

describe('when the user fills the fields and clicks the submit button', () => {
    it('must not display the required messages', async () => {
        fillInputWithValidValues()

        fireEvent.click(getSendButton())
        expect(
            screen.queryByText(/the email is required/i),
        ).not.toBeInTheDocument()
        expect(
            screen.queryByText(/the password is required/i),
        ).not.toBeInTheDocument()

        await waitFor(() => {
            expect(getSendButton()).not.toBeDisabled()
        })
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
        const pwSevenLength = '1234567'
        const passwordInput = screen.getByLabelText(/password/i)
        fireEvent.change(passwordInput, {
            target: {value: pwSevenLength},
        })
        fireEvent.blur(passwordInput)

        expect(screen.getByText(pwValidationMsg)).toBeInTheDocument()
    })
})

describe('when the user fills and blur the password input with a value without one uppercase character', () => {
    it('must display the validation message: "The password must contain at least 8 characters, 1 capital letter, 1 lowercase letter, and 1 special character"', () => {
        const pwWithoutUppercase = 'ernestogut1234#'
        const passwordInput = screen.getByLabelText(/password/i)
        fireEvent.change(passwordInput, {
            target: {value: pwWithoutUppercase},
        })
        fireEvent.blur(passwordInput)

        expect(screen.getByText(pwValidationMsg)).toBeInTheDocument()
    })
})

describe('when the user fills and blur the password input with a value without a number', () => {
    it('must display the validation message: "The password must contain at least 8 characters, 1 capital letter, 1 lowercase letter, and 1 special character"', () => {
        const pwWithoutANumber = 'ernestogut#'
        const passwordInput = screen.getByLabelText(/password/i)
        fireEvent.change(passwordInput, {
            target: {value: pwWithoutANumber},
        })
        fireEvent.blur(passwordInput)

        expect(screen.getByText(pwValidationMsg)).toBeInTheDocument()
    })
})

describe('when the user fills and blur the password input with a value without a special character', () => {
    it('must display the validation message: "The password must contain at least 8 characters, 1 capital letter, 1 lowercase letter, and 1 special character"', () => {
        const pwWithoutSpecialChar = 'ernestogut12345'
        const passwordInput = screen.getByLabelText(/password/i)
        fireEvent.change(passwordInput, {
            target: {value: pwWithoutSpecialChar},
        })
        fireEvent.blur(passwordInput)

        expect(screen.getByText(pwValidationMsg)).toBeInTheDocument()
    })
})

describe('when the user fills and blur the password input with a valid value', () => {
    it('must not display the validation message: "The password must contain at least 8 characters, 1 capital letter, 1 lowercase letter, and 1 special character"', () => {
        const pwValidValue = 'Ernestogut12345#$..'
        const passwordInput = screen.getByLabelText(/password/i)
        fireEvent.change(passwordInput, {
            target: {value: pwValidValue},
        })
        fireEvent.blur(passwordInput)

        expect(screen.queryByText(pwValidationMsg)).not.toBeInTheDocument()
    })
})

describe('when the user submit the login form with valid data', () => {
    it('must disable the submit button while the form page is fetching the data', async () => {
        fillInputWithValidValues()

        fireEvent.click(getSendButton())

        expect(getSendButton()).toBeDisabled()

        await waitFor(() => {
            expect(getSendButton()).not.toBeDisabled()
        })
    })

    it('must be a loading indicator at the top of the form while it is fetching', async () => {
        expect(
            screen.queryByTestId('loading-indicator'),
        ).not.toBeInTheDocument()

        fillInputWithValidValues()

        fireEvent.click(getSendButton())

        expect(screen.getByTestId('loading-indicator')).toBeInTheDocument()

        await waitForElementToBeRemoved(() =>
            screen.queryByTestId('loading-indicator'),
        )
    })
})
