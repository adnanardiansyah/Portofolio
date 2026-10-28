const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const projects = JSON.parse(fs.readFileSync(path.join(root, 'projects-data.json'), 'utf8'));
const escape = value => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
const ids = new Set();
const link = (url, label) => {
  const parsed = new URL(url);
  if (parsed.protocol !== 'https:') throw new Error('Project links must use HTTPS');
  return `<a href="${escape(url)}" target="_blank" rel="noopener noreferrer">${label} <span aria-hidden="true">↗</span></a>`;
};
const cards = projects.map((project, index) => {
  if (!/^[a-z0-9-]+$/.test(project.id) || ids.has(project.id)) throw new Error('Invalid or duplicate project id');
  ids.add(project.id);
  if (!project.name || !project.summary || !Array.isArray(project.technologies) || !/^[a-z ]+$/.test(project.category)) throw new Error('Incomplete project');
  return `<article class="proj-card" id="project-${project.id}" data-category="${escape(project.category)}" aria-labelledby="title-${project.id}">
  <div class="project-preview project-cover" aria-hidden="true">
    <div class="project-cover-orbit"></div><span class="project-cover-index">${String(index + 9).padStart(2, '0')} / PROJECT</span>
    <span class="project-cover-mark">${escape(project.mark)}</span><span class="project-cover-label">${escape(project.label)}</span>
  </div>
  <div class="project-body">
    <div class="font-mono">${escape(project.label)}</div>
    <h3 id="title-${project.id}" class="font-serif mt-2 mb-3">${escape(project.name)}</h3>
    <p>${escape(project.summary)}</p>
    <div class="project-tags flex flex-wrap">${project.technologies.map(technology => `<span>${escape(technology)}</span>`).join('')}</div>
    <div class="project-actions flex border-t">${project.demo ? link(project.demo, 'Lihat Demo') : ''}${link(project.repository, 'GitHub')}</div>
  </div>
</article>`;
}).join('\n');
const file = path.join(root, 'projects.html');
let html = fs.readFileSync(file, 'utf8');
const region = /<!-- GENERATED PROJECTS START -->[\s\S]*?<!-- GENERATED PROJECTS END -->/;
if (!region.test(html)) throw new Error('Generated project region not found');
html = html.replace(region, () => `<!-- GENERATED PROJECTS START -->\n${cards}\n<!-- GENERATED PROJECTS END -->`);
const total = (html.match(/class="proj-card\b/g) || []).length;
html = html.replace(/(id="projectCount"[^>]*>)[^<]*/, (_, prefix) => `${prefix}${total} proyek`);
fs.writeFileSync(file, html);
console.log(`Rendered ${projects.length} additional projects; ${total} projects in total.`);
