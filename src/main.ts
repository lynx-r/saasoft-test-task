import 'primeicons/primeicons.css'
import './assets/main.css'

import Aura from '@primeuix/themes/aura'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import { createApp, type DefineComponent } from 'vue'

import { ModuleLoader, VueApplication } from '@libs-for-dev/vue-modular-application'
import { createWebHistory } from 'vue-router'
import App from './App.vue'
import { AccountsModule } from './modules/accounts/accounts.module'

ModuleLoader.registerModuleProvider(new AccountsModule())

const moduleRegistry = ModuleLoader.getModulesRegistry()

const appInstance = new VueApplication(
  createApp,
  createWebHistory(import.meta.env.BASE_URL),
  moduleRegistry,
)
const app = appInstance.build(App as unknown as DefineComponent)

app.use(createPinia())
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
})
app.use(ToastService)

app.mount('#app')
