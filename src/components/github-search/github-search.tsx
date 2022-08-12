import React, {useState, useEffect, useCallback, useRef} from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import TablePagination from '@mui/material/TablePagination'
import Snackbar from '@mui/material/Snackbar'
import Content from './github-search-cont'
import {FullDataRepo, RepoRoot} from '../../types/githubrepo'
import {getRepos} from '../../services/gitrepoService'
import GithubTable from './github-table'

const ROWS_PER_PAGE_DEFAULT = 30
const INITIAL_CURRENT_PAGE = 0
const INITIAL_TOTAL_COUNT = 0

const GithubSearch = () => {
    const [isSearching, setIsSearching] = useState<boolean>(false)
    const [isSearchApplied, setIsSearchApplied] = useState<boolean>(false)
    const [reposList, setReposList] = useState<RepoRoot[]>([])
    const [rowsPerPage, setRowsPerPage] = useState<number>(
        ROWS_PER_PAGE_DEFAULT,
    )
    const [currentPage, setCurrentPage] = useState<number>(INITIAL_CURRENT_PAGE)
    const [totalCount, setTotalCount] = useState<number>(INITIAL_TOTAL_COUNT)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>('')

    const didMount = useRef<boolean>(false)
    const searchByInput = useRef<HTMLInputElement>(null)

    const handleSearch = useCallback(async () => {
        try {
            // console.log(gitRepoBaseUrl)
            let strSrchBy = searchByInput.current?.value || ''
            // if (strSrchBy === '') return
            setIsSearching(true)
            const response = await getRepos({
                q: strSrchBy,
                rowsPerPage,
                currentPage,
            })

            if (!response.ok) {
                throw response
            }

            const data: FullDataRepo = await response.json()

            setTotalCount(data.total_count)
            setReposList(data.items)
            setIsSearching(false)
            setIsSearchApplied(true)
        } catch (err: unknown) {
            if (err instanceof Response) {
                const data = await err.json()
                if (data.hasOwnProperty('message'))
                    setErrorMessage(data.message)
            }
            setIsOpen(true)
        } finally {
            setIsSearching(false)
        }
    }, [rowsPerPage, currentPage])

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setCurrentPage(0)
    }

    const handleChangePage = (event: unknown, newPage: number) => {
        setCurrentPage(newPage)
    }

    useEffect(() => {
        if (!didMount.current) {
            didMount.current = true
            return
        }
        handleSearch()
    }, [handleSearch, rowsPerPage])

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg">
                <Typography variant="h3" component="h1">
                    github repositories list
                </Typography>
                <Grid container spacing={2} justifyContent="space-between">
                    <Grid item md={6} xs={12}>
                        <TextField
                            label="Filter by"
                            id="filter"
                            name="filter"
                            inputRef={searchByInput}
                            fullWidth
                        />
                    </Grid>
                    <Grid item md={3} xs={12}>
                        <Button
                            color="primary"
                            variant="contained"
                            disabled={isSearching}
                            fullWidth
                            onClick={handleSearch}
                        >
                            Search
                        </Button>
                    </Grid>
                </Grid>
                <Content
                    reposList={reposList}
                    isSearchApplied={isSearchApplied}
                >
                    <React.Fragment>
                        <GithubTable reposList={reposList} />
                        <TablePagination
                            rowsPerPageOptions={[30, 50, 100]}
                            component="div"
                            count={totalCount}
                            rowsPerPage={rowsPerPage}
                            page={currentPage}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </React.Fragment>
                </Content>

                <Snackbar
                    open={isOpen}
                    autoHideDuration={6000}
                    onClose={() => setIsOpen(false)}
                    message={errorMessage}
                />
            </Container>
        </React.Fragment>
    )
}

export default GithubSearch
