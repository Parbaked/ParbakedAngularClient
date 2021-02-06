import { DynamicFormSection } from './dynamic-form-section';

export interface DynamicFormTab {
  sections: DynamicFormSection[];
  title: string;
}
