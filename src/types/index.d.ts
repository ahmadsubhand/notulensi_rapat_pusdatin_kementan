import type { notulensiType } from '@/validator/index.validator';
import { UseFormReturn } from 'react-hook-form';

export interface SectionProps {
  form: UseFormReturn<notulensiType>;
}