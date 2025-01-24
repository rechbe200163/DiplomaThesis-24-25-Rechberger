'use client';

import { useEffect } from 'react';
import { useActionState } from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { checkProductQuantityBeforeCheckout } from '@/lib/actions/product.actions';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function ProceedToCheckOut({
  customerReference,
  subtotal,
}: {
  customerReference: number;
  subtotal: number;
}) {
  const t = useTranslations('Shop.cart');
  const router = useRouter();
  const [formState, action, isPending] = useActionState(
    checkProductQuantityBeforeCheckout.bind(null, customerReference),
    {
      success: false,
      errors: {
        title: [''],
      },
    }
  );

  // Use useEffect to handle navigation when formState.success changes
  useEffect(() => {
    if (formState.success) {
      router.push(`/purchase/${customerReference}`);
    }
  }, [formState.success, customerReference, router]);

  return (
    <form action={action} className='space-y-4'>
      <Button
        type='submit'
        size='lg'
        disabled={isPending || subtotal <= 0}
        className='w-full'
      >
        {isPending ? (
          <>
            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            {t('proceed_to_checkout')}...
          </>
        ) : (
          <>{t('proceed_to_checkout')}</>
        )}
      </Button>
      {formState.errors && formState.errors.title.length > 0 && (
        <div className='text-red-500 text-sm'>{formState.errors.title}</div>
      )}
    </form>
  );
}
