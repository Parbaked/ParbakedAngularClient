import { DynamicCardDataItem } from './dynamic-card-data-item';
import { DynamicFormAction } from './dynamic-form-action';

export interface DynamicCard {
  title: string;
  description: string;
  image: string;
  dataItems: DynamicCardDataItem[][];
  actions?: DynamicFormAction[];
}
