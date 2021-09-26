import './main.scss'
import { bus } from '@/utils'
import { describeAutoType } from '@/action'

bus.on('mainEnter', () => {
  // 自动打印机效果
  describeAutoType()
})

export function afterLoad(origin, destination, direction) {
  if (origin.anchor !== destination.anchor) {
    if (destination.anchor === 'main') {
      bus.emit(`mainEnter`, origin, destination, direction)
    }
  }
}
