import { CategoriaDTO } from './../../models/categoria.dto';
import { ProdutoService } from './../../services/domain/produto.service';
import { CategoriaService } from './../../services/domain/categoria.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-novo-editar-produto',
  templateUrl: 'novo-editar-produto.html',
})
export class NovoEditarProdutoPage {

  formGroup: FormGroup;
  categorias: CategoriaDTO[];
  produto_id: string;
  cat_id: string[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public categoriaService: CategoriaService,
    public produtoService: ProdutoService,
    public alertCtrl: AlertController) {
    this.formGroup = this.formBuilder.group(
      {
        nome: [this.navParams.get('nome')],
        preco: [this.navParams.get('preco')],
        categoria_id: [this.loadCatOfProd()]
      }
    );
  }

  ionViewDidLoad() {
    this.produto_id = this.navParams.get('produto_id');
    this.loadCategorias();
  }

  loadCategorias() {
    this.categoriaService.findAll()
      .subscribe(response => {
        this.categorias = response;
      },
        error => { });
  }

  insertNewProduto() {
    let obj = {
      nome: this.formGroup.value.nome,
      preco: this.formGroup.value.preco,
      categoria_id: this.formGroup.value.categoria_id
    };
    this.produtoService.insert(obj)
      .subscribe(response => {
        this.showAlertOk();
      },
        error => { });
  }

  update() {
    let obj = {
      nome: this.formGroup.value.nome,
      preco: this.formGroup.value.preco,
      categoria_id: this.formGroup.value.categoria_id
    };
    this.produtoService.update(obj, this.navParams.get('produto_id'))
      .subscribe(response => {
        this.showAlertOk();
      },
        error => { });
  }

  loadCatOfProd(): string[] {
    let categorias: CategoriaDTO[] = this.navParams.get('categorias');
    if (this.navParams.get('produto_id')) {
      for (var i = 0; i < categorias.length; i++) {
        this.cat_id.push(categorias[i].id);
      }
      return this.cat_id;
    }
    return null;
  }

  showAlertOk() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Produto salvo!',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }

}
