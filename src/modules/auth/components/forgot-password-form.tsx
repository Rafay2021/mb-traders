'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldSet,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';

import CardWrapper from '@/modules/auth/components/card-wrapper';
import { forgotPasswordAction } from '../actions/action';

export default function ForgotPasswordForm() {
  return (
    <CardWrapper
      title='Forgot Password?'
      description='Enter your registered email address to receive a password reset link.'>
      <form
        action={forgotPasswordAction}
        className='flex flex-col gap-4'>
        <FieldSet>
          <FieldGroup>
            {/* Email Address */}
            <Field>
              <FieldLabel htmlFor='email'>Email Address</FieldLabel>

              <Input
                id='email'
                name='email'
                type='email'
                placeholder='name@example.com'
                autoComplete='email'
                required
              />
            </Field>
          </FieldGroup>

          <FieldGroup>
            {/* Submit */}
            <Field>
              <Button
                type='submit'
                className='w-full'>
                Send Reset Link
              </Button>
            </Field>

            {/* Separator */}
            <FieldSeparator />

            {/* Back to Login */}
            <Field>
              <p className='flex items-center justify-center gap-1 text-sm text-muted-foreground'>
                Remember your password?
                <Button
                  variant='link'
                  size='sm'
                  className='h-auto p-0'
                  nativeButton={false}
                  render={<Link href='/login'>Back to Login</Link>}
                />
              </p>
            </Field>
          </FieldGroup>
        </FieldSet>
      </form>
    </CardWrapper>
  );
}
