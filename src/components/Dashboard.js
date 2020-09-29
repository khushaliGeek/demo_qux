import React from 'react';
import Header from './Header';

class Dashboard extends React.Component {

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        document.title = "QUX Media - Dashboard"
    }

    render() {
        return (
            <div className="">
                <Header />
            </div>
        );
    }
}

export default Dashboard;