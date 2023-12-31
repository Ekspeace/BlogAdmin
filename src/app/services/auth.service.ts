import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  isLoggedInGuard: boolean = false;

  constructor(private afAuth: AngularFireAuth, private toast: ToastrService, private router: Router) { }

  login(email: string, password: string){
    this.afAuth.signInWithEmailAndPassword(email, password).then(() =>{
      this.toast.success("Logged in successfully");
      this.loggedIn.next(true);
      this.isLoggedInGuard = true;
      this.loadUser();
      this.router.navigate(['/']);
    }).catch(e =>{
      this.toast.error(e);
    })
  }


  loadUser(){
    this.afAuth.authState.subscribe(user => {
      localStorage.setItem("user", JSON.stringify(user));
    })
  }

  logOut(){
    this.afAuth.signOut().then(() => {
      this.toast.success("Logged out successfully");
      this.loggedIn.next(false);
      this.isLoggedInGuard = false;
      localStorage.removeItem("user");
      this.router.navigate(['/login']);
    })
    
  }

  isLoggedIn() {
    return this.loggedIn.asObservable();
  }
}
