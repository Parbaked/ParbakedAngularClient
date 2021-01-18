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

@Injectable({
  providedIn: 'root',
})
export class SimCommanderService implements CommanderService {
  constructor(private router: Router, private cache: CacheService) {}

  async processDataChangeCommand(
    entity: string,
    id: string,
    data: any,
    delta: any,
    text: string
  ) {}

  async processActionCommand(
    text: string,
    id: string,
    entity: string,
    record: any
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
    let response = await this.internalProcessCommand(command);
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

  private async internalProcessCommand(
    command: RequestCommand
  ): Promise<ResponseCommand> {
    switch (command.commandType.toLowerCase()) {
      // case 'start':
      //   return this.startCommand(command);
      case 'query':
        return await this.queryCommand(command);
      case 'select':
        return await this.selectCommand(command);
      case 'load':
        return await this.loadCommand(command);
    }
  }

  private startCommand(command: RequestCommand): ResponseCommand {
    return {
      guid: command.guid,
      route: 'dt/contacts/allcontacts',
      title: 'Contacts',
    };
  }

  private async queryCommand(
    command: RequestCommand
  ): Promise<ResponseCommand> {
    return {
      guid: command.guid,
      title: 'Contacts',
      data: await this.query(command.query),
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

  private async query(queryName: string): Promise<TableData> {
    let json = '';
    await import('./simulator-files/queries/' + queryName + '.json').then(
      (data) => {
        json = data;
      }
    );
    return (json as unknown) as TableData;
  }

  private async loadCommand(command: RequestCommand): Promise<ResponseCommand> {
    return {
      guid: command.guid,
      title: command.text,
      data: await this.load(command.text, command.id),
      route: null,
    };
  }

  private async load(entityType: string, id: string): Promise<DynamicFormData> {
    let json = '';
    await import(
      './simulator-files/load/' + entityType + '.' + id + '.json'
    ).then((data) => {
      json = data;
    });
    return (json as unknown) as DynamicFormData;
  }
}
