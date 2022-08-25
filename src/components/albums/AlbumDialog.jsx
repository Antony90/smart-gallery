import {
    Dialog,
    DialogContent,
    DialogActions,
    Button,
    DialogTitle,
    TextField,
} from '@mui/material'
import { useState } from 'react';

const AlbumDialog = ({createAlbum, open, onClose}) => {
    const [name, setName] = useState("");
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Create Album</DialogTitle>
            <DialogContent>
                <TextField
                    fullWidth
                    label="Album Name"
                    autoFocus
                    onChange={(e) => setName(e.target.value)}
                    sx={{ mt: '10px' }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button
                    onClick={() => {
                        if (name) {
                            createAlbum(name);
                            onClose();
                        }
                    }}
                >
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AlbumDialog;