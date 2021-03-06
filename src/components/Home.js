import React from 'react';
import Header from './Header';
import PortalGenerator from './HomeComponents/PortalGenerator';
import PortalPreview from './HomeComponents/PortalPreview';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Home extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            portalName: null,
            portalCategory: null,
            portalExplict: null,
            portalDescription: null,
            portalDesktop: null,
            portalProfile: null,
            portalBackground: null,
            authorName: null,
            authorProfile: null,
            portalPublic: null,
            subportals: null
        };
    }

    componentDidMount() {
        document.title = "QUX Media - Portal Generator";
        let portals = localStorage.getItem('portals') || null;
        let mainPortal = localStorage.getItem('mainPortal') || null;
        if(portals) {
            this.setState({
                subportals: JSON.parse(portals)
            });
        }

        if(mainPortal) {
            let data = JSON.parse(mainPortal);
            let { portalName, portalCategory, portalExplict, authorName, portalDescription, portalPublic } = data;
            this.setState({
                portalName,
                portalCategory,
                portalExplict,
                authorName,
                portalDescription,
                portalPublic
            });
        }
    }

    handleSubmitData(data, flag) {
        let { portalName, portalCategory, portalExplict, portalPublic, authorName, authorProfile, portalDescription, portalProfile, portalBackground, portalDesktop } = data;
        this.setState({
            portalName,
            portalCategory,
            portalExplict,
            portalDesktop,
            portalProfile,
            portalBackground,
            authorName,
            authorProfile,
            portalDescription,
            portalPublic
        });
        localStorage.setItem('mainPortal', JSON.stringify({
            portalName,
            portalCategory,
            portalExplict,
            authorName,
            portalDescription,
            portalPublic
        }));

        // save api call only if flag is true
        if(flag) {
            let portals = localStorage.getItem('portals') || null;
            if(portals) {
                portals = JSON.parse(portals);
            }
            let data = {
                portalName,
                portalCategory,
                portalExplict,
                portalDesktop,
                portalProfile,
                portalBackground,
                authorName,
                authorProfile,
                portalDescription,
                portalPublic,
                portals
            };

            this.props.newPortalGeneration(data);
        }
    }

    handlePhotoData(key, value) {
        this.setState({
            [key]: value
        });
        localStorage.setItem(key, value);
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-6 col-lg-6" style={{ backgroundColor: 'white' }}>
                    <Header />
                    <PortalGenerator onFormSubmit={this.handleSubmitData.bind(this)} onPhotoSubmit={this.handlePhotoData.bind(this)} />
                </div>
                <div className="col-md-6 col-lg-6" style={{ backgroundColor: '#F9FAFC' }}>
                    <PortalPreview portalProfile={this.state.portalProfile || null} portalBackground={this.state.portalBackground || null} portalName={this.state.portalName || null} portalDescription={this.state.portalDescription || null} subportals={this.state.subportals || null} />
                </div>
            </div>
        );
    }
}

export default connect(null, actions)(Home);