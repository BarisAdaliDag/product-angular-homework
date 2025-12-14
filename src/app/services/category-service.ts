import { inject, Injectable } from '@angular/core';
import { CategoryModel } from '../models/category-model';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
   private http = inject(HttpClient);
  
 
  private apiUrl = 'http://localhost:5277/api/Category';

 
  async getCategories(): Promise<CategoryModel[]> {
    try {
      return await lastValueFrom(
        this.http.get<CategoryModel[]>(this.apiUrl)
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  
  async addCategory(category: CategoryModel): Promise<string> {
    try {
      return await lastValueFrom(
        this.http.post(this.apiUrl, category, { responseType: 'text' })
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
