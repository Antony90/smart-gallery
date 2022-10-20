import {
    Toolbar,
    Drawer,
    List,
    ListItemButton,
    Divider,
    Collapse,
    IconButton,
    ListItemText,
    ListItemIcon,
    ListItemSecondaryAction,
} from '@mui/material';

import ExpandLess from '@mui/icons-material/ExpandLessRounded';
import ExpandMore from '@mui/icons-material/ExpandMoreRounded';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from './AppBar';
import { connect } from 'react-redux';

const listItemButton = {
    borderRadius: '10px',
    marginX: '12px'
}

const Navigation = ({ drawerWidth, navItems, albums }) => {
    // Whether nested nav list items are expanded
    const [ open, setOpen ] = useState(true);
    let navigate = useNavigate();

    return (
        <>
            <AppBar />
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                    },
                    
                }}
                variant="permanent"
                anchor="left"
            >
                <Toolbar />
                <Divider />
                <List>
                    {navItems.map(({ path, text, icon }) => (
                        <>
                            <ListItemButton
                                sx={listItemButton}
                                key={path} 
                                onClick={ () => navigate(path) }
                            >
                                { icon && <ListItemIcon>{icon}</ListItemIcon> }
                                <ListItemText primary={text} />

                                { /* for the Album list item, add button to
                                    control visibility of nested list items (for specific albums) */ }
                                { text === 'Albums' && 
                                    <ListItemSecondaryAction>
                                        <IconButton 
                                            disableRipple
                                            onClick={(e) => {
                                                // lets you click on the expand button without it going to /albums
                                                e.stopPropagation(); 
                                                setOpen(curr => !curr);
                                            }} 
                                        >
                                            { open ? <ExpandLess /> : <ExpandMore /> }
                                        </IconButton>
                                    </ListItemSecondaryAction> 
                                }
                            </ListItemButton>
                            <Divider variant="middle" component="li" sx={{ my: '3px' }}/>
                        </>
                    ))}
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List disablePadding>
                            {albums.map(({ name, id }) => (
                                <ListItemButton key={id} sx={listItemButton} onClick={() => navigate(`/albums/${id}`)}>
                                    <ListItemText primary={name} inset/>
                                </ListItemButton>
                            ))}
                        </List>
                    </Collapse>
                </List>
            </Drawer>
        </>
    );
};

export default connect(state => ({ albums: state.albums.all }))(Navigation);
