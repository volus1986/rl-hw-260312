import { ArrowRightIcon } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { Link } from '@/pkg/locale';
import { Button } from '@/pkg/shadcn/ui/components/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/pkg/shadcn/ui/components/card';

interface IProps {
  id: number;
  img: string;
  title: string;
}

const CardComponent = (props: IProps) => {
  const { img, title, id } = props;
  const detailsUrl = `/items/${id}`;
  const t = useTranslations('ItemsPage');

  return (
    <Card className='pt-0 shadow-none max-lg:last:col-span-full'>
      <CardContent className='px-0'>
        <Image
          height={240}
          width={282}
          className='aspect-video h-60 w-full rounded-t-xl object-cover'
          src={img}
          alt={title}
        />
      </CardContent>

      <CardHeader className='mb-2 gap-3 h-14 overflow-hidden'>
        <CardTitle className='text-xl'>
          <Link href={detailsUrl}>{title}</Link>
        </CardTitle>
      </CardHeader>

      <CardFooter>
        <Button className='group rounded-lg text-base has-[>svg]:px-6' size='lg' asChild>
          <Link href={detailsUrl}>
            {t('cartDetailsButton')}
            <ArrowRightIcon className='transition-transform duration-200 group-hover:translate-x-0.5' />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CardComponent;
