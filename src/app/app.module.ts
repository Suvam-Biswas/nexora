import { DatePipe } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { AuthModule } from "./modules/auth/auth.module";
import { LoadingWaitModule } from "./modules/loading-wait/loading-wait.module";
import { LoadingService } from "./modules/loading-wait/service/loading.service";




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatTooltipModule,
    RouterModule,
    AuthModule,
    MatToolbarModule,
    MatSelectModule,
    LoadingWaitModule,
    FormsModule,


  ],
  exports: [

  ],
  providers: [

    LoadingService,
    DatePipe

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
