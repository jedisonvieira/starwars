import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule, HttpClientJsonpModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { Angular2SwapiModule } from "angular2-swapi";
import { AppComponent } from "./app.component";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import {
  MatSelectModule,
  MatInputModule,
  MatIconModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatListModule
} from "@angular/material";
import { CharTableComponent } from "./tables/char-table/char-table.component";

@NgModule({
  declarations: [AppComponent, CharTableComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSelectModule,
    HttpClientModule,
    HttpClientJsonpModule,
    Angular2SwapiModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
