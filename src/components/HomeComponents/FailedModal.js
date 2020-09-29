import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { ClipboardX } from 'react-bootstrap-icons';

class FailedModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            show: true
        };
    }

    render() {
        return (
            <div>
                <Modal
                    show={this.state.show}
                    backdrop="static"
                    keyboard={true}
                >
                    <Modal.Header>
                        <Modal.Title className="text-danger">Something went wrong.</Modal.Title>
                    </Modal.Header>

                    <Modal.Body className="text-center">
                        <ClipboardX
                            color="red"
                            size={45}
                        />
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => {
                            this.setState({ show: false })
                            this.props.setFailedState();
                        }}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
                
            </div>
        );
    }
}

export default FailedModal;