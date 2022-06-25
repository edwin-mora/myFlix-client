import React from 'react';
import ReactDOM from 'react-dom';
import MainView from './components/main-view/main-view';

//import statement to indicate that ./index.scss need to be imported
import './index.scss';

// main component
class MyFlixApplication extends React.Component {
    render() {
        return (
            <MainView />
        );
    }
}

// finds the root of your app
const container = document.getElementsByClassName('app-container')[0];

// tells React to redner your app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);