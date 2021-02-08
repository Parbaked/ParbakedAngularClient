import { DynamicDashboardData } from '../dtos/dynamic-dashboard-data';
import { DynamicFormData } from '../dtos/dynamic-form-data';
import { RequestCommand } from '../dtos/request-command';
import { ResponseCommand } from '../dtos/response-command';
import { SearchResult } from '../dtos/search-result';
import { SearchResultItem } from '../dtos/search-result-item';
import { TableData } from '../dtos/table-data';

export abstract class CommanderService {
  abstract processActionCommand(
    text: string,
    id?: string,
    entity?: string,
    record?: any
  );

  abstract processQueryCommand(
    query: string,
    provider: string
  ): Promise<TableData>;

  abstract processSelectCommand(selectItemCommand: string, item: any);

  abstract processLoadCommand(
    entityType: string,
    id: string
  ): Promise<DynamicFormData>;

  abstract processDataChangeCommand(
    entity: string,
    id: string,
    data: any,
    delta: any,
    text: string
  );

  abstract processSelectQueryCommand(
    text: string,
    searchCommand: string
  ): Promise<SearchResult>;

  abstract processDashboardQueryCommand(
    text: string,
    searchCommand: string
  ): Promise<DynamicDashboardData>;

  abstract currentMenu();
}
