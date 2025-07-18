module.exports = (entry, html)=>{
  const v = Date.now()
  entry.frameworkJs = [
    `/env.js?_v=${v}`,
    `/version.js?_v=${v}`,
    `/common.js?_v=${v}`
  ];

  html = html.replace('<!-- FrameworkJs -->', entry.frameworkJs.map(src=>`<script src="${src}"></script>`).join('\n'))
  html = html.replace('<!-- ProjectCss -->', entry.css.map(src=>`<script src="${src}"></script>`).join('\n'))
  html = html.replace('<!-- ProjectJs -->', entry.js.map(src=>`<script src="${src}"></script>`).join('\n'))

  return html;
}