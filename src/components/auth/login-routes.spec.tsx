import React from 'react'
import {screen} from '@testing-library/react'
import App from '../../App'
import {renderWithRouter} from '../../utils'

describe('when the user is not authenticated and enters on admin page', () => {
    it('must be redirected to login page', () => {
        renderWithRouter(<App />, {route: '/admin'})
        expect(screen.getByText(/login page/i)).toBeInTheDocument()
    })
})

describe('when the user is not authenticated and enters on employee page', () => {
    it('must be redirected to login page', () => {
        renderWithRouter(<App />, {route: '/employee'})
        expect(screen.getByText(/login page/i)).toBeInTheDocument()
    })
})
