import { CartService } from './../../services/domain/cart.service';
import { API_CONFIG } from './../../config/api.config';
import { ProdutoService } from './../../services/domain/produto.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { StorageService } from '../../services/storage.service';
import { ClienteService } from '../../services/domain/cliente.service';
import { CategoriaDTO } from '../../models/categoria.dto';


@IonicPage()
@Component({
  selector: 'page-produto-detail',
  templateUrl: 'produto-detail.html',
})
export class ProdutoDetailPage {

  item: ProdutoDTO;
  isAdmin: boolean = false;
  perfil: string[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public produtoService: ProdutoService,
    public cartService: CartService,
    public loadingCtl: LoadingController,
    public storage: StorageService,
    public clienteService: ClienteService,
    public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    let produto_id = this.navParams.get('produto_id');
    let loading = this.presentLoading();
    this.produtoService.findById(produto_id)
      .subscribe(response => {
        this.item = response;
        loading.dismiss()
        this.getImgIfExists();
      },
        error => {
          loading.dismiss()
        });
    this.isAdminUser();
  }

  getImgIfExists() {
    this.produtoService.getImgFromBucket(this.item.id)
      .subscribe(response => {
        this.item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${this.item.id}.jpg`;
      },
        error => { });
  }

  addToCart(protudo: ProdutoDTO) {
    this.cartService.addProduto(protudo);
    this.navCtrl.setRoot('CartPage');
  }

  presentLoading() {
    let loading = this.loadingCtl.create({
      content: 'Aguarde...',
    });
    loading.present();
    return loading;
  }

  delete(id: string) {
    this.produtoService.delete(id)
      .subscribe(response => {
      },
        error => { });
  }

  showDelete(id: string) {
    let alert = this.alertCtrl.create({
      title: 'Confirmação!',
      message: 'Remover produto?',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'SIM',
          handler: () => {
            this.delete(id);
            this.navCtrl.setRoot('CategoriasPage');
          }
        },
        {
          text: 'NÃO'
        }
      ]
    });
    alert.present();
  }

  goEdit(produto_id: string, nome: string, preco: string, categorias: CategoriaDTO[]) {
    this.navCtrl.push('NovoEditarProdutoPage', { produto_id: produto_id, nome: nome, preco: preco, categorias: categorias })
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
          error => { });
    }
  }
}
