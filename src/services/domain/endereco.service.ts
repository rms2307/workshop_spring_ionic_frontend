import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class EnderecoService {
    constructor(
        public http: HttpClient,
    ) {

    }

    findEnderecoByCEP(cep: string) {
        return this.http.get(`https://viacep.com.br/ws/${cep}/json/`);
    }

}