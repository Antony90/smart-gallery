import pluralize from 'pluralize'

import { Avatar, Card, Tooltip, Typography } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons';

import { Person } from '../../models/Person'
import { useAppSelector } from '../../store';
import { selectAllPhotos } from '../../store/photos';

const { Text } = Typography;

const PersonCard = ({ name, photoIDs }: Person) => {
  const photos = useAppSelector(selectAllPhotos);
  // Pick a random photo as the avatar
  const rndPhotoID = photoIDs[Math.floor(Math.random()*photoIDs.length)];
  const avatarURL = photos[rndPhotoID].src;

  return (
    <Card 
      title={name}
      extra={<Tooltip title='Photos with similar faces'><QuestionCircleOutlined /></Tooltip>}
      hoverable
    >
      <Avatar src={avatarURL} />
      <Text editable>{`${photoIDs.length} ${pluralize('photo',  photoIDs.length)}`}</Text>
    </Card>
  )
}

export default PersonCard