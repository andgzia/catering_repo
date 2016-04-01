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
s7sdk.pkg("s7sdk.common");s7sdk.Util.require("s7sdk.common.Geometry");if(!s7sdk.ScrollableDiv){s7sdk.ScrollableDiv=function(c,g,b,e,f,d,h){this.POSITION_EVENT="positionEvent";this.MAX_MOUSE_DELTA=100;this.BOUNCE_DECEL=10000;this.BOUNCE_RETURN=2;this.DELTA_TO_VELOCITY=32;this.LEFT_EDGE=1;this.RIGHT_EDGE=2;this.TOP_EDGE=4;this.BOTTOM_EDGE=8;this.CLICK_THRESHOLD=2;this.constantScrollVelocity=600;this.scrollX=false;this.scrollY=false;this.xNotch=1;this.yNotch=1;this.scrollBounds=b;this.client_=c;this.pageHandler=null;if(f!=null){this.pageHandler=f}this.pageX_=0;this.pageY_=0;this.currentPosition=new s7sdk.Point2D(0,0);this.velocity=new s7sdk.Point2D(0,0);this.startPos_=null;this.cursorDelta_=null;this.cursorStartStage_=null;this.currentMousePoint_=null;this.lastMousePoint_=null;this.scrollDest_=new s7sdk.Point2D(0,0);this.ptrScrollDestX_=null;this.ptrScrollDestY_=null;this.edgeVector=null;this.kickStart_=null;this.velocityXAdjusted_=false;this.velocityYAdjusted_=false;this.checkEdges_=true;this.mouseIsDown_=false;this.mouseEnabled_=g;this.positionEvents_=false;this.useConstantVelocity_=false;this.interpretAsClick_=false;this.lastTime_=NaN;this.reciprocalFrameRate_=NaN;this.x_=0;this.y_=0;this.width=0;this.height=0;var a=this;this.__onInterval=function(){a.enterFrame()};this.__mouseDown=function(i){a.mouseDown(i)};this.__mouseMove=function(i){a.mouseMove(i)};this.__mouseUp=function(i){a.mouseUp(i)};this.div=document.createElement("div");if(g){s7sdk.Event.addDOMListener(this.div,"touchstart",this.__mouseDown,false);s7sdk.Event.addDOMListener(this.div,"mousedown",this.__mouseDown,false)}else{this.interpretAsClick_=true}this.overdragvalue=(typeof d!="undefined")?Number(d):1;this.pageMode=(typeof h!="undefined")?Number(h):0;this.refreshLimit_=e/1000;this.intervalId_=setInterval(this.__onInterval,e);this.scrollDir=null;this.preventNative=true};s7sdk.ScrollableDiv.PAGE_EVENT="pageEvent";s7sdk.ScrollableDiv.prototype.dispose=function(){clearInterval(this.intervalId_)};s7sdk.ScrollableDiv.prototype.slideTo=function(a){this.positionOvershootToEdge();this.setScrollDest(a);this.kickStart_=true};s7sdk.ScrollableDiv.prototype.slideToImmediately=function(a){this.positionOvershootToEdge();this.setScrollDest(a);this.setX(this.scrollDest_.x);this.setY(this.scrollDest_.y);this.div.style.left=this.getX()+"px";this.div.style.top=this.getY()+"px"};s7sdk.ScrollableDiv.prototype.goLeft=function(){this.positionOvershootToEdge();this.velocity.x=this.constantScrollVelocity;this.useConstantVelocity_=true};s7sdk.ScrollableDiv.prototype.goRight=function(){this.positionOvershootToEdge();this.velocity.x=-this.constantScrollVelocity;this.useConstantVelocity_=true};s7sdk.ScrollableDiv.prototype.goUp=function(){this.positionOvershootToEdge();this.velocity.y=this.constantScrollVelocity;this.useConstantVelocity_=true};s7sdk.ScrollableDiv.prototype.goDown=function(){this.positionOvershootToEdge();this.velocity.y=-this.constantScrollVelocity;this.useConstantVelocity_=true};s7sdk.ScrollableDiv.prototype.stop=function(){this.scrollDest_=new s7sdk.Point2D(this.alignToNextNotch(this.getX(),this.xNotch,this.velocity.x>0),this.alignToNextNotch(this.getY(),this.yNotch,this.velocity.y>0));this.kickStart_=true};s7sdk.ScrollableDiv.prototype.getInterpretAsClick=function(){return this.interpretAsClick_};s7sdk.ScrollableDiv.prototype.getScrollDest=function(){return this.scrollDest_};s7sdk.ScrollableDiv.prototype.setScrollDest=function(b){b.x=this.alignToNearestNotch(b.x,this.xNotch);b.y=this.alignToNearestNotch(b.y,this.yNotch);this.useConstantVelocity_=false;this.scrollDest_=b;var a=this;this.ptrScrollDestX_={};this.ptrScrollDestX_.getValue=function(){return a.scrollDest_.x};this.ptrScrollDestX_.setValue=function(c){a.scrollDest_.x=c};this.ptrScrollDestY_={};this.ptrScrollDestY_.getValue=function(){return a.scrollDest_.y};this.ptrScrollDestY_.setValue=function(c){a.scrollDest_.y=c}};s7sdk.ScrollableDiv.prototype.mouseDown=function(c){c=c||window.event;var b=s7sdk.Util.getEventPos(c).x;var a=s7sdk.Util.getEventPos(c).y;s7sdk.Logger.log(s7sdk.Logger.FINEST,"s7sdk.ScrollableDiv.mouseDown - screenX: %0, screenY: %1",b,a);this.mouseIsDown_=true;this.interpretAsClick_=true;this.cursorStartStage_=new s7sdk.Point2D(b,a);this.startPos_=new s7sdk.Point2D(this.getX(),this.getY());this.cursorDelta_=new s7sdk.Point2D(0,0);this.currentMousePoint_=this.lastMousePoint_=new s7sdk.Point2D(b,a);s7sdk.Event.addDOMListener(document,"mousemove",this.__mouseMove,false);s7sdk.Event.addDOMListener(document,"mouseup",this.__mouseUp,false);s7sdk.Event.addDOMListener(document,"touchmove",this.__mouseMove,false);s7sdk.Event.addDOMListener(document,"touchend",this.__mouseUp,false)};s7sdk.ScrollableDiv.prototype.mouseMove=function(a){a=a||window.event;var f=s7sdk.Util.getEventPos(a).x;var d=s7sdk.Util.getEventPos(a).y;this.currentMousePoint_=new s7sdk.Point2D(f,d);this.cursorDelta_=this.pointDiff(this.currentMousePoint_,this.lastMousePoint_);var c=null;var i=this.scrollDir;if(Math.abs(this.cursorDelta_.x)>Math.abs(this.cursorDelta_.y)){if(this.cursorDelta_.x<0){this.scrollDir="left"}else{this.scrollDir="right"}}else{if(this.cursorDelta_.y<0){this.scrollDir="down"}else{this.scrollDir="up"}}if(i!=this.scrollDir){c=true}else{c=false}var g=!(this.edgeVector&this.LEFT_EDGE)&&this.scrollX;var h=!(this.edgeVector&this.RIGHT_EDGE)&&this.scrollX;var b=!(this.edgeVector&this.TOP_EDGE)&&this.scrollY;var e=!(this.edgeVector&this.BOTTOM_EDGE)&&this.scrollY;this.preventNative=true;if(((this.scrollDir=="left")&&!h)||((this.scrollDir=="right")&&!g)||((this.scrollDir=="up")&&!b)||((this.scrollDir=="down")&&!e)){this.preventNative=false}if(this.preventNative){s7sdk.Event.preventDefault(a)}if(this.cursorDelta_.getLength()>this.CLICK_THRESHOLD){this.interpretAsClick_=false}this.velocityXAdjusted_=false;this.velocityYAdjusted_=false};s7sdk.ScrollableDiv.prototype.mouseUp=function(a){a=a||window.event;if(this.preventNative){s7sdk.Event.preventDefault(a)}s7sdk.Logger.log(s7sdk.Logger.FINEST,"s7sdk.ScrollableDiv.mouseUp - velocity: %0, scrollDest: %1",this.velocity.toString(),this.getScrollDest().toString());this.mouseIsDown_=false;s7sdk.Event.removeDOMListener(document,"mousemove",this.__mouseMove,false);s7sdk.Event.removeDOMListener(document,"mouseup",this.__mouseUp,false);s7sdk.Event.removeDOMListener(document,"touchmove",this.__mouseMove,false);s7sdk.Event.removeDOMListener(document,"touchend",this.__mouseUp,false);if(this.cursorDelta_.getLength()>this.CLICK_THRESHOLD){this.interpretAsClick_=false}};s7sdk.ScrollableDiv.prototype.enterFrame=function(){var c=new Date().getTime();if(isNaN(this.lastTime_)){this.lastTime_=c}this.reciprocalFrameRate_=(c-this.lastTime_)/1000;this.lastTime_=c;if(this.reciprocalFrameRate_>this.refreshLimit_*5){this.reciprocalFrameRate_=this.refreshLimit_}if(this.mouseIsDown_){this.lastMousePoint_=this.currentMousePoint_;if(this.cursorDelta_.x>this.MAX_MOUSE_DELTA){this.cursorDelta_.x=this.MAX_MOUSE_DELTA}if(this.cursorDelta_.x<-this.MAX_MOUSE_DELTA){this.cursorDelta_.x=-this.MAX_MOUSE_DELTA}if(this.cursorDelta_.y>this.MAX_MOUSE_DELTA){this.cursorDelta_.y=this.MAX_MOUSE_DELTA}if(this.cursorDelta_.y<-this.MAX_MOUSE_DELTA){this.cursorDelta_.y=-this.MAX_MOUSE_DELTA}this.velocity.x=this.cursorDelta_.x*this.DELTA_TO_VELOCITY;this.velocity.y=this.cursorDelta_.y*this.DELTA_TO_VELOCITY;this.setScrollDest(new s7sdk.Point2D(this.getX()+(this.velocity.x/2),this.getY()+(this.velocity.y/2)));this.kickStart_=true;if(this.scrollX){if(this.client_&&this.mouseEnabled_){var a=1;var d=this.startPos_.x+(this.currentMousePoint_.x-this.cursorStartStage_.x);if((d>0)||(d<this.scrollBounds.x-this.getLogicalWidth())){a=this.overdragvalue}this.setX(this.startPos_.x+(this.currentMousePoint_.x-this.cursorStartStage_.x)*a);this.startPos_.x=this.getX();this.cursorStartStage_.x=this.currentMousePoint_.x}}if(this.scrollY){if(this.client_&&this.mouseEnabled_){var a=1;var b=this.startPos_.y+(this.currentMousePoint_.y-this.cursorStartStage_.y);if((b>0)||(b<this.scrollBounds.y-this.getLogicalHeight())){a=this.overdragvalue}this.setY(this.startPos_.y+(this.currentMousePoint_.y-this.cursorStartStage_.y)*a);this.startPos_.y=this.getY();this.cursorStartStage_.y=this.currentMousePoint_.y}}}else{if(this.scrollX&&(this.velocity.x!=0||this.kickStart_)){this.velocity.x=this.adjustVelocity(this.velocity.x,this.getX(),this.scrollBounds.x,this.getLogicalWidth(),this.ptrScrollDestX_,false);if(!this.velocityXAdjusted_){if(this.pageMode==1){this.ptrScrollDestX_.setValue(this.alignToNextNotch(this.getX(),this.xNotch,this.velocity.x>=0));this.velocityXAdjusted_=true}var d=this.getX()+(this.velocity.x*this.reciprocalFrameRate_);if(d>0){this.velocity.x*=this.overdragvalue;this.ptrScrollDestX_.setValue(0);this.velocityXAdjusted_=true}if(d<this.scrollBounds.x-this.getLogicalWidth()){this.velocity.x*=this.overdragvalue;this.ptrScrollDestX_.setValue(this.alignToNearestNotch(this.scrollBounds.x-this.getLogicalWidth(),this.xNotch));this.velocityXAdjusted_=true}}if(this.velocity.x==0){this.setX(this.scrollDest_.x)}else{this.setX(this.getX()+(this.velocity.x*this.reciprocalFrameRate_))}}if(this.scrollY&&(this.velocity.y!=0||this.kickStart_)){this.velocity.y=this.adjustVelocity(this.velocity.y,this.getY(),this.scrollBounds.y,this.getLogicalHeight(),this.ptrScrollDestY_,true);if(!this.velocityYAdjusted_){if(this.pageMode==1){this.ptrScrollDestY_.setValue(this.alignToNextNotch(this.getY(),this.yNotch,this.velocity.y>=0));this.velocityYAdjusted_=true}var b=this.getY()+(this.velocity.y*this.reciprocalFrameRate_);if(b>0){this.velocity.y*=this.overdragvalue;this.ptrScrollDestY_.setValue(0);this.velocityYAdjusted_=true}if(b<this.scrollBounds.y-this.getLogicalHeight()){this.velocity.y*=this.overdragvalue;this.ptrScrollDestY_.setValue(this.alignToNearestNotch(this.scrollBounds.y-this.getLogicalHeight(),this.yNotch));this.velocityYAdjusted_=true}}if(this.velocity.y==0){this.setY(this.scrollDest_.y)}else{this.setY(this.getY()+(this.velocity.y*this.reciprocalFrameRate_))}}this.kickStart_=false}if(this.positionEvents_&&!this.currentPosition.equals(new s7sdk.Point2D(this.getX(),this.getY()))){this.currentPosition=new s7sdk.Point2D(this.getX(),this.getY());if(this.client_&&this.client_.positionChanged){this.client_.positionChanged(this.currentPosition)}}if(this.checkEdges_){this.validateEdges();this.checkEdges_=false;this.layout()}};s7sdk.ScrollableDiv.prototype.adjustVelocity=function(f,g,d,a,e,b){if(g>5){e.setValue(0);if(f>0){f-=this.BOUNCE_DECEL*this.reciprocalFrameRate_*Math.abs(g)/75}else{f=-this.BOUNCE_RETURN*Math.abs(g)}this.useConstantVelocity_=false}else{if(g<d-a-5){e.setValue(this.alignToNearestNotch(d-a,b?this.yNotch:this.xNotch));if(f<0){f+=this.BOUNCE_DECEL*this.reciprocalFrameRate_*Math.abs(g+a-d)/75}else{f=this.BOUNCE_RETURN*Math.abs(g+a-d)}this.useConstantVelocity_=false}else{if(!this.useConstantVelocity_){f=3*(e.getValue()-g)}var c=Math.abs(f);if(c<2){f=0}}}return f};s7sdk.ScrollableDiv.prototype.validateEdges=function(){var e=this.mouseIsDown_||this.useConstantVelocity_?this.getX():this.scrollDest_.x;var c=this.mouseIsDown_||this.useConstantVelocity_?this.getY():this.scrollDest_.y;if(e>=0){this.edgeVector|=this.LEFT_EDGE}else{this.edgeVector&=~this.LEFT_EDGE}if(e<=this.scrollBounds.x-this.getLogicalWidth()){this.edgeVector|=this.RIGHT_EDGE}else{this.edgeVector&=~this.RIGHT_EDGE}if(c>=0){this.edgeVector|=this.TOP_EDGE}else{this.edgeVector&=~this.TOP_EDGE}if(c<=this.scrollBounds.y-this.getLogicalHeight()){this.edgeVector|=this.BOTTOM_EDGE}else{this.edgeVector&=~this.BOTTOM_EDGE}this.processEdgeVector();var d=this.pageMode?((e>=0)?0:Math.round(Math.abs(e)/this.scrollBounds.x)+0):(e>=0)?0:this.getPageIdxForScrollIdx(Math.round(Math.abs(e)/this.xNotch));var b=this.pageMode?((c>=0)?0:Math.round(Math.abs(c)/this.scrollBounds.y)+0):(c>=0)?0:this.getPageIdxForScrollIdy(Math.round(Math.abs(c)/this.yNotch));if(this.pageMode){var a=this.getPageCount();if(((d!=this.pageX_)&&(d<a.x))||((b!=this.pageY_)&&(b<a.y))){this.pageX_=d;this.pageY_=b;if(this.pageHandler!=null){this.pageHandler.apply(this.client_)}}}else{if(d!=this.pageX_||b!=this.pageY_){this.pageX_=d;this.pageY_=b;if(this.pageHandler!=null){this.pageHandler.apply(this.client_)}}}};s7sdk.ScrollableDiv.prototype.getPageIdxForScrollIdx=function(a){var c=this.getLogicalWidth()/this.xNotch;var b=this.scrollBounds.x/this.xNotch;if(a==0){return 0}else{if(a>=(c-b)){return this.getPageCountPageXMode0()-1}}return 1+Math.min(Math.round((a-1)/b),Math.floor((c-2)/b)-1)};s7sdk.ScrollableDiv.prototype.getPageIdxForScrollIdy=function(a){var c=this.getLogicalHeight()/this.yNotch;var b=this.scrollBounds.y/this.yNotch;if(a==0){return 0}else{if(a>=(c-b)){return this.getPageCountPageYMode0()-1}}return 1+Math.min(Math.round((a-1)/b),Math.floor((c-2)/b)-1)};s7sdk.ScrollableDiv.prototype.getPageCountPageXMode0=function(){var b=this.getLogicalWidth()/this.xNotch;var a=this.scrollBounds.x/this.xNotch;return b<=a?1:2+Math.floor((b-2)/a)};s7sdk.ScrollableDiv.prototype.getPageCountPageYMode0=function(){var b=this.getLogicalHeight()/this.yNotch;var a=this.scrollBounds.y/this.yNotch;return b<=a?1:2+Math.floor((b-2)/a)};s7sdk.ScrollableDiv.prototype.processEdgeVector=function(){if(this.client_){if(this.client_.toggleLeftButton){this.client_.toggleLeftButton(!(this.edgeVector&this.LEFT_EDGE))}if(this.client_.toggleRightButton){this.client_.toggleRightButton(!(this.edgeVector&this.RIGHT_EDGE))}if(this.client_.toggleUpButton){this.client_.toggleUpButton(!(this.edgeVector&this.TOP_EDGE))}if(this.client_.toggleDownButton){this.client_.toggleDownButton(!(this.edgeVector&this.BOTTOM_EDGE))}}};s7sdk.ScrollableDiv.prototype.getLogicalWidth=function(){return isNaN(this.logicalWidth_)?this.width:this.logicalWidth_};s7sdk.ScrollableDiv.prototype.setLogicalWidth=function(a){this.logicalWidth_=a};s7sdk.ScrollableDiv.prototype.setLogicalHeight=function(a){this.logicalHeight_=a};s7sdk.ScrollableDiv.prototype.getLogicalHeight=function(){return isNaN(this.logicalHeight_)?this.height:this.logicalHeight_};s7sdk.ScrollableDiv.prototype.getPageCount=function(){var a;if(this.pageMode){a=new s7sdk.Point2D(this.getLogicalWidth()/this.scrollBounds.x,this.getLogicalHeight()/this.scrollBounds.y);a.x=(this.getLogicalWidth()%this.scrollBounds.x)>this.xNotch/2?Math.ceil(a.x):Math.floor(a.x);a.y=(this.getLogicalHeight()%this.scrollBounds.y)>this.yNotch/2?Math.ceil(a.y):Math.floor(a.y)}else{a=new s7sdk.Point2D(this.getPageCountPageXMode0(),this.getPageCountPageYMode0())}return a};s7sdk.ScrollableDiv.prototype.getCurrentPage=function(){return new s7sdk.Point2D(this.pageX_,this.pageY_)};s7sdk.ScrollableDiv.prototype.setCurrentPage=function(c){var b=this.getPageCount();var a=new s7sdk.Point2D(Math.min(Math.max(1,c.x),b.x),Math.min(Math.max(1,c.y),b.y));if(this.pageMode){this.slideTo(new s7sdk.Point2D((a.x-1)*-this.scrollBounds.x,(a.y-1)*-this.scrollBounds.y))}else{this.slideTo(new s7sdk.Point2D(c.x!=1?(a.x-1)*-this.scrollBounds.x:-this.xNotch,c.y!=1?(a.y-1)*-this.scrollBounds.y:-this.yNotch))}};s7sdk.ScrollableDiv.prototype.pointDiff=function(b,a){return new s7sdk.Point2D(b.x-a.x,b.y-a.y)};s7sdk.ScrollableDiv.prototype.alignToNearestNotch=function(c,a){var b=Math.abs(c%a);if(b>a/2){b-=a}return(c>0)?c-b:c+b};s7sdk.ScrollableDiv.prototype.alignToNextNotch=function(d,a,b){var c=Math.abs(d%a);if(b){d+=(d>0)?a-c:c}else{d-=(d>0)?c:a-c}return d};s7sdk.ScrollableDiv.prototype.positionOvershootToEdge=function(){if(this.getLogicalWidth()>=this.scrollBounds.x){if(this.getX()>0){this.setX(0)}if(this.getX()<this.scrollBounds.x-this.getLogicalWidth()){this.setX(this.scrollBounds.x-this.getLogicalWidth())}}if(this.getLogicalHeight()>=this.scrollBounds.y){if(this.getY()>0){this.setY(0)}if(this.getY()<this.scrollBounds.y-this.getLogicalHeight()){this.setY(this.scrollBounds.y-this.getLogicalHeight())}}};s7sdk.ScrollableDiv.prototype.getX=function(){return this.x_};s7sdk.ScrollableDiv.prototype.setX=function(a){this.checkEdges_=true;this.x_=a};s7sdk.ScrollableDiv.prototype.getY=function(){return this.y_};s7sdk.ScrollableDiv.prototype.setY=function(a){this.checkEdges_=true;this.y_=a};s7sdk.ScrollableDiv.prototype.layout=function(){this.div.style.position="absolute";this.div.style.width=this.getLogicalWidth()+"px";this.div.style.height=this.getLogicalHeight()+"px";this.div.style.left=this.getX()+"px";this.div.style.top=this.getY()+"px";this.div.style.webkitOverflowScrolling="touch";this.div.style.webkitTransform="translateZ(0px)"}};