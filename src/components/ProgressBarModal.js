import React from 'react';
import { Modal, ProgressBar } from 'react-bootstrap';

class ProgressBarModal extends React.Component {

    render() {
        return (
            <Modal
                size="sm"
                show={true}
                backdrop="static"
                keyboard={true}
                centered
            >
                <Modal.Header>
                    <Modal.Title>
                        {this.props.title}...
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <ProgressBar animated now={100} />
                </Modal.Body>
            </Modal>
        );
    }
}

export default ProgressBarModal;