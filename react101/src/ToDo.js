import React from 'react'

export default function ToDo({toDoElement, toggleToDo}) {
  function handleToDoClick(){
    toggleToDo(toDoElement.id)
  }
  return (
    <div>
        <label>
            <input type="checkbox" defaultChecked={toDoElement.complete} id={toDoElement.id} onChange={handleToDoClick} />
            {toDoElement.name}
        </label>
    </div>
  )
}
