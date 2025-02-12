原库地址：https://github.com/opendatalab/labelU-Kit

二开改动点：

1. 在 rect tool 中嵌入碰撞校验逻辑，发生碰撞后删除标注
2. 新增逆时针旋转逻辑（兼容原有 r 快捷键（顺时针旋转）的同时，完成 a + r 组合快捷键）
   * useRotateHotkeys
3. 拓展标注库实例方法，可以传入倍数进行缩放（实现 ui 交互的逐步放大/缩小功能）
   * rotateAccording2Multiples(multiple: number)
4. 支持配置画布背景色，并联动底部工具栏样式
   * config.backgroundColor
5. image-annotator-react 组件的基础布局变更，隐藏部分功能点，满足自身需求

