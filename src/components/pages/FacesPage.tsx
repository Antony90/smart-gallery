import { Col, Row } from 'antd';
import { useAppSelector } from '../../store'
import { selectPeople } from '../../store/people';
import PersonCard from '../people/PersonCard';
import { Masonry } from 'react-masonry'


const cardWidth = 400;
const FacesPage = () => {
  const people = useAppSelector(selectPeople);
  return (
    <Masonry>
      {Object.values(people).map(person => (
        <div style={{ width: '25%', paddingBottom: '20px' }}>
          <PersonCard {...person} width={cardWidth} />
        </div>
      ))}
    </Masonry>
  )
}

export default FacesPage