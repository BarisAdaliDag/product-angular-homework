import { Component, inject, signal } from '@angular/core';
import { CategoryService } from '../../services/category-service';
import { CategoryModel } from '../../models/category-model';

@Component({
  selector: 'app-category-component',
  imports: [],
  templateUrl: './category-component.html',
  styleUrl: './category-component.css',
})
export class CategoryComponent {
 private categoryService = inject(CategoryService);
   protected readonly title = signal('Kategori Yönetimi');
  protected categories = signal<CategoryModel[]>([]);
  protected newCategoryName = signal<string>('');
  protected newCategoryDescription = signal<string>('');
  

  async ngOnInit(): Promise<void> {
   this.categories.set(await this.getCategories());
  
  }
  async getCategories(): Promise<CategoryModel[]> {
    try {
      return await this.categoryService.getCategories();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
 onNewCategoryNameChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.newCategoryName.set(value);
  }

  onNewCategoryDescriptionChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.newCategoryDescription.set(value);
  }

    async addCategory(event: Event) {
    event.preventDefault();  // Sayfanın yenilenmesini engelle

    const body: CategoryModel = {
      categoryName: this.newCategoryName(),
      description: this.newCategoryDescription()
    };

    try {
      const message = await this.categoryService.addCategory(body);
      console.log("API mesajı: ", message);

     
      this.categories.set(await this.getCategories());

     
      this.newCategoryName.set('');
      this.newCategoryDescription.set('');
    } catch (error) {
      console.log(error);
    }
  }

}
