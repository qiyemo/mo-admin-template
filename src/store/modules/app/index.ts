import { defineStore } from 'pinia';
import { useSessionStorage } from '@vueuse/core';
import { RouteRecordNormalized } from 'vue-router';
import { TreeUtils } from 'motl';
import { routes } from '@/router';
import defaultSettings from '@/config/settings.json';
import { getToken } from '@/utils/auth';
import { listMenu } from '@/api/login';
import { AppState, IServerMenu, IUIMenu } from './types';

class TypeEnum {
  static FOLDER = '0';

  static MENU = '1';

  static BUTTON = '2';
}
/**
 * 是否显示
 */
class ExhibitEnum {
  static HIDDEN = '0';

  static VISIBLE = '1';
}

const ROOT_MENU_PARENT_ID = '0';

const sessionMenuList = useSessionStorage('menuList', []);
const sessionMenuTree = useSessionStorage('menuTree', []);

const isLeaf = (target: any): boolean => {
  return !target.children || !target.children.filter((m: any) => m.type !== TypeEnum.BUTTON && m.exhibit === ExhibitEnum.VISIBLE).length;
};

// 将后台传回来的数据转换为树
const toMenuTree = (menus: IServerMenu[]): IUIMenu[] => {
  return TreeUtils.toTree(menus, ROOT_MENU_PARENT_ID) as IUIMenu[];
};

const findFirstMenuPath = (tree: any[]): string => {
  for (const item of tree) {
    if (isLeaf(item)) {
      return item.path;
    }
    return findFirstMenuPath(item.children);
  }
  return '';
};

// 获取指定的树节点
const findMenuTreeNode = (path: string, tree: any[] = sessionMenuTree.value): any => {
  let target = null;
  for (const node of tree) {
    if (node.path === path) {
      target = node;
    }
  }
  if (target) {
    return target;
  }
  for (const node of tree) {
    if (node.children?.length) {
      target = findMenuTreeNode(path, node.children);
      if (target) {
        return target;
      }
    }
  }

  return target;
};

const listRoute = (): RouteRecordNormalized[] => {
  let routeList: any[] = [];
  if (sessionStorage.getItem('routeList')) {
    routeList = JSON.parse(<string>sessionStorage.getItem('routeList'));
  } else {
    routeList = TreeUtils.toList(routes);
  }

  return routeList;
};

const validAuthor = (path: string): boolean => {
  const target = sessionMenuList.value.find((item: IServerMenu) => item.path === path);
  if (target) {
    return true;
  }
  return false;
};

