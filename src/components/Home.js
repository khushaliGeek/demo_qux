import React from 'react';
import Header from './Header';
import PortalGenerator from './HomeComponents/PortalGenerator';

class Home extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            portalData: {}
        };
    }

    handleSubmitData(data) {
        this.setState({
            portalData: data
        });


        console.log(this.state);
    }

    render() {
        return (
            <div className="row container-fluid">
                <div className="col-md-6 col-lg-6" style={{ backgroundColor: 'white' }}>
                    <Header />
                    <PortalGenerator onFormSubmit={this.handleSubmitData.bind(this)} />
                </div>
                <div className="col-md-6 col-lg-6">
                    
                </div>
            </div>
        );
    }
}

export default Home;