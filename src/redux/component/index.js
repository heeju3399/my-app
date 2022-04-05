
function source() {
    location.href = "https://github.com/heeju3399/crud-redux.git";
}

function subject() {
    document.querySelector('#subject').innerHTML =
        ` <header>
                    <h3>CRUD_REDUX</h3>
                    <button onclick="source()">소스</button>
                </header>`;
}

function TOC() {
    var state = store.getState();
    var i = 0;
    var liTags = '';
    while (i < state.contents.length) {
        liTags = liTags +
            `
                    <li><a 
                        onclick = "event.preventDefault(); 
                        var action33 = {type: 'SELECT', id:${state.contents[i].id}}; 
                        store.dispatch(action33);"     
                        
                        href="${state.contents[i].id}">${state.contents[i].title}</a></li>
                `;
        i = i + 1;
    }
    document.querySelector('#toc').innerHTML =
        `
    <nav>
        <h4>리스트</h4>
        <ol>
            ${liTags}
        </ol>
    </nav>
    `;
}

function control() {

    document.querySelector('#control').innerHTML =
        ` 
         <ul>
            <li><a onclick="
                    event.preventDefault();
                    store.dispatch({type:'cm', mode:'create'});
                " href="/create">create</a></li>
                <li><a onclick="
                    event.preventDefault();
                    store.dispatch({type:'updatePage'});
                " href="/update">update</a></li>
            <li><input onclick="store.dispatch({type:'DELETE'});" type="button" / value="delete"></li>
        </ul>
                    
                `;
}

function article() {
    console.log('article pass');
    var state = store.getState();
    console.log(state);
    if (state.mode === 'create') {
        document.querySelector('#content').innerHTML = ` 
                 <article id="create">                    
                    <form onsubmit="
                        event.preventDefault();
                        var _title = this.title.value;
                        var _desc = this.desc.value;
                        store.dispatch({type:'CREATE', title:_title, desc:_desc});
                    ">
                    <p>
                        <input type="text" name="title" placeholder = "title"/>    
                    </p>
                    <p>
                        <textarea name="desc" placeholder = "description"></textarea>    
                    </p>
                    <p>
                        <input type="submit" value="save"/>   
                    </p>
                    </form>
                </article>`;
    } else if (state.mode === 'read') {
        var i = 0;
        var aTitle, aDesc;
        while (i < state.contents.length) {
            if (state.contents[i].id === state.selected_id) {
                aTitle = state.contents[i].title;
                aDesc = state.contents[i].desc;
                break;
            }
            i = i + 1;
        }
        document.querySelector('#content').innerHTML = `
    <article id="articleRead">
        <h4>${aTitle}</h4>
        <span>${aDesc}</span>
    </article>`;
    } else if (state.mode === 'welcome') {
        document.querySelector('#content').innerHTML = ` 
                 <article id="welcome">                    
                    <h4>WelCOME</h4>
                    <span>HELLLOW REDUX!</span>
                </article>`;
    } else if (state.mode === 'modify') {

        const selected_id = state.selected_id;
        const getTitle = state.contents[selected_id].title;
        const getDesc = state.contents[selected_id].desc;

        document.querySelector('#content').innerHTML = `
    <article id="modify">
        <form onsubmit="
                        event.preventDefault();
                        var _title = this.title.value;
                        var _desc = this.desc.value;
                        store.dispatch({type:'updateData', title:_title, desc:_desc, selected_id:${selected_id}});
                    ">
            <p>
                <input type="text" name="title" placeholder="title" value="${getTitle}" />
            </p>
            <p>
                <textarea name="desc" placeholder="description">${getDesc}</textarea>
            </p>
            <p>
                <input type="submit" value="save" />
            </p>
        </form>
    </article>`;
    }
}
var count = 0;
function reducer(state, action) {
    console.log('=====================reducer===================');
    if (state === undefined) {
        return {
            max_id: 2,
            mode: 'welcome',
            selected_id: 0,
            contents: [
                { id: 0, title: 'HTML', desc: 'HTML is .....' },
                { id: 1, title: 'CSS', desc: 'CSS is .....' },
                { id: 2, title: 'JS', desc: 'JS is .....' },
            ]
        }
    }
    var newState;
    if (action.type === 'SELECT') {
        newState = Object.assign({}, state, { selected_id: action.id, mode: 'read' });
    } else if (action.type === 'CREATE') {
        var newMaxId = state.max_id + 1;
        var newContents = state.contents.concat(); // 배열복사해서 똑같은 배열로 리턴!
        newContents.push({ id: newMaxId, title: action.title, desc: action.desc });
        newState = Object.assign({}, state, {
            max_id: newMaxId,
            contents: newContents,
            mode: 'create'
        });
    } else if (action.type === 'DELETE') {
        var newContents = [];
        for (var i = 0; i < state.contents.length; i++) {
            if (state.selected_id !== state.contents[i].id) {
                newContents.push(state.contents[i]);
            }
        }
        newState = Object.assign({}, state, { contents: newContents, mode: "welcome", max_id: state.max_id - 1 });
    } else if (action.type === 'cm') {
        newState = Object.assign({}, state, { mode: action.mode });
    } else if (action.type === 'updatePage') {
        // 클릭한 타이틀과 콘텐츠를 넘겨줘야함 
        console.log('count : ' + count);
        count++;
        newState = Object.assign({}, state, { mode: 'modify' });

    } else if (action.type === 'updateData') {
        console.log('updateData pass');
        var newContents = state.contents.concat(); // 배열복사해서 똑같은 배열로 리턴!

        const newData = {
            id: action.selected_id, title: action.title, desc: action.desc
        };
        newContents.splice(action.selected_id, 1, newData);
        console.log('*****************************');
        console.log(newContents);
        newState = Object.assign({}, state, {
            contents: newContents,
            mode: 'read'

        });
    }
    return newState;
}
var store = Redux.createStore(reducer);
store.subscribe(article);
store.subscribe(TOC);
subject();
TOC();
control();
article();
