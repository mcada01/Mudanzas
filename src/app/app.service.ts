import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AppService {
    constructor(private http: HttpClient) {
    }

    procesarArchivo(file: File): Observable<any> {
        let formData = new FormData();
        formData.append('ArchivoSeleccionado', file);
        return this.http.post('http://localhost/ProcesarArchivoMudanzas/api/Mudanza/PostProcesarArchivo', formData);//return this.http.post('http://localhost/ProcesarArchivoMudanzas/api/Mudanza/PostProcesarArchivo',fd);
    }

}
