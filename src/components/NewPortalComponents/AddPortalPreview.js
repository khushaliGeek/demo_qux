import React from 'react';
import UpperBarWindow from '../HomeComponents/UpperBarWindow';
import { Image } from 'react-bootstrap';

class AddPortalPreview extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            playlists: []
        };
    }

    componentDidMount() {
        // setting the playlists values into the state that are coming for the update
        if(this.props.updateData) {
            let { playlists } = this.props.updateData.item;
            this.setState({
                playlists
            });
        }
    }

    renderPlaylists() {
        // playlists those are already created and needed to update only.
        let iterator_count = this.state.playlists.length;
        if(iterator_count > 3) {
            iterator_count = 3;
        }
        let data = this.state.playlists;
        let playlists = [];
        for(let i=0;i<iterator_count;i++) {
            playlists.push(
                <div className="row m-1 rounded" key={i} style={{ height: 50, width: 150, backgroundColor: 'skyblue' }}>
                    <div className="rounded my-auto ml-1" style={{ height: 40, width: 40, backgroundColor: 'white' }}>
                        <Image src={data[i].icon} height="40" width="40" rounded alt="icon" />
                    </div>
                    <div className="mx-auto">
                        <small>
                            <b>{data[i].name}</b>
                        </small>
                        <br />
                        <small>{data[i].source}</small> 
                    </div>
                </div>
            );
        }
        return playlists;
    }

    renderBlankPlaylists() {
        // blank playlists creation
        let iterator_count = 0;
        if(this.state.playlists.length < 3) {
            iterator_count = 3 - this.state.playlists.length;
        }
        let playlists = [];
        if(iterator_count) {
            for(let i=0; i<iterator_count;i++) {
                playlists.push(
                    <div className="row m-1 rounded" key={`play${i}`} style={{ height: 50, width: 150, backgroundColor: 'skyblue' }}>
                        <div className="rounded my-auto ml-1" style={{ height: 40, width: 40, backgroundColor: 'white' }}>
                            {/* <Image src={''} height="40" width="40" rounded alt="icon" /> */}
                        </div>
                        <div className="col-8">
                            <small>
                                <b>Name</b>
                            </small>
                            <br />
                            <small>Source</small> 
                        </div>
                    </div>
                );
            }
            return playlists;
        }
    }

    shouldComponentUpdate() {
        return true;
    }

    render() {
        let portalProfile = localStorage.getItem('portalProfile') || '';
        let portalBackground = localStorage.getItem('portalBackground') || '';
        
        return (
            <div className="p-2 py-4">
                <div className="my-5" id="parent-portal-window">
                    <strong>
                        Preview
                    </strong>
                    <UpperBarWindow />
                    <div className="p-2 pb-5 pt-2" id="portal-body-window" style={{ backgroundImage: `url(${portalBackground})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                        <div className="row justify-content-between p-4 mt-3">
                            <div className="col-4 align-self-start">
                                <div className="rounded" style={{ height: 100, width: 100, backgroundColor: 'transparent' }}>
                                    {/* <Image src={portalProfile} height="100" width="100" rounded alt="profile" /> */}
                                </div>
                            </div>
                            <div className="col-2 invisible">
                                Background image will be 
                            </div>
                            <div className="col-6">
                                {
                                    this.props.updateData ? 
                                    this.renderPlaylists()
                                    :
                                    null
                                }
                                {
                                    this.renderBlankPlaylists()
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddPortalPreview;