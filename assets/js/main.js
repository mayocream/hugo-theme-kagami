console.log(
  `
__          o      /___      
(_ |_  _     |  _  /  | __  | 
__)| |(_)|_|_| (_)/  _|_| | |<
        2021.08 by Mayo
`.trim()
)
document.body.style.opacity = '1'

import { html, render } from 'https://unpkg.com/lit-html?module'
import { wrapperTpl, headerTpl, navTpl, postsListTpl, postTpl, footerTpl } from './layout'

let siteData = await (await fetch('/index.json')).json()
let inited = window.inited

let pageDataURL = './index.json'
if (location.pathname == '/') {
  pageDataURL = '/posts/index.json'
}
let pageData = await (await fetch(pageDataURL)).json()
console.log(`Dispatch: `, window.location.pathname, ` Kind: `, pageData?.kind ?? 'unknown')

let page = {
  kind: pageData?.kind ?? inited.kind,
  title: pageData?.title ?? inited.siteTitle,
  posts: pageData?.posts ?? [],
  post: pageData?.isPost ? pageData : null,
}

let data = {
  site: {
    title: siteData.title,
    baseURL: siteData.baseURL,
  },
  pages: siteData.pages,
  page: page,
}

const template = (data) => html`
  ${wrapperTpl(html`
    ${navTpl(data.pages)} ${data.page.post ? postTpl(data.site, data.page) : ''}
    ${data.page.kind == 'section' ? html` ${headerTpl(data.site, data.page)} ${postsListTpl(data.page?.posts)} ` : ''}
  `)}
  ${footerTpl()}
`

// Render the template to the document
render(template(data), document.body)
