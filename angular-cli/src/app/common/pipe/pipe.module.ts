import { NgModule } from '@angular/core';
import { MemoryPipe } from './memory.pipe';

@NgModule({
  declarations: [
		MemoryPipe
	],
	exports:[
		MemoryPipe,
	]
})
export class PipeModule { }
