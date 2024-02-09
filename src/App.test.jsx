import { render, screen } from '@testing-library/react';
import App from './App';

describe('App component', () => {
  it('renders without crashing', () => {
    render(<App />);
    const appElement = screen.getByTestId('app');
    expect(appElement).toBeInTheDocument();
  });

  it('displays the React logo', () => {
    render(<App />);
    const reactLogoElement = screen.getByAltText('React logo');
    expect(reactLogoElement).toBeInTheDocument();
  });

  it('displays the Vite logo', () => {
    render(<App />);
    const viteLogoElement = screen.getByAltText('Vite logo');
    expect(viteLogoElement).toBeInTheDocument();
  });
});


