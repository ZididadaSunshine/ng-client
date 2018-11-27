import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { Routing } from './app.routing';

import {
  TranslatePipe,
  CapitalizePipe,
} from './pipes';

import {
  TranslateService,
} from './services';

import {
  LoginComponent,
  HomeComponent,
  AboutComponent,
  BrandComponent,
  RegisterComponent,
  ForgotPasswordComponent
} from './pages';

// Material imports
import {
  MatButtonModule,
  MatCardModule,
  MatGridListModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatSidenavModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatInputModule,
  MatExpansionModule, MatTableModule, MatPaginatorModule, MatSortModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MAT_SNACK_BAR_DEFAULT_OPTIONS
} from '@angular/material';

import {
  AuthenticatedLayoutComponent,
  UnauthenticatedLayoutComponent
} from './layouts';

import { ChartsModule } from 'ng2-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './interceptors';
import { FlexLayoutModule } from '@angular/flex-layout';
import { KeysPipe } from './pipes/keys/keys.pipe';
import { GetPipe } from './pipes/get/get.pipe';
import { AppendPipe } from './pipes/append/append.pipe';

export function setupTranslateFactory(service: TranslateService): Function {
  return () => service.use('da');
}

@NgModule({
  declarations: [
    AppComponent,
    TranslatePipe,
    CapitalizePipe,
    HomeComponent,
    AboutComponent,
    BrandComponent,
    LoginComponent,
    AuthenticatedLayoutComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    KeysPipe,
    GetPipe,
    AppendPipe,
    UnauthenticatedLayoutComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatExpansionModule,
    Routing,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    ChartsModule
  ],

  exports: [MatProgressSpinnerModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    TranslateService,
    {
      provide: APP_INITIALIZER,
      useFactory: setupTranslateFactory,
      deps: [TranslateService],
      multi: true
    },
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {duration: 2500}
    },
    TranslatePipe,
    CapitalizePipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
