import React from 'react';
import UpperBarWindow from '../HomeComponents/UpperBarWindow';
import { Image } from 'react-bootstrap';

class AddPortalPreview extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

        };
    }

    shouldComponentUpdate() {
        return true;
    }

    render() {
        let portalProfile = localStorage.getItem('portalProfile') || '';
        let portalBackground = localStorage.getItem('portalBackground') || '';
        
        return (
            <div className="p-2 py-4">
                <div className="my-5" id="parent-window">
                    <strong>
                        Preview
                    </strong>
                    <UpperBarWindow />
                    <div className="p-2 pb-5 pt-2" id="portal-body-window" style={{ backgroundImage: `url(${portalBackground})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                        <div className="row justify-content-between p-4 mt-3">
                            <div className="col-4 align-self-start">
                                <div className="rounded" style={{ height: 100, width: 100, backgroundColor: 'white' }}>
                                    <Image src={portalProfile} height="100" width="100" rounded alt="profile" />
                                </div>
                            </div>
                            <div className="col-2 invisible">
                                Background image will be 
                            </div>
                            <div className="align-content-end mx-auto col-6">
                                <div className="row m-1 rounded" style={{ height: 50, width: 150, backgroundColor: 'skyblue' }}>
                                    <div className="rounded my-auto ml-1" style={{ height: 40, width: 40, backgroundColor: 'white' }}>
                                        <Image src={portalProfile} height="40" width="40" rounded alt="icon" />
                                    </div>
                                    <div className="col-8">
                                        <small>
                                            <b>Tile 1</b>
                                        </small>
                                        <br />
                                        <small>EPP 1</small> 
                                    </div>
                                </div>

                                <div className="row m-1 rounded" style={{ height: 50, width: 150, backgroundColor: 'skyblue' }}>
                                    <div className="rounded my-auto ml-1" style={{ height: 40, width: 40, backgroundColor: 'white' }}>
                                        <Image src={portalProfile} height="40" width="40" rounded alt="icon" />
                                    </div>
                                    <div className="col-8">
                                        <small>
                                            <b>Tile 2</b>
                                        </small>
                                        <br />
                                        <small>EPP 2</small> 
                                    </div>
                                </div>

                                <div className="row m-1 rounded" style={{ height: 50, width: 150, backgroundColor: 'skyblue' }}>
                                    <div className="rounded my-auto ml-1" style={{ height: 40, width: 40, backgroundColor: 'white' }}>
                                        <Image src={portalProfile} height="40" width="40" rounded alt="icon" />
                                    </div>
                                    <div className="col-8">
                                        <small>
                                            <b>Tile 3</b>
                                        </small>
                                        <br />
                                        <small>EPP 3</small> 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddPortalPreview;