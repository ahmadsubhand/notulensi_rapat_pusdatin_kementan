import { UseFormReturn } from 'react-hook-form';

export interface SectionProps<T> {
  form: UseFormReturn<T>;
}