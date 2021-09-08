// 下面代码会输出什么

class Example extends React.Component {
    constructor() {
        super();
        this.state = {
            val: 0
        };
    }
    /**
     * 1. 在react生命周期内或者由react自身的事件处理函数触发的事件，触发时，isBatchingUpdates 为 true,
     *      所以不执行更新state，而是加入dirtyComponents
     * 2. 因为不更新state，所以前两次设置的state取到的默认值都是0，在react内部会被合并掉，只执行一次，完成后值是1
     * 3. setTimeout 中的代码，触发时 isBatchingUpdates 为 false , 所以能直接更新
     */
    componentDidMount() {
        this.setState({ val: this.state.val + 1 });
        console.log(this.state.val);    // 第 1 次 log  >>> 0

        this.setState({ val: this.state.val + 1 });
        console.log(this.state.val);    // 第 2 次 log  >>> 0

        setTimeout(() => {
            this.setState({ val: this.state.val + 1 });
            console.log(this.state.val);  // 第 3 次 log>>> 2

            this.setState({ val: this.state.val + 1 });
            console.log(this.state.val);  // 第 4 次 log>>> 3
        }, 0);
    }

    render() {
        return null;
    }
};