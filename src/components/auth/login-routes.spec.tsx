import React from 'react'
import {screen} from '@testing-library/react'
import App from '../../App'
import {renderWithRouter} from '../../utils'

describe('when the user is not authenticated and enters on admin page', () => {
    it('must be redirected to login page', () => {
        renderWithRouter(<App isAuth={false} />, {route: '/admin'})
        expect(screen.getByText(/login page/i)).toBeInTheDocument()
    })
})

describe('when the user is not authenticated and enters on employee page', () => {
    it('must be redirected to login page', () => {
        renderWithRouter(<App isAuth={false} />, {route: '/employee'})
        expect(screen.getByText(/login page/i)).toBeInTheDocument()
    })
})

describe('when the user is authenticated and enters on admin page', () => {
    it('must enter to admin page', () => {
        renderWithRouter(<App isAuth />, {route: '/admin'})
        expect(screen.getByText(/admin page/i)).toBeInTheDocument()
    })
})

describe('when the user is authenticated and enters on employee page', () => {
    it('must enter to employee page', () => {
        renderWithRouter(<App isAuth />, {route: '/employee'})
        expect(screen.getByText(/employee page/i)).toBeInTheDocument()
    })
})
