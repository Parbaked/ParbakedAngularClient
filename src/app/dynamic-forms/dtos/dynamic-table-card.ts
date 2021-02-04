import { DynamicFormAction } from './dynamic-form-action';
import { DynamicTableCardItem } from './dynamic-table-card-item';

export interface DynamicTableCard {
  titleDatafield: string;
  actions?: DynamicFormAction[];
  rows: DynamicTableCardItem[][];
}
