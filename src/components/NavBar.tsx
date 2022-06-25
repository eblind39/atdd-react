import React from "react";
import { 
    MenuList, 
    Paper, 
    ListItemIcon, 
    MenuItem, 
    Typography 
} from '@mui/material';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import { Link } from "react-router-dom";

const NavBar: React.FC = (): JSX.Element => {
    return (
        <Paper sx={{ width: 230 }}>
        <MenuList>
            <MenuItem>
                <ListItemIcon>
                    <SendIcon fontSize="small" />
                </ListItemIcon>
                <Link to="/">
                    <Typography variant="inherit">Home</Typography>
                </Link>
            </MenuItem>
            <MenuItem>
                <ListItemIcon>
                    <PriorityHighIcon fontSize="small" />
                </ListItemIcon>
                <Link to="/tsbasics">
                    <Typography variant="inherit">TS Basics</Typography>
                </Link>
            </MenuItem>
            <MenuItem>
                <ListItemIcon>
                    <DraftsIcon fontSize="small" />
                </ListItemIcon>
                <Link to="/users">
                    <Typography variant="inherit">Users</Typography>
                </Link>
            </MenuItem>
        </MenuList>
        </Paper>
    );
}

export default NavBar;