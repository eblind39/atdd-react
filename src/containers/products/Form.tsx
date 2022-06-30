import React from 'react'
import {TextField, Typography} from '@mui/material'
import InputLabel from '@mui/material/InputLabel'
import Select, {SelectChangeEvent} from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

const Form = () => {
    return (
        <React.Fragment>
            <Typography variant="h1" component="h1" data-test="heading">
                Create Product
            </Typography>
            <form>
                <TextField label="name" id="name" />
                <TextField label="size" id="size" />
                <InputLabel htmlFor="type" id="type-label">
                    Type
                </InputLabel>
                <Select
                    labelId="type-label"
                    id="type"
                    name="type"
                    value=""
                    label="type"
                    native={false}
                    open={true}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={1}>Electronic</MenuItem>
                    <MenuItem value={2}>Furniture</MenuItem>
                    <MenuItem value={3}>Clothing</MenuItem>
                </Select>
            </form>
        </React.Fragment>
    )
}

export default Form
