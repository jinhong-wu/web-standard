import { Component, OnInit, Injector } from '@angular/core';
import { TableBaseTs } from 'src/app/common/ts/base/table.base';
import { TableService } from 'src/app/common/api/public/table/table.service';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.less'],
})
export class MenuListComponent extends TableBaseTs implements OnInit {
  constructor(public injector: Injector, public TableService: TableService) {
    super(injector);
  }

  // 举例
  advanceData = [
    {
      key: 'key-text',
      type: 'text',
      style: { class: 'width1' },
      placeholder: '文字框',
    },
    {
      key: 'key-select',
      type: 'select',
      placeholder: '下拉框',
      options: [
        { value: '1', label: 'option1' },
        { value: '2', label: 'option2' },
        { value: '3', label: 'option3' },
        { value: '4', label: 'option4' },
      ],
    },
    {
      key: 'key-tree',
      type: 'tree',
      placeholder: '下拉框-树',
      nodes: [
        {
          title: 'parent 1',
          key: '100',
          children: [
            {
              title: 'parent 1-0',
              key: '1001',
              children: [{ title: 'leaf 1-0-0', key: '10010', isLeaf: true }],
            },
          ],
        },
      ],
    },
    {
      key: 'startDt',
      type: 'date',
      placeholder: '开始时间',
    },
    {
      key: 'endDt',
      type: 'date',
      placeholder: '结束时间',
    },
  ];

  colsData = [
    {
      title: '时间',
      key: 'time',
      class: 'time',
      show: true,
      sort: true,
    },
    {
      title: 'IP',
      key: 'ip',
      class: 'ip',
      show: true,
    },
		{
      title: '下拉框样式',
      key: 'select',
			width: '100px',
      show: true,
    },
    {
      title: '描述',
      key: 'describe',
      show: true,
    },
    {
      title: '操作',
      key: 'handle',
      width: '60px',
      show: true,
    },
  ];

  exportUrl = 'https://....';

  ngOnInit(): void {
    this.tableDataFn();
  }
	
  // 获取表格数据
  tableDataFn(reset: boolean = false, advance: boolean = false) {
    //this.tableInit({
		//	reset,
		//	advance,
		//	tableService: this.TableService,
		//	tableData: 'tableData',
		//	successFn(data){

		//	}
		//});
		this.tableParamsFn(advance, ()=>{
			setTimeout(() => {
				this.tableTotal = 3;
				this.tableLoading = false;
				this.tableData = new Array(this.tableTotal).fill(0).map((_, index) => {
					return {
						id: index,
						init: 'init',
						name: 'name' + index,
						time: '2022-01-01 12:00:00',
						ip: '255.255.255.255',
						describe: `超长描述超长描述超长描述超长描述超长描述超长描述超长描述超长描述超长描述超长描述超长描述超长描述超长描述`,
					};
				});
			}, 1000);
		});
  }

  import() {
    this.tipModal.file({
      importUrl: '',
      tempUrl: 'aa',
      close(compo) {
        console.log('右上角关闭弹出框后操作');
      },
    });
  }

  delete() {
    this.deleteInit('列表数据', {
      columns: [
        {
          title: '名称',
          key: 'name',
        },
        {
          title: 'IP',
          key: 'ip',
        },
      ],
      doFn() {
        console.log('删除函数');
      },
      resFn() {
        console.log('执行完成后的回调函数');
      },
    });
  }
}
