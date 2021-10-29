import { render, screen } from '@testing-library/react';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import Post, { getStaticProps } from 'pages/posts/preview/[slug]';
import { getPrismicClient } from 'services/prismic';
import { mocked } from 'ts-jest/utils';

jest.mock('services/prismic');
jest.mock('next-auth/client');
jest.mock('next/router');

const post = {
  slug: 'my-new-post',
  title: 'My New Post',
  content: '<p>Post content</p>',
  updatedAt: '01 de Abril',
};

describe('Post preview page', () => {
  test('renders correctly', () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce([null, false]);

    render(<Post post={post} />);

    expect(screen.getByText('My New Post')).toBeInTheDocument();
    expect(screen.getByText('Post content')).toBeInTheDocument();
    expect(screen.getByText('Wanna continue reading?')).toBeInTheDocument();
  });

  test('redirects user to full post when user is subscribed', async () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce([
      {
        activeSubscription: 'fake-active-subscription',
      },
      false,
    ] as any);

    const useRouterMocked = mocked(useRouter);
    const pushFnMock = jest.fn();

    useRouterMocked.mockReturnValueOnce({
      push: pushFnMock,
    } as any);

    render(<Post post={post} />);

    expect(pushFnMock).toHaveBeenCalledWith('/posts/my-new-post');
  });

  test('loads initial data with getStaticProps', async () => {
    const getPrismicClientMocked = mocked(getPrismicClient);

    getPrismicClientMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
        data: {
          title: [
            {
              type: 'heading',
              text: 'My new post',
            },
          ],
          content: [
            {
              type: 'paragraph',
              text: 'Post content',
            },
          ],
        },
        last_publication_date: '04-01-2021',
      }),
    } as any);

    const response = await getStaticProps({
      params: {
        slug: 'my-new-post',
      },
    });

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: {
            slug: 'my-new-post',
            title: 'My new post',
            content: '<p>Post content</p>',
            updatedAt: '01 de abril de 2021',
          },
        },
      })
    );
  });
});
