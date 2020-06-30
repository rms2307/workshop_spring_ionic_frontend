import { CartService } from './../../services/domain/cart.service';
import { API_CONFIG } from './../../config/api.config';
import { ProdutoService } from './../../services/domain/produto.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';


@IonicPage()
@Component({
  selector: 'page-produto-detail',
  templateUrl: 'produto-detail.html',
})
export class ProdutoDetailPage {

  item: ProdutoDTO;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public produtoService: ProdutoService,
    public cartService: CartService,
    public loadingCtl: LoadingController) {
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
        })
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
}
