import Image from 'next/image';
import { type FC } from 'react';

import { Link } from '@/pkg/locale';
import { Button } from '@/pkg/shadcn';

// interface
interface IProps {
  title?: string;
  description?: string;
  message?: string;
  backButtonUrl?: string;
  backButtonText?: string;
}

// component
const NotFound: FC<Readonly<IProps>> = (props: IProps) => {
  const {
    title = `Whoops!`,
    description = `The page you're looking for isn't found, we suggest you back to home.`,
    message = 'Something went wrong',
    backButtonUrl = '/',
    backButtonText = 'Back to home page',
  } = props;

  // return
  return (
    <div className='grid min-h-screen grid-cols-1 lg:grid-cols-2'>
      <div className='flex flex-col items-center justify-center px-4 py-8 text-center'>
        <h2 className='mb-6 text-5xl font-semibold'>{title}</h2>
        <h3 className='mb-1.5 text-3xl font-semibold'>{description}</h3>

        <p className='text-muted-foreground mb-6 max-w-sm'>{message}</p>

        <Button asChild size='lg' className='rounded-lg text-base'>
          <Link href={backButtonUrl}>{backButtonText}</Link>
        </Button>
      </div>

      <div className='relative max-h-screen w-full p-2 max-lg:hidden'>
        <div className='h-full w-full rounded-2xl bg-black'></div>

        <Image
          src='/images/not-found-404-global.webp'
          alt='404 illustration'
          width={640}
          height={370}
          className='absolute top-1/2 left-1/2 h-[clamp(260px,25vw,406px)] -translate-x-1/2 -translate-y-1/2'
        />
      </div>
    </div>
  );
};

export default NotFound;
