
import React, { Component } from 'react';
import store from '../../../store/store';

export default class DisplayNumber extends Component {
    state = { size: store.getState().size }; //기본값 셋팅?
    count = 0;
    constructor(props) { // 새로이 바뀔때마다


        super(props);
        console.log('00000000000000000000');
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
        console.log('**********************************');
        console.log(this.state.size);
        return (
            <div >
                <h1>DisplayNumber</h1>
                <input type="text" value={this.state.size} readOnly></input>
            </div>
        );
    }
}
