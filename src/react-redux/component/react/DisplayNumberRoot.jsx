import React, { Component } from 'react';

import DisplayNumber from './DisplayNumber';

export default class DisplayNumberRoot extends Component {
    render() {
        return (
            <div >
                <h3>DisplayNumberRoot</h3>
                <DisplayNumber number={this.props.number}></DisplayNumber>

            </div>
        );
    }
}
