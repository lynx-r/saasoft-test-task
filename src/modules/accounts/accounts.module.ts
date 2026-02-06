import type {
  ClientModuleInterface,
  ContainerPluginInterface,
  VuePluginInterface,
  VueWidgetsInterface,
} from '@libs-for-dev/vue-modular-application'
import { Container } from 'inversify'
import type { RouteRecordRaw } from 'vue-router'
import type { NavigationItem } from './accounts.types'
import { LocalStorageAccountService } from './services/LocalStorageAccountService'

export class AccountsModule implements ClientModuleInterface<
  RouteRecordRaw[],
  NavigationItem[],
  Container
> {
  readonly name = 'accounts-module'

  getRoutes(): RouteRecordRaw[] {
    return [
      {
        path: '/',
        redirect: '/accounts',
      },
      {
        path: '/accounts',
        name: 'Accounts',
        component: () => import('./pages/AccountsPage.vue'),
      },
    ]
  }

  getNavigation(): NavigationItem[] {
    return [
      {
        label: 'Accounts',
        path: '/accounts',
      },
    ]
  }

  getPlugins(): VuePluginInterface[] {
    return []
  }

  getContainer(): ContainerPluginInterface<Container>[] {
    const container = new Container()

    return [
      {
        container,
        install() {
          container.bind('AccountsService').to(LocalStorageAccountService).inSingletonScope()
        },
      },
    ]
  }

  getWidgets(): VueWidgetsInterface[] {
    return []
  }
}
