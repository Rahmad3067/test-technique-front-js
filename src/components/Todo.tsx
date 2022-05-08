import { Card, Typography } from "@mui/material";
import { deleteTodoRequest } from "../store/reducers/deleteTodo";
import {getSingleTodoListRequest} from "../store/reducers/singleTodo"
import React from "react";
import { TodoStatus } from "../types";
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch } from "../store";
import { useDispatch } from "react-redux";

interface TodoComponentProps {
  title: string;
  id: string;
  description: string;
  status: TodoStatus;
}


export const TodoComponent: React.FC<TodoComponentProps> = ({
  id,
  title,
  description,
  status,
}) => {
  const dispatch: AppDispatch = useDispatch();

  return (
    <div>
      <Card
        elevation={0}
        style={{
          padding: "2rem",
          border: "2px solid lightgray",
        }}
      >
        <div>
          <Typography fontSize="1.2rem" fontWeight="bold" color="gray">
            Title
          </Typography>
          <p>{title}</p>

          <Typography fontSize="1.2rem" fontWeight="bold" color="gray">
            Description
          </Typography>
          <p>{description}</p>
          <Typography fontSize="1.2rem" fontWeight="bold" color="gray">
            Status
          </Typography>
          <p>{status}</p>
          {/* created new link to access an edit todo page base on the id */}
          <Link
            to={{ pathname: `/todos/edit/${id}` }}
            onClick={() => {
              dispatch(getSingleTodoListRequest(id));
            }}
          >
            Edite
          </Link>
          {/* on the button the onclick created so with clicking on each todo, it takes their id and will delete it */}
          <button
            onClick={() => {
              dispatch(deleteTodoRequest(id));
            }}
          >
            Delete
          </button>
        </div>
      </Card>
    </div>
  );
};
