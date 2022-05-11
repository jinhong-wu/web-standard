import { NgModule } from '@angular/core';
import { ArrayShowPipe } from './array-show.pipe';
import { NumFilterPipe } from './num-filter.pipe';
import { NumUnitPipe } from './num-unit.pipe';
import { RenderPipe } from './render.pipe';

@NgModule({
  declarations: [ArrayShowPipe, NumFilterPipe, NumUnitPipe, RenderPipe],
  exports: [ArrayShowPipe, NumFilterPipe, NumUnitPipe, RenderPipe],
})
export class PipeModule {}
