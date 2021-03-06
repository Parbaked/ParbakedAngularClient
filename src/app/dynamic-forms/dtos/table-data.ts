import { DynamicFormAction } from './dynamic-form-action';
import { DynamicTableCard } from './dynamic-table-card';
import { Row } from './row';

export interface TableData {
  title: string;
  columnHeaders: string[];
  rows: any[];
  selectItemCommand?: string;
  enablePaging: boolean;
  cardLayout?: DynamicTableCard;
  actions: DynamicFormAction[];
  columnActions: DynamicFormAction[];
}
