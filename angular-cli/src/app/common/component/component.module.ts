import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableHeadComponent } from './table-head/table-head.component';
import { SharedModule } from '../shared.module';
import { ImportFileComponent } from './import-file/import-file.component';
import { SelectModalComponent } from './select-modal/select-modal.component';

@NgModule({
  declarations: [TableHeadComponent, ImportFileComponent, SelectModalComponent],
  imports: [CommonModule, SharedModule],
  exports: [TableHeadComponent, ImportFileComponent, SelectModalComponent],
  entryComponents: [
    TableHeadComponent,
    ImportFileComponent,
    SelectModalComponent,
  ],
})
export class ComponentModule {}
