import React from 'react'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import Avatar from '@mui/material/Avatar'
import Link from '@mui/material/Link'
import {RepoRoot} from '../../types/githubrepo'

const tableHeaders = [
    'Repository',
    'Stars',
    'Forks',
    'Open issues',
    'Updated at',
]

interface Props {
    isSearchApplied: boolean
    reposList: RepoRoot[]
}

const Content = ({isSearchApplied, reposList}: Props) => {
    const renderWithBox = (el: JSX.Element) => (
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
    )

    if (isSearchApplied && !!reposList.length) {
        return (
            <Paper>
                <TableContainer>
                    <Table
                        sx={{minWidth: 500}}
                        aria-label="custom pagination table"
                    >
                        <TableHead>
                            <TableRow>
                                {tableHeaders.map(name => (
                                    <TableCell key={name} component="th">
                                        {name}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {reposList.map(
                                ({
                                    id,
                                    name,
                                    stargazers_count: stargazersCount,
                                    forks_count: forksCount,
                                    open_issues_count: openIssuesCount,
                                    updated_at: updatedAt,
                                    html_url: htmlUrl,
                                    owner: {avatar_url: avatarUrl},
                                }) => (
                                    <TableRow key={id}>
                                        <TableCell component="td">
                                            <Avatar
                                                alt={name}
                                                src={avatarUrl}
                                            />
                                            <Link href={htmlUrl}>{name}</Link>
                                        </TableCell>
                                        <TableCell component="td">
                                            {stargazersCount}
                                        </TableCell>
                                        <TableCell component="td">
                                            {forksCount}
                                        </TableCell>
                                        <TableCell component="td">
                                            {openIssuesCount}
                                        </TableCell>
                                        <TableCell component="td">
                                            {updatedAt}
                                        </TableCell>
                                    </TableRow>
                                ),
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[30, 50, 100]}
                    component="div"
                    count={1}
                    rowsPerPage={30}
                    page={0}
                    onPageChange={() => {}}
                    onRowsPerPageChange={() => {}}
                />
            </Paper>
        )
    }

    if (isSearchApplied && !reposList.length) {
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
