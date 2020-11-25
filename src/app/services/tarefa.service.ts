import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tarefa } from '../models/tarefa.model';

@Injectable({
  providedIn: 'root'
})

export class TarefaService {

  constructor(private http: HttpClient) { }

  private urlBase: string = "http://localhost:8080/api/lista";

  salvarTarefa(tarefa: Tarefa,id:number): Observable<any> {
    return this.http.post<any>(this.urlBase +'/tarefa/'+id, tarefa);
  }
  salvarLista(lista: any): Observable<any> {
    return this.http.post<any>(this.urlBase +'/lista', lista);
  }

  deletarTarefa(id:number): Observable<any> {
    return this.http.delete<any>(this.urlBase+'/'+id);
  }

  buscarListas():Observable<any>{
    return this.http.get(this.urlBase+'/lista');
  }

}
