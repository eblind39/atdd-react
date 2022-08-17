import React from 'react'
import {render, screen, fireEvent} from '@testing-library/react'
import AdminPage from '../../containers/AdminPage'

describe('when the admin page is mounted', () => {
    it('must display the admin username', () => {
        render(<AdminPage />)
        expect(screen.getByText(/john doe/i)).toBeInTheDocument()
    })
})
