import { ClienteService } from './../../services/domain/cliente.service';
import { API_CONFIG } from './../../config/api.config';
import { ProdutoService } from './../../services/domain/produto.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { StorageService } from '../../services/storage.service';


@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  items: ProdutoDTO[] = [];
  page: number = 0;
  isAdmin: boolean = false;
  perfil: string[];
  cat_id: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public produtoService: ProdutoService,
    public loadingCtl: LoadingController,
    public storage: StorageService,
    public clienteService: ClienteService) {
  }

  ionViewDidLoad() {
    this.loadData();
    this.isAdminUser();
    this.cat_id = this.navParams.get('categoria_id');
  }

  loadData() {
    let categoria_id = this.navParams.get('categoria_id');
    let loading = this.presentLoading();
    this.produtoService.findByCategoria(categoria_id, this.page, 10)
      .subscribe(response => {
        let start = this.items.length;
        this.items = this.items.concat(response['content']);
        let end = this.items.length - 1;
        loading.dismiss();
        this.getImgIfExists(start, end);
      },
        error => {
          loading.dismiss();
        });
  }

  getImgIfExists(start: number, end: number) {
    for (var i = start; i <= end; i++) {
      let item = this.items[i];
      this.produtoService.getImgFromBucket(item.id)
        .subscribe(response => {
          item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}.jpg`;
        },
          error => { });
    }
  }

  showDetail(produto_id: string, cat_id: string) {
    this.navCtrl.push('ProdutoDetailPage', { produto_id: produto_id, cat_id: cat_id });
  }

  presentLoading() {
    let loading = this.loadingCtl.create({
      content: 'Aguarde...',
    });
    loading.present();
    return loading;
  }

  doRefresh(refresher) {
    this.page = 0;
    this.items = []
    this.loadData();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

  doInfinite(infiniteScroll) {
    this.page++;
    this.loadData();
    setTimeout(() => {
      infiniteScroll.complete();
    }, 1000);
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
