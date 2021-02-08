import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { DynamicDashboardData } from '../dtos/dynamic-dashboard-data';
import { CommanderService } from '../services/commander.service';

@Component({
  selector: 'app-dynamic-dashboard',
  templateUrl: './dynamic-dashboard.component.html',
  styleUrls: ['./dynamic-dashboard.component.scss'],
})
export class DynamicDashboardComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    private fb: FormBuilder,
    private commander: CommanderService,
    private titleService: Title
  ) {}

  data: DynamicDashboardData;
  form = this.fb.group({});
  loaded = false;
  title: string;
  query: string;

  ngOnInit(): void {}

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  async ngAfterViewInit() {
    this.query = this.route.snapshot.paramMap.get('query');

    this.data = await this.commander.dashboardQuery('', this.query);

    if (this.data == null) {
      console.log('UNABLE TO LOAD DATA');
      return;
    }

    this.loaded = true;
    this.titleService.setTitle(this.data.title);
  }

  async actionClick(text: string) {
    await this.commander.action(text);
  }
}
