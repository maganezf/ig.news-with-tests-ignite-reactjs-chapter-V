import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { Async } from '.';

describe('Async component', () => {
  test('it renders correctly', async () => {
    render(<Async />);

    expect(screen.getByText('Hello World')).toBeInTheDocument();

    await waitForElementToBeRemoved(screen.queryByText('Async Button'), {
      timeout: 3000,
    });
  });
});

/*
  use "waitFor" with ".not" to check if the document is not visible (in this case)

  await waitFor(
    () => {
      return expect(
        screen.queryByText('Async Button')
      ).not.toBeInTheDocument();
    },
    {
      timeout: 3000,
    }
  );

  or use "waitForElementToBeRemoved", its already to do this already negating the condition

  ps: using "queryByText", it doesn't throw an error if it doesn't find it.
 */
