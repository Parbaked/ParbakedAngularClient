import { Component, Input, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { ControlContainer, Form, FormBuilder, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import {
  AngularEditorComponent,
  AngularEditorConfig,
} from '@kolkov/angular-editor';
import { DynamicDashboardData } from '../dtos/dynamic-dashboard-data';
import { DynamicFormData } from '../dtos/dynamic-form-data';
import { DynamicFormSection } from '../dtos/dynamic-form-section';
import { CommanderService } from '../services/commander.service';

@Component({
  selector: 'field-section',
  templateUrl: './field-section.component.html',
  styleUrls: ['./field-section.component.scss'],
})
export class FieldSectionComponent implements OnInit {
  constructor(private controlContainer: ControlContainer) {}

  @Input() data: DynamicFormData;
  @Input() section: DynamicFormSection;
  form: FormGroup;
  editorConfig: AngularEditorConfig;

  ngOnInit() {
    // Set our form property to the parent control
    // (i.e. FormGroup) that was passed to us, so that our
    // view can data bind to it
    this.form = <FormGroup>this.controlContainer.control;

    this.editorConfig = {
      editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '600',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: 'arial',
      defaultFontSize: '2',
      fonts: [
        { class: 'arial', name: 'Arial' },
        { class: 'times-new-roman', name: 'Times New Roman' },
        { class: 'calibri', name: 'Calibri' },
        { class: 'comic-sans-ms', name: 'Comic Sans MS' },
      ],
      customClasses: [],
      uploadUrl: 'v1/image',
      uploadWithCredentials: false,
      sanitize: true,
      toolbarPosition: 'top',
      toolbarHiddenButtons: [
        [
          'undo',
          'redo',
          'indent',
          'outdent',
          'insertUnorderedList',
          'insertOrderedList',
          'heading',
        ],
        [
          'backgroundColor',
          'customClasses',
          'link',
          'unlink',
          'insertImage',
          'insertVideo',
          'insertHorizontalRule',
          'removeFormat',
          'toggleEditorMode',
        ],
      ],
    };
  }
}
