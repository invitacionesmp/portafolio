const seq = (p,e,n) => Array.from({length:n}, (_,i) => `assets/img/${p}-${String(i+1).padStart(2,'0')}.${e}`);
const works = [
  {cat:'Spots publicitarios', title:'Spot para redes', desc:'Video corto para anunciar un producto o servicio en redes y pantallas: ritmo ágil, textos animados y cierre con llamado a la acción.', video:'assets/video/video-01.mp4', c:['#ff5c93','#2c1f55']},
  {cat:'Spots publicitarios', title:'Spot para redes', desc:'Video publicitario pensado para captar la atención en los primeros segundos y llevar al cliente a escribir por WhatsApp.', video:'assets/video/video-02.mp4', c:['#ffd166','#5a3d99']},
  {cat:'Flyers', title:'Odontología de Excelencia', desc:'Campaña para un consultorio odontológico: limpieza y blanqueamiento LED, implantes dentales y turnos disponibles, con llamados claros a confirmar por WhatsApp.', imgs:seq('dentista','jpeg',4), c:['#5a3d99','#2c6bd6']},
  {cat:'Flyers', title:'Ferretería El Martillo', desc:'Promociones de herramientas, catálogo de productos y campaña por el Día del Padre, con jerarquía clara y colores de alto contraste.', imgs:seq('ferreteria','jpg',4), c:['#ffd166','#ff5c93']},
  {cat:'Flyers', title:'Insecor · Alquiler y cables', desc:'Serie vertical para historias y estados: alquiler de hidroelevadora, maquinaria y autoelevador, y línea de cables con sus normas técnicas.', imgs:seq('insecor','jpeg',7), c:['#2c1f55','#e8590c']},
  {cat:'Flyers', title:'Piscinas a medida', desc:'Pieza para presentar el servicio de construcción de piscinas, con foto protagonista y contacto directo.', imgs:['assets/img/piletas-01.jpeg'], c:['#2c6bd6','#5ad1d1']},
  {cat:'Flyers', title:'Pastelería Dulces Delicias', desc:'Flyer para pedidos de postres y catálogo de tortas, con paleta rosa y fotografía que da antojo.', imgs:seq('pasteleria','jpg',2), c:['#ff5c93','#ffd166']},
  {cat:'Flyers', title:'Che Corrientes · Radio', desc:'Piezas para promocionar un programa en vivo y un taller de radio, con tipografía amarilla grande sobre fondo oscuro.', imgs:seq('radio','jpeg',2), c:['#2c1f55','#ffd166']},
  {cat:'Flyers', title:'Inflables Mi Sueño', desc:'Flyer colorido para alquiler de peloteros y castillos inflables, con los datos de pedido bien visibles.', imgs:['assets/img/publicidad-01.jpeg'], c:['#ff5c93','#5ad1d1']},
  {cat:'Logos', title:'Inari Telones', desc:'Logotipo con tres círculos de colores cálidos y tipografía limpia.', imgs:['assets/img/logo-01.jpeg'], c:['#ffd166','#ff5c93']},
  {cat:'Logos', title:'Maestra Particular', desc:'Isotipo de manzana con el nombre integrado, simple y fácil de recordar.', imgs:['assets/img/logo-02.jpeg'], c:['#2c1f55','#5a3d99']},
  {cat:'Logos', title:'Dulces Delicias', desc:'Logotipo con letra caligráfica y paleta rosa para una pastelería.', imgs:['assets/img/logo-03.jpeg'], c:['#ff5c93','#5a3d99']},
  {cat:'Stickers', title:'Pack de stickers · Odontología', desc:'Mascota 3D con mensajes para WhatsApp: agendar cita, turno confirmado y más, pensados para conversar con los pacientes.', imgs:seq('stickers','jpeg',4), c:['#5a3d99','#5ad1d1']},
  {cat:'Invitaciones', title:'Video Invitación Temática · Spider-Man', desc:'Animación en video con efectos visuales y temática del Hombre Araña. Una pieza impactante y dinámica, ideal para sorprender a los más chicos y compartir por redes o WhatsApp.', video:'assets/video/boda.mp4', c:['#ff5c93','#5a3d99']},
  {cat:'Invitaciones', title:'Invitación Interactiva · XV Años', desc:'Invitación web programada a medida (HTML, CSS y JS). Incluye reproductor de música propio, cuenta regresiva y botones para confirmar asistencia, todo adaptado a la pantalla del celular.', video:'assets/video/cumple.mp4', c:['#ffd166','#ff5c93']},
  {cat:'Invitaciones', title:'Invitación Interactiva · Primer Añito', desc:'Tarjeta digital interactiva enviada directamente por WhatsApp. Desarrollada con código para que los invitados puedan ver fotos, leer los detalles y confirmar su asistencia con un solo clic desde el móvil.', video:'assets/video/corporativo.mp4', c:['#2c1f55','#5a3d99']},
];

const $ = s => document.querySelector(s), track = $('#track'), dots = $('#dots');
let list = works;

