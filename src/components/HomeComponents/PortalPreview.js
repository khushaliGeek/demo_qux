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
        let portalProfile = localStorage.getItem('portalProfile') || '';
        let portalBackground = localStorage.getItem('portalBackground') || '';
        // if(portalProfile !== '') {
        //     this.setState({
        //         portalProfile
        //     });
        // }
        // if(portalBackground !== '') {
        //     this.setState({
        //         portalBackground
        //     });
        // }
        return (
            <div className="p-2 pt-4">
                <div className="my-5" id="parent-window">
                    <strong>
                        Preview
                    </strong>
                    <UpperBarWindow />
                    <div className="p-2" id="main-body-window" style={{ backgroundImage: `url(${portalBackground})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                        <div className="row justify-content-between p-4 mt-3">
                            <div className="col-4 align-self-end">
                                <div className="rounded" style={{ height: 200, width: 200, backgroundColor: 'white' }}>
                                    <Image src={portalProfile} height="200" width="200" rounded alt="profile" />
                                </div>
                            </div>
                            {
                                portalBackground !== '' ?
                                <div className="col-8 invisible">
                                    Background Image 1920px X 1080px
                                </div>
                                :
                                <div className="text-white text-center col-8">
                                    Background Image 1920px X 1080px
                                </div>
                            }
                            
                        </div>
                        {/* portal thumbnails */}
                        <div>
                            
                        </div>
                    </div>
                </div>
                
                <div>
                    <strong>
                        Add Portal Type
                    </strong>
                    <br />
                    <small style={{ color: 'grey' }}>
                        Click to add portals
                    </small>

                    <div className="row p-2 mx-auto">
                        <div className="p-4 m-2 mx-auto" style={{ backgroundColor: 'white', border: 1, borderStyle: 'dashed', borderColor: 'skyblue' }}>
                            <a href="/newPortal" className="text-center">
                                <img src={plus_sign} height="50" />
                            </a>
                        </div>
                        <div className="p-4 m-2 mx-auto" style={{ backgroundColor: 'white', border: 1, borderStyle: 'dashed', borderColor: 'skyblue' }}>
                            <a href="/newPortal" className="text-center">
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