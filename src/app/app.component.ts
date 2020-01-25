import { CharTableComponent } from "./tables/char-table/char-table.component";
import { Angular2SwapiService, People, Film } from "angular2-swapi";
import { Component, OnInit, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  @ViewChild(CharTableComponent, { static: false })
  charTableReference: CharTableComponent;

  public people: People[];
  public char: People = {};
  public selectedGender: string;

  constructor(
    public swapiService: Angular2SwapiService,
    public http: HttpClient
  ) {}

  public ngOnInit(): void {
    this.defaultSearch();
  }

  public searchByName(search: string = ""): void {
    this.swapiService.searchPeople(search).subscribe((people: People[]) => {
      this.people = people;
      this.charTableReference.setDataSource(this.people);
    });
  }

  //feito desta forma devido à api não disponibilizar uma consulta por gender.
  public selectGender(gender: string): void {
    let filteredPeople: People[] = [];

    if (gender !== "none") {
      filteredPeople = this.people.filter(char => {
        return char.gender === gender;
      });

      this.charTableReference.setDataSource(filteredPeople);

      this.selectedGender = "none";
    } else {
      this.charTableReference.setDataSource(this.people);
    }
  }

  public defaultSearch(): void {
    this.swapiService.getPeople(1).subscribe((people: []) => {
      this.people = people;
      this.charTableReference.setDataSource(this.people);
    });
  }

  public charSelected(char: People): void {
    this.char.films = [];
    this.char.name = char.name;
    this.char.gender = char.gender;
    this.char.eye_color = char.eye_color;
    this.char.birth_year = char.birth_year;

    char.films.forEach(film => {
      // Fiz desta forma para utlizar apenas methods de search da lib.
      //Deixar apenas o codigo do filme para utilizar o method de getFilm(id)
      let filmId = this.replaceUrlChars(film);

      this.swapiService.getFilm(Number(filmId)).subscribe((film: Film) => {
        this.char.films.push(`${film.title} | Date ${film.release_date}`);
      });
    });
  }

  public replaceUrlChars(url: string): string {
    return url.replace(/^\D+/g, "").replace("/", "");
  }
}
