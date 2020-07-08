import { ImageUtilService } from './../image.util.service';
import { API_CONFIG } from './../../config/api.config';
import { StorageService } from './../storage.service';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';

@Injectable()
export class ClienteService {
    constructor(
        public http: HttpClient,
        public storage: StorageService,
        public imageService: ImageUtilService,
    ) { }

    findById(id: string) {
        return this.http.get(`${API_CONFIG.baseUrl}/clientes/${id}`);
    }

    findByEmail(email: string) {
        return this.http.get(`${API_CONFIG.baseUrl}/clientes/email?value=${email}`);
    }

    getImgFromBucket(id: string): Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`
        return this.http.get(url, { responseType: 'blob' });
    }

    insert(obj) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/clientes`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }

    update(obj, id: string) {
        return this.http.put(
            `${API_CONFIG.baseUrl}/clientes/${id}`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }

    uploadImagem(imagem) {
        let imagemBlob = this.imageService.dataUriToBlob(imagem);
        let formData: FormData = new FormData();
        formData.set('file', imagemBlob, 'file.png');
        return this.http.post(
            `${API_CONFIG.baseUrl}/clientes/picture`,
            formData,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }

    addEndereco(obj) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/clientes/enderecos`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }

    updateEndereco(obj, id: string) {
        return this.http.put(
            `${API_CONFIG.baseUrl}/clientes/enderecos/${id}`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }

    deleteEndereco(id: string) {
        return this.http.delete(
            `${API_CONFIG.baseUrl}/clientes/enderecos/${id}`,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }

}