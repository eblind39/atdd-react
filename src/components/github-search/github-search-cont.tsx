import React from 'react'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableFooter from '@mui/material/TableFooter'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import Avatar from '@mui/material/Avatar'
import Link from '@mui/material/Link'

const tableHeaders = [
    'Repository',
    'Stars',
    'Forks',
    'Open issues',
    'Updated at',
]

interface Props {
    isSearchApplied: boolean
}

const Content = ({isSearchApplied}: Props) =>
    isSearchApplied ? (
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
                        <TableRow>
                            <TableCell component="td">
                                <Avatar alt="test" src="/logo192.png" />
                                <Link href="http://localhost:3000/test">
                                    Test
                                </Link>
                            </TableCell>
                            <TableCell component="td">10</TableCell>
                            <TableCell component="td">5</TableCell>
                            <TableCell component="td">2</TableCell>
                            <TableCell component="td">2022-01-01</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={1}
                rowsPerPage={10}
                page={0}
                onPageChange={() => {}}
                onRowsPerPageChange={() => {}}
            />
        </Paper>
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
                Please provide a search option and click in the search button
            </Typography>
        </Box>
    )

export default Content