function media(w){
  const bg = `linear-gradient(150deg,${w.c[0]},${w.c[1]})`;
  let inner;
  if (w.video) inner = `<div class="gal"><video src="${w.video}" muted loop playsinline preload="metadata" onerror="this.remove()"></video></div><button class="snd" aria-label="Activar sonido">🔇</button>`;
  else {
    const n = w.imgs.length;
    inner = `<div class="gal">${w.imgs.map((s,k) => `<img src="${s}" alt="${w.title} (${k+1} de ${n})" loading="lazy" tabindex="0" role="button">`).join('')}</div>` +
      (n > 1 ? `<button class="g-btn g-prev" aria-label="Imagen anterior">‹</button><button class="g-btn g-next" aria-label="Imagen siguiente">›</button><span class="g-count"></span><div class="g-dots">${w.imgs.map(() => '<i></i>').join('')}</div>` : '');
  }
  return `<div class="media" style="background:${bg}">${inner}</div>`;
}
function gmark(g){
  const w = g.clientWidth; if (!w) return;
  const m = g.parentNode, n = g.children.length, i = Math.min(n-1, Math.round(g.scrollLeft / w));
  m.querySelectorAll('.g-dots i').forEach((d,k) => d.classList.toggle('on', k===i));
  const c = m.querySelector('.g-count'); if (c) c.textContent = `${i+1}/${n}`;
}
const markAll = () => track.querySelectorAll('.gal').forEach(gmark);
const vio = new IntersectionObserver(es => es.forEach(e => {
  const v = e.target; if (e.isIntersecting) v.play().catch(()=>{}); else v.pause();
}), {threshold:.6});
function render(){
  track.innerHTML = list.map((w,i) => `<article class="slide" data-i="${i}">${media(w)}<h3>${w.title}</h3><span class="cat">${w.cat}</span><p>${w.desc}</p></article>`).join('');
  dots.innerHTML = list.map(() => '<i></i>').join('');
  track.scrollTo({left:0}); mark();
  markAll(); requestAnimationFrame(markAll);
  track.querySelectorAll('video').forEach(v => vio.observe(v));
}
const step = () => (track.querySelector('.slide')?.offsetWidth || 300) + 24;
function mark(){
  const n = track.querySelectorAll('.slide').length; if (!n) return;
  const i = Math.min(n-1, Math.round(track.scrollLeft / step()));
  dots.querySelectorAll('i').forEach((d,k) => d.classList.toggle('on', k===i));
  $('#prev').disabled = track.scrollLeft < 4;
  $('#next').disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
}
$('#next').onclick = () => track.scrollBy({left:step(), behavior:'smooth'});
$('#prev').onclick = () => track.scrollBy({left:-step(), behavior:'smooth'});
track.addEventListener('scroll', e => e.target.classList.contains('gal') ? gmark(e.target) : mark(), {passive:true, capture:true});
track.addEventListener('keydown', e => {
  if (e.target !== track) return;
  if (e.key==='ArrowRight') $('#next').click();
  if (e.key==='ArrowLeft') $('#prev').click();
});
document.querySelectorAll('.chip').forEach(b => b.onclick = () => {
  document.querySelectorAll('.chip').forEach(x => x.classList.remove('on'));
  b.classList.add('on');
  list = b.dataset.f==='Todos' ? works : works.filter(w => w.cat===b.dataset.f);
  addEventListener('load', () => { markAll(); mark(); });
addEventListener('resize', () => { markAll(); mark(); });
render();
});
document.querySelectorAll('.marq div').forEach(d => d.textContent = d.dataset.t.repeat(8));
const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && e.target.classList.add('in')), {threshold:.12});
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

const glow = $('#glow');
addEventListener('mousemove', e => glow.style.transform = `translate(${e.clientX}px,${e.clientY}px)`);
addEventListener('load', () => setTimeout(() => $('#loader').classList.add('done'), 900));
$('#y').textContent = new Date().getFullYear();

const lb = $('#lb'), lbi = $('#lb-img'), lbPrev = $('#lb-prev'), lbNext = $('#lb-next'), lbDots = $('#lb-dots');
let gallery = [], gi = 0;
function openGallery(imgs, start=0){ gallery = imgs; gi = start; updateModal(); lb.showModal(); }
function updateModal(){
  lbi.src = gallery[gi];
  const many = gallery.length > 1;
  lbPrev.style.display = lbNext.style.display = many ? 'block' : 'none';
  lbDots.innerHTML = many ? gallery.map((_,i) => `<i class="${i===gi?'on':''}"></i>`).join('') : '';
}
track.addEventListener('click', e => {
  const t = e.target;
  if (t.matches('.snd')) {
    const v = t.parentNode.querySelector('video'); v.muted = !v.muted;
    t.textContent = v.muted ? '🔇' : '🔊'; t.setAttribute('aria-label', v.muted ? 'Activar sonido' : 'Silenciar');
  } else if (t.matches('.g-btn')) {
    const g = t.parentNode.querySelector('.gal'), next = t.classList.contains('g-next');
    const end = g.scrollLeft + g.clientWidth >= g.scrollWidth - 2;
    if (next) g.scrollTo({left: end ? 0 : g.scrollLeft + g.clientWidth, behavior:'smooth'});
    else g.scrollTo({left: g.scrollLeft < 2 ? g.scrollWidth : g.scrollLeft - g.clientWidth, behavior:'smooth'});
  } else if (t.matches('.gal img')) {
    openGallery(list[t.closest('.slide').dataset.i].imgs, [...t.parentNode.children].indexOf(t));
  }
});
track.addEventListener('keydown', e => { if (e.key==='Enter' && e.target.matches('.gal img')) e.target.click(); });
lbPrev.onclick = e => { e.stopPropagation(); gi = (gi - 1 + gallery.length) % gallery.length; updateModal(); };
lbNext.onclick = e => { e.stopPropagation(); gi = (gi + 1) % gallery.length; updateModal(); };
$('#lbx').onclick = () => lb.close();
lb.addEventListener('click', e => { if (e.target === lb) lb.close(); });
addEventListener('keydown', e => {
  if (!lb.open) return;
  if (e.key==='ArrowRight') lbNext.click();
  if (e.key==='ArrowLeft') lbPrev.click();
});
const wa = $('#wa');
addEventListener('scroll', () => wa.classList.toggle('show', scrollY > 600), {passive:true});
addEventListener('load', () => { markAll(); mark(); });
addEventListener('resize', () => { markAll(); mark(); });
render();
