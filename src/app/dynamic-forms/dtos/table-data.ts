import { Row } from './row';

export interface TableData {
  title: string;
  columnHeaders: string[];
  rows: any[];
  selectItemCommand?: string;
  enablePaging: boolean;
}
