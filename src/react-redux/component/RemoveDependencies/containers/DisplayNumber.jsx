import React, { Component } from 'react';
import DisplayNumber from '../DisplayNumber';
import store from '../../../../store/store';

export default class extends Component {
    state = { size: store.getState().size }; //기본값 셋팅?
    count = 0;
    constructor(props) { // 새로이 바뀔때마다
        super(props);
        console.log(props);
        store.subscribe(  // 새로이 바뀔때마다             
            function () {
                console.log('언제 호출?');
                console.log(this.state.size);
                this.setState({ size: store.getState().size }); // state에 안에 있는 값을 넣어줘라 지금당장 
                console.log('이후값?! 같은데 카운트 : ' + this.count);
                console.log(this.state.size);
                this.count++;
            }.bind(this)
        );
    }
    render() {
        return <DisplayNumber size={this.state.size}></DisplayNumber>
    }
}
