import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Brand } from 'app/shared/models/brand';
import { Pagination } from 'app/shared/models/pagination';
import { Product } from 'app/shared/models/product';
import { ProductType } from 'app/shared/models/productType';
import { ShopParams } from 'app/shared/models/shopParams';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  baseUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) { }

  getProducts(shopParams: ShopParams) {
    let params = new HttpParams();
    if (shopParams.brandId !== 0) {
      params = params.append('brandId', shopParams.brandId);
    }
    if (shopParams.typeId !== 0) {
      params = params.append('typeId', shopParams.typeId);
    }
    if (shopParams.search) {
      params = params.append('search', shopParams.search);
    }
    params = params.append('sort', shopParams.sort);
    params = params.append('pageIndex', shopParams.pageNumber);
    params = params.append('pageSize', shopParams.pageSize);
    return this.http
      .get<Pagination>(this.baseUrl + 'products', {
        observe: 'response',
        params,
      })
      .pipe(
        map((response) => {
          return response.body;
        })
      );
  }

  getProduct(id: number) {
    return this.http.get<Product>(this.baseUrl + 'products/' + id);
  }

  getBrands() {
    return this.http.get<Brand[]>(this.baseUrl + 'products/brands');
  }

  getTypes() {
    return this.http.get<ProductType[]>(this.baseUrl + 'products/types');
  }
}
