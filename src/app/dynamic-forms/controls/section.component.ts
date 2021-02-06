import { Component, Input, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { ControlContainer, Form, FormBuilder, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { DynamicDashboardData } from '../dtos/dynamic-dashboard-data';
import { DynamicFormData } from '../dtos/dynamic-form-data';
import { DynamicFormSection } from '../dtos/dynamic-form-section';
import { CommanderService } from '../services/commander.service';

@Component({
  selector: 'section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
})
export class SectionComponent implements OnInit {
  constructor(public controlContainer: ControlContainer) {}

  @Input() data: DynamicFormData;
  @Input() sections: DynamicFormSection[];
  form: FormGroup;
  isLoaded = false;

  ngOnInit() {
    // Set our form property to the parent control
    // (i.e. FormGroup) that was passed to us, so that our
    // view can data bind to it
    this.form = <FormGroup>this.controlContainer.control;
    this.isLoaded = true;
  }
}
