import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Emitters } from 'emitters/emitters';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  authenticated = false
  constructor(private http: HttpClient) {

  }
  ngOnInit(): void {
    Emitters.authEmitter.subscribe((auth: boolean) => {
      this.authenticated = auth
    })
  }
  logout() {
    this.http.post('http://localhost:5000/api/logout', {}, { withCredentials: true }).subscribe(() => this.authenticated = false)
    this.authenticated = false;
  }
}
