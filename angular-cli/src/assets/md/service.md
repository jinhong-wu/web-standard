# 系统信息-国际化
**文件：** I18nService（common/service/system/i18n.service.ts）
- 获取数据：全局en.json或zh.json

# 系统信息-菜单数据
**文件：** MenuService（common/service/system/menu.service.ts）
- 获取数据：全局菜单
- 方法：一级菜单切换-侧边栏数据-chooseMenu()
- 方法：当前路由菜单、权限-routerMenuFn()
- 方法：三级菜单（tab）初始化-initTab()
- 方法：选中tab-selectTab()、新建tab-createTab()、关闭tab-closeTab()

# 文件下载
**文件：** DownloadService（common/service/download.service.ts）
- 方法：down()

# 弹出框
**文件：** TipService（common/service/tip.service.ts）
- 方法：顶部居中提示（前端提示）-msg()、msgRemove()
- 方法：右下角通知框（后端接口调用的提示）-notify()
- 方法：确认对话框（确认操作）-confirm()
- 方法：基本对话框（弹框页）-统一配置modal()、modalAfter()、拖拽enableModalDrag()

# 弹出框-弹出页面
**文件：** TipModalService（common/service/tip-modal.service.ts）
- 方法：批量操作-batch()
- 方法：导入文件-file()
