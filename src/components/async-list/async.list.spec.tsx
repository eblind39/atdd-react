import React from "react";
import { render, screen } from '@testing-library/react';

import AsyncList from "./async-list";

describe('<AsyncList />', () => {
    it('renders component', async () => {
        render(<AsyncList />);
        screen.debug();
        const hamburger =  await screen.findByText(/hamburger/i);
        expect(hamburger).toBeInTheDocument();
        expect(await screen.findByText(/pizza/i)).toBeInTheDocument();
        expect(await screen.findByText(/tacos/i)).toBeInTheDocument();
    });
});