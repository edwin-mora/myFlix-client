import React from 'react';
import ReactDOM from 'react-dom';

//import statement to indicate that ./index.scss need to be imported
import './index.scss';
import reactDom from 'react-dom';

// main component
class MyFlixApplication extends React.Component {
    render() {
        return (
            <div className="my-flix">
                <div> Good morning</div>
            </div>
        );
    }
}

// finds the root of your app
const container = document.getElementsByClassName('app-container')[0];

// tells React to redner your app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);