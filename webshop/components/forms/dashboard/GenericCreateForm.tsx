'use client';

import React, { useActionState, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { FormState } from '@/lib/form.types';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SelectConfig {
  name: string;
  label: string;
  options: { value: string; label: string }[];
}

interface Field {
  name: string;
  label: string;
  placeholder?: string;
  type: string; // e.g., 'text', 'email', 'password'
  required?: boolean;
  disabled?: boolean;
}

interface AddUserFormProps {
  fields: Field[];
  selectConfigs?: SelectConfig[]; // Array of select configurations
  serverAction: (
    prevState: FormState,
    formData: FormData
  ) => Promise<FormState>; // Function to handle form submission}
}

export default function GenericCreateForm({
  fields,
  selectConfigs = [], // Default to an empty array if not provided
  serverAction,
}: AddUserFormProps) {
  const [formState, action, isPending] = useActionState(serverAction, {
    success: false,
    errors: {
      title: [''],
    },
  });

  const { toast } = useToast();

  // Handle form submission feedback
  React.useEffect(() => {
    if (formState.success) {
      toast({
        title: 'Success',
        description: 'The user was successfully added!',
        variant: 'success',
      });
    } else if (formState.errors?.title[0]) {
      toast({
        title: 'Error',
        description: formState.errors.title[0],
        variant: 'destructive',
      });
    }
  }, [formState, toast]);

  return (
    <Card className='bg-white shadow-md p-6'>
      <form className='space-y-6' action={action}>
        <div className='grid md:grid-cols-2 gap-6'>
          {/* Render input fields dynamically */}
          {fields.map((field) => (
            <div key={field.name} className='space-y-2'>
              <Label htmlFor={field.name}>{field.label}</Label>
              <Input
                id={field.name}
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
                required={field.required}
                disabled={field.disabled}
              />
            </div>
          ))}

          {/* Render multiple Select components */}
          {selectConfigs.map((config) => (
            <div key={config.name} className='space-y-2'>
              <Label htmlFor={config.name}>{config.label}</Label>
              <Select name={config.name}>
                <SelectTrigger>
                  <SelectValue placeholder={`Select ${config.label}`} />
                </SelectTrigger>
                <SelectContent>
                  {config.options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>

        <div className='flex justify-end space-x-2 pt-4'>
          <Button variant='outline' type='button'>
            Cancel
          </Button>
          <Button type='submit'>
            {isPending ? (
              <>
                <Loader2 className='w-6 h-6 animate-spin' />
                Saving...
              </>
            ) : (
              'Save'
            )}
          </Button>
        </div>
      </form>
      {formState.errors?.title[0] && (
        <p className='text-red-500 text-sm mt-4'>{formState.errors.title[0]}</p>
      )}
    </Card>
  );
}
