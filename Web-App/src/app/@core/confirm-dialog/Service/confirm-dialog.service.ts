import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ConfirmDialogComponent } from '../Components';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogOptionsDTO } from '../DTO/confirm-dialog-options.dto';

@Injectable()
export class ConfirmDialogService {
  constructor(private dialog: MatDialog) {}
  private dialogRef!: MatDialogRef<ConfirmDialogComponent>;

  public open(options: ConfirmDialogOptionsDTO) {
    this.dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: options.title,
        message: options.message,
        cancelText: options.cancelText || 'Cancelar',
        confirmText: options.confirmText || 'Confirmar',
      },
    });
  }
  public confirmed(): Observable<boolean> {
    return this.dialogRef.afterClosed().pipe(
      take(1),
      map(confirmed => confirmed),
    );
  }
}
