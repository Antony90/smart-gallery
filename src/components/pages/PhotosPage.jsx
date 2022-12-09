import PhotoCollage from "../photos/PhotoCollage";

import { useState } from "react";
import { createAlbum } from "../../store/actions/albumActions";
import { handleUpload } from "../../client/photos";

import AlbumDialog from "../albums/AlbumDialog";
import FileBase64 from "react-file-base64";
import { selectAllPhotos, uploadPhotos } from "../../store/photos";
import { useAppDispatch, useAppSelector } from "../../store";
import { userID } from "../../firebase";


import { FloatButton } from "antd";
import { CloudUploadOutlined, DeleteOutlined, FolderAddOutlined, SelectOutlined } from "@ant-design/icons";



const PhotosPage = ({ createAlbum, deleteSelectedPhotos }) => {
  const [selectMode, setSelectMode] = useState(false);
  const [openAlbumDialog, setOpenAlbumDialog] = useState(false);
  const photos = useAppSelector(selectAllPhotos);
  const dispatch = useAppDispatch();

  const onClickUpload = async (photos) => {
    await Promise.all(photos.map((photo, idx) => (
      new Promise((resolve, reject) => {

        // Get image width and height before uploading
        const img = new Image();
        img.src = window.URL.createObjectURL(photo.file);
        img.onload = (e) => {
          photos[idx] = { ...photo, width: img.width, height: img.height };
          resolve();
        }
        img.onerror = reject;
      })
    )));
    dispatch(uploadPhotos({ photos, userID }));
  };

  const FloatButtonGroup = () => (
    <FloatButton.Group
      shape="square"
      style={{ right: 24 }}
    >


      <FloatButton
        tooltip="Delete"
        icon={<FolderAddOutlined />}
        onClick={() => {
          deleteSelectedPhotos();
          setSelectMode(false);
        }}
      />

      <FloatButton
        tooltip="New album"
        icon={<DeleteOutlined />}
        onClick={() => {
          setOpenAlbumDialog(true);
          setSelectMode(false);
        }}
      />

      <FloatButton
        icon={<SelectOutlined />}
        tooltip={selectMode ? "Cancel" : "Select"}
        onClick={() => setSelectMode(m => !m)}
      />

      <FloatButton
        tolltip="Upload"
        icon={<CloudUploadOutlined />}
        component='label'
        sx={{ width: 'fit-content' }}
      >
        <div style={{ display: 'none' }}>
          <FileBase64 multiple={true} onDone={onClickUpload} />
        </div>
      </FloatButton>
    </FloatButton.Group>
  );

  return (<>
    <AlbumDialog
      createAlbum={createAlbum}
      open={openAlbumDialog}
      onClose={() => setOpenAlbumDialog(false)}
    />
    <>
      <PhotoCollage photos={photos} isSelectMode={selectMode} />
      <FloatButtonGroup />
    </>
  </>);
};



// const mapStateToProps = (state) => {
//     return {
//         photos: state.photos.all,
//     };
// };

// const mapDispatchToProps = (dispatch) => ({
//     createAlbum: (albumName) => {
//         dispatch(createAlbum(albumName));
//         dispatch(clearPhotoSelection);
//     },
//     deleteSelectedPhotos: () => dispatch(deleteSelectedPhotos()),
//     uploadPhotos: photos => dispatch(uploadPhotos(photos))
// });

export default PhotosPage;

// connect(state => ({ photos: state.firestore.ordered.photos })),
// firestoreConnect(state => {
//     // console.log(state);
//     // const where = (state.filterSort && [
//     //     ['name', '>=', state.filterSort.filter],
//     //     [state.filterSort.filter, 'in', 'tags']
//     // ]);
//     return [{ collection: 'photos', orderBy: ['createdAt', 'desc'] }]
// }),
