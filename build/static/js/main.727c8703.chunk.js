(this.webpackJsonprssreader=this.webpackJsonprssreader||[]).push([[0],{39:function(e,t,n){},41:function(e,t,n){},60:function(e,t,n){},68:function(e,t,n){},69:function(e,t,n){"use strict";n.r(t);var c=n(0),s=n(1),i=n.n(s),a=n(31),r=n.n(a),o=(n(39),n(9)),l=n.n(o),d=n(15),u=n(8),j=n(12),b=n(2),m=(n(41),n(10)),f=n.n(m),h=n(33),p=(n(60),n(13)),O=function(e){var t=Object(s.useState)(null),n=Object(u.a)(t,2),i=n[0],a=n[1];function r(){return(r=Object(d.a)(l.a.mark((function t(){return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,f.a.delete("/delete",{data:{id:e.id}}).then((function(t){console.log(t),t.status?(e.updateLocal(e.id),o()):b()})).catch((function(e){return console.log(e)}));case 2:t.sent;case 3:case"end":return t.stop()}}),t)})))).apply(this,arguments)}var o=function(){return Object(p.toast)({message:"Podcast successfully deleted!",type:"is-success",position:"bottom-center",dismissible:!0,animate:{in:"fadeIn",out:"fadeOut"}})},b=function(){return Object(p.toast)({message:"Something went wrong!",type:"is-danger",position:"center",dismissible:!0,animate:{in:"fadeIn",out:"fadeOut"}})};function m(){return(m=Object(d.a)(l.a.mark((function t(n){var c;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return c=document.getElementById(e.id),t.next=3,f.a.post("/podcastFeed",{link:n}).then((function(e){a(e.data)})).then((function(){c.classList.remove("is-loading"),c.removeAttribute("disabled")})).catch((function(e){return console.log(e)}));case 3:t.sent;case 4:case"end":return t.stop()}}),t)})))).apply(this,arguments)}return Object(s.useEffect)((function(){!function(e){m.apply(this,arguments)}(e.link)}),[]),Object(c.jsx)("div",{className:"pod-box column is-quarter mt-4",children:Object(c.jsx)(j.b,{to:{pathname:"podcast/".concat(e.id),props:{detailedData:i,handleDelete:function(){return r.apply(this,arguments)}}},children:Object(c.jsx)("button",{className:"button is-loading",id:e.id,disabled:!0,children:e.title})})})},x=function(e){var t=e.podcasts,n=e.setPodcasts,i=function(e){var c=t.filter((function(t){return t._id!==e}));n(c)};return Object(s.useEffect)((function(){}),[t]),Object(c.jsxs)("div",{className:"mt-6",children:[Object(c.jsx)("div",{children:Object(c.jsx)("h3",{children:"Podcast Feeds"})}),Object(c.jsx)("div",{id:"hidden",className:"active columns is-multiline px-2",children:t.map((function(e){return Object(c.jsx)(O,{title:e.title,link:e.link,id:e._id,updateLocal:i},e._id)}))})]})},v=function(e){var t=e.podcasts,i=e.setPodContent,a=Object(s.useState)(null),r=Object(u.a)(a,2),o=r[0],l=r[1],d=Object(s.useState)(""),j=Object(u.a)(d,2),b=j[0],m=j[1],O=function(e){return n(66).isHttpsUri(e)},v=function(e){return Object(p.toast)({message:e,type:"is-danger",position:"bottom-center",dismissible:!0,animate:{in:"fadeIn",out:"fadeOut"}})},N=function(e){e.preventDefault();var n=document.querySelectorAll("#formInput");n.forEach((function(e){return e.style.borderColor="#dbdbdb"}));var c=document.getElementById("formSub");if(c.classList.add("is-loading"),!O(b.trim())&&!o)return n.forEach((function(e){return e.style.borderColor="red"})),v("Please fill out the form!"),void c.classList.remove("is-loading");if(!O(b.trim()))return n[1].style.borderColor="red",v("Please enter a valid link!"),void c.classList.remove("is-loading");if(!o)return n[0].style.borderColor="red",v("Please enter a title!"),void c.classList.remove("is-loading");n.forEach((function(e){return e.style.borderColor="#dbdbdb"}));var s={title:o,link:b.trim()};f.a.post("/save",s).then((function(e){var n=Object(h.a)(t);n.push(e.data),i(n)}));n.forEach((function(e){return e.value=""})),l(""),m(""),Object(p.toast)({message:"Podcast successfully added!",type:"is-success",position:"bottom-center",dismissible:!0,animate:{in:"fadeIn",out:"fadeOut"}}),c.classList.remove("is-loading")};return Object(s.useEffect)((function(){}),[t]),Object(c.jsxs)("div",{children:[Object(c.jsx)("div",{className:"wrapper",children:Object(c.jsxs)("div",{className:"box mt-4",children:[Object(c.jsx)("h3",{children:"Enter a RSS link to a podcast below!"}),Object(c.jsxs)("div",{className:"form",children:[Object(c.jsxs)("div",{className:"field",children:[Object(c.jsx)("label",{className:"label is-normal form-label",children:"Link Name"}),Object(c.jsx)("div",{className:"control",children:Object(c.jsx)("input",{className:"input",type:"text",id:"formInput",placeholder:"Ex. My Brother, My Brother, and Me",onChange:function(e){return l(e.target.value)}})})]}),Object(c.jsxs)("div",{className:"field ",children:[Object(c.jsx)("label",{className:"label form-label",children:"Link"}),Object(c.jsx)("div",{className:"control",children:Object(c.jsx)("input",{className:"input",type:"text",id:"formInput",placeholder:"Ex. https://yourlinkhere.com",onChange:function(e){return m(e.target.value)}})})]}),Object(c.jsx)("div",{className:"field",children:Object(c.jsx)("div",{className:"control",children:Object(c.jsx)("button",{className:"button form",id:"formSub",onClick:function(e){return N(e)},children:"Submit"})})})]})]})}),Object(c.jsx)("div",{children:Object(c.jsx)(x,{podcasts:t,setPodcasts:i})})]})},N=(n(68),function(e){var t=e.detailedData,n=e.handleDelete,i=Object(s.useState)(""),a=Object(u.a)(i,2),r=a[0],o=a[1],l=Object(s.useState)({}),d=Object(u.a)(l,2),m=d[0],f=d[1],h=Object(s.useState)(!1),p=Object(u.a)(h,2),O=p[0],x=p[1],v=Object(b.f)();return Object(s.useEffect)((function(){}),[r]),Object(c.jsxs)("div",{children:[Object(c.jsx)("div",{className:"title",children:t.title}),Object(c.jsx)("div",{className:"columns",children:Object(c.jsx)("div",{className:"column mt-3 search",children:Object(c.jsx)("div",{className:"control",children:Object(c.jsx)("input",{className:"input",type:"text",id:"searchInput",placeholder:"Search for an episode!",onChange:function(e){return function(e){o(e.trim().toLowerCase())}(e.target.value)}})})})}),Object(c.jsxs)("div",{className:"columns",children:[Object(c.jsx)("div",{className:"column is-one-third pod-image-container",children:Object(c.jsx)("img",{className:"pod-Img px-5 pb-3",src:t.image.url,alt:"pod icon"})}),Object(c.jsx)("div",{className:"column is-one-third list-container",children:Object(c.jsx)("ul",{children:Object(c.jsx)(y,{detailedData:t,search:r,select:function(e){O||x(!0),f(e)}})})}),Object(c.jsx)("div",{className:"column is-one-third show-description",children:Object(c.jsxs)("div",{children:[Object(c.jsx)("div",{className:"title-container",children:Object(c.jsx)("h4",{className:"feed-title",children:t.description})}),O?Object(c.jsx)(g,{podcast:m}):null]})})]}),Object(c.jsx)("div",{className:"back-button",children:Object(c.jsx)(j.b,{to:"/",children:Object(c.jsx)("button",{className:"button is-normal",children:"Go back"})})}),Object(c.jsx)("div",{className:"del-button",children:Object(c.jsx)("button",{className:"button is-danger",onClick:function(){window.confirm("Are you sure you want to delete this feed?")&&(n(),v.push("/"))},children:"Delete"})})]})}),g=function(e){var t=e.podcast;return Object(c.jsxs)("div",{className:"selection-container",children:[Object(c.jsx)("div",{className:"episode-title",children:t.title}),Object(c.jsx)("div",{children:Object(c.jsx)("p",{children:t.contentSnippet})}),Object(c.jsx)("div",{className:"mt-2 audio-player",children:Object(c.jsx)("audio",{controls:!0,preload:"none",children:Object(c.jsx)("source",{src:t.enclosure.url,type:t.enclosure.type})})})]})},y=function(e){var t=e.detailedData,n=e.search,s=e.select;return t.items.filter((function(e){return e.title.toLowerCase().includes(n)})).map((function(e){return Object(c.jsx)("li",{className:"mt-2 mb-2",children:Object(c.jsx)("div",{className:"columns",children:Object(c.jsx)("div",{className:"column",children:Object(c.jsx)("button",{className:"button episode",onClick:function(){return s(e)},children:e.title})})})},e.guid)}))},k=function(e){var t=e.match;return Object(c.jsx)(N,{detailedData:t.location.props.detailedData,handleDelete:t.location.props.handleDelete})};var w=function(){var e=Object(s.useState)([]),t=Object(u.a)(e,2),n=t[0],i=t[1];function a(){return(a=Object(d.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,f.a.get("/podcasts").then((function(e){i(e.data)})).catch((function(e){return console.log(e)}));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(s.useEffect)((function(){!function(){a.apply(this,arguments)}()}),[]),Object(c.jsx)("div",{className:"App",children:Object(c.jsx)(j.a,{children:Object(c.jsxs)(b.c,{children:[Object(c.jsx)(b.a,{exact:!0,path:"/",component:function(){return Object(c.jsx)(v,{podcasts:n,setPodContent:i})}}),Object(c.jsx)(b.a,{exact:!0,path:"/podcast/:podId",component:function(e){return Object(c.jsx)(k,{match:e})}})]})})})},C=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,70)).then((function(t){var n=t.getCLS,c=t.getFID,s=t.getFCP,i=t.getLCP,a=t.getTTFB;n(e),c(e),s(e),i(e),a(e)}))};r.a.render(Object(c.jsx)(i.a.StrictMode,{children:Object(c.jsx)(w,{})}),document.getElementById("root")),C()}},[[69,1,2]]]);
//# sourceMappingURL=main.727c8703.chunk.js.map