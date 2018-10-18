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
  MatExpansionModule,
} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';

export function setupTranslateFactory(service: TranslateService): Function {
  return () => service.use('da');
}

@NgModule({
  declarations: [
    AppComponent,
    TranslatePipe,
    CapitalizePipe,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LayoutModule,
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
  ],
  providers: [

    TranslateService,
    {
      provide: APP_INITIALIZER,
      useFactory: setupTranslateFactory,
      deps: [TranslateService],
      multi: true
    },
    TranslatePipe,
    CapitalizePipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
