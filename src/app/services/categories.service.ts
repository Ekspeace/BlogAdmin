import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private afs: AngularFirestore, private ts: ToastrService) { }

  saveData(categoryData: any){
    this.afs.collection("categories").add(categoryData).then(docRef => {
      this.ts.success("Category added successfully!")
    }).catch(err => {
      this.ts.error("Category not added, if the issue pesist call administrator")
    });
  }
  loadData(){
    return this.afs.collection("categories").snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, data}
        })
      })
    )
  }
  updateData(id: any, data: any){
    this.afs.collection("categories").doc(id).update(data).then(docRef => {
      this.ts.success("Category updated successfully!")
    }).catch(err => {
      this.ts.error("Category not updated, if the issue persist call administrator")
    });
  }

  deleteData(id: any){
    this.afs.collection("categories").doc(id).delete().then(docRef =>{
      this.ts.success("Category deleted successfully!")
    }).catch(err => {
      this.ts.error("Category not deleted, if the issue persist call administrator")
    });
  }

 /*  loadOneData(id: any){
    return this.afs.collection('categories').doc(id).valueChanges();
  } */
}
