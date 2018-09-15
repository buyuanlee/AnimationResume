
# 自动简历

## 项目介绍

### 一个可以自动播放书写过程简历，主要运用原生JS和CSS3的知识点。

### 用到的库：
1. **[prism][1]**       
2. **[marked][2]**

### 相关链接

1. **[预览点我][3]**
2. **[源码点我][4]**
   ![][a]

## 设计过程

### 基本思想—动起来

1. 想办法让文字逐个出现在页面中

   ```javascript
   setTimeout(()=>{
       document.body.innerHTML='1'
   },1000)
   setTimeout(()=>{
       document.body.innerHTML='2'
   },2000)
   setTimeout(()=>{
       document.body.innerHTML='3'
   },3000)
   ```


2. 成功了，但是有点傻，为何我们不试一试`setInterval`加上`slice()`或者`substring()`

   ```javascript
   var result = '1234567890'
   var n = 0
   setInterval(()=>{
       n += 1
       document.body.innerHTML = result.substring(0,n)
   },500)
   ```

   `slice()`和`substring()`的区别是，`substring()`不接受负的参数

3. 既要开始，也要结束。想办法取消闹钟

    ```javascript
    var result = '1234567890'
    var n = 0
    var clock = setInterval(()=>{
        n += 1
        document.body.innerHTML = result.substring(0,n)
       if(n>=result.length){
           window.clearInterval(clock)
       }
    },500)
    ```

### 换成CSS

