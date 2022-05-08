import React from "react";
import ReactDOM from "react-dom";
import { AddTodoPage } from "../AddTodoPage";
import { TodoListPage } from "../TodoListPage"
import { App } from "../../App"
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
// import renderer from "react-test-renderer";



// Here we try to render if these componets exist and if they render
// afterEach(cleanup);
// it("Navbar renders without crashing", () => {
//   const div = document.createElement("div");
//   ReactDOM.render(<AddTodoPage />, div);
// });

it("Navbar renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
});

