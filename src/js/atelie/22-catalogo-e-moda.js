// catalogo-e-moda | v0.14
/* Ateliê 3.0 — layered fashion engine */
const fashionArt={
  "base":ASSETS14[330],
  "eyes":{
    "azul":ASSETS14[331],
    "verde":ASSETS14[332],
    "castanho":ASSETS14[333],
    "violeta":ASSETS14[334],
    "mel":ASSETS14[335]
  },
  "hair":{
    "preto":ASSETS14[336],
    "loiro":ASSETS14[337],
    "rosa":ASSETS14[338],
    "ruivo":ASSETS14[339],
    "lilas":ASSETS14[340]
  },
  "skin":{
    "media":ASSETS14[341],
    "escura":ASSETS14[342]
  }
  
};

const catalog9={
 top:[['tee','Camiseta creme',0,1,'casual','#eee0d6'],['blouse','Blusa acadêmica',0,1,'academico','#f9e9df'],['rose','Blusa Sweet Blossom',0,1,'romantico','#d6a0ad'],['black','Blusa Midnight',35,1,'gotico','#38303d'],['lavender','Blusa Lavender',35,2,'romantico','#aa99c8'],['sport','Camiseta Off Duty',25,1,'esportivo','#6b918e']],
 bottom:[['pleats','Saia Bellmont',0,1,'academico','#714054'],['jeans','Jeans azul',0,1,'casual','#59738e'],['cream','Saia de linho',0,1,'romantico','#e5c9ad'],['goth','Saia Midnight',35,1,'gotico','#332c3d'],['shorts','Short esportivo',25,1,'esportivo','#596f70'],['long','Saia Moonlight',50,3,'elegante','#8877a5']],
 dress:[['none','Sem vestido',0,1,'','#eee'],['wine','Festival Romance',0,1,'romantico','#963f55'],['moon','Moonlight',65,3,'elegante','#73708e'],['blossom','Cherry Blossom',55,2,'romantico','#e2a7b7'],['noir','Noir',55,2,'gotico','#322c3b']],
 coat:[['none','Sem casaco',0,1,'','#eee'],['blazer','Blazer Bellmont',0,1,'academico','#84435c'],['cardigan','Cardigan rosa',0,1,'romantico','#cd9ba8'],['jacket','Jaqueta esportiva',0,1,'esportivo','#364567'],['creamcoat','Cardigan creme',0,1,'casual','#ddc3a5'],['leather','Jaqueta Midnight',50,2,'gotico','#37323c']],
 shoes:[['flats','Sapatilhas creme',0,1,'romantico','#ead6bd'],['loafers','Mocassins',0,1,'academico','#593f42'],['sneakers','Tênis branco',0,1,'esportivo','#efebe8'],['boots','Botas Midnight',45,2,'gotico','#39313e'],['heels','Sapatos Moonlight',40,3,'elegante','#9b7894']],
 socks:[['none','Sem meias',0,1,'','#eee'],['white','Meias brancas',0,1,'academico','#f4e9e4'],['black','Meias escuras',20,1,'gotico','#413847'],['lace','Meias delicadas',25,2,'romantico','#e6cbd9']],
 hairstyle:[['bun','Coque romântico',0,1,'elegante','#785047'],['long','Ondas longas',0,1,'romantico','#785047'],['pony','Rabo de cavalo lateral',0,1,'esportivo','#785047'],['braid','Trança lateral',35,2,'casual','#785047']],
 makeup:[['natural','Natural',0,1,'','#d7a59b'],['rose','Blush rosado',0,1,'romantico','#e296a3'],['wine','Batom vinho',25,1,'gotico','#a04e63'],['glow','Brilho pérola',30,2,'elegante','#ebc9b7']],
 accessory:[['ribbon','Laço vinho',0,1,'romantico','#963b52'],['pearl','Presilhas pérola',0,1,'elegante','#ead6b3'],['star','Estrela da Íris',45,2,'romantico','#e4bb6b'],['brooch','Rosa de Bellmont',65,3,'academico','#d8a0ae'],['necklace','Colar dourado',25,1,'elegante','#d8b46e'],['earrings','Brincos de pérola',25,1,'elegante','#f0dcc3'],['bag','Bolsa de passeio',40,2,'casual','#ba8d81'],['glasses','Óculos finos',30,1,'academico','#795b5e']]
};
const catnames9={
  top:'Blusas',
  bottom:'Saias e calças',
  dress:'Vestidos',
  coat:'Casacos',
  shoes:'Sapatos',
  socks:'Meias',
  hairstyle:'Penteados',
  makeup:'Maquiagem',
  accessory:'Acessórios'
};

const palettes9={
  hair:[...colors8.hair,['ruivo','Ruivo','#ad684c'],['lilas','Lilás','#a18cbb']],
  eyes:[...colors8.eyes,['violeta','Violeta','#9f70b4']],
  skin:colors8.skin
};

