import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableHeadComponent } from './table-head/table-head.component';
import { SharedModule } from '../shared.module';
import { ImportFileComponent } from './import-file/import-file.component';
import { SelectModalComponent } from './select-modal/select-modal.component';
import { RangePickerComponent } from './range-picker/range-picker.component';
import { TreeTableComponent } from './tree-table/tree-table.component';
import { BatchDeleteComponent } from './batch-delete/batch-delete.component';
import { FormControlInfoComponent } from './form-control-info/form-control-info.component';
import { PdfViewComponent } from './pdf-view/pdf-view.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PwdVerifyComponent } from './pwd-verify/pwd-verify.component';

// pdf预览加载js
(<any>window).pdfWorkerSrc = 'assets/lib/pdf.worker.min.js';
@NgModule({
  declarations: [
    TableHeadComponent,
    ImportFileComponent,
    SelectModalComponent,
    RangePickerComponent,
    TreeTableComponent,
    BatchDeleteComponent,
    FormControlInfoComponent,
    PdfViewComponent,
    PwdVerifyComponent,
  ],
  imports: [CommonModule, SharedModule, PdfViewerModule],
  exports: [
    TableHeadComponent,
    ImportFileComponent,
    SelectModalComponent,
    BatchDeleteComponent,
    RangePickerComponent,
		TreeTableComponent,
		FormControlInfoComponent,
		PdfViewComponent,
		PwdVerifyComponent
  ],
  entryComponents: [
    TableHeadComponent,
    ImportFileComponent,
    SelectModalComponent,
    BatchDeleteComponent,
    RangePickerComponent,
		TreeTableComponent,
		FormControlInfoComponent,
		PdfViewComponent,
		PwdVerifyComponent
  ],
})
export class ComponentModule {}
