import React, {
  Fragment,
  useState,
  useEffect
} from 'react';
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

const Todo = ({ text, id, onRemove }) => (
  <li>
    { text }
    <button
      type="button"
      className="removeTodoButton"
      onClick={() => onRemove(id)}
    >
      x
    </button>
  </li>
);

const NewTodo = ({ onAdd }) => {
  const [text, setText] = useState('');

  const formSubmitted = (event) => {
    onAdd(text)
    setText('');
    event.preventDefault();
  }

  return (
    <Fragment>
      <form onSubmit={formSubmitted}>
        <input
          type="text"
          value={text}
          placeholder="do something"
          onChange={e => setText(e.target.value)}
        />
        <button type="submit" disabled={text === ''}>Add</button>
      </form>
    </Fragment>
  );
}

const SORT_ORDER_ALPHABETICAL = 'alphabetical'
const SORT_ORDER_CREATED = 'created'
const SORT_ORDERS = [SORT_ORDER_CREATED, SORT_ORDER_ALPHABETICAL]

const SORT_ORDERS_SYMBOLS = {
  [SORT_ORDER_CREATED]:'⇳',
  [SORT_ORDER_ALPHABETICAL]: '⇩',
}

function App() {
  const [todos, setTodos] = useState(['todo A','todo C', 'todo B', 'todo K'])
  const [sortOrder, setSortOrder] = useState(SORT_ORDER_CREATED);

  const [
    { data, isLoading, isError },
    doFetch
  ] = useDataApi('', []);

  useEffect(() => {
    setTodos([...data, ...todos])
  }, [data, isLoading]);

  const addTodo = (item) => {
    setTodos([item, ...todos]);
  };

  const removeTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const addByAjax = () => {
    (async () => {
      doFetch('data.json');
    })();
  }

  const switchToNextSortOrder = () => {
    const nextIndex = (SORT_ORDERS.indexOf(sortOrder) + 1) % SORT_ORDERS.length;
    setSortOrder(SORT_ORDERS[nextIndex]);
  }

  let todosSorted;
  switch (sortOrder) {
    case SORT_ORDER_CREATED:
      todosSorted = todos;
      break;
    case SORT_ORDER_ALPHABETICAL:
      todosSorted = [...todos].sort( (a,b) => a.localeCompare(b) );
      break;
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="hor">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Todo list</h1>
        </div>

        <NewTodo onAdd={addTodo} />
        <button type="button" onClick={addByAjax}>Add multiple</button>

        <ul>
          <button type="button" onClick={switchToNextSortOrder}>
            { SORT_ORDERS_SYMBOLS[sortOrder] }
          </button>
          { todosSorted.map(
              (item, i) => (
                <Todo
                  key={`i${i}`}
                  text={item}
                  id={i}
                  onRemove={removeTodo}
                />
              ))
          }
        </ul>

      </header>
    </div>
  );
}

export default App;
