import React, {
    SyntheticEvent,
    useState,
    useEffect,
    useCallback,
    useRef,
} from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import TablePagination from '@mui/material/TablePagination'
import Content from './github-search-cont'
import {FullDataRepo, RepoRoot} from '../../types/githubrepo'
import {getRepos} from '../../services/gitrepoService'
import GithubTable from './github-table'
import {gitRepoBaseUrl} from '../../app/config'

const ROWS_PER_PAGE_DEFAULT = 30

const GithubSearch = () => {
    const [isSearching, setIsSearching] = useState<boolean>(false)
    const [isSearchApplied, setIsSearchApplied] = useState<boolean>(false)
    const [reposList, setReposList] = useState<RepoRoot[]>([])
    const [searchBy, setSearchBy] = useState<string>('')
    const [rowsPerPage, setRowsPerPage] = useState<number>(
        ROWS_PER_PAGE_DEFAULT,
    )

    const didMount = useRef(false)

    const handleSearch = useCallback(async () => {
        // console.log(gitRepoBaseUrl)
        // if (searchBy === '') return
        setIsSearching(true)
        const response = await getRepos({q: searchBy, rowsPerPage})
        const data: FullDataRepo = await response.json()
        // console.log(data)
        setReposList(data.items)
        setIsSearching(false)
        setIsSearchApplied(true)
    }, [rowsPerPage, searchBy])

    const handleChange = (evt: SyntheticEvent) => {
        const target = evt.target as HTMLInputElement
        const {value} = target
        setSearchBy(value)
    }

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        // setPage(0)
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
                            value={searchBy}
                            onChange={handleChange}
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
                            count={1}
                            rowsPerPage={rowsPerPage}
                            page={0}
                            onPageChange={() => {}}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </React.Fragment>
                </Content>
                {/* reposList={reposList}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage} */}
            </Container>
        </React.Fragment>
    )
}

export default GithubSearch
