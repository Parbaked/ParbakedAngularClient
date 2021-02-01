import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ConsoleReporter } from 'jasmine';
import { TableData } from '../dtos/table-data';
import { CacheService } from '../services/cache.service';
import { CommanderService } from '../services/commander.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss'],
})
export class DynamicTableComponent implements OnInit, AfterViewInit {
  data: TableData;
  query: string;
  provider: string;
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    private commander: CommanderService,
    private cache: CacheService
  ) {
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit(): void {}

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  async ngAfterViewInit() {
    this.query = this.route.snapshot.paramMap.get('query');
    this.provider = this.route.snapshot.paramMap.get('provider');

    this.data = await this.commander.processQueryCommand(
      this.query,
      this.provider
    );

    this.dataSource = new MatTableDataSource(this.data.rows);

    if (this.data == null) {
      console.log('UNABLE TO LOAD DATA');
    }

    setTimeout(() => {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }, 500);
  }

  async selectItem(item) {
    if (this.data.selectItemCommand != null) {
      await this.commander.processSelectCommand(
        this.data.selectItemCommand,
        item
      );
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
