---
sidebar: auto
---

# blog

<!-- markdownlint-disable MD033 -->

- 先有通过统一的样式规范获得DOM

## demo

<Button />

```html
<button type="button" class="btn btn-outline-primary">Primary</button>
<button type="button" class="btn btn-outline-secondary">Secondary</button>
<button type="button" class="btn btn-outline-success">Success</button>
<button type="button" class="btn btn-outline-danger">Danger</button>
<button type="button" class="btn btn-outline-warning">Warning</button>
<button type="button" class="btn btn-outline-info">Info</button>
<button type="button" class="btn btn-outline-light">Light</button>
<button type="button" class="btn btn-outline-dark">Dark</button>
```
## 样式
 
采用BEM（Block__Element--modify）
- 还会有一些写法的推荐就先不写了
```html
<div class="q-panel q-panel--default">
    <div class="q-panel__header">
        
    </div>
    <div class="q-panel__body">
        
    </div>
</div>

<div class="q-panel q-panel--warning">
    <div class="q-panel__header">
        
    </div>
    <div class="q-panel__body">
        
    </div>
</div>
```
## react&vue

- 统一的参数设置方式 q-option 由Common 提供的构造函数生成，在构造函数中我们可以设置一些配置的默认值，项目进行中可以通过修改一些默认配置
- `q-width`,`q-height` 单独配置

```jsx

<q-panel q-option="" q-width="" q-height="">
   
</q-panel>

<Qpanel option="" width="" height="">
    
</Qpanel>

<Qpanel queOption="" width="" height="">
    
</Qpanel>
```