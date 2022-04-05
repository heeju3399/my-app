import React, { Component } from 'react';
import DisplayNumber from './containers/DisplayNumber';

export default class DisplayNumberRoot extends Component {
    render() {
        return (
            <div >
                <h3>DisplayNumberRoot</h3>
                <DisplayNumber></DisplayNumber>
            </div>
        );
    }
}
