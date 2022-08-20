import { Grid, ImageList, Typography } from '@mui/material'
import { connect } from 'react-redux'
import AlbumTile from '../albums/AlbumTile'

const AlbumsPage = ({ albums }) => {
  return (
    <ImageList
      sx={{ m: 0 }}
      variant="standard"
      cols={3}
      gap={10}
    >
      { albums.map(album => (
        <AlbumTile {...album}/>
      ))}
    </ImageList>
  )
}
const mapStateToProps = state => ({
  albums: state.albums
})
export default connect(mapStateToProps)(AlbumsPage);