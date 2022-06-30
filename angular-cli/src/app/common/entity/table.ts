

export interface TableInit {
  reset: boolean;  // 是否初始化page数据
  advance: boolean;  // 是否为精确查询
  tableService: any;  // table-api所在service
  tableData: string; // table-api所在service-方法名
	params?: boolean;  // 是否刷新请求参数（为false时，advance值不运行）
  paramsFn?: Function;  // 请求参数回调函数
  successFn?: Function; // 请求成功回调函数
  errorFn?: Function;  // 请求失败回调函数
}

export interface AdvanceData {
  key: string; // 对应param参数
  type: advanceDataType; // 输入框类型
  value?: string | number; // ngModel输入值
  options?: Array<any>; // type: 'select'时，必传
	nzValue?: string;  // type: 'select'时，对应的nzValue参数
	nzLabel?: string;  // type: 'select'时，对应的nzLabel参数
  nodes?: []; // type: 'tree'时，必传
  placeholder?: string; // placeholder提示文字
  style?: {
    // .item样式
    // .item盒子新增class，更多class查看common.less .table-head
    //（输入框宽度.width2 >.width-short，为了美观，width2数据建议放在最后）
    class?: string;
  };
}

export interface ColsData {
  title: string; // 列名
  key: string; // 列key
  show?: boolean; // 是否展示
  sort?: boolean; // 是否支持排序
  class?: string; // 列class
  width?: string; // 列宽度
}

export enum Type {
	TEXT = "text",
	SELECT = "select",
	TREE = "tree",
	DATE = "date",
}
export declare type advanceDataType = Type.TEXT | Type.SELECT | Type.TREE | Type.DATE;