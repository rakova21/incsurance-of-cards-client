import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GlobalService} from "../global.service";

@Injectable({
	providedIn: 'root'
})

export class AccountService {

	constructor(
		private http: HttpClient,
		private global: GlobalService,
	) {
	}

	private get url() {
		return this.global.backendURL + '/users'
	}

	find() {
		return this.http.get(
			this.url,
			{headers: this.global.headersToken}
		)
	}

	update(user: any) {
		return this.http.put(
			this.url,
			JSON.stringify(user),
			{headers: this.global.headersJsonToken}
		)
	}

}
