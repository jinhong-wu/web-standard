# 工具类
**文件：** UtilTs（common/ts/util/util.ts） 

**使用-方法：**
- render()：模板编译器
  ```typescript
	// 例：value='测试${xxx}${yyy}'，replace={xxx: '', yyy: ''}
	this.UtilTs.render('确定删除所选${name}？', {name: '列表数据'}) => 确定删除所选列表数据？
	```


# HTTP
**文件：** HttpUtilTs（common/ts/util/http.util.ts） 

## 请求参数
**使用-方法：**
- paramsFn()：去除params无效值
- getString()：GET请求，返回：?xx=x&yy=y&
- getHttpParam()：GET请求，返回：HttpParams
```typescript
this.http.get(url + getString(params));
this.http.get(url, { getHttpParam(params) });
```

## 拦截器
**文件：**Interceptor（common/interceptor/interceptor.ts）
- url：统一加上服务端前缀
- body：去除body-params无效值
- 状态码：统一处理
  