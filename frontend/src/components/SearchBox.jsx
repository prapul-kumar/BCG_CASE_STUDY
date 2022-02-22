import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

export default function SearchBox({
  search_ref,
  setsearchValue,
  handelPageClick,
  searchValue,
  setPageLength,
}) {
  const handelClick = () => {
    if (search_ref.current.value !== searchValue) {
      handelPageClick(1);
      setsearchValue(search_ref.current.value);
    }
  };

  const handelClear = () => {
    search_ref.current.value = "";
    setsearchValue("");
  };
  return (
    <Row>
      <Col lg={1}>
        <Form.Select
          aria-label="Page Length"
          onChange={(e) => setPageLength(e.target.value)}
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
          <option value="200">200</option>
        </Form.Select>
      </Col>
      <Col lg={4}></Col>
      <Col lg={2} style={{ textAlign: "center", fontSize: "20px" }}>
        <span>
          <b>POLICY DETAILS</b>
        </span>
      </Col>
      <Col lg={2}></Col>
      <Col lg={3}>
        <InputGroup>
          <Form.Control
            placeholder="Search for Policy ID or Customer ID"
            ref={search_ref}
          />

          <button
            type="button"
            className="btn "
            onClick={handelClick}
            style={{ backgroundColor: "#00be71" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#ffffff"
              className="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handelClear}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-x"
              viewBox="0 0 16 16"
            >
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
          </button>
        </InputGroup>
      </Col>
      <Col lg={3}></Col>
    </Row>
  );
}
