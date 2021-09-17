import { $, getOriginalContent } from '@/utils'

export function subTitleAction() {
  return new Promise(resolve => {
    const subtitle = getOriginalContent(".content-subtitle")

    setTimeout(() => {
      $('.wrap').classList.add('in')
      setTimeout(() => {
        $('.content-subtitle').innerHTML = `<span>${[...subtitle].join(
          '</span><span>'
        )}</span>`
        resolve()
      }, 270)
    }, 0)
  })
}
