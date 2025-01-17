import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  private sidebarToggleSubject = new Subject<void>();
  sidebarToggled$ = this.sidebarToggleSubject.asObservable();

  toggleSidebar(): void {
    this.sidebarToggleSubject.next();
  }
}
