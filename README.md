原库地址：https://github.com/opendatalab/labelU-Kit

# 二开改动点

## 功能性

### 基础逻辑增强

1. 在 rect tool 中嵌入碰撞校验逻辑，发生碰撞后删除标注
2. 新增逆时针旋转逻辑（兼容原有 r 快捷键（顺时针旋转）的同时，完成 a + r 组合快捷键）
   - useRotateHotkeys
3. 拓展标注库实例方法，可以传入倍数进行缩放（实现 ui 交互的逐步放大/缩小功能）
   - rotateAccording2Multiples(multiple: number)
4. 支持配置画布背景色，并联动底部工具栏样式
   - config.backgroundColor
5. image-annotator-react  api 拓展
   1. 暴露 changeSample api，可在外部自定义更改标注图片的逻辑
   2. 顶部工具栏支持隐藏 hiddenToolbar（条件展示，而非条件渲染）
      * 之所以使用条件展示，是为了保留一些内置的基础路基，例如快捷键进行操作的回退和取消回退。而且，条件展示也有利于后续在 AnnotatorToolbar 中暴露一些实例方法。
   3. 侧边栏支持隐藏 hiddenSidebar (条件展示)
   4. 支持自定义渲染右侧面板的 footer 部分，并暴露 handleClear 方法 (attributePanelFooterRenderr)。

### 个性化需求改动

1. image-annotator-react 组件的基础布局变更，隐藏部分功能点，满足自身需求
2. image 包中的内置的一些抛给用户的告警信息改成中文

## 其它

1. 在 image-annotator-react 暴露 Annotator 类型(TImagePackageAnnotator)，方便外部获取 engine 类型
2. image-annotator-react 暴露操作手册组件（ShortcutKeyOperationManual, ShortcutKeyOperationManualTooltip）
   * 隐藏源码并没有没有实现的快捷键功能
   * 隐藏除了 rect 的工具快捷键展示（个人需求）
