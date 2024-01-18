import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import TodoList from "./TodoList";

function addTodo(todoList, task = "write tests") {
  const taskInput = screen.getByLabelText("Task:");
  fireEvent.change(taskInput, { target: { value: task } });
  const submitButton = screen.getByText("Add a todo");
  fireEvent.click(submitButton);
}

it("renders without crashing", function () {
  render(<TodoList />);
});

it("matches snapshot", function () {
  const { asFragment } = render(<TodoList />);
  expect(asFragment()).toMatchSnapshot();
});

it("can add a todo", function () {
  const { list } = render(<TodoList />);
  addTodo(list);

  // expect form to clear and todo to be on the page
  expect(screen.getByLabelText("Task:")).toHaveValue("");
  expect(screen.getByText("write tests")).toBeInTheDocument();
  expect(screen.getByText("Edit")).toBeInTheDocument();
  expect(screen.getByText("X")).toBeInTheDocument();
});

it("can edit a todo", function () {
  const { list } = render(<TodoList />);
  addTodo(list);

  fireEvent.click(screen.getByText("X"));

  // expect todo to be removed
  expect(screen.queryByText("write tests")).not.toBeInTheDocument();
});
