import React from 'react'
import {Button, TextField, Typography} from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'

const GithubSearch = () => (
    <React.Fragment>
        <CssBaseline />
        <Container maxWidth="sm">
            <Typography variant="h3" component="h1">
                github repositories list
            </Typography>
            <Grid container spacing={2} justifyContent="space-between">
                <Grid item md={6} xs={12}>
                    <TextField
                        label="Filter by"
                        id="filter"
                        name="filter"
                        // value={name}
                        // helperText={formErrors.name}
                        // error={!!formErrors.name.length}
                        // onChange={handleOnChange}
                        // onBlur={handleBlur}
                        fullWidth
                    />
                </Grid>
                <Grid item md={3} xs={12}>
                    <Button color="primary" variant="contained">
                        Search
                    </Button>
                </Grid>
            </Grid>
        </Container>
    </React.Fragment>
)

export default GithubSearch
