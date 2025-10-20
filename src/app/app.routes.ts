import {Routes} from '@angular/router';
import {ErrorComponent} from "./error/error.component";
import {StatsComponent} from "./stats/stats.component";
import {UserComponent} from "./user/user.component";
import {LoginComponent} from "./auth/login/login.component";
import {RegComponent} from "./auth/reg/reg.component";
import {MainComponent} from "./main/main.component";
import {CategoryComponent} from "./category/category.component";
import {AccountComponent} from "./account/account.component";
import {TypeComponent} from "./type/type.component";
import {TypeAddComponent} from "./type/type-add/type-add.component";
import {TypeUpdateComponent} from "./type/type-update/type-update.component";
import {InstructionComponent} from "./instruction/instruction.component";
import {InstructionAddComponent} from "./instruction/instruction-add/instruction-add.component";
import {InstructionUpdateComponent} from "./instruction/instruction-update/instruction-update.component";
import {OrderingComponent} from "./ordering/ordering.component";
import {OrderingPageComponent} from "./ordering/ordering-page/ordering-page.component";
import {OrderingAddComponent} from "./ordering/ordering-add/ordering-add.component";
import {OrderingAddUserComponent} from "./ordering/ordering-add-user/ordering-add-user.component";

export const routes: Routes = [

	{path: "", component: MainComponent},

	{path: "reg", component: RegComponent},
	{path: "login", component: LoginComponent},

	{path: "users", component: UserComponent},

	{path: "categories", component: CategoryComponent},

	{path: "account", component: AccountComponent},

	{path: "types", component: TypeComponent},
	{path: "type_add", component: TypeAddComponent},
	{path: "type_update", component: TypeUpdateComponent},

	{path: "orderings", component: OrderingComponent},
	{path: "ordering", component: OrderingPageComponent},
	{path: "ordering_add", component: OrderingAddComponent},
	{path: "ordering_add_user", component: OrderingAddUserComponent},

	{path: "instructions", component: InstructionComponent},
	{path: "instruction_add", component: InstructionAddComponent},
	{path: "instruction_update", component: InstructionUpdateComponent},

	{path: "stats", component: StatsComponent},

	{path: "error", component: ErrorComponent},
	{path: "**", component: ErrorComponent},

];