const presets9={
  uniforme:{
    top:'blouse',
    bottom:'pleats',
    dress:'none',
    coat:'blazer',
    shoes:'loafers',
    socks:'white'
  },
  cardigan:{
    top:'rose',
    bottom:'pleats',
    dress:'none',
    coat:'cardigan',
    shoes:'flats',
    socks:'white'
  },
  jaqueta:{
    top:'tee',
    bottom:'jeans',
    dress:'none',
    coat:'jacket',
    shoes:'sneakers',
    socks:'none'
  },
  casual:{
    top:'tee',
    bottom:'cream',
    dress:'none',
    coat:'creamcoat',
    shoes:'flats',
    socks:'none'
  },
  festival:{
    top:'blouse',
    bottom:'cream',
    dress:'wine',
    coat:'none',
    shoes:'flats',
    socks:'none'
  }
  
};

const row9=(k,id)=>catalog9[k]?.find(r=>r[0]===id);
function look9(l={
  
}){
  let p=presets9[l.outfit]||presets9.uniforme;
  let f={
    ...p,
    hairstyle:'bun',
    makeup:'natural',
    ...l.fashion
  };
  for(const k of Object.keys(f))if(!row9(k,f[k]))delete f[k];
  return {
    ...l,
    hair:palettes9.hair.some(x=>x[0]===l.hair)?l.hair:'castanho',
    eyes:palettes9.eyes.some(x=>x[0]===l.eyes)?l.eyes:'mel',
    skin:palettes9.skin.some(x=>x[0]===l.skin)?l.skin:'clara',
    outfit:l.outfit||'uniforme',
    accessories:[...new Set((l.accessories||[]).filter(x=>row9('accessory',x)))],
    fashion:{
      ...p,
      hairstyle:'bun',
      makeup:'natural',
      ...f
    }
    
  }
  
}

function closet9(s){
  const w=wallet8(s);
  const v=s.fashion9||(s.fashion9={
    owned:[],photos:[],posts:[],challenges:[]
  });
  for(const k of ['owned','photos','posts','challenges'])if(!Array.isArray(v[k]))v[k]=[];
  for(const id of w.owned)if(row9('accessory',id)&&!v.owned.includes('accessory:'+id))v.owned.push('accessory:'+id);
  return v
}

