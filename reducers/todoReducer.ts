// reducers/todoReducer.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  completedAt?: string; 
}

const initialState: Todo[] = [];

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.push(action.payload);
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.find((t) => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
        todo.completedAt = todo.completed ? new Date().toISOString() : undefined;
      }
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      return state.filter((todo) => todo.id !== action.payload);
    },
    updateTodoTitle: (state, action: PayloadAction<{ id: number; newTitle: string }>) => {
      const { id, newTitle } = action.payload;
      const todoToUpdate = state.find((todo) => todo.id === id);
      if (todoToUpdate) {
        todoToUpdate.title = newTitle;
      }
    },
    updateTodoDescription: (state, action: PayloadAction<{ id: number; newDescription: string }>) => {
      const { id, newDescription } = action.payload;
      const todoToUpdate = state.find((todo) => todo.id === id);
      if (todoToUpdate) {
        todoToUpdate.description = newDescription;
      }
    },
  },
});

export const { addTodo, toggleTodo, deleteTodo , updateTodoTitle, updateTodoDescription } = todoSlice.actions;

export default todoSlice.reducer;
