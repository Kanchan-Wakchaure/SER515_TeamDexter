import { Component, OnInit } from '@angular/core';
import { AdmminService } from '../../Services/admin.service';

@Component({
  selector: 'app-admin-manage',
  templateUrl: './admin-manage.component.html',
  styleUrls: ['./admin-manage.component.css']
})
export class AdminManageComponent implements OnInit {

  constructor(private adminService: AdmminService) { }

  ngOnInit() {
  }

  sendEmails() {
    this.adminService.sendEmails();
  }
}
