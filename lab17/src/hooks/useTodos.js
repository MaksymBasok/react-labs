import { useState, useEffect, useCallback } from 'react';
import { nanoid } from 'nanoid';
import {
    fetchTodosApi,
    deleteTodoApi,
    toggleTodoApi,
} from '../api/todos.js';

export const useTodos = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const loadTodos = async () => {
            try {
                setIsLoading(true);
                const data = await fetchTodosApi(20);
                const adaptedTodos = data.todos.map(({ todo, ...rest }) => ({
                    ...rest,
                    text: todo,
                }));
                setTodos(adaptedTodos);
            } catch (err) {
                setError('Failed to load todos. Please try again.');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        loadTodos();
    }, []);

    const addTodo = useCallback((text) => {
        const newTodo = {
            id: `local_${nanoid()}`,
            text,
            completed: false,
        };
        setTodos((prevTodos) => [newTodo, ...prevTodos]);
    }, []);

    const toggleTodo = useCallback(async (id) => {
        let originalTodos;
        let newCompletedStatus;

        setTodos((prev) => {
            originalTodos = prev;
            return prev.map((todo) => {
                if (todo.id === id) {
                    newCompletedStatus = !todo.completed;
                    return { ...todo, completed: newCompletedStatus };
                }
                return todo;
            });
        });

        try {
            await toggleTodoApi(id, newCompletedStatus);
        } catch (err) {
            setError('Failed to update todo. Please try again.');
            setTodos(originalTodos);
        }
    }, []);

    const deleteTodo = useCallback(async (id) => {
        let originalTodos;

        setTodos((prev) => {
            originalTodos = prev;
            return prev.filter((todo) => todo.id !== id);
        });

        try {
            await deleteTodoApi(id);
        } catch (err) {
            setError('Failed to delete todo. Please try again.');
            setTodos(originalTodos);
        }
    }, []);

    return {
        todos,
        isLoading,
        error,
        addTodo,
        toggleTodo,
        deleteTodo,
    };
};