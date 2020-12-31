import {Category} from './category.model';

export interface Product {
  id: number;
  name: string;
  detail: string;
  ingredients: string;
  description: string;
  active: boolean;
  price: number;
  image: string;
  category: Category;
  createdDate: Date;
  updateddDate: Date;
  deletedDate: Date;
}
