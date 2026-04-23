import { type FC } from 'react';

// interface
interface IProps {
  message?: string;
}

// component
const ErrorMessageComponent: FC<Readonly<IProps>> = (props) => {
  const { message } = props;

  // return
  return message && <span className='text-red-600'>{message}</span>;
};

export default ErrorMessageComponent;
