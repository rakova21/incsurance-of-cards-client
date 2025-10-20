import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {GlobalService} from "../global.service";

@Injectable({
	providedIn: 'root'
})

export class OrderingService {

	orderingSubject = new BehaviorSubject<any>({
		orderings: [],
	})

	constructor(
		private http: HttpClient,
		private global: GlobalService,
	) {
	}

	private get url() {
		return this.global.backendURL + '/orderings'
	}

	findAll() {
		this.http.get(
			this.url,
			{headers: this.global.headersToken}
		).subscribe({
			next: (res: any) => this.orderingSubject.next({
				...this.orderingSubject.value,
				orderings: res.data,
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

	save(ordering: any, cardCategory: string) {
		return this.http.post(
			this.url,
			JSON.stringify(ordering),
			{
				headers: this.global.headersJsonToken,
				params: new HttpParams().appendAll({
					cardCategory: cardCategory,
				})
			}
		)
	}

	saveUser(ordering: any, cardCategory: string, userId: number) {
		return this.http.post(
			this.url + '/user',
			JSON.stringify(ordering),
			{
				headers: this.global.headersJsonToken,
				params: new HttpParams().appendAll({
					cardCategory: cardCategory,
					userId: userId,
				})
			}
		)
	}

	payment(id: number, dateStart: string, dateEnd: string) {
		return this.http.patch(
			this.url + `/${id}/payment`,
			"",
			{
				headers: this.global.headersToken,
				params: new HttpParams().appendAll({
					dateStart: dateStart,
					dateEnd: dateEnd,
				})
			}
		)
	}

	paid(id: number) {
		return this.http.patch(
			this.url + `/${id}/paid`,
			"",
			{headers: this.global.headersToken}
		)
	}

}
