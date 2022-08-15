import React from 'react'
import {screen, fireEvent} from '@testing-library/react'

interface InputProps {
    email?: string
    password?: string
}

const fillInputs = ({
    email = 'john.doe@test.com',
    password = 'Aa123456789!@#1.',
}: InputProps = {}) => {
    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    fireEvent.change(emailInput, {
        target: {value: email},
    })
    fireEvent.change(passwordInput, {
        target: {value: password},
    })
}

export {fillInputs}
