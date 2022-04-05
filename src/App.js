import logo from './logo.svg';
import './style/App.css';
import React, { Component, useState } from 'react';
import AddNumberRoot from './react-redux/component/react/AddNumberRoot';
import DisplayNumberRoot from './react-redux/component/react/DisplayNumberRoot';

import ReduxAddNumberRoot from './react-redux/component/redux/AddNumberRoot2';
import ReduxDisplayNumberRoot from './react-redux/component/redux/DisplayNumberRoot2';

import RDAddNumberRoot from './react-redux/component/RemoveDependencies/AddNumberRoot';
import RDDisplayNumberRoot from './react-redux/component/RemoveDependencies/DisplayNumberRoot';

import RRAddNumberRoot from './react-redux/component/react-redux/AddNumberRoot';
import RRDisplayNumberRoot from './react-redux/component/react-redux/DisplayNumberRoot';

import ReduxRoot from './redux/redux';

function Header(props, title, content) {
  console.log(props);
  console.log(title);
  console.log(content);

  return <header>
    <div className='reduxPage'>
      <a href='#' onClick={(event) => {

        event.preventDefault();
        props.pageChange('reactPage');
        console.log('react a button click');
      }}>React</a>
      <a href='#' onClick={(event) => {
        event.preventDefault();
        props.pageChange('reduxPage');
      }}>Redux</a>
      <a href='#' onClick={(event) => {
        event.preventDefault();
        props.pageChange('react-redux');
      }}>React-Redux</a>
    </div>
    <div className='reactPage'>
      <h3>
        <a href='/' onClick={(event) => {
          event.preventDefault(); // 리로드 안댐!
          props.onChangeMode();
        }} >
          {props.title}
        </a>
      </h3></div>


  </header >
}

function Nav(props) {
  let list = [];
  for (let i = 0; i < props.topics.length; i++) {
    let t = props.topics[i];
    list.push(
      <li key={i} ><a id={t.id} href={'/read/' + t.id} onClick={(e) => {
        e.preventDefault();
        props.onChangeMode(Number(e.target.id));
      }}>{t.title}</a></li>
    );
  }

  return <nav>
    <ol>
      {list}
    </ol>
  </nav>
}

function Article(props) {
  console.log(props);
  const title = props.title;
  const body = props.body;

  return <article>
    <span>==page==</span><br></br>
    <span>      titie : {title}    </span>
    <span>body : {body}</span>
  </article>
}


function CREATE(props) {
  console.log('222');
  const title = props.title;
  const body = props.body;
  console.log(title);
  console.log(body);
  return <article>
    <h3>
      Create
    </h3>
    <form className='form' onSubmit={event => {
      event.preventDefault();
      const title = event.target.title.value;
      const body = event.target.body.value;
      props.onCreate(title, body);
    }}>
      <input type="text" name="title" placeholder="tiile2" />
      <textarea name='body' placeholder='body!!'></textarea>
      <p><input type="submit" value="Create"></input></p>
    </form>
  </article >
}

function Update(props) {
  const [title, setTitle] = useState(props.topics.title);
  const [body, setBody] = useState(props.topics.body);
  console.log('update call title : ' + title + '// body :' + body);

  return <article>
    <h2>
      update
    </h2>
    <form onSubmit={event => {
      event.preventDefault();
      const title = event.target.title.value;
      const body = event.target.body.value;
      props.onUpdate(title, body);
    }}>
      <input type="text" name="title" placeholder="tiile" value={title} onChange={event => {
        console.log(event.target.value);
        setTitle(event.target.value);
      }} />
      <textarea name='body' placeholder='body' value={body} onChange={event => {
        console.log(event.target.value);
        setBody(event.target.value);
      }} ></textarea>
      <p><input type="submit" value="Update!!"></input></p>
    </form>
  </article >
}

