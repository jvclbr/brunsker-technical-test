import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoadingSpinnerComponent } from '../Components';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {

  private loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private lastRequest: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(
    private readonly matDialog: MatDialog,
  ) { }

  public showLoadingScreen(show: boolean): void {
    if (show) {
      this.matDialog.open(LoadingSpinnerComponent, {
        panelClass: 'transparent',
        disableClose: true
      });
    }
    else {
      this.matDialog.closeAll()
    }
  }

  public setLoading(isLoading: boolean):void {
    this.loading.next(isLoading);
    this.showLoadingScreen(isLoading);
  }

  public getLoading(): Observable<boolean> {
    return this.loading.asObservable();
  }

  public setLastRequest(lastRequest: string): void {
    this.lastRequest.next(lastRequest);
  }

  public getLastRequest(): Observable<string> {
    return this.lastRequest.asObservable();
  }
}
