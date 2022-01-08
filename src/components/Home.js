import React from "react";
import { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import {
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
  collection,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { auth } from "../services/firebase";
import { db } from "../services/firebase";
import "../App.scss";

function Home({ user }) {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const q = query(collection(db, user.email), orderBy("timestamp"));
    user.uid &&
      onSnapshot(q, (snapshot) => {
        setTodos(snapshot.docs.map((doc) => doc.data().todo));
      });
  }, [user.email, user.uid]);

  const sendData = async () => {
    try {
      await setDoc(doc(db, user.email, input), {
        todo: input,
        timestamp: serverTimestamp(),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodo = async (t) => {
    try {
      await deleteDoc(doc(db, user.email, t));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="home">
      <div className="head">
        <h1>Hello, {user.displayName}</h1>
        <button onClick={() => signOut(auth)} className="signout">
          Sign out
        </button>
      </div>
      <div className="input">
        <input
          value={input}
          type="text"
          onChange={(e) => setInput(e.target.value)}
          placeholder="Todo stuff"
        />
        <button
          onClick={() => {
            sendData();
            setInput("");
          }}
        >
          Add
        </button>
      </div>
      <h1 className="todoTxt">TodoList</h1>
      <div className={`todoList ${todos.length === 0 ? "hidden" : ""}`}>
        {todos.map((t, i) => {
          return (
            <div key={i} className="todo">
              <h4>{i + 1}</h4>
              <div className="txt">{t}</div>
              <button onClick={() => deleteTodo(t)} className="del">
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
