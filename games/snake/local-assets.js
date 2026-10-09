// local-assets.js - serves every google/gstatic resource from ./assets so the page runs offline.
// Generated for v/12. Maps XHR, fetch, element src/href and CSS url() onto the local mirror.
(function () {
  'use strict';

  var BASE = 'assets/';

  var HOSTS = {
    'www.google.com': 1,
    'google.com': 1,
    'fonts.gstatic.com': 1,
    'www.gstatic.com': 1,
    'www.googleapis.com': 1,
    'raw.githubusercontent.com': 1
  };

  // Exact URLs for the xjs bundles (their local names can't be rebuilt from the url).
  var EXACT = {
  "https://www.google.com/xjs/_/js/k=xjs.s.en.-pnnDAjjICQ.2019.O/am=AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAiAAgAQACAAAQAAAAAAAAAAAAAAAAAAAAwABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQgAAAAZAAAAAAAAAAABAEAAAAAAACAAAAAAAAAAYAEABAACEAAAAACgAAAAAAAAAAAAAAAAAAAAAAABAEAAAAEQggAAAA_G2-AQBAAwAAAAAABwAAAAAAAAAAAAAAAAAAAAAAAAAAAEgAAAAAAAAAAADAAgAAAAIDAAAEgIAACAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAACAAAAAAACgAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAQAAAAIACAAAAAABwAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAACAAAYAAAAAAAAAAAAAAACBHwAEQAAAAAAAAAQAAAAAAAAgAAIAAAAAAAAAAgABAAwAAACAHACPB8AQQQEAAAAAAAAAAAAAAAAAAAAAAAAAAAFQAHMgCQiAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACkCE8BAAAAAACwNQAg/dg=0/ichc=1/rs=ACT90oF4ztWyH4yvJBeT26SaE-xokHJmjQ/cb=loaded_h_0?cb=121509378": "snake-loader.js",
  "https://www.google.com/xjs/_/js/k=xjs.s.en.-pnnDAjjICQ.2019.O/am=AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAiAAgAQACAAAQAAAAAAAAAAAAAAAAAAAAwABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQgEAAAZAAAAAAAAAAABAEAAAAAAACAAAAAAAAAAYAEABAACUAAAAACgAAAAAAAAAAAAAAAAAAAAAAABAEAAAAEQggAAAA_G2-AQBAAwAAAAAABwAAAAAAAAAAAAAAAAAAAAAAAAAAAEgAAAAAAAAAAADAAgAAAAIDAAAEgIAACAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAACAAAAAAACgAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAQAAAAIACAAAAAABwAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAACAAAYAAAAAAAAAAAAAAACBHwAEQAAAAAAAAAQAAAAAAAAgAAIAAAAAAAAAAgABAAwAAACAHACPB8AQQQEAAAAAAAAAAAAAAAAAAAAAAAAAAAFQAHMgKQiAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACkCE8BAAAAAACwNQAg/d=1/ed=1/dg=4/ichc=1/rs=ACT90oHjHeRT-VSFoJjSK89QXjexzy6AsQ/ee=ALeJib:B8gLwd;AfeaP:TkrAjf;BMxAGc:E5bFse;BgS6mb:fidj5d;BjwMce:cXX2Wb;CIZTGb:Kqhykb;CxXAWb:YyRLvc;DM55c:imLrKe;DQEued:Fevhcf;DULqB:RKfG5c;Dkk6ge:JZmW9e;DpcR3d:zL72xf;EABSZ:MXZt9d;ESrPQc:mNTJvc;EVNhjf:pw70Gc;EjXHpb:pSHqh;EmZ2Bf:zr1jrb;EnlcNd:WeHg4;F54IAe:ZgsFh;F9mqte:UoRcbe;FSxmUe:fiZR8b;Fkukfc:i8H2c;Fmv9Nc:O1Tzwc;FqHJkd:yQamIb;G0KhTb:LIaoZ;GleZL:J1A7Od;HMDDWe:G8QUdb;HtPxrd:Gx8jAb;IBADCc:RYquRb;IoGlCf:b5lhvb;IsdWVc:qzxzOb;JXJSm:ii1RGf;JXS8fb:Qj0suc;JqSq7d:y9ePhe;JsbNhc:Xd8iUd;K08hxe:zmbGlf;K5nYTd:ZDZcre;KA3P2:C3JnCe;KDb6nb:fE9n2;KOxcK:OZqGte;KQzWid:ZMKkN;KdIHef:BWtNj;KpRAue:Tia57b;LBgRLc:SdcwHb,XVMNvd;LBn8Cf:bJ9L0c;LEikZe:byfTOb,lsjVmc;LXA8b:q7OdKd;LsNahb:ucGLNb;MNkAde:KMCd1d;NJ1rfe:qTnoBf;NPKaK:SdcwHb;NSEoX:lazG7b;NjIwef:YVgi7d;Np8Qkd:Dpx6qc;Nyt6ic:jn2sGd;OIfWUb:qfOYcd;OgagBe:cNTe0;OiqE2c:TFpEK;OoK5v:Sp69O;OohIYe:mpEAQb;Pjplud:PoEs9b;PpTLXd:pJYjx;PqHfGe:im2cZe;Q1Ow7b:x5CSu;Q7iJ9c:bVLZ3d;QE20Be:yxCHBd;QFOGlf:PQ2Aoe;QGR0gd:Mlhmy;QYLF2b:pAQYUd;Qw8Feb:jpavUe;R4IIIb:QWfeKf;R9Ulx:CR7Ufe;RCF5Sd:X1kBmd;RZtOEd:DvKcFe;Raf5me:mgvFMc;SLtqO:Kh1xYe;SMDL4c:fTfGO;SNUn3:ZwDk9d,xD8Kp;SNk4Je:wWMhg;ScI3Yc:e7Hzgb,e7Hzgb;ShpF6e:N0pvGc;Snahre:mGCtob;SwCqAd:fXbCZc;SzQQ3e:dNhofb;TIUVQd:lWTJwd;TroZ1d:vVVzjb;U96pRd:FsR04;UBKJZ:LGDJGb;UDrY1c:N0F29d,W50NVd,eps46d,wciyUe;UVmjEd:EesRsb;UVzb9c:IvPZ6d;UYRIEb:HzTAQc;UyG7Kb:wQd0G;V2HTTe:RolTY;VGRfx:VFqbr;VMuEm:pL7sBc;VN6jIc:ddQyuf;VOcgDe:YquhTb;VhA7bd:vAmQFf;VsAqSb:PGf2Re;W9QSQe:ynCWwc;WDGyFe:jcVOxd;WXtNeb:QU9BMd;Wfmdue:g3MJlb;Wl55ib:NcYlP;Y3c5sd:FGbfLe;YIZmRd:A1yn5d;YV5bee:IvPZ6d;YnHUBf:sNsSob;ZMvdv:PHFPjb;ZSH6tc:QAvyLe;ZWEUA:afR4Cf;Zen4yb:jMF88c;ZlFEdf:fQTtic;ZlOOMb:P0I0Ec;ZnPvub:Acmyhd;a56pNe:JEfCwb;aAJE9c:WHW6Ef;aCJ9tf:qKftvc;aVZq3e:EMeVIb;aZ61od:arTwJ;aci7y:Z5Tr6c;bUIkwb:WMwEHe;bcPXSc:gSZLJb;cEt90b:ws9Tlc;cFTWae:gT8qnd;coJ8e:KvoW8;dIoSBb:ZgGg9b;dLlj2:Qqt3Gf;dXdZV:a7QTqd;dowIGb:ebZ3mb,ebZ3mb;dtl0hd:lLQWFe;eBAeSb:Ck63tb;eBZ5Nd:audvde;eHDfl:ofjVkb;eJKchc:ATg1be;eO3lse:UefOmb;euOXY:OZjbQ;g8nkx:U4MzKc;gaub4:TN6bMe;gbfHR:qZtzib;gtVSi:ekUOYd;h3MYod:ws9Tlc;hK67qb:QWEO5b;hVic1b:Kqhykb;heHB1:sFczq;hjRo6e:F62sG;hlqGX:FWz1ic;hsLsYc:Vl118;hwoVHd:zw4U8c;iFQyKf:QIhFr;jJj2G:kF2o2b;k1O0rf:pnOULd;k2Qxcb:XY51pe;kbAm9d:MkHyGd;lOO0Vd:OTA3Ae;lbfkyf:MqGdUd;liAz7d:kF2o2b;lkq0A:JyBE3e;mMVOGb:qDM7K;mWzs9c:fz5ukf;nBZnZe:CvErjb;nE6OJf:Fi4rsc;nEBWNb:MxKX9d;nJw4Gd:dPFZH;nrDcw:SuEoDe;oGtAuc:sOXFj;oSUNyd:fTfGO,fTfGO;oUlnpc:RagDlc;oiBhre:OuMkRd;okUaUd:wItadb;pKJiXd:VCenhc;pNsl2d:j9Yuyc;pXdRYb:JKoKVe;pj82le:ww04Df;qGV2uc:HHi04c;qQEoOc:KUM7Z,d7YSfd;qZx2Fc:j0xrE;qaS3gd:yiLg6e;qafBPd:sgY6Zb;qavrXe:I0C9u;qddgKe:d7YSfd,x4FYXe;rdexKf:FEkKD;rmWaj:PMS6Sd;ropkZ:hjoqoe;sTsDMc:JksfDf;sZmdvc:rdGEfc;tH4IIe:Ymry6;teSRSb:BMLai;tosKvd:ZCqP3;trZL0b:qY8PFe;twgzJd:Ix7YEd;uknmt:GkPrzb;uuQkY:u2V3ud;vEYCNb:FaqsVd;vRlMvf:Iw9Xo;vfVwPd:lcrkwe;w3bZCb:ZPGaIb;w9w86d:XwhUEb,dt4g2b,gKD90c,lWVZVe;wFpbG:JbGbBc;wQlYve:aLUfP;wR5FRb:O1Gjze,TtcOte;wV5Pjc:L8KGxe;x9N9ie:KH4Qof;xBbsrc:NEW1Qc;xbe2wc:wbTLEd;xpaRob:AVqZ9b;yiL5Ab:MT0ZBd;ysNiMc:CpIBjd;yxTchf:KUM7Z;z97YGf:oug9te;zaIgPb:Sl0pxd/cb=loaded_h_0/m=X3N0Bf,attn,cdos,gwc,hsm,jsa,mb4ZUb,cEt90b,SNUn3,qddgKe,sTsDMc,dtl0hd,eHDfl,YV5bee,d,csi?cb=121509378": "snake-loader.js",
  "https://www.google.com/xjs/_/js/k=xjs.s.en.-pnnDAjjICQ.2019.O/ck=xjs.s.fHTNJ7fpnys.L.B1.O/am=AAAIAAAAAAACAAAAAAAAAAAAAAECiAAAAAAAAAAAAAAAAAAAAAgBgAAAAAQAAAAAAAAAAAAAAFAAIAAAAAAAAAAAEAQAAAAMAAAgAiAAoAQACAAAQjRABAAgAAAAAAAAAEChDwABABgAAAAAAAAegAHgCAAAAAAAAAAAAAAQgEAAAZAAAAAAAAAAABAEAAAAAAACAAAABAAAAAYAEABAACUAAACACgAAAIAAAAAAgAAAAAAAAAAAABFEAAAAEQggAAAA_G2-AQDAAwAAAAAABwAAAAAAACAAAAAAAAAAABAAAAAAAEgEDgAAAAAAAMLAAgAAAAIDAAAEgIAACAAAAAAAAAAAiARIAAAEAAACAMAAAAAAAAAAAIAAgCAEAgAgACgAAQEAAAGA8wAAAQAAAAAAAAAAEAAAAAAAAAgAAAAAAgAQBCAEEAAAAAAAQAAAAIACEAAAAAByAAAAAAAAABBIACAAAQCMIAEAkCgIABABABCAAAYAAACIAAAAAAAAAAiJHwAEQAAAAAAAAEQAAAAAAAAgAAIAAAAALADAAgEBAAwAAACAHACPB8AQQQEAAAAAAAAAAAAAAAAAAAAAAAAAAAFQAHMgKQiAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACkCE8BAAAAAACwNQAg/d=0/dg=0/ujg=1/ichc=1/rs=ACT90oFSCIKlK-K4B7ZhO5Pfh-u8pYfUIA/cb=loaded_h_0/m=sy36j,sy36k,Qj0suc,JXS8fb,QKZgZd,DKYIHe,sy36l,sy38f,sy1xz,sy38e,sy389,sy38a,sy38d,sy1xy,sy38b,sy1y0,sy38c,sy385,syg8,sydg,sy37z,sy37y,sy37b,sy36v,sy36u,sy37w,sy37x,sy383,sy382,sy384,sy37v,sy2h3,sy2h9,sy2h2,sy2h5,sy2h6,sy2h8,sy2h7,sydh,sydi,syfs,syft,sye6,sydn,sy2ha,sy377,synt,sy37r,synw,sy37s,sy2rv,sy2sg,syfx,sydl,sydm,syg6,sy37g,sy37f,sy37o,sy37n,sy37m,sy36x,sy37k,sy37j,sy37i,sya4,sy37h,sy376,sy374,sy1kg,sy2mz,sy373,syip,sye4,syda,sy2n3,sy371,sy370,sy36y,sy34c,sy2mx,sy2y4,sy34a,sy2rp,sy2rg,sy2rf,sy2r1,sy2lz,sy2nj,sy2jp,sy2jr,sy2js,sye2,sydo,sye3,sy2i5,sy2hg,sy2hi,sy2hj,sy2i3,sy2ja,sy2i0,sy2j4,sy1yu,syg7,syfz,syf9,syf8,syf3,syf2,syf1,syf0,syex,sydz,sydv,sydy,sydx,sydu,syds,sydt,sye1,sydp,sydk,syd6,syep,syem,syck,sycl,sycj,sybv,sya5,sy36w,sy387,sy36p,syg5,sy2s5,sy2zv,sy2s2,sy2ry,sy2db,Wct42?cb=121509378&xjs=s3": "assets/www.google.com/xjs/_/js/17b23782c4.js",
  "https://www.google.com/xjs/_/js/k=xjs.s.en.-pnnDAjjICQ.2019.O/ck=xjs.s.fHTNJ7fpnys.L.B1.O/am=AAAIAAAAAAACAAAAAAAAAAAAAAECiAAAAAAAAAAAAAAAAAAAAAgBgAAAAAQAAAAAAAAAAAAAAFAAIAAAAAAAAAAAEAQAAAAMAAAgAiAAoAQACAAAQjRABAAgAAAAAAAAAEChDwABABgAAAAAAAAegAHgCAAAAAAAAAAAAAAQgEAAAZAAAAAAAAAAABAEAAAAAAACAAAABAAAAAYAEABAACUAAACACgAAAIAAAAAAgAAAAAAAAAAAABFEAAAAEQggAAAA_G2-AQDAAwAAAAAABwAAAAAAACAAAAAAAAAAABAAAAAAAEgEDgAAAAAAAMLAAgAAAAIDAAAEgIAACAAAAAAAAAAAiARIAAAEAAACAMAAAAAAAAAAAIAAgCAEAgAgACgAAQEAAAGA8wAAAQAAAAAAAAAAEAAAAAAAAAgAAAAAAgAQBCAEEAAAAAAAQAAAAIACEAAAAAByAAAAAAAAABBIACAAAQCMIAEAkCgIABABABCAAAYAAACIAAAAAAAAAAiJHwAEQAAAAAAAAEQAAAAAAAAgAAIAAAAALADAAgEBAAwAAACAHACPB8AQQQEAAAAAAAAAAAAAAAAAAAAAAAAAAAFQAHMgKQiAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACkCE8BAAAAAACwNQAg/d=0/dg=0/ujg=1/ichc=1/rs=ACT90oFSCIKlK-K4B7ZhO5Pfh-u8pYfUIA/cb=loaded_h_0/m=syo9,p3hmRc,syoc,syob,syoa,pNBFbe?cb=121509378&xjs=s3": "assets/www.google.com/xjs/_/js/1b8f1748c1.js",
  "https://www.google.com/xjs/_/js/md=2/k=xjs.s.en.-pnnDAjjICQ.2019.O/am=AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAiAAgAQACAAAQAAAAAAAAAAAAAAAAAAAAwABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQgEAAAZAAAAAAAAAAABAEAAAAAAACAAAAAAAAAAYAEABAACUAAAAACgAAAAAAAAAAAAAAAAAAAAAAABAEAAAAEQggAAAA_G2-AQBAAwAAAAAABwAAAAAAAAAAAAAAAAAAAAAAAAAAAEgAAAAAAAAAAADAAgAAAAIDAAAEgIAACAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAACAAAAAAACgAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAQAAAAIACAAAAAABwAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAACAAAYAAAAAAAAAAAAAAACBHwAEQAAAAAAAAAQAAAAAAAAgAAIAAAAAAAAAAgABAAwAAACAHACPB8AQQQEAAAAAAAAAAAAAAAAAAAAAAAAAAAFQAHMgKQiAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACkCE8BAAAAAACwNQAg/rs=ACT90oHjHeRT-VSFoJjSK89QXjexzy6AsQ?cb=121509378": "assets/www.google.com/xjs/_/js/dcafcfa618.js",
  "https://www.google.com/xjs/_/ss/k=xjs.s.fHTNJ7fpnys.L.B1.O/am=AAAIAAAAAAACAAAAAAAAAAAAAAECiAAAAAAAAAAAAAAAAAAAAAgBgAAAAAQAAAAAAAAAAAAAAFAAIAAAAAAAAAAAEAQAAAAMAAAAAAAAoAAAAAAAAjRABAAgAAAAAAAAAEChDwAAABgAAAAAAAAegAHgCAAAAAAAAAAAAAAAAEAAAJAAAAAAAAAAABAEAAAAAAAAAAAABAAAAAAAEABAAAUAAACAAAAAAIAAAAAAgAAAAAAAAAAAAAFEAAAAAAAgAAAAAAAAAACAAwAAAAAAAAAAAAAAACAAAAAAAAAAABAAAAAAAAAEDgAAAAAAAMIAAAAAAAAAAAAEAIAAAAAAAAAAAAAAiARIAAAEAAAAAMAAAAAAAAAAAIAAgCAEAgAgACgAAQEAAACA8wAAAQAAAAAAAAAAEAAAAAAAAAAAAAAAAgAQBCAEEAAAAAAAQAAAAAAAEAAAAAByAAAAAAAAABBAACAAAQCMIAEAkCgIABABABAAAAQAAACIAAAAAAAAAAgIAAAAAAAAAAAAAEQAAAAAAAAAAAAAAAAALADAAgEBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACA/d=1/ed=1/cb=loaded_h_0/rs=ACT90oFjopU1SJFFjPWd4c_sYJ-jurDU0A/m=X3N0Bf,attn,cdos,gwc,hsm,jsa,mb4ZUb,cEt90b,SNUn3,qddgKe,sTsDMc,dtl0hd,eHDfl,YV5bee,d,csi?cb=121509378": "assets/www.google.com/xjs/_/ss/6a5ac48759.css"
};

  // Same bundles keyed on their /m= module list, for when google re-signs the url.
  var FINGERPRINT = {
  "js:X3N0Bf,attn,cdos,gwc,hsm,jsa,mb4ZUb,cEt90b,SNUn3,qddgKe,sTsDMc,dtl0hd,eHDfl,YV5bee,d,csi": "snake-loader.js",
  "js:sy36j,sy36k,Qj0suc,JXS8fb,QKZgZd,DKYIHe,sy36l,sy38f,sy1xz,sy38e,sy389,sy38a,sy38d,sy1xy,sy38b,sy1y0,sy38c,sy385,syg8,sydg,sy37z,sy37y,sy37b,sy36v,sy36u,sy37w,sy37x,sy383,sy382,sy384,sy37v,sy2h3,sy2h9,sy2h2,sy2h5,sy2h6,sy2h8,sy2h7,sydh,sydi,syfs,syft,sye6,sydn,sy2ha,sy377,synt,sy37r,synw,sy37s,sy2rv,sy2sg,syfx,sydl,sydm,syg6,sy37g,sy37f,sy37o,sy37n,sy37m,sy36x,sy37k,sy37j,sy37i,sya4,sy37h,sy376,sy374,sy1kg,sy2mz,sy373,syip,sye4,syda,sy2n3,sy371,sy370,sy36y,sy34c,sy2mx,sy2y4,sy34a,sy2rp,sy2rg,sy2rf,sy2r1,sy2lz,sy2nj,sy2jp,sy2jr,sy2js,sye2,sydo,sye3,sy2i5,sy2hg,sy2hi,sy2hj,sy2i3,sy2ja,sy2i0,sy2j4,sy1yu,syg7,syfz,syf9,syf8,syf3,syf2,syf1,syf0,syex,sydz,sydv,sydy,sydx,sydu,syds,sydt,sye1,sydp,sydk,syd6,syep,syem,syck,sycl,sycj,sybv,sya5,sy36w,sy387,sy36p,syg5,sy2s5,sy2zv,sy2s2,sy2ry,sy2db,Wct42": "assets/www.google.com/xjs/_/js/17b23782c4.js",
  "js:syk2,aLUfP,wQlYve,sy9sm,sy4p1,sy4sl,sy9sl,sy9sk,sy5wy,sy36a,sy388,sy20q,sy9w,sy35w,sy1r1,pKhWu,sy5vu,sy2sb,sy2ds,oQfbDd,abd,sy5vo,TDFkye,sy8py,sy8te,sy8tc,sy1n8,sy1m9,sy1lv,sy1lu,sy1lr,sy1lx,sy1lt,sy1lw,sy1m4,sy4iu,sy4iv,sy1lq,sy1lk,sy1ls,sy8td,sy62f,qmjr3,sy8ta,sy5xa,IQw9J,sy5vp,sy3ey,sy178,sy3f1,sy3ez,sy56i,sy26p,sy56d,sy56g,sy26q,sy56e,sy3f0,sy56f,sy56a,sy569,sy56b,sy1rb,sy56c,sy2dy,sy2dw,sy416,sy2dx,sy2e1,sy2e4,sy2du,sylp,sylq,sy2dv,sy1rq,sy2e0,sylz,sy413,sy20n,sy1s8,sy15c,sy15d,sy158,sy15e,sy567,ily0Be,sy671,sy3z7,Zihehd,sy63g,sy15j,sy20y,mf2ifc,sy36c,sy36b,n7qy6d,sy36e,HPGtmd,sy2n8,sy36h,sy36f,sy16a,syvp,syvc,syv9,syv8,syuq,syup,syrv,sy35n,uLYJpc": "snake.js",
  "js:syo9,p3hmRc,syoc,syob,syoa,pNBFbe": "assets/www.google.com/xjs/_/js/1b8f1748c1.js",
  "ss:X3N0Bf,attn,cdos,gwc,hsm,jsa,mb4ZUb,cEt90b,SNUn3,qddgKe,sTsDMc,dtl0hd,eHDfl,YV5bee,d,csi": "assets/www.google.com/xjs/_/ss/6a5ac48759.css"
};

  // Mirrored files, keyed by the path a root-relative url would ask the site for.
  var ROOTMAP = {
  "/DarkSnakeGang/GoogleSnakeIcons/main/Extras/Discord.png": "raw.githubusercontent.com",
  "/DarkSnakeGang/GoogleSnakeIcons/main/ToggleDeathscreen/EyeIcon.png": "raw.githubusercontent.com",
  "/DarkSnakeGang/GoogleSnakeModLoader/main/build/mod-info.json": "raw.githubusercontent.com",
  "/images/branding/searchlogo/ico/favicon.ico": "www.gstatic.com",
  "/logos/fnbx/snake_arcade/arrow_audio.bin": "www.google.com",
  "/logos/fnbx/snake_arcade/cracks.png": "www.google.com",
  "/logos/fnbx/snake_arcade/dc_trophy.png": "www.google.com",
  "/logos/fnbx/snake_arcade/eat.png": "www.google.com",
  "/logos/fnbx/snake_arcade/effect.png": "www.google.com",
  "/logos/fnbx/snake_arcade/end_audio.bin": "www.google.com",
  "/logos/fnbx/snake_arcade/end_empty.png": "www.google.com",
  "/logos/fnbx/snake_arcade/game_audio.7.bin": "www.google.com",
  "/logos/fnbx/snake_arcade/halloween/default_jackolantern.png": "www.google.com",
  "/logos/fnbx/snake_arcade/halloween/px_jackolantern.png": "www.google.com",
  "/logos/fnbx/snake_arcade/halloween/real_jackolantern.png": "www.google.com",
  "/logos/fnbx/snake_arcade/keys.svg": "www.google.com",
  "/logos/fnbx/snake_arcade/mine.png": "www.google.com",
  "/logos/fnbx/snake_arcade/minesweeper_audio.bin": "www.google.com",
  "/logos/fnbx/snake_arcade/pixel/px_blink.png": "www.google.com",
  "/logos/fnbx/snake_arcade/pixel/px_box.png": "www.google.com",
  "/logos/fnbx/snake_arcade/pixel/px_circles.png": "www.google.com",
  "/logos/fnbx/snake_arcade/pixel/px_cracks.png": "www.google.com",
  "/logos/fnbx/snake_arcade/pixel/px_dc_trophy.png": "www.google.com",
  "/logos/fnbx/snake_arcade/pixel/px_default_end.png": "www.google.com",
  "/logos/fnbx/snake_arcade/pixel/px_die.png": "www.google.com",
  "/logos/fnbx/snake_arcade/pixel/px_eat.png": "www.google.com",
  "/logos/fnbx/snake_arcade/pixel/px_effect.png": "www.google.com",
  "/logos/fnbx/snake_arcade/pixel/px_gradient_end.png": "www.google.com",
  "/logos/fnbx/snake_arcade/pixel/px_mine.png": "www.google.com",
  "/logos/fnbx/snake_arcade/pixel/px_rainbow_end.png": "www.google.com",
  "/logos/fnbx/snake_arcade/pixel/px_sequence.png": "www.google.com",
  "/logos/fnbx/snake_arcade/pixel/px_speed_01.png": "www.google.com",
  "/logos/fnbx/snake_arcade/pixel/px_speed_02.png": "www.google.com",
  "/logos/fnbx/snake_arcade/pixel/px_tongue.png": "www.google.com",
  "/logos/fnbx/snake_arcade/pixel/v18/px_apple_00.png": "www.google.com",
  "/logos/fnbx/snake_arcade/pixel/v18/px_apple_01.png": "www.google.com",
  "/logos/fnbx/snake_arcade/pixel/v18/px_apple_02.png": "www.google.com",
  "/logos/fnbx/snake_arcade/pixel/v18/px_apple_03.png": "www.google.com",
  "/logos/fnbx/snake_arcade/pixel/v18/px_apple_04.png": "www.google.com",
  "/logos/fnbx/snake_arcade/pixel/v18/px_apple_05.png": "www.google.com",
  "/logos/fnbx/snake_arcade/pixel/v18/px_apple_06.png": "www.google.com",
  "/logos/fnbx/snake_arcade/pixel/v18/px_apple_07.png": "www.google.com",
  "/logos/fnbx/snake_arcade/pixel/v18/px_apple_08.png": "www.google.com",
  "/logos/fnbx/snake_arcade/pixel/v18/px_apple_09.png": "www.google.com",
  "/logos/fnbx/snake_arcade/pixel/v18/px_apple_10.png": "www.google.com",
  "/logos/fnbx/snake_arcade/pixel/v18/px_apple_11.png": "www.google.com",
  "/logos/fnbx/snake_arcade/pixel/v18/px_apple_12.png": "www.google.com",
  "/logos/fnbx/snake_arcade/pixel/v18/px_apple_13.png": "www.google.com",
  "/logos/fnbx/snake_arcade/pixel/v18/px_apple_14.png": "www.google.com",
  "/logos/fnbx/snake_arcade/pixel/v18/px_apple_15.png": "www.google.com",
  "/logos/fnbx/snake_arcade/pixel/v18/px_apple_16.png": "www.google.com",
  "/logos/fnbx/snake_arcade/pixel/v18/px_apple_17.png": "www.google.com",
  "/logos/fnbx/snake_arcade/pixel/v18/px_apple_18.png": "www.google.com",
  "/logos/fnbx/snake_arcade/pixel/v18/px_apple_19.png": "www.google.com",
  "/logos/fnbx/snake_arcade/pixel/v18/px_apple_20.png": "www.google.com",
  "/logos/fnbx/snake_arcade/pixel/v18/px_apple_21.png": "www.google.com",
  "/logos/fnbx/snake_arcade/pixel/v18/px_apple_22.png": "www.google.com",
  "/logos/fnbx/snake_arcade/pixel/v18/px_apple_23.png": "www.google.com",
  "/logos/fnbx/snake_arcade/pixel/v18/px_apple_24.png": "www.google.com",
  "/logos/fnbx/snake_arcade/pixel/v19/px_count_04.png": "www.google.com",
  "/logos/fnbx/snake_arcade/pixel/v19/px_count_05.png": "www.google.com",
  "/logos/fnbx/snake_arcade/pixel/v19/px_count_06.png": "www.google.com",
  "/logos/fnbx/snake_arcade/pixel/v19/px_key_types.png": "www.google.com",
  "/logos/fnbx/snake_arcade/pixel/v19/px_key_types_dark.png": "www.google.com",
  "/logos/fnbx/snake_arcade/pixel/v22/px_trophy_00.png": "www.google.com",
  "/logos/fnbx/snake_arcade/pixel/v22/px_trophy_01.png": "www.google.com",
  "/logos/fnbx/snake_arcade/pixel/v22/px_trophy_02.png": "www.google.com",
  "/logos/fnbx/snake_arcade/pixel/v22/px_trophy_03.png": "www.google.com",
  "/logos/fnbx/snake_arcade/pixel/v22/px_trophy_04.png": "www.google.com",
  "/logos/fnbx/snake_arcade/pixel/v22/px_trophy_05.png": "www.google.com",
  "/logos/fnbx/snake_arcade/pixel/v22/px_trophy_06.png": "www.google.com",
  "/logos/fnbx/snake_arcade/pixel/v22/px_trophy_07.png": "www.google.com",
  "/logos/fnbx/snake_arcade/pixel/v22/px_trophy_08.png": "www.google.com",
  "/logos/fnbx/snake_arcade/pixel/v22/px_trophy_09.png": "www.google.com",
  "/logos/fnbx/snake_arcade/pixel/v22/px_trophy_10.png": "www.google.com",
  "/logos/fnbx/snake_arcade/pixel/v22/px_trophy_11.png": "www.google.com",
  "/logos/fnbx/snake_arcade/pixel/v22/px_trophy_12.png": "www.google.com",
  "/logos/fnbx/snake_arcade/pixel/v22/px_trophy_13.png": "www.google.com",
  "/logos/fnbx/snake_arcade/pixel/v22/px_trophy_14.png": "www.google.com",
  "/logos/fnbx/snake_arcade/pixel/v22/px_trophy_15.png": "www.google.com",
  "/logos/fnbx/snake_arcade/pixel/v22/px_trophy_16.png": "www.google.com",
  "/logos/fnbx/snake_arcade/pixel/v22/px_trophy_17.png": "www.google.com",
  "/logos/fnbx/snake_arcade/pixel/v22/px_trophy_18.png": "www.google.com",
  "/logos/fnbx/snake_arcade/pixel/v22/px_trophy_19.png": "www.google.com",
  "/logos/fnbx/snake_arcade/pixel/v22/px_trophy_20.png": "www.google.com",
  "/logos/fnbx/snake_arcade/pixel/v22/px_trophy_21.png": "www.google.com",
  "/logos/fnbx/snake_arcade/pixel/v22/px_trophy_22.png": "www.google.com",
  "/logos/fnbx/snake_arcade/poison_audio.bin": "www.google.com",
  "/logos/fnbx/snake_arcade/random.png": "google.com",
  "/logos/fnbx/snake_arcade/real/v18/apple_00.png": "www.google.com",
  "/logos/fnbx/snake_arcade/real/v18/apple_01.png": "www.google.com",
  "/logos/fnbx/snake_arcade/real/v18/apple_02.png": "www.google.com",
  "/logos/fnbx/snake_arcade/real/v18/apple_03.png": "www.google.com",
  "/logos/fnbx/snake_arcade/real/v18/apple_04.png": "www.google.com",
  "/logos/fnbx/snake_arcade/real/v18/apple_05.png": "www.google.com",
  "/logos/fnbx/snake_arcade/real/v18/apple_06.png": "www.google.com",
  "/logos/fnbx/snake_arcade/real/v18/apple_07.png": "www.google.com",
  "/logos/fnbx/snake_arcade/real/v18/apple_08.png": "www.google.com",
  "/logos/fnbx/snake_arcade/real/v18/apple_09.png": "www.google.com",
  "/logos/fnbx/snake_arcade/real/v18/apple_10.png": "www.google.com",
  "/logos/fnbx/snake_arcade/real/v18/apple_11.png": "www.google.com",
  "/logos/fnbx/snake_arcade/real/v18/apple_12.png": "www.google.com",
  "/logos/fnbx/snake_arcade/real/v18/apple_13.png": "www.google.com",
  "/logos/fnbx/snake_arcade/real/v18/apple_14.png": "www.google.com",
  "/logos/fnbx/snake_arcade/real/v18/apple_15.png": "www.google.com",
  "/logos/fnbx/snake_arcade/real/v18/apple_16.png": "www.google.com",
  "/logos/fnbx/snake_arcade/real/v18/apple_17.png": "www.google.com",
  "/logos/fnbx/snake_arcade/real/v18/apple_18.png": "www.google.com",
  "/logos/fnbx/snake_arcade/real/v18/apple_19.png": "www.google.com",
  "/logos/fnbx/snake_arcade/real/v18/apple_20.png": "www.google.com",
  "/logos/fnbx/snake_arcade/real/v18/apple_21.png": "www.google.com",
  "/logos/fnbx/snake_arcade/real/v18/apple_22.png": "www.google.com",
  "/logos/fnbx/snake_arcade/real/v18/apple_23.png": "www.google.com",
  "/logos/fnbx/snake_arcade/real/v18/apple_24.png": "www.google.com",
  "/logos/fnbx/snake_arcade/sequence.png": "www.google.com",
  "/logos/fnbx/snake_arcade/statues_audio.bin": "www.google.com",
  "/logos/fnbx/snake_arcade/swipe.svg": "www.google.com",
  "/logos/fnbx/snake_arcade/tongue.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v18/apple_00.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v18/apple_01.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v18/apple_02.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v18/apple_03.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v18/apple_04.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v18/apple_05.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v18/apple_06.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v18/apple_07.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v18/apple_08.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v18/apple_09.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v18/apple_10.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v18/apple_11.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v18/apple_12.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v18/apple_13.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v18/apple_14.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v18/apple_15.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v18/apple_16.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v18/apple_17.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v18/apple_18.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v18/apple_19.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v18/apple_20.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v18/apple_21.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v18/apple_22.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v18/apple_23.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v18/apple_24.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v18/graphics_00.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v18/graphics_01.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v18/graphics_02.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v18/graphics_03.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v19/blink.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v19/count_00.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v19/count_01.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v19/count_02.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v19/count_03.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v19/count_04.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v19/count_05.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v19/count_06.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v19/die.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v19/key_types.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v19/key_types_dark.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v22/trophy_00.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v22/trophy_01.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v22/trophy_02.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v22/trophy_03.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v22/trophy_04.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v22/trophy_05.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v22/trophy_06.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v22/trophy_07.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v22/trophy_08.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v22/trophy_09.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v22/trophy_10.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v22/trophy_11.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v22/trophy_12.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v22/trophy_13.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v22/trophy_14.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v22/trophy_15.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v22/trophy_16.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v22/trophy_17.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v22/trophy_18.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v22/trophy_19.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v22/trophy_20.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v22/trophy_21.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v22/trophy_22.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v3/apple_00.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v3/default_end.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v3/gradient_end.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v3/rainbow_end.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v3/speed_00.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v3/speed_01.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v3/speed_02.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v3/trophy_00.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v4/box.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v4/size_00.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v4/size_01.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v4/size_02.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v5/color_00.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v5/color_01.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v5/color_02.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v5/color_03.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v5/color_04.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v5/color_05.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v5/color_06.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v5/color_07.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v5/color_08.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v5/color_09.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v5/color_10.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v5/color_11.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v5/color_12.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v5/color_13.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v5/color_14.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v5/color_15.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v5/color_16.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v5/color_17.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v5/color_18.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v5/theme_00.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v5/theme_01.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v5/theme_02.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v5/theme_03.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v5/theme_04.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v5/theme_05.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v5/theme_06.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v5/theme_07.png": "www.google.com",
  "/logos/fnbx/snake_arcade/v5/theme_08.png": "www.google.com",
  "/s/googlesans/v29/4UaGrENHsxJlGDuGo1OIlL3Owp4.woff2": "fonts.gstatic.com",
  "/s/i/short-term/release/googlesymbols/hide_image/default/24px.svg": "fonts.gstatic.com",
  "/s/i/short-term/release/googlesymbols/screen_rotation/default/48px.svg": "fonts.gstatic.com",
  "/s/roboto/v18/KFOlCnqEu92Fr1MmWUlfBBc4.woff2": "fonts.gstatic.com",
  "/s/roboto/v18/KFOmCnqEu92Fr1Mu4mxK.woff2": "fonts.gstatic.com",
  "/xjs/_/js/17b23782c4.js": "www.google.com",
  "/xjs/_/js/1b8f1748c1.js": "www.google.com",
  "/xjs/_/js/dcafcfa618.js": "www.google.com",
  "/xjs/_/ss/6a5ac48759.css": "www.google.com"
};

  function absolute(url) {
    if (url.slice(0, 2) === '//') { return 'https:' + url; }
    if (url.charAt(0) === '/' && url.charAt(1) !== '/') { return 'https://www.google.com' + url; }
    return url;
  }

  function moduleList(url) {
    var m = url.match(/\/m=([^\/?#]+)/);
    return m ? m[1] : null;
  }

  // TrustedScriptURL / URL objects: the rewrites only need the text form, and the
  // original value has to be handed back untouched when nothing matches.
  function coerceUrl(v) {
    if (typeof v === 'string') { return v; }
    if (v && typeof v === 'object') {
      try {
        var s = String(v);
        if (/^(https?:)?\/\//.test(s) || s.charAt(0) === '/') { return s; }
      } catch (e) {}
    }
    return null;
  }

  // Returns the local path for a google/gstatic url, or null when the url isn't ours to rewrite.
  function resolve(url) {
    url = coerceUrl(url);
    if (!url) { return null; }
    var abs = absolute(url);

    // url-rules.js claims some urls (the game bundle) before the local mirror gets a say.
    if (window.webSnake && typeof window.webSnake.resolveUrl === 'function') {
      var claimed = window.webSnake.resolveUrl(abs);
      if (claimed) { return claimed; }
    }

    if (EXACT[abs]) { return EXACT[abs]; }

    // root-relative: the site serves those itself, so only claim a mirrored copy
    if (url.charAt(0) === '/' && url.charAt(1) !== '/') {
      var rp = abs.match(/^https?:\/\/[^\/]+(\/.*)$/);
      var host = rp && ROOTMAP[rp[1]];
      return host ? BASE + host + rp[1] : null;
    }

    var m = abs.match(/^https?:\/\/([^\/]+)(\/.*)?$/);
    if (!m || !HOSTS[m[1]]) { return null; }
    var list = moduleList(abs);
    if (list) {
      var kind = (abs.indexOf('/xjs/_/ss/') !== -1) ? 'ss:' : 'js:';
      if (FINGERPRINT[kind + list]) { return FINGERPRINT[kind + list]; }
    }
    return BASE + m[1] + (m[2] || '/');
  }

  window.webSnakeLocal = { resolve: resolve };

  // ---- element src/href properties ----
  function patchProperty(proto, prop) {
    if (!proto) { return; }
    var desc = Object.getOwnPropertyDescriptor(proto, prop);
    if (!desc || !desc.set || !desc.get) { return; }
    Object.defineProperty(proto, prop, {
      configurable: true,
      enumerable: desc.enumerable,
      get: desc.get,
      set: function (value) {
        var local = resolve(value);
        desc.set.call(this, local || value);
      }
    });
  }

  patchProperty(window.HTMLImageElement && HTMLImageElement.prototype, 'src');
  patchProperty(window.HTMLScriptElement && HTMLScriptElement.prototype, 'src');
  patchProperty(window.HTMLLinkElement && HTMLLinkElement.prototype, 'href');
  patchProperty(window.HTMLMediaElement && HTMLMediaElement.prototype, 'src');
  patchProperty(window.HTMLSourceElement && HTMLSourceElement.prototype, 'src');
  patchProperty(window.SVGImageElement && SVGImageElement.prototype, 'href');

  // ---- setAttribute('src'/'href'/'poster') ----
  var origSetAttribute = Element.prototype.setAttribute;
  Element.prototype.setAttribute = function (name, value) {
    if (/^(src|href|poster)$/i.test(name)) {
      var local = resolve(value);
      if (local) { value = local; }
    } else if (typeof value === 'string' && /^style$/i.test(name)) {
      value = rewriteCssText(value);
    }
    return origSetAttribute.call(this, name, value);
  };

  // ---- markup built as strings (innerHTML, document.write): the parser
  // ---- assigns those attributes directly, so property patches never see them.
  var MARKUP_URL = /((?:https?:)?\/\/(?:www\.)?(?:google\.com|gstatic\.com|googleapis\.com|raw\.githubusercontent\.com))([^\s"'<>()\\]*)/g;

  function rewriteMarkup(text) {
    var s = coerceUrl(text);
    if (!s || s.indexOf('google') < 0) { return text; }
    return s.replace(MARKUP_URL, function (whole) {
      var local = resolve(whole);
      return local || whole;
    });
  }

  function patchMarkupProperty(proto, prop) {
    if (!proto) { return; }
    var desc = Object.getOwnPropertyDescriptor(proto, prop);
    if (!desc || !desc.set || !desc.get) { return; }
    Object.defineProperty(proto, prop, {
      configurable: true,
      enumerable: desc.enumerable,
      get: desc.get,
      set: function (value) { desc.set.call(this, rewriteMarkup(value)); }
    });
  }

  patchMarkupProperty(Element.prototype, 'innerHTML');
  patchMarkupProperty(Element.prototype, 'outerHTML');

  var origInsertAdjacentHTML = Element.prototype.insertAdjacentHTML;
  Element.prototype.insertAdjacentHTML = function (position, html) {
    return origInsertAdjacentHTML.call(this, position, rewriteMarkup(html));
  };

  ['write', 'writeln'].forEach(function (name) {
    var orig = document[name] ? document[name].bind(document) : null;
    if (!orig) { return; }
    document[name] = function () {
      var args = Array.prototype.map.call(arguments, rewriteMarkup);
      return orig.apply(null, args);
    };
  });

  // analytics only, and snake-web-initial.js stubs it again later anyway
  if (navigator.sendBeacon) {
    navigator.sendBeacon = function () { return true; };
  }

  // ---- css url(...) set through the CSSOM ----
  if (window.CSSStyleDeclaration) {
    var cssProto = CSSStyleDeclaration.prototype;
    if (typeof cssProto.setProperty === 'function') {
      var origSetProperty = cssProto.setProperty;
      cssProto.setProperty = function (name, value, priority) {
        if (typeof value === 'string' && value.indexOf('url(') >= 0) { value = rewriteCssText(value); }
        return origSetProperty.call(this, name, value, priority);
      };
    }
    ['backgroundImage', 'background', 'borderImage', 'listStyleImage',
     'maskImage', 'content'].forEach(function (prop) {
      patchCssValueProperty(cssProto, prop);
    });
  }

  // ---- XHR ----
  var origOpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function (method, url) {
    var args = Array.prototype.slice.call(arguments);
    if (typeof url === 'string') {
      var local = resolve(url);
      if (local) { args[1] = local; }
    }
    return origOpen.apply(this, args);
  };

  // ---- fetch ----
  if (typeof window.fetch === 'function') {
    var origFetch = window.fetch.bind(window);
    window.fetch = function (resource, init) {
      var url = null;
      if (typeof resource === 'string') { url = resource; }
      else if (resource instanceof URL) { url = resource.href; }
      else if (typeof Request !== 'undefined' && resource instanceof Request) { url = resource.url; }
      var local = url ? resolve(url) : null;
      if (!local) { return origFetch(resource, init); }
      if (typeof resource === 'string' || resource instanceof URL) { return origFetch(local, init); }
      return origFetch(new Request(local, resource), init);
    };
  }

  // ---- css url(...) inside <style> elements added at runtime ----
  var CSS_URL = /url\(\s*(['"]?)([^'")]+)\1\s*\)/g;

  function rewriteCssText(text) {
    return text.replace(CSS_URL, function (whole, quote, url) {
      var local = resolve(url.trim());
      return local ? 'url(' + quote + local + quote + ')' : whole;
    });
  }

  // css value properties (background-image and friends) written through the cssom
  function patchCssValueProperty(proto, prop) {
    if (!proto) { return; }
    var desc = Object.getOwnPropertyDescriptor(proto, prop);
    if (!desc || !desc.set || !desc.get) { return; }
    Object.defineProperty(proto, prop, {
      configurable: true,
      enumerable: desc.enumerable,
      get: desc.get,
      set: function (value) { desc.set.call(this, rewriteCssText(value)); }
    });
  }

  function rewriteStyle(el) {
    var text = el.textContent;
    var next = rewriteCssText(text);
    if (next !== text) { el.textContent = next; }
  }

  function scan(node) {
    if (node.nodeType !== 1) { return; }
    if (node.nodeName === 'STYLE') { rewriteStyle(node); }
    var styles = node.querySelectorAll ? node.querySelectorAll('style') : [];
    for (var i = 0; i < styles.length; i++) { rewriteStyle(styles[i]); }
  }

  function startObserver() {
    if (!window.MutationObserver || !document.documentElement) { return; }
    new MutationObserver(function (mutations) {
      for (var i = 0; i < mutations.length; i++) {
        var mut = mutations[i];
        if (mut.type === 'characterData') {
          var parent = mut.target.parentNode;
          if (parent && parent.nodeName === 'STYLE') { rewriteStyle(parent); }
          continue;
        }
        var added = mut.addedNodes;
        for (var j = 0; j < added.length; j++) { scan(added[j]); }
      }
    }).observe(document.documentElement, { childList: true, subtree: true, characterData: true });
  }

  startObserver();
})();
