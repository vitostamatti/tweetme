(this["webpackJsonptweetme-web"]=this["webpackJsonptweetme-web"]||[]).push([[0],{13:function(e,t,n){},14:function(e,t,n){},15:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),r=n(5),o=n.n(r);n(13),n(14);function l(e,t,n,a){var c;a&&(c=JSON.stringify(a));var r=new XMLHttpRequest,o="http://localhost:8000/api".concat(t);if(r.responseType="json",r.open(e,o),r.setRequestHeader("Content-Type","application/json"),"POST"===e){var l=function(e){var t=null;if(document.cookie&&""!==document.cookie)for(var n=document.cookie.split(";"),a=0;a<n.length;a++){var c=n[a].trim();if(c.substring(0,e.length+1)===e+"="){t=decodeURIComponent(c.substring(e.length+1));break}}return t}("csrftoken");r.setRequestHeader("HTTP_X_USERNAME","vitostamatti"),r.setRequestHeader("X-CSRFToken",l)}r.onload=function(){n(r.response,r.status)},r.onerror=function(e){console.log(e),n({message:"The request was an error"},400)},r.send(c)}function i(e){var t=e.tweet,n=e.action,a=e.didPerformAction,r=t.likes?t.likes:0,o=e.className?e.className:"btn btn-primary btn-sm",i=n.display?n.display:"Action",s=function(e,t){console.log(e,t),200!==t&&201!==t||!a||a(e,t)},u="like"===n.type?"".concat(r," ").concat(i):i;return c.a.createElement("button",{className:o,onClick:function(e){e.preventDefault(),function(e,t,n){l("POST","/tweets/action/",n,{id:e,action:t})}(t.id,n.type,s)}},u)}var s=n(2),u=n(1),m=n(7);function d(e){var t=e.tweet;return t.parent?c.a.createElement("div",{className:"row"},c.a.createElement("div",{className:"col-11 p-3 mx-auto border rounded"},c.a.createElement("p",{className:"mb-0 text-muted small"},"Retweeted"),c.a.createElement(f,{hideActions:!0,className:"  ",tweet:t.parent}))):null}function f(e){var t=e.tweet,n=e.didRetweet,r=e.hideActions,o=Object(a.useState)(e.tweet?e.tweet:null),l=Object(u.a)(o,2),s=l[0],f=l[1],w=e.className?e.className:"col-11 mx-auto col-md-7",b=window.location.pathname.match(Object(m.a)(/([0-9]+)/,{tweetid:1})),p=b?b.groups.tweetid:-1,v="".concat(t.id)==="".concat(p),E=function(e,t){200===t?f(e):201===t&&n&&n(e)};return c.a.createElement("div",{className:w},c.a.createElement("div",null,c.a.createElement("p",null,t.id," - ",t.content),c.a.createElement(d,{tweet:t})),c.a.createElement("div",{className:"btn btn-group"},s&&!0!==r&&c.a.createElement(c.a.Fragment,null,c.a.createElement(i,{tweet:s,didPerformAction:E,action:{type:"like",display:"Likes"}}),c.a.createElement(i,{tweet:s,didPerformAction:E,action:{type:"unlike",display:"Unlike"}}),c.a.createElement(i,{tweet:s,didPerformAction:E,action:{type:"retweet",display:"Retweet"}})),!0===v?null:c.a.createElement("button",{className:"btn btn-outline-primary",onClick:function(e){e.preventDefault(),window.location.href="/".concat(t.id)}},"View")))}function w(e){var t=Object(a.useState)([]),n=Object(u.a)(t,2),r=n[0],o=n[1],i=Object(a.useState)([]),m=Object(u.a)(i,2),d=m[0],w=m[1],b=Object(a.useState)(!1),p=Object(u.a)(b,2),v=p[0],E=p[1];Object(a.useEffect)((function(){var t=Object(s.a)(e.newTweet).concat(r);t.length!==d.length&&w(t)}),[e.newTweet,d,r]),Object(a.useEffect)((function(){if(!1===v){!function(e,t){var n="/tweets/";e&&(n="/tweets/?username=".concat(e)),l("GET",n,t)}(e.username,(function(e,t){200===t?(o(e),E(!0)):console.log("There was an error")}))}}),[r,E,v,e.username]);var h=function(e){var t=Object(s.a)(r);t.unshift(e),o(t);var n=Object(s.a)(d);n.unshift(e),w(n)};return d.map((function(e,t){return c.a.createElement(f,{tweet:e,didRetweet:h,key:"".concat(t,"-").concat(e.id),className:"my-2 py-2 border rounded bg-light text-dark"})}))}function b(e){var t=c.a.createRef(),n=e.didTweet,a=function(e,t){201===t?n(e):console.log(e)};return c.a.createElement("div",{className:e.className},c.a.createElement("form",{onSubmit:function(e){e.preventDefault();var n=t.current.value;l("POST","/tweets/create/",a,{content:n}),t.current.value=""}},c.a.createElement("textarea",{ref:t,placeholder:"Your tweet...",required:!0,className:"form-control",name:"tweet"}),c.a.createElement("button",{type:"submit",className:"btn btn-sm btn-primary my-3"},"Tweet")))}function p(e){var t=Object(a.useState)([]),n=Object(u.a)(t,2),r=n[0],o=n[1],l="false"!==e.canTweet;return c.a.createElement("div",{className:e.className},!0===l&&c.a.createElement(b,{didTweet:function(e){var t=Object(s.a)(e);t.unshift(e),o(t)},className:"col-10 mb-3 mx-auto"}),c.a.createElement(w,Object.assign({},e,{newTweet:r})))}function v(e){var t=e.tweetId,n=Object(a.useState)(!1),r=Object(u.a)(n,2),o=r[0],i=r[1],s=Object(a.useState)(null),m=Object(u.a)(s,2),d=m[0],w=m[1],b=function(e,t){200===t?w(e):alert("There was an error finding your tweet")};return Object(a.useEffect)((function(){!1===o&&(!function(e,t){l("GET","/tweets/".concat(e,"/"),t)}(t,b),i(!0))}),[t,o,i]),null===d?null:c.a.createElement(f,{tweet:d,className:e.className})}var E=function(){return c.a.createElement("div",{className:"App"},c.a.createElement("header",{className:"App-header"},c.a.createElement("h1",null,"Tweet Me"),c.a.createElement("div",null,c.a.createElement(p,null))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var h=document.getElementById("root");h&&o.a.render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(E,null)),h);var O=c.a.createElement,g=document.getElementById("tweetme");g&&o.a.render(O(p,g.dataset),g),document.querySelectorAll(".tweetme-detail").forEach((function(e){o.a.render(O(v,e.dataset),e)})),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},8:function(e,t,n){e.exports=n(15)}},[[8,1,2]]]);
//# sourceMappingURL=main.a65ae7bd.chunk.js.map