import { Component } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { IClient } from '../../models/Client';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-client',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})


export class ClientComponent {

  employees: IClient[] = [];
  id: String = "";
  name: String = "";
  username: String = "";
  password: String = "";
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

        this.employees = response;


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
        this.username = response.username;
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
      username: this.username,
      password: this.password
    };

    this.clientService.create(json).subscribe({
      next: (data) => {
        
        this.btnGuardar = "Save";
        
        //cerrar modal
        document.getElementById("closeModalCreate")?.click();
        //Swal.fire('Guardado', 'Registro creado con éxito', 'success');
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
      username: this.username
    };

    this.clientService.update(this.id, json).subscribe({
      next: (data) => {

        this.btnGuardar = "Save";

        //cerrar modal
        document.getElementById("closeModalEdit")?.click();
        //Swal.fire('Guardado', 'Registro creado con éxito', 'success');
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
        //Swal.fire('Guardado', 'Registro creado con éxito', 'success');
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
    if (this.name == "" || this.username == "" || this.password == "") {
      return true;
    } else {
      return false;
    }
  }

  getDisableEdit() {
    if (this.name == "" || this.username == "") {
      return true;
    } else {
      return false;
    }
  }

  clean(): void {
    this.id = "";
    this.name = "";
    this.username = "";
    this.password = "";
    this.errorUsername = "";
    this.btnGuardar = "Save";
  }





}
