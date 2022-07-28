import React from 'react'
import {Button, TextField, Typography} from '@mui/material'

const GithubSearch = () => (
    <React.Fragment>
        <Typography variant="h3" component="h1">
            github repositories list
        </Typography>
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
        <Button>Search</Button>
    </React.Fragment>
)

export default GithubSearch
