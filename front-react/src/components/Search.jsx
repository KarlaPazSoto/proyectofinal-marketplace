import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const Search = () => {
  return (
    <Row className="justify-content-center m-0">
      <Col className="d-flex p-0">
        <Form.Control
          type="search"
          placeholder="Buscar productos..."
          className="me-2"
        />
        <Button variant="primary" className="me-2">Buscar</Button>
        <Button variant="outline-secondary">Filtros</Button>
      </Col>
    </Row>
  );
};

export default Search;