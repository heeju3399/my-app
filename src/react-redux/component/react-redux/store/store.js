import { createStore } from 'redux';

export default createStore(function (state, action) {
    console.log('pass??');
    console.log(state);

    if (state === undefined) {
        return { why: '메모리에 처음값이 저장되고나면 하위가 실행되도록 한다', size: 0 }
    }
    if (action.type === 'INCREMENT') {
        console.log(action);
        return { ...state, size: state.size + action.size }//스테이트 복사 , 사이즈는 계속 증가시키기!
    }

    return state;
}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());