import { Form, Button } from "react-bootstrap";
import "../styles/Search.css";

const Search = () => {
  return (
    <div className="d-flex w-100">
      <Form.Control
        type="search"
        placeholder="Buscar productos en Tradz..."
        className="me-2 search-bar"
      />
      <Button variant="primary" className="me-2 search-button">
        Buscar
      </Button>
    </div>
  );
};

export default Search;
