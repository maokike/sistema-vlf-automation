import { useRouter } from 'next/router';
import { useEffect, ComponentType } from 'react';

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const AuthComponent = (props: P) => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        router.replace('/login');
      }
    }, [router]);

    // If we have a token, render the wrapped component
    // A more robust implementation would also verify the token with the backend
    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default withAuth;
