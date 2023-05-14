import { useState } from 'react'
import { auth } from "../lib/firebase";
import { signOut } from "firebase/auth";
import Button from '@mui/material/Button'
import Popover from '@mui/material/Popover'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

export const AccountButton = () => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div>
        <IconButton
            color='inherit'
            edge='end'
            aria-describedby={id} 
            onClick={handleClick}
        >
            <AccountCircleIcon fontSize='large'/>
        </IconButton>
        {/* <Button aria-describedby={id} variant="contained" onClick={handleClick}>
            Open Popover
        </Button> */}
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
        >
            <List>
                {['Manage Account', 'Appearance', 'Sign Out'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton onClick={text === 'Sign Out' ? () => signOut(auth) : () => {}}>
                            <ListItemIcon>
                                {[<ManageAccountsIcon />, <SettingsIcon />, <LogoutIcon />][index]}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            {/* <Typography sx={{ p: 2 }}>The content of the Popover.</Typography> */}
        </Popover>
        </div>
    );
}