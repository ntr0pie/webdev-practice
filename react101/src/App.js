import React from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import ToDoList from './ToDoList'
import { v4 as uuidv4 } from 'uuid';
const LOCAL_STORAGE_KEY = 'toDoList.tdl'

function App() {
  const [toDoList, setToDoList] = useState([])
  const toDoNameRef = useRef() 

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setToDoList(storedTodos)
    console.log("Loading ", storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(toDoList))
    console.log("Saving ", toDoList)
  }, [toDoList])

  function toggleToDo(id){
    const newToDoList = [...toDoList]
    const toDoElement = newToDoList.find(toDoElement => toDoElement.id === id)
    toDoElement.complete = !toDoElement.complete
    setToDoList(newToDoList)
  }

  function handleAddToDo(event){
    const name = toDoNameRef.current.value
    if (name === ''){
      return
    }
    setToDoList(prevTDList => {
      const newTodo = {id: uuidv4(), name: name, complete: false}
      return [...prevTDList, newTodo]
    })
    toDoNameRef.current.value = null
  }

  function handleClearToDo(event){
    const newTodoList = toDoList.filter(toDoElement => toDoElement.complete === false)
    setToDoList(newTodoList)
  }
  return (
    <>
      <ToDoList toDoList={toDoList} toggleToDo={toggleToDo}/>
      <input ref={toDoNameRef} type="text" />
      <button onClick={handleAddToDo}>Add To Do</button>
      <button onClick={handleClearToDo}>Clear Completed</button>
      <div>{toDoList.filter(toDoElement => !toDoElement.complete).length} left to do</div>
    </>
  )
}

export default App
