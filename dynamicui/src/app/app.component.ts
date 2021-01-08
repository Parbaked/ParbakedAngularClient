import { Component } from '@angular/core';
import { MenuItem } from './dynamic-forms/dtos/menu-item';
import { ChangeDetectorRef } from '@angular/core';
import { CommanderService } from './dynamic-forms/services/commander.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Parbaked';

  public links: MenuItem[] = [];
  public showDebug = false;

  constructor(
    private cdRef: ChangeDetectorRef,
    private commander: CommanderService
  ) {}

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  async ngAfterViewInit() {
    this.links = this.commander.currentMenu();
  }

  enableDebug() {
    this.showDebug = true;
  }
  disableDebug() {
    this.showDebug = false;
  }
}
