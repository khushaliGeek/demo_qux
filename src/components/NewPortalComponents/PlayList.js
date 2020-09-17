import React from 'react';
import { Form, Col, Image } from 'react-bootstrap';
import { TrashFill } from 'react-bootstrap-icons';
import CropModal from '../HomeComponents/CropModal';

class PlayList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            iconCrop: true,
            icon: null,
            iconError: null,
            updateData: false,
            onceBit: true
        };
    }

    componentDidMount() {
        if(this.props.playlist.icon) {
            this.setState({
                icon: this.props.playlist.icon,
                iconCrop: false,
                updateData: this.props.updateData
            });
        }
    }

    updatePhotoState(key, value, errorKey, photoSize, index) {   
        this.setState({
            [key]: null,
            [errorKey]: null,
            updateData: false
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
        this.props.onPhoto('icon', value, this.props.count);
    }

    onModalClose = (data) => {
        this.setState({
            iconCrop: false,
            icon: data.image,
        });
        this.props.onPhoto('icon', data.image, this.props.count);
      }

    clearSelection(e, id, key) {
        e.preventDefault();
        // setting onceBit for false 
        // as able to remove icon in update mode
        if(this.state.onceBit) {
            this.setState({
                onceBit: false
            });
        }
        this.setState({
            [key]: null
        });
        this.props.onPhoto(key, null);
        document.getElementById(id).value = null;
    }

    render() {
        let iconID = `custom-file-playlist-tile${this.props.playlist.index}`;
        let icon = this.state.icon || this.props.playlist.icon;
        // take state icon as one render is done.
        // helps in remove icon functionality.
        if(!this.state.onceBit) {
            icon = this.state.icon;
        }
        return (
            <div>
                <Form.Row>
                    <Form.Group as={Col} controlId="formPlayList">
                        <Form.Label>Playlist {this.props.count}</Form.Label>
                        <Form.Control placeholder="Playlist name" value={this.props.playlist.name || 'name here...'} onChange={e => this.props.onData('name', e.target.value, this.props.count)} />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formSourceLink">
                        <Form.Label>Source Link</Form.Label>
                        <Form.Control placeholder="Portal Source" value={this.props.playlist.source || 'source here...'} onChange={e => this.props.onData('source', e.target.value, this.props.count)} />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <div className="justify-content-between row pl-3">
                        {
                            icon ?
                            <div className="text-center">
                                <Image  alt="Tile" src={icon} height="120" rounded />
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
                            }}
                        />
                        <Form.Text className="text-muted">
                            Upload Playlist Tile Icon (100px X 100px)
                            &nbsp;
                            <i>
                                jpg, jpeg, png
                            </i>
                            <br />
                            <strong>(Max size 500KB)</strong>
                            <br />
                            <strong className="text-danger">{this.state.iconError}</strong>
                        </Form.Text>
                    </Form.Group>
                        {
                            this.state.icon && this.props.playlist.iconCrop && !this.state.updateData ? 
                            <CropModal type="icon" aspect={ 1 } imgSrc={this.state.icon} onClose={this.onModalClose} />
                            :
                            null
                        }
                        <div className="ml-3 my-auto">
                            <TrashFill color="red" size={30} style={{ cursor: 'pointer' }} onClick={e => {
                                console.log(this.props.playlist.index);
                                this.props.onRemove(this.props.count);
                            }} />
                        </div>
                    </div>
                </Form.Row>
            </div>
        );
    }
}

export default PlayList;