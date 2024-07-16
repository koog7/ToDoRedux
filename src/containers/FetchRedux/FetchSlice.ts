import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import axiosAPI from "../../axios/AxiosAPI.ts";
import {RootState} from "../../app/store.ts";

interface Todo {
    id: number | string;
    title: string;
    completed: boolean;
}

interface TodoState {
    todos: Todo[];
    loading: boolean;
    error: boolean;
}

const initialState: TodoState = {
    todos: [],
    loading: false,
    error: false,
};

export const getTodo = createAsyncThunk<Todo[], void, { state: RootState }>('todos/fetchTodos', async () => {
    try{
        const response = await axiosAPI.get<Todo[]>('/todos.json');
        return Object.values(response.data);
    }catch (error) {
        console.error('Error:', error);
    }
});

export const postTodo = createAsyncThunk<Todo, Todo>('todos/postTodos', async (newTodo) => {
    try{
        const response = await axiosAPI.post<Todo>('/todos.json', newTodo);
        return { ...newTodo, id: response.data.name };
    }catch (error) {
        console.error('Error:', error);
    }
});

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        updateTodo: (state, action: PayloadAction<Todo>) => {
            const updatedTodo = action.payload;
            if (state.todos[updatedTodo.id]) {
                state.todos[updatedTodo.id] = updatedTodo;
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getTodo.pending, (state: TodoState) => {
            state.loading = true;
            state.error = false;
        }).addCase(getTodo.fulfilled, (state: TodoState, action: PayloadAction<Todo[]>) => {
            state.loading = false;
            state.todos = action.payload;
        }).addCase(getTodo.rejected, (state: TodoState) => {
            state.loading = false;
            state.error = true;
        }).addCase(postTodo.pending, (state: TodoState) => {
            state.loading = true;
            state.error = false;
        }).addCase(postTodo.fulfilled, (state: TodoState, action: PayloadAction<Todo>) => {
            if (Array.isArray(state.todos)) {
                state.todos.push(action.payload);
            } else {
                state.todos = [action.payload];
            }
            state.loading = false;
        }).addCase(postTodo.rejected, (state: TodoState) => {
            state.loading = false;
            state.error = true;
        });
    },
});

export const ToDoReducer = todoSlice.reducer;
export const  {updateTodo}  = todoSlice.actions;