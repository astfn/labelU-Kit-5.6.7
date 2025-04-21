原库地址：https://github.com/opendatalab/labelU-Kit

# 二开改动点

## 功能性

### 基础逻辑增强

1. 在 rect tool 中嵌入碰撞校验逻辑，发生碰撞后删除标注
2. 新增逆时针旋转逻辑（兼容原有 r 快捷键（顺时针旋转）的同时，完成 a + r 组合快捷键）
   - useRotateHotkeys
3. 拓展标注库实例方法，可以传入倍数进行缩放（实现 ui 交互的逐步放大/缩小功能）
   - rotateAccording2Multiples(multiple: number)
   - 新增对应功能快捷键（放大 alt+a 缩小 alt+z）
4. 支持配置画布背景色，并联动底部工具栏样式
   - config.backgroundColor
5. image-annotator-react  api 拓展
   1. 暴露 changeSample api，可在外部自定义更改标注图片的逻辑
   2. 顶部工具栏支持隐藏 hiddenToolbar（条件展示，而非条件渲染）
      * 之所以使用条件展示，是为了保留一些内置的基础路基，例如快捷键进行操作的回退和取消回退。而且，条件展示也有利于后续在 AnnotatorToolbar 中暴露一些实例方法。
   3. 侧边栏支持隐藏 hiddenSidebar (条件展示)
   4. 支持自定义渲染右侧面板的 footer 部分，并暴露 handleClear 方法 (attributePanelFooterRenderr)。
6. 如果没有配置任何标注工具，则自动把默认的鼠标样式禁用，包括兼容拖动图片后的鼠标样式重置逻辑。
   * 在 Axis 中鼠标拖动后 cursorManager 的初始化逻辑
   * 在 Axis 中侦听 _handleKeyUp 事件，cursorManager 的初始化逻辑

### 个性化需求改动

1. image-annotator-react 
   1. 组件的基础布局变更，满足自身需求
   2. 隐藏部分功能点
      1. 一些源码本身没有实现的快捷键（但操作手册组件中存在）
      2. 隐藏 LabelSection (功能：编辑标注的label，是一个可拖动的Modal)
         * 功能触发点
           * AttributePanel -> AsideAttributeItem -> AttributeAction （handleEditClick 方法）
           * ImageAnnotator.tsx（handleOpenAttributePanel 方法）
             * 对应快捷键：在标注框上 `鼠标右键+shift`
         * 功能底层 api 支持
           * Tool.decorator.ts （setAttributes 方法）
2. image 包中的内置的一些抛给用户的告警信息改成中文

## 其它

1. 在 image-annotator-react 暴露 Annotator 类型(TImagePackageAnnotator)，方便外部获取 engine 类型
2. image-annotator-react 暴露操作手册组件（ShortcutKeyOperationManual, ShortcutKeyOperationManualTooltip）
   * 并支持在外部自定义配置快捷键内容
