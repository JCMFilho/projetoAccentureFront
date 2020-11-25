import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-modal-adicionar',
  templateUrl: './modal-adicionar.component.html',
  styleUrls: ['./modal-adicionar.component.css']
})
export class ModalAdicionarComponent implements OnInit {

  descricao:string="";
  constructor(public dialog: MatDialogRef<ModalAdicionarComponent>,@Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit() {
  }

  salvar(){
    if(this.descricao!=null && this.descricao != ""){
      this.dialog.close(this.descricao);
    }
  }

}
