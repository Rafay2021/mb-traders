import RegisterForm from '@/modules/auth/components/register-form';
import { RegisterPage } from '@/modules/auth/components/register-page';
import { Suspense } from 'react';

export default function RegisterPagee() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <Suspense fallback={null}>
        <RegisterPage />
      </Suspense>
      <RegisterForm />
    </div>
  );
}
