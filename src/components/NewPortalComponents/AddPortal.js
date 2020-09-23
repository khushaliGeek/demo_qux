import React from 'react';
import { ChevronLeft, PlusCircleFill } from 'react-bootstrap-icons';
import { Form, Col, Image } from 'react-bootstrap';
import CropModal from '../HomeComponents/CropModal';
import PlayList from './PlayList';
import { Link, Redirect } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';

class AddPortal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            portalCategory: null,
            portalSource: '',
            portalDescription: '',
            portalTile: null,
            portalTileCrop: false,
            tileError: null,
            playlists: [],
            playlistsCount: 1,
            updateData: false,
            updateIndex: null,
            redirectFlag: false
        };
    }

    componentDidMount() {
        if(this.props.updateData) {
            let { portalSource, portalDescription, portalTile, portalCategory, playlists } = this.props.updateData.item;
            this.setState({
                portalSource,
                portalDescription,
                portalTile,
                portalCategory,
                playlists,
                playlistsCount: playlists.length || 1,
                updateData: true,
                updateIndex: this.props.updateData.index
            });
        }
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
    }

    handleSubmit(e) {
        e.preventDefault();
    }

    updateState(key, value) {
        this.setState({
            [key]: value
        });
    }

    updateCategoryState(key, e) {
        let options = e.target.options;
        let val = [];
        for (let i = 0, l = options.length; i < l; i++) {
          if (options[i].selected) {
            val.push(options[i].value);
          }
        }

        this.setState({
            [key]: val
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
        document.getElementById(id).value = null;
    }

    renderPlaylists() {
        let data = this.state.playlists;
        let playlistViews = [];
        for(let i=1; i<=this.state.playlistsCount; i++) {
            let playlist = null;   
                     
            if(data[i-1] === 'deleted') {
                continue;
            }
            if(!data[i-1]) {
                playlist = {
                    name: null,
                    source: null,
                    icon: null,
                    index: i,
                    iconError: null,
                    iconCrop: false,
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
                    updateData={this.state.updateData}
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
        data[index-1] = 'deleted';
        // data = data.splice(index-1, 1);
        
        this.setState({
            playlists: data,
            playlistsCount: this.state.playlistsCount
        });
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

    saveData(flag) {
        if(this.state.portalCategory && this.state.portalSource) {
            this.setState({
                updateData: true
            });
            this.props.onSubmitData(this.state);

            if(!flag) {
                this.setState({
                    redirectFlag: true
                });
            }
        }
        
    }

    renderRedirect() {
        if(this.state.redirectFlag) {
            return <Redirect to="/" />
        }
    }

    render() {
        return (
            <div className="container">
                <div>
                    <ReactTooltip
                        id="goBackTip"
                        place="right"
                        effect="solid"
                    >
                        Go back
                    </ReactTooltip>
                    <Link to="/" data-tip data-for="goBackTip"><ChevronLeft color="black" size={18} /></Link>
                    &nbsp;
                    <strong>Add Portals</strong>
                </div>
                <Form className="p-2" onSubmit={e => this.handleSubmit(e)}>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formPortalType">
                            <Form.Label>Portal Category</Form.Label>
                            <Form.Control as="select" required multiple={true} defaultValue={this.state.portalCategory} onChange={e => this.updateCategoryState('portalCategory', e)}>
                                <option value="A" selected={this.state.portalCategory ? this.state.portalCategory.includes('A') : false}>A</option>
                                <option value="B" selected={this.state.portalCategory ? this.state.portalCategory.includes('B') : false}>B</option>
                                <option value="C" selected={this.state.portalCategory ? this.state.portalCategory.includes('C') : false}>C</option>
                                <option value="D" selected={this.state.portalCategory ? this.state.portalCategory.includes('D') : false}>D</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formPortalSource">
                            <Form.Label>Portal Source</Form.Label>
                            <Form.Control placeholder="Portal Source" required as="textarea" value={this.state.portalSource} required onChange={e => this.updateState('portalSource', e.target.value)} />
                            {/* <Form.File
                                id="custom-file-portalSource"
                                label="Portal Source"
                                // accept="image/*"
                                custom
                            /> */}
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
                                &nbsp;
                                <i>
                                    jpg, jpeg, png
                                </i>
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
                    <Form.Group as={Col} controlId="formDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" maxLength={200} value={this.state.portalDescription} required onChange={e => this.updateState('portalDescription', e.target.value)}>
                        </Form.Control>
                        <Form.Text className="text-muted">
                            (Max 200 characters)
                        </Form.Text>
                    </Form.Group> 
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
                            <ReactTooltip
                                id="addPlaylistTip"
                                place="right"
                                effect="solid"
                            >
                                Add playlist from here
                            </ReactTooltip>
                            <PlusCircleFill color="blue" data-tip data-for="addPlaylistTip" data-placement="right" title="Add Playlist" size={30} style={{ cursor: 'pointer' }} onClick={ e => this.addPlaylist()} />
                        </div>
                    </div>
                    <div className="p-2 row justify-content-center w-100">
                        {
                            this.renderRedirect()
                        }
                        <button type="submit" className="btn btn-primary m-1 p-2 px-5" style={{ backgroundColor: '#6193C4' }} onClick={e => this.saveData(false)}><b>SAVE AND BACK TO HOME</b></button>
                        <button type="submit" className="btn btn-success m-1 p-2 px-5" onClick={e => this.saveData(true)}><b>SAVE AND CONTINUE</b></button>
                    </div>
                </Form>
            </div>
        );
    }
}

export default AddPortal;