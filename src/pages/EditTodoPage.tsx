import { Button, TextField, Typography, Select, MenuItem } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { updateTodoRequest } from "../store/reducers/updateTodo";
import { GetTodoListState } from "../store/reducers/getTodoList";
import { TodoStatus } from "../types";
import { RootState, AppDispatch } from "../store";
import { useParams } from "react-router";


export const EditTodoPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const nav = useNavigate();
  // getting the id from the page url
  const { id } = useParams();
  console.log("test title", id);
  // getting one Todo to render the information as values
  const { todos } = useSelector((state) => state.getSingleTodoList);

  const [newtitle, setNewitle] = useState("");
  const [newdescription, setNewescription] = useState("");
  const [newstatus, setNewstatus] = useState("");

  // useEffect used so we can be able to type and change the values inside the inputs or select 
  useEffect(() => {
    setNewitle(todos.title);
    setNewescription(todos.description);
    setNewstatus(todos.status);
  }, [todos]);

  // sending the form for updating
  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(event);

    const todo = {
      id: id,
      title: newtitle,
      description: newdescription,
      status: newstatus,
    };
    console.log("testing new info", todo);
    dispatch(updateTodoRequest(id, todo));
    nav("/");
  };



  return (
    <div>
      <h1>hello</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Button>Go back to list</Button>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "5rem",
          width: "100%",
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            width: "40rem",
          }}
        >
          <TextField
            label="Title"
            value={newtitle}
            name="title"
            onChange={(e) => {
              setNewitle(e.target.value);
            }}
          />

          <TextField
            label="Description"
            multiline
            rows={4}
            value={newdescription}
            onChange={(e) => setNewescription(e.target.value)}
            style={{ marginTop: "3rem" }}
          />
          <Select
            label="Status"
            value={newstatus}
            onChange={(e) => setNewstatus(e.target.value)}
          >
            <MenuItem value="done">Done</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
          </Select>

          <Button
            variant="contained"
            disableElevation
            fullWidth
            size="large"
            type="submit"
            style={{ width: "100%", marginTop: "3rem" }}
          >
            Update
          </Button>
        </form>
      </div>
    </div>
  );
};
