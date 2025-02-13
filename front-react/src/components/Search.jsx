import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const Search = () => {
  return (
    <Container className="my-4">
      <Row className="justify-content-center">
        <Col md={8} className="d-flex">
          <Form.Control
            type="search"
            placeholder="Buscar productos..."
            className="me-2"
          />
          <Button variant="primary" className="me-2">Buscar</Button>
          <Button variant="outline-secondary">Filtros</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Search;