import React from 'react';
import { Form, Col, Image } from 'react-bootstrap';
import { TrashFill } from 'react-bootstrap-icons';
import CropModal from '../HomeComponents/CropModal';

class PlayList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            iconCrop: false,
            icon: null,
            iconError: null
        };
    }

    updatePhotoState(key, value, errorKey, photoSize, index) {   
        this.setState({
            [key]: null,
            [errorKey]: null
        }); 
      if(value.size > photoSize)
      {
          this.setState({
              [errorKey]: `Photo size should be less than ${photoSize / 1024}KB.`
          });

          return;
      }
      let reader = new FileReader();
      let url = reader.readAsDataURL(value);
      reader.onloadend = async function (e) {
          await this.setState({
              [key]: reader.result,
          });
        }.bind(this);
      this.props.onPhoto(key, value, index);
    }

    onModalClose = (data) => {

        // this.props.onPhotoSubmit(key, data.image);
          this.setState({
            iconCrop: false,
            icon: data.image,
          }); 
      }

    clearSelection(e, id, key) {
        e.preventDefault();
        this.setState({
            [key]: null
        });
        // this.props.onPhotoSubmit(key, null);
        document.getElementById(id).value = null;
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
                    <div className="justify-content row pl-3">
                        {
                            this.state.icon ?
                            <div className="text-center">
                                <Image  alt="Tile" src={this.state.icon} height="120" rounded />
                                <br />
                                <input type="button" className="btn btn-danger m-1" value="Remove" onClick={e => this.clearSelection(e, iconID, 'icon')} />
                            </div>
                            :
                            null
                        }
                    <Form.Group as={Col} controlId="formPortalProfile">
                        <Form.Label>Upload Playlist Tile Icon</Form.Label>
                        <Form.File 
                            id={iconID}
                            label="Playlist Tile Icon"
                            accept="image/*"
                            custom
                            onChange={ e => {
                                this.updatePhotoState('icon', e.target.files[0], 'iconError', 500*1024, this.props.count);
                                // this.setState({ iconCrop: true });
                            }}
                        />
                        <Form.Text className="text-muted">
                            Upload Playlist Tile Icon (100px X 100px)
                            <br />
                            <strong>(Max size 500KB)</strong>
                            <br />
                            <strong className="text-danger">{this.state.iconError}</strong>
                        </Form.Text>
                    </Form.Group>
                        {
                            this.state.icon && this.props.playlist.iconCrop ? 
                            <CropModal type="icon" aspect={ 1 } imgSrc={this.state.icon} onClose={this.onModalClose} />
                            :
                            null
                        }
                    </div>
                    <div className="my-auto p-2">
                        <TrashFill color="red" size={30} style={{ cursor: 'pointer' }} onClick={e => this.props.onRemove(this.props.count)} />
                    </div>
                </Form.Row>
            </div>
        );
    }
}

export default PlayList;