// local-assets.js - serves every google/gstatic resource from ./assets so the page runs offline.
// Generated for v/12. Maps XHR, fetch, element src/href and CSS url() onto the local mirror.
(function () {
  "use strict";

  var BASE = "assets/";

  var HOSTS = {
    "www.google.com": 1,
    "google.com": 1,
    "fonts.gstatic.com": 1,
    "www.gstatic.com": 1,
    "www.googleapis.com": 1,
    "raw.githubusercontent.com": 1
  };

  // Exact URLs for the xjs bundles (their local names can't be rebuilt from the url).
  var EXACT = {
    "https://www.google.com/xjs/_/js/k=xjs.s.en.-pnnDAjjICQ.2019.O/am=AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAiAAgAQACAAAQAAAAAAAAAAAAAAAAAAAAwABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQgAAAAZAAAAAAAAAAABAEAAAAAAACAAAAAAAAAAYAEABAACEAAAAACgAAAAAAAAAAAAAAAAAAAAAAABAEAAAAEQggAAAA_G2-AQBAAwAAAAAABwAAAAAAAAAAAAAAAAAAAAAAAAAAAEgAAAAAAAAAAADAAgAAAAIDAAAEgIAACAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAACAAAAAAACgAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAQAAAAIACAAAAAABwAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAACAAAYAAAAAAAAAAAAAAACBHwAEQAAAAAAAAAQAAAAAAAAgAAIAAAAAAAAAAgABAAwAAACAHACPB8AQQQEAAAAAAAAAAAAAAAAAAAAAAAAAAAFQAHMgCQiAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACkCE8BAAAAAACwNQAg/dg=0/ichc=1/rs=ACT90oF4ztWyH4yvJBeT26SaE-xokHJmjQ/cb=loaded_h_0?cb=121509378": "snake-loader.js",
    "https://www.google.com/xjs/_/js/k=xjs.s.en.-pnnDAjjICQ.2019.O/am=AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAiAAgAQACAAAQAAAAAAAAAAAAAAAAAAAAwABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQgEAAAZAAAAAAAAAAABAEAAAAAAACAAAAAAAAAAYAEABAACUAAAAACgAAAAAAAAAAAAAAAAAAAAAAABAEAAAAEQggAAAA_G2-AQBAAwAAAAAABwAAAAAAAAAAAAAAAAAAAAAAAAAAAEgAAAAAAAAAAADAAgAAAAIDAAAEgIAACAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAACAAAAAAACgAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAQAAAAIACAAAAAABwAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAACAAAYAAAAAAAAAAAAAAACBHwAEQAAAAAAAAAQAAAAAAAAgAAIAAAAAAAAAAgABAAwAAACAHACPB8AQQQEAAAAAAAAAAAAAAAAAAAAAAAAAAAFQAHMgKQiAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACkCE8BAAAAAACwNQAg/d=1/ed=1/dg=4/ichc=1/rs=ACT90oHjHeRT-VSFoJjSK89QXjexzy6AsQ/ee=ALeJib:B8gLwd;AfeaP:TkrAjf;BMxAGc:E5bFse;BgS6mb:fidj5d;BjwMce:cXX2Wb;CIZTGb:Kqhykb;CxXAWb:YyRLvc;DM55c:imLrKe;DQEued:Fevhcf;DULqB:RKfG5c;Dkk6ge:JZmW9e;DpcR3d:zL72xf;EABSZ:MXZt9d;ESrPQc:mNTJvc;EVNhjf:pw70Gc;EjXHpb:pSHqh;EmZ2Bf:zr1jrb;EnlcNd:WeHg4;F54IAe:ZgsFh;F9mqte:UoRcbe;FSxmUe:fiZR8b;Fkukfc:i8H2c;Fmv9Nc:O1Tzwc;FqHJkd:yQamIb;G0KhTb:LIaoZ;GleZL:J1A7Od;HMDDWe:G8QUdb;HtPxrd:Gx8jAb;IBADCc:RYquRb;IoGlCf:b5lhvb;IsdWVc:qzxzOb;JXJSm:ii1RGf;JXS8fb:Qj0suc;JqSq7d:y9ePhe;JsbNhc:Xd8iUd;K08hxe:zmbGlf;K5nYTd:ZDZcre;KA3P2:C3JnCe;KDb6nb:fE9n2;KOxcK:OZqGte;KQzWid:ZMKkN;KdIHef:BWtNj;KpRAue:Tia57b;LBgRLc:SdcwHb,XVMNvd;LBn8Cf:bJ9L0c;LEikZe:byfTOb,lsjVmc;LXA8b:q7OdKd;LsNahb:ucGLNb;MNkAde:KMCd1d;NJ1rfe:qTnoBf;NPKaK:SdcwHb;NSEoX:lazG7b;NjIwef:YVgi7d;Np8Qkd:Dpx6qc;Nyt6ic:jn2sGd;OIfWUb:qfOYcd;OgagBe:cNTe0;OiqE2c:TFpEK;OoK5v:Sp69O;OohIYe:mpEAQb;Pjplud:PoEs9b;PpTLXd:pJYjx;PqHfGe:im2cZe;Q1Ow7b:x5CSu;Q7iJ9c:bVLZ3d;QE20Be:yxCHBd;QFOGlf:PQ2Aoe;QGR0gd:Mlhmy;QYLF2b:pAQYUd;Qw8Feb:jpavUe;R4IIIb:QWfeKf;R9Ulx:CR7Ufe;RCF5Sd:X1kBmd;RZtOEd:DvKcFe;Raf5me:mgvFMc;SLtqO:Kh1xYe;SMDL4c:fTfGO;SNUn3:ZwDk9d,xD8Kp;SNk4Je:wWMhg;ScI3Yc:e7Hzgb,e7Hzgb;ShpF6e:N0pvGc;Snahre:mGCtob;SwCqAd:fXbCZc;SzQQ3e:dNhofb;TIUVQd:lWTJwd;TroZ1d:vVVzjb;U96pRd:FsR04;UBKJZ:LGDJGb;UDrY1c:N0F29d,W50NVd,eps46d,wciyUe;UVmjEd:EesRsb;UVzb9c:IvPZ6d;UYRIEb:HzTAQc;UyG7Kb:wQd0G;V2HTTe:RolTY;VGRfx:VFqbr;VMuEm:pL7sBc;VN6jIc:ddQyuf;VOcgDe:YquhTb;VhA7bd:vAmQFf;VsAqSb:PGf2Re;W9QSQe:ynCWwc;WDGyFe:jcVOxd;WXtNeb:QU9BMd;Wfmdue:g3MJlb;Wl55ib:NcYlP;Y3c5sd:FGbfLe;YIZmRd:A1yn5d;YV5bee:IvPZ6d;YnHUBf:sNsSob;ZMvdv:PHFPjb;ZSH6tc:QAvyLe;ZWEUA:afR4Cf;Zen4yb:jMF88c;ZlFEdf:fQTtic;ZlOOMb:P0I0Ec;ZnPvub:Acmyhd;a56pNe:JEfCwb;aAJE9c:WHW6Ef;aCJ9tf:qKftvc;aVZq3e:EMeVIb;aZ61od:arTwJ;aci7y:Z5Tr6c;bUIkwb:WMwEHe;bcPXSc:gSZLJb;cEt90b:ws9Tlc;cFTWae:gT8qnd;coJ8e:KvoW8;dIoSBb:ZgGg9b;dLlj2:Qqt3Gf;dXdZV:a7QTqd;dowIGb:ebZ3mb,ebZ3mb;dtl0hd:lLQWFe;eBAeSb:Ck63tb;eBZ5Nd:audvde;eHDfl:ofjVkb;eJKchc:ATg1be;eO3lse:UefOmb;euOXY:OZjbQ;g8nkx:U4MzKc;gaub4:TN6bMe;gbfHR:qZtzib;gtVSi:ekUOYd;h3MYod:ws9Tlc;hK67qb:QWEO5b;hVic1b:Kqhykb;heHB1:sFczq;hjRo6e:F62sG;hlqGX:FWz1ic;hsLsYc:Vl118;hwoVHd:zw4U8c;iFQyKf:QIhFr;jJj2G:kF2o2b;k1O0rf:pnOULd;k2Qxcb:XY51pe;kbAm9d:MkHyGd;lOO0Vd:OTA3Ae;lbfkyf:MqGdUd;liAz7d:kF2o2b;lkq0A:JyBE3e;mMVOGb:qDM7K;mWzs9c:fz5ukf;nBZnZe:CvErjb;nE6OJf:Fi4rsc;nEBWNb:MxKX9d;nJw4Gd:dPFZH;nrDcw:SuEoDe;oGtAuc:sOXFj;oSUNyd:fTfGO,fTfGO;oUlnpc:RagDlc;oiBhre:OuMkRd;okUaUd:wItadb;pKJiXd:VCenhc;pNsl2d:j9Yuyc;pXdRYb:JKoKVe;pj82le:ww04Df;qGV2uc:HHi04c;qQEoOc:KUM7Z,d7YSfd;qZx2Fc:j0xrE;qaS3gd:yiLg6e;qafBPd:sgY6Zb;qavrXe:I0C9u;qddgKe:d7YSfd,x4FYXe;rdexKf:FEkKD;rmWaj:PMS6Sd;ropkZ:hjoqoe;sTsDMc:JksfDf;sZmdvc:rdGEfc;tH4IIe:Ymry6;teSRSb:BMLai;tosKvd:ZCqP3;trZL0b:qY8PFe;twgzJd:Ix7YEd;uknmt:GkPrzb;uuQkY:u2V3ud;vEYCNb:FaqsVd;vRlMvf:Iw9Xo;vfVwPd:lcrkwe;w3bZCb:ZPGaIb;w9w86d:XwhUEb,dt4g2b,gKD90c,lWVZVe;wFpbG:JbGbBc;wQlYve:aLUfP;wR5FRb:O1Gjze,TtcOte;wV5Pjc:L8KGxe;x9N9ie:KH4Qof;xBbsrc:NEW1Qc;xbe2wc:wbTLEd;xpaRob:AVqZ9b;yiL5Ab:MT0ZBd;ysNiMc:CpIBjd;yxTchf:KUM7Z;z97YGf:oug9te;zaIgPb:Sl0pxd/cb=loaded_h_0/m=X3N0Bf,attn,cdos,gwc,hsm,jsa,mb4ZUb,cEt90b,SNUn3,qddgKe,sTsDMc,dtl0hd,eHDfl,YV5bee,d,csi?cb=121509378": "snake-loader.js",
    "https://www.google.com/xjs/_/js/k=xjs.s.en.-pnnDAjjICQ.2019.O/ck=xjs.s.fHTNJ7fpnys.L.B1.O/am=AAAIAAAAAAACAAAAAAAAAAAAAAECiAAAAAAAAAAAAAAAAAAAAAgBgAAAAAQAAAAAAAAAAAAAAFAAIAAAAAAAAAAAEAQAAAAMAAAgAiAAoAQACAAAQjRABAAgAAAAAAAAAEChDwABABgAAAAAAAAegAHgCAAAAAAAAAAAAAAQgEAAAZAAAAAAAAAAABAEAAAAAAACAAAABAAAAAYAEABAACUAAACACgAAAIAAAAAAgAAAAAAAAAAAABFEAAAAEQggAAAA_G2-AQDAAwAAAAAABwAAAAAAACAAAAAAAAAAABAAAAAAAEgEDgAAAAAAAMLAAgAAAAIDAAAEgIAACAAAAAAAAAAAiARIAAAEAAACAMAAAAAAAAAAAIAAgCAEAgAgACgAAQEAAAGA8wAAAQAAAAAAAAAAEAAAAAAAAAgAAAAAAgAQBCAEEAAAAAAAQAAAAIACEAAAAAByAAAAAAAAABBIACAAAQCMIAEAkCgIABABABCAAAYAAACIAAAAAAAAAAiJHwAEQAAAAAAAAEQAAAAAAAAgAAIAAAAALADAAgEBAAwAAACAHACPB8AQQQEAAAAAAAAAAAAAAAAAAAAAAAAAAAFQAHMgKQiAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACkCE8BAAAAAACwNQAg/d=0/dg=0/ujg=1/ichc=1/rs=ACT90oFSCIKlK-K4B7ZhO5Pfh-u8pYfUIA/cb=loaded_h_0/m=sy36j,sy36k,Qj0suc,JXS8fb,QKZgZd,DKYIHe,sy36l,sy38f,sy1xz,sy38e,sy389,sy38a,sy38d,sy1xy,sy38b,sy1y0,sy38c,sy385,syg8,sydg,sy37z,sy37y,sy37b,sy36v,sy36u,sy37w,sy37x,sy383,sy382,sy384,sy37v,sy2h3,sy2h9,sy2h2,sy2h5,sy2h6,sy2h8,sy2h7,sydh,sydi,syfs,syft,sye6,sydn,sy2ha,sy377,synt,sy37r,synw,sy37s,sy2rv,sy2sg,syfx,sydl,sydm,syg6,sy37g,sy37f,sy37o,sy37n,sy37m,sy36x,sy37k,sy37j,sy37i,sya4,sy37h,sy376,sy374,sy1kg,sy2mz,sy373,syip,sye4,syda,sy2n3,sy371,sy370,sy36y,sy34c,sy2mx,sy2y4,sy34a,sy2rp,sy2rg,sy2rf,sy2r1,sy2lz,sy2nj,sy2jp,sy2jr,sy2js,sye2,sydo,sye3,sy2i5,sy2hg,sy2hi,sy2hj,sy2i3,sy2ja,sy2i0,sy2j4,sy1yu,syg7,syfz,syf9,syf8,syf3,syf2,syf1,syf0,syex,sydz,sydv,sydy,sydx,sydu,syds,sydt,sye1,sydp,sydk,syd6,syep,syem,syck,sycl,sycj,sybv,sya5,sy36w,sy387,sy36p,syg5,sy2s5,sy2zv,sy2s2,sy2ry,sy2db,Wct42?cb=121509378&xjs=s3": "assets/www.google.com/xjs/_/js/17b23782c4.js",
    "https://www.google.com/xjs/_/js/k=xjs.s.en.-pnnDAjjICQ.2019.O/ck=xjs.s.fHTNJ7fpnys.L.B1.O/am=AAAIAAAAAAACAAAAAAAAAAAAAAECiAAAAAAAAAAAAAAAAAAAAAgBgAAAAAQAAAAAAAAAAAAAAFAAIAAAAAAAAAAAEAQAAAAMAAAgAiAAoAQACAAAQjRABAAgAAAAAAAAAEChDwABABgAAAAAAAAegAHgCAAAAAAAAAAAAAAQgEAAAZAAAAAAAAAAABAEAAAAAAACAAAABAAAAAYAEABAACUAAACACgAAAIAAAAAAgAAAAAAAAAAAABFEAAAAEQggAAAA_G2-AQDAAwAAAAAABwAAAAAAACAAAAAAAAAAABAAAAAAAEgEDgAAAAAAAMLAAgAAAAIDAAAEgIAACAAAAAAAAAAAiARIAAAEAAACAMAAAAAAAAAAAIAAgCAEAgAgACgAAQEAAAGA8wAAAQAAAAAAAAAAEAAAAAAAAAgAAAAAAgAQBCAEEAAAAAAAQAAAAIACEAAAAAByAAAAAAAAABBIACAAAQCMIAEAkCgIABABABCAAAYAAACIAAAAAAAAAAiJHwAEQAAAAAAAAEQAAAAAAAAgAAIAAAAALADAAgEBAAwAAACAHACPB8AQQQEAAAAAAAAAAAAAAAAAAAAAAAAAAAFQAHMgKQiAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACkCE8BAAAAAACwNQAg/d=0/dg=0/ujg=1/ichc=1/rs=ACT90oFSCIKlK-K4B7ZhO5Pfh-u8pYfUIA/cb=loaded_h_0/m=syo9,p3hmRc,syoc,syob,syoa,pNBFbe?cb=121509378&xjs=s3": "assets/www.google.com/xjs/_/js/1b8f1748c1.js",
    "https://www.google.com/xjs/_/js/md=2/k=xjs.s.en.-pnnDAjjICQ.2019.O/am=AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAiAAgAQACAAAQAAAAAAAAAAAAAAAAAAAAwABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQgEAAAZAAAAAAAAAAABAEAAAAAAACAAAAAAAAAAYAEABAACUAAAAACgAAAAAAAAAAAAAAAAAAAAAAABAEAAAAEQggAAAA_G2-AQBAAwAAAAAABwAAAAAAAAAAAAAAAAAAAAAAAAAAAEgAAAAAAAAAAADAAgAAAAIDAAAEgIAACAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAACAAAAAAACgAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAQAAAAIACAAAAAABwAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAACAAAYAAAAAAAAAAAAAAACBHwAEQAAAAAAAAAQAAAAAAAAgAAIAAAAAAAAAAgABAAwAAACAHACPB8AQQQEAAAAAAAAAAAAAAAAAAAAAAAAAAAFQAHMgKQiAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACkCE8BAAAAAACwNQAg/rs=ACT90oHjHeRT-VSFoJjSK89QXjexzy6AsQ?cb=121509378": "assets/www.google.com/xjs/_/js/dcafcfa618.js",
    "https://www.google.com/xjs/_/ss/k=xjs.s.fHTNJ7fpnys.L.B1.O/am=AAAIAAAAAAACAAAAAAAAAAAAAAECiAAAAAAAAAAAAAAAAAAAAAgBgAAAAAQAAAAAAAAAAAAAAFAAIAAAAAAAAAAAEAQAAAAMAAAAAAAAoAAAAAAAAjRABAAgAAAAAAAAAEChDwAAABgAAAAAAAAegAHgCAAAAAAAAAAAAAAAAEAAAJAAAAAAAAAAABAEAAAAAAAAAAAABAAAAAAAEABAAAUAAACAAAAAAIAAAAAAgAAAAAAAAAAAAAFEAAAAAAAgAAAAAAAAAACAAwAAAAAAAAAAAAAAACAAAAAAAAAAABAAAAAAAAAEDgAAAAAAAMIAAAAAAAAAAAAEAIAAAAAAAAAAAAAAiARIAAAEAAAAAMAAAAAAAAAAAIAAgCAEAgAgACgAAQEAAACA8wAAAQAAAAAAAAAAEAAAAAAAAAAAAAAAAgAQBCAEEAAAAAAAQAAAAAAAEAAAAAByAAAAAAAAABBAACAAAQCMIAEAkCgIABABABAAAAQAAACIAAAAAAAAAAgIAAAAAAAAAAAAAEQAAAAAAAAAAAAAAAAALADAAgEBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACA/d=1/ed=1/cb=loaded_h_0/rs=ACT90oFjopU1SJFFjPWd4c_sYJ-jurDU0A/m=X3N0Bf,attn,cdos,gwc,hsm,jsa,mb4ZUb,cEt90b,SNUn3,qddgKe,sTsDMc,dtl0hd,eHDfl,YV5bee,d,csi?cb=121509378": "assets/www.google.com/xjs/_/ss/6a5ac48759.css",
    "https://www.google.com/xjs/_/ss/k=xjs.s.fHTNJ7fpnys.L.B1.O/am=AAAIAAAAAAACAAAAAAAAAAAAAAECiAAAAAAAAAAAAAAAAAAAAAgBgAAAAAQAAAAAAAAAAAAAAFAAIAAAAAAAAAAAEAQAAAAMAAAAAAAAoAAAAAAAAjRABAAgAAAAAAAAAEChDwAAABgAAAAAAAAegAHgCAAAAAAAAAAAAAAAAEAAAJAAAAAAAAAAABAEAAAAAAAAAAAABAAAAAAAEABAAAUAAACAAAAAAIAAAAAAgAAAAAAAAAAAAAFEAAAAAAAgAAAAAAAAAACAAwAAAAAAAAAAAAAAACAAAAAAAAAAABAAAAAAAAAEDgAAAAAAAMIAAAAAAAAAAAAEAIAAAAAAAAAAAAAAiARIAAAEAAAAAMAAAAAAAAAAAIAAgCAEAgAgACgAAQEAAACA8wAAAQAAAAAAAAAAEAAAAAAAAAAAAAAAAgAQBCAEEAAAAAAAQAAAAAAAEAAAAAByAAAAAAAAABBAACAAAQCMIAEAkCgIABABABAAAAQAAACIAAAAAAAAAAgIAAAAAAAAAAAAAEQAAAAAAAAAAAAAAAAALADAAgEBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACA/d=0/ichc=1/rs=ACT90oFjopU1SJFFjPWd4c_sYJ-jurDU0A/cb=loaded_h_0/m=DKYIHe?cb=121509378&xjs=s4": "assets/www.google.com/xjs/_/ss/6a5ac48759.css"
  };

  // Same bundles keyed on their /m= module list, for when google re-signs the url.
  var FINGERPRINT = {
    "js:X3N0Bf,attn,cdos,gwc,hsm,jsa,mb4ZUb,cEt90b,SNUn3,qddgKe,sTsDMc,dtl0hd,eHDfl,YV5bee,d,csi": "snake-loader.js",
    "js:sy36j,sy36k,Qj0suc,JXS8fb,QKZgZd,DKYIHe,sy36l,sy38f,sy1xz,sy38e,sy389,sy38a,sy38d,sy1xy,sy38b,sy1y0,sy38c,sy385,syg8,sydg,sy37z,sy37y,sy37b,sy36v,sy36u,sy37w,sy37x,sy383,sy382,sy384,sy37v,sy2h3,sy2h9,sy2h2,sy2h5,sy2h6,sy2h8,sy2h7,sydh,sydi,syfs,syft,sye6,sydn,sy2ha,sy377,synt,sy37r,synw,sy37s,sy2rv,sy2sg,syfx,sydl,sydm,syg6,sy37g,sy37f,sy37o,sy37n,sy37m,sy36x,sy37k,sy37j,sy37i,sya4,sy37h,sy376,sy374,sy1kg,sy2mz,sy373,syip,sye4,syda,sy2n3,sy371,sy370,sy36y,sy34c,sy2mx,sy2y4,sy34a,sy2rp,sy2rg,sy2rf,sy2r1,sy2lz,sy2nj,sy2jp,sy2jr,sy2js,sye2,sydo,sye3,sy2i5,sy2hg,sy2hi,sy2hj,sy2i3,sy2ja,sy2i0,sy2j4,sy1yu,syg7,syfz,syf9,syf8,syf3,syf2,syf1,syf0,syex,sydz,sydv,sydy,sydx,sydu,syds,sydt,sye1,sydp,sydk,syd6,syep,syem,syck,sycl,sycj,sybv,sya5,sy36w,sy387,sy36p,syg5,sy2s5,sy2zv,sy2s2,sy2ry,sy2db,Wct42": "assets/www.google.com/xjs/_/js/17b23782c4.js",
    "js:syk2,aLUfP,wQlYve,sy9sm,sy4p1,sy4sl,sy9sl,sy9sk,sy5wy,sy36a,sy388,sy20q,sy9w,sy35w,sy1r1,pKhWu,sy5vu,sy2sb,sy2ds,oQfbDd,abd,sy5vo,TDFkye,sy8py,sy8te,sy8tc,sy1n8,sy1m9,sy1lv,sy1lu,sy1lr,sy1lx,sy1lt,sy1lw,sy1m4,sy4iu,sy4iv,sy1lq,sy1lk,sy1ls,sy8td,sy62f,qmjr3,sy8ta,sy5xa,IQw9J,sy5vp,sy3ey,sy178,sy3f1,sy3ez,sy56i,sy26p,sy56d,sy56g,sy26q,sy56e,sy3f0,sy56f,sy56a,sy569,sy56b,sy1rb,sy56c,sy2dy,sy2dw,sy416,sy2dx,sy2e1,sy2e4,sy2du,sylp,sylq,sy2dv,sy1rq,sy2e0,sylz,sy413,sy20n,sy1s8,sy15c,sy15d,sy158,sy15e,sy567,ily0Be,sy671,sy3z7,Zihehd,sy63g,sy15j,sy20y,mf2ifc,sy36c,sy36b,n7qy6d,sy36e,HPGtmd,sy2n8,sy36h,sy36f,sy16a,syvp,syvc,syv9,syv8,syuq,syup,syrv,sy35n,uLYJpc": "snake.js",
    "js:syo9,p3hmRc,syoc,syob,syoa,pNBFbe": "assets/www.google.com/xjs/_/js/1b8f1748c1.js",
    "ss:X3N0Bf,attn,cdos,gwc,hsm,jsa,mb4ZUb,cEt90b,SNUn3,qddgKe,sTsDMc,dtl0hd,eHDfl,YV5bee,d,csi": "assets/www.google.com/xjs/_/ss/6a5ac48759.css",
    "ss:DKYIHe": "assets/www.google.com/xjs/_/ss/6a5ac48759.css"
  };
  function moduleList(url) {
    var m = url.match(/\/m=([^\/?#]+)/);
    return m ? m[1] : null;
  }
  function absolute(url) {
    if (url.slice(0, 2) === "//") { return "https:" + url; }
    if (url.charAt(0) === "/" && url.charAt(1) !== "/") { return "https://www.google.com" + url; }
    return url;
  }
  function coerceUrl(v) {
    if (typeof v === "string") { return v; }
    if (v && typeof v === "object") {
      try { var s = String(v); if (/^(https?:)?\/\//.test(s) || s.charAt(0) === "/") { return s; } } catch (e) {}
    }
    return null;
  }
  function resolve(url) {
    url = coerceUrl(url);
    if (!url) { return null; }
    var abs = absolute(url);
    if (window.webSnake && typeof window.webSnake.resolveUrl === "function") {
      var claimed = window.webSnake.resolveUrl(abs);
      if (claimed) { return claimed; }
    }
    if (EXACT[abs]) { return EXACT[abs]; }
    var m = abs.match(/^https?:\/\/([^\/]+)(\/.*)?$/);
    if (!m || !HOSTS[m[1]]) { return null; }
    var list = moduleList(abs);
    if (list) {
      var kind = (abs.indexOf("/xjs/_/ss/") !== -1) ? "ss:" : "js:";
      if (FINGERPRINT[kind + list]) { return FINGERPRINT[kind + list]; }
    }
    return BASE + m[1] + (m[2] || "/");
  }
  window.webSnakeLocal = { resolve: resolve };
  function patchProperty(proto, prop) {
    if (!proto) { return; }
    var desc = Object.getOwnPropertyDescriptor(proto, prop);
    if (!desc || !desc.set || !desc.get) { return; }
    Object.defineProperty(proto, prop, { configurable: true, enumerable: desc.enumerable, get: desc.get, set: function (value) { var local = resolve(value); desc.set.call(this, local || value); } });
  }
  patchProperty(window.HTMLImageElement && HTMLImageElement.prototype, "src");
  patchProperty(window.HTMLScriptElement && HTMLScriptElement.prototype, "src");
  patchProperty(window.HTMLLinkElement && HTMLLinkElement.prototype, "href");
  patchProperty(window.HTMLMediaElement && HTMLMediaElement.prototype, "src");
  patchProperty(window.HTMLSourceElement && HTMLSourceElement.prototype, "src");
  var origSetAttribute = Element.prototype.setAttribute;
  Element.prototype.setAttribute = function (name, value) {
    if (/^(src|href|poster)$/i.test(name)) {
      var local = resolve(value);
      if (local) { value = local; }
    }
    return origSetAttribute.call(this, name, value);
  };
  var MARKUP_URL = /((?:https?:)?\/\/(?:www\.)?(?:google\.com|gstatic\.com|googleapis\.com|raw\.githubusercontent\.com))([^\s"'<>()\\]*)/g;
  function rewriteMarkup(text) {
    var s = text;
    if (!s || s.indexOf("google") < 0) { return text; }
    return String(s).replace(MARKUP_URL, function (whole) {
      var local = resolve(whole);
      return local || whole;
    });
  }
  function patchMarkupProperty(proto, prop) {
    if (!proto) { return; }
    var desc = Object.getOwnPropertyDescriptor(proto, prop);
    if (!desc || !desc.set || !desc.get) { return; }
    Object.defineProperty(proto, prop, { configurable: true, enumerable: desc.enumerable, get: desc.get, set: function (value) { desc.set.call(this, rewriteMarkup(value)); } });
  }
  patchMarkupProperty(Element.prototype, "innerHTML");
  patchMarkupProperty(Element.prototype, "outerHTML");
})();
