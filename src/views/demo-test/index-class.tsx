import React, { PureComponent } from "react"

// 测试类组件的TypeScript语法类型
interface IProps {
  name: string
  age?: number
}

interface IState {
  message: string
  count: number
}

class IndexClass extends PureComponent<IProps, IState> {
  state = {
    message: "Hello, world!",
    count: 100
  }

  // constructor(props: IProps) {
  //   super(props)
  //   this.state = {
  //     message: "Hello, world!",
  //     count: 100
  //   }
  // }

  render(): React.ReactNode {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h4>
          {this.props.name}-{this.props.age}
        </h4>
        <h4>
          {this.state.message}-{this.state.count}
        </h4>
      </div>
    )
  }
}

export default IndexClass
