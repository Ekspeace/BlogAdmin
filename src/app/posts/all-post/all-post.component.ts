import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CategoriesService } from 'src/app/services/categories.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-all-post',
  templateUrl: './all-post.component.html',
  styleUrls: ['./all-post.component.css']
})
export class AllPostComponent implements OnInit {

  postArray!: Array<any>;
  category: any;
  catString!: string;

constructor(private postService: PostsService, private afs:  AngularFirestore, private cs: CategoriesService){}

  ngOnInit(): void {
    this.postService.loadData().subscribe(val => {
      this.postArray = val;
    });
    //this.getCategory('9ZEk0QrH04CJJzrDP9FS')
  }
  
  
    onDelete(id: any, postImgPath: any) {
      this.postService.deleteImage(postImgPath, id);
    }

    onFeatured(id: any, value: any){
      const featuredData = {
        isFeatured: value
      }
      this.postService.featurePost(id, featuredData);
    }

   /*  getCategory(id: any){
      this.cs.loadOneData(id).subscribe(cat => {
        this.category = cat;
        console.log(this.category.category);
       });
       console.log(this.catString);
    } */
    
}
