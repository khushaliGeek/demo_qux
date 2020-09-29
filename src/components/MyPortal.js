import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Header from './Header';
import Portal from './MyPortalComponents/Portal';

class MyPortal extends React.Component {

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        document.title = "QUX Media - My Portals";
        this.props.fetchUserportals();
    }

    renderContent() {
        let cards = [];
        if(this.props.userPortals) {
            this.props.userPortals.map((item) => {
                cards.push(
                    <Portal 
                        item={item}
                        key={item.portal_id}
                        setToLocal={this.setPortalToLocal}
                    />
                );
            });
            
        }

        return cards;
    }

    render() {
        // console.log('fetched portals', this.props.userPortals);
        return (
            <div className="">
                <Header />
                <div className="row container mx-auto">
                    {
                        this.renderContent()
                    }
                </div>
            </div>
        );
    }
}

function mapStateToProps({ userPortals }) {
    return {
        userPortals
    };
}

export default connect(mapStateToProps, actions)(MyPortal);