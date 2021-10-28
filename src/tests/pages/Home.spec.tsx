import { render, screen } from '@testing-library/react';
import Home, { getStaticProps } from 'pages/index';
import { stripe } from 'services/stripe';
import { mocked } from 'ts-jest/utils';

jest.mock('next/router');
jest.mock('next-auth/client', () => {
  return {
    useSession: () => [null, false],
  };
});

jest.mock('services/stripe');

describe('Home page', () => {
  test('renders page correctly', () => {
    render(<Home product={{ priceId: 'fake-price-id', amount: '$10.00' }} />);

    expect(screen.getByText('for $10.00 month')).toBeInTheDocument();
  });

  test('loads initial data with getStaticProps', async () => {
    const retriveStripePricesFnMocked = mocked(stripe.prices.retrieve);

    retriveStripePricesFnMocked.mockResolvedValueOnce({
      id: 'fake-price-id',
      unit_amount: 1000,
    } as any);

    const response = await getStaticProps({});

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          product: {
            priceId: 'fake-price-id',
            amount: '$10.00',
          },
        },
      })
    );
  });
});
