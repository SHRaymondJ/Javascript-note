root/
    src/
        assets/
            svg/
            png/
        components/

        modules/

        pages/
        
        services/

        utils/

## assets 
目录里面放所有的资源文件。虽然在某些页面里面放上一些图片资源引用起来很方便，但是页面一多就会发现有很多图片是一样的。这时候统一存放资源文件就可以复用一些文件。避免不必要的重复文件占空间。
## components 
目录里存放公共的组件。我对于组件的定义是尽量只实现 UI 呈现方面的事情，业务逻辑可以通过事件传递出去，交给 page 和 module 来实现。
## pages 
目录里存放路由级别的页面。
由于项目中使用了 redux，所以每个页面会有一个 container 用来获取 redux 数据和定义 dispatch 事件。index 里面承载了大部分页面逻辑的处理，以及页面结构的呈现。
## model 
用于定义 redux state 以及数据操作方式。
## components 
目录用于存放仅仅在本页面中会用到的组件。
## modules 
目录里面存放了非路由级别的功能模块。它的目录结构和 pages 目录完全一致。只不过这个目录下的模块不能被路由直接访问到。
## service 
目录用于配置和定义 API 接口。
## utils 
用于定义公共工具函数。
