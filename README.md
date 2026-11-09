# 范希言的个人主页

一个纯静态个人主页，聚焦 AI Agent、大模型应用、平台接入和项目实践。

## 本地预览

```bash
python3 -m http.server 8080
```

打开 `http://localhost:8080`。

设计微调模式：打开 `http://localhost:8080/?edit=1`，页面中的正文可以直接编辑。编辑只存在于当前浏览器中，不会写回文件。

## 技术

- 原生 HTML、CSS、JavaScript
- [Pretext](https://github.com/chenglou/pretext) 负责正文的动态高度计算
- GitHub Pages 部署
- 无跟踪脚本，无第三方字体请求

## 隐私

页面只公开姓名、学校专业、公开项目、邮箱和 GitHub。手机号不进入仓库和网站。
