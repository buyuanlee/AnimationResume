!function () {
    var cssCode = window.cssCode = `
/*你好，我是不远，一名前端工程师。
请允许我做一个简单的自我介绍，但是纯文字太单调，所以我想来点特别的。
首先我准备一下样式。*/
*{
	transition: all .5s;
}
/*白色伤眼睛，来点暗色系的背景吧！*/
html{
	background: #333034;
}
/*让我们给它加一个边框吧*/
#code{
    border: 2px solid #00FF1B;
    padding: 20px;
}
/*代码看不清楚？来点高亮吧！*/
.token.selector{
    color: #a6e22e;
}
.token.property{
    color: #f92672;
}
.token.punctuation{
    color: #f8f8f2;
}
.token.function{
    color: red;
}
#code{
    color: #f8f8f2;
}
/*来点动画吧*/
#code{
    animation: breath 4s linear infinite;
}
/*现在开始写简历吧*/
/*首先我需要一张纸*/
`;
    var htmlCode = window.htmlCode = `
#code{
    display: inline-block;
    position: fixed;
    right: 0;
    width: 50%;
    height: 80%;
    margin-right: 20px;
}
#paper{
    position: fixed;
    left: 0;
    width: 45%;
    height: 80%;
    background: linear-gradient(to bottom, #f4f39e, #f5da41); 
    padding: 20px;
    margin-left: 20px;
    box-shadow: 0 2px 10px 1px rgba(0, 0, 0, 0.8);
    box-shadow: 0 2px 10px 1px rgba(0, 0, 0, 0.8);
    text-shadow: 0 1px 0 #F6EF97;
    margin-top: 30%;
    
}
/*掉下去了！怎么办？*/
/*没关系，再用胶带粘住它*/
#paper:after {
    width: 25%;
    height: 5%;
    content: " ";
    margin-left: -90px;
    border: 1px solid rgba(200, 200, 200, .8);
    background: rgba(254, 254, 254, .6);
    box-shadow: 0px 0 3px rgba(0, 0, 0, 0.1);
    transform: rotate(-5deg);
    position: absolute;
    left: 50%;
    top:-15px;
}
#paper{
    margin-top: 0;
}
`;
    var markdown = window.markdown = `
# 个人简历

### 基本信息
- **姓名**：李建伟
- **性别**：男
- **出生日期**：1995
- **目标职位**：前端工程师

### 联系方式：
- **手机**：17557290656	
- **邮箱**：buyuanwanli@foxmail.com
- **QQ**：152927520
- **微信**: ecjean

### 技能描述
- **小程序制作**
  - 可以独立进行小程序开发，了解基本相关API或组件的使用
- **Vue**
  - 熟悉Vue的常用功能，如组件、Vue-Router、双向绑定等
- **jQuery**
  - 熟悉jQuery的常用API，能使用jQuery制作网站、轮播、Tap组件等
- **HTML5**&CSS3
  - 能独立制作精美网页，掌握CSS3动画，过渡效果、响应式等常用技术
- **移动端页面**
  - 会使用REM、vw/vh、FastClick等技术制作适配手机设备的页面
- **前端框架**
  - 理解MVC、MVVM等思想，可以熟练使用相关的库，如Vue、React

### 教育经历
- 安徽大学江淮学院
  - 电子商务专业

### 项目展示
- 作品一
- 作品二
- 作品散
`;
    var changeCode = window.changeCode = `
/*这样看起来很不舒服？让我们把markdown转换成更易读的显示方式吧*/
`;
    var conclusion = window.conclusion = `
/*好了，这个就是我的简历了。如果您对我还算满意或者想要更多了解的话，请联系我哦*/
`
}.call();
