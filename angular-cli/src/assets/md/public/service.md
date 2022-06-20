# 系统信息-菜单数据
**文件：** MenuService（common/service/system/menu.service.ts）

**使用-方法：**
- initMenu()：获取全局菜单
- routerMenuFn()：当前路由菜单、权限
- chooseMenu()：一级菜单切换-侧边栏数据
- initTab()：tab菜单-初始化
- selectTab()：tab菜单-选中tab
- createTab()：tab菜单-新增tab
- closeTab()：tab菜单-关闭tab

# 系统信息-国际化
**文件：** I18nService（common/service/system/i18n.service.ts）

**使用-方法：**
- use()：语言-使用
- changeLang()：语言-切换
- jsonFn()：加载zh/en.json

# 系统信息-码表
**文件：** CodeService（common/service/system/code.service.ts）

**使用-方法：**
- initCode()：后台码表


# 文件下载
**文件：** DownloadService（common/service/download.service.ts）

**使用-方法：**
- down()：下载

# 弹出框
**文件：** TipService（common/service/tip.service.ts）

**使用-方法：**
- msg()、msgRemove()：顶部居中提示（前端提示）
- notify()：右下角通知框（后端接口调用的提示）
- successNotify()：右下角通知框-成功提示
- errorNotify()：右下角通知框-失败提示
- confirm()：确认对话框（确认操作）
- modal()：基本对话框-统一配置
- modalAfter：基本对话框-支持拖拽

# 弹出框-弹出页面
**文件：** TipModalService（common/service/tip-modal.service.ts）

**使用-方法：**
- batch()：批量操作
- file()：导入文件

# 树-数据
**文件：** TreeNodesService（common/service/tree-nodes.service.ts）

**使用-方法：**
- treeNodesFn()：数据处理-pid格式
- treeNodesFnObject()：数据处理-childList格式

# 校验规则
**文件：** PatternService（common/service/pattern.service.ts）

