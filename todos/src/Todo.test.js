import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Todo from "./Todo";

it("renders without crashing", function () {
  render(<Todo />);
});

it("matches snapshot", function () {
  const { asFragment } = render(<Todo />);
  expect(asFragment()).toMatchSnapshot();
});

it("matches snapshot when editing", function () {
  const { asFragment } = render(<Todo />);
  const editButton = screen.getByText("Edit");
  fireEvent.click(editButton);
  expect(asFragment()).toMatchSnapshot();
});

it("runs the update function on form submit", function () {
  const updateMock = jest.fn();
  //   const  getByText  = render(<Todo update={updateMock} />);
  const editButton = screen.getByText("Edit");
  fireEvent.click(editButton);
  const updateButton = screen.getByText("Update");
  fireEvent.click(updateButton);
  expect(updateMock).toHaveBeenCalled();
});

it("runs the delete function on button click", function () {
  const removeMock = jest.fn();
  //   const { getByText } = render(<Todo remove={removeMock} />);
  const deleteButton = screen.getByText("X");
  fireEvent.click(deleteButton);
  expect(removeMock).toHaveBeenCalled();
});
