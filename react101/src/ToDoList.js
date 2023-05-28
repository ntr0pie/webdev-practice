import React from "react";
import ToDo from "./ToDo";

export default function ToDoList({toDoList, toggleToDo}){
    return (
        toDoList.map(
            toDoElement => {
                return <ToDo key={toDoElement.id} toDoElement={toDoElement} toggleToDo={toggleToDo} />
            })
    )
} 