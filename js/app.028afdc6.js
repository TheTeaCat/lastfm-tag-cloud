(function(t){function e(e){for(var r,i,o=e[0],l=e[1],u=e[2],h=0,d=[];h<o.length;h++)i=o[h],Object.prototype.hasOwnProperty.call(s,i)&&s[i]&&d.push(s[i][0]),s[i]=0;for(r in l)Object.prototype.hasOwnProperty.call(l,r)&&(t[r]=l[r]);c&&c(e);while(d.length)d.shift()();return n.push.apply(n,u||[]),a()}function a(){for(var t,e=0;e<n.length;e++){for(var a=n[e],r=!0,o=1;o<a.length;o++){var l=a[o];0!==s[l]&&(r=!1)}r&&(n.splice(e--,1),t=i(i.s=a[0]))}return t}var r={},s={app:0},n=[];function i(e){if(r[e])return r[e].exports;var a=r[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,i),a.l=!0,a.exports}i.m=t,i.c=r,i.d=function(t,e,a){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(i.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)i.d(a,r,function(e){return t[e]}.bind(null,r));return a},i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],l=o.push.bind(o);o.push=e,o=o.slice();for(var u=0;u<o.length;u++)e(o[u]);var c=l;n.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"18ef":function(t,e,a){"use strict";var r=a("2a7b"),s=a.n(r);s.a},"2a7b":function(t,e,a){},"31a5":function(t,e,a){"use strict";var r=a("8dd9"),s=a.n(r);s.a},3398:function(t,e,a){"use strict";var r=a("6a49"),s=a.n(r);s.a},"42e2":function(t,e,a){},"474b":function(t,e,a){"use strict";var r=a("db2c"),s=a.n(r);s.a},"56d7":function(t,e,a){"use strict";a.r(e);a("e260"),a("e6cf"),a("cca6"),a("a79d");var r=a("2b0e"),s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"app"}},[t._m(0),a("main",[a("ControlPanel",{staticClass:"control-panel",attrs:{username:t.username,period:t.period,max_artists:t.max_artists,filtered:t.filtered,state:t.generator.state},on:{"update:username":function(e){t.username=e,t.updateCookie()},"update:period":function(e){t.period.selected=e,t.updateCookie()},"update:max_artists":function(e){t.max_artists.selected=e,t.updateCookie()},"update:filtered":function(e){t.filtered=e,t.updateCookie()},generate:t.generate}}),a("ResultTitle",{staticClass:"result-title",attrs:{fetchedData:void 0!=t.result,state:t.generator.state,username:t.result?t.result.username:void 0,artistCount:t.result?t.result.artists.length:void 0,timePeriod:t.result?t.result.period:void 0,error:t.error}}),void 0!=t.result&&t.result.artists.length>0?a("CloudBox",{ref:"cloud-box",attrs:{result:t.result,building:t.building},on:{building:function(e){t.building=e}}}):t._e(),void 0!=t.result&&t.result.artists.length>0?a("ArtistsList",{staticClass:"list",attrs:{artists:t.result.artists,listens:t.result.listens}}):t._e(),void 0!=t.result&&t.result.artists.length>0?a("TagsList",{staticClass:"list",attrs:{tags:t.result.tags,taggings:t.result.taggings,tag_meta:t.result.tag_meta,building:t.building},on:{applyTagChanges:function(e){return t.$refs["cloud-box"].generateTagCloud("tags")}}}):t._e()],1),a("footer",[t._m(1),a("button",{staticClass:"theme-button",on:{click:function(e){return t.changeTheme()}}},[t._v(t._s(t.theme.label))])])])},n=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("header",[a("h1",[t._v("tag cloud generator")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ul",[a("li",[a("a",{attrs:{href:"https://www.last.fm/user/theteacat"}},[t._v("My Last.Fml")])]),a("li",[a("a",{attrs:{href:"https://github.com/PedantiCat/tag-cloud"}},[t._v("Github")]),t._v(" - Star This!")]),a("li",[a("a",{attrs:{href:"https://github.com/TheTeaCat/lastfm-tag-cloud#how-are-the-tags-chosen--scaled"}},[t._v("How Are The Tags Chosen & Scaled?")])]),a("li",[a("a",{attrs:{href:"https://github.com/TheTeaCat/lastfm-tag-cloud#what-does-the-tag-filter-do"}},[t._v("What Does The Tag Filter Do?")])])])}],i=(a("c975"),a("d81d"),a("45fc"),a("96cf"),a("1da1")),o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"control-panel"}},[a("control-panel-option",{staticClass:"username",attrs:{name:"Username",type:"input",params:{value:t.username}},on:{update:function(e){return t.$emit("update:username",e)},submit:this.submit}}),a("control-panel-option",{staticClass:"tag-filter",attrs:{name:"Tag Filter",type:"checkbox",params:{value:t.filtered}},on:{update:function(e){return t.$emit("update:filtered",e)}}}),a("control-panel-option",{staticClass:"period",attrs:{name:"Period",type:"select",params:{options:t.period.options,selected:t.period.selected}},on:{update:function(e){return t.$emit("update:period",e)}}}),a("control-panel-option",{staticClass:"max-artists",attrs:{name:"Max Artists",type:"select",params:{options:t.max_artists.options,selected:t.max_artists.selected}},on:{update:function(e){return t.$emit("update:max_artists",e)}}}),a("control-panel-option",{staticClass:"load-data",attrs:{name:"Load Data",type:"button",params:{label:"Go!",disabled:void 0!=t.state}},on:{clicked:t.submit}})],1)},l=[],u=(a("ac1f"),a("5319"),function(){var t=this,e=this,a=e.$createElement,r=e._self._c||a;return r("label",{staticClass:"option"},[r("span",{staticClass:"label"},[e._v(e._s(e.name))]),"input"==e.type?r("input",{domProps:{value:e.params.value},on:{keyup:function(e){return"Enter"==e.key?t.$emit("submit"):t.$emit("update",e.target.value)}}}):e._e(),"select"==e.type?r("select",{domProps:{value:e.params.selected},on:{change:function(t){return e.$emit("update",t.target.value)}}},e._l(e.params.options,(function(t){return r("option",{key:t.value,domProps:{value:t.value}},[e._v(" "+e._s(t.text)+" ")])})),0):e._e(),"checkbox"==e.type?r("label",{staticClass:"button"},[r("input",{staticClass:"checkbox",attrs:{type:"checkbox"},domProps:{checked:e.params.value},on:{change:function(t){return e.$emit("update",t.target.checked)}}}),r("span",{staticClass:"checkmark"})]):e._e(),"button"==e.type?r("button",{attrs:{disabled:e.params.disabled},on:{click:function(t){return e.$emit("clicked")}}},[e._v(" "+e._s(e.params.label)+" ")]):e._e()])}),c=[],h={props:["name","type","params"]},d=h,g=(a("18ef"),a("2877")),p=Object(g["a"])(d,u,c,!1,null,"4a3c93ce",null),f=p.exports,m={props:["username","period","max_artists","filtered","state"],components:{ControlPanelOption:f},methods:{submit:function(){this.$emit("update:username",this.username.replace(/&/g,"")),this.$emit("generate")}}},v=m,b=(a("b8b5"),Object(g["a"])(v,o,l,!1,null,"6453bb6b",null)),_=b.exports,y=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"cloud-box"},[a("ul",{staticClass:"options-above"},[a("li",[t._v("Show me:")]),a("li",[a("button",{attrs:{disabled:"tags"==t.mode||t.building},on:{click:function(e){return t.generateTagCloud("tags")}}},[t._v(" Tags ")])]),a("li",[a("button",{attrs:{disabled:"artists"==t.mode||t.building},on:{click:function(e){return t.generateTagCloud("artists")}}},[t._v(" Artists ")])])]),a("canvas",{ref:"canvas",attrs:{width:"1920",height:"1200"}}),a("ul",{staticClass:"options-below"},[a("li",[a("input",{directives:[{name:"model",rawName:"v-model",value:t.fg_colour,expression:"fg_colour"}],ref:"fg-colour",attrs:{type:"color"},domProps:{value:t.fg_colour},on:{input:function(e){e.target.composing||(t.fg_colour=e.target.value)}}})]),a("li",[a("input",{directives:[{name:"model",rawName:"v-model",value:t.bg_colour,expression:"bg_colour"}],ref:"bg-colour",attrs:{type:"color"},domProps:{value:t.bg_colour},on:{input:function(e){e.target.composing||(t.bg_colour=e.target.value)}}})]),a("li",[a("button",{attrs:{disabled:t.building},on:{click:function(e){return t.generateTagCloud()}}},[t._v("Reshuffle")])]),a("li",[a("a",{attrs:{download:"cloud.png"}},[a("button",{attrs:{disabled:t.building},on:{click:t.downloadTagCloud}},[t._v("Download")])])]),a("li",{staticClass:"share-button"},[a("button",{on:{click:t.copyShareLink}},[a("span",[t._v("Copy Link:")]),a("input",{ref:"share-link",attrs:{readonly:"readonly"},domProps:{value:t.share_link}})])])])])},k=[],x=(a("a4d3"),a("e01a"),a("d28b"),a("6b93"),a("d3b7"),a("3ca3"),a("ddb0"),a("175f")),w=a.n(x),C=(a("fb6a"),a("25f0"),a("466d"),a("d4ec")),$=a("bee2"),T=function(){function t(){Object(C["a"])(this,t)}return Object($["a"])(t,null,[{key:"rgb2hex",value:function(t){function e(t){return("0"+parseInt(t).toString(16)).slice(-2)}return t=t.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/),"#"+e(t[1])+e(t[2])+e(t[3])}}]),t}(),j=T,O={props:["result","building"],mounted:function(){var t=1/0,e=-1/0,a=!0,r=!1,s=void 0;try{for(var n,i=this.result.tags[Symbol.iterator]();!(a=(n=i.next()).done);a=!0){var o=n.value,l=this.result.scores[o];l<t&&(t=l),l>e&&(e=l)}}catch(O){r=!0,s=O}finally{try{a||null==i.return||i.return()}finally{if(r)throw s}}this.cloudTags=[];var u=!0,c=!1,h=void 0;try{for(var d,g=this.result.tags[Symbol.iterator]();!(u=(d=g.next()).done);u=!0)o=d.value,this.cloudTags.push([o,Math.log10(99*(this.result.scores[o]-t)/e+1)/2*175+25]),this.result.tag_meta[o].shown=!0}catch(O){c=!0,h=O}finally{try{u||null==g.return||g.return()}finally{if(c)throw h}}var p=-1/0,f=!0,m=!1,v=void 0;try{for(var b,_=this.result.artists[Symbol.iterator]();!(f=(b=_.next()).done);f=!0){var y=b.value,k=this.result.listens[y];k>p&&(p=k)}}catch(O){m=!0,v=O}finally{try{f||null==_.return||_.return()}finally{if(m)throw v}}this.cloudArtists=[];var x=!0,w=!1,C=void 0;try{for(var $,T=this.result.artists[Symbol.iterator]();!(x=($=T.next()).done);x=!0)y=$.value,this.cloudArtists.push([y,this.result.listens[y]/p*175+25])}catch(O){w=!0,C=O}finally{try{x||null==T.return||T.return()}finally{if(w)throw C}}this.bg_colour=j.rgb2hex(getComputedStyle(this.$refs["canvas"])["background-color"]),this.fg_colour=j.rgb2hex(getComputedStyle(this.$refs["canvas"])["color"]),this.generateTagCloud("tags")},data:function(){return{mode:"tags",bg_colour:"#000000",fg_colour:"#ffffff"}},methods:{generateTagCloud:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(e){var a,r,s,n,i,o,l;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(void 0!=e&&(this.mode=e),this.$emit("building",!0),this.retheme(),a=[],"tags"!=this.mode){t.next=26;break}for(r=!0,s=!1,n=void 0,t.prev=8,i=this.cloudTags[Symbol.iterator]();!(r=(o=i.next()).done);r=!0)l=o.value,this.result.tag_meta[l[0]].shown&&a.push(l);t.next=16;break;case 12:t.prev=12,t.t0=t["catch"](8),s=!0,n=t.t0;case 16:t.prev=16,t.prev=17,r||null==i.return||i.return();case 19:if(t.prev=19,!s){t.next=22;break}throw n;case 22:return t.finish(19);case 23:return t.finish(16);case 24:t.next=27;break;case 26:a=this.cloudArtists;case 27:this.$refs["canvas"].addEventListener("wordcloudstop",function(){this.$emit("building",!1)}.bind(this)),w()(this.$refs["canvas"],{list:a,fontFamily:"Roboto",shrinkToFit:!0,color:this.fg_colour,backgroundColor:this.bg_colour,shuffle:!0});case 29:case"end":return t.stop()}}),t,this,[[8,12,16,24],[17,,19,23]])})));function e(e){return t.apply(this,arguments)}return e}(),retheme:function(){this.bg_colour=j.rgb2hex(getComputedStyle(this.$refs["canvas"])["background-color"]),this.fg_colour=j.rgb2hex(getComputedStyle(this.$refs["canvas"])["color"])},downloadTagCloud:function(){this.$refs["download-link"].href=this.$refs["canvas"].toDataURL()},copyShareLink:function(){this.$refs["share-link"].select(),this.$refs["share-link"].setSelectionRange(0,99999),document.execCommand("Copy")}},computed:{share_link:function(){return void 0!=this.result?window.location.origin+window.location.pathname+"?username="+this.result.username+"&period="+this.result.period+"&filtered="+this.result.filtered+"&max_artists="+this.result.max_artists:""}}},S=O,P=(a("e09b"),Object(g["a"])(S,y,k,!1,null,"51e13c36",null)),R=P.exports,A=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"artists-list"},[a("button",{staticClass:"collapse-button",on:{click:t.collapse}},[t._v(t._s(t.collapsed?"+":"-"))]),a("h2",[t._v("Artists:")]),t.collapsed?t._e():a("ol",t._l(t.artists,(function(e,r){return a("li",{key:r,attrs:{artist:e}},[a("span",{staticClass:"artist-name"},[t._v(" "+t._s(r+1)+" - "),a("a",{attrs:{href:"https://www.last.fm/music/"+e.replace(/ /g,"+")}},[t._v(" "+t._s(e)+" ")])]),t._v(" ("+t._s(t.listens[e])+" "+t._s(t.listens[e]>1?"listens":"listen")+")"+t._s(r==t.artists.length-1?"":", ")+" ")])})),0)])},L=[],E={props:["artists","listens"],data:function(){return{collapsed:!0}},methods:{collapse:function(){this.collapsed=!this.collapsed}}},D=E,M=(a("474b"),Object(g["a"])(D,A,L,!1,null,"33e4052c",null)),q=M.exports,z=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"tags-list"},[a("button",{staticClass:"collapse-button",on:{click:t.collapse}},[t._v(t._s(t.collapsed?"+":"-"))]),a("h2",[t._v("Tags:")]),a("span",[t._v("//Don't like a tag? Uncheck it here!")]),t.collapsed?t._e():a("ol",t._l(t.tags,(function(e){return a("li",{key:e,attrs:{tag:e}},[a("label",{staticClass:"button"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.tag_meta[e].shown,expression:"tag_meta[tag].shown"}],staticClass:"checkbox",attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.tag_meta[e].shown)?t._i(t.tag_meta[e].shown,null)>-1:t.tag_meta[e].shown},on:{change:[function(a){var r=t.tag_meta[e].shown,s=a.target,n=!!s.checked;if(Array.isArray(r)){var i=null,o=t._i(r,i);s.checked?o<0&&t.$set(t.tag_meta[e],"shown",r.concat([i])):o>-1&&t.$set(t.tag_meta[e],"shown",r.slice(0,o).concat(r.slice(o+1)))}else t.$set(t.tag_meta[e],"shown",n)},function(e){return t.$emit("applyTagChanges")}]}}),a("span",{staticClass:"checkmark"})]),a("div",{staticClass:"tag-info"},[a("a",{staticClass:"tag-name",attrs:{href:t.tag_meta[e].url}},[t._v(t._s(e))]),t._v(" ("+t._s(t.tag_meta[e].tot_scrobbles)+" "+t._s(t.tag_meta[e].tot_scrobbles>1?"listens":"listen")+"): "),a("taggings-list",{attrs:{taggings:t.taggings[e]}})],1)])})),0)])},F=[],N=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ol",[t._l(t.collapsed?t.taggings.slice(0,3):t.taggings,(function(e,r){return a("li",{key:r},[t._v(t._s(e.artist+(r==t.taggings.length-1?". ":", ")))])})),t.taggings.length>3?a("li",{staticClass:"collapser",on:{click:t.toggle}},[a("a",[t._v(t._s(t.collapsed?"show more...":"show less"))])]):t._e()],2)},B=[],G={props:["taggings"],data:function(){return{collapsed:!0}},methods:{toggle:function(){this.collapsed=!this.collapsed}}},U=G,I=(a("c076"),Object(g["a"])(U,N,B,!1,null,"40dd2415",null)),J=I.exports,K={components:{TaggingsList:J},props:["tags","taggings","tag_meta","building"],data:function(){return{collapsed:!0}},methods:{collapse:function(){this.collapsed=!this.collapsed}}},W=K,H=(a("689e"),Object(g["a"])(W,z,F,!1,null,"c6296c1a",null)),Y=H.exports,Q=function(){var t=this,e=t.$createElement,a=t._self._c||e;return t.fetchedData&&void 0==t.state?a("h2",[a("a",{attrs:{href:"https://www.last.fm/user/"+t.username}},[t._v(" "+t._s(t.username))]),t._v(t._s(t.artistCount>0?"s"==t.username[t.username.length-1].toLowerCase()?"'":"'s":"")+" "+t._s((t.artistCount>0?"tag cloud based upon their top "+t.artistCount+" artists ":"hasn't listened to anything ")+{"7day":"over the last 7 days","1month":"over the last month","3month":"over the last 3 months","6month":"over the last 6 months","12month":"over the last year",overall:"overall"}[t.timePeriod]+(t.artistCount>0?":":""))+" ")]):void 0==t.state&&void 0!=t.error?a("h2",[t._v(" An error occured :'( "),a("br"),a("br"),t._v(" "+t._s(t.error)+" ")]):void 0!=t.state?a("h2",[a("div",{staticClass:"spinner"}),t._v(" "+t._s(t.state)+" ")]):t._e()},V=[],X={props:["fetchedData","state","username","artistCount","timePeriod","error"]},Z=X,tt=(a("3398"),Object(g["a"])(Z,Q,V,!1,null,"22f8a3dc",null)),et=tt.exports,at=(a("caad"),a("a434"),a("b0c0"),a("2532"),a("1276"),a("bc3a")),rt=a.n(at),st="97773975bd1d3fdf89b362a27d2b6313",nt=100,it=["geohash","all","seen live","cunt","fuck","motherfucker","bastard","beaver","bellend","clunge","cock","dick","dickhead","fanny","flaps","gash","knob","minge","prick","punani","pussy","snatch","twat","arsehole","balls","bint","bitch","bollocks","bullshit","feck","munter","pissed","pissed off","shit","son of a bitch","tits","cocksucker","dildo","jizz","ho","nonce","prickteaser","skank","slag","slut","wanker","whore","shag","slapper","tart","prod","yid","batty boy","chick with a dick","faggot","gender bender","fudge-packer","shirt lifter","bender","bum boy","dyke","he-she","homo","lezza","lesbo","muff driver","nancy","poof","queer","rug muncher","carpet muncher","tranny","bummer","fairy","pansy","mong","retard","spastic","spakka","spaz","window licker","cripple","midget","schizo","special","vegetable","chinky","coon","darky","golliwog","nigger","nig-nog","paki","wog","honky","jap","negro","polack","raghead","spade","coloured","gippo","kraut","pikey"],ot=function(){function t(){Object(C["a"])(this,t),this.state=void 0}return Object($["a"])(t,[{key:"generate",value:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(e,a,r,s){var n,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n={username:e,period:a,max_artists:r,filtered:s,artists:[],listens:{},tags:[],taggings:{},tag_meta:{},scores:{}},i=void 0,this.state="Getting artists' data...",t.next=5,this.get_artist_data(n).then((function(t){return i=t}));case 5:if(void 0!=i){t.next=18;break}return this.state="Pruning tags...",t.next=9,this.prune_tags(n);case 9:return this.state="Getting tags' data...",t.next=12,this.get_tag_data(n);case 12:return this.state="Scoring tags...",t.next=15,this.score_tags(n);case 15:return this.state="Sorting tags...",t.next=18,this.sort_data(n);case 18:return this.state=void 0,t.abrupt("return",{result:void 0==i?n:void 0,error:i});case 20:case"end":return t.stop()}}),t,this)})));function e(e,a,r,s){return t.apply(this,arguments)}return e}()},{key:"get_artist_data",value:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,rt.a.get("https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&api_key="+st+"&user="+e.username+"&period="+e.period+"&limit="+e.max_artists+"&format=json").then(function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(a){var r,s,n,o,l,u,c;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:for(r=[],s=!0,n=!1,o=void 0,t.prev=4,l=a.data.topartists.artist[Symbol.iterator]();!(s=(u=l.next()).done);s=!0)c=u.value,r.push(new Promise(function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(a){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return r=c.name.toLowerCase(),e.artists.push(r),e.listens[r]=parseInt(c.playcount),t.next=5,rt.a.get("https://ws.audioscrobbler.com/2.0/?method=artist.getTopTags&api_key="+st+"&artist="+r.replace(/&/g,"%26")+"&format=json").then(function(t){if(void 0!=t.data.toptags){var a=!0,s=!1,n=void 0;try{for(var i,o=t.data.toptags.tag[Symbol.iterator]();!(a=(i=o.next()).done);a=!0){var l=i.value;l.name.includes("&")||(l.name=l.name.toLowerCase(),void 0==e.taggings[l.name]?(e.tags.push(l.name),e.taggings[l.name]=[{artist:r,count:l.count}],e.tag_meta[l.name]={library_total:l.count/100,url:l.url,tot_scrobbles:e.listens[r]}):(e.taggings[l.name].push({artist:r,count:l.count}),e.tag_meta[l.name].library_total+=l.count/100,e.tag_meta[l.name].tot_scrobbles+=e.listens[r]))}}catch(u){s=!0,n=u}finally{try{a||null==o.return||o.return()}finally{if(s)throw n}}}}.bind(this));case 5:a(!0);case 6:case"end":return t.stop()}}),t,this)})));return function(e){return t.apply(this,arguments)}}().bind(this)));t.next=12;break;case 8:t.prev=8,t.t0=t["catch"](4),n=!0,o=t.t0;case 12:t.prev=12,t.prev=13,s||null==l.return||l.return();case 15:if(t.prev=15,!n){t.next=18;break}throw o;case 18:return t.finish(15);case 19:return t.finish(12);case 20:return t.next=22,Promise.all(r);case 22:case"end":return t.stop()}}),t,this,[[4,8,12,20],[13,,15,19]])})));return function(e){return t.apply(this,arguments)}}().bind(this)).catch(function(t){return t}.bind(this));case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t,this)})));function e(e){return t.apply(this,arguments)}return e}()},{key:"prune_tags",value:function(t){for(var e in t.tags)for(var a in t.tags)if(e!=a){var r=t.tags[e],s=t.tags[a];("s"==s[s.length-1]&&s.slice(0,s.length-1)==r||s.replace(/ | /g,"")==r.replace(/ | /g,""))&&(t.tag_meta[r].library_total>=t.tag_meta[s].library_total?t.tags.splice(a,1):t.tags.splice(e,1))}if(t.tags.sort(function(e,a){return t.tag_meta[a].library_total-t.tag_meta[e].library_total}.bind(this)),t.filtered)for(e=0;e<nt;e++){if(e>=t.tags.length)break;(it.some((function(a){return t.tags[e]==a||t.tags[e].split(/-| /).some((function(t){return t==a.replace(/-| /g,"")}))||t.tags[e].match(/-| /)&&a.match(/-| /)&&t.tags[e]==a}))||"geohash"==t.tags[e].split(":")[0])&&(t.tags.splice(e,1),e--)}t.tags=t.tags.slice(0,nt)}},{key:"get_tag_data",value:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(e){var a,r,s,n,o,l,u;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:for(a=[],r=!0,s=!1,n=void 0,t.prev=4,o=e.tags[Symbol.iterator]();!(r=(l=o.next()).done);r=!0)u=l.value,a.push(new Promise(function(t){return function(){var a=Object(i["a"])(regeneratorRuntime.mark((function a(r){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,rt.a.get("https://ws.audioscrobbler.com/2.0/?method=tag.getinfo&api_key="+st+"&tag="+t+"&format=json").then(function(){var a=Object(i["a"])(regeneratorRuntime.mark((function a(r){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(void 0!=r.data.tag){a.next=2;break}return a.abrupt("return");case 2:e.tag_meta[t].reach=r.data.tag.reach,e.tag_meta[t].total=r.data.tag.total;case 4:case"end":return a.stop()}}),a)})));return function(t){return a.apply(this,arguments)}}().bind(this));case 2:r(!0);case 3:case"end":return a.stop()}}),a,this)})));return function(t){return a.apply(this,arguments)}}().bind(this)}.bind(this)(u)));t.next=12;break;case 8:t.prev=8,t.t0=t["catch"](4),s=!0,n=t.t0;case 12:t.prev=12,t.prev=13,r||null==o.return||o.return();case 15:if(t.prev=15,!s){t.next=18;break}throw n;case 18:return t.finish(15);case 19:return t.finish(12);case 20:return t.next=22,Promise.all(a);case 22:case"end":return t.stop()}}),t,this,[[4,8,12,20],[13,,15,19]])})));function e(e){return t.apply(this,arguments)}return e}()},{key:"score_tags",value:function(t){var e=!0,a=!1,r=void 0;try{for(var s,n=t.tags[Symbol.iterator]();!(e=(s=n.next()).done);e=!0){var i=s.value;t.scores[i]=0;var o=!0,l=!1,u=void 0;try{for(var c,h=t.taggings[i][Symbol.iterator]();!(o=(c=h.next()).done);o=!0){var d=c.value;t.scores[i]+=d.count/100*t.listens[d.artist]}}catch(g){l=!0,u=g}finally{try{o||null==h.return||h.return()}finally{if(l)throw u}}t.scores[i]=t.scores[i]*(t.tag_meta[i].library_total/t.tag_meta[i].total)*t.taggings[i].length*t.taggings[i].length*Math.log10(t.tag_meta[i].reach)}}catch(g){a=!0,r=g}finally{try{e||null==n.return||n.return()}finally{if(a)throw r}}}},{key:"sort_data",value:function(t){var e=!0,a=!1,r=void 0;try{for(var s,n=t.tags[Symbol.iterator]();!(e=(s=n.next()).done);e=!0){var i=s.value;t.taggings[i].sort((function(t,e){return e.count-t.count}))}}catch(o){a=!0,r=o}finally{try{e||null==n.return||n.return()}finally{if(a)throw r}}t.tags.sort(function(e,a){return t.scores[a]-t.scores[e]}.bind(this))}}]),t}(),lt=ot,ut={components:{ControlPanel:_,CloudBox:R,ArtistsList:q,TagsList:Y,ResultTitle:et},data:function(){return{username:"TheTeaCat",period:{selected:"3month",options:[{text:"7 Days",value:"7day"},{text:"Month",value:"1month"},{text:"3 Months",value:"3month"},{text:"6 Months",value:"6month"},{text:"Year",value:"12month"},{text:"Overall",value:"overall"}]},max_artists:{selected:25,options:[{text:"10",value:10},{text:"25",value:25},{text:"50",value:50},{text:"100",value:100}]},filtered:!1,generator:new lt,result:void 0,error:void 0,cloudWords:void 0,building:!0,theme:{label:"System Theme",value:""},themes:[{label:"System Theme",value:""},{label:"Dark Theme",value:"dark"},{label:"Light Theme",value:"light"}]}},mounted:function(){this.$cookies.isKey("theme")&&(this.theme=this.$cookies.get("theme"),document.getElementsByTagName("html")[0].setAttribute("theme",this.theme.value)),this.$cookies.isKey("config")&&(this.username=this.$cookies.get("config").username,this.period.selected=this.$cookies.get("config").period,this.max_artists.selected=this.$cookies.get("config").max_artists,this.filtered=this.$cookies.get("config").filtered),this.period.options.some(function(t){return t.value==this.$route.query.period}.bind(this))&&(this.period.selected=this.$route.query.period),this.max_artists.options.some(function(t){return t.value==this.$route.query.max_artists}.bind(this))&&(this.max_artists.selected=this.$route.query.max_artists),void 0!=this.$route.query.filtered&&(this.filtered={true:!0,false:!1}[this.$route.query.filtered]),void 0!=this.$route.query.username&&(this.username=this.$route.query.username,this.$router.push(this.$route.path),this.generate())},methods:{generate:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(){var e;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(void 0==this.generator.state){t.next=2;break}return t.abrupt("return");case 2:return this.result=void 0,this.error=void 0,t.next=6,this.generator.generate(this.username,this.period.selected,this.max_artists.selected,this.filtered);case 6:e=t.sent,this.error=e.error,this.result=e.result;case 9:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),updateCookie:function(){this.$cookies.set("config",{username:this.username,period:this.period.selected,max_artists:this.max_artists.selected,filtered:this.filtered})},changeTheme:function(){this.theme=this.themes[(this.themes.map((function(t){return t.label})).indexOf(this.theme.label)+1)%this.themes.length],document.getElementsByTagName("html")[0].setAttribute("theme",this.theme.value),this.$cookies.set("theme",this.theme)}}},ct=ut,ht=(a("31a5"),Object(g["a"])(ct,s,n,!1,null,"540ba621",null)),dt=ht.exports,gt=(a("78a7"),a("8c4f")),pt=a("2b27"),ft=a.n(pt);r["a"].use(gt["a"]);var mt=new gt["a"]({mode:"history",routes:[]});r["a"].use(ft.a),r["a"].$cookies.config("7d"),r["a"].config.productionTip=!1,new r["a"]({router:mt,render:function(t){return t(dt)}}).$mount("#app")},"689e":function(t,e,a){"use strict";var r=a("42e2"),s=a.n(r);s.a},"6a49":function(t,e,a){},"71fe":function(t,e,a){},"78a7":function(t,e,a){},"7c36":function(t,e,a){},"8dd9":function(t,e,a){},b8b5:function(t,e,a){"use strict";var r=a("c55b"),s=a.n(r);s.a},c076:function(t,e,a){"use strict";var r=a("71fe"),s=a.n(r);s.a},c55b:function(t,e,a){},db2c:function(t,e,a){},e09b:function(t,e,a){"use strict";var r=a("7c36"),s=a.n(r);s.a}});
//# sourceMappingURL=app.028afdc6.js.map