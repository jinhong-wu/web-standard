import { NgModule } from '@angular/core';
import { ArrayShowPipe } from './array-show.pipe';
import { NumFilterPipe } from './num-filter.pipe';
import { NumUnitPipe } from './num-unit.pipe';

@NgModule({
  declarations: [ArrayShowPipe, NumFilterPipe, NumUnitPipe],
  exports: [ArrayShowPipe, NumFilterPipe, NumUnitPipe],
})
export class PipeModule {}
