import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {

  public clientes: any[];

  constructor(private http: HttpClient ) { }

  ngOnInit(): void {
    this.http.get('http://127.0.0.1:5000/get_records')
      .subscribe((dados:any[]) => {
        this.clientes = dados;
        console.log("Clientes:", this.clientes);
      });
  }

}
