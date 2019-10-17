import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthService} from './services/common/auth.service';
import {AuthCallbackComponent} from './components/auth-callback/auth-callback.component';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    AuthService
  ],
  exports: [
    AuthCallbackComponent,
  ],
  declarations: [AuthCallbackComponent],
})
export class CoreModule { }
