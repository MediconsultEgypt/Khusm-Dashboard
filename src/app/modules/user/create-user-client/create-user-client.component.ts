import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateBulkUsersService } from '../user-create/create-user.service';
import { CreateClientData, ICreateClientData } from '../users.model';
import { MessageService } from 'primeng/api';
import { packages } from '../../new-admin-panel/package/package.model';
// import { PackageService } from '../../new-admin-panel/package/package.service';
import {PackageService} from '../../new-admin-panel/package/package.service';
@Component({
  selector: 'app-create-user-client',
  templateUrl: './create-user-client.component.html',
  styleUrls: ['./create-user-client.component.css']
})
export class CreateClientUsersComponent implements OnInit {

  public file;

  ar_title: string;
  public fileName = '';
  selectedPackage: any;
  packages: packages[];
  title: string;
  id: number;

  isSubmitted: boolean = false;

  public cat_list: any;

  createClientForm = new FormGroup({
    client_name: new FormControl(null, [Validators.required]),
    file: new FormControl(null , [Validators.required]),
    package_id: new FormControl(null, [Validators.required]),
    sheet_name: new FormControl(null, []),
  });

  constructor( private _CreateBulkUsersService: CreateBulkUsersService, private messageService: MessageService, private _PackageService: PackageService) { }

  onFileSelected(event) {
    var file:File = event.target.files[0];
    this.file = file;
    if (file) {
        this.fileName = file.name;
    }
    this.createClientForm.get('file').setValue(file);
  }
  onSelected(event) {
    this.selectedPackage = event;
    this.createClientForm.get('package_id').setValue(this.selectedPackage);

  }
  
  createClient(){
    this.isSubmitted = true;
    var formData = new FormData();
    formData.append("client_name", this.createClientForm.value.client_name);
    formData.append("file", this.file);
    formData.append("package_id", this.selectedPackage);
    formData.append("sheet_name", "Sheet1");
    this._CreateBulkUsersService.createClientUser(formData).then((res) => {
        this.messageService.add({ severity: 'success', detail: res.Ok });
    }, err=>{
        this.messageService.add({ severity: 'error', detail: err });
    })
  }
  ngOnInit(): void {
    // get packages
    this.getPackage(1);
  }

  // get packages
  getPackage(page: number) {
    this._PackageService.get_all(page).subscribe((res) => {
      this.packages = res.results.map(item => ({ title: item.title, id: item.id }));
    });
  }

}
