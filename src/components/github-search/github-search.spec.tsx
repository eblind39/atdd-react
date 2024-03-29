import React from 'react'
import {
    render,
    screen,
    fireEvent,
    waitFor,
    within,
} from '@testing-library/react'
import GithubSearch from './github-search'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {HTTPStatusCodes} from '../../types/HttpCodes'
import {
    makeFakeResponse,
    makeFakeRepo,
    getReposListBy,
    makeFakeError,
} from '../../__fixtures__/gitrepo'
import {handlePaginated} from '../../__fixtures__/handlers'
import {FullDataRepo, RepoRoot} from '../../types/githubrepo'

const fakeResponse: FullDataRepo = makeFakeResponse({totalCount: 1})
const fakeRepo: RepoRoot = makeFakeRepo()
fakeResponse.items = [fakeRepo]

const server = setupServer(
    rest.get('/search/repositories', (req, res, ctx) =>
        res(ctx.status(HTTPStatusCodes.OK_STATUS), ctx.json(fakeResponse)),
    ),
)

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())

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
        const avatarImg = within(repository).getByRole('img', {
            name: fakeRepo.name,
        })

        expect(avatarImg).toBeInTheDocument()
        expect(tableCells).toHaveLength(5)

        expect(repository).toHaveTextContent(fakeRepo.name)
        expect(stars).toHaveTextContent(fakeRepo.stargazers_count.toString())
        expect(forks).toHaveTextContent(fakeRepo.forks_count.toString())
        expect(openIssues).toHaveTextContent(
            fakeRepo.open_issues_count.toString(),
        )
        expect(updatedAt).toHaveTextContent(fakeRepo.updated_at)

        expect(
            within(table).getByText(fakeRepo.name).closest('a'),
        ).toHaveAttribute('href', fakeRepo.html_url)

        expect(avatarImg).toHaveAttribute('src', fakeRepo.owner.avatar_url)
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
    it('must exists next and previous pagination buttons', async () => {
        const btnSearch = screen.getByRole('button', {name: /search/i})
        fireEvent.click(btnSearch)

        await screen.findByRole('table')

        const previousPageBtn = screen.getByRole('button', {
            name: /previous page/i,
        })

        expect(previousPageBtn).toBeInTheDocument()
        expect(
            screen.getByRole('button', {name: /next page/i}),
        ).toBeInTheDocument()

        expect(previousPageBtn).toBeDisabled()
    })
    it('when no results, then show a empty state message “Your search has no results”', async () => {
        // set msw to return empty data
        server.use(
            rest.get('/search/repositories', (req, res, ctx) =>
                res(
                    ctx.status(HTTPStatusCodes.OK_STATUS),
                    ctx.json(makeFakeResponse({})),
                ),
            ),
        )

        const btnSearch = screen.getByRole('button', {name: /search/i})
        fireEvent.click(btnSearch)

        await waitFor(() =>
            expect(
                screen.getByText(/your search has no results/i),
            ).toBeInTheDocument(),
        )

        expect(screen.queryByRole('table')).not.toBeInTheDocument()
    })
    it('if types "laravel" in filter by repo name and clicks on search, the app should return repos with the "laravel" word associated', async () => {
        const internalFakeResponse = makeFakeResponse()
        const REPO_NAME: string = 'laravel'
        const expectedRepo = getReposListBy({name: REPO_NAME})[0]

        server.use(
            rest.get('/search/repositories', (req, res, ctx) =>
                res(
                    ctx.status(HTTPStatusCodes.OK_STATUS),
                    ctx.json({
                        ...internalFakeResponse,
                        items: getReposListBy({
                            name: req.url.searchParams.get('q') ?? 'go',
                        }),
                    }),
                ),
            ),
        )

        fireEvent.change(screen.getByLabelText(/filter by/i), {
            target: {value: REPO_NAME},
        })

        const btnSearch = screen.getByRole('button', {name: /search/i})
        fireEvent.click(btnSearch)

        const table = await screen.findByRole('table')
        expect(table).toBeInTheDocument()

        const tableCells = within(table).getAllByRole('cell')
        const [repository] = tableCells

        expect(repository).toHaveTextContent(expectedRepo.name)
    })
    it(`when the developer clicks on search button and then selects 50 per page value, 
        the app should show 50 repositories on the table`, async () => {
        server.use(rest.get('/search/repositories', handlePaginated))

        const btnSearch = screen.getByRole('button', {name: /search/i})
        fireEvent.click(btnSearch)

        expect(await screen.findByRole('table')).toBeInTheDocument()
        expect(await screen.findAllByRole('row')).toHaveLength(30 + 1) // 30 + header row

        fireEvent.mouseDown(screen.getByLabelText(/rows per page/i))
        fireEvent.click(screen.getByRole('option', {name: '50'}))

        await waitFor(
            () =>
                expect(
                    screen.getByRole('button', {name: /search/i}),
                ).not.toBeDisabled(),
            {timeout: 3000},
        )
        expect(await screen.getAllByRole('row')).toHaveLength(50 + 1) // 50 + header row
    }, 6000)
    it(`when the developer clicks on search and then on next page button and then
        on next button, the app should show the next repositories`, async () => {
        server.use(rest.get('/search/repositories', handlePaginated))

        const btnSearch = screen.getByRole('button', {name: /search/i})
        fireEvent.click(btnSearch)

        expect(await screen.findByRole('table')).toBeInTheDocument()

        expect(screen.getByRole('cell', {name: /1-0/})).toBeInTheDocument()

        expect(
            screen.getByRole('button', {name: /next page/i}),
        ).not.toBeDisabled()

        fireEvent.click(screen.getByRole('button', {name: /next page/i}))

        expect(screen.getByRole('button', {name: /search/i})).toBeDisabled()

        await waitFor(
            () =>
                expect(
                    screen.getByRole('button', {name: /search/i}),
                ).not.toBeDisabled(),
            {timeout: 3000},
        )

        expect(screen.getByRole('cell', {name: /2-0/})).toBeInTheDocument()

        fireEvent.click(screen.getByRole('button', {name: /previous page/i}))

        await waitFor(
            () =>
                expect(
                    screen.getByRole('button', {name: /search/i}),
                ).not.toBeDisabled(),
            {timeout: 3000},
        )

        expect(screen.getByRole('cell', {name: /1-0/})).toBeInTheDocument()
    }, 7000)
    it(`If there is an unexpected error from the backend, error 422 “there is an unexpected error”`, async () => {
        server.use(
            rest.get('/search/repositories', (req, res, ctx) =>
                res(
                    ctx.status(HTTPStatusCodes.UNPROCESSABLE_ENTITY),
                    ctx.json(makeFakeError({message: 'Unprocessable Entity'})),
                ),
            ),
        )

        const btnSearch = screen.getByRole('button', {name: /search/i})
        fireEvent.click(btnSearch)

        expect(await screen.findByText(/unprocessable entity/i)).toBeVisible()
    })
    it(`If there is an unexpected error from the backend, error 500 “there is an unexpected error”`, async () => {
        server.use(
            rest.get('/search/repositories', (req, res, ctx) =>
                res(
                    ctx.status(HTTPStatusCodes.INTERNAL_SERVER_ERROR),
                    ctx.json(makeFakeError({message: 'Internal server error'})),
                ),
            ),
        )

        const btnSearch = screen.getByRole('button', {name: /search/i})
        fireEvent.click(btnSearch)

        expect(await screen.findByText(/internal server error/i)).toBeVisible()
    })
})
