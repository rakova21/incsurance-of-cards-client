import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {GlobalService} from "../global.service";
import {AlertService} from "../alert/alert.service";

@Injectable({
	providedIn: 'root'
})

export class TypeService {

	typeSubject = new BehaviorSubject<any>({
		types: [],
	})

	constructor(
		private http: HttpClient,
		private global: GlobalService,
		private alert: AlertService,
	) {
	}

	private get url() {
		return this.global.backendURL + '/types'
	}

	findAll() {
		this.http.get(
			this.url,
		).subscribe({
			next: (res: any) => this.typeSubject.next({
				...this.typeSubject.value,
				types: res.data,
			}),
			error: (e: any) => this.global.alert(e),
		})
	}

	find(id: number) {
		return this.http.get(
			this.url + `/${id}`,
			{headers: this.global.headersToken}
		)
	}

	save(type: any, categoryId: number) {
		this.http.post(
			this.url,
			JSON.stringify(type),
			{
				headers: this.global.headersJsonToken,
				params: new HttpParams().appendAll({
					categoryId: categoryId,
				})
			}
		).subscribe({
			next: () => this.global.page('types'),
			error: (e: any) => this.alert.add(e.error.message)
		})
	}

	update(id: number, type: any, categoryId: number) {
		this.http.put(
			this.url + `/${id}`,
			JSON.stringify(type),
			{
				headers: this.global.headersJsonToken,
				params: new HttpParams().appendAll({
					categoryId: categoryId,
				})
			}
		).subscribe({
			next: () => this.global.page('types'),
			error: (e: any) => this.alert.add(e.error.message)
		})
	}

	delete(id: number) {
		this.http.delete(
			this.url + `/${id}`,
			{headers: this.global.headersToken}
		).subscribe({
			next: () => {
				let types = this.typeSubject.value.types;
				types = types.filter((i: any) => i.id !== id);
				this.typeSubject.next({
					...this.typeSubject.value,
					types: types,
				})
			},
			error: (e: any) => this.global.alert(e),
		})
	}

}
