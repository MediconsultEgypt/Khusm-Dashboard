import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { packages } from '../../new-admin-panel/package/package.model';
import {PackageService} from '../../new-admin-panel/package/package.service';
import { CreateBrokerUsersService } from './create-broker.service';
import { ICreateBrokerData, CreateBrokerData } from './create-broker.model';

@Component({
  selector: 'app-create-broker',
  templateUrl: './create-broker.component.html',
  styleUrls: ['./create-broker.component.css']
})
export class CreateBrokerComponent implements OnInit {

  selectedPackage: any;
  packages: packages[];
  title: string;
  id: number;

  isSubmitted: boolean = false;

  createBrokerForm = new FormGroup({
    number_users: new FormControl(null, [Validators.required]),
    package_id: new FormControl(null, [Validators.required]),
    broker: new FormControl(null, [Validators.required]),
  });

  constructor( private _CreateBrokerUsersService: CreateBrokerUsersService, private messageService: MessageService, private _PackageService: PackageService) { }

  onSelected(event) {
    this.selectedPackage = event;
    this.createBrokerForm.get('package_id').setValue(this.selectedPackage);

  }
  
  createBroker(){
    this.isSubmitted = true;
    let brokerData: ICreateBrokerData = new CreateBrokerData() ;
    brokerData.number_users = this.createBrokerForm.value.number_users;
    brokerData.package_id = this.selectedPackage;
    brokerData.broker = this.createBrokerForm.value.broker;
    console.log(brokerData)
    this._CreateBrokerUsersService.createBrokerUsers(brokerData).then((res) => {
        this.messageService.add({ severity: 'success', detail: 'Success' });
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
