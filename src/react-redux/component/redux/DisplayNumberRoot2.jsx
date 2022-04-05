import React, { Component } from 'react';

import DisplayNumber from './DisplayNumber';

export default class ReduxDisplayNumberRoot extends Component {
    render() {
        return (
            <div >
                <h3>DisplayNumberRoot</h3>
                <DisplayNumber></DisplayNumber>
            </div>
        );
    }
}
