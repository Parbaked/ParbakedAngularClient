import { DynamicFormAction } from './dynamic-form-action';
import { DynamicFormSection } from './dynamic-form-section';

export interface DynamicCard {
  title: string;
  actions?: DynamicFormAction[];
}
