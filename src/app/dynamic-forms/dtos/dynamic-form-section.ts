import { DynamicFormRow } from './dynamic-form-row';

export interface DynamicFormSection {
  sectionTitle: string;
  rows: DynamicFormRow[];
  sectionType: string;
  sectionData: string;
  bindable: any;

  sectionAllowRowDelete: boolean;
  sectionNewRowTemplate: any;
  sectionLinkSearchCommand: string;
}
