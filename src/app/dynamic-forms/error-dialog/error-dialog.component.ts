import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SearchResultItem } from '../dtos/search-result-item';
import { MatListOption } from '@angular/material/list';
import { MatDialog } from '@angular/material/dialog';
import { CommanderService } from '../services/commander.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.scss'],
})
export class ErrorDialogComponent implements OnInit {
  errorMessage: string = 'An error has occured.';
  errorDetails: string;
  errorStack: string;
  showDebug: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      errorMessage: string;
      errorDetails: string;
      errorStack: string;
    },
    public dialogRef: MatDialogRef<ErrorDialogComponent>,
    private commander: CommanderService
  ) {
    this.showDebug = !environment.production;

    if (this.data != null) {
      this.errorMessage = data.errorMessage ?? 'An error has occured.';
      this.errorDetails = data.errorDetails;
      this.errorStack = data.errorStack;
    }
  }

  ngOnInit(): void {}

  okClick(): void {
    this.dialogRef.close();
  }
}
