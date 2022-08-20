import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import PhotoList from '../photos/PhotoList'

const AlbumPhotosPage = () => {
  // Get album id from query string parameters
  const { id } = useParams();
  const album = useSelector(state => state.albums.find(album => album.id === id));

  return (
    // When album is null, photos === []
    <PhotoList photos={(album && album.photos) || []} isSelectMode={false} />
  )
}

export default AlbumPhotosPage;