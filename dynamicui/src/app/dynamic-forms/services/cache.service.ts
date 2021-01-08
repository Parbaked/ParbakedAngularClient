import { Injectable } from '@angular/core';
import { RequestCommand } from '../dtos/request-command';
import { ResponseCommand } from '../dtos/response-command';
import { TableData } from '../dtos/table-data';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  constructor() {}

  readString(key: string): string {
    return localStorage[key];
  }

  writeString(key: string, value: string) {
    localStorage[key] = value;
  }

  private LAST_RESPONSE_CACHE = 'LAST_RESPONSE_CACHE';
  private LAST_5_RESPONSE = 'LAST_5_RESPONSE_CACHE';

  readLastResponse(): ResponseCommand {
    const json = this.readString(this.LAST_RESPONSE_CACHE);
    if (json == null || json == '') {
      return null;
    }
    return JSON.parse(json) as ResponseCommand;
  }

  writeLastResponse(request: RequestCommand, response: ResponseCommand) {
    this.writeString(this.LAST_RESPONSE_CACHE, JSON.stringify(response));

    let last5 = [];
    var last5Json = this.readString(this.LAST_5_RESPONSE);
    if (last5Json != null) {
      last5 = JSON.parse(last5Json);
      if (last5.length >= 5) {
        last5.pop();
      }
    }
    last5.push({
      request: request,
      response: response,
    });
    this.writeString(this.LAST_5_RESPONSE, JSON.stringify(last5));
  }

  readLastTableData(): TableData {
    var lastResponse = this.readLastResponse();
    if (lastResponse != null && lastResponse.data != null) {
      return lastResponse.data;
    }
    return null;
  }

  clearLastResponse() {
    this.writeString(this.LAST_RESPONSE_CACHE, null);
  }
}
