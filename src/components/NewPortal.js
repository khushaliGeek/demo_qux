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
            portals: [
                 
            ]
        };
    }

    componentDidMount() {
        this.props.fetchPreview();
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-6 col-lg-6" style={{ backgroundColor: 'white' }}>
                    <Header />
                    <AddPortal />
                </div>
                <div className="col-md-6 col-lg-6" style={{ backgroundColor: '#F9FAFC' }}>
                    <AddPortalPreview />
                </div>
            </div>
        );
    }
}

function mapStateToProps({ preview }) {
    return { preview };
}

export default connect(mapStateToProps, actions)(NewPortal);