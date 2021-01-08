import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { TableData } from '../dtos/table-data';
import { CacheService } from '../services/cache.service';
import { CommanderService } from '../services/commander.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss'],
})
export class DynamicTableComponent implements OnInit, AfterViewInit {
  data: TableData;
  query: string;
  provider: string;

  constructor(
    private route: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    private commander: CommanderService,
    private cache: CacheService
  ) {}

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

    if (this.data == null) {
      console.log('UNABLE TO LOAD DATA');
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
}
