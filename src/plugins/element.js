import Vue from 'vue'
import {Form,FormItem,Input,Button,Message} from 'element-ui'

Vue.use(Button)     // 按钮组件
Vue.use(Form)       // 表单组件
Vue.use(FormItem)   // 表单项组件
Vue.use(Input)      // 输入框组件
Vue.prototype.$message = Message    // 消息提示组件
