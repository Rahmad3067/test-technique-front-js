import { Button, CircularProgress, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { AppDispatch, RootState } from "../store";
import { TodoComponent } from "../components";
import { getTodoListRequest } from "../store/reducers/getTodoList";

export const TodoListPage: React.FC = () => {
  const nav = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { todos, loading, loaded, error } = useSelector(
    (state: RootState) => state.getTodoList
  );



  // we seperate all Todos into two diffrent groups based on their status and then displayed on two diffrent cards
  // done created to filer all todos that their status are Done
  const done = todos.filter((todo) => todo.status === "done");
  // pending created to filer all todos that their status are pending
  const pending = todos.filter((todo) => todo.status === "pending");




  useEffect(() => {
    if (!loading && !loaded && error == "") {
      dispatch(getTodoListRequest());
    }
  }, [dispatch, loading, loaded]);

  return (
    <div>
      <Typography variant="h4">List of todos</Typography>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "5rem",
          width: "100%",
          maxWidth: "40rem",
          margin: "0 auto",
        }}
      >
        {loading ? (
          <CircularProgress />
        ) : (
          <div
            style={{
              width: "100%",
            }}
          >
            {done.length > 0 && loaded ? (
              done.map((todo) => (
                <TodoComponent
                  id={todo.id}
                  title={todo.title}
                  description={todo.description}
                  status={todo.status}
                />
              ))
            ) : (
              <Typography>There is no todos to show.</Typography>
            )}
          </div>
        )}

        <Button
          variant="contained"
          disableElevation
          fullWidth
          onClick={() => nav("/add", { replace: true })}
          style={{ marginTop: "3rem", width: "100%" }}
        >
          Add todo +
        </Button>
        {loading ? (
          <CircularProgress />
        ) : (
          <div
            style={{
              width: "100%",
            }}
          >
            {pending.length > 0 && loaded ? (
              pending.map((todo) => (
                <TodoComponent
                  id={todo.id}
                  title={todo.title}
                  description={todo.description}
                  status={todo.status}
                />
              ))
            ) : (
              <Typography>There is no todos to show.</Typography>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
