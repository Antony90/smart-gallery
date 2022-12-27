import { Col, Row } from 'antd';
import { useAppSelector } from '../../store'
import { selectPeople } from '../../store/people';
import PersonCard from '../people/PersonCard';

const FacesPage = () => {
  const people = useAppSelector(selectPeople);

  return (
    <Row justify="space-around">
      {Object.values(people).map(person => (
        <Col span={8}>
          <PersonCard {...person} />
        </Col>
      ))}
    </Row>
  )
}

export default FacesPage