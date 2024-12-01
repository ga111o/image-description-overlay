function Aside(i){var j=parseMultilineStrFunction(function(){
/*!@preserve
<div class="news_common_aside _contents" style="visibility:hidden;"> {{! loading 노출 후 show }}
    {{#isNews}}
    <div class="subscriptionlist">
        {{#displaySubscriptionInfo}}
            {{^press.isError}}
            <div class="s_wrap">
                <div class="s_title _press_title">
                    <a href="{{pressSettingUrl}}"
                        onclick="nclk(event, '{{clickCode.press.title}}', '', '')"
                        class="s_title_link">
                        <h5 class="s_h">구독 언론사</h5>
                        <span class="s_count">{{press.count}}</span>
                    </a>
                    {{#press.hasMoreItem}}
                    <button type="button"
                        onclick="nclk(event, '{{clickCode.press.refresh}}', '', '')"
                        class="s_refreshbutton _refresh_btn">새로보기</button>
                    {{/press.hasMoreItem}}
                </div>
                {{#press.hasListItem}}
                <div class="_press_list"></div> {{! 출력은 _AsideList 에서 }}
                {{/press.hasListItem}}
                {{^press.hasListItem}}
                <p class="s_error">관심있는 언론사를 구독해 보세요.</p>
                {{/press.hasListItem}}
            </div>
            {{/press.isError}}
            {{^journalist.isError}}
            <div class="s_wrap">
                <div class="s_title _journalist_title">
                    <a href="{{journalistSettingUrl}}"
                        onclick="nclk(event, '{{clickCode.journalist.title}}', '', '')"
                        class="s_title_link">
                        <h5 class="s_h">구독 기자</h5>
                        <span class="s_count">{{journalist.count}}</span>
                    </a>
                    {{#journalist.hasMoreItem}}
                    <button type="button"
                        onclick="nclk(event, '{{clickCode.journalist.refresh}}', '', '')"
                        class="s_refreshbutton _refresh_btn">새로보기</button>
                    {{/journalist.hasMoreItem}}
                </div>
                {{#journalist.hasListItem}}
                <div class="_journalist_list"></div>
                {{/journalist.hasListItem}}
                {{^journalist.hasListItem}}
                <a href="{{journalistSettingUrl}}" onclick="nclk(event, '{{clickCode.journalist.setting}}', '', '')" class="s_error">관심있는 기자를 구독해 보세요</a>
                {{/journalist.hasListItem}}
            </div>
            {{/journalist.isError}}
            {{^series.isError}}
            <div class="s_wrap">
                <div class="s_title _series_title">
                    <a href="{{seriesSettingUrl}}"
                        onclick="nclk(event, '{{clickCode.series.title}}', '', '')"
                        class="s_title_link">
                        <h5 class="s_h">구독 연재</h5>
                        <span class="s_count">{{series.count}}</span>
                    </a>
                    {{#series.hasMoreItem}}
                    <button type="button"
                        onclick="nclk(event, '{{clickCode.series.refresh}}', '', '')"
                        class="s_refreshbutton _refresh_btn">새로보기</button>
                    {{/series.hasMoreItem}}
                </div>
                {{#series.hasListItem}}
                <div class="_series_list"></div>
                {{/series.hasListItem}}
                {{^series.hasListItem}}
                <a href="{{seriesSettingUrl}}" onclick="nclk(event, '{{clickCode.series.setting}}', '', '')" class="s_error">관심있는 연재를 구독해 보세요</a>
                {{/series.hasListItem}}
                {{> JOURNALIST_SERIES_INFO_LAYER}}
            </div>
            {{/series.isError}}
        {{/displaySubscriptionInfo}}
        {{^displaySubscriptionInfo}}
            {{^otherPressList.isError}}
            <div class="s_wrap">
                <div class="s_title _other_press_title">
                    <div class="s_title_link">
                        <h5 class="s_h">다른 언론사 보기</h5>
                    </div>
                    {{#otherPressList.hasMoreItem}}
                    <button type="button"
                        onclick="nclk(event, '{{clickCode.otherPressList.refresh}}', '', '')"
                        class="s_refreshbutton _refresh_btn">새로보기</button>
                    {{/otherPressList.hasMoreItem}}
                </div>
                <div class="_other_press_list"></div>
            </div>
            {{/otherPressList.isError}}
        {{/displaySubscriptionInfo}}
        <a href="{{pressSettingUrl}}"
            onclick="nclk(event, '{{clickCode.setting}}', '', '')"
            class="s_settingbutton">구독 설정</a>
    </div>
    {{#premium.hasListItem}}
    <div class="subscriptionlist">
        <div class="s_wrap">
            <div class="s_title _premium_subscribe_title">
                <a href="{{premiumSubscribedUrl}}"
                        onclick="nclk(event, '{{clickCode.premium.title}}', '', '')"
                        class="s_title_link">
                    <h5 class="s_h">구독 프리미엄</h5>
                    <span class="s_count">{{premium.count}}</span>
                </a>
                {{#premium.hasMoreItem}}
                {{/premium.hasMoreItem}}
            </div>
            <div class="_premium_subscribed_list"></div>
        </div>
        <a href="{{premiumSubscribedUrl}}"
            onclick="nclk(event, '{{clickCode.myPremium}}', '', '')"
            class="s_settingbutton">MY 프리미엄</a>
    </div>
    {{/premium.hasListItem}}
    {{#premiumContent.hasListItem}}
    <div class="subscriptionlist">
        <div class="s_wrap">
            <div class="s_title _premium_recommend_title">
                <div class="s_title_link">
                    <h5 class="s_h">프리미엄 추천 채널</h5>
                </div>
                {{#premiumContent.hasMoreItem}}
                <button type="button"
                    onclick="nclk(event, '{{clickCode.premiumContent.refresh}}', '', '')"
                    class="s_refreshbutton _refresh_btn">새로보기</button>
                {{/premiumContent.hasMoreItem}}
            </div>
            <div class="_premium_recommend_list"></div>
        </div>
    </div>
    {{/premiumContent.hasListItem}}
    {{/isNews}}
    {{#isEnterSports}}
        <div class="subscriptionlist">
            {{^journalist.isError}}
            <div class="s_wrap">
                <div class="s_title _journalist_title">
                    <a href="{{journalistSettingUrl}}"
                        onclick="nclk(event, '{{clickCode.journalist.title}}', '', '')"
                        class="s_title_link">
                        <h5 class="s_h">구독 기자</h5>
                        <span class="s_count">{{journalist.count}}</span>
                    </a>
                    {{#journalist.hasMoreItem}}
                    <button type="button"
                        onclick="nclk(event, '{{clickCode.journalist.refresh}}', '', '')"
                        class="s_refreshbutton _refresh_btn">새로보기</button>
                    {{/journalist.hasMoreItem}}
                </div>
                {{#journalist.hasListItem}}
                <div class="_journalist_list"></div>
                {{/journalist.hasListItem}}
                {{^journalist.hasListItem}}
                <a href="{{journalistSettingUrl}}" onclick="nclk(event, '{{clickCode.journalist.setting}}', '', '')" class="s_error">관심있는 기자를 구독해보세요</a>
                {{/journalist.hasListItem}}
                {{#isEntertain}}
                {{> ENTERTAIN_SERIES_INFO_LAYER }}
                {{/isEntertain}}
            </div>
            {{/journalist.isError}}
            {{^series.isError}}
            <div class="s_wrap">
                <div class="s_title _series_title">
                    <a href="{{seriesSettingUrl}}"
                        onclick="nclk(event, '{{clickCode.series.title}}', '', '')"
                        class="s_title_link">
                        <h5 class="s_h">구독 연재</h5>
                        <span class="s_count">{{series.count}}</span>
                    </a>
                    {{#series.hasMoreItem}}
                    <button type="button"
                        onclick="nclk(event, '{{clickCode.series.refresh}}', '', '')"
                        class="s_refreshbutton _refresh_btn">새로보기</button>
                    {{/series.hasMoreItem}}
                </div>
                {{#series.hasListItem}}
                <div class="_series_list"></div>
                {{/series.hasListItem}}
                {{^series.hasListItem}}
                <a href="{{seriesSettingUrl}}" onclick="nclk(event, '{{clickCode.series.setting}}', '', '')" class="s_error">관심있는 연재를 구독해 보세요</a>
                {{/series.hasListItem}}
                {{> JOURNALIST_SERIES_INFO_LAYER}}
            </div>
            {{/series.isError}}
            <a href="{{journalistSettingUrl}}"
                onclick="nclk(event, '{{clickCode.setting}}', '', '')"
                class="s_settingbutton">구독 설정</a>
        </div>
        {{#otherPressList.hasListItem}}
            {{#isEntertain}}
        <div class="subscriptionlist">
            <div class="s_wrap">
                <div class="s_title _other_press_title">
                    <div class="s_title_link">
                        <h5 class="s_h">다른 언론사 보기</h5>
                    </div>
                    {{#otherPressList.hasMoreItem}}
                    <button type="button"
                        onclick="nclk(event, '{{clickCode.otherPressList.refresh}}', '', '')"
                        class="s_refreshbutton _refresh_btn">새로보기</button>
                    {{/otherPressList.hasMoreItem}}
                </div>
                <div class="_other_press_list"></div>
            </div>
        </div>
            {{/isEntertain}}
        {{/otherPressList.hasListItem}}
        {{#premium.hasListItem}}
        <div class="subscriptionlist">
            <div class="s_wrap">
                <div class="s_title _premium_subscribe_title">
                    <a href="{{premiumSubscribedUrl}}"
                            onclick="nclk(event, '{{clickCode.premium.title}}', '', '')"
                            class="s_title_link">
                        <h5 class="s_h">구독 프리미엄</h5>
                        <span class="s_count">{{premium.count}}</span>
                    </a>
                    {{#premium.hasMoreItem}}
                    {{/premium.hasMoreItem}}
                </div>
                <div class="_premium_subscribed_list"></div>
            </div>
            <a href="{{premiumSubscribedUrl}}"
                onclick="nclk(event, '{{clickCode.myPremium}}', '', '')"
                class="s_settingbutton">MY 프리미엄</a>
        </div>
        {{/premium.hasListItem}}
        {{#premiumContent.hasListItem}}
        <div class="subscriptionlist">
            <div class="s_wrap">
                <div class="s_title _premium_recommend_title">
                    <div class="s_title_link">
                        <h5 class="s_h">프리미엄 추천 채널</h5>
                    </div>
                    {{#premiumContent.hasMoreItem}}
                    <button type="button"
                        onclick="nclk(event, '{{clickCode.premiumContent.refresh}}', '', '')"
                        class="s_refreshbutton _refresh_btn">새로보기</button>
                    {{/premiumContent.hasMoreItem}}
                </div>
                <div class="_premium_recommend_list"></div>
            </div>
        </div>
        {{/premiumContent.hasListItem}}
    {{/isEnterSports}}
</div>
*/
return true
});
var h=parseMultilineStrFunction(function(){
/*!@preserve
<div class="s_desc _journalist_series_info_layer">
    <button type="button"
        onclick="nclk(event, '{{clickCode.journalistSeriesTooltip.toggle}}', '', '')"
        class="s_desc_button _toggle_btn">노출 기준</button>
    <div class="s_desc_layer _layer is_hidden">
        <button type="button"
            onclick="nclk(event, '{{clickCode.journalistSeriesTooltip.close}}', '', '')"
            class="s_desc_close _close_btn">닫기</button>
        <p class="s_desc_p">구독 기자와 구독 연재는 랜덤으로 각각 최대 20개 정렬됩니다. 구독 설정 페이지에서 추가로 볼 수 있습니다.</p>
    </div>
</div>
*/
return true
});
var r=parseMultilineStrFunction(function(){
/*!@preserve
<div class="s_desc _journalist_series_info_layer">
    <button type="button"
        onclick="nclk(event, '{{clickCode.entertainSeriesTooltip.toggle}}', '', '')"
        class="s_desc_button _toggle_btn">노출 기준</button>
    <div class="s_desc_layer _layer is_hidden">
        <button type="button"
            onclick="nclk(event, '{{clickCode.entertainSeriesTooltip.close}}', '', '')"
            class="s_desc_close _close_btn">닫기</button>
        <p class="s_desc_p">구독 기자는 랜덤으로 최대 20개 정렬됩니다. 구독 설정 페이지에서 추가로 볼 수 있습니다.</p>
    </div>
</div>
*/
return true
});
var f=$("._aside_wrapper");
var l=8;
var e=0;
var g=8;
var p=0;
var m=4;
var n=20;
var s=4;
var k=20;
var q=3;
var a=3;
var d=3;
var o=15;
$.ajax(i).done(function(v){try{var u=b(v.result);
t(u);
if($("._journalist_series_info_layer")[0]){LayerToggler({wrapper:$("._journalist_series_info_layer"),toggleBtnSelector:"._toggle_btn",layerSelector:"._layer",closeBtnSelector:"._close_btn",layerCloseClass:"is_hidden"})
}c();
var x=Loading();
f.css("position","relative");
x.appendTo(f,"10%");
setTimeout(function(){f.find("._contents").css("visibility","");
f.css("position","");
x.removeFrom(f)
},200)
}catch(w){}});
function t(u){f.get(0).innerHTML=Mustache.render(j,u,{JOURNALIST_SERIES_INFO_LAYER:h,ENTERTAIN_SERIES_INFO_LAYER:r});
_AsideItemList($("._press_list"),{data:u.press,displayCount:l,isRandom:false},$("._press_title"));
_AsideItemList($("._series_list"),{data:u.series,max:k,displayCount:s,isRandom:true},$("._series_title"));
_AsideItemList($("._journalist_list"),{data:u.journalist,max:n,displayCount:m,isRandom:true},$("._journalist_title"));
_AsideItemList($("._premium_subscribed_list"),{max:a,data:u.premium,displayCount:q,isRandom:false},$("._premium_subscribe_title"));
_AsideItemList($("._premium_recommend_list"),{data:u.premiumContent,max:o,displayCount:d,isRandom:false},$("._premium_recommend_title"));
_AsideItemList($("._other_press_list"),{data:u.otherPressList,displayCount:g,isRandom:true},$("._other_press_title"))
}function c(){u();
setTimeout(u,2000);
function u(){window.top.postMessage({type:"setIframeSize",height:document.body.offsetHeight},"*")
}}function b(z){var u={};
switch(z.type){case"News":u={press:{link:"rig.setmedia",refresh:"rig.mediaref",title:"rig.setmediatit"},series:{link:"rig.series",refresh:"rig.sref",title:"rig.setseries",setting:"rig.ssub"},journalist:{link:"rig.jounalist",refresh:"rig.jref",title:"rig.setjounalist",setting:"rig.jsub"},journalistSeriesTooltip:{toggle:"rig.jsinfo",close:"rig.jsinfox"},otherPressList:{link:"rig.yetmedia",refresh:"rig.yetmediaref"},premium:{link:"rig.subpremiumchl",title:"rig.subpremium"},premiumContent:{link:"rig.recpremiumchl",refresh:"rig.recpremiumref",},setting:"rig.editset",myPremium:"rig.subpremiummy"};
z.isNews=true;
z.press=y(z.press,e,l);
z.press.clickCode=u.press;
z.journalist=y(z.journalist,n,m);
z.journalist.clickCode=u.journalist;
z.series=y(z.series,k,s);
z.series.clickCode=u.series;
break;
case"Entertain":z.isEntertain=true;
case"Sports":case"EnterSports":u={journalist:{link:"rig.essetserart",refresh:"rig.esjref",title:"rig.essetserartit",setting:"rig.esjsub"},journalistSeriesTooltip:{toggle:"rig.esserarttooltip",close:"rig.esserarttooltipcl"},series:{link:"rig.series",refresh:"rig.sref",title:"rig.setseries",setting:"rig.ssub"},otherPressList:{link:"rig.esyetmedia",refresh:"rig.esyetmediaref"},premium:{link:"rig.subpremiumchl",title:"rig.subpremium"},premiumContent:{link:"rig.recpremiumchl",refresh:"rig.recpremiumref",},setting:"rig.eseditset",myPremium:"rig.subpremiummy"};
z.isEnterSports=true;
z.journalist=y(z.journalist,n,m);
z.journalist.clickCode=u.journalist;
z.series=y(z.series,k,s);
z.series.clickCode=u.series;
break
}z.otherPressList=y(z.otherPressList,p,g);
z.otherPressList.clickCode=u.otherPressList;
z.premium=y(z.premium,a,q);
z.premium.clickCode=u.premium;
z.premiumContent=y(z.premiumContent,o,d);
z.premiumContent.clickCode=u.premiumContent;
z.clickCode=u;
if(z.isNews){z.displaySubscriptionInfo=z.press.hasListItem||z.journalist.hasListItem||z.series.hasListItem
}if(z.isNews&&!z.displaySubscriptionInfo&&!z.otherPressList.hasListItem){z.displaySubscriptionInfo=true
}function y(C,B,D){var A=C||{};
A.isError=Array.isArray(A.list)===false;
A.hasListItem=!A.isError&&A.list.length>0;
A.hasMoreItem=v(A,B,D);
if(A.count!==undefined){A.count=w(A.count)
}return A
}function v(D,A,B){if(D.isError||!D.hasListItem){return false
}var C=x(D,A,B);
return C.length>B
}function x(D,A,C){var B=D.list.slice(0);
if(A!==0){return B.slice(0,A)
}else{return B
}}function w(A){if(Number(A)>999){return"999+"
}else{return A
}}return z
}};function _AsideItemList(a,b,f){var k=parseMultilineStrFunction(function(){
/*!@preserve
<ul class="s_list _list">
    {{> itemList}}
</ul>
*/
return true
});
var l=parseMultilineStrFunction(function(){
/*!@preserve
{{#list}}
<li class="s_item">
    <a href="{{url}}" class="s_item_a" onclick="nclk(event, '{{clickCode.link}}', '', '')">
        <div class="s_item_thumb">
            <img src="{{thumb}}" class="s_item_img" alt="" onerror="showNoImage(this)">
        </div>
        <div class="s_item_text">{{name}}</div>
    </a>
</li>
{{/list}}
*/
return true
});
var d=b.data;
if(!a[0]||d.isError){return
}var h=b.displayCount;
var g=(function(){var m=d.list.slice(0);
if(b.isRandom){shuffle(m)
}if(b.max){return m.slice(0,b.max)
}else{return m
}})();
var c=g.slice(0);
var e=1;
a.html(Mustache.render(k,{list:i(e),hasMoreItem:g.length>h,clickCode:d.clickCode},{itemList:l}));
f.find("._refresh_btn").on("click",function(){var n=e+1;
var m=i(n);
if(m.length<h){c=m.concat(g);
e=1
}else{e=n
}j()
});
function j(){var m=Mustache.render(l,{list:i(e),clickCode:d.clickCode});
a.find("._list").html(m)
}function i(n){var o=(n-1)*h;
var m=n*h;
return c.slice(o,m)
}};function parseMultilineStrFunction(a){var b=/\/\*!?(?:\@preserve)?[ \t]*(?:\r\n|\n)([\s\S]*?)(?:\r\n|\n)\s*\*\//;
var c=b.exec(a.toString())[1];
return c||""
}function escapeHtmlChar(a){return a.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&apos;").replace(/</g,"&lt;").replace(/>/g,"&gt;")
}function shuffle(d){var b;
var a;
for(var c=d.length-1;
c>0;
c--){b=Math.floor(Math.random()*(c+1));
a=d[c];
d[c]=d[b];
d[b]=a
}}function convertNodeListToArray(a){return Array.apply(null,a)
}function cloneDeep(a){return JSON.parse(JSON.stringify(a))
}function getOffset(a){var b=a.getBoundingClientRect();
return{top:b.top+window.pageYOffset,left:b.left+window.pageXOffset}
}function getHeight(c){var b=c.style.cssText;
var a;
c.style.display="block";
c.style.visibility="hidden";
a=c.offsetHeight;
c.style.cssText=b;
return a
}function loadImage(c,a){var b=convertNodeListToArray(c.querySelectorAll("img["+a+"]"));
b.forEach(function(d){var e=d.getAttribute(a);
if(e!==null){d.setAttribute("src",e);
d.removeAttribute(a)
}})
};function LayerToggler(f){var p=f.toggleBtnSelector;
var k=f.layerCloseClass||null;
var n=f.layerSelector;
var l=f.useLayerAutoCloseWhenFocusOut!==false;
var d=$(f.wrapper);
h();
return{activate:h,deactivate:e,open:j,close:m};
function h(){d.find(p).on("click",g);
d.find(f.closeBtnSelector).on("click",c);
if(l){$(document).on("click",a)
}}function e(){d.find(p).off("click",g);
d.find(f.closeBtnSelector).off("click",c);
$(document).off("click",a)
}function j(){if(k){b().removeClass(k)
}else{b().show()
}}function m(){if(k){b().addClass(k)
}else{b().hide()
}}function c(){m()
}function g(){if(i()){m();
return
}j()
}function a(q){var r=q.target;
if(i()===false){return
}if(o(r)===false){m()
}}function o(q){var s=Boolean($(q).closest(p)[0]);
var r=Boolean($(q).closest(n)[0]);
return(s||r)&&$.contains(d.get(0),q)
}function i(){if(k){return b().hasClass(k)===false
}return b().css("display")!=="none"
}function b(){return d.find(n)
}};function Loading(){var g=['<img class="_loading"','src="https://ssl.pstatic.net/static.news/image/news/m/2016/02/24/loading.gif"','alt="로딩중" width="32" height="8"','style="position:absolute;top:50%;left:50%;margin-left:-16px;margin-top:-8px;z-index:10000;">'].join(" ");
var e='<div class="_loading_keep_height" style="position:relative;">&nbsp;</div>';
return{paintTo:d,paintToKeepPrevHeight:c,appendTo:b,removeFrom:a};
function d(i,h){var j=$(g);
a(i);
if(h){f(j,h)
}$(i).get(0).innerHTML=j.get(0).outerHTML
}function c(k,l,j){var m=$(k);
var h=$(e);
h.height(i());
m.html("");
m.append(h);
d(h,l);
function i(){var n=m.height();
if((n===0)&&j){n=j
}return n
}}function b(k,i,h){if(false===Boolean(h)){a(k)
}var j=$(g).appendTo(k);
if(i){f(j,i)
}}function a(h){$(h).find("._loading_keep_height").remove();
$(h).find("._loading").remove()
}function f(i,h){$(i).css("top",h)
}};