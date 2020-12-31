import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Product} from '../../../../../../../@core/model/product.model';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {
  @ViewChild('form') form?: NgForm;
  fg: FormGroup;
  isLoading = false;
  product?: Product;

  constructor(activatedRoute: ActivatedRoute,
              formBuilder: FormBuilder) {
    this.product = activatedRoute.snapshot.data.product;
    this.fg = formBuilder.group({
      id: [this.product?.id || null],
      name: [this.product?.name || null],
      detail: [this.product?.detail || null],
      ingredients: [this.product?.ingredients || null],
      description: [this.product?.description || null],
      active: [this.product?.active || false],
      price: [this.product?.price || null, [Validators.min(0)]],
      image: [this.product?.image || null],
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.fg.invalid) {
      return;
    }

    this.form?.resetForm();
  }

  onCancel(): void {
    this.form?.resetForm();
  }
}
