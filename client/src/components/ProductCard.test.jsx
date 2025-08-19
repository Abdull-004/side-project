import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ProductCard from "./ProductCard";

const productSample = {
    _id: "abc123",
    name: "Test Product",
    imageUrl: "/test.jpg",
    price: 100,
    inStock: true,
};

test("renders product name, price and image", () => {
    render(<ProductCard p={productSample} onOrder={() => { }} />);

    expect(screen.getByText(/Test Product/i)).toBeInTheDocument();
    expect(screen.getByText(/KSh 100.00/i)).toBeInTheDocument();
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", expect.stringContaining(productSample.imageUrl));
});

test("calls onOrder when 'Order' button is clicked", () => {
    const onOrderMock = jest.fn();
    render(<ProductCard p={productSample} onOrder={onOrderMock} />);

    const orderButton = screen.getByRole("button", { name: /order/i });
    fireEvent.click(orderButton);

    expect(onOrderMock).toHaveBeenCalledTimes(1);
    expect(onOrderMock).toHaveBeenCalledWith(productSample);
});

test("disables button and shows 'Unavailable' when stock is false", () => {
    const outOfStock = { ...productSample, inStock: false };
    render(<ProductCard p={outOfStock} onOrder={() => { }} />);

    const button = screen.getByRole("button", { name: /unavailable/i });
    expect(button).toBeDisabled();
});
