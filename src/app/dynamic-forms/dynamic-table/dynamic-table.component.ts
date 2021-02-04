import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { TableData } from '../dtos/table-data';
import { CacheService } from '../services/cache.service';
import { CommanderService } from '../services/commander.service';

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
  viewMode: string = '1';
  columnHeaders: string[] = [];
  displayedColumns: string[] = [];
  showHeaders: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    private commander: CommanderService,
    private cache: CacheService,
    private titleService: Title
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

    this.columnHeaders = [];
    this.displayedColumns = [];
    for (let element of this.data.columnHeaders) {
      this.columnHeaders.push(element);
      this.displayedColumns.push(element);
    }

    if (this.data == null) {
      console.log('UNABLE TO LOAD DATA');
    }

    setTimeout(() => {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }, 500);

    this.titleService.setTitle(this.data.title);
  }

  viewModeChanged($event) {
    console.log(this.viewMode);
    this.displayedColumns = [];
    this.columnHeaders = [];

    if (this.viewMode == '2') {
      for (let element of this.data.columnHeaders) {
        this.columnHeaders.push(element);
        this.displayedColumns.push(element);
      }
    } else {
      this.displayedColumns.push('__card');
    }
  }

  async selectItem(item) {
    if (this.data.selectItemCommand != null) {
      await this.commander.processSelectCommand(
        this.data.selectItemCommand,
        item
      );
    }
  }

  applyFilter($event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
