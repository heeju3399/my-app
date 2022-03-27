import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function Header(props, title, content) {
  console.log(props);
  console.log(title);
  console.log(content);

  return <header>
    <h1>
      <a href='/' onClick={(event) => {
        event.preventDefault(); // 리로드 안댐!
        props.onChangeMode();

      }} >
        {props.title}
      </a>
    </h1>
  </header>
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
    <h2>
      {title}
    </h2>
    <span>{body}</span>
  </article>
}


function CREATE(props) {
  console.log('222');
  const title = props.title;
  const body = props.body;
  console.log(title);
  console.log(body);
  return <article>
    <h2>
      Create
    </h2>
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
      id: 3, title: 'js2', body: 'js is ....'
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
          }}>update</a>
        </li>
        <li>
          <input
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
          />
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

  return (
    <div>
      <Header title="React!!"
        onChangeMode={() => {
          setMode('home');
        }}
      ></Header>
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
          }}>create</a>
        </li>
        {contextControl}

      </ul>

    </div>
  );
}

export default App;

