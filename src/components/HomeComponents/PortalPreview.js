import React from 'react';
import '../../css/HomeCss.css';
import plus_sign from '../../img/plus_sign.png';
import UpperBarWindow from './UpperBarWindow';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class PortalPreview extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            portalProfile: null,
            portalBackground: null,
            subportals: null
        };
    }

    shouldComponentUpdate() {
        return true;
    }

    componentDidMount() {
        let subportals = this.props.subportals;
        if(subportals) {
            this.setState({
                subportals: subportals
            });
        }
    }

    renderSubPortals() {
        let subportals_views = [];
        let subportals_count = 5;
        if(this.props.subportals) {
            subportals_count = 5 - this.props.subportals.length;
        }

        for(let i=0;i<subportals_count;i++) {
            subportals_views.push(
                <div className="p-4 m-2 rounded col-2 mx-auto" key={i} style={{ backgroundColor: 'skyblue' }}>
                    <p className="text-center my-auto">
                        Portal Type
                    </p>
                </div>
            );
        }
        return subportals_views;
    }

    renderSubPortalLinks() {
        let subportals_views = [];
        let subportals_count = 5;
        if(this.props.subportals) {
            subportals_count = 5 - this.props.subportals.length;
        }

        for(let i=0;i<subportals_count;i++) {
            subportals_views.push(
                <div className="p-4 m-2 mx-auto" key={i} style={{ backgroundColor: 'white', border: 1, borderStyle: 'dashed', borderColor: 'skyblue' }}>
                    <Link to="/newPortal" className="text-center">
                        <img src={plus_sign} height="50" alt="add" />
                    </Link>
                </div>
            );
        }
        return subportals_views;
    }

    render() {
        console.log('preview portal', this.props.subportals);
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
                                    <Image src={portalProfile} height="200" width="200" alt="profile" rounded />
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
                        <div className="row justify-content-center px-5 portals-type">
                            
                            {
                                this.props.subportals ? 
                                this.props.subportals.map((item, index) => {
                                    return (
                                        <div key={index} className="m-2 rounded mx-auto" style={{ backgroundColor: 'skyblue' }}>
                                            <img src={item.portalTile} style={{ maxHeight: 100, maxWidth: 100 }} alt="tile" className="rounded" />
                                        </div>
                                    )
                                })
                                :
                                null
                                }

                            {
                                this.renderSubPortals()
                            }
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
                        {
                            this.props.subportals ? 
                            this.props.subportals.map((item, index) => {
                                return (
                                    <div className="m-2 mx-auto" key={index} style={{ backgroundColor: 'white' }}>
                                        <Link to={
                                            {
                                                pathname: '/newPortal',
                                                state: {
                                                    item,
                                                    index
                                                }
                                            }
                                        }>
                                            <img src={item.portalTile} style={{ maxHeight: 100, maxWidth: 100 }}  alt="add" />
                                        </Link>
                                    </div>
                                )
                            })
                            :
                            null
                        }
                        {
                            this.renderSubPortalLinks()
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default PortalPreview;