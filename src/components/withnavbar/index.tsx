import React, {useState} from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import {createTheme, ThemeProvider} from '@mui/material/styles'
import NavBar from '../../containers/NavBar'
import ButtonAppBar from '../../components/appbar'

interface Props {
    element: JSX.Element
    username?: string
}

const theme = createTheme()

const WithNavBar = ({element, username = ''}: Props): JSX.Element => {
    const [showNavBar, setShowNavBar] = useState<boolean>(true)

    const handleShowNavBar = () => {
        setShowNavBar(!showNavBar)
    }

    return (
        <ThemeProvider theme={theme}>
            <ButtonAppBar
                username={username}
                handleShowNavBar={handleShowNavBar}
            />
            <Grid container component="main" sx={{height: '100vh'}}>
                <CssBaseline />
                {showNavBar && (
                    <Grid
                        item
                        xs={false}
                        sm={2}
                        md={3}
                        sx={{
                            backgroundImage:
                                'url(https://source.unsplash.com/random)',
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
                )}
                <Grid
                    item
                    xs={showNavBar ? 12 : false}
                    sm={showNavBar ? 10 : 12}
                    md={showNavBar ? 9 : 12}
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
}

export default WithNavBar
