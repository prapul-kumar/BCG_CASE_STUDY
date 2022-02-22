import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";

export default function Popup(props) {
  const [displayError, setDisplayError] = useState(false);
  useState();
  function validateInput() {
    if (
      props.newPremiumRef.current.value < 0 ||
      props.newPremiumRef.current.value > 1000000
    ) {
      setDisplayError(true);
    } else {
      setDisplayError(false);
    }
  }
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Update Premium
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <b>Policy ID: {props.data && props.data.policy_id}</b>
        </p>
        <p>
          <b>Current Premium: {props.data && props.data.premium}</b>
        </p>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>
              <b>New Premium</b>
            </Form.Label>
            <Form.Control
              type="number"
              ref={props.newPremiumRef}
              placeholder="Enter new premium"
              onInput={validateInput}
            />
            {displayError ? (
              <span style={{ color: "red" }}>
                Premium should be in range 0 to 1000000
              </span>
            ) : (
              ""
            )}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        {displayError ? (
          <Button
            size="sm"
            variant="success"
            onClick={() => props.handelUpdateClick(props.data.policy_id)}
            disabled
          >
            Update
          </Button>
        ) : (
          <Button
            size="sm"
            variant="success"
            onClick={() => props.handelUpdateClick(props.data.policy_id)}
          >
            Update
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}
