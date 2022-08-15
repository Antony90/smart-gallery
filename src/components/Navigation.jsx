import {
    CssBaseline,
    AppBar,
    Toolbar,
    Typography,
    Drawer,
    List,
    ListItemButton,
    Divider,
    Collapse,
    IconButton,
    ListItemText,
    ListItemIcon,
    ListItemSecondaryAction

} from '@mui/material';

import ExpandLess from '@mui/icons-material/ExpandLessRounded';
import ExpandMore from '@mui/icons-material/ExpandMoreRounded';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Navigation = ({ drawerWidth, navItems, nestedItems }) => {
    // Whether nested nav list items are expanded
    const [ open, setOpen ] = useState(true);
    let navigate = useNavigate();

    return (
        <>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{ zIndex: 1300 }}
            >
                <Toolbar>
                    <Typography variant="h6" component="div">
                        Smart Gallery
                    </Typography>
                </Toolbar>
            </AppBar>

            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box"
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <Toolbar />
                <Divider />
                <List>
                    {navItems.map(({ path, text, icon }) => (
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
