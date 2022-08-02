import React from 'react'
import {
    render,
    screen,
    fireEvent,
    waitFor,
    findByRole,
    within,
} from '@testing-library/react'
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
    it('the header table should contain: Repository, stars, forks, open issues and updated at', async () => {
        const btnSearch = screen.getByRole('button', {name: /search/i})
        fireEvent.click(btnSearch)

        const table = await screen.findByRole('table')
        const tableHeaders = within(table).getAllByRole('columnheader')

        expect(tableHeaders).toHaveLength(5)

        const [repoHdr, startHdr, forksHdr, openIssCol, updatAtHdr] =
            tableHeaders

        expect(repoHdr).toHaveTextContent(/repository/i)
        expect(startHdr).toHaveTextContent(/stars/i)
        expect(forksHdr).toHaveTextContent(/forks/i)
        expect(openIssCol).toHaveTextContent(/open issues/i)
        expect(updatAtHdr).toHaveTextContent(/updated at/i)
    })
    it('each table result must contain: name, stars, updated at, forks, open issues', async () => {
        const btnSearch = screen.getByRole('button', {name: /search/i})
        fireEvent.click(btnSearch)

        const table = await screen.findByRole('table')
        const tableCells = within(table).getAllByRole('cell')

        expect(tableCells).toHaveLength(5)

        const [repository, stars, forks, openIssues, updatedAt] = tableCells
        expect(repository).toHaveTextContent(/test/i)
        expect(stars).toHaveTextContent(/10/i)
        expect(forks).toHaveTextContent(/5/i)
        expect(openIssues).toHaveTextContent(/2/i)
        expect(updatedAt).toHaveTextContent(/2022-01-01/i)
    })
})
