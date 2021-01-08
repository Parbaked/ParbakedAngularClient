import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DynamicFormData } from '../dtos/dynamic-form-data';
import { CommanderService } from '../services/commander.service';

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

  dataFieldName = 'data.record.first';

  constructor(
    private route: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    private fb: FormBuilder,
    private commander: CommanderService
  ) {}

  ngOnInit(): void {}

  async ngAfterViewInit() {
    this.entity = this.route.snapshot.paramMap.get('entity');
    this.id = this.route.snapshot.paramMap.get('id');
    this.provider = this.route.snapshot.paramMap.get('provider');

    this.data = await this.commander.processLoadCommand(this.entity, this.id);

    if (this.data == null) {
      console.log('UNABLE TO LOAD DATA');
      return;
    }

    this.form = this.fb.group(this.data.record);

    Object.keys(this.data.record).forEach((key, index) => {
      console.log('adding field ' + key);
    });
  }

  async action(text: string) {
    console.log('command = ' + text);
    Object.keys(this.data.record).forEach((key, index) => {
      const control = this.form.get(key);
      if (control != null) {
        this.data.record[key] = control.value;
      }
      var value = this.data.record[key];
      console.log('adding field ' + key + ' ' + value);
    });

    await this.commander.processActionCommand(
      text,
      this.id,
      this.entity,
      this.data.record
    );
  }
}
