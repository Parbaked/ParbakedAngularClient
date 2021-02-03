import { DynamicFormAction } from './dynamic-form-action';
import { DynamicFormSection } from './dynamic-form-section';

export interface DynamicFormData {
  title: string;
  sections: DynamicFormSection[]; // layout
  lists: any;
  record: any; // data
  actions: DynamicFormAction[];
  dataChangeAction: DynamicFormAction;
}
