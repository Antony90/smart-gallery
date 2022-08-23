import { 
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Tooltip,
  CardActions,
  Chip,
  Typography,
  Stack,
  Divider,
  TextField,
  Dialog
} from "@mui/material";

import DeleteIcon from '@mui/icons-material/DeleteRounded';
import RightIcon from '@mui/icons-material/ChevronRightRounded';
import LeftIcon from '@mui/icons-material/ChevronLeftRounded';
import DownloadIcon from '@mui/icons-material/CloudDownload';

import { saveAs } from 'file-saver';
import { useDispatch } from 'react-redux';
import { addPhotoTag, deletePhoto, deletePhotoTag } from "../../store/actions/photoActions";
import { Box } from "@mui/system";

const photoNav = {
  position: 'fixed', 
  bottom: '50%',
  background: 'white',
  color: 'black',
  sizeLarge: true
}

// TODO db stores date, size, dims
const PhotoView = ({ url, name, tags, id, open, onClickNext, onClose }) => {

  const dispatch = useDispatch();
  const onClickDelete = () => dispatch(deletePhoto(id));
  const onClickDeleteTag = (tag) => dispatch(deletePhotoTag(id, tag));
  const onAddTag = (tag) => dispatch(addPhotoTag(id, tag));


  return (
    <Dialog open={open} onClose={onClose}>
      <>
        <Card>
          <CardMedia
            component="img"
            height={500}
            image={url}
            />
          <CardContent sx={{ pb: 0 }}>
            <Stack direction='row' spacing={2} divider={<Divider orientation="vertical" flexItem />} >
              <Box sx={{ width: '46%'}}>
                <Typography variant='h6'>Name</Typography>
                <Typography variant='subtitle'>{name}</Typography> 
              </Box>

              <Stack direction="row" spacing={0} flexWrap='wrap' >
                { tags.map(tag => 
                  <Chip sx={{ mr: 1, mb: '4px' }} key={tag} label={tag} onDelete={() => onClickDeleteTag(tag)} variant='outlined' color='secondary' />) }
              </Stack>
            </Stack>
          </CardContent>
          <CardActions sx={{ display: 'block' }}>
            <Tooltip title='Delete'>
              <IconButton onClick={onClickDelete}><DeleteIcon /></IconButton>
            </Tooltip>
            <Tooltip title='Download Image'>
              <IconButton onClick={() => saveAs(url, 'out.jpg')}><DownloadIcon /></IconButton>
            </Tooltip>
            <TextField 
              variant='outlined' 
              size='small' 
              label='Add tag' 
              sx={{ float: 'right', mr: '5px', mb: `10px` }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.target.value) {
                  onAddTag(e.target.value);
                  e.target.value = ''
                }
              }}
            />
          </CardActions>
        </Card>

        <Tooltip title='Previous Photo' sx={{ ...photoNav, left: '30%' }}>
          <IconButton disableRipple onClick={() => onClickNext(-1)}><LeftIcon /></IconButton>
        </Tooltip>
        <Tooltip title='Next Photo' sx={{ ...photoNav, right: '30%'}} >
          <IconButton disableRipple onClick={() => onClickNext(1)}><RightIcon /></IconButton>
        </Tooltip>
      </>
    </Dialog>
  )
}

export default PhotoView;