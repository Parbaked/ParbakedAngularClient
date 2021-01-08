import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-dynamic-dashboard',
  templateUrl: './dynamic-dashboard.component.html',
  styleUrls: ['./dynamic-dashboard.component.scss'],
})
export class DynamicDashboardComponent implements OnInit {
  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {}
}
