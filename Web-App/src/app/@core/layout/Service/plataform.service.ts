import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { ReplaySubject, Observable } from 'rxjs';
import { PlataformEnum } from '../Enums';
import { PlataformTypes } from '../Type';

@Injectable({
  providedIn: 'root'
})
export class PlataformService {

  private currentPlataform: ReplaySubject<PlataformTypes> = new ReplaySubject<PlataformTypes>();
  private breakpoints: string[] = [Breakpoints.Handset, Breakpoints.Tablet, Breakpoints.Web];

  constructor(
    private readonly breakpointObserver: BreakpointObserver
  ) {
    this.initSubscriptions();
  }

  private initSubscriptions(): void{

    this.breakpointObserver.observe(this.breakpoints).subscribe((state: BreakpointState) => {
      if (state.matches) {
        Object.keys(state.breakpoints).forEach(breakpoint => {
          if (state.breakpoints[breakpoint]) {
            this.breakpoints.forEach(targetBreakpoint => {
              const BreakpointsValues = targetBreakpoint.split(', ');
              BreakpointsValues.forEach((value: string) => {
                if (value === breakpoint) {
                  if (targetBreakpoint === Breakpoints.Handset) {
                    this.setPlataform(PlataformEnum.MOBILE);
                  }
                  else if (targetBreakpoint === Breakpoints.Tablet) {
                    this.setPlataform(PlataformEnum.TABLET);
                  }
                  else if (targetBreakpoint === Breakpoints.Web) {
                    this.setPlataform(PlataformEnum.DESKTOP);
                  }
                }
              });
            })
          }
        })
      }
    })

  }

  private setPlataform(newPlataform: PlataformTypes): void {
    this.currentPlataform.next(newPlataform);
  }

  getPlataform(): Observable<PlataformTypes> {
    return this.currentPlataform.asObservable();
  }

}
