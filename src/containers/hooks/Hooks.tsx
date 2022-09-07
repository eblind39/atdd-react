import * as React from 'react'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import useRemoteService from '../../hooks/useRemoteService'

const Hooks = () => {
    const [searchText, setSearchText] = React.useState<string>('')

    const handleSearchText = (event: React.SyntheticEvent) => {
        const target = event.target as HTMLInputElement
        const {value} = target
        setSearchText(value)
    }

    const handleCleanText = (event: React.SyntheticEvent) => {
        setSearchText('')
    }

    const handleDoSearch = (event: React.SyntheticEvent) => {
        const {data, loading, error} = useRemoteService({
            initialUrl: `http://hn.algolia.com/api/v1/search?query=foo&tags=story`,
            initialData: {},
        })
    }

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
                            color="primary"
                            variant="contained"
                            // disabled={isSearching}
                            fullWidth
                            onClick={handleDoSearch}
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