const useAppStore = defineStore('app', {
  state: (): AppState => ({ ...defaultSettings, hideMenu: true, menuWidth: 0 }),

  getters: {
    appCurrentSetting(state: AppState): AppState {
      return { ...state };
    },
    appDevice(state: AppState) {
      return state.device;
    },
    appAsyncMenus(state: AppState): IUIMenu[] {
      return state.serverMenu as IUIMenu[];
    },

    oneLevelMenus(state: AppState): IUIMenu[] {
      return state.serverMenu;
    },
    letftMenus(state: AppState) {
      return state.leftMenus;
    },
    defaultMenu(): string {
      const firstMenuPath: any = findFirstMenuPath(sessionMenuTree.value);
      return firstMenuPath;
    },
  },

  actions: {
    currentMenu(router: any): IServerMenu | null {
      const { currentRoute } = router;
      const currentMenu: IServerMenu | undefined | null = this.getMenuByPath(currentRoute.value.fullPath);
      if (!currentMenu) {
        return null;
      }
      return currentMenu;
    },
    // Update app settings
    updateSettings(partial: Partial<AppState>) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore-next-line
      this.$patch(partial);
    },

    // Change theme color
    toggleTheme(dark: boolean) {
      if (dark) {
        this.theme = 'dark';
        document.body.setAttribute('arco-theme', 'dark');
      } else {
        this.theme = 'light';
        document.body.removeAttribute('arco-theme');
      }
    },
    toggleDevice(device: string) {
      this.device = device;
    },
    toggleMenu(value: boolean) {
      this.hideMenu = value;
    },
    async fetchServerMenuConfig() {
      try {
        const token = getToken();
        if (!token) return;
        const res: any = await listMenu();
        sessionMenuList.value = res.data;

        const menuTree = toMenuTree(res.data);
        sessionMenuTree.value = menuTree as any;
        this.serverMenu = menuTree.filter((item: any) => item.exhibit === ExhibitEnum.VISIBLE);
      } catch (error) {
        // console.log(error);
      }
    },

    clearServerMenu() {
      this.serverMenu = [];
    },

    isLeaf,

    hideLeftMenu() {
      this.hideMenu = true;
      this.menuWidth = 0;
    },
    showLeftMenu() {
      this.hideMenu = false;
      this.menuWidth = defaultSettings.menuWidth;
    },

    isLevel2(menu: any): boolean {
      return true;
    },

    routeList(target: any, arr: any[] = []) {
      const obj = {
        ...target,
        id: target.menuId,
      };
      arr.push(obj);
      const parent = sessionMenuList.value.find((m: any) => m.menuId === target.parentId);
      if (!parent) return arr;
      this.routeList(parent, arr);
      return arr;
    },

    hasPermission(route: any): boolean {
      return !!this.getMenuByPath(route.fullPath);
    },

    getMenuByPath(path: string): IServerMenu | null {
      // 精确查找
      let target: any = sessionMenuList.value.find((m: any) => m.path === path);
      // console.log('path ', path);
      if (!target) {
        const tArr = path.split('?');
        const tPath = tArr[0];

        const targetList: IServerMenu[] = sessionMenuList.value.filter((m: any) => {
          const mArr = m.path.split('?');
          const mPath = mArr[0];
          const case1 = path.startsWith(m.path);

          const case2 = tPath === mPath;
          return case1 && case2;
        });

        // console.log('targetList ', targetList);
        if (targetList.length) {
          target = targetList[0];
          for (const item of targetList) {
            if (item.path.length > target.path.length) {
              target = item;
            }
          }

          if (path.startsWith('/workManage/') && path.includes('areaCode=')) {
            target.path = path;
          }
          if (path.includes('iframe_params=')) {
            target.path = path;
          }
        }
      }

      if (!target) {
        return null;
      }
      const ret = {
        ...target,
        id: target.menuId,
      };
      return ret;
    },

    isVisible(id: string): boolean {
      const target: any = sessionMenuList.value.find((m: IServerMenu) => m.menuId === id);
      if (!target) {
        return false;
      }
      return target.exhibit === ExhibitEnum.VISIBLE;
    },

    // 判断菜单是否需要隐藏左侧菜单
    handleHideLeftMenu(path: string) {
      const menu = this.getMenuByPath(path);
      if (!menu) {
        return;
      }
      const target = findMenuTreeNode(menu.path);
      if (!target) {
        return;
      }

      if (this.isLeaf(target)) {
        this.hideLeftMenu();
      }
    },

    // 默认第一个子节点
    findFirstMenuPath,

    changeleftMenus(targetId: string): { to: string | undefined } {
      // 不是按钮，并且需要在菜单中显示menus
      const allMenus = sessionMenuList.value.filter((m: any) => m.type !== TypeEnum.BUTTON);
      let target: any = allMenus.find((m: any) => m.menuId === targetId);
      const menuList = allMenus.filter((m: any) => m.exhibit === ExhibitEnum.VISIBLE);
      const tree = toMenuTree(menuList) as IUIMenu[];
      // 一级菜单

      if (target.parentId === ROOT_MENU_PARENT_ID) {
        const details: any = tree.find((m: any) => m.menuId === target.menuId);
        const isLeaf = this.isLeaf(details);
        if (isLeaf) {
          this.hideLeftMenu();
          return {
            to: details.path,
          };
        }
        return {
          to: undefined,
        };
      }

      const routeList = this.routeList(target).reverse();
      if (routeList.length > 2) {
        target = routeList[1];
      }

      const parentId = target?.parentId;
      const level1 = tree.find((m: any) => m.menuId === parentId);
      const list = level1?.children;
      const targetDetails = list?.find((item) => item.id === target.menuId);
      const menus = targetDetails.children ?? [];

      this.leftMenus = menus;
      // 没有子菜单
      if (this.isLeaf(targetDetails)) {
        this.hideLeftMenu();
        return {
          to: undefined,
        };
      }
      this.showLeftMenu();

      // 如果当前点击的是 2 级菜单，跳转到默认菜单
      if (routeList.length === 2) {
        const defaultPath = this.findFirstMenuPath(this.leftMenus as any[]);
        if (defaultPath && (defaultPath.startsWith('http') || defaultPath.startsWith('/third/redirect'))) {
          return {
            to: undefined,
          };
        }
        return {
          to: defaultPath,
        };
      }
      return {
        to: undefined,
      };
    },

    findRouteRecord(fullPath: string): RouteRecordNormalized | undefined {
      const routeList = listRoute();

      return routeList.find((r: any) => r.path === fullPath);
    },

    toPath(path: string, router?: any) {
      if (validAuthor(path)) {
        const target: any = findMenuTreeNode(path);
        if (target.type === TypeEnum.FOLDER) {
          if (!target.children?.length) {
            // console.error(`未找到符合条件的菜单`);
            return;
          }
        }

        path = findFirstMenuPath([target]);
        if (!path) {
          // console.error(`未找到符合条件的菜单`);
          return;
        }

        this.$router.push(path);
      } else {
        // $Message.info(`不具备 ${path} 的访问权限`);
      }
    },

    triggerFullScreen() {
      const event = new Event('full-screen');
      document.dispatchEvent(event);
    },
    triggerEscFullScreen() {
      const event = new Event('esc-full-screen');
      document.dispatchEvent(event);
    },
    validAuthor,
  },
});

export default useAppStore;
