import React from 'react';
import '../../css/HomeCss.css';
import plus_sign from '../../img/plus_sign.png';
import UpperBarWindow from './UpperBarWindow';
import { Image } from 'react-bootstrap';

class PortalPreview extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            portalProfile: null,
            portalBackground: null
        };
    }

    shouldComponentUpdate() {
        return true;
    }

    render() {
        if(this.state.portalProfile !== this.props.portalProfile)
        {
            this.setState({
                portalProfile: this.props.portalProfile
            });
        }
        if(this.state.portalBackground !== this.props.portalBackground)
        {
            this.setState({
                portalBackground: this.props.portalBackground
            });
        }
        return (
            <div className="p-2 pt-4">
                <div className="my-5" id="parent-window">
                    <h5>
                        Preview
                    </h5>
                    <UpperBarWindow />
                    <div className="p-2" id="main-body-window" style={{ backgroundImage: `url(${this.props.portalBackground})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                        <div className="row justify-content-between p-4 mt-5">
                            <div className="col-4 align-self-end">
                                <div style={{ height: 200, width: 200, backgroundColor: 'white' }}>
                                    <Image src={this.props.portalProfile} height="200" width="200" rounded alt="profile" />
                                </div>
                            </div>
                            {
                                this.props.portalBackground !== null ?
                                <div className="col-8 invisible">
                                    Background Image 1920px X 1080px
                                </div>
                                :
                                <div className="text-white text-center col-8">
                                    Background Image 1920px X 1080px
                                </div>
                            }
                            
                        </div>
                        <div>

                        </div>
                    </div>
                </div>
                
                <div>
                    <h5>
                        Add Portal Type
                    </h5>
                    <small style={{ color: 'grey' }}>
                        Click to add portals
                    </small>

                    <div className="row p-2 mx-auto">
                        <div className="p-4 m-2 mx-auto" style={{ backgroundColor: 'white', border: 1, borderStyle: 'dashed', borderColor: 'skyblue' }}>
                            <a href="#" className="text-center">
                                <img src={plus_sign} height="50" />
                            </a>
                        </div>
                        <div className="p-4 m-2 mx-auto" style={{ backgroundColor: 'white', border: 1, borderStyle: 'dashed', borderColor: 'skyblue' }}>
                            <a href="#" className="text-center">
                                <img src={plus_sign} height="50" />
                            </a>
                        </div>
                        <div className="p-4 m-2 mx-auto" style={{ backgroundColor: 'white', border: 1, borderStyle: 'dashed', borderColor: 'skyblue' }}>
                            <a href="#" className="text-center">
                                <img src={plus_sign} height="50" />
                            </a>
                        </div>
                        <div className="p-4 m-2 mx-auto" style={{ backgroundColor: 'white', border: 1, borderStyle: 'dashed', borderColor: 'skyblue' }}>
                            <a href="#" className="text-center">
                                <img src={plus_sign} height="50" />
                            </a>
                        </div>
                        <div className="p-4 m-2 mx-auto" style={{ backgroundColor: 'white', border: 1, borderStyle: 'dashed', borderColor: 'skyblue' }}>
                            <a href="#" className="text-center">
                                <img src={plus_sign} height="50" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PortalPreview;