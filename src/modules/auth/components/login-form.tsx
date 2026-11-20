import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

import CardWrapper from '@/modules/auth/components/card-wrapper';
import { loginAction } from '../actions/action';

export default function LoginForm() {
  return (
    <CardWrapper
      title='Welcome back'
      description='Login to your account'>
      <form action={loginAction}>
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor='email'>Email</FieldLabel>

              <Input
                id='email'
                name='email'
                type='email'
                placeholder='name@example.com'
                autoComplete='email'
                required
              />
            </Field>

            <Field>
              <div className='flex items-center justify-between'>
                <FieldLabel htmlFor='password'>Password</FieldLabel>

                <Button
                  variant='link'
                  size='sm'
                  className='h-auto p-0'
                  nativeButton={false}
                  render={<Link href='/forgot-password'>Forgot password?</Link>}
                />
              </div>

              <Input
                id='password'
                name='password'
                type='password'
                placeholder='Enter your password'
                autoComplete='current-password'
                required
              />
            </Field>

            <Button
              type='submit'
              className='w-full'>
              Login
            </Button>

            <div className='flex items-center gap-3'>
              <Separator className='flex-1' />
              <span className='text-xs font-medium text-muted-foreground'>
                OR
              </span>
              <Separator className='flex-1' />
            </div>

            <Button
              variant='outline'
              type='button'
              className='w-full'>
              Continue with Google
            </Button>

            {/* Register Link */}
            <p className='text-center text-sm text-muted-foreground'>
              Don&apos;t have an account?
              <Button
                variant='link'
                size='sm'
                className='h-auto p-0'
                nativeButton={false}
                render={<Link href='/register'>Create an account</Link>}
              />
            </p>
          </FieldGroup>
        </FieldSet>
      </form>
    </CardWrapper>
  );
}
