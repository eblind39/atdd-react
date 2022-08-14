import React, {SyntheticEvent, useState} from 'react'
import {TextField, Typography} from '@mui/material'
import InputLabel from '@mui/material/InputLabel'
import Select, {SelectChangeEvent} from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import NavBar from '../NavBar'
import saveProduct from '../../services/productServices'
import {HTTPStatusCodes} from '../../types/HttpCodes'
import {Product} from '../../types/Product'

interface ErrorMssgs {
    name: string
    size: string
    type: string
}

interface EvtProps {
    name: string
    value: string
}

const Form = () => {
    const [name, setName] = useState<string>('')
    const [size, setSize] = useState<string>('')
    const [type, setType] = useState<string>('')
    const [isSaving, setIsSaving] = useState<boolean>(false)
    const [isSuccess, setIsSuccess] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [formErrors, setFormErrors] = useState<ErrorMssgs>({
        name: '',
        size: '',
        type: '',
    })

    const validateField = ({name, value}: EvtProps) => {
        setFormErrors(prevState => ({
            ...prevState,
            [name]: !value ? `The ${name} is required` : '',
        }))
    }

    const validateForm = () => {
        validateField({name: 'name', value: name})
        validateField({name: 'size', value: size})
        validateField({name: 'type', value: type})
    }

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault()
        validateForm()

        setIsSaving(true)

        const response = await saveProduct({
            name,
            size,
            type,
        } as Product)

        if (response.status === HTTPStatusCodes.RESOURCE_CREATED) {
            setName('')
            setSize('')
            setType('')
            setErrorMessage('')
            setIsSuccess(true)
            return
        } else {
            setIsSuccess(false)
            setIsSaving(false)
            if (response.status === HTTPStatusCodes.INTERNAL_SERVER_ERROR) {
                setErrorMessage('Unexpected error, please try again')
                return
            }
            if (response.status === HTTPStatusCodes.BAD_REQUEST) {
                const data = await response.json()
                setErrorMessage(data.message)
                return
            }
            setErrorMessage('Connection error, please try again')
        }

        setIsSaving(false)
    }

    const handleOnChange = (e: SyntheticEvent | SelectChangeEvent) => {
        const elem = e.target as HTMLInputElement | HTMLSelectElement
        const {name, value}: EvtProps = elem
        switch (name) {
            case 'name':
                setName(value)
                break
            case 'size':
                setSize(value)
                break
            case 'type':
                setType(value)
                break
        }
    }

    const handleBlur = (e: SyntheticEvent | SelectChangeEvent) => {
        const elem = e.target as HTMLInputElement | HTMLSelectElement
        const {name, value}: EvtProps = elem
        validateField({name, value})
    }

    return (
        <React.Fragment>
            <NavBar />
            <Container maxWidth="sm">
                {isSuccess ? <p>Product stored</p> : null}
                {errorMessage ? <p>{errorMessage}</p> : null}
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <Typography
                                variant="h3"
                                component="h3"
                                data-test="heading"
                                align="center"
                            >
                                Create Product
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="name"
                                id="name"
                                name="name"
                                value={name}
                                helperText={formErrors.name}
                                error={!!formErrors.name.length}
                                onChange={handleOnChange}
                                onBlur={handleBlur}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="size"
                                id="size"
                                name="size"
                                value={size}
                                onChange={handleOnChange}
                                onBlur={handleBlur}
                                helperText={formErrors.size}
                                error={!!formErrors.size.length}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <InputLabel htmlFor="type" id="type-label">
                                Type
                            </InputLabel>
                            <Select
                                labelId="type-label"
                                id="type"
                                name="type"
                                value={type}
                                label="type"
                                native={false}
                                open={true}
                                onChange={handleOnChange}
                                onBlur={handleBlur}
                                error={!!formErrors.type.length}
                                fullWidth
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={1}>Electronic</MenuItem>
                                <MenuItem value={2}>Furniture</MenuItem>
                                <MenuItem value={3}>Clothing</MenuItem>
                            </Select>
                            {formErrors.type.length > 0 ? (
                                <p>{formErrors.type}</p>
                            ) : null}
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                disabled={isSaving}
                                variant="contained"
                                style={{top: '170px'}}
                                fullWidth
                            >
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        </React.Fragment>
    )
}

export default Form
