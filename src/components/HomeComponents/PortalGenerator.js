import React from 'react';
import { Form, Col } from 'react-bootstrap';
import CropModal from './CropModal';

class PortalGenerator extends React.Component {

    constructor(props) {
        super(props);

        this.canvas = {};
        this.state = {
            portalName: null,
            portalCategory: null,
            portalExplict: null,
            portalDesktop: null,
            portalProfile: null,
            portalBackground: null,
            authorName: null,
            authorProfile: null,
            crop: { x: 0, y: 0 },
            zoom: 1,
            aspect: 3 / 3,
            profileCrop: false,
            backgroundCrop: false,
            authorCrop: false,
            profilePixels: {
                width: 0,
                height: 0,
                x: 0,
                y: 0
            },
            backgroundPixels: {
                width: 0,
                height: 0,
                x: 0,
                y: 0
            },
            authorPixels: {
                width: 0,
                height: 0,
                x: 0,
                y: 0
            },
        };

        this.updateState = this.updateState.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onModalClose = this.onModalClose.bind(this);
      }

      updateState(key, value) {
          
          this.setState({
              [key]: value
          });

      }

      updatePhotoState(key, value) {   
          this.setState({
              [key]: null
          }); 
        let reader = new FileReader();
        let url = reader.readAsDataURL(value);
        reader.onloadend = async function (e) {
            await this.setState({
                [key]: reader.result,
            });
          }.bind(this);
        this.props.onPhotoSubmit(key, value);
      }

      handleSubmit(e) {
          e.preventDefault();
          console.log(this.state);
          this.props.onFormSubmit(this.state);
      }

      onModalClose = (data) => {

        let pixels = '';
        let crop = '';
        let key = '';

        if(data.type == "profile")
        {
            pixels = 'profilePixels';
             key = 'portalProfile';
            crop = 'profileCrop';
        }
        else if(data.type == "author")
        {
             pixels = 'authorPixels';
            key = 'authorProfile';
             crop = 'authorCrop';
        }
        else if(data.type == "background")
        {
            pixels = 'backgroundPixels';
             key = 'portalBackground';
            crop = 'backgroundCrop';
        }
        this.props.onPhotoSubmit(key, data.image);
          this.setState({
            [crop]: false,
            [pixels]: data.pixels,
            [key]: data.image,
          });  
      }

    render() {
        const { profilePixels, backgroundPixels, authorPixels } = this.state;
        return (
            <div className="p-2">
                <h5>
                    Portal Generator
                </h5>

                <Form className="p-2" onSubmit={(e) => this.handleSubmit(e)}>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formPortalName">
                            <Form.Label>Portal Name</Form.Label>
                            <Form.Control placeholder="Portal Name" required onChange={e => this.updateState('portalName', e.target.value)} />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formCategory">
                            <Form.Label>Category</Form.Label>
                            <Form.Control as="select" defaultValue="Choose..." required onChange={e => this.updateState('portalCategory', e.target.value)}>
                                <option value="">Select one</option>
                                <option>...</option>
                            </Form.Control>
                        </Form.Group>
                        
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formExplict">
                            <Form.Label>Select Explict</Form.Label>
                            <Form.Control as="select" defaultValue="Choose..." required onChange={e => this.updateState('portalExplict', e.target.value)}>
                                <option value="">Select one</option>
                                <option>...</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formDesktop">
                            <Form.Label>Portal Desktop</Form.Label>
                            <Form.Control as="select" defaultValue="Choose..." required onChange={e => this.updateState('portalDesktop', e.target.value)}>
                                <option value="">Select one</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </Form.Control>
                        </Form.Group> 
                    </Form.Row>
                    {/* profile image for portal */}
                    {
                        this.state.portalProfile ?
                        <img  alt="profile" src={this.state.portalProfile} height="120" />
                        :
                        null
                    }
                    <div className="justify-content pl-3">
                        <Form.Group as={Col} controlId="formPortalProfile">
                            <Form.Label>Portal Profile Image</Form.Label>
                            <Form.File 
                                id="custom-file"
                                label="Portal profile image"
                                accept="image/*"
                                custom
                                onChange={ e => {
                                    this.updatePhotoState('portalProfile', e.target.files[0]);
                                    // this.updateState('profileCrop', true);
                                    this.setState({ profileCrop: true });
                                } }
                            />
                            <Form.Text className="text-muted">
                                Upload Portal Profile Image (1000px X 1000px)
                                <br />
                                <strong>(Max size 500KB)</strong>
                            </Form.Text>
                        </Form.Group>
                        {
                            this.state.portalProfile && this.state.profileCrop ? 
                            <CropModal type="profile" aspect={ 1 } imgSrc={this.state.portalProfile} onClose={this.onModalClose} />
                            :
                            null
                        }
                        
                    </div>
                    {/* background image for portal */}
                    {
                        this.state.portalBackground ?
                        <img  alt="bakground" src={this.state.portalBackground} height="135" width="240" />
                        :
                        null
                    }
                    <div className="justify-content pl-3">
                        <Form.Group as={Col} controlId="formPortalBackground">
                            <Form.Label>Portal Background Image</Form.Label>
                            <Form.File 
                                id="custom-file"
                                label="Portal Background image"
                                accept="image/*"
                                custom
                                onChange={e => {
                                    this.updatePhotoState('portalBackground', e.target.files[0]);
                                    this.updateState('backgroundCrop', true);
                                }}
                            />
                            <Form.Text className="text-muted">
                                Upload background Image (1920px X 1080px)
                                <br />
                                <strong>(Max size 1MB)</strong>
                            </Form.Text>
                        </Form.Group>
                        {
                            this.state.portalBackground && this.state.backgroundCrop ? 
                            <CropModal type="background" aspect={ 16 / 9 } imgSrc={this.state.portalBackground} onClose={this.onModalClose} />
                            :
                            null
                        }
                    </div>
                    <h5 className="mb-4">
                        Authors
                    </h5>
                    <Form.Group as={Col} controlId="formAuthorName">
                        <Form.Label>Author Name</Form.Label>
                        <Form.Control placeholder="Author Name" onChange={e => this.updateState('authorName', e.target.value)} />
                    </Form.Group>
                    {/* author profile image */}
                    {
                        this.state.authorProfile ? 
                        <img alt="author" src={this.state.authorProfile} height="120" />
                        :
                        null
                    }
                    <div className="justify-content pl-3">
                        <Form.Group as={Col} controlId="formAuthorProfile">
                            <Form.Label>Author Profile Image</Form.Label>
                            <Form.File 
                                id="custom-file"
                                label="Author profile image"
                                accept="image/*"
                                custom
                                onChange={e => {
                                    this.updatePhotoState('authorProfile', e.target.files[0]);
                                    this.updateState('authorCrop', true);
                                }}
                            />
                            <Form.Text className="text-muted">
                                Upload Portal Profile Image (500px X 500px)
                                <br />
                                <strong>(Max size 500KB)</strong>
                            </Form.Text>
                        </Form.Group>
                        {
                            this.state.authorProfile && this.state.authorCrop ? 
                            <CropModal type="author" aspect={ 1 } imgSrc={this.state.authorProfile} onClose={this.onModalClose} />
                            :
                            null
                        }
                    </div>

                    <div>
                        <button type="submit" className="btn btn-primary w-50" style={{ backgroundColor: '#6193C4' }}><b>SAVE</b></button>
                    </div>
                </Form>


                
            </div>
        );
    }
}

export default PortalGenerator;