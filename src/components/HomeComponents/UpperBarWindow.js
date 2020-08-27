import React from 'react';
import '../../css/HomeCss.css';

class UpperBarWindow extends React.Component {

    render() {

        return (
            <div className="mx-auto">
                {/* upper bar of the window */}
                <div className="my-auto p-2" id="upper-bar-window">
                    <span id="red-button"></span>
                    <span id="yellow-button"></span>
                    <span id="green-button"></span>
                </div> 
            </div>
        );
    }
}

export default UpperBarWindow;