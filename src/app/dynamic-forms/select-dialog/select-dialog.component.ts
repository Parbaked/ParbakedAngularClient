import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SearchResultItem } from '../dtos/search-result-item';
import { MatListOption } from '@angular/material/list';
import { MatDialog } from '@angular/material/dialog';
import { CommanderService } from '../services/commander.service';

@Component({
  selector: 'app-select-dialog',
  templateUrl: './select-dialog.component.html',
  styleUrls: ['./select-dialog.component.scss'],
})
export class SelectDialogComponent implements OnInit {
  searchText = '';
  searchCommand = '';
  items: SearchResultItem[] = [];

  selected: SearchResultItem[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { searchCommand: string },
    private dialogRef: MatDialogRef<SelectDialogComponent>,
    private commander: CommanderService
  ) {
    this.searchCommand = data.searchCommand;
  }

  ngOnInit(): void {}

  onChange($event) {
    this.commander
      .selectQuery(this.searchText, this.searchCommand)
      .then((result) => {
        this.items = [];
        result.items.forEach((item) => {
          this.items.push(item);
        });
      });
  }

  onSelection(event) {
    if (event.option.selected) {
      var item = this.items.filter((i) => i.key == event.option.value)[0];
      this.selected.push(item);
    } else {
      this.selected = this.selected.filter((i) => i.key != event.option.value);
    }
  }

  async cancel() {
    this.dialogRef.close({ selected: [] });
  }

  async add() {
    this.dialogRef.close({ selected: this.selected });
  }
}
