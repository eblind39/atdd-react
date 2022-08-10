import React, {SyntheticEvent, useState} from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Content from './github-search-cont'
import {FullDataRepo, RepoRoot} from '../../types/githubrepo'
import {getRepos} from '../../services/gitrepoService'
import {gitRepoBaseUrl} from '../../app/config'

const GithubSearch = () => {
    const [isSearching, setIsSearching] = useState<boolean>(false)
    const [isSearchApplied, setIsSearchApplied] = useState<boolean>(false)
    const [reposList, setReposList] = useState<RepoRoot[]>([])
    const [searchBy, setSearchBy] = useState<string>('')
    const [rowsPerPage, setRowsPerPage] = useState<number>(30)

    const handleClick = async (evt: SyntheticEvent) => {
        console.log(gitRepoBaseUrl)
        setIsSearching(true)
        const response = await getRepos({q: searchBy, rowsPerPage})
        const data: FullDataRepo = await response.json()
        // console.log(data)
        setReposList(data.items)
        setIsSearching(false)
        setIsSearchApplied(true)
    }

    const handleChange = (evt: SyntheticEvent) => {
        const target = evt.target as HTMLInputElement
        const {value} = target
        setSearchBy(value)
    }

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
                            onClick={handleClick}
                        >
                            Search
                        </Button>
                    </Grid>
                </Grid>
                <Content
                    isSearchApplied={isSearchApplied}
                    reposList={reposList}
                    rowsPerPage={rowsPerPage}
                    setRowsPerPage={setRowsPerPage}
                />
            </Container>
        </React.Fragment>
    )
}

export default GithubSearch
