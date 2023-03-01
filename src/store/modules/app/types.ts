export interface AppState {
  theme: string;
  colorWeak: boolean;
  navbar: boolean;
  menu: boolean;
  hideMenu: boolean;
  menuCollapse: boolean;
  footer: boolean;
  themeColor: string;
  menuWidth: number;
  globalSettings: boolean;
  device: string;
  tabBar: boolean;
  menuFromServer: boolean;
  serverMenu: IUIMenu[];
  [key: string]: unknown;
}

// 服务端返回的菜单格式
export interface IServerMenu {
  // 菜单id
  menuId: string;
  // 菜单名称
  menuName: string;
  // 前端 URL （路径、路由）
  path: string;
  // 父菜单ID
  parentId: string;
  // 图标
  icon: string;
  // 排序
  sort: number;
  // 类型 0：目录，1：菜单，2：按钮
  type: '0' | '1' | '2';
  // 是否在菜单栏显示，'1' 显示，'2' 不显示
  exhibit: '1' | '0';
}
// 前端需要的菜单格式
export interface IUIMenu {
  // 菜单id
  id: string;
  // 菜单名称
  name: string;
  // 前端 URL （路径、路由）
  path: string;
  // 父菜单ID
  parentId: string;
  // 图标
  icon: string;
  // 排序
  sort: number;
  // 类型 0：目录，1：菜单，2：按钮
  type: string;
  text: string;
  children?: any[];
}
