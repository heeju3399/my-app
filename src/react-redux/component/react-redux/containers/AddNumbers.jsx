import AddNumber from '../AddNumber';
import { connect } from 'react-redux';

function mapReduxDispatchToReactProps(dispatch) {
    return {
        onClick: function (size) {
            dispatch({ type: 'INCREMENT', size: size })
        }
    }
}

export default connect(null, mapReduxDispatchToReactProps)(AddNumber);




// import store from '../store/store';

// export default class extends Component {
//     render() {
//         return <AddNumber onClick={
//             function (size) {
//                 store.dispatch({ type: 'INCREMENT', size: size });
//             }.bind(this)
//         }></AddNumber>
//     }
// }