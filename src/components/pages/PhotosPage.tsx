import PhotoCollage from "../photos/PhotoCollage";

import React, { useState } from "react";
// import { createAlbum } from "../../store/actions/albumActions";
import { FileInfo } from "../../client/photos";

import AlbumDialog from "../albums/AlbumDialog";
// import FileBase64 from "react-file-base64";
import { clearSelection, deleteSelectedPhotos, selectAllPhotos, selectNumSelectedPhotos, uploadPhotos } from "../../store/photos";
import { useAppDispatch, useAppSelector } from "../../store";
import { userID } from "../../firebase";


import { Button, FloatButton, Upload, UploadFile } from "antd";
import { CloseOutlined, CloudUploadOutlined, DeleteOutlined, FolderAddOutlined, SelectOutlined } from "@ant-design/icons";
import { createAlbum } from "../../store/albums";
import { toast } from "react-toastify";

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
  const numSelected = useAppSelector(selectNumSelectedPhotos);

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

  const fileUploadInput = React.useRef(null);
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
              badge={{ count: numSelected }}
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
          onClick={() => {
            setSelectMode(mode => !mode);
            dispatch(clearSelection());
          
          }}
        />

      </FloatButton.Group>

      <input
        multiple
        ref={fileUploadInput}
        type="file"
        accept="image/png, image/jpeg"
        style={{display: 'none'}}
        onChange={(e) => {
          const files = e.currentTarget.files;
          console.log(files)
          if (files != null) onClickUpload(files);
        }}
      />
      <FloatButton
        tooltip="Upload"
        type="primary"
        icon={<CloudUploadOutlined />}
        // @ts-ignore
        onClick={(e) => fileUploadInput.current.click()}
      />
      <div style={{ position: 'fixed', right: 94 }}>
      </div>
    </>
  );
};

export default PhotosPage;