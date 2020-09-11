import React from 'react';
import { Form, Col } from 'react-bootstrap';
import { TrashFill } from 'react-bootstrap-icons';

class PlayList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            iconCrop: false
        };
    }

    render() {
        let iconID = `custom-file-playlist-tile${this.props.playlist.index}`;
        return (
            <div>
                <Form.Row>
                    <Form.Group as={Col} controlId="formPlayList">
                        <Form.Label>Playlist {this.props.count}</Form.Label>
                        <Form.Control placeholder="Playlist name" required onChange={e => this.props.onData('name', e.target.value, this.props.count)} />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formSourceLink">
                        <Form.Label>Source Link</Form.Label>
                        <Form.Control placeholder="Portal Source" required onChange={e => this.props.onData('source', e.target.value, this.props.count)} />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="formPortalProfile">
                        <Form.Label>Upload Playlist Tile Icon</Form.Label>
                        <Form.File 
                            id={iconID}
                            label="Playlist Tile Icon"
                            accept="image/*"
                            custom
                            onChange={ e => {
                                // this.updatePhotoState('portalTile', e.target.files[0], 'tileError', 500*1024);
                                // this.setState({ portalTileCrop: true });
                            }}
                        />
                        <Form.Text className="text-muted">
                            Upload Playlist Tile Icon (100px X 100px)
                            <br />
                            <strong>(Max size 500KB)</strong>
                            <br />
                            <strong className="text-danger">{this.props.playlist.iconError}</strong>
                        </Form.Text>
                    </Form.Group>
                    <div className="my-auto">
                        <TrashFill color="red" size={30} style={{ cursor: 'pointer' }} onClick={e => this.props.onRemove(this.props.count)} />
                    </div>
                </Form.Row>
            </div>
        );
    }
}

export default PlayList;