# CSS问题汇总

### select、option的文字对齐方式：

`direction`

默认 `ltr`， 文本方向从左向右

```css
select{
    direction: rtl;	/* 文字从右向左 */
}
```



### 智慧阴影

https://juejin.cn/post/6975818153376874503?utm_source=gold_browser_extension

`filter: drop-shadow(0px 0px 10px rgba(0,0,0,0.5)) blur(20px)`

示例：

```css
.colorfulShadow::after {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    background: inherit;
    background-position: center center;
    filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.50)) blur(20px);
    z-index: -1;
}
```

