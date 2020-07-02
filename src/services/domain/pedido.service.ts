import { API_CONFIG } from './../../config/api.config';
import { PedidoDTO } from './../../models/pedido.dto';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs/Rx';
import { PedidoDTOId } from '../../models/pedido.dtoid';


@Injectable()
export class PedidoService {

    constructor(public http: HttpClient) { }

    insert(obj: PedidoDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/pedidos`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }

    findAll(): Observable<PedidoDTOId[]> {
        return this.http.get<PedidoDTOId[]>(`${API_CONFIG.baseUrl}/pedidos`);
    }

    findById(pedido_id: string) {
        return this.http.get(`${API_CONFIG.baseUrl}/pedidos/${pedido_id}`);
    }
}