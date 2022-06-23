import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import Counter from './counter';

describe('<Counter />', () => {
    it('display zero initial counts', () => {
        render(<Counter />)
        const result = screen.getByText(/Clicked times: 0/i);
        expect(result).toBeInTheDocument();
    });
    it('display new counter after one click', () => {
        render(<Counter />)

        const button = screen.getByText(/click/i, { selector: 'button' });
        fireEvent.click(button);

        screen.debug();

        const result = screen.getByText(/Clicked times: 1/i);
        expect(result).toBeInTheDocument();
    });
});