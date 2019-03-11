import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from "rxjs/operators"

class Cliente{
  nome: string;
  email: string;
  telefone: number;
  url_avatar: string;
}

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  cliente = new Cliente()

  msgFunction(y) {
    var x = document.getElementById(y);
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }

  reloadFunction(){
    window.location.reload()
  }

  onSubmit(form: any) {
    this.cliente.nome = form.value.nome;
    this.cliente.email = form.value.email;
    this.cliente.telefone = form.value.telefone;
    this.cliente.url_avatar = form.value.url_avatar;

    if (this.cliente.nome !== ""
      && this.cliente.email !== ""
      && this.cliente.telefone !== null
      && this.cliente.url_avatar !== ""){
    
        this.http.post("http://127.0.0.1:5000/insert_record", JSON.stringify(this.cliente))
          .pipe(map(res=>res))
          .subscribe(dados => console.log(dados))
        
        this.msgFunction("snackbarok");

        window.setTimeout(this.reloadFunction, 1150);
      }
    else{
      this.msgFunction("snackbarerror");
    }
  }

  constructor(private http: HttpClient ) { }

  ngOnInit() {

  }


}
