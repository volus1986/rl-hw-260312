'use client';

import { type NextPage } from 'next';
import Error from 'next/error';
import Link from 'next/link';
import { useEffect } from 'react';

import { Button } from './shared/components';

// interface
interface IProps {
  error: Error & { digest?: string };
  reset: () => void;
}

// component
const Page: NextPage<Readonly<IProps>> = (props) => {
  const { error } = props;

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  // return
  return (
    <html>
      <body className='flex h-screen w-screen flex-col items-center justify-center'>
        <div className='grid min-h-screen grid-cols-1 lg:grid-cols-2'>
          <div className='flex flex-col items-center justify-center px-4 py-8 text-center'>
            <h2 className='mb-6 text-5xl font-semibold'>Whoops!</h2>
            <h3 className='mb-1.5 text-3xl font-semibold'>Something went wrong</h3>

            <Button asChild size='lg' className='rounded-lg text-base'>
              <Link href='/'>Back to home page</Link>
            </Button>
          </div>

          <div className='relative max-h-screen w-full p-2 max-lg:hidden'>
            <div className='h-full w-full rounded-2xl bg-black'></div>
          </div>
        </div>
      </body>
    </html>
  );
};

export default Page;
