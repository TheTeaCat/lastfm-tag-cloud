(function(t){function e(e){for(var s,o,i=e[0],l=e[1],c=e[2],h=0,d=[];h<i.length;h++)o=i[h],Object.prototype.hasOwnProperty.call(r,o)&&r[o]&&d.push(r[o][0]),r[o]=0;for(s in l)Object.prototype.hasOwnProperty.call(l,s)&&(t[s]=l[s]);u&&u(e);while(d.length)d.shift()();return n.push.apply(n,c||[]),a()}function a(){for(var t,e=0;e<n.length;e++){for(var a=n[e],s=!0,i=1;i<a.length;i++){var l=a[i];0!==r[l]&&(s=!1)}s&&(n.splice(e--,1),t=o(o.s=a[0]))}return t}var s={},r={app:0},n=[];function o(e){if(s[e])return s[e].exports;var a=s[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,o),a.l=!0,a.exports}o.m=t,o.c=s,o.d=function(t,e,a){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(o.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)o.d(a,s,function(e){return t[e]}.bind(null,s));return a},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],l=i.push.bind(i);i.push=e,i=i.slice();for(var c=0;c<i.length;c++)e(i[c]);var u=l;n.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"04a1":function(t,e,a){"use strict";var s=a("28f1"),r=a.n(s);r.a},"28f1":function(t,e,a){},"29c2":function(t,e,a){},3398:function(t,e,a){"use strict";var s=a("6a49"),r=a.n(s);r.a},"3c63":function(t,e,a){},"42ed":function(t,e,a){},"4fa4":function(t,e,a){"use strict";var s=a("f147"),r=a.n(s);r.a},"56d7":function(t,e,a){"use strict";a.r(e);a("e260"),a("e6cf"),a("cca6"),a("a79d");var s=a("2b0e"),r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"app"}},[t._m(0),a("main",[a("ControlPanel",{staticClass:"control-panel",attrs:{username:t.username,period:t.period,max_artists:t.max_artists,filtered:t.filtered,state:t.generator.state},on:{"update:username":function(e){t.username=e,t.updateCookie()},"update:period":function(e){t.period.selected=e,t.updateCookie()},"update:max_artists":function(e){t.max_artists.selected=e,t.updateCookie()},"update:filtered":function(e){t.filtered=e,t.updateCookie()},generate:t.generate}}),a("ResultTitle",{staticClass:"result-title",attrs:{fetchedData:void 0!=t.result,state:t.generator.state,username:t.result?t.result.username:void 0,artistCount:t.result?t.result.artists.length:void 0,timePeriod:t.result?t.result.period:void 0,error:t.error}}),void 0!=t.result&&t.result.artists.length>0?a("CloudBox",{ref:"cloud-box",attrs:{result:t.result},on:{building:function(e){t.building=e}}}):t._e(),void 0!=t.result&&t.result.artists.length>0?a("ArtistsList",{staticClass:"list",attrs:{artists:t.result.artists,listens:t.result.listens,artists_shown:t.result.artists_shown},on:{applyArtistChanges:function(e){return t.$refs["cloud-box"].generateTagCloud("artists")}}}):t._e(),void 0!=t.result&&t.result.artists.length>0?a("TagsList",{staticClass:"list",attrs:{tags:t.result.tags,taggings:t.result.taggings,tag_meta:t.result.tag_meta},on:{applyTagChanges:function(e){return t.$refs["cloud-box"].generateTagCloud("tags")}}}):t._e()],1),a("footer",[t._m(1),t._m(2),a("button",{staticClass:"theme-button",on:{click:function(e){return t.changeTheme()}}},[t._v(t._s(t.theme.label))])])])},n=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("header",[a("h1",[t._v("tag cloud generator")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ul",[a("li",[a("a",{attrs:{href:"https://www.last.fm/user/theteacat"}},[t._v("My Last.Fm")]),t._v(" - Leave me a shout!")]),a("li",[a("a",{attrs:{href:"https://github.com/PedantiCat/tag-cloud"}},[t._v("Github")]),t._v(" - Star This!")]),a("li",[a("a",{attrs:{href:"https://github.com/TheTeaCat/lastfm-tag-cloud#how-are-the-tags-chosen--scaled"}},[t._v("How Are The Tags Chosen & Scaled?")])]),a("li",[a("a",{attrs:{href:"https://github.com/TheTeaCat/lastfm-tag-cloud#what-does-the-tag-filter-do"}},[t._v("What Does The Tag Filter Do?")])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"other-projects"},[t._v("Check out my other projects: "),a("a",{attrs:{href:"http://picto.uk/"}},[t._v("Picto")]),t._v(", "),a("a",{attrs:{href:"https://theteacat.github.io/albums-by-year/"}},[t._v("Albums-By-Year")])])}],o=(a("c975"),a("d81d"),a("45fc"),a("b85c")),i=(a("96cf"),a("1da1")),l=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"control-panel"}},[a("control-panel-option",{staticClass:"username",attrs:{name:"Username",type:"input",params:{value:t.username}},on:{update:function(e){return t.$emit("update:username",e)},submit:this.submit}}),a("control-panel-option",{staticClass:"tag-filter",attrs:{name:"Tag Filter",type:"checkbox",params:{value:t.filtered}},on:{update:function(e){return t.$emit("update:filtered",e)}}}),a("control-panel-option",{staticClass:"period",attrs:{name:"Period",type:"select",params:{options:t.period.options,selected:t.period.selected}},on:{update:function(e){return t.$emit("update:period",e)}}}),a("control-panel-option",{staticClass:"max-artists",attrs:{name:"Max Artists",type:"select",params:{options:t.max_artists.options,selected:t.max_artists.selected}},on:{update:function(e){return t.$emit("update:max_artists",e)}}}),a("control-panel-option",{staticClass:"load-data",attrs:{name:"Load Data",type:"button",params:{label:"Go!",disabled:void 0!=t.state}},on:{clicked:t.submit}})],1)},c=[],u=(a("ac1f"),a("5319"),function(){var t=this,e=this,a=e.$createElement,s=e._self._c||a;return s("label",{staticClass:"option"},[s("span",{staticClass:"label"},[e._v(e._s(e.name))]),"input"==e.type?s("input",{domProps:{value:e.params.value},on:{keyup:function(e){return"Enter"==e.key?t.$emit("submit"):t.$emit("update",e.target.value)}}}):e._e(),"select"==e.type?s("select",{domProps:{value:e.params.selected},on:{change:function(t){return e.$emit("update",t.target.value)}}},e._l(e.params.options,(function(t){return s("option",{key:t.value,domProps:{value:t.value}},[e._v(" "+e._s(t.text)+" ")])})),0):e._e(),"checkbox"==e.type?s("label",{staticClass:"button"},[s("input",{staticClass:"checkbox",attrs:{type:"checkbox"},domProps:{checked:e.params.value},on:{change:function(t){return e.$emit("update",t.target.checked)}}}),s("span",{staticClass:"checkmark"})]):e._e(),"button"==e.type?s("button",{attrs:{disabled:e.params.disabled},on:{click:function(t){return e.$emit("clicked")}}},[e._v(" "+e._s(e.params.label)+" ")]):e._e()])}),h=[],d={props:["name","type","params"]},g=d,p=(a("4fa4"),a("2877")),f=Object(p["a"])(g,u,h,!1,null,"f8425536",null),m=f.exports,v={props:["username","period","max_artists","filtered","state"],components:{ControlPanelOption:m},methods:{submit:function(){this.$emit("update:username",this.username.replace(/&/g,"")),this.$emit("generate")}}},b=v,_=(a("b8b5"),Object(p["a"])(b,l,c,!1,null,"6453bb6b",null)),y=_.exports,k=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"cloud-box"},[a("ul",{staticClass:"options-above"},[a("li",[t._v("Show me:")]),a("li",[a("button",{attrs:{disabled:"tags"==t.mode||t.building},on:{click:function(e){return t.generateTagCloud("tags")}}},[t._v(" Tags ")])]),a("li",[a("button",{attrs:{disabled:"artists"==t.mode||t.building},on:{click:function(e){return t.generateTagCloud("artists")}}},[t._v(" Artists ")])])]),a("canvas",{ref:"canvas",attrs:{width:"1920",height:"1200"}}),a("ul",{staticClass:"options-below"},[a("li",[a("input",{directives:[{name:"model",rawName:"v-model",value:t.fg_colour,expression:"fg_colour"}],ref:"fg-colour",attrs:{type:"color"},domProps:{value:t.fg_colour},on:{click:function(e){return t.coloursChanged()},input:function(e){e.target.composing||(t.fg_colour=e.target.value)}}})]),a("li",[a("input",{directives:[{name:"model",rawName:"v-model",value:t.bg_colour,expression:"bg_colour"}],ref:"bg-colour",attrs:{type:"color"},domProps:{value:t.bg_colour},on:{click:function(e){return t.coloursChanged()},input:function(e){e.target.composing||(t.bg_colour=e.target.value)}}})]),a("li",[a("button",{attrs:{disabled:t.building},on:{click:function(e){return t.generateTagCloud()}}},[t._v("Reshuffle")])]),a("li",[a("a",{ref:"download-link",attrs:{download:"cloud.png"}},[a("button",{attrs:{disabled:t.building},on:{click:t.downloadTagCloud}},[t._v("Download")])])]),a("li",{staticClass:"share-button"},[a("button",{on:{click:t.copyShareLink}},[a("span",[t._v("Copy Link:")]),a("input",{ref:"share-link",attrs:{readonly:"readonly"},domProps:{value:t.share_link}})])])])])},w=[],x=(a("6b93"),a("175f")),C=a.n(x),$=(a("fb6a"),a("d3b7"),a("25f0"),a("466d"),a("d4ec")),j=a("bee2"),O=function(){function t(){Object($["a"])(this,t)}return Object(j["a"])(t,null,[{key:"rgb2hex",value:function(t){function e(t){return("0"+parseInt(t).toString(16)).slice(-2)}return t=t.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/),"#"+e(t[1])+e(t[2])+e(t[3])}}]),t}(),T=O,P={props:["result","building"],mounted:function(){var t,e=1/0,a=-1/0,s=Object(o["a"])(this.result.tags);try{for(s.s();!(t=s.n()).done;){var r=t.value,n=this.result.scores[r];n<e&&(e=n),n>a&&(a=n)}}catch(m){s.e(m)}finally{s.f()}this.cloudTags=[];var i,l=Object(o["a"])(this.result.tags);try{for(l.s();!(i=l.n()).done;)r=i.value,this.cloudTags.push([r,Math.log10(99*(this.result.scores[r]-e)/a+1)/2*175+25]),this.result.tag_meta[r].shown=!0}catch(m){l.e(m)}finally{l.f()}var c,u=-1/0,h=Object(o["a"])(this.result.artists);try{for(h.s();!(c=h.n()).done;){var d=c.value,g=this.result.listens[d];g>u&&(u=g)}}catch(m){h.e(m)}finally{h.f()}this.cloudArtists=[];var p,f=Object(o["a"])(this.result.artists);try{for(f.s();!(p=f.n()).done;)d=p.value,this.cloudArtists.push([d,this.result.listens[d]/u*175+25])}catch(m){f.e(m)}finally{f.f()}this.bg_colour=T.rgb2hex(getComputedStyle(this.$refs["canvas"])["background-color"]),this.fg_colour=T.rgb2hex(getComputedStyle(this.$refs["canvas"])["color"]),this.generateTagCloud("tags")},data:function(){return{mode:"tags",bg_colour:"#000000",fg_colour:"#ffffff",colours_changed:!1,cloudTags:[],cloudArtists:[]}},methods:{generateTagCloud:function(t){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){var s,r,n,i,l,c,u;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(void 0!=t&&(e.mode=t),e.$emit("building",!0),e.colours_changed||e.retheme(),s=[],"tags"==e.mode){r=Object(o["a"])(e.cloudTags);try{for(r.s();!(n=r.n()).done;)i=n.value,e.result.tag_meta[i[0]].shown&&s.push(i)}catch(h){r.e(h)}finally{r.f()}}else{l=Object(o["a"])(e.cloudArtists);try{for(l.s();!(c=l.n()).done;)u=c.value,e.result.artists_shown[u[0]]&&s.push(u)}catch(h){l.e(h)}finally{l.f()}}e.$refs["canvas"].addEventListener("wordcloudstop",function(){this.$emit("building",!1)}.bind(e)),C()(e.$refs["canvas"],{list:s,fontFamily:"Roboto",shrinkToFit:!0,color:e.fg_colour,backgroundColor:e.bg_colour,shuffle:!0});case 7:case"end":return a.stop()}}),a)})))()},retheme:function(){this.bg_colour=T.rgb2hex(getComputedStyle(this.$refs["canvas"])["background-color"]),this.fg_colour=T.rgb2hex(getComputedStyle(this.$refs["canvas"])["color"])},downloadTagCloud:function(){this.$refs["download-link"].href=this.$refs["canvas"].toDataURL()},copyShareLink:function(){this.$refs["share-link"].select(),this.$refs["share-link"].setSelectionRange(0,99999),document.execCommand("Copy")},coloursChanged:function(){this.colours_changed=!0}},computed:{share_link:function(){return void 0!=this.result?window.location.origin+window.location.pathname+"?username="+this.result.username+"&period="+this.result.period+"&filtered="+this.result.filtered+"&max_artists="+this.result.max_artists:""}}},A=P,R=(a("7e69"),Object(p["a"])(A,k,w,!1,null,"cb388d2e",null)),S=R.exports,L=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"artists-list"},[a("button",{staticClass:"collapse-button",on:{click:t.collapse}},[t._v(t._s(t.collapsed?"+":"-"))]),a("h2",[t._v("Artists:")]),a("span",[t._v("//Don't like an artist? Uncheck them here!")]),t.collapsed?t._e():a("ol",t._l(t.artists,(function(e,s){return a("li",{key:s,attrs:{artist:e}},[a("label",{staticClass:"button"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.artists_shown[e],expression:"artists_shown[artist]"}],staticClass:"checkbox",attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.artists_shown[e])?t._i(t.artists_shown[e],null)>-1:t.artists_shown[e]},on:{change:[function(a){var s=t.artists_shown[e],r=a.target,n=!!r.checked;if(Array.isArray(s)){var o=null,i=t._i(s,o);r.checked?i<0&&t.$set(t.artists_shown,e,s.concat([o])):i>-1&&t.$set(t.artists_shown,e,s.slice(0,i).concat(s.slice(i+1)))}else t.$set(t.artists_shown,e,n)},function(e){return t.$emit("applyArtistChanges")}]}}),a("span",{staticClass:"checkmark"})]),a("div",{staticClass:"artist-info"},[a("span",{staticClass:"artist-name"},[t._v(t._s(s+1)+" - "),a("a",{attrs:{href:"https://www.last.fm/music/"+e.replace(/ /g,"+")}},[t._v(t._s(e))])]),t._v(" ("+t._s(t.listens[e])+" "+t._s(t.listens[e]>1?"listens":"listen")+") ")])])})),0)])},E=[],D={props:["artists","listens","artists_shown"],data:function(){return{collapsed:!0}},methods:{collapse:function(){this.collapsed=!this.collapsed}}},M=D,q=(a("882b"),Object(p["a"])(M,L,E,!1,null,"4205b594",null)),z=q.exports,N=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"tags-list"},[a("button",{staticClass:"collapse-button",on:{click:t.collapse}},[t._v(t._s(t.collapsed?"+":"-"))]),a("h2",[t._v("Tags:")]),a("span",[t._v("//Don't like a tag? Uncheck it here!")]),t.collapsed?t._e():a("ol",t._l(t.tags,(function(e){return a("li",{key:e,attrs:{tag:e}},[a("label",{staticClass:"button"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.tag_meta[e].shown,expression:"tag_meta[tag].shown"}],staticClass:"checkbox",attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.tag_meta[e].shown)?t._i(t.tag_meta[e].shown,null)>-1:t.tag_meta[e].shown},on:{change:[function(a){var s=t.tag_meta[e].shown,r=a.target,n=!!r.checked;if(Array.isArray(s)){var o=null,i=t._i(s,o);r.checked?i<0&&t.$set(t.tag_meta[e],"shown",s.concat([o])):i>-1&&t.$set(t.tag_meta[e],"shown",s.slice(0,i).concat(s.slice(i+1)))}else t.$set(t.tag_meta[e],"shown",n)},function(e){return t.$emit("applyTagChanges")}]}}),a("span",{staticClass:"checkmark"})]),a("div",{staticClass:"tag-info"},[a("a",{staticClass:"tag-name",attrs:{href:t.tag_meta[e].url}},[t._v(t._s(e))]),t._v(" ("+t._s(t.tag_meta[e].tot_scrobbles)+" "+t._s(t.tag_meta[e].tot_scrobbles>1?"listens":"listen")+"): "),a("taggings-list",{attrs:{taggings:t.taggings[e]}})],1)])})),0)])},B=[],F=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ol",[t._l(t.collapsed?t.taggings.slice(0,3):t.taggings,(function(e,s){return a("li",{key:s},[t._v(t._s(e.artist+(s==t.taggings.length-1?". ":", ")))])})),t.taggings.length>3?a("li",{staticClass:"collapser",on:{click:t.toggle}},[a("a",[t._v(t._s(t.collapsed?"show more...":"show less"))])]):t._e()],2)},G=[],U={props:["taggings"],data:function(){return{collapsed:!0}},methods:{toggle:function(){this.collapsed=!this.collapsed}}},I=U,J=(a("88ad"),Object(p["a"])(I,F,G,!1,null,"f6ed7a20",null)),K=J.exports,W={components:{TaggingsList:K},props:["tags","taggings","tag_meta"],data:function(){return{collapsed:!0}},methods:{collapse:function(){this.collapsed=!this.collapsed}}},Y=W,H=(a("04a1"),Object(p["a"])(Y,N,B,!1,null,"a0bd95f2",null)),Q=H.exports,V=function(){var t=this,e=t.$createElement,a=t._self._c||e;return t.fetchedData&&void 0==t.state?a("h2",[a("a",{attrs:{href:"https://www.last.fm/user/"+t.username}},[t._v(" "+t._s(t.username))]),t._v(t._s(t.artistCount>0?"s"==t.username[t.username.length-1].toLowerCase()?"'":"'s":"")+" "+t._s((t.artistCount>0?"tag cloud based upon their top "+t.artistCount+" artists ":"hasn't listened to anything ")+{"7day":"over the last 7 days","1month":"over the last month","3month":"over the last 3 months","6month":"over the last 6 months","12month":"over the last year",overall:"overall"}[t.timePeriod]+(t.artistCount>0?":":""))+" ")]):void 0==t.state&&void 0!=t.error?a("h2",[t._v(" An error occured :'( "),a("br"),a("br"),t._v(" "+t._s(t.error)+" ")]):void 0!=t.state?a("h2",[a("div",{staticClass:"spinner"}),t._v(" "+t._s(t.state)+" ")]):t._e()},X=[],Z={props:["fetchedData","state","username","artistCount","timePeriod","error"]},tt=Z,et=(a("3398"),Object(p["a"])(tt,V,X,!1,null,"22f8a3dc",null)),at=et.exports,st=(a("caad"),a("a434"),a("b0c0"),a("2532"),a("3ca3"),a("1276"),a("ddb0"),a("bc3a")),rt=a.n(st),nt="97773975bd1d3fdf89b362a27d2b6313",ot=100,it=["geohash","all","seen live","cunt","fuck","motherfucker","bastard","beaver","bellend","clunge","cock","dick","dickhead","fanny","flaps","gash","knob","minge","prick","punani","pussy","snatch","twat","arsehole","balls","bint","bitch","bollocks","bullshit","feck","munter","pissed","pissed off","shit","son of a bitch","tits","cocksucker","dildo","jizz","ho","nonce","prickteaser","skank","slag","slut","wanker","whore","shag","slapper","tart","prod","yid","batty boy","chick with a dick","faggot","gender bender","fudge-packer","shirt lifter","bender","bum boy","dyke","he-she","homo","lezza","lesbo","muff driver","nancy","poof","queer","rug muncher","carpet muncher","tranny","bummer","fairy","pansy","mong","retard","spastic","spakka","spaz","window licker","cripple","midget","schizo","special","vegetable","chinky","coon","darky","golliwog","nigger","nig-nog","paki","wog","honky","jap","negro","polack","raghead","spade","coloured","gippo","kraut","pikey"],lt=function(){function t(){Object($["a"])(this,t),this.state=void 0}return Object(j["a"])(t,[{key:"generate",value:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(e,a,s,r){var n,o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n={username:e,period:a,max_artists:s,filtered:r,artists:[],listens:{},tags:[],taggings:{},tag_meta:{},scores:{}},o=void 0,this.state="Getting artists' data...",t.next=5,this.get_artist_data(n).then((function(t){return o=t}));case 5:if(void 0!=o){t.next=18;break}return this.state="Pruning tags...",t.next=9,this.prune_tags(n);case 9:return this.state="Getting tags' data...",t.next=12,this.get_tag_data(n);case 12:return this.state="Scoring tags...",t.next=15,this.score_tags(n);case 15:return this.state="Sorting tags...",t.next=18,this.sort_data(n);case 18:return this.state=void 0,t.abrupt("return",{result:void 0==o?n:void 0,error:o});case 20:case"end":return t.stop()}}),t,this)})));function e(e,a,s,r){return t.apply(this,arguments)}return e}()},{key:"get_artist_data",value:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,rt.a.get("https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&api_key="+nt+"&user="+e.username+"&period="+e.period+"&limit="+e.max_artists+"&format=json").then(function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(a){var s,r,n,l;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:s=[],r=Object(o["a"])(a.data.topartists.artist);try{for(r.s();!(n=r.n()).done;)l=n.value,s.push(new Promise(function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(a){var s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return s=l.name.toLowerCase(),e.artists.push(s),e.listens[s]=parseInt(l.playcount),t.next=5,rt.a.get("https://ws.audioscrobbler.com/2.0/?method=artist.getTopTags&api_key="+nt+"&artist="+s.replace(/&/g,"%26")+"&format=json").then(function(t){if(void 0!=t.data.toptags){var a,r=Object(o["a"])(t.data.toptags.tag);try{for(r.s();!(a=r.n()).done;){var n=a.value;n.name.includes("&")||(n.name=n.name.toLowerCase(),void 0==e.taggings[n.name]?(e.tags.push(n.name),e.taggings[n.name]=[{artist:s,count:n.count}],e.tag_meta[n.name]={library_total:n.count/100,url:n.url,tot_scrobbles:e.listens[s]}):(e.taggings[n.name].push({artist:s,count:n.count}),e.tag_meta[n.name].library_total+=n.count/100,e.tag_meta[n.name].tot_scrobbles+=e.listens[s]))}}catch(i){r.e(i)}finally{r.f()}}}.bind(this));case 5:a(!0);case 6:case"end":return t.stop()}}),t,this)})));return function(e){return t.apply(this,arguments)}}().bind(this)))}catch(c){r.e(c)}finally{r.f()}return t.next=5,Promise.all(s);case 5:case"end":return t.stop()}}),t,this)})));return function(e){return t.apply(this,arguments)}}().bind(this)).catch(function(t){return t}.bind(this));case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t,this)})));function e(e){return t.apply(this,arguments)}return e}()},{key:"prune_tags",value:function(t){for(var e in t.tags)for(var a in t.tags)if(e!=a){var s=t.tags[e],r=t.tags[a];("s"==r[r.length-1]&&r.slice(0,r.length-1)==s||r.replace(/ | /g,"")==s.replace(/ | /g,""))&&(t.tag_meta[s].library_total>=t.tag_meta[r].library_total?t.tags.splice(a,1):t.tags.splice(e,1))}if(t.tags.sort(function(e,a){return t.tag_meta[a].library_total-t.tag_meta[e].library_total}.bind(this)),t.filtered)for(e=0;e<ot;e++){if(e>=t.tags.length)break;(it.some((function(a){return t.tags[e]==a||t.tags[e].split(/-| /).some((function(t){return t==a.replace(/-| /g,"")}))||t.tags[e].match(/-| /)&&a.match(/-| /)&&t.tags[e]==a}))||"geohash"==t.tags[e].split(":")[0])&&(t.tags.splice(e,1),e--)}t.tags=t.tags.slice(0,ot)}},{key:"get_tag_data",value:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(e){var a,s,r,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:a=[],s=Object(o["a"])(e.tags);try{for(s.s();!(r=s.n()).done;)n=r.value,a.push(new Promise(function(t){return function(){var a=Object(i["a"])(regeneratorRuntime.mark((function a(s){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,rt.a.get("https://ws.audioscrobbler.com/2.0/?method=tag.getinfo&api_key="+nt+"&tag="+t+"&format=json").then(function(){var a=Object(i["a"])(regeneratorRuntime.mark((function a(s){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(void 0!=s.data.tag){a.next=2;break}return a.abrupt("return");case 2:e.tag_meta[t].reach=s.data.tag.reach,e.tag_meta[t].total=s.data.tag.total;case 4:case"end":return a.stop()}}),a)})));return function(t){return a.apply(this,arguments)}}().bind(this));case 2:s(!0);case 3:case"end":return a.stop()}}),a,this)})));return function(t){return a.apply(this,arguments)}}().bind(this)}.bind(this)(n)))}catch(l){s.e(l)}finally{s.f()}return t.next=5,Promise.all(a);case 5:case"end":return t.stop()}}),t,this)})));function e(e){return t.apply(this,arguments)}return e}()},{key:"score_tags",value:function(t){var e,a=Object(o["a"])(t.tags);try{for(a.s();!(e=a.n()).done;){var s=e.value;t.scores[s]=0;var r,n=Object(o["a"])(t.taggings[s]);try{for(n.s();!(r=n.n()).done;){var i=r.value;t.scores[s]+=i.count/100*t.listens[i.artist]}}catch(l){n.e(l)}finally{n.f()}t.scores[s]=t.scores[s]*(t.tag_meta[s].library_total/t.tag_meta[s].total)*t.taggings[s].length*t.taggings[s].length*Math.log10(t.tag_meta[s].reach)}}catch(l){a.e(l)}finally{a.f()}}},{key:"sort_data",value:function(t){var e,a=Object(o["a"])(t.tags);try{for(a.s();!(e=a.n()).done;){var s=e.value;t.taggings[s].sort((function(t,e){return e.count-t.count}))}}catch(r){a.e(r)}finally{a.f()}t.tags.sort(function(e,a){return t.scores[a]-t.scores[e]}.bind(this))}}]),t}(),ct=lt,ut={components:{ControlPanel:y,CloudBox:S,ArtistsList:z,TagsList:Q,ResultTitle:at},data:function(){return{username:"TheTeaCat",period:{selected:"3month",options:[{text:"7 Days",value:"7day"},{text:"Month",value:"1month"},{text:"3 Months",value:"3month"},{text:"6 Months",value:"6month"},{text:"Year",value:"12month"},{text:"Overall",value:"overall"}]},max_artists:{selected:25,options:[{text:"10",value:10},{text:"25",value:25},{text:"50",value:50},{text:"100",value:100}]},filtered:!1,generator:new ct,result:void 0,error:void 0,cloudWords:void 0,building:!0,theme:{label:"System Theme",value:""},themes:[{label:"System Theme",value:""},{label:"Dark Theme",value:"dark"},{label:"Light Theme",value:"light"}]}},mounted:function(){this.$cookies.isKey("theme")&&(this.theme=this.$cookies.get("theme"),document.getElementsByTagName("html")[0].setAttribute("theme",this.theme.value)),this.$cookies.isKey("config")&&(this.username=this.$cookies.get("config").username,this.period.selected=this.$cookies.get("config").period,this.max_artists.selected=this.$cookies.get("config").max_artists,this.filtered=this.$cookies.get("config").filtered),this.period.options.some(function(t){return t.value==this.$route.query.period}.bind(this))&&(this.period.selected=this.$route.query.period),this.max_artists.options.some(function(t){return t.value==this.$route.query.max_artists}.bind(this))&&(this.max_artists.selected=this.$route.query.max_artists),void 0!=this.$route.query.filtered&&(this.filtered={true:!0,false:!1}[this.$route.query.filtered]),void 0!=this.$route.query.username&&(this.username=this.$route.query.username,this.$router.push(this.$route.path),this.generate())},methods:{generate:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){var a,s,r,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(void 0==t.generator.state){e.next=2;break}return e.abrupt("return");case 2:return t.result=void 0,t.error=void 0,e.next=6,t.generator.generate(t.username,t.period.selected,t.max_artists.selected,t.filtered);case 6:a=e.sent,t.error=a.error,t.result=a.result,t.result.artists_shown={},s=Object(o["a"])(t.result.artists);try{for(s.s();!(r=s.n()).done;)n=r.value,t.result.artists_shown[n]=!0}catch(i){s.e(i)}finally{s.f()}case 12:case"end":return e.stop()}}),e)})))()},updateCookie:function(){this.$cookies.set("config",{username:this.username,period:this.period.selected,max_artists:this.max_artists.selected,filtered:this.filtered})},changeTheme:function(){this.theme=this.themes[(this.themes.map((function(t){return t.label})).indexOf(this.theme.label)+1)%this.themes.length],document.getElementsByTagName("html")[0].setAttribute("theme",this.theme.value),this.$cookies.set("theme",this.theme)}}},ht=ut,dt=(a("a2cc"),Object(p["a"])(ht,r,n,!1,null,"326f98c8",null)),gt=dt.exports,pt=(a("78a7"),a("8c4f")),ft=a("2b27"),mt=a.n(ft);s["a"].use(pt["a"]);var vt=new pt["a"]({mode:"history",routes:[]});s["a"].use(mt.a),s["a"].$cookies.config("7d"),s["a"].config.productionTip=!1,new s["a"]({router:vt,render:function(t){return t(gt)}}).$mount("#app")},"597f":function(t,e,a){},"6a49":function(t,e,a){},"78a7":function(t,e,a){},"7e69":function(t,e,a){"use strict";var s=a("597f"),r=a.n(s);r.a},"882b":function(t,e,a){"use strict";var s=a("42ed"),r=a.n(s);r.a},"88ad":function(t,e,a){"use strict";var s=a("29c2"),r=a.n(s);r.a},a2cc:function(t,e,a){"use strict";var s=a("3c63"),r=a.n(s);r.a},b8b5:function(t,e,a){"use strict";var s=a("c55b"),r=a.n(s);r.a},c55b:function(t,e,a){},f147:function(t,e,a){}});
//# sourceMappingURL=app.5bf28638.js.map