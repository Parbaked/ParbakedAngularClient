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
    this.processCommand({
      commandType: 'ACTION',
      data: record,
      text: text,
    });
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

  async processCommand(command: RequestCommand): Promise<ResponseCommand> {
    const jsonIn = JSON.stringify(command);
    console.log(jsonIn);

    command.guid = uuidv4();
    let response = await this.internalProcessCommand(command);
    if (response == null) {
      response = {
        guid: command.guid,
        title: 'NO RESPONSE',
        data: null,
      };
    }

    if (response.route) {
      this.router.navigate([response.route]);
    }

    return response;
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

  private async internalProcessCommand(
    command: RequestCommand
  ): Promise<ResponseCommand> {
    switch (command.commandType.toLowerCase()) {
      case 'dashboardquery':
        return this.dashboardQueryCommand(command);
      case 'selectquery':
        return this.selectQueryCommand(command);
      case 'query':
        return await this.queryCommand(command);
      case 'select':
        return await this.selectCommand(command);
    }
  }

  private startCommand(command: RequestCommand): ResponseCommand {
    return {
      guid: command.guid,
      route: 'dt/contacts/allcontacts',
      title: 'Contacts',
    };
  }

  private async dashboardQueryCommand(
    command: RequestCommand
  ): Promise<ResponseCommand> {
    const path = 'dashboardquery/' + command.query + '.json';
    return {
      guid: command.guid,
      title: 'dashboard',
      data: await this.readFromFile(path),
    };
  }

  private async selectQueryCommand(
    command: RequestCommand
  ): Promise<ResponseCommand> {
    const path = 'selectquery/' + command.query + '.json';
    return {
      guid: command.guid,
      title: 'Contacts',
      data: await this.readFromFile(path),
    };
  }

  private async queryCommand(
    command: RequestCommand
  ): Promise<ResponseCommand> {
    const path = 'queries/' + command.query + '.json';
    return {
      guid: command.guid,
      title: 'Contacts',
      data: await this.readFromFile(path),
    };
  }

  private async selectCommand(
    command: RequestCommand
  ): Promise<ResponseCommand> {
    return {
      guid: command.guid,
      title: command.text + command.data.name,
      route: '/df/' + command.text + '/' + command.data.id,
      data: {
        title: 'Edit ' + command.text,
      },
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