function normalizeFashion(s, originalLook) {
    s.look=look9({...s.look,...originalLook});closet9(s);
}
const id9=(k,id)=>k+':'+id;
function owned9(s,k,id){const r=row9(k,id);return !!r&&(r[2]===0||closet9(s).owned.includes(id9(k,id)))}
const haircolor9={castanho:'#62443c',preto:'#292931',rosa:'#bc7897',loiro:'#bb935b',ruivo:'#945134',lilas:'#88719f'};
const shade9=(c,n)=>'#'+c.slice(1).match(/../g).map(v=>Math.max(0,Math.min(255,parseInt(v,16)+n)).toString(16).padStart(2,'0')).join('');
let uid9=0;
function art9(l,full=false,only=null){l=look9(l);const f=l.fashion;const u='f9_'+(++uid9);let defs='',out='';const stroke='#59404a';const hair=haircolor9[l.hair]||haircolor9.castanho;function grad(c){const id=u+'_'+(defs.length);defs+=`<linearGradient id="${id}" x1="0" y1="0" x2="1" y2=".28"><stop stop-color="${shade9(c,-25)}"/><stop offset=".43" stop-color="${shade9(c,12)}"/><stop offset=".72" stop-color="${c}"/><stop offset="1" stop-color="${shade9(c,-32)}"/></linearGradient>`;return `url(#${id})`}
const path=(d,c,st=stroke,sw=2.7)=>`<path d="${d}" fill="${c}" stroke="${st}" stroke-width="${sw}" stroke-linejoin="round"/>`;
const line=(d,c=stroke,sw=2,op=.65)=>`<path d="${d}" fill="none" stroke="${c}" stroke-width="${sw}" opacity="${op}" stroke-linecap="round"/>`;
const img=d=>d?`<image href="${mediaURL14(d,'image/webp')}" width="1024" height="1536"/>`:'';
const show=k=>!only||only===k;const c=k=>row9(k,f[k])?.[5]||'#dddddd';
if(show('hairstyle')&&f.hairstyle!=='bun'){let g=grad(hair);if(f.hairstyle==='long'){out+=path('M431 105 Q376 118 368 251 Q347 390 315 499 Q303 590 362 655 Q345 575 407 541 Q443 486 460 338 L559 336 Q589 482 633 543 Q679 574 652 662 Q720 603 690 493 Q651 384 646 244 Q645 132 586 100Z',g);for(let i=0;i<4;i++){out+=line(`M${390+i*12} 190 Q${347+i*13} 390 ${350+i*15} 500 Q${327+i*17} 566 ${364+i*11} 594`,shade9(hair,38),3,.6);out+=line(`M${610+i*8} 190 Q${645+i*8} 390 ${656+i*7} 500 Q${689-i*6} 568 ${655+i*5} 605`,shade9(hair,38),3,.6)}}else if(f.hairstyle==='pony'){out+=path('M574 65 Q698 55 701 186 Q728 290 663 385 Q686 297 645 247 Q619 205 602 155 L566 121Z',g);out+=line('M614 89 Q700 132 670 285',shade9(hair,45),5)}else{out+=path('M573 110 Q668 178 652 309 Q652 397 611 475 L594 528 581 477 Q607 365 598 261Z',g);for(let y=250;y<480;y+=30)out+=line(`M607 ${y} Q646 ${y+14} 605 ${y+33}`,shade9(hair,42),5)}}
if(!only)out+=img(fashionArt.base)+img(fashionArt.hair[l.hair])+img(fashionArt.skin[l.skin])+img(fashionArt.eyes[l.eyes]);
if(show('socks')&&f.socks!=='none'){
  let g=grad(c('socks'));
  out+=path('M393 1090 Q432 1104 470 1090 L449 1385 Q445 1411 454 1448 Q435 1477 395 1457 L405 1385 Q404 1250 393 1090Z',g)+path('M553 1090 Q591 1104 625 1090 Q616 1250 609 1385 L622 1457 Q580 1477 565 1448 Q574 1411 568 1385Z',g);
  out+=line('M396 1102 Q432 1115 469 1102 M553 1102 Q591 1115 622 1102','#fff',4,.6)
}

if(show('bottom')&&(f.dress==='none'||only==='bottom')){let color=c('bottom'),g=grad(color);if(['jeans','shorts'].includes(f.bottom)){let end=f.bottom==='shorts'?855:1408;out+=path(`M403 635 Q510 658 620 635 Q654 720 648 837 L${f.bottom==='shorts'?640:618} ${end} Q585 ${end+12} ${f.bottom==='shorts'?524:565} ${end} L512 755 L${f.bottom==='shorts'?499:454} ${end} Q420 ${end+12} ${f.bottom==='shorts'?380:398} ${end} L376 837 Q370 720 403 635Z`,g);out+=line('M405 651 Q512 675 617 651 M512 655 L512 746 M408 667 Q412 725 461 728 M616 667 Q612 725 562 728',shade9(color,-38),4);out+=`<circle cx="512" cy="660" r="5" fill="#d9b879"/>`}else{let end=f.bottom==='long'?1130:920;let wide=f.bottom==='long'?200:184;out+=path(`M403 635 Q510 655 620 635 Q${512+wide-35} 755 ${512+wide} ${end} Q512 ${end+32} ${512-wide} ${end} Q${512-wide+35} 755 403 635Z`,g);out+=path('M402 635 Q511 650 621 635 L628 665 Q511 680 395 665Z',shade9(color,-19));for(let i=-3;i<=3;i++)out+=line(`M${512+i*29} 674 Q${512+i*38} 790 ${512+i*(wide/3.5)} ${end+8}`,shade9(color,-36),f.bottom==='pleats'||f.bottom==='goth'?5:2,.62);out+=line(`M${512-wide+6} ${end-13} Q512 ${end+19} ${512+wide-6} ${end-13}`,shade9(color,48),3,.75)}}
if(show('top')&&(f.dress==='none'||only==='top')){let color=c('top'),g=grad(color);out+=path('M455 337 Q478 374 512 376 Q546 374 569 337 L608 345 Q637 344 652 384 L661 426 610 446 Q610 490 592 511 Q576 548 589 581 L621 638 Q512 677 403 638 L435 581 Q448 548 431 511 Q414 490 414 446 L363 426 372 384 Q387 344 416 345Z',g);out+=line('M454 342 Q512 405 570 342 M413 444 Q427 410 420 374 M612 444 Q598 410 604 374 M437 510 Q512 537 587 510 M434 585 Q510 615 590 585',shade9(color,-35),3,.55);if(f.top==='blouse'){out+=path('M455 338 L511 380 475 416 432 358Z','#fff5ee')+path('M569 338 L512 380 548 416 592 358Z','#fff5ee');out+=line('M512 392 L512 646','#c9a8a0',3);for(let y=427;y<635;y+=48)out+=`<circle cx="512" cy="${y}" r="5" fill="#d3af80"/>`;out+=path('M510 389 Q483 370 465 382 L471 423 510 405 550 423 557 382 Q535 370 510 389Z','#963d55')+path('M501 399 L480 443 501 436 512 410 525 436 545 443 522 399Z','#963d55')}if(f.top==='rose'||f.top==='lavender')out+=line('M453 343 Q512 396 571 343','#fff2ec',5,.95);if(f.top==='sport')out+=line('M373 405 L413 422 M612 422 L652 405','#fff',8,.85)}
if(show('dress')&&f.dress!=='none'){let color=c('dress'),g=grad(color);out+=path('M454 337 L484 367 Q512 389 540 367 L570 337 608 345 Q636 345 651 384 L661 426 610 446 Q610 485 589 526 Q576 563 594 603 L623 642 Q680 761 721 1018 Q512 1072 303 1018 Q344 761 401 642 L430 603 Q448 563 435 526 Q414 485 414 446 L363 426 373 384 Q389 345 416 345Z',g);out+=path('M401 631 Q512 650 623 631 L635 663 Q512 683 389 663Z',shade9(color,-29));for(let i=-3;i<=3;i++)out+=line(`M${512+i*29} 675 Q${512+i*44} 850 ${512+i*62} 1029`,shade9(color,-33),3,.65);out+=line('M456 341 Q512 398 568 341 M312 1007 Q512 1058 712 1007',shade9(color,65),5,.85);if(f.dress==='wine'||f.dress==='blossom'){for(let y=430;y<=600;y+=34){out+=`<circle cx="512" cy="${y}" r="4.5" fill="#f0cba9"/>`;}out+=path('M510 646 Q472 613 451 642 L468 680 510 657 551 680 573 642 Q550 613 510 646Z',shade9(color,-17))}}
if(show('coat')&&f.coat!=='none'){let color=c('coat'),g=grad(color);out+=path('M453 337 L417 343 Q389 343 375 375 L353 462 331 554 302 636 258 755 306 775 353 674 389 592 414 518 439 566 431 600 396 672 Q450 694 488 669 L487 451 472 402Z',g)+path('M571 337 L607 343 Q635 343 649 375 L671 462 693 554 722 636 766 755 718 775 671 674 635 592 610 518 585 566 593 600 628 672 Q574 694 536 669 L537 451 552 402Z',g);out+=line('M357 465 L393 477 M667 465 L631 477 M270 742 L316 762 M754 742 L708 762 M437 571 L461 575 M587 571 L563 575',shade9(color,-39),4);if(f.coat==='blazer'||f.coat==='leather'){out+=path('M453 337 L431 362 456 426 441 445 487 508 487 451Z',shade9(color,14))+path('M571 337 L593 362 568 426 583 445 537 508 537 451Z',shade9(color,14));out+=line('M453 339 L431 362 456 426 441 445 487 508 M571 339 L593 362 568 426 583 445 537 508',f.coat==='blazer'?'#d4ae78':'#9a8793',4,.95);if(f.coat==='blazer')out+=`<g transform="translate(570 485)"><path d="M-15 -13H15V5Q0 25 -15 5Z" fill="#684054" stroke="#d8b575" stroke-width="2"/><text y="9" font-size="22" text-anchor="middle" font-family="Georgia" fill="#e9c68c">B</text></g>`}else{out+=line('M454 346 Q480 410 489 665 M570 346 Q544 410 535 665',shade9(color,43),8,.9);for(let y=480;y<655;y+=46)out+=`<circle cx="476" cy="${y}" r="5" fill="#e1bd91"/>`;if(f.coat==='jacket')out+=line('M379 380 L349 497 305 638 271 739 M645 380 L675 497 719 638 753 739','#e6d9ce',7,.9)}}
if(show('shoes')&&f.shoes!=='flats'){let color=c('shoes'),g=grad(color);if(f.shoes==='boots'){out+=path('M398 1260 Q427 1277 457 1260 L450 1400 Q465 1450 460 1485 Q436 1530 396 1507 Q377 1495 391 1457 L405 1390Z',g)+path('M566 1260 Q596 1277 622 1260 L610 1390 626 1457 Q640 1495 620 1507 Q580 1530 557 1485 Q552 1450 567 1400Z',g);for(let y=1290;y<1390;y+=23)out+=line(`M410 ${y} L446 ${y+12} M446 ${y} L410 ${y+12} M575 ${y} L612 ${y+12} M612 ${y} L575 ${y+12}`,'#c9b9b7',2)}else{out+=path('M403 1430 Q429 1444 451 1428 L461 1479 Q462 1510 425 1517 Q384 1512 388 1475Z',g)+path('M570 1428 Q592 1444 616 1430 L631 1475 Q635 1512 594 1517 Q557 1510 558 1479Z',g);out+=line('M392 1487 Q425 1516 455 1487 M563 1487 Q595 1516 627 1487',f.shoes==='sneakers'?'#aaa2a2':shade9(color,-34),5);out+=line('M406 1450 Q427 1463 449 1450 M571 1450 Q593 1463 614 1450',shade9(color,48),7)}}
if(show('makeup')&&!only){if(f.makeup==='rose'||f.makeup==='glow')out+=`<ellipse cx="465" cy="235" rx="13" ry="5" fill="#e4939c" opacity=".22"/><ellipse cx="560" cy="235" rx="13" ry="5" fill="#e4939c" opacity=".22"/>`;if(f.makeup==='wine')out+=path('M499 259 Q506 257 513 260 Q520 257 529 259 Q515 270 499 259Z','#a25c68','none',0);if(f.makeup==='glow')out+=`<circle cx="460" cy="231" r="1.5" fill="#fff9e9"/><circle cx="565" cy="231" r="1.5" fill="#fff9e9"/>`}
if(show('accessory'))for(const a of l.accessories){if(a==='ribbon')out+=path('M454 64 Q411 24 394 44 L401 89 Q429 81 454 69 Q482 95 502 85 L507 43 Q480 42 454 64Z','#973b53')+path('M444 69 L413 123 435 115 453 80 474 117 493 122 464 69Z','#973b53');if(a==='pearl')out+=`<g transform="translate(435 155) rotate(-45)"><rect width="32" height="5" rx="2" fill="#cfad72"/>${[3,11,19,27].map(x=>`<circle cx="${x}" cy="2" r="4" fill="#fff2df" stroke="#bf9a75" stroke-width=".8"/>`).join('')}</g>`;if(a==='star')out+=path('M585 153 L590 165 604 165 594 174 597 188 585 180 573 188 576 174 566 165 580 165Z','#efc877','#9c734a',1.8);if(a==='brooch')out+=`<g transform="translate(577 487)">${[0,72,144,216,288].map(r=>`<ellipse cy="-8" rx="6" ry="10" transform="rotate(${r})" fill="#e5a5b5" stroke="#ae687e"/>`).join('')}<circle r="5" fill="#e3bc76"/></g>`;if(a==='necklace')out+=line('M475 334 Q512 373 549 334','#ba9555',2.5,.95)+`<circle cx="512" cy="355" r="6" fill="#d8af66" stroke="#947344"/>`;if(a==='earrings')out+=`<circle cx="451" cy="247" r="5" fill="#fff4e0" stroke="#c8a36c"/><circle cx="576" cy="247" r="5" fill="#fff4e0" stroke="#c8a36c"/>`;if(a==='glasses')out+=`<g fill="none" stroke="#886a67" stroke-width="2.5"><rect x="451" y="193" width="47" height="35" rx="13"/><rect x="529" y="193" width="47" height="35" rx="13"/><path d="M498 207 Q514 198 529 207 M451 205L441 199 M576 205L585 199"/></g>`;if(a==='bag')out+=line('M600 369 Q682 564 662 744','#725250',9,.95)+path('M603 735 Q656 719 702 743 L716 844 Q656 866 593 844Z',grad('#bb9186'))+path('M603 735 Q655 725 702 743 L707 785 Q655 806 599 785Z','#ac8077')+`<rect x="648" y="777" width="17" height="12" rx="3" fill="#e6c58b"/>`}
let box=full==='face'?'390 0 245 370':full?'205 0 614 1536':'300 0 424 810';
if(only)box=({
  top:'345 325 334 355',bottom:'285 620 454 820',dress:'285 325 454 770',coat:'240 325 544 470',shoes:'365 1250 290 285',socks:'365 1065 290 430',hairstyle:'300 0 430 660',accessory:'205 0 614 900',makeup:'400 160 224 155'
})[only]||box;

return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${box}" class="anime-sprite protagonist-sprite fashion9" role="img" aria-label="Protagonista personalizada"><defs>${defs}</defs>${out}</svg>`}
avatar=function(l={},m='neutral'){return art9(l,false)};
let tab9='top',pose9='full',filter9='all',photoBg9='rose';
function current9(){return modalType==='new'?draft:state}
function redraw9(){keepName8();drawWard7()}
function equip9(k,id){
  if(k==='accessory'){
    draft.look.accessories=draft.look.accessories.includes(id)?draft.look.accessories.filter(a=>a!==id):[...draft.look.accessories,id]
  }
  else {
    draft.look.fashion[k]=id;
    if(k==='top'||k==='bottom')draft.look.fashion.dress='none'
  }
   
}

const challenge9=[{
  id:'study',title:'Primeiro dia de aula',tags:['academico'],day:1,prize:30
},{
  id:'cafe',title:'Um café depois do sinal',tags:['casual','romantico'],day:2,prize:40
},{
  id:'night',title:'Festival de Bellmont',tags:['elegante','romantico'],day:4,prize:60
}];

function rating9(ch,l){
  let tags=Object.entries(l.fashion).filter(([k,v])=>!(l.fashion.dress!=='none'&&['top','bottom'].includes(k))).map(([k,v])=>row9(k,v)?.[4]);
  tags.push(...l.accessories.map(a=>row9('accessory',a)?.[4]));
  return Math.min(5,tags.filter(x=>ch.tags.includes(x)).length)
}

function photos9(){return closet9(current9()).photos}
function thumb9(k,id){let l=look9(draft.look);l.fashion={...l.fashion,[k]:id};if(k==='accessory')l.accessories=[id];if(id==='none'||k==='makeup')return `<span class="miniicon9" style="background:${row9(k,id)[5]}">${id==='none'?'∅':'✧'}</span>`;return art9(l,true,k)}
function studio9(){const s=current9(),v=closet9(s),w=wallet8(s),l=draft.look,day=s.episode||1;let body='';const tabs={...catnames9,beauty:'Beleza',presets:'Coleções',shop:'BellShop',favorites:'Favoritos',challenge:'Desafios',photo:'Fotos & Feed'};
if(catalog9[tab9]||tab9==='shop'){const groups=tab9==='shop'?Object.keys(catalog9):[tab9];body=`<div class="filter9"><button class="soft" data-act="filter9" data-id="all" aria-pressed="${filter9==='all'}">Todos</button><button class="soft" data-act="filter9" data-id="owned" aria-pressed="${filter9==='owned'}">Minha coleção</button><button class="soft" data-act="filter9" data-id="shop" aria-pressed="${filter9==='shop'}">À venda</button></div>`+groups.map(k=>{let rows=catalog9[k].filter(r=>filter9==='all'||(filter9==='owned')===owned9(s,k,r[0]));return rows.length?`<h3>${catnames9[k]}</h3><div class="pieces9">${rows.map(r=>{const [id,n,price,unlock,tag]=r,own=owned9(s,k,id),on=k==='accessory'?l.accessories.includes(id):l.fashion[k]===id;return `<button class="piece9" data-act="${own?'equip9':'buy9'}" data-key="${k}" data-id="${id}" aria-pressed="${on}" ${!own&&(day<unlock||w.coins<price)?'disabled':''}><div class="pieceart9">${thumb9(k,id)}</div><b>${n}</b><small>${on?'✓ Em uso':own?'Na coleção':day<unlock?'Ep. '+unlock:price+' BC'}</small></button>`}).join('')}</div>`:''}).join('')||'<p>Nenhuma peça nesta seleção.</p>'}
if(tab9==='beauty')body=Object.entries(palettes9).map(([k,rows])=>`<h3>${({hair:'Cor do cabelo',eyes:'Cor dos olhos',skin:'Tom de pele'})[k]}</h3><div class="swatches8">${rows.map(([id,n,c])=>`<button class="swatch8" data-act="color9" data-key="${k}" data-id="${id}" aria-pressed="${l[k]===id}"><span style="background:${c}"></span>${n}</button>`).join('')}</div>`).join('')+'<p class="hint">As íris usam a textura original recolorida; as pupilas e o brilho são preservados.</p>';
if(tab9==='presets')body=`<h3>Coleções prontas</h3><div class="pieces9">${Object.keys(presets9).map(k=>`<button class="piece9" data-act="preset9" data-id="${k}"><div class="pieceart9 full9">${art9({...l,outfit:k,fashion:{...presets9[k],hairstyle:l.fashion.hairstyle,makeup:l.fashion.makeup}},true)}</div><b>${outfitNames7[k]}</b><small>Vestir combinação</small></button>`).join('')}</div>`;
if(tab9==='favorites')body=`<h3>Looks favoritos</h3><div class="favform8"><input id="fav9" maxlength="30" placeholder="Nome do look"><button class="primary" data-act="favorite9" ${w.favorites.length>=12?'disabled':''}>Salvar</button></div><div class="pieces9">${w.favorites.map((r,i)=>`<div class="piece9"><div class="pieceart9 full9">${art9(r.look,true)}</div><b>${esc(r.name)}</b><button class="soft" data-act="use9" data-i="${i}">Vestir</button><button class="soft" data-act="delete9" data-i="${i}">Excluir</button></div>`).join('')||'<p>Nenhum favorito ainda.</p>'}</div>`;
if(tab9==='challenge')body=`<h3>Desafios de moda</h3><p class="hint">Combine peças com as etiquetas pedidas. Três pontos ou mais ganham o prêmio uma única vez.</p>${challenge9.map(ch=>`<article class="event9"><b>${ch.title}</b><small>${ch.tags.join(' / ')} • prêmio ${ch.prize} BC</small><p>${'★'.repeat(rating9(ch,l))}${'☆'.repeat(5-rating9(ch,l))}</p><button class="soft" data-act="judge9" data-id="${ch.id}" ${day<ch.day||v.challenges.includes(ch.id)?'disabled':''}>${v.challenges.includes(ch.id)?'Concluído':day<ch.day?'Episódio '+ch.day:'Avaliar look'}</button></article>`).join('')}`;
if(tab9==='photo')body=`<h3>Sessão de fotos</h3><p>Escolha o fundo e registre seu look. A foto preserva as peças e as cores escolhidas.</p><div class="filter9">${Object.entries({rose:'Rosa',night:'Noite',garden:'Jardim'}).map(([id,n])=>`<button class="soft" data-act="bg9" data-id="${id}" aria-pressed="${photoBg9===id}">${n}</button>`).join('')}</div><button class="primary" data-act="photo9" ${v.photos.length>=20?'disabled':''}>♡ Registrar look</button><h3>Álbum</h3><div class="pieces9">${v.photos.map((p,i)=>`<div class="piece9"><div class="pieceart9 full9 bg9-${p.bg}">${art9(p.look,true)}</div><b>Look ${i+1}</b><button class="soft" data-act="download9" data-i="${i}">Salvar imagem</button><button class="soft" data-act="post9" data-i="${i}" ${v.posts.some(x=>x.photo===i)?'disabled':''}>${v.posts.some(x=>x.photo===i)?'Publicado':'Publicar no BellFeed'}</button></div>`).join('')||'<p>Seu álbum está vazio.</p>'}</div><h3>BellFeed • mural de moda</h3>${v.posts.map(p=>`<article class="event9"><b>Look ${p.photo+1} • ${p.likes} curtidas</b>${p.comments.map(t=>`<p>${esc(t)}</p>`).join('')}</article>`).join('')||'<p class="hint">Nenhuma publicação ainda.</p>'}`;
return `<div class="studiohead8"><span class="tag">ATELIÊ BELLMONT 3.0 • FASHION STUDIO</span><span class="wallet8">✦ ${w.coins} BellCoins</span></div><div class="fashionlayout9"><div class="fashionmirror9"><div class="mirrorart9 bg9-${photoBg9} ${pose9==='face'?'face9':''}">${art9(l,pose9==='full'?true:'face')}</div><div class="filter9"><button class="soft" data-act="zoom9" data-id="full" aria-pressed="${pose9==='full'}">Corpo inteiro</button><button class="soft" data-act="zoom9" data-id="face" aria-pressed="${pose9==='face'}">Rosto</button><button class="soft" data-act="reset9">Restaurar</button></div><small>Peças em camadas • pose fixa</small></div><div class="fashionoptions9">${modalType==='new'?`<label for="name">Seu nome</label><input id="name" maxlength="24" value="${esc(draft.name)}">`:''}<div class="fashiontabs9">${Object.entries(tabs).map(([k,n])=>`<button class="soft" data-act="tab9" data-id="${k}" aria-pressed="${tab9===k}">${n}</button>`).join('')}</div><div class="fashioncatalog9">${body}</div></div></div>`}
drawWard7=function(){draft.look=look9(draft.look);const s=current9();closet9(s);showPanel(modalType==='new'?'Crie sua protagonista':'Ateliê Bellmont • Fashion Studio',studio9()+`<div class="studiofoot8"><span class="hint">${modalType==='new'&&saved?'Novo jogo substitui o save atual.':'O visual equipado aparece nas cenas. Compras e favoritos são salvos.'}</span><button class="primary" data-act="${modalType==='new'?'start':'wear'}">${modalType==='new'?'Começar a história':'Salvar visual'} ♡</button></div>`);document.querySelector('#modal .panel')?.classList.add('wide7','fashionpanel9')};
const oldModal9=modal;modal=function(t){if(t==='new'||t==='wardrobe'){tab9='top';filter9='all';pose9='full';return oldModal9(t)}if(t==='about'){modalType=t;return showPanel('Depois do Sinal • v0.8.2','<p>Fashion Studio • Cinco episódios, ateliê de peças independentes, BellCoins, desafios de moda, álbum e mural. Funciona offline.</p><p>Arte-base anime com roupas vetoriais em camadas e pose fixa.</p>')}return oldModal9(t)};
const cover9base=cover;cover=function(){return cover9base().replace(/Edição 0\.8\.1[^<]*/,'Edição 0.8.2 • Fashion Studio')};
document.addEventListener('click',e=>{const b=e.target.closest('[data-act]');if(!b||b.disabled||!draft||!['new','wardrobe'].includes(modalType))return;const a=b.dataset.act;if(!['tab9','filter9','equip9','buy9','color9','preset9','favorite9','use9','delete9','judge9','bg9','photo9','post9','download9','zoom9','reset9'].includes(a))return;keepName8();const k=b.dataset.key,id=b.dataset.id,i=Number(b.dataset.i),s=current9(),w=wallet8(s),v=closet9(s);if(a==='tab9'){tab9=id;filter9='all'}if(a==='filter9')filter9=id;if(a==='zoom9')pose9=id;if(a==='bg9')photoBg9=id;if(a==='color9'&&palettes9[k]?.some(x=>x[0]===id))draft.look[k]=id;if(a==='equip9'&&owned9(s,k,id))equip9(k,id);if(a==='buy9'){let r=row9(k,id);if(r&&!owned9(s,k,id)&&w.coins>=r[2]&&(s.episode||1)>=r[3]){w.coins-=r[2];v.owned.push(id9(k,id));if(k==='accessory'&&accessories8[id]&&!w.owned.includes(id))w.owned.push(id);equip9(k,id);toast('Peça adquirida ♡')}}if(a==='preset9'&&presets9[id]){draft.look.outfit=id;draft.look.fashion={...draft.look.fashion,...presets9[id]}}if(a==='reset9')draft.look=look9({outfit:'uniforme',hair:'castanho',eyes:'mel',skin:'clara',accessories:[]});if(a==='favorite9'&&w.favorites.length<12){let n=(document.querySelector('#fav9')?.value||'').trim();if(!n){toast('Dê um nome ao look.');return}w.favorites.push({name:n,look:JSON.parse(JSON.stringify(draft.look))});toast('Look favorito salvo')}if(a==='use9'&&w.favorites[i])draft.look=look9(JSON.parse(JSON.stringify(w.favorites[i].look)));if(a==='delete9'&&w.favorites[i])w.favorites.splice(i,1);if(a==='judge9'){const ch=challenge9.find(x=>x.id===id);if(ch&&!v.challenges.includes(id)&&(s.episode||1)>=ch.day){if(rating9(ch,draft.look)>=3){v.challenges.push(id);w.coins+=ch.prize;toast('Desafio vencido! +'+ch.prize+' BC')}else toast('Combine mais peças do tema.')}}if(a==='photo9'&&v.photos.length<20){v.photos.push({look:JSON.parse(JSON.stringify(draft.look)),bg:photoBg9});toast('Foto registrada ♡')}if(a==='post9'&&v.photos[i]&&!v.posts.some(p=>p.photo===i)){let top=[...routes].sort((a,b)=>(s.aff?.[b]||0)-(s.aff?.[a]||0))[0];let known=(s.aff?.[top]||0)>0;const comments=['Mabel: Esse look merece um ensaio inteiro!'];if(known)comments.push(chars[top].name+': '+({dante:'Tá legal. Não vou repetir.',soren:'Uma combinação bem escolhida.',theo:'Amei o visual!',ezra:'As cores ficaram bonitas.',valentim:'Elegância natural.',raven:'Esse look daria uma ótima capa. ♡'}[top]));v.posts.push({photo:i,likes:known?3:1,comments});toast('Look publicado no mural')}if(a==='download9'&&v.photos[i]){let p=v.photos[i];let svg=withEmbedded14(()=>art9(p.look,true)).replace('</defs>','</defs><rect x="205" width="614" height="1536" fill="'+({rose:'#f3e0e8',night:'#39374f',garden:'#e0e8d5'}[p.bg]||'#f3e0e8')+'"/>');const url=URL.createObjectURL(new Blob([svg],{type:'image/svg+xml'}));const el=document.createElement('a');el.href=url;el.download='bellmont-look-'+(i+1)+'.svg';el.click();setTimeout(()=>URL.revokeObjectURL(url),1000);return}if(modalType==='wardrobe')persist();drawWard7()});


const animeAvatar83=function(l={},m='neutral'){const h=avatar8base(l,m);if(!l.accessories?.length)return h;const set=lookArt7[l.outfit]||lookArt7.uniforme;const [,w,height]=set[m]||set.neutral;const scale=w/434;let x='';const classic=!['casual','festival'].includes(l.outfit);const pinX=(classic?.31:.29)*w,pinY=.16*height;const starX=(classic?.68:.68)*w,starY=.20*height;const broochX=(classic?.78:.73)*w,broochY=(classic?.66:.69)*height;
if(l.accessories.includes('pearl'))x+=`<g transform="translate(${pinX} ${pinY}) rotate(-32) scale(${scale})" stroke="#9b774c" stroke-width="1.5"><rect x="-17" y="-7" width="34" height="6" rx="3" fill="#f5d6a0"/><rect x="-15" y="4" width="30" height="5" rx="2.5" fill="#e9b77a"/>${[-12,-4,4,12].map(p=>`<circle cx="${p}" cy="-4" r="4" fill="#fff6ea"/>`).join('')}</g>`;
if(l.accessories.includes('star'))x+=`<g transform="translate(${starX} ${starY}) scale(${scale})" stroke="#94662f" stroke-width="2"><path d="M0 -15 4 -5 15 -5 7 2 10 13 0 7 -10 13 -7 2 -15 -5 -4 -5Z" fill="#f8d68a"/><circle r="3" fill="#fff6da" stroke="none"/></g>`;
if(l.accessories.includes('brooch'))x+=`<g transform="translate(${broochX} ${broochY}) scale(${scale})" stroke="#85475f" stroke-width="1.3">${[0,72,144,216,288].map(r=>`<ellipse cy="-8" rx="6.5" ry="9" fill="#efafbc" transform="rotate(${r})"/>`).join('')}<circle r="5" fill="#eac071"/></g>`;
return h.replace('</svg>',x+'</svg>')};
