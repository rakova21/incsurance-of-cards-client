import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GlobalService} from "../global.service";
import {BehaviorSubject} from "rxjs";

@Injectable({
	providedIn: 'root'
})

export class CategoryService {

	categorySubject = new BehaviorSubject<any>({
		categories: [],
	})

	constructor(
		private http: HttpClient,
		private global: GlobalService,
	) {
	}

	private get url() {
		return this.global.backendURL + '/categories'
	}

	findAll() {
		this.http.get(
			this.url,
		).subscribe({
			next: (res: any) => this.categorySubject.next({
				...this.categorySubject.value,
				categories: res.data,
			}),
			error: (e: any) => this.global.alert(e),
		})
	}

	save(category: any) {
		this.http.post(
			this.url,
			JSON.stringify(category),
			{headers: this.global.headersJsonToken}
		).subscribe({
			next: (res: any) => this.categorySubject.next({
				...this.categorySubject.value,
				categories: [res.data, ...this.categorySubject.value.categories],
			}),
			error: (e: any) => this.global.alert(e),
		})
	}

	update(id: number, category: any) {
		this.http.put(
			this.url + `/${id}`,
			JSON.stringify(category),
			{headers: this.global.headersJsonToken}
		).subscribe({
			next: (res: any) => {
				let categories = this.categorySubject.value.categories;
				categories = categories.map((i: any) => i.id === id ? res.data : i);
				this.categorySubject.next({
					...this.categorySubject.value,
					categories: categories,
				})
			},
			error: (e: any) => this.global.alert(e),
		})
	}

	delete(id: number) {
		this.http.delete(
			this.url + `/${id}`,
			{headers: this.global.headersToken}
		).subscribe({
			next: () => {
				let categories = this.categorySubject.value.categories;
				categories = categories.filter((i: any) => i.id !== id);
				this.categorySubject.next({
					...this.categorySubject.value,
					categories: categories,
				})
			},
			error: (e: any) => this.global.alert(e),
		})
	}

}
