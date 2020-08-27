import React from 'react';
import Header from './Header';
import PortalGenerator from './HomeComponents/PortalGenerator';
import PortalPreview from './HomeComponents/PortalPreview';

class Home extends React.Component {

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
    }

    handleSubmitData(data) {
        this.setState({
            portalName: data.portalName,
            portalCategory: data.portalCategory,
            portalExplict: data.portalExplict,
            portalDesktop: data.portalDesktop,
            portalProfile: data.portalProfile,
            portalBackground: data.portalBackground,
            authorName: data.authorName,
            authorProfile: data.authorProfile
        });

        console.log(this.state.portalProfile);
    }

    handlePhotoData(key, value) {
        console.log(value);
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-6 col-lg-6 container-fluid" style={{ backgroundColor: 'white' }}>
                    <Header />
                    <PortalGenerator onFormSubmit={this.handleSubmitData.bind(this)} onPhotoSubmit={this.handlePhotoData.bind(this)} />
                </div>
                <div className="col-md-6 col-lg-6 container-fluid" style={{ backgroundColor: '#F9FAFC' }}>
                    {
                        this.state.portalProfile ? 
                        <PortalPreview portalProfile={this.state.portalProfile} />
                        :
                        <PortalPreview portalProfile="" />
                    }
                </div>
            </div>
        );
    }
}

export default Home;