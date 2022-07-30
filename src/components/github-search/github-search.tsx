import React, {SyntheticEvent, useState} from 'react'
import {Typography} from '@mui/material'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

const GithubSearch = () => {
    const [isSearching, setIsSearching] = useState<boolean>(false)
    const [isSearchApplied, setIsSearchApplied] = useState<boolean>(false)

    const handleClick = async (evt: SyntheticEvent) => {
        setIsSearching(true)
        await Promise.resolve()
        setIsSearching(false)
        setIsSearchApplied(true)
    }

    const renderContent = () =>
        isSearchApplied ? (
            <table>
                <thead>
                    <tr>
                        <th>Repository</th>
                        <th>Stars</th>
                        <th>Forks</th>
                        <th>Open issues</th>
                        <th>Uupdated at</th>
                    </tr>
                </thead>
            </table>
        ) : (
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={{
                    height: 50,
                    color: 'primary.dark',
                    '&:hover': {
                        color: 'primary.main',
                        opacity: [0.9, 0.8, 0.7],
                    },
                }}
            >
                <Typography component="label">
                    Please provide a search option and click in the search
                    button
                </Typography>
            </Box>
        )

    return (
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
                {renderContent()}
            </Container>
        </React.Fragment>
    )
}

export default GithubSearch
