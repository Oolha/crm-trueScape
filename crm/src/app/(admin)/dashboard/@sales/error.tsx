'use client';
interface ErrorComponentProps {
  error: Error;
}

const ErrorComponent = ({}: ErrorComponentProps) => {
  return <div>Unexpected error occurs inside slot sales</div>;
};

export default ErrorComponent;
