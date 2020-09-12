import React from 'react';
import { ChevronLeft, PlusCircleFill } from 'react-bootstrap-icons';
import { Form, Col, Image } from 'react-bootstrap';
import CropModal from '../HomeComponents/CropModal';
import PlayList from './PlayList';

class AddPortal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            portalType: null,
            portalSource: null,
            portalTile: null,
            portalTileCrop: false,
            tileError: null,
            playlists: [
                {
                    name: null,
                    source: null,
                    icon: null,
                    index: 1,
                    iconError: null,
                    iconCrop: false
                }
            ],
            playlistsCount: 1
        };
    }

    updatePhotoState(key, value, errorKey, photoSize) {   
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
      console.log(value);
    //   this.props.onPhotoSubmit(key, value);
    }

    handleSubmit(e) {
        e.preventDefault();
    }

    updateState(key, value) {
        this.setState({
            [key]: value
        });
    }

    onModalClose = (data) => {

        let crop = '';
        let key = '';

        if(data.type === "tile")
        {
             key = 'portalTile';
            crop = 'portalTileCrop';
        }
        // this.props.onPhotoSubmit(key, data.image);
          this.setState({
            [crop]: false,
            [key]: data.image,
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

    renderPlaylists() {
        let data = this.state.playlists;
        let playlistViews = [];
        for(let i=1; i<=this.state.playlistsCount; i++) {
            let playlist = null;            
            if(!data[i-1]) {
                playlist = {
                    name: null,
                    source: null,
                    icon: null,
                    index: i,
                    iconError: null,
                    iconCrop: false
                };
                data.push(playlist);
            } else {
                playlist = data[i-1];
            }
            
            playlistViews.push(
                <PlayList 
                    onAddNew={this.addPlayListData.bind(this)} 
                    playlist={playlist} 
                    key={i} 
                    count={i}
                    onRemove={this.removePlayList.bind(this)}
                    onPhoto={this.addPlaylistIcon.bind(this)}
                    onData={this.addPlayListData.bind(this)}
                />
            );
        }
        return playlistViews;
    }

    removePlayList(index) {
        let data = this.state.playlists;
        data = data.splice(index-1, 1);

        this.setState({
            playlists: data,
            playlistsCount: this.state.playlistsCount - 1
        });

        console.log('after deleted', this.state.playlists);
    }

    addPlaylist() {
        this.setState({
            playlistsCount: this.state.playlistsCount + 1,
        });
    }

    addPlaylistIcon(key, value, index) {
        let data = this.state.playlists;
        let playlist = data[index-1];
        
        if(!playlist) {
            return;
        }
        playlist.icon = value;
        playlist.iconCrop = true;
        data[index-1] = playlist;

        this.setState({
            playlists: data
        });
    }

    addPlayListData(key, value, index) {
        let data = this.state.playlists;
        let playlist = data[index-1];
        
        if(!playlist) {
            return;
        }
        if(key === "name") {
            playlist.name = value;
        } else {
            playlist.source = value
        }
        data[index-1] = playlist;

        this.setState({
            playlists: data
        });
    }

    render() {
        return (
            <div className="container">
                <div>
                    <a href="/"><ChevronLeft color="black" size={18} /></a>
                    &nbsp;
                    <strong>Add Portals</strong>
                </div>
                <Form className="p-2" onSubmit={e => this.handleSubmit(e)}>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formPortalType">
                            <Form.Label>Portal Type</Form.Label>
                            <Form.Control as="select" defaultValue="Choose..." required onChange={e => this.updateState('portalType', e.target.value)}>
                                <option value="">Select one</option>
                                <option>...</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formPortalSource">
                            <Form.Label>Portal Source</Form.Label>
                            <Form.Control placeholder="Portal Source" required onChange={e => this.updateState('portalSource', e.target.value)} />
                        </Form.Group>
                    </Form.Row>
                    <div className="justify-content row pl-3">
                        {
                            this.state.portalTile ?
                            <div className="text-center">
                                <Image  alt="Tile" src={this.state.portalTile} height="120" rounded />
                                <br />
                                <input type="button" className="btn btn-danger m-1" value="Remove" onClick={e => this.clearSelection(e, 'custom-file-tile', 'portalTile')} />
                            </div>
                            :
                            null
                        }
                        <Form.Group as={Col} controlId="formPortalProfile">
                            <Form.Label>Upload Portal Tile Icon</Form.Label>
                            <Form.File 
                                id="custom-file-tile"
                                label="Portal Tile Icon"
                                accept="image/*"
                                custom
                                onChange={ e => {
                                    this.updatePhotoState('portalTile', e.target.files[0], 'tileError', 500*1024);
                                    this.setState({ portalTileCrop: true });
                                } }
                            />
                            <Form.Text className="text-muted">
                                Upload Portal Tile Icon (100px X 100px)
                                <br />
                                <strong>(Max size 500KB)</strong>
                                <br />
                                <strong className="text-danger">{this.state.tileError}</strong>
                            </Form.Text>
                        </Form.Group>
                        {
                            this.state.portalTile && this.state.portalTileCrop ? 
                            <CropModal type="tile" aspect={ 1 } imgSrc={this.state.portalTile} onClose={this.onModalClose} />
                            :
                            null
                        }
                    </div>
                    <div className="pt-2">
                        <strong>
                            Playlists
                        </strong>
                        <div className="p-3 scrollable-playlists">
                            {
                                this.renderPlaylists()
                            }
                        </div>
                        <div className="float-right m-2">
                            <PlusCircleFill color="blue" data-toggle="tooltip" data-placement="right" title="Add Playlist" size={30} style={{ cursor: 'pointer' }} onClick={ e => this.addPlaylist()} />
                        </div>
                    </div>
                    <div className="p-2 row justify-content-center w-100">
                        <button type="submit" className="btn btn-primary m-1 p-2 px-5" style={{ backgroundColor: '#6193C4' }}><b>SAVE AND BACK TO HOME</b></button>
                        <button type="submit" className="btn btn-success m-1 p-2 px-5"><b>SAVE AND CONTINUE</b></button>
                    </div>
                </Form>
            </div>
        );
    }
}

export default AddPortal;