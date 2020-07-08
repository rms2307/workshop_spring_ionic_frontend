import { ClienteService } from './../../services/domain/cliente.service';
import { StorageService } from './../../services/storage.service';
import { API_CONFIG } from './../../config/api.config';
import { CategoriaDTO } from './../../models/categoria.dto';
import { CategoriaService } from './../../services/domain/categoria.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClienteDTO } from '../../models/cliente.dto';

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  bucketUrl: string = API_CONFIG.bucketBaseUrl;

  items: CategoriaDTO[];
  perfil: string[];
  cliente: ClienteDTO;
  isAdmin: boolean = false;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public categoriaService: CategoriaService,
    public storage: StorageService,
    public clienteService: ClienteService) {
  }

  ionViewDidLoad() {
    this.categoriaService.findAll().
      subscribe(response => { this.items = response; },
        () => { });
    this.isAdminUser();
  }

  showProdutos(categoria_id: string) {
    this.navCtrl.push('ProdutosPage', { categoria_id: categoria_id });
  }

  isAdminUser() {
    let localuser = this.storage.getLocalUser();
    if (localuser && localuser.email) {
      this.clienteService.findByEmail(localuser.email)
        .subscribe(response => {
          this.perfil = response['perfis'];
          if (this.perfil.indexOf("ADMIN") != -1) {
            this.isAdmin = true;
          } else {
            this.isAdmin = false;
          }
        },
          () => { });
    }
  }

}
