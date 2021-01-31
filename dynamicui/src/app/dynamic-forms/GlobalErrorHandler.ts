import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { environment } from '../../environments/environment';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  showingError = false;

  constructor(private dialog: MatDialog, private ngZone: NgZone) {}
  handleError(error) {
    var errorMessage = 'An error occured.';
    var errorDetails = '';
    var errorStack = '';
    if (error != null) {
      errorDetails = error.message;
      errorStack = error.stack;
    }

    if (this.showingError) {
      return;
    }

    this.ngZone.run(() => {
      this.showingError = true;
      let dialogRef: MatDialogRef<ErrorDialogComponent> = null;
      if (environment.production) {
        dialogRef = this.dialog.open(ErrorDialogComponent, {
          width: '250px',
          data: {
            errorMessage: errorMessage,
            errorDetails: errorDetails,
            errorStack: errorStack,
          },
        });
      } else {
        dialogRef = this.dialog.open(ErrorDialogComponent, {
          width: '98%',
          height: '98%',
          position: {
            top: '2%',
            left: '2%',
          },
          data: {
            errorMessage: errorMessage,
            errorDetails: errorDetails,
            errorStack: errorStack,
          },
        });
      }
      dialogRef.afterClosed().subscribe(() => {
        this.showingError = false;
      });
    });
  }
}
