import { Component } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { IClient } from '../../models/Client';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

/**
 * Decorador
 */
@Component({
  selector: 'app-client',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})


export class ClientComponent {

  //objeto cliente
  clients: IClient[] = [];
  id: String = "";
  name: String = "";
  email: String = "";
  address: String = "";


  btnGuardar = "Save";

  errorUsername: String = "";

  constructor(
    private clientService: ClientService,
    //private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.listAll();
  }

  listAll() {
    this.clientService.listAll().subscribe({
      next: (response) => {

        this.clients = response;


        // if (response.data) {
        //   this.employees = response.data;
        // }

      },
    });
  }

  listById(id: String) {

    this.errorUsername = "";
    this.btnGuardar = "Save";

    this.clientService.listById(id).subscribe({
      next: (response) => {
        this.id = response.id;
        this.name = response.name;
        this.email = response.email;
      },
    });
  }

  create(): void {

    //iniciar
    this.btnGuardar = "Saving...";
    //this.cleanErrors();

    //json
    let json = {
      name: this.name,
      email: this.email,
      address: this.address
    };

    this.clientService.create(json).subscribe({
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
          if (error.error.message == "Username ya existe") {
            this.errorUsername = error.error.message;
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

    //json
    let json = {
      name: this.name,
      email: this.email,
      address: this.address
    };

    this.clientService.update(this.id, json).subscribe({
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
          if (error.error.message == "Username ya existe") {
            this.errorUsername = error.error.message;
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

  destroy(id : String): void {

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
    this.errorUsername = "";
    this.btnGuardar = "Save";
  }





}
