import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "./user.model";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    //get the current user --welcome username
    //we need to whether the user has logged in or not
    //we have to log out the user


    currentUser!: User | null | undefined;
    redirectToUrl!: string;
    users : User[] = [
        {
            id:1,
            userName:'admin',
            password:'admin123',
            isAdmin:true
            
        },
        {
            id:2,
            userName:'swetha',
            password:'swetha123',
            isAdmin:false
            
        }
    ]    

    constructor(private router:Router) { }

    isLoggedIn(): boolean {
        console.log('in isloggedin')
        const cu=sessionStorage.getItem("currentUser");
        // console.log(cu);
        if(cu!=null){
            this.currentUser=JSON.parse(cu);
        }
        console.log(this.currentUser);
        return !!this.currentUser;
    }
    
    login(userName: string, password: string): void {

        //service which connect to back end api to validate the user

        this.users.forEach((u)=>{
            if(userName==u.userName && password==u.password){
                this.currentUser = u;

                sessionStorage.setItem("currentUser", JSON.stringify(this.currentUser));
                // console.log(sessionStorage.getItem("currentUser"));
            }
        });

        // if(this.isAdmin())this.redirectToUrl='/products';
        // else this.redirectToUrl='/products';
        // console.log(this.currentUser);
       
    }

    logOut(): void {
        sessionStorage.removeItem('currentUser');
        this.currentUser = null;
        this.router.navigate(['/home']);

    }
    isAdmin(): boolean {
        if (this.currentUser)
            return this.currentUser?.isAdmin;
        return false;
    }
}
