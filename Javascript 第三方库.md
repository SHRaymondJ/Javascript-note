# Javascript 第三方库

## 日期处理类库

### [Moment.js](http://momentjs.cn/)

安装

```
npm install moment --save   # npm
yarn add moment             # Yarn
Install-Package Moment.js   # NuGet
spm install moment --save   # spm
meteor add momentjs:moment  # meteor
```

常用方法：

#### fromNow

获取距离现在的时间间隔

```
moment([2017, 0, 29]).fromNow();     // 4 年前
moment([2017, 0, 29]).fromNow(true); // 4 年
// moment内的参数可以是Date()实例
```

#### locale

获取moment当前的语言环境

```
moment.locale()	// zh-cn
```

#### updateLocale

更新语言环境，并且配置对应显示的文字

```
// 中文
moment.updateLocale('zh-cn', {
    relativeTime : {
        future: "%s 后",
        past:   "%s 前",
        s  : '几秒前',
        ss : '%d 秒',
        m:  "一分钟",
        mm: "%d 分钟",
        h:  "一小时",
        hh: "%d 小时",
        d:  "a 天",
        dd: "%d 天",
        M:  "a 个月",
        MM: "%d 个月",
        y:  "a 年",
        yy: "%d 年"
    }
});
```

