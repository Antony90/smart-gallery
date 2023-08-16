import { Col, Row } from 'antd';
import { useAppSelector } from '../../store'
import { selectPeople } from '../../store/people';
import PersonCard from '../people/PersonCard';

const FacesPage = () => {
  const people = useAppSelector(selectPeople);
  return (
    <Row justify="center" align="top" gutter={60}>
      {Object.values(people).map(person => (
        <Col span={6}>
          <PersonCard {...person} />
        </Col>
      ))}
    </Row>
  )
}

export default FacesPage