import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AdminDashboard from "./AdminDashboard";
import * as api from "../lib/axios";

jest.mock("../lib/axios");

const productsMock = [
    {
        _id: "1",
        name: "Product 1",
        price: 10,
        inStock: true,
        imageUrl: "/image1.jpg"
    }
];

beforeEach(() => {
    api.api = {
        get: jest.fn().mockResolvedValue({ data: productsMock }),
        post: jest.fn().mockResolvedValue({}),
        put: jest.fn().mockResolvedValue({}),
        delete: jest.fn().mockResolvedValue({})
    };
});

test("renders product list", async () => {
    render(<AdminDashboard />);

    // Wait for products to appear
    await waitFor(() => expect(screen.getByText(/Product 1/i)).toBeInTheDocument());

    expect(screen.getByText(/KSh 10.00/i)).toBeInTheDocument();
});

test("add and update form processes input", async () => {
    render(<AdminDashboard />);

    // Enter product name
    fireEvent.change(screen.getByPlaceholderText(/name/i), { target: { value: "New Product" } });

    // Enter price
    fireEvent.change(screen.getByPlaceholderText(/price/i), { target: { value: "20" } });

    // Submit the form to create
    fireEvent.click(screen.getByText(/create/i));

    await waitFor(() => {
        expect(api.api.post).toHaveBeenCalled();
    });
});
