import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AppService]
})
export class AppComponent  implements OnInit{
  registerForm: FormGroup;
  submitted = false;
  file: File;
  fileByteArray = [];

  constructor(private formBuilder: FormBuilder, private appService: AppService) { }

  ngOnInit() {
    // inicializar los campos del formulario con sus respectivas validaciones
    this.registerForm = this.formBuilder.group({
      numDocumento: ['', Validators.required],
      archivo: ['', Validators.required]
    });
  }

  // para acceder facil a los campos
  get f() { return this.registerForm.controls; }

  procesarArchivo() {
      this.submitted = true;

      // validar los capos del formulario
      if (this.registerForm.invalid) {
          return;
      }

      this.appService.procesarArchivo(this.file).subscribe(Response => {
        debugger;
        if (Response == 1)
          alert('SUCCESS!!');
        else
        alert('ERROR!!');
      });

      // leer el archivo 

      //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
  }

  cargarArchivo(event) {
    this.file = event.target.files[0];
  }
  

}
