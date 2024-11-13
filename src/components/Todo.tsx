"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import Modal from '../components/Modal';

interface todos {
    id: number;
    title: string;
    completed: boolean;
}
const Todo = () => {
    const [todos, setTodos] = useState<todos[]>([])
    const [todoName, setTodoName] = useState<string>("")
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [todoToEdit, setTodoToEdit] = useState<todos | null>(null);
    const [editedTitle, setEditedTitle] = useState<string>('');
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [todoToDelete, setTodoToDelete] = useState<todos | null>(null);


    const addTodo = () => {
        if (!todoName) return
        const newTodo = {
            id: todos.length,
            title: todoName,
            completed: false
        }
        setTodos([...todos, newTodo])
        setTodoName("")
    }

    const confirmDeleteTodo = (todo: todos) => {
        setTodoToDelete(todo);
        setDeleteModalOpen(true);
    }

    const deleteTodo = () => {
        if (todoToDelete) {
            const newTodos = todos.filter((todo) => todo.id !== todoToDelete.id);
            setTodos(newTodos);
            setDeleteModalOpen(false);
            setTodoToDelete(null);
        }
    }
    const changeTodoStatus = (id: number) => {
        const newTodos = todos.map((todo) => {
            if (todo.id === id) {
                todo.completed = !todo.completed
            }
            return todo
        })
        setTodos(newTodos)
    }

    const editTodo = (todo: todos) => {
        setTodoToEdit(todo);
        setEditedTitle(todo.title);
        setIsModalOpen(true);
    }
    const saveEditedTodo = () => {
        if (todoToEdit && editedTitle.trim()) {
            const newTodos = todos.map((todo) => {
                if (todo.id === todoToEdit.id) {
                    todo.title = editedTitle;
                }
                return todo;
            });
            setTodos(newTodos);
            setIsModalOpen(false);
            setTodoToEdit(null);
            setEditedTitle('');
        }
    }

    return (
        <div className="h-[100vh] w-full flex flex-col items-center p-8 bg-gray-900 text-gray-100">
            {/* Input section */}
            <div className="w-full max-w-md mb-8 flex items-center">
                <input type='text'
                    className="w-full p-2 bg-gray-800 border-2 border-gray-700 text-gray-100 rounded-lg focus:outline-none focus:border-violet-500 placeholder-gray-400"
                    value={todoName}
                    onChange={(e) => setTodoName(e.target.value)}
                    placeholder="Enter a new task..."

                />
                <button
                    className="p-2 ml-4 bg-violet-600 text-gray-100 rounded-lg hover:bg-violet-700 transition-colors"
                    onClick={addTodo}
                >
                    +
                </button>
            </div>

            {/* Todo list section */}
            <div className="w-full max-w-md space-y-4">
                {todos.slice().reverse().map((todo) => (
                    <div
                        className="flex justify-between items-center p-4 bg-gray-800 border border-gray-700 rounded-lg shadow-md"
                        key={todo.id}
                    >
                        <input
                            type="checkbox"
                            className="w-6 h-6 text-violet-600 bg-gray-800 border-gray-700 rounded focus:ring-2 focus:ring-violet-500 focus:ring-offset-gray-900 transition-colors"
                            onClick={() => changeTodoStatus(todo.id)}
                        />

                        <div className="text-lg font-semibold text-gray-100">{todo.title}</div>
                        <div
                            className={`text-sm font-medium ${todo.completed ? "text-green-400" : "text-red-400"
                                }`}
                        >
                            {todo.completed ? "Completed" : "Not Completed"}
                        </div>
                        <button
                            className="p-2 text-yellow-400 hover:text-yellow-500 transition-colors"
                            onClick={() => editTodo(todo)}
                        >
                            Edit
                        </button>
                        <button
                            className="p-2 text-red-400 hover:text-red-500 transition-colors"
                            onClick={() => confirmDeleteTodo(todo)}
                        >
                            Delete
                        </button>
                        <Modal
                            isOpen={isModalOpen}
                            title="Edit Todo"
                            onClose={() => setIsModalOpen(false)}
                            onSave={saveEditedTodo}
                            yes = "Save"
                            no = "Cancel"
                        >
                            <input
                                type="text"
                                value={editedTitle}
                                onChange={(e) => setEditedTitle(e.target.value)}
                                className="w-full p-2 bg-gray-700 text-gray-100 border-2 border-gray-600 rounded-lg focus:outline-none focus:border-violet-500"
                            />
                        </Modal>
                        <Modal
                            isOpen={isDeleteModalOpen}
                            title="Confirm Deletion"
                            onClose={() => setDeleteModalOpen(false)}
                            onSave={() => deleteTodo()}
                            yes = "Delete"
                            no = "Cancel"
                        >
                            <p className="text-gray-300 mb-4">
                                Are you sure you want to delete the todo "{todoToDelete?.title}"?
                            </p>
                        </Modal>
                    </div>
                ))}
            </div>
        </div>

    )
}

export default Todo
