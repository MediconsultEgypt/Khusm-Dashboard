import { Component, OnInit } from '@angular/core';
import { CreateBulkUsersService } from './create-user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUsersComponent implements OnInit {

  public file;

  isSubmitted: boolean = false;

  ar_title: string;
  public fileName = '';
  selectedUser: any;
  Users: string[] = ['User', 'Provider'];

  public cat_list: any;

  createUsersForm = new FormGroup({
    file: new FormControl(null , [Validators.required]),
    sheetName: new FormControl(null, []),
  });

  constructor( private _CreateBulkUsersService: CreateBulkUsersService, private messageService: MessageService) { }

  onFileSelected(event) {
    var file:File = event.target.files[0];
    this.file = file;
    if (file) {
        this.fileName = file.name;
    }
    this.createUsersForm.get('file').setValue(file);
  }
  onUserSelected(event) {
    this.selectedUser = event;
    console.log(this.selectedUser)
  }
  
  createUser(){
    this.isSubmitted = true;
    var formData = new FormData();
    formData.append("file", this.file);
    formData.append("sheet_name", "Sheet1");
    this._CreateBulkUsersService.createProviderUsers(formData).then( (res) => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: res.Ok });        
    },
    error => {
      console.log(error);
    })
    // if (this.selectedUser === 'User') {
    //   this._CreateBulkUsersService.createBulkUser(formData).then( (res) => {
    //     this.messageService.add({ severity: 'success', summary: 'Success', detail: res.Ok });        
    //   },
    //   error => {
    //     console.log(error);
    //   }
    //   )
    // }
    // if(this.selectedUser === 'Provider'){
    //   this._CreateBulkUsersService.createProviderUsers(formData).then( (res) => {
    //     this.messageService.add({ severity: 'success', summary: 'Success', detail: res.Ok });        
    //   },
    //   error => {
    //     console.log(error);
    //   }
    //   )

    // }
  }

  ngOnInit(): void {
  }

}
