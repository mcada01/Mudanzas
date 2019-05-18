import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AppService {
    constructor(private http: HttpClient) {
    }

    procesarArchivo(file: File, numDocumento: number){
        let formData = new FormData();
        formData.append('ArchivoSeleccionado', file);
        //return this.http.post('http://localhost/ProcesarArchivoMudanzas/api/Mudanza/PostProcesarArchivo/' + numDocumento, formData)
        return this.http.post('http://localhost:56550/api/Mudanza/PostProcesarArchivo/' + numDocumento, formData
        , {
           //headers: new HttpHeaders().append("Accept", "text/plain"),
           responseType : "arraybuffer"
          }
          )
        
        }

    public downloadReport(file): Observable<any> {
        // Create url
        let url = 'http://localhost/ProcesarArchivoMudanzas/api/Mudanza/PostDescargarArchivo/';
        var body = { filename: file };
    
        return this.http.post(url, body, {
          responseType: "blob",
          headers: new HttpHeaders().append("Content-Type", "application/json")
        });
      }

}
