import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AppDispatch } from "..";
import { Todo } from "../../types";
import { getTodoListRequest } from "./getTodoList";

export interface deleteTodoState {
  loading: boolean;
  error: string;
}

const initialState: deleteTodoState = {
  loading: false,
  error: "",
};

const deleteTodoSlice = createSlice({
  name: "deleteTodoList",
  initialState,
  reducers: {
    deleteTodoRequestInit(state) {
      state.error = "";
      state.loading = true;
    },
    deleteTodoSuccess(state) {
      state.loading = false;
    },
    deleteTodoFailure(state, { payload }) {
      state.error = payload;
      state.loading = false;
    },
  },
});

const { deleteTodoRequestInit, deleteTodoSuccess, deleteTodoFailure } =
  deleteTodoSlice.actions;

export const deleteTodoRequest = (id: Todo["id"]) => async (dispatch: AppDispatch) => {
  dispatch(deleteTodoRequestInit());
  try {
    await axios.delete(`/api/todos/delete/${id}`);
    dispatch(deleteTodoSuccess());
    dispatch(getTodoListRequest());
  } catch (error: any) {
    dispatch(deleteTodoFailure(error.response.message));
  }
};

export const { reducer: deleteTodoReducer } = deleteTodoSlice;
