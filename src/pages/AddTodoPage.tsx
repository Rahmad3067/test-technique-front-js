import {
  Button,
  Select,
  TextField,
  Typography,
  MenuItem,
  FormHelperText,
} from "@mui/material";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { addTodoRequest } from "../store/reducers/addTodo";
import { TodoStatus } from "../types";
import { AppDispatch } from "../store";
import { red } from "@mui/material/colors";

export const AddTodoPage: React.FC = () => {
  const nav = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("done");
  // this state is to show error under title input if its lower than 8 charactars
  const [titleError, setTitleError] = useState("");

  // sending the form 
  const handleSubmit = (event: any) => {
    event.preventDefault();
    // checking if the minimum characters are 8
    if (title.length < 8) {
      setTitleError("Minimum 8 charachters!");
      return;
    }
    const todo = {
      title,
      description,
      status: status,
    };

    dispatch(addTodoRequest(todo));
    nav("/");
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h4">Add a todo</Typography>

        <Button onClick={() => nav("/")}>Go back to list</Button>
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            aria-describedby="component-error-text"
          />
          <FormHelperText style={{ color: "red" }} id="component-error-text">
            {titleError}
          </FormHelperText>
          <TextField
            label="Description"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ marginTop: "3rem" }}
          />
          <Select
            label="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
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
            onClick={() => nav("/add", { replace: true })}
            style={{ width: "100%", marginTop: "3rem" }}
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};
