import { Inject,Injectable } from '@angular/core';
import { BROWSER_STORAGE } from '../storage';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { TripService } from './trip-data';
import { firstValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class Authentication {

  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private tripDataService: TripService){}
    authResp: AuthResponse = new AuthResponse();

    public getToken(): string {
      let out: any;
      out = this.storage.getItem('travlr-token');
      if(!out){
        return '';
      }
      return out;
    }

    public saveToken(token:string): void{
      console.log('Saving toke', token);
      this.storage.setItem('travlr-token', token);
    }

    public logout(): void{
      this.storage.removeItem('travlr-token');
    }

    public isLoggedIn(): boolean{
      const token: string = this.getToken();
      if(token){
        const payload = JSON.parse(atob(token.split('.')[1]));
        //console.log(payload.exp);
        return payload.exp > (Date.now()/1000);
      }
      else{
        this.storage.removeItem('travlr-token');
        return false;
      }
    }

    public getCurrentUser(): User {
      const token: string = this.getToken();
      const {email, name} = JSON.parse(atob(token.split('.')[1]));
      return {email, name} as User;
    }
    // LOGIN--> changed from subription to firstval from to ensure saving of token
    // Using subscription the token never saved, resulting in a null object and never actually being logged in
    public login(user: User, passwd: string): Promise<any> {
    return firstValueFrom(this.tripDataService.login(user, passwd)).then((value: any) => {
    if (value) {
        const token = value.token || value.message?.split(':: ')[1]?.trim();
        if (token) {
          this.saveToken(token);
        }
      }
  });
}

         //REGISTER
    public register(user: User, passwd: string) : void{
      this.tripDataService.register(user,passwd).subscribe({
        next: (value: any)=>{
          if(value){
            console.log(value);
            this.authResp = value;
            this.saveToken(this.authResp.token);
          }
        },
        error: (error: any) =>{
          console.log('Error: ' + error);
        }
      })
    }
  }


