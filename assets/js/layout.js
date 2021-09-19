import { html } from 'https://unpkg.com/lit-html?module'
import { unsafeHTML } from 'https://unpkg.com/lit-html/directives/unsafe-html?module'
import { route } from './router'
const md = window.markdownit(window.markdownitFootnote)

const linkHandler = {
  handleEvent(e) {
    // e.preventDefault()
    const url = new URL(e.target.href)
    route(url.pathname)
  },
  capture: true,
}

export const wrapperTpl = (children) => html`
  <main class="page-content" aria-label="Content">
    <div class="wrapper">${children}</div>
  </main>
`

export const headerTpl = (site, page) => html`
  <header class="post-header">
    <a class="site-title" href="${site.baseURL}" @click=${linkHandler}>${site.title}</a>
    <h1 class="post-title" itemprop="name headline">${page.title}</h1>
  </header>
`

export const navTpl = (pages) => html`
  <nav class="site-nav">
    ${pages.map((item) => html` <a class="page-link" href="${item.uri}" @click=${linkHandler}>${item.title}</a> `)}
  </nav>
`

export const postTpl = (site, page) => html`
  <article class="page" lang="zh-Hans" itemscope itemtype="http://schema.org/BlogPosting">
    ${headerTpl(site, page)} ${unsafeHTML(md.render(page.post.content))}
  </article>
`

export const postsListTpl = (posts) => html`
  <ul class="post-list">
    ${posts.map(
      (item) => html`
        <li class="post-list-item" data-tags="${item?.tags && item.tags.join(' ')}">
          <!-- <div class="post-item-cover" style="background-image: url('{{ post.cover_url }}')"></div> -->
          <div class="post-item-label">
            <a class="post-item-link" href="${item.uri}" data-date="${item.date}" @click=${linkHandler}>
              ${item.title}
            </a>
            ${item.description?.length > 0 ? html` <p class="post-description">${item.description}</p> ` : ''}

            <div class="post-item-meta">
              ${dayjs(item.date).format('MMMM DD, YYYY')} / ${Math.round((item.wordCount + 250) / 250)} minute read
            </div>
          </div>
        </li>
      `
    )}
  </ul>
`

export const footerTpl = () => html`
<footer class="site-footer">

<div class="wrapper">
  <div class="social-links">
    <a class="social-link social-github" href="https://github.com/mayocream">
      <i class="icon-github"></i>
    </a>
    <!-- <a class="social-link social-twitter" href="https://twitter.com/{{ site.twitter_username }}">
      <i class="icon-twitter"></i>
    </a> -->
    <!-- <a class="social-link social-instagram" href="https://instagram.com/{{ site.instagram_username }}">
      <i class="icon-instagram"></i>
    </a> -->
    <a class="social-link social-rss" href="/index.xml" target="_blank">
      <i class="icon-rss"></i>
    </a>
  </div>
  <div class="credits">
    KAGAMI, made with <span style="font-size: 1.4em">♥</span> by Kamikat
  </div>
</div>

</footer>
`