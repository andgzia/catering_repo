/*!************************************************************************
*
* ADOBE CONFIDENTIAL
* ___________________
*
*  Copyright 2011 Adobe Systems Incorporated
*  All Rights Reserved.
*
* NOTICE:  All information contained herein is, and remains
* the property of Adobe Systems Incorporated and its suppliers,
* if any.  The intellectual and technical concepts contained
* herein are proprietary to Adobe Systems Incorporated and its
* suppliers and are protected by trade secret or copyright law.
* Dissemination of this information or reproduction of this material
* is strictly forbidden unless prior written permission is obtained
* from Adobe Systems Incorporated.
**************************************************************************/
s7sdk.pkg("s7sdk.set");s7sdk.Util.require("s7sdk.common.IS");s7sdk.Util.require("s7sdk.common.ScrollableDiv");s7sdk.Util.require("s7sdk.common.Thumb");s7sdk.Util.require("s7sdk.utils.SwatchesParser");s7sdk.Util.require("s7sdk.common.ItemDesc");s7sdk.Util.require("s7sdk.common.Geometry");s7sdk.Util.require("s7sdk.common.Button");s7sdk.Util.require("s7sdk.event.Event");if(!s7sdk.set.SwatchesControl){s7sdk.set.SwatchesControl=function(a){arguments.callee.superclass.apply(this,[a,s7sdk.set.SwatchesControl.NS,a.constructor,s7sdk.set.Swatches.RESTRICTED_STYLES])};s7sdk.set.SwatchesControl.NS="s7sdk.set.SwatchesControl";s7sdk.set.SwatchesControl.prototype.reload=function(){if(this.component){var a=(this.dynamicModifiers?this.dynamicModifiers:s7sdk.Util.resolveModifier("","",this.component,this.component.settings));this.rebuild(a)}}}s7sdk.Class.inherits(s7sdk.set.SwatchesControl.NS,"s7sdk.ControlComponent");if(!s7sdk.set.Swatches){s7sdk.set.Swatches=function Swatches(c,e,l){s7sdk.Logger.log(s7sdk.Logger.CONFIG,"s7sdk.set.Swatches constructor - container: %0, settings: %1 , compId: %2",c,e,l);var j=!!arguments[3];l=(typeof l=="string"&&l.length)?l:"Swatches_"+s7sdk.Util.createUniqueId();arguments.callee.superclass.apply(this,[l,c,"div","s7swatches",e]);this.splitFrames={orientation:false};this.container=this.getParent();this.imageModifier=s7sdk.MediaSetParser.parseAssetForSetReq(this.asset).mod;if(this.size.width==0||this.size.height==0){this.size.width=parseInt(s7sdk.Util.css.getCss("s7swatches","width",this.id,null,this.container));this.size.height=parseInt(s7sdk.Util.css.getCss("s7swatches","height",this.id,null,this.container));if(!s7sdk.Util.isNumber(this.size.width)||!s7sdk.Util.isNumber(this.size.height)||this.size.width<=0||this.size.height<=0){this.size.width=500;this.size.height=250}}if(this.tmbSize.width==0||this.tmbSize.height==0){this.tmbSize.width=parseInt(s7sdk.Util.css.getCss("s7thumb","width",this.id,"s7swatches",this.container));this.tmbSize.height=parseInt(s7sdk.Util.css.getCss("s7thumb","height",this.id,"s7swatches",this.container));if(!s7sdk.Util.isNumber(this.tmbSize.width)||!s7sdk.Util.isNumber(this.tmbSize.height)||this.tmbSize.width<=0||this.tmbSize.height<=0){this.tmbSize.width=75;this.tmbSize.height=75}}if(typeof this.getParam("cellspacing")!="undefined"){}else{var d=0;var a=0;var g=0;var b=0;var k=["margin-left","margin-right"];var h=["margin-top","margin-bottom"];for(var f=0;f<k.length;f++){g=parseInt(s7sdk.Util.css.getCss("s7thumbcell",k[f],this.id,"s7swatches",this.container));if(s7sdk.Util.isNumber(g)){d+=g}}for(var f=0;f<h.length;f++){b=parseInt(s7sdk.Util.css.getCss("s7thumbcell",h[f],this.id,"s7swatches",this.container));if(s7sdk.Util.isNumber(b)){a+=b}}d=isNaN(d)?0:d;a=isNaN(a)?0:a;this.cellSpacing.horizontalSpacing=d;this.cellSpacing.verticalSpacing=a}this.BTN_LEFT_SIDE="leftSide";this.BTN_RIGHT_SIDE="rightSide";this.BTN_TOP_SIDE="topSide";this.BTN_BOTTOM_SIDE="bottomSide";this.SCROLL_BUTTON_TAP="tap";this.SCROLL_BUTTON_HOLD="hold";this.mediaSet_=null;this.totalWidth_=this.size.width;this.totalHeight_=this.size.height;this.currentPage_=1;this.rollover=false;this.buttonBehavior_=this.pageMode?this.SCROLL_BUTTON_TAP:"tap";this.scrollVelocity_=600;this.delay_=1;this.showSwatches_=true;this.leftButton_=null;this.rightButton_=null;this.upButton_=null;this.downButton_=null;this.maxTmbWid_=this.tmbSize.width;this.maxTmbHei_=this.tmbSize.height;this.buttonSize_=Math.max.apply(null,[["s7scrollleftbutton","width"],["s7scrollrightbutton","width"],["s7scrollupbutton","height"],["s7scrolldownbutton","height"]].map(function(i){return parseInt(s7sdk.Util.css.getCss(i[0],i[1],this.id,"s7swatches",this.container))},this))||0;this.fitCols_=NaN;this.fitRows_=NaN;this.assetName_=null;this.isReq_=null;this.swatches_=[];this.filteredSet_=[];this.swatchGroup_=null;this.scrollParentDiv_=null;this.swatchGroupRect_=null;this.currentSwatch_=null;this.itemIndex_=-1;this.locale=this.getParam("locale","");this.dir=this.direction=="auto"?this.locale=="ja":this.direction!="left";this.interval=this.getParam("interval",20);this.createElement();this.attachToContainer();this.setAsset(this.asset);this.viewReady=false;this.preloadInProgress=false;this.delay=50;this.queue=new Array();this.timer=setInterval(s7sdk.Util.wrapContext(this.onProcess,this),this.delay);if(!j){return new s7sdk.set.SwatchesControl(this)}else{return this}};s7sdk.Class.inherits("s7sdk.set.Swatches","s7sdk.UIComponent");s7sdk.set.Swatches.prototype.modifiers={serverUrl:{params:["isRootPath"],defaults:["/is/image/"]},asset:{params:["imageSet"],defaults:[""],parseParams:false},iscommand:{params:["value"],defaults:[""],parseParams:false},maxloadradius:{params:["value"],defaults:[1],ranges:["-1:"]},tmbSize:{params:["width","height"],defaults:[0,0],ranges:["0:","0:"],deprecated:true},tmbLayout:{params:["cols","rows"],defaults:[0,2],ranges:["0:","0:"]},cellSpacing:{params:["horizontalSpacing","verticalSpacing"],defaults:[10,10],ranges:["0:","0:"],deprecated:true},textPos:{params:["textpos"],defaults:["bottom"],ranges:[["bottom","top","left","right","tooltip","none"]]},resizable:{params:["enabled"],defaults:[false]},pageMode:{params:["enabled"],defaults:[false]},enableScrollButtons:{params:["enabled"],defaults:[true]},scrollStep:{params:["hStep","vStep"],defaults:[3,3],ranges:["1:","1:"]},enableDragging:{params:["enabled","overdragvalue"],defaults:[true,0.5],ranges:[,"0:1"]},buttonSnapMode:{params:["mode"],defaults:["snapout"],ranges:[["snapin","snapout","overlay"]]},partialSwatches:{params:["enabled"],defaults:[false]},orientation:{params:["rowMajor"],defaults:[false]},direction:{params:["direction"],defaults:["auto"],ranges:[["auto","left","right"]]},align:{params:["horizontal","vertical"],defaults:["center","center"],ranges:[["left","center","right"],["top","center","bottom"]]},fmt:{params:["fmt"],defaults:["jpg"],ranges:[["jpg","jpeg","png","png-alpha","gif","gif-alpha"]]},size:{params:["width","height"],defaults:[0,0],ranges:["0:","0:"],deprecated:true}};s7sdk.set.Swatches.RESTRICTED_STYLES={"font-family":"font-family","font-size":"font-size","font-style":"font-style"};s7sdk.set.Swatches.prototype.setCSS=function(c,b,a){if(s7sdk.set.Swatches.RESTRICTED_STYLES[b]){throw new Error("You cannot set "+c+" : "+b+" CSS property for this component ")}else{this.superproto.setCSS.apply(this,[c,b,a])}};s7sdk.set.Swatches.prototype.setModifier=function(a){throw new Error("Trying to use setModifier on the Core class (Swatches) is unsupported! Please refer to SDK documentation on using setModifier.")};s7sdk.set.Swatches.prototype.setAsset=function(c){if(typeof c!="string"){throw new Error("Asset name must be represented by a string!")}s7sdk.Logger.log(s7sdk.Logger.FINE,"s7sdk.set.Swatches.setAsset - assetName: %0",c);if(c==""){return}this.currentAsset=c;var a=unescape(c);if(this.assetName_!=null&&a!=this.assetName_){var b=new s7sdk.event.UserEvent(s7sdk.event.UserEvent.SWAP,[0,c],true);s7sdk.Event.dispatch(this.obj,b,false)}this.itemIndex_=-1;this.filteredSet_=[];this.assetName_=a;this.loadAsset()};s7sdk.set.Swatches.prototype.getAsset=function(){return(this.assetName_?this.assetName_:this.mediaSet_.name)};s7sdk.set.Swatches.prototype.getContainer=function(){return this.getParent()};s7sdk.set.Swatches.prototype.build=function(){this.filteredSet_=this.splitFrames.orientation?this.filteredSet_P:this.filteredSet_L;if(this.scrollParentDiv_!=null){if(this.swatchGroup_){this.swatchGroup_.dispose()}this.obj.removeChild(this.scrollParentDiv_);this.scrollParentDiv_=null;this.swatchGroup_=null}a(this.leftButton_);a(this.rightButton_);a(this.upButton_);a(this.downButton_);function a(b){if(b&&b.obj&&b.obj.parentNode){b.obj.parentNode.removeChild(b.obj)}}this.attachToContainer();if(this.filteredSet_&&this.filteredSet_.length){this.initSwatches();this.layoutSwatches();this.obj.insertBefore(this.scrollParentDiv_,this.obj.firstChild);this.selectSwatch(this.itemIndex_,true);if(this.swatches_[this.itemIndex_]!=null&&this.swatchGroup_){this.applySwatchSelection(this.swatches_[this.itemIndex_],true,null,true)}}};s7sdk.set.Swatches.prototype.getObjRect=function(b){var a=b.getBoundingClientRect();a=new s7sdk.Rectangle(a.left,a.top,b.offsetWidth,b.offsetHeight);return a};s7sdk.set.Swatches.prototype.getNextToLoad=function(){if(!this.toLoad||this.toLoad.length==0){return}if(!this.swatchGroup_){return}var h=new Array();for(var e=0;e<this.toLoad.length;e++){var k=this.toLoad[e];if(!(this.swatches_[k].isLoading||this.swatches_[k].isComlete)){h.push(k)}}this.toLoad=h;var j=this.getObjRect(this.swatchGroup_.div);var f=this.getObjRect(this.scrollParentDiv_);f.x=f.x-j.x;f.y=f.y-j.y;this.checkForload=function(){for(var o=0;o<this.toLoad.length;o++){var n=this.toLoad[o];if(this.swatchesPositions[n]&&this.swatchesPositions[n].rect){var m=f.intersection(this.swatchesPositions[n].rect);if(m.width==0||m.height==0||this.swatches_[n].isLoading||this.swatches_[n].isComlete){continue}return this.swatches_[n]}}return null};this.allVisisbleLoaded=function(){for(var o=0;o<this.toLoad.length;o++){var n=this.toLoad[o];if(this.swatchesPositions[n]&&this.swatchesPositions[n].rect){var m=f.intersection(this.swatchesPositions[n].rect);if(m.width==0||m.height==0){continue}if(!this.swatches_[n].isComlete){return false}}}return true};var l=this.checkForload();if(l){return l}if(!this.viewReady&&this.allVisisbleLoaded()){this.viewReady=true;var c=new s7sdk.event.StatusEvent(s7sdk.event.StatusEvent.NOTF_VIEW_READY,"",true);s7sdk.Event.dispatch(this.obj,c,false)}var g=this.maxloadradius==0?0:(Math.ceil(this.maxloadradius)-0.5);if(g==0){return null}var a=(this.maxTmbWid_+this.cellSpacing.horizontalSpacing)*g;var d=(this.maxTmbHei_+this.cellSpacing.verticalSpacing)*g;f.x-=a;f.width+=2*a;f.y-=d;f.height+=2*d;var b=this.checkForload();return b};s7sdk.set.Swatches.prototype.onProcess=function(){var c=new Array();for(var b=0;b<3;b++){var d=this.queue[b];if(d!=null&&!d.isComlete){c.push(d)}else{var d=this.getNextToLoad();if(d){d.loadImage();c.push(d)}}}this.queue=c;if(this.maxloadradius!=0){this.preloadComplete=function(){for(var e=0;e<this.swatches_.length;e++){if(this.swatches_[e].isLoading){return false}}return true};if(!this.preloadComplete()){if(!this.preloadInProgress){var a=new s7sdk.event.StatusEvent(s7sdk.event.StatusEvent.NOTF_PRELOAD_START,"",true);s7sdk.Event.dispatch(this.obj,a,false)}this.preloadInProgress=true}else{if(this.preloadInProgress){this.preloadInProgress=false;var a=new s7sdk.event.StatusEvent(s7sdk.event.StatusEvent.NOTF_PRELOAD_COMPLETE,"",true);s7sdk.Event.dispatch(this.obj,a,false)}}}};s7sdk.set.Swatches.prototype.cleanUp=function(){if(this.isReq_){this.isReq_.cancelHttpReq();this.isReq_=null}this.swatches_=[];this.currentSwatch_=null;if(this.scrollParentDiv_!=null){if(this.swatchGroup_){this.swatchGroup_.dispose()}this.obj.removeChild(this.scrollParentDiv_);this.scrollParentDiv_=null;this.swatchGroup_=null}a(this.leftButton_);a(this.rightButton_);a(this.upButton_);a(this.downButton_);function a(b){if(b&&b.getObj()&&b.getObj().parentNode){b.getObj().parentNode.removeChild(b.getObj())}}};s7sdk.set.Swatches.prototype.dispose=function(){this.cleanUp();if(this.obj!=null&&this.obj.parentNode!=null){this.obj.parentNode.removeChild(this.obj)}};s7sdk.set.Swatches.prototype.setMediaSet=function(d,c){s7sdk.Logger.log(s7sdk.Logger.FINE,"s7sdk.set.Swatches.setMediaSet - mediaSet: %0, type: %1",d,c);c=(typeof c=="number")?c:0;this.cleanUp();this.itemIndex_=-1;this.assetName_=null;var a=d;if(!(d instanceof s7sdk.OrientationSetDesc)){a=new s7sdk.OrientationSetDesc(a,null)}this.mediaSet_=a;this.currentAsset=a;this.filteredSet_L=s7sdk.SwatchesParser.filterSet(a.landscape,c,this.showSwatches_);this.filteredSet_P=s7sdk.SwatchesParser.filterSet(a.portrait,c,this.showSwatches_);this.build();var b=new s7sdk.event.StatusEvent(s7sdk.event.StatusEvent.NOTF_ASSET_METADATA_READY,true);s7sdk.Event.dispatch(this.obj,b,false)};s7sdk.set.Swatches.prototype.getIndexFromItem=function(d){if(this.mediaSet_==null){throw new Error("Cannot get index of item because media-set is does not exist!")}var c=-1;var b=this.filteredSet_;for(var a=0;a<b.length;a++){if(b[a].name==d.name){c=a;break}}return c};s7sdk.set.Swatches.prototype.applyItem=function(b){var a=this.getIndexFromItem(b);if(a<0){throw new Error("Cannot apply item because it does not exist in set!")}this.selectSwatch(a)};s7sdk.set.Swatches.prototype.loadAsset=function(){s7sdk.Logger.log(s7sdk.Logger.INFO,"s7sdk.set.Swatches.loadAsset");var a=this.serverUrl+"/"+s7sdk.MediaSetParser.parseAssetForSetReq(this.assetName_).req;if(s7sdk.Util.isNonEmptyString(this.locale)){a+="&locale="+this.locale}if(this.isReq){this.isReq.cancelHttpReq()}this.isReq_=new s7sdk.IS(this.serverUrl,this.assetName_);this.isReq_.getHttpReq(a,function(c,b){s7sdk.set.Swatches.prototype.setRequestComplete.apply(b,[c])},function(c,b){s7sdk.set.Swatches.prototype.setRequestError.apply(b,[c])},this)};s7sdk.set.Swatches.prototype.setRequestComplete=function(b){var a=b.set;if(a==null){return}var c=s7sdk.MediaSetParser.parse(a,this.imageModifier);this.updateLandscapeLabels(c," - ");this.setMediaSet(c)};s7sdk.set.Swatches.prototype.updateLandscapeLabels=function(b,e){var d=b.items;var c=b.type!==s7sdk.ItemDescType.ECAT_SET;e=e?e:" : ";for(var f=0;f<d.length;f++){var g=d[f];var a=g.label;var h=undefined;if(g.images){if(g.images[0].label){a=g.images[0].label}if(g.images[1]&&g.images[1].label){h=g.images[1].label}}g.label=a;if(g.np||c){if(!g.label){g.label=h?h:""}}else{if(g.label){g.label+=h?e+h:""}else{g.label=h?h:""}}if(!g.label){g.label=""}}};s7sdk.set.Swatches.prototype.setRequestError=function(a){s7sdk.Logger.log(s7sdk.Logger.WARNING,"s7sdk.set.Swatches.setRequestError - response: %0",a)};s7sdk.set.Swatches.prototype.initSwatches=function(){var d;var c;var a;this.swatches_=[];this.toLoad=new Array();for(var b=0;b<this.filteredSet_.length;b++){d=this.filteredSet_[b];c=d.swatch;a=new s7sdk.Thumb(this.obj,this.serverUrl,this.iscommand,c,this.tmbSize.width,this.tmbSize.height,this.fmt,-1,0,undefined,this.textPos,this.cl,this.locale,undefined,undefined,this.maxloadradius>=0,d.type);this.maxTmbWid_=(a.getWidth()<this.maxTmbWid_)?this.maxTmbWid_:a.getWidth();this.maxTmbHei_=(a.getHeight()<this.maxTmbHei_)?this.maxTmbHei_:a.getHeight();this.swatches_[c.frame]=a;this.toLoad[b]=b;a.div.style.margin=0+"px"}};s7sdk.set.Swatches.prototype.resize=function(b,a){s7sdk.Logger.log(s7sdk.Logger.FINE,"s7sdk.set.Swatches.resize - width: %0, height: %1",b,a);this.totalWidth_=b;this.totalHeight_=a;this.size.width=b;this.size.height=a;this.obj.setWidth(this.totalWidth_);this.obj.setHeight(this.totalHeight_);this.build();s7sdk.UIComponent.prototype.resize.apply(this,[b,a])};s7sdk.set.Swatches.prototype.layoutSwatches=function(){var a=(!this.resizable&&this.enableScrollButtons&&this.buttonSnapMode!="overlay"&&this.buttonSize_)?this.buttonSize_:0;if(this.size.width!=0){var g=Math.floor((this.size.width-this.cellSpacing.horizontalSpacing)/(this.maxTmbWid_+this.cellSpacing.horizontalSpacing));if(this.tmbLayout.cols!=0&&this.tmbLayout.cols<=g){g=this.tmbLayout.cols}}else{g=this.tmbLayout.cols}if(this.size.height!=0){var f=Math.floor((this.size.height-this.cellSpacing.verticalSpacing)/(this.maxTmbHei_+this.cellSpacing.verticalSpacing));if(this.tmbLayout.rows!=0&&this.tmbLayout.rows<=f){f=this.tmbLayout.rows}}else{f=this.tmbLayout.rows}this.fitCols_=g;this.fitRows_=(f==0)?1:f;while(g*f<this.swatches_.length&&(this.tmbLayout.cols==0||this.tmbLayout.rows==0||g<this.tmbLayout.cols||f<this.tmbLayout.rows)){if(this.orientation==0){if(this.tmbLayout.cols==0||g<this.tmbLayout.cols){g++}if(f==0||(f*g<this.swatches_.length&&(this.tmbLayout.rows==0||f<this.tmbLayout.rows))){f++}}else{if(this.tmbLayout.rows==0||f<this.tmbLayout.rows){f++}if(g==0||(f*g<this.swatches_.length&&(this.tmbLayout.cols==0||g<this.tmbLayout.cols))){g++}}}if(g>this.fitCols_){this.fitCols_=Math.floor((this.size.width-this.cellSpacing.horizontalSpacing-2*a)/(this.maxTmbWid_+this.cellSpacing.horizontalSpacing))}if(f>this.fitRows_){this.fitRows_=Math.floor((this.size.height-this.cellSpacing.verticalSpacing-2*a)/(this.maxTmbHei_+this.cellSpacing.verticalSpacing))}if(!this.resizable&&(this.fitCols_<=0||this.fitRows_<=0)){s7sdk.Logger.log(s7sdk.Logger.WARNING,"s7sdk.set.Swatches.layoutSwatches - Cannot fit any swatches into the given area: width %0 height %1",this.size.width,this.size.height);this.createScrollParentDiv(0,0)}var C=NaN;var z=NaN;var s=0;var l=0;var y=0;var x=0;var v=NaN;var o;this.swatchGroup_=new s7sdk.ScrollableDiv(this,this.enableDragging.enabled,new s7sdk.Point2D(this.fitCols_*(this.cellSpacing.horizontalSpacing+this.maxTmbWid_),this.fitRows_*(this.cellSpacing.verticalSpacing+this.maxTmbHei_)),this.interval,this.pageHandler,this.enableDragging.overdragvalue,this.pageMode);var c=[];for(var v=0;v<this.swatches_.length&&v<g*f;v++){if(this.orientation==0){C=Math.floor(v/g);z=v%g;c[v]={col:z,row:C}}else{z=Math.floor(v/f);C=v%f;c[v]={col:z,row:C}}s=(s<C)?C:s;l=(l<z)?z:l}s++;l++;if(this.pageMode){var w=Math.ceil(l/this.fitCols_);var B=Math.ceil(s/this.fitRows_);c=[];if(this.orientation==0){for(var u=0;u<w;u++){for(var v=0;v<B;v++){var A=(u+v*w)*(this.fitRows_*this.fitCols_);for(var t=0;t<this.fitCols_;t++){for(var q=0;q<this.fitRows_;q++){var h=t+q*this.fitCols_+A;c[h]={col:t+u*this.fitCols_,row:(this.dir?this.fitRows_-1-q:q)+(this.dir?B-1-v:v)*this.fitRows_}}}}}}else{for(var u=0;u<B;u++){for(var v=0;v<w;v++){var A=(u+v*B)*(this.fitRows_*this.fitCols_);for(var t=0;t<this.fitRows_;t++){for(var q=0;q<this.fitCols_;q++){var h=t+q*this.fitRows_+A;c[h]={col:q+v*this.fitCols_,row:(this.dir?this.fitRows_-1-t:t)+(this.dir?B-1-u:u)*this.fitRows_}}}}}}if(this.dir){var d=new Array();for(var u=0;u<c.length;u++){d[c.length-1-u]=c[u]}c=d}}else{if(this.dir){for(var v=0;v<this.swatches_.length&&v<g*f;v++){c[v].col=l-1-c[v].col}}}for(var v=0;v<this.swatches_.length&&v<g*f;v++){o=this.swatches_[v];o.x=this.cellSpacing.horizontalSpacing/2+c[v].col*(this.maxTmbWid_+this.cellSpacing.horizontalSpacing);if(this.textPos==s7sdk.Thumb.TEXT_LEFT){o.x+=this.maxTmbWid_-o.getWidth()}o.y=this.cellSpacing.verticalSpacing/2+c[v].row*(this.maxTmbHei_+this.cellSpacing.verticalSpacing);if(this.textPos==s7sdk.Thumb.TEXT_TOP){o.y+=this.maxTmbHei_-o.getHeight()}this.swatchGroup_.div.appendChild(o.div);o.div.style.position="absolute";o.updatePosition();function r(i,j){s7sdk.Event.addDOMListener(j.div,"mouseup",function(k){i.onSwatchClicked(k,j)},true);s7sdk.Event.addDOMListener(j.div,"touchend",function(k){i.onSwatchClicked(k,j)},true)}r(this,o);if(y<o.x){y=o.x}if(x<o.y){x=o.y}c[v].rect=new s7sdk.Rectangle(o.x,o.y,this.maxTmbWid_,this.maxTmbHei_)}this.swatchesPositions=c;if(this.pageMode){this.swatchGroup_.xNotch=this.fitCols_*(this.cellSpacing.horizontalSpacing+this.maxTmbWid_);this.swatchGroup_.yNotch=this.fitRows_*(this.cellSpacing.verticalSpacing+this.maxTmbHei_);this.scrollStep.hStep=this.fitCols_;this.scrollStep.vStep=this.fitRows_}else{if(!this.partialSwatches){this.swatchGroup_.xNotch=(this.cellSpacing.horizontalSpacing+this.maxTmbWid_);this.swatchGroup_.yNotch=(this.cellSpacing.verticalSpacing+this.maxTmbHei_)}else{this.swatchGroup_.xNotch=1;this.swatchGroup_.yNotch=1}}var b=this.cellSpacing.horizontalSpacing+l*(this.cellSpacing.horizontalSpacing+this.maxTmbWid_);var e=this.cellSpacing.verticalSpacing+s*(this.cellSpacing.verticalSpacing+this.maxTmbHei_);if(this.pageMode){var p=this.fitCols_*(this.maxTmbWid_+this.cellSpacing.horizontalSpacing);var n=this.fitRows_*(this.maxTmbHei_+this.cellSpacing.verticalSpacing);this.swatchGroup_.setLogicalWidth(Math.ceil(y/p)*p);this.swatchGroup_.setLogicalHeight(Math.ceil(x/n)*n)}else{this.swatchGroup_.setLogicalWidth(y+this.cellSpacing.horizontalSpacing/2+this.maxTmbWid_);this.swatchGroup_.setLogicalHeight(x+this.cellSpacing.verticalSpacing/2+this.maxTmbHei_)}if(this.resizable){this.obj.setWidth(b);this.obj.setHeight(e);this.createScrollParentDiv(b,e);this.scrollParentDiv_.appendChild(this.swatchGroup_.div);this.scrollParentDiv_.setX(0);this.scrollParentDiv_.setY(0)}else{this.swatchGroupRect_=new s7sdk.Rectangle(0,0,Math.max(Math.min(this.swatchGroup_.scrollBounds.x,b),0),Math.max(Math.min(this.swatchGroup_.scrollBounds.y,e),0));this.createScrollParentDiv(this.swatchGroupRect_.width,this.swatchGroupRect_.height);this.scrollParentDiv_.appendChild(this.swatchGroup_.div);switch(this.align.horizontal){case"center":this.scrollParentDiv_.setX((this.totalWidth_-this.swatchGroupRect_.width)/2);break;case"right":if(this.swatchGroup_.getLogicalWidth()>this.swatchGroup_.scrollBounds.x&&this.fitCols_){this.scrollParentDiv_.setX((this.totalWidth_-this.swatchGroupRect_.width)-a)}else{this.scrollParentDiv_.setX((this.totalWidth_-this.swatchGroupRect_.width)-0)}break;case"left":if(this.swatchGroup_.getLogicalWidth()>this.swatchGroup_.scrollBounds.x&&this.fitCols_){this.scrollParentDiv_.setX(a)}else{this.scrollParentDiv_.setX(0)}break;default:this.scrollParentDiv_.setX((this.totalWidth_-this.swatchGroupRect_.width)/2)}switch(this.align.vertical){case"center":this.scrollParentDiv_.setY((this.totalHeight_-this.swatchGroupRect_.height)/2);break;case"top":if((this.swatchGroup_.getLogicalHeight()>this.swatchGroup_.scrollBounds.y&&this.fitRows_)&&this.enableScrollButtons){this.scrollParentDiv_.setY(a)}else{this.scrollParentDiv_.setY(0)}break;case"bottom":if((this.swatchGroup_.getLogicalHeight()>this.swatchGroup_.scrollBounds.y&&this.fitRows_)&&this.enableScrollButtons){this.scrollParentDiv_.setY((this.totalHeight_-this.swatchGroupRect_.height)-a)}else{this.scrollParentDiv_.setY((this.totalHeight_-this.swatchGroupRect_.height)-0)}break;default:this.scrollParentDiv_.setY((this.totalHeight_-this.swatchGroupRect_.height)/2)}this.layoutButtons()}this.swatchGroup_.layout();if(this.dir&&!this.resizable){this.swatchGroup_.slideToImmediately(new s7sdk.Point2D(this.swatchGroupRect_.width-this.swatchGroup_.getLogicalWidth(),0));this.swatchGroup_.velocityXAdjusted_=true}};s7sdk.set.Swatches.prototype.pageHandler=function(){this.dispatchEvent(new s7sdk.event.SwatchEvent(s7sdk.event.SwatchEvent.SWATCH_PAGE_CHANGE,this.getCurrentPage(),false))};s7sdk.set.Swatches.prototype.getCurrentPage=function(){s7sdk.Logger.log(s7sdk.Logger.FINE,"s7sdk.set.Swatches.getCurrentPage");if(this.swatchGroup_){this.currentPage_=this.swatchGroup_.getCurrentPage()}return this.currentPage_};s7sdk.set.Swatches.prototype.setCurrentPage=function(a){s7sdk.Logger.log(s7sdk.Logger.FINE,"s7sdk.set.Swatches.setCurrentPage - page: %0",a);this.currentPage_=a;if(this.swatchGroup_){this.swatchGroup_.setCurrentPage(a)}};s7sdk.set.Swatches.prototype.getPageCount=function(){var a=new s7sdk.Point2D();if(this.swatchGroup_){a=this.swatchGroup_.getPageCount()}return a};s7sdk.set.Swatches.prototype.onSwatchClicked=function(b,a){if(this.swatchGroup_.getInterpretAsClick()||this.rollOver_){this.itemIndex_=a.item.frame;if(a!=this.currentSwatch_){this.dispatchEvent(new s7sdk.event.UserEvent(s7sdk.event.UserEvent.SWATCH,[a.item.frame,a.item.label?a.item.label:""],false))}this.applySwatchSelection(a,false,true)}};s7sdk.set.Swatches.prototype.applySwatchSelection=function(i,a,b){a=(typeof a!="undefined")?a:false;b=(typeof b!="undefined")?b:false;if(i==this.currentSwatch_){return}if(this.currentSwatch_!=null){this.currentSwatch_.setSelected(false)}this.currentSwatch_=i;this.currentSwatch_.setSelected(true);if(a){var f=0;var d=0;var h=this.swatchGroup_.scrollBounds.x/2;var g=this.swatchGroup_.scrollBounds.y/2;if(i.x>h&&i.x<(this.swatchGroup_.getLogicalWidth()-h)){f=-i.x+h}else{if(i.x>=(this.swatchGroup_.getLogicalWidth()-h)){f=-this.swatchGroup_.getLogicalWidth()+this.swatchGroup_.scrollBounds.x}}if(i.y>g&&i.y<(this.swatchGroup_.getLogicalHeight()-g)){d=-i.y+g}else{if(i.y>=(this.swatchGroup_.getLogicalHeight()-g)){d=-this.swatchGroup_.getLogicalHeight()+this.swatchGroup_.scrollBounds.y}}var j=this;function e(){if(j.swatchGroup_){j.swatchGroup_.slideTo(new s7sdk.Point2D(f,d))}}setTimeout(e,100)}if(!this.orientationChanged){var k=i.item.owner;var c=new s7sdk.event.AssetEvent(s7sdk.event.AssetEvent.SWATCH_SELECTED_EVENT,k,i.item.frame,false);c.orientation=this.splitFrames.orientation;this.dispatchEvent(c)}this.orientationChanged=false};s7sdk.set.Swatches.prototype.addEventListener=function(c,b,a){s7sdk.Logger.log(s7sdk.Logger.FINE,"s7sdk.set.Swatches.addEventListener - type: %0, handler: %1, useCapture: %2",c,b.toString().substring(0,b.toString().indexOf("(")),a);this.superproto.addEventListener.apply(this,[c,b,a])};s7sdk.set.Swatches.prototype.selectSwatch=function(a,b){s7sdk.Logger.log(s7sdk.Logger.FINE,"s7sdk.set.Swatches.selectSwatch - index: %0, triggerScroll: %1",a,b);if(a==-1){if(this.currentSwatch_!=null){this.currentSwatch_.setSelected(false);this.currentSwatch_=null}}else{b=(typeof b!="undefined")?b:false;this.itemIndex_=a;if(this.swatches_[a]!=null&&this.swatchGroup_){this.applySwatchSelection(this.swatches_[a],b,null)}}};s7sdk.set.Swatches.prototype.placeButton=function(b,c,a){var d=new s7sdk.Rectangle(0,0,this.buttonSize_,this.buttonSize_);switch(a){case this.BTN_LEFT_SIDE:b.x=c.x;b.y=c.y+(c.height-d.height)/2;break;case this.BTN_RIGHT_SIDE:b.x=c.getRight()-d.width;b.y=c.y+(c.height-d.height)/2;break;case this.BTN_TOP_SIDE:b.x=c.x+(c.width-d.width)/2;b.y=c.y;break;case this.BTN_BOTTOM_SIDE:b.x=c.x+(c.width-d.width)/2;b.y=c.getBottom()-d.height;break}b.x-=d.x;b.y-=d.y;b.getObj().style.position="absolute";b.getObj().style.left=b.x+"px";b.getObj().style.top=b.y+"px"};s7sdk.set.Swatches.prototype.layoutButtons=function(){var c;var b=this.scrollParentDiv_.getX();var d=this.scrollParentDiv_.getY();switch(this.buttonSnapMode){default:case"overlay":c=new s7sdk.Rectangle(b+5,d+5,this.swatchGroup_.scrollBounds.x-10,this.swatchGroup_.scrollBounds.y-10);break;case"snapin":c=new s7sdk.Rectangle(b-this.buttonSize_-2,d-this.buttonSize_-2,this.swatchGroup_.scrollBounds.x+2*this.buttonSize_+4,this.swatchGroup_.scrollBounds.y+2*this.buttonSize_+4);break;case"snapout":c=new s7sdk.Rectangle(2,2,this.size.width-4,this.size.height-4);break}if(this.swatchGroup_.getLogicalWidth()>this.swatchGroup_.scrollBounds.x&&this.fitCols_){this.swatchGroup_.scrollX=true;if(this.enableScrollButtons){this.leftButton_=new s7sdk.ScrollLeftButton(this.obj.id,this.settings,"leftButton_"+s7sdk.Util.createUniqueId(),true);this.rightButton_=new s7sdk.ScrollRightButton(this.obj.id,this.settings,"rightButton_"+s7sdk.Util.createUniqueId(),true);this.placeButton(this.leftButton_,c,this.BTN_LEFT_SIDE);this.placeButton(this.rightButton_,c,this.BTN_RIGHT_SIDE);var a=this;s7sdk.Event.addDOMListener(this.leftButton_,"mouseup",function(f){f=f||window.event;a.buttonClick(f,a.leftButton_)});s7sdk.Event.addDOMListener(this.leftButton_,"touchend",function(f){f=f||window.event;a.buttonClick(f,a.leftButton_)});s7sdk.Event.addDOMListener(this.rightButton_,"mouseup",function(f){f=f||window.event;a.buttonClick(f,a.rightButton_)});s7sdk.Event.addDOMListener(this.rightButton_,"touchend",function(f){f=f||window.event;a.buttonClick(f,a.rightButton_)})}}if(this.swatchGroup_.getLogicalHeight()>this.swatchGroup_.scrollBounds.y&&this.fitRows_){this.swatchGroup_.scrollY=true;if(this.enableScrollButtons){this.upButton_=new s7sdk.ScrollUpButton(this.obj.id,this.settings,"upButton_"+s7sdk.Util.createUniqueId(),true);this.downButton_=new s7sdk.ScrollDownButton(this.obj.id,this.settings,"downButton_"+s7sdk.Util.createUniqueId(),true);this.placeButton(this.upButton_,c,this.BTN_TOP_SIDE);this.placeButton(this.downButton_,c,this.BTN_BOTTOM_SIDE);var a=this;s7sdk.Event.addDOMListener(this.upButton_,"mouseup",function(f){f=f||window.event;a.buttonClick(f,a.upButton_)});s7sdk.Event.addDOMListener(this.upButton_,"touchend",function(f){f=f||window.event;a.buttonClick(f,a.upButton_)});s7sdk.Event.addDOMListener(this.downButton_,"mouseup",function(f){f=f||window.event;a.buttonClick(f,a.downButton_)});s7sdk.Event.addDOMListener(this.downButton_,"touchend",function(f){f=f||window.event;a.buttonClick(f,a.downButton_)})}}};s7sdk.set.Swatches.prototype.buttonClick=function(c,b){if(this.buttonBehavior_==this.SCROLL_BUTTON_HOLD){return}if(!b.getActivated()){return}var a=Math.min(this.scrollStep.hStep,this.scrollParentDiv_.getWidth()/(this.cellSpacing.horizontalSpacing+this.maxTmbWid_));var e=Math.min(this.scrollStep.vStep,this.scrollParentDiv_.getHeight()/(this.cellSpacing.verticalSpacing+this.maxTmbHei_));var g=Math.floor(a*(this.cellSpacing.horizontalSpacing+this.maxTmbWid_));var d=Math.floor(e*(this.cellSpacing.verticalSpacing+this.maxTmbHei_));var h=NaN;var f=NaN;if(b===this.leftButton_){h=this.swatchGroup_.getScrollDest().x+g}if(b===this.rightButton_){h=this.swatchGroup_.getScrollDest().x-g}if(b===this.upButton_){f=this.swatchGroup_.getScrollDest().y+d}if(b===this.downButton_){f=this.swatchGroup_.getScrollDest().y-d}if(!isNaN(h)){if(h>=0){h=0}if(h<=this.swatchGroupRect_.width-this.swatchGroup_.getLogicalWidth()){h=this.swatchGroupRect_.width-this.swatchGroup_.getLogicalWidth()}this.swatchGroup_.slideTo(new s7sdk.Point2D(h,this.swatchGroup_.getY()))}if(!isNaN(f)){if(f>=0){f=0}if(f<=this.swatchGroupRect_.height-this.swatchGroup_.getLogicalHeight()){f=this.swatchGroupRect_.height-this.swatchGroup_.getLogicalHeight()}this.swatchGroup_.slideTo(new s7sdk.Point2D(this.swatchGroup_.getX(),f))}};s7sdk.set.Swatches.prototype.toggleLeftButton=function(a){if(this.leftButton_){a?this.leftButton_.activate():this.leftButton_.deactivate()}};s7sdk.set.Swatches.prototype.toggleRightButton=function(a){if(this.rightButton_){a?this.rightButton_.activate():this.rightButton_.deactivate()}};s7sdk.set.Swatches.prototype.toggleUpButton=function(a){if(this.upButton_){a?this.upButton_.activate():this.upButton_.deactivate()}};s7sdk.set.Swatches.prototype.toggleDownButton=function(a){if(this.downButton_){a?this.downButton_.activate():this.downButton_.deactivate()}};s7sdk.set.Swatches.prototype.getWidth=function(){return this.totalWidth_};s7sdk.set.Swatches.prototype.getHeight=function(){return this.totalHeight_};s7sdk.set.Swatches.prototype.getDiv=function(){return this.obj};s7sdk.set.Swatches.prototype.getFrame=function(){s7sdk.Logger.log(s7sdk.Logger.FINE,"s7sdk.set.Swatches.getFrame");return this.itemIndex_};s7sdk.set.Swatches.prototype.createElement=function(){s7sdk.UIComponent.prototype.createElement.apply(this,[]);this.obj=this.prepareDiv(this.obj);this.obj.setWidth(this.totalWidth_);this.obj.setHeight(this.totalHeight_);this.obj.className="s7swatches";this.obj.style.position="absolute";s7sdk.Event.addDOMListener(this.obj,"click",function(a){a=a||window.event;s7sdk.Event.preventDefault(a)},true)};s7sdk.set.Swatches.prototype.createScrollParentDiv=function(b,a){if(this.scrollParentDiv_==null){this.scrollParentDiv_=this.prepareDiv();this.scrollParentDiv_.setWidth(b);this.scrollParentDiv_.setHeight(a);this.scrollParentDiv_.style.position="absolute";this.scrollParentDiv_.style.overflow="hidden"}};s7sdk.set.Swatches.prototype.prepareDiv=function(a){var b=(a&&typeof a!="undefined")?a:document.createElement("div");b.getX=function(){return b.x_};b.getY=function(){return b.y_};b.setX=function(c){b.x_=c;b.style.left=c+"px"};b.setY=function(c){b.y_=c;b.style.top=c+"px"};b.getWidth=function(){return b.width_};b.getHeight=function(){return b.height_};b.setWidth=function(c){b.width_=c;b.style.width=c+"px"};b.setHeight=function(c){b.height_=c;b.style.height=c+"px"};return b};s7sdk.set.Swatches.prototype.hide=function(){s7sdk.Util.fade(this.obj,true,0.3,"block")};s7sdk.set.Swatches.prototype.show=function(){s7sdk.Util.fade(this.obj,false,0.3,"block")};s7sdk.set.Swatches.prototype.getCurrentAsset=function(){return typeof this.currentAsset=="undefined"?null:this.currentAsset};s7sdk.set.Swatches.prototype.setCurrentAsset=function(a){if(typeof(a)=="string"){this.setAsset(a)}else{this.setMediaSet(a)}};s7sdk.set.Swatches.prototype.setPortrait=function(){this.setSplitFrames(true)};s7sdk.set.Swatches.prototype.setLandscape=function(){this.setSplitFrames(false)};s7sdk.set.Swatches.prototype.setSplitFrames=function(b){if(this.splitFrames.orientation==b){return b}if(this.mediaSet_.portrait==null){this.splitFrames.orientation=false;return false}this.splitFrames.orientation=b;if(this.mediaSet_){this.orientationChanged=true;var a=this.getFrame();this.itemIndex_=b?this.mediaSet_.getPortraitIndex(a):this.mediaSet_.getLandscapeIndex(a);this.build()}return b};s7sdk.Swatches=s7sdk.set.Swatches;(function addDefaultCSS(){var e=s7sdk.Util.css.createCssRuleText;var b=s7sdk.Util.css.createCssImgUrlText;var c=s7sdk.browser&&s7sdk.browser.name=="ie"&&s7sdk.browser.version.major<=8;var d={display:"block",position:"absolute",top:"0px",left:"0px",width:"20px",height:"20px"};var a=e(".s7swatches",{"background-color":c?"rgb(224, 224, 224)":"rgba(100, 100, 100, 0.2)","z-index":"0","user-select":"none","-ms-user-select":"none","-moz-user-select":"-moz-none","-webkit-user-select":"none","-webkit-tap-highlight-color":"rgba(0,0,0,0)",width:"500px",height:"250px"})+e(".s7swatches .s7thumbcell",{margin:"5px"})+e(".s7swatches .s7thumb",{border:"1px solid transparent",width:"75px",height:"75px"})+e(".s7swatches .s7thumb[state='selected']",{border:"1px solid #FFFFFF"})+e(".s7swatches .s7thumb .s7thumboverlay",{width:"100%",height:"100%"})+e(".s7swatches .s7thumb .s7thumboverlay[type='swatchset']",{"background-image":b("asset_type_swatches.png")})+e(".s7swatches .s7thumb .s7thumboverlay[type='spinset']",{"background-image":b("asset_type_spin.png")})+e(".s7swatches .s7thumb .s7thumboverlay[type='video']",{"background-image":b("asset_type_video.png")})+e(".s7swatches .s7label",{"font-family":"Helvetica, sans-serif","font-size":"12px"})+e(".s7swatches .s7scrollleftbutton",d)+e(".s7swatches .s7scrollleftbutton[state='up']",{"background-image":b("scroll_left_up.png")})+e(".s7swatches .s7scrollleftbutton[state='over']",{"background-image":b("scroll_left_over.png")})+e(".s7swatches .s7scrollleftbutton[state='down']",{"background-image":b("scroll_left_down.png")})+e(".s7swatches .s7scrollleftbutton[state='disabled']",{"background-image":b("scroll_left_disabled.png")})+e(".s7swatches .s7scrollrightbutton",d)+e(".s7swatches .s7scrollrightbutton[state='up']",{"background-image":b("scroll_right_up.png")})+e(".s7swatches .s7scrollrightbutton[state='over']",{"background-image":b("scroll_right_over.png")})+e(".s7swatches .s7scrollrightbutton[state='down']",{"background-image":b("scroll_right_down.png")})+e(".s7swatches .s7scrollrightbutton[state='disabled']",{"background-image":b("scroll_right_disabled.png")})+e(".s7swatches .s7scrollupbutton",d)+e(".s7swatches .s7scrollupbutton[state='up']",{"background-image":b("scroll_up_up.png")})+e(".s7swatches .s7scrollupbutton[state='over']",{"background-image":b("scroll_up_over.png")})+e(".s7swatches .s7scrollupbutton[state='down']",{"background-image":b("scroll_up_down.png")})+e(".s7swatches .s7scrollupbutton[state='disabled']",{"background-image":b("scroll_up_disabled.png")})+e(".s7swatches .s7scrolldownbutton",d)+e(".s7swatches .s7scrolldownbutton[state='up']",{"background-image":b("scroll_down_up.png")})+e(".s7swatches .s7scrolldownbutton[state='over']",{"background-image":b("scroll_down_over.png")})+e(".s7swatches .s7scrolldownbutton[state='down']",{"background-image":b("scroll_down_down.png")})+e(".s7swatches .s7scrolldownbutton[state='disabled']",{"background-image":b("scroll_down_disabled.png")});if(s7sdk.browser.device.name=="android"&&s7sdk.browser.device.version==4){a+=e(".s7swatches",{"-webkit-perspective":"5000"})}s7sdk.Util.css.addDefaultCSS(a,"Swatches")})()};