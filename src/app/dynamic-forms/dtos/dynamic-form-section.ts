import { DynamicFormRow } from './dynamic-form-row';
import { DynamicFormSectionColumn } from './dynamic-form-section-column';

export interface DynamicFormSection {
  sectionTitle: string;
  rows: DynamicFormRow[];
  sectionType: string;
  sectionData: string;
  bindable: any;
  sectionColumns: string[];

  sectionAllowRowDelete: boolean;
  sectionNewRowTemplate: any;
  sectionLinkSearchCommand: string;

  sectionColumnDefintions: DynamicFormSectionColumn[];
}
