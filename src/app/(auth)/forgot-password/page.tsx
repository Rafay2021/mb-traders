import ForgotPasswordForm from '@/modules/auth/components/forgot-password-form';
import { ForgotPasswordPage } from '@/modules/auth/components/forgot-password-page';

export default function ForgotPassword() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <ForgotPasswordPage />
      <ForgotPasswordForm />
    </div>
  );
}
