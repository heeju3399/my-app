
import DisplayNumber from '../DisplayNumber';
import { connect } from 'react-redux';
// connect(수신,송신);
// connect(스테이트 !! , 디스페치!!);

function mapReduxStateToReactProps(state) {
    // 리덕스의 스테이트를 리엑트의 프롭스로 연결시켜준다 맵핑 시켜준다의 뜻
    // 기능 : 리덕스 스토어에 값이 변경될때마다 이 함수를 호출히고 인자로 state값을 받을수있음
    return {
        size: state.size
    }
}

function mapReduxDispatchToReactProps(dispatch) {
    // 리덕스의 디스페치를 리덕스의 프롭스로 연결시켜준다 
    return {}
}

export default connect(mapReduxStateToReactProps, mapReduxDispatchToReactProps)
    (DisplayNumber);

    //아래의 코드를 단 한줄로....

// export default class extends Component {
//     state = { size: store.getState().size }; //기본값 셋팅?
//     count = 0;
//     constructor(props) { // 새로이 바뀔때마다
//         super(props);
//         console.log(props);
//         store.subscribe(  // 새로이 바뀔때마다
//             function () {
//                 console.log('언제 호출?');
//                 console.log(this.state.size);
//                 this.setState({ size: store.getState().size }); // state에 안에 있는 값을 넣어줘라 지금당장
//                 console.log('이후값?! 같은데 카운트 : ' + this.count);
//                 console.log(this.state.size);
//                 this.count++;
//             }.bind(this)
//         );
//     }
//     render() {
//         return <DisplayNumber size={this.state.size}></DisplayNumber>
//     }
// }
