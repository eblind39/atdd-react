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
    it(`each table result must contain: owner avatar image, name, stars, updated at, forks, open issues, 
        It should have a link that opens in a new tab the github repository selected`, async () => {
        const btnSearch = screen.getByRole('button', {name: /search/i})
        fireEvent.click(btnSearch)

        const table = await screen.findByRole('table')
        const tableCells = within(table).getAllByRole('cell')
        const [repository, stars, forks, openIssues, updatedAt] = tableCells

        expect(
            within(repository).getByRole('img', {name: /test/i}),
        ).toBeInTheDocument()
        expect(tableCells).toHaveLength(5)

        expect(repository).toHaveTextContent(/test/i)
        expect(stars).toHaveTextContent(/10/i)
        expect(forks).toHaveTextContent(/5/i)
        expect(openIssues).toHaveTextContent(/2/i)
        expect(updatedAt).toHaveTextContent(/2022-01-01/i)

        expect(within(table).getByText(/test/i).closest('a')).toHaveAttribute(
            'href',
            'http://localhost:3000/test',
        )
    })
    it('total results number of the search and the current number of results', async () => {
        const btnSearch = screen.getByRole('button', {name: /search/i})
        fireEvent.click(btnSearch)

        await screen.findByRole('table')
        expect(screen.getByText(/1–1 of 1/i)).toBeInTheDocument()
    })
    it('results size per page select/combobox with the options: 30, 50, 100. The default is 30', async () => {
        const btnSearch = screen.getByRole('button', {name: /search/i})
        fireEvent.click(btnSearch)

        await screen.findByRole('table')

        expect(screen.getByLabelText(/rows per page/i)).toBeInTheDocument()

        fireEvent.mouseDown(screen.getByLabelText(/rows per page/i))
        const listbox = screen.getByRole('listbox', {name: /rows per page/i})
        const options = within(listbox).getAllByRole('option')
        expect(options).toHaveLength(3)

        const [option30, option50, option100] = options
        expect(option30).toHaveTextContent(/30/i)
        expect(option50).toHaveTextContent(/50/i)
        expect(option100).toHaveTextContent(/100/i)
    })
})
