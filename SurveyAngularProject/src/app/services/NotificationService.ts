import {EventEmitter, Injectable, Output} from "@angular/core";

@Injectable()
export class NotificationService {
  @Output() getLoggedInSuccess: EventEmitter<any> = new EventEmitter();

  public loginOrLogoutSuccess(): any {
      this.getLoggedInSuccess.emit('Login Success');
  }

  // logout(): void {
  //   this.getLoggedInName.emit('Sign In');
  // }
}
