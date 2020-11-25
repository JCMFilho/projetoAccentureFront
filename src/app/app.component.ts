import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { ModalAdicionarComponent } from './modal/modal-adicionar/modal-adicionar.component';
import { Lista } from './models/lista.model';
import { Tarefa } from './models/tarefa.model';
import { TarefaService } from './services/tarefa.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  tarefas:Tarefa[] = [];
  lista:Lista[]=[];
  constructor(private tarefaService:TarefaService,public dialog: MatDialog){}



  ngOnInit() {
   this.buscarLista();
  }

  buscarLista(){
    this.tarefaService.buscarListas().subscribe(e=>{
      this.lista = e;
    })
  }
  marcarTarefa(t:Tarefa,id:number){
    t.marcado = !t.marcado;
    this.tarefaService.salvarTarefa(t,id).subscribe(e=>{
    })
  }

  adicionarTarefa(lista){
    let dialogo = this.dialog.open(ModalAdicionarComponent, {
      width: '400px', height: 'auto', disableClose: false, data: {
        titulo:"Adicionar Tarefa",
        texto:"Digite a descrição da tarefa"
      }
    });dialogo.afterClosed().subscribe(e=>{
      if(e!= null && e!= undefined && e!= ""){
        let t:Tarefa = new Tarefa();
        t.descricao = e;
        t.marcado = false;
        this.tarefaService.salvarTarefa(t,lista.id).subscribe(resultado=>{
          this.buscarLista();

        })
      }
    })
  }

  adicionarLista(){
    let dialogo = this.dialog.open(ModalAdicionarComponent, {
      width: '400px', height: 'auto', disableClose: false, data: {
        titulo:"Adicionar Lista",
        texto:"Digite o nome da lista"
      }
    });dialogo.afterClosed().subscribe(e=>{
      if(e!= null && e!= undefined && e!= ""){
        let l:Lista = new Lista();
        l.descricao = e;
        this.tarefaService.salvarLista(l).subscribe(resultado=>{
          this.buscarLista();
        })
      }
    })
  }



  apagarTarefa(l:Tarefa){
    this.tarefaService.deletarTarefa(l.id).subscribe(e=>{
      this.buscarLista();
    })
  }
}
