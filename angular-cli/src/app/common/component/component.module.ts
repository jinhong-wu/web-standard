import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableHeadComponent } from './table-head/table-head.component';
import { SharedModule } from '../shared.module';
import { ImportFileComponent } from './import-file/import-file.component';
import { SelectModalComponent } from './select-modal/select-modal.component';
import { ModalBatchComponent } from './modal-batch/modal-batch.component';

@NgModule({
  declarations: [
    TableHeadComponent,
    ImportFileComponent,
    SelectModalComponent,
    ModalBatchComponent,
  ],
  imports: [CommonModule, SharedModule],
  exports: [
    TableHeadComponent,
    ImportFileComponent,
    SelectModalComponent,
    ModalBatchComponent,
  ],
  entryComponents: [
    TableHeadComponent,
    ImportFileComponent,
    SelectModalComponent,
    ModalBatchComponent,
  ],
})
export class ComponentModule {}
