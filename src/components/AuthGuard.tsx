import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function AuthGuard(Component: any) {
  return function GuardedComponent(props: any) {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!user) router.push('/login');
    }, [user]);

    return user ? <Component {...props} /> : null;
  };
}
