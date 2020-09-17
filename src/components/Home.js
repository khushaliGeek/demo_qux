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
            authorProfile: null,
            subportals: null
        };
    }

    componentDidMount() {
        let portals = localStorage.getItem('portals') || null;
        let mainPortal = localStorage.getItem('mainPortal') || null;
        if(portals) {
            this.setState({
                subportals: JSON.parse(portals)
            });
        }

        if(mainPortal) {
            let data = JSON.parse(mainPortal);
            
        }
        
    }

    handleSubmitData(data, flag) {
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
        localStorage.setItem('mainPortal', JSON.stringify(data));

        // save api call only if flag is true
        if(flag) {
            
        }
    }

    handlePhotoData(key, value) {
        this.setState({
            [key]: value
        });
        localStorage.setItem(key, value);
    }

    render() {
        console.log('Home component', this.state.subportals);
        return (
            <div className="row">
                <div className="col-md-6 col-lg-6" style={{ backgroundColor: 'white' }}>
                    <Header />
                    <PortalGenerator onFormSubmit={this.handleSubmitData.bind(this)} onPhotoSubmit={this.handlePhotoData.bind(this)}/>
                </div>
                <div className="col-md-6 col-lg-6" style={{ backgroundColor: '#F9FAFC' }}>
                    <PortalPreview portalProfile={this.state.portalProfile || null} portalBackground={this.state.portalBackground || null} subportals={this.state.subportals || null} />
                </div>
            </div>
        );
    }
}

export default Home;