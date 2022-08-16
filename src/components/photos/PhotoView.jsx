import { 
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Tooltip,
  CardActions
} from "@mui/material";

import DeleteIcon from '@mui/icons-material/DeleteRounded';
import RightIcon from '@mui/icons-material/ChevronRightRounded';
import LeftIcon from '@mui/icons-material/ChevronLeftRounded';
import DownloadIcon from '@mui/icons-material/CloudDownload';

import { saveAs } from 'file-saver';
import { useFirebase, useFirestore } from 'react-redux-firebase';
import { toast } from 'react-toastify';

const photoNav = {
  position: 'fixed', 
  bottom: '50%',
  background: 'white',
  color: 'black',
  sizeLarge: true
}

// TODO db stores date, size, dims
const PhotoView = ({ url, name, tags, onClickNext, id }) => {
  const storage = useFirebase().storage();
  const db = useFirestore();

  const deletePhoto = async () => {
    await db.collection('photos').doc(id).delete();
    await storage.ref().child(id).delete();
    toast.success(`Deleted photo ${name}.`);
  }

  return (
    <>
      <Card>
        <CardMedia
          component="img"
          height={600}
          image={url}
          />
        <CardContent>
          Name: {name}, Tags: {tags}
        </CardContent>
        <CardActions>
          <Tooltip title='Delete'>
            <IconButton onClick={deletePhoto}><DeleteIcon /></IconButton>
          </Tooltip>
          <Tooltip title='Download Image'>
            <IconButton onClick={() => saveAs(url, 'out.jpg')}><DownloadIcon /></IconButton>
          </Tooltip>
        </CardActions>
      </Card>
      <Tooltip title='Previous Photo' sx={{ ...photoNav, left: '30%' }}>
        <IconButton disableRipple onClick={() => onClickNext(-1)}><LeftIcon /></IconButton>
      </Tooltip>
      <Tooltip title='Next Photo' sx={{ ...photoNav, right: '30%'}} >
        <IconButton disableRipple onClick={() => onClickNext(1)}><RightIcon /></IconButton>
      </Tooltip>
    </>
  )
}

export default PhotoView;