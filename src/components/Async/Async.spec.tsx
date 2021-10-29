import { render, screen, waitFor } from '@testing-library/react';
import { Async } from '.';

describe('Async component', () => {
  test('it renders correctly', async () => {
    render(<Async />);

    expect(screen.getByText('Hello World')).toBeInTheDocument();

    await waitFor(
      () => {
        return expect(screen.getByText('Async Button')).toBeInTheDocument();
      },
      {
        timeout: 3000,
      }
    );
  });
});

// you can use "waitFor" or "findByText" for any async operations
// expect(await screen.findByText('Async Button', {}, { timeout: 3000 })).toBeInTheDocument();
