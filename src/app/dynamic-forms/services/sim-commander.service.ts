import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest, from } from 'rxjs';
import { RequestCommand } from '../dtos/request-command';
import { ResponseCommand } from '../dtos/response-command';
import { TableData } from '../dtos/table-data';
import { DynamicFormData } from '../dtos/dynamic-form-data';
import { v4 as uuidv4 } from 'uuid';
import { CommanderService } from './commander.service';
import { SearchResultItem } from '../dtos/search-result-item';
import { SearchResult } from '../dtos/search-result';
import { DynamicDashboardData } from '../dtos/dynamic-dashboard-data';

@Injectable({
  providedIn: 'root',
})
export class SimCommanderService implements CommanderService {
  constructor(private router: Router) {}

  async processDashboardQueryCommand(
    text: string,
    searchCommand: string
  ): Promise<DynamicDashboardData> {
    const path = 'dashboardquery/' + searchCommand + '.json';
    return this.readFromFile(path);
  }

  async processSelectQueryCommand(
    text: string,
    searchCommand: string
  ): Promise<SearchResult> {
    const path = 'selectquery/' + searchCommand + '.json';
    return this.readFromFile(path);
  }

  async processDataChangeCommand(
    entity: string,
    id: string,
    data: any,
    delta: any,
    text: string
  ) {}

  async processActionCommand(
    text: string,
    id?: string,
    entity?: string,
    record?: any
  ) {
    console.log('processing action command' + JSON.stringify(record));
  }

  async processQueryCommand(
    query: string,
    provider: string = 'CACHE'
  ): Promise<TableData> {
    const path = 'queries/' + query + '.json';
    return (await this.readFromFile(path)) as Promise<TableData>;
  }

  async processSelectCommand(selectItemCommand: string, item: any) {
    const route = '/df/' + selectItemCommand + '/' + item.id;
    this.router.navigate([route]);
  }

  async processLoadCommand(
    entityType: string,
    id: string
  ): Promise<DynamicFormData> {
    const path = 'load/' + entityType + '.' + id + '.json';
    return await this.readFromFile(path);
  }

  currentMenu() {
    return [
      {
        title: 'Home',
        route: 'home',
      },
      {
        title: 'Sign up',
        route: 'signup',
      },
    ];
  }

  private startCommand(command: RequestCommand): ResponseCommand {
    return {
      guid: command.guid,
      route: 'dt/contacts/allcontacts',
      title: 'Contacts',
    };
  }

  private async readFromFile(path: string): Promise<any> {
    const time = Math.floor(Math.random() * 400) + 100;
    var promise = new Promise<any>(async (success, failure) => {
      setTimeout(async () => {
        await import('./simulator-files/' + path).then((data) => {
          success(data);
        });
      }, time);
    });
    return promise;
  }
}
