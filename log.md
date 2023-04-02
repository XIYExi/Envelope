# 开发问题汇总

## 2023-04-01 ~ 2023-04-07
- electron加壳
- 迅速封装antdv，整一个可视化撑场子
- 修改一些lowcode-engine，不知道哪里错了，目前无法运行
- 美化界面，提交文档组件，撑场面

## 2023-04-01 基本写完了主体工程
- 目前已经可以适配antd和semantic的ui系统，但是还不支持lole
- 出码系统只支持antd，semantic还没改，写起来也简单，只要把头文件和路径改一下就行
- 预览没写

## 2023-03-10 有趣的bug （尚未解决）
antd-absolute组件中Slider，任意值被修改之后都会覆盖marks，再localStorage中也不会实时保存，目测dva有问题，或者初始化函数有问题

## 2023-02-09 整合lowcode-engine报错
缺少@babel/generator约束


## 2023-02-01 React-Dnd冲突
dnd不允许使用styled-component包裹，全部改成less写


## 2023-01-06 ColorPicker不生效 （尚未解决）
选择的值不能传递给组件使用
