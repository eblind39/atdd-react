import * as React from 'react'
import {experimentalStyled as styled} from '@mui/material/styles'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import TablePagination from '@mui/material/TablePagination'
import Snackbar from '@mui/material/Snackbar'

const Hooks = () => {
    const [searchText, setSearchText] = React.useState<string>('')

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg">
                <Typography variant="h3" component="h1">
                    Search IMDB
                </Typography>
                <Grid container spacing={2} justifyContent="space-between">
                    <Grid item xs={12} md={8}>
                        <TextField
                            label="Filter by"
                            id="filter"
                            name="filter"
                            // inputRef={searchText}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Button
                            color="primary"
                            variant="contained"
                            // disabled={isSearching}
                            fullWidth
                            // onClick={handleSearch}
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
