import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

// ng-zorro-antd
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';
import { NzResizableModule } from 'ng-zorro-antd/resizable';
import { NzPipesModule } from 'ng-zorro-antd/pipes';
import { NzCascaderModule } from 'ng-zorro-antd/cascader';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';

@NgModule({
  declarations: [],
  imports: [],
  exports: [
    CommonModule,
		FormsModule,
		ReactiveFormsModule,
		TranslateModule,
    // ng-zorro-antd（8.x+没有NgZorroAntdModule，只能手动导入各个模块）
    NzPipesModule,
    NzModalModule,
    NzLayoutModule,
    NzMenuModule,
    NzTabsModule,
    NzBreadCrumbModule,
    NzDropDownModule,
    NzIconModule,
    NzButtonModule,
    NzInputModule,
    NzInputNumberModule,
    NzTreeModule,
    NzTableModule,
    NzSpinModule,
    NzToolTipModule,
    NzSelectModule,
    NzPopoverModule,
    NzCheckboxModule,
    NzAlertModule,
    NzNotificationModule,
    NzMessageModule,
    NzUploadModule,
    NzFormModule,
    NzSwitchModule,
    NzRadioModule,
    NzEmptyModule,
    NzProgressModule,
    NzDatePickerModule,
    NzTreeSelectModule,
		NzResizableModule,
		NzCascaderModule,
		NzTimePickerModule
  ],
  // tip的位置，持续时间，最大数量
  providers: [NzMessageService],
})
export class SharedModule {}
