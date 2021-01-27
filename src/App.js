import React from 'react';

import Header from '../src/components/header/header';

import Routes from './routes';


import './App.css';

/*global chrome*/
class App extends React.Component {

    render() {
        return (
            <div className="App">
                <Header/>
                <Routes/>
            </div>
        );
    }
}

export default App;
