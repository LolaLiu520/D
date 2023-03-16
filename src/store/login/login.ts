import { Module } from 'vuex'
import i18n from '@/i18n'
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId
} from '@/service/login/login'
import localCache from '@/utils/cache'
import { mapMenusToRoutes, mapMenusToPermissions } from '@/utils/map-menus'
import router from '@/router'

import { IAccount } from '@/service/login/type'
import { ILoginState } from './types'
import { IRootState } from '../types'

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: [],
      permissions: []
    }
  },
  getters: {},
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus

      console.log('注册动态路由')

      // userMenus => routes
      const routes = mapMenusToRoutes(userMenus)

      // 将routes => router.main.children
      routes.forEach((route) => {
        router.addRoute('main', route)
      })

      // 获取用户按钮的权限
      const permissions = mapMenusToPermissions(userMenus)
      state.permissions = permissions
    }
  },
  actions: {
    // lxx更改
    async accountLoginAction({ commit, dispatch }, payload: IAccount) {
      // 1.实现登录逻辑
      const loginResult = await accountLoginRequest(payload)
      const { id, token } = loginResult.data
      commit('changeToken', token)
      localCache.setCache('token', token)

      // 发送初始化的请求(完整的role/department)
      dispatch('getInitialDataAction', null, { root: true })

      // 2.请求用户信息
      const userInfoResult = await requestUserInfoById(id)
      const userInfo = userInfoResult.data
      commit('changeUserInfo', userInfo)
      localCache.setCache('userInfo', userInfo)

      // 3.请求用户菜单
      const userMenusResult = await requestUserMenusByRoleId(userInfo.role.id)
      const userMenus = userMenusResult.data
      commit('changeUserMenus', userMenus)
      localCache.setCache('userMenus', userMenus)

      // 4.跳到首页
      router.push('/main')
    },

    loadLocalLogin({ commit, dispatch }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)
        // 发送初始化的请求(完整的role/department)
        dispatch('getInitialDataAction', null, { root: true })
      }
      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      let userMenus = localCache.getCache('userMenus')
      userMenus = [
        {
          icon: 'el-icon-s-home',
          id: 'darwynnhome',
          // @ts-ignore for the block scope and imports
          name: i18n.global.t('home'),
          sort: 1,
          type: 2,
          url: '/main/darwynnhome',
          children: []
        },
        {
          icon: 'el-icon-s-shop',
          id: 2,
          name: i18n.global.t('inventory'),
          sort: 2,
          type: 1,
          url: '/main/Inventory/query',
          children: [
            {
              id: 21,
              name: i18n.global.t('inventoryQuery'),
              parentId: 1,
              sort: 106,
              type: 2,
              url: '/main/Inventory/query',
              display: true
            },
            {
              id: 22,
              name: i18n.global.t('commodityEnter'),
              parentId: 1,
              sort: 107,
              type: 2,
              url: '/main/Inventory/commodityEntry',
              display: true
            },
            {
              id: 23,
              name: i18n.global.t('kitManagement'),
              parentId: 1,
              sort: 107,
              type: 2,
              url: '/main/Inventory/kitmanagement',
              display: true
            }
          ]
        },
        {
          icon: 'el-icon-s-custom',
          id: 'customer',
          name: i18n.global.t('customerManagement'),
          sort: 2,
          type: 2,
          url: '/main/customer',
          children: [
            {
              id: 201,
              name: i18n.global.t('hhh'),
              parentId: 1,
              sort: 106,
              type: 2,
              url: '/main/customer/edit',
              display: false
            }
          ]
        },
        {
          icon: 'el-icon-circle-plus',
          id: 'Inbound',
          name: i18n.global.t('inbounds'),
          sort: 2,
          type: 2,
          url: '/main/Inbound',
          children: [],
          display: true
        },
        {
          icon: 'el-icon-s-goods',
          id: 6,
          name: i18n.global.t('orders'),
          sort: 2,
          type: 1,
          url: '/main/system',
          children: [
            {
              id: 61,
              name: i18n.global.t('ecommerceOrders'),
              parentId: 1,
              sort: 106,
              type: 2,
              url: '/main/orders/eorder',
              display: true
            },
            {
              id: 62,
              name: i18n.global.t('wholesaleOrders'),
              parentId: 1,
              sort: 106,
              type: 2,
              url: '/main/orders/worder',
              display: true
            }
          ]
        },
        {
          icon: 'el-icon-remove',
          id: 'returns',
          name: i18n.global.t('returns'),
          sort: 2,
          type: 2,
          url: '/main/returns',
          children: []
        },
        {
          icon: 'el-icon-s-marketing',
          id: 'reports',
          name: i18n.global.t('reports'),
          sort: 2,
          type: 2,
          url: '/main/reports',
          children: []
        },
        {
          icon: 'el-icon-s-finance',
          id: 10,
          name: i18n.global.t('billingsCenter'),
          sort: 2,
          type: 1,
          url: '/main/billing/collectionrequisition',
          children: [
            {
              id: 101,
              name: i18n.global.t('collectionRequisition'),
              parentId: 1,
              sort: 106,
              type: 2,
              url: '/main/billing/collectionrequisition',
              display: true
            },
            {
              id: 102,
              name: i18n.global.t('invoiceManagement'),
              parentId: 7,
              sort: 106,
              type: 2,
              url: '/main/billing/invoicemanagement',
              display: true
            }
          ]
        },
        {
          icon: 'el-icon-s-cooperation',
          id: 12,
          name: i18n.global.t('systemTools'),
          sort: 2,
          type: 1,
          url: '/main/system',
          children: [
            {
              id: 121,
              name: i18n.global.t('userManagement'),
              parentId: 1,
              sort: 106,
              type: 2,
              url: '/main/systemsettings/ownerManagement',
              display: true
            },
            {
              id: 122,
              name: i18n.global.t('deliveryTime'),
              parentId: 7,
              sort: 106,
              type: 2,
              url: '/main/systemsettings/deliverytime',
              display: true
            },
            {
              id: 123,
              name: i18n.global.t('commodityMap'),
              parentId: 7,
              sort: 106,
              type: 2,
              url: '/main/systemsettings/commoditymap',
              display: true
            },
            {
              id: 124,
              name: i18n.global.t('tools'),
              parentId: 7,
              sort: 106,
              type: 2,
              url: '/main/systemsettings/tools',
              display: true
            },
            {
              id: 125,
              name: i18n.global.t('settings'),
              parentId: 7,
              sort: 106,
              type: 2,
              url: '/main/systemsettings/settings',
              display: true
            }
          ]
        }
      ]
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    }
  }
}

export default loginModule
