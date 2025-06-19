原库地址：https://github.com/opendatalab/labelU-Kit

# 二开改动点

## 功能性

### 基础逻辑增强

1. 在 rect tool 中嵌入碰撞校验逻辑，发生碰撞后删除标注

2. 新增逆时针旋转逻辑（兼容原有 r 快捷键（顺时针旋转）的同时，完成 a + r 组合快捷键）
   
   - useRotateHotkeys
   
3. 拓展标注库实例方法，可以传入倍数进行缩放（实现 ui 交互的逐步放大/缩小功能）
   - rotateAccording2Multiples(multiple: number)
   - 新增对应功能快捷键（放大 alt+q 缩小 alt+z）
   
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
   
7. disabled 功能

   结合自带的 requestEdit 功能，与之前实现的鼠标样式禁用逻辑实现目标功能

   支持在 config (AnnotatorOptions) 中配置 disableCursor 禁用鼠标样式

   关于 requestEdit：分为两层配置

     		1. 最底层在工具链源码的基础工具类 packages/image/src/tools/Tool.ts 中
          * 存在逻辑缺失：我通过在标注基础工具类 Tool 中添加 onBeforeAnnotationSelect 方法，统一处理选中标注的前置拦截，在各个标注工具子类的 onSelect 中调用，防止后续开启使用其它的标注工具时，逻辑有缺失 。
       		2. 最外层在 ImageAnnotator (react 组件) 的 props 中，最终会被合并进入 config 中，但是在 ImageAnnotator 相关的 react 组件中，访问的都是 ImageAnnotator props 中的 requestEdit。也就是说如果你使用 ImageAnnotator 组件时，只在 config 中配置了 requestEdit，并没有配置在 props 中。那么效果只会体现在底层的图片标注工具上，而 ImageAnnotator 在包含底层的标注工具同时，也做了一些其它的功能，例如右侧的 AttributePanel 也包含编辑操作，并且 LabelSection 还支持设置编辑的属性，这里也是为什么还要在最外层 ImageAnnotator 组件的 props 中配置 requestEdit 的原因，因为观察类型 ImageAnnotatorProps 可以发现相对于底层工具链中的 requestEdit 拓展了一个参数（也就是刚刚提到的支持设置编辑的属性 modifiedProperty），而这个参数的拓展是基于工具链底层的 requestEdit 方法，也就是说最外层组件中的 requestEdit 相当于对最底层的 requestEdit 方法进行了包裹（功能增强），最终合并进入 config 中（最终会被传入到最底层的工具类中）后，并不会对最底层的功能造成影响。
          * 这个设计也是个小巧思
          * 逻辑缺失：当 requestEdit 的结果是 false 时，应该取消渲染编辑的按钮（最初源代码只禁用了按钮点击的逻辑） 

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
         
      3. 创建第一个标注图形时，右侧面板中的 CollapseWrapper 自动展开对应的标签

         注意点：sortedImageAnnotations 更新时机：除了新增、删除、编辑标注图形之外。选中某个标注图形时(进入编辑状态)，即便没有进行任何操作，sortedImageAnnotations 也会更新，从而导致相关逻辑再次执行。
2. image 包中的内置的一些抛给用户的告警信息改成中文

## 其它

1. 在 image-annotator-react 暴露 Annotator 类型(TImagePackageAnnotator)，方便外部获取 engine 类型
2. image-annotator-react 暴露操作手册组件（ShortcutKeyOperationManual, ShortcutKeyOperationManualTooltip）
   * 并支持在外部自定义配置快捷键内容
