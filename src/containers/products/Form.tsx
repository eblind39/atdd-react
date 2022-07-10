import React, {SyntheticEvent, useState} from 'react'
import {TextField, Typography} from '@mui/material'
import InputLabel from '@mui/material/InputLabel'
import Select, {SelectChangeEvent} from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import NavBar from '../NavBar'
import saveProduct from '../../services/productServices'

interface ErrorMssgs {
    name: string
    size: string
    type: string
}

interface EvtProps {
    name: string
    value: string | number
}

const Form = () => {
    const [name, setName] = useState<string>('')
    const [size, setSize] = useState<string>('')
    const [type, setType] = useState<number>(0)
    const [isSaving, setIsSaving] = useState<boolean>(false)
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
        await saveProduct()
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
                setType(Number(value))
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
            <Typography variant="h1" component="h1" data-test="heading">
                Create Product
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="name"
                    id="name"
                    name="name"
                    helperText={formErrors.name}
                    onChange={handleOnChange}
                    onBlur={handleBlur}
                />
                <TextField
                    label="size"
                    id="size"
                    name="size"
                    onChange={handleOnChange}
                    onBlur={handleBlur}
                    helperText={formErrors.size}
                />
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
                    onChange={handleOnChange}
                    onBlur={handleBlur}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={1}>Electronic</MenuItem>
                    <MenuItem value={2}>Furniture</MenuItem>
                    <MenuItem value={3}>Clothing</MenuItem>
                </Select>
                {formErrors.type.length > 0 ? <p>{formErrors.type}</p> : null}
                <Button
                    type="submit"
                    disabled={isSaving}
                    variant="contained"
                    style={{top: '400px'}}
                >
                    Submit
                </Button>
            </form>
        </React.Fragment>
    )
}

export default Form
