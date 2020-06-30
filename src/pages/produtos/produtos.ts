import { API_CONFIG } from './../../config/api.config';
import { ProdutoService } from './../../services/domain/produto.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';


@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  items: ProdutoDTO[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public produtoService: ProdutoService,
    public loadingCtl: LoadingController) {
  }

  ionViewDidLoad() {
    let categoria_id = this.navParams.get('categoria_id');
    let loading = this.presentLoading();
    this.produtoService.findByCategoria(categoria_id)
      .subscribe(response => {
        this.items = response['content'];
        loading.dismiss()
        this.getImgIfExists();
      },
        error => {
          loading.dismiss()
        });
  }

  getImgIfExists() {
    for (var i = 0; i < this.items.length; i++) {
      let item = this.items[i];
      this.produtoService.getSmallImgFromBucket(item.id)
        .subscribe(response => {
          item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`;
        },
          error => { });
    }
  }

  showDetail(produto_id: string) {
    this.navCtrl.push('ProdutoDetailPage', { produto_id: produto_id });
  }

  presentLoading() {
    let loading = this.loadingCtl.create({
      content: 'Aguarde...',
    });
    loading.present();
    return loading;
  }
}
