import {
    CssBaseline,
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


const Navigation = ({ drawerWidth, navItems, nestedItems }) => {
    // Whether nested nav list items are expanded
    const [ open, setOpen ] = useState(true);
    let navigate = useNavigate();

    return (
        <>
            <CssBaseline />
            <AppBar />
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                        borderRight: '1px solid red'//TODO use theme primary
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
                                key={path} 
                                onClick={ () => navigate(path) }
                            >
                                { icon && <ListItemIcon>{icon}</ListItemIcon> }
                                <ListItemText primary={text} />

                                { /* for the Album list item, add button to
                                    control visibility of nested list items (for specific albums) */ }
                                { text === 'Albums' && 
                                    <ListItemSecondaryAction>
                                        <IconButton onClick={(e) => {
                                            // lets you click on the expand button without it going to /albums
                                            e.stopPropagation(); 
                                            setOpen(curr => !curr);
                                        }} >
                                            { open ? <ExpandLess /> : <ExpandMore /> }
                                        </IconButton>
                                    </ListItemSecondaryAction> 
                                }
                            </ListItemButton>
                            <Divider variant="middle" component="li" sx={{ my: '3px' }}/>
                        </>
                    ))}
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {nestedItems.map(({ text, path }) => (
                                <ListItemButton key={path} sx={{ paddingLeft: 4 }} onClick={() => navigate(path)}>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            ))}
                        </List>
                    </Collapse>
                </List>
            </Drawer>
        </>
    );
};

export default Navigation;
