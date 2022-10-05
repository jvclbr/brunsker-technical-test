import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastComponent } from '../Components';
import { ToastConfigDTO } from '../DTO'

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private readonly matSnackBar: MatSnackBar,
  ) { }

  public showToast( toastConfig: ToastConfigDTO<any> ) {

    this.matSnackBar.openFromComponent(ToastComponent, {
      data: {
        content: toastConfig.data.content,
        icon: toastConfig.data.icon ?? 'close'
      },
      panelClass: [toastConfig.type],
      duration: toastConfig.duration ?? 6000,
      horizontalPosition: toastConfig.horizontalPosition ?? 'center',
      verticalPosition: toastConfig.verticalPosition ?? 'bottom'
    });

  }
}
