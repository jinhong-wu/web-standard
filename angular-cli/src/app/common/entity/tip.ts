export interface ModalAfter {
  open?: Function;
  close?: Function;
}

export interface ModalBatchOptions {
  nzTitle: string;
  checkedData: Array<any>; // 批量操作数据
  columns: Array<Column>; // 记录表格展示数据
  doFn: Function; // 执行操作的函数
  resFn?: Function; // 执行完成后的回调函数
}

export interface Column {
  title: string; // 表-列名
  key: string; // 表-列key
  format?: Function; // 表-列数据处理方法
}

export interface ImportOptions {
	title?: string; 
  importUrl: string; // 上传/导入路径，必传
  tempUrl?: string; // 下载模板地址
  accept?: string; // 接受数据类型
  size?: number; // 接受数据大小，单位：KB
  isBigFile?: boolean; // 是否为大文件上传
  bigSingle?: number; // 大文件分片大小，单位：KB
  bigInitUrl?: string; // 大文件传输前初始化url
  resFn?: Function; // 弹框关闭后的回调函数
}