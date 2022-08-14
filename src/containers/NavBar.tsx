import React from 'react'
import {
    MenuList,
    Paper,
    ListItemIcon,
    MenuItem,
    Typography,
} from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import CategoryIcon from '@mui/icons-material/Category'
import SourceIcon from '@mui/icons-material/Source'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import GroupIcon from '@mui/icons-material/Group'
import ColorLensIcon from '@mui/icons-material/ColorLens'
import ImagesearchRollerIcon from '@mui/icons-material/ImagesearchRoller'
import ManageSearchIcon from '@mui/icons-material/ManageSearch'
import LoginIcon from '@mui/icons-material/Login'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import BadgeIcon from '@mui/icons-material/Badge'
import {Link} from 'react-router-dom'

const NavBar: React.FC = (): JSX.Element => {
    return (
        <Paper sx={{width: 230}}>
            <MenuList>
                <MenuItem>
                    <ListItemIcon>
                        <LoginIcon fontSize="small" />
                    </ListItemIcon>
                    <Link to="/login">
                        <Typography variant="inherit">Login</Typography>
                    </Link>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <AdminPanelSettingsIcon fontSize="small" />
                    </ListItemIcon>
                    <Link to="/admin">
                        <Typography variant="inherit">Admin</Typography>
                    </Link>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <BadgeIcon fontSize="small" />
                    </ListItemIcon>
                    <Link to="/employee">
                        <Typography variant="inherit">Employee</Typography>
                    </Link>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <MenuBookIcon fontSize="small" />
                    </ListItemIcon>
                    <Link to="/books">
                        <Typography variant="inherit">Books</Typography>
                    </Link>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <CategoryIcon fontSize="small" />
                    </ListItemIcon>
                    <Link to="/products">
                        <Typography variant="inherit">Products</Typography>
                    </Link>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <ManageSearchIcon fontSize="small" />
                    </ListItemIcon>
                    <Link to="/gitsearch">
                        <Typography variant="inherit">GitSearch</Typography>
                    </Link>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <HomeIcon fontSize="small" />
                    </ListItemIcon>
                    <Link to="/">
                        <Typography variant="inherit">Home</Typography>
                    </Link>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <SourceIcon fontSize="small" />
                    </ListItemIcon>
                    <Link to="/tsbasics">
                        <Typography variant="inherit">TS Basics</Typography>
                    </Link>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <GroupIcon fontSize="small" />
                    </ListItemIcon>
                    <Link to="/users">
                        <Typography variant="inherit">Users</Typography>
                    </Link>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <ColorLensIcon fontSize="small" />
                    </ListItemIcon>
                    <Link to="/creative">
                        <Typography variant="inherit">Creative</Typography>
                    </Link>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <ImagesearchRollerIcon fontSize="small" />
                    </ListItemIcon>
                    <Link to="/sketch">
                        <Typography variant="inherit">Sketch</Typography>
                    </Link>
                </MenuItem>
            </MenuList>
        </Paper>
    )
}

export default NavBar
