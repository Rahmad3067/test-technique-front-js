import React from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { TodoListPage, AddTodoPage } from "./pages";
import { EditTodoPage } from "./pages";

export const App: React.FC = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route path="/add" element={<AddTodoPage />} />
      {/* new root create to access the edite page base on id */}
      <Route path="/todos/edit/:id" element={<EditTodoPage />} />
      <Route index element={<TodoListPage />} />
    </Route>
  </Routes>
);

export default App;
