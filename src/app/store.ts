import {configureStore} from '@reduxjs/toolkit';
import {ToDoReducer} from "../containers/FetchRedux/FetchSlice.ts";

export const store = configureStore({
    reducer: {
        todo: ToDoReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
