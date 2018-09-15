!function () {
// var cssCode = window.cssCode
// var htmlCode = window.htmlCode
// var changeCode = window.changeCode
// var markdown = window.markdown
// var conclusion = window.conclusion

    writeCode('', cssCode, () => {
        createPaper(() => {
            writeCode(cssCode, htmlCode, () => {
                writeMarkdown(markdown, () => {
                    writeCode(cssCode + htmlCode, changeCode, () => {
                        convertMarkdownToHtml(() => {
                            writeCode(cssCode + htmlCode + changeCode, conclusion, () => {
                            })
                        })
                    })
                })
            })
        })
    })

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
        document.querySelector('#paper').innerHTML =
        Prism.highlight(marked(markdown).substring(0, n), Prism.languages.markdown)
        fn.call()
    }
}.call()
