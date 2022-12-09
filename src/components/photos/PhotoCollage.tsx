import React, { useState } from "react";

import PhotoTile from "./PhotoTile";
import PhotoView from "./PhotoView";
import { useAppDispatch, useAppSelector } from "../../store";
import { selectPhoto, selectSelectedPhotos } from "../../store/photos";
import { Photo, PhotosMap } from "../../models/Photo";
import _Gallery, { GalleryI, RenderImageProps } from 'react-photo-gallery';
import "react-image-lightbox/style.css";
import { Button, Card, Result, Typography } from "antd";
import { BulbOutlined } from "@ant-design/icons";

interface PhotoListProps {
  photos: PhotosMap;
  isSelectMode: boolean;
}

const Gallery = _Gallery as unknown as GalleryI<Photo & { selected: boolean }>
const { Text } = Typography;
const PhotoCollage: React.FC<PhotoListProps> = ({ photos, isSelectMode }) => {
  const selectedPhotoIDs = useAppSelector(selectSelectedPhotos);
  const dispatch = useAppDispatch();

  // Use an array of photo IDs to navigate gallery by 
  // increasing/decreasing the current photo index by 1
  const photoIDs = Object.keys(photos);
  const [photoIndex, setPhotoIdx] = useState(-1); // Initially hides photo modal
  // const open = photoIndex !== -1; // Whether the photo view modal is open

  // Make object writeable using spread operator
  const photoArray = Object.entries(photos).map(([id, photo]) => (
    { 
      selected: selectedPhotoIDs.includes(id),
      ...photo
    }  
  ));

  // If not in select mode, open photo modal by setting photo index to a non-negative number
  const onClickPhoto = (index: number) => {
    if (isSelectMode) {
      dispatch(selectPhoto(photoIDs[index]));
    } else {
      setPhotoIdx(index);
    }
  }

  // const photoTiles = Object.entries(photos).map(([id, photo], i) => (
  //   <PhotoTile
  //     id={id}
  //     key={id}
  //     src={photo.src}
  //     imgName={photo.name}
  //     tags={photo.tags}
  //     onClick={onClickPhoto(i)}
  //     selected={selectedPhotoIDs.find(photoID => photoID === id)}
  //   />
  // ));

  // Photo modal, appears when photo is clicked and not in select mode
  // const photoView = open ? (
  //   <PhotoView
  //     photo={photos[photoIDs[photoIndex]]}
  //     open={open}
  //     // Update current image index, navigates to next/previous photo
  //     onClickNext={(offset: number) => {
  //       // TODO: store photo IDs in photo store so index can be incremented
  //       // and next photo can be selected
  //       const n = photoIDs.length;
  //       setPhotoIdx(idx => ((idx + offset % n) + n) % n)
  //     }}
  //     onClose={() => setPhotoIdx(-1)}
  //   />
  // ) : (<></>)
  
  return (
    <>
      {/* {photoView} */}
      {photoArray.length > 0 ? 
        <Gallery
          photos={photoArray}
          renderImage={(props) => <PhotoTile {...props} />}
          margin={6}
          onClick={(e, photo) => onClickPhoto(photo.index)}
        /> 
      : <Result
          title="No Photos"
          subTitle="Upload a photo to your gallery."
          icon={<BulbOutlined />}
          extra={[
            <Button type="primary" key="upload">
              Upload Photos
            </Button>,
          ]}
        />
      }
    </>
  );
};


// const mapStateToProps = (state, props) => {
//     const photos = props.photos;
//     const filter = state.filter.toLowerCase();

//     const filteredPhotos = filter
//     ? photos.filter(({ name, tags }) => {
//         const includesName = name.toLowerCase().includes(filter);
//         const includesAnyTag = tags.some((tag) =>
//         tag.toLowerCase().includes(filter)
//         );
//         return includesName || includesAnyTag;
//     })
//     : photos;

//     return {
//         photos: filteredPhotos,
//         selectedPhotos: state.photos.selected
//     };
// };


export default PhotoCollage;
