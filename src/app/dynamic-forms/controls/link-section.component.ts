import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import {
  AbstractControl,
  ControlContainer,
  Form,
  FormArray,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { DynamicDashboardData } from '../dtos/dynamic-dashboard-data';
import { DynamicFormData } from '../dtos/dynamic-form-data';
import { DynamicFormSection } from '../dtos/dynamic-form-section';
import { CommanderService } from '../services/commander.service';
import { SelectDialogComponent } from '../select-dialog/select-dialog.component';

@Component({
  selector: 'link-section',
  templateUrl: './link-section.component.html',
  styleUrls: ['./link-section.component.scss'],
})
export class LinkSectionComponent implements OnInit {
  constructor(
    public controlContainer: ControlContainer,
    private fb: FormBuilder,
    private changeDetectorRefs: ChangeDetectorRef,
    public dialog: MatDialog
  ) {}

  @Input() data: DynamicFormData;
  @Input() section: DynamicFormSection;
  isLoaded = false;
  form: FormGroup;

  @ViewChild(MatTable) matTable: MatTable<any>;

  ngOnInit() {
    this.form = <FormGroup>this.controlContainer.control;

    if (this.section.sectionType == 'links') {
      var linkRowsName = 'linkRows_' + this.section.sectionData;
      this[linkRowsName] = this.fb.array([]);

      var linkDataSourceName = linkRowsName + '_source';
      this[linkDataSourceName] = new BehaviorSubject<AbstractControl[]>([]);

      const linkRowsData = this.data.record[this.section.sectionData];
      let index = 0;
      linkRowsData.forEach((element) => {
        element.rowNumber = index;
        this.addRow(this[linkRowsName], element);
        index++;
      });

      this.form.addControl(linkRowsName, this[linkRowsName]);
      this.updateTable(this[linkRowsName], this[linkDataSourceName]);
      this.section.bindable = this[linkDataSourceName];
    }

    this.isLoaded = true;
  }

  addRow(rows: FormArray, record: any) {
    const row = this.fb.group(record);
    rows.push(row);
  }

  updateTable(
    rows: FormArray,
    tableSource: BehaviorSubject<AbstractControl[]>
  ) {
    for (let index in rows.value) {
      var item = rows.value[index];
      item.rowNumber = parseInt(index);
    }

    if (this.matTable != null) {
      this.matTable.renderRows();
    }

    tableSource.next(rows.controls);
    this.changeDetectorRefs.detectChanges();
  }

  async unlink(rowsName: string, row: any) {
    let rows = this[rowsName] as FormArray;
    let tableSource = this[rowsName + '_source'] as BehaviorSubject<
      AbstractControl[]
    >;

    if (row.value.rowNumber != undefined) {
      rows.removeAt(row.value.rowNumber);
    } else {
      rows.removeAt(rows.length - 1);
    }

    this.updateTable(rows, tableSource);
  }

  async addLink(rowsName: string, addTemplate) {
    let rows = this[rowsName] as FormArray;
    let tableSource = this[rowsName + '_source'] as BehaviorSubject<
      AbstractControl[]
    >;
    const newRow = {};
    Object.assign(newRow, addTemplate);
    this.addRow(rows, newRow);
    this.updateTable(rows, tableSource);
  }

  async addLinkUsingSearch(rowsName: string, addLinkSearchCommand: string) {
    let dialogRef = this.dialog.open(SelectDialogComponent, {
      width: '100%',
      height: '100%',
      data: { searchCommand: addLinkSearchCommand },
    });

    let rows = this[rowsName] as FormArray;
    let tableSource = this[rowsName + '_source'] as BehaviorSubject<
      AbstractControl[]
    >;

    dialogRef.afterClosed().subscribe((result) => {
      if (result != null && result.selected != null) {
        result.selected.forEach((element) => {
          this.addRow(rows, element.record);
        });
        this.updateTable(rows, tableSource);
      }
    });
  }
}
