import { configureStore } from "@reduxjs/toolkit";
import { getTodoListReducer } from "./reducers/getTodoList";
import { addTodoReducer } from "./reducers/addTodo";
import { getSingleTodoListReducer } from "./reducers/singleTodo"
import { updateTodoReducer } from "./reducers/updateTodo"
import { deleteTodoReducer } from "./reducers/deleteTodo"

export const store = configureStore({
  reducer: {
    getTodoList: getTodoListReducer,
    addTodo: addTodoReducer,
    getSingleTodoList: getSingleTodoListReducer,
    updateTodoList: updateTodoReducer,
    deleteTodoList:deleteTodoReducer
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
