import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  // type, interfaceaのいずれかで宣言
  // まとめて型を宣言
  type Todo = {
    inputValue: string;
    id: number;
    checked: boolean;
  };

  // eの型定義を忘れずに
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // 送信ボタンを押した際にページリロードが走らないようにする
    e.preventDefault();

    const newTodo: Todo = {
      inputValue: inputValue,
      id: todos.length,
      checked: false
    };
    // スプレッド構文で展開してnewTodoを挿入する。
    setTodos([newTodo, ...todos]);
    setInputValue("");
  };

  const handleEdit = (id: number, inputValue: string) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.inputValue = inputValue;
      }
      // returnを忘れずに
      return todo;
    });

    setTodos(newTodos);
  };

  const handleChecked = (id: number, ischecked: boolean) => {
    const newTodo = todos.map((todo) => {
      if (todo.id === id) {
        todo.checked = !ischecked;
      }
      return todo;
    });    
    setTodos(newTodo);
  }

  const handleDelete = (id: number) => {
    // filter関数
    // 条件がtrueになった時のみ、配列に残す。
    const newTodos = todos.filter((todo)=> todo.id !== id);
    setTodos(newTodos);
  }

  return (
    <div className="App">
      <div className="">
        <h2>Todoリスト with Typescript</h2>
        <form action="" onSubmit={(e) => handleSubmit(e)}>
          <input type="text"
            onChange={
              (e) => handleChange(e)}
            className="inputText"
          />
          <input type="submit" value="作成" className="submitButton" />
        </form>
        <ul className='todoList'>
          {todos.map((todo) => (
            <li key={todo.id}>
              <input type="text"
                onChange={
                  (e) => handleEdit(todo.id, e.target.value)
                }
                className="inputText"
                value={todo.inputValue}
                disabled={todo.checked}
              />
              <input type="checkbox"
                onChange={
                  (e) => handleChecked(todo.id, todo.checked)
                }
                className="inputText"
                value={todo.inputValue}
              />
              <button onClick={()=>handleDelete(todo.id)}>消す</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default App;
