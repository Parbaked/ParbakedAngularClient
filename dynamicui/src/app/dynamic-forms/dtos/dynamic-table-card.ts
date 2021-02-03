import { DynamicFormAction } from './dynamic-form-action';

export interface DynamicFormData {
  titleDatafield: string;
  actions: DynamicFormAction[];
  dataChangeAction: DynamicFormAction;
}
