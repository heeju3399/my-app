import React, { Component } from 'react';
import AddNumber from './AddNumber';

export default class AddNumberRoot extends Component {
    render() {
        return (
            <div className='AddNumberRootDiv'>
                <h3>AddNumberRoot</h3>
                <AddNumber onClick={function (size) {
                    this.props.onClick(size);
                }.bind(this)}></AddNumber>
            </div>
        );
    }
}