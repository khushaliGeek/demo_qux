import React from 'react';
import { Form, Col, Image } from 'react-bootstrap';
import { ImageAlt, TrashFill } from 'react-bootstrap-icons';
import CropModal from '../HomeComponents/CropModal';
import ReactTooltip from 'react-tooltip';
import TagsInput from 'react-tagsinput';
import '../../css/react-tagsinput.css';

class PlayList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            iconCrop: true,
            icon: null,
            iconError: null,
            updateData: false,
            onceBit: true,
            tags: []
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
        // console.log('tags', this.props.playlist.tags);
        this.setState({
            tags: this.props.playlist.tags
        });
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
            <div className="py-2">
                <Form.Row>
                    <Form.Label><big><b>{this.props.count}.</b></big></Form.Label>
                    <Form.Group as={Col} controlId="formPlayList">
                        <Form.Control placeholder="Name" value={this.props.playlist.name || 'name here...'} onChange={e => this.props.onData('name', e.target.value, this.props.count)} />
                    </Form.Group> 
                    <Form.Group as={Col} controlId="formSourceLink">
                        <Form.Control placeholder="Source" value={this.props.playlist.source || 'source here...'} onChange={e => this.props.onData('source', e.target.value, this.props.count)} />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <div className=" col-12 row pl-3">
                        {
                            icon ?
                            <div className="text-center my-2">
                                <Image  alt="Tile" src={icon} height="120" rounded />
                                <button type="button" className="btn" onClick={e => this.clearSelection(e, iconID, 'icon')}>
                                    <TrashFill color="red" size={18} style={{ cursor: 'pointer' }} />
                                </button>
                            </div>
                            :
                            <div className="image-picker p-4 m-2">
                                <ImageAlt color="grey" size={30} onClick={() => document.getElementById(iconID).click()} />
                            </div>
                        }
                        &nbsp;
                        <div className="my-auto">
                            <Form.Text className="text-muted">
                                Upload Listing Tile Icon (100px X 100px)
                                &nbsp;
                            <i>
                                    jpg, jpeg, png
                            </i>
                                <br />
                                <strong>(Max size 500KB)</strong>
                                <br />
                                <strong className="text-danger">{this.state.iconError}</strong>
                            </Form.Text>
                        </div>
                    <Form.Group as={Col} controlId="formPortalProfile" className="invisible">
                        {/* <Form.Label>Upload Listing Tile Icon</Form.Label> */}
                        <Form.File 
                            id={iconID}
                            label="Listing Tile Icon"
                            accept="image/*"
                            custom
                            onChange={ e => {
                                this.updatePhotoState('icon', e.target.files[0], 'iconError', 500*1024, this.props.count);
                            }}
                        />
                        
                    </Form.Group>
                        {
                            this.state.icon && this.props.playlist.iconCrop && !this.state.updateData ? 
                            <CropModal type="icon" aspect={ 1 } imgSrc={this.state.icon} onClose={this.onModalClose} />
                            :
                            null
                        }
                        <div className="my-auto">
                            <ReactTooltip
                                id="removePlaylistTip"
                                place="right"
                                effect="solid"
                            >
                                Remove whole listing
                            </ReactTooltip>
                            {/* <TrashFill color="red" size={30} style={{ cursor: 'pointer' }} onClick={e => {
                                this.props.onRemove(this.props.count);
                            }} 
                            data-tip data-for="removePlaylistTip"
                            /> */}
                            <small
                                style={{ cursor: 'pointer', color: "red" }} 
                                onClick={e => {
                                    this.props.onRemove(this.props.count);
                                }}
                                data-tip data-for="removePlaylistTip"
                            >
                                Delete
                            </small>
                        </div>
                    </div>
                </Form.Row>
                <TagsInput maxTags={10} value={this.props.playlist.tags ? this.props.playlist.tags : this.state.tags || []} onChange={ tags => {
                    this.props.onData('tags', tags, this.props.count);
                    this.setState({ tags });
                }} />
            </div>
        );
    }
}

export default PlayList;