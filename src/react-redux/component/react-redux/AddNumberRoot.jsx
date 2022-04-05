import React, { Component } from 'react';
import AddNumber from './containers/AddNumbers';

export default class AddNumberRoot extends Component {
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