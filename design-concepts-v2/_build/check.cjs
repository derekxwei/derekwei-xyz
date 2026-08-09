const fs=require('fs'),path=require('path');
const dirs=fs.readdirSync('.').filter(d=>d.startsWith('concept-'));
let bad=0;
for(const d of dirs){
  const files=fs.readdirSync(d).filter(f=>f.endsWith('.html'));
  let assets=0,links=0,missA=[],missL=[],h1s=[],ext=[];
  for(const f of files){
    const h=fs.readFileSync(path.join(d,f),'utf8');
    // assets
    for(const m of h.matchAll(/src="([^"]+)"/g)){
      if(/^https?:/.test(m[1])){ext.push(f+' '+m[1]);continue}
      assets++; if(!fs.existsSync(path.resolve(d,m[1]))) missA.push(f+' -> '+m[1]);
    }
    // internal links
    for(const m of h.matchAll(/href="([^"]+)"/g)){
      const v=m[1];
      if(/^(https?:|mailto:|tel:|sms:|#)/.test(v)){ if(/^https?:/.test(v)&&!/credly\.com|linkedin\.com/.test(v)) ext.push(f+' '+v); continue }
      links++; if(!fs.existsSync(path.resolve(d,v))) missL.push(f+' -> '+v);
    }
    const n=(h.match(/<h1[ >]/g)||[]).length; if(n!==1) h1s.push(f+':'+n);
    if(/—/.test(h)) console.log('EM DASH in '+d+'/'+f);
  }
  console.log(`${d}: ${files.length} pages | assets ${assets} (missing ${missA.length}) | internal links ${links} (broken ${missL.length}) | h1!=1: ${h1s.length?h1s.join(','):'none'} | external refs: ${ext.length}`);
  if(missA.length){bad++;console.log('   MISSING ASSETS:',missA.slice(0,5))}
  if(missL.length){bad++;console.log('   BROKEN LINKS:',missL.slice(0,8))}
}
console.log(bad?'ISSUES FOUND':'structure OK');
