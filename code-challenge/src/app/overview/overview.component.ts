import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

	customers: any;

	constructor(
		private customerService: CustomerService,
		private router: Router
	) { }

	ngOnInit() {
		this.customerService.getAllUsers().subscribe(res => {
			this.customers = res;
		}, err => {
			console.log(err);
		});
	}

	onCustomerClick(customer) {
		const customerId = customer.id;
		this.router.navigate([`dashboard/${customerId}`]);
	}

}
