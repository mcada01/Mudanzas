import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from './app.service';
import { DomSanitizer } from '@angular/platform-browser';

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
  numDocumento: number = null;
  fileUrl;

  constructor(private formBuilder: FormBuilder, private appService: AppService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    // inicializar los campos del formulario con sus respectivas validaciones
    this.registerForm = this.formBuilder.group({
      numDocumento: ['', Validators.required],
      archivo: ['', Validators.required]
    });

    // construir archivo de texto
    const data = this.file;
    const blob = new Blob([data], { type: 'text/plain' });

    //this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
    this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
  }

  // para acceder facil a los campos
  get f() { return this.registerForm.controls; }

  downLoadFile(data: any, type: string) {
    var blob = new Blob([data], { type: type});
    var url = window.URL.createObjectURL(blob);
    var pwa = window.open(url);
    if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
        alert( 'Please disable your Pop-up blocker and try again.');
    }
  }

  procesarArchivo() {
      this.submitted = true;

      // validar los capos del formulario
      if (this.registerForm.invalid) {
          return;
      }

    

      this.appService.procesarArchivo(this.file, this.numDocumento).subscribe(Response => {
        this.downLoadFile(Response,"text/plain")
        console.log(Response);
        
        alert('SUCCESS!!');

          /*let filename = "C:\ArchivoSalida.txt";//"/Path/to/your/report.pdf";
          this.appService.downloadReport(filename).subscribe(
            data => {
              //saveAs(data, filename);
            },
            err => {
              alert("Problem while downloading the file.");
              console.error(err);
            }
          );
          
        }
        else
          alert('ERROR!!');*/
      });

      // leer el archivo 

      //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
  }

  cargarArchivo(evento: any) {
    this.file = evento.target.files[0];
  }
  

}
