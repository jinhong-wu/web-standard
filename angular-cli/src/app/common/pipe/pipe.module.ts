import { NgModule } from '@angular/core';
import { MemoryPipe } from './memory.pipe';
import { ArrayShowPipe } from './array-show.pipe';
import { NumFilterPipe } from './num-filter.pipe';
import { NumUnitPipe } from './num-unit.pipe';

@NgModule({
  declarations: [
		MemoryPipe,
		ArrayShowPipe,
		NumFilterPipe,
		NumUnitPipe
	],
	exports:[
		MemoryPipe,
		ArrayShowPipe,
		NumFilterPipe,
		NumUnitPipe
	]
})
export class PipeModule { }
