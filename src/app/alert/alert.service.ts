import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

export type AlertType = 'success' | 'error' | 'warning' | 'info' | 'danger';

export interface Alert {
	id: number;
	message: string;
	type: AlertType;
	duration?: number;
}

@Injectable({
	providedIn: 'root'
})

export class AlertService {

	private alerts: Alert[] = [];
	private alerts$ = new BehaviorSubject<Alert[]>([]);

	add(message: string, type: AlertType = 'warning', duration: number = 5000): void {
		const newAlert: Alert = {
			id: Date.now(),
			message,
			type,
			duration,
		};

		this.alerts.push(newAlert);
		this.alerts$.next([...this.alerts]);

		if (duration > 0) {
			setTimeout(() => this.remove(newAlert.id), duration);
		}
	}

	remove(id: number): void {
		this.alerts = this.alerts.filter((t: any) => t.id !== id);
		this.alerts$.next([...this.alerts]);
	}

	getAlerts(): Observable<Alert[]> {
		return this.alerts$.asObservable();
	}

}
