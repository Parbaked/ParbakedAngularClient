import { MenuItem } from './menu-item';
import { TableData } from './table-data';

export interface ResponseCommand {
  guid?: string;
  browserSessionGuid?: string;
  sessionGuid?: string;

  title?: string;
  route?: string;
  menu?: MenuItem[];
  data?: any;
}
