import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../auth';
@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  constructor(
    private readonly authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.refresh()
  }

}
