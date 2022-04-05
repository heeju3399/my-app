import React, { Component } from 'react';
import AddNumber from './AddNumber';

export default class ReduxAddNumberRoot extends Component {
    render() {
        return (
            <div className='AddNumberRootDiv'>
                <h3>AddNumberRoot</h3>
                <AddNumber onClick={function (size) {
                }.bind(this)}></AddNumber>
            </div>
        );
    }
}