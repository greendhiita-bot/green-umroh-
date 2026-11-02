const {chromium}=require('playwright');
const face=(bg,scale)=>`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
<rect width="512" height="512" fill="${bg}"/>
<g transform="translate(256 270) scale(${scale}) translate(-85 -100)">
<path d="M85 44c34 0 52 30 52 64 0 30-22 46-52 46s-52-16-52-46c0-34 18-64 52-64z" fill="#2f9e57" stroke="#1f7a41" stroke-width="3"/>
<ellipse cx="70" cy="64" rx="14" ry="8" fill="#fff" opacity=".25"/>
<path d="M55 52c4-18 56-18 60 0q-30 8-60 0z" fill="#fbfbf6" stroke="#cfe5d4" stroke-width="2"/>
<path d="M60 48q25 6 50 0" stroke="#d9d9cf" stroke-width="2" fill="none"/>
<ellipse cx="70" cy="88" rx="9" ry="11" fill="#fff"/><ellipse cx="100" cy="88" rx="9" ry="11" fill="#fff"/>
<circle cx="72" cy="90" r="5.5" fill="#1a2a1f"/><circle cx="102" cy="90" r="5.5" fill="#1a2a1f"/>
<circle cx="74" cy="87" r="2" fill="#fff"/><circle cx="104" cy="87" r="2" fill="#fff"/>
<ellipse cx="58" cy="106" rx="8" ry="5" fill="#f59aa5" opacity=".8"/><ellipse cx="112" cy="106" rx="8" ry="5" fill="#f59aa5" opacity=".8"/>
<path d="M76 108q9 9 18 0" stroke="#1a2a1f" stroke-width="3.5" fill="#c94b5b" stroke-linecap="round"/>
</g></svg>`;
(async()=>{const b=await chromium.launch();const p=await b.newPage();
for(const [name,size,bg,sc] of [["icon-512.png",512,"#e8b23a",3.4],["icon-192.png",192,"#e8b23a",3.4],["apple-touch-icon.png",180,"#e8b23a",3.4],["icon-maskable-512.png",512,"#e8b23a",2.6]]){
 await p.setViewportSize({width:size,height:size});
 await p.setContent(`<style>body{margin:0}svg{width:${size}px;height:${size}px;display:block}</style>`+face(bg,sc));
 await p.screenshot({path:name});}
await b.close()})();
