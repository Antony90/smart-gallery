import React from 'react'
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom'
import PhotoList from '../photos/PhotoList'

const AlbumPhotosPage = ({ albumPhotos }) => {
  // Get album id from query string parameters
  const { id } = useParams();
  return <PhotoList photos={albumPhotos(id)} isSelectMode={false} />
  
}

const mapStateToProps = state => ({
  albumPhotos: albumId => {
    return state.photos.all.filter(({ albums }) => albums.includes(albumId));
  }
})

export default connect(mapStateToProps)(AlbumPhotosPage);