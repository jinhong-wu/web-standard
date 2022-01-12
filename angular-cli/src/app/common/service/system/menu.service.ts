import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { ActivatedRoute } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class MenuService {
  constructor(
    private http: HttpClient,
    public activatedRoute: ActivatedRoute
  ) {
    this.menuLoading = true;
    this.http.get<any>("assets/json/menu.json").subscribe((data) => {
			this.menuLoading = false;
			this.menuList = data.data || [];
			this.getMenuDeal(this.menuList);
		});
  }


  menuList: any[] = [];
  menuObject: Object = {};
  menuLoading: boolean = false;

  // 当前路由菜单
  routerMenu: any = {};
  // 当前路由菜单-权限
  routerMenuPoint: any[] = [];

  // 侧边栏
  siderList = [];

  // 数据处理
  getMenuDeal(data = []) {
    data.forEach((d) => {
      this.menuObject[d.node.path] = d;
      if (d.child && d.child.length > 0) {
        this.getMenuDeal(d.child);
      }
    });
  }

  routerMenuFn(url) {
    if (url) {
      this.routerMenu = this.menuObject[url] || {};
      this.routerMenuPoint = [];
      if (this.routerMenu.node) {
        this.routerMenuPoint = this.routerMenu.node.functionPointLanguage || [];
      }
    }
  }

  // 菜单（侧边栏）
  chooseMenu(path) {
    let menu = this.menuObject[path];
    let siderList = [];
    menu.child.forEach((item) => {
      let childSider = [];
      if (item.child) {
        item.child.forEach((childItem) => {
          if (childItem.node.sideShow) {
            // 添加菜单的ICON，如果菜单ICON为空，则取environment文件里面配置的默认ICON
            childSider.push({
              node: Object.assign(childItem.node, {
                icon: childItem.node.icon
                  ? childItem.node.icon
                  : environment.DEFAULT_MENU_ICON,
              }),
            });
          }
        });
        if (childSider.length) {
          siderList.push({
            node: Object.assign(item.node, {
              icon: item.node.icon
                ? item.node.icon
                : environment.DEFAULT_MENU_ICON,
            }),
            child: childSider,
          });
        } else {
          siderList.push({
            node: Object.assign(item.node, {
              icon: item.node.icon
                ? item.node.icon
                : environment.DEFAULT_MENU_ICON,
            }),
          });
        }
      } else {
        if (item.node.sideShow) {
          siderList.push({
            node: Object.assign(item.node, {
              icon: item.node.icon
                ? item.node.icon
                : environment.DEFAULT_MENU_ICON,
            }),
          });
        }
      }
    });
    this.siderList = siderList;
  }

  // 菜单（nz-tab ）
  tabs: any = [];
  activeIndex = 0; // 当前页

  initTab(fn?) {
    this.tabs = (this.routerMenu.child || []).map((d) => d.node);
    this.activeIndex = 0;
    if (this.tabs[0]) {
      this.selectTab();
    }
    if (fn) {
      setTimeout(() => {
        fn();
      });
    }
  }

  selectTab() {
    setTimeout(() => {
      this.routerMenuFn(this.tabs[this.activeIndex].path);
    });
  }

  async createTab(tab: any, closeable: boolean = true) {
    tab.id = `${tab.pid}-${tab.type}`;
    if (tab == "update") tab.id += `-${tab.data.id}`;
    //tab.name = await this.translate.get(tab.name).toPromise();

    let index = this.tabs.findIndex((d) => {
      return d.id === tab.id;
    });
    if (index < 0) {
      this.tabs.push({ ...tab, closeable });
      this.activeIndex = this.tabs.length - 1;
    } else {
      this.tabs[index].name = tab.name;
      this.activeIndex = index;
    }
  }

  closeTab(index) {
    let tab = this.tabs[index];
    this.tabs.splice(index, 1);
    if (this.activeIndex == index) {
      if (tab.pid) {
        this.activeIndex = this.tabs.findIndex((item) => item.id == tab.pid);
      } else {
        this.activeIndex = 0;
      }
    }
  }
}
// 对应权限注解
// userbind=绑定用户
// userunbind=解绑用户
// deal=处理
// list=查看
// create=新增
// update=修改
// delete=删除
// import=导入
// export=导出
// lock=锁定
// unlock=解锁
// NationalOtpImport=飞天OTP导入
// NationalOtpCreate=坚石诚信OTP新增
// NationalOtpUpdate=坚石诚信OTP修改
// otpBindUser=关联用户
// bindRole=绑定角色
// copy=复制
// resetUserPwd=重置密码
// sysResAccCheck=帐号核查
// manageAcc=管理帐号
// confirmCreate=确认新增
// executeOne=执行一次
// stop=停止
// start=启动
// configPermission=配置功能权限
// configPermissionData=配置数据权限
// abilityDelete=删除组件
// abilityModify=修改组件
// abilityCreate=新增组件
// abilityBindResourceList=查看关联资产组列表
// abilityBindResource=修改关联资产组
// abilityMonitor=能力组件状态监控
// enable=启用
// disable=禁用
// checkExport=选中导出
// queryExport=查询导出
// detail=详情
// upgrade=升级
// alarmReceiver=设置告警接收人
// startComponent=启动组件
// stopComponent=停止组件
// restartComponent=重启组件
// downloadLog=下载日志
// deleteBackup=删除备份
// manualBackup=手动备份
// importBackup=导入恢复
// sendBackup=外发配置
// downloadBackup=下载备份
// recoverBackup=恢复指定配置
// updateNet=修改网口
// restartNet=重启网口
// lookDns=查看DNS
// updateDns=修改DNS
// lookHa=查看主备信息
// lookHaEvent=查看主备事件
// configHa=配置主备
// powerShutdown=关闭服务器
// powerReboot=重启服务器
// bindUser=关联用户
// overView=概览
// dataTraceList=数据溯源
// configStrategy=配置策略
// cancelStrategy=取消配置
// login=登录
// relateComponent=关联资产
// dataWatermarkTaskResult=水印结果
// batchConfirm=批量确认
// batchClassify=批量分类
// taskResult=任务结果
// findResult=发现结果
// download=下载
// set=缓存设置
// handle=处理标注
// preview=预览
// event-assign=事件分派
// resSensitiveFind=敏感数据发现
// batchMark=批量标注
