import React, {Component} from 'react';
import PropTypes from 'prop-types';

handleClose = () => setShow(false);
handleShow = () => setShow(true);

const editModal = ({ tasks=[], handleInputChange=f=>f, onUpdate=f=>f, onRemove=f=>f, onCompletion=f=>f }) =>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
                Save Changes
            </Button>
        </Modal.Footer>
    </Modal>

editModal.propTypes = {
    tasks: PropTypes.array,
    onUpdate: PropTypes.func,
    onCompletion: PropTypes.func,

}

export default editModal;