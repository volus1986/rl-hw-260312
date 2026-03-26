'use client';

import { useTranslations } from 'use-intl';

import { type PostDetails } from '@/app/entities/models';
import { Button } from '@/app/shared/ui';
import { useRouter } from '@/pkg/locale';

const ItemComponent = ({ item }: { item: PostDetails }) => {
  const router = useRouter();
  const t = useTranslations('ItemPage');

  const handlePreviousPageButtonClick = () => {
    router.back();
  };

  return (
    <div>
      <h1 className='text-center'>{t('title')}</h1>
      <table>
        <tbody>
          <tr>
            <td>{t('postId')}</td>
            <td>{item.id}</td>
          </tr>
          <tr>
            <td>{t('postUserId')}</td>
            <td>{item.userId}</td>
          </tr>
          <tr>
            <td>{t('postTitle')}</td>
            <td>{item.title}</td>
          </tr>
          <tr>
            <td className='pr-4'>{t('postDescription')}</td>
            <td>{item.body}</td>
          </tr>
        </tbody>
      </table>

      <Button onClick={handlePreviousPageButtonClick}>{t('previousPageButton')}</Button>
    </div>
  );
};

export default ItemComponent;