1. 将内容换成CSS

    ```javascript
       var result = `
       body{
       background:green;
       }
       `
       var n = 0
       var clock = setInterval(()=>{
       n += 1
       document.body.innerHTML = result.substring(0,n)
      if(n>=result.length){
          window.clearInterval(clock)
      }
       },500)
    ```
   ```

   运行一下。黑人问号脸——我的换行没啦？？？

   这是因为在**HTML里面，连续出现多个看不见的字符，浏览器会认为它是一个空格**

2. 利用`<pre>`标签

      > HTML`<pre>`元素表示预定义格式文本。在该元素中的文本通常按照原文件中的编排，以等宽字体的形式展现出来，文本中的空白符（比如空格和换行符）都会显示出来。

   HTML中加入`<pre>`标签，将内容写到`<pre>`中

   ```html


   <body>
   <pre id="code"></pre>
   </body>
 
   ```

   ```javascript
   var result = `
   body{
       background:green;
   }
   `
   var n = 0
   var clock = setInterval(()=>{
       n += 1
       code.innerHTML = result.substring(0,n)
      if(n>=result.length){
          window.clearInterval(clock)
      }
   },100)
   ```

3. 应用代码

      现在我们只是将代码展示了出来，但是看到效果，所以我们要将代码写入到`<style>`中

    ```html
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>会动的简历</title>
      <style id="myStyle">
      </style>
    </head>
    <body>
    <pre id="code">
    </pre>
    </body>
    </html>
    ```
       
    ```javascript
    var result = `
    body{
        background:green;
    }
    `
    var n = 0
    var clock = setInterval(()=>{
        n += 1
        code.innerHTML = result.substring(0,n)
        myStyle.innerHTML = result.substring(0,n)
       if(n>=result.length){
           window.clearInterval(clock)
       }
    },500)
    ```

### 完善细节

1. 没效果？因为文字也写了进去

   解决办法-将除去CSS内容进行注释

   ```css
   /*你好，我是不远，一名前端工程师。
   请允许我做一个简单的自我介绍，但是文字太单调，所以我想来点特别的。
   首先我准备一下样式。
   */
   *{
   	transition: all 1s;
   }
   html{
   	background:#363636
   	color:#fff;
   	font-size:16px;
   }
   ```


1. 代码高亮？
首先会想到这样去解决，

    ```html
    <span style="color":red;>html</span>
    ```

   但是在CSS中这样的语法是不允许的。

   - 方法一:偷梁换柱

    ```javascript
         var n = 0
         var clock = setInterval(()=>{
             n += 1
             code.innerHTML = result.substring(0,n)
             code.innerHTML = code.innerHTML.replace('html','<span style="color:red;">html</span>')
             myStyle.innerHTML = result.substring(0,n)
            if(n>=result.length){
                window.clearInterval(clock)
            }
         },500)
    ```
     但是，很傻，很累，好的程序员要学会偷懒

   - 方法二：prism.js
     引入prism官网的JS和CSS文件后

     ```javascript
     var n = 0
     var clock = setInterval(() => {
         n += 1
         code.innerHTML = result.substring(0, n)
         code.innerHTML = Prism.highlight(code.innerHTML, Prism.languages.css)
         //修改code为prism提供的样式
         myStyle.innerHTML = result.substring(0, n)
         if (n >= result.length) {
             window.clearInterval(clock)
         }
     }, 50)
     ```

1. 代码高亮变化
我们需要让代码默认是平平无奇的样子，然后再增加高亮效果。这样活增加视觉的观赏性。
    - 设置默认样式
    我们需要在html中引入一个默认样式的css文件，内容是对代码的默认样式设置。

        ```CSS
        .token.selector{
            color: black;
        }
        .token.property{
            color: black;
        }
        .token.punctuation{
            color: black;
        }
        ```

    - 设置高亮样式

        ```CSS
         .token.selector{
          color: #a6e22e;
         }
         .token.property{
          color: #f92672;
         }
         .token.punctuation{
          color: #f8f8f2;
         }
        ```
          - 注意一：上面类的名称是根据prism提供的来的，审查元素可以看到名称

          - 注意二：CSS文件应放在引入的prism样式的下面，以免被覆盖


### 加入html元素

1. CSS运行结束，执行第二个函数，控制html；第三个函数控制html样式

   ```javascript
   var n = 0
   var clock = setInterval(() => {
   //原代码不变
   	if (n >= result.length) {
   		window.clearInterval(clock)
   		fn2()
           fn3()
       }
   }, 10)
   ```

2. 定义fn2()

   ```javascript
   function fn2(){
       var paper = document.createElement('div')
       paper.id = 'paper'
       document.body.appendChild(paper)
   }
   ```

3. 定义fn3()做一个左右结构，执行fn3(){}

   ```javascript
   function fn3(preResult) {
       var result = `
   #paper{
       width:200px;
       height:400px;
       background:#F1E2C3;
   }
       `
       var n = 0
       var clock = setInterval(() => {
           n += 1
           code.innerHTML = preResult + result.substring(0, n)
           code.innerHTML = Prism.highlight(code.innerHTML, Prism.languages.css)
           myStyle.innerHTML = preResult + result.substring(0, n)
           if (n >= result.length) {
               window.clearInterval(clock)
           }
       }, 10)
   }
   ```


### 封装函数

1. 封装函数

 ```javascript
   /*把code写到#code和style标签里面*/
   function writeCode(code){
       let domCode = document.querySelector('#code')
       let n = 0
       var clock = setInterval(() => {
           n += 1
           domCode.innerHTML = Prism.highlight(code.substring(0, n), Prism.languages.css)
           myStyle.innerHTML = code.substring(0, n)
           if (n >= code.length) {
               window.clearInterval(clock)
           }
       }, 10)
   }
   //封装
   var result = `......`
   writeCode(cssCode)
   //调用(原result内容)
 ```

2. 回调函数

   封装完毕后，当我们想紧接调用`f2()`时，又尴尬了。因为`setInterval()`是一个闹钟（异步），所以在设置好闹钟之后，就会立即执行`f2()`,可是正确的执行逻辑是在`code`写完之后再调用`f2()`

   - **不等结果**就是**异步**

   - **回调**是拿到异步结果的一种方式（也可以拿到同步结果）

3. 防止覆盖之前的代码，我们增加一个参数`prefix`

   ```javascript
   function writeCode(prefix,code,fn){
   //....
           }
       }, 10)
   }
   ```

4. 调用函数

   第一次调用的时候由于之前没有内容，所以我们`prefix`为`''`

   ```javascript
   function writeCode(prefix, code, fn) {
       let domCode = document.querySelector('#code')
       let n = 0
       var clock = setInterval(() => {
           n += 1
           domCode.innerHTML = Prism.highlight(prefix + code.substring(0, n), Prism.languages.css)
           myStyle.innerHTML = prefix + code.substring(0, n)
           if (n >= code.length) {
               window.clearInterval(clock)
               fn.call()
           }
       }, 10)
   }
   ```

   调用函数

   ```javascript
   writeCode('', cssCode, () => {
       createPaper(() => {
           writeCode(cssCode, htmlCode)
       })
   })
   ```

### 继续优化细节

1. 优化代码展示窗口，使其和展示窗口一样高；在defulf.css里设置为

   ```css
   #code{
       height: 100vh;
       overflow: hidden;
   }
   ```

2. 自动滚动代码至底部，再封装的函数内增加代码

 ```javascript
   function writeCode(prefix, code, fn) {
   //...
           domCode.scrollTop=domCode.scrollHeight
   //...        
       }, 10)
   }
 ```

   > `Element.scrollTop` 属性可以获取或设置一个元素的内容垂直滚动的像素数。

3. `scrollIntoView()`方法：

   如果展示窗口设置的是`overflow: auto;`或者`overflow: scroll;`会自动拉到底部

   ```javascript
   Element.scrollIntoView(false)
   ```

   **`element.scrollIntoView(false)`为滚动至底部**

   **`element.scrollIntoView(true)`为滚动至顶部**

   其他参数：

   - `behavior` 可选

     定义缓动动画， `"auto"`, `"instant"`, 或 `"smooth"` 之一。默认为 `"auto"`。

   - `block` 可选

     `"start"`, `"center"`, `"end"`, 或 `"nearest"`之一。默认为 `"center"`。

   - `inline` 可选

     `"start"`, `"center"`, `"end"`, 或 `"nearest"`之一。默认为 `"nearest"`。

     ```javascript
     element.scrollIntoView({behavior: "instant", block: "end", inline: "nearest"});
     ```


### 增加简历展示页

编写JS增加编写简历内容的展示窗口。与代码展示窗口类似

```javascript
function writeMarkdown(markdown, fn) {
    let domPaper = document.querySelector('#paper')
    let n = 0
    var clock = setInterval(() => {
        n += 1
        domPaper.innerHTML = Prism.highlight(markdown.substring(0, n), Prism.languages.markdown)
        domPaper.scrollIntoView({behavior: "instant", block: "end", inline: "nearest"})
        if (n >= markdown.length) {
            window.clearInterval(clock)
            fn.call()
        }
    }, 10)
```

### 变成markdown语法

利用第三方库**[marked.js][2]**

```javascript
    document.querySelector('#paper').innerHTML = marked(markdown)
    fn.call()
}
```



写到这里基本就结束了，剩下的就是异步函数调用的顺序了。然后再慢慢的修改CSS样式。就可以大工完成了 

[1]: https://prismjs.com/
[2]: https://marked.js.org/
[3]: https://buyuanwanli.github.io/AnimationResume/index.html
[4]: https://github.com/buyuanwanli/AnimationResume
[a]: http://91jean.oss-cn-hangzhou.aliyuncs.com/18-9-15/24224356.jpg

**——远方不远**




