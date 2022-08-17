import { uploadPhotos } from '../store/actions/photoActions';
import { useDispatch } from 'react-redux';
import FileBase64 from "react-file-base64";
import "firebase/compat/storage";


import { Fab } from '@mui/material';
import UploadIcon from '@mui/icons-material/CloudUpload';

const UploadImages = ({ style }) => {
    const dispatch = useDispatch();
    const onSelectPhotos = photos => dispatch(uploadPhotos(photos));

    return (
        <Fab variant="extended" size="large" color="primary" component='label' sx={style}>
            <div style={{ display: 'none' }}>
                <FileBase64 multiple={true} onDone={onSelectPhotos} />
            </div>
            <UploadIcon sx={{ mr: '9px' }}/>
            Upload
        </Fab>
    );
}

export default UploadImages;