import { DynamicFormRow } from './dynamic-form-row';

export interface DynamicFormSection {
  sectionTitle: string;
  rows: DynamicFormRow[];
}
