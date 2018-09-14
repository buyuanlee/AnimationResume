/*把code写到#code和style标签里面*/
function writeCode(prefix, code, fn) {
    let domCode = document.querySelector('#code')
    let n = 0
    var clock = setInterval(() => {
        n += 1
        domCode.innerHTML = Prism.highlight(prefix + code.substring(0, n), Prism.languages.css)
        myStyle.innerHTML = prefix + code.substring(0, n)
        domCode.scrollIntoView({behavior: "instant", block: "end", inline: "nearest"})
        if (n >= code.length) {
            window.clearInterval(clock)
            fn.call()
        }
    }, 10)
}

var cssCode = `
/*你好，我是不远，一名前端工程师。
请允许我做一个简单的自我介绍，但是纯文字太单调，所以我想来点特别的。
首先我准备一下样式。*/
*{
	transition: all .5s;
}
/*白色伤眼睛，来点暗色系的背景吧！*/
html{
	background:#363636;
}
/*让我们给它加一个边框吧，让它看起来不那么拥挤*/
#code{
    border:3px solid #28A79A;
    padding:20px;
    border-radius:5px;
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
    transform: skew(0deg 2deg)
}
/*现在开始写简历吧*/
/*首先我需要一张白纸*/
`
var htmlCode = `
#code{
    position: fixed;
    left: 0;
    width: 50%;
}
#paper{
    position: fixed;
    right: 0;
    width: 50%;
    height: 95%;
    background:#F1E2C3;
    padding:20px;
    border:3px solid #28A79A;
    border-radius:5px;
}
`
var markdown = `
# 简历
## 姓名：不远
## 年龄：18
## 联系电话：1755729XXXX
## 基技能介绍
1 吃
2 喝
3 嫖
4 赌
`
var changeCode = `
/*这样看起来很不舒服？让我们把markdown转换成更易读的显示方式吧*/
`
var conclusion = `
/*好了，这个就是我的简历了。如果您对我还算满意或者想要更多了解的话，请联系我哦*/
`
writeCode('', cssCode, () => {
    createPaper(() => {
        writeCode(cssCode, htmlCode, () => {
            writeMarkdown(markdown, () => {
                writeCode(cssCode + htmlCode, changeCode, () => {
                    convertMarkdownToHtml(() => {
                        writeCode(cssCode + htmlCode + changeCode, conclusion)
                    })
                })
            })
        })
    })
})


function createPaper(fn) {
    var paper = document.createElement('pre')
    paper.id = 'paper'
    document.querySelector('#box').appendChild(paper)
    fn.call()
}

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

}

function convertMarkdownToHtml(fn) {
    document.querySelector('#paper').innerHTML = marked(markdown)
    fn.call()
}