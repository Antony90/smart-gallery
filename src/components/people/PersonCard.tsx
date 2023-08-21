import pluralize from "pluralize";

import {
  Button,
  Card,
  Image,
  Tooltip,
  Typography,
} from "antd";
import {
  DeleteOutlined,
  ExpandAltOutlined,
  FolderOpenFilled,
  InfoOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

import { Person } from "../../models/Person";
import { useAppSelector } from "../../store";
import { selectAllPhotos } from "../../store/photos";
import Gallery from "react-photo-gallery";
import { FolderOpenRounded, QuestionMarkRounded } from "@mui/icons-material";

const PersonCard = ({ name, photoIDs, width }: Person & { width: number }) => {
  const allPhotos = useAppSelector(selectAllPhotos);
  const photos = photoIDs.map((id) => allPhotos[id]);

  let previewPhotos = photos;
  if (photos.length > 4) {
    previewPhotos = photos.slice(0, 5);
  }
  previewPhotos = previewPhotos.map((photo) => ({ ...photo }));

  return (
    <Card
      hoverable
      bordered
      style={{ width: width + 'px' }}
      actions={[
        <Tooltip title="Open">
          <Button type="text" icon={<ExpandAltOutlined key="open"/>} />
        </Tooltip>,
        <Tooltip title="Add photo">
          <Button type="text" icon={<PlusOutlined key="add" />} />
        </Tooltip>,
        <Tooltip title="About">
          <Button type="text" icon={<InfoOutlined key="info" />} />
        </Tooltip>,
        <Tooltip title="Delete person relation">
          <Button type="text" icon={<DeleteOutlined key="delete" color="red" />} danger />
        </Tooltip>,
      ]}
    >
      <Gallery
        photos={previewPhotos}
        targetRowHeight={100}
        renderImage={({ photo }) => {
          return (
            <Image
              width={photo.width}
              height={photo.height}
              src={photo.src}
              style={{ objectFit: "cover", padding: 5, borderRadius: 15 }}
            />
          );
        }}
      />
      <br />
      <Card.Meta
        title={<Typography.Text editable>{name}</Typography.Text>}
        description={`${photoIDs.length} ${pluralize(
          "photo",
          photoIDs.length
        )}`}
      />
    </Card>
  );
};

export default PersonCard;
