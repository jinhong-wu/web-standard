export  interface SaveInit {
  formService: any;  // form-api所在service
  saveApi: string; // form-api所在service-方法名
  paramsFn?: Function;  // 请求参数回调函数
  successFn?: Function; // 请求成功回调函数
  errorFn?: Function;  // 请求失败回调函数
	notify?: string; // 提示框内容
}