import markdownIt from "markdown-it"
import hljs from "highlight.js"
import emoji from "markdown-it-emoji"
export const md: markdownIt = new markdownIt({
    html: false,
    linkify: true,
    typographer: true,
    langPrefix: 'language-',
    quotes: '“”‘’',
    highlight: (str, lang) => {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return '<pre class="hljs"><code>' +
                    hljs.highlight(lang, str, true).value +
                    '</code></pre>';
            } catch (__) { }
        }

        return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>'
    }
}).use(emoji)
