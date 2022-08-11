import React from 'react'
import {screen, render, fireEvent} from '@testing-library/react'
import {ErrorBoundary} from './error-boundary'

jest.spyOn(console, 'error')

const ThrowError = () => {
    throw new Error('ups!')
}

describe('when the component works without errors', () => {
    it('must render the content', () => {
        render(
            <ErrorBoundary>
                <h1>test pass</h1>
            </ErrorBoundary>,
        )

        expect(screen.getByText(/test pass/i)).toBeInTheDocument()
    })
})

describe('when the component throw an error', () => {
    it('must render the message "There is an unexpected error" and a reload button', () => {
        render(
            <ErrorBoundary>
                <ThrowError />
            </ErrorBoundary>,
        )

        expect(
            screen.getByText(/there is an unexpected error/i),
        ).toBeInTheDocument()

        expect(
            screen.getByRole('button', {name: /reload/i}),
        ).toBeInTheDocument()
    })
})

describe('when the user clicks on reload button', () => {
    const original = window.location

    beforeAll(() => {
        Object.defineProperty(window, 'location', {
            configurable: true,
            value: {reload: jest.fn()},
        })
    })

    afterAll(() => {
        Object.defineProperty(window, 'location', {
            configurable: true,
            value: original,
        })
    })

    it('must reload the app', () => {
        render(
            <ErrorBoundary>
                <ThrowError />
            </ErrorBoundary>,
        )

        fireEvent.click(screen.getByRole('button', {name: /reload/i}))

        expect(window.location.reload).toHaveBeenCalledTimes(1)
    })
})
