import {Component, OnInit} from '@angular/core';
import {GlobalService} from "../../global.service";
import {OrderingService} from "../ordering.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NavigateDirective} from "../../navigate.directive";
import {NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {AlertService} from "../../alert/alert.service";
import html2canvas from "html2canvas";
import {jsPDF} from "jspdf";

@Component({
	selector: 'app-ordering-page',
	imports: [
		NavigateDirective,
		NgIf,
		FormsModule
	],
	templateUrl: './ordering-page.component.html',
	standalone: true,
})

export class OrderingPageComponent implements OnInit {

	ordering: any;

	dateStart: string = '';
	dateEnd: string = '';

	constructor(
		private global: GlobalService,
		private service: OrderingService,
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private alert: AlertService,
	) {
	}

	get role() {
		return this.global.role;
	}

	ngOnInit(): void {
		if (this.role !== 'USER' && this.role !== 'SENIOR_MANAGER') this.global.page('login')

		this.activatedRoute.queryParams.subscribe(value => {
			this.service.find(value['id']).subscribe({
				next: (res: any) => this.ordering = res.data,
				error: (e: any) => {
					if (e.error.code === 404) {
						this.router.navigate(['/error'], {queryParams: {message: e.error.message}})
					} else {
						this.global.page('login')
					}
				}
			})
		})
	}

	payment() {
		this.service.payment(this.ordering.id, this.dateStart, this.dateEnd).subscribe({
			next: (res: any) => this.ordering = res.data,
			error: (e: any) => this.alert.add(e.error.message)
		});
	}

	paid() {
		this.service.paid(this.ordering.id).subscribe({
			next: (res: any) => this.ordering = res.data,
			error: (e: any) => this.alert.add(e.error.message)
		});
	}

	generatePDF() {
		let data: any = document.getElementById('generatePDF');
		html2canvas(data).then(canvas => {
			const contentDataURL = canvas.toDataURL('image/png')
			let pdf = new jsPDF(
				'p',
				'cm',
				'a4'
			);
			pdf.addImage(contentDataURL, 'PNG', 1, 1, 19, 0);
			pdf.save('pdf.pdf');
		});
	}

}
