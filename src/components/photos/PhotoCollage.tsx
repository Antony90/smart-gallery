import React, { useEffect, useState } from "react";
import RPGallery, { GalleryI, PhotoProps, RenderImageProps } from 'react-photo-gallery';
import "./PhotoCollage.css";

import PhotoTile from "./PhotoTile";
import PhotoView from "./PhotoView";

import { Button, Card, Col, Descriptions, Image, Modal, Result, Row, Space, Statistic, Typography } from "antd";
import { BulbOutlined, ColumnHeightOutlined, ColumnWidthOutlined, DownloadOutlined, InfoCircleFilled, InfoCircleOutlined, LinkOutlined, RotateLeftOutlined, RotateRightOutlined, SwapOutlined, ZoomInOutlined, ZoomOutOutlined } from "@ant-design/icons";

import { useAppDispatch, useAppSelector } from "../../store";
import { selectPhoto, selectSelectedPhotos } from "../../store/photos";

import { Photo, PhotosMap } from "../../models/Photo";

interface PhotoListProps {
  photos: PhotosMap;
  isSelectMode: boolean;
}

const Gallery = RPGallery as unknown as GalleryI<Photo & { selected: boolean }>
type GalleryPhoto = {
  index: number;
  next: PhotoProps<Photo & {
    selected: boolean;
  }> | null;
  photo: PhotoProps<Photo & {
    selected: boolean;
  }>;
  previous: PhotoProps<Photo & {
    selected: boolean;
  }> | null;
}


const PhotoCollage: React.FC<PhotoListProps> = ({ photos, isSelectMode }) => {
  const selectedPhotoIDs = useAppSelector(selectSelectedPhotos);
  const dispatch = useAppDispatch();

  // Use an array of photo IDs to navigate gallery by 
  // increasing/decreasing the current photo index by 1
  const photoIDs = Object.keys(photos);
  const [modalIdx, setModalView] = useState(-1);
  // const open = photoIndex !== -1; // Whether the photo view modal is open

  // Make object writeable using spread operator
  const photoArray = Object.entries(photos).map(([id, photo]) => (
    { 
      selected: selectedPhotoIDs.includes(id),
      ...photo
    }  
  ));

  const [previewIdx, setPreviewIdx] = useState(-1);
  
  
  // If not in select mode, open photo modal by setting photo index to a non-negative number
  const onClickPhoto = (index: number) => {
    if (isSelectMode) {
      dispatch(selectPhoto(photoIDs[index]));
    } else {
      // toggle preview
      setPreviewIdx(index);
    }
  }

  const onDownload = (photo: Photo) => {
    fetch(photo.src)
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.download = photo.name + '.png';
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(url);
        link.remove();
      });
  };


  const renderImage = (props: RenderImageProps<Photo & { selected: boolean; }>) => (
    <PhotoTile {...props} handleInfoClick={() => setModalView(props.index)} />
  );


  const previewPhoto = photoArray[previewIdx];
  const modalPhoto = photoArray[modalIdx];
  
  return (
    <>
      <Image.PreviewGroup preview={{
        visible: previewIdx >= 0,
        current: previewIdx,
        onVisibleChange: () => {
          setPreviewIdx(-1);
        },
        onChange: (current) => {
          setPreviewIdx(current);
        },
        toolbarRender: (
          _,
          {
            transform: { scale },
            actions: { onFlipY, onFlipX, onRotateLeft, onRotateRight, onZoomOut, onZoomIn },
          },
        ) => (
          <Space size={12} className="toolbar-wrapper">
            <DownloadOutlined onClick={() => onDownload(previewPhoto)} />
            <SwapOutlined rotate={90} onClick={onFlipY} />
            <SwapOutlined onClick={onFlipX} />
            <RotateLeftOutlined onClick={onRotateLeft} />
            <RotateRightOutlined onClick={onRotateRight} />
            <ZoomOutOutlined disabled={scale === 1} onClick={onZoomOut} />
            <ZoomInOutlined disabled={scale === 50} onClick={onZoomIn} />
          </Space>)
      }}>
        {photoArray.map((photo, i) => {
          return (
            <Image
              key={i}
              style={{ display: 'none' }}
              src={photo.src}
              preview={{
                visible: (previewIdx == i),
                src: photo.src
              }}
            />
          )
        })}
      </Image.PreviewGroup>

      {photoArray.length > 0 ? (
        <div style={{ marginTop: -17 }}>
          <Gallery
            photos={photoArray}
            renderImage={renderImage}
            margin={8}
            targetRowHeight={200}
            onClick={(_: any, photo: GalleryPhoto) => onClickPhoto(photo.index)}
          /> 
        </div>
      ) : <Result
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
      <Modal 
        open={modalIdx >= 0}
        title={<><InfoCircleOutlined style={{ paddingRight: 6 }}/> <span>Details</span></>}
        onCancel={() => setModalView(-1)}
        closable={false}
        cancelText={"Close"}
        okText={"Download"}
        okType="primary"
        width={700}
        // icon={}
      >
        {modalPhoto && 
          <Row gutter={24}>
            <Col span={8}>
              <Statistic title="Filename" value={modalPhoto.name}/>
            </Col>
            <Col span={16}>
              <Statistic title="Tags" value={modalPhoto.tags.join(", ")}/>
            </Col>
            <Col span={8}>
              <Statistic title="Height" value={modalPhoto.height} suffix="px" prefix={<ColumnHeightOutlined/>}/>
            </Col>
            <Col span={8}>
              <Statistic title="Width" value={modalPhoto.width} suffix="px" prefix={<ColumnWidthOutlined/>}/>
            </Col>
            <Col span={24}>
              {/* <Button> */}
              <Statistic title="URL" valueStyle={{ display: 'none'}} value={""}/>
              <LinkOutlined style={{ paddingRight: 6 }}/>
              <a href={modalPhoto.src}>{modalPhoto.src}</a>
              {/* </Button> */}
            </Col>
          </Row>
      }
      </Modal>
    </>
  );
};


export default PhotoCollage;


