import type { UseServices } from '../types/UseServices'
import { LocalStorageAccountService } from './LocalStorageAccountService'

const useServices = (): UseServices => {
  return {
    accountsService: new LocalStorageAccountService(),
  }
}

export default useServices
