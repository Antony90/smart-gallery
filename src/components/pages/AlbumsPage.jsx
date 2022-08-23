import { Grid, ImageList, Typography } from '@mui/material'
import { connect } from 'react-redux'
import AlbumTile from '../albums/AlbumTile'

const AlbumsPage = ({ albums, getAlbumPreviewPhoto }) => {
  return (
    <ImageList
      sx={{ m: 0 }}
      variant="standard"
      cols={3}
      gap={10}
      rowHeight='280px'
    >
      { albums.map(album => (
        <AlbumTile previewPhotoUrl={getAlbumPreviewPhoto(album.id)} {...album}/>
      ))}
    </ImageList>
  )
}
const mapStateToProps = state => ({
  albums: state.albums,
  getAlbumPreviewPhoto: albumId => {
    const albumPhotos = state.photos.all.filter(({ albums }) => albums.includes(albumId));
    const photo = albumPhotos[Math.floor((Math.random()*albumPhotos.length))]
    return photo && photo.url || "https://via.placeholder.com/380";
  }
})
export default connect(mapStateToProps)(AlbumsPage);