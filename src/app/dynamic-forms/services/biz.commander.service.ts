import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest, from } from 'rxjs';
import { RequestCommand } from '../dtos/request-command';
import { ResponseCommand } from '../dtos/response-command';
import { TableData } from '../dtos/table-data';
import { DynamicFormData } from '../dtos/dynamic-form-data';
import { v4 as uuidv4 } from 'uuid';
import { CacheService } from './cache.service';
import { CommanderService } from './commander.service';
import { SearchResultItem } from '../dtos/search-result-item';
import { SearchResult } from '../dtos/search-result';
import { DynamicDashboardData } from '../dtos/dynamic-dashboard-data';

@Injectable({
  providedIn: 'root',
})
export class BizCommanderService implements CommanderService {
  constructor(private router: Router, private cache: CacheService) {}

  processDashboardQueryCommand(
    text: string,
    searchCommand: string
  ): Promise<DynamicDashboardData> {
    return null;
  }

  processSelectQueryCommand(text: string): Promise<SearchResult> {
    return null;
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
    return (
      await this.processCommand({
        commandType: 'QUERY',
        query: query,
      })
    ).data;
  }

  async processSelectCommand(
    selectItemCommand: string,
    item: any
  ): Promise<FormData> {
    return (
      await this.processCommand({
        commandType: 'SELECT',
        text: selectItemCommand,
        data: item,
      })
    ).data;
  }

  async processLoadCommand(
    entityType: string,
    id: string
  ): Promise<DynamicFormData> {
    return (
      await this.processCommand({
        commandType: 'LOAD',
        text: entityType,
        id: id,
      })
    ).data;
  }

  async processCommand(command: RequestCommand): Promise<ResponseCommand> {
    const jsonIn = JSON.stringify(command);
    console.log(jsonIn);

    command.guid = uuidv4();
    let response = this.internalProcessCommand(command);
    if (response == null) {
      response = {
        guid: command.guid,
        title: 'NO RESPONSE',
        data: null,
      };
    }

    this.cache.writeLastResponse(command, response);
    if (response.route) {
      this.router.navigate([response.route]);
    }

    const jsonOut = JSON.stringify(response);
    console.log(jsonOut);

    return response;
  }

  currentMenu() {
    var lastResponse = this.cache.readLastResponse();
    if (lastResponse != null && lastResponse.menu != null) {
      return lastResponse.menu;
    }
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

  private internalProcessCommand(command: RequestCommand): ResponseCommand {
    switch (command.commandType.toLowerCase()) {
      case 'start':
        return this.startCommand(command);
      case 'query':
        return this.queryCommand(command);
      case 'select':
        return this.selectCommand(command);
      case 'load':
        return this.loadCommand(command);
    }
  }

  private startCommand(command: RequestCommand): ResponseCommand {
    return {
      guid: command.guid,
      route: 'dt/contacts/allcontacts',
      title: 'Contacts',
    };
  }

  private queryCommand(command: RequestCommand): ResponseCommand {
    let data: TableData;

    if (data == null) {
      data = this.query(command.query);
    }

    return {
      guid: command.guid,
      title: 'Contacts',
      data: data,
    };
  }

  private selectCommand(command: RequestCommand): ResponseCommand {
    if (command.text == 'OpenContact') {
      return {
        guid: command.guid,
        title: 'Contact ' + command.data.name,
        route: '/df/contact/' + command.data.id,
        data: {
          title: 'Edit Contact',
        },
      };
    }
  }

  private query(queryName: string): TableData {
    throw new Error('not implemented');
  }

  private loadCommand(command: RequestCommand): ResponseCommand {
    return {
      guid: command.guid,
      title: command.text,
      data: this.load(command.text, command.id),
      route: null,
    };
  }

  private load(entityType: string, id: string) {
    switch (entityType) {
      case 'contact':
        return {
          title: 'Edit Contact',
          sections: [
            {
              sectionTitle: 'Personal Information',
              rows: [
                {
                  columns: [
                    {
                      control: {
                        dataField: 'first',
                        label: 'First',
                        inputType: 'text',
                      },
                    },
                    {
                      control: {
                        dataField: 'last',
                        label: 'Last',
                        inputType: 'text',
                      },
                    },
                  ],
                },
                {
                  columns: [
                    {
                      control: {
                        dataField: 'email',
                        label: 'Email',
                        inputType: 'text',
                      },
                    },
                    {
                      control: {
                        dataField: 'phone',
                        label: 'Phone',
                        inputType: 'text',
                      },
                    },
                  ],
                },
                {
                  columns: [
                    {
                      control: {
                        dataField: 'address',
                        label: 'Address',
                        inputType: 'text',
                      },
                    },
                  ],
                },
                {
                  columns: [
                    {
                      control: {
                        dataField: 'city',
                        label: 'City',
                        inputType: 'text',
                      },
                    },
                    {
                      control: {
                        dataField: 'state',
                        label: 'State',
                        inputType: 'text',
                      },
                    },
                    {
                      control: {
                        dataField: 'zip',
                        label: 'Zip',
                        inputType: 'text',
                      },
                    },
                  ],
                },
              ],
            },
          ],
          record: {
            id: id,
            first: 'Bob',
            last: 'Smith',
            phone: '123-456-7890',
            email: 'bob@example.com',
            address: '123 Main St',
            city: 'Omaha',
            state: 'NE',
            zip: '12345',
          },
          actions: [{ text: 'Store' }, { text: 'Delete' }],
        };
    }

    return null;
  }
}
