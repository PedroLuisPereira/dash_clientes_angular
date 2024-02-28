import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClientServiceService  } from './client-service.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  data: Array<any> = [];

  constructor(private clientServiceService: ClientServiceService) { }

  ngOnInit(): void {
    this.listAll();
  }

  listAll(): void {
    
      
      this.clientServiceService.listAll().subscribe({
        next: (data) => {
          //capturar data
          let datos: any;
          datos = data;

          //obtener datos
          this.data = datos;

        },
        error: (e) => {
          //Swal.fire('Error en el servidor', '', 'error');
          console.error(e)
          //this.spinner = false;
        }
      });
      }

  title = 'dash-clientes-angular';
}
