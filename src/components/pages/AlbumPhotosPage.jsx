import { DeleteForeverRounded } from '@mui/icons-material';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom'
import { deleteAlbum } from '../../store/actions/albumActions';
import ActionButton from '../misc/ActionButton';
import ActionButtonStack from '../misc/ActionButtonStack';
import PhotoList from '../photos/PhotoList'

const AlbumPhotosPage = ({ albumPhotos, deleteAlbum }) => {
  // Get album id from query string parameters
  const { id } = useParams();

  const DeleteAlbumButton = () => (
    <ActionButton
      label='Delete album'
      icon={<DeleteForeverRounded />}
      onClick={() => deleteAlbum(id)}  
    />
  )
  
  return (
    <>
      <PhotoList photos={albumPhotos(id)} isSelectMode={false} />
      <ActionButtonStack>
        <DeleteAlbumButton/>
      </ActionButtonStack>
    </>
  )
  
}

const mapStateToProps = state => ({
  albumPhotos: albumId => {
    return state.photos.all.filter(({ albums }) => albums.includes(albumId));
  }
})

const mapDispatchToProps = dispatch => ({
  deleteAlbum: id => dispatch(deleteAlbum(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(AlbumPhotosPage);