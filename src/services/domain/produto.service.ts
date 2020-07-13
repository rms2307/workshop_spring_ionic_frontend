import { ProdutoDTO } from './../../models/produto.dto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../../config/api.config';
import { Observable } from 'rxjs/Rx'; // IMPORTANTE: IMPORT ATUALIZADO

@Injectable()
export class ProdutoService {

    constructor(public http: HttpClient) {
    }

    findById(produto_id: string) {
        return this.http.get<ProdutoDTO>(`${API_CONFIG.baseUrl}/produtos/${produto_id}`);
    }

    findByCategoria(categoria_id: string, page: number = 0, linesPerPage: number = 24) {
        return this.http.get(`${API_CONFIG.baseUrl}/produtos/search/?categorias=${categoria_id}&page=${page}&linesPerPage=${linesPerPage}`);
    }

    getSmallImgFromBucket(id: string): Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/prod${id}-small.jpg`
        return this.http.get(url, { responseType: 'blob' });
    }

    getImgFromBucket(id: string): Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/prod${id}.jpg`
        return this.http.get(url, { responseType: 'blob' });
    }

    delete(id: string) {
        return this.http.delete(`${API_CONFIG.baseUrl}/produtos/${id}`,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }

    insert(obj) {
        return this.http.post(`${API_CONFIG.baseUrl}/produtos`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }

    update(obj, id: string) {
        return this.http.put(
            `${API_CONFIG.baseUrl}/produtos/${id}`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }


}