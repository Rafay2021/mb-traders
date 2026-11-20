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
import { registerAction } from '../actions/action';

export default function RegisterForm() {
  return (
    <CardWrapper
      title='Create an account'
      description='Enter your information below to create your account.'>
      <form
        action={registerAction}
        className='flex flex-col gap-4'>
        <FieldSet>
          <FieldGroup>
            {/* Full Name */}
            <Field>
              <FieldLabel htmlFor='name'>Full Name</FieldLabel>

              <Input
                id='name'
                name='name'
                type='text'
                placeholder='John Doe'
                autoComplete='name'
                required
              />
            </Field>

            {/* Email */}
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

            {/* Password */}
            <Field>
              <FieldLabel htmlFor='password'>Password</FieldLabel>

              <Input
                id='password'
                name='password'
                type='password'
                placeholder='Create a password'
                autoComplete='new-password'
                required
                minLength={8}
              />
            </Field>

            {/* Confirm Password */}
            <Field>
              <FieldLabel htmlFor='confirmPassword'>
                Confirm Password
              </FieldLabel>

              <Input
                id='confirmPassword'
                name='confirmPassword'
                type='password'
                placeholder='Confirm your password'
                autoComplete='new-password'
                required
                minLength={8}
              />
            </Field>
          </FieldGroup>

          <FieldGroup>
            {/* Register */}
            <Field>
              <Button
                type='submit'
                className='w-full'>
                Create Account
              </Button>
            </Field>

            {/* OR Separator */}
            <FieldSeparator>OR</FieldSeparator>

            {/* Google Authentication */}
            <Field>
              <Button
                variant='outline'
                type='button'
                className='w-full'>
                Continue with Google
              </Button>
            </Field>

            {/* Login Navigation */}
            <Field>
              <p className='flex items-center justify-center gap-1 text-sm text-muted-foreground'>
                Already have an account?
                <Button
                  variant='link'
                  size='sm'
                  className='h-auto p-0'
                  nativeButton={false}
                  render={<Link href='/login'>Login</Link>}
                />
              </p>
            </Field>
          </FieldGroup>
        </FieldSet>
      </form>
    </CardWrapper>
  );
}
