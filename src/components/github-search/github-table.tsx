import React from 'react'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
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
    reposList: RepoRoot[]
}

const GithubTable = ({reposList}: Props) => (
    <TableContainer sx={{maxHeight: 440}}>
        <Table stickyHeader sx={{minWidth: 500}} aria-label="Github table">
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
                                <Avatar alt={name} src={avatarUrl} />
                                <Link href={htmlUrl}>{name}</Link>
                            </TableCell>
                            <TableCell component="td">
                                {stargazersCount}
                            </TableCell>
                            <TableCell component="td">{forksCount}</TableCell>
                            <TableCell component="td">
                                {openIssuesCount}
                            </TableCell>
                            <TableCell component="td">{updatedAt}</TableCell>
                        </TableRow>
                    ),
                )}
            </TableBody>
        </Table>
    </TableContainer>
)

export default GithubTable
