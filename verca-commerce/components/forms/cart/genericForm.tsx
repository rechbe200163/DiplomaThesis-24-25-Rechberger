'use client';

import React, { useActionState } from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GenericActionFormProps {
  action: (...args: any[]) => Promise<any>; // Die übergebene Server-Action
  buttonText?: string; // Der Button-Inhalt
  buttonLoaderText?: string;
  buttonStyle?: 'shadcn' | 'default'; // Optional: Benutzerdefinierter Button
  variant?:
    | 'outline'
    | 'ghost'
    | 'destructive'
    | 'default'
    | 'secondary'
    | 'link'; // Optional: Button-Variante
  size?: 'default' | 'icon' | 'sm' | 'lg'; // Optional: Button-Größe
  param: string; // ID des Produkts oder ein anderer Parameter
  initialErrors?: string[]; // Optional: Anfangsfehler
  icon?: React.ReactNode; // Optional: Icon
  additionalInputs?: React.ReactNode; // Optional: Zusätzliche Inputs
  hideAdditionalInputs?: boolean; // Optional: Zusätzliche Inputs verstecken
  onSuccess?: () => void; // Callback bei Erfolg
  buttonDisabled?: boolean; // Optional: Button deaktivieren
}

export function GenericActionForm({
  action,
  buttonText,
  buttonLoaderText,
  buttonStyle = 'default',
  size = 'default',
  variant = 'default',
  hideAdditionalInputs,
  icon,
  param,
  initialErrors = [''],
  additionalInputs,
  onSuccess,
  buttonDisabled = false,
}: GenericActionFormProps) {
  // bind action with param
  const boundAction = action.bind(null, param);
  const [formState, executeAction, isPending] = useActionState(boundAction, {
    success: false,
    errors: {
      title: initialErrors,
    },
  });

  // execute on succes Callback if provided
  if (formState.success && onSuccess) {
    onSuccess();
  }

  return (
    <form action={executeAction}>
      {additionalInputs && !hideAdditionalInputs && additionalInputs}

      <Button
        variant={variant}
        size={size}
        type='submit'
        disabled={buttonDisabled}
        className={`${
          buttonStyle === 'shadcn' ? 'shadow-md' : ''
        } flex items-center`}
      >
        {isPending ? (
          <Loader2 className='animate-spin' size={24} />
        ) : (
          buttonLoaderText || buttonText || icon
        )}
      </Button>

      {formState.errors?.title[0] && (
        <div className='text-red-500 text-sm mt-2'>
          {formState.errors.title.join(', ')}
        </div>
      )}
    </form>
  );
}