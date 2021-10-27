import { render, screen } from '@testing-library/react';
import Home from 'pages/index';

jest.mock('next/router');
jest.mock('next-auth/client', () => {
  return {
    useSession: () => [null, false],
  };
});

describe('Home page', () => {
  test('renders page correctly', () => {
    render(<Home product={{ priceId: 'fake-price-id', amount: '$20.00' }} />);

    expect(screen.getByText('for $20.00 month')).toBeInTheDocument();
  });
});
