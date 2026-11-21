import { LoginPage } from '@/modules/auth/components/login-page';
import { Suspense } from 'react';

export default function LoginPagee() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <Suspense fallback={null}>
        <LoginPage />
      </Suspense>
    </div>
  );
}

{
  /* <LoginForm />
   */
}
