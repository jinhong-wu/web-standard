# 数组展示为字符串
**文件：** arrayShow（common/pipe/array-show.pipe.ts）

**使用-参数：**
- value：数组，必填
- key：需要展示的参数
- limit：需要展示的个数，默认数组长度
- symbol：分隔符，默认为中文，
```html
{{ [{id: '1', name: 'name1'}, {id: '2', name: 'name2'}] | arrayShow:'name' }} 
<!-- 展示为：name1，name2 -->
```

# 数值-简化
**文件：** numFilter（common/pipe/num-filter.pipe.ts）

**使用-参数：**
- value：数值，必填（一般和NumUnitPipe搭配使用）
```html
{{ 10000 | numFilter }} 
<!-- 展示为：1 -->
```

# 数值-简化单位
**文件：** numUnit（common/pipe/num-unit.pipe.ts）

**使用-参数：**
- value：数值，必填（一般和NumFilterPipe搭配使用）
```html
{{ 10000 | numUnit }} 
<!-- 展示为：万 -->
```

# 计量单位 等
使用ng-zorro官方定义：https://ng.ant.design/version/10.2.x/experimental/pipes/zh
