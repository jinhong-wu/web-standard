import { Component, Input, OnInit } from '@angular/core';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { MemoryPipe } from "src/app/common/pipe/memory.pipe";
import { DownloadService } from '../../service/download/download.service';
import { I18nService } from '../../service/system/i18n.service';
import { TipService } from '../../service/tip/tip.service';

/**
 * @name 上传/导入文件
 * @param importUrl 上传/导入路径（必传）
 * @param templateUrl 下载模板地址
 * @param accept 接受数据类型，默认.xlsx
 * @param size 接受数据大小，默认为0，表示不限制，单位：KB
 * @example
		this.UploadService.import({
			importUrl: '',
			templateUrl: '',
			close(compo) {
				// 右上角关闭弹出框后操作
			}
		});
*/

@Component({
  selector: 'app-import-file',
  templateUrl: './import-file.component.html',
  styleUrls: ['./import-file.component.less']
})
export class ImportFileComponent implements OnInit {

  constructor(
		public i18n: I18nService,
		public tip: TipService,
		public download: DownloadService
	) { }

  @Input() importUrl: string;
  @Input() templateUrl?: string;
  @Input() accept?: string = '.xlsx';
	@Input() size: number = 0;  // 单位：KB

	uploadLoading: boolean = false;
	uploadHint: any = [];
	uploadHintList: any = [
		{ key: 'size', name: 'uploadFileSize' },
		{ key: 'accept', name: 'uploadFileAccept' },
	];
	uploadType: string;
	uploadRes: any = {};
	uploadResult: any = '';

  ngOnInit(): void {
		// 提示文字
		this.uploadHintList.forEach(d => {
			if (this[d.key]) {
				d.value = `${this.i18n.baseList[d.name]}：`;
				if(d.key == 'size') {
					d.size = new MemoryPipe().transform(this.size);
					d.value += `<${d.size}`;
				} else {
					d.value += this[d.key];
				}
				this.uploadHint.push(d.value);
			}
		});
		this.uploadHint = this.uploadHint.join('，');
  }

	// 上传文件前
	nzBeforeUpload = (file: NzUploadFile): boolean =>{
		if(this.size !== 0 && file.size > this.size) { 
			this.tip.msg('warning', "文件大小超过："+this.uploadHintList[0].size);
			return false;
		}
		let name = new RegExp(this.accept, 'ig');
		if(!name.test(file.name)) {
			this.tip.msg('warning', '文件类型仅支持：'+this.accept)
			return false;
		}
		return true;
	}

	// 上传文件改变时
	nzChange({file, type}) {
		this.uploadType = type;
		switch(type) {
			case 'start':
				this.uploadLoading = true;
				break;
			case 'error':
				this.uploadLoading = false;
				this.uploadResult = file.error.message;
				break;
			case 'success':
				break;
			case 'done':
				this.uploadLoading = false;
				this.uploadResult = file.response.message;
				this.uploadRes = file.response;
				break;
			case 'removed':
				// 删除的手动操作后续再具体补充
				break;
		}
		
	}
 
	// 下载模板
	downloadTemplate() {
		this.download.down(this.templateUrl).subscribe();
	}

}
