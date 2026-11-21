import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from 'cn';
type CardWrapperProps = {
  title: string;
  children?: React.ReactNode;
  description?: string;
  cardBottom?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export default function CardWrapper({
  title,
  children,
  description,
  className,
  cardBottom,
  ...props
}: CardWrapperProps) {
  return (
    <div
      className={cn('flex flex-col gap-6 w-full max-w-115', className)}
      {...props}>
      <Card>
        <CardHeader className='text-center'>
          <CardTitle className='text-xl'>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  );
}
