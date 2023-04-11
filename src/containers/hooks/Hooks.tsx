import React, {useState, useRef, useEffect} from 'react'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import useRemoteService from '../../hooks/useRemoteService'

const Hooks = () => {
    const [searchText, setSearchText] = useState<string>('')
    const [doSearch, setDoSearch] = useState<boolean>(false);
    const btnSearch = useRef<HTMLButtonElement | undefined>();

    const handleSearchText = (event: React.SyntheticEvent) => {
        const target = event.target as HTMLInputElement
        const {value} = target
        setSearchText(value)
    }

    const handleCleanText = (event: React.SyntheticEvent) => {
        setSearchText('')
    }

    useEffect(() => {
        if (btnSearch.current) {
            btnSearch.current.focus()
        }

        setDoSearch(false)
    }, [doSearch])

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="xl" disableGutters>
                <Typography variant="h3" component="h1">
                    Search IMDB
                </Typography>
                <Grid container spacing={2} justifyContent="space-between">
                    <Grid item xs={12} md={8}>
                        <TextField
                            label="Filter by"
                            id="filter"
                            name="filter"
                            value={searchText}
                            onChange={handleSearchText}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Button
                            color="warning"
                            variant="contained"
                            // disabled={isSearching}
                            fullWidth
                            onClick={handleCleanText}
                        >
                            Clear
                        </Button>
                        <Button
                            ref={input => btnSearch}
                            color="primary"
                            variant="contained"
                            // disabled={isSearching}
                            fullWidth
                            onClick={() => setDoSearch(true)}
                        >
                            Search
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </React.Fragment>
    )
}

export default Hooks
