import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-error-dialog",
  templateUrl: "./error-dialog.component.html"
})
export class ErrorDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {},
    public dialogRef: MatDialogRef<ErrorDialogComponent>
  ) {}

  ngOnInit() {}

  closeDialog() {
    this.dialogRef.close();
  }
}
