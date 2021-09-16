# 问题汇总
1. Tailwind 的 [opacity](https://tailwindcss.com/docs/opacity) 不生效
A: 一开始用的这种写法 className={`opacity-${opacity}`}, 把类型名拆开了，所以渲染无效, 尝试把类型名整体放到模板字符串中：`${'opacity-' + opacity}` 就成功了