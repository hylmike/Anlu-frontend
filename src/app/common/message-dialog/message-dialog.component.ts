import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface MessageDialogData{
  title: string;
  message: string;
}

@Component({
  selector: 'alert-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.css']
})
export class AlertDialog {
  constructor(
  public dialogRef: MatDialogRef<AlertDialog>,
  @Inject(MAT_DIALOG_DATA) public data: MessageDialogData) {}
  onOKClick(): void {
  this.dialogRef.close();
  }
}
