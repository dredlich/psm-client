import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface DialogData {
  title: string;
  message: string;
  confirmCallback?: (param: any) => {};
  callbackParam?: object;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ){}

  okClick(): void {
    this.dialogRef.close();
    if (this.data.confirmCallback && this.data.callbackParam){
      this.data.confirmCallback(this.data.callbackParam);
    }
  }
}
