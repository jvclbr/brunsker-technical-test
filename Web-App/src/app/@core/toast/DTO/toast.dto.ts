import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from "@angular/material/snack-bar";
import { ToastType } from '../Types';

export interface ToastContentDTO<T> {
  content: T;
  icon ?: string;
}

export interface ToastConfigDTO<T> {
  data: ToastContentDTO<T>;
  type: ToastType;
  horizontalPosition ?: MatSnackBarHorizontalPosition;
  verticalPosition ?: MatSnackBarVerticalPosition;
  duration ?: number;
}
