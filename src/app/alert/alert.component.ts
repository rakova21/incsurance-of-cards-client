import {Component, OnInit} from '@angular/core';
import {DatePipe, NgClass, NgForOf} from "@angular/common";
import {Alert, AlertService, AlertType} from "./alert.service";

@Component({
	selector: 'app-alert',
	standalone: true,
	imports: [
		NgClass,
		NgForOf,
		DatePipe
	],
	templateUrl: './alert.component.html',
})

export class AlertComponent implements OnInit {
	alerts: Alert[] = [];

	constructor(private alert: AlertService) {
	}

	ngOnInit(): void {
		this.alert.getAlerts().subscribe((alerts) => {
			this.alerts = alerts;
		});
	}

	getAlertClass(type: AlertType): string {
		return `bg-${type}`;
	}

	remove(id: number): void {
		this.alert.remove(id);
	}
}
