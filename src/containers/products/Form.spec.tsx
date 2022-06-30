import React from 'react'
import {screen, render} from '@testing-library/react'

import Form from './Form'

beforeEach(() => {})

describe('when the form is mounted', () => {
    it('There must be a create product form page', () => {
        render(<Form />)
        expect(screen.queryByText(/create product/i)).toBeInTheDocument()

        // expect(
        //     screen.getByRole('heading', {name: /create product/i}),
        // ).toBeInTheDocument()
    })
    it('Should exists the fields: name, size, type (electronic,furniture, clothing)', () => {
        const {container} = render(<Form />)
        expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/size/i)).toBeInTheDocument()
        const typeLabel = container.querySelector('#type-label')
        expect(typeLabel).toBeInTheDocument()

        expect(screen.queryByText(/electronic/i)).toBeInTheDocument()
        expect(screen.queryByText(/furniture/i)).toBeInTheDocument()
        expect(screen.queryByText(/clothing/i)).toBeInTheDocument()
    })
})
