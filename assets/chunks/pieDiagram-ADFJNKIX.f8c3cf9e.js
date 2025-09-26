import{P as Z,A as j,B as Q,s as V,i as Y,k as q,j as H,g as s,v as D,G as J,l as K,Q as X,aW as ee,aY as te,aZ as G,a_ as ae,x as re,a$ as ie}from"../app.bf4098c6.js";import{p as se}from"./chunk-4BX2VUAB.1fb6bc9a.js";import{p as le}from"./mermaid-parser.core.65a3cd02.js";import"./baseUniq.4f32b70c.js";import"./basePickBy.71114676.js";import"./clone.8e5960a3.js";var P=Z.pie,C={sections:new Map,showData:!1,config:P},f=C.sections,$=C.showData,ne=structuredClone(P),oe=s(()=>structuredClone(ne),"getConfig"),ce=s(()=>{f=new Map,$=C.showData,J()},"clear"),pe=s(({label:e,value:a})=>{if(a<0)throw new Error(`"${e}" has invalid value: ${a}. Negative values are not allowed in pie charts. All slice values must be >= 0.`);f.has(e)||(f.set(e,a),D.debug(`added new section: ${e}, with value: ${a}`))},"addSection"),de=s(()=>f,"getSections"),ge=s(e=>{$=e},"setShowData"),ue=s(()=>$,"getShowData"),M={getConfig:oe,clear:ce,setDiagramTitle:j,getDiagramTitle:Q,setAccTitle:V,getAccTitle:Y,setAccDescription:q,getAccDescription:H,addSection:pe,getSections:de,setShowData:ge,getShowData:ue},fe=s((e,a)=>{se(e,a),a.setShowData(e.showData),e.sections.map(a.addSection)},"populateDb"),he={parse:s(async e=>{const a=await le("pie",e);D.debug(a),fe(a,M)},"parse")},me=s(e=>`
  .pieCircle{
    stroke: ${e.pieStrokeColor};
    stroke-width : ${e.pieStrokeWidth};
    opacity : ${e.pieOpacity};
  }
  .pieOuterCircle{
    stroke: ${e.pieOuterStrokeColor};
    stroke-width: ${e.pieOuterStrokeWidth};
    fill: none;
  }
  .pieTitleText {
    text-anchor: middle;
    font-size: ${e.pieTitleTextSize};
    fill: ${e.pieTitleTextColor};
    font-family: ${e.fontFamily};
  }
  .slice {
    font-family: ${e.fontFamily};
    fill: ${e.pieSectionTextColor};
    font-size:${e.pieSectionTextSize};
    // fill: white;
  }
  .legend text {
    fill: ${e.pieLegendTextColor};
    font-family: ${e.fontFamily};
    font-size: ${e.pieLegendTextSize};
  }
`,"getStyles"),ve=me,Se=s(e=>{const a=[...e.values()].reduce((r,l)=>r+l,0),y=[...e.entries()].map(([r,l])=>({label:r,value:l})).filter(r=>r.value/a*100>=1).sort((r,l)=>l.value-r.value);return ie().value(r=>r.value)(y)},"createPieArcs"),xe=s((e,a,y,T)=>{D.debug(`rendering pie chart
`+e);const r=T.db,l=K(),A=X(r.getConfig(),l.pie),_=40,n=18,d=4,o=450,h=o,m=ee(a),c=m.append("g");c.attr("transform","translate("+h/2+","+o/2+")");const{themeVariables:i}=l;let[g]=te(i.pieOuterStrokeWidth);g!=null||(g=2);const b=A.textPosition,u=Math.min(h,o)/2-_,O=G().innerRadius(0).outerRadius(u),R=G().innerRadius(u*b).outerRadius(u*b);c.append("circle").attr("cx",0).attr("cy",0).attr("r",u+g/2).attr("class","pieOuterCircle");const v=r.getSections(),W=Se(v),I=[i.pie1,i.pie2,i.pie3,i.pie4,i.pie5,i.pie6,i.pie7,i.pie8,i.pie9,i.pie10,i.pie11,i.pie12];let S=0;v.forEach(t=>{S+=t});const E=W.filter(t=>(t.data.value/S*100).toFixed(0)!=="0"),x=ae(I);c.selectAll("mySlices").data(E).enter().append("path").attr("d",O).attr("fill",t=>x(t.data.label)).attr("class","pieCircle"),c.selectAll("mySlices").data(E).enter().append("text").text(t=>(t.data.value/S*100).toFixed(0)+"%").attr("transform",t=>"translate("+R.centroid(t)+")").style("text-anchor","middle").attr("class","slice"),c.append("text").text(r.getDiagramTitle()).attr("x",0).attr("y",-(o-50)/2).attr("class","pieTitleText");const k=[...v.entries()].map(([t,p])=>({label:t,value:p})),w=c.selectAll(".legend").data(k).enter().append("g").attr("class","legend").attr("transform",(t,p)=>{const F=n+d,N=F*k.length/2,B=12*n,U=p*F-N;return"translate("+B+","+U+")"});w.append("rect").attr("width",n).attr("height",n).style("fill",t=>x(t.label)).style("stroke",t=>x(t.label)),w.append("text").attr("x",n+d).attr("y",n-d).text(t=>r.getShowData()?`${t.label} [${t.value}]`:t.label);const L=Math.max(...w.selectAll("text").nodes().map(t=>{var p;return(p=t==null?void 0:t.getBoundingClientRect().width)!=null?p:0})),z=h+_+n+d+L;m.attr("viewBox",`0 0 ${z} ${o}`),re(m,o,z,A.useMaxWidth)},"draw"),we={draw:xe},_e={parser:he,db:M,renderer:we,styles:ve};export{_e as diagram};
