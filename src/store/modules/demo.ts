import { PayloadAction, createSlice } from "@reduxjs/toolkit"

//  initialState会进行类型推导，对于state无法指定的类型 也可以自己定义类型
interface IState {
  count: number
  message: string
}

const initialState: IState = {
  count: 10,
  message: "Hello Redux"
  // 其他不明确类型
}

// 测试demo
const demoSlice = createSlice({
  name: "demo",
  initialState,
  reducers: {
    changeMessageAction(state, action: PayloadAction<string>) {
      // action也有类型推导， action参数类型为 PayloadAction<string>
      state.message = action.payload
    }
  }
})

export const { changeMessageAction } = demoSlice.actions

export default demoSlice.reducer
