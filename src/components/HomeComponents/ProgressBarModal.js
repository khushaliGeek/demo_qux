import React from 'react';
import { Modal, ProgressBar } from 'react-bootstrap';

class ProgressBarModal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return (
            <Modal
                show={true}
                // onHide={}
                backdrop="static"
                keyboard={true}
            >
                <Modal.Header>
                    <Modal.Title>Saving...</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <ProgressBar animated now={100} />
                </Modal.Body>
            </Modal>
        );
    }
}

export default ProgressBarModal;