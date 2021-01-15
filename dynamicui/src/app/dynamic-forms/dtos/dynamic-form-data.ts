import { DynamicFormAction } from './dynamic-form-action';
import { DynamicFormSection } from './dynamic-form-section';

export interface DynamicFormData {
  title: string;
  sections: DynamicFormSection[];
  lists: any;
  record: any;
  actions: DynamicFormAction[];
}
