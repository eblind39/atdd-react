import React, {
    Dispatch,
    ReactChild,
    ReactFragment,
    ReactPortal,
    SetStateAction,
} from 'react'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import TablePagination from '@mui/material/TablePagination'
import {RepoRoot} from '../../types/githubrepo'
import GithubTable from './github-table'

interface Props {
    isSearchApplied: boolean
    reposList: RepoRoot[]
    children: JSX.Element
}

const Content = ({
    isSearchApplied,
    reposList,
    children,
}: Props): JSX.Element => {
    const renderWithBox = (el: JSX.Element): JSX.Element => (
        <React.Fragment>
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
                {el}
            </Box>
        </React.Fragment>
    )

    if (isSearchApplied && reposList && !!reposList.length) {
        return children
    }

    if (isSearchApplied && reposList && !reposList.length) {
        return renderWithBox(
            <Typography component="label">
                Your search has no results
            </Typography>,
        )
    }

    return renderWithBox(
        <Typography component="label">
            Please provide a search option and click in the search button
        </Typography>,
    )
}

export default Content
