# 问题汇总
1. Tailwind 的 [opacity](https://tailwindcss.com/docs/opacity) 不生效
A: 一开始用的这种写法 className={`opacity-${opacity}`}, 把类型名拆开了，所以渲染无效, 尝试把类型名整体放到模板字符串中：`${'opacity-' + opacity}` 就成功了，或者在模板字符串里写三元表达式

2. 为了做searchBox的开关动画（opacity + display），用 useState 把方法从父组件传到子组件，效果不好
A: 用 store + context 就有效果了

3. 首页图片样式修改无效
A: tailwind.config.js 文件 配置一下 `purge` 解析文件路径

4. React渲染md样式问题