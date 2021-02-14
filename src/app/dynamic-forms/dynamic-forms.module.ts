import { ErrorHandler, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicRoutingModule } from './dynamic-routing.module';
import { LayoutModule } from '@angular/cdk/layout';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatFormFieldModule,
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
} from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { DynamicTableComponent } from './dynamic-table/dynamic-table.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { DynamicDashboardComponent } from './dynamic-dashboard/dynamic-dashboard.component';
import { PhoneMaskDirective } from './directives/phone-mask';

import { SelectDialogComponent } from './select-dialog/select-dialog.component';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debugOutputAstAsTypeScript } from '@angular/compiler';
import { CommanderService } from './services/commander.service';
import { environment } from 'src/environments/environment';
import { GlobalErrorHandler } from './GlobalErrorHandler';
import { FieldSectionComponent } from './controls/field-section.component';
import { LinkSectionComponent } from './controls/link-section.component';
import { SectionComponent } from './controls/section.component';
import { AngularEditorModule } from '@kolkov/angular-editor';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  providers: [
    { provide: CommanderService, useClass: environment.concreteCommander },
    // {
    //   provide: ErrorHandler,
    //   useClass: GlobalErrorHandler,
    // },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'fill' },
    },
  ],
  declarations: [
    DynamicTableComponent,
    DynamicFormComponent,
    DynamicDashboardComponent,
    PhoneMaskDirective,
    SelectDialogComponent,
    ErrorDialogComponent,
    FieldSectionComponent,
    LinkSectionComponent,
    SectionComponent,
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    DynamicRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatCheckboxModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatStepperModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    AngularEditorModule,
  ],
})
export class DynamicFormsModule {}
