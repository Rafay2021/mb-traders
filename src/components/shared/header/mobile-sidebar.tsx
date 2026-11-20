import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Menu, X } from 'lucide-react';

export default function MobileSidebar() {
  return (
    <Drawer
      modal={false}
      showSwipeHandle
      disablePointerDismissal
      swipeDirection='left'>
      <DrawerTrigger
        render={
          <Button
            variant='outline'
            size='icon-lg'
            aria-label='Open menu'
            className='shrink-0'>
            <Menu className='size-5' />
          </Button>
        }
      />
      <DrawerContent>
        <DrawerHeader>
          <DrawerClose
            render={
              <Button
                variant='outline'
                size='icon'
                aria-label='Close menu'
                className='shrink-0 p-1'
                render={<X />}
              />
            }></DrawerClose>
        </DrawerHeader>
        <div className='flex-1 p-4'>content</div>
        <DrawerFooter></DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
