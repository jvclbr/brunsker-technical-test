import {
  Component,
  HostListener,
  Inject
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogOptionsDTO } from '../../DTO';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: ConfirmDialogOptionsDTO,
    private readonly mdDialogRef: MatDialogRef<ConfirmDialogComponent>,
  ) {}

  public cancel() {
    this.close(false);
  }

  private close(value: boolean) {
    this.mdDialogRef.close(value);
  }

  public confirm() {
    this.close(true);
  }

  @HostListener('keydown.esc')
  public onEsc() {
    this.close(false);
  }
}
