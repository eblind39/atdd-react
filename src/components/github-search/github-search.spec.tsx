import React from 'react'
import {render, screen, fireEvent, waitFor} from '@testing-library/react'
import GithubSearch from './github-search'

beforeEach(() => {
    render(<GithubSearch />)
})

describe('when the GithubSearchPage is mounted', () => {
    it('must display the title', () => {
        expect(
            screen.getByRole('heading', {
                name: /github repositories list/i,
            }),
        ).toBeInTheDocument()
    })
    it('must be an input text with label "filter by" field', () => {
        expect(screen.getByLabelText(/filter by/i)).toBeInTheDocument()
    })
    it('must be a search button', () => {
        expect(
            screen.getByRole('button', {name: /search/i}),
        ).toBeInTheDocument()
    })
    it('must be a initial message: “Please provide a search option and click in the search button”', () => {
        expect(
            screen.getByText(
                /please provide a search option and click in the search button/i,
            ),
        ).toBeInTheDocument()
    })
    it('the search button should be disabled until the search is done.', async () => {
        const btnSearch = screen.getByRole('button', {name: /search/i})
        expect(btnSearch).not.toBeDisabled()
        fireEvent.click(btnSearch)
        expect(btnSearch).toBeDisabled()

        await waitFor(() => {
            expect(btnSearch).not.toBeDisabled()
        })
    })
    it('the data should be displayed as a sticky table', async () => {
        const btnSearch = screen.getByRole('button', {name: /search/i})

        fireEvent.click(btnSearch)
        await waitFor(() => {
            expect(
                screen.queryByText(
                    /please provide a search option and click in the search button/i,
                ),
            ).not.toBeInTheDocument()
        })

        expect(screen.getByRole('table')).toBeInTheDocument()
    })
})
