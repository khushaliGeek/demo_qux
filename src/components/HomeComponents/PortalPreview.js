import React from 'react';
import '../../css/HomeCss.css';
import plus_sign from '../../img/plus_sign.png';
import UpperBarWindow from './UpperBarWindow';

class PortalPreview extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            portalProfile: null
        };
    }

    componentDidMount() {

        const { portalProfile } = this.props;
        console.log(this.props.portalProfile);
        this.setState({
            portalProfile
        });
    }

    render() {
        return (
            <div className="p-2 pt-4">
                <div className="my-5" id="parent-window">
                    <h5>
                        Preview
                    </h5>
                    <UpperBarWindow />
                    <div className="p-2" id="main-body-window">
                        <div className="row justify-content-between p-4">
                            <div className="col-6">
                                <div  style={{ height: 240, width: 240, backgroundColor: 'white' }}>
                                {
                                    this.state.portalProfile ? 
                                    <div>
                                        ldkbvhvkbakl
                                        <img src={this.state.portalProfile} height="240" width="240" />
                                    </div>
                                    :
                                    null
                                }
                                </div>
                                
                            </div>
                            <div className="text-white col-6">
                                Background Image 1920px X 1080px
                            </div>
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