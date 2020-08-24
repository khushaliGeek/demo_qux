import React from 'react';
import { Form, Col } from 'react-bootstrap';
import ProfilePicture from "profile-picture"
import "profile-picture/build/ProfilePicture.css"

class PortalGenerator extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            portalName: null,
            portalCategory: null,
            portalExplict: null,
            portalDesktop: null,
            portalProfile: null,
            portalBackground: null,
            authorName: null,
            authorProfile: null
        };
    
        this.profilePictureRef = React.createRef();
        this.bgImageRef = React.createRef();
        this.authorImageRef = React.createRef();

        this.updateState = this.updateState.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      updateState(key, value) {
          
          this.setState({
              [key]: value
          });

      }

      updatePhotoState(key, value) {
        const imageData = value.getData();
        const file = imageData.file;
        const imageAsDataURL = value.getImageAsDataUrl();
        this.setState({
            [key]: value
        });
      }

      handleSubmit(e) {
          e.preventDefault();
          console.log(this.state);
          //this.props.onFormSubmit(this.state);
      }

    render() {

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
                    <div className="justify-content row pl-3">
                        <ProfilePicture
                            ref={this.profilePictureRef}
                            frameFormat={ "rounded-square" }
                            cropSize={250}
                            onStatusChange={e => this.updatePhotoState('portalProfile', this.profilePictureRef.current)}
                        />
                        <div className="my-auto mx-auto">
                            Upload Portal Profile Image  (1000px X 1000px)
                            <br />
                            <b>
                                (Max size 500KB)
                            </b>
                        </div>
                    </div>
                    {/* background image for portal */}
                    <div className="justify-content row pl-3">
                        <ProfilePicture
                            ref={this.bgImageRef}
                            frameFormat={ "rounded-square" }
                            frameSize={1000}
                            cropSize={250}
                            onStatusChange={e => this.updatePhotoState('portalBackground', this.bgImageRef.current)}
                        />
                        <div className="my-auto mx-auto">
                            Upload Background  Image  (1920px X 1080px)
                            <br />
                            <b>
                                (Max size 1MB)
                            </b>
                        </div>
                    </div>
                    <h5 className="mb-4">
                        Authors
                    </h5>
                    <Form.Group as={Col} controlId="formAuthorName">
                        <Form.Label>Author Name</Form.Label>
                        <Form.Control placeholder="Author Name" onChange={e => this.updateState('authorName', e.target.value)} />
                    </Form.Group>
                    {/* author profile image */}
                    <div className="justify-content row pl-3">
                        <ProfilePicture
                            ref={this.authorImageRef}
                            frameFormat={ "rounded-square" }
                            cropSize={250}
                            frameSize={50}
                            onStatusChange={(e) => this.updatePhotoState('authorProfile', this.authorImageRef.current)}
                        />
                        <div className="my-auto mx-auto">
                            Upload Author Profile Image  (500px X 500px)
                            <br />
                            <b>
                                (Max size 500KB)
                            </b>
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="btn btn-primary w-50"><b>SAVE</b></button>
                    </div>
                </Form>


                
            </div>
        );
    }
}

export default PortalGenerator;