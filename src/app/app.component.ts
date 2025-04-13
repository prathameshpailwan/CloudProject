import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CloudComponent } from './component/cloud/cloud.component';

@Component({
  selector: 'app-root',
  imports: [CloudComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'CloudProject';
}
