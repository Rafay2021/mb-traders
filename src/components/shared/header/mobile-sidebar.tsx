'use client';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Categories } from './categories-menu';

export default function MobileSidebar() {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Drawer
      open={open}
      onOpenChange={setOpen}
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
            className='shrink-0 '>
            <Menu className='size-5' />
          </Button>
        }
      />
      <DrawerContent className='w-full'>
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
        <div className='flex-1 p-4'>
          <Categories setState={setOpen} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
