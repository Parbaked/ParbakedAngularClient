import { DynamicDashboardData } from '../dtos/dynamic-dashboard-data';
import { DynamicFormData } from '../dtos/dynamic-form-data';
import { RequestCommand } from '../dtos/request-command';
import { ResponseCommand } from '../dtos/response-command';
import { SearchResult } from '../dtos/search-result';
import { SearchResultItem } from '../dtos/search-result-item';
import { TableData } from '../dtos/table-data';

export abstract class CommanderService {
  abstract action(text: string, id?: string, entity?: string, record?: any);

  abstract query(query: string, provider: string): Promise<TableData>;

  abstract select(selectItemCommand: string, item: any);

  abstract load(entityType: string, id: string): Promise<DynamicFormData>;

  abstract dataChange(
    entity: string,
    id: string,
    data: any,
    delta: any,
    text: string
  );

  abstract selectQuery(
    text: string,
    searchCommand: string
  ): Promise<SearchResult>;

  abstract dashboardQuery(
    text: string,
    searchCommand: string
  ): Promise<DynamicDashboardData>;

  abstract currentMenu();
}
