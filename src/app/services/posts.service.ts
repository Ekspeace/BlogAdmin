import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private storage: AngularFireStorage, private afs: AngularFirestore, private ts: ToastrService, private router: Router) { }

  savePost(selectedImage: any, postData: any, formStatus: any, id: any){
    const filepath = `postimage/${Date.now()}`;
    this.storage.upload(filepath, selectedImage).then(() =>{
      this.storage.ref(filepath).getDownloadURL().subscribe(URL => {
        postData.postImgPath = URL;

        if(formStatus == 'Edit'){
          this.updateData(id,postData);
        }
        else
        {
          this.afs.collection('posts').add(postData).then(docRef =>{
            this.ts.success("Post added successfully!")
            this.router.navigate(['/posts']);
          }).catch(err => {
            this.ts.error("Post not added, if the issue pesist call administrator")
          });
        }
      })

    })
  }

  loadData(){
    return this.afs.collection("posts").snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, data}
        })
      })
    )
  }
  loadOneData(id: any){
    return this.afs.collection('posts').doc(id).valueChanges();
  }

  updateData(id: any, data: any){
    this.afs.collection('posts').doc(id).update(data).then(() => {
      this.ts.success("Post updated successfully!");
      this.router.navigate(['/posts']);
    }).catch(err => {
      this.ts.error("Post not update, if the issue pesist call administrator");
    });
  }

  deleteImage(postImgPath: any, id: any){
    this.storage.storage.refFromURL(postImgPath).delete().then(() => {
      this.deleteData(id);
    })
  }

  deleteData(id: any){
    this.afs.collection('posts').doc(id).delete().then(() => {
      this.ts.warning("Post deleted successfully!");
    }).catch(err => {
      this.ts.error("Post not deleted, if the issue pesist call administrator");
    });
  }
  featurePost(id: any, data: any){
    this.afs.collection('posts').doc(id).update(data).then(() => {
      this.ts.info("Featured Status updated successfully!");
    }).catch(err => {
      this.ts.error("Featured Status not update, if the issue pesist call administrator");
    });
  }
}
