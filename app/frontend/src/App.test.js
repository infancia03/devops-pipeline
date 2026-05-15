import { render, screen } from '@testing-library/react';
import App from './App';

// Mock axios so tests don't make real HTTP calls
jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: [] })),
  post: jest.fn(() => Promise.resolve({ data: {} })),
  delete: jest.fn(() => Promise.resolve({ data: {} })),
}));

test('renders app heading', async () => {
  render(<App />);
  expect(screen.getByText(/DevOps Pipeline Demo/i)).toBeInTheDocument();
});

test('renders Add Item section', () => {
  render(<App />);
  expect(screen.getByText(/Add Item/i)).toBeInTheDocument();
});

test('renders Items section', () => {
  render(<App />);
  expect(screen.getByText(/Items/i)).toBeInTheDocument();
});