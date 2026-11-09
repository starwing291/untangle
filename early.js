function ph(l){const d=document.createElement('div');d.className='ph';d.textContent=l;return d}
const EXT = ['jpg','png','webp','jpeg','JPG','PNG'];
function nx(el){ const i = +(el.dataset.i||0)+1; if(i<EXT.length){ el.dataset.i=i; el.src=el.dataset.b+'.'+EXT[i]; } else { const d=ph('Add image: '+el.dataset.b+'.jpg'); el.replaceWith(d);} }
