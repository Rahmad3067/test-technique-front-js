import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AppDispatch } from "..";
import { Todo } from "../../types";
import { getTodoListRequest } from "./getTodoList";

export interface updateTodoState {
  loading: boolean;
  error: string;
}

const initialState: updateTodoState = {
  loading: false,
  error: "",
};

const updateTodoSlice = createSlice({
  name: "updateTodoList",
  initialState,
  reducers: {
    updateTodoRequestInit(state) {
      state.error = "";
      state.loading = true;
    },
    updateTodoSuccess(state) {
      state.loading = false;
    },

    updateTodoFailure(state, { payload }) {
      state.error = payload;
      state.loading = false;
    },
  },
});
console.log("successtest", updateTodoSlice);
const { updateTodoRequestInit, updateTodoSuccess, updateTodoFailure } =
  updateTodoSlice.actions;

export const updateTodoRequest =
  (id: string, todo: Todo) => async (dispatch: AppDispatch) => {
    dispatch(updateTodoRequestInit());
    try {
      await axios.put(`/api/todos/edit/${id}`, todo);
      dispatch(updateTodoSuccess());
      dispatch(getTodoListRequest());
    } catch (error: any) {
      dispatch(updateTodoFailure(error.response.message));
    }
  };
export const { reducer: updateTodoReducer } = updateTodoSlice;
