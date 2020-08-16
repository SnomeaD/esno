import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MessagesComponent } from './messages/messages.component';

import { PLATFORM_ID, APP_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ToonDetailComponent } from './toon-detail/toon-detail.component';
import { ClassNamePipe } from './class-name.pipe';

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'toons-viewer' }),
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    MessagesComponent,
    ToonDetailComponent,
    ClassNamePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(APP_ID) private appId: string
  ) {
    const platform = isPlatformBrowser(platformId)
      ? 'in the browser'
      : 'on the server';
    console.log(`Running ${platform} with appId=${appId}`);
  }
}
