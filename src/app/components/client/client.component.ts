import { Component } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/Client';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';
import Swal from 'sweetalert2';

/**
 * Decorador
 */
@Component({
  selector: 'app-client',
  standalone: true,
  imports: [FormsModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})


export class ClientComponent {

  //objeto cliente
  clients: Client[] = [];
  client: Client = new Client();

  //data-binding
  id: string = "";
  name: string = "";
  email: string = "";
  address: string = "";


  btnGuardar = "Save";
  inicio: boolean = false;
  errorName: String = "";
  errorEmail: String = "";

  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    this.listAll();
  }

  listAll() {

    this.inicio = true;

    this.clientService.listAll().subscribe({
      next: (response) => {
        this.clients = response;
        this.inicio = false;
      },
      error: (error) => {
        this.inicio = false;
      }
    });
  }

  listById(id: string) {

    this.btnGuardar = "Save";
    this.clean();

    this.clientService.listById(id).subscribe({
      next: (response) => {
        this.id = response.id;
        this.name = response.name;
        this.email = response.email;
        this.address = response.address;

        console.log(this.id);

      },

    });
  }

  create(): void {

    //iniciar
    this.btnGuardar = "Saving...";

    this.validaciones();

    if (this.name == "" || this.email == "") {
      this.btnGuardar = "Save";
      return;
    }


    //cliente
    this.client.name = this.name;
    this.client.email = this.email;
    this.client.address = this.address;

    this.clientService.create(this.client).subscribe({
      next: (data) => {

        this.btnGuardar = "Save";

        //cerrar modal
        document.getElementById("closeModalCreate")?.click();
        Swal.fire('Guardado', 'Registro creado con éxito', 'success');
        //this.cleanErrors();
      },
      error: (error) => {

        if (error == undefined) {
          //Swal.fire("Error en el proceso", '', "error");
        }

        if (error.status == 400) {
          if (error.error.message == "Email ya existe") {
            this.errorEmail = error.error.message;
            //this.isCodigo = true;
          }
        }

        this.btnGuardar = "Save";
      }
    });

    setTimeout(() => {
      this.listAll();
    }, 3000);

  }

  update(): void {

    //iniciar
    this.btnGuardar = "Saving...";

    //cliente
    this.client.name = this.name;
    this.client.email = this.email;
    this.client.address = this.address;

    this.clientService.update(this.id, this.client).subscribe({
      next: (data) => {

        this.btnGuardar = "Save";

        //cerrar modal
        document.getElementById("closeModalEdit")?.click();
        Swal.fire('Guardado', 'Registro actualizado con éxito', 'success');
        //this.cleanErrors();
      },
      error: (error) => {

        if (error == undefined) {
          //Swal.fire("Error en el proceso", '', "error");
        }

        if (error.status == 400) {
          if (error.error.message == "Email ya existe") {
            this.errorEmail = error.error.message;
            //this.isCodigo = true;
          }
        }

        this.btnGuardar = "Save";
      }
    });

    setTimeout(() => {
      this.listAll();
    }, 3000);

  }

  destroy(id: String): void {

    this.clientService.delete(id).subscribe({
      next: (data) => {

        //this.btnGuardar = "Save";

        //cerrar modal
        //document.getElementById("closeModalEdit")?.click();
        Swal.fire('Eliminado', 'Registro eliminado con éxito', 'success');
        //this.cleanErrors();
      },
      error: (error) => {

        if (error == undefined) {
          //Swal.fire("Error en el proceso", '', "error");
        }

      }
    });

    setTimeout(() => {
      this.listAll();
    }, 3000);

  }

  getDisable() {
    if (this.name == "" || this.address == "" || this.address == "") {
      return true;
    } else {
      return false;
    }
  }

  getDisableEdit() {
    if (this.name == "" || this.email == "") {
      return true;
    } else {
      return false;
    }
  }

  clean(): void {
    this.id = "";
    this.name = "";
    this.email = "";
    this.address = "";
    this.errorName = "";
    this.errorEmail = "";
    this.btnGuardar = "Save";
  }

  validaciones(): void {
    if (this.name == "") {
      this.errorName = "El nombre es requerido";
    }

    if (this.email == "") {
      this.errorEmail = "El email es requerido";
    }

  }





}
