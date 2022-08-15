import React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import {createTheme, ThemeProvider} from '@mui/material/styles'
import NavBar from '../../containers/NavBar'

interface Props {
    element: JSX.Element
}

const theme = createTheme()

const WithNavBar = ({element}: Props): JSX.Element => (
    <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{height: '100vh'}}>
            <CssBaseline />
            <Grid
                item
                xs={false}
                sm={2}
                md={3}
                sx={{
                    backgroundImage: 'url(https://source.unsplash.com/random)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: t =>
                        t.palette.mode === 'light'
                            ? t.palette.grey[50]
                            : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
                container
                spacing={0}
                direction="column"
                alignItems="center"
                // justifyContent="center"
                style={{minHeight: '100vh'}}
            >
                <NavBar />
            </Grid>
            <Grid
                item
                xs={12}
                sm={10}
                md={9}
                component={Paper}
                elevation={6}
                square
            >
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Box sx={{mt: 1}}>{element}</Box>
                </Box>
            </Grid>
        </Grid>
    </ThemeProvider>
)

export default WithNavBar
