import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Header from './Header';
import ProgressBarModal from './ProgressBarModal';
import Portal from './MyPortalComponents/Portal';

class MyPortal extends React.Component {

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        document.title = "QUX Media - My Portals";
        this.props.fetchUserportals();
    }

    renderPublicContent() {
        let cards = [];
        if(this.props.userPortals) {
            this.props.userPortals.map((item) => {
                if(item.portal_public.toString(10) === "1") {
                    cards.push(
                        <Portal
                            item={item}
                            key={item.portal_id}
                            setToLocal={this.setPortalToLocal}
                        />
                    );
                }
                
            });
            
        }

        return cards;
    }

    renderFamilyContent() {
        let cards = [];
        if (this.props.userPortals) {
            this.props.userPortals.map((item) => {
                if(item.portal_public.toString(10) === "0") {
                    cards.push(
                        <Portal
                            item={item}
                            key={item.portal_id}
                            setToLocal={this.setPortalToLocal}
                        />
                    );
                }
                
            });

        }

        return cards;
    }

    render() {
        // console.log('fetched portals', this.props.userPortals);
        return (
            <div className="">
                <Header />

                <div className="container">
                    <h5>
                        Public Portals
                    </h5>
                    {
                        this.props.userPortals ?
                            <div className="row container mx-auto">
                                {
                                    this.renderPublicContent()
                                }
                            </div>
                            :
                            <ProgressBarModal title="Fetching Portals" />
                    }
                </div>

                <div className="container">
                    <h5>
                        Family Portals
                    </h5>
                    {
                        this.props.userPortals ?
                            <div className="row container mx-auto">
                                {
                                    this.renderFamilyContent()
                                }
                            </div>
                            :
                            <ProgressBarModal title="Fetching Portals" />
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