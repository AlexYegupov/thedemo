import React, {
  Fragment,
  useState,
  useEffect
} from 'react';
import InfiniteScroll from 'react-infinite-scroller';
//import InfiniteScroll from 'React-infinite-scroll-component';
import logo from './logo.svg';
import './App.css';

const useDataApi = (initialUrl, initialData) => {
  const [data, setData] = useState(initialData);
  const [url, setUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await fetch(url);
        const data = await result.json();
        setData(data);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [url]);

  return [{ data, isLoading, isError }, setUrl];
};

const TodoList = (props) => (
    <ul>
      { props.children }
    </ul>
);

const Todo = ({ text, kk }) => (
  <li key={kk}>{ text }</li>
);

const NewTodo = ({ onClick }) => {
  const [text, setText] = useState('');

  const clicked = () => {
    onClick(text)
    setText('');
  }

  return (
    <Fragment>
      <input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button type="button" onClick={clicked}>Add</button>
    </Fragment>
  );
}

function App() {
  const [todos, setTodos] = useState(['todoA','todoB'])

  const [
    { data, isLoading, isError },
    doFetch
  ] = useDataApi('', []);

  useEffect(() => {
    setTodos([...todos, ...data])
  }, [data]);

  const addTodo = (item) => {
    setTodos([...todos, item]);
  };

  const addManyTodos = () => {
    (async () => {
      doFetch('data.json');
    })();
  }

  const loadFunc = () => {
    setTodos([...todos, ...[
      Date.now(),
      Date.now(),
      Date.now(),
      Date.now(),
      Date.now(),
      Date.now(),
      Date.now(),
      Date.now(),
      Date.now(),
      Date.now(),
      Date.now(),
      Date.now(),
      Date.now(),
      Date.now(),
      Date.now(),
      Date.now(),
      Date.now(),
      Date.now(),
    ]]);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <NewTodo onClick={addTodo} />
        <button type="button" onClick={addManyTodos}>add many</button>

        <TodoList>
          <div style={{height: 700, overflow:'auto'}}>
            <InfiniteScroll
              pageStart={0}
              loadMore={loadFunc}
              hasMore={true}
              loader={
                <div
                  key={0} /* https://github.com/danbovey/react-infinite-scroller/issues/133#issuecomment-361241470 */
                >Loading...</div>
              }
              useWindow={false}
            >
              { todos.map( (item, i) => (
                <Todo key={`i${i}`} kk={`i${i}`} text={item} />
              ))
              }
            </InfiniteScroll>
          </div>
        </TodoList>

      </header>
    </div>
  );
}

export default App;
