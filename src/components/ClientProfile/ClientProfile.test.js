import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import ClientProfile from "../ClientProfile/ClientProfile";

describe("ClientProfile component", () => {
  test("renders form inputs", () => {
    const { getByLabelText } = render(<ClientProfile />);
    expect(getByLabelText("Full Name:")).toBeInTheDocument();
    expect(getByLabelText("Address 1:")).toBeInTheDocument();
    expect(getByLabelText("Address 2:")).toBeInTheDocument();
    expect(getByLabelText("City:")).toBeInTheDocument();
    expect(getByLabelText("State:")).toBeInTheDocument();
    expect(getByLabelText("Zip Code:")).toBeInTheDocument();
  });

  test("allows user to fill out form", async () => {
    const { getByLabelText } = render(<ClientProfile />);

    fireEvent.change(getByLabelText("Full Name:"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(getByLabelText("Address 1:"), {
      target: { value: "123 Main St" },
    });
    fireEvent.change(getByLabelText("Address 2:"), {
      target: { value: "Apt 101" },
    });
    fireEvent.change(getByLabelText("City:"), { target: { value: "Anytown" } });
    fireEvent.change(getByLabelText("State:"), { target: { value: "CA" } });
    fireEvent.change(getByLabelText("Zip Code:"), {
      target: { value: "12345" },
    });

    expect(getByLabelText("Full Name:").value).toBe("John Doe");
    expect(getByLabelText("Address 1:").value).toBe("123 Main St");
    expect(getByLabelText("Address 2:").value).toBe("Apt 101");
    expect(getByLabelText("City:").value).toBe("Anytown");
    expect(getByLabelText("State:").value).toBe("CA");
    expect(getByLabelText("Zip Code:").value).toBe("12345");
  });

  test("submits form data", async () => {
    const mockLoadUser = jest.fn(); // Create a mock function for loadUser
    const { getByLabelText, getByText } = render(
      <ClientProfile loadUser={mockLoadUser} />
    );
    const submitButton = getByText("Sign in");

    fireEvent.change(getByLabelText("Full Name:"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(getByLabelText("Address 1:"), {
      target: { value: "123 Main St" },
    });
    fireEvent.change(getByLabelText("Address 2:"), {
      target: { value: "Apt 101" },
    });
    fireEvent.change(getByLabelText("City:"), { target: { value: "Anytown" } });
    fireEvent.change(getByLabelText("State:"), { target: { value: "CA" } });
    fireEvent.change(getByLabelText("Zip Code:"), {
      target: { value: "12345" },
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(global.fetch("http://localhost:3000/clientprofile")).toHaveBeenCalledWith({ 
        id: 1,
        name: "John",
        fullname: "John Doe",
        address1: "123 Main St",
        address2: "Apt 101",
        city: "Anytown",
        selectedState: "CA",
        zipcode: "12345",
      });
    });
  });
});