function App() {

  // const _mode = userState('Welcome');
  // const mode = _mode[0];
  // const setMode = _mode[1];
  // 위의 3개가 
  const [page, setPage] = useState('reactPage');
  const [mode, setMode] = useState('home');
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);
  const [topics, setTopics] = useState([
    {
      id: 1, title: 'html2', body: 'html is ....'
    },
    {
      id: 2, title: 'css2', body: 'css is ....'
    },
    {
      id: 3, title: 'js222', body: 'js is ....'
    },
  ]);

  let content = null;
  let contextControl = null;

  console.log('------------------------');
  console.log('mode : ' + mode);
  console.log('------------------------');


  if (mode === 'home') {
    content = <Article title="home!" body="Hello, WEB"></Article>
  } else if (mode === 'read') {
    let title, body = null;
    for (let i = 0; i < topics.length; i++) {
      console.log(topics[i].id, id);
      if (topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title={title} body={body}></Article>
    contextControl =
      <>
        <li>
          <a href={'/update' + id} onClick={event => {
            event.preventDefault();
            setMode('UPDATE');
          }}>page update</a>
        </li>
        <li>
          <div
            className='deleteInput'
            type="button"
            value="Delete"
            onClick={() => {
              const newTopics = [];
              for (let i = 0; i < topics.length; i++) {
                if (topics[i].id !== id) {
                  newTopics.push(topics[i]);
                }
              }
              setTopics(newTopics);
              setMode('home');
            }}
          >page delete</div>
        </li>
      </>

  } else if (mode === 'CREATE') {
    content = <CREATE title='x' body='z' onCreate={(_titile, _body) => {
      console.log('333');
      console.log('!!!!!!!!!!!!!!title :' + _titile + ' // ' + _body);
      const newTopic = { id: nextId, title: _titile, body: _body };
      const newTopics = [...topics];
      newTopics.push(newTopic);
      setTopics(newTopics);
      setMode('read');
      setId(nextId);
      setNextId(nextId + 1);
    }}></CREATE>
  } else if (mode === 'UPDATE') {
    content = <Update id={id} topics={topics[id - 1]} onUpdate={(tiitle, body) => {
      console.log('title : ' + tiitle + './//. body :' + body);
      const updatedTopic = { id: id, title: tiitle, body: body };
      const newTopics = [...topics];
      for (let i = 0; i < newTopics.length; i++) {
        if (newTopics[i].id === id) {
          newTopics[i] = updatedTopic;
          break;
        }
      }
      setTopics(newTopics);
      setMode('read');
    }} ></Update>

  }



  var returnPage = [];
  returnPage.push(
    <div> <Header title={page}
      onChangeMode={() => {
        setMode('home');
      }}
      pageChange={(value) => {
        if (value === 'reactPage') {
          setPage('reactPage');
        } else if (value === 'reduxPage') {
          setPage('reduxPage');
        } else if (value === 'react-redux') {
          setPage('react-redux');
        }
      }}
    ></Header>
    </div>);
  if (page === 'reactPage') {
    returnPage.push(
      <div>
        <Nav topics={topics} onChangeMode={(_id) => {
          console.log('=======================');
          console.log(_id);
          setMode('read');
          setId(_id);
        }}></Nav>
        {content}
        <br />
        <hr />
        <ul>
          <li>
            <a href='/create' onClick={event => {
              console.log('1111');
              event.preventDefault();
              setMode('CREATE');
            }}>page create</a>
          </li>
          {contextControl}
        </ul>
        <footer>

        </footer>
      </div>
    );


  } else if (page === 'reduxPage') {
    returnPage.push(
      <div>
        <ReduxRoot></ReduxRoot>
      </div>


    );
  } else if (page === 'react-redux') {
    returnPage.push(
      <div>
        <AppReactTest></AppReactTest>
      </div>
    );
  }

  return (
    <div>{returnPage}</div>

  );
}

class AppReactTest extends Component {
  state = { number: 0 }

  render() {
    const explanation1 = '리엑트만 사용했을때에는 props 호출과 setState호출을 각각 클래스마다 해줘야하는 번거로움이 있음';
    const explanation2 = '순서 : AddNumber > AddNumberRoot > Root > DisplayNumberRoot > DisplayNumber ';

    const explanation3 = '리엑트 리덕스 사용법  : 1. 최상위 index.js에 Provider 추가하기 2. connect 사용하기 ';
    const explanation4 = 'connect( 1,2 )( 사용할 컴포넌트 );';

    return (
      <div>
        <div className='react-redux'>
          <h3>리엑트만 사용했을때 1증가 카운트</h3>
          <h4>root</h4>
          <AddNumberRoot onClick={
            function (size) {
              this.setState({ number: this.state.number + size })
            }.bind(this)
          }></AddNumberRoot>
          <DisplayNumberRoot number={this.state.number}></DisplayNumberRoot>
          <span>{explanation1}</span>
          <br />
          <span>{explanation2}</span>

        </div>
        <br /><hr /><br />
        <div className='react-redux'>
          <h3> 리덕스를 같이 사용했을때 1증가 카운트</h3>
          <h4>root</h4>
          <ReduxAddNumberRoot onClick={
            function (size) {
              this.setState({ number: this.state.number + size })
            }.bind(this)
          }></ReduxAddNumberRoot>
          <ReduxDisplayNumberRoot number={this.state.number}></ReduxDisplayNumberRoot>
        </div>

        <br /><hr /><br />
        <div className='react-redux'>
          <h3> 종속성 제거(부품화 할수있음) 1증가 카운트</h3>

          <h4>root</h4>
          <RDAddNumberRoot onClick={
            function (size) {
              this.setState({ number: this.state.number + size })
            }.bind(this)
          }></RDAddNumberRoot>
          <RDDisplayNumberRoot number={this.state.number}></RDDisplayNumberRoot>
        </div>

        <br /><hr /><br />
        <div className='react-redux'>
          <h3> react-redux 사용 1증가 카운트</h3>
          <span>connect 사용!</span>
          <h4>root</h4>
          <RRAddNumberRoot onClick={
            function (size) {
              this.setState({ number: this.state.number + size })
            }.bind(this)
          }></RRAddNumberRoot>
          <RRDisplayNumberRoot number={this.state.number}></RRDisplayNumberRoot>
        </div>

      </div >


    );
  }
}

export default App;

