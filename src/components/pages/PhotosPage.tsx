import PhotoCollage from "../photos/PhotoCollage";

import { FC, useState } from "react";
// import { createAlbum } from "../../store/actions/albumActions";
import { FileInfo, handleUpload } from "../../client/photos";

import AlbumDialog from "../albums/AlbumDialog";
// import FileBase64 from "react-file-base64";
import { clearSelection, deleteSelectedPhotos, selectAllPhotos, uploadPhotos } from "../../store/photos";
import { useAppDispatch, useAppSelector } from "../../store";
import { userID } from "../../firebase";


import { Button, FloatButton, Upload, UploadFile } from "antd";
import { CloseOutlined, CloudUploadOutlined, DeleteOutlined, FolderAddOutlined, SelectOutlined } from "@ant-design/icons";
import { createAlbum } from "../../store/albums";

type FloatButtonGroupProps = {
  selectMode: boolean,
  handleSelectModeOff: () => void,
  handleOpenAlbumDialog: () => void,
  deleteSelectedPhotos: () => void,
  toggleSelectMode: () => void,
}


const PhotosPage = () => {
  const [selectMode, setSelectMode] = useState(false);
  const [openAlbumDialog, setOpenAlbumDialog] = useState(false);
  const dispatch = useAppDispatch();
  const photos = useAppSelector(selectAllPhotos);

  const createAlbum_ = (name: string) => {
    dispatch(createAlbum({ name, userID }));
    dispatch(clearSelection);
  }
  const getBase64 = (file: File) => new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result?.toString() || '');
    reader.onerror = err => reject(err);
  });

  const getImgDims = (file: File) => new Promise<{ width: number, height: number }>((resolve, reject) => {
    // Get image width and height before uploading
    const img = new Image();
    img.src = window.URL.createObjectURL(file);
    img.onload = () => {
      resolve({ width: img.width, height: img.height });
    }
    img.onerror = reject;
  })

  const onClickUpload = async (files: FileList) => {
    const photos = await Promise.all(Array(files.length).fill(0).map(async (_, i) => {
      const file = files.item(i);
      if (file === null) {
        throw new Error("Expected non-null file in submitted upload files");
      }
      const base64 = await getBase64(file);
      console.log(base64);
      return {
        name: file.name,
        base64,
        ...(await getImgDims(file))
      } as FileInfo;
    }))

    console.log(photos);

    dispatch(uploadPhotos({ photos, userID }))
  };

  return (
    <>
      <AlbumDialog
        createAlbum={createAlbum}
        open={openAlbumDialog}
        onClose={() => setOpenAlbumDialog(false)}
      />
      <PhotoCollage photos={photos} isSelectMode={selectMode} />
      <FloatButton.Group
        shape={selectMode ? "square" : "circle"}
        style={{ right: 24, bottom: 108 }}
      >
        {selectMode &&
          <>
            <FloatButton
              tooltip="Delete"
              icon={<DeleteOutlined />}
              onClick={() => {
                dispatch(deleteSelectedPhotos(userID));
                setSelectMode(false);
                dispatch(clearSelection());
              }}
            />

            <FloatButton
              tooltip="New album"
              icon={<FolderAddOutlined />}
              onClick={() => {
                setOpenAlbumDialog(true);
                setSelectMode(false);
              }}
            />
          </>}

        <FloatButton
          icon={!selectMode ? <SelectOutlined /> : <CloseOutlined />}
          tooltip={selectMode ? "Cancel" : "Select"}
          onClick={() => setSelectMode(mode => !mode)}
        />

      </FloatButton.Group>

      <FloatButton
        tooltip="Upload"
        icon={<CloudUploadOutlined />}
      />
      <div style={{ position: 'fixed', right: 94 }}>
        {/* <Button
          tye="primary"
          icon={<CloudUploadOutlined />}
          onClick={(e) => onClickUpload()}
          style={{ marginTop: 16 }}
        />p */}
        <input
          multiple
          type="file"
          accept="image/png, image/jpeg"
          onChange={(e) => {
            const files = e.currentTarget.files;
            console.log(files)
            if (files != null) onClickUpload(files);
          }}
        />
      </div>
    </>
  );
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
