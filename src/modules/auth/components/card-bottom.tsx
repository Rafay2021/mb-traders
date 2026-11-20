import { FieldDescription } from '@/components/ui/field';
import Link from 'next/link';

export default function CardBottom() {
  return (
    <FieldDescription className='px-6 text-center'>
      By clicking continue, you agree to our
      <br />
      <Link href='/'>Terms of Service</Link>
      {' & '}
      <Link href='/'>Privacy Policy</Link>.
    </FieldDescription>
  );
}
