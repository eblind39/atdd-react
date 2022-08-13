import React from 'react'
import {screen, render, fireEvent} from '@testing-library/react'

import Login from './login'

describe('when login page is mounted', () => {
    it('must display the login title', () => {
        render(<Login />)
        expect(screen.getByText(/login/i)).toBeInTheDocument()
    })
})
