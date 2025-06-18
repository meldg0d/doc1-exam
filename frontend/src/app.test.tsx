import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock fetch before any tests run
beforeEach(() => {
    global.fetch = vi.fn(() =>
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve([]),
        })
    ) as any;
});

describe('App', () => {
    it('renders tabloid articles heading', async () => {
        render(<App />);
        expect(screen.getByText('Tabloid Articles')).toBeInTheDocument();
    });

    it('renders add article button', async () => {
        render(<App />);
        expect(screen.getByText('Add Article')).toBeInTheDocument();
    });

    it('renders search input', async () => {
        render(<App />);
        expect(screen.getByPlaceholderText('Search articles...')).toBeInTheDocument();
    });
});