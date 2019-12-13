import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

	id: any;
	customer: any;

	constructor(
		private customerService: CustomerService,
		private router: Router,
		private activatedRoute: ActivatedRoute
	) {}

	ngOnInit() {
		this.activatedRoute.params.subscribe(paramsId => {
			this.id = paramsId.id;
		});
		this.customerService.getCustomerById(this.id).subscribe(res => {
			this.customer = res[0];
		}, err => {
			console.log(err);
			this.router.navigate(['']);
		});
	}

	onClick() {
		const customerId = this.customer.id;
		this.router.navigate([`dashboard/${customerId}`]);
	}
}
