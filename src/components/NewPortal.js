import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Header from './Header';
import AddPortal from './NewPortalComponents/AddPortal';
import AddPortalPreview from './NewPortalComponents/AddPortalPreview';

class NewPortal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            portals: []
        };

        this.handleSubmitData = this.handleSubmitData.bind(this);
    }

    componentDidMount() {
        this.props.fetchPreview();
    }

    handleSubmitData(data) {
        let { portalCategory, portalSource, portalTile, portalDescription, playlists, updateData, updateIndex } = data;
        let portals = this.state.portals;
        let portal = {
            portalCategory,
            portalSource,
            portalTile,
            portalDescription,
            playlists
        };

        if(!portalSource && !portalTile && playlists.length < 1) {
            return;
        }
        // coming data are pushed into the portals array
        portals.push(portal);
        this.setState({
            portals
        });
        let portals_data = localStorage.getItem('portals') || null;
        let portals_js = null;
        portals_js = JSON.parse(portals_data);
        // updatable data are handled here
        if(updateData) {
            console.log('update portal', portals_js[updateIndex]);
            if(portals_js[updateIndex]) {
                portals_js[updateIndex] = portal;
                localStorage.setItem('portals', JSON.stringify(portals_js));
            }
        } else {
            // new data are added to the local store
            if(portals_data) {
                portals_js.push(portal);
                localStorage.setItem('portals', JSON.stringify(portals_js));
            } else {
                localStorage.setItem('portals', JSON.stringify(this.state.portals));
            }
        }
        // send data to the central from here
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-6 col-lg-6" style={{ backgroundColor: 'white' }}>
                    <Header />
                    <AddPortal onSubmitData={this.handleSubmitData} updateData={this.props.location.state || null} />
                </div>
                <div className="col-md-6 col-lg-6" style={{ backgroundColor: '#F9FAFC' }}>
                    <AddPortalPreview updateData={this.props.location.state || null} />
                </div>
            </div>
        );
    }
}

function mapStateToProps({ preview }) {
    return { preview };
}

export default connect(mapStateToProps, actions)(NewPortal);