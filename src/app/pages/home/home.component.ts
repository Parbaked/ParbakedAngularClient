import { Component, OnInit } from '@angular/core';
import { CommanderService } from 'src/app/dynamic-forms/services/commander.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private commander: CommanderService) {}

  ngOnInit(): void {}

  async ngAfterViewInit() {
    await this.commander.processCommand({
      guid: uuidv4(),
      text: 'START',
      commandType: 'START',
    });
  }
}
