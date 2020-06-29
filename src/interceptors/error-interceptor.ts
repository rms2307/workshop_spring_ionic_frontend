import { FieldMessage } from './../models/fieldmessage';
import { StorageService } from './../services/storage.service';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Rx'; // IMPORTANTE: IMPORT ATUALIZADO
import { AlertController } from 'ionic-angular';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(public storage: StorageService, public alertCtl: AlertController) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
            .catch((error, caught) => {

                let errorObj = error;

                if (errorObj.error) {
                    errorObj = errorObj.error;
                }
                if (!errorObj.status) {
                    errorObj = JSON.parse(errorObj);
                }

                console.log("Erro detectado pelo interceptor:");
                console.log(errorObj);

                switch (errorObj.status) {
                    case 401:
                        this.handle401();
                        break;

                    case 403:
                        this.handle403();
                        break;

                    case 404:
                        this.handle404();
                        break;

                    case 422:
                        this.handle422(errorObj);
                        break;

                    default:
                        this.handleDefaultError(errorObj);
                }

                return Observable.throw(errorObj);
            }) as any;
    }

    handle403() {
        this.storage.setLocalUser(null);
        /**let alert = this.alertCtl.create({
            title: 'Erro 403',
            message: 'Acesso Negado',
            enableBackdropDismiss: false,
            buttons: [{ text: 'OK' }]
        });
        alert.present();**/
    }

    handle401() {
        let alert = this.alertCtl.create({
            title: 'Erro 401: Falha de autenticação',
            message: 'Email ou Senha incorretos',
            enableBackdropDismiss: false,
            buttons: [{ text: 'OK' }]
        });
        alert.present();
    }

    handle404() {
        let alert = this.alertCtl.create({
            title: 'Erro 404',
            message: 'Objeto não encontrado',
            enableBackdropDismiss: false,
            buttons: [{ text: 'OK' }]
        });
        alert.present();
    }

    handle422(errorObj) {
        let alert = this.alertCtl.create({
            title: 'Erro 422: Validação',
            message: this.listErrors(errorObj.errors),
            enableBackdropDismiss: false,
            buttons: [{ text: 'OK' }]
        });
        alert.present();
    }

    handleDefaultError(errorObj) {
        let alert = this.alertCtl.create({
            title: 'Erro ' + errorObj.status + ': ' + errorObj.error,
            message: errorObj.message,
            enableBackdropDismiss: false,
            buttons: [{ text: 'OK' }]
        });
        alert.present();
    }

    private listErrors(messages: FieldMessage[]): string {
        let s: string = '';
        for (var i = 0; i < messages.length; i++) {
            s = s + '<p><strong>' + messages[i].fieldName + '</strong>: ' + messages[i].message
        }
        return s;
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};