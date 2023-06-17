import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../models/category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categoryArray: Array<any> = [];
  formCategory!: string;
  formStatus: string = 'Add'
  categoryId!: string

  constructor(private cs: CategoriesService){}

  ngOnInit(): void {
    this.cs.loadData().subscribe(val => {
      console.log(val);
      this.categoryArray = val;
    })
  }

  onSubmit(formData: any){
    let categoryData: Category = {
      category: formData.value.category
    }
    if(this.formStatus == 'Add'){
      this.cs.saveData(categoryData);
    }
    else if(this.formStatus == 'Edit'){
      this.cs.updateData(this.categoryId, categoryData )
      this.formStatus = 'Add'
    }
    formData.reset();
  }

  onEdit(id: any, category: any){
    this.categoryId = id;
    this.formCategory = category;
    this.formStatus = 'Edit'
  }

  onDelete(id: any){
    if(confirm("Are you sure to delete this category")) {
      this.cs.deleteData(id);
    }
  }
   
}
