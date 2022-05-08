import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AppDispatch } from "..";
import { Todo, TodoStatus } from "../../types";

export interface GetSingleTodoListState {
  todos: Todo[];
  loaded: boolean;
  loading: boolean;
  error: string;
}
const initialState: GetSingleTodoListState = {
  todos: [],
  loaded: false,
  loading: false,
  error: "",
};

const getSingleTodoListSlice = createSlice({
  name: "getSingleTodoList",
  initialState,
  reducers: {
    getSingleTodoListRequestInit(state) {
      state.error = "";
      state.loading = true;
      state.loaded = false;
    },
    getSingleTodoListSuccess(state, { payload }) {
      state.todos = payload.data;
      state.loaded = false;
      state.loading = false;
    },
    getSingleTodoListFailure(state, { payload }) {
      state.error = payload.error;
    },
  },
});

const {
  getSingleTodoListRequestInit,
  getSingleTodoListSuccess,
  getSingleTodoListFailure,
} = getSingleTodoListSlice.actions;

// here we do a get request to get only one todo base on the clicked id
export const getSingleTodoListRequest =
  (id: Todo["id"]) => async (dispatch: AppDispatch) => {
    dispatch(getSingleTodoListRequestInit());
    try {
      const { data } = await axios.get(`/api/todos/test/${id}`);
      dispatch(getSingleTodoListSuccess(data));
    } catch (error: any) {
      dispatch(getSingleTodoListFailure(error.response.message));
    }
  };

export const { reducer: getSingleTodoListReducer } = getSingleTodoListSlice;
