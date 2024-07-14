import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import axiosAPI from "../../axios/AxiosAPI.ts";

interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

interface TodoState {
    todo: Todo[];
    loading: boolean;
    error: boolean;
}

const initialState: TodoState = {
    todo: [],
    loading: false,
    error: false,
};

export const getTodo = createAsyncThunk<Todo[]>('todos/fetchTodos', async () => {
    const response = await axiosAPI.get<Todo[]>('https://jsonplaceholder.typicode.com/todos');
    return response.data;
});
export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.todo.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getTodo.pending, (state: TodoState) => {
            state.loading = true;
            state.error = false;
            console.log(state.loading , state.error)
        }).addCase(getTodo.fulfilled, (state: TodoState, action: PayloadAction<Todo[]>) => {
            state.loading = false;
            state.todo = action.payload;
            console.log(state.loading , state.todo)
        }).addCase(getTodo.rejected, (state: TodoState) => {
            state.loading = false;
            state.error = true;
            console.log(state.loading , state.error)
        });
    },
});

export const ToDoReducer = todoSlice.reducer;
export const  {addTodo}  = todoSlice.actions;