const toggle=document.querySelector('.nav-toggle');const links=document.querySelector('.nav-links');if(toggle&&links){toggle.addEventListener('click',()=>links.classList.toggle('open'));}
const current=location.pathname.split('/').pop()||'index.html';document.querySelectorAll('.nav-links a').forEach(a=>{const href=a.getAttribute('href');if(href===current||(current.startsWith('project-')&&href==='projects.html'))a.classList.add('active');});
const header=document.querySelector('.header');const topBtn=document.querySelector('.back-top');function onScroll(){if(header)header.classList.toggle('scrolled',scrollY>10);if(topBtn)topBtn.classList.toggle('show',scrollY>500);}document.addEventListener('scroll',onScroll);onScroll();if(topBtn)topBtn.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));
const observer=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible');});},{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));


function trackPortfolioEvent(eventName, params){
  if (typeof gtag === 'function') {
    gtag('event', eventName, params || {});
  }
}

document.addEventListener('click', function(e){
  const a = e.target.closest('a');
  if(!a) return;
  const href = a.getAttribute('href') || '';
  const text = (a.textContent || '').trim();
  if(href.includes('chrys-resume.pdf')){
    trackPortfolioEvent('resume_download_click', {link_text:text, page_path:location.pathname});
  }
  if(href.startsWith('mailto:')){
    trackPortfolioEvent('contact_email_click', {link_text:text, page_path:location.pathname});
  }
  if(href.startsWith('project-')){
    const projectName = href.replace('project-','').replace('.html','').replace(/-/g,'_');
    trackPortfolioEvent('case_study_click', {project_name:projectName, link_text:text, page_path:location.pathname});
  }
  if(a.classList.contains('btn')){
    trackPortfolioEvent('primary_cta_click', {link_text:text, link_url:href, page_path:location.pathname});
  }
});
