import { Injectable } from "@angular/core";
import { Router } from "@angular/router";


    @Injectable()
    export class LoginService{


        constructor(private router:Router){}

        token:string | undefined;

        login(email:string, pasword:string){




        }


    }