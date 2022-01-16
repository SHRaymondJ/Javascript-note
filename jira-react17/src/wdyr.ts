import React from 'react';

if (process.env.NODE_ENV === 'development') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React, {
    trackAllPureComponents: false, // 如果全局跟踪就是true，如果只要跟踪某一个component，就设置成false，然后在那个component下设置 xxxComponent.WhyDidYouRender = true
  });
}