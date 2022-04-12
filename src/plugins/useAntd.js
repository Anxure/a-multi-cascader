import Vue from 'vue'
import {
  Breadcrumb,
  Dropdown,
  Descriptions,
  Menu,
  Button,
  Layout,
  Icon,
  Form,
  Input,
  Tabs,
  Card,
  Cascader,
  Tooltip,
  AutoComplete,
  Row,
  Col,
  Radio,
  Slider,
  Divider,
  InputNumber,
  Checkbox,
  FormModel,
  Drawer,
  Modal,
  message,
  notification,
  ConfigProvider,
  Select,
  Tag,
  Tree,
  TreeSelect,
  // RangePicker,
} from 'ant-design-vue'
const {
  Header: LayoutHeader,
  Content: LayoutContent,
  Sider: LayoutSider
} = Layout
const { Group: RadioGroup, Button: RadioButton } = Radio
const { Item: FormItem } = Form
const { Item: FormModelItem } = FormModel
const antdComponents = [
  Breadcrumb,
  Descriptions,
  Dropdown,
  Menu,
  Button,
  Icon,
  Layout,
  Form,
  Input,
  FormItem,
  FormModel,
  FormModelItem,
  LayoutHeader,
  LayoutSider,
  LayoutContent,
  Tabs,
  Tag,
  Card,
  Tooltip,
  AutoComplete,
  Row,
  Col,
  Radio,
  RadioGroup,
  RadioButton,
  Slider,
  Divider,
  Modal,
  InputNumber,
  Checkbox,
  Cascader,
  Tooltip,
  Drawer,
  ConfigProvider,
  Select,
  Tree,
  TreeSelect,

  // RangePicker,
]
Vue.prototype.$confirm = Modal.confirm
Vue.prototype.$message = message
Vue.prototype.$notification = notification
// 不要使用vue.component注册
antdComponents.forEach(com => {
  Vue.use(com)
})
