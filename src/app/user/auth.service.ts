import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "./user.model";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    currentUser!: User | null | undefined;
    redirectToUrl!: string;
    users: User[] = [
        {
            id: 1,
            userName: 'swetha',
            password: 'swetha123',
            isAdmin: true

        },
        {
            id: 2,
            userName: 'nikki',
            password: 'nikki123',
            isAdmin: false

        }
    ]

    constructor(private router: Router) { }

    // This function is used to check if any user is logged in or not by checking the sessionStorage
    isLoggedIn(): boolean {
        const cu = sessionStorage.getItem("currentUser");
        if (cu != null) {
            this.currentUser = JSON.parse(cu);
        }
        return !!this.currentUser;
    }

    // This login functionality will receive username and password as parameters and check whether 
    // the details are valid or not by going thru the users list declared in this file.
    login(userName: string, password: string): void {
        this.users.forEach((u) => {
            if (userName == u.userName && password == u.password) {
                this.currentUser = u;
                sessionStorage.setItem("currentUser", JSON.stringify(this.currentUser));
            }
        });
    }

    // This logout functionality is used to do the logout operation.
    logOut(): void {
        sessionStorage.removeItem('currentUser');
        this.currentUser = null;
        this.router.navigate(['/home']);
    }

    // This is used to check whether logged in user is admin or not
    isAdmin(): boolean {
        if (this.currentUser)
            return this.currentUser.isAdmin;
        return false;
    }
}
