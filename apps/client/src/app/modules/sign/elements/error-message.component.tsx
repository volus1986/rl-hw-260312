import { type FC } from 'react';

interface IProps {
  message: string;
}

const ErrorMessageComponent: FC<Readonly<IProps>> = (props) => {
  return props.message && <span className='text-red-600'>{props.message}</span>;
};

export default ErrorMessageComponent;
