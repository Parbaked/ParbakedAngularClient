import { DynamicFormAction } from './dynamic-form-action';
import { DynamicFormSection } from './dynamic-form-section';
import { DynamicFormTab } from './dynamic-form-tab';

export interface DynamicFormData {
  title: string;
  //sections: DynamicFormSection[]; // layout
  tabs: DynamicFormTab[]; // layout
  lists: any;
  record: any; // data
  actions: DynamicFormAction[];
  dataChangeAction: DynamicFormAction;
  width: string;
}
