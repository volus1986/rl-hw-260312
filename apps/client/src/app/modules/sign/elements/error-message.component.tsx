interface IProps {
  message: string;
}

const ErrorMessageComponent = (props: Readonly<IProps>) => {
  return props.message && <span className='text-red-600'>{props.message}</span>;
};

export default ErrorMessageComponent;
