import { Component, OnInit, ViewChild } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DynamicFormData } from '../dtos/dynamic-form-data';
import { CommanderService } from '../services/commander.service';
import { MatTable } from '@angular/material/table';
import { BehaviorSubject } from 'rxjs';
import { JsonpClientBackend } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { StaticListService } from '../services/static-list.service';
import { FilterService } from '../services/filter.service';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent implements OnInit {
  data: DynamicFormData;

  entity: string;
  id: string;
  provider: string;
  form = this.fb.group({});
  loaded = false;

  @ViewChild(MatTable) matTable: MatTable<any>;

  dataFieldName = 'data.record.first';

  constructor(
    private route: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private commander: CommanderService,
    private staticListService: StaticListService,
    private filterService: FilterService,
    private titleService: Title
  ) {}

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  ngOnInit(): void {}

  async ngAfterViewInit() {
    this.entity = this.route.snapshot.paramMap.get('entity');
    this.id = this.route.snapshot.paramMap.get('id');
    this.provider = this.route.snapshot.paramMap.get('provider');

    this.data = await this.commander.load(this.entity, this.id);

    console.log(this.data);
    if (this.data == null) {
      console.log('UNABLE TO LOAD DATA');
      return;
    }

    for (let list of Object.keys(this.data.lists)) {
      if (list == 'USSTATES') {
        this.data.lists[list] = this.staticListService.USStates();
      } else if (list == 'SEX') {
        this.data.lists[list] = this.staticListService.sexes();
      }
    }

    this.form = this.fb.group(this.data.record);

    this.form.valueChanges.subscribe((val) => {
      if (this.data.dataChangeAction != null) {
        let obj = this.cleanData(this.data.record, val);

        this.commander.dataChange(
          this.entity,
          this.id,
          obj,
          obj,
          this.data.dataChangeAction.text
        );
      }
    });

    this.loaded = true;
    this.titleService.setTitle(this.data.title);
  }

  cleanData(oldValues: any, newValues: any): any {
    var record = {};
    for (let key of Object.keys(oldValues)) {
      if (key != '__proto__') {
        var newV = newValues[key];
        var oldV = oldValues[key];
        if (Array.isArray(oldV)) {
          record[key] = newValues['linkRows_' + key];
        } else {
          record[key] = newV;
        }
      }
    }
    return record;
  }

  async action(text: string) {
    Object.keys(this.data.record).forEach((key, index) => {
      const control = this.form.get(key);
      if (control != null) {
        this.data.record[key] = control.value;
      }
      var value = this.data.record[key];
    });

    this.data.tabs.forEach((tab) => {
      tab.sections.forEach((section) => {
        if (section.sectionType == 'links') {
          this.data.record[section.sectionData] = [];

          section.bindable.value.forEach((element) => {
            this.data.record[section.sectionData].push(element.value);
          });
        }
      });
    });

    await this.commander.action(text, this.id, this.entity, this.data.record);
  }
}
