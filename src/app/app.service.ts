import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AppService {
    constructor(private http: HttpClient) {
    }

    /*uploadFile(file: File) : Observable<HttpEvent<any>> {
        this.logger.trace(`${this.constructor.name}:uploadImage(promoId=${promoId},file)`);
        let fd = new FormData()
        fd.append('UploadedImage', file)
        return this.http.post("ENDPOINT DEL API", fd)
    }*/

    procesarArchivo(file: File): Observable<any> {
        let fd = new FormData();
        fd.append('UploadFile', file);
        debugger;
        return this.http.get('http://localhost/ProcesarArchivoMudanzas/api/Mudanza/PostProcesarArchivo');//return this.http.post('http://localhost/ProcesarArchivoMudanzas/api/Mudanza/PostProcesarArchivo',fd);
    }

}
