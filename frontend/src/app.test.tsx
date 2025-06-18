import { render, screen } from '@testing-library/react';
import App from './App';

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