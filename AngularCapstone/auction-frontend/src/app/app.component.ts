import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'] // ✅ "styleUrls" not "styleUrl"
})
export class AppComponent {
  title = 'auction-frontend';
}
