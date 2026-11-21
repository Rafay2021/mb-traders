import { OrderConfirmationPage } from '@/modules/orders/components/order-confirmation-page';
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense fallback={null}>
      <OrderConfirmationPage />
    </Suspense>
  );
}
