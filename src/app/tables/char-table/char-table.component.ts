import { Component, ViewChild, Output, EventEmitter } from "@angular/core";
import { People } from "angular2-swapi";
import {
  MatPaginator,
  MatTable,
  MatSort,
  MatTableDataSource
} from "@angular/material";

@Component({
  selector: "app-char-table",
  templateUrl: "./char-table.component.html",
  styleUrls: [
    "./../../../assets/scss/table.scss",
    "./char-table.component.scss"
  ]
})
export class CharTableComponent {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatTable, { static: false }) table: MatTable<People>;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  @Output() public charSelected = new EventEmitter();
  public dataSource: MatTableDataSource<People>;
  public displayedColumns = [
    "name",
    "height",
    "mass",
    "hair_color",
    "skin_color",
    "homeworld"
  ];

  public setDataSource(people: People[]): void {
    this.dataSource = new MatTableDataSource(people);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  public selected(char: People): void {
    this.charSelected.emit(char);
  }
}
