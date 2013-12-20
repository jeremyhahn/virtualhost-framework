if(!window.qxsettings)qxsettings={};
if(qxsettings["qx.resourceUri"]==undefined)qxsettings["qx.resourceUri"]="./resource/qx";
if(qxsettings["vhf.resourceUri"]==undefined)qxsettings["vhf.resourceUri"]="./resource/vhf";
if(qxsettings["qx.theme"]==undefined)qxsettings["qx.theme"]="qx.theme.ClassicRoyale";
if(qxsettings["qx.minLogLevel"]==undefined)qxsettings["qx.minLogLevel"]=200;
if(qxsettings["qx.logAppender"]==undefined)qxsettings["qx.logAppender"]="qx.log.appender.Native";
if(qxsettings["qx.application"]==undefined)qxsettings["qx.application"]="vhf.Index";
if(qxsettings["qx.version"]==undefined)qxsettings["qx.version"]="0.7.3 ";
if(qxsettings["qx.isSource"]==undefined)qxsettings["qx.isSource"]=false;
if(!window.qxvariants)qxvariants={};
qxvariants["qx.deprecationWarnings"]="off";
qxvariants["qx.debug"]="on";
qxvariants["qx.compatibility"]="on";
qxvariants["qx.aspects"]="off";



/* ID: qx.core.Bootstrap */
qx={Class:{createNamespace:function(name,
object){var splits=name.split(".");
var parent=window;
var part=splits[0];
for(var i=0,
len=splits.length-1;i<len;i++,
part=splits[i]){if(!parent[part]){parent=parent[part]={};
}else{parent=parent[part];
}}parent[part]=object;
return part;
},
define:function(name,
config){if(!config){var config={statics:{}};
}this.createNamespace(name,
config.statics);
if(config.defer){config.defer(config.statics);
}qx.core.Bootstrap.__registry[name]=config.statics;
}}};
qx.Class.define("qx.core.Bootstrap",
{statics:{LOADSTART:new Date,
time:function(){return new Date().getTime();
},
since:function(){return this.time()-this.LOADSTART;
},
__registry:{}}});




/* ID: qx.lang.Core */
qx.Class.define("qx.lang.Core");
if(!Error.prototype.toString||Error.prototype.toString()=="[object Error]"){Error.prototype.toString=function(){return this.message;
};
}if(!Array.prototype.indexOf){Array.prototype.indexOf=function(searchElement,
fromIndex){if(fromIndex==null){fromIndex=0;
}else if(fromIndex<0){fromIndex=Math.max(0,
this.length+fromIndex);
}
for(var i=fromIndex;i<this.length;i++){if(this[i]===searchElement){return i;
}}return -1;
};
}
if(!Array.prototype.lastIndexOf){Array.prototype.lastIndexOf=function(searchElement,
fromIndex){if(fromIndex==null){fromIndex=this.length-1;
}else if(fromIndex<0){fromIndex=Math.max(0,
this.length+fromIndex);
}
for(var i=fromIndex;i>=0;i--){if(this[i]===searchElement){return i;
}}return -1;
};
}
if(!Array.prototype.forEach){Array.prototype.forEach=function(callback,
obj){var l=this.length;
for(var i=0;i<l;i++){callback.call(obj,
this[i],
i,
this);
}};
}
if(!Array.prototype.filter){Array.prototype.filter=function(callback,
obj){var l=this.length;
var res=[];
for(var i=0;i<l;i++){if(callback.call(obj,
this[i],
i,
this)){res.push(this[i]);
}}return res;
};
}
if(!Array.prototype.map){Array.prototype.map=function(callback,
obj){var l=this.length;
var res=[];
for(var i=0;i<l;i++){res.push(callback.call(obj,
this[i],
i,
this));
}return res;
};
}
if(!Array.prototype.some){Array.prototype.some=function(callback,
obj){var l=this.length;
for(var i=0;i<l;i++){if(callback.call(obj,
this[i],
i,
this)){return true;
}}return false;
};
}
if(!Array.prototype.every){Array.prototype.every=function(callback,
obj){var l=this.length;
for(var i=0;i<l;i++){if(!callback.call(obj,
this[i],
i,
this)){return false;
}}return true;
};
}if(!String.prototype.quote){String.prototype.quote=function(){return '"'+this.replace(/\\/g,
"\\\\").replace(/\"/g,
"\\\"")+'"';
};
}




/* ID: qx.lang.Generics */
qx.Class.define("qx.lang.Generics",
{statics:{__map:{"Array":["join",
"reverse",
"sort",
"push",
"pop",
"shift",
"unshift",
"splice",
"concat",
"slice",
"indexOf",
"lastIndexOf",
"forEach",
"map",
"filter",
"some",
"every"],
"String":["quote",
"substring",
"toLowerCase",
"toUpperCase",
"charAt",
"charCodeAt",
"indexOf",
"lastIndexOf",
"toLocaleLowerCase",
"toLocaleUpperCase",
"localeCompare",
"match",
"search",
"replace",
"split",
"substr",
"concat",
"slice"]},
__wrap:function(obj,
func){return function(s){return obj.prototype[func].apply(s,
Array.prototype.slice.call(arguments,
1));
};
},
__init:function(){var map=qx.lang.Generics.__map;
for(var key in map){var obj=window[key];
var arr=map[key];
for(var i=0,
l=arr.length;i<l;i++){var func=arr[i];
if(!obj[func]){obj[func]=qx.lang.Generics.__wrap(obj,
func);
}}}}},
defer:function(statics){statics.__init();
}});




/* ID: qx.core.Setting */
qx.Class.define("qx.core.Setting",
{statics:{__settings:{},
define:function(key,
defaultValue){if(defaultValue===undefined){throw new Error('Default value of setting "'+key+'" must be defined!');
}
if(!this.__settings[key]){this.__settings[key]={};
}else if(this.__settings[key].defaultValue!==undefined){throw new Error('Setting "'+key+'" is already defined!');
}this.__settings[key].defaultValue=defaultValue;
},
get:function(key){var cache=this.__settings[key];
if(cache===undefined){throw new Error('Setting "'+key+'" is not defined.');
}
if(cache.value!==undefined){return cache.value;
}return cache.defaultValue;
},
__init:function(){if(window.qxsettings){for(var key in qxsettings){if((key.split(".")).length<2){throw new Error('Malformed settings key "'+key+'". Must be following the schema "namespace.key".');
}
if(!this.__settings[key]){this.__settings[key]={};
}this.__settings[key].value=qxsettings[key];
}window.qxsettings=undefined;
try{delete window.qxsettings;
}catch(ex){}this.__loadUrlSettings();
}},
__loadUrlSettings:function(){if(this.get("qx.allowUrlSettings")!=true){return;
}var urlSettings=document.location.search.slice(1).split("&");
for(var i=0;i<urlSettings.length;i++){var setting=urlSettings[i].split(":");
if(setting.length!=3||setting[0]!="qxsetting"){continue;
}var key=setting[1];
if(!this.__settings[key]){this.__settings[key]={};
}this.__settings[key].value=decodeURIComponent(setting[2]);
}}},
defer:function(statics){statics.define("qx.allowUrlSettings",
false);
statics.define("qx.allowUrlVariants",
false);
statics.define("qx.resourceUri",
"./resource");
statics.define("qx.isSource",
true);
statics.__init();
}});




/* ID: qx.lang.Array */
qx.Class.define("qx.lang.Array",
{statics:{fromArguments:function(args){return Array.prototype.slice.call(args,
0);
},
fromCollection:function(coll){return Array.prototype.slice.call(coll,
0);
},
fromShortHand:function(input){var len=input.length;
if(len>4||len==0){this.error("Invalid number of arguments!");
}var result=qx.lang.Array.copy(input);
switch(len){case 1:result[1]=result[2]=result[3]=result[0];
break;
case 2:result[2]=result[0];
case 3:result[3]=result[1];
}return result;
},
copy:function(arr){return arr.concat();
},
clone:function(arr){return arr.concat();
},
getLast:function(arr){return arr[arr.length-1];
},
getFirst:function(arr){return arr[0];
},
insertAt:function(arr,
obj,
i){arr.splice(i,
0,
obj);
return arr;
},
insertBefore:function(arr,
obj,
obj2){var i=arr.indexOf(obj2);
if(i==-1){arr.push(obj);
}else{arr.splice(i,
0,
obj);
}return arr;
},
insertAfter:function(arr,
obj,
obj2){var i=arr.indexOf(obj2);
if(i==-1||i==(arr.length-1)){arr.push(obj);
}else{arr.splice(i+1,
0,
obj);
}return arr;
},
removeAt:function(arr,
i){return arr.splice(i,
1)[0];
},
removeAll:function(arr){return arr.length=0;
},
append:function(arr,
a){{if(!(typeof (a)=="object"&&a instanceof Array)){throw new Error("The second parameter must be an array!");
}};
Array.prototype.push.apply(arr,
a);
return arr;
},
remove:function(arr,
obj){var i=arr.indexOf(obj);
if(i!=-1){arr.splice(i,
1);
return obj;
}},
contains:function(arr,
obj){return arr.indexOf(obj)!=-1;
},
equals:function(array1,
array2){if(array1.length!==array2.length){return false;
}
for(var i=0,
l=array1.length;i<l;i++){if(array1[i]!==array2[i]){return false;
}}return true;
}}});




/* ID: qx.core.Variant */
qx.Class.define("qx.core.Variant",
{statics:{__variants:{},
__cache:{},
compilerIsSet:function(){return true;
},
define:function(key,
allowedValues,
defaultValue){{if(!this.__isValidArray(allowedValues)){throw new Error('Allowed values of variant "'+key+'" must be defined!');
}
if(defaultValue===undefined){throw new Error('Default value of variant "'+key+'" must be defined!');
}};
if(!this.__variants[key]){this.__variants[key]={};
}else{if(this.__variants[key].defaultValue!==undefined){throw new Error('Variant "'+key+'" is already defined!');
}}this.__variants[key].allowedValues=allowedValues;
this.__variants[key].defaultValue=defaultValue;
},
get:function(key){var data=this.__variants[key];
{if(data===undefined){throw new Error('Variant "'+key+'" is not defined.');
}};
if(data.value!==undefined){return data.value;
}return data.defaultValue;
},
__init:function(){if(window.qxvariants){for(var key in qxvariants){{if((key.split(".")).length<2){throw new Error('Malformed settings key "'+key+'". Must be following the schema "namespace.key".');
}};
if(!this.__variants[key]){this.__variants[key]={};
}this.__variants[key].value=qxvariants[key];
}window.qxvariants=undefined;
try{delete window.qxvariants;
}catch(ex){}this.__loadUrlVariants(this.__variants);
}},
__loadUrlVariants:function(){if(qx.core.Setting.get("qx.allowUrlVariants")!=true){return;
}var urlVariants=document.location.search.slice(1).split("&");
for(var i=0;i<urlVariants.length;i++){var variant=urlVariants[i].split(":");
if(variant.length!=3||variant[0]!="qxvariant"){continue;
}var key=variant[1];
if(!this.__variants[key]){this.__variants[key]={};
}this.__variants[key].value=decodeURIComponent(variant[2]);
}},
select:function(key,
variantFunctionMap){{if(!this.__isValidObject(this.__variants[key])){throw new Error("Variant \""+key+"\" is not defined");
}
if(!this.__isValidObject(variantFunctionMap)){throw new Error("the second parameter must be a map!");
}};
for(var variant in variantFunctionMap){if(this.isSet(key,
variant)){return variantFunctionMap[variant];
}}
if(variantFunctionMap["default"]!==undefined){return variantFunctionMap["default"];
}{throw new Error('No match for variant "'+key+'" in variants ['+qx.lang.Object.getKeysAsString(variantFunctionMap)+'] found, and no default ("default") given');
};
},
isSet:function(key,
variants){var access=key+"$"+variants;
if(this.__cache[access]!==undefined){return this.__cache[access];
}var retval=false;
if(variants.indexOf("|")<0){retval=this.get(key)===variants;
}else{var keyParts=variants.split("|");
for(var i=0,
l=keyParts.length;i<l;i++){if(this.get(key)===keyParts[i]){retval=true;
break;
}}}this.__cache[access]=retval;
return retval;
},
__isValidArray:function(v){return typeof v==="object"&&v!==null&&v instanceof Array;
},
__isValidObject:function(v){return typeof v==="object"&&v!==null&&!(v instanceof Array);
},
__arrayContains:function(arr,
obj){for(var i=0,
l=arr.length;i<l;i++){if(arr[i]==obj){return true;
}}return false;
}},
defer:function(statics){statics.define("qx.debug",
["on",
"off"],
"on");
statics.define("qx.compatibility",
["on",
"off"],
"on");
statics.define("qx.eventMonitorNoListeners",
["on",
"off"],
"off");
statics.define("qx.aspects",
["on",
"off"],
"off");
statics.define("qx.deprecationWarnings",
["on",
"off"],
"on");
statics.__init();
}});




/* ID: qx.core.Aspect */
qx.Class.define("qx.core.Aspect",
{statics:{__registry:[],
wrap:function(fullName,
fcn,
type){if(!qx.core.Setting.get("qx.enableAspect")){return fcn;
}var before=[];
var after=[];
for(var i=0;i<this.__registry.length;i++){var aspect=this.__registry[i];
if(fullName.match(aspect.re)&&(type==aspect.type||aspect.type=="*")){var pos=aspect.pos;
if(pos=="before"){before.push(aspect.fcn);
}else{after.push(aspect.fcn);
}}}
if(before.length==0&&after.length==0){return fcn;
}var wrapper=function(){for(var i=0;i<before.length;i++){before[i].call(this,
fullName,
fcn,
type,
arguments);
}var ret=fcn.apply(this,
arguments);
for(var i=0;i<after.length;i++){after[i].call(this,
fullName,
fcn,
type,
arguments,
ret);
}return ret;
};
if(type!="static"){wrapper.self=fcn.self;
wrapper.base=fcn.base;
}fcn.wrapper=wrapper;
return wrapper;
},
addAdvice:function(position,
type,
nameRegExp,
fcn){if(position!="before"&&position!="after"){throw new Error("Unknown position: '"+position+"'");
}this.__registry.push({pos:position,
type:type,
re:nameRegExp,
fcn:fcn});
}},
defer:function(){qx.core.Setting.define("qx.enableAspect",
false);
}});




/* ID: qx.core.Client */
qx.Class.define("qx.core.Client",
{statics:{__init:function(){var vRunsLocally=window.location.protocol==="file:";
var vBrowserUserAgent=navigator.userAgent;
var vBrowserVendor=navigator.vendor;
var vBrowserProduct=navigator.product;
var vBrowserPlatform=navigator.platform;
var vBrowserModeHta=false;
var vBrowser;
var vEngine=null;
var vEngineVersion=null;
var vEngineVersionMajor=0;
var vEngineVersionMinor=0;
var vEngineVersionRevision=0;
var vEngineVersionBuild=0;
var vEngineEmulation=null;
var vEngineNightly=null;
var vVersionHelper;
if(window.opera&&/Opera[\s\/]([0-9\.]*)/.test(vBrowserUserAgent)){vEngine="opera";
vEngineVersion=RegExp.$1;
vBrowser="opera";
vEngineVersion=vEngineVersion.substring(0,
3)+"."+vEngineVersion.substring(3);
vEngineEmulation=vBrowserUserAgent.indexOf("MSIE")!==-1?"mshtml":vBrowserUserAgent.indexOf("Mozilla")!==-1?"gecko":null;
}else if(typeof vBrowserVendor==="string"&&vBrowserVendor==="KDE"&&/KHTML\/([0-9-\.]*)/.test(vBrowserUserAgent)){vEngine="khtml";
vBrowser="konqueror";
vEngineVersion=RegExp.$1;
}else if(vBrowserUserAgent.indexOf("AppleWebKit")!=-1&&/AppleWebKit\/([^ ]+)/.test(vBrowserUserAgent)){vEngine="webkit";
vEngineVersion=RegExp.$1;
vEngineNightly=vEngineVersion.indexOf("+")!=-1;
var invalidCharacter=RegExp("[^\\.0-9]").exec(vEngineVersion);
if(invalidCharacter){vEngineVersion=vEngineVersion.slice(0,
invalidCharacter.index);
}
if(vBrowserUserAgent.indexOf("Safari")!=-1){vBrowser="safari";
}else if(vBrowserUserAgent.indexOf("OmniWeb")!=-1){vBrowser="omniweb";
}else if(vBrowserUserAgent.indexOf("Shiira")!=-1){vBrowser="shiira";
}else if(vBrowserUserAgent.indexOf("NetNewsWire")!=-1){vBrowser="netnewswire";
}else if(vBrowserUserAgent.indexOf("RealPlayer")!=-1){vBrowser="realplayer";
}else{vBrowser="other webkit";
}
if(vEngineNightly){vBrowser+=" (nightly)";
}}else if(window.controllers&&typeof vBrowserProduct==="string"&&vBrowserProduct==="Gecko"&&/rv\:([^\);]+)(\)|;)/.test(vBrowserUserAgent)){vEngine="gecko";
vEngineVersion=RegExp.$1;
if(vBrowserUserAgent.indexOf("Firefox")!=-1){vBrowser="firefox";
}else if(vBrowserUserAgent.indexOf("Camino")!=-1){vBrowser="camino";
}else if(vBrowserUserAgent.indexOf("Galeon")!=-1){vBrowser="galeon";
}else{vBrowser="other gecko";
}}else if(/MSIE\s+([^\);]+)(\)|;)/.test(vBrowserUserAgent)){vEngine="mshtml";
vEngineVersion=RegExp.$1;
vBrowser="explorer";
vBrowserModeHta=!window.external;
}
if(vEngineVersion){vVersionHelper=vEngineVersion.split(".");
vEngineVersionMajor=vVersionHelper[0]||0;
vEngineVersionMinor=vVersionHelper[1]||0;
vEngineVersionRevision=vVersionHelper[2]||0;
vEngineVersionBuild=vVersionHelper[3]||0;
}var vEngineBoxSizingAttr=[];
switch(vEngine){case "gecko":vEngineBoxSizingAttr.push("-moz-box-sizing");
break;
case "khtml":vEngineBoxSizingAttr.push("-khtml-box-sizing");
break;
case "webkit":vEngineBoxSizingAttr.push("-khtml-box-sizing");
vEngineBoxSizingAttr.push("-webkit-box-sizing");
break;
case "mshtml":break;
default:break;
}vEngineBoxSizingAttr.push("box-sizing");
var vEngineQuirksMode=document.compatMode!=="CSS1Compat";
var vDefaultLocale="en";
var vBrowserLocale=(vEngine=="mshtml"?navigator.userLanguage:navigator.language).toLowerCase();
var vBrowserLocaleVariant=null;
var vBrowserLocaleVariantIndex=vBrowserLocale.indexOf("-");
if(vBrowserLocaleVariantIndex!=-1){vBrowserLocaleVariant=vBrowserLocale.substr(vBrowserLocaleVariantIndex+1);
vBrowserLocale=vBrowserLocale.substr(0,
vBrowserLocaleVariantIndex);
}var vPlatform="none";
var vPlatformWindows=false;
var vPlatformMacintosh=false;
var vPlatformUnix=false;
var vPlatformOther=false;
if(vBrowserPlatform.indexOf("Windows")!=-1||vBrowserPlatform.indexOf("Win32")!=-1||vBrowserPlatform.indexOf("Win64")!=-1){vPlatformWindows=true;
vPlatform="win";
}else if(vBrowserPlatform.indexOf("Macintosh")!=-1||vBrowserPlatform.indexOf("MacPPC")!=-1||vBrowserPlatform.indexOf("MacIntel")!=-1){vPlatformMacintosh=true;
vPlatform="mac";
}else if(vBrowserPlatform.indexOf("X11")!=-1||vBrowserPlatform.indexOf("Linux")!=-1||vBrowserPlatform.indexOf("BSD")!=-1){vPlatformUnix=true;
vPlatform="unix";
}else{vPlatformOther=true;
vPlatform="other";
}var vGfxVml=false;
var vGfxSvg=false;
var vGfxSvgBuiltin=false;
var vGfxSvgPlugin=false;
if(vEngine=="mshtml"){vGfxVml=true;
}if(document.implementation&&document.implementation.hasFeature){if(document.implementation.hasFeature("org.w3c.dom.svg",
"1.0")){vGfxSvg=vGfxSvgBuiltin=true;
}}this._runsLocally=vRunsLocally;
this._engineName=vEngine;
this._engineNameMshtml=vEngine==="mshtml";
this._engineNameGecko=vEngine==="gecko";
this._engineNameOpera=vEngine==="opera";
this._engineNameKhtml=vEngine==="khtml";
this._engineNameWebkit=vEngine==="webkit";
this._engineVersion=parseFloat(vEngineVersion);
this._engineVersionMajor=parseInt(vEngineVersionMajor);
this._engineVersionMinor=parseInt(vEngineVersionMinor);
this._engineVersionRevision=parseInt(vEngineVersionRevision);
this._engineVersionBuild=parseInt(vEngineVersionBuild);
this._engineQuirksMode=vEngineQuirksMode;
this._engineBoxSizingAttributes=vEngineBoxSizingAttr;
this._engineEmulation=vEngineEmulation;
this._browserName=vBrowser;
this._defaultLocale=vDefaultLocale;
this._browserPlatform=vPlatform;
this._browserPlatformWindows=vPlatformWindows;
this._browserPlatformMacintosh=vPlatformMacintosh;
this._browserPlatformUnix=vPlatformUnix;
this._browserPlatformOther=vPlatformOther;
this._browserModeHta=vBrowserModeHta;
this._browserLocale=vBrowserLocale;
this._browserLocaleVariant=vBrowserLocaleVariant;
this._gfxVml=vGfxVml;
this._gfxSvg=vGfxSvg;
this._gfxSvgBuiltin=vGfxSvgBuiltin;
this._gfxSvgPlugin=vGfxSvgPlugin;
this._fireBugActive=(window.console&&console.log&&console.debug&&console.assert);
this._supportsTextContent=(document.documentElement.textContent!==undefined);
this._supportsInnerText=(document.documentElement.innerText!==undefined);
this._supportsXPath=!!document.evaluate;
this._supportsElementExtensions=!!window.HTMLElement;
},
getRunsLocally:function(){return this._runsLocally;
},
getEngine:function(){return this._engineName;
},
getBrowser:function(){return this._browserName;
},
getVersion:function(){return this._engineVersion;
},
getMajor:function(){return this._engineVersionMajor;
},
getMinor:function(){return this._engineVersionMinor;
},
getRevision:function(){return this._engineVersionRevision;
},
getBuild:function(){return this._engineVersionBuild;
},
getEmulation:function(){return this._engineEmulation;
},
isMshtml:function(){return this._engineNameMshtml;
},
isGecko:function(){return this._engineNameGecko;
},
isOpera:function(){return this._engineNameOpera;
},
isKhtml:function(){return this._engineNameKhtml;
},
isWebkit:function(){return this._engineNameWebkit;
},
isSafari2:function(){return this._engineNameWebkit&&(this._engineVersion<420);
},
isInQuirksMode:function(){return this._engineQuirksMode;
},
getLocale:function(){return this._browserLocale;
},
getLocaleVariant:function(){return this._browserLocaleVariant;
},
getDefaultLocale:function(){return this._defaultLocale;
},
usesDefaultLocale:function(){return this._browserLocale===this._defaultLocale;
},
getEngineBoxSizingAttributes:function(){return this._engineBoxSizingAttributes;
},
getPlatform:function(){return this._browserPlatform;
},
runsOnWindows:function(){return this._browserPlatformWindows;
},
runsOnMacintosh:function(){return this._browserPlatformMacintosh;
},
runsOnUnix:function(){return this._browserPlatformUnix;
},
supportsVml:function(){return this._gfxVml;
},
supportsSvg:function(){return this._gfxSvg;
},
usesSvgBuiltin:function(){return this._gfxSvgBuiltin;
},
usesSvgPlugin:function(){return this._gfxSvgPlugin;
},
isFireBugActive:function(){return this._fireBugActive;
},
supportsTextContent:function(){return this._supportsTextContent;
},
supportsInnerText:function(){return this._supportsInnerText;
},
getInstance:function(){return this;
}},
defer:function(statics,
members,
properties){statics.__init();
qx.core.Variant.define("qx.client",
["gecko",
"mshtml",
"opera",
"webkit",
"khtml"],
qx.core.Client.getInstance().getEngine());
}});




/* ID: qx.lang.Object */
qx.Class.define("qx.lang.Object",
{statics:{isEmpty:function(map){for(var key in map){return false;
}return true;
},
hasMinLength:function(map,
length){var i=0;
for(var key in map){if((++i)>=length){return true;
}}return false;
},
getLength:function(map){var i=0;
for(var key in map){i++;
}return i;
},
_shadowedKeys:["isPrototypeOf",
"hasOwnProperty",
"toLocaleString",
"toString",
"valueOf"],
getKeys:qx.core.Variant.select("qx.client",
{"mshtml":function(map){var arr=[];
for(var key in map){arr.push(key);
}for(var i=0,
a=this._shadowedKeys,
l=a.length;i<l;i++){if(map.hasOwnProperty(a[i])){arr.push(a[i]);
}}return arr;
},
"default":function(map){var arr=[];
for(var key in map){arr.push(key);
}return arr;
}}),
getKeysAsString:function(map){var keys=qx.lang.Object.getKeys(map);
if(keys.length==0){return "";
}return '"'+keys.join('\", "')+'"';
},
getValues:function(map){var arr=[];
for(var key in map){arr.push(map[key]);
}return arr;
},
mergeWith:function(target,
source,
overwrite){if(overwrite===undefined){overwrite=true;
}
for(var key in source){if(overwrite||target[key]===undefined){target[key]=source[key];
}}return target;
},
carefullyMergeWith:function(target,
source){qx.log.Logger.deprecatedMethodWarning(arguments.callee);
return qx.lang.Object.mergeWith(target,
source,
false);
},
merge:function(target,
varargs){var len=arguments.length;
for(var i=1;i<len;i++){qx.lang.Object.mergeWith(target,
arguments[i]);
}return target;
},
copy:function(source){var clone={};
for(var key in source){clone[key]=source[key];
}return clone;
},
invert:function(map){var result={};
for(var key in map){result[map[key].toString()]=key;
}return result;
},
getKeyFromValue:function(obj,
value){for(var key in obj){if(obj[key]===value){return key;
}}return null;
},
select:function(key,
map){return map[key];
},
fromArray:function(array){var obj={};
for(var i=0,
l=array.length;i<l;i++){{switch(typeof array[i]){case "object":case "function":case "undefined":throw new Error("Could not convert complex objects like "+array[i]+" at array index "+i+" to map syntax");
}};
obj[array[i].toString()]=true;
}return obj;
}}});




/* ID: qx.Class */
qx.Class.define("qx.Class",
{statics:{define:function(name,
config){if(!config){var config={};
}if(config.include&&!(config.include instanceof Array)){config.include=[config.include];
}if(config.implement&&!(config.implement instanceof Array)){config.implement=[config.implement];
}if(!config.hasOwnProperty("extend")&&!config.type){config.type="static";
}{this.__validateConfig(name,
config);
};
var clazz=this.__createClass(name,
config.type,
config.extend,
config.statics,
config.construct,
config.destruct);
if(config.extend){if(config.properties){this.__addProperties(clazz,
config.properties,
true);
}if(config.members){this.__addMembers(clazz,
config.members,
true,
true);
}if(config.events){this.__addEvents(clazz,
config.events,
true);
}if(config.include){for(var i=0,
l=config.include.length;i<l;i++){this.__addMixin(clazz,
config.include[i],
false);
}}}if(config.settings){for(var key in config.settings){qx.core.Setting.define(key,
config.settings[key]);
}}if(config.variants){for(var key in config.variants){qx.core.Variant.define(key,
config.variants[key].allowedValues,
config.variants[key].defaultValue);
}}if(config.defer){config.defer.self=clazz;
config.defer(clazz,
clazz.prototype,
{add:function(name,
config){var properties={};
properties[name]=config;
qx.Class.__addProperties(clazz,
properties,
true);
}});
}if(config.implement){for(var i=0,
l=config.implement.length;i<l;i++){this.__addInterface(clazz,
config.implement[i]);
}}},
createNamespace:function(name,
object){var splits=name.split(".");
var parent=window;
var part=splits[0];
for(var i=0,
l=splits.length-1;i<l;i++,
part=splits[i]){if(!parent[part]){parent=parent[part]={};
}else{parent=parent[part];
}}{if(parent[part]!==undefined){throw new Error("An object of the name '"+name+"' already exists and overwriting is not allowed!");
}};
parent[part]=object;
return part;
},
isDefined:function(name){return this.getByName(name)!==undefined;
},
getTotalNumber:function(){return qx.lang.Object.getLength(this.__registry);
},
getByName:function(name){return this.__registry[name];
},
include:function(clazz,
mixin){{if(!mixin){throw new Error("Includes of mixins must be mixins. The mixin of class '"+clazz.classname+"' is undefined/null!");
}qx.Mixin.isCompatible(mixin,
clazz);
};
qx.Class.__addMixin(clazz,
mixin,
false);
},
patch:function(clazz,
mixin){{qx.Mixin.isCompatible(mixin,
clazz);
};
qx.Class.__addMixin(clazz,
mixin,
true);
},
isSubClassOf:function(clazz,
superClass){if(!clazz){return false;
}
if(clazz==superClass){return true;
}
if(clazz.prototype instanceof superClass){return true;
}return false;
},
getPropertyDefinition:function(clazz,
name){while(clazz){if(clazz.$$properties&&clazz.$$properties[name]){return clazz.$$properties[name];
}clazz=clazz.superclass;
}return null;
},
getByProperty:function(clazz,
name){while(clazz){if(clazz.$$properties&&clazz.$$properties[name]){return clazz;
}clazz=clazz.superclass;
}return null;
},
hasProperty:function(clazz,
name){return !!this.getPropertyDefinition(clazz,
name);
},
getEventType:function(clazz,
name){var clazz=clazz.constructor;
while(clazz.superclass){if(clazz.$$events&&clazz.$$events[name]!==undefined){return clazz.$$events[name];
}clazz=clazz.superclass;
}return null;
},
supportsEvent:function(clazz,
name){return !!this.getEventType(clazz,
name);
},
hasOwnMixin:function(clazz,
mixin){return clazz.$$includes&&clazz.$$includes.indexOf(mixin)!==-1;
},
getByMixin:function(clazz,
mixin){var list,
i,
l;
while(clazz){if(clazz.$$includes){list=clazz.$$flatIncludes;
for(i=0,
l=list.length;i<l;i++){if(list[i]===mixin){return clazz;
}}}clazz=clazz.superclass;
}return null;
},
getMixins:function(clazz){var list=[];
while(clazz){if(clazz.$$includes){list.push.apply(list,
clazz.$$flatIncludes);
}clazz=clazz.superclass;
}return list;
},
hasMixin:function(clazz,
mixin){return !!this.getByMixin(clazz,
mixin);
},
hasOwnInterface:function(clazz,
iface){return clazz.$$implements&&clazz.$$implements.indexOf(iface)!==-1;
},
getByInterface:function(clazz,
iface){var list,
i,
l;
while(clazz){if(clazz.$$implements){list=clazz.$$flatImplements;
for(i=0,
l=list.length;i<l;i++){if(list[i]===iface){return clazz;
}}}clazz=clazz.superclass;
}return null;
},
getInterfaces:function(clazz){var list=[];
while(clazz){if(clazz.$$implements){list.push.apply(list,
clazz.$$flatImplements);
}clazz=clazz.superclass;
}return list;
},
hasInterface:function(clazz,
iface){return !!this.getByInterface(clazz,
iface);
},
implementsInterface:function(clazz,
iface){if(this.hasInterface(clazz,
iface)){return true;
}
try{qx.Interface.assert(clazz,
iface,
false);
return true;
}catch(ex){}return false;
},
getInstance:function(){if(!this.$$instance){this.$$allowconstruct=true;
this.$$instance=new this;
delete this.$$allowconstruct;
}return this.$$instance;
},
genericToString:function(){return "[Class "+this.classname+"]";
},
__registry:qx.core.Bootstrap.__registry,
__allowedKeys:{"type":"string",
"extend":"function",
"implement":"object",
"include":"object",
"construct":"function",
"statics":"object",
"properties":"object",
"members":"object",
"settings":"object",
"variants":"object",
"events":"object",
"defer":"function",
"destruct":"function"},
__staticAllowedKeys:{"type":"string",
"statics":"object",
"settings":"object",
"variants":"object",
"defer":"function"},
__validateConfig:function(name,
config){if(config.type&&!(config.type==="static"||config.type==="abstract"||config.type==="singleton")){throw new Error('Invalid type "'+config.type+'" definition for class "'+name+'"!');
}var allowed=config.type==="static"?this.__staticAllowedKeys:this.__allowedKeys;
for(var key in config){if(!allowed[key]){throw new Error('The configuration key "'+key+'" in class "'+name+'" is not allowed!');
}
if(config[key]==null){throw new Error('Invalid key "'+key+'" in class "'+name+'"! The value is undefined/null!');
}
if(typeof config[key]!==allowed[key]){throw new Error('Invalid type of key "'+key+'" in class "'+name+'"! The type of the key must be "'+allowed[key]+'"!');
}}var maps=["statics",
"properties",
"members",
"settings",
"variants",
"events"];
for(var i=0,
l=maps.length;i<l;i++){var key=maps[i];
if(config[key]!==undefined&&(config[key] instanceof Array||config[key] instanceof RegExp||config[key] instanceof Date||config[key].classname!==undefined)){throw new Error('Invalid key "'+key+'" in class "'+name+'"! The value needs to be a map!');
}}if(config.include){if(config.include instanceof Array){for(var i=0,
a=config.include,
l=a.length;i<l;i++){if(a[i]==null||a[i].$$type!=="Mixin"){throw new Error('The include definition in class "'+name+'" contains an invalid mixin at position '+i+': '+a[i]);
}}}else{throw new Error('Invalid include definition in class "'+name+'"! Only mixins and arrays of mixins are allowed!');
}}if(config.implement){if(config.implement instanceof Array){for(var i=0,
a=config.implement,
l=a.length;i<l;i++){if(a[i]==null||a[i].$$type!=="Interface"){throw new Error('The implement definition in class "'+name+'" contains an invalid interface at position '+i+': '+a[i]);
}}}else{throw new Error('Invalid implement definition in class "'+name+'"! Only interfaces and arrays of interfaces are allowed!');
}}if(config.include){try{qx.Mixin.checkCompatibility(config.include);
}catch(ex){throw new Error('Error in include definition of class "'+name+'"! '+ex.message);
}}if(config.settings){for(var key in config.settings){if(key.substr(0,
key.indexOf("."))!=name.substr(0,
name.indexOf("."))){qx.log.Logger.ROOT_LOGGER.error('Forbidden setting "'+key+'" found in "'+name+'". It is forbidden to define a default setting for an external namespace!');
}}}if(config.variants){for(var key in config.variants){if(key.substr(0,
key.indexOf("."))!=name.substr(0,
name.indexOf("."))){throw new Error('Forbidden variant "'+key+'" found in "'+name+'". It is forbidden to define a variant for an external namespace!');
}}}},
__createClass:function(name,
type,
extend,
statics,
construct,
destruct){var clazz;
if(!extend&&true){clazz=statics||{};
}else{clazz={};
if(extend){if(!construct){construct=this.__createDefaultConstructor();
}clazz=this.__wrapConstructor(construct,
name,
type);
}if(statics){var key;
for(var i=0,
a=qx.lang.Object.getKeys(statics),
l=a.length;i<l;i++){key=a[i];
{clazz[key]=statics[key];
};
var staticValue;
}}}var basename=this.createNamespace(name,
clazz,
false);
clazz.name=clazz.classname=name;
clazz.basename=basename;
if(!clazz.hasOwnProperty("toString")){clazz.toString=this.genericToString;
}
if(extend){var superproto=extend.prototype;
var helper=this.__createEmptyFunction();
helper.prototype=superproto;
var proto=new helper;
clazz.prototype=proto;
proto.name=proto.classname=name;
proto.basename=basename;
construct.base=clazz.superclass=extend;
construct.self=clazz.constructor=proto.constructor=clazz;
if(destruct){{};
clazz.$$destructor=destruct;
}}{qx.Clazz=clazz;
qx.Proto=proto||null;
qx.Super=extend||null;
};
this.__registry[name]=clazz;
return clazz;
},
__addEvents:function(clazz,
events,
patch){{if(!qx.core.Target){throw new Error(clazz.classname+": the class 'qx.core.Target' must be availabe to use events!");
}
if(typeof events!=="object"||events instanceof Array){throw new Error(clazz.classname+": the events must be defined as map!");
}
for(var key in events){if(typeof events[key]!=="string"){throw new Error(clazz.classname+"/"+key+": the event value needs to be a string with the class name of the event object which will be fired.");
}}if(clazz.$$events&&patch!==true){for(var key in events){if(clazz.$$events[key]!==undefined&&clazz.$$events[key]!==events[key]){throw new Error(clazz.classname+"/"+key+": the event value/type cannot be changed from "+clazz.$$events[key]+" to "+events[key]);
}}}};
if(clazz.$$events){for(var key in events){clazz.$$events[key]=events[key];
}}else{clazz.$$events=events;
}},
__addProperties:function(clazz,
properties,
patch){var config;
if(patch===undefined){patch=false;
}var attach=!!clazz.$$propertiesAttached;
for(var name in properties){config=properties[name];
{this.__validateProperty(clazz,
name,
config,
patch);
};
config.name=name;
if(!config.refine){if(clazz.$$properties===undefined){clazz.$$properties={};
}clazz.$$properties[name]=config;
}if(config.init!==undefined){clazz.prototype["__init$"+name]=config.init;
}if(config.event!==undefined){var event={};
event[config.event]="qx.event.type.ChangeEvent";
this.__addEvents(clazz,
event,
patch);
}if(config.inheritable){qx.core.Property.$$inheritable[name]=true;
}if(attach){qx.core.Property.attachMethods(clazz,
name,
config);
}if(config._fast){qx.core.LegacyProperty.addFastProperty(config,
clazz.prototype);
}else if(config._cached){qx.core.LegacyProperty.addCachedProperty(config,
clazz.prototype);
}else if(config._legacy){qx.core.LegacyProperty.addProperty(config,
clazz.prototype);
}}},
__validateProperty:function(clazz,
name,
config,
patch){var has=this.hasProperty(clazz,
name);
var compat=config._legacy||config._fast||config._cached;
if(has){var existingProperty=this.getPropertyDefinition(clazz,
name);
var existingCompat=existingProperty._legacy||existingProperty._fast||existingProperty._cached;
if(compat!=existingCompat){throw new Error("Could not redefine existing property '"+name+"' of class '"+clazz.classname+"'.");
}
if(config.refine&&existingProperty.init===undefined){throw new Error("Could not refine a init value if there was previously no init value defined. Property '"+name+"' of class '"+clazz.classname+"'.");
}}
if(!has&&config.refine){throw new Error("Could not refine non-existent property: "+name+"!");
}
if(has&&!patch){throw new Error("Class "+clazz.classname+" already has a property: "+name+"!");
}
if(has&&patch&&!compat){if(!config.refine){throw new Error('Could not refine property "'+name+'" without a "refine" flag in the property definition! This class: '+clazz.classname+', original class: '+this.getByProperty(clazz,
name).classname+'.');
}
for(var key in config){if(key!=="init"&&key!=="refine"){throw new Error("Class "+clazz.classname+" could not refine property: "+name+"! Key: "+key+" could not be refined!");
}}}
if(compat){return;
}var allowed=config.group?qx.core.Property.$$allowedGroupKeys:qx.core.Property.$$allowedKeys;
for(var key in config){if(allowed[key]===undefined){throw new Error('The configuration key "'+key+'" of property "'+name+'" in class "'+clazz.classname+'" is not allowed!');
}
if(config[key]===undefined){throw new Error('Invalid key "'+key+'" of property "'+name+'" in class "'+clazz.classname+'"! The value is undefined: '+config[key]);
}
if(allowed[key]!==null&&typeof config[key]!==allowed[key]){throw new Error('Invalid type of key "'+key+'" of property "'+name+'" in class "'+clazz.classname+'"! The type of the key must be "'+allowed[key]+'"!');
}}
if(config.transform!=null){if(!(typeof config.transform=="string")){throw new Error('Invalid transform definition of property "'+name+'" in class "'+clazz.classname+'"! Needs to be a String.');
}}
if(config.check!=null){if(!(typeof config.check=="string"||config.check instanceof Array||config.check instanceof Function)){throw new Error('Invalid check definition of property "'+name+'" in class "'+clazz.classname+'"! Needs to be a String, Array or Function.');
}}
if(config.event!=null&&!this.isSubClassOf(clazz,
qx.core.Target)){throw new Error("Invalid property '"+name+"' in class '"+clazz.classname+"': Properties defining an event can only be defined in sub classes of 'qx.core.Target'!");
}},
__addMembers:function(clazz,
members,
patch,
base){var proto=clazz.prototype;
var key,
member;
for(var i=0,
a=qx.lang.Object.getKeys(members),
l=a.length;i<l;i++){key=a[i];
member=members[key];
{if(proto[key]!==undefined&&key.charAt(0)=="_"&&key.charAt(1)=="_"){throw new Error('Overwriting private member "'+key+'" of Class "'+clazz.classname+'" is not allowed!');
}
if(patch!==true&&proto[key]!==undefined){throw new Error('Overwriting member "'+key+'" of Class "'+clazz.classname+'" is not allowed!');
}};
if(base!==false&&member instanceof Function){if(proto[key]){member.base=proto[key];
}member.self=clazz;
{};
}proto[key]=member;
}},
__addInterface:function(clazz,
iface){{if(!clazz||!iface){throw new Error("Incomplete parameters!");
}if(this.hasOwnInterface(clazz,
iface)){throw new Error('Interface "'+iface.name+'" is already used by Class "'+clazz.classname+'!');
}qx.Interface.assert(clazz,
iface,
true);
};
var list=qx.Interface.flatten([iface]);
if(clazz.$$implements){clazz.$$implements.push(iface);
clazz.$$flatImplements.push.apply(clazz.$$flatImplements,
list);
}else{clazz.$$implements=[iface];
clazz.$$flatImplements=list;
}},
__addMixin:function(clazz,
mixin,
patch){{if(!clazz||!mixin){throw new Error("Incomplete parameters!");
}
if(this.hasMixin(clazz,
mixin)){throw new Error('Mixin "'+mixin.name+'" is already included into Class "'+clazz.classname+'" by class: '+this.getByMixin(clazz,
mixin).classname+'!');
}};
var list=qx.Mixin.flatten([mixin]);
var entry;
for(var i=0,
l=list.length;i<l;i++){entry=list[i];
if(entry.$$events){this.__addEvents(clazz,
entry.$$events,
patch);
}if(entry.$$properties){this.__addProperties(clazz,
entry.$$properties,
patch);
}if(entry.$$members){this.__addMembers(clazz,
entry.$$members,
patch,
false);
}}if(clazz.$$includes){clazz.$$includes.push(mixin);
clazz.$$flatIncludes.push.apply(clazz.$$flatIncludes,
list);
}else{clazz.$$includes=[mixin];
clazz.$$flatIncludes=list;
}},
__createDefaultConstructor:function(){function defaultConstructor(){arguments.callee.base.apply(this,
arguments);
}return defaultConstructor;
},
__createEmptyFunction:function(){return function(){};
},
__wrapConstructor:function(construct,
name,
type){var code=[];
code.push('var clazz=arguments.callee.constructor;');
{code.push('if(!(this instanceof clazz))throw new Error("Please initialize ',
name,
' objects using the new keyword!");');
if(type==="abstract"){code.push('if(this.classname===',
name,
'.classname)throw new Error("The class ',
name,
' is abstract! It is not possible to instantiate it.");');
}else if(type==="singleton"){code.push('if(!clazz.$$allowconstruct)throw new Error("The class ',
name,
' is a singleton! It is not possible to instantiate it directly. Use the static getInstance() method instead.");');
}};
code.push('if(!clazz.$$propertiesAttached)qx.core.Property.attach(clazz);');
code.push('var retval=clazz.$$original.apply(this,arguments);');
code.push('if(clazz.$$includes){var mixins=clazz.$$flatIncludes;');
code.push('for(var i=0,l=mixins.length;i<l;i++){');
code.push('if(mixins[i].$$constructor){mixins[i].$$constructor.apply(this,arguments);}}}');
code.push('if(this.classname===',
name,
'.classname)this.$$initialized=true;');
code.push('return retval;');
var wrapper=new Function(code.join(""));
var aspectWrapper;
if(type==="singleton"){wrapper.getInstance=this.getInstance;
}wrapper.$$original=construct;
construct.wrapper=wrapper;
return wrapper;
}},
defer:function(statics){var key;
}});




/* ID: qx.Mixin */
qx.Class.define("qx.Mixin",
{statics:{define:function(name,
config){if(config){if(config.include&&!(config.include instanceof Array)){config.include=[config.include];
}{this.__validateConfig(name,
config);
};
var mixin=config.statics?config.statics:{};
for(var key in mixin){mixin[key].mixin=mixin;
}if(config.construct){mixin.$$constructor=config.construct;
}
if(config.include){mixin.$$includes=config.include;
}
if(config.properties){mixin.$$properties=config.properties;
}
if(config.members){mixin.$$members=config.members;
}
for(var key in mixin.$$members){if(mixin.$$members[key] instanceof Function){mixin.$$members[key].mixin=mixin;
}}
if(config.events){mixin.$$events=config.events;
}
if(config.destruct){mixin.$$destructor=config.destruct;
}}else{var mixin={};
}mixin.$$type="Mixin";
mixin.name=name;
mixin.toString=this.genericToString;
mixin.basename=qx.Class.createNamespace(name,
mixin);
this.__registry[name]=mixin;
return mixin;
},
checkCompatibility:function(mixins){var list=this.flatten(mixins);
var len=list.length;
if(len<2){return true;
}var properties={};
var members={};
var events={};
var mixin;
for(var i=0;i<len;i++){mixin=list[i];
for(var key in mixin.events){if(events[key]){throw new Error('Conflict between mixin "'+mixin.name+'" and "'+events[key]+'" in member "'+key+'"!');
}events[key]=mixin.name;
}
for(var key in mixin.properties){if(properties[key]){throw new Error('Conflict between mixin "'+mixin.name+'" and "'+properties[key]+'" in property "'+key+'"!');
}properties[key]=mixin.name;
}
for(var key in mixin.members){if(members[key]){throw new Error('Conflict between mixin "'+mixin.name+'" and "'+members[key]+'" in member "'+key+'"!');
}members[key]=mixin.name;
}}return true;
},
isCompatible:function(mixin,
clazz){var list=qx.Class.getMixins(clazz);
list.push(mixin);
return qx.Mixin.checkCompatibility(list);
},
getByName:function(name){return this.__registry[name];
},
isDefined:function(name){return this.getByName(name)!==undefined;
},
getTotalNumber:function(){return qx.lang.Object.getLength(this.__registry);
},
flatten:function(mixins){if(!mixins){return [];
}var list=mixins.concat();
for(var i=0,
l=mixins.length;i<l;i++){if(mixins[i].$$includes){list.push.apply(list,
this.flatten(mixins[i].$$includes));
}}return list;
},
genericToString:function(){return "[Mixin "+this.name+"]";
},
__registry:{},
__allowedKeys:{"include":"object",
"statics":"object",
"members":"object",
"properties":"object",
"events":"object",
"destruct":"function",
"construct":"function"},
__validateConfig:function(name,
config){var allowed=this.__allowedKeys;
for(var key in config){if(!allowed[key]){throw new Error('The configuration key "'+key+'" in mixin "'+name+'" is not allowed!');
}
if(config[key]==null){throw new Error('Invalid key "'+key+'" in mixin "'+name+'"! The value is undefined/null!');
}
if(allowed[key]!==null&&typeof config[key]!==allowed[key]){throw new Error('Invalid type of key "'+key+'" in mixin "'+name+'"! The type of the key must be "'+allowed[key]+'"!');
}}var maps=["statics",
"members",
"properties",
"events"];
for(var i=0,
l=maps.length;i<l;i++){var key=maps[i];
if(config[key]!==undefined&&(config[key] instanceof Array||config[key] instanceof RegExp||config[key] instanceof Date||config[key].classname!==undefined)){throw new Error('Invalid key "'+key+'" in mixin "'+name+'"! The value needs to be a map!');
}}if(config.include){for(var i=0,
a=config.include,
l=a.length;i<l;i++){if(a[i]==null){throw new Error("Includes of mixins must be mixins. The include number '"+(i+1)+"' in mixin '"+name+"'is undefined/null!");
}
if(a[i].$$type!=="Mixin"){throw new Error("Includes of mixins must be mixins. The include number '"+(i+1)+"' in mixin '"+name+"'is not a mixin!");
}}this.checkCompatibility(config.include);
}}}});




/* ID: qx.Interface */
qx.Class.define("qx.Interface",
{statics:{define:function(name,
config){if(config){if(config.extend&&!(config.extend instanceof Array)){config.extend=[config.extend];
}{this.__validateConfig(name,
config);
};
var iface=config.statics?config.statics:{};
if(config.extend){iface.$$extends=config.extend;
}
if(config.properties){iface.$$properties=config.properties;
}
if(config.members){iface.$$members=config.members;
}
if(config.events){iface.$$events=config.events;
}}else{var iface={};
}iface.$$type="Interface";
iface.name=name;
iface.toString=this.genericToString;
iface.basename=qx.Class.createNamespace(name,
iface);
qx.Interface.__registry[name]=iface;
return iface;
},
getByName:function(name){return this.__registry[name];
},
isDefined:function(name){return this.getByName(name)!==undefined;
},
getTotalNumber:function(){return qx.lang.Object.getLength(this.__registry);
},
flatten:function(ifaces){if(!ifaces){return [];
}var list=ifaces.concat();
for(var i=0,
l=ifaces.length;i<l;i++){if(ifaces[i].$$extends){list.push.apply(list,
this.flatten(ifaces[i].$$extends));
}}return list;
},
assert:function(clazz,
iface,
wrap){var members=iface.$$members;
if(members){var proto=clazz.prototype;
for(var key in members){if(typeof members[key]==="function"){if(typeof proto[key]!=="function"){throw new Error('Implementation of method "'+key+'" is missing in class "'+clazz.classname+'" required by interface "'+iface.name+'"');
}if(wrap===true&&!qx.Class.hasInterface(clazz,
iface)){proto[key]=this.__wrapInterfaceMember(iface,
proto[key],
key,
members[key]);
}}else{if(typeof proto[key]===undefined){if(typeof proto[key]!=="function"){throw new Error('Implementation of member "'+key+'" is missing in class "'+clazz.classname+'" required by interface "'+iface.name+'"');
}}}}}if(iface.$$properties){for(var key in iface.$$properties){if(!qx.Class.hasProperty(clazz,
key)){throw new Error('The property "'+key+'" is not supported by Class "'+clazz.classname+'"!');
}}}if(iface.$$events){for(var key in iface.$$events){if(!qx.Class.supportsEvent(clazz,
key)){throw new Error('The event "'+key+'" is not supported by Class "'+clazz.classname+'"!');
}}}var extend=iface.$$extends;
if(extend){for(var i=0,
l=extend.length;i<l;i++){this.assert(clazz,
extend[i],
wrap);
}}},
genericToString:function(){return "[Interface "+this.name+"]";
},
__registry:{},
__wrapInterfaceMember:function(iface,
origFunction,
functionName,
preCondition){function wrappedFunction(){if(!preCondition.apply(this,
arguments)){throw new Error('Pre condition of method "'+functionName+'" defined by "'+iface.name+'" failed.');
}return origFunction.apply(this,
arguments);
}origFunction.wrapper=wrappedFunction;
return wrappedFunction;
},
__allowedKeys:{"extend":"object",
"statics":"object",
"members":"object",
"properties":"object",
"events":"object"},
__validateConfig:function(name,
config){{var allowed=this.__allowedKeys;
for(var key in config){if(allowed[key]===undefined){throw new Error('The configuration key "'+key+'" in class "'+name+'" is not allowed!');
}
if(config[key]==null){throw new Error("Invalid key '"+key+"' in interface '"+name+"'! The value is undefined/null!");
}
if(allowed[key]!==null&&typeof config[key]!==allowed[key]){throw new Error('Invalid type of key "'+key+'" in interface "'+name+'"! The type of the key must be "'+allowed[key]+'"!');
}}var maps=["statics",
"members",
"properties",
"events"];
for(var i=0,
l=maps.length;i<l;i++){var key=maps[i];
if(config[key]!==undefined&&(config[key] instanceof Array||config[key] instanceof RegExp||config[key] instanceof Date||config[key].classname!==undefined)){throw new Error('Invalid key "'+key+'" in interface "'+name+'"! The value needs to be a map!');
}}if(config.extend){for(var i=0,
a=config.extend,
l=a.length;i<l;i++){if(a[i]==null){throw new Error("Extends of interfaces must be interfaces. The extend number '"+i+1+"' in interface '"+name+"' is undefined/null!");
}
if(a[i].$$type!=="Interface"){throw new Error("Extends of interfaces must be interfaces. The extend number '"+i+1+"' in interface '"+name+"' is not an interface!");
}}}if(config.statics){for(var key in config.statics){if(key.toUpperCase()!==key){throw new Error('Invalid key "'+key+'" in interface "'+name+'"! Static constants must be all uppercase.');
}
switch(typeof config.statics[key]){case "boolean":case "string":case "number":break;
default:throw new Error('Invalid key "'+key+'" in interface "'+name+'"! Static constants must be all of a primitive type.');
}}}};
}}});




/* ID: qx.locale.MTranslation */
qx.Mixin.define("qx.locale.MTranslation",
{members:{tr:function(messageId,
varargs){var localeManager=qx.locale.Manager;
if(localeManager){return localeManager.tr.apply(localeManager,
arguments);
}throw new Error("To enable localization please include qx.locale.Manager into your build!");
},
trn:function(singularMessageId,
pluralMessageId,
count,
varargs){var localeManager=qx.locale.Manager;
if(localeManager){return localeManager.trn.apply(localeManager,
arguments);
}throw new Error("To enable localization please include qx.locale.Manager into your build!");
},
marktr:function(messageId){var localeManager=qx.locale.Manager;
if(localeManager){return localeManager.marktr.apply(localeManager,
arguments);
}throw new Error("To enable localization please include qx.locale.Manager into your build!");
}}});




/* ID: qx.log.MLogging */
qx.Mixin.define("qx.log.MLogging",
{members:{getLogger:function(){if(qx.log.Logger){return qx.log.Logger.getClassLogger(this.constructor);
}throw new Error("To enable logging please include qx.log.Logger into your build!");
},
debug:function(msg,
exc){this.getLogger().debug(msg,
this.toHashCode(),
exc);
},
info:function(msg,
exc){this.getLogger().info(msg,
this.toHashCode(),
exc);
},
warn:function(msg,
exc){this.getLogger().warn(msg,
this.toHashCode(),
exc);
},
error:function(msg,
exc){this.getLogger().error(msg,
this.toHashCode(),
exc);
},
printStackTrace:function(){this.getLogger().printStackTrace();
}}});




/* ID: qx.core.MUserData */
qx.Mixin.define("qx.core.MUserData",
{members:{setUserData:function(key,
value){if(!this.__userData){this.__userData={};
}this.__userData[key]=value;
},
getUserData:function(key){if(!this.__userData){return null;
}return this.__userData[key];
}},
destruct:function(){this._disposeFields("__userData");
}});




/* ID: qx.core.LegacyProperty */
qx.Class.define("qx.core.LegacyProperty",
{statics:{getSetterName:function(name){return qx.core.Property.$$method.set[name];
},
getGetterName:function(name){return qx.core.Property.$$method.get[name];
},
getResetterName:function(name){return qx.core.Property.$$method.reset[name];
},
addFastProperty:function(config,
proto){var vName=config.name;
var vUpName=qx.lang.String.toFirstUp(vName);
var vStorageField="_value"+vUpName;
var vGetterName="get"+vUpName;
var vSetterName="set"+vUpName;
var vComputerName="_compute"+vUpName;
proto[vStorageField]=typeof config.defaultValue!=="undefined"?config.defaultValue:null;
if(config.noCompute){proto[vGetterName]=function(){return this[vStorageField];
};
}else{proto[vGetterName]=function(){return this[vStorageField]==null?this[vStorageField]=this[vComputerName]():this[vStorageField];
};
}proto[vGetterName].self=proto.constructor;
if(config.setOnlyOnce){proto[vSetterName]=function(vValue){this[vStorageField]=vValue;
this[vSetterName]=null;
return vValue;
};
}else{proto[vSetterName]=function(vValue){return this[vStorageField]=vValue;
};
}proto[vSetterName].self=proto.constructor;
if(!config.noCompute){proto[vComputerName]=function(){return null;
};
proto[vComputerName].self=proto.constructor;
}},
addCachedProperty:function(config,
proto){var vName=config.name;
var vUpName=qx.lang.String.toFirstUp(vName);
var vStorageField="_cached"+vUpName;
var vComputerName="_compute"+vUpName;
var vChangeName="_change"+vUpName;
if(typeof config.defaultValue!=="undefined"){proto[vStorageField]=config.defaultValue;
}proto["get"+vUpName]=function(){if(this[vStorageField]==null){this[vStorageField]=this[vComputerName]();
}return this[vStorageField];
};
proto["_invalidate"+vUpName]=function(){if(this[vStorageField]!=null){this[vStorageField]=null;
if(config.addToQueueRuntime){this.addToQueueRuntime(config.name);
}}};
proto["_recompute"+vUpName]=function(){var vOld=this[vStorageField];
var vNew=this[vComputerName]();
if(vNew!=vOld){this[vStorageField]=vNew;
this[vChangeName](vNew,
vOld);
return true;
}return false;
};
proto[vChangeName]=function(vNew,
vOld){};
proto[vComputerName]=function(){return null;
};
proto["get"+vUpName].self=proto.constructor;
proto["_invalidate"+vUpName].self=proto.constructor;
proto["_recompute"+vUpName].self=proto.constructor;
},
addProperty:function(config,
proto){qx.log.Logger.deprecatedMethodWarning(arguments.callee,
"Legacy properties are deprecated");
if(typeof config!=="object"){throw new Error("AddProperty: Param should be an object!");
}
if(typeof config.name!=="string"){throw new Error("AddProperty: Malformed input parameters: name needed!");
}if(config.dispose===undefined&&(config.type=="function"||config.type=="object")){config.dispose=true;
}config.method=qx.lang.String.toFirstUp(config.name);
config.implMethod=config.impl?qx.lang.String.toFirstUp(config.impl):config.method;
if(config.defaultValue==undefined){config.defaultValue=null;
}config.allowNull=config.allowNull!==false;
config.allowMultipleArguments=config.allowMultipleArguments===true;
if(typeof config.type==="string"){config.hasType=true;
}else if(typeof config.type!=="undefined"){throw new Error("AddProperty: Invalid type definition for property "+config.name+": "+config.type);
}else{config.hasType=false;
}
if(typeof config.instance==="string"){config.hasInstance=true;
}else if(typeof config.instance!=="undefined"){throw new Error("AddProperty: Invalid instance definition for property "+config.name+": "+config.instance);
}else{config.hasInstance=false;
}
if(typeof config.classname==="string"){config.hasClassName=true;
}else if(typeof config.classname!=="undefined"){throw new Error("AddProperty: Invalid classname definition for property "+config.name+": "+config.classname);
}else{config.hasClassName=false;
}config.hasConvert=config.convert!=null;
config.hasPossibleValues=config.possibleValues!=null;
config.addToQueue=config.addToQueue||false;
config.addToQueueRuntime=config.addToQueueRuntime||false;
config.up=config.name.toUpperCase();
var valueKey=qx.core.Property.$$store.user[config.name]="__user$"+config.name;
var changeKey="change"+config.method;
var modifyKey="_modify"+config.implMethod;
var checkKey="_check"+config.implMethod;
var method=qx.core.Property.$$method;
if(!method.set[config.name]){method.set[config.name]="set"+config.method;
method.get[config.name]="get"+config.method;
method.reset[config.name]="reset"+config.method;
}proto[valueKey]=config.defaultValue;
proto["get"+config.method]=function(){return this[valueKey];
};
proto["force"+config.method]=function(newValue){return this[valueKey]=newValue;
};
proto["reset"+config.method]=function(){return this["set"+config.method](config.defaultValue);
};
if(config.type==="boolean"){proto["toggle"+config.method]=function(newValue){return this["set"+config.method](!this[valueKey]);
};
}
if(config.allowMultipleArguments||config.hasConvert||config.hasInstance||config.hasClassName||config.hasPossibleValues||config.hasUnitDetection||config.addToQueue||config.addToQueueRuntime||config.addToStateQueue){proto["set"+config.method]=function(newValue){if(config.allowMultipleArguments&&arguments.length>1){newValue=qx.lang.Array.fromArguments(arguments);
}if(config.hasConvert){try{newValue=config.convert.call(this,
newValue,
config);
}catch(ex){throw new Error("Attention! Could not convert new value for "+config.name+": "+newValue+": "+ex);
}}var oldValue=this[valueKey];
if(newValue===oldValue){return newValue;
}
if(!(config.allowNull&&newValue==null)){if(config.hasType&&typeof newValue!==config.type){throw new Error("Attention! The value \""+newValue+"\" is an invalid value for the property \""+config.name+"\" which must be typeof \""+config.type+"\" but is typeof \""+typeof newValue+"\"!");
}
if(qx.Class.getByName(config.instance)){if(config.hasInstance&&!(newValue instanceof qx.Class.getByName(config.instance))){throw new Error("Attention! The value \""+newValue+"\" is an invalid value for the property \""+config.name+"\" which must be an instance of \""+config.instance+"\"!");
}}else{if(config.hasInstance&&!(newValue instanceof qx.OO.classes[config.instance])){throw new Error("Attention! The value \""+newValue+"\" is an invalid value for the property \""+config.name+"\" which must be an instance of \""+config.instance+"\"!");
}}
if(config.hasClassName&&newValue.classname!=config.classname){throw new Error("Attention! The value \""+newValue+"\" is an invalid value for the property \""+config.name+"\" which must be an object with the classname \""+config.classname+"\"!");
}
if(config.hasPossibleValues&&newValue!=null&&!qx.lang.Array.contains(config.possibleValues,
newValue)){throw new Error("Failed to save value for "+config.name+". '"+newValue+"' is not a possible value!");
}}if(this[checkKey]){try{newValue=this[checkKey](newValue,
config);
if(newValue===oldValue){return newValue;
}}catch(ex){return this.error("Failed to check property "+config.name,
ex);
}}this[valueKey]=newValue;
if(this[modifyKey]){try{this[modifyKey](newValue,
oldValue,
config);
}catch(ex){return this.error("Modification of property \""+config.name+"\" failed with exception",
ex);
}}if(config.addToQueue){this.addToQueue(config.name);
}
if(config.addToQueueRuntime){this.addToQueueRuntime(config.name);
}if(config.addToStateQueue){this.addToStateQueue();
}if(this.hasEventListeners&&this.hasEventListeners(changeKey)){try{this.createDispatchDataEvent(changeKey,
newValue);
}catch(ex){throw new Error("Property "+config.name+" modified: Failed to dispatch change event: "+ex);
}}return newValue;
};
}else{proto["set"+config.method]=function(newValue){var oldValue=this[valueKey];
if(newValue===oldValue){return newValue;
}
if(!(config.allowNull&&newValue==null)){if(config.hasType&&typeof newValue!==config.type){throw new Error("Attention! The value \""+newValue+"\" is an invalid value for the property \""+config.name+"\" which must be typeof \""+config.type+"\" but is typeof \""+typeof newValue+"\"!");
}}if(this[checkKey]){try{newValue=this[checkKey](newValue,
config);
if(newValue===oldValue){return newValue;
}}catch(ex){return this.error("Failed to check property "+config.name,
ex);
}}this[valueKey]=newValue;
if(this[modifyKey]){try{this[modifyKey](newValue,
oldValue,
config);
}catch(ex){var valueStr=new String(newValue).substring(0,
50);
this.error("Setting property \""+config.name+"\" to \""+valueStr+"\" failed with exception",
ex);
}}if(this.hasEventListeners&&this.hasEventListeners(changeKey)){var vEvent=new qx.event.type.DataEvent(changeKey,
newValue,
oldValue,
false);
vEvent.setTarget(this);
try{this.dispatchEvent(vEvent,
true);
}catch(ex){throw new Error("Property "+config.name+" modified: Failed to dispatch change event: "+ex);
}}return newValue;
};
}proto["set"+config.method].self=proto.constructor;
if(typeof config.getAlias==="string"){proto[config.getAlias]=proto["get"+config.method];
}if(typeof config.setAlias==="string"){proto[config.setAlias]=proto["set"+config.method];
}}}});




/* ID: qx.core.Property */
qx.Class.define("qx.core.Property",
{statics:{__checks:{"Boolean":'typeof value === "boolean"',
"String":'typeof value === "string"',
"NonEmptyString":'typeof value === "string" && value.length > 0',
"Number":'typeof value === "number" && isFinite(value)',
"Integer":'typeof value === "number" && isFinite(value) && value%1 === 0',
"Float":'typeof value === "number" && isFinite(value)',
"Double":'typeof value === "number" && isFinite(value)',
"Error":'value instanceof Error',
"RegExp":'value instanceof RegExp',
"Object":'value !== null && typeof value === "object"',
"Array":'value instanceof Array',
"Map":'value !== null && typeof value === "object" && !(value instanceof Array) && !(value instanceof qx.core.Object)',
"Function":'value instanceof Function',
"Date":'value instanceof Date',
"Node":'value !== null && value.nodeType !== undefined',
"Element":'value !== null && value.nodeType === 1 && value.attributes',
"Document":'value !== null && value.nodeType === 9 && value.documentElement',
"Window":'value !== null && window.document',
"Event":'value !== null && value.type !== undefined',
"Class":'value !== null && value.$$type === "Class"',
"Mixin":'value !== null && value.$$type === "Mixin"',
"Interface":'value !== null && value.$$type === "Interface"',
"Theme":'value !== null && value.$$type === "Theme"',
"Color":'typeof value === "string" && qx.util.ColorUtil.isValid(value)',
"Border":'value !== null && qx.theme.manager.Border.getInstance().isDynamic(value)',
"Font":'value !== null && qx.theme.manager.Font.getInstance().isDynamic(value)',
"Label":'value !== null && (qx.locale.Manager.getInstance().isDynamic(value) || typeof value === "string")'},
__dispose:{"Object":true,
"Array":true,
"Map":true,
"Function":true,
"Date":true,
"Node":true,
"Element":true,
"Document":true,
"Window":true,
"Event":true,
"Class":true,
"Mixin":true,
"Interface":true,
"Theme":true,
"Border":true,
"Font":true},
$$inherit:"inherit",
$$idcounter:0,
$$store:{user:{},
theme:{},
inherit:{},
init:{},
useinit:{}},
$$method:{get:{},
set:{},
reset:{},
init:{},
refresh:{},
style:{},
unstyle:{}},
$$allowedKeys:{name:"string",
dispose:"boolean",
inheritable:"boolean",
nullable:"boolean",
themeable:"boolean",
refine:"boolean",
init:null,
apply:"string",
event:"string",
check:null,
transform:"string"},
$$allowedGroupKeys:{name:"string",
group:"object",
mode:"string",
themeable:"boolean"},
$$inheritable:{},
refresh:function(widget){var parent=widget.getParent();
if(parent){var clazz=widget.constructor;
var inherit=this.$$store.inherit;
var refresh=this.$$method.refresh;
var properties;
{if(qx.core.Setting.get("qx.propertyDebugLevel")>1){widget.debug("Update widget: "+widget);
}};
while(clazz){properties=clazz.$$properties;
if(properties){for(var name in this.$$inheritable){if(properties[name]&&widget[refresh[name]]){{if(qx.core.Setting.get("qx.propertyDebugLevel")>2){widget.debug("Updating property: "+name+" to '"+parent[inherit[name]]+"'");
}};
widget[refresh[name]](parent[inherit[name]]);
}}}clazz=clazz.superclass;
}}},
attach:function(clazz){var properties=clazz.$$properties;
if(properties){for(var name in properties){this.attachMethods(clazz,
name,
properties[name]);
}}clazz.$$propertiesAttached=true;
},
attachMethods:function(clazz,
name,
config){if(config._legacy||config._fast||config._cached){return;
}var prefix,
postfix;
if(name.charAt(0)==="_"){if(name.charAt(1)==="_"){prefix="__";
postfix=qx.lang.String.toFirstUp(name.substring(2));
}else{prefix="_";
postfix=qx.lang.String.toFirstUp(name.substring(1));
}}else{prefix="";
postfix=qx.lang.String.toFirstUp(name);
}config.group?this.__attachGroupMethods(clazz,
config,
prefix,
postfix):this.__attachPropertyMethods(clazz,
config,
prefix,
postfix);
},
__attachGroupMethods:function(clazz,
config,
prefix,
postfix){var members=clazz.prototype;
var name=config.name;
var themeable=config.themeable===true;
{if(qx.core.Setting.get("qx.propertyDebugLevel")>1){console.debug("Generating property group: "+name);
}};
var setter=[];
var resetter=[];
if(themeable){var styler=[];
var unstyler=[];
}var argHandler="var a=arguments[0] instanceof Array?arguments[0]:arguments;";
setter.push(argHandler);
if(themeable){styler.push(argHandler);
}
if(config.mode=="shorthand"){var shorthand="a=qx.lang.Array.fromShortHand(qx.lang.Array.fromArguments(a));";
setter.push(shorthand);
if(themeable){styler.push(shorthand);
}}
for(var i=0,
a=config.group,
l=a.length;i<l;i++){{if(!this.$$method.set[a[i]]||!this.$$method.reset[a[i]]){throw new Error("Cannot create property group '"+name+"' including non-existing property '"+a[i]+"'!");
}};
setter.push("this.",
this.$$method.set[a[i]],
"(a[",
i,
"]);");
resetter.push("this.",
this.$$method.reset[a[i]],
"();");
if(themeable){{if(!this.$$method.style[a[i]]){throw new Error("Cannot add the non themable property '"+a[i]+"' to the themable property group '"+name+"'");
}};
styler.push("this.",
this.$$method.style[a[i]],
"(a[",
i,
"]);");
unstyler.push("this.",
this.$$method.unstyle[a[i]],
"();");
}}this.$$method.set[name]=prefix+"set"+postfix;
members[this.$$method.set[name]]=new Function(setter.join(""));
this.$$method.reset[name]=prefix+"reset"+postfix;
members[this.$$method.reset[name]]=new Function(resetter.join(""));
if(themeable){this.$$method.style[name]=prefix+"style"+postfix;
members[this.$$method.style[name]]=new Function(styler.join(""));
this.$$method.unstyle[name]=prefix+"unstyle"+postfix;
members[this.$$method.unstyle[name]]=new Function(unstyler.join(""));
}},
__attachPropertyMethods:function(clazz,
config,
prefix,
postfix){var members=clazz.prototype;
var name=config.name;
{if(qx.core.Setting.get("qx.propertyDebugLevel")>1){console.debug("Generating property wrappers: "+name);
}};
if(config.dispose===undefined&&typeof config.check==="string"){config.dispose=this.__dispose[config.check]||qx.Class.isDefined(config.check)||qx.Interface.isDefined(config.check);
}var method=this.$$method;
var store=this.$$store;
store.user[name]="__user$"+name;
store.theme[name]="__theme$"+name;
store.init[name]="__init$"+name;
store.inherit[name]="__inherit$"+name;
store.useinit[name]="__useinit$"+name;
method.get[name]=prefix+"get"+postfix;
members[method.get[name]]=function(){return qx.core.Property.executeOptimizedGetter(this,
clazz,
name,
"get");
};
method.set[name]=prefix+"set"+postfix;
members[method.set[name]]=function(value){return qx.core.Property.executeOptimizedSetter(this,
clazz,
name,
"set",
arguments);
};
method.reset[name]=prefix+"reset"+postfix;
members[method.reset[name]]=function(){return qx.core.Property.executeOptimizedSetter(this,
clazz,
name,
"reset");
};
if(config.inheritable||config.apply||config.event){method.init[name]=prefix+"init"+postfix;
members[method.init[name]]=function(value){return qx.core.Property.executeOptimizedSetter(this,
clazz,
name,
"init",
arguments);
};
}
if(config.inheritable){method.refresh[name]=prefix+"refresh"+postfix;
members[method.refresh[name]]=function(value){return qx.core.Property.executeOptimizedSetter(this,
clazz,
name,
"refresh",
arguments);
};
}
if(config.themeable){method.style[name]=prefix+"style"+postfix;
members[method.style[name]]=function(value){return qx.core.Property.executeOptimizedSetter(this,
clazz,
name,
"style",
arguments);
};
method.unstyle[name]=prefix+"unstyle"+postfix;
members[method.unstyle[name]]=function(){return qx.core.Property.executeOptimizedSetter(this,
clazz,
name,
"unstyle");
};
}
if(config.check==="Boolean"){members[prefix+"toggle"+postfix]=new Function("return this."+method.set[name]+"(!this."+method.get[name]+"())");
members[prefix+"is"+postfix]=new Function("return this."+method.get[name]+"()");
}},
__errors:{0:'Could not change or apply init value after constructing phase!',
1:'Requires exactly one argument!',
2:'Undefined value is not allowed!',
3:'Does not allow any arguments!',
4:'Null value is not allowed!',
5:'Is invalid!'},
error:function(obj,
id,
property,
variant,
value){var classname=obj.constructor.classname;
var msg="Error in property "+property+" of class "+classname+" in method "+this.$$method[variant][property]+" with incoming value '"+value+"': ";
obj.printStackTrace();
obj.error(msg+(this.__errors[id]||"Unknown reason: "+id));
throw new Error(msg+(this.__errors[id]||"Unknown reason: "+id));
},
__unwrapFunctionFromCode:function(instance,
members,
name,
variant,
code,
args){var store=this.$$method[variant][name];
{if(qx.core.Setting.get("qx.propertyDebugLevel")>1){console.debug("Code["+this.$$method[variant][name]+"]: "+code.join(""));
}try{members[store]=new Function("value",
code.join(""));
}catch(ex){alert("Malformed generated code to unwrap method: "+this.$$method[variant][name]+"\n"+code.join(""));
}};
{};
if(args===undefined){return instance[store]();
}else{return instance[store].apply(instance,
args);
}},
executeOptimizedGetter:function(instance,
clazz,
name,
variant){var config=clazz.$$properties[name];
var members=clazz.prototype;
var code=[];
if(config.inheritable){code.push('if(this.',
this.$$store.inherit[name],
'!==undefined)');
code.push('return this.',
this.$$store.inherit[name],
';');
code.push('else ');
}code.push('if(this.',
this.$$store.user[name],
'!==undefined)');
code.push('return this.',
this.$$store.user[name],
';');
if(config.themeable){code.push('else if(this.',
this.$$store.theme[name],
'!==undefined)');
code.push('return this.',
this.$$store.theme[name],
';');
}
if(config.deferredInit&&config.init===undefined){code.push('else if(this.',
this.$$store.init[name],
'!==undefined)');
code.push('return this.',
this.$$store.init[name],
';');
}code.push('else ');
if(config.init!==undefined){code.push('return this.',
this.$$store.init[name],
';');
}else if(config.inheritable||config.nullable){code.push('return null;');
}else{code.push('throw new Error("Property ',
name,
' of an instance of ',
clazz.classname,
' is not (yet) ready!");');
}return this.__unwrapFunctionFromCode(instance,
members,
name,
variant,
code);
},
executeOptimizedSetter:function(instance,
clazz,
name,
variant,
args){var config=clazz.$$properties[name];
var members=clazz.prototype;
var code=[];
var incomingValue=variant==="set"||variant==="style"||(variant==="init"&&config.init===undefined);
var resetValue=variant==="reset"||variant==="unstyle";
var hasCallback=config.apply||config.event||config.inheritable;
if(variant==="style"||variant==="unstyle"){var store=this.$$store.theme[name];
}else if(variant==="init"){var store=this.$$store.init[name];
}else{var store=this.$$store.user[name];
}{code.push('var prop=qx.core.Property;');
if(variant==="init"){code.push('if(this.$$initialized)prop.error(this,0,"'+name+'","'+variant+'",value);');
}
if(variant==="refresh"){}else if(incomingValue){code.push('if(arguments.length!==1)prop.error(this,1,"'+name+'","'+variant+'",value);');
code.push('if(value===undefined)prop.error(this,2,"'+name+'","'+variant+'",value);');
}else{code.push('if(arguments.length!==0)prop.error(this,3,"'+name+'","'+variant+'",value);');
}};
if(incomingValue){if(config.transform){code.push('value=this.',
config.transform,
'(value);');
}}if(hasCallback){if(incomingValue){code.push('if(this.',
store,
'===value)return value;');
}else if(resetValue){code.push('if(this.',
store,
'===undefined)return;');
}}if(config.inheritable){code.push('var inherit=prop.$$inherit;');
}if(incomingValue&&(true||variant==="set")){if(!config.nullable){code.push('if(value===null)prop.error(this,4,"'+name+'","'+variant+'",value);');
}if(config.check!==undefined){if(config.nullable){code.push('if(value!==null)');
}if(config.inheritable){code.push('if(value!==inherit)');
}code.push('if(');
if(this.__checks[config.check]!==undefined){code.push('!(',
this.__checks[config.check],
')');
}else if(qx.Class.isDefined(config.check)){code.push('!(value instanceof ',
config.check,
')');
}else if(qx.Interface.isDefined(config.check)){code.push('!(value && qx.Class.hasInterface(value.constructor, ',
config.check,
'))');
}else if(typeof config.check==="function"){code.push('!',
clazz.classname,
'.$$properties.',
name);
code.push('.check.call(this, value)');
}else if(typeof config.check==="string"){code.push('!(',
config.check,
')');
}else if(config.check instanceof Array){config.checkMap=qx.lang.Object.fromArray(config.check);
code.push(clazz.classname,
'.$$properties.',
name);
code.push('.checkMap[value]===undefined');
}else{throw new Error("Could not add check to property "+name+" of class "+clazz.classname);
}code.push(')prop.error(this,5,"'+name+'","'+variant+'",value);');
}}
if(!hasCallback){if(variant==="set"){code.push('this.',
this.$$store.user[name],
'=value;');
}else if(variant==="reset"){code.push('if(this.',
this.$$store.user[name],
'!==undefined)');
code.push('delete this.',
this.$$store.user[name],
';');
}else if(variant==="style"){code.push('this.',
this.$$store.theme[name],
'=value;');
}else if(variant==="unstyle"){code.push('if(this.',
this.$$store.theme[name],
'!==undefined)');
code.push('delete this.',
this.$$store.theme[name],
';');
}else if(variant==="init"&&incomingValue){code.push('this.',
this.$$store.init[name],
'=value;');
}}else{if(config.inheritable){code.push('var computed, old=this.',
this.$$store.inherit[name],
';');
}else{code.push('var computed, old;');
}code.push('if(this.',
this.$$store.user[name],
'!==undefined){');
if(variant==="set"){if(!config.inheritable){code.push('old=this.',
this.$$store.user[name],
';');
}code.push('computed=this.',
this.$$store.user[name],
'=value;');
}else if(variant==="reset"){if(!config.inheritable){code.push('old=this.',
this.$$store.user[name],
';');
}code.push('delete this.',
this.$$store.user[name],
';');
code.push('if(this.',
this.$$store.theme[name],
'!==undefined)');
code.push('computed=this.',
this.$$store.theme[name],
';');
code.push('else if(this.',
this.$$store.init[name],
'!==undefined){');
code.push('computed=this.',
this.$$store.init[name],
';');
code.push('this.',
this.$$store.useinit[name],
'=true;');
code.push('}');
}else{if(config.inheritable){code.push('computed=this.',
this.$$store.user[name],
';');
}else{code.push('old=computed=this.',
this.$$store.user[name],
';');
}if(variant==="style"){code.push('this.',
this.$$store.theme[name],
'=value;');
}else if(variant==="unstyle"){code.push('delete this.',
this.$$store.theme[name],
';');
}else if(variant==="init"&&incomingValue){code.push('this.',
this.$$store.init[name],
'=value;');
}}code.push('}');
if(config.themeable){code.push('else if(this.',
this.$$store.theme[name],
'!==undefined){');
if(!config.inheritable){code.push('old=this.',
this.$$store.theme[name],
';');
}
if(variant==="set"){code.push('computed=this.',
this.$$store.user[name],
'=value;');
}else if(variant==="style"){code.push('computed=this.',
this.$$store.theme[name],
'=value;');
}else if(variant==="unstyle"){code.push('delete this.',
this.$$store.theme[name],
';');
code.push('if(this.',
this.$$store.init[name],
'!==undefined){');
code.push('computed=this.',
this.$$store.init[name],
';');
code.push('this.',
this.$$store.useinit[name],
'=true;');
code.push('}');
}else if(variant==="init"){if(incomingValue){code.push('this.',
this.$$store.init[name],
'=value;');
}code.push('computed=this.',
this.$$store.theme[name],
';');
}else if(variant==="refresh"){code.push('computed=this.',
this.$$store.theme[name],
';');
}code.push('}');
}code.push('else if(this.',
this.$$store.useinit[name],
'){');
if(!config.inheritable){code.push('old=this.',
this.$$store.init[name],
';');
}
if(variant==="init"){if(incomingValue){code.push('computed=this.',
this.$$store.init[name],
'=value;');
}else{code.push('computed=this.',
this.$$store.init[name],
';');
}}else if(variant==="set"||variant==="style"||variant==="refresh"){code.push('delete this.',
this.$$store.useinit[name],
';');
if(variant==="set"){code.push('computed=this.',
this.$$store.user[name],
'=value;');
}else if(variant==="style"){code.push('computed=this.',
this.$$store.theme[name],
'=value;');
}else if(variant==="refresh"){code.push('computed=this.',
this.$$store.init[name],
';');
}}code.push('}');
if(variant==="set"||variant==="style"||variant==="init"){code.push('else{');
if(variant==="set"){code.push('computed=this.',
this.$$store.user[name],
'=value;');
}else if(variant==="style"){code.push('computed=this.',
this.$$store.theme[name],
'=value;');
}else if(variant==="init"){if(incomingValue){code.push('computed=this.',
this.$$store.init[name],
'=value;');
}else{code.push('computed=this.',
this.$$store.init[name],
';');
}code.push('this.',
this.$$store.useinit[name],
'=true;');
}code.push('}');
}}
if(config.inheritable){code.push('if(computed===undefined||computed===inherit){');
if(variant==="refresh"){code.push('computed=value;');
}else{code.push('var pa=this.getParent();if(pa)computed=pa.',
this.$$store.inherit[name],
';');
}code.push('if((computed===undefined||computed===inherit)&&');
code.push('this.',
this.$$store.init[name],
'!==undefined&&');
code.push('this.',
this.$$store.init[name],
'!==inherit){');
code.push('computed=this.',
this.$$store.init[name],
';');
code.push('this.',
this.$$store.useinit[name],
'=true;');
code.push('}else{');
code.push('delete this.',
this.$$store.useinit[name],
';}');
code.push('}');
code.push('if(old===computed)return value;');
code.push('if(computed===inherit){');
code.push('computed=undefined;delete this.',
this.$$store.inherit[name],
';');
code.push('}');
code.push('else if(computed===undefined)');
code.push('delete this.',
this.$$store.inherit[name],
';');
code.push('else this.',
this.$$store.inherit[name],
'=computed;');
code.push('var backup=computed;');
code.push('if(computed===undefined)computed=null;');
code.push('if(old===undefined)old=null;');
}else if(hasCallback){if(variant!=="set"&&variant!=="style"){code.push('if(computed===undefined)computed=null;');
}code.push('if(old===computed)return value;');
code.push('if(old===undefined)old=null;');
}if(hasCallback){if(config.apply){code.push('this.',
config.apply,
'(computed, old);');
}if(config.event){code.push('this.createDispatchChangeEvent("',
config.event,
'", computed, old);');
}if(config.inheritable&&members.getChildren){code.push('var a=this.getChildren();if(a)for(var i=0,l=a.length;i<l;i++){');
code.push('if(a[i].',
this.$$method.refresh[name],
')a[i].',
this.$$method.refresh[name],
'(backup);');
code.push('}');
}}if(incomingValue){code.push('return value;');
}return this.__unwrapFunctionFromCode(instance,
members,
name,
variant,
code,
args);
}},
settings:{"qx.propertyDebugLevel":0}});




/* ID: qx.lang.String */
qx.Class.define("qx.lang.String",
{statics:{toCamelCase:function(string){return string.replace(/\-([a-z])/g,
function(match,
chr){return chr.toUpperCase();
});
},
trimLeft:function(str){return str.replace(/^\s+/,
"");
},
trimRight:function(str){return str.replace(/\s+$/,
"");
},
trim:function(str){return str.replace(/^\s+|\s+$/g,
"");
},
startsWith:function(fullstr,
substr){return !fullstr.indexOf(substr);
},
startsWithAlternate:function(fullstr,
substr){return fullstr.substring(0,
substr.length)===substr;
},
endsWith:function(fullstr,
substr){return fullstr.lastIndexOf(substr)===fullstr.length-substr.length;
},
endsWithAlternate:function(fullstr,
substr){return fullstr.substring(fullstr.length-substr.length,
fullstr.length)===substr;
},
pad:function(str,
length,
ch,
addRight){if(typeof ch==="undefined"){ch="0";
}var temp="";
for(var i=str.length;i<length;i++){temp+=ch;
}
if(addRight==true){return str+temp;
}else{return temp+str;
}},
toFirstUp:function(str){return str.charAt(0).toUpperCase()+str.substr(1);
},
toFirstLower:function(str){return str.charAt(0).toLowerCase()+str.substr(1);
},
addListItem:function(str,
item,
sep){if(str==item||str==""){return item;
}
if(sep==null){sep=",";
}var a=str.split(sep);
if(a.indexOf(item)==-1){a.push(item);
return a.join(sep);
}else{return str;
}},
removeListItem:function(str,
item,
sep){if(str==item||str==""){return "";
}else{if(sep==null){sep=",";
}var a=str.split(sep);
var p=a.indexOf(item);
if(p===-1){return str;
}
do{a.splice(p,
1);
}while((p=a.indexOf(item))!=-1);
return a.join(sep);
}},
contains:function(str,
substring){return str.indexOf(substring)!=-1;
},
format:function(pattern,
args){var str=pattern;
for(var i=0;i<args.length;i++){str=str.replace(new RegExp("%"+(i+1),
"g"),
args[i]);
}return str;
},
escapeRegexpChars:function(str){return str.replace(/([\\\.\(\)\[\]\{\}\^\$\?\+\*])/g,
"\\$1");
},
toArray:function(str){return str.split(/\B|\b/g);
}}});




/* ID: qx.core.Object */
qx.Class.define("qx.core.Object",
{extend:Object,
include:[qx.locale.MTranslation,
qx.log.MLogging,
qx.core.MUserData],
construct:function(){this._hashCode=qx.core.Object.__availableHashCode++;
if(this._autoDispose){this.__dbKey=qx.core.Object.__db.length;
qx.core.Object.__db.push(this);
}},
statics:{__availableHashCode:0,
__db:[],
__disposeAll:false,
$$type:"Object",
toHashCode:function(obj){if(obj._hashCode!=null){return obj._hashCode;
}return obj._hashCode=this.__availableHashCode++;
},
getDb:function(){return this.__db;
},
dispose:function(unload){if(this.__disposed){return;
}this.__disposed=true;
this.__unload=unload||false;
{if(!unload&&qx.core.Setting.get("qx.disposerDebugLevel")>=1){var disposeStart=new Date;
qx.core.Log.debug("Disposing qooxdoo application...");
}};
var vObject,
vObjectDb=this.__db;
for(var i=vObjectDb.length-1;i>=0;i--){vObject=vObjectDb[i];
if(vObject&&vObject.__disposed===false){try{vObject.dispose();
}catch(ex){{qx.core.Log.warn("Could not dispose: "+vObject+": ",
ex);
};
}}}{if(!unload&&qx.core.Setting.get("qx.disposerDebugLevel")>=1){var elems=document.all?document.all:document.getElementsByTagName("*");
qx.core.Log.debug("Checking "+elems.length+" elements for object references...");
for(var i=0,
l=elems.length;i<l;i++){var elem=elems[i];
for(var key in elem){try{if(typeof elem[key]=="object"){if(elem[key] instanceof qx.core.Object||elem[key] instanceof Array){var name="unknown object";
if(elem[key] instanceof qx.core.Object){name=elem[key].classname+"["+elem[key].toHashCode()+"]";
}qx.core.Log.debug("Attribute '"+key+"' references "+name+" in DOM element: "+elem.tagName);
}}}catch(ex){}}}qx.core.Log.debug("Disposing done in "+(new Date()-disposeStart)+"ms");
}};
},
inGlobalDispose:function(){return this.__disposed||false;
},
isPageUnload:function(){return this.__unload||false;
}},
members:{_autoDispose:true,
toHashCode:function(){return this._hashCode;
},
toString:function(){if(this.classname){return "[object "+this.classname+"]";
}return "[object Object]";
},
base:function(args,
varags){if(arguments.length===1){return args.callee.base.call(this);
}else{return args.callee.base.apply(this,
Array.prototype.slice.call(arguments,
1));
}},
self:function(args){return args.callee.self;
},
getDbKey:function(){return this.__dbKey;
},
set:function(data,
value){var setter=qx.core.Property.$$method.set;
if(typeof data==="string"){{if(!this[setter[data]]){this.warn("No such property: "+data);
return;
}};
return this[setter[data]](value);
}else{for(var prop in data){{if(!this[setter[prop]]){this.warn("No such property: "+prop);
continue;
}};
this[setter[prop]](data[prop]);
}return this;
}},
get:function(prop){var getter=qx.core.Property.$$method.get;
{if(!this[getter[prop]]){this.warn("No such property: "+prop);
return;
}};
return this[getter[prop]]();
},
reset:function(prop){var resetter=qx.core.Property.$$method.reset;
{if(!this[resetter[prop]]){this.warn("No such property: "+prop);
return;
}};
this[resetter[prop]]();
},
__disposed:false,
getDisposed:function(){return this.__disposed;
},
isDisposed:function(){return this.__disposed;
},
dispose:function(){if(this.__disposed){return;
}this.__disposed=true;
{if(qx.core.Setting.get("qx.disposerDebugLevel")>1){qx.core.Log.debug("Disposing "+this.classname+"["+this.toHashCode()+"]");
}};
var clazz=this.constructor;
var mixins;
while(clazz.superclass){if(clazz.$$destructor){clazz.$$destructor.call(this);
}if(clazz.$$includes){mixins=clazz.$$flatIncludes;
for(var i=0,
l=mixins.length;i<l;i++){if(mixins[i].$$destructor){mixins[i].$$destructor.call(this);
}}}clazz=clazz.superclass;
}{if(!qx.core.Object.isPageUnload()){if(qx.core.Setting.get("qx.disposerDebugLevel")>0){var vValue;
for(var vKey in this){vValue=this[vKey];
if(vValue!==null&&typeof vValue==="object"){if(this.constructor.prototype[vKey]!=null){continue;
}if(qx.Class.getByName(vValue.name)==vValue||qx.Interface.getByName(vValue.name)==vValue||qx.Mixin.getByName(vValue.name)==vValue||qx.Theme.getByName(vValue.name)==vValue){continue;
}qx.core.Log.warn("Missing destruct definition for '"+vKey+"' in "+this.classname+"["+this.toHashCode()+"]: "+vValue);
delete this[vKey];
}}}}};
},
_disposeFields:function(varargs){var name;
for(var i=0,
l=arguments.length;i<l;i++){var name=arguments[i];
if(this[name]==null){continue;
}
if(!this.hasOwnProperty(name)){{if(qx.core.Setting.get("qx.disposerDebugLevel")>1){qx.core.Log.debug(this.classname+" has no own field "+name);
}};
continue;
}this[name]=null;
}},
_disposeObjects:function(varargs){var name;
for(var i=0,
l=arguments.length;i<l;i++){var name=arguments[i];
if(this[name]==null){continue;
}
if(!this.hasOwnProperty(name)){{if(qx.core.Setting.get("qx.disposerDebugLevel")>1){qx.core.Log.debug(this.classname+" has no own field "+name);
}};
continue;
}
if(!this[name].dispose){throw new Error(this.classname+" has no own object "+name);
}this[name].dispose();
this[name]=null;
}},
_disposeObjectDeep:function(name,
deep){var name;
if(this[name]==null){return;
}
if(!this.hasOwnProperty(name)){{if(qx.core.Setting.get("qx.disposerDebugLevel")>1){qx.core.Log.debug(this.classname+" has no own field "+name);
}};
return;
}{if(qx.core.Setting.get("qx.disposerDebugLevel")>2){qx.core.Log.debug("Dispose Deep: "+name);
}};
this.__disposeObjectsDeepRecurser(this[name],
deep||0);
this[name]=null;
},
__disposeObjectsDeepRecurser:function(obj,
deep){if(obj instanceof qx.core.Object){{if(qx.core.Setting.get("qx.disposerDebugLevel")>3){qx.core.Log.debug("Sending dispose to "+obj.classname);
}};
obj.dispose();
}else if(obj instanceof Array){for(var i=0,
l=obj.length;i<l;i++){var entry=obj[i];
if(entry==null){continue;
}
if(typeof entry=="object"){if(deep>0){{if(qx.core.Setting.get("qx.disposerDebugLevel")>3){qx.core.Log.debug("- Deep processing item '"+i+"'");
}};
this.__disposeObjectsDeepRecurser(entry,
deep-1);
}{if(qx.core.Setting.get("qx.disposerDebugLevel")>3){qx.core.Log.debug("- Resetting key (object) '"+key+"'");
}};
obj[i]=null;
}else if(typeof entry=="function"){{if(qx.core.Setting.get("qx.disposerDebugLevel")>3){qx.core.Log.debug("- Resetting key (function) '"+key+"'");
}};
obj[i]=null;
}}}else if(obj instanceof Object){for(var key in obj){if(obj[key]==null||!obj.hasOwnProperty(key)){continue;
}var entry=obj[key];
if(typeof entry=="object"){if(deep>0){{if(qx.core.Setting.get("qx.disposerDebugLevel")>3){qx.core.Log.debug("- Deep processing key '"+key+"'");
}};
this.__disposeObjectsDeepRecurser(entry,
deep-1);
}{if(qx.core.Setting.get("qx.disposerDebugLevel")>3){qx.core.Log.debug("- Resetting key (object) '"+key+"'");
}};
obj[key]=null;
}else if(typeof entry=="function"){{if(qx.core.Setting.get("qx.disposerDebugLevel")>3){qx.core.Log.debug("- Resetting key (function) '"+key+"'");
}};
obj[key]=null;
}}}}},
settings:{"qx.disposerDebugLevel":0},
destruct:function(){var clazz=this.constructor;
var properties;
var store=qx.core.Property.$$store;
var storeUser=store.user;
var storeTheme=store.theme;
var storeInherit=store.inherit;
var storeUseinit=store.useinit;
var storeInit=store.init;
while(clazz){properties=clazz.$$properties;
if(properties){for(var name in properties){if(properties[name].dispose){this[storeUser[name]]=this[storeTheme[name]]=this[storeInherit[name]]=this[storeUseinit[name]]=this[storeInit[name]]=undefined;
}}}clazz=clazz.superclass;
}if(this.__dbKey!=null){if(qx.core.Object.__disposeAll){qx.core.Object.__db[this.__dbKey]=null;
}else{delete qx.core.Object.__db[this.__dbKey];
}}}});




/* ID: qx.core.Log */
qx.Class.define("qx.core.Log",
{statics:{log:function(varargs){this._logFormatted(arguments,
"");
},
debug:function(varargs){this._logFormatted(arguments,
"debug");
},
info:function(varargs){this._logFormatted(arguments,
"info");
},
warn:function(varargs){this._logFormatted(arguments,
"warn");
},
error:function(varargs){this._logFormatted(arguments,
"error");
},
assert:function(truth,
message,
varargs){if(!truth){var args=[];
for(var i=1;i<arguments.length;++i)args.push(arguments[i]);
this._logFormatted(args.length?args:["Assertion Failure"],
"error");
throw message?message:"Assertion Failure";
}},
dir:function(object){var html=[];
var pairs=[];
for(var name in object){try{pairs.push([name,
object[name]]);
}catch(exc){}}pairs.sort(function(a,
b){return a[0]<b[0]?-1:1;
});
html.push('<table>');
for(var i=0;i<pairs.length;++i){var name=pairs[i][0],
value=pairs[i][1];
html.push('<tr>',
'<td class="propertyNameCell"><span class="propertyName">',
this._escapeHTML(name),
'</span></td>',
'<td><span class="propertyValue">');
this._appendObject(value,
html);
html.push('</span></td></tr>');
}html.push('</table>');
this._logRow(html,
"dir");
},
dirxml:function(node){var html=[];
this._appendNode(node,
html);
this._logRow(html,
"dirxml");
},
time:function(name){this._timeMap[name]=(new Date()).getTime();
},
timeEnd:function(name){if(name in this._timeMap){var delta=(new Date()).getTime()-this._timeMap[name];
this._logFormatted([name+":",
delta+"ms"]);
delete this._timeMap[name];
}},
clear:function(){this._consoleLog.innerHTML="";
},
trace:function(){if(qx.dev&&qx.dev.StackTrace){var trace=qx.dev.StackTrace.getStackTrace();
this.debug("Current stack trace: ");
for(var i=1,
l=trace.length;i<l;i++){this.debug("  - "+trace[i]);
}}else{this.warn("Stacktraces are not support by your build!");
}},
_consoleLog:null,
_commandLine:null,
_messageQueue:[],
_timeMap:{},
_clPrefix:">>> ",
_consoleShortcuts:{log:"qx.core.Log.log",
info:"qx.core.Log.info",
debug:"qx.core.Log.debug",
warn:"qx.core.Log.warn",
error:"qx.core.Log.error",
assert:"qx.core.Log.assert",
dir:"qx.core.Log.dir",
dirxml:"qx.core.Log.dirxml",
time:"qx.core.Log.time",
timeEnd:"qx.core.Log.timeEnd",
clear:"qx.core.Log.clear"},
_focusCommandLine:function(){if(this._commandLine){this._commandLine.focus();
}},
_initializeWindow:function(){if(this._consoleWindow){return;
}if(qx.core.Setting){var file=qx.core.Setting.get("qx.resourceUri")+"/static/log/log.html";
this._consoleWindow=window.open(file,
"win",
"width=500,height=250,dependent=yes,resizable=yes,status=no,location=no,menubar=no,toolbar=no,scrollbars=no");
}},
_onLogReady:function(win){var doc=win.document;
this._consoleWindow=win;
this._consoleDocument=doc;
this._consoleLog=doc.getElementById("log");
this._commandLine=doc.getElementById("commandLine");
this._onUnloadWrapped=qx.lang.Function.bind(this._onUnload,
this);
this._onResizeWrapped=qx.lang.Function.bind(this._onResize,
this);
this._onCommandLineKeyDownWrapped=qx.lang.Function.bind(this._onCommandLineKeyDown,
this);
this._addEvent(window,
"unload",
this._onUnloadWrapped);
this._addEvent(win,
"unload",
this._onUnloadWrapped);
this._addEvent(win,
"resize",
this._onResizeWrapped);
this._addEvent(this._commandLine,
"keydown",
this._onCommandLineKeyDownWrapped);
this._syncLayout();
this._flush();
},
_syncLayout:function(){this._consoleLog.style.height=(qx.bom.Viewport.getHeight(this._consoleWindow)-42)+"px";
},
_evalCommandLine:function(){var text=this._commandLine.value;
this._commandLine.value="";
this._logRow([this._clPrefix,
text],
"command");
var search=/^([a-z]+)\(/;
var result=search.exec(text);
if(result!=null){if(this._consoleShortcuts[result[1]]){text=this._consoleShortcuts[result[1]]+text.substring(result[1].length);
}}var value;
try{value=eval(text);
}catch(ex){this.error(ex);
}
if(value!==undefined){this.log(value);
}},
_logRow:function(message,
className){if(this._consoleLog){this._writeMessage(message,
className);
}else{this._messageQueue.push([message,
className]);
this._initializeWindow();
}},
_flush:function(){var queue=this._messageQueue;
this._messageQueue=[];
for(var i=0;i<queue.length;++i){this._writeMessage(queue[i][0],
queue[i][1]);
}},
_writeMessage:function(message,
className){var isScrolledToBottom=this._consoleLog.scrollTop+this._consoleLog.offsetHeight>=this._consoleLog.scrollHeight;
this._writeRow(message,
className);
if(isScrolledToBottom){this._consoleLog.scrollTop=this._consoleLog.scrollHeight-this._consoleLog.offsetHeight;
}},
_appendRow:function(row){this._consoleLog.appendChild(row);
},
_writeRow:function(message,
className){var row=this._consoleLog.ownerDocument.createElement("div");
row.className="logRow"+(className?" logRow-"+className:"");
row.innerHTML=message.join("");
this._appendRow(row);
},
_logFormatted:function(objects,
className){if(window.__firebug__&&window.console){return window.console[className].apply(window.console,
objects);
}var html=[];
var format=objects[0];
var objIndex=0;
if(typeof (format)!="string"){format="";
objIndex=-1;
}var parts=this._parseFormat(format);
for(var i=0;i<parts.length;++i){var part=parts[i];
if(part&&typeof (part)=="object"){var object=objects[++objIndex];
part.appender(object,
html);
}else this._appendText(part,
html);
}
for(var i=objIndex+1;i<objects.length;++i){this._appendText(" ",
html);
var object=objects[i];
if(typeof (object)=="string")this._appendText(object,
html);
else this._appendObject(object,
html);
}this._logRow(html,
className);
},
_parseFormat:function(format){var parts=[];
var reg=/((^%|[^\\]%)(\d+)?(\.)([a-zA-Z]))|((^%|[^\\]%)([a-zA-Z]))/;
var appenderMap={s:this._appendText,
d:this._appendInteger,
i:this._appendInteger,
f:this._appendFloat};
for(var m=reg.exec(format);m;m=reg.exec(format)){var type=m[8]?m[8]:m[5];
var appender=type in appenderMap?appenderMap[type]:this._appendObject;
var precision=m[3]?parseInt(m[3]):(m[4]=="."?-1:0);
parts.push(format.substr(0,
m[0][0]=="%"?m.index:m.index+1));
parts.push({appender:appender,
precision:precision});
format=format.substr(m.index+m[0].length);
}parts.push(format);
return parts;
},
_escapeHTML:function(value){function replaceChars(ch){switch(ch){case "<":return "&lt;";
case ">":return "&gt;";
case "&":return "&amp;";
case "'":return "&#39;";
case '"':return "&quot;";
}return "?";
}return String(value).replace(/[<>&"']/g,
replaceChars);
},
_objectToString:function(object){try{return object+"";
}catch(exc){return null;
}},
_appendText:function(object,
html){html.push(this._escapeHTML(this._objectToString(object)));
},
_appendNull:function(object,
html){html.push('<span class="objectBox-null">',
this._escapeHTML(this._objectToString(object)),
'</span>');
},
_appendString:function(object,
html){html.push('<span class="objectBox-string">&quot;',
this._escapeHTML(this._objectToString(object)),
'&quot;</span>');
},
_appendInteger:function(object,
html){html.push('<span class="objectBox-number">',
this._escapeHTML(this._objectToString(object)),
'</span>');
},
_appendFloat:function(object,
html){html.push('<span class="objectBox-number">',
this._escapeHTML(this._objectToString(object)),
'</span>');
},
_appendFunction:function(object,
html){var reName=/function ?(.*?)\(/;
var m=reName.exec(this._objectToString(object));
var name=m?m[1]:"function";
html.push('<span class="objectBox-function">',
this._escapeHTML(name),
'()</span>');
},
_appendObject:function(object,
html){try{if(object==undefined)this._appendNull("undefined",
html);
else if(object==null)this._appendNull("null",
html);
else if(typeof object=="string")this._appendString(object,
html);
else if(typeof object=="number")this._appendInteger(object,
html);
else if(object.toString)this._appendText(object.toString(),
html);
else if(typeof object=="function")this._appendFunction(object,
html);
else if(object.nodeType==1)this._appendSelector(object,
html);
else if(typeof object=="object")this._appendObjectFormatted(object,
html);
else this._appendText(object,
html);
}catch(exc){}},
_appendObjectFormatted:function(object,
html){var text=this._objectToString(object);
var reObject=/\[object (.*?)\]/;
var m=reObject.exec(text);
html.push('<span class="objectBox-object">',
m?m[1]:text,
'</span>');
},
_appendSelector:function(object,
html){html.push('<span class="objectBox-selector">');
html.push('<span class="selectorTag">',
this._escapeHTML(object.nodeName.toLowerCase()),
'</span>');
if(object.id)html.push('<span class="selectorId">#',
this._escapeHTML(object.id),
'</span>');
if(object.className)html.push('<span class="selectorClass">.',
this._escapeHTML(object.className),
'</span>');
html.push('</span>');
},
_appendNode:function(node,
html){if(node.nodeType==1){html.push('<div class="objectBox-element">',
'&lt;<span class="nodeTag">',
node.nodeName.toLowerCase(),
'</span>');
for(var i=0;i<node.attributes.length;++i){var attr=node.attributes[i];
if(!attr.specified)continue;
html.push('&nbsp;<span class="nodeName">',
attr.nodeName.toLowerCase(),
'</span>=&quot;<span class="nodeValue">',
this._escapeHTML(attr.nodeValue),
'</span>&quot;');
}
if(node.firstChild){html.push('&gt;</div><div class="nodeChildren">');
for(var child=node.firstChild;child;child=child.nextSibling)this._appendNode(child,
html);
html.push('</div><div class="objectBox-element">&lt;/<span class="nodeTag">',
node.nodeName.toLowerCase(),
'&gt;</span></div>');
}else html.push('/&gt;</div>');
}else if(node.nodeType==3){html.push('<div class="nodeText">',
this._escapeHTML(node.nodeValue),
'</div>');
}},
_addEvent:function(object,
name,
handler){if(document.all)object.attachEvent("on"+name,
handler);
else object.addEventListener(name,
handler,
false);
},
_removeEvent:function(object,
name,
handler){if(document.all)object.detachEvent("on"+name,
handler);
else object.removeEventListener(name,
handler,
false);
},
_cancelEvent:function(event){if(document.all)event.cancelBubble=true;
else event.stopPropagation();
},
_onCommandLineKeyDown:function(event){if(event.keyCode==13)this._evalCommandLine();
else if(event.keyCode==27)this._commandLine.value="";
},
_onResize:function(event){this._syncLayout();
},
_onUnload:function(event){var win=this._consoleWindow;
var cmd=this._commandLine;
this._consoleWindow=null;
this._consoleDocument=null;
this._consoleLog=null;
this._commandLine=null;
this._removeEvent(window,
"unload",
this._onUnloadWrapped);
if(win){try{win.close();
}catch(ex){}this._removeEvent(win,
"unload",
this._onUnloadWrapped);
this._removeEvent(win,
"resize",
this._onResizeWrapped);
}
if(cmd){this._removeEvent(cmd,
"keydown",
this._onCommandLineKeyDownWrapped);
}}}});




/* ID: qx.lang.Function */
qx.Class.define("qx.lang.Function",
{statics:{globalEval:function(data){if(window.execScript){window.execScript(data);
}else{eval.call(window,
data);
}},
returnTrue:function(){return true;
},
returnFalse:function(){return false;
},
returnNull:function(){return null;
},
returnThis:function(){return this;
},
returnInstance:function(){if(!this._instance){this._instance=new this;
}return this._instance;
},
returnZero:function(){return 0;
},
returnNegativeIndex:function(){return -1;
},
bind:function(fcn,
self,
varargs){{if(typeof fcn!=="function"){throw new Error("First parameter to bind() needs to be of type function!");
}
if(typeof self!=="object"){throw new Error("Second parameter to bind() needs to be of type object!");
}};
if(arguments.length>2){var args=Array.prototype.slice.call(arguments,
2);
var wrap=function(){fcn.context=self;
var ret=fcn.apply(self,
args.concat(qx.lang.Array.fromArguments(arguments)));
fcn.context=null;
return ret;
};
}else{var wrap=function(){fcn.context=self;
var ret=fcn.apply(self,
arguments);
fcn.context=null;
return ret;
};
}wrap.self=fcn.self?fcn.self.constructor:self;
return wrap;
},
bindEvent:function(fcn,
self){{if(typeof fcn!=="function"){throw new Error("First parameter to bindEvent() needs to be of type function!");
}
if(typeof self!=="object"){throw new Error("Second parameter to bindEvent() needs to be of type object!");
}};
var wrap=function(event){fcn.context=self;
var ret=fcn.call(self,
event||window.event);
fcn.context=null;
return ret;
};
wrap.self=fcn.self?fcn.self.constructor:self;
return wrap;
},
getCaller:function(args){return args.caller?args.caller.callee:args.callee.caller;
}}});




/* ID: qx.bom.Viewport */
qx.Class.define("qx.bom.Viewport",
{statics:{getWidth:qx.core.Variant.select("qx.client",
{"opera":function(win){return (win||window).document.body.clientWidth;
},
"webkit":function(win){return (win||window).innerWidth;
},
"default":function(win){var doc=(win||window).document;
return doc.compatMode==="CSS1Compat"?doc.documentElement.clientWidth:doc.body.clientWidth;
}}),
getHeight:qx.core.Variant.select("qx.client",
{"opera":function(win){return (win||window).document.body.clientHeight;
},
"webkit":function(win){return (win||window).innerHeight;
},
"default":function(win){var doc=(win||window).document;
return doc.compatMode==="CSS1Compat"?doc.documentElement.clientHeight:doc.body.clientHeight;
}}),
getScrollLeft:qx.core.Variant.select("qx.client",
{"mshtml":function(win){var doc=(win||window).document;
return doc.documentElement.scrollLeft||doc.body.scrollLeft;
},
"default":function(win){return (win||window).pageXOffset;
}}),
getScrollTop:qx.core.Variant.select("qx.client",
{"mshtml":function(win){var doc=(win||window).document;
return doc.documentElement.scrollTop||doc.body.scrollTop;
},
"default":function(win){return (win||window).pageYOffset;
}})}});




/* ID: qx.Theme */
qx.Class.define("qx.Theme",
{statics:{define:function(name,
config){if(!config){var config={};
}
if(config.include&&!(config.include instanceof Array)){config.include=[config.include];
}{this.__validateConfig(name,
config);
};
var theme={$$type:"Theme",
name:name,
title:config.title,
toString:this.genericToString};
if(config.extend){theme.supertheme=config.extend;
}theme.basename=qx.Class.createNamespace(name,
theme);
this.__convert(theme,
config);
this.__registry[name]=theme;
if(config.include){for(var i=0,
a=config.include,
l=a.length;i<l;i++){this.include(theme,
a[i]);
}}},
getAll:function(){return this.__registry;
},
getByName:function(name){return this.__registry[name];
},
isDefined:function(name){return this.getByName(name)!==undefined;
},
getTotalNumber:function(){return qx.lang.Object.getLength(this.__registry);
},
genericToString:function(){return "[Theme "+this.name+"]";
},
__extractType:function(config){for(var i=0,
keys=this.__inheritableKeys,
l=keys.length;i<l;i++){if(config[keys[i]]){return keys[i];
}}},
__convert:function(theme,
config){var type=this.__extractType(config);
if(config.extend&&!type){type=config.extend.type;
}theme.type=type||"other";
if(!type){return;
}var clazz=function(){};
if(config.extend){clazz.prototype=new config.extend.$$clazz;
}var target=clazz.prototype;
var source=config[type];
for(var id in source){target[id]=source[id];
if(target[id].base){{if(!config.extend){throw new Error("Found base flag in entry '"+id+"' of theme '"+config.name+"'. Base flags are not allowed for themes without a valid super theme!");
}};
target[id].base=config.extend;
}}theme.$$clazz=clazz;
theme[type]=new clazz;
},
__registry:{},
__inheritableKeys:["colors",
"borders",
"fonts",
"icons",
"widgets",
"appearances",
"meta"],
__allowedKeys:{"title":"string",
"type":"string",
"extend":"object",
"colors":"object",
"borders":"object",
"fonts":"object",
"icons":"object",
"widgets":"object",
"appearances":"object",
"meta":"object",
"include":"object"},
__metaKeys:{"color":"object",
"border":"object",
"font":"object",
"widget":"object",
"icon":"object",
"appearance":"object"},
__validateConfig:function(name,
config){var allowed=this.__allowedKeys;
for(var key in config){if(allowed[key]===undefined){throw new Error('The configuration key "'+key+'" in theme "'+name+'" is not allowed!');
}
if(config[key]==null){throw new Error('Invalid key "'+key+'" in theme "'+name+'"! The value is undefined/null!');
}
if(allowed[key]!==null&&typeof config[key]!==allowed[key]){throw new Error('Invalid type of key "'+key+'" in theme "'+name+'"! The type of the key must be "'+allowed[key]+'"!');
}}if(config.title===undefined){throw new Error("Missing title definition in theme: "+name);
}var maps=["colors",
"borders",
"fonts",
"icons",
"widgets",
"appearances",
"meta"];
for(var i=0,
l=maps.length;i<l;i++){var key=maps[i];
if(config[key]!==undefined&&(config[key] instanceof Array||config[key] instanceof RegExp||config[key] instanceof Date||config[key].classname!==undefined)){throw new Error('Invalid key "'+key+'" in theme "'+name+'"! The value needs to be a map!');
}}var counter=0;
for(var i=0,
l=maps.length;i<l;i++){var key=maps[i];
if(config[key]){counter++;
}
if(counter>1){throw new Error("You can only define one theme category per file! Invalid theme: "+name);
}}if(!config.extend&&counter===0){throw new Error("You must define at least one entry in your theme configuration :"+name);
}if(config.meta){var value;
for(var key in config.meta){value=config.meta[key];
if(this.__metaKeys[key]===undefined){throw new Error('The key "'+key+'" is not allowed inside a meta theme block.');
}
if(typeof value!==this.__metaKeys[key]){throw new Error('The type of the key "'+key+'" inside the meta block is wrong.');
}
if(!(typeof value==="object"&&value!==null&&value.$$type==="Theme")){throw new Error('The content of a meta theme must reference to other themes. The value for "'+key+'" in theme "'+name+'" is invalid: '+value);
}}}if(config.extend&&config.extend.$$type!=="Theme"){throw new Error('Invalid extend in theme "'+name+'": '+config.extend);
}},
patch:function(theme,
mixinTheme){var type=this.__extractType(mixinTheme);
if(type!==this.__extractType(theme)){throw new Error("The mixins '"+theme.name+"' are not compatible '"+mixinTheme.name+"'!");
}var source=mixinTheme[type];
var target=theme[type];
for(var key in source){target[key]=source[key];
}},
include:function(theme,
mixinTheme){var type=mixinTheme.type;
if(type!==theme.type){throw new Error("The mixins '"+theme.name+"' are not compatible '"+mixinTheme.name+"'!");
}var source=mixinTheme[type];
var target=theme[type];
for(var key in source){if(target[key]!==undefined){throw new Error("It is not allowed to overwrite the key '"+key+"' of theme '"+theme.name+"' by mixin theme '"+mixinTheme.name+"'.");
}target[key]=source[key];
}}}});




/* ID: qx.core.Target */
qx.Class.define("qx.core.Target",
{extend:qx.core.Object,
construct:function(){this.base(arguments);
},
members:{addEventListener:function(type,
func,
obj){if(this.getDisposed()){return;
}{if(typeof type!=="string"){this.warn("addEventListener("+type+"): '"+type+"' is not a string!");
return;
}
if(typeof func!=="function"){this.warn("addEventListener("+type+"): '"+func+"' is not a function!");
return;
}if(this.constructor.classname&&!qx.Class.supportsEvent(this.constructor,
type)){this.warn("Objects of class '"+this.constructor.classname+"' does not support the event '"+type+"'",
new Error());
}};
if(this.__listeners===undefined){this.__listeners={};
}
if(this.__listeners[type]===undefined){this.__listeners[type]={};
}var key="event"+qx.core.Object.toHashCode(func)+(obj?"$"+qx.core.Object.toHashCode(obj):"");
this.__listeners[type][key]={handler:func,
object:obj};
},
removeEventListener:function(type,
func,
obj){if(this.getDisposed()){return;
}var listeners=this.__listeners;
if(!listeners||listeners[type]===undefined){return;
}
if(typeof func!=="function"){throw new Error("qx.core.Target: removeEventListener("+type+"): '"+func+"' is not a function!");
}var key="event"+qx.core.Object.toHashCode(func)+(obj?"$"+qx.core.Object.toHashCode(obj):"");
delete this.__listeners[type][key];
},
hasEventListeners:function(type){return this.__listeners&&this.__listeners[type]!==undefined&&!qx.lang.Object.isEmpty(this.__listeners[type]);
},
createDispatchEvent:function(type){if(this.hasEventListeners(type)){this.dispatchEvent(new qx.event.type.Event(type),
true);
}},
createDispatchDataEvent:function(type,
data){if(this.hasEventListeners(type)){this.dispatchEvent(new qx.event.type.DataEvent(type,
data),
true);
}},
createDispatchChangeEvent:function(type,
value,
old){if(this.hasEventListeners(type)){this.dispatchEvent(new qx.event.type.ChangeEvent(type,
value,
old),
true);
}},
dispatchEvent:function(evt,
dispose){if(this.getDisposed()){return;
}
if(evt.getTarget()==null){evt.setTarget(this);
}
if(evt.getCurrentTarget()==null){evt.setCurrentTarget(this);
}this._dispatchEvent(evt,
dispose);
var defaultPrevented=evt.getDefaultPrevented();
dispose&&evt.dispose();
return !defaultPrevented;
},
_dispatchEvent:function(evt){var listeners=this.__listeners;
if(listeners){evt.setCurrentTarget(this);
var typeListeners=listeners[evt.getType()];
if(typeListeners){var func,
obj;
for(var vHashCode in typeListeners){func=typeListeners[vHashCode].handler;
obj=typeListeners[vHashCode].object||this;
func.call(obj,
evt);
}}}if(evt.getBubbles()&&!evt.getPropagationStopped()&&typeof (this.getParent)=="function"){var parent=this.getParent();
if(parent&&!parent.getDisposed()&&parent.getEnabled()){parent._dispatchEvent(evt);
}}}},
destruct:function(){this._disposeObjectDeep("__listeners",
2);
}});




/* ID: qx.event.type.Event */
qx.Class.define("qx.event.type.Event",
{extend:qx.core.Object,
construct:function(vType){this.base(arguments);
this.setType(vType);
},
properties:{type:{_fast:true,
setOnlyOnce:true},
originalTarget:{_fast:true,
setOnlyOnce:true},
target:{_fast:true,
setOnlyOnce:true},
relatedTarget:{_fast:true,
setOnlyOnce:true},
currentTarget:{_fast:true},
bubbles:{_fast:true,
defaultValue:false,
noCompute:true},
propagationStopped:{_fast:true,
defaultValue:true,
noCompute:true},
defaultPrevented:{_fast:true,
defaultValue:false,
noCompute:true}},
members:{_autoDispose:false,
preventDefault:function(){this.setDefaultPrevented(true);
},
stopPropagation:function(){this.setPropagationStopped(true);
}},
destruct:function(){this._disposeFields("_valueOriginalTarget",
"_valueTarget",
"_valueRelatedTarget",
"_valueCurrentTarget");
}});




/* ID: qx.event.type.DataEvent */
qx.Class.define("qx.event.type.DataEvent",
{extend:qx.event.type.Event,
construct:function(vType,
vData){this.base(arguments,
vType);
this.setData(vData);
},
properties:{propagationStopped:{_fast:true,
defaultValue:false},
data:{_fast:true}},
destruct:function(){this._disposeFields("_valueData");
}});




/* ID: qx.event.type.ChangeEvent */
qx.Class.define("qx.event.type.ChangeEvent",
{extend:qx.event.type.Event,
construct:function(type,
value,
old){this.base(arguments,
type);
this.setValue(value);
this.setOldValue(old);
},
properties:{value:{_fast:true},
oldValue:{_fast:true}},
members:{getData:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee,
"Use getValue() instead!");
return this.getValue();
}},
destruct:function(){this._disposeFields("_valueValue",
"_valueOldValue");
}});




/* ID: qx.log.Filter */
qx.Class.define("qx.log.Filter",
{extend:qx.core.Object,
type:"abstract",
construct:function(){this.base(arguments);
},
statics:{ACCEPT:1,
DENY:2,
NEUTRAL:3},
members:{decide:function(evt){throw new Error("decide is abstract");
}}});




/* ID: qx.log.DefaultFilter */
qx.Class.define("qx.log.DefaultFilter",
{extend:qx.log.Filter,
construct:function(){this.base(arguments);
},
properties:{enabled:{check:"Boolean",
init:true},
minLevel:{check:"Number",
nullable:true}},
members:{decide:function(evt){var Filter=qx.log.Filter;
if(!this.getEnabled()){return Filter.DENY;
}else if(this.getMinLevel()==null){return Filter.NEUTRAL;
}else{return (evt.level>=this.getMinLevel())?Filter.ACCEPT:Filter.DENY;
}}}});




/* ID: qx.log.LogEventProcessor */
qx.Class.define("qx.log.LogEventProcessor",
{extend:qx.core.Object,
type:"abstract",
construct:function(){this.base(arguments);
},
members:{addFilter:function(filter){if(this._filterArr==null){this._filterArr=[];
}this._filterArr.push(filter);
},
clearFilters:function(){this._filterArr=null;
},
getHeadFilter:function(){return (this._filterArr==null||this._filterArr.length==0)?null:this._filterArr[0];
},
_getDefaultFilter:function(){var headFilter=this.getHeadFilter();
if(!(headFilter instanceof qx.log.DefaultFilter)){this.clearFilters();
headFilter=new qx.log.DefaultFilter();
this.addFilter(headFilter);
}return headFilter;
},
setEnabled:function(enabled){this._getDefaultFilter().setEnabled(enabled);
},
setMinLevel:function(minLevel){this._getDefaultFilter().setMinLevel(minLevel);
},
decideLogEvent:function(evt){var NEUTRAL=qx.log.Filter.NEUTRAL;
if(this._filterArr!=null){for(var i=0;i<this._filterArr.length;i++){var decision=this._filterArr[i].decide(evt);
if(decision!=NEUTRAL){return decision;
}}}return NEUTRAL;
},
handleLogEvent:function(evt){throw new Error("handleLogEvent is abstract");
}},
destruct:function(){this._disposeFields("_filterArr");
}});




/* ID: qx.log.appender.Abstract */
qx.Class.define("qx.log.appender.Abstract",
{extend:qx.log.LogEventProcessor,
type:"abstract",
construct:function(){this.base(arguments);
},
properties:{useLongFormat:{check:"Boolean",
init:true}},
members:{handleLogEvent:function(evt){if(this.decideLogEvent(evt)!=qx.log.Filter.DENY){this.appendLogEvent(evt);
}},
appendLogEvent:function(evt){throw new Error("appendLogEvent is abstract");
},
formatLogEvent:function(evt){var Logger=qx.log.Logger;
var text="";
var time=new String(new Date().getTime()-qx.core.Bootstrap.LOADSTART);
while(time.length<6){time="0"+time;
}text+=time;
if(this.getUseLongFormat()){switch(evt.level){case Logger.LEVEL_DEBUG:text+=" DEBUG: ";
break;
case Logger.LEVEL_INFO:text+=" INFO:  ";
break;
case Logger.LEVEL_WARN:text+=" WARN:  ";
break;
case Logger.LEVEL_ERROR:text+=" ERROR: ";
break;
case Logger.LEVEL_FATAL:text+=" FATAL: ";
break;
}}else{text+=": ";
}var indent="";
for(var i=0;i<evt.indent;i++){indent+="  ";
}text+=indent;
if(this.getUseLongFormat()){text+=evt.logger.getName();
if(evt.instanceId!=null){text+="["+evt.instanceId+"]";
}text+=": ";
}if(typeof evt.message=="string"){text+=evt.message;
}else{var obj=evt.message;
if(obj==null){text+="Object is null";
}else{text+="--- Object: "+obj+" ---\n";
var attrArr=new Array();
try{for(var attr in obj){attrArr.push(attr);
}}catch(exc){text+=indent+"  [not readable: "+exc+"]\n";
}attrArr.sort();
for(var i=0;i<attrArr.length;i++){try{text+=indent+"  "+attrArr[i]+"="+obj[attrArr[i]]+"\n";
}catch(exc){text+=indent+"  "+attrArr[i]+"=[not readable: "+exc+"]\n";
}}text+=indent+"--- End of object ---";
}}if(evt.throwable!=null){var thr=evt.throwable;
if(thr.name==null){text+=": "+thr;
}else{text+=": "+thr.name;
}
if(thr.message!=null){text+=" - "+thr.message;
}
if(thr.number!=null){text+=" (#"+thr.number+")";
}var trace=qx.dev.StackTrace.getStackTraceFromError(thr);
}
if(evt.trace){var trace=evt.trace;
}
if(trace&&trace.length>0){text+="\n";
for(var i=0;i<trace.length;i++){text+="  at "+trace[i]+"\n";
}}return text;
}}});




/* ID: qx.log.appender.Window */
qx.Class.define("qx.log.appender.Window",
{extend:qx.log.appender.Abstract,
construct:function(name){this.base(arguments);
this._id=qx.log.appender.Window.register(this);
this._name=name;
if(this._name==null){var url=window.location.href;
var hash=0;
for(var i=0;i<url.length;i++){hash=(hash+url.charCodeAt(i))%10000000;
}this._name="qx_log_"+hash;
}this._errorsPreventingAutoCloseCount=0;
this._divDataSets=[];
this._filterTextWords=[];
this._filterText="";
},
statics:{_nextId:1,
_registeredAppenders:{},
register:function(appender){var WindowAppender=qx.log.appender.Window;
var id=WindowAppender._nextId++;
WindowAppender._registeredAppenders[id]=appender;
return id;
},
getAppender:function(id){return qx.log.appender.Window._registeredAppenders[id];
}},
properties:{maxMessages:{check:"Integer",
init:500},
popUnder:{check:"Boolean",
init:false},
autoCloseWithErrors:{check:"Boolean",
init:true,
apply:"_applyAutoCloseWithErrors"},
windowWidth:{check:"Integer",
init:600},
windowHeight:{check:"Integer",
init:350},
windowLeft:{check:"Integer",
nullable:true},
windowTop:{check:"Integer",
nullable:true}},
members:{openWindow:function(){if(this._inLogWindowCallback){return;
}this._inLogWindowCallback=true;
if(this._logWindow&&!this._logWindow.closed){return ;
}var winWidth=this.getWindowWidth();
var winHeight=this.getWindowHeight();
var winLeft=this.getWindowLeft();
if(winLeft===null){winLeft=window.screen.width-winWidth;
}var winTop=this.getWindowTop();
if(winTop===null){winTop=window.screen.height-winHeight;
}var params="toolbar=no,scrollbars=no,resizable=yes,"+"width="+winWidth+",height="+winHeight+",left="+winLeft+",top="+winTop;
this._logWindow=window.open("",
this._name,
params);
qx.client.Timer.once(this._openWindowCallback,
this,
200);
},
_openWindowCallback:function(){delete this._inLogWindowCallback;
if(!this._logWindow||this._logWindow.closed){if(this._popupBlockerWarning){return;
}alert("Could not open log window. Please disable your popup blocker!");
this._popupBlockerWarning=true;
return;
}this._popupBlockerWarning=false;
if(this.getPopUnder()){this._logWindow.blur();
window.focus();
}var logDocument=this._logWindow.document;
var logFix=qx.core.Variant.isSet("qx.client",
"mshtml")?'#lines { width: 100%; height: expression((document.body.offsetHeight - 30) + "px"); }':'';
logDocument.open();
logDocument.write("<html><head><title>"+this._name+"</title></head>"+'<body onload="qx = opener.qx;" onunload="try{qx.log.WindowAppender._registeredAppenders['+this._id+']._autoCloseWindow()}catch(e){}">'+'  <style type="text/css">'+'    html, body, input, pre{ font-size: 11px; font-family: Tahoma, sans-serif; line-height : 1 }'+'    html, body{ padding: 0; margin: 0; border : 0 none; }'+'    * { box-sizing: border-box; -moz-box-sizing: border-box; -webkit-box-sizing: border-box }'+'    #lines{ top: 30px; left: 0; right: 0; bottom: 0; position: absolute; overflow: auto; }'+'    #control { top: 0; left: 0; right: 0; padding: 4px 8px; background: #eee; border-bottom: 1px solid #ccc; height: 30px }'+'    pre { margin: 0; padding: 4px 8px; font-family: Consolas, "Bitstream Vera Sans Mono", monospace; }'+'    hr { border: 0 none; border-bottom: 1px solid #ccc; margin: 8px 0; padding: 0; height: 1px }'+logFix+'  </style>'+'  <div id="control">'+'    <input id="marker" type="button" value="Add divider"/> &#160; &#160; Filter: <input name="filter" id="filter" type="text" value="'+this._filterText+'">'+'  </div>'+'  <div id="lines">'+'    <pre id="log" wrap="wrap"></pre>'+'  </div>'+'</body></html>');
logDocument.close();
this._logElem=logDocument.getElementById("log");
this._markerBtn=logDocument.getElementById("marker");
this._filterInput=logDocument.getElementById("filter");
this._logLinesDiv=logDocument.getElementById("lines");
var self=this;
this._markerBtn.onclick=function(){self._showMessageInLog("<hr/>");
};
this._filterInput.onkeyup=function(){self.setFilterText(self._filterInput.value);
};
if(this._logEventQueue!=null){for(var i=0;i<this._logEventQueue.length;i++){this.appendLogEvent(this._logEventQueue[i]);
}this._logEventQueue.length=0;
}},
closeWindow:function(){if(this._logWindow!=null){this._logWindow.close();
this._logWindow=null;
this._logElem=null;
}},
_autoCloseWindow:function(){if(this.getAutoCloseWithErrors()||this._errorsPreventingAutoCloseCount==0){this.closeWindow();
}else{this._showMessageInLog("Log window message: <b>Note: "+this._errorsPreventingAutoCloseCount+" errors have been recorded, keeping log window open.</b>");
}},
_showMessageInLog:function(msg){var dummyEvent={message:msg,
isDummyEventForMessage:true};
this.appendLogEvent(dummyEvent);
},
appendLogEvent:function(evt){if(!this._logWindow||this._logWindow.closed){if(!this._logEventQueue){this._logEventQueue=[];
}this._logEventQueue.push(evt);
this.openWindow();
}else if(this._logElem==null){this._logEventQueue.push(evt);
}else{var divElem=this._logWindow.document.createElement("div");
if(evt.level>=qx.log.Logger.LEVEL_ERROR){divElem.style.backgroundColor="#FFEEEE";
if(!this.getAutoCloseWithErrors()){this._errorsPreventingAutoCloseCount+=1;
}}else if(evt.level==qx.log.Logger.LEVEL_DEBUG){divElem.style.color="gray";
}var txt;
if(evt.isDummyEventForMessage){txt=evt.message;
}else{txt=qx.html.String.fromText(this.formatLogEvent(evt));
}divElem.innerHTML=txt;
this._logElem.appendChild(divElem);
var divDataSet={txt:txt.toUpperCase(),
elem:divElem};
this._divDataSets.push(divDataSet);
this._setDivVisibility(divDataSet);
while(this._logElem.childNodes.length>this.getMaxMessages()){this._logElem.removeChild(this._logElem.firstChild);
if(this._removedMessageCount==null){this._removedMessageCount=1;
}else{this._removedMessageCount++;
}}
if(this._removedMessageCount!=null){this._logElem.firstChild.innerHTML="("+this._removedMessageCount+" messages removed)";
}this._logLinesDiv.scrollTop=this._logLinesDiv.scrollHeight;
}},
setFilterText:function(text){if(text==null){text="";
}this._filterText=text;
text=text.toUpperCase();
this._filterTextWords=text.split(" ");
for(var divIdx=0;divIdx<this._divDataSets.length;divIdx++){this._setDivVisibility(this._divDataSets[divIdx]);
}},
_setDivVisibility:function(divDataSet){var visible=true;
for(var txtIndex=0;visible&&(txtIndex<this._filterTextWords.length);txtIndex++){visible=divDataSet.txt.indexOf(this._filterTextWords[txtIndex])>=0;
}divDataSet.elem.style["display"]=(visible?"":"none");
},
_applyAutoCloseWithErrors:function(value,
old){if(!value&&old){this._errorsPreventingAutoCloseCount=0;
this._showMessageInLog("Log window message: Starting error recording, any errors below this line will prevent the log window from closing");
}else if(value&&!old){this._showMessageInLog("Log window message: Stopping error recording, discarding "+this._errorsPreventingAutoCloseCount+" errors.");
}}},
destruct:function(){try{if(this._markerBtn){this._markerBtn.onclick=null;
}
if(this._filterInput){this._filterInput.onkeyup=null;
}}catch(ex){}this._autoCloseWindow();
this._disposeFields("_markerBtn",
"_filterInput",
"_logLinesDiv",
"_logEventQueue",
"_filterTextWords",
"_divDataSets");
}});




/* ID: qx.client.Timer */
qx.Class.define("qx.client.Timer",
{extend:qx.core.Target,
construct:function(interval){this.base(arguments);
this.setEnabled(false);
if(interval!=null){this.setInterval(interval);
}this.__oninterval=qx.lang.Function.bind(this._oninterval,
this);
},
events:{"interval":"qx.event.type.Event"},
statics:{once:function(func,
obj,
timeout){var timer=new qx.client.Timer(timeout);
timer.addEventListener("interval",
function(e){timer.dispose();
func.call(obj,
e);
obj=null;
},
obj);
timer.start();
}},
properties:{enabled:{init:true,
check:"Boolean",
apply:"_applyEnabled"},
interval:{check:"Integer",
init:1000,
apply:"_applyInterval"}},
members:{__intervalHandler:null,
_applyInterval:function(value,
old){if(this.getEnabled()){this.restart();
}},
_applyEnabled:function(value,
old){if(old){window.clearInterval(this.__intervalHandler);
this.__intervalHandler=null;
}else if(value){this.__intervalHandler=window.setInterval(this.__oninterval,
this.getInterval());
}},
start:function(){this.setEnabled(true);
},
startWith:function(interval){this.setInterval(interval);
this.start();
},
stop:function(){this.setEnabled(false);
},
restart:function(){this.stop();
this.start();
},
restartWith:function(interval){this.stop();
this.startWith(interval);
},
_oninterval:function(){if(this.getEnabled()){this.createDispatchEvent("interval");
}}},
destruct:function(){if(this.__intervalHandler){window.clearInterval(this.__intervalHandler);
}this._disposeFields("__intervalHandler",
"__oninterval");
}});




/* ID: qx.log.appender.FireBug */
qx.Class.define("qx.log.appender.FireBug",
{extend:qx.log.appender.Abstract,
construct:function(){this.base(arguments);
},
members:{appendLogEvent:function(evt){if(typeof console!='undefined'){var log=qx.log.Logger;
var msg=this.formatLogEvent(evt);
switch(evt.level){case log.LEVEL_DEBUG:if(console.debug){console.debug(msg);
}break;
case log.LEVEL_INFO:if(console.info){console.info(msg);
}break;
case log.LEVEL_WARN:if(console.warn){console.warn(msg);
}break;
default:if(console.error){console.error(msg);
}break;
}if(evt.level>=log.LEVEL_WARN&&(!evt.throwable||!evt.throwable.stack)&&console.trace){console.trace();
}}}}});




/* ID: qx.log.appender.Native */
qx.Class.define("qx.log.appender.Native",
{extend:qx.log.appender.Abstract,
construct:function(){this.base(arguments);
if(typeof console!='undefined'&&console.debug&&!console.emu){this._appender=new qx.log.appender.FireBug;
}else{this._appender=new qx.log.appender.Window;
}},
members:{appendLogEvent:function(evt){if(this._appender){return this._appender.appendLogEvent(evt);
}}},
destruct:function(){this._disposeObjects("_appender");
}});




/* ID: qx.log.Logger */
qx.Class.define("qx.log.Logger",
{extend:qx.log.LogEventProcessor,
construct:function(name,
parentLogger){this.base(arguments);
this._name=name;
this._parentLogger=parentLogger;
},
statics:{deprecatedMethodWarning:function(fcn,
msg){var logger,
functionName,
className;
},
deprecatedClassWarning:function(clazz,
msg){var logger,
className;
},
getClassLogger:function(clazz){var logger=clazz._logger;
if(logger==null){var classname=clazz.classname;
var splits=classname.split(".");
var currPackage=window;
var currPackageName="";
var parentLogger=qx.log.Logger.ROOT_LOGGER;
for(var i=0;i<splits.length-1;i++){currPackage=currPackage[splits[i]];
currPackageName+=((i!=0)?".":"")+splits[i];
if(currPackage._logger==null){currPackage._logger=new qx.log.Logger(currPackageName,
parentLogger);
}parentLogger=currPackage._logger;
}logger=new qx.log.Logger(classname,
parentLogger);
clazz._logger=logger;
}return logger;
},
_indent:0,
LEVEL_ALL:0,
LEVEL_DEBUG:200,
LEVEL_INFO:500,
LEVEL_WARN:600,
LEVEL_ERROR:700,
LEVEL_FATAL:800,
LEVEL_OFF:1000,
ROOT_LOGGER:null},
members:{getName:function(){return this._name;
},
getParentLogger:function(){return this._parentLogger;
},
indent:function(){qx.log.Logger._indent++;
},
unindent:function(){qx.log.Logger._indent--;
},
addAppender:function(appender){if(this._appenderArr==null){this._appenderArr=[];
}this._appenderArr.push(appender);
},
removeAppender:function(appender){if(this._appenderArr!=null){this._appenderArr.remove(appender);
}},
removeAllAppenders:function(){this._appenderArr=null;
},
handleLogEvent:function(evt){var Filter=qx.log.Filter;
var decision=Filter.NEUTRAL;
var logger=this;
while(decision==Filter.NEUTRAL&&logger!=null){decision=logger.decideLogEvent(evt);
logger=logger.getParentLogger();
}
if(decision!=Filter.DENY){this.appendLogEvent(evt);
}},
appendLogEvent:function(evt){if(this._appenderArr!=null&&this._appenderArr.length!=0){for(var i=0;i<this._appenderArr.length;i++){this._appenderArr[i].handleLogEvent(evt);
}}else if(this._parentLogger!=null){this._parentLogger.appendLogEvent(evt);
}},
log:function(level,
msg,
instanceId,
exc,
trace){var evt={logger:this,
level:level,
message:msg,
throwable:exc,
trace:trace,
indent:qx.log.Logger._indent,
instanceId:instanceId};
this.handleLogEvent(evt);
},
debug:function(msg,
instanceId,
exc){this.log(qx.log.Logger.LEVEL_DEBUG,
msg,
instanceId,
exc);
},
info:function(msg,
instanceId,
exc){this.log(qx.log.Logger.LEVEL_INFO,
msg,
instanceId,
exc);
},
warn:function(msg,
instanceId,
exc){this.log(qx.log.Logger.LEVEL_WARN,
msg,
instanceId,
exc);
},
error:function(msg,
instanceId,
exc){this.log(qx.log.Logger.LEVEL_ERROR,
msg,
instanceId,
exc);
},
fatal:function(msg,
instanceId,
exc){this.log(qx.log.Logger.LEVEL_FATAL,
msg,
instanceId,
exc);
},
measureReset:function(){if(this._totalMeasureTime!=null){this.debug("Measure reset. Total measure time: "+this._totalMeasureTime+" ms");
}this._lastMeasureTime=null;
this._totalMeasureTime=null;
},
measure:function(msg,
instanceId,
exc){if(this._lastMeasureTime==null){msg="(measure start) "+msg;
}else{var delta=new Date().getTime()-this._lastMeasureTime;
if(this._totalMeasureTime==null){this._totalMeasureTime=0;
}this._totalMeasureTime+=delta;
msg="(passed time: "+delta+" ms) "+msg;
}this.debug(msg,
instanceId,
exc);
this._lastMeasureTime=new Date().getTime();
},
printStackTrace:function(){var trace=qx.dev.StackTrace.getStackTrace();
qx.lang.Array.removeAt(trace,
0);
this.log(qx.log.Logger.LEVEL_DEBUG,
"Current stack trace",
"",
null,
trace);
}},
settings:{"qx.logAppender":"qx.log.appender.Native",
"qx.minLogLevel":200},
defer:function(statics){statics.ROOT_LOGGER=new statics("root",
null);
statics.ROOT_LOGGER.setMinLevel(qx.core.Setting.get("qx.minLogLevel"));
statics.ROOT_LOGGER.addAppender(new (qx.Class.getByName(qx.core.Setting.get("qx.logAppender"))));
},
destruct:function(){this._disposeFields("_parentLogger",
"_appenderArr");
}});




/* ID: qx.dev.StackTrace */
qx.Class.define("qx.dev.StackTrace",
{statics:{getStackTrace:qx.core.Variant.select("qx.client",
{"gecko":function(){try{throw new Error();
}catch(e){var errorTrace=this.getStackTraceFromError(e);
qx.lang.Array.removeAt(errorTrace,
0);
var callerTrace=this.getStackTraceFromCaller(arguments);
var trace=callerTrace.length>errorTrace.length?callerTrace:errorTrace;
for(var i=0;i<Math.min(callerTrace.length,
errorTrace.length);i++){var callerCall=callerTrace[i];
if(callerCall.indexOf("anonymous")>=0){continue;
}var callerArr=callerCall.split(":");
if(callerArr.length!=2){continue;
}var callerClassName=callerArr[0];
var methodName=callerArr[1];
var errorCall=errorTrace[i];
var errorArr=errorCall.split(":");
var errorClassName=errorArr[0];
var lineNumber=errorArr[1];
if(qx.Class.getByName(errorClassName)){var className=errorClassName;
}else{className=callerClassName;
}var line=className+":";
if(methodName){line+=methodName+":";
}line+=lineNumber;
trace[i]=line;
}return trace;
}},
"mshtml|webkit":function(){return this.getStackTraceFromCaller(arguments);
},
"opera":function(){var foo;
try{foo.bar();
}catch(e){var trace=this.getStackTraceFromError(e);
qx.lang.Array.removeAt(trace,
0);
return trace;
}return [];
}}),
getStackTraceFromCaller:qx.core.Variant.select("qx.client",
{"opera":function(args){return [];
},
"default":function(args){var trace=[];
var fcn=qx.lang.Function.getCaller(args);
var knownFunction={};
while(fcn){var fcnName=this.getFunctionName(fcn);
trace.push(fcnName);
try{fcn=fcn.caller;
}catch(e){break;
}
if(!fcn){break;
}var hash=qx.core.Object.toHashCode(fcn);
if(knownFunction[hash]){trace.push("...");
break;
}knownFunction[hash]=fcn;
}return trace;
}}),
getStackTraceFromError:qx.core.Variant.select("qx.client",
{"gecko":function(error){if(!error.stack){return [];
}var lineRe=/@(.+):(\d+)$/gm;
var hit;
var trace=[];
while((hit=lineRe.exec(error.stack))!=null){var url=hit[1];
var lineNumber=hit[2];
var className=this.__fileNameToClassName(url);
trace.push(className+":"+lineNumber);
}return trace;
},
"webkit":function(error){if(error.sourceURL&&error.line){return [this.__fileNameToClassName(error.sourceURL)+":"+error.line];
}},
"opera":function(error){if(error.message.indexOf("Backtrace:")<0){return [];
}var trace=[];
var traceString=qx.lang.String.trim(error.message.split("Backtrace:")[1]);
var lines=traceString.split("\n");
for(var i=0;i<lines.length;i++){var reResult=lines[i].match(/\s*Line ([0-9]+) of.* (\S.*)/);
if(reResult&&reResult.length>=2){var lineNumber=reResult[1];
var fileName=this.__fileNameToClassName(reResult[2]);
trace.push(fileName+":"+lineNumber);
}}return trace;
},
"default":function(){return [];
}}),
getFunctionName:function(fcn){if(fcn.$$original){return fcn.classname+":constructor wrapper";
}
if(fcn.wrapper){return fcn.wrapper.classname+":constructor";
}
if(fcn.classname){return fcn.classname+":constructor";
}
if(fcn.mixin){for(var key in fcn.mixin.$$members){if(fcn.mixin.$$members[key]==fcn){return fcn.mixin.name+":"+key;
}}for(var key in fcn.mixin){if(fcn.mixin[key]==fcn){return fcn.mixin.name+":"+key;
}}}
if(fcn.self){var clazz=fcn.self.constructor;
if(clazz){for(var key in clazz.prototype){if(clazz.prototype[key]==fcn){return clazz.classname+":"+key;
}}for(var key in clazz){if(clazz[key]==fcn){return clazz.classname+":"+key;
}}}}var fcnReResult=fcn.toString().match(/(function\s*\w*\(.*?\))/);
if(fcnReResult&&fcnReResult.length>=1&&fcnReResult[1]){return fcnReResult[1];
}var fcnReResult=fcn.toString().match(/(function\s*\(.*?\))/);
if(fcnReResult&&fcnReResult.length>=1&&fcnReResult[1]){return "anonymous: "+fcnReResult[1];
}return 'anonymous';
},
__fileNameToClassName:function(fileName){var scriptDir="/source/class/";
var jsPos=fileName.indexOf(scriptDir);
var className=(jsPos==-1)?fileName:fileName.substring(jsPos+scriptDir.length).replace(/\//g,
".").replace(/\.js$/,
"");
return className;
}}});




/* ID: qx.html.String */
qx.Class.define("qx.html.String",
{statics:{escape:function(str){return qx.dom.String.escapeEntities(str,
qx.html.Entity.FROM_CHARCODE);
},
unescape:function(str){return qx.dom.String.unescapeEntities(str,
qx.html.Entity.TO_CHARCODE);
},
fromText:function(str){return qx.html.String.escape(str).replace(/(  |\n)/g,
function(chr){var map={"  ":" &nbsp;",
"\n":"<br>"};
return map[chr]||chr;
});
},
toText:function(str){return qx.html.String.unescape(str.replace(/\s+|<([^>])+>/gi,
function(chr){if(/\s+/.test(chr)){return " ";
}else if(/^<BR|^<br/gi.test(chr)){return "\n";
}else{return "";
}}));
}}});




/* ID: qx.dom.String */
qx.Class.define("qx.dom.String",
{statics:{escapeEntities:qx.core.Variant.select("qx.client",
{"mshtml":function(str,
charCodeToEntities){var entity,
result=[];
for(var i=0,
l=str.length;i<l;i++){var chr=str.charAt(i);
var code=chr.charCodeAt(0);
if(charCodeToEntities[code]){entity="&"+charCodeToEntities[code]+";";
}else{if(code>0x7F){entity="&#"+code+";";
}else{entity=chr;
}}result[result.length]=entity;
}return result.join("");
},
"default":function(str,
charCodeToEntities){var entity,
result="";
for(var i=0,
l=str.length;i<l;i++){var chr=str.charAt(i);
var code=chr.charCodeAt(0);
if(charCodeToEntities[code]){entity="&"+charCodeToEntities[code]+";";
}else{if(code>0x7F){entity="&#"+code+";";
}else{entity=chr;
}}result+=entity;
}return result;
}}),
unescapeEntities:function(str,
entitiesToCharCode){return str.replace(/&[#\w]+;/gi,
function(entity){var chr=entity;
var entity=entity.substring(1,
entity.length-1);
var code=entitiesToCharCode[entity];
if(code){chr=String.fromCharCode(code);
}else{if(entity.charAt(0)=='#'){if(entity.charAt(1).toUpperCase()=='X'){code=entity.substring(2);
if(code.match(/^[0-9A-Fa-f]+$/gi)){chr=String.fromCharCode(parseInt("0x"+code));
}}else{code=entity.substring(1);
if(code.match(/^\d+$/gi)){chr=String.fromCharCode(parseInt(code));
}}}}return chr;
});
},
stripTags:function(str){return str.replace(/<\/?[^>]+>/gi,
"");
}}});




/* ID: qx.html.Entity */
qx.Class.define("qx.html.Entity",
{statics:{TO_CHARCODE:{"quot":34,
"amp":38,
"lt":60,
"gt":62,
"nbsp":160,
"iexcl":161,
"cent":162,
"pound":163,
"curren":164,
"yen":165,
"brvbar":166,
"sect":167,
"uml":168,
"copy":169,
"ordf":170,
"laquo":171,
"not":172,
"shy":173,
"reg":174,
"macr":175,
"deg":176,
"plusmn":177,
"sup2":178,
"sup3":179,
"acute":180,
"micro":181,
"para":182,
"middot":183,
"cedil":184,
"sup1":185,
"ordm":186,
"raquo":187,
"frac14":188,
"frac12":189,
"frac34":190,
"iquest":191,
"Agrave":192,
"Aacute":193,
"Acirc":194,
"Atilde":195,
"Auml":196,
"Aring":197,
"AElig":198,
"Ccedil":199,
"Egrave":200,
"Eacute":201,
"Ecirc":202,
"Euml":203,
"Igrave":204,
"Iacute":205,
"Icirc":206,
"Iuml":207,
"ETH":208,
"Ntilde":209,
"Ograve":210,
"Oacute":211,
"Ocirc":212,
"Otilde":213,
"Ouml":214,
"times":215,
"Oslash":216,
"Ugrave":217,
"Uacute":218,
"Ucirc":219,
"Uuml":220,
"Yacute":221,
"THORN":222,
"szlig":223,
"agrave":224,
"aacute":225,
"acirc":226,
"atilde":227,
"auml":228,
"aring":229,
"aelig":230,
"ccedil":231,
"egrave":232,
"eacute":233,
"ecirc":234,
"euml":235,
"igrave":236,
"iacute":237,
"icirc":238,
"iuml":239,
"eth":240,
"ntilde":241,
"ograve":242,
"oacute":243,
"ocirc":244,
"otilde":245,
"ouml":246,
"divide":247,
"oslash":248,
"ugrave":249,
"uacute":250,
"ucirc":251,
"uuml":252,
"yacute":253,
"thorn":254,
"yuml":255,
"fnof":402,
"Alpha":913,
"Beta":914,
"Gamma":915,
"Delta":916,
"Epsilon":917,
"Zeta":918,
"Eta":919,
"Theta":920,
"Iota":921,
"Kappa":922,
"Lambda":923,
"Mu":924,
"Nu":925,
"Xi":926,
"Omicron":927,
"Pi":928,
"Rho":929,
"Sigma":931,
"Tau":932,
"Upsilon":933,
"Phi":934,
"Chi":935,
"Psi":936,
"Omega":937,
"alpha":945,
"beta":946,
"gamma":947,
"delta":948,
"epsilon":949,
"zeta":950,
"eta":951,
"theta":952,
"iota":953,
"kappa":954,
"lambda":955,
"mu":956,
"nu":957,
"xi":958,
"omicron":959,
"pi":960,
"rho":961,
"sigmaf":962,
"sigma":963,
"tau":964,
"upsilon":965,
"phi":966,
"chi":967,
"psi":968,
"omega":969,
"thetasym":977,
"upsih":978,
"piv":982,
"bull":8226,
"hellip":8230,
"prime":8242,
"Prime":8243,
"oline":8254,
"frasl":8260,
"weierp":8472,
"image":8465,
"real":8476,
"trade":8482,
"alefsym":8501,
"larr":8592,
"uarr":8593,
"rarr":8594,
"darr":8595,
"harr":8596,
"crarr":8629,
"lArr":8656,
"uArr":8657,
"rArr":8658,
"dArr":8659,
"hArr":8660,
"forall":8704,
"part":8706,
"exist":8707,
"empty":8709,
"nabla":8711,
"isin":8712,
"notin":8713,
"ni":8715,
"prod":8719,
"sum":8721,
"minus":8722,
"lowast":8727,
"radic":8730,
"prop":8733,
"infin":8734,
"ang":8736,
"and":8743,
"or":8744,
"cap":8745,
"cup":8746,
"int":8747,
"there4":8756,
"sim":8764,
"cong":8773,
"asymp":8776,
"ne":8800,
"equiv":8801,
"le":8804,
"ge":8805,
"sub":8834,
"sup":8835,
"sube":8838,
"supe":8839,
"oplus":8853,
"otimes":8855,
"perp":8869,
"sdot":8901,
"lceil":8968,
"rceil":8969,
"lfloor":8970,
"rfloor":8971,
"lang":9001,
"rang":9002,
"loz":9674,
"spades":9824,
"clubs":9827,
"hearts":9829,
"diams":9830,
"OElig":338,
"oelig":339,
"Scaron":352,
"scaron":353,
"Yuml":376,
"circ":710,
"tilde":732,
"ensp":8194,
"emsp":8195,
"thinsp":8201,
"zwnj":8204,
"zwj":8205,
"lrm":8206,
"rlm":8207,
"ndash":8211,
"mdash":8212,
"lsquo":8216,
"rsquo":8217,
"sbquo":8218,
"ldquo":8220,
"rdquo":8221,
"bdquo":8222,
"dagger":8224,
"Dagger":8225,
"permil":8240,
"lsaquo":8249,
"rsaquo":8250,
"euro":8364}},
defer:function(statics,
members,
properties){statics.FROM_CHARCODE=qx.lang.Object.invert(statics.TO_CHARCODE);
}});




/* ID: qx.html.EventRegistration */
qx.Class.define("qx.html.EventRegistration",
{statics:{addEventListener:qx.core.Variant.select("qx.client",
{"mshtml":function(vElement,
vType,
vFunction){vElement.attachEvent("on"+vType,
vFunction);
},
"default":function(vElement,
vType,
vFunction){vElement.addEventListener(vType,
vFunction,
false);
}}),
removeEventListener:qx.core.Variant.select("qx.client",
{"mshtml":function(vElement,
vType,
vFunction){vElement.detachEvent("on"+vType,
vFunction);
},
"default":function(vElement,
vType,
vFunction){vElement.removeEventListener(vType,
vFunction,
false);
}})}});




/* ID: qx.core.Init */
qx.Class.define("qx.core.Init",
{type:"singleton",
extend:qx.core.Target,
construct:function(){this.base(arguments);
this._onloadWrapped=qx.lang.Function.bind(this._onload,
this);
this._onbeforeunloadWrapped=qx.lang.Function.bind(this._onbeforeunload,
this);
this._onunloadWrapped=qx.lang.Function.bind(this._onunload,
this);
qx.html.EventRegistration.addEventListener(window,
"load",
this._onloadWrapped);
qx.html.EventRegistration.addEventListener(window,
"beforeunload",
this._onbeforeunloadWrapped);
qx.html.EventRegistration.addEventListener(window,
"unload",
this._onunloadWrapped);
},
events:{"load":"qx.event.type.Event",
"beforeunload":"qx.event.type.Event",
"unload":"qx.event.type.Event"},
properties:{application:{nullable:true,
check:function(value){if(typeof value=="function"){throw new Error("The application property takes an application instance as parameter "+"and no longer a class/constructor. You may have to fix your 'index.html'.");
}return value&&qx.Class.hasInterface(value.constructor,
qx.application.IApplication);
}}},
members:{_autoDispose:false,
_onload:function(e){if(this._onloadDone){return;
}this._onloadDone=true;
this.createDispatchEvent("load");
this.debug("qooxdoo "+qx.core.Version.toString());
{this.debug("loaded "+qx.lang.Object.getLength(qx.OO.classes)+" old classes");
};
this.debug("loaded "+qx.Class.getTotalNumber()+" classes");
this.debug("loaded "+qx.Interface.getTotalNumber()+" interfaces");
this.debug("loaded "+qx.Mixin.getTotalNumber()+" mixins");
if(qx.Theme){this.debug("loaded "+qx.Theme.getTotalNumber()+" themes");
}
if(qx.locale&&qx.locale.Manager){this.debug("loaded "+qx.locale.Manager.getInstance().getAvailableLocales().length+" locales");
}var cl=qx.core.Client.getInstance();
this.debug("client: "+cl.getEngine()+"-"+cl.getMajor()+"."+cl.getMinor()+"/"+cl.getPlatform()+"/"+cl.getLocale());
this.debug("browser: "+cl.getBrowser()+"/"+(cl.supportsSvg()?"svg":cl.supportsVml()?"vml":"none"));
{if(qx.core.Variant.isSet("qx.client",
"mshtml")){if(!cl.isInQuirksMode()){this.warn("Wrong box sizing: Please modify the document's DOCTYPE!");
}}};
if(!this.getApplication()){var clazz=qx.Class.getByName(qx.core.Setting.get("qx.application"));
if(clazz){this.setApplication(new clazz(this));
}}
if(!this.getApplication()){return;
}this.debug("application: "+this.getApplication().classname+"["+this.getApplication().toHashCode()+"]");
var start=new Date;
this.getApplication().main();
this.info("main runtime: "+(new Date-start)+"ms");
},
_onbeforeunload:function(e){this.createDispatchEvent("beforeunload");
if(this.getApplication()){var result=this.getApplication().close();
if(result!=null){e.returnValue=result;
}}},
_onunload:function(e){this.createDispatchEvent("unload");
if(this.getApplication()){this.getApplication().terminate();
}qx.core.Object.dispose(true);
}},
settings:{"qx.application":"qx.application.Gui"},
destruct:function(){qx.html.EventRegistration.removeEventListener(window,
"load",
this._onloadWrapped);
qx.html.EventRegistration.removeEventListener(window,
"beforeunload",
this._onbeforeunloadWrapped);
qx.html.EventRegistration.removeEventListener(window,
"unload",
this._onunloadWrapped);
},
defer:function(statics,
proto,
properties){statics.getInstance();
}});




/* ID: qx.application.IApplication */
qx.Interface.define("qx.application.IApplication",
{members:{main:function(){return true;
},
close:function(){return true;
},
terminate:function(){return true;
}}});




/* ID: qx.core.Version */
qx.Class.define("qx.core.Version",
{statics:{major:0,
minor:0,
revision:0,
state:"",
svn:0,
folder:"",
toString:function(){return this.major+"."+this.minor+(this.revision==0?"":"."+this.revision)+(this.state==""?"":"-"+this.state)+(this.svn==0?"":" (r"+this.svn+")")+(this.folder==""?"":" ["+this.folder+"]");
},
__init:function(){var vSplit=qx.core.Setting.get("qx.version").split(" ");
var vVersion=vSplit.shift();
var vInfos=vSplit.join(" ");
if(/([0-9]+)\.([0-9]+)(\.([0-9]))?(-([a-z0-9]+))?/.test(vVersion)){this.major=(RegExp.$1!=""?parseInt(RegExp.$1):0);
this.minor=(RegExp.$2!=""?parseInt(RegExp.$2):0);
this.revision=(RegExp.$4!=""?parseInt(RegExp.$4):0);
this.state=typeof RegExp.$6=="string"?RegExp.$6:"";
}
if(/(\(r([0-9]+)\))?(\s\[([a-zA-Z0-9_-]+)\])?/.test(vInfos)){this.svn=(RegExp.$2!=""?parseInt(RegExp.$2):0);
this.folder=typeof RegExp.$4=="string"?RegExp.$4:"";
}}},
settings:{"qx.version":"0.0"},
defer:function(statics){statics.__init();
}});




/* ID: qx.OO */
{qx.Class.define("qx.OO",
{statics:{classes:{},
defineClass:function(vClassName,
vSuper,
vConstructor){qx.log.Logger.deprecatedMethodWarning(arguments.callee,
"Use qx.Class.define instead");
var vSplitName=vClassName.split(".");
var vNameLength=vSplitName.length-1;
var vTempObject=window;
for(var i=0;i<vNameLength;i++){if(typeof vTempObject[vSplitName[i]]==="undefined"){vTempObject[vSplitName[i]]={};
}vTempObject=vTempObject[vSplitName[i]];
}if(typeof vSuper==="undefined"){if(typeof vConstructor!=="undefined"){throw new Error("SuperClass is undefined, but constructor was given for class: "+vClassName);
}qx.Clazz=vTempObject[vSplitName[i]]={};
qx.Proto=null;
qx.Super=null;
}else if(typeof vConstructor==="undefined"){qx.Clazz=vTempObject[vSplitName[i]]=vSuper;
qx.Proto=null;
qx.Super=vSuper;
}else{qx.Clazz=vTempObject[vSplitName[i]]=vConstructor;
var vHelperConstructor=function(){};
vHelperConstructor.prototype=vSuper.prototype;
qx.Proto=vConstructor.prototype=new vHelperConstructor;
qx.Super=vConstructor.superclass=vSuper;
qx.Proto.classname=vConstructor.classname=vClassName;
qx.Proto.constructor=vConstructor;
}qx.OO.classes[vClassName]=qx.Class;
},
isAvailable:function(vClassName){qx.log.Logger.deprecatedMethodWarning(arguments.callee);
return qx.OO.classes[vClassName]!=null;
},
addFastProperty:function(config){{};
return qx.core.LegacyProperty.addFastProperty(config,
qx.Proto);
},
addCachedProperty:function(config){{};
return qx.core.LegacyProperty.addCachedProperty(config,
qx.Proto);
},
addPropertyGroup:function(config){{};
return qx.Class.addPropertyGroup(config,
qx.Proto);
},
removeProperty:function(config){{};
return qx.core.LegacyProperty.removeProperty(config,
qx.Proto);
},
changeProperty:function(config){qx.log.Logger.deprecatedMethodWarning(arguments.callee);
return qx.core.LegacyProperty.addProperty(config,
qx.Proto);
},
addProperty:function(config){qx.log.Logger.deprecatedMethodWarning(arguments.callee);
return qx.core.LegacyProperty.addProperty(config,
qx.Proto);
}}});
};




/* ID: qx.theme.classic.color.Royale */
qx.Theme.define("qx.theme.classic.color.Royale",
{title:"Windows Royale",
colors:{"background":[235,
233,
237],
"border-light":"white",
"border-light-shadow":[220,
223,
228],
"border-dark":[133,
135,
140],
"border-dark-shadow":[167,
166,
170],
"effect":[254,
200,
60],
"selected":[51,
94,
168],
"text":"black",
"text-disabled":[167,
166,
170],
"text-selected":"white",
"tooltip":[255,
255,
225],
"tooltip-text":"black",
"menu":"white",
"list":"white",
"field":"white",
"button":[235,
233,
237],
"button-hover":[246,
245,
247],
"button-abandoned":[235,
233,
237],
"window-active-caption-text":[255,
255,
255],
"window-inactive-caption-text":[255,
255,
255],
"window-active-caption":[51,
94,
168],
"window-inactive-caption":[111,
161,
217],
"button-view-pane":[250,
251,
254],
"button-view-bar":[225,
238,
255],
"tab-view-pane":[250,
251,
254],
"tab-view-border":[145,
165,
189],
"tab-view-button":[225,
238,
255],
"tab-view-button-hover":[250,
251,
254],
"tab-view-button-checked":[250,
251,
254],
"radio-view-pane":[250,
251,
254],
"radio-view-bar":[225,
238,
255],
"radio-view-button-checked":[250,
251,
254],
"list-view":"white",
"list-view-border":[167,
166,
170],
"list-view-header":[242,
242,
242],
"list-view-header-border":[214,
213,
217],
"list-view-header-cell-hover":"white",
"date-chooser":"white",
"date-chooser-title":[98,
133,
186],
"table-pane":"white",
"table-header":[242,
242,
242],
"table-header-border":[214,
213,
217],
"table-header-cell":[235,
234,
219],
"table-header-cell-hover":[255,
255,
255],
"table-focus-indicator":[179,
217,
255],
"table-row-background-focused-selected":[90,
138,
211],
"table-row-background-focused":[221,
238,
255],
"table-row-background-selected":[51,
94,
168],
"table-row-background-even":[250,
248,
243],
"table-row-background-odd":[255,
255,
255],
"table-row-selected":[255,
255,
255],
"table-row":[0,
0,
0]}});




/* ID: qx.theme.classic.Border */
qx.Theme.define("qx.theme.classic.Border",
{title:"Classic",
borders:{"black":{width:1,
color:"black"},
"white":{width:1,
color:"white"},
"dark-shadow":{width:1,
color:"border-dark-shadow"},
"light-shadow":{width:1,
color:"border-light-shadow"},
"light":{width:1,
color:"border-light"},
"dark":{width:1,
color:"border-dark"},
"tooltip":{width:1,
color:"tooltip-text"},
"inset":{width:2,
color:["border-dark-shadow",
"border-light",
"border-light",
"border-dark-shadow"],
innerColor:["border-dark",
"border-light-shadow",
"border-light-shadow",
"border-dark"]},
"outset":{width:2,
color:["border-light-shadow",
"border-dark",
"border-dark",
"border-light-shadow"],
innerColor:["border-light",
"border-dark-shadow",
"border-dark-shadow",
"border-light"]},
"groove":{width:2,
color:["border-dark-shadow",
"border-light",
"border-light",
"border-dark-shadow"],
innerColor:["border-light",
"border-dark-shadow",
"border-dark-shadow",
"border-light"]},
"ridge":{width:2,
color:["border-light",
"border-dark-shadow",
"border-dark-shadow",
"border-light"],
innerColor:["border-dark-shadow",
"border-light",
"border-light",
"border-dark-shadow"]},
"inset-thin":{width:1,
color:["border-dark-shadow",
"border-light",
"border-light",
"border-dark-shadow"]},
"outset-thin":{width:1,
color:["border-light",
"border-dark-shadow",
"border-dark-shadow",
"border-light"]},
"resizer":{width:[1,
3,
3,
1],
color:["border-light",
"border-dark-shadow",
"border-dark-shadow",
"border-light"],
innerColor:["border-light-shadow",
"border-dark",
"border-dark",
"border-light-shadow"]},
"line-left":{widthLeft:1,
colorLeft:"border-dark-shadow"},
"line-right":{widthRight:1,
colorRight:"border-dark-shadow"},
"line-top":{widthTop:1,
colorTop:"border-dark-shadow"},
"line-bottom":{widthBottom:1,
colorBottom:"border-dark-shadow"},
"divider-vertical":{widthTop:1,
colorTop:"border-dark-shadow"},
"divider-horizontal":{widthLeft:1,
colorLeft:"border-dark-shadow"}}});




/* ID: qx.theme.classic.font.Default */
qx.Theme.define("qx.theme.classic.font.Default",
{title:"Classic",
fonts:{"default":{size:11,
family:["Lucida Grande",
"Tahoma",
"Verdana",
"Liberation Sans",
"Bitstream Vera Sans"]},
"bold":{size:11,
family:["Lucida Grande",
"Tahoma",
"Verdana",
"Liberation Sans",
"Bitstream Vera Sans"],
bold:true},
"large":{size:13,
family:["Lucida Grande",
"Tahoma",
"Verdana",
"Liberation Sans",
"Bitstream Vera Sans"]},
"bold-large":{size:13,
family:["Lucida Grande",
"Tahoma",
"Verdana",
"Liberation Sans",
"Bitstream Vera Sans"],
bold:true},
"monospace":{size:11,
family:["Consolas",
"Liberation Sans Mono",
"Bitstream Vera Sans Mono",
"Courier New",
"monospace"]}}});




/* ID: qx.util.manager.Value */
qx.Class.define("qx.util.manager.Value",
{type:"abstract",
extend:qx.core.Target,
construct:function(){this.base(arguments);
this._registry={};
this._dynamic={};
},
members:{connect:function(callback,
obj,
value){{if(!callback){throw new Error("Can not connect to invalid callback: "+callback);
}
if(!obj){throw new Error("Can not connect to invalid object: "+obj);
}
if(value===undefined){throw new Error("Undefined values are not allowed for connect: "+callback+"["+obj+"]");
}
if(typeof value==="boolean"){throw new Error("Boolean values are not allowed for connect: "+callback+"["+obj+"]");
}};
var key="v"+obj.toHashCode()+"$"+qx.core.Object.toHashCode(callback);
var reg=this._registry;
if(value!==null&&this._preprocess){value=this._preprocess(value);
}if(this.isDynamic(value)){reg[key]={callback:callback,
object:obj,
value:value};
}else if(reg[key]){delete reg[key];
}callback.call(obj,
this.resolveDynamic(value)||value);
},
resolveDynamic:function(value){return this._dynamic[value];
},
isDynamic:function(value){return this._dynamic[value]!==undefined;
},
_updateObjects:function(){var reg=this._registry;
var entry;
for(var key in reg){entry=reg[key];
entry.callback.call(entry.object,
this.resolveDynamic(entry.value));
}}},
destruct:function(){this._disposeFields("_registry",
"_dynamic");
}});




/* ID: qx.io.Alias */
qx.Class.define("qx.io.Alias",
{type:"singleton",
extend:qx.util.manager.Value,
construct:function(){this.base(arguments);
this._aliases={};
this.add("static",
qx.core.Setting.get("qx.resourceUri")+"/static");
},
members:{_preprocess:function(value){var dynamics=this._dynamic;
if(dynamics[value]===false){return value;
}else if(dynamics[value]===undefined){if(value.charAt(0)==="/"||value.charAt(0)==="."||value.indexOf("http://")===0||value.indexOf("https://")==="0"||value.indexOf("file://")===0){dynamics[value]=false;
return value;
}var alias=value.substring(0,
value.indexOf("/"));
var resolved=this._aliases[alias];
if(resolved!==undefined){dynamics[value]=resolved+value.substring(alias.length);
}}return value;
},
add:function(alias,
base){this._aliases[alias]=base;
var dynamics=this._dynamic;
var reg=this._registry;
var entry;
var paths={};
for(var path in dynamics){if(path.substring(0,
path.indexOf("/"))===alias){dynamics[path]=base+path.substring(alias.length);
paths[path]=true;
}}for(var key in reg){entry=reg[key];
if(paths[entry.value]){entry.callback.call(entry.object,
dynamics[entry.value]);
}}},
remove:function(alias){delete this._aliases[alias];
},
resolve:function(path){if(path!==null){path=this._preprocess(path);
}return this._dynamic[path]||path;
}},
destruct:function(){this._disposeFields("_aliases");
}});




/* ID: qx.theme.classic.Widget */
qx.Theme.define("qx.theme.classic.Widget",
{title:"Windows",
widgets:{uri:qx.core.Setting.get("qx.resourceUri")+"/widget/Windows"}});




/* ID: qx.theme.classic.Appearance */
qx.Theme.define("qx.theme.classic.Appearance",
{title:"Classic",
appearances:{"empty":{},
"widget":{},
"image":{},
"atom":{},
"popup":{},
"cursor-dnd-move":{style:function(states){return {source:"widget/cursors/move.gif"};
}},
"cursor-dnd-copy":{style:function(states){return {source:"widget/cursors/copy.gif"};
}},
"cursor-dnd-alias":{style:function(states){return {source:"widget/cursors/alias.gif"};
}},
"cursor-dnd-nodrop":{style:function(states){return {source:"widget/cursors/nodrop.gif"};
}},
"label":{style:function(states){return {textColor:states.disabled?"text-disabled":"undefined"};
}},
"client-document":{style:function(states){return {backgroundColor:"background",
textColor:"text",
font:"default"};
}},
"client-document-blocker":{style:function(states){return {cursor:"default",
backgroundImage:"static/image/blank.gif"};
}},
"tool-tip":{include:"popup",
style:function(states){return {backgroundColor:"tooltip",
textColor:"tooltip-text",
border:"tooltip",
padding:[1,
3,
2,
3]};
}},
"iframe":{style:function(states){return {border:"inset"};
}},
"check-box":{style:function(states){return {padding:[2,
3]};
}},
"radio-button":{include:"check-box"},
"button":{style:function(states){if(states.pressed||states.checked||states.abandoned){var border="inset";
}else{var border="outset";
}
if(states.pressed||states.abandoned){var padding=[4,
3,
2,
5];
}else{var padding=[3,
4];
}return {backgroundColor:states.abandoned?"button-abandoned":states.over?"button-hover":"button",
border:border,
padding:padding};
}},
"toolbar":{style:function(states){return {border:"outset-thin",
backgroundColor:"background"};
}},
"toolbar-part":{},
"toolbar-part-handle":{style:function(states){return {width:10};
}},
"toolbar-part-handle-line":{style:function(states){return {top:2,
left:3,
bottom:2,
width:4,
border:"outset-thin"};
}},
"toolbar-separator":{style:function(states){return {width:8};
}},
"toolbar-separator-line":{style:function(states){return {top:2,
left:3,
width:"auto",
bottom:2,
border:"divider-horizontal"};
}},
"toolbar-button":{style:function(states){if(states.pressed||states.checked||states.abandoned){var border="inset-thin";
var padding=[3,
2,
1,
4];
}else if(states.over){var border="outset-thin";
var padding=[2,
3];
}else{var border="undefined";
var padding=[3,
4];
}return {cursor:"default",
spacing:4,
width:"auto",
border:border,
padding:padding,
verticalChildrenAlign:"middle",
backgroundColor:states.abandoned?"button-abandoned":"button",
backgroundImage:states.checked&&!states.over?"static/image/dotted_white.gif":null};
}},
"button-view":{style:function(states){return {border:"dark-shadow"};
}},
"button-view-pane":{style:function(states){return {backgroundColor:"button-view-pane",
padding:10};
}},
"button-view-page":{},
"button-view-bar":{style:function(states){var padding="undefined";
var border="undefined";
var clazz=qx.ui.core.Border;
if(states.barTop){padding=[1,
0];
border=clazz.fromConfig({bottom:[1,
"solid",
"border-dark-shadow"]});
}else if(states.barBottom){padding=[1,
0];
border=clazz.fromConfig({top:[1,
"solid",
"border-dark-shadow"]});
}else if(states.barLeft){padding=[0,
1];
border=clazz.fromConfig({right:[1,
"solid",
"border-dark-shadow"]});
}else if(states.barRight){padding=[0,
1];
border=clazz.fromConfig({left:[1,
"solid",
"border-dark-shadow"]});
}return {backgroundColor:"button-view-bar",
padding:padding||"undefined",
border:border||"undefined"};
}},
"button-view-button":{style:function(states){var margin,
width,
height,
padding,
border;
if(states.checked||states.over){border=new qx.ui.core.Border(1,
"solid",
"border-dark-shadow");
if(states.barTop){border.setBottom(3,
"solid",
"effect");
padding=[3,
6,
1,
6];
}else if(states.barBottom){border.setTop(3,
"solid",
"effect");
padding=[1,
6,
3,
6];
}else if(states.barLeft){border.setRight(3,
"solid",
"effect");
padding=[3,
4,
3,
6];
}else{border.setLeft(3,
"solid",
"effect");
padding=[3,
6,
3,
4];
}}else{border="undefined";
padding=[4,
7];
}
if(states.barTop||states.barBottom){margin=[0,
1];
width="auto";
height=null;
}else{margin=[1,
0];
height="auto";
width=null;
}return {backgroundColor:states.checked?"button-view-pane":"undefined",
iconPosition:"top",
margin:margin,
width:width,
height:height,
border:border,
padding:padding||"undefined"};
}},
"tab-view":{style:function(states){return {spacing:-1};
}},
"tab-view-bar":{},
"tab-view-pane":{style:function(states){return {backgroundColor:"tab-view-pane",
border:new qx.ui.core.Border(1,
"solid",
"tab-view-border"),
padding:10};
}},
"tab-view-page":{},
"tab-view-button":{style:function(states){var paddingTop,
paddingBottom,
paddingLeft,
paddingRight;
var marginTop,
marginBottom,
marginRight,
marginLeft;
var backgroundColor,
border;
marginTop=0;
marginBottom=0;
border=new qx.ui.core.Border(1,
"solid",
"tab-view-border");
if(states.checked){paddingTop=2;
paddingBottom=4;
paddingLeft=7;
paddingRight=8;
marginRight=-1;
marginLeft=-2;
backgroundColor="tab-view-button-checked";
if(states.barTop){border.setWidthBottom(0);
border.setTop(3,
"solid",
"effect");
}else{border.setWidthTop(0);
border.setBottom(3,
"solid",
"effect");
}
if(states.alignLeft){if(states.firstChild){paddingLeft=6;
paddingRight=7;
marginLeft=0;
}}else{if(states.lastChild){paddingLeft=8;
paddingRight=5;
marginRight=0;
}}}else{paddingTop=2;
paddingBottom=2;
paddingLeft=5;
paddingRight=6;
marginRight=1;
marginLeft=0;
backgroundColor=states.over?"tab-view-button-hover":"tab-view-button";
if(states.barTop){border.setWidthBottom(0);
marginTop=3;
marginBottom=1;
}else{border.setWidthTop(0);
marginTop=1;
marginBottom=3;
}
if(states.alignLeft){if(states.firstChild){paddingLeft=6;
paddingRight=5;
}}else{if(states.lastChild){paddingLeft=6;
paddingRight=5;
marginRight=0;
}}}return {padding:[paddingTop,
paddingRight,
paddingBottom,
paddingLeft],
margin:[marginTop,
marginRight,
marginBottom,
marginLeft],
border:border,
backgroundColor:backgroundColor};
}},
"radio-view":{include:"button-view"},
"radio-view-pane":{style:function(states){return {backgroundColor:"radio-view-pane"};
}},
"radio-view-page":{},
"radio-view-bar":{style:function(states){return {backgroundColor:"radio-view-bar",
padding:[1,
0],
border:states.barTop?qx.ui.core.Border.fromConfig({bottom:[1,
"solid",
"border-dark-shadow"]}):qx.ui.core.Border.fromConfig({top:[1,
"solid",
"border-dark-shadow"]})};
}},
"radio-view-button":{style:function(states){var border,
padding;
if(states.checked||states.over){border=new qx.ui.core.Border(1,
"solid",
"border-dark-shadow");
border.setLeft(3,
"solid",
"effect");
padding=[2,
6,
2,
4];
}else{border="undefined";
padding=[3,
7];
}return {backgroundColor:states.checked?"radio-view-button-checked":"undefined",
iconPosition:"left",
margin:[0,
1],
width:"auto",
opacity:states.checked?1.0:0.3,
border:border,
padding:padding};
}},
"window":{style:function(states){return {backgroundColor:"background",
padding:1,
border:states.maximized?"undefined":"outset"};
}},
"window-captionbar":{style:function(states){return {padding:[1,
2,
2],
verticalChildrenAlign:"middle",
backgroundColor:states.active?"window-active-caption":"window-inactive-caption",
textColor:states.active?"window-active-caption-text":"window-inactive-caption-text"};
}},
"window-resize-frame":{style:function(states){return {border:"dark-shadow"};
}},
"window-captionbar-icon":{style:function(states){return {marginRight:2};
}},
"window-captionbar-title":{style:function(states){return {cursor:"default",
font:"bold",
marginRight:2};
}},
"window-captionbar-button":{include:"button",
style:function(states){return {padding:states.pressed||states.abandoned?[2,
1,
0,
3]:[1,
2]};
}},
"window-captionbar-minimize-button":{include:"window-captionbar-button",
style:function(states){return {icon:"widget/window/minimize.gif"};
}},
"window-captionbar-restore-button":{include:"window-captionbar-button",
style:function(states){return {icon:"widget/window/restore.gif"};
}},
"window-captionbar-maximize-button":{include:"window-captionbar-button",
style:function(states){return {icon:"widget/window/maximize.gif"};
}},
"window-captionbar-close-button":{include:"window-captionbar-button",
style:function(states){return {marginLeft:2,
icon:"widget/window/close.gif"};
}},
"window-statusbar":{style:function(states){return {border:"inset-thin"};
}},
"window-statusbar-text":{style:function(states){return {padding:[1,
4]};
}},
"color-popup":{style:function(states){return {padding:4,
border:"outset",
backgroundColor:"background"};
}},
"resizer":{style:function(states){return {border:"outset"};
}},
"resizer-frame":{style:function(states){return {border:"dark-shadow"};
}},
"menu":{style:function(states){return {backgroundColor:"menu",
border:"outset",
padding:1};
}},
"menu-layout":{},
"menu-button":{style:function(states){return {spacing:2,
padding:[2,
4],
verticalChildrenAlign:"middle",
backgroundColor:states.over?"selected":"undefined",
textColor:states.over?"text-selected":"undefined"};
}},
"menu-button-arrow":{style:function(states){return {source:"widget/arrows/next.gif"};
}},
"menu-check-box":{include:"menu-button",
style:function(states){return {icon:states.checked?"widget/menu/checkbox.gif":"static/image/blank.gif"};
}},
"menu-radio-button":{include:"menu-button",
style:function(states){return {icon:states.checked?"widget/menu/radiobutton.gif":"static/image/blank.gif"};
}},
"menu-separator":{style:function(states){return {marginTop:3,
marginBottom:2,
paddingLeft:3,
paddingRight:3};
}},
"menu-separator-line":{style:function(states){return {right:0,
left:0,
height:"auto",
border:"divider-vertical"};
}},
"list":{style:function(states){return {border:"inset-thin",
backgroundColor:"list"};
}},
"list-item":{style:function(states){return {horizontalChildrenAlign:"left",
verticalChildrenAlign:"middle",
spacing:4,
padding:[3,
5],
backgroundColor:states.selected?"selected":"undefined",
textColor:states.selected?"text-selected":"undefined"};
}},
"text-field":{style:function(states){return {border:"inset",
padding:[1,
3],
textColor:states.disabled?"text-disabled":"undefined",
backgroundColor:"field"};
}},
"text-area":{include:"text-field"},
"combo-box":{style:function(states){return {border:"inset",
backgroundColor:"field"};
}},
"combo-box-list":{include:"list",
style:function(states){return {border:"undefined",
overflow:"scrollY"};
}},
"combo-box-popup":{include:"list",
style:function(states){return {maxHeight:150,
border:"dark-shadow"};
}},
"combo-box-text-field":{include:"text-field",
style:function(states){return {border:"undefined",
backgroundColor:"transparent"};
}},
"combo-box-button":{include:"button",
style:function(states){return {padding:[0,
3,
0,
2],
icon:"widget/arrows/down.gif"};
}},
"combo-box-ex":{style:function(states){return {border:"inset",
backgroundColor:"field"};
}},
"combo-box-ex-list":{include:"list",
style:function(states){return {border:"undefined",
edge:0};
}},
"combo-box-ex-text-field":{include:"text-field",
style:function(states){return {border:"undefined",
minWidth:30,
width:100,
backgroundColor:"transparent"};
}},
"combo-box-ex-popup":{include:"list",
style:function(states){return {border:"resizer"};
}},
"combo-box-ex-button":{include:"combo-box-button"},
"treevirtual-focus-indicator":{include:"empty"},
"tree-element":{style:function(states){return {height:16,
verticalChildrenAlign:"middle"};
}},
"tree-element-icon":{style:function(states){return {width:16,
height:16};
}},
"tree-element-label":{include:"label",
style:function(states){return {marginLeft:3,
height:15,
padding:2,
backgroundColor:states.selected?"selected":"undefined",
textColor:states.disabled?"text-disabled":(states.selected?"text-selected":"undefined")};
}},
"tree-folder":{include:"tree-element"},
"tree-folder-icon":{include:"tree-element-icon"},
"tree-folder-label":{include:"tree-element-label"},
"tree":{include:"tree-folder"},
"tree-icon":{include:"tree-folder-icon"},
"tree-label":{include:"tree-folder-label"},
"list-view":{style:function(states){return {border:new qx.ui.core.Border(1,
"solid",
"list-view-border"),
backgroundColor:"list-view"};
}},
"list-view-pane":{style:function(states){return {horizontalSpacing:1};
}},
"list-view-header":{style:function(states){return {border:qx.ui.core.Border.fromConfig({bottom:[1,
"solid",
"list-view-header-border"]}),
backgroundColor:"list-view-header"};
}},
"list-view-header-cell":{style:function(states){return {padding:[2,
6],
spacing:4,
backgroundColor:states.over?"list-view-header-cell-hover":"undefined",
paddingBottom:states.over?0:2,
border:states.over?new qx.ui.core.Border.fromConfig({bottom:[2,
"solid",
"effect"]}):"undefined"};
}},
"list-view-header-cell-arrow-up":{style:function(states){return {source:"widget/arrows/up.gif"};
}},
"list-view-header-cell-arrow-down":{style:function(states){return {source:"widget/arrows/down.gif"};
}},
"list-view-header-separator":{style:function(states){return {backgroundColor:"list-view-header-border",
width:1,
marginTop:1,
marginBottom:1};
}},
"list-view-content-cell":{style:function(states){return {cursor:"default",
backgroundColor:states.selected?"selected":"undefined",
textColor:states.selected?"text-selected":"undefined",
border:states.lead&&
!states.selected?
new qx.ui.core.Border.fromConfig({top:[1,
"solid",
"effect"],
bottom:[1,
"solid",
"effect"]}):"undefined",
marginTop:states.lead&&!states.selected?0:1,
marginBottom:states.lead&&!states.selected?0:1};
}},
"list-view-content-cell-image":{include:"list-view-content-cell",
style:function(states){return {paddingLeft:6,
paddingRight:6};
}},
"list-view-content-cell-text":{include:"list-view-content-cell",
style:function(states){return {overflow:"hidden",
paddingLeft:6,
paddingRight:6};
}},
"list-view-content-cell-html":{include:"list-view-content-cell-text"},
"list-view-content-cell-icon-html":{include:"list-view-content-cell-text"},
"list-view-content-cell-link":{include:"list-view-content-cell-text"},
"group-box":{style:function(states){return {backgroundColor:"background"};
}},
"group-box-legend":{style:function(states){return {location:[10,
1],
backgroundColor:"background",
paddingRight:3,
paddingLeft:4,
marginRight:10};
}},
"group-box-frame":{style:function(states){return {edge:[8,
0,
0],
padding:[12,
9],
border:"groove"};
}},
"check-box-group-box-legend":{style:function(states){return {location:[10,
1],
backgroundColor:"background",
paddingRight:3};
}},
"radio-button-group-box-legend":{include:"check-box-group-box-legend"},
"spinner":{style:function(states){return {border:"inset",
backgroundColor:"field"};
}},
"spinner-text-field":{include:"text-field",
style:function(states){return {backgroundColor:"transparent"};
}},
"spinner-button":{style:function(states){return {width:16,
backgroundColor:"background",
paddingLeft:3,
border:states.pressed||states.checked||states.abandoned?"inset":"outset"};
}},
"spinner-button-up":{include:"spinner-button",
style:function(states){return {source:"widget/arrows/up_small.gif"};
}},
"spinner-button-down":{include:"spinner-button",
style:function(states){return {paddingTop:1,
source:"widget/arrows/down_small.gif"};
}},
"colorselector":{style:function(states){return {backgroundColor:"background",
border:"outset"};
}},
"datechooser-toolbar-button":{style:function(states){var result={backgroundColor:states.abandoned?"button-abandoned":"button",
backgroundImage:(states.checked&&!states.over)?"static/image/dotted_white.gif":null,
spacing:4,
width:"auto",
verticalChildrenAlign:"middle"};
if(states.pressed||states.checked||states.abandoned){result.border="inset-thin";
}else if(states.over){result.border="outset-thin";
}else{result.border="undefined";
}
if(states.pressed||states.checked||states.abandoned){result.padding=[2,
0,
0,
2];
}else if(states.over){result.padding=1;
}else{result.padding=2;
}return result;
}},
"datechooser-monthyear":{style:function(states){return {font:"large",
textAlign:"center",
verticalAlign:"middle"};
}},
"datechooser-datepane":{style:function(states){return {border:new qx.ui.core.Border(1,
"solid",
"gray"),
backgroundColor:"date-chooser"};
}},
"datechooser-weekday":{style:function(states){var border=qx.ui.core.Border.fromConfig({bottom:[1,
"solid",
"gray"]});
return {border:border,
font:"bold-large",
textAlign:"center",
textColor:states.weekend?"date-chooser-title":"date-chooser",
backgroundColor:states.weekend?"date-chooser":"date-chooser-title"};
}},
"datechooser-day":{style:function(states){return {textAlign:"center",
verticalAlign:"middle",
border:states.today?"black":"undefined",
textColor:states.selected?"text-selected":states.otherMonth?"text-disabled":"undefined",
backgroundColor:states.selected?"selected":"undefined",
padding:[2,
4]};
}},
"datechooser-week":{style:function(states){if(states.header){var border=qx.ui.core.Border.fromConfig({right:[1,
"solid",
"gray"],
bottom:[1,
"solid",
"gray"]});
}else{var border=qx.ui.core.Border.fromConfig({right:[1,
"solid",
"gray"]});
}return {textAlign:"center",
textColor:"date-chooser-title",
padding:[2,
4],
border:border};
}},
"table-focus-statusbar":{style:function(states){return {border:qx.ui.core.Border.fromConfig({top:[1,
"solid",
"border-dark-shadow"]}),
paddingLeft:2,
paddingRight:2};
}},
"table-focus-indicator":{style:function(states){return {border:new qx.ui.core.Border(2,
"solid",
"table-focus-indicator")};
}},
"table-editor-textfield":{include:"text-field",
style:function(states){return {border:"undefined",
padding:[0,
2]};
}},
"table-pane":{style:function(states){return {backgroundColor:"table-pane"};
}},
"table-header":{style:function(states){return {border:qx.ui.core.Border.fromConfig({bottom:[1,
"solid",
"table-header-border"]}),
backgroundColor:"table-header"};
}},
"table-menubar-button":{style:function(states){if(states.pressed||states.checked||states.abandoned){var border="inset-thin";
var padding=[3,
2,
1,
4];
}else if(states.over){var border="outset-thin";
var padding=[2,
3];
}else{var border="undefined";
var padding=[3,
4];
}return {cursor:"default",
spacing:4,
width:"auto",
border:border,
padding:padding,
verticalChildrenAlign:"middle",
backgroundColor:states.abandoned?"button-abandoned":"button",
icon:"widget/table/selectColumnOrder.png"};
}},
"table-header-cell":{style:function(states){var border,
backgroundColor,
paddingBottom;
if(states.mouseover){border=qx.ui.core.Border.fromConfig({right:[1,
"solid",
"table-header-border"],
bottom:[2,
"solid",
"effect"]});
paddingBottom=0;
backgroundColor="table-header-cell-hover";
}else{border=qx.ui.core.Border.fromConfig({right:[1,
"solid",
"table-header-border"]});
paddingBottom=2;
backgroundColor="table-header-cell";
}return {paddingLeft:2,
paddingRight:2,
paddingBottom:paddingBottom,
spacing:2,
overflow:"hidden",
iconPosition:"right",
verticalChildrenAlign:"middle",
border:border,
backgroundColor:backgroundColor,
icon:states.sorted?(states.sortedAscending?"widget/table/ascending.png":"widget/table/descending.png"):null,
horizontalChildrenAlign:"left"};
}},
"splitpane":{style:function(states){return {overflow:"hidden",
splitterSize:8,
backgroundColor:"background"};
}},
"splitpane-splitter":{style:function(states){return {cursor:states.horizontal?"col-resize":"row-resize"};
}},
"splitpane-slider":{style:function(states){return {opacity:0.5,
backgroundColor:"background"};
}},
"splitpane-knob":{style:function(states){if(states.horizontal){return {opacity:states.dragging?0.5:1.0,
top:"50%",
left:"50%",
cursor:"col-resize",
source:"widget/splitpane/knob-horizontal.png",
marginLeft:-2,
marginTop:-7};
}else{return {opacity:states.dragging?0.5:1.0,
top:"50%",
left:"50%",
source:"widget/splitpane/knob-vertical.png",
marginTop:-2,
marginLeft:-7,
cursor:"row-resize"};
}}},
"scrollbar-blocker":{style:function(states){return {backgroundColor:"black",
opacity:0.2};
}}}});




/* ID: qx.theme.icon.Nuvola */
qx.Theme.define("qx.theme.icon.Nuvola",
{title:"Nuvola",
icons:{uri:qx.core.Setting.get("qx.resourceUri")+"/icon/Nuvola"}});




/* ID: qx.theme.ClassicRoyale */
qx.Theme.define("qx.theme.ClassicRoyale",
{title:"Classic Royale",
meta:{color:qx.theme.classic.color.Royale,
border:qx.theme.classic.Border,
font:qx.theme.classic.font.Default,
widget:qx.theme.classic.Widget,
appearance:qx.theme.classic.Appearance,
icon:qx.theme.icon.Nuvola}});




/* ID: qx.application.Gui */
qx.Class.define("qx.application.Gui",
{extend:qx.core.Target,
implement:qx.application.IApplication,
properties:{uiReady:{check:"Boolean",
init:false}},
members:{main:function(){qx.ui.core.Widget.initScrollbarWidth();
qx.theme.manager.Meta.getInstance().initialize();
qx.event.handler.EventHandler.getInstance();
qx.ui.core.ClientDocument.getInstance();
qx.client.Timer.once(this._preload,
this,
0);
},
close:function(){},
terminate:function(){},
_preload:function(){this.debug("preloading visible images...");
this.__preloader=new qx.io.image.PreloaderSystem(qx.io.image.Manager.getInstance().getVisibleImages(),
this._preloaderDone,
this);
this.__preloader.start();
},
_preloaderDone:function(){this.setUiReady(true);
this.__preloader.dispose();
this.__preloader=null;
var start=(new Date).valueOf();
qx.ui.core.Widget.flushGlobalQueues();
this.info("render runtime: "+(new Date-start)+"ms");
qx.event.handler.EventHandler.getInstance().attachEvents();
qx.client.Timer.once(this._postload,
this,
100);
},
_postload:function(){this.debug("preloading hidden images...");
this.__postloader=new qx.io.image.PreloaderSystem(qx.io.image.Manager.getInstance().getHiddenImages(),
this._postloaderDone,
this);
this.__postloader.start();
},
_postloaderDone:function(){this.__postloader.dispose();
this.__postloader=null;
}}});




/* ID: qx.ui.core.Widget */
qx.Class.define("qx.ui.core.Widget",
{extend:qx.core.Target,
type:"abstract",
construct:function(){this.base(arguments);
this._layoutChanges={};
if(qx.core.Setting.get("qx.widgetDebugId")){this._generateHtmlId();
}},
events:{"beforeAppear":"qx.event.type.Event",
"appear":"qx.event.type.Event",
"beforeDisappear":"qx.event.type.Event",
"disappear":"qx.event.type.Event",
"beforeInsertDom":"qx.event.type.Event",
"insertDom":"qx.event.type.Event",
"beforeRemoveDom":"qx.event.type.Event",
"removeDom":"qx.event.type.Event",
"create":"qx.event.type.Event",
"execute":"qx.event.type.Event",
"mouseover":"qx.event.type.MouseEvent",
"mousemove":"qx.event.type.MouseEvent",
"mouseout":"qx.event.type.MouseEvent",
"mousedown":"qx.event.type.MouseEvent",
"mouseup":"qx.event.type.MouseEvent",
"mousewheel":"qx.event.type.MouseEvent",
"click":"qx.event.type.MouseEvent",
"dblclick":"qx.event.type.MouseEvent",
"contextmenu":"qx.event.type.MouseEvent",
"keydown":"qx.event.type.KeyEvent",
"keypress":"qx.event.type.KeyEvent",
"keyinput":"qx.event.type.KeyEvent",
"keyup":"qx.event.type.KeyEvent",
"focusout":"qx.event.type.FocusEvent",
"focusin":"qx.event.type.FocusEvent",
"blur":"qx.event.type.FocusEvent",
"focus":"qx.event.type.FocusEvent",
"dragdrop":"qx.event.type.DragEvent",
"dragout":"qx.event.type.DragEvent",
"dragover":"qx.event.type.DragEvent",
"dragmove":"qx.event.type.DragEvent",
"dragstart":"qx.event.type.DragEvent",
"dragend":"qx.event.type.DragEvent"},
statics:{create:function(clazz,
appearance){clazz._appearance=appearance;
return new clazz;
},
SCROLLBAR_SIZE:null,
_autoFlushTimeout:null,
_initAutoFlush:function(){if(qx.ui.core.Widget._autoFlushTimeout==null){qx.ui.core.Widget._autoFlushTimeout=window.setTimeout(qx.ui.core.Widget._autoFlushHelper,
0);
}},
_removeAutoFlush:function(){if(qx.ui.core.Widget._autoFlushTimeout!=null){window.clearTimeout(qx.ui.core.Widget._autoFlushTimeout);
qx.ui.core.Widget._autoFlushTimeout=null;
}},
_autoFlushHelper:function(){qx.ui.core.Widget._autoFlushTimeout=null;
if(!qx.core.Object.inGlobalDispose()){qx.ui.core.Widget.flushGlobalQueues();
}},
flushGlobalQueues:function(){if(qx.ui.core.Widget._autoFlushTimeout!=null){qx.ui.core.Widget._removeAutoFlush();
}
if(qx.ui.core.Widget._inFlushGlobalQueues){return;
}var app=qx.core.Init.getInstance().getApplication();
if(app.getUiReady&&!app.getUiReady()){return;
}qx.ui.core.Widget._inFlushGlobalQueues=true;
qx.ui.core.Widget.flushGlobalWidgetQueue();
qx.ui.core.Widget.flushGlobalStateQueue();
qx.ui.core.Widget.flushGlobalElementQueue();
qx.ui.core.Widget.flushGlobalJobQueue();
qx.ui.core.Widget.flushGlobalLayoutQueue();
qx.ui.core.Widget.flushGlobalDisplayQueue();
delete qx.ui.core.Widget._inFlushGlobalQueues;
},
_globalWidgetQueue:[],
addToGlobalWidgetQueue:function(vWidget){if(!vWidget._isInGlobalWidgetQueue&&vWidget._isDisplayable){if(qx.ui.core.Widget._autoFlushTimeout==null){qx.ui.core.Widget._initAutoFlush();
}qx.ui.core.Widget._globalWidgetQueue.push(vWidget);
vWidget._isInGlobalWidgetQueue=true;
}},
removeFromGlobalWidgetQueue:function(vWidget){if(vWidget._isInGlobalWidgetQueue){qx.lang.Array.remove(qx.ui.core.Widget._globalWidgetQueue,
vWidget);
delete vWidget._isInGlobalWidgetQueue;
}},
flushGlobalWidgetQueue:function(){var vQueue=qx.ui.core.Widget._globalWidgetQueue,
vLength,
vWidget;
while((vLength=vQueue.length)>0){for(var i=0;i<vLength;i++){vWidget=vQueue[i];
vWidget.flushWidgetQueue();
delete vWidget._isInGlobalWidgetQueue;
}vQueue.splice(0,
vLength);
}},
_globalElementQueue:[],
addToGlobalElementQueue:function(vWidget){if(!vWidget._isInGlobalElementQueue&&vWidget._isDisplayable){if(qx.ui.core.Widget._autoFlushTimeout==null){qx.ui.core.Widget._initAutoFlush();
}qx.ui.core.Widget._globalElementQueue.push(vWidget);
vWidget._isInGlobalElementQueue=true;
}},
removeFromGlobalElementQueue:function(vWidget){if(vWidget._isInGlobalElementQueue){qx.lang.Array.remove(qx.ui.core.Widget._globalElementQueue,
vWidget);
delete vWidget._isInGlobalElementQueue;
}},
flushGlobalElementQueue:function(){var vQueue=qx.ui.core.Widget._globalElementQueue,
vLength,
vWidget;
while((vLength=vQueue.length)>0){for(var i=0;i<vLength;i++){vWidget=vQueue[i];
vWidget._createElementImpl();
delete vWidget._isInGlobalElementQueue;
}vQueue.splice(0,
vLength);
}},
_globalStateQueue:[],
addToGlobalStateQueue:function(vWidget){if(!vWidget._isInGlobalStateQueue&&vWidget._isDisplayable){if(qx.ui.core.Widget._autoFlushTimeout==null){qx.ui.core.Widget._initAutoFlush();
}qx.ui.core.Widget._globalStateQueue.push(vWidget);
vWidget._isInGlobalStateQueue=true;
}},
removeFromGlobalStateQueue:function(vWidget){if(vWidget._isInGlobalStateQueue){qx.lang.Array.remove(qx.ui.core.Widget._globalStateQueue,
vWidget);
delete vWidget._isInGlobalStateQueue;
}},
flushGlobalStateQueue:function(){var vQueue=qx.ui.core.Widget._globalStateQueue,
vLength,
vWidget;
while((vLength=vQueue.length)>0){for(var i=0;i<vLength;i++){vWidget=vQueue[i];
vWidget._renderAppearance();
delete vWidget._isInGlobalStateQueue;
}vQueue.splice(0,
vLength);
}},
_globalJobQueue:[],
addToGlobalJobQueue:function(vWidget){if(!vWidget._isInGlobalJobQueue&&vWidget._isDisplayable){if(qx.ui.core.Widget._autoFlushTimeout==null){qx.ui.core.Widget._initAutoFlush();
}qx.ui.core.Widget._globalJobQueue.push(vWidget);
vWidget._isInGlobalJobQueue=true;
}},
removeFromGlobalJobQueue:function(vWidget){if(vWidget._isInGlobalJobQueue){qx.lang.Array.remove(qx.ui.core.Widget._globalJobQueue,
vWidget);
delete vWidget._isInGlobalJobQueue;
}},
flushGlobalJobQueue:function(){var vQueue=qx.ui.core.Widget._globalJobQueue,
vLength,
vWidget;
while((vLength=vQueue.length)>0){for(var i=0;i<vLength;i++){vWidget=vQueue[i];
vWidget._flushJobQueue(vWidget._jobQueue);
delete vWidget._isInGlobalJobQueue;
}vQueue.splice(0,
vLength);
}},
_globalLayoutQueue:[],
addToGlobalLayoutQueue:function(vParent){if(!vParent._isInGlobalLayoutQueue&&vParent._isDisplayable){if(qx.ui.core.Widget._autoFlushTimeout==null){qx.ui.core.Widget._initAutoFlush();
}qx.ui.core.Widget._globalLayoutQueue.push(vParent);
vParent._isInGlobalLayoutQueue=true;
}},
removeFromGlobalLayoutQueue:function(vParent){if(vParent._isInGlobalLayoutQueue){qx.lang.Array.remove(qx.ui.core.Widget._globalLayoutQueue,
vParent);
delete vParent._isInGlobalLayoutQueue;
}},
flushGlobalLayoutQueue:function(){var vQueue=qx.ui.core.Widget._globalLayoutQueue,
vLength,
vParent;
while((vLength=vQueue.length)>0){for(var i=0;i<vLength;i++){vParent=vQueue[i];
vParent._flushChildrenQueue();
delete vParent._isInGlobalLayoutQueue;
}vQueue.splice(0,
vLength);
}},
_fastGlobalDisplayQueue:[],
_lazyGlobalDisplayQueues:{},
addToGlobalDisplayQueue:function(vWidget){if(!vWidget._isInGlobalDisplayQueue&&vWidget._isDisplayable){if(qx.ui.core.Widget._autoFlushTimeout==null){qx.ui.core.Widget._initAutoFlush();
}var vParent=vWidget.getParent();
if(vParent.isSeeable()){var vKey=vParent.toHashCode();
if(qx.ui.core.Widget._lazyGlobalDisplayQueues[vKey]){qx.ui.core.Widget._lazyGlobalDisplayQueues[vKey].push(vWidget);
}else{qx.ui.core.Widget._lazyGlobalDisplayQueues[vKey]=[vWidget];
}}else{qx.ui.core.Widget._fastGlobalDisplayQueue.push(vWidget);
}vWidget._isInGlobalDisplayQueue=true;
}},
removeFromGlobalDisplayQueue:function(vWidget){},
flushGlobalDisplayQueue:function(){var vKey,
vLazyQueue,
vWidget,
vFragment;
var vFastQueue=qx.ui.core.Widget._fastGlobalDisplayQueue;
var vLazyQueues=qx.ui.core.Widget._lazyGlobalDisplayQueues;
for(var i=0,
l=vFastQueue.length;i<l;i++){vWidget=vFastQueue[i];
vWidget.getParent()._getTargetNode().appendChild(vWidget.getElement());
}if(qx.Class.isDefined("qx.ui.basic.Inline")){for(vKey in vLazyQueues){vLazyQueue=vLazyQueues[vKey];
for(var i=0;i<vLazyQueue.length;i++){vWidget=vLazyQueue[i];
if(vWidget instanceof qx.ui.basic.Inline){vWidget._beforeInsertDom();
try{document.getElementById(vWidget.getInlineNodeId()).appendChild(vWidget.getElement());
}catch(ex){vWidget.debug("Could not append to inline id: "+vWidget.getInlineNodeId(),
ex);
}vWidget._afterInsertDom();
vWidget._afterAppear();
qx.lang.Array.remove(vLazyQueue,
vWidget);
i--;
delete vWidget._isInGlobalDisplayQueue;
}}}}for(vKey in vLazyQueues){vLazyQueue=vLazyQueues[vKey];
if(document.createDocumentFragment&&vLazyQueue.length>=3){vFragment=document.createDocumentFragment();
for(var i=0,
l=vLazyQueue.length;i<l;i++){vWidget=vLazyQueue[i];
vWidget._beforeInsertDom();
vFragment.appendChild(vWidget.getElement());
}vLazyQueue[0].getParent()._getTargetNode().appendChild(vFragment);
for(var i=0,
l=vLazyQueue.length;i<l;i++){vWidget=vLazyQueue[i];
vWidget._afterInsertDom();
}}else{for(var i=0,
l=vLazyQueue.length;i<l;i++){vWidget=vLazyQueue[i];
vWidget._beforeInsertDom();
vWidget.getParent()._getTargetNode().appendChild(vWidget.getElement());
vWidget._afterInsertDom();
}}}for(vKey in vLazyQueues){vLazyQueue=vLazyQueues[vKey];
for(var i=0,
l=vLazyQueue.length;i<l;i++){vWidget=vLazyQueue[i];
if(vWidget.getVisibility()){vWidget._afterAppear();
}delete vWidget._isInGlobalDisplayQueue;
}delete vLazyQueues[vKey];
}for(var i=0,
l=vFastQueue.length;i<l;i++){delete vFastQueue[i]._isInGlobalDisplayQueue;
}qx.lang.Array.removeAll(vFastQueue);
},
getActiveSiblingHelperIgnore:function(vIgnoreClasses,
vInstance){for(var j=0;j<vIgnoreClasses.length;j++){if(vInstance instanceof vIgnoreClasses[j]){return true;
}}return false;
},
getActiveSiblingHelper:function(vObject,
vParent,
vCalc,
vIgnoreClasses,
vMode){if(!vIgnoreClasses){vIgnoreClasses=[];
}var vChilds=vParent.getChildren();
var vPosition=vMode==null?vChilds.indexOf(vObject)+vCalc:vMode==="first"?0:vChilds.length-1;
var vInstance=vChilds[vPosition];
while(vInstance&&(!vInstance.getEnabled()||qx.ui.core.Widget.getActiveSiblingHelperIgnore(vIgnoreClasses,
vInstance))){vPosition+=vCalc;
vInstance=vChilds[vPosition];
if(!vInstance){return null;
}}return vInstance;
},
__initApplyMethods:function(members){var applyRuntime="_renderRuntime";
var resetRuntime="_resetRuntime";
var style="this._style.";
var cssValue="=((v==null)?0:v)+'px'";
var parameter="v";
var properties=["left",
"right",
"top",
"bottom",
"width",
"height",
"minWidth",
"maxWidth",
"minHeight",
"maxHeight"];
var propertiesUpper=["Left",
"Right",
"Top",
"Bottom",
"Width",
"Height",
"MinWidth",
"MaxWidth",
"MinHeight",
"MaxHeight"];
var applyMargin=applyRuntime+"Margin";
var resetMargin=resetRuntime+"Margin";
var styleMargin=style+"margin";
for(var i=0;i<4;i++){members[applyMargin+propertiesUpper[i]]=new Function(parameter,
styleMargin+propertiesUpper[i]+cssValue);
members[resetMargin+propertiesUpper[i]]=new Function(styleMargin+propertiesUpper[i]+"=''");
}var applyPadding=applyRuntime+"Padding";
var resetPadding=resetRuntime+"Padding";
var stylePadding=style+"padding";
if(qx.core.Variant.isSet("qx.client",
"gecko")){for(var i=0;i<4;i++){members[applyPadding+propertiesUpper[i]]=new Function(parameter,
stylePadding+propertiesUpper[i]+cssValue);
members[resetPadding+propertiesUpper[i]]=new Function(stylePadding+propertiesUpper[i]+"=''");
}}else{for(var i=0;i<4;i++){members[applyPadding+propertiesUpper[i]]=new Function(parameter,
"this.setStyleProperty('padding"+propertiesUpper[i]+"', ((v==null)?0:v)+'px')");
members[resetPadding+propertiesUpper[i]]=new Function("this.removeStyleProperty('padding"+propertiesUpper[i]+"')");
}}for(var i=0;i<properties.length;i++){members[applyRuntime+propertiesUpper[i]]=new Function(parameter,
style+properties[i]+cssValue);
members[resetRuntime+propertiesUpper[i]]=new Function(style+properties[i]+"=''");
}},
TYPE_NULL:0,
TYPE_PIXEL:1,
TYPE_PERCENT:2,
TYPE_AUTO:3,
TYPE_FLEX:4,
layoutPropertyTypes:{},
__initLayoutProperties:function(statics){var a=["width",
"height",
"minWidth",
"maxWidth",
"minHeight",
"maxHeight",
"left",
"right",
"top",
"bottom"];
for(var i=0,
l=a.length,
p,
b,
t;i<l;i++){p=a[i];
b="_computed"+qx.lang.String.toFirstUp(p);
t=b+"Type";
statics.layoutPropertyTypes[p]={dataType:t,
dataParsed:b+"Parsed",
dataValue:b+"Value",
typePixel:t+"Pixel",
typePercent:t+"Percent",
typeAuto:t+"Auto",
typeFlex:t+"Flex",
typeNull:t+"Null"};
}},
initScrollbarWidth:function(){var t=document.createElement("div");
var s=t.style;
s.height=s.width="100px";
s.overflow="scroll";
document.body.appendChild(t);
var c=qx.html.Dimension.getScrollBarSizeRight(t);
qx.ui.core.Widget.SCROLLBAR_SIZE=c?c:16;
document.body.removeChild(t);
},
_idCounter:0},
properties:{enabled:{init:"inherit",
check:"Boolean",
inheritable:true,
apply:"_applyEnabled",
event:"changeEnabled"},
parent:{check:"qx.ui.core.Parent",
nullable:true,
event:"changeParent",
apply:"_applyParent"},
element:{check:"Element",
nullable:true,
apply:"_applyElement",
event:"changeElement"},
visibility:{check:"Boolean",
init:true,
apply:"_applyVisibility",
event:"changeVisibility"},
display:{check:"Boolean",
init:true,
apply:"_applyDisplay",
event:"changeDisplay"},
anonymous:{check:"Boolean",
init:false,
event:"changeAnonymous"},
horizontalAlign:{check:["left",
"center",
"right"],
themeable:true,
nullable:true},
verticalAlign:{check:["top",
"middle",
"bottom"],
themeable:true,
nullable:true},
allowStretchX:{check:"Boolean",
init:true},
allowStretchY:{check:"Boolean",
init:true},
zIndex:{check:"Number",
apply:"_applyZIndex",
event:"changeZIndex",
themeable:true,
nullable:true,
init:null},
backgroundColor:{nullable:true,
init:null,
check:"Color",
apply:"_applyBackgroundColor",
event:"changeBackgroundColor",
themeable:true},
textColor:{nullable:true,
init:"inherit",
check:"Color",
apply:"_applyTextColor",
event:"changeTextColor",
themeable:true,
inheritable:true},
border:{nullable:true,
init:null,
apply:"_applyBorder",
event:"changeBorder",
check:"Border",
themeable:true},
font:{nullable:true,
init:"inherit",
apply:"_applyFont",
check:"Font",
event:"changeFont",
themeable:true,
inheritable:true},
opacity:{check:"Number",
apply:"_applyOpacity",
themeable:true,
nullable:true,
init:null},
cursor:{check:"String",
apply:"_applyCursor",
themeable:true,
nullable:true,
init:null},
backgroundImage:{check:"String",
nullable:true,
apply:"_applyBackgroundImage",
themeable:true},
backgroundRepeat:{check:"String",
nullable:true,
apply:"_applyBackgroundRepeat",
themeable:true},
overflow:{check:["hidden",
"auto",
"scroll",
"scrollX",
"scrollY"],
nullable:true,
apply:"_applyOverflow",
event:"changeOverflow",
themeable:true,
init:null},
clipLeft:{check:"Integer",
apply:"_applyClip",
themeable:true,
nullable:true},
clipTop:{check:"Integer",
apply:"_applyClip",
themeable:true,
nullable:true},
clipWidth:{check:"Integer",
apply:"_applyClip",
themeable:true,
nullable:true},
clipHeight:{check:"Integer",
apply:"_applyClip",
themeable:true,
nullable:true},
tabIndex:{check:"Integer",
nullable:true,
init:null,
apply:"_applyTabIndex",
event:"changeTabIndex"},
hideFocus:{check:"Boolean",
init:false,
apply:"_applyHideFocus",
themeable:true},
enableElementFocus:{check:"Boolean",
init:true},
focused:{check:"Boolean",
init:false,
apply:"_applyFocused",
event:"changeFocused"},
selectable:{check:"Boolean",
init:null,
nullable:true,
apply:"_applySelectable"},
toolTip:{check:"qx.ui.popup.ToolTip",
nullable:true},
contextMenu:{check:"qx.ui.menu.Menu",
nullable:true},
capture:{check:"Boolean",
init:false,
apply:"_applyCapture",
event:"changeCapture"},
dropDataTypes:{nullable:true,
dispose:true},
command:{check:"qx.client.Command",
nullable:true,
apply:"_applyCommand"},
appearance:{check:"String",
init:"widget",
apply:"_applyAppearance",
event:"changeAppearance"},
supportsDropMethod:{check:"Function",
nullable:true,
init:null},
marginTop:{check:"Number",
apply:"_applyMarginTop",
nullable:true,
themeable:true},
marginRight:{check:"Number",
apply:"_applyMarginRight",
nullable:true,
themeable:true},
marginBottom:{check:"Number",
apply:"_applyMarginBottom",
nullable:true,
themeable:true},
marginLeft:{check:"Number",
apply:"_applyMarginLeft",
nullable:true,
themeable:true},
paddingTop:{check:"Number",
apply:"_applyPaddingTop",
nullable:true,
themeable:true},
paddingRight:{check:"Number",
apply:"_applyPaddingRight",
nullable:true,
themeable:true},
paddingBottom:{check:"Number",
apply:"_applyPaddingBottom",
nullable:true,
themeable:true},
paddingLeft:{check:"Number",
apply:"_applyPaddingLeft",
nullable:true,
themeable:true},
left:{apply:"_applyLeft",
event:"changeLeft",
nullable:true,
themeable:true,
init:null},
right:{apply:"_applyRight",
event:"changeRight",
nullable:true,
themeable:true,
init:null},
width:{apply:"_applyWidth",
event:"changeWidth",
nullable:true,
themeable:true,
init:null},
minWidth:{apply:"_applyMinWidth",
event:"changeMinWidth",
nullable:true,
themeable:true,
init:null},
maxWidth:{apply:"_applyMaxWidth",
event:"changeMaxWidth",
nullable:true,
themeable:true,
init:null},
top:{apply:"_applyTop",
event:"changeTop",
nullable:true,
themeable:true,
init:null},
bottom:{apply:"_applyBottom",
event:"changeBottom",
nullable:true,
themeable:true,
init:null},
height:{apply:"_applyHeight",
event:"changeHeight",
nullable:true,
themeable:true,
init:null},
minHeight:{apply:"_applyMinHeight",
event:"changeMinHeight",
nullable:true,
themeable:true,
init:null},
maxHeight:{apply:"_applyMaxHeight",
event:"changeMaxHeight",
nullable:true,
themeable:true,
init:null},
location:{group:["left",
"top"],
themeable:true},
dimension:{group:["width",
"height"],
themeable:true},
space:{group:["left",
"width",
"top",
"height"],
themeable:true},
edge:{group:["top",
"right",
"bottom",
"left"],
themeable:true,
mode:"shorthand"},
padding:{group:["paddingTop",
"paddingRight",
"paddingBottom",
"paddingLeft"],
mode:"shorthand",
themeable:true},
margin:{group:["marginTop",
"marginRight",
"marginBottom",
"marginLeft"],
mode:"shorthand",
themeable:true},
heights:{group:["minHeight",
"height",
"maxHeight"],
themeable:true},
widths:{group:["minWidth",
"width",
"maxWidth"],
themeable:true},
align:{group:["horizontalAlign",
"verticalAlign"],
themeable:true},
clipLocation:{group:["clipLeft",
"clipTop"]},
clipDimension:{group:["clipWidth",
"clipHeight"]},
clip:{group:["clipLeft",
"clipTop",
"clipWidth",
"clipHeight"]},
innerWidth:{_cached:true,
defaultValue:null},
innerHeight:{_cached:true,
defaultValue:null},
boxWidth:{_cached:true,
defaultValue:null},
boxHeight:{_cached:true,
defaultValue:null},
outerWidth:{_cached:true,
defaultValue:null},
outerHeight:{_cached:true,
defaultValue:null},
frameWidth:{_cached:true,
defaultValue:null,
addToQueueRuntime:true},
frameHeight:{_cached:true,
defaultValue:null,
addToQueueRuntime:true},
preferredInnerWidth:{_cached:true,
defaultValue:null,
addToQueueRuntime:true},
preferredInnerHeight:{_cached:true,
defaultValue:null,
addToQueueRuntime:true},
preferredBoxWidth:{_cached:true,
defaultValue:null},
preferredBoxHeight:{_cached:true,
defaultValue:null},
hasPercentX:{_cached:true,
defaultValue:false},
hasPercentY:{_cached:true,
defaultValue:false},
hasAutoX:{_cached:true,
defaultValue:false},
hasAutoY:{_cached:true,
defaultValue:false},
hasFlexX:{_cached:true,
defaultValue:false},
hasFlexY:{_cached:true,
defaultValue:false}},
members:{_computedLeftValue:null,
_computedLeftParsed:null,
_computedLeftType:null,
_computedLeftTypeNull:true,
_computedLeftTypePixel:false,
_computedLeftTypePercent:false,
_computedLeftTypeAuto:false,
_computedLeftTypeFlex:false,
_computedRightValue:null,
_computedRightParsed:null,
_computedRightType:null,
_computedRightTypeNull:true,
_computedRightTypePixel:false,
_computedRightTypePercent:false,
_computedRightTypeAuto:false,
_computedRightTypeFlex:false,
_computedTopValue:null,
_computedTopParsed:null,
_computedTopType:null,
_computedTopTypeNull:true,
_computedTopTypePixel:false,
_computedTopTypePercent:false,
_computedTopTypeAuto:false,
_computedTopTypeFlex:false,
_computedBottomValue:null,
_computedBottomParsed:null,
_computedBottomType:null,
_computedBottomTypeNull:true,
_computedBottomTypePixel:false,
_computedBottomTypePercent:false,
_computedBottomTypeAuto:false,
_computedBottomTypeFlex:false,
_computedWidthValue:null,
_computedWidthParsed:null,
_computedWidthType:null,
_computedWidthTypeNull:true,
_computedWidthTypePixel:false,
_computedWidthTypePercent:false,
_computedWidthTypeAuto:false,
_computedWidthTypeFlex:false,
_computedMinWidthValue:null,
_computedMinWidthParsed:null,
_computedMinWidthType:null,
_computedMinWidthTypeNull:true,
_computedMinWidthTypePixel:false,
_computedMinWidthTypePercent:false,
_computedMinWidthTypeAuto:false,
_computedMinWidthTypeFlex:false,
_computedMaxWidthValue:null,
_computedMaxWidthParsed:null,
_computedMaxWidthType:null,
_computedMaxWidthTypeNull:true,
_computedMaxWidthTypePixel:false,
_computedMaxWidthTypePercent:false,
_computedMaxWidthTypeAuto:false,
_computedMaxWidthTypeFlex:false,
_computedHeightValue:null,
_computedHeightParsed:null,
_computedHeightType:null,
_computedHeightTypeNull:true,
_computedHeightTypePixel:false,
_computedHeightTypePercent:false,
_computedHeightTypeAuto:false,
_computedHeightTypeFlex:false,
_computedMinHeightValue:null,
_computedMinHeightParsed:null,
_computedMinHeightType:null,
_computedMinHeightTypeNull:true,
_computedMinHeightTypePixel:false,
_computedMinHeightTypePercent:false,
_computedMinHeightTypeAuto:false,
_computedMinHeightTypeFlex:false,
_computedMaxHeightValue:null,
_computedMaxHeightParsed:null,
_computedMaxHeightType:null,
_computedMaxHeightTypeNull:true,
_computedMaxHeightTypePixel:false,
_computedMaxHeightTypePercent:false,
_computedMaxHeightTypeAuto:false,
_computedMaxHeightTypeFlex:false,
_applyLeft:function(value,
old){this._unitDetectionPixelPercent("left",
value);
this.addToQueue("left");
},
_applyRight:function(value,
old){this._unitDetectionPixelPercent("right",
value);
this.addToQueue("right");
},
_applyTop:function(value,
old){this._unitDetectionPixelPercent("top",
value);
this.addToQueue("top");
},
_applyBottom:function(value,
old){this._unitDetectionPixelPercent("bottom",
value);
this.addToQueue("bottom");
},
_applyWidth:function(value,
old){this._unitDetectionPixelPercentAutoFlex("width",
value);
this.addToQueue("width");
},
_applyMinWidth:function(value,
old){this._unitDetectionPixelPercentAuto("minWidth",
value);
this.addToQueue("minWidth");
},
_applyMaxWidth:function(value,
old){this._unitDetectionPixelPercentAuto("maxWidth",
value);
this.addToQueue("maxWidth");
},
_applyHeight:function(value,
old){this._unitDetectionPixelPercentAutoFlex("height",
value);
this.addToQueue("height");
},
_applyMinHeight:function(value,
old){this._unitDetectionPixelPercentAuto("minHeight",
value);
this.addToQueue("minHeight");
},
_applyMaxHeight:function(value,
old){this._unitDetectionPixelPercentAuto("maxHeight",
value);
this.addToQueue("maxHeight");
},
isMaterialized:function(){var elem=this._element;
return (this._initialLayoutDone&&this._isDisplayable&&qx.html.Style.getStyleProperty(elem,
"display")!="none"&&qx.html.Style.getStyleProperty(elem,
"visibility")!="hidden"&&elem.offsetWidth>0&&elem.offsetHeight>0);
},
pack:function(){this.setWidth(this.getPreferredBoxWidth());
this.setHeight(this.getPreferredBoxHeight());
},
auto:function(){this.setWidth("auto");
this.setHeight("auto");
},
getChildren:qx.lang.Function.returnNull,
getChildrenLength:qx.lang.Function.returnZero,
hasChildren:qx.lang.Function.returnFalse,
isEmpty:qx.lang.Function.returnTrue,
indexOf:qx.lang.Function.returnNegativeIndex,
contains:qx.lang.Function.returnFalse,
getVisibleChildren:qx.lang.Function.returnNull,
getVisibleChildrenLength:qx.lang.Function.returnZero,
hasVisibleChildren:qx.lang.Function.returnFalse,
isVisibleEmpty:qx.lang.Function.returnTrue,
_hasParent:false,
_isDisplayable:false,
isDisplayable:function(){return this._isDisplayable;
},
_checkParent:function(value,
old){if(this.contains(value)){throw new Error("Could not insert myself into a child "+value+"!");
}return value;
},
_applyParent:function(value,
old){if(old){var vOldIndex=old.getChildren().indexOf(this);
this._computedWidthValue=this._computedMinWidthValue=this._computedMaxWidthValue=this._computedLeftValue=this._computedRightValue=null;
this._computedHeightValue=this._computedMinHeightValue=this._computedMaxHeightValue=this._computedTopValue=this._computedBottomValue=null;
this._cachedBoxWidth=this._cachedInnerWidth=this._cachedOuterWidth=null;
this._cachedBoxHeight=this._cachedInnerHeight=this._cachedOuterHeight=null;
qx.lang.Array.removeAt(old.getChildren(),
vOldIndex);
old._invalidateVisibleChildren();
old._removeChildFromChildrenQueue(this);
old.getLayoutImpl().updateChildrenOnRemoveChild(this,
vOldIndex);
old.addToJobQueue("removeChild");
old._invalidatePreferredInnerDimensions();
this._oldParent=old;
}
if(value){this._hasParent=true;
if(typeof this._insertIndex=="number"){qx.lang.Array.insertAt(value.getChildren(),
this,
this._insertIndex);
delete this._insertIndex;
}else{value.getChildren().push(this);
}}else{this._hasParent=false;
}qx.core.Property.refresh(this);
return this._handleDisplayable("parent");
},
_applyDisplay:function(value,
old){return this._handleDisplayable("display");
},
_handleDisplayable:function(vHint){var vDisplayable=this._computeDisplayable();
if(this._isDisplayable==vDisplayable&&!(vDisplayable&&vHint=="parent")){return true;
}this._isDisplayable=vDisplayable;
var vParent=this.getParent();
if(vParent){vParent._invalidateVisibleChildren();
vParent._invalidatePreferredInnerDimensions();
}if(vHint&&this._oldParent&&this._oldParent._initialLayoutDone){var elem=this.getElement();
if(elem){if(this.getVisibility()){this._beforeDisappear();
}this._beforeRemoveDom();
try{this._oldParent._getTargetNode().removeChild(elem);
}catch(e){}this._afterRemoveDom();
if(this.getVisibility()){this._afterDisappear();
}}delete this._oldParent;
}if(vDisplayable){if(vParent._initialLayoutDone){vParent.getLayoutImpl().updateChildrenOnAddChild(this,
vParent.getChildren().indexOf(this));
vParent.addToJobQueue("addChild");
}this.addToLayoutChanges("initial");
this.addToCustomQueues(vHint);
if(this.getVisibility()){this._beforeAppear();
}if(!this._isCreated){qx.ui.core.Widget.addToGlobalElementQueue(this);
}qx.ui.core.Widget.addToGlobalStateQueue(this);
if(!qx.lang.Object.isEmpty(this._jobQueue)){qx.ui.core.Widget.addToGlobalJobQueue(this);
}
if(!qx.lang.Object.isEmpty(this._childrenQueue)){qx.ui.core.Widget.addToGlobalLayoutQueue(this);
}}else{qx.ui.core.Widget.removeFromGlobalElementQueue(this);
qx.ui.core.Widget.removeFromGlobalStateQueue(this);
qx.ui.core.Widget.removeFromGlobalJobQueue(this);
qx.ui.core.Widget.removeFromGlobalLayoutQueue(this);
this.removeFromCustomQueues(vHint);
if(vParent&&vHint){if(this.getVisibility()){this._beforeDisappear();
}if(vParent._initialLayoutDone&&this._initialLayoutDone){vParent.getLayoutImpl().updateChildrenOnRemoveChild(this,
vParent.getChildren().indexOf(this));
vParent.addToJobQueue("removeChild");
this._beforeRemoveDom();
var parentNode=this.getElement().parentNode;
if(parentNode){parentNode.removeChild(this.getElement());
if(parentNode&&parentNode!==vParent._getTargetNode()){this.warn("Unexpected parent node: "+parentNode);
}}this._afterRemoveDom();
}vParent._removeChildFromChildrenQueue(this);
if(this.getVisibility()){this._afterDisappear();
}}}this._handleDisplayableCustom(vDisplayable,
vParent,
vHint);
return true;
},
addToCustomQueues:qx.lang.Function.returnTrue,
removeFromCustomQueues:qx.lang.Function.returnTrue,
_handleDisplayableCustom:qx.lang.Function.returnTrue,
_computeDisplayable:function(){return this.getDisplay()&&this.getParent()&&this.getParent()._isDisplayable?true:false;
},
_beforeAppear:function(){this.createDispatchEvent("beforeAppear");
},
_afterAppear:function(){this._isSeeable=true;
this.createDispatchEvent("appear");
},
_beforeDisappear:function(){this.removeState("over");
if(qx.Class.isDefined("qx.ui.form.Button")){this.removeState("pressed");
this.removeState("abandoned");
}this.createDispatchEvent("beforeDisappear");
},
_afterDisappear:function(){this._isSeeable=false;
this.createDispatchEvent("disappear");
},
_isSeeable:false,
isSeeable:function(){return this._isSeeable;
},
isAppearRelevant:function(){return this.getVisibility()&&this._isDisplayable;
},
_beforeInsertDom:function(){this.createDispatchEvent("beforeInsertDom");
},
_afterInsertDom:function(){this.createDispatchEvent("insertDom");
},
_beforeRemoveDom:function(){this.createDispatchEvent("beforeRemoveDom");
},
_afterRemoveDom:function(){this.createDispatchEvent("removeDom");
},
_applyVisibility:function(value,
old){if(value){if(this._isDisplayable){this._beforeAppear();
}this.removeStyleProperty("display");
if(this._isDisplayable){this._afterAppear();
}}else{if(this._isDisplayable){this._beforeDisappear();
}this.setStyleProperty("display",
"none");
if(this._isDisplayable){this._afterDisappear();
}}},
show:function(){this.setVisibility(true);
this.setDisplay(true);
},
hide:function(){this.setVisibility(false);
},
connect:function(){this.setDisplay(true);
},
disconnect:function(){this.setDisplay(false);
},
_isCreated:false,
_getTargetNode:qx.core.Variant.select("qx.client",
{"gecko":function(){return this._element;
},
"default":function(){return this._borderElement||this._element;
}}),
addToDocument:function(){qx.ui.core.ClientDocument.getInstance().add(this);
},
isCreated:function(){return this._isCreated;
},
_createElementImpl:function(){this.setElement(this.getTopLevelWidget().getDocumentElement().createElement("div"));
},
_applyElement:function(value,
old){this._isCreated=value!=null;
if(old){old.qx_Widget=null;
}
if(value){value.qx_Widget=this;
value.style.position="absolute";
this._element=value;
this._style=value.style;
this._applyStyleProperties(value);
this._applyHtmlProperties(value);
this._applyHtmlAttributes(value);
this._applyElementData(value);
this.createDispatchEvent("create");
this.addToStateQueue();
}else{this._element=this._style=null;
}},
addToJobQueue:function(p){if(this._hasParent){qx.ui.core.Widget.addToGlobalJobQueue(this);
}
if(!this._jobQueue){this._jobQueue={};
}this._jobQueue[p]=true;
return true;
},
_flushJobQueue:function(q){try{var vQueue=this._jobQueue;
var vParent=this.getParent();
if(!vParent||qx.lang.Object.isEmpty(vQueue)){return;
}var vLayoutImpl=this instanceof qx.ui.core.Parent?this.getLayoutImpl():null;
if(vLayoutImpl){vLayoutImpl.updateSelfOnJobQueueFlush(vQueue);
}}catch(ex){this.error("Flushing job queue (prechecks#1) failed",
ex);
}try{var vFlushParentJobQueue=false;
var vRecomputeOuterWidth=vQueue.marginLeft||vQueue.marginRight;
var vRecomputeOuterHeight=vQueue.marginTop||vQueue.marginBottom;
var vRecomputeInnerWidth=vQueue.frameWidth;
var vRecomputeInnerHeight=vQueue.frameHeight;
var vRecomputeParentPreferredInnerWidth=(vQueue.frameWidth||vQueue.preferredInnerWidth)&&this._recomputePreferredBoxWidth();
var vRecomputeParentPreferredInnerHeight=(vQueue.frameHeight||vQueue.preferredInnerHeight)&&this._recomputePreferredBoxHeight();
if(vRecomputeParentPreferredInnerWidth){var vPref=this.getPreferredBoxWidth();
if(this._computedWidthTypeAuto){this._computedWidthValue=vPref;
vQueue.width=true;
}
if(this._computedMinWidthTypeAuto){this._computedMinWidthValue=vPref;
vQueue.minWidth=true;
}
if(this._computedMaxWidthTypeAuto){this._computedMaxWidthValue=vPref;
vQueue.maxWidth=true;
}}
if(vRecomputeParentPreferredInnerHeight){var vPref=this.getPreferredBoxHeight();
if(this._computedHeightTypeAuto){this._computedHeightValue=vPref;
vQueue.height=true;
}
if(this._computedMinHeightTypeAuto){this._computedMinHeightValue=vPref;
vQueue.minHeight=true;
}
if(this._computedMaxHeightTypeAuto){this._computedMaxHeightValue=vPref;
vQueue.maxHeight=true;
}}
if((vQueue.width||vQueue.minWidth||vQueue.maxWidth||vQueue.left||vQueue.right)&&this._recomputeBoxWidth()){vRecomputeOuterWidth=vRecomputeInnerWidth=true;
}
if((vQueue.height||vQueue.minHeight||vQueue.maxHeight||vQueue.top||vQueue.bottom)&&this._recomputeBoxHeight()){vRecomputeOuterHeight=vRecomputeInnerHeight=true;
}}catch(ex){this.error("Flushing job queue (recompute#2) failed",
ex);
}try{if((vRecomputeOuterWidth&&this._recomputeOuterWidth())||vRecomputeParentPreferredInnerWidth){vParent._invalidatePreferredInnerWidth();
vParent.getLayoutImpl().updateSelfOnChildOuterWidthChange(this);
vFlushParentJobQueue=true;
}
if((vRecomputeOuterHeight&&this._recomputeOuterHeight())||vRecomputeParentPreferredInnerHeight){vParent._invalidatePreferredInnerHeight();
vParent.getLayoutImpl().updateSelfOnChildOuterHeightChange(this);
vFlushParentJobQueue=true;
}
if(vFlushParentJobQueue){vParent._flushJobQueue();
}}catch(ex){this.error("Flushing job queue (parentsignals#3) failed",
ex);
}try{vParent._addChildToChildrenQueue(this);
for(var i in vQueue){this._layoutChanges[i]=true;
}}catch(ex){this.error("Flushing job queue (addjobs#4) failed",
ex);
}try{if(this instanceof qx.ui.core.Parent&&(vQueue.paddingLeft||vQueue.paddingRight||vQueue.paddingTop||vQueue.paddingBottom)){var ch=this.getChildren(),
chl=ch.length;
if(vQueue.paddingLeft){for(var i=0;i<chl;i++){ch[i].addToLayoutChanges("parentPaddingLeft");
}}
if(vQueue.paddingRight){for(var i=0;i<chl;i++){ch[i].addToLayoutChanges("parentPaddingRight");
}}
if(vQueue.paddingTop){for(var i=0;i<chl;i++){ch[i].addToLayoutChanges("parentPaddingTop");
}}
if(vQueue.paddingBottom){for(var i=0;i<chl;i++){ch[i].addToLayoutChanges("parentPaddingBottom");
}}}
if(vRecomputeInnerWidth){this._recomputeInnerWidth();
}
if(vRecomputeInnerHeight){this._recomputeInnerHeight();
}
if(this._initialLayoutDone){if(vLayoutImpl){vLayoutImpl.updateChildrenOnJobQueueFlush(vQueue);
}}}catch(ex){this.error("Flushing job queue (childrensignals#5) failed",
ex);
}delete this._jobQueue;
},
_isWidthEssential:qx.lang.Function.returnTrue,
_isHeightEssential:qx.lang.Function.returnTrue,
_computeBoxWidthFallback:function(){return 0;
},
_computeBoxHeightFallback:function(){return 0;
},
_computeBoxWidth:function(){var vLayoutImpl=this.getParent().getLayoutImpl();
return Math.max(0,
qx.lang.Number.limit(vLayoutImpl.computeChildBoxWidth(this),
this.getMinWidthValue(),
this.getMaxWidthValue()));
},
_computeBoxHeight:function(){var vLayoutImpl=this.getParent().getLayoutImpl();
return Math.max(0,
qx.lang.Number.limit(vLayoutImpl.computeChildBoxHeight(this),
this.getMinHeightValue(),
this.getMaxHeightValue()));
},
_computeOuterWidth:function(){return Math.max(0,
(this.getMarginLeft()+this.getBoxWidth()+this.getMarginRight()));
},
_computeOuterHeight:function(){return Math.max(0,
(this.getMarginTop()+this.getBoxHeight()+this.getMarginBottom()));
},
_computeInnerWidth:function(){return Math.max(0,
this.getBoxWidth()-this.getFrameWidth());
},
_computeInnerHeight:function(){return Math.max(0,
this.getBoxHeight()-this.getFrameHeight());
},
getNeededWidth:function(){var vLayoutImpl=this.getParent().getLayoutImpl();
return Math.max(0,
vLayoutImpl.computeChildNeededWidth(this));
},
getNeededHeight:function(){var vLayoutImpl=this.getParent().getLayoutImpl();
return Math.max(0,
vLayoutImpl.computeChildNeededHeight(this));
},
_recomputeFlexX:function(){if(!this.getHasFlexX()){return false;
}
if(this._computedWidthTypeFlex){this._computedWidthValue=null;
this.addToLayoutChanges("width");
}return true;
},
_recomputeFlexY:function(){if(!this.getHasFlexY()){return false;
}
if(this._computedHeightTypeFlex){this._computedHeightValue=null;
this.addToLayoutChanges("height");
}return true;
},
_recomputePercentX:function(){if(!this.getHasPercentX()){return false;
}
if(this._computedWidthTypePercent){this._computedWidthValue=null;
this.addToLayoutChanges("width");
}
if(this._computedMinWidthTypePercent){this._computedMinWidthValue=null;
this.addToLayoutChanges("minWidth");
}
if(this._computedMaxWidthTypePercent){this._computedMaxWidthValue=null;
this.addToLayoutChanges("maxWidth");
}
if(this._computedLeftTypePercent){this._computedLeftValue=null;
this.addToLayoutChanges("left");
}
if(this._computedRightTypePercent){this._computedRightValue=null;
this.addToLayoutChanges("right");
}return true;
},
_recomputePercentY:function(){if(!this.getHasPercentY()){return false;
}
if(this._computedHeightTypePercent){this._computedHeightValue=null;
this.addToLayoutChanges("height");
}
if(this._computedMinHeightTypePercent){this._computedMinHeightValue=null;
this.addToLayoutChanges("minHeight");
}
if(this._computedMaxHeightTypePercent){this._computedMaxHeightValue=null;
this.addToLayoutChanges("maxHeight");
}
if(this._computedTopTypePercent){this._computedTopValue=null;
this.addToLayoutChanges("top");
}
if(this._computedBottomTypePercent){this._computedBottomValue=null;
this.addToLayoutChanges("bottom");
}return true;
},
_recomputeRangeX:qx.core.Variant.select("qx.client",
{"mshtml|opera|webkit":function(){if(this._computedLeftTypeNull||this._computedRightTypeNull){return false;
}this.addToLayoutChanges("width");
return true;
},
"default":function(){return !(this._computedLeftTypeNull||this._computedRightTypeNull);
}}),
_recomputeRangeY:qx.core.Variant.select("qx.client",
{"mshtml|opera|webkit":function(){if(this._computedTopTypeNull||this._computedBottomTypeNull){return false;
}this.addToLayoutChanges("height");
return true;
},
"default":function(){return !(this._computedTopTypeNull||this._computedBottomTypeNull);
}}),
_recomputeStretchingX:qx.core.Variant.select("qx.client",
{"mshtml|opera|webkit":function(){if(this.getAllowStretchX()&&this._computedWidthTypeNull){this._computedWidthValue=null;
this.addToLayoutChanges("width");
return true;
}return false;
},
"default":function(){if(this.getAllowStretchX()&&this._computedWidthTypeNull){return true;
}return false;
}}),
_recomputeStretchingY:qx.core.Variant.select("qx.client",
{"mshtml|opera|webkit":function(){if(this.getAllowStretchY()&&this._computedHeightTypeNull){this._computedHeightValue=null;
this.addToLayoutChanges("height");
return true;
}return false;
},
"default":function(){if(this.getAllowStretchY()&&this._computedHeightTypeNull){return true;
}return false;
}}),
_computeValuePixel:function(v){return Math.round(v);
},
_computeValuePixelLimit:function(v){return Math.max(0,
this._computeValuePixel(v));
},
_computeValuePercentX:function(v){return Math.round(this.getParent().getInnerWidthForChild(this)*v*0.01);
},
_computeValuePercentXLimit:function(v){return Math.max(0,
this._computeValuePercentX(v));
},
_computeValuePercentY:function(v){return Math.round(this.getParent().getInnerHeightForChild(this)*v*0.01);
},
_computeValuePercentYLimit:function(v){return Math.max(0,
this._computeValuePercentY(v));
},
getWidthValue:function(){if(this._computedWidthValue!=null){return this._computedWidthValue;
}
switch(this._computedWidthType){case qx.ui.core.Widget.TYPE_PIXEL:return this._computedWidthValue=this._computeValuePixelLimit(this._computedWidthParsed);
case qx.ui.core.Widget.TYPE_PERCENT:return this._computedWidthValue=this._computeValuePercentXLimit(this._computedWidthParsed);
case qx.ui.core.Widget.TYPE_AUTO:return this._computedWidthValue=this.getPreferredBoxWidth();
case qx.ui.core.Widget.TYPE_FLEX:if(this.getParent().getLayoutImpl().computeChildrenFlexWidth===undefined){throw new Error("Widget "+this+": having horizontal flex size (width="+this.getWidth()+") but parent layout "+this.getParent()+" does not support it");
}this.getParent().getLayoutImpl().computeChildrenFlexWidth();
return this._computedWidthValue=this._computedWidthFlexValue;
}return null;
},
getMinWidthValue:function(){if(this._computedMinWidthValue!=null){return this._computedMinWidthValue;
}
switch(this._computedMinWidthType){case qx.ui.core.Widget.TYPE_PIXEL:return this._computedWidthValue=this._computeValuePixelLimit(this._computedMinWidthParsed);
case qx.ui.core.Widget.TYPE_PERCENT:return this._computedWidthValue=this._computeValuePercentXLimit(this._computedMinWidthParsed);
case qx.ui.core.Widget.TYPE_AUTO:return this._computedMinWidthValue=this.getPreferredBoxWidth();
}return null;
},
getMaxWidthValue:function(){if(this._computedMaxWidthValue!=null){return this._computedMaxWidthValue;
}
switch(this._computedMaxWidthType){case qx.ui.core.Widget.TYPE_PIXEL:return this._computedWidthValue=this._computeValuePixelLimit(this._computedMaxWidthParsed);
case qx.ui.core.Widget.TYPE_PERCENT:return this._computedWidthValue=this._computeValuePercentXLimit(this._computedMaxWidthParsed);
case qx.ui.core.Widget.TYPE_AUTO:return this._computedMaxWidthValue=this.getPreferredBoxWidth();
}return null;
},
getLeftValue:function(){if(this._computedLeftValue!=null){return this._computedLeftValue;
}
switch(this._computedLeftType){case qx.ui.core.Widget.TYPE_PIXEL:return this._computedLeftValue=this._computeValuePixel(this._computedLeftParsed);
case qx.ui.core.Widget.TYPE_PERCENT:return this._computedLeftValue=this._computeValuePercentX(this._computedLeftParsed);
}return null;
},
getRightValue:function(){if(this._computedRightValue!=null){return this._computedRightValue;
}
switch(this._computedRightType){case qx.ui.core.Widget.TYPE_PIXEL:return this._computedRightValue=this._computeValuePixel(this._computedRightParsed);
case qx.ui.core.Widget.TYPE_PERCENT:return this._computedRightValue=this._computeValuePercentX(this._computedRightParsed);
}return null;
},
getHeightValue:function(){if(this._computedHeightValue!=null){return this._computedHeightValue;
}
switch(this._computedHeightType){case qx.ui.core.Widget.TYPE_PIXEL:return this._computedHeightValue=this._computeValuePixelLimit(this._computedHeightParsed);
case qx.ui.core.Widget.TYPE_PERCENT:return this._computedHeightValue=this._computeValuePercentYLimit(this._computedHeightParsed);
case qx.ui.core.Widget.TYPE_AUTO:return this._computedHeightValue=this.getPreferredBoxHeight();
case qx.ui.core.Widget.TYPE_FLEX:if(this.getParent().getLayoutImpl().computeChildrenFlexHeight===undefined){throw new Error("Widget "+this+": having vertical flex size (height="+this.getHeight()+") but parent layout "+this.getParent()+" does not support it");
}this.getParent().getLayoutImpl().computeChildrenFlexHeight();
return this._computedHeightValue=this._computedHeightFlexValue;
}return null;
},
getMinHeightValue:function(){if(this._computedMinHeightValue!=null){return this._computedMinHeightValue;
}
switch(this._computedMinHeightType){case qx.ui.core.Widget.TYPE_PIXEL:return this._computedMinHeightValue=this._computeValuePixelLimit(this._computedMinHeightParsed);
case qx.ui.core.Widget.TYPE_PERCENT:return this._computedMinHeightValue=this._computeValuePercentYLimit(this._computedMinHeightParsed);
case qx.ui.core.Widget.TYPE_AUTO:return this._computedMinHeightValue=this.getPreferredBoxHeight();
}return null;
},
getMaxHeightValue:function(){if(this._computedMaxHeightValue!=null){return this._computedMaxHeightValue;
}
switch(this._computedMaxHeightType){case qx.ui.core.Widget.TYPE_PIXEL:return this._computedMaxHeightValue=this._computeValuePixelLimit(this._computedMaxHeightParsed);
case qx.ui.core.Widget.TYPE_PERCENT:return this._computedMaxHeightValue=this._computeValuePercentYLimit(this._computedMaxHeightParsed);
case qx.ui.core.Widget.TYPE_AUTO:return this._computedMaxHeightValue=this.getPreferredBoxHeight();
}return null;
},
getTopValue:function(){if(this._computedTopValue!=null){return this._computedTopValue;
}
switch(this._computedTopType){case qx.ui.core.Widget.TYPE_PIXEL:return this._computedTopValue=this._computeValuePixel(this._computedTopParsed);
case qx.ui.core.Widget.TYPE_PERCENT:return this._computedTopValue=this._computeValuePercentY(this._computedTopParsed);
}return null;
},
getBottomValue:function(){if(this._computedBottomValue!=null){return this._computedBottomValue;
}
switch(this._computedBottomType){case qx.ui.core.Widget.TYPE_PIXEL:return this._computedBottomValue=this._computeValuePixel(this._computedBottomParsed);
case qx.ui.core.Widget.TYPE_PERCENT:return this._computedBottomValue=this._computeValuePercentY(this._computedBottomParsed);
}return null;
},
_computeFrameWidth:function(){var fw=this._cachedBorderLeft+this.getPaddingLeft()+this.getPaddingRight()+this._cachedBorderRight;
switch(this.getOverflow()){case "scroll":case "scrollY":fw+=qx.ui.core.Widget.SCROLLBAR_SIZE;
break;
case "auto":break;
}return fw;
},
_computeFrameHeight:function(){var fh=this._cachedBorderTop+this.getPaddingTop()+this.getPaddingBottom()+this._cachedBorderBottom;
switch(this.getOverflow()){case "scroll":case "scrollX":fh+=qx.ui.core.Widget.SCROLLBAR_SIZE;
break;
case "auto":break;
}return fh;
},
_invalidateFrameDimensions:function(){this._invalidateFrameWidth();
this._invalidateFrameHeight();
},
_invalidatePreferredInnerDimensions:function(){this._invalidatePreferredInnerWidth();
this._invalidatePreferredInnerHeight();
},
_computePreferredBoxWidth:function(){try{return Math.max(0,
this.getPreferredInnerWidth()+this.getFrameWidth());
}catch(ex){this.error("_computePreferredBoxWidth failed",
ex);
}},
_computePreferredBoxHeight:function(){try{return Math.max(0,
this.getPreferredInnerHeight()+this.getFrameHeight());
}catch(ex){this.error("_computePreferredBoxHeight failed",
ex);
}},
_initialLayoutDone:false,
addToLayoutChanges:function(p){if(this._isDisplayable){this.getParent()._addChildToChildrenQueue(this);
}return this._layoutChanges[p]=true;
},
addToQueue:function(p){this._initialLayoutDone?this.addToJobQueue(p):this.addToLayoutChanges(p);
},
addToQueueRuntime:function(p){return !this._initialLayoutDone||this.addToJobQueue(p);
},
_computeHasPercentX:function(){return (this._computedLeftTypePercent||this._computedWidthTypePercent||this._computedMinWidthTypePercent||this._computedMaxWidthTypePercent||this._computedRightTypePercent);
},
_computeHasPercentY:function(){return (this._computedTopTypePercent||this._computedHeightTypePercent||this._computedMinHeightTypePercent||this._computedMaxHeightTypePercent||this._computedBottomTypePercent);
},
_computeHasAutoX:function(){return (this._computedWidthTypeAuto||this._computedMinWidthTypeAuto||this._computedMaxWidthTypeAuto);
},
_computeHasAutoY:function(){return (this._computedHeightTypeAuto||this._computedMinHeightTypeAuto||this._computedMaxHeightTypeAuto);
},
_computeHasFlexX:function(){return this._computedWidthTypeFlex;
},
_computeHasFlexY:function(){return this._computedHeightTypeFlex;
},
_evalUnitsPixelPercentAutoFlex:function(value){switch(value){case "auto":return qx.ui.core.Widget.TYPE_AUTO;
case Infinity:case -Infinity:return qx.ui.core.Widget.TYPE_NULL;
}
switch(typeof value){case "number":return isNaN(value)?qx.ui.core.Widget.TYPE_NULL:qx.ui.core.Widget.TYPE_PIXEL;
case "string":return value.indexOf("%")!=-1?qx.ui.core.Widget.TYPE_PERCENT:value.indexOf("*")!=-1?qx.ui.core.Widget.TYPE_FLEX:qx.ui.core.Widget.TYPE_NULL;
}return qx.ui.core.Widget.TYPE_NULL;
},
_evalUnitsPixelPercentAuto:function(value){switch(value){case "auto":return qx.ui.core.Widget.TYPE_AUTO;
case Infinity:case -Infinity:return qx.ui.core.Widget.TYPE_NULL;
}
switch(typeof value){case "number":return isNaN(value)?qx.ui.core.Widget.TYPE_NULL:qx.ui.core.Widget.TYPE_PIXEL;
case "string":return value.indexOf("%")!=-1?qx.ui.core.Widget.TYPE_PERCENT:qx.ui.core.Widget.TYPE_NULL;
}return qx.ui.core.Widget.TYPE_NULL;
},
_evalUnitsPixelPercent:function(value){switch(value){case Infinity:case -Infinity:return qx.ui.core.Widget.TYPE_NULL;
}
switch(typeof value){case "number":return isNaN(value)?qx.ui.core.Widget.TYPE_NULL:qx.ui.core.Widget.TYPE_PIXEL;
case "string":return value.indexOf("%")!=-1?qx.ui.core.Widget.TYPE_PERCENT:qx.ui.core.Widget.TYPE_NULL;
}return qx.ui.core.Widget.TYPE_NULL;
},
_unitDetectionPixelPercentAutoFlex:function(name,
value){var r=qx.ui.core.Widget.layoutPropertyTypes[name];
var s=r.dataType;
var p=r.dataParsed;
var v=r.dataValue;
var s1=r.typePixel;
var s2=r.typePercent;
var s3=r.typeAuto;
var s4=r.typeFlex;
var s5=r.typeNull;
var wasPercent=this[s2];
var wasAuto=this[s3];
var wasFlex=this[s4];
switch(this[s]=this._evalUnitsPixelPercentAutoFlex(value)){case qx.ui.core.Widget.TYPE_PIXEL:this[s1]=true;
this[s2]=this[s3]=this[s4]=this[s5]=false;
this[p]=this[v]=Math.round(value);
break;
case qx.ui.core.Widget.TYPE_PERCENT:this[s2]=true;
this[s1]=this[s3]=this[s4]=this[s5]=false;
this[p]=parseFloat(value);
this[v]=null;
break;
case qx.ui.core.Widget.TYPE_AUTO:this[s3]=true;
this[s1]=this[s2]=this[s4]=this[s5]=false;
this[p]=this[v]=null;
break;
case qx.ui.core.Widget.TYPE_FLEX:this[s4]=true;
this[s1]=this[s2]=this[s3]=this[s5]=false;
this[p]=parseFloat(value);
this[v]=null;
break;
default:this[s5]=true;
this[s1]=this[s2]=this[s3]=this[s4]=false;
this[p]=this[v]=null;
break;
}
if(wasPercent!=this[s2]){switch(name){case "minWidth":case "maxWidth":case "width":case "left":case "right":this._invalidateHasPercentX();
break;
case "maxHeight":case "minHeight":case "height":case "top":case "bottom":this._invalidateHasPercentY();
break;
}}if(wasAuto!=this[s3]){switch(name){case "minWidth":case "maxWidth":case "width":this._invalidateHasAutoX();
break;
case "minHeight":case "maxHeight":case "height":this._invalidateHasAutoY();
break;
}}if(wasFlex!=this[s4]){switch(name){case "width":this._invalidateHasFlexX();
break;
case "height":this._invalidateHasFlexY();
break;
}}},
_unitDetectionPixelPercentAuto:function(name,
value){var r=qx.ui.core.Widget.layoutPropertyTypes[name];
var s=r.dataType;
var p=r.dataParsed;
var v=r.dataValue;
var s1=r.typePixel;
var s2=r.typePercent;
var s3=r.typeAuto;
var s4=r.typeNull;
var wasPercent=this[s2];
var wasAuto=this[s3];
switch(this[s]=this._evalUnitsPixelPercentAuto(value)){case qx.ui.core.Widget.TYPE_PIXEL:this[s1]=true;
this[s2]=this[s3]=this[s4]=false;
this[p]=this[v]=Math.round(value);
break;
case qx.ui.core.Widget.TYPE_PERCENT:this[s2]=true;
this[s1]=this[s3]=this[s4]=false;
this[p]=parseFloat(value);
this[v]=null;
break;
case qx.ui.core.Widget.TYPE_AUTO:this[s3]=true;
this[s1]=this[s2]=this[s4]=false;
this[p]=this[v]=null;
break;
default:this[s4]=true;
this[s1]=this[s2]=this[s3]=false;
this[p]=this[v]=null;
break;
}
if(wasPercent!=this[s2]){switch(name){case "minWidth":case "maxWidth":case "width":case "left":case "right":this._invalidateHasPercentX();
break;
case "minHeight":case "maxHeight":case "height":case "top":case "bottom":this._invalidateHasPercentY();
break;
}}if(wasAuto!=this[s3]){switch(name){case "minWidth":case "maxWidth":case "width":this._invalidateHasAutoX();
break;
case "minHeight":case "maxHeight":case "height":this._invalidateHasAutoY();
break;
}}},
_unitDetectionPixelPercent:function(name,
value){var r=qx.ui.core.Widget.layoutPropertyTypes[name];
var s=r.dataType;
var p=r.dataParsed;
var v=r.dataValue;
var s1=r.typePixel;
var s2=r.typePercent;
var s3=r.typeNull;
var wasPercent=this[s2];
switch(this[s]=this._evalUnitsPixelPercent(value)){case qx.ui.core.Widget.TYPE_PIXEL:this[s1]=true;
this[s2]=this[s3]=false;
this[p]=this[v]=Math.round(value);
break;
case qx.ui.core.Widget.TYPE_PERCENT:this[s2]=true;
this[s1]=this[s3]=false;
this[p]=parseFloat(value);
this[v]=null;
break;
default:this[s3]=true;
this[s1]=this[s2]=false;
this[p]=this[v]=null;
break;
}
if(wasPercent!=this[s2]){switch(name){case "minWidth":case "maxWidth":case "width":case "left":case "right":this._invalidateHasPercentX();
break;
case "minHeight":case "maxHeight":case "height":case "top":case "bottom":this._invalidateHasPercentY();
break;
}}},
getTopLevelWidget:function(){return this._hasParent?this.getParent().getTopLevelWidget():null;
},
moveSelfBefore:function(vBefore){this.getParent().addBefore(this,
vBefore);
},
moveSelfAfter:function(vAfter){this.getParent().addAfter(this,
vAfter);
},
moveSelfToBegin:function(){this.getParent().addAtBegin(this);
},
moveSelfToEnd:function(){this.getParent().addAtEnd(this);
},
getPreviousSibling:function(){var p=this.getParent();
if(p==null){return null;
}var cs=p.getChildren();
return cs[cs.indexOf(this)-1];
},
getNextSibling:function(){var p=this.getParent();
if(p==null){return null;
}var cs=p.getChildren();
return cs[cs.indexOf(this)+1];
},
getPreviousVisibleSibling:function(){if(!this._hasParent){return null;
}var vChildren=this.getParent().getVisibleChildren();
return vChildren[vChildren.indexOf(this)-1];
},
getNextVisibleSibling:function(){if(!this._hasParent){return null;
}var vChildren=this.getParent().getVisibleChildren();
return vChildren[vChildren.indexOf(this)+1];
},
getPreviousActiveSibling:function(vIgnoreClasses){var vPrev=qx.ui.core.Widget.getActiveSiblingHelper(this,
this.getParent(),
-1,
vIgnoreClasses,
null);
return vPrev?vPrev:this.getParent().getLastActiveChild();
},
getNextActiveSibling:function(vIgnoreClasses){var vNext=qx.ui.core.Widget.getActiveSiblingHelper(this,
this.getParent(),
1,
vIgnoreClasses,
null);
return vNext?vNext:this.getParent().getFirstActiveChild();
},
isFirstChild:function(){return this._hasParent&&this.getParent().getFirstChild()==this;
},
isLastChild:function(){return this._hasParent&&this.getParent().getLastChild()==this;
},
isFirstVisibleChild:function(){return this._hasParent&&this.getParent().getFirstVisibleChild()==this;
},
isLastVisibleChild:function(){return this._hasParent&&this.getParent().getLastVisibleChild()==this;
},
hasState:function(vState){return this.__states&&this.__states[vState]?true:false;
},
addState:function(vState){if(!this.__states){this.__states={};
}
if(!this.__states[vState]){this.__states[vState]=true;
if(this._hasParent){qx.ui.core.Widget.addToGlobalStateQueue(this);
}}},
removeState:function(vState){if(this.__states&&this.__states[vState]){delete this.__states[vState];
if(this._hasParent){qx.ui.core.Widget.addToGlobalStateQueue(this);
}}},
_styleFromMap:function(data){var styler=qx.core.Property.$$method.style;
var unstyler=qx.core.Property.$$method.unstyle;
var value;
{for(var prop in data){if(!this[styler[prop]]){throw new Error(this.classname+' has no themeable property "'+prop+'"');
}}};
for(var prop in data){value=data[prop];
value==="undefined"?this[unstyler[prop]]():this[styler[prop]](value);
}},
_unstyleFromArray:function(data){var unstyler=qx.core.Property.$$method.unstyle;
{for(var i=0,
l=data.length;i<l;i++){if(!this[unstyler[data[i]]]){throw new Error(this.classname+' has no themeable property "'+data[i]+'"');
}}};
for(var i=0,
l=data.length;i<l;i++){this[unstyler[data[i]]]();
}},
_renderAppearance:function(){if(!this.__states){this.__states={};
}this._applyStateStyleFocus(this.__states);
var vAppearance=this.getAppearance();
if(vAppearance){try{var r=qx.theme.manager.Appearance.getInstance().styleFrom(vAppearance,
this.__states);
if(r){this._styleFromMap(r);
}}catch(ex){this.error("Could not apply state appearance",
ex);
}}},
_resetAppearanceThemeWrapper:function(vNewAppearanceTheme,
vOldAppearanceTheme){var vAppearance=this.getAppearance();
if(vAppearance){var vAppearanceManager=qx.theme.manager.Appearance.getInstance();
var vOldAppearanceProperties=vAppearanceManager.styleFromTheme(vOldAppearanceTheme,
vAppearance,
this.__states);
var vNewAppearanceProperties=vAppearanceManager.styleFromTheme(vNewAppearanceTheme,
vAppearance,
this.__states);
var vUnstyleList=[];
for(var prop in vOldAppearanceProperties){if(vNewAppearanceProperties[prop]===undefined){vUnstyleList.push(prop);
}}this._unstyleFromArray(vUnstyleList);
this._styleFromMap(vNewAppearanceProperties);
}},
_applyStateStyleFocus:qx.core.Variant.select("qx.client",
{"mshtml":function(vStates){},
"gecko":function(vStates){if(vStates.focused){if(!qx.event.handler.FocusHandler.mouseFocus&&!this.getHideFocus()){this.setStyleProperty("MozOutline",
"1px dotted invert");
}}else{this.removeStyleProperty("MozOutline");
}},
"default":function(vStates){if(vStates.focused){if(!qx.event.handler.FocusHandler.mouseFocus&&!this.getHideFocus()){this.setStyleProperty("outline",
"1px dotted invert");
}}else{this.removeStyleProperty("outline");
}}}),
addToStateQueue:function(){qx.ui.core.Widget.addToGlobalStateQueue(this);
},
recursiveAddToStateQueue:function(){this.addToStateQueue();
},
_applyAppearance:function(value,
old){if(!this.__states){this.__states={};
}var vAppearanceManager=qx.theme.manager.Appearance.getInstance();
if(value){var vNewAppearanceProperties=vAppearanceManager.styleFrom(value,
this.__states)||{};
}
if(old){var vOldAppearanceProperties=vAppearanceManager.styleFrom(old,
this.__states)||{};
var vUnstyleList=[];
for(var prop in vOldAppearanceProperties){if(!vNewAppearanceProperties||!(prop in vNewAppearanceProperties)){vUnstyleList.push(prop);
}}}
if(vUnstyleList){this._unstyleFromArray(vUnstyleList);
}
if(vNewAppearanceProperties){this._styleFromMap(vNewAppearanceProperties);
}},
_recursiveAppearanceThemeUpdate:function(vNewAppearanceTheme,
vOldAppearanceTheme){try{this._resetAppearanceThemeWrapper(vNewAppearanceTheme,
vOldAppearanceTheme);
}catch(ex){this.error("Failed to update appearance theme",
ex);
}},
_applyElementData:function(elem){},
setHtmlProperty:function(propName,
value){if(!this._htmlProperties){this._htmlProperties={};
}this._htmlProperties[propName]=value;
if(this._isCreated&&this.getElement()[propName]!=value){this.getElement()[propName]=value;
}return true;
},
removeHtmlProperty:qx.core.Variant.select("qx.client",
{"mshtml":function(propName){if(!this._htmlProperties){return;
}delete this._htmlProperties[propName];
if(this._isCreated){this.getElement().removeAttribute(propName);
}return true;
},
"default":function(propName){if(!this._htmlProperties){return;
}delete this._htmlProperties[propName];
if(this._isCreated){this.getElement().removeAttribute(propName);
delete this.getElement()[propName];
}return true;
}}),
getHtmlProperty:function(propName){if(!this._htmlProperties){return "";
}return this._htmlProperties[propName]||"";
},
_applyHtmlProperties:function(elem){var vProperties=this._htmlProperties;
if(vProperties){var propName;
for(propName in vProperties){elem[propName]=vProperties[propName];
}}},
_generateHtmlId:function(){var id=this.classname+"."+qx.ui.core.Widget._idCounter++;
this.debug("setting autogenerated HTML id to "+id);
this.setHtmlProperty("id",
id);
},
setHtmlAttribute:function(propName,
value){qx.log.Logger.deprecatedMethodWarning(arguments.callee,
"Use setHtmlProperty instead");
if(!this._htmlAttributes){this._htmlAttributes={};
}this._htmlAttributes[propName]=value;
if(this._isCreated){this.getElement().setAttribute(propName,
value);
}return true;
},
removeHtmlAttribute:function(propName){qx.log.Logger.deprecatedMethodWarning(arguments.callee,
"Use removeHtmlProperty instead");
if(!this._htmlAttributes){return;
}delete this._htmlAttributes[propName];
if(this._isCreated){this.getElement().removeAttribute(propName);
}return true;
},
getHtmlAttribute:function(propName){if(!this._htmlAttributes){return "";
}return this._htmlAttributes[propName]||"";
},
_applyHtmlAttributes:function(elem){var vAttributes=this._htmlAttributes;
if(vAttributes){var propName;
for(propName in vAttributes){elem.setAttribute(propName,
vAttributes[propName]);
}}},
getStyleProperty:function(propName){if(!this._styleProperties){return "";
}return this._styleProperties[propName]||"";
},
__outerElementStyleProperties:{cursor:true,
zIndex:true,
filter:true,
display:true,
visibility:true},
setStyleProperty:function(propName,
value){if(!this._styleProperties){this._styleProperties={};
}this._styleProperties[propName]=value;
if(this._isCreated){var elem=this.__outerElementStyleProperties[propName]?this.getElement():this._getTargetNode();
if(elem){elem.style[propName]=(value==null)?"":value;
}}},
removeStyleProperty:function(propName){if(!this._styleProperties){return;
}delete this._styleProperties[propName];
if(this._isCreated){var elem=this.__outerElementStyleProperties[propName]?this.getElement():this._getTargetNode();
if(elem){elem.style[propName]="";
}}},
_applyStyleProperties:function(elem){var vProperties=this._styleProperties;
if(!vProperties){return;
}var propName;
var vBaseElement=elem;
var vTargetElement=this._getTargetNode();
var elem;
var value;
for(propName in vProperties){elem=this.__outerElementStyleProperties[propName]?vBaseElement:vTargetElement;
value=vProperties[propName];
elem.style[propName]=(value==null)?"":value;
}},
_applyEnabled:function(value,
old){if(value===false){this.addState("disabled");
this.removeState("over");
if(qx.Class.isDefined("qx.ui.form.Button")){this.removeState("abandoned");
this.removeState("pressed");
}}else{this.removeState("disabled");
}},
isFocusable:function(){return this.getEnabled()&&this.isSeeable()&&this.getTabIndex()>=0&&this.getTabIndex()!=null;
},
isFocusRoot:function(){return false;
},
getFocusRoot:function(){if(this._hasParent){return this.getParent().getFocusRoot();
}return null;
},
getActiveChild:function(){var vRoot=this.getFocusRoot();
if(vRoot){return vRoot.getActiveChild();
}return null;
},
_ontabfocus:qx.lang.Function.returnTrue,
_applyFocused:function(value,
old){if(!this.isCreated()){return;
}var vFocusRoot=this.getFocusRoot();
if(vFocusRoot){if(value){vFocusRoot.setFocusedChild(this);
this._visualizeFocus();
}else{if(vFocusRoot.getFocusedChild()==this){vFocusRoot.setFocusedChild(null);
}this._visualizeBlur();
}}},
_applyHideFocus:qx.core.Variant.select("qx.client",
{"mshtml":function(value,
old){this.setHtmlProperty("hideFocus",
value);
},
"default":qx.lang.Function.returnTrue}),
_visualizeBlur:function(){if(this.getEnableElementFocus()&&(!this.getFocusRoot().getFocusedChild()||(this.getFocusRoot().getFocusedChild()&&this.getFocusRoot().getFocusedChild().getEnableElementFocus()))){try{this.getElement().blur();
}catch(ex){}}this.removeState("focused");
},
_visualizeFocus:function(){if(!qx.event.handler.FocusHandler.mouseFocus&&this.getEnableElementFocus()){try{this.getElement().focus();
}catch(ex){}}this.addState("focused");
},
focus:function(){delete qx.event.handler.FocusHandler.mouseFocus;
this.setFocused(true);
},
blur:function(){delete qx.event.handler.FocusHandler.mouseFocus;
this.setFocused(false);
},
_applyCapture:function(value,
old){var vMgr=qx.event.handler.EventHandler.getInstance();
if(old){vMgr.setCaptureWidget(null);
}else if(value){vMgr.setCaptureWidget(this);
}},
_applyZIndex:function(value,
old){if(value==null){this.removeStyleProperty("zIndex");
}else{this.setStyleProperty("zIndex",
value);
}},
_applyTabIndex:qx.core.Variant.select("qx.client",
{"mshtml":function(value,
old){this.setHtmlProperty("tabIndex",
value<0?-1:1);
},
"gecko":function(value,
old){this.setStyleProperty("MozUserFocus",
(value<0?"ignore":"normal"));
},
"default":function(value,
old){this.setStyleProperty("userFocus",
(value<0?"ignore":"normal"));
this.setHtmlProperty("tabIndex",
value<0?-1:1);
}}),
_applySelectable:qx.core.Variant.select("qx.client",
{"mshtml":function(value,
old){},
"gecko":function(value,
old){if(value){this.removeStyleProperty("MozUserSelect");
}else{this.setStyleProperty("MozUserSelect",
"none");
}},
"webkit":function(value,
old){if(value){this.removeStyleProperty("WebkitUserSelect");
}else{this.setStyleProperty("WebkitUserSelect",
"none");
}},
"khtml":function(value,
old){if(value){this.removeStyleProperty("KhtmlUserSelect");
}else{this.setStyleProperty("KhtmlUserSelect",
"none");
}},
"default":function(value,
old){if(value){return this.removeStyleProperty("userSelect");
}else{this.setStyleProperty("userSelect",
"none");
}}}),
_applyOpacity:qx.core.Variant.select("qx.client",
{"mshtml":function(value,
old){if(value==null||value>=1||value<0){this.removeStyleProperty("filter");
}else{this.setStyleProperty("filter",
("Alpha(Opacity="+Math.round(value*100)+")"));
}},
"default":function(value,
old){if(value==null||value>1){if(qx.core.Variant.isSet("qx.client",
"gecko")){this.removeStyleProperty("MozOpacity");
}else if(qx.core.Variant.isSet("qx.client",
"khtml")){this.removeStyleProperty("KhtmlOpacity");
}this.removeStyleProperty("opacity");
}else{value=qx.lang.Number.limit(value,
0,
1);
if(qx.core.Variant.isSet("qx.client",
"gecko")){this.setStyleProperty("MozOpacity",
value);
}else if(qx.core.Variant.isSet("qx.client",
"khtml")){this.setStyleProperty("KhtmlOpacity",
value);
}this.setStyleProperty("opacity",
value);
}}}),
__cursorMap:qx.core.Variant.select("qx.client",
{"mshtml":{"cursor":"hand",
"ew-resize":"e-resize",
"ns-resize":"n-resize",
"nesw-resize":"ne-resize",
"nwse-resize":"nw-resize"},
"opera":{"col-resize":"e-resize",
"row-resize":"n-resize",
"ew-resize":"e-resize",
"ns-resize":"n-resize",
"nesw-resize":"ne-resize",
"nwse-resize":"nw-resize"},
"default":{}}),
_applyCursor:function(value,
old){if(value){this.setStyleProperty("cursor",
this.__cursorMap[value]||value);
}else{this.removeStyleProperty("cursor");
}},
_applyCommand:function(value,
old){},
_applyBackgroundImage:function(value,
old){var imageMgr=qx.io.image.Manager.getInstance();
var aliasMgr=qx.io.Alias.getInstance();
if(old){imageMgr.hide(old);
}
if(value){imageMgr.show(value);
}aliasMgr.connect(this._styleBackgroundImage,
this,
value);
},
_styleBackgroundImage:function(value){value?this.setStyleProperty("backgroundImage",
"url("+value+")"):this.removeStyleProperty("backgroundImage");
},
_applyBackgroundRepeat:function(value,
old){value?this.setStyleProperty("backgroundRepeat",
value):this.removeStyleProperty("backgroundRepeat");
},
_applyClip:function(value,
old){return this._compileClipString();
},
_compileClipString:function(){var vLeft=this.getClipLeft();
var vTop=this.getClipTop();
var vWidth=this.getClipWidth();
var vHeight=this.getClipHeight();
var vRight,
vBottom;
if(vLeft==null){vRight=(vWidth==null?"auto":vWidth+"px");
vLeft="auto";
}else{vRight=(vWidth==null?"auto":vLeft+vWidth+"px");
vLeft=vLeft+"px";
}
if(vTop==null){vBottom=(vHeight==null?"auto":vHeight+"px");
vTop="auto";
}else{vBottom=(vHeight==null?"auto":vTop+vHeight+"px");
vTop=vTop+"px";
}return this.setStyleProperty("clip",
("rect("+vTop+","+vRight+","+vBottom+","+vLeft+")"));
},
_applyOverflow:qx.core.Variant.select("qx.client",
{"default":function(value,
old){var pv=value;
var pn="overflow";
switch(value){case "scrollX":pn="overflowX";
pv="scroll";
break;
case "scrollY":pn="overflowY";
pv="scroll";
break;
}var a=["overflow",
"overflowX",
"overflowY"];
for(var i=0;i<a.length;i++){if(a[i]!=pn){this.removeStyleProperty(a[i]);
}}
switch(value){case "scrollX":this.setStyleProperty("overflowY",
"hidden");
break;
case "scrollY":this.setStyleProperty("overflowX",
"hidden");
break;
}this._renderOverflow(pn,
pv,
value,
old);
this.addToQueue("overflow");
},
"gecko":function(value,
old){var pv=value;
var pn="overflow";
switch(pv){case "hidden":pv="-moz-scrollbars-none";
break;
case "scrollX":pv="-moz-scrollbars-horizontal";
break;
case "scrollY":pv="-moz-scrollbars-vertical";
break;
}this._renderOverflow(pn,
pv,
value,
old);
this.addToQueue("overflow");
},
"opera":function(value,
old){var pv=value;
var pn="overflow";
switch(pv){case "scrollX":case "scrollY":pv="scroll";
break;
}this._renderOverflow(pn,
pv,
value,
old);
this.addToQueue("overflow");
}}),
_renderOverflow:function(pn,
pv,
value,
old){this.setStyleProperty(pn,
pv||"");
this._invalidateFrameWidth();
this._invalidateFrameHeight();
},
getOverflowX:function(){var vOverflow=this.getOverflow();
return vOverflow=="scrollY"?"hidden":vOverflow;
},
getOverflowY:function(){var vOverflow=this.getOverflow();
return vOverflow=="scrollX"?"hidden":vOverflow;
},
_applyBackgroundColor:function(value,
old){qx.theme.manager.Color.getInstance().connect(this._styleBackgroundColor,
this,
value);
},
_styleBackgroundColor:function(value){value?this.setStyleProperty("backgroundColor",
value):this.removeStyleProperty("backgroundColor");
},
_applyTextColor:function(value,
old){},
_applyFont:function(value,
old){},
_cachedBorderTop:0,
_cachedBorderRight:0,
_cachedBorderBottom:0,
_cachedBorderLeft:0,
_applyBorder:function(value,
old){qx.theme.manager.Border.getInstance().connect(this._queueBorder,
this,
value);
},
__borderJobs:{top:"borderTop",
right:"borderRight",
bottom:"borderBottom",
left:"borderLeft"},
_queueBorder:function(value,
edge){if(!edge){var jobs=this.__borderJobs;
for(var entry in jobs){this.addToQueue(jobs[entry]);
}this.__reflowBorderX(value);
this.__reflowBorderY(value);
}else{if(edge==="left"||edge==="right"){this.__reflowBorderX(value);
}else{this.__reflowBorderY(value);
}this.addToQueue(this.__borderJobs[edge]);
}this.__borderObject=value;
},
__reflowBorderX:function(value){var oldLeftWidth=this._cachedBorderLeft;
var oldRightWidth=this._cachedBorderRight;
this._cachedBorderLeft=value?value.getWidthLeft():0;
this._cachedBorderRight=value?value.getWidthRight():0;
if((oldLeftWidth+oldRightWidth)!=(this._cachedBorderLeft+this._cachedBorderRight)){this._invalidateFrameWidth();
}},
__reflowBorderY:function(value){var oldTopWidth=this._cachedBorderTop;
var oldBottomWidth=this._cachedBorderBottom;
this._cachedBorderTop=value?value.getWidthTop():0;
this._cachedBorderBottom=value?value.getWidthBottom():0;
if((oldTopWidth+oldBottomWidth)!=(this._cachedBorderTop+this._cachedBorderBottom)){this._invalidateFrameHeight();
}},
renderBorder:function(changes){var value=this.__borderObject;
if(value){if(changes.borderTop){value.renderTop(this);
}
if(changes.borderRight){value.renderRight(this);
}
if(changes.borderBottom){value.renderBottom(this);
}
if(changes.borderLeft){value.renderLeft(this);
}}else{var border=qx.ui.core.Border;
if(changes.borderTop){border.resetTop(this);
}
if(changes.borderRight){border.resetRight(this);
}
if(changes.borderBottom){border.resetBottom(this);
}
if(changes.borderLeft){border.resetLeft(this);
}}},
prepareEnhancedBorder:qx.core.Variant.select("qx.client",
{"gecko":qx.lang.Function.returnTrue,
"default":function(){var elem=this.getElement();
var cl=this._borderElement=document.createElement("div");
var es=elem.style;
var cs=this._innerStyle=cl.style;
if(qx.core.Variant.isSet("qx.client",
"mshtml")){}else{cs.width=cs.height="100%";
}cs.position="absolute";
for(var i in this._styleProperties){switch(i){case "zIndex":case "filter":case "display":break;
default:cs[i]=es[i];
es[i]="";
}}
for(var i in this._htmlProperties){switch(i){case "unselectable":cl.unselectable=this._htmlProperties[i];
}}while(elem.firstChild){cl.appendChild(elem.firstChild);
}elem.appendChild(cl);
}}),
_applyPaddingTop:function(value,
old){this.addToQueue("paddingTop");
this._invalidateFrameHeight();
},
_applyPaddingRight:function(value,
old){this.addToQueue("paddingRight");
this._invalidateFrameWidth();
},
_applyPaddingBottom:function(value,
old){this.addToQueue("paddingBottom");
this._invalidateFrameHeight();
},
_applyPaddingLeft:function(value,
old){this.addToQueue("paddingLeft");
this._invalidateFrameWidth();
},
renderPadding:function(changes){},
_applyMarginLeft:function(value,
old){this.addToQueue("marginLeft");
},
_applyMarginRight:function(value,
old){this.addToQueue("marginRight");
},
_applyMarginTop:function(value,
old){this.addToQueue("marginTop");
},
_applyMarginBottom:function(value,
old){this.addToQueue("marginBottom");
},
execute:function(){var cmd=this.getCommand();
if(cmd){cmd.execute(this);
}this.createDispatchEvent("execute");
},
_visualPropertyCheck:function(){if(!this.isCreated()){throw new Error(this.classname+": Element must be created previously!");
}},
setScrollLeft:function(nScrollLeft){this._visualPropertyCheck();
this._getTargetNode().scrollLeft=nScrollLeft;
},
setScrollTop:function(nScrollTop){this._visualPropertyCheck();
this._getTargetNode().scrollTop=nScrollTop;
},
getOffsetLeft:function(){this._visualPropertyCheck();
return qx.html.Offset.getLeft(this.getElement());
},
getOffsetTop:function(){this._visualPropertyCheck();
return qx.html.Offset.getTop(this.getElement());
},
getScrollLeft:function(){this._visualPropertyCheck();
return this._getTargetNode().scrollLeft;
},
getScrollTop:function(){this._visualPropertyCheck();
return this._getTargetNode().scrollTop;
},
getClientWidth:function(){this._visualPropertyCheck();
return this._getTargetNode().clientWidth;
},
getClientHeight:function(){this._visualPropertyCheck();
return this._getTargetNode().clientHeight;
},
getOffsetWidth:function(){this._visualPropertyCheck();
return this.getElement().offsetWidth;
},
getOffsetHeight:function(){this._visualPropertyCheck();
return this.getElement().offsetHeight;
},
getScrollWidth:function(){this._visualPropertyCheck();
return this._getTargetNode().scrollWidth;
},
getScrollHeight:function(){this._visualPropertyCheck();
return this._getTargetNode().scrollHeight;
},
scrollIntoView:function(alignTopLeft){this.scrollIntoViewX(alignTopLeft);
this.scrollIntoViewY(alignTopLeft);
},
scrollIntoViewX:function(alignLeft){if(!this._isCreated||!this._isDisplayable){this.warn("The function scrollIntoViewX can only be called after the widget is created!");
return false;
}return qx.html.ScrollIntoView.scrollX(this.getElement(),
alignLeft);
},
scrollIntoViewY:function(alignTop){if(!this._isCreated||!this._isDisplayable){this.warn("The function scrollIntoViewY can only be called after the widget is created!");
return false;
}return qx.html.ScrollIntoView.scrollY(this.getElement(),
alignTop);
},
supportsDrop:function(dragCache){var supportsDropMethod=this.getSupportsDropMethod();
if(supportsDropMethod!==null){return supportsDropMethod.call(this,
dragCache);
}return (this!=dragCache.sourceWidget);
}},
settings:{"qx.widgetQueueDebugging":false,
"qx.widgetDebugId":false},
defer:function(statics,
members){statics.__initApplyMethods(members);
if(qx.core.Variant.isSet("qx.client",
"mshtml")){members._renderRuntimeWidth=function(v){this._style.pixelWidth=(v==null)?0:v;
if(this._innerStyle){this._innerStyle.pixelWidth=(v==null)?0:v-2;
}};
members._renderRuntimeHeight=function(v){this._style.pixelHeight=(v==null)?0:v;
if(this._innerStyle){this._innerStyle.pixelHeight=(v==null)?0:v-2;
}};
members._resetRuntimeWidth=function(){this._style.width="";
if(this._innerStyle){this._innerStyle.width="";
}};
members._resetRuntimeHeight=function(){this._style.height="";
if(this._innerStyle){this._innerStyle.height="";
}};
}statics.__initLayoutProperties(statics);
{if(qx.core.Setting.get("qx.widgetQueueDebugging")){statics.flushGlobalQueues=function(){if(statics._inFlushGlobalQueues||!qx.core.Init.getInstance().getApplication().getUiReady()){return;
}
if(!(statics._globalWidgetQueue.length>0||statics._globalElementQueue.length>0||statics._globalStateQueue.length>0||statics._globalJobQueue.length>0||statics._globalLayoutQueue.length>0||statics._fastGlobalDisplayQueue.length>0||!qx.lang.Object.isEmpty(statics._lazyGlobalDisplayQueue))){return;
}var globalWidgetQueueLength=statics._globalWidgetQueue.length;
var globalElementQueueLength=statics._globalElementQueue.length;
var globalStateQueueLength=statics._globalStateQueue.length;
var globalJobQueueLength=statics._globalJobQueue.length;
var globalLayoutQueueLength=statics._globalLayoutQueue.length;
var fastGlobalDisplayQueueLength=statics._fastGlobalDisplayQueue.length;
var lazyGlobalDisplayQueueLength=statics._lazyGlobalDisplayQueue?statics._lazyGlobalDisplayQueue.length:0;
statics._inFlushGlobalQueues=true;
var start;
start=(new Date).valueOf();
statics.flushGlobalWidgetQueue();
var vWidgetDuration=(new Date).valueOf()-start;
start=(new Date).valueOf();
statics.flushGlobalStateQueue();
var vStateDuration=(new Date).valueOf()-start;
start=(new Date).valueOf();
statics.flushGlobalElementQueue();
var vElementDuration=(new Date).valueOf()-start;
start=(new Date).valueOf();
statics.flushGlobalJobQueue();
var vJobDuration=(new Date).valueOf()-start;
start=(new Date).valueOf();
statics.flushGlobalLayoutQueue();
var vLayoutDuration=(new Date).valueOf()-start;
start=(new Date).valueOf();
statics.flushGlobalDisplayQueue();
var vDisplayDuration=(new Date).valueOf()-start;
var vSum=vWidgetDuration+vStateDuration+vElementDuration+vJobDuration+vLayoutDuration+vDisplayDuration;
if(vSum>0){var logger=qx.log.Logger.getClassLogger(qx.ui.core.Widget);
logger.debug("Flush Global Queues");
logger.debug("Widgets: "+vWidgetDuration+"ms ("+globalWidgetQueueLength+")");
logger.debug("State: "+vStateDuration+"ms ("+globalStateQueueLength+")");
logger.debug("Element: "+vElementDuration+"ms ("+globalElementQueueLength+")");
logger.debug("Job: "+vJobDuration+"ms ("+globalJobQueueLength+")");
logger.debug("Layout: "+vLayoutDuration+"ms ("+globalLayoutQueueLength+")");
logger.debug("Display: "+vDisplayDuration+"ms (fast:"+fastGlobalDisplayQueueLength+",lazy:"+lazyGlobalDisplayQueueLength+")");
window.status="Flush: Widget:"+vWidgetDuration+" State:"+vStateDuration+" Element:"+vElementDuration+" Job:"+vJobDuration+" Layout:"+vLayoutDuration+" Display:"+vDisplayDuration;
}delete statics._inFlushGlobalQueues;
};
}};
},
destruct:function(){var elem=this.getElement();
if(elem){elem.qx_Widget=null;
}this._disposeFields("_isCreated",
"_inlineEvents",
"_element",
"_style",
"_borderElement",
"_innerStyle",
"_oldParent",
"_styleProperties",
"_htmlProperties",
"_htmlAttributes",
"__states",
"_jobQueue",
"_layoutChanges",
"__borderObject");
}});




/* ID: qx.html.Dimension */
qx.Class.define("qx.html.Dimension",
{statics:{getOuterWidth:function(el){return qx.html.Dimension.getBoxWidth(el)+qx.html.Style.getMarginLeft(el)+qx.html.Style.getMarginRight(el);
},
getOuterHeight:function(el){return qx.html.Dimension.getBoxHeight(el)+qx.html.Style.getMarginTop(el)+qx.html.Style.getMarginBottom(el);
},
getBoxWidthForZeroHeight:function(el){var h=el.offsetHeight;
if(h==0){var o=el.style.height;
el.style.height="1px";
}var v=el.offsetWidth;
if(h==0){el.style.height=o;
}return v;
},
getBoxHeightForZeroWidth:function(el){var w=el.offsetWidth;
if(w==0){var o=el.style.width;
el.style.width="1px";
}var v=el.offsetHeight;
if(w==0){el.style.width=o;
}return v;
},
getBoxWidth:function(el){return el.offsetWidth;
},
getBoxHeight:function(el){return el.offsetHeight;
},
getAreaWidth:qx.core.Variant.select("qx.client",
{"gecko":function(el){if(el.clientWidth!=0&&el.clientWidth!=(qx.html.Style.getBorderLeft(el)+qx.html.Style.getBorderRight(el))){return el.clientWidth;
}else{return qx.html.Dimension.getBoxWidth(el)-qx.html.Dimension.getInsetLeft(el)-qx.html.Dimension.getInsetRight(el);
}},
"default":function(el){return el.clientWidth!=0?el.clientWidth:(qx.html.Dimension.getBoxWidth(el)-qx.html.Dimension.getInsetLeft(el)-qx.html.Dimension.getInsetRight(el));
}}),
getAreaHeight:qx.core.Variant.select("qx.client",
{"gecko":function(el){if(el.clientHeight!=0&&el.clientHeight!=(qx.html.Style.getBorderTop(el)+qx.html.Style.getBorderBottom(el))){return el.clientHeight;
}else{return qx.html.Dimension.getBoxHeight(el)-qx.html.Dimension.getInsetTop(el)-qx.html.Dimension.getInsetBottom(el);
}},
"default":function(el){return el.clientHeight!=0?el.clientHeight:(qx.html.Dimension.getBoxHeight(el)-qx.html.Dimension.getInsetTop(el)-qx.html.Dimension.getInsetBottom(el));
}}),
getInnerWidth:function(el){return qx.html.Dimension.getAreaWidth(el)-qx.html.Style.getPaddingLeft(el)-qx.html.Style.getPaddingRight(el);
},
getInnerHeight:function(el){return qx.html.Dimension.getAreaHeight(el)-qx.html.Style.getPaddingTop(el)-qx.html.Style.getPaddingBottom(el);
},
getInsetLeft:qx.core.Variant.select("qx.client",
{"mshtml":function(el){return el.clientLeft;
},
"default":function(el){return qx.html.Style.getBorderLeft(el);
}}),
getInsetTop:qx.core.Variant.select("qx.client",
{"mshtml":function(el){return el.clientTop;
},
"default":function(el){return qx.html.Style.getBorderTop(el);
}}),
getInsetRight:qx.core.Variant.select("qx.client",
{"mshtml":function(el){if(qx.html.Style.getStyleProperty(el,
"overflowY")=="hidden"||el.clientWidth==0){return qx.html.Style.getBorderRight(el);
}return Math.max(0,
el.offsetWidth-el.clientLeft-el.clientWidth);
},
"default":function(el){if(el.clientWidth==0){var ov=qx.html.Style.getStyleProperty(el,
"overflow");
var sbv=ov=="scroll"||ov=="-moz-scrollbars-vertical"?16:0;
return Math.max(0,
qx.html.Style.getBorderRight(el)+sbv);
}return Math.max(0,
el.offsetWidth-el.clientWidth-qx.html.Style.getBorderLeft(el));
}}),
getInsetBottom:qx.core.Variant.select("qx.client",
{"mshtml":function(el){if(qx.html.Style.getStyleProperty(el,
"overflowX")=="hidden"||el.clientHeight==0){return qx.html.Style.getBorderBottom(el);
}return Math.max(0,
el.offsetHeight-el.clientTop-el.clientHeight);
},
"default":function(el){if(el.clientHeight==0){var ov=qx.html.Style.getStyleProperty(el,
"overflow");
var sbv=ov=="scroll"||ov=="-moz-scrollbars-horizontal"?16:0;
return Math.max(0,
qx.html.Style.getBorderBottom(el)+sbv);
}return Math.max(0,
el.offsetHeight-el.clientHeight-qx.html.Style.getBorderTop(el));
}}),
getScrollBarSizeLeft:function(el){return 0;
},
getScrollBarSizeTop:function(el){return 0;
},
getScrollBarSizeRight:function(el){return qx.html.Dimension.getInsetRight(el)-qx.html.Style.getBorderRight(el);
},
getScrollBarSizeBottom:function(el){return qx.html.Dimension.getInsetBottom(el)-qx.html.Style.getBorderBottom(el);
},
getScrollBarVisibleX:function(el){return qx.html.Dimension.getScrollBarSizeRight(el)>0;
},
getScrollBarVisibleY:function(el){return qx.html.Dimension.getScrollBarSizeBottom(el)>0;
}}});




/* ID: qx.html.Style */
qx.Class.define("qx.html.Style",
{statics:{getStylePropertySure:qx.lang.Object.select((document.defaultView&&document.defaultView.getComputedStyle)?"hasComputed":"noComputed",
{"hasComputed":function(el,
prop){return !el?null:el.ownerDocument?el.ownerDocument.defaultView.getComputedStyle(el,
"")[prop]:el.style[prop];
},
"noComputed":qx.core.Variant.select("qx.client",
{"mshtml":function(el,
prop){try{if(!el){return null;
}
if(el.parentNode&&el.currentStyle){return el.currentStyle[prop];
}else{var v1=el.runtimeStyle[prop];
if(v1!=null&&typeof v1!="undefined"&&v1!=""){return v1;
}return el.style[prop];
}}catch(ex){throw new Error("Could not evaluate computed style: "+el+"["+prop+"]: "+ex);
}},
"default":function(el,
prop){return !el?null:el.style[prop];
}})}),
getStyleProperty:qx.lang.Object.select((document.defaultView&&document.defaultView.getComputedStyle)?"hasComputed":"noComputed",
{"hasComputed":function(el,
prop){try{return el.ownerDocument.defaultView.getComputedStyle(el,
"")[prop];
}catch(ex){throw new Error("Could not evaluate computed style: "+el+"["+prop+"]: "+ex);
}},
"noComputed":qx.core.Variant.select("qx.client",
{"mshtml":function(el,
prop){try{return el.currentStyle[prop];
}catch(ex){throw new Error("Could not evaluate computed style: "+el+"["+prop+"]: "+ex);
}},
"default":function(el,
prop){try{return el.style[prop];
}catch(ex){throw new Error("Could not evaluate computed style: "+el+"["+prop+"]");
}}})}),
getStyleSize:function(vElement,
propertyName){return parseInt(qx.html.Style.getStyleProperty(vElement,
propertyName))||0;
},
getMarginLeft:function(vElement){return qx.html.Style.getStyleSize(vElement,
"marginLeft");
},
getMarginTop:function(vElement){return qx.html.Style.getStyleSize(vElement,
"marginTop");
},
getMarginRight:function(vElement){return qx.html.Style.getStyleSize(vElement,
"marginRight");
},
getMarginBottom:function(vElement){return qx.html.Style.getStyleSize(vElement,
"marginBottom");
},
getPaddingLeft:function(vElement){return qx.html.Style.getStyleSize(vElement,
"paddingLeft");
},
getPaddingTop:function(vElement){return qx.html.Style.getStyleSize(vElement,
"paddingTop");
},
getPaddingRight:function(vElement){return qx.html.Style.getStyleSize(vElement,
"paddingRight");
},
getPaddingBottom:function(vElement){return qx.html.Style.getStyleSize(vElement,
"paddingBottom");
},
getBorderLeft:function(vElement){return qx.html.Style.getStyleProperty(vElement,
"borderLeftStyle")=="none"?0:qx.html.Style.getStyleSize(vElement,
"borderLeftWidth");
},
getBorderTop:function(vElement){return qx.html.Style.getStyleProperty(vElement,
"borderTopStyle")=="none"?0:qx.html.Style.getStyleSize(vElement,
"borderTopWidth");
},
getBorderRight:function(vElement){return qx.html.Style.getStyleProperty(vElement,
"borderRightStyle")=="none"?0:qx.html.Style.getStyleSize(vElement,
"borderRightWidth");
},
getBorderBottom:function(vElement){return qx.html.Style.getStyleProperty(vElement,
"borderBottomStyle")=="none"?0:qx.html.Style.getStyleSize(vElement,
"borderBottomWidth");
}}});




/* ID: qx.html.StyleSheet */
qx.Class.define("qx.html.StyleSheet",
{statics:{includeFile:function(vHref){var el=document.createElement("link");
el.type="text/css";
el.rel="stylesheet";
el.href=vHref;
var head=document.getElementsByTagName("head")[0];
head.appendChild(el);
},
createElement:qx.lang.Object.select(document.createStyleSheet?"ie4+":"other",
{"ie4+":function(vCssText){var vSheet=document.createStyleSheet();
if(vCssText){vSheet.cssText=vCssText;
}return vSheet;
},
"other":function(vCssText){var vElement=document.createElement("style");
vElement.type="text/css";
vElement.appendChild(document.createTextNode(vCssText||"body {}"));
document.getElementsByTagName("head")[0].appendChild(vElement);
if(vElement.sheet){return vElement.sheet;
}else{var styles=document.styleSheets;
for(var i=styles.length-1;i>=0;i--){if(styles[i].ownerNode==vElement){return styles[i];
}}}throw "Error: Could not get a reference to the sheet object";
}}),
addRule:qx.lang.Object.select(document.createStyleSheet?"ie4+":"other",
{"ie4+":function(vSheet,
vSelector,
vStyle){vSheet.addRule(vSelector,
vStyle);
},
"other":qx.lang.Object.select(qx.core.Client.getInstance().isSafari2()?"safari2":"other",
{"safari2+":function(vSheet,
vSelector,
vStyle){if(!vSheet._qxRules){vSheet._qxRules={};
}
if(!vSheet._qxRules[vSelector]){var ruleNode=document.createTextNode(vSelector+"{"+vStyle+"}");
vSheet.ownerNode.appendChild(ruleNode);
vSheet._qxRules[vSelector]=ruleNode;
}},
"other":function(vSheet,
vSelector,
vStyle){vSheet.insertRule(vSelector+"{"+vStyle+"}",
vSheet.cssRules.length);
}})}),
removeRule:qx.lang.Object.select(document.createStyleSheet?"ie4+":"other",
{"ie4+":function(vSheet,
vSelector){var vRules=vSheet.rules;
var vLength=vRules.length;
for(var i=vLength-1;i>=0;i--){if(vRules[i].selectorText==vSelector){vSheet.removeRule(i);
}}},
"other":qx.lang.Object.select(qx.core.Client.getInstance().isSafari2()?"safari2":"other",
{"safari2+":function(vSheet,
vSelector){var warn=function(){qx.log.Logger.ROOT_LOGGER.warn("In Safari/Webkit you can only remove rules that are created using qx.html.StyleSheet.addRule");
};
if(!vSheet._qxRules){warn();
}var ruleNode=vSheet._qxRules[vSelector];
if(ruleNode){vSheet.ownerNode.removeChild(ruleNode);
vSheet._qxRules[vSelector]=null;
}else{warn();
}},
"other":function(vSheet,
vSelector){var vRules=vSheet.cssRules;
var vLength=vRules.length;
for(var i=vLength-1;i>=0;i--){if(vRules[i].selectorText==vSelector){vSheet.deleteRule(i);
}}}})}),
removeAllRules:qx.lang.Object.select(document.createStyleSheet?"ie4+":"other",
{"ie4+":function(vSheet){var vRules=vSheet.rules;
var vLength=vRules.length;
for(var i=vLength-1;i>=0;i--){vSheet.removeRule(i);
}},
"other":qx.lang.Object.select(qx.core.Client.getInstance().isSafari2()?"safari2":"other",
{"safari2+":function(vSheet){var node=vSheet.ownerNode;
var rules=node.childNodes;
while(rules.length>0){node.removeChild(rules[0]);
}},
"other":function(vSheet){var vRules=vSheet.cssRules;
var vLength=vRules.length;
for(var i=vLength-1;i>=0;i--){vSheet.deleteRule(i);
}}})}),
addImport:qx.lang.Object.select(document.createStyleSheet?"ie4+":"other",
{"ie4+":function(vSheet,
vUrl){vSheet.addImport(vUrl);
},
"other":qx.lang.Object.select(qx.core.Client.getInstance().isSafari2()?"safari2":"other",
{"safari2+":function(vSheet,
vUrl){vSheet.ownerNode.appendChild(document.createTextNode('@import "'+vUrl+'";'));
},
"other":function(vSheet,
vUrl){vSheet.insertRule('@import "'+vUrl+'";',
vSheet.cssRules.length);
}})}),
removeImport:qx.lang.Object.select(document.createStyleSheet?"ie4+":"other",
{"ie4+":function(vSheet,
vUrl){var vImports=vSheet.imports;
var vLength=vImports.length;
for(var i=vLength-1;i>=0;i--){if(vImports[i].href==vUrl){vSheet.removeImport(i);
}}},
"other":function(vSheet,
vUrl){var vRules=vSheet.cssRules;
var vLength=vRules.length;
for(var i=vLength-1;i>=0;i--){if(vRules[i].href==vUrl){vSheet.deleteRule(i);
}}}}),
removeAllImports:qx.lang.Object.select(document.createStyleSheet?"ie4+":"other",
{"ie4+":function(vSheet){var vImports=vSheet.imports;
var vLength=vImports.length;
for(var i=vLength-1;i>=0;i--){vSheet.removeImport(i);
}},
"other":function(vSheet){var vRules=vSheet.cssRules;
var vLength=vRules.length;
for(var i=vLength-1;i>=0;i--){if(vRules[i].type==vRules[i].IMPORT_RULE){vSheet.deleteRule(i);
}}}})}});




/* ID: qx.ui.core.Parent */
qx.Class.define("qx.ui.core.Parent",
{extend:qx.ui.core.Widget,
type:"abstract",
construct:function(){this.base(arguments);
this._children=[];
this._layoutImpl=this._createLayoutImpl();
},
properties:{focusHandler:{check:"qx.event.handler.FocusHandler",
apply:"_applyFocusHandler",
nullable:true},
activeChild:{check:"qx.ui.core.Widget",
apply:"_applyActiveChild",
event:"changeActiveChild",
nullable:true},
focusedChild:{check:"qx.ui.core.Widget",
apply:"_applyFocusedChild",
event:"changeFocusedChild",
nullable:true},
visibleChildren:{_cached:true,
defaultValue:null}},
members:{isFocusRoot:function(){return this.getFocusHandler()!=null;
},
getFocusRoot:function(){if(this.isFocusRoot()){return this;
}
if(this._hasParent){return this.getParent().getFocusRoot();
}return null;
},
activateFocusRoot:function(){if(this._focusHandler){return;
}this._focusHandler=new qx.event.handler.FocusHandler(this);
this.setFocusHandler(this._focusHandler);
},
_onfocuskeyevent:function(e){this.getFocusHandler()._onkeyevent(this,
e);
},
_applyFocusHandler:function(value,
old){if(value){this.addEventListener("keypress",
this._onfocuskeyevent);
if(this.getTabIndex()<1){this.setTabIndex(1);
}this.setHideFocus(true);
this.setActiveChild(this);
}else{this.removeEventListener("keydown",
this._onfocuskeyevent);
this.removeEventListener("keypress",
this._onfocuskeyevent);
this.setTabIndex(-1);
this.setHideFocus(false);
}},
_applyActiveChild:function(value,
old){},
_applyFocusedChild:function(value,
old){var vFocusValid=value!=null;
var vBlurValid=old!=null;
if(qx.Class.isDefined("qx.ui.popup.PopupManager")&&vFocusValid){var vMgr=qx.ui.popup.PopupManager.getInstance();
if(vMgr){vMgr.update(value);
}}
if(vBlurValid){if(old.hasEventListeners("focusout")){var vEventObject=new qx.event.type.FocusEvent("focusout",
old);
if(vFocusValid){vEventObject.setRelatedTarget(value);
}old.dispatchEvent(vEventObject);
vEventObject.dispose();
}}
if(vFocusValid){if(value.hasEventListeners("focusin")){var vEventObject=new qx.event.type.FocusEvent("focusin",
value);
if(vBlurValid){vEventObject.setRelatedTarget(old);
}value.dispatchEvent(vEventObject);
vEventObject.dispose();
}}
if(vBlurValid){if(this.getActiveChild()==old&&!vFocusValid){this.setActiveChild(null);
}old.setFocused(false);
var vEventObject=new qx.event.type.FocusEvent("blur",
old);
if(vFocusValid){vEventObject.setRelatedTarget(value);
}old.dispatchEvent(vEventObject);
if(qx.Class.isDefined("qx.ui.popup.ToolTipManager")){var vMgr=qx.ui.popup.ToolTipManager.getInstance();
if(vMgr){vMgr.handleBlur(vEventObject);
}}vEventObject.dispose();
}
if(vFocusValid){this.setActiveChild(value);
value.setFocused(true);
qx.event.handler.EventHandler.getInstance().setFocusRoot(this);
var vEventObject=new qx.event.type.FocusEvent("focus",
value);
if(vBlurValid){vEventObject.setRelatedTarget(old);
}value.dispatchEvent(vEventObject);
if(qx.Class.isDefined("qx.ui.popup.ToolTipManager")){var vMgr=qx.ui.popup.ToolTipManager.getInstance();
if(vMgr){vMgr.handleFocus(vEventObject);
}}vEventObject.dispose();
}},
_layoutImpl:null,
_createLayoutImpl:function(){return null;
},
getLayoutImpl:function(){return this._layoutImpl;
},
getChildren:function(){return this._children;
},
getChildrenLength:function(){return this.getChildren().length;
},
hasChildren:function(){return this.getChildrenLength()>0;
},
isEmpty:function(){return this.getChildrenLength()==0;
},
indexOf:function(vChild){return this.getChildren().indexOf(vChild);
},
contains:function(vWidget){switch(vWidget){case null:return false;
case this:return true;
default:return this.contains(vWidget.getParent());
}},
_computeVisibleChildren:function(){var vVisible=[];
var vChildren=this.getChildren();
if(!vChildren){return 0;
}var vLength=vChildren.length;
for(var i=0;i<vLength;i++){var vChild=vChildren[i];
if(vChild._isDisplayable){vVisible.push(vChild);
}}return vVisible;
},
getVisibleChildrenLength:function(){return this.getVisibleChildren().length;
},
hasVisibleChildren:function(){return this.getVisibleChildrenLength()>0;
},
isVisibleEmpty:function(){return this.getVisibleChildrenLength()==0;
},
add:function(varargs){var vWidget;
for(var i=0,
l=arguments.length;i<l;i++){vWidget=arguments[i];
if(!(vWidget instanceof qx.ui.core.Parent)&&!(vWidget instanceof qx.ui.basic.Terminator)){throw new Error("Invalid Widget: "+vWidget);
}else{vWidget.setParent(this);
}}return this;
},
addAt:function(vChild,
vIndex){if(vIndex==null||vIndex<0){throw new Error("Not a valid index for addAt(): "+vIndex);
}
if(vChild.getParent()==this){var vChildren=this.getChildren();
var vOldIndex=vChildren.indexOf(vChild);
if(vOldIndex!=vIndex){if(vOldIndex!=-1){qx.lang.Array.removeAt(vChildren,
vOldIndex);
}qx.lang.Array.insertAt(vChildren,
vChild,
vIndex);
if(this._initialLayoutDone){this._invalidateVisibleChildren();
this.getLayoutImpl().updateChildrenOnMoveChild(vChild,
vIndex,
vOldIndex);
}}}else{vChild._insertIndex=vIndex;
vChild.setParent(this);
}},
addAtBegin:function(vChild){return this.addAt(vChild,
0);
},
addAtEnd:function(vChild){var vLength=this.getChildrenLength();
return this.addAt(vChild,
vChild.getParent()==this?vLength-1:vLength);
},
addBefore:function(vChild,
vBefore){var vChildren=this.getChildren();
var vTargetIndex=vChildren.indexOf(vBefore);
if(vTargetIndex==-1){throw new Error("Child to add before: "+vBefore+" is not inside this parent.");
}var vSourceIndex=vChildren.indexOf(vChild);
if(vSourceIndex==-1||vSourceIndex>vTargetIndex){vTargetIndex++;
}return this.addAt(vChild,
Math.max(0,
vTargetIndex-1));
},
addAfter:function(vChild,
vAfter){var vChildren=this.getChildren();
var vTargetIndex=vChildren.indexOf(vAfter);
if(vTargetIndex==-1){throw new Error("Child to add after: "+vAfter+" is not inside this parent.");
}var vSourceIndex=vChildren.indexOf(vChild);
if(vSourceIndex!=-1&&vSourceIndex<vTargetIndex){vTargetIndex--;
}return this.addAt(vChild,
Math.min(vChildren.length,
vTargetIndex+1));
},
remove:function(varargs){var vWidget;
for(var i=0,
l=arguments.length;i<l;i++){vWidget=arguments[i];
if(!(vWidget instanceof qx.ui.core.Parent)&&!(vWidget instanceof qx.ui.basic.Terminator)){throw new Error("Invalid Widget: "+vWidget);
}else if(vWidget.getParent()==this){vWidget.setParent(null);
}}},
removeAt:function(vIndex){var vChild=this.getChildren()[vIndex];
if(vChild){delete vChild._insertIndex;
vChild.setParent(null);
}},
removeAll:function(){var cs=this.getChildren();
var co=cs[0];
while(co){this.remove(co);
co=cs[0];
}},
getFirstChild:function(){return qx.lang.Array.getFirst(this.getChildren())||null;
},
getFirstVisibleChild:function(){return qx.lang.Array.getFirst(this.getVisibleChildren())||null;
},
getFirstActiveChild:function(vIgnoreClasses){return qx.ui.core.Widget.getActiveSiblingHelper(null,
this,
1,
vIgnoreClasses,
"first")||null;
},
getLastChild:function(){return qx.lang.Array.getLast(this.getChildren())||null;
},
getLastVisibleChild:function(){return qx.lang.Array.getLast(this.getVisibleChildren())||null;
},
getLastActiveChild:function(vIgnoreClasses){return qx.ui.core.Widget.getActiveSiblingHelper(null,
this,
-1,
vIgnoreClasses,
"last")||null;
},
forEachChild:function(vFunc){var ch=this.getChildren(),
chc,
i=-1;
if(!ch){return;
}
while(chc=ch[++i]){vFunc.call(chc,
i);
}},
forEachVisibleChild:function(vFunc){var ch=this.getVisibleChildren(),
chc,
i=-1;
if(!ch){return;
}
while(chc=ch[++i]){vFunc.call(chc,
i);
}},
_beforeAppear:function(){this.base(arguments);
this.forEachVisibleChild(function(){if(this.isAppearRelevant()){this._beforeAppear();
}});
},
_afterAppear:function(){this.base(arguments);
this.forEachVisibleChild(function(){if(this.isAppearRelevant()){this._afterAppear();
}});
},
_beforeDisappear:function(){this.base(arguments);
this.forEachVisibleChild(function(){if(this.isAppearRelevant()){this._beforeDisappear();
}});
},
_afterDisappear:function(){this.base(arguments);
this.forEachVisibleChild(function(){if(this.isAppearRelevant()){this._afterDisappear();
}});
},
_beforeInsertDom:function(){this.base(arguments);
this.forEachVisibleChild(function(){if(this.isAppearRelevant()){this._beforeInsertDom();
}});
},
_afterInsertDom:function(){this.base(arguments);
this.forEachVisibleChild(function(){if(this.isAppearRelevant()){this._afterInsertDom();
}});
},
_beforeRemoveDom:function(){this.base(arguments);
this.forEachVisibleChild(function(){if(this.isAppearRelevant()){this._beforeRemoveDom();
}});
},
_afterRemoveDom:function(){this.base(arguments);
this.forEachVisibleChild(function(){if(this.isAppearRelevant()){this._afterRemoveDom();
}});
},
_handleDisplayableCustom:function(vDisplayable,
vParent,
vHint){this.forEachChild(function(){this._handleDisplayable();
});
},
_addChildrenToStateQueue:function(){this.forEachVisibleChild(function(){this.addToStateQueue();
});
},
recursiveAddToStateQueue:function(){this.addToStateQueue();
this.forEachVisibleChild(function(){this.recursiveAddToStateQueue();
});
},
_recursiveAppearanceThemeUpdate:function(vNewAppearanceTheme,
vOldAppearanceTheme){this.base(arguments,
vNewAppearanceTheme,
vOldAppearanceTheme);
this.forEachVisibleChild(function(){this._recursiveAppearanceThemeUpdate(vNewAppearanceTheme,
vOldAppearanceTheme);
});
},
_addChildToChildrenQueue:function(vChild){if(!vChild._isInParentChildrenQueue&&!vChild._isDisplayable){this.warn("Ignoring invisible child: "+vChild);
}
if(!vChild._isInParentChildrenQueue&&vChild._isDisplayable){qx.ui.core.Widget.addToGlobalLayoutQueue(this);
if(!this._childrenQueue){this._childrenQueue={};
}this._childrenQueue[vChild.toHashCode()]=vChild;
}},
_removeChildFromChildrenQueue:function(vChild){if(this._childrenQueue&&vChild._isInParentChildrenQueue){delete this._childrenQueue[vChild.toHashCode()];
if(qx.lang.Object.isEmpty(this._childrenQueue)){qx.ui.core.Widget.removeFromGlobalLayoutQueue(this);
}}},
_flushChildrenQueue:function(){if(!qx.lang.Object.isEmpty(this._childrenQueue)){this.getLayoutImpl().flushChildrenQueue(this._childrenQueue);
delete this._childrenQueue;
}},
_addChildrenToLayoutQueue:function(p){this.forEachChild(function(){this.addToLayoutChanges(p);
});
},
_layoutChild:function(vChild){if(!vChild._isDisplayable){return ;
}var vChanges=vChild._layoutChanges;
try{if(vChild.renderBorder){if(vChanges.borderTop||vChanges.borderRight||vChanges.borderBottom||vChanges.borderLeft){vChild.renderBorder(vChanges);
}}}catch(ex){this.error("Could not apply border to child "+vChild,
ex);
}
try{if(vChild.renderPadding){if(vChanges.paddingLeft||vChanges.paddingRight||vChanges.paddingTop||vChanges.paddingBottom){vChild.renderPadding(vChanges);
}}}catch(ex){this.error("Could not apply padding to child "+vChild,
ex);
}try{this.getLayoutImpl().layoutChild(vChild,
vChanges);
}catch(ex){this.error("Could not layout child "+vChild+" through layout handler",
ex);
}try{vChild._layoutPost(vChanges);
}catch(ex){this.error("Could not post layout child "+vChild,
ex);
}try{if(vChanges.initial){vChild._initialLayoutDone=true;
qx.ui.core.Widget.addToGlobalDisplayQueue(vChild);
}}catch(ex){this.error("Could not handle display updates from layout flush for child "+vChild,
ex);
}vChild._layoutChanges={};
delete vChild._isInParentLayoutQueue;
delete this._childrenQueue[vChild.toHashCode()];
},
_layoutPost:qx.lang.Function.returnTrue,
_computePreferredInnerWidth:function(){return this.getLayoutImpl().computeChildrenNeededWidth();
},
_computePreferredInnerHeight:function(){return this.getLayoutImpl().computeChildrenNeededHeight();
},
_changeInnerWidth:function(vNew,
vOld){var vLayout=this.getLayoutImpl();
if(vLayout.invalidateChildrenFlexWidth){vLayout.invalidateChildrenFlexWidth();
}this.forEachVisibleChild(function(){if(vLayout.updateChildOnInnerWidthChange(this)&&this._recomputeBoxWidth()){this._recomputeOuterWidth();
this._recomputeInnerWidth();
}});
},
_changeInnerHeight:function(vNew,
vOld){var vLayout=this.getLayoutImpl();
if(vLayout.invalidateChildrenFlexHeight){vLayout.invalidateChildrenFlexHeight();
}this.forEachVisibleChild(function(){if(vLayout.updateChildOnInnerHeightChange(this)&&this._recomputeBoxHeight()){this._recomputeOuterHeight();
this._recomputeInnerHeight();
}});
},
getInnerWidthForChild:function(vChild){return this.getInnerWidth();
},
getInnerHeightForChild:function(vChild){return this.getInnerHeight();
},
_remappingChildTable:["add",
"remove",
"addAt",
"addAtBegin",
"addAtEnd",
"removeAt",
"addBefore",
"addAfter",
"removeAll"],
_remapStart:"return this._remappingChildTarget.",
_remapStop:".apply(this._remappingChildTarget, arguments)",
remapChildrenHandlingTo:function(vTarget){var t=this._remappingChildTable;
this._remappingChildTarget=vTarget;
for(var i=0,
l=t.length,
s;i<l;i++){s=t[i];
this[s]=new Function(qx.ui.core.Parent.prototype._remapStart+s+qx.ui.core.Parent.prototype._remapStop);
}}},
defer:function(statics,
members,
properties){if(qx.core.Variant.isSet("qx.client",
"opera")){members._layoutChildOrig=members._layoutChild;
members._layoutChild=function(vChild){if(!vChild._initialLayoutDone||!vChild._layoutChanges.border){return this._layoutChildOrig(vChild);
}var vStyle=vChild.getElement().style;
var vOldDisplay=vStyle.display;
vStyle.display="none";
var vRet=this._layoutChildOrig(vChild);
vStyle.display=vOldDisplay;
return vRet;
};
}},
destruct:function(){this._disposeObjectDeep("_children",
1);
this._disposeObjects("_layoutImpl",
"_focusHandler");
this._disposeFields("_childrenQueue",
"_childrenQueue",
"_remappingChildTable",
"_remappingChildTarget",
"_cachedVisibleChildren");
}});




/* ID: qx.event.type.FocusEvent */
qx.Class.define("qx.event.type.FocusEvent",
{extend:qx.event.type.Event,
construct:function(type,
target){this.base(arguments,
type);
this.setTarget(target);
switch(type){case "focusin":case "focusout":this.setBubbles(true);
this.setPropagationStopped(false);
}}});




/* ID: qx.event.handler.EventHandler */
qx.Class.define("qx.event.handler.EventHandler",
{type:"singleton",
extend:qx.core.Target,
construct:function(){this.base(arguments);
this.__onmouseevent=qx.lang.Function.bind(this._onmouseevent,
this);
this.__ondragevent=qx.lang.Function.bind(this._ondragevent,
this);
this.__onselectevent=qx.lang.Function.bind(this._onselectevent,
this);
this.__onwindowblur=qx.lang.Function.bind(this._onwindowblur,
this);
this.__onwindowfocus=qx.lang.Function.bind(this._onwindowfocus,
this);
this.__onwindowresize=qx.lang.Function.bind(this._onwindowresize,
this);
this._commands={};
},
events:{"error":"qx.event.type.DataEvent"},
statics:{mouseEventTypes:["mouseover",
"mousemove",
"mouseout",
"mousedown",
"mouseup",
"click",
"dblclick",
"contextmenu",
qx.core.Variant.isSet("qx.client",
"gecko")?"DOMMouseScroll":"mousewheel"],
keyEventTypes:["keydown",
"keypress",
"keyup"],
dragEventTypes:qx.core.Variant.select("qx.client",
{"gecko":["dragdrop",
"dragover",
"dragenter",
"dragexit",
"draggesture"],
"mshtml":["dragend",
"dragover",
"dragstart",
"drag",
"dragenter",
"dragleave"],
"default":["dragstart",
"dragdrop",
"dragover",
"drag",
"dragleave",
"dragenter",
"dragexit",
"draggesture"]}),
getDomTarget:qx.core.Variant.select("qx.client",
{"mshtml":function(vDomEvent){return vDomEvent.target||vDomEvent.srcElement;
},
"webkit":function(vDomEvent){var vNode=vDomEvent.target||vDomEvent.srcElement;
if(vNode&&(vNode.nodeType==qx.dom.Node.TEXT)){vNode=vNode.parentNode;
}return vNode;
},
"default":function(vDomEvent){return vDomEvent.target;
}}),
stopDomEvent:function(vDomEvent){if(vDomEvent.preventDefault){vDomEvent.preventDefault();
}vDomEvent.returnValue=false;
},
getOriginalTargetObject:function(vNode){if(vNode==document.documentElement){vNode=document.body;
}while(vNode!=null&&vNode.qx_Widget==null){try{vNode=vNode.parentNode;
}catch(vDomEvent){vNode=null;
}}return vNode?vNode.qx_Widget:null;
},
getOriginalTargetObjectFromEvent:function(vDomEvent,
vWindow){var vNode=qx.event.handler.EventHandler.getDomTarget(vDomEvent);
if(vWindow){var vDocument=vWindow.document;
if(vNode==vWindow||vNode==vDocument||vNode==vDocument.documentElement||vNode==vDocument.body){return vDocument.body.qx_Widget;
}}return qx.event.handler.EventHandler.getOriginalTargetObject(vNode);
},
getRelatedOriginalTargetObjectFromEvent:function(vDomEvent){return qx.event.handler.EventHandler.getOriginalTargetObject(vDomEvent.relatedTarget||(vDomEvent.type=="mouseover"?vDomEvent.fromElement:vDomEvent.toElement));
},
getTargetObject:function(vNode,
vObject,
allowDisabled){if(!vObject){var vObject=qx.event.handler.EventHandler.getOriginalTargetObject(vNode);
if(!vObject){return null;
}}while(vObject){if(!allowDisabled&&!vObject.getEnabled()){return null;
}if(!vObject.getAnonymous()){break;
}vObject=vObject.getParent();
}return vObject;
},
getTargetObjectFromEvent:function(vDomEvent){return qx.event.handler.EventHandler.getTargetObject(qx.event.handler.EventHandler.getDomTarget(vDomEvent));
},
getRelatedTargetObjectFromEvent:function(vDomEvent){var target=vDomEvent.relatedTarget;
if(!target){if(vDomEvent.type=="mouseover"){target=vDomEvent.fromElement;
}else{target=vDomEvent.toElement;
}}return qx.event.handler.EventHandler.getTargetObject(target);
}},
properties:{allowClientContextMenu:{check:"Boolean",
init:false},
allowClientSelectAll:{check:"Boolean",
init:false},
captureWidget:{check:"qx.ui.core.Widget",
nullable:true,
apply:"_applyCaptureWidget"},
focusRoot:{check:"qx.ui.core.Parent",
nullable:true,
apply:"_applyFocusRoot"}},
members:{_lastMouseEventType:null,
_lastMouseDown:false,
_lastMouseEventDate:0,
_applyCaptureWidget:function(value,
old){if(old){old.setCapture(false);
}
if(value){value.setCapture(true);
}},
_applyFocusRoot:function(value,
old){if(old){old.setFocusedChild(null);
}
if(value&&value.getFocusedChild()==null){value.setFocusedChild(value);
}},
addCommand:function(vCommand){this._commands[vCommand.toHashCode()]=vCommand;
},
removeCommand:function(vCommand){delete this._commands[vCommand.toHashCode()];
},
_checkKeyEventMatch:function(e){var vCommand;
for(var vHash in this._commands){vCommand=this._commands[vHash];
if(vCommand.getEnabled()&&vCommand.matchesKeyEvent(e)){if(!vCommand.execute(e.getTarget())){e.preventDefault();
}break;
}}},
attachEvents:function(){this.attachEventTypes(qx.event.handler.EventHandler.mouseEventTypes,
this.__onmouseevent);
this.attachEventTypes(qx.event.handler.EventHandler.dragEventTypes,
this.__ondragevent);
qx.event.handler.KeyEventHandler.getInstance()._attachEvents();
qx.html.EventRegistration.addEventListener(window,
"blur",
this.__onwindowblur);
qx.html.EventRegistration.addEventListener(window,
"focus",
this.__onwindowfocus);
qx.html.EventRegistration.addEventListener(window,
"resize",
this.__onwindowresize);
document.body.onselect=document.onselectstart=document.onselectionchange=this.__onselectevent;
},
detachEvents:function(){this.detachEventTypes(qx.event.handler.EventHandler.mouseEventTypes,
this.__onmouseevent);
this.detachEventTypes(qx.event.handler.EventHandler.dragEventTypes,
this.__ondragevent);
qx.event.handler.KeyEventHandler.getInstance()._detachEvents();
qx.html.EventRegistration.removeEventListener(window,
"blur",
this.__onwindowblur);
qx.html.EventRegistration.removeEventListener(window,
"focus",
this.__onwindowfocus);
qx.html.EventRegistration.removeEventListener(window,
"resize",
this.__onwindowresize);
document.body.onselect=document.onselectstart=document.onselectionchange=null;
},
attachEventTypes:function(vEventTypes,
vFunctionPointer){try{var el=qx.core.Variant.isSet("qx.client",
"gecko")?window:document.body;
for(var i=0,
l=vEventTypes.length;i<l;i++){qx.html.EventRegistration.addEventListener(el,
vEventTypes[i],
vFunctionPointer);
}}catch(ex){throw new Error("qx.event.handler.EventHandler: Failed to attach window event types: "+vEventTypes+": "+ex);
}},
detachEventTypes:function(vEventTypes,
vFunctionPointer){try{var el=qx.core.Variant.isSet("qx.client",
"gecko")?window:document.body;
for(var i=0,
l=vEventTypes.length;i<l;i++){qx.html.EventRegistration.removeEventListener(el,
vEventTypes[i],
vFunctionPointer);
}}catch(ex){throw new Error("qx.event.handler.EventHandler: Failed to detach window event types: "+vEventTypes+": "+ex);
}},
_onkeyevent_post:function(vDomEvent,
vType,
vKeyCode,
vCharCode,
vKeyIdentifier){var vDomTarget=qx.event.handler.EventHandler.getDomTarget(vDomEvent);
var vFocusRoot=this.getFocusRoot();
var vTarget=this.getCaptureWidget()||(vFocusRoot==null?null:vFocusRoot.getActiveChild());
var vKeyEventObject=new qx.event.type.KeyEvent(vType,
vDomEvent,
vDomTarget,
vTarget,
null,
vKeyCode,
vCharCode,
vKeyIdentifier);
if(vType=="keydown"){this._checkKeyEventMatch(vKeyEventObject);
}
if(vTarget!=null&&vTarget.getEnabled()){switch(vKeyIdentifier){case "Escape":case "Tab":if(qx.Class.isDefined("qx.ui.menu.Manager")){qx.ui.menu.Manager.getInstance().update(vTarget,
vType);
}break;
}if(!this.getAllowClientSelectAll()){if(vDomEvent.ctrlKey&&vKeyIdentifier=="A"){switch(vDomTarget.tagName.toLowerCase()){case "input":case "textarea":case "iframe":break;
default:qx.event.handler.EventHandler.stopDomEvent(vDomEvent);
}}}vTarget.dispatchEvent(vKeyEventObject);
if(qx.Class.isDefined("qx.event.handler.DragAndDropHandler")){qx.event.handler.DragAndDropHandler.getInstance().handleKeyEvent(vKeyEventObject);
}}vKeyEventObject.dispose();
},
_onmouseevent:qx.core.Variant.select("qx.client",
{"mshtml":function(vDomEvent){if(!vDomEvent){vDomEvent=window.event;
}var vDomTarget=qx.event.handler.EventHandler.getDomTarget(vDomEvent);
var vType=vDomEvent.type;
if(vType=="mousemove"){if(this._mouseIsDown&&vDomEvent.button==0){this._onmouseevent_post(vDomEvent,
"mouseup");
this._mouseIsDown=false;
}}else{if(vType=="mousedown"){this._mouseIsDown=true;
}else if(vType=="mouseup"){this._mouseIsDown=false;
}if(vType=="mouseup"&&!this._lastMouseDown&&((new Date).valueOf()-this._lastMouseEventDate)<250){this._onmouseevent_post(vDomEvent,
"mousedown");
}else if(vType=="dblclick"&&this._lastMouseEventType=="mouseup"&&((new Date).valueOf()-this._lastMouseEventDate)<250){this._onmouseevent_post(vDomEvent,
"click");
}
switch(vType){case "mousedown":case "mouseup":case "click":case "dblclick":case "contextmenu":this._lastMouseEventType=vType;
this._lastMouseEventDate=(new Date).valueOf();
this._lastMouseDown=vType=="mousedown";
}}this._onmouseevent_post(vDomEvent,
vType,
vDomTarget);
},
"default":function(vDomEvent){var vDomTarget=qx.event.handler.EventHandler.getDomTarget(vDomEvent);
var vType=vDomEvent.type;
switch(vType){case "DOMMouseScroll":vType="mousewheel";
break;
case "click":case "dblclick":if(vDomEvent.which!==1){return;
}}this._onmouseevent_post(vDomEvent,
vType,
vDomTarget);
}}),
_onmouseevent_click_fix:qx.core.Variant.select("qx.client",
{"gecko":function(vDomTarget,
vType,
vDispatchTarget){var vReturn=false;
switch(vType){case "mousedown":this._lastMouseDownDomTarget=vDomTarget;
this._lastMouseDownDispatchTarget=vDispatchTarget;
break;
case "mouseup":if(this._lastMouseDownDispatchTarget===vDispatchTarget&&vDomTarget!==this._lastMouseDownDomTarget){vReturn=true;
}else{this._lastMouseDownDomTarget=null;
this._lastMouseDownDispatchTarget=null;
}}return vReturn;
},
"default":null}),
_onmouseevent_post:function(vDomEvent,
vType,
vDomTarget){var vEventObject,
vCaptureTarget,
vDispatchTarget,
vTarget,
vOriginalTarget,
vRelatedTarget,
vFixClick,
vTargetIsEnabled;
vCaptureTarget=this.getCaptureWidget();
vOriginalTarget=qx.event.handler.EventHandler.getOriginalTargetObject(vDomTarget);
if(!vCaptureTarget){vDispatchTarget=vTarget=qx.event.handler.EventHandler.getTargetObject(null,
vOriginalTarget,
true);
}else{vDispatchTarget=vCaptureTarget;
vTarget=qx.event.handler.EventHandler.getTargetObject(null,
vOriginalTarget,
true);
}if(!vTarget){return;
}vTargetIsEnabled=vTarget.getEnabled();
if(qx.core.Variant.isSet("qx.client",
"gecko")){vFixClick=this._onmouseevent_click_fix(vDomTarget,
vType,
vDispatchTarget);
}if(vType=="contextmenu"&&!this.getAllowClientContextMenu()){qx.event.handler.EventHandler.stopDomEvent(vDomEvent);
}if(vTargetIsEnabled&&vType=="mousedown"){qx.event.handler.FocusHandler.mouseFocus=true;
var vRoot=vTarget.getFocusRoot();
if(vRoot){this.setFocusRoot(vRoot);
var vFocusTarget=vTarget;
while(!vFocusTarget.isFocusable()&&vFocusTarget!=vRoot){vFocusTarget=vFocusTarget.getParent();
}vRoot.setFocusedChild(vFocusTarget);
vRoot.setActiveChild(vTarget);
}}switch(vType){case "mouseover":case "mouseout":vRelatedTarget=qx.event.handler.EventHandler.getRelatedTargetObjectFromEvent(vDomEvent);
if(vRelatedTarget==vTarget){return;
}}vEventObject=new qx.event.type.MouseEvent(vType,
vDomEvent,
vDomTarget,
vTarget,
vOriginalTarget,
vRelatedTarget);
qx.event.type.MouseEvent.storeEventState(vEventObject);
if(vTargetIsEnabled){var vEventWasProcessed=false;
vEventWasProcessed=vDispatchTarget?vDispatchTarget.dispatchEvent(vEventObject):true;
this._onmouseevent_special_post(vType,
vTarget,
vOriginalTarget,
vDispatchTarget,
vEventWasProcessed,
vEventObject,
vDomEvent);
}else{if(vType=="mouseover"){if(qx.Class.isDefined("qx.ui.popup.ToolTipManager")){qx.ui.popup.ToolTipManager.getInstance().handleMouseOver(vEventObject);
}}}vEventObject.dispose();
vEventObject=null;
qx.ui.core.Widget.flushGlobalQueues();
if(vFixClick){this._onmouseevent_post(vDomEvent,
"click",
this._lastMouseDownDomTarget);
this._lastMouseDownDomTarget=null;
this._lastMouseDownDispatchTarget=null;
}},
_onmouseevent_special_post:function(vType,
vTarget,
vOriginalTarget,
vDispatchTarget,
vEventWasProcessed,
vEventObject,
vDomEvent){switch(vType){case "mousedown":if(qx.Class.isDefined("qx.ui.popup.PopupManager")){qx.ui.popup.PopupManager.getInstance().update(vTarget);
}
if(qx.Class.isDefined("qx.ui.menu.Manager")){qx.ui.menu.Manager.getInstance().update(vTarget,
vType);
}
if(qx.Class.isDefined("qx.ui.embed.IframeManager")){qx.ui.embed.IframeManager.getInstance().handleMouseDown(vEventObject);
}break;
case "mouseup":if(qx.Class.isDefined("qx.ui.menu.Manager")){qx.ui.menu.Manager.getInstance().update(vTarget,
vType);
}
if(qx.Class.isDefined("qx.ui.embed.IframeManager")){qx.ui.embed.IframeManager.getInstance().handleMouseUp(vEventObject);
}break;
case "mouseover":if(qx.Class.isDefined("qx.ui.popup.ToolTipManager")){qx.ui.popup.ToolTipManager.getInstance().handleMouseOver(vEventObject);
}break;
case "mouseout":if(qx.Class.isDefined("qx.ui.popup.ToolTipManager")){qx.ui.popup.ToolTipManager.getInstance().handleMouseOut(vEventObject);
}break;
}this._ignoreWindowBlur=vType==="mousedown";
if(qx.Class.isDefined("qx.event.handler.DragAndDropHandler")&&vTarget){qx.event.handler.DragAndDropHandler.getInstance().handleMouseEvent(vEventObject);
}},
_ondragevent:function(vEvent){if(!vEvent){vEvent=window.event;
}qx.event.handler.EventHandler.stopDomEvent(vEvent);
},
_onselectevent:function(e){if(!e){e=window.event;
}var target=qx.event.handler.EventHandler.getOriginalTargetObjectFromEvent(e);
while(target){if(target.getSelectable()!=null){if(!target.getSelectable()){qx.event.handler.EventHandler.stopDomEvent(e);
}break;
}target=target.getParent();
}},
_focused:false,
_onwindowblur:function(e){if(!this._focused||this._ignoreWindowBlur){return;
}this._focused=false;
this.setCaptureWidget(null);
if(qx.Class.isDefined("qx.ui.popup.PopupManager")){qx.ui.popup.PopupManager.getInstance().update();
}if(qx.Class.isDefined("qx.ui.menu.Manager")){qx.ui.menu.Manager.getInstance().update();
}if(qx.Class.isDefined("qx.event.handler.DragAndDropHandler")){qx.event.handler.DragAndDropHandler.getInstance().globalCancelDrag();
}qx.ui.core.ClientDocument.getInstance().createDispatchEvent("windowblur");
},
_onwindowfocus:function(e){if(this._focused){return;
}this._focused=true;
qx.ui.core.ClientDocument.getInstance().createDispatchEvent("windowfocus");
},
_onwindowresize:function(e){qx.ui.core.ClientDocument.getInstance().createDispatchEvent("windowresize");
}},
destruct:function(){this.detachEvents();
this._disposeObjectDeep("_commands",
1);
this._disposeFields("__onmouseevent",
"__ondragevent",
"__onselectevent",
"__onwindowblur",
"__onwindowfocus",
"__onwindowresize");
this._disposeFields("_lastMouseEventType",
"_lastMouseDown",
"_lastMouseEventDate",
"_lastMouseDownDomTarget",
"_lastMouseDownDispatchTarget");
}});




/* ID: qx.dom.Node */
qx.Class.define("qx.dom.Node",
{statics:{ELEMENT:1,
ATTRIBUTE:2,
TEXT:3,
CDATA_SECTION:4,
ENTITY_REFERENCE:5,
ENTITY:6,
PROCESSING_INSTRUCTION:7,
COMMENT:8,
DOCUMENT:9,
DOCUMENT_TYPE:10,
DOCUMENT_FRAGMENT:11,
NOTATION:12,
getDocument:function(node){if(this.isDocument(node)){return node;
}return node.ownerDocument||node.document||null;
},
getWindow:qx.core.Variant.select("qx.client",
{"mshtml":function(node){return this.getDocument(node).parentWindow;
},
"default":function(node){return this.getDocument(node).defaultView;
}}),
getDocumentElement:function(node){return this.getDocument(node).documentElement;
},
getBodyElement:function(node){return this.getDocument(node).body;
},
isElement:function(node){return !!(node&&node.nodeType===qx.dom.Node.ELEMENT);
},
isDocument:function(node){return !!(node&&node.nodeType===qx.dom.Node.DOCUMENT);
},
isText:function(node){return !!(node&&node.nodeType===qx.dom.Node.TEXT);
},
isWindow:function(node){return node.document&&this.getWindow(node.document)==node;
},
getText:function(node){if(!node||!node.nodeType){return null;
}
switch(node.nodeType){case 1:var i,
a=[],
nodes=node.childNodes,
length=nodes.length;
for(i=0;i<length;i++){a[i]=this.getText(nodes[i]);
}return a.join("");
case 2:return node.nodeValue;
break;
case 3:return node.nodeValue;
break;
}return null;
}}});




/* ID: qx.event.handler.KeyEventHandler */
qx.Class.define("qx.event.handler.KeyEventHandler",
{type:"singleton",
extend:qx.core.Target,
construct:function(){this.base(arguments);
this.__onkeypress=qx.lang.Function.bind(this._onkeypress,
this);
this.__onkeyupdown=qx.lang.Function.bind(this._onkeyupdown,
this);
},
members:{_attachEvents:function(){var el=qx.core.Variant.isSet("qx.client",
"gecko")?window:document.body;
qx.html.EventRegistration.addEventListener(el,
"keypress",
this.__onkeypress);
qx.html.EventRegistration.addEventListener(el,
"keyup",
this.__onkeyupdown);
qx.html.EventRegistration.addEventListener(el,
"keydown",
this.__onkeyupdown);
},
_detachEvents:function(){var el=qx.core.Variant.isSet("qx.client",
"gecko")?window:document.body;
qx.html.EventRegistration.removeEventListener(el,
"keypress",
this.__onkeypress);
qx.html.EventRegistration.removeEventListener(el,
"keyup",
this.__onkeyupdown);
qx.html.EventRegistration.removeEventListener(el,
"keydown",
this.__onkeyupdown);
},
_onkeyupdown:qx.core.Variant.select("qx.client",
{"mshtml":function(domEvent){domEvent=window.event||domEvent;
var keyCode=domEvent.keyCode;
var charcode=0;
var type=domEvent.type;
if(!(this._lastUpDownType[keyCode]=="keydown"&&type=="keydown")){this._idealKeyHandler(keyCode,
charcode,
type,
domEvent);
}if(type=="keydown"){if(this._isNonPrintableKeyCode(keyCode)||
keyCode==
8||keyCode==9){this._idealKeyHandler(keyCode,
charcode,
"keypress",
domEvent);
}}this._lastUpDownType[keyCode]=type;
},
"gecko":function(domEvent){var keyCode=this._keyCodeFix[domEvent.keyCode]||domEvent.keyCode;
var charCode=domEvent.charCode;
var type=domEvent.type;
if(qx.core.Client.getInstance().runsOnWindows()){var keyIdentifier=keyCode?this._keyCodeToIdentifier(keyCode):this._charCodeToIdentifier(charCode);
if(!(this._lastUpDownType[keyIdentifier]=="keypress"&&type=="keydown")){this._idealKeyHandler(keyCode,
charCode,
type,
domEvent);
}this._lastUpDownType[keyIdentifier]=type;
}else{this._idealKeyHandler(keyCode,
charCode,
type,
domEvent);
}},
"webkit":function(domEvent){var keyCode=0;
var charCode=0;
var type=domEvent.type;
if(qx.core.Client.getInstance().getVersion()<420){if(!this._lastCharCodeForType){this._lastCharCodeForType={};
}var isSafariSpecialKey=this._lastCharCodeForType[type]>63000;
if(isSafariSpecialKey){this._lastCharCodeForType[type]=null;
return;
}this._lastCharCodeForType[type]=domEvent.charCode;
}
if(type=="keyup"||type=="keydown"){keyCode=this._charCode2KeyCode[domEvent.charCode]||domEvent.keyCode;
}else{if(this._charCode2KeyCode[domEvent.charCode]){keyCode=this._charCode2KeyCode[domEvent.charCode];
}else{charCode=domEvent.charCode;
}}this._idealKeyHandler(keyCode,
charCode,
type,
domEvent);
},
"opera":function(domEvent){this._idealKeyHandler(domEvent.keyCode,
0,
domEvent.type,
domEvent);
this._lastKeyCode=domEvent.keyCode;
},
"default":function(){throw new Error("Unsupported browser for key event handler!");
}}),
_onkeypress:qx.core.Variant.select("qx.client",
{"mshtml":function(domEvent){var domEvent=window.event||domEvent;
if(this._charCode2KeyCode[domEvent.keyCode]){this._idealKeyHandler(this._charCode2KeyCode[domEvent.keyCode],
0,
domEvent.type,
domEvent);
}else{this._idealKeyHandler(0,
domEvent.keyCode,
domEvent.type,
domEvent);
}},
"gecko":function(domEvent){var keyCode=this._keyCodeFix[domEvent.keyCode]||domEvent.keyCode;
var charCode=domEvent.charCode;
var type=domEvent.type;
if(qx.core.Client.getInstance().runsOnWindows()){var keyIdentifier=keyCode?this._keyCodeToIdentifier(keyCode):this._charCodeToIdentifier(charCode);
if(!(this._lastUpDownType[keyIdentifier]=="keypress"&&type=="keydown")){this._idealKeyHandler(keyCode,
charCode,
type,
domEvent);
}this._lastUpDownType[keyIdentifier]=type;
}else{this._idealKeyHandler(keyCode,
charCode,
type,
domEvent);
}},
"webkit":function(domEvent){var keyCode=0;
var charCode=0;
var type=domEvent.type;
if(qx.core.Client.getInstance().getVersion()<420){if(!this._lastCharCodeForType){this._lastCharCodeForType={};
}var isSafariSpecialKey=this._lastCharCodeForType[type]>63000;
if(isSafariSpecialKey){this._lastCharCodeForType[type]=null;
return;
}this._lastCharCodeForType[type]=domEvent.charCode;
}
if(type=="keyup"||type=="keydown"){keyCode=this._charCode2KeyCode[domEvent.charCode]||domEvent.keyCode;
}else{if(this._charCode2KeyCode[domEvent.charCode]){keyCode=this._charCode2KeyCode[domEvent.charCode];
}else{charCode=domEvent.charCode;
}}this._idealKeyHandler(keyCode,
charCode,
type,
domEvent);
},
"opera":function(domEvent){var keyCode=domEvent.keyCode;
var type=domEvent.type;
if(keyCode!=this._lastKeyCode){this._idealKeyHandler(0,
this._lastKeyCode,
type,
domEvent);
}else{if(this._keyCodeToIdentifierMap[keyCode]){this._idealKeyHandler(keyCode,
0,
type,
domEvent);
}else{this._idealKeyHandler(0,
keyCode,
type,
domEvent);
}}this._lastKeyCode=keyCode;
},
"default":function(){throw new Error("Unsupported browser for key event handler!");
}}),
_specialCharCodeMap:{8:"Backspace",
9:"Tab",
13:"Enter",
27:"Escape",
32:"Space"},
_keyCodeToIdentifierMap:{16:"Shift",
17:"Control",
18:"Alt",
20:"CapsLock",
224:"Meta",
37:"Left",
38:"Up",
39:"Right",
40:"Down",
33:"PageUp",
34:"PageDown",
35:"End",
36:"Home",
45:"Insert",
46:"Delete",
112:"F1",
113:"F2",
114:"F3",
115:"F4",
116:"F5",
117:"F6",
118:"F7",
119:"F8",
120:"F9",
121:"F10",
122:"F11",
123:"F12",
144:"NumLock",
44:"PrintScreen",
145:"Scroll",
19:"Pause",
91:"Win",
93:"Apps"},
_numpadToCharCode:{96:"0".charCodeAt(0),
97:"1".charCodeAt(0),
98:"2".charCodeAt(0),
99:"3".charCodeAt(0),
100:"4".charCodeAt(0),
101:"5".charCodeAt(0),
102:"6".charCodeAt(0),
103:"7".charCodeAt(0),
104:"8".charCodeAt(0),
105:"9".charCodeAt(0),
106:"*".charCodeAt(0),
107:"+".charCodeAt(0),
109:"-".charCodeAt(0),
110:",".charCodeAt(0),
111:"/".charCodeAt(0)},
_charCodeA:"A".charCodeAt(0),
_charCodeZ:"Z".charCodeAt(0),
_charCode0:"0".charCodeAt(0),
_charCode9:"9".charCodeAt(0),
_isNonPrintableKeyCode:function(keyCode){return this._keyCodeToIdentifierMap[keyCode]?true:false;
},
_isIdentifiableKeyCode:function(keyCode){if(keyCode>=this._charCodeA&&keyCode<=this._charCodeZ){return true;
}if(keyCode>=this._charCode0&&keyCode<=this._charCode9){return true;
}if(this._specialCharCodeMap[keyCode]){return true;
}if(this._numpadToCharCode[keyCode]){return true;
}if(this._isNonPrintableKeyCode(keyCode)){return true;
}return false;
},
isValidKeyIdentifier:function(keyIdentifier){if(this._identifierToKeyCodeMap[keyIdentifier]){return true;
}
if(keyIdentifier.length!=1){return false;
}
if(keyIdentifier>="0"&&keyIdentifier<="9"){return true;
}
if(keyIdentifier>="A"&&keyIdentifier<="Z"){return true;
}
switch(keyIdentifier){case "+":case "-":case "*":case "/":return true;
default:return false;
}},
_keyCodeToIdentifier:function(keyCode){if(this._isIdentifiableKeyCode(keyCode)){var numPadKeyCode=this._numpadToCharCode[keyCode];
if(numPadKeyCode){return String.fromCharCode(numPadKeyCode);
}return (this._keyCodeToIdentifierMap[keyCode]||this._specialCharCodeMap[keyCode]||String.fromCharCode(keyCode));
}else{return "Unidentified";
}},
_charCodeToIdentifier:function(charCode){return this._specialCharCodeMap[charCode]||String.fromCharCode(charCode).toUpperCase();
},
_identifierToKeyCode:function(keyIdentifier){return this._identifierToKeyCodeMap[keyIdentifier]||keyIdentifier.charCodeAt(0);
},
_idealKeyHandler:function(keyCode,
charCode,
eventType,
domEvent){if(!keyCode&&!charCode){return;
}var keyIdentifier;
if(keyCode){keyIdentifier=this._keyCodeToIdentifier(keyCode);
qx.event.handler.EventHandler.getInstance()._onkeyevent_post(domEvent,
eventType,
keyCode,
charCode,
keyIdentifier);
}else{keyIdentifier=this._charCodeToIdentifier(charCode);
qx.event.handler.EventHandler.getInstance()._onkeyevent_post(domEvent,
"keypress",
keyCode,
charCode,
keyIdentifier);
qx.event.handler.EventHandler.getInstance()._onkeyevent_post(domEvent,
"keyinput",
keyCode,
charCode,
keyIdentifier);
}}},
defer:function(statics,
members,
properties){if(!members._identifierToKeyCodeMap){members._identifierToKeyCodeMap={};
for(var key in members._keyCodeToIdentifierMap){members._identifierToKeyCodeMap[members._keyCodeToIdentifierMap[key]]=parseInt(key);
}
for(var key in members._specialCharCodeMap){members._identifierToKeyCodeMap[members._specialCharCodeMap[key]]=parseInt(key);
}}
if(qx.core.Variant.isSet("qx.client",
"mshtml")){members._lastUpDownType={};
members._charCode2KeyCode={13:13,
27:27};
}else if(qx.core.Variant.isSet("qx.client",
"gecko")){members._lastUpDownType={};
members._keyCodeFix={12:members._identifierToKeyCode("NumLock")};
}else if(qx.core.Variant.isSet("qx.client",
"webkit")){members._charCode2KeyCode={63289:members._identifierToKeyCode("NumLock"),
63276:members._identifierToKeyCode("PageUp"),
63277:members._identifierToKeyCode("PageDown"),
63275:members._identifierToKeyCode("End"),
63273:members._identifierToKeyCode("Home"),
63234:members._identifierToKeyCode("Left"),
63232:members._identifierToKeyCode("Up"),
63235:members._identifierToKeyCode("Right"),
63233:members._identifierToKeyCode("Down"),
63272:members._identifierToKeyCode("Delete"),
63302:members._identifierToKeyCode("Insert"),
63236:members._identifierToKeyCode("F1"),
63237:members._identifierToKeyCode("F2"),
63238:members._identifierToKeyCode("F3"),
63239:members._identifierToKeyCode("F4"),
63240:members._identifierToKeyCode("F5"),
63241:members._identifierToKeyCode("F6"),
63242:members._identifierToKeyCode("F7"),
63243:members._identifierToKeyCode("F8"),
63244:members._identifierToKeyCode("F9"),
63245:members._identifierToKeyCode("F10"),
63246:members._identifierToKeyCode("F11"),
63247:members._identifierToKeyCode("F12"),
63248:members._identifierToKeyCode("PrintScreen"),
3:members._identifierToKeyCode("Enter"),
12:members._identifierToKeyCode("NumLock"),
13:members._identifierToKeyCode("Enter")};
}else if(qx.core.Variant.isSet("qx.client",
"opera")){members._lastKeyCode=null;
}},
destruct:function(){this._detachEvents();
this._disposeFields("_lastUpDownType",
"_lastKeyCode");
}});




/* ID: qx.event.type.DomEvent */
qx.Class.define("qx.event.type.DomEvent",
{extend:qx.event.type.Event,
construct:function(vType,
vDomEvent,
vDomTarget,
vTarget,
vOriginalTarget){this.base(arguments,
vType);
this.setDomEvent(vDomEvent);
this.setDomTarget(vDomTarget);
this.setTarget(vTarget);
this.setOriginalTarget(vOriginalTarget);
},
statics:{SHIFT_MASK:1,
CTRL_MASK:2,
ALT_MASK:4,
META_MASK:8},
properties:{bubbles:{_fast:true,
defaultValue:true,
noCompute:true},
propagationStopped:{_fast:true,
defaultValue:false,
noCompute:true},
domEvent:{_fast:true,
setOnlyOnce:true,
noCompute:true},
domTarget:{_fast:true,
setOnlyOnce:true,
noCompute:true},
modifiers:{_cached:true,
defaultValue:null}},
members:{_computeModifiers:function(){var mask=0;
var evt=this.getDomEvent();
if(evt.shiftKey)mask|=qx.event.type.DomEvent.SHIFT_MASK;
if(evt.ctrlKey)mask|=qx.event.type.DomEvent.CTRL_MASK;
if(evt.altKey)mask|=qx.event.type.DomEvent.ALT_MASK;
if(evt.metaKey)mask|=qx.event.type.DomEvent.META_MASK;
return mask;
},
isCtrlPressed:function(){return this.getDomEvent().ctrlKey;
},
isShiftPressed:function(){return this.getDomEvent().shiftKey;
},
isAltPressed:function(){return this.getDomEvent().altKey;
},
isMetaPressed:function(){return this.getDomEvent().metaKey;
},
isCtrlOrCommandPressed:function(){if(qx.core.Client.getInstance().runsOnMacintosh()){return this.getDomEvent().metaKey;
}else{return this.getDomEvent().ctrlKey;
}},
setDefaultPrevented:qx.core.Variant.select("qx.client",
{"mshtml":function(vValue){if(!vValue){return this.error("It is not possible to set preventDefault to false if it was true before!",
"setDefaultPrevented");
}this.getDomEvent().returnValue=false;
this.base(arguments,
vValue);
},
"default":function(vValue){if(!vValue){return this.error("It is not possible to set preventDefault to false if it was true before!",
"setDefaultPrevented");
}this.getDomEvent().preventDefault();
this.getDomEvent().returnValue=false;
this.base(arguments,
vValue);
}})},
destruct:function(){this._disposeFields("_valueDomEvent",
"_valueDomTarget");
}});




/* ID: qx.event.type.KeyEvent */
qx.Class.define("qx.event.type.KeyEvent",
{extend:qx.event.type.DomEvent,
construct:function(vType,
vDomEvent,
vDomTarget,
vTarget,
vOriginalTarget,
vKeyCode,
vCharCode,
vKeyIdentifier){this.base(arguments,
vType,
vDomEvent,
vDomTarget,
vTarget,
vOriginalTarget);
this._keyCode=vKeyCode;
this.setCharCode(vCharCode);
this.setKeyIdentifier(vKeyIdentifier);
},
statics:{keys:{esc:27,
enter:13,
tab:9,
space:32,
up:38,
down:40,
left:37,
right:39,
shift:16,
ctrl:17,
alt:18,
f1:112,
f2:113,
f3:114,
f4:115,
f5:116,
f6:117,
f7:118,
f8:119,
f9:120,
f10:121,
f11:122,
f12:123,
print:124,
del:46,
backspace:8,
insert:45,
home:36,
end:35,
pageup:33,
pagedown:34,
numlock:144,
numpad_0:96,
numpad_1:97,
numpad_2:98,
numpad_3:99,
numpad_4:100,
numpad_5:101,
numpad_6:102,
numpad_7:103,
numpad_8:104,
numpad_9:105,
numpad_divide:111,
numpad_multiply:106,
numpad_minus:109,
numpad_plus:107},
codes:{}},
properties:{charCode:{_fast:true,
setOnlyOnce:true,
noCompute:true},
keyIdentifier:{_fast:true,
setOnlyOnce:true,
noCompute:true}},
members:{getKeyCode:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee,
"Please use getKeyIdentifier() instead.");
return this._keyCode;
}},
defer:function(statics){for(var i in statics.keys){statics.codes[statics.keys[i]]=i;
}}});




/* ID: qx.event.type.MouseEvent */
qx.Class.define("qx.event.type.MouseEvent",
{extend:qx.event.type.DomEvent,
construct:function(vType,
vDomEvent,
vDomTarget,
vTarget,
vOriginalTarget,
vRelatedTarget){this.base(arguments,
vType,
vDomEvent,
vDomTarget,
vTarget,
vOriginalTarget);
if(vRelatedTarget){this.setRelatedTarget(vRelatedTarget);
}},
statics:{C_BUTTON_LEFT:"left",
C_BUTTON_MIDDLE:"middle",
C_BUTTON_RIGHT:"right",
C_BUTTON_NONE:"none",
_screenX:0,
_screenY:0,
_clientX:0,
_clientY:0,
_pageX:0,
_pageY:0,
_button:null,
buttons:qx.core.Variant.select("qx.client",
{"mshtml":{left:1,
right:2,
middle:4},
"default":{left:0,
right:2,
middle:1}}),
storeEventState:function(e){this._screenX=e.getScreenX();
this._screenY=e.getScreenY();
this._clientX=e.getClientX();
this._clientY=e.getClientY();
this._pageX=e.getPageX();
this._pageY=e.getPageY();
this._button=e.getButton();
},
getScreenX:function(){return this._screenX;
},
getScreenY:function(){return this._screenY;
},
getClientX:function(){return this._clientX;
},
getClientY:function(){return this._clientY;
},
getPageX:function(){return this._pageX;
},
getPageY:function(){return this._pageY;
},
getButton:function(){return this._button;
}},
properties:{button:{_fast:true,
readOnly:true},
wheelDelta:{_fast:true,
readOnly:true}},
members:{getPageX:qx.core.Variant.select("qx.client",
{"mshtml":function(){return this.getDomEvent().clientX+qx.bom.Viewport.getScrollLeft(window);
},
"default":function(){return this.getDomEvent().pageX;
}}),
getPageY:qx.core.Variant.select("qx.client",
{"mshtml":function(){return this.getDomEvent().clientY+qx.bom.Viewport.getScrollTop(window);
},
"default":function(){return this.getDomEvent().pageY;
}}),
getClientX:function(){return this.getDomEvent().clientX;
},
getClientY:function(){return this.getDomEvent().clientY;
},
getScreenX:function(){return this.getDomEvent().screenX;
},
getScreenY:function(){return this.getDomEvent().screenY;
},
isLeftButtonPressed:qx.core.Variant.select("qx.client",
{"mshtml":function(){if(this.getType()=="click"){return true;
}else{return this.getButton()===qx.event.type.MouseEvent.C_BUTTON_LEFT;
}},
"default":function(){return this.getButton()===qx.event.type.MouseEvent.C_BUTTON_LEFT;
}}),
isMiddleButtonPressed:function(){return this.getButton()===qx.event.type.MouseEvent.C_BUTTON_MIDDLE;
},
isRightButtonPressed:function(){return this.getButton()===qx.event.type.MouseEvent.C_BUTTON_RIGHT;
},
__buttons:qx.core.Variant.select("qx.client",
{"mshtml":{1:"left",
2:"right",
4:"middle"},
"default":{0:"left",
2:"right",
1:"middle"}}),
_computeButton:function(){switch(this.getDomEvent().type){case "click":case "dblclick":return "left";
case "contextmenu":return "right";
default:return this.__buttons[this.getDomEvent().button]||"none";
}},
_computeWheelDelta:qx.core.Variant.select("qx.client",
{"default":function(){return this.getDomEvent().wheelDelta/120;
},
"gecko":function(){return -(this.getDomEvent().detail/3);
}})}});




/* ID: qx.util.manager.Object */
qx.Class.define("qx.util.manager.Object",
{extend:qx.core.Target,
construct:function(){this.base(arguments);
this._objects={};
},
members:{add:function(vObject){if(this.getDisposed()){return;
}this._objects[vObject.toHashCode()]=vObject;
},
remove:function(vObject){if(this.getDisposed()){return false;
}delete this._objects[vObject.toHashCode()];
},
has:function(vObject){return this._objects[vObject.toHashCode()]!=null;
},
get:function(vObject){return this._objects[vObject.toHashCode()];
},
getAll:function(){return this._objects;
},
enableAll:function(){for(var vHashCode in this._objects){this._objects[vHashCode].setEnabled(true);
}},
disableAll:function(){for(var vHashCode in this._objects){this._objects[vHashCode].setEnabled(false);
}}},
destruct:function(){this._disposeObjectDeep("_objects");
}});




/* ID: qx.ui.embed.IframeManager */
qx.Class.define("qx.ui.embed.IframeManager",
{type:"singleton",
extend:qx.util.manager.Object,
construct:function(){this.base(arguments);
this._blocked={};
},
members:{handleMouseDown:function(evt){var iframeMap=this._blockData=qx.lang.Object.copy(this.getAll());
for(var key in iframeMap){iframeMap[key].block();
}},
handleMouseUp:function(evt){var iframeMap=this._blockData;
for(var key in iframeMap){iframeMap[key].release();
}}}});




/* ID: qx.ui.layout.CanvasLayout */
qx.Class.define("qx.ui.layout.CanvasLayout",
{extend:qx.ui.core.Parent,
construct:function(){this.base(arguments);
},
members:{_createLayoutImpl:function(){return new qx.ui.layout.impl.CanvasLayoutImpl(this);
}}});




/* ID: qx.ui.layout.impl.LayoutImpl */
qx.Class.define("qx.ui.layout.impl.LayoutImpl",
{extend:qx.core.Object,
construct:function(vWidget){this.base(arguments);
this._widget=vWidget;
},
members:{getWidget:function(){return this._widget;
},
computeChildBoxWidth:function(vChild){return vChild.getWidthValue()||vChild._computeBoxWidthFallback();
},
computeChildBoxHeight:function(vChild){return vChild.getHeightValue()||vChild._computeBoxHeightFallback();
},
computeChildNeededWidth:function(vChild){var vMinBox=vChild._computedMinWidthTypePercent?null:vChild.getMinWidthValue();
var vMaxBox=vChild._computedMaxWidthTypePercent?null:vChild.getMaxWidthValue();
var vBox=(vChild._computedWidthTypePercent||vChild._computedWidthTypeFlex?null:vChild.getWidthValue())||vChild.getPreferredBoxWidth()||0;
return qx.lang.Number.limit(vBox,
vMinBox,
vMaxBox)+vChild.getMarginLeft()+vChild.getMarginRight();
},
computeChildNeededHeight:function(vChild){var vMinBox=vChild._computedMinHeightTypePercent?null:vChild.getMinHeightValue();
var vMaxBox=vChild._computedMaxHeightTypePercent?null:vChild.getMaxHeightValue();
var vBox=(vChild._computedHeightTypePercent||vChild._computedHeightTypeFlex?null:vChild.getHeightValue())||vChild.getPreferredBoxHeight()||0;
return qx.lang.Number.limit(vBox,
vMinBox,
vMaxBox)+vChild.getMarginTop()+vChild.getMarginBottom();
},
computeChildrenNeededWidth_max:function(){for(var i=0,
ch=this.getWidget().getVisibleChildren(),
chl=ch.length,
maxv=0;i<chl;i++){maxv=Math.max(maxv,
ch[i].getNeededWidth());
}return maxv;
},
computeChildrenNeededHeight_max:function(){for(var i=0,
ch=this.getWidget().getVisibleChildren(),
chl=ch.length,
maxv=0;i<chl;i++){maxv=Math.max(maxv,
ch[i].getNeededHeight());
}return maxv;
},
computeChildrenNeededWidth_sum:function(){for(var i=0,
ch=this.getWidget().getVisibleChildren(),
chl=ch.length,
sumv=0;i<chl;i++){sumv+=ch[i].getNeededWidth();
}return sumv;
},
computeChildrenNeededHeight_sum:function(){for(var i=0,
ch=this.getWidget().getVisibleChildren(),
chl=ch.length,
sumv=0;i<chl;i++){sumv+=ch[i].getNeededHeight();
}return sumv;
},
computeChildrenNeededWidth:null,
computeChildrenNeededHeight:null,
updateSelfOnChildOuterWidthChange:function(vChild){},
updateSelfOnChildOuterHeightChange:function(vChild){},
updateChildOnInnerWidthChange:function(vChild){},
updateChildOnInnerHeightChange:function(vChild){},
updateSelfOnJobQueueFlush:function(vJobQueue){},
updateChildrenOnJobQueueFlush:function(vJobQueue){},
updateChildrenOnAddChild:function(vChild,
vIndex){},
updateChildrenOnRemoveChild:function(vChild,
vIndex){},
updateChildrenOnMoveChild:function(vChild,
vIndex,
vOldIndex){},
flushChildrenQueue:function(vChildrenQueue){var vWidget=this.getWidget();
for(var vHashCode in vChildrenQueue){vWidget._layoutChild(vChildrenQueue[vHashCode]);
}},
layoutChild:function(vChild,
vJobs){},
layoutChild_sizeLimitX:qx.core.Variant.select("qx.client",
{"mshtml":qx.lang.Function.returnTrue,
"default":function(vChild,
vJobs){if(vJobs.minWidth){vChild._computedMinWidthTypeNull?vChild._resetRuntimeMinWidth():vChild._renderRuntimeMinWidth(vChild.getMinWidthValue());
}else if(vJobs.initial&&!vChild._computedMinWidthTypeNull){vChild._renderRuntimeMinWidth(vChild.getMinWidthValue());
}
if(vJobs.maxWidth){vChild._computedMaxWidthTypeNull?vChild._resetRuntimeMaxWidth():vChild._renderRuntimeMaxWidth(vChild.getMaxWidthValue());
}else if(vJobs.initial&&!vChild._computedMaxWidthTypeNull){vChild._renderRuntimeMaxWidth(vChild.getMaxWidthValue());
}}}),
layoutChild_sizeLimitY:qx.core.Variant.select("qx.client",
{"mshtml":qx.lang.Function.returnTrue,
"default":function(vChild,
vJobs){if(vJobs.minHeight){vChild._computedMinHeightTypeNull?vChild._resetRuntimeMinHeight():vChild._renderRuntimeMinHeight(vChild.getMinHeightValue());
}else if(vJobs.initial&&!vChild._computedMinHeightTypeNull){vChild._renderRuntimeMinHeight(vChild.getMinHeightValue());
}
if(vJobs.maxHeight){vChild._computedMaxHeightTypeNull?vChild._resetRuntimeMaxHeight():vChild._renderRuntimeMaxHeight(vChild.getMaxHeightValue());
}else if(vJobs.initial&&!vChild._computedMaxHeightTypeNull){vChild._renderRuntimeMaxHeight(vChild.getMaxHeightValue());
}}}),
layoutChild_marginX:function(vChild,
vJobs){if(vJobs.marginLeft||vJobs.initial){var vValueLeft=vChild.getMarginLeft();
vValueLeft!=null?vChild._renderRuntimeMarginLeft(vValueLeft):vChild._resetRuntimeMarginLeft();
}
if(vJobs.marginRight||vJobs.initial){var vValueRight=vChild.getMarginRight();
vValueRight!=null?vChild._renderRuntimeMarginRight(vValueRight):vChild._resetRuntimeMarginRight();
}},
layoutChild_marginY:function(vChild,
vJobs){if(vJobs.marginTop||vJobs.initial){var vValueTop=vChild.getMarginTop();
vValueTop!=null?vChild._renderRuntimeMarginTop(vValueTop):vChild._resetRuntimeMarginTop();
}
if(vJobs.marginBottom||vJobs.initial){var vValueBottom=vChild.getMarginBottom();
vValueBottom!=null?vChild._renderRuntimeMarginBottom(vValueBottom):vChild._resetRuntimeMarginBottom();
}},
layoutChild_sizeX_essentialWrapper:function(vChild,
vJobs){return vChild._isWidthEssential()?this.layoutChild_sizeX(vChild,
vJobs):vChild._resetRuntimeWidth();
},
layoutChild_sizeY_essentialWrapper:function(vChild,
vJobs){return vChild._isHeightEssential()?this.layoutChild_sizeY(vChild,
vJobs):vChild._resetRuntimeHeight();
}},
defer:function(statics,
members){members.computeChildrenNeededWidth=members.computeChildrenNeededWidth_max;
members.computeChildrenNeededHeight=members.computeChildrenNeededHeight_max;
},
destruct:function(){this._disposeFields("_widget");
}});




/* ID: qx.lang.Number */
qx.Class.define("qx.lang.Number",
{statics:{isInRange:function(nr,
vmin,
vmax){return nr>=vmin&&nr<=vmax;
},
isBetweenRange:function(nr,
vmin,
vmax){return nr>vmin&&nr<vmax;
},
limit:function(nr,
vmin,
vmax){if(typeof vmax==="number"&&nr>vmax){return vmax;
}else if(typeof vmin==="number"&&nr<vmin){return vmin;
}else{return nr;
}}}});




/* ID: qx.ui.layout.impl.CanvasLayoutImpl */
qx.Class.define("qx.ui.layout.impl.CanvasLayoutImpl",
{extend:qx.ui.layout.impl.LayoutImpl,
construct:function(vWidget){this.base(arguments,
vWidget);
},
members:{computeChildBoxWidth:function(vChild){var vValue=null;
if(vChild._computedLeftTypeNull||vChild._computedRightTypeNull){vValue=vChild.getWidthValue();
}else if(vChild._hasParent){vValue=this.getWidget().getInnerWidth()-vChild.getLeftValue()-vChild.getRightValue();
}return vValue||vChild._computeBoxWidthFallback();
},
computeChildBoxHeight:function(vChild){var vValue=null;
if(vChild._computedTopTypeNull||vChild._computedBottomTypeNull){vValue=vChild.getHeightValue();
}else if(vChild._hasParent){vValue=this.getWidget().getInnerHeight()-vChild.getTopValue()-vChild.getBottomValue();
}return vValue||vChild._computeBoxHeightFallback();
},
computeChildNeededWidth:function(vChild){var vLeft=vChild._computedLeftTypePercent?null:vChild.getLeftValue();
var vRight=vChild._computedRightTypePercent?null:vChild.getRightValue();
var vMinBox=vChild._computedMinWidthTypePercent?null:vChild.getMinWidthValue();
var vMaxBox=vChild._computedMaxWidthTypePercent?null:vChild.getMaxWidthValue();
if(vLeft!=null&&vRight!=null){var vBox=vChild.getPreferredBoxWidth()||0;
}else{var vBox=(vChild._computedWidthTypePercent?null:vChild.getWidthValue())||vChild.getPreferredBoxWidth()||0;
}return qx.lang.Number.limit(vBox,
vMinBox,
vMaxBox)+vLeft+vRight+vChild.getMarginLeft()+vChild.getMarginRight();
},
computeChildNeededHeight:function(vChild){var vTop=vChild._computedTopTypePercent?null:vChild.getTopValue();
var vBottom=vChild._computedBottomTypePercent?null:vChild.getBottomValue();
var vMinBox=vChild._computedMinHeightTypePercent?null:vChild.getMinHeightValue();
var vMaxBox=vChild._computedMaxHeightTypePercent?null:vChild.getMaxHeightValue();
if(vTop!=null&&vBottom!=null){var vBox=vChild.getPreferredBoxHeight()||0;
}else{var vBox=(vChild._computedHeightTypePercent?null:vChild.getHeightValue())||vChild.getPreferredBoxHeight()||0;
}return qx.lang.Number.limit(vBox,
vMinBox,
vMaxBox)+vTop+vBottom+vChild.getMarginTop()+vChild.getMarginBottom();
},
updateChildOnInnerWidthChange:function(vChild){var vUpdatePercent=vChild._recomputePercentX();
var vUpdateRange=vChild._recomputeRangeX();
return vUpdatePercent||vUpdateRange;
},
updateChildOnInnerHeightChange:function(vChild){var vUpdatePercent=vChild._recomputePercentY();
var vUpdateRange=vChild._recomputeRangeY();
return vUpdatePercent||vUpdateRange;
},
layoutChild:function(vChild,
vJobs){this.layoutChild_sizeX_essentialWrapper(vChild,
vJobs);
this.layoutChild_sizeY_essentialWrapper(vChild,
vJobs);
this.layoutChild_sizeLimitX(vChild,
vJobs);
this.layoutChild_sizeLimitY(vChild,
vJobs);
this.layoutChild_locationX(vChild,
vJobs);
this.layoutChild_locationY(vChild,
vJobs);
this.layoutChild_marginX(vChild,
vJobs);
this.layoutChild_marginY(vChild,
vJobs);
},
layoutChild_sizeX:qx.core.Variant.select("qx.client",
{"mshtml|opera|webkit":function(vChild,
vJobs){if(vJobs.initial||vJobs.width||vJobs.minWidth||vJobs.maxWidth||vJobs.left||vJobs.right){if(vChild._computedMinWidthTypeNull&&vChild._computedWidthTypeNull&&vChild._computedMaxWidthTypeNull&&!(!vChild._computedLeftTypeNull&&!vChild._computedRightTypeNull)){vChild._resetRuntimeWidth();
}else{vChild._renderRuntimeWidth(vChild.getBoxWidth());
}}},
"default":function(vChild,
vJobs){if(vJobs.initial||vJobs.width){vChild._computedWidthTypeNull?vChild._resetRuntimeWidth():vChild._renderRuntimeWidth(vChild.getWidthValue());
}}}),
layoutChild_sizeY:qx.core.Variant.select("qx.client",
{"mshtml|opera|webkit":function(vChild,
vJobs){if(vJobs.initial||vJobs.height||vJobs.minHeight||vJobs.maxHeight||vJobs.top||vJobs.bottom){if(vChild._computedMinHeightTypeNull&&vChild._computedHeightTypeNull&&vChild._computedMaxHeightTypeNull&&!(!vChild._computedTopTypeNull&&!vChild._computedBottomTypeNull)){vChild._resetRuntimeHeight();
}else{vChild._renderRuntimeHeight(vChild.getBoxHeight());
}}},
"default":function(vChild,
vJobs){if(vJobs.initial||vJobs.height){vChild._computedHeightTypeNull?vChild._resetRuntimeHeight():vChild._renderRuntimeHeight(vChild.getHeightValue());
}}}),
layoutChild_locationX:function(vChild,
vJobs){var vWidget=this.getWidget();
if(vJobs.initial||vJobs.left||vJobs.parentPaddingLeft){vChild._computedLeftTypeNull?vChild._computedRightTypeNull&&vWidget.getPaddingLeft()>0?vChild._renderRuntimeLeft(vWidget.getPaddingLeft()):vChild._resetRuntimeLeft():vChild._renderRuntimeLeft(vChild.getLeftValue()+vWidget.getPaddingLeft());
}
if(vJobs.initial||vJobs.right||vJobs.parentPaddingRight){vChild._computedRightTypeNull?vChild._computedLeftTypeNull&&vWidget.getPaddingRight()>0?vChild._renderRuntimeRight(vWidget.getPaddingRight()):vChild._resetRuntimeRight():vChild._renderRuntimeRight(vChild.getRightValue()+vWidget.getPaddingRight());
}},
layoutChild_locationY:function(vChild,
vJobs){var vWidget=this.getWidget();
if(vJobs.initial||vJobs.top||vJobs.parentPaddingTop){vChild._computedTopTypeNull?vChild._computedBottomTypeNull&&vWidget.getPaddingTop()>0?vChild._renderRuntimeTop(vWidget.getPaddingTop()):vChild._resetRuntimeTop():vChild._renderRuntimeTop(vChild.getTopValue()+vWidget.getPaddingTop());
}
if(vJobs.initial||vJobs.bottom||vJobs.parentPaddingBottom){vChild._computedBottomTypeNull?vChild._computedTopTypeNull&&vWidget.getPaddingBottom()>0?vChild._renderRuntimeBottom(vWidget.getPaddingBottom()):vChild._resetRuntimeBottom():vChild._renderRuntimeBottom(vChild.getBottomValue()+vWidget.getPaddingBottom());
}}}});




/* ID: qx.ui.core.ClientDocument */
qx.Class.define("qx.ui.core.ClientDocument",
{type:"singleton",
extend:qx.ui.layout.CanvasLayout,
construct:function(){this.base(arguments);
this._window=window;
this._document=window.document;
this.setElement(this._document.body);
this._document.body.style.position="";
if(qx.core.Variant.isSet("qx.client",
"mshtml")&&(qx.core.Client.getInstance().getMajor()<7)){try{document.execCommand("BackgroundImageCache",
false,
true);
}catch(err){}}this._cachedInnerWidth=this._document.body.offsetWidth;
this._cachedInnerHeight=this._document.body.offsetHeight;
this.addEventListener("windowresize",
this._onwindowresize);
this._modalWidgets=[];
this._modalNativeWindow=null;
this.activateFocusRoot();
this.initHideFocus();
this.initSelectable();
qx.event.handler.EventHandler.getInstance().setFocusRoot(this);
},
events:{"focus":"qx.event.type.Event",
"windowblur":"qx.event.type.Event",
"windowfocus":"qx.event.type.Event",
"windowresize":"qx.event.type.Event"},
properties:{appearance:{refine:true,
init:"client-document"},
enableElementFocus:{refine:true,
init:false},
enabled:{refine:true,
init:true},
selectable:{refine:true,
init:false},
hideFocus:{refine:true,
init:true},
globalCursor:{check:"String",
nullable:true,
themeable:true,
apply:"_applyGlobalCursor",
event:"changeGlobalCursor"}},
members:{_applyParent:qx.lang.Function.returnTrue,
getTopLevelWidget:qx.lang.Function.returnThis,
getWindowElement:function(){return this._window;
},
getDocumentElement:function(){return this._document;
},
getParent:qx.lang.Function.returnNull,
getToolTip:qx.lang.Function.returnNull,
isMaterialized:qx.lang.Function.returnTrue,
isSeeable:qx.lang.Function.returnTrue,
_isDisplayable:true,
_hasParent:false,
_initialLayoutDone:true,
_getBlocker:function(){if(!this._blocker){this._blocker=new qx.ui.core.ClientDocumentBlocker;
this._blocker.addEventListener("mousedown",
this.blockHelper,
this);
this._blocker.addEventListener("mouseup",
this.blockHelper,
this);
this.add(this._blocker);
}return this._blocker;
},
blockHelper:function(e){if(this._modalNativeWindow){if(!this._modalNativeWindow.isClosed()){this._modalNativeWindow.focus();
}else{this.debug("Window seems to be closed already! => Releasing Blocker");
this.release(this._modalNativeWindow);
}}},
block:function(vActiveChild){this._getBlocker().show();
if(qx.Class.isDefined("qx.ui.window.Window")&&vActiveChild instanceof qx.ui.window.Window){this._modalWidgets.push(vActiveChild);
var vOrigIndex=vActiveChild.getZIndex();
this._getBlocker().setZIndex(vOrigIndex);
vActiveChild.setZIndex(vOrigIndex+1);
}else if(qx.Class.isDefined("qx.client.NativeWindow")&&vActiveChild instanceof qx.client.NativeWindow){this._modalNativeWindow=vActiveChild;
this._getBlocker().setZIndex(1e7);
}},
release:function(vActiveChild){if(vActiveChild){if(qx.Class.isDefined("qx.client.NativeWindow")&&vActiveChild instanceof qx.client.NativeWindow){this._modalNativeWindow=null;
}else{qx.lang.Array.remove(this._modalWidgets,
vActiveChild);
}}var l=this._modalWidgets.length;
if(l==0){this._getBlocker().hide();
}else{var oldActiveChild=this._modalWidgets[l-1];
var o=oldActiveChild.getZIndex();
this._getBlocker().setZIndex(o);
oldActiveChild.setZIndex(o+1);
}},
createStyleElement:function(vCssText){return qx.html.StyleSheet.createElement(vCssText);
},
addCssRule:function(vSheet,
vSelector,
vStyle){return qx.html.StyleSheet.addRule(vSheet,
vSelector,
vStyle);
},
removeCssRule:function(vSheet,
vSelector){return qx.html.StyleSheet.removeRule(vSheet,
vSelector);
},
removeAllCssRules:function(vSheet){return qx.html.StyleSheet.removeAllRules(vSheet);
},
_applyGlobalCursor:qx.core.Variant.select("qx.client",
{"mshtml":function(value,
old){if(value=="pointer"){value="hand";
}
if(old=="pointer"){old="hand";
}var elem,
current;
var list=this._cursorElements;
if(list){for(var i=0,
l=list.length;i<l;i++){elem=list[i];
if(elem.style.cursor==old){elem.style.cursor=elem._oldCursor;
elem._oldCursor=null;
}}}var all=document.all;
var list=this._cursorElements=[];
if(value!=null&&value!=""&&value!="auto"){for(var i=0,
l=all.length;i<l;i++){elem=all[i];
current=elem.style.cursor;
if(current!=null&&current!=""&&current!="auto"){elem._oldCursor=current;
elem.style.cursor=value;
list.push(elem);
}}document.body.style.cursor=value;
}else{document.body.style.cursor="";
}},
"default":function(value,
old){if(!this._globalCursorStyleSheet){this._globalCursorStyleSheet=this.createStyleElement();
}this.removeCssRule(this._globalCursorStyleSheet,
"*");
if(value){this.addCssRule(this._globalCursorStyleSheet,
"*",
"cursor:"+value+" !important");
}}}),
_onwindowresize:function(e){if(qx.Class.isDefined("qx.ui.popup.PopupManager")){qx.ui.popup.PopupManager.getInstance().update();
}this._recomputeInnerWidth();
this._recomputeInnerHeight();
qx.ui.core.Widget.flushGlobalQueues();
},
_computeInnerWidth:function(){return this._document.body.offsetWidth;
},
_computeInnerHeight:function(){return this._document.body.offsetHeight;
}},
settings:{"qx.enableApplicationLayout":true,
"qx.boxModelCorrection":true},
defer:function(){if(qx.core.Setting.get("qx.boxModelCorrection")){var boxSizingAttr=qx.core.Client.getInstance().getEngineBoxSizingAttributes();
var borderBoxCss=boxSizingAttr.join(":border-box;")+":border-box;";
var contentBoxCss=boxSizingAttr.join(":content-box;")+":content-box;";
qx.html.StyleSheet.createElement("html,body { margin:0;border:0;padding:0; } "+"html { border:0 none; } "+"*{"+borderBoxCss+"} "+"img{"+contentBoxCss+"}");
}
if(qx.core.Setting.get("qx.enableApplicationLayout")){qx.html.StyleSheet.createElement("html,body{width:100%;height:100%;overflow:hidden;}");
}},
destruct:function(){this._disposeObjects("_blocker");
this._disposeFields("_window",
"_document",
"_modalWidgets",
"_modalNativeWindow",
"_globalCursorStyleSheet");
}});




/* ID: qx.ui.basic.Terminator */
qx.Class.define("qx.ui.basic.Terminator",
{extend:qx.ui.core.Widget,
members:{renderPadding:function(changes){if(changes.paddingLeft){this._renderRuntimePaddingLeft(this.getPaddingLeft());
}
if(changes.paddingRight){this._renderRuntimePaddingRight(this.getPaddingRight());
}
if(changes.paddingTop){this._renderRuntimePaddingTop(this.getPaddingTop());
}
if(changes.paddingBottom){this._renderRuntimePaddingBottom(this.getPaddingBottom());
}},
_renderContent:function(){if(this._computedWidthTypePixel){this._cachedPreferredInnerWidth=null;
}else{this._invalidatePreferredInnerWidth();
}if(this._computedHeightTypePixel){this._cachedPreferredInnerHeight=null;
}else{this._invalidatePreferredInnerHeight();
}if(this._initialLayoutDone){this.addToJobQueue("load");
}},
_layoutPost:function(changes){if(changes.initial||changes.load||changes.width||changes.height){this._postApply();
}},
_postApply:qx.lang.Function.returnTrue,
_computeBoxWidthFallback:function(){return this.getPreferredBoxWidth();
},
_computeBoxHeightFallback:function(){return this.getPreferredBoxHeight();
},
_computePreferredInnerWidth:qx.lang.Function.returnZero,
_computePreferredInnerHeight:qx.lang.Function.returnZero,
_isWidthEssential:function(){if(!this._computedLeftTypeNull&&!this._computedRightTypeNull){return true;
}
if(!this._computedWidthTypeNull&&!this._computedWidthTypeAuto){return true;
}
if(!this._computedMinWidthTypeNull&&!this._computedMinWidthTypeAuto){return true;
}
if(!this._computedMaxWidthTypeNull&&!this._computedMaxWidthTypeAuto){return true;
}
if(this._borderElement){return true;
}return false;
},
_isHeightEssential:function(){if(!this._computedTopTypeNull&&!this._computedBottomTypeNull){return true;
}
if(!this._computedHeightTypeNull&&!this._computedHeightTypeAuto){return true;
}
if(!this._computedMinHeightTypeNull&&!this._computedMinHeightTypeAuto){return true;
}
if(!this._computedMaxHeightTypeNull&&!this._computedMaxHeightTypeAuto){return true;
}
if(this._borderElement){return true;
}return false;
}}});




/* ID: qx.ui.core.ClientDocumentBlocker */
qx.Class.define("qx.ui.core.ClientDocumentBlocker",
{extend:qx.ui.basic.Terminator,
construct:function(){this.base(arguments);
this.initTop();
this.initLeft();
this.initWidth();
this.initHeight();
this.initZIndex();
},
properties:{appearance:{refine:true,
init:"client-document-blocker"},
zIndex:{refine:true,
init:1e8},
top:{refine:true,
init:0},
left:{refine:true,
init:0},
width:{refine:true,
init:"100%"},
height:{refine:true,
init:"100%"},
display:{refine:true,
init:false}},
members:{getFocusRoot:function(){return null;
}}});




/* ID: qx.theme.manager.Appearance */
qx.Class.define("qx.theme.manager.Appearance",
{type:"singleton",
extend:qx.util.manager.Object,
construct:function(){this.base(arguments);
this.__cache={};
this.__stateMap={};
this.__stateMapLength=1;
},
properties:{appearanceTheme:{check:"Theme",
nullable:true,
apply:"_applyAppearanceTheme",
event:"changeAppearanceTheme"}},
members:{_applyAppearanceTheme:function(value,
old){this._currentTheme=value;
this._oldTheme=old;
if(qx.theme.manager.Meta.getInstance().getAutoSync()){this.syncAppearanceTheme();
}},
syncAppearanceTheme:function(){if(!this._currentTheme&&!this._oldTheme){return;
}
if(this._currentTheme){this.__cache[this._currentTheme.name]={};
}var app=qx.core.Init.getInstance().getApplication();
if(app&&app.getUiReady()){qx.ui.core.ClientDocument.getInstance()._recursiveAppearanceThemeUpdate(this._currentTheme,
this._oldTheme);
}
if(this._oldTheme){delete this.__cache[this._oldTheme.name];
}delete this._currentTheme;
delete this._oldTheme;
},
styleFrom:function(id,
states){var theme=this.getAppearanceTheme();
if(!theme){return;
}return this.styleFromTheme(theme,
id,
states);
},
styleFromTheme:function(theme,
id,
states){var entry=theme.appearances[id];
if(!entry){{this.warn("Missing appearance entry: "+id);
};
return null;
}if(!entry.style){if(entry.include){return this.styleFromTheme(theme,
entry.include,
states);
}else{return null;
}}var map=this.__stateMap;
var helper=[id];
for(var state in states){if(!map[state]){map[state]=this.__stateMapLength++;
}helper[map[state]]=true;
}var unique=helper.join();
var cache=this.__cache[theme.name];
if(cache&&cache[unique]!==undefined){return cache[unique];
}var result;
if(entry.include||entry.base){var local=entry.style(states);
var incl;
if(entry.include){incl=this.styleFromTheme(theme,
entry.include,
states);
}result={};
if(entry.base){var base=this.styleFromTheme(entry.base,
id,
states);
if(entry.include){for(var key in base){if(incl[key]===undefined&&local[key]===undefined){result[key]=base[key];
}}}else{for(var key in base){if(local[key]===undefined){result[key]=base[key];
}}}}if(entry.include){for(var key in incl){if(local[key]===undefined){result[key]=incl[key];
}}}for(var key in local){result[key]=local[key];
}}else{result=entry.style(states);
}if(cache){cache[unique]=result||null;
}return result||null;
}},
destruct:function(){this._disposeFields("__cache",
"__stateMap");
}});




/* ID: qx.theme.manager.Meta */
qx.Class.define("qx.theme.manager.Meta",
{type:"singleton",
extend:qx.core.Target,
properties:{theme:{check:"Theme",
nullable:true,
apply:"_applyTheme",
event:"changeTheme"},
autoSync:{check:"Boolean",
init:true,
apply:"_applyAutoSync"}},
members:{_applyTheme:function(value,
old){var color=null;
var border=null;
var font=null;
var widget=null;
var icon=null;
var appearance=null;
if(value){color=value.meta.color||null;
border=value.meta.border||null;
font=value.meta.font||null;
widget=value.meta.widget||null;
icon=value.meta.icon||null;
appearance=value.meta.appearance||null;
}
if(old){this.setAutoSync(false);
}var colorMgr=qx.theme.manager.Color.getInstance();
var borderMgr=qx.theme.manager.Border.getInstance();
var fontMgr=qx.theme.manager.Font.getInstance();
var iconMgr=qx.theme.manager.Icon.getInstance();
var widgetMgr=qx.theme.manager.Widget.getInstance();
var appearanceMgr=qx.theme.manager.Appearance.getInstance();
colorMgr.setColorTheme(color);
borderMgr.setBorderTheme(border);
fontMgr.setFontTheme(font);
widgetMgr.setWidgetTheme(widget);
iconMgr.setIconTheme(icon);
appearanceMgr.setAppearanceTheme(appearance);
if(old){this.setAutoSync(true);
}},
_applyAutoSync:function(value,
old){if(value){qx.theme.manager.Appearance.getInstance().syncAppearanceTheme();
qx.theme.manager.Icon.getInstance().syncIconTheme();
qx.theme.manager.Widget.getInstance().syncWidgetTheme();
qx.theme.manager.Font.getInstance().syncFontTheme();
qx.theme.manager.Border.getInstance().syncBorderTheme();
qx.theme.manager.Color.getInstance().syncColorTheme();
}},
initialize:function(){var setting=qx.core.Setting;
var theme,
obj;
theme=setting.get("qx.theme");
if(theme){obj=qx.Theme.getByName(theme);
if(!obj){throw new Error("The meta theme to use is not available: "+theme);
}this.setTheme(obj);
}theme=setting.get("qx.colorTheme");
if(theme){obj=qx.Theme.getByName(theme);
if(!obj){throw new Error("The color theme to use is not available: "+theme);
}qx.theme.manager.Color.getInstance().setColorTheme(obj);
}theme=setting.get("qx.borderTheme");
if(theme){obj=qx.Theme.getByName(theme);
if(!obj){throw new Error("The border theme to use is not available: "+theme);
}qx.theme.manager.Border.getInstance().setBorderTheme(obj);
}theme=setting.get("qx.fontTheme");
if(theme){obj=qx.Theme.getByName(theme);
if(!obj){throw new Error("The font theme to use is not available: "+theme);
}qx.theme.manager.Font.getInstance().setFontTheme(obj);
}theme=setting.get("qx.widgetTheme");
if(theme){obj=qx.Theme.getByName(theme);
if(!obj){throw new Error("The widget theme to use is not available: "+theme);
}qx.theme.manager.Widget.getInstance().setWidgetTheme(obj);
}theme=setting.get("qx.iconTheme");
if(theme){obj=qx.Theme.getByName(theme);
if(!obj){throw new Error("The icon theme to use is not available: "+theme);
}qx.theme.manager.Icon.getInstance().setIconTheme(obj);
}theme=setting.get("qx.appearanceTheme");
if(theme){obj=qx.Theme.getByName(theme);
if(!obj){throw new Error("The appearance theme to use is not available: "+theme);
}qx.theme.manager.Appearance.getInstance().setAppearanceTheme(obj);
}},
__queryThemes:function(key){var reg=qx.Theme.getAll();
var theme;
var list=[];
for(var name in reg){theme=reg[name];
if(theme[key]){list.push(theme);
}}return list;
},
getMetaThemes:function(){return this.__queryThemes("meta");
},
getColorThemes:function(){return this.__queryThemes("colors");
},
getBorderThemes:function(){return this.__queryThemes("borders");
},
getFontThemes:function(){return this.__queryThemes("fonts");
},
getWidgetThemes:function(){return this.__queryThemes("widgets");
},
getIconThemes:function(){return this.__queryThemes("icons");
},
getAppearanceThemes:function(){return this.__queryThemes("appearances");
}},
settings:{"qx.theme":"qx.theme.ClassicRoyale",
"qx.colorTheme":null,
"qx.borderTheme":null,
"qx.fontTheme":null,
"qx.widgetTheme":null,
"qx.appearanceTheme":null,
"qx.iconTheme":null}});




/* ID: qx.theme.manager.Color */
qx.Class.define("qx.theme.manager.Color",
{type:"singleton",
extend:qx.util.manager.Value,
properties:{colorTheme:{check:"Theme",
nullable:true,
apply:"_applyColorTheme",
event:"changeColorTheme"}},
members:{_applyColorTheme:function(value){var dest=this._dynamic={};
if(value){var source=value.colors;
var util=qx.util.ColorUtil;
var temp;
for(var key in source){temp=source[key];
if(typeof temp==="string"){if(!util.isCssString(temp)){throw new Error("Could not parse color: "+temp);
}}else if(temp instanceof Array){temp=util.rgbToRgbString(temp);
}else{throw new Error("Could not parse color: "+temp);
}dest[key]=temp;
}}
if(qx.theme.manager.Meta.getInstance().getAutoSync()){this.syncColorTheme();
}},
syncColorTheme:function(){this._updateObjects();
}}});




/* ID: qx.util.ColorUtil */
qx.Class.define("qx.util.ColorUtil",
{statics:{REGEXP:{hex3:/^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
hex6:/^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
rgb:/^rgb\(\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*\)$/},
SYSTEM:{activeborder:true,
activecaption:true,
appworkspace:true,
background:true,
buttonface:true,
buttonhighlight:true,
buttonshadow:true,
buttontext:true,
captiontext:true,
graytext:true,
highlight:true,
highlighttext:true,
inactiveborder:true,
inactivecaption:true,
inactivecaptiontext:true,
infobackground:true,
infotext:true,
menu:true,
menutext:true,
scrollbar:true,
threeddarkshadow:true,
threedface:true,
threedhighlight:true,
threedlightshadow:true,
threedshadow:true,
window:true,
windowframe:true,
windowtext:true},
NAMED:{black:[0,
0,
0],
silver:[192,
192,
192],
gray:[128,
128,
128],
white:[255,
255,
255],
maroon:[128,
0,
0],
red:[255,
0,
0],
purple:[128,
0,
128],
fuchsia:[255,
0,
255],
green:[0,
128,
0],
lime:[0,
255,
0],
olive:[128,
128,
0],
yellow:[255,
255,
0],
navy:[0,
0,
128],
blue:[0,
0,
255],
teal:[0,
128,
128],
aqua:[0,
255,
255],
transparent:[-1,
-1,
-1],
grey:[128,
128,
128],
magenta:[255,
0,
255],
orange:[255,
165,
0],
brown:[165,
42,
42]},
isNamedColor:function(value){return this.NAMED[value]!==undefined;
},
isSystemColor:function(value){return this.SYSTEM[value]!==undefined;
},
isThemedColor:function(value){return qx.theme.manager.Color.getInstance().isDynamic(value);
},
stringToRgb:function(str){if(this.isThemedColor(str)){var str=qx.theme.manager.Color.getInstance().resolveDynamic(str);
}
if(this.isNamedColor(str)){return this.NAMED[str];
}else if(this.isSystemColor(str)){throw new Error("Could not convert system colors to RGB: "+str);
}else if(this.isRgbString(str)){return this.__rgbStringToRgb();
}else if(this.isHex3String(str)){return this.__hex3StringToRgb();
}else if(this.isHex6String(str)){return this.__hex6StringToRgb();
}throw new Error("Could not parse color: "+str);
},
cssStringToRgb:function(str){if(this.isNamedColor(str)){return this.NAMED[str];
}else if(this.isSystemColor(str)){throw new Error("Could not convert system colors to RGB: "+str);
}else if(this.isRgbString(str)){return this.__rgbStringToRgb();
}else if(this.isHex3String(str)){return this.__hex3StringToRgb();
}else if(this.isHex6String(str)){return this.__hex6StringToRgb();
}throw new Error("Could not parse color: "+str);
},
stringToRgbString:function(str){return this.rgbToRgbString(this.stringToRgb(str));
},
rgbToRgbString:function(rgb){return "rgb("+rgb[0]+","+rgb[1]+","+rgb[2]+")";
},
rgbToHexString:function(rgb){return (qx.lang.String.pad(rgb[0].toString(16).toUpperCase(),
2)+qx.lang.String.pad(rgb[1].toString(16).toUpperCase(),
2)+qx.lang.String.pad(rgb[2].toString(16).toUpperCase(),
2));
},
isValid:function(str){return this.isThemedColor(str)||this.isCssString(str);
},
isCssString:function(str){return this.isSystemColor(str)||this.isNamedColor(str)||this.isHex3String(str)||this.isHex6String(str)||this.isRgbString(str);
},
isHex3String:function(str){return this.REGEXP.hex3.test(str);
},
isHex6String:function(str){return this.REGEXP.hex6.test(str);
},
isRgbString:function(str){return this.REGEXP.rgb.test(str);
},
__rgbStringToRgb:function(){var red=parseInt(RegExp.$1);
var green=parseInt(RegExp.$2);
var blue=parseInt(RegExp.$3);
return [red,
green,
blue];
},
__hex3StringToRgb:function(){var red=parseInt(RegExp.$1,
16)*17;
var green=parseInt(RegExp.$2,
16)*17;
var blue=parseInt(RegExp.$3,
16)*17;
return [red,
green,
blue];
},
__hex6StringToRgb:function(){var red=(parseInt(RegExp.$1,
16)*16)+parseInt(RegExp.$2,
16);
var green=(parseInt(RegExp.$3,
16)*16)+parseInt(RegExp.$4,
16);
var blue=(parseInt(RegExp.$5,
16)*16)+parseInt(RegExp.$6,
16);
return [red,
green,
blue];
},
hex3StringToRgb:function(value){if(this.isHex3String(value)){return this.__hex3StringToRgb(value);
}throw new Error("Invalid hex3 value: "+value);
},
hex6StringToRgb:function(value){if(this.isHex6String(value)){return this.__hex6StringToRgb(value);
}throw new Error("Invalid hex6 value: "+value);
},
hexStringToRgb:function(value){if(this.isHex3String(value)){return this.__hex3StringToRgb(value);
}
if(this.isHex6String(value)){return this.__hex6StringToRgb(value);
}throw new Error("Invalid hex value: "+value);
},
rgbToHsb:function(rgb){var hue,
saturation,
brightness;
var red=rgb[0];
var green=rgb[1];
var blue=rgb[2];
var cmax=(red>green)?red:green;
if(blue>cmax){cmax=blue;
}var cmin=(red<green)?red:green;
if(blue<cmin){cmin=blue;
}brightness=cmax/255.0;
if(cmax!=0){saturation=(cmax-cmin)/cmax;
}else{saturation=0;
}
if(saturation==0){hue=0;
}else{var redc=(cmax-red)/(cmax-cmin);
var greenc=(cmax-green)/(cmax-cmin);
var bluec=(cmax-blue)/(cmax-cmin);
if(red==cmax){hue=bluec-greenc;
}else if(green==cmax){hue=2.0+redc-bluec;
}else{hue=4.0+greenc-redc;
}hue=hue/6.0;
if(hue<0){hue=hue+1.0;
}}return [Math.round(hue*360),
Math.round(saturation*100),
Math.round(brightness*100)];
},
hsbToRgb:function(hsb){var i,
f,
p,
q,
t;
var hue=hsb[0]/360;
var saturation=hsb[1]/100;
var brightness=hsb[2]/100;
if(hue>=1.0){hue%=1.0;
}
if(saturation>1.0){saturation=1.0;
}
if(brightness>1.0){brightness=1.0;
}var tov=Math.floor(255*brightness);
var rgb={};
if(saturation==0.0){rgb.red=rgb.green=rgb.blue=tov;
}else{hue*=6.0;
i=Math.floor(hue);
f=hue-i;
p=Math.floor(tov*(1.0-saturation));
q=Math.floor(tov*(1.0-(saturation*f)));
t=Math.floor(tov*(1.0-(saturation*(1.0-f))));
switch(i){case 0:rgb.red=tov;
rgb.green=t;
rgb.blue=p;
break;
case 1:rgb.red=q;
rgb.green=tov;
rgb.blue=p;
break;
case 2:rgb.red=p;
rgb.green=tov;
rgb.blue=t;
break;
case 3:rgb.red=p;
rgb.green=q;
rgb.blue=tov;
break;
case 4:rgb.red=t;
rgb.green=p;
rgb.blue=tov;
break;
case 5:rgb.red=tov;
rgb.green=p;
rgb.blue=q;
break;
}}return rgb;
},
randomColor:function(){var r=Math.round(Math.random()*255);
var g=Math.round(Math.random()*255);
var b=Math.round(Math.random()*255);
return this.rgbToRgbString([r,
g,
b]);
}}});




/* ID: qx.theme.manager.Border */
qx.Class.define("qx.theme.manager.Border",
{type:"singleton",
extend:qx.util.manager.Value,
properties:{borderTheme:{check:"Theme",
nullable:true,
apply:"_applyBorderTheme",
event:"changeBorderTheme"}},
members:{resolveDynamic:function(value){return value instanceof qx.ui.core.Border?value:this._dynamic[value];
},
isDynamic:function(value){return value&&(value instanceof qx.ui.core.Border||this._dynamic[value]!==undefined);
},
syncBorderTheme:function(){this._updateObjects();
},
updateObjectsEdge:function(border,
edge){var reg=this._registry;
var dynamics=this._dynamic;
var entry;
for(var key in reg){entry=reg[key];
if(entry.value===border||dynamics[entry.value]===border){entry.callback.call(entry.object,
border,
edge);
}}},
_applyBorderTheme:function(value){var dest=this._dynamic;
for(var key in dest){if(dest[key].themed){dest[key].dispose();
delete dest[key];
}}
if(value){var source=value.borders;
var border=qx.ui.core.Border;
for(var key in source){dest[key]=(new border).set(source[key]);
dest[key].themed=true;
}}
if(qx.theme.manager.Meta.getInstance().getAutoSync()){this.syncBorderTheme();
}}}});




/* ID: qx.ui.core.Border */
qx.Class.define("qx.ui.core.Border",
{extend:qx.core.Object,
construct:function(width,
style,
color){this.base(arguments);
if(width!==undefined){this.setWidth(width);
}
if(style!==undefined){this.setStyle(style);
}
if(color!==undefined){this.setColor(color);
}},
statics:{fromString:function(str){var border=new qx.ui.core.Border;
var parts=str.split(/\s+/);
var part,
temp;
for(var i=0,
l=parts.length;i<l;i++){part=parts[i];
switch(part){case "groove":case "ridge":case "inset":case "outset":case "solid":case "dotted":case "dashed":case "double":case "none":border.setStyle(part);
break;
default:temp=parseInt(part);
if(temp===part||qx.lang.String.contains(part,
"px")){border.setWidth(temp);
}else{border.setColor(part);
}break;
}}return border;
},
fromConfig:function(config){var border=new qx.ui.core.Border;
border.set(config);
return border;
},
resetTop:qx.core.Variant.select("qx.client",
{"gecko":function(widget){var style=widget._style;
if(style){style.borderTopWidth=style.borderTopStyle=style.borderTopColor=style.MozBorderTopColors="";
}},
"default":function(widget){var style=widget._style;
if(style){style.borderTopWidth=style.borderTopStyle=style.borderTopColor="";
}style=widget._innerStyle;
if(style){style.borderTopWidth=style.borderTopStyle=style.borderTopColor="";
}}}),
resetRight:qx.core.Variant.select("qx.client",
{"gecko":function(widget){var style=widget._style;
if(style){style.borderRightWidth=style.borderRightStyle=style.borderRightColor=style.MozBorderRightColors="";
}},
"default":function(widget){var style=widget._style;
if(style){style.borderRightWidth=style.borderRightStyle=style.borderRightColor="";
}style=widget._innerStyle;
if(style){style.borderRightWidth=style.borderRightStyle=style.borderRightColor="";
}}}),
resetBottom:qx.core.Variant.select("qx.client",
{"gecko":function(widget){var style=widget._style;
if(style){style.borderBottomWidth=style.borderBottomStyle=style.borderBottomColor=style.MozBorderBottomColors="";
}},
"default":function(widget){var style=widget._style;
if(style){style.borderBottomWidth=style.borderBottomStyle=style.borderBottomColor="";
}style=widget._innerStyle;
if(style){style.borderBottomWidth=style.borderBottomStyle=style.borderBottomColor="";
}}}),
resetLeft:qx.core.Variant.select("qx.client",
{"gecko":function(widget){var style=widget._style;
if(style){style.borderLeftWidth=style.borderLeftStyle=style.borderLeftColor=style.MozBorderLeftColors="";
}},
"default":function(widget){var style=widget._style;
if(style){style.borderLeftWidth=style.borderLeftStyle=style.borderLeftColor="";
}style=widget._innerStyle;
if(style){style.borderLeftWidth=style.borderLeftStyle=style.borderLeftColor="";
}}})},
properties:{widthTop:{check:"Number",
init:0,
apply:"_applyWidthTop"},
widthRight:{check:"Number",
init:0,
apply:"_applyWidthRight"},
widthBottom:{check:"Number",
init:0,
apply:"_applyWidthBottom"},
widthLeft:{check:"Number",
init:0,
apply:"_applyWidthLeft"},
styleTop:{nullable:true,
check:["solid",
"dotted",
"dashed",
"double",
"outset",
"inset",
"ridge",
"groove"],
init:"solid",
apply:"_applyStyleTop"},
styleRight:{nullable:true,
check:["solid",
"dotted",
"dashed",
"double",
"outset",
"inset",
"ridge",
"groove"],
init:"solid",
apply:"_applyStyleRight"},
styleBottom:{nullable:true,
check:["solid",
"dotted",
"dashed",
"double",
"outset",
"inset",
"ridge",
"groove"],
init:"solid",
apply:"_applyStyleBottom"},
styleLeft:{nullable:true,
check:["solid",
"dotted",
"dashed",
"double",
"outset",
"inset",
"ridge",
"groove"],
init:"solid",
apply:"_applyStyleLeft"},
colorTop:{nullable:true,
check:"Color",
apply:"_applyColorTop"},
colorRight:{nullable:true,
check:"Color",
apply:"_applyColorRight"},
colorBottom:{nullable:true,
check:"Color",
apply:"_applyColorBottom"},
colorLeft:{nullable:true,
check:"Color",
apply:"_applyColorLeft"},
colorInnerTop:{nullable:true,
check:"Color",
apply:"_applyColorInnerTop"},
colorInnerRight:{nullable:true,
check:"Color",
apply:"_applyColorInnerRight"},
colorInnerBottom:{nullable:true,
check:"Color",
apply:"_applyColorInnerBottom"},
colorInnerLeft:{nullable:true,
check:"Color",
apply:"_applyColorInnerLeft"},
left:{group:["widthLeft",
"styleLeft",
"colorLeft"]},
right:{group:["widthRight",
"styleRight",
"colorRight"]},
top:{group:["widthTop",
"styleTop",
"colorTop"]},
bottom:{group:["widthBottom",
"styleBottom",
"colorBottom"]},
width:{group:["widthTop",
"widthRight",
"widthBottom",
"widthLeft"],
mode:"shorthand"},
style:{group:["styleTop",
"styleRight",
"styleBottom",
"styleLeft"],
mode:"shorthand"},
color:{group:["colorTop",
"colorRight",
"colorBottom",
"colorLeft"],
mode:"shorthand"},
innerColor:{group:["colorInnerTop",
"colorInnerRight",
"colorInnerBottom",
"colorInnerLeft"],
mode:"shorthand"}},
members:{_applyWidthTop:function(value,
old){this.__widthTop=value==null?"0px":value+"px";
this.__computeComplexTop();
this.__informManager("top");
},
_applyWidthRight:function(value,
old){this.__widthRight=value==null?"0px":value+"px";
this.__computeComplexRight();
this.__informManager("right");
},
_applyWidthBottom:function(value,
old){this.__widthBottom=value==null?"0px":value+"px";
this.__computeComplexBottom();
this.__informManager("bottom");
},
_applyWidthLeft:function(value,
old){this.__widthLeft=value==null?"0px":value+"px";
this.__computeComplexLeft();
this.__informManager("left");
},
_applyColorTop:function(value,
old){qx.theme.manager.Color.getInstance().connect(this._changeColorTop,
this,
value);
},
_applyColorRight:function(value,
old){qx.theme.manager.Color.getInstance().connect(this._changeColorRight,
this,
value);
},
_applyColorBottom:function(value,
old){qx.theme.manager.Color.getInstance().connect(this._changeColorBottom,
this,
value);
},
_applyColorLeft:function(value,
old){qx.theme.manager.Color.getInstance().connect(this._changeColorLeft,
this,
value);
},
_applyColorInnerTop:function(value,
old){qx.theme.manager.Color.getInstance().connect(this._changeColorInnerTop,
this,
value);
},
_applyColorInnerRight:function(value,
old){qx.theme.manager.Color.getInstance().connect(this._changeColorInnerRight,
this,
value);
},
_applyColorInnerBottom:function(value,
old){qx.theme.manager.Color.getInstance().connect(this._changeColorInnerBottom,
this,
value);
},
_applyColorInnerLeft:function(value,
old){qx.theme.manager.Color.getInstance().connect(this._changeColorInnerLeft,
this,
value);
},
_applyStyleTop:function(){this.__informManager("top");
},
_applyStyleRight:function(){this.__informManager("right");
},
_applyStyleBottom:function(){this.__informManager("bottom");
},
_applyStyleLeft:function(){this.__informManager("left");
},
_changeColorTop:function(value){this.__colorTop=value;
this.__computeComplexTop();
this.__informManager("top");
},
_changeColorInnerTop:function(value){this.__colorInnerTop=value;
this.__computeComplexTop();
this.__informManager("top");
},
_changeColorRight:function(value){this.__colorRight=value;
this.__computeComplexRight();
this.__informManager("right");
},
_changeColorInnerRight:function(value){this.__colorInnerRight=value;
this.__computeComplexRight();
this.__informManager("right");
},
_changeColorBottom:function(value){this.__colorBottom=value;
this.__computeComplexBottom();
this.__informManager("bottom");
},
_changeColorInnerBottom:function(value){this.__colorInnerBottom=value;
this.__computeComplexBottom();
this.__informManager("bottom");
},
_changeColorLeft:function(value){this.__colorLeft=value;
this.__computeComplexLeft();
this.__informManager("left");
},
_changeColorInnerLeft:function(value){this.__colorInnerLeft=value;
this.__computeComplexLeft();
this.__informManager("left");
},
__computeComplexTop:function(){this.__complexTop=this.getWidthTop()===2&&this.__colorInnerTop!=null&&this.__colorTop!=this.__colorInnerTop;
},
__computeComplexRight:function(){this.__complexRight=this.getWidthRight()===2&&this.__colorInnerRight!=null&&this.__colorRight!=this.__colorInnerRight;
},
__computeComplexBottom:function(){this.__complexBottom=this.getWidthBottom()===2&&this.__colorInnerBottom!=null&&this.__colorBottom!=this.__colorInnerBottom;
},
__computeComplexLeft:function(){this.__complexLeft=this.getWidthLeft()===2&&this.__colorInnerLeft!=null&&this.__colorLeft!=this.__colorInnerLeft;
},
__informManager:function(edge){qx.theme.manager.Border.getInstance().updateObjectsEdge(this,
edge);
},
renderTop:qx.core.Variant.select("qx.client",
{"gecko":function(obj){var style=obj._style;
style.borderTopWidth=this.__widthTop||"0px";
style.borderTopColor=this.__colorTop||"";
if(this.__complexTop){style.borderTopStyle="solid";
style.MozBorderTopColors=this.__colorTop+" "+this.__colorInnerTop;
}else{style.borderTopStyle=this.getStyleTop()||"none";
style.MozBorderTopColors="";
}},
"default":function(obj){var outer=obj._style;
var inner=obj._innerStyle;
if(this.__complexTop){if(!inner){obj.prepareEnhancedBorder();
inner=obj._innerStyle;
}outer.borderTopWidth=inner.borderTopWidth="1px";
outer.borderTopStyle=inner.borderTopStyle="solid";
outer.borderTopColor=this.__colorTop;
inner.borderTopColor=this.__colorInnerTop;
}else{outer.borderTopWidth=this.__widthTop||"0px";
outer.borderTopStyle=this.getStyleTop()||"none";
outer.borderTopColor=this.__colorTop||"";
if(inner){inner.borderTopWidth=inner.borderTopStyle=inner.borderTopColor="";
}}}}),
renderRight:qx.core.Variant.select("qx.client",
{"gecko":function(obj){var style=obj._style;
style.borderRightWidth=this.__widthRight||"0px";
style.borderRightColor=this.__colorRight||"";
if(this.__complexRight){style.borderRightStyle="solid";
style.MozBorderRightColors=this.__colorRight+" "+this.__colorInnerRight;
}else{style.borderRightStyle=this.getStyleRight()||"none";
style.MozBorderRightColors="";
}},
"default":function(obj){var outer=obj._style;
var inner=obj._innerStyle;
if(this.__complexRight){if(!inner){obj.prepareEnhancedBorder();
inner=obj._innerStyle;
}outer.borderRightWidth=inner.borderRightWidth="1px";
outer.borderRightStyle=inner.borderRightStyle="solid";
outer.borderRightColor=this.__colorRight;
inner.borderRightColor=this.__colorInnerRight;
}else{outer.borderRightWidth=this.__widthRight||"0px";
outer.borderRightStyle=this.getStyleRight()||"none";
outer.borderRightColor=this.__colorRight||"";
if(inner){inner.borderRightWidth=inner.borderRightStyle=inner.borderRightColor="";
}}}}),
renderBottom:qx.core.Variant.select("qx.client",
{"gecko":function(obj){var style=obj._style;
style.borderBottomWidth=this.__widthBottom||"0px";
style.borderBottomColor=this.__colorBottom||"";
if(this.__complexBottom){style.borderBottomStyle="solid";
style.MozBorderBottomColors=this.__colorBottom+" "+this.__colorInnerBottom;
}else{style.borderBottomStyle=this.getStyleBottom()||"none";
style.MozBorderBottomColors="";
}},
"default":function(obj){var outer=obj._style;
var inner=obj._innerStyle;
if(this.__complexBottom){if(!inner){obj.prepareEnhancedBorder();
inner=obj._innerStyle;
}outer.borderBottomWidth=inner.borderBottomWidth="1px";
outer.borderBottomStyle=inner.borderBottomStyle="solid";
outer.borderBottomColor=this.__colorBottom;
inner.borderBottomColor=this.__colorInnerBottom;
}else{outer.borderBottomWidth=this.__widthBottom||"0px";
outer.borderBottomStyle=this.getStyleBottom()||"none";
outer.borderBottomColor=this.__colorBottom||"";
if(inner){inner.borderBottomWidth=inner.borderBottomStyle=inner.borderBottomColor="";
}}}}),
renderLeft:qx.core.Variant.select("qx.client",
{"gecko":function(obj){var style=obj._style;
style.borderLeftWidth=this.__widthLeft||"0px";
style.borderLeftColor=this.__colorLeft||"";
if(this.__complexLeft){style.borderLeftStyle="solid";
style.MozBorderLeftColors=this.__colorLeft+" "+this.__colorInnerLeft;
}else{style.borderLeftStyle=this.getStyleLeft()||"none";
style.MozBorderLeftColors="";
}},
"default":function(obj){var outer=obj._style;
var inner=obj._innerStyle;
if(this.__complexLeft){if(!inner){obj.prepareEnhancedBorder();
inner=obj._innerStyle;
}outer.borderLeftWidth=inner.borderLeftWidth="1px";
outer.borderLeftStyle=inner.borderLeftStyle="solid";
outer.borderLeftColor=this.__colorLeft;
inner.borderLeftColor=this.__colorInnerLeft;
}else{outer.borderLeftWidth=this.__widthLeft||"0px";
outer.borderLeftStyle=this.getStyleLeft()||"none";
outer.borderLeftColor=this.__colorLeft||"";
if(inner){inner.borderLeftWidth=inner.borderLeftStyle=inner.borderLeftColor="";
}}}})}});




/* ID: qx.theme.manager.Font */
qx.Class.define("qx.theme.manager.Font",
{type:"singleton",
extend:qx.util.manager.Value,
properties:{fontTheme:{check:"Theme",
nullable:true,
apply:"_applyFontTheme",
event:"changeFontTheme"}},
members:{resolveDynamic:function(value){return value instanceof qx.ui.core.Font?value:this._dynamic[value];
},
isDynamic:function(value){return value&&(value instanceof qx.ui.core.Font||this._dynamic[value]!==undefined);
},
syncFontTheme:function(){this._updateObjects();
},
_applyFontTheme:function(value){var dest=this._dynamic;
for(var key in dest){if(dest[key].themed){dest[key].dispose();
delete dest[key];
}}
if(value){var source=value.fonts;
var font=qx.ui.core.Font;
for(var key in source){dest[key]=(new font).set(source[key]);
dest[key].themed=true;
}}
if(qx.theme.manager.Meta.getInstance().getAutoSync()){this.syncFontTheme();
}}}});




/* ID: qx.ui.core.Font */
qx.Class.define("qx.ui.core.Font",
{extend:qx.core.Object,
construct:function(size,
family){this.base(arguments);
if(size!==undefined){this.setSize(size);
}
if(family!==undefined){this.setFamily(family);
}},
statics:{fromString:function(str){var font=new qx.ui.core.Font;
var parts=str.split(/\s+/);
var name=[];
var part;
for(var i=0;i<parts.length;i++){switch(part=parts[i]){case "bold":font.setBold(true);
break;
case "italic":font.setItalic(true);
break;
case "underline":font.setDecoration("underline");
break;
default:var temp=parseInt(part);
if(temp==part||qx.lang.String.contains(part,
"px")){font.setSize(temp);
}else{name.push(part);
}break;
}}
if(name.length>0){font.setFamily(name);
}return font;
},
fromConfig:function(config){var font=new qx.ui.core.Font;
font.set(config);
return font;
},
reset:function(widget){widget.removeStyleProperty("fontFamily");
widget.removeStyleProperty("fontSize");
widget.removeStyleProperty("fontWeight");
widget.removeStyleProperty("fontStyle");
widget.removeStyleProperty("textDecoration");
},
resetElement:function(element){var style=element.style;
style.fontFamily="";
style.fontSize="";
style.fontWeight="";
style.fontStyle="";
style.textDecoration="";
},
resetStyle:function(style){style.fontFamily="";
style.fontSize="";
style.fontWeight="";
style.fontStyle="";
style.textDecoration="";
}},
properties:{size:{check:"Integer",
nullable:true,
apply:"_applySize"},
family:{check:"Array",
nullable:true,
apply:"_applyFamily"},
bold:{check:"Boolean",
nullable:true,
apply:"_applyBold"},
italic:{check:"Boolean",
nullable:true,
apply:"_applyItalic"},
decoration:{check:["underline",
"line-through",
"overline"],
nullable:true,
apply:"_applyDecoration"}},
members:{__size:null,
__family:null,
__bold:null,
__italic:null,
__decoration:null,
_applySize:function(value,
old){this.__size=value===null?null:value+"px";
},
_applyFamily:function(value,
old){var family="";
for(var i=0,
l=value.length;i<l;i++){if(value[i].indexOf(" ")>0){family+='"'+value[i]+'"';
}else{family+=value[i];
}
if(i!=l-1){family+=",";
}}this.__family=family;
},
_applyBold:function(value,
old){this.__bold=value===null?null:value?"bold":"normal";
},
_applyItalic:function(value,
old){this.__italic=value===null?null:value?"italic":"normal";
},
_applyDecoration:function(value,
old){this.__decoration=value===null?null:value;
},
render:function(widget){widget.setStyleProperty("fontFamily",
this.__family);
widget.setStyleProperty("fontSize",
this.__size);
widget.setStyleProperty("fontWeight",
this.__bold);
widget.setStyleProperty("fontStyle",
this.__italic);
widget.setStyleProperty("textDecoration",
this.__decoration);
},
renderStyle:function(style){style.fontFamily=this.__family||"";
style.fontSize=this.__size||"";
style.fontWeight=this.__bold||"";
style.fontStyle=this.__italic||"";
style.textDecoration=this.__decoration||"";
},
renderElement:function(element){var style=element.style;
style.fontFamily=this.__family||"";
style.fontSize=this.__size||"";
style.fontWeight=this.__bold||"";
style.fontStyle=this.__italic||"";
style.textDecoration=this.__decoration||"";
},
generateStyle:function(){return (this.__family?"font-family:"+this.__family.replace(/\"/g,
"'")+";":"")+(this.__size?"font-size:"+this.__size+";":"")+(this.__weight?"font-weight:"+this.__weight+";":"")+(this.__style?"font-style:"+this.__style+";":"")+(this.__decoration?"text-decoration:"+this.__decoration+";":"");
}}});




/* ID: qx.theme.manager.Icon */
qx.Class.define("qx.theme.manager.Icon",
{type:"singleton",
extend:qx.core.Target,
properties:{iconTheme:{check:"Theme",
nullable:true,
apply:"_applyIconTheme",
event:"changeIconTheme"}},
members:{_applyIconTheme:function(value,
old){if(qx.theme.manager.Meta.getInstance().getAutoSync()){this.syncIconTheme();
}},
syncIconTheme:function(){var value=this.getIconTheme();
var alias=qx.io.Alias.getInstance();
value?alias.add("icon",
value.icons.uri):alias.remove("icon");
}}});




/* ID: qx.theme.manager.Widget */
qx.Class.define("qx.theme.manager.Widget",
{type:"singleton",
extend:qx.core.Target,
properties:{widgetTheme:{check:"Theme",
nullable:true,
apply:"_applyWidgetTheme",
event:"changeWidgetTheme"}},
members:{_applyWidgetTheme:function(value,
old){if(qx.theme.manager.Meta.getInstance().getAutoSync()){this.syncWidgetTheme();
}},
syncWidgetTheme:function(){var value=this.getWidgetTheme();
var alias=qx.io.Alias.getInstance();
value?alias.add("widget",
value.widgets.uri):alias.remove("widget");
}}});




/* ID: qx.event.handler.FocusHandler */
qx.Class.define("qx.event.handler.FocusHandler",
{extend:qx.core.Target,
construct:function(widget){this.base(arguments);
if(widget!=null){this._attachedWidget=widget;
}},
statics:{mouseFocus:false},
members:{getAttachedWidget:function(){return this._attachedWidget;
},
_onkeyevent:function(container,
ev){if(ev.getKeyIdentifier()!="Tab"){return;
}ev.stopPropagation();
ev.preventDefault();
qx.event.handler.FocusHandler.mouseFocus=false;
var vCurrent=this.getAttachedWidget().getFocusedChild();
if(!ev.isShiftPressed()){var vNext=vCurrent?this.getWidgetAfter(container,
vCurrent):this.getFirstWidget(container);
}else{var vNext=vCurrent?this.getWidgetBefore(container,
vCurrent):this.getLastWidget(container);
}if(vNext){vNext.setFocused(true);
vNext._ontabfocus();
}},
compareTabOrder:function(c1,
c2){if(c1==c2){return 0;
}var t1=c1.getTabIndex();
var t2=c2.getTabIndex();
if(t1!=t2){return t1-t2;
}var y1=qx.html.Location.getPageBoxTop(c1.getElement());
var y2=qx.html.Location.getPageBoxTop(c2.getElement());
if(y1!=y2){return y1-y2;
}var x1=qx.html.Location.getPageBoxLeft(c1.getElement());
var x2=qx.html.Location.getPageBoxLeft(c2.getElement());
if(x1!=x2){return x1-x2;
}var z1=c1.getZIndex();
var z2=c2.getZIndex();
if(z1!=z2){return z1-z2;
}return 0;
},
getFirstWidget:function(parentContainer){return this._getFirst(parentContainer,
null);
},
getLastWidget:function(parentContainer){return this._getLast(parentContainer,
null);
},
getWidgetAfter:function(parentContainer,
widget){if(parentContainer==widget){return this.getFirstWidget(parentContainer);
}
if(widget.getAnonymous()){widget=widget.getParent();
}
if(widget==null){return [];
}var vAll=[];
this._getAllAfter(parentContainer,
widget,
vAll);
vAll.sort(this.compareTabOrder);
return vAll.length>0?vAll[0]:this.getFirstWidget(parentContainer);
},
getWidgetBefore:function(parentContainer,
widget){if(parentContainer==widget){return this.getLastWidget(parentContainer);
}
if(widget.getAnonymous()){widget=widget.getParent();
}
if(widget==null){return [];
}var vAll=[];
this._getAllBefore(parentContainer,
widget,
vAll);
vAll.sort(this.compareTabOrder);
var len=vAll.length;
return len>0?vAll[len-1]:this.getLastWidget(parentContainer);
},
_getAllAfter:function(parent,
widget,
arr){var children=parent.getChildren();
var child;
var len=children.length;
for(var i=0;i<len;i++){child=children[i];
if(!(child instanceof qx.ui.core.Parent)&&!(child instanceof qx.ui.basic.Terminator)){continue;
}
if(child.isFocusable()&&child.getTabIndex()>0&&this.compareTabOrder(widget,
child)<0){arr.push(children[i]);
}
if(!child.isFocusRoot()&&child instanceof qx.ui.core.Parent){this._getAllAfter(child,
widget,
arr);
}}},
_getAllBefore:function(parent,
widget,
arr){var children=parent.getChildren();
var child;
var len=children.length;
for(var i=0;i<len;i++){child=children[i];
if(!(child instanceof qx.ui.core.Parent)&&!(child instanceof qx.ui.basic.Terminator)){continue;
}
if(child.isFocusable()&&child.getTabIndex()>0&&this.compareTabOrder(widget,
child)>0){arr.push(child);
}
if(!child.isFocusRoot()&&child instanceof qx.ui.core.Parent){this._getAllBefore(child,
widget,
arr);
}}},
_getFirst:function(parent,
firstWidget){var children=parent.getChildren();
var child;
var len=children.length;
for(var i=0;i<len;i++){child=children[i];
if(!(child instanceof qx.ui.core.Parent)&&!(child instanceof qx.ui.basic.Terminator)){continue;
}
if(child.isFocusable()&&child.getTabIndex()>0){if(firstWidget==null||this.compareTabOrder(child,
firstWidget)<0){firstWidget=child;
}}
if(!child.isFocusRoot()&&child instanceof qx.ui.core.Parent){firstWidget=this._getFirst(child,
firstWidget);
}}return firstWidget;
},
_getLast:function(parent,
lastWidget){var children=parent.getChildren();
var child;
var len=children.length;
for(var i=0;i<len;i++){child=children[i];
if(!(child instanceof qx.ui.core.Parent)&&!(child instanceof qx.ui.basic.Terminator)){continue;
}
if(child.isFocusable()&&child.getTabIndex()>0){if(lastWidget==null||this.compareTabOrder(child,
lastWidget)>0){lastWidget=child;
}}
if(!child.isFocusRoot()&&child instanceof qx.ui.core.Parent){lastWidget=this._getLast(child,
lastWidget);
}}return lastWidget;
}},
destruct:function(){this._disposeFields("_attachedWidget");
}});




/* ID: qx.html.Location */
qx.Class.define("qx.html.Location",
{statics:{getPageOuterLeft:function(el){return qx.html.Location.getPageBoxLeft(el)-qx.html.Style.getMarginLeft(el);
},
getPageOuterTop:function(el){return qx.html.Location.getPageBoxTop(el)-qx.html.Style.getMarginTop(el);
},
getPageOuterRight:function(el){return qx.html.Location.getPageBoxRight(el)+qx.html.Style.getMarginRight(el);
},
getPageOuterBottom:function(el){return qx.html.Location.getPageBoxBottom(el)+qx.html.Style.getMarginBottom(el);
},
getClientOuterLeft:function(el){return qx.html.Location.getClientBoxLeft(el)-qx.html.Style.getMarginLeft(el);
},
getClientOuterTop:function(el){return qx.html.Location.getClientBoxTop(el)-qx.html.Style.getMarginTop(el);
},
getClientOuterRight:function(el){return qx.html.Location.getClientBoxRight(el)+qx.html.Style.getMarginRight(el);
},
getClientOuterBottom:function(el){return qx.html.Location.getClientBoxBottom(el)+qx.html.Style.getMarginBottom(el);
},
getClientBoxLeft:qx.core.Variant.select("qx.client",
{"mshtml":function(el){return el.getBoundingClientRect().left;
},
"gecko":function(el){return qx.html.Location.getClientAreaLeft(el)-qx.html.Style.getBorderLeft(el);
},
"default":function(el){var sum=el.offsetLeft;
while(el.tagName.toLowerCase()!="body"){el=el.offsetParent;
sum+=el.offsetLeft-el.scrollLeft;
}return sum;
}}),
getClientBoxTop:qx.core.Variant.select("qx.client",
{"mshtml":function(el){return el.getBoundingClientRect().top;
},
"gecko":function(el){return qx.html.Location.getClientAreaTop(el)-qx.html.Style.getBorderTop(el);
},
"default":function(el){var sum=el.offsetTop;
while(el.tagName.toLowerCase()!="body"){el=el.offsetParent;
sum+=el.offsetTop-el.scrollTop;
}return sum;
}}),
getClientBoxRight:qx.core.Variant.select("qx.client",
{"mshtml":function(el){return el.getBoundingClientRect().right;
},
"default":function(el){return qx.html.Location.getClientBoxLeft(el)+qx.html.Dimension.getBoxWidth(el);
}}),
getClientBoxBottom:qx.core.Variant.select("qx.client",
{"mshtml":function(el){return el.getBoundingClientRect().bottom;
},
"default":function(el){return qx.html.Location.getClientBoxTop(el)+qx.html.Dimension.getBoxHeight(el);
}}),
getPageBoxLeft:qx.core.Variant.select("qx.client",
{"mshtml":function(el){return qx.html.Location.getClientBoxLeft(el)+qx.html.Scroll.getLeftSum(el);
},
"gecko":function(el){return qx.html.Location.getPageAreaLeft(el)-qx.html.Style.getBorderLeft(el);
},
"default":function(el){var sum=el.offsetLeft;
while(el.tagName.toLowerCase()!="body"){el=el.offsetParent;
sum+=el.offsetLeft;
}return sum;
}}),
getPageBoxTop:qx.core.Variant.select("qx.client",
{"mshtml":function(el){return qx.html.Location.getClientBoxTop(el)+qx.html.Scroll.getTopSum(el);
},
"gecko":function(el){return qx.html.Location.getPageAreaTop(el)-qx.html.Style.getBorderTop(el);
},
"default":function(el){var sum=el.offsetTop;
while(el.tagName.toLowerCase()!="body"){el=el.offsetParent;
sum+=el.offsetTop;
}return sum;
}}),
getPageBoxRight:qx.core.Variant.select("qx.client",
{"mshtml":function(el){return qx.html.Location.getClientBoxRight(el)+qx.html.Scroll.getLeftSum(el);
},
"default":function(el){return qx.html.Location.getPageBoxLeft(el)+qx.html.Dimension.getBoxWidth(el);
}}),
getPageBoxBottom:qx.core.Variant.select("qx.client",
{"mshtml":function(el){return qx.html.Location.getClientBoxBottom(el)+qx.html.Scroll.getTopSum(el);
},
"default":function(el){return qx.html.Location.getPageBoxTop(el)+qx.html.Dimension.getBoxHeight(el);
}}),
getClientAreaLeft:qx.core.Variant.select("qx.client",
{"gecko":function(el){return qx.html.Location.getPageAreaLeft(el)-qx.html.Scroll.getLeftSum(el);
},
"default":function(el){return qx.html.Location.getClientBoxLeft(el)+qx.html.Style.getBorderLeft(el);
}}),
getClientAreaTop:qx.core.Variant.select("qx.client",
{"gecko":function(el){return qx.html.Location.getPageAreaTop(el)-qx.html.Scroll.getTopSum(el);
},
"default":function(el){return qx.html.Location.getClientBoxTop(el)+qx.html.Style.getBorderTop(el);
}}),
getClientAreaRight:function(el){return qx.html.Location.getClientAreaLeft(el)+qx.html.Dimension.getAreaWidth(el);
},
getClientAreaBottom:function(el){return qx.html.Location.getClientAreaTop(el)+qx.html.Dimension.getAreaHeight(el);
},
getPageAreaLeft:qx.core.Variant.select("qx.client",
{"gecko":function(el){return el.ownerDocument.getBoxObjectFor(el).x;
},
"default":function(el){return qx.html.Location.getPageBoxLeft(el)+qx.html.Style.getBorderLeft(el);
}}),
getPageAreaTop:qx.core.Variant.select("qx.client",
{"gecko":function(el){return el.ownerDocument.getBoxObjectFor(el).y;
},
"default":function(el){return qx.html.Location.getPageBoxTop(el)+qx.html.Style.getBorderTop(el);
}}),
getPageAreaRight:function(el){return qx.html.Location.getPageAreaLeft(el)+qx.html.Dimension.getAreaWidth(el);
},
getPageAreaBottom:function(el){return qx.html.Location.getPageAreaTop(el)+qx.html.Dimension.getAreaHeight(el);
},
getClientInnerLeft:function(el){return qx.html.Location.getClientAreaLeft(el)+qx.html.Style.getPaddingLeft(el);
},
getClientInnerTop:function(el){return qx.html.Location.getClientAreaTop(el)+qx.html.Style.getPaddingTop(el);
},
getClientInnerRight:function(el){return qx.html.Location.getClientInnerLeft(el)+qx.html.Dimension.getInnerWidth(el);
},
getClientInnerBottom:function(el){return qx.html.Location.getClientInnerTop(el)+qx.html.Dimension.getInnerHeight(el);
},
getPageInnerLeft:function(el){return qx.html.Location.getPageAreaLeft(el)+qx.html.Style.getPaddingLeft(el);
},
getPageInnerTop:function(el){return qx.html.Location.getPageAreaTop(el)+qx.html.Style.getPaddingTop(el);
},
getPageInnerRight:function(el){return qx.html.Location.getPageInnerLeft(el)+qx.html.Dimension.getInnerWidth(el);
},
getPageInnerBottom:function(el){return qx.html.Location.getPageInnerTop(el)+qx.html.Dimension.getInnerHeight(el);
},
getScreenBoxLeft:qx.core.Variant.select("qx.client",
{"gecko":function(el){var sum=0;
var p=el.parentNode;
while(p.nodeType==1){sum+=p.scrollLeft;
p=p.parentNode;
}return el.ownerDocument.getBoxObjectFor(el).screenX-sum;
},
"default":function(el){return qx.html.Location.getScreenDocumentLeft(el)+qx.html.Location.getPageBoxLeft(el);
}}),
getScreenBoxTop:qx.core.Variant.select("qx.client",
{"gecko":function(el){var sum=0;
var p=el.parentNode;
while(p.nodeType==1){sum+=p.scrollTop;
p=p.parentNode;
}return el.ownerDocument.getBoxObjectFor(el).screenY-sum;
},
"default":function(el){return qx.html.Location.getScreenDocumentTop(el)+qx.html.Location.getPageBoxTop(el);
}}),
getScreenBoxRight:function(el){return qx.html.Location.getScreenBoxLeft(el)+qx.html.Dimension.getBoxWidth(el);
},
getScreenBoxBottom:function(el){return qx.html.Location.getScreenBoxTop(el)+qx.html.Dimension.getBoxHeight(el);
},
getScreenOuterLeft:function(el){return qx.html.Location.getScreenBoxLeft(el)-qx.html.Style.getMarginLeft(el);
},
getScreenOuterTop:function(el){return qx.html.Location.getScreenBoxTop(el)-qx.html.Style.getMarginTop(el);
},
getScreenOuterRight:function(el){return qx.html.Location.getScreenBoxRight(el)+qx.html.Style.getMarginRight(el);
},
getScreenOuterBottom:function(el){return qx.html.Location.getScreenBoxBottom(el)+qx.html.Style.getMarginBottom(el);
},
getScreenAreaLeft:function(el){return qx.html.Location.getScreenBoxLeft(el)+qx.html.Dimension.getInsetLeft(el);
},
getScreenAreaTop:function(el){return qx.html.Location.getScreenBoxTop(el)+qx.html.Dimension.getInsetTop(el);
},
getScreenAreaRight:function(el){return qx.html.Location.getScreenBoxRight(el)-qx.html.Dimension.getInsetRight(el);
},
getScreenAreaBottom:function(el){return qx.html.Location.getScreenBoxBottom(el)-qx.html.Dimension.getInsetBottom(el);
},
getScreenInnerLeft:function(el){return qx.html.Location.getScreenAreaLeft(el)+qx.html.Style.getPaddingLeft(el);
},
getScreenInnerTop:function(el){return qx.html.Location.getScreenAreaTop(el)+qx.html.Style.getPaddingTop(el);
},
getScreenInnerRight:function(el){return qx.html.Location.getScreenAreaRight(el)-qx.html.Style.getPaddingRight(el);
},
getScreenInnerBottom:function(el){return qx.html.Location.getScreenAreaBottom(el)-qx.html.Style.getPaddingBottom(el);
},
getScreenDocumentLeft:qx.core.Variant.select("qx.client",
{"gecko":function(el){return qx.html.Location.getScreenOuterLeft(el.ownerDocument.body);
},
"default":function(el){return el.document.parentWindow.screenLeft;
}}),
getScreenDocumentTop:qx.core.Variant.select("qx.client",
{"gecko":function(el){return qx.html.Location.getScreenOuterTop(el.ownerDocument.body);
},
"default":function(el){return el.document.parentWindow.screenTop;
}}),
getScreenDocumentRight:qx.core.Variant.select("qx.client",
{"gecko":function(el){return qx.html.Location.getScreenOuterRight(el.ownerDocument.body);
},
"default":function(el){}}),
getScreenDocumentBottom:qx.core.Variant.select("qx.client",
{"gecko":function(el){return qx.html.Location.getScreenOuterBottom(el.ownerDocument.body);
},
"default":function(el){}})}});




/* ID: qx.html.Scroll */
qx.Class.define("qx.html.Scroll",
{statics:{getLeftSum:function(el){var sum=0;
var p=el.parentNode;
while(p.nodeType==1){sum+=p.scrollLeft;
p=p.parentNode;
}return sum;
},
getTopSum:function(el){var sum=0;
var p=el.parentNode;
while(p.nodeType==1){sum+=p.scrollTop;
p=p.parentNode;
}return sum;
}}});




/* ID: qx.io.image.Manager */
qx.Class.define("qx.io.image.Manager",
{type:"singleton",
extend:qx.core.Target,
construct:function(){this.base(arguments);
this.__visible={};
this.__all={};
},
members:{add:function(source){var data=this.__all;
if(data[source]===undefined){data[source]=1;
}else{data[source]++;
}},
remove:function(source){var data=this.__all;
if(data[source]!==undefined){data[source]--;
}
if(data[source]<=0){delete data[source];
}},
show:function(source){var data=this.__visible;
if(data[source]===undefined){data[source]=1;
}else{data[source]++;
}},
hide:function(source){var data=this.__visible;
if(data[source]!==undefined){data[source]--;
}
if(data[source]<=0){delete data[source];
}},
getVisibleImages:function(){var visible=this.__visible;
var list={};
for(var source in visible){if(visible[source]>0){list[source]=true;
}}return list;
},
getHiddenImages:function(){var visible=this.__visible;
var all=this.__all;
var list={};
for(var source in all){if(visible[source]===undefined){list[source]=true;
}}return list;
}},
destruct:function(){this._disposeFields("__all",
"__visible");
}});




/* ID: qx.html.Offset */
qx.Class.define("qx.html.Offset",
{statics:{getLeft:qx.core.Variant.select("qx.client",
{"gecko":function(el){var val=el.offsetLeft;
var pa=el.parentNode;
var pose=qx.html.Style.getStyleProperty(el,
"position");
var posp=qx.html.Style.getStyleProperty(pa,
"position");
if(pose!="absolute"&&pose!="fixed"){val-=qx.html.Style.getBorderLeft(pa);
}if(posp!="absolute"&&posp!="fixed"){while(pa){pa=pa.parentNode;
if(!pa||typeof pa.tagName!=="string"){break;
}var posi=qx.html.Style.getStyleProperty(pa,
"position");
if(posi=="absolute"||posi=="fixed"){val-=qx.html.Style.getBorderLeft(pa)+qx.html.Style.getPaddingLeft(pa);
break;
}}}return val;
},
"default":function(el){return el.offsetLeft;
}}),
getTop:qx.core.Variant.select("qx.client",
{"gecko":function(el){var val=el.offsetTop;
var pa=el.parentNode;
var pose=qx.html.Style.getStyleProperty(el,
"position");
var posp=qx.html.Style.getStyleProperty(pa,
"position");
if(pose!="absolute"&&pose!="fixed"){val-=qx.html.Style.getBorderTop(pa);
}if(posp!="absolute"&&posp!="fixed"){while(pa){pa=pa.parentNode;
if(!pa||typeof pa.tagName!=="string"){break;
}var posi=qx.html.Style.getStyleProperty(pa,
"position");
if(posi=="absolute"||posi=="fixed"){val-=qx.html.Style.getBorderTop(pa)+qx.html.Style.getPaddingTop(pa);
break;
}}}return val;
},
"default":function(el){return el.offsetTop;
}})}});




/* ID: qx.html.ScrollIntoView */
qx.Class.define("qx.html.ScrollIntoView",
{statics:{scrollX:function(vElement,
vAlignLeft){var vParentWidth,
vParentScrollLeft,
vWidth,
vHasScroll;
var vParent=vElement.parentNode;
var vOffset=vElement.offsetLeft;
var vWidth=vElement.offsetWidth;
while(vParent){switch(qx.html.Style.getStyleProperty(vParent,
"overflow")){case "scroll":case "auto":case "-moz-scrollbars-horizontal":vHasScroll=true;
break;
default:switch(qx.html.Style.getStyleProperty(vParent,
"overflowX")){case "scroll":case "auto":vHasScroll=true;
break;
default:vHasScroll=false;
}}
if(vHasScroll){vParentWidth=vParent.clientWidth;
vParentScrollLeft=vParent.scrollLeft;
if(vAlignLeft){vParent.scrollLeft=vOffset;
}else if(vAlignLeft==false){vParent.scrollLeft=vOffset+vWidth-vParentWidth;
}else if(vWidth>vParentWidth||vOffset<vParentScrollLeft){vParent.scrollLeft=vOffset;
}else if((vOffset+vWidth)>(vParentScrollLeft+vParentWidth)){vParent.scrollLeft=vOffset+vWidth-vParentWidth;
}vOffset=vParent.offsetLeft;
vWidth=vParent.offsetWidth;
}else{vOffset+=vParent.offsetLeft;
}
if(vParent.tagName.toLowerCase()=="body"){break;
}vParent=vParent.offsetParent;
}return true;
},
scrollY:function(vElement,
vAlignTop){var vParentHeight,
vParentScrollTop,
vHeight,
vHasScroll;
var vParent=vElement.parentNode;
var vOffset=vElement.offsetTop;
var vHeight=vElement.offsetHeight;
while(vParent){switch(qx.html.Style.getStyleProperty(vParent,
"overflow")){case "scroll":case "auto":case "-moz-scrollbars-vertical":vHasScroll=true;
break;
default:switch(qx.html.Style.getStyleProperty(vParent,
"overflowY")){case "scroll":case "auto":vHasScroll=true;
break;
default:vHasScroll=false;
}}
if(vHasScroll){vParentHeight=vParent.clientHeight;
vParentScrollTop=vParent.scrollTop;
if(vAlignTop){vParent.scrollTop=vOffset;
}else if(vAlignTop==false){vParent.scrollTop=vOffset+vHeight-vParentHeight;
}else if(vHeight>vParentHeight||vOffset<vParentScrollTop){vParent.scrollTop=vOffset;
}else if((vOffset+vHeight)>(vParentScrollTop+vParentHeight)){vParent.scrollTop=vOffset+vHeight-vParentHeight;
}vOffset=vParent.offsetTop;
vHeight=vParent.offsetHeight;
}else{vOffset+=vParent.offsetTop;
}
if(vParent.tagName.toLowerCase()=="body"){break;
}vParent=vParent.offsetParent;
}return true;
}}});




/* ID: qx.io.image.PreloaderSystem */
qx.Class.define("qx.io.image.PreloaderSystem",
{extend:qx.core.Target,
construct:function(vPreloadList,
vCallBack,
vCallBackScope){this.base(arguments);
if(vPreloadList instanceof Array){this._list=qx.lang.Object.fromArray(vPreloadList);
}else{this._list=vPreloadList;
}this._timer=new qx.client.Timer(qx.core.Setting.get("qx.preloaderTimeout"));
this._timer.addEventListener("interval",
this.__oninterval,
this);
if(vCallBack){this.addEventListener("completed",
vCallBack,
vCallBackScope||null);
}},
events:{"completed":"qx.event.type.Event"},
members:{_stopped:false,
start:function(){if(qx.lang.Object.isEmpty(this._list)){this.createDispatchEvent("completed");
return;
}
for(var vSource in this._list){var vPreloader=qx.io.image.PreloaderManager.getInstance().create(qx.io.Alias.getInstance().resolve(vSource));
if(vPreloader.isErroneous()||vPreloader.isLoaded()){delete this._list[vSource];
}else{vPreloader._origSource=vSource;
vPreloader.addEventListener("load",
this.__onload,
this);
vPreloader.addEventListener("error",
this.__onerror,
this);
}}this._check();
},
__onload:function(e){if(this.getDisposed()){return;
}delete this._list[e.getTarget()._origSource];
this._check();
},
__onerror:function(e){if(this.getDisposed()){return;
}delete this._list[e.getTarget()._origSource];
this._check();
},
__oninterval:function(e){this.debug("Cannot preload: "+qx.lang.Object.getKeysAsString(this._list));
this._stopped=true;
this._timer.stop();
this.createDispatchEvent("completed");
},
_check:function(){if(this._stopped){return;
}if(qx.lang.Object.isEmpty(this._list)){this._timer.stop();
this.createDispatchEvent("completed");
}else{this._timer.restart();
}}},
settings:{"qx.preloaderTimeout":3000},
destruct:function(){if(this._timer){this._timer.removeEventListener("interval",
this.__oninterval,
this);
this._disposeObjects("_timer");
}this._disposeFields("_list");
}});




/* ID: qx.io.image.PreloaderManager */
qx.Class.define("qx.io.image.PreloaderManager",
{type:"singleton",
extend:qx.core.Object,
construct:function(){this.base(arguments);
this._objects={};
},
members:{add:function(vObject){this._objects[vObject.getUri()]=vObject;
},
remove:function(vObject){delete this._objects[vObject.getUri()];
},
has:function(vSource){return this._objects[vSource]!=null;
},
get:function(vSource){return this._objects[vSource];
},
create:function(vSource){if(this._objects[vSource]){return this._objects[vSource];
}return new qx.io.image.Preloader(vSource);
}},
destruct:function(){this._disposeFields("_objects");
}});




/* ID: qx.io.image.Preloader */
qx.Class.define("qx.io.image.Preloader",
{extend:qx.core.Target,
events:{"load":"qx.event.type.Event",
"error":"qx.event.type.Event"},
construct:function(imageUrl){if(qx.io.image.PreloaderManager.getInstance().has(imageUrl)){this.debug("Reuse qx.io.image.Preloader in old-style!");
this.debug("Please use qx.io.image.PreloaderManager.getInstance().create(source) instead!");
return qx.io.image.PreloaderManager.getInstance().get(imageUrl);
}this.base(arguments);
this._element=new Image;
this._element.onload=qx.lang.Function.bind(this.__onload,
this);
this._element.onerror=qx.lang.Function.bind(this.__onerror,
this);
this._source=imageUrl;
this._element.src=imageUrl;
if(qx.core.Variant.isSet("qx.client",
"mshtml")){this._isPng=/\.png$/i.test(this._element.nameProp);
}qx.io.image.PreloaderManager.getInstance().add(this);
},
members:{_source:null,
_isLoaded:false,
_isErroneous:false,
getUri:function(){return this._source;
},
getSource:function(){return this._source;
},
isLoaded:function(){return this._isLoaded;
},
isErroneous:function(){return this._isErroneous;
},
_isPng:false,
getIsPng:function(){return this._isPng;
},
getWidth:qx.core.Variant.select("qx.client",
{"gecko":function(){return this._element.naturalWidth;
},
"default":function(){return this._element.width;
}}),
getHeight:qx.core.Variant.select("qx.client",
{"gecko":function(){return this._element.naturalHeight;
},
"default":function(){return this._element.height;
}}),
__onload:function(){if(this._isLoaded||this._isErroneous){return;
}this._isLoaded=true;
this._isErroneous=false;
if(this.hasEventListeners("load")){this.dispatchEvent(new qx.event.type.Event("load"),
true);
}},
__onerror:function(){if(this._isLoaded||this._isErroneous){return;
}this.debug("Could not load: "+this._source);
this._isLoaded=false;
this._isErroneous=true;
if(this.hasEventListeners("error")){this.dispatchEvent(new qx.event.type.Event("error"),
true);
}}},
destruct:function(){if(this._element){this._element.onload=this._element.onerror=null;
}this._disposeFields("_element",
"_isLoaded",
"_isErroneous",
"_isPng");
}});




/* ID: vhf.Index */
qx.Class.define("vhf.Index",
{extend:qx.application.Gui,
members:{main:function(){this.base(arguments);
vhf.Main.getInstance().main();
},
close:function(){this.base(arguments);
},
terminate:function(){this.base(arguments);
}}});




/* ID: qx.ui.layout.BoxLayout */
qx.Class.define("qx.ui.layout.BoxLayout",
{extend:qx.ui.core.Parent,
construct:function(orientation){this.base(arguments);
if(orientation!=null){this.setOrientation(orientation);
}else{this.initOrientation();
}},
statics:{STR_REVERSED:"-reversed"},
properties:{orientation:{check:["horizontal",
"vertical"],
init:"horizontal",
apply:"_applyOrientation",
event:"changeOrientation"},
spacing:{check:"Integer",
init:0,
themeable:true,
apply:"_applySpacing",
event:"changeSpacing"},
horizontalChildrenAlign:{check:["left",
"center",
"right"],
init:"left",
themeable:true,
apply:"_applyHorizontalChildrenAlign"},
verticalChildrenAlign:{check:["top",
"middle",
"bottom"],
init:"top",
themeable:true,
apply:"_applyVerticalChildrenAlign"},
reverseChildrenOrder:{check:"Boolean",
init:false,
apply:"_applyReverseChildrenOrder"},
stretchChildrenOrthogonalAxis:{check:"Boolean",
init:true,
apply:"_applyStretchChildrenOrthogonalAxis"},
useAdvancedFlexAllocation:{check:"Boolean",
init:false,
apply:"_applyUseAdvancedFlexAllocation"},
accumulatedChildrenOuterWidth:{_cached:true,
defaultValue:null},
accumulatedChildrenOuterHeight:{_cached:true,
defaultValue:null}},
members:{_createLayoutImpl:function(){return this.getOrientation()=="vertical"?new qx.ui.layout.impl.VerticalBoxLayoutImpl(this):new qx.ui.layout.impl.HorizontalBoxLayoutImpl(this);
},
_layoutHorizontal:false,
_layoutVertical:false,
_layoutMode:"left",
isHorizontal:function(){return this._layoutHorizontal;
},
isVertical:function(){return this._layoutVertical;
},
getLayoutMode:function(){if(this._layoutMode==null){this._updateLayoutMode();
}return this._layoutMode;
},
_updateLayoutMode:function(){this._layoutMode=this._layoutVertical?this.getVerticalChildrenAlign():this.getHorizontalChildrenAlign();
if(this.getReverseChildrenOrder()){this._layoutMode+=qx.ui.layout.BoxLayout.STR_REVERSED;
}},
_invalidateLayoutMode:function(){this._layoutMode=null;
},
_applyOrientation:function(value,
old){this._layoutHorizontal=value=="horizontal";
this._layoutVertical=value=="vertical";
if(this._layoutImpl){this._layoutImpl.dispose();
this._layoutImpl=null;
}
if(value){this._layoutImpl=this._createLayoutImpl();
}this._doLayoutOrder(value,
old);
this.addToQueueRuntime("orientation");
},
_applySpacing:function(value,
old){this._doLayout();
this.addToQueueRuntime("spacing");
},
_applyHorizontalChildrenAlign:function(value,
old){this._doLayoutOrder();
this.addToQueueRuntime("horizontalChildrenAlign");
},
_applyVerticalChildrenAlign:function(value,
old){this._doLayoutOrder();
this.addToQueueRuntime("verticalChildrenAlign");
},
_applyReverseChildrenOrder:function(value,
old){this._doLayoutOrder();
this.addToQueueRuntime("reverseChildrenOrder");
},
_applyStretchChildrenOrthogonalAxis:function(value,
old){this.addToQueueRuntime("stretchChildrenOrthogonalAxis");
},
_applyUseAdvancedFlexAllocation:function(value,
old){this.addToQueueRuntime("useAdvancedFlexAllocation");
},
_doLayoutOrder:function(){this._invalidateLayoutMode();
this._doLayout();
},
_doLayout:function(){this._invalidatePreferredInnerDimensions();
this._invalidateAccumulatedChildrenOuterWidth();
this._invalidateAccumulatedChildrenOuterHeight();
},
_computeAccumulatedChildrenOuterWidth:function(){var ch=this.getVisibleChildren(),
chc,
i=-1,
sp=this.getSpacing(),
s=-sp;
while(chc=ch[++i]){s+=chc.getOuterWidth()+sp;
}return s;
},
_computeAccumulatedChildrenOuterHeight:function(){var ch=this.getVisibleChildren(),
chc,
i=-1,
sp=this.getSpacing(),
s=-sp;
while(chc=ch[++i]){s+=chc.getOuterHeight()+sp;
}return s;
},
_recomputeChildrenStretchingX:function(){var ch=this.getVisibleChildren(),
chc,
i=-1;
while(chc=ch[++i]){if(chc._recomputeStretchingX()&&chc._recomputeBoxWidth()){chc._recomputeOuterWidth();
}}},
_recomputeChildrenStretchingY:function(){var ch=this.getVisibleChildren(),
chc,
i=-1;
while(chc=ch[++i]){if(chc._recomputeStretchingY()&&chc._recomputeBoxHeight()){chc._recomputeOuterHeight();
}}}}});




/* ID: qx.ui.layout.impl.VerticalBoxLayoutImpl */
qx.Class.define("qx.ui.layout.impl.VerticalBoxLayoutImpl",
{extend:qx.ui.layout.impl.LayoutImpl,
properties:{enableFlexSupport:{check:"Boolean",
init:true}},
members:{computeChildBoxWidth:function(vChild){if(this.getWidget().getStretchChildrenOrthogonalAxis()&&vChild._computedWidthTypeNull&&vChild.getAllowStretchX()){return this.getWidget().getInnerWidth();
}return vChild.getWidthValue()||vChild._computeBoxWidthFallback();
},
computeChildBoxHeight:function(vChild){return vChild.getHeightValue()||vChild._computeBoxHeightFallback();
},
computeChildrenFlexHeight:function(){if(this._childrenFlexHeightComputed||!this.getEnableFlexSupport()){return;
}this._childrenFlexHeightComputed=true;
var vWidget=this.getWidget();
var vChildren=vWidget.getVisibleChildren();
var vChildrenLength=vChildren.length;
var vCurrentChild;
var vFlexibleChildren=[];
var vAvailHeight=vWidget.getInnerHeight();
var vUsedHeight=vWidget.getSpacing()*(vChildrenLength-1);
var vIterator;
for(vIterator=0;vIterator<vChildrenLength;vIterator++){vCurrentChild=vChildren[vIterator];
if(vCurrentChild._computedHeightTypeFlex){vFlexibleChildren.push(vCurrentChild);
if(vWidget._computedHeightTypeAuto){vUsedHeight+=vCurrentChild.getPreferredBoxHeight();
}}else{vUsedHeight+=vCurrentChild.getOuterHeight();
}}var vRemainingHeight=vAvailHeight-vUsedHeight;
var vFlexibleChildrenLength=vFlexibleChildren.length;
var vPrioritySum=0;
for(vIterator=0;vIterator<vFlexibleChildrenLength;vIterator++){vPrioritySum+=vFlexibleChildren[vIterator]._computedHeightParsed;
}var vPartHeight=vRemainingHeight/vPrioritySum;
if(!vWidget.getUseAdvancedFlexAllocation()){for(vIterator=0;vIterator<vFlexibleChildrenLength;vIterator++){vCurrentChild=vFlexibleChildren[vIterator];
vCurrentChild._computedHeightFlexValue=Math.round(vCurrentChild._computedHeightParsed*vPartHeight);
vUsedHeight+=vCurrentChild._computedHeightFlexValue;
}}else{var vAllocationDiff=0;
var vMinAllocationLoops,
vFlexibleChildrenLength,
vAdjust,
vCurrentAllocationSum,
vFactorSum,
vComputedFlexibleHeight;
for(vIterator=0;vIterator<vFlexibleChildrenLength;vIterator++){vCurrentChild=vFlexibleChildren[vIterator];
vComputedFlexibleHeight=vCurrentChild._computedHeightFlexValue=vCurrentChild._computedHeightParsed*vPartHeight;
vAllocationDiff+=vComputedFlexibleHeight-qx.lang.Number.limit(vComputedFlexibleHeight,
vCurrentChild.getMinHeightValue(),
vCurrentChild.getMaxHeightValue());
}vAllocationDiff=Math.round(vAllocationDiff);
if(vAllocationDiff==0){for(vIterator=0;vIterator<vFlexibleChildrenLength;vIterator++){vCurrentChild=vFlexibleChildren[vIterator];
vCurrentChild._computedHeightFlexValue=Math.round(vCurrentChild._computedHeightFlexValue);
vUsedHeight+=vCurrentChild._computedHeightFlexValue;
}}else{var vUp=vAllocationDiff>0;
for(vIterator=vFlexibleChildrenLength-1;vIterator>=0;vIterator--){vCurrentChild=vFlexibleChildren[vIterator];
if(vUp){vAdjust=(vCurrentChild.getMaxHeightValue()||Infinity)-vCurrentChild._computedHeightFlexValue;
if(vAdjust>0){vCurrentChild._allocationLoops=Math.floor(vAdjust/vCurrentChild._computedHeightParsed);
}else{qx.lang.Array.removeAt(vFlexibleChildren,
vIterator);
vCurrentChild._computedHeightFlexValue=Math.round(vCurrentChild._computedHeightFlexValue);
vUsedHeight+=Math.round(vCurrentChild._computedHeightFlexValue+vAdjust);
}}else{vAdjust=qx.util.Validation.isValidNumber(vCurrentChild.getMinHeightValue())?vCurrentChild._computedHeightFlexValue-vCurrentChild.getMinHeightValue():vCurrentChild._computedHeightFlexValue;
if(vAdjust>0){vCurrentChild._allocationLoops=Math.floor(vAdjust/vCurrentChild._computedHeightParsed);
}else{qx.lang.Array.removeAt(vFlexibleChildren,
vIterator);
vCurrentChild._computedHeightFlexValue=Math.round(vCurrentChild._computedHeightFlexValue);
vUsedHeight+=Math.round(vCurrentChild._computedHeightFlexValue-vAdjust);
}}}while(vAllocationDiff!=0&&vFlexibleChildrenLength>0){vFlexibleChildrenLength=vFlexibleChildren.length;
vMinAllocationLoops=Infinity;
vFactorSum=0;
for(vIterator=0;vIterator<vFlexibleChildrenLength;vIterator++){vMinAllocationLoops=Math.min(vMinAllocationLoops,
vFlexibleChildren[vIterator]._allocationLoops);
vFactorSum+=vFlexibleChildren[vIterator]._computedHeightParsed;
}vCurrentAllocationSum=Math.min(vFactorSum*vMinAllocationLoops,
vAllocationDiff);
vAllocationDiff-=vCurrentAllocationSum;
for(vIterator=vFlexibleChildrenLength-1;vIterator>=0;vIterator--){vCurrentChild=vFlexibleChildren[vIterator];
vCurrentChild._computedHeightFlexValue+=vCurrentAllocationSum/vFactorSum*vCurrentChild._computedHeightParsed;
if(vCurrentChild._allocationLoops==vMinAllocationLoops){vCurrentChild._computedHeightFlexValue=Math.round(vCurrentChild._computedHeightFlexValue);
vUsedHeight+=vCurrentChild._computedHeightFlexValue;
delete vCurrentChild._allocationLoops;
qx.lang.Array.removeAt(vFlexibleChildren,
vIterator);
}else{if(vAllocationDiff==0){vCurrentChild._computedHeightFlexValue=Math.round(vCurrentChild._computedHeightFlexValue);
vUsedHeight+=vCurrentChild._computedHeightFlexValue;
delete vCurrentChild._allocationLoops;
}else{vCurrentChild._allocationLoops-=vMinAllocationLoops;
}}}}}}vCurrentChild._computedHeightFlexValue+=vAvailHeight-vUsedHeight;
},
invalidateChildrenFlexHeight:function(){delete this._childrenFlexHeightComputed;
},
computeChildrenNeededHeight:function(){var w=this.getWidget();
return qx.ui.layout.impl.LayoutImpl.prototype.computeChildrenNeededHeight_sum.call(this)+((w.getVisibleChildrenLength()-1)*w.getSpacing());
},
updateSelfOnChildOuterHeightChange:function(vChild){this.getWidget()._invalidateAccumulatedChildrenOuterHeight();
},
updateChildOnInnerWidthChange:function(vChild){var vUpdatePercent=vChild._recomputePercentX();
var vUpdateStretch=vChild._recomputeStretchingX();
if((vChild.getHorizontalAlign()||this.getWidget().getHorizontalChildrenAlign())=="center"){vChild.addToLayoutChanges("locationX");
}return vUpdatePercent||vUpdateStretch;
},
updateChildOnInnerHeightChange:function(vChild){if(this.getWidget().getVerticalChildrenAlign()=="middle"){vChild.addToLayoutChanges("locationY");
}var vUpdatePercent=vChild._recomputePercentY();
var vUpdateFlex=vChild._recomputeFlexY();
return vUpdatePercent||vUpdateFlex;
},
updateSelfOnJobQueueFlush:function(vJobQueue){if(vJobQueue.addChild||vJobQueue.removeChild){this.getWidget()._invalidateAccumulatedChildrenOuterHeight();
}},
updateChildrenOnJobQueueFlush:function(vQueue){var vStretchX=false,
vStretchY=false;
var vWidget=this.getWidget();
if(vQueue.orientation){vStretchX=vStretchY=true;
}if(vQueue.spacing||vQueue.orientation||vQueue.reverseChildrenOrder||vQueue.verticalChildrenAlign){vWidget._addChildrenToLayoutQueue("locationY");
}
if(vQueue.horizontalChildrenAlign){vWidget._addChildrenToLayoutQueue("locationX");
}
if(vQueue.stretchChildrenOrthogonalAxis){vStretchX=true;
}if(vStretchX){vWidget._recomputeChildrenStretchingX();
vWidget._addChildrenToLayoutQueue("width");
}
if(vStretchY){vWidget._recomputeChildrenStretchingY();
vWidget._addChildrenToLayoutQueue("height");
}return true;
},
updateChildrenOnRemoveChild:function(vChild,
vIndex){var w=this.getWidget(),
ch=w.getVisibleChildren(),
chl=ch.length,
chc,
i=-1;
if(this.getEnableFlexSupport()){for(var i=0;i<chl;i++){chc=ch[i];
if(chc.getHasFlexY()){vIndex=Math.min(vIndex,
i);
break;
}}i=-1;
}switch(w.getLayoutMode()){case "bottom":case "top-reversed":while((chc=ch[++i])&&i<vIndex){chc.addToLayoutChanges("locationY");
}break;
case "middle":case "middle-reversed":while(chc=ch[++i]){chc.addToLayoutChanges("locationY");
}break;
default:i+=vIndex;
while(chc=ch[++i]){chc.addToLayoutChanges("locationY");
}}},
updateChildrenOnMoveChild:function(vChild,
vIndex,
vOldIndex){var vChildren=this.getWidget().getVisibleChildren();
var vStart=Math.min(vIndex,
vOldIndex);
var vStop=Math.max(vIndex,
vOldIndex)+1;
for(var i=vStart;i<vStop;i++){vChildren[i].addToLayoutChanges("locationY");
}},
flushChildrenQueue:function(vChildrenQueue){var w=this.getWidget(),
ch=w.getVisibleChildren(),
chl=ch.length,
chc,
i;
if(this.getEnableFlexSupport()){this.invalidateChildrenFlexHeight();
for(i=0;i<chl;i++){chc=ch[i];
if(chc.getHasFlexY()){chc._computedHeightValue=null;
if(chc._recomputeBoxHeight()){chc._recomputeOuterHeight();
chc._recomputeInnerHeight();
}vChildrenQueue[chc.toHashCode()]=chc;
chc._layoutChanges.height=true;
}}}
switch(w.getLayoutMode()){case "bottom":case "top-reversed":for(var i=chl-1;i>=0&&!vChildrenQueue[ch[i].toHashCode()];i--){}for(var j=0;j<=i;j++){w._layoutChild(chc=ch[j]);
}break;
case "middle":case "middle-reversed":i=-1;
while(chc=ch[++i]){w._layoutChild(chc);
}break;
default:i=-1;
var changed=false;
while(chc=ch[++i]){if(changed||vChildrenQueue[chc.toHashCode()]){w._layoutChild(chc);
changed=true;
}}}},
layoutChild:function(vChild,
vJobs){this.layoutChild_sizeX(vChild,
vJobs);
this.layoutChild_sizeY(vChild,
vJobs);
this.layoutChild_sizeLimitX(vChild,
vJobs);
this.layoutChild_sizeLimitY(vChild,
vJobs);
this.layoutChild_locationX(vChild,
vJobs);
this.layoutChild_locationY(vChild,
vJobs);
this.layoutChild_marginX(vChild,
vJobs);
this.layoutChild_marginY(vChild,
vJobs);
},
layoutChild_sizeX:qx.core.Variant.select("qx.client",
{"mshtml|opera|webkit":function(vChild,
vJobs){if(vJobs.initial||vJobs.width||vJobs.minWidth||vJobs.maxWidth){if((vChild._isWidthEssential()&&(!vChild._computedWidthTypeNull||!vChild._computedMinWidthTypeNull||!vChild._computedMaxWidthTypeNull))||(vChild.getAllowStretchX()&&this.getWidget().getStretchChildrenOrthogonalAxis())){vChild._renderRuntimeWidth(vChild.getBoxWidth());
}else{vChild._resetRuntimeWidth();
}}},
"default":function(vChild,
vJobs){if(vJobs.initial||vJobs.width){if(vChild._isWidthEssential()&&!vChild._computedWidthTypeNull){vChild._renderRuntimeWidth(vChild.getWidthValue());
}else{vChild._resetRuntimeWidth();
}}}}),
layoutChild_sizeY:qx.core.Variant.select("qx.client",
{"mshtml|opera|webkit":function(vChild,
vJobs){if(vJobs.initial||vJobs.height||vJobs.minHeight||vJobs.maxHeight){if(vChild._isHeightEssential()&&(!vChild._computedHeightTypeNull||!vChild._computedMinHeightTypeNull||!vChild._computedMaxHeightTypeNull)){vChild._renderRuntimeHeight(vChild.getBoxHeight());
}else{vChild._resetRuntimeHeight();
}}},
"default":function(vChild,
vJobs){if(vJobs.initial||vJobs.height){if(vChild._isHeightEssential()&&!vChild._computedHeightTypeNull){vChild._renderRuntimeHeight(vChild.getHeightValue());
}else{vChild._resetRuntimeHeight();
}}}}),
layoutChild_locationY:function(vChild,
vJobs){var vWidget=this.getWidget();
if(vWidget.getFirstVisibleChild()==vChild){switch(vWidget.getLayoutMode()){case "bottom":case "top-reversed":var vPos=vWidget.getPaddingBottom()+vWidget.getAccumulatedChildrenOuterHeight()-vChild.getOuterHeight();
break;
case "middle":case "middle-reversed":var vPos=vWidget.getPaddingTop()+Math.round((vWidget.getInnerHeight()-vWidget.getAccumulatedChildrenOuterHeight())/2);
break;
default:var vPos=vWidget.getPaddingTop();
}}else{var vPrev=vChild.getPreviousVisibleSibling();
switch(vWidget.getLayoutMode()){case "bottom":case "top-reversed":var vPos=vPrev._cachedLocationVertical-vChild.getOuterHeight()-vWidget.getSpacing();
break;
default:var vPos=vPrev._cachedLocationVertical+vPrev.getOuterHeight()+vWidget.getSpacing();
}}vChild._cachedLocationVertical=vPos;
switch(this.getWidget().getLayoutMode()){case "bottom":case "bottom-reversed":case "middle-reversed":vPos+=!vChild._computedBottomTypeNull?vChild.getBottomValue():!vChild._computedTopTypeNull?-(vChild.getTopValue()):0;
vChild._resetRuntimeTop();
vChild._renderRuntimeBottom(vPos);
break;
default:vPos+=!vChild._computedTopTypeNull?vChild.getTopValue():!vChild._computedBottomTypeNull?-(vChild.getBottomValue()):0;
vChild._resetRuntimeBottom();
vChild._renderRuntimeTop(vPos);
}},
layoutChild_locationX:function(vChild,
vJobs){var vWidget=this.getWidget();
if(qx.core.Variant.isSet("qx.client",
"gecko")){if(vChild.getAllowStretchX()&&vWidget.getStretchChildrenOrthogonalAxis()&&vChild._computedWidthTypeNull){vChild._renderRuntimeLeft(vWidget.getPaddingLeft()||0);
vChild._renderRuntimeRight(vWidget.getPaddingRight()||0);
return;
}}var vAlign=vChild.getHorizontalAlign()||vWidget.getHorizontalChildrenAlign();
var vPos=vAlign=="center"?Math.round((vWidget.getInnerWidth()-vChild.getOuterWidth())/2):0;
if(vAlign=="right"){vPos+=vWidget.getPaddingRight();
if(!vChild._computedRightTypeNull){vPos+=vChild.getRightValue();
}else if(!vChild._computedLeftTypeNull){vPos-=vChild.getLeftValue();
}vChild._resetRuntimeLeft();
vChild._renderRuntimeRight(vPos);
}else{vPos+=vWidget.getPaddingLeft();
if(!vChild._computedLeftTypeNull){vPos+=vChild.getLeftValue();
}else if(!vChild._computedRightTypeNull){vPos-=vChild.getRightValue();
}vChild._resetRuntimeRight();
vChild._renderRuntimeLeft(vPos);
}}}});




/* ID: qx.util.Validation */
qx.Class.define("qx.util.Validation",
{statics:{isValid:function(v){switch(typeof v){case "undefined":return false;
case "object":return v!==null;
case "string":return v!=="";
case "number":return !isNaN(v);
case "function":case "boolean":return true;
}return false;
},
isInvalid:function(v){switch(typeof v){case "undefined":return true;
case "object":return v===null;
case "string":return v==="";
case "number":return isNaN(v);
case "function":case "boolean":return false;
}return true;
},
isValidNumber:function(v){return typeof v==="number"&&!isNaN(v);
},
isInvalidNumber:function(v){return typeof v!=="number"||isNaN(v);
},
isValidString:function(v){return typeof v==="string"&&v!=="";
},
isInvalidString:function(v){return typeof v!=="string"||v==="";
},
isValidArray:function(v){return typeof v==="object"&&v!==null&&v instanceof Array;
},
isInvalidArray:function(v){return typeof v!=="object"||v===null||!(v instanceof Array);
},
isValidObject:function(v){return typeof v==="object"&&v!==null&&!(v instanceof Array);
},
isInvalidObject:function(v){return typeof v!=="object"||v===null||v instanceof Array;
},
isValidNode:function(v){return typeof v==="object"&&v!==null;
},
isInvalidNode:function(v){return typeof v!=="object"||v===null;
},
isValidElement:function(v){return typeof v==="object"&&v!==null||v.nodeType!==1;
},
isInvalidElement:function(v){return typeof v!=="object"||v===null||v.nodeType!==1;
},
isValidFunction:function(v){return typeof v==="function";
},
isInvalidFunction:function(v){return typeof v!=="function";
},
isValidBoolean:function(v){return typeof v==="boolean";
},
isInvalidBoolean:function(v){return typeof v!=="boolean";
},
isValidStringOrNumber:function(v){switch(typeof v){case "string":return v!=="";
case "number":return !isNaN(v);
}return false;
},
isInvalidStringOrNumber:function(v){switch(typeof v){case "string":return v==="";
case "number":return isNaN(v);
}return false;
}}});




/* ID: qx.ui.layout.impl.HorizontalBoxLayoutImpl */
qx.Class.define("qx.ui.layout.impl.HorizontalBoxLayoutImpl",
{extend:qx.ui.layout.impl.LayoutImpl,
properties:{enableFlexSupport:{check:"Boolean",
init:true}},
members:{computeChildBoxWidth:function(vChild){return vChild.getWidthValue()||vChild._computeBoxWidthFallback();
},
computeChildBoxHeight:function(vChild){if(this.getWidget().getStretchChildrenOrthogonalAxis()&&vChild._computedHeightTypeNull&&vChild.getAllowStretchY()){return this.getWidget().getInnerHeight();
}return vChild.getHeightValue()||vChild._computeBoxHeightFallback();
},
computeChildrenFlexWidth:function(){if(this._childrenFlexWidthComputed||!this.getEnableFlexSupport()){return;
}this._childrenFlexWidthComputed=true;
var vWidget=this.getWidget();
var vChildren=vWidget.getVisibleChildren();
var vChildrenLength=vChildren.length;
var vCurrentChild;
var vFlexibleChildren=[];
var vAvailWidth=vWidget.getInnerWidth();
var vUsedWidth=vWidget.getSpacing()*(vChildrenLength-1);
var vIterator;
for(vIterator=0;vIterator<vChildrenLength;vIterator++){vCurrentChild=vChildren[vIterator];
if(vCurrentChild._computedWidthTypeFlex){vFlexibleChildren.push(vCurrentChild);
if(vWidget._computedWidthTypeAuto){vUsedWidth+=vCurrentChild.getPreferredBoxWidth();
}}else{vUsedWidth+=vCurrentChild.getOuterWidth();
}}var vRemainingWidth=vAvailWidth-vUsedWidth;
var vFlexibleChildrenLength=vFlexibleChildren.length;
var vPrioritySum=0;
for(vIterator=0;vIterator<vFlexibleChildrenLength;vIterator++){vPrioritySum+=vFlexibleChildren[vIterator]._computedWidthParsed;
}var vPartWidth=vRemainingWidth/vPrioritySum;
if(!vWidget.getUseAdvancedFlexAllocation()){for(vIterator=0;vIterator<vFlexibleChildrenLength;vIterator++){vCurrentChild=vFlexibleChildren[vIterator];
vCurrentChild._computedWidthFlexValue=Math.round(vCurrentChild._computedWidthParsed*vPartWidth);
vUsedWidth+=vCurrentChild._computedWidthFlexValue;
}}else{var vAllocationDiff=0;
var vMinAllocationLoops,
vFlexibleChildrenLength,
vAdjust,
vCurrentAllocationSum,
vFactorSum,
vComputedFlexibleWidth;
for(vIterator=0;vIterator<vFlexibleChildrenLength;vIterator++){vCurrentChild=vFlexibleChildren[vIterator];
vComputedFlexibleWidth=vCurrentChild._computedWidthFlexValue=vCurrentChild._computedWidthParsed*vPartWidth;
vAllocationDiff+=vComputedFlexibleWidth-qx.lang.Number.limit(vComputedFlexibleWidth,
vCurrentChild.getMinWidthValue(),
vCurrentChild.getMaxWidthValue());
}vAllocationDiff=Math.round(vAllocationDiff);
if(vAllocationDiff==0){for(vIterator=0;vIterator<vFlexibleChildrenLength;vIterator++){vCurrentChild=vFlexibleChildren[vIterator];
vCurrentChild._computedWidthFlexValue=Math.round(vCurrentChild._computedWidthFlexValue);
vUsedWidth+=vCurrentChild._computedWidthFlexValue;
}}else{var vUp=vAllocationDiff>0;
for(vIterator=vFlexibleChildrenLength-1;vIterator>=0;vIterator--){vCurrentChild=vFlexibleChildren[vIterator];
if(vUp){vAdjust=(vCurrentChild.getMaxWidthValue()||Infinity)-vCurrentChild._computedWidthFlexValue;
if(vAdjust>0){vCurrentChild._allocationLoops=Math.floor(vAdjust/vCurrentChild._computedWidthParsed);
}else{qx.lang.Array.removeAt(vFlexibleChildren,
vIterator);
vCurrentChild._computedWidthFlexValue=Math.round(vCurrentChild._computedWidthFlexValue);
vUsedWidth+=Math.round(vCurrentChild._computedWidthFlexValue+vAdjust);
}}else{vAdjust=qx.util.Validation.isValidNumber(vCurrentChild.getMinWidthValue())?vCurrentChild._computedWidthFlexValue-vCurrentChild.getMinWidthValue():vCurrentChild._computedWidthFlexValue;
if(vAdjust>0){vCurrentChild._allocationLoops=Math.floor(vAdjust/vCurrentChild._computedWidthParsed);
}else{qx.lang.Array.removeAt(vFlexibleChildren,
vIterator);
vCurrentChild._computedWidthFlexValue=Math.round(vCurrentChild._computedWidthFlexValue);
vUsedWidth+=Math.round(vCurrentChild._computedWidthFlexValue-vAdjust);
}}}while(vAllocationDiff!=0&&vFlexibleChildrenLength>0){vFlexibleChildrenLength=vFlexibleChildren.length;
vMinAllocationLoops=Infinity;
vFactorSum=0;
for(vIterator=0;vIterator<vFlexibleChildrenLength;vIterator++){vMinAllocationLoops=Math.min(vMinAllocationLoops,
vFlexibleChildren[vIterator]._allocationLoops);
vFactorSum+=vFlexibleChildren[vIterator]._computedWidthParsed;
}vCurrentAllocationSum=Math.min(vFactorSum*vMinAllocationLoops,
vAllocationDiff);
vAllocationDiff-=vCurrentAllocationSum;
for(vIterator=vFlexibleChildrenLength-1;vIterator>=0;vIterator--){vCurrentChild=vFlexibleChildren[vIterator];
vCurrentChild._computedWidthFlexValue+=vCurrentAllocationSum/vFactorSum*vCurrentChild._computedWidthParsed;
if(vCurrentChild._allocationLoops==vMinAllocationLoops){vCurrentChild._computedWidthFlexValue=Math.round(vCurrentChild._computedWidthFlexValue);
vUsedWidth+=vCurrentChild._computedWidthFlexValue;
delete vCurrentChild._allocationLoops;
qx.lang.Array.removeAt(vFlexibleChildren,
vIterator);
}else{if(vAllocationDiff==0){vCurrentChild._computedWidthFlexValue=Math.round(vCurrentChild._computedWidthFlexValue);
vUsedWidth+=vCurrentChild._computedWidthFlexValue;
delete vCurrentChild._allocationLoops;
}else{vCurrentChild._allocationLoops-=vMinAllocationLoops;
}}}}}}vCurrentChild._computedWidthFlexValue+=vAvailWidth-vUsedWidth;
},
invalidateChildrenFlexWidth:function(){delete this._childrenFlexWidthComputed;
},
computeChildrenNeededWidth:function(){var w=this.getWidget();
return qx.ui.layout.impl.LayoutImpl.prototype.computeChildrenNeededWidth_sum.call(this)+((w.getVisibleChildrenLength()-1)*w.getSpacing());
},
updateSelfOnChildOuterWidthChange:function(vChild){this.getWidget()._invalidateAccumulatedChildrenOuterWidth();
},
updateChildOnInnerWidthChange:function(vChild){if(this.getWidget().getHorizontalChildrenAlign()=="center"){vChild.addToLayoutChanges("locationX");
}var vUpdatePercent=vChild._recomputePercentX();
var vUpdateFlex=vChild._recomputeFlexX();
return vUpdatePercent||vUpdateFlex;
},
updateChildOnInnerHeightChange:function(vChild){var vUpdatePercent=vChild._recomputePercentY();
var vUpdateStretch=vChild._recomputeStretchingY();
if((vChild.getVerticalAlign()||this.getWidget().getVerticalChildrenAlign())=="middle"){vChild.addToLayoutChanges("locationY");
}return vUpdatePercent||vUpdateStretch;
},
updateSelfOnJobQueueFlush:function(vJobQueue){if(vJobQueue.addChild||vJobQueue.removeChild){this.getWidget()._invalidateAccumulatedChildrenOuterWidth();
}},
updateChildrenOnJobQueueFlush:function(vQueue){var vStretchX=false,
vStretchY=false;
var vWidget=this.getWidget();
if(vQueue.orientation){vStretchX=vStretchY=true;
}if(vQueue.spacing||vQueue.orientation||vQueue.reverseChildrenOrder||vQueue.horizontalChildrenAlign){vWidget._addChildrenToLayoutQueue("locationX");
}
if(vQueue.verticalChildrenAlign){vWidget._addChildrenToLayoutQueue("locationY");
}
if(vQueue.stretchChildrenOrthogonalAxis){vStretchY=true;
}if(vStretchX){vWidget._recomputeChildrenStretchingX();
vWidget._addChildrenToLayoutQueue("width");
}
if(vStretchY){vWidget._recomputeChildrenStretchingY();
vWidget._addChildrenToLayoutQueue("height");
}return true;
},
updateChildrenOnRemoveChild:function(vChild,
vIndex){var w=this.getWidget(),
ch=w.getVisibleChildren(),
chl=ch.length,
chc,
i=-1;
if(this.getEnableFlexSupport()){for(i=0;i<chl;i++){chc=ch[i];
if(chc.getHasFlexX()){vIndex=Math.min(vIndex,
i);
break;
}}i=-1;
}switch(w.getLayoutMode()){case "right":case "left-reversed":while((chc=ch[++i])&&i<vIndex){chc.addToLayoutChanges("locationX");
}break;
case "center":case "center-reversed":while(chc=ch[++i]){chc.addToLayoutChanges("locationX");
}break;
default:i+=vIndex;
while(chc=ch[++i]){chc.addToLayoutChanges("locationX");
}}},
updateChildrenOnMoveChild:function(vChild,
vIndex,
vOldIndex){var vChildren=this.getWidget().getVisibleChildren();
var vStart=Math.min(vIndex,
vOldIndex);
var vStop=Math.max(vIndex,
vOldIndex)+1;
for(var i=vStart;i<vStop;i++){vChildren[i].addToLayoutChanges("locationX");
}},
flushChildrenQueue:function(vChildrenQueue){var w=this.getWidget(),
ch=w.getVisibleChildren(),
chl=ch.length,
chc,
i;
if(this.getEnableFlexSupport()){this.invalidateChildrenFlexWidth();
for(i=0;i<chl;i++){chc=ch[i];
if(chc.getHasFlexX()){chc._computedWidthValue=null;
if(chc._recomputeBoxWidth()){chc._recomputeOuterWidth();
chc._recomputeInnerWidth();
}vChildrenQueue[chc.toHashCode()]=chc;
chc._layoutChanges.width=true;
}}}
switch(w.getLayoutMode()){case "right":case "left-reversed":for(var i=chl-1;i>=0&&!vChildrenQueue[ch[i].toHashCode()];i--){}for(var j=0;j<=i;j++){w._layoutChild(chc=ch[j]);
}break;
case "center":case "center-reversed":i=-1;
while(chc=ch[++i]){w._layoutChild(chc);
}break;
default:i=-1;
var changed=false;
while(chc=ch[++i]){if(changed||vChildrenQueue[chc.toHashCode()]){w._layoutChild(chc);
changed=true;
}}}},
layoutChild:function(vChild,
vJobs){this.layoutChild_sizeX(vChild,
vJobs);
this.layoutChild_sizeY(vChild,
vJobs);
this.layoutChild_sizeLimitX(vChild,
vJobs);
this.layoutChild_sizeLimitY(vChild,
vJobs);
this.layoutChild_locationX(vChild,
vJobs);
this.layoutChild_locationY(vChild,
vJobs);
this.layoutChild_marginX(vChild,
vJobs);
this.layoutChild_marginY(vChild,
vJobs);
},
layoutChild_sizeX:qx.core.Variant.select("qx.client",
{"mshtml|opera|webkit":function(vChild,
vJobs){if(vJobs.initial||vJobs.width||vJobs.minWidth||vJobs.maxWidth){if(vChild._isWidthEssential()&&(!vChild._computedWidthTypeNull||!vChild._computedMinWidthTypeNull||!vChild._computedMaxWidthTypeNull)){vChild._renderRuntimeWidth(vChild.getBoxWidth());
}else{vChild._resetRuntimeWidth();
}}},
"default":function(vChild,
vJobs){if(vJobs.initial||vJobs.width){if(vChild._isWidthEssential()&&!vChild._computedWidthTypeNull){vChild._renderRuntimeWidth(vChild.getWidthValue());
}else{vChild._resetRuntimeWidth();
}}}}),
layoutChild_sizeY:qx.core.Variant.select("qx.client",
{"mshtml|opera|webkit":function(vChild,
vJobs){if(vJobs.initial||vJobs.height||vJobs.minHeight||vJobs.maxHeight){if((vChild._isHeightEssential()&&(!vChild._computedHeightTypeNull||!vChild._computedMinHeightTypeNull||!vChild._computedMaxHeightTypeNull))||(vChild.getAllowStretchY()&&this.getWidget().getStretchChildrenOrthogonalAxis())){vChild._renderRuntimeHeight(vChild.getBoxHeight());
}else{vChild._resetRuntimeHeight();
}}},
"default":function(vChild,
vJobs){if(vJobs.initial||vJobs.height){if(vChild._isHeightEssential()&&!vChild._computedHeightTypeNull){vChild._renderRuntimeHeight(vChild.getHeightValue());
}else{vChild._resetRuntimeHeight();
}}}}),
layoutChild_locationX:function(vChild,
vJobs){var vWidget=this.getWidget();
if(vWidget.getFirstVisibleChild()==vChild){switch(vWidget.getLayoutMode()){case "right":case "left-reversed":var vPos=vWidget.getPaddingRight()+vWidget.getAccumulatedChildrenOuterWidth()-vChild.getOuterWidth();
break;
case "center":case "center-reversed":var vPos=vWidget.getPaddingLeft()+Math.round((vWidget.getInnerWidth()-vWidget.getAccumulatedChildrenOuterWidth())/2);
break;
default:var vPos=vWidget.getPaddingLeft();
}}else{var vPrev=vChild.getPreviousVisibleSibling();
switch(vWidget.getLayoutMode()){case "right":case "left-reversed":var vPos=vPrev._cachedLocationHorizontal-vChild.getOuterWidth()-vWidget.getSpacing();
break;
default:var vPos=vPrev._cachedLocationHorizontal+vPrev.getOuterWidth()+vWidget.getSpacing();
}}vChild._cachedLocationHorizontal=vPos;
switch(vWidget.getLayoutMode()){case "right":case "right-reversed":case "center-reversed":vPos+=!vChild._computedRightTypeNull?vChild.getRightValue():!vChild._computedLeftTypeNull?-(vChild.getLeftValue()):0;
vChild._resetRuntimeLeft();
vChild._renderRuntimeRight(vPos);
break;
default:vPos+=!vChild._computedLeftTypeNull?vChild.getLeftValue():!vChild._computedRightTypeNull?-(vChild.getRightValue()):0;
vChild._resetRuntimeRight();
vChild._renderRuntimeLeft(vPos);
}},
layoutChild_locationY:function(vChild,
vJobs){var vWidget=this.getWidget();
if(qx.core.Variant.isSet("qx.client",
"gecko")){if(vChild.getAllowStretchY()&&vWidget.getStretchChildrenOrthogonalAxis()&&vChild._computedHeightTypeNull){vChild._renderRuntimeTop(vWidget.getPaddingTop()||0);
vChild._renderRuntimeBottom(vWidget.getPaddingBottom()||0);
return;
}}var vAlign=vChild.getVerticalAlign()||vWidget.getVerticalChildrenAlign();
var vPos=vAlign=="middle"?Math.round((vWidget.getInnerHeight()-vChild.getOuterHeight())/2):0;
if(vAlign=="bottom"){vPos+=vWidget.getPaddingBottom();
if(!vChild._computedBottomTypeNull){vPos+=vChild.getBottomValue();
}else if(!vChild._computedTopTypeNull){vPos-=vChild.getTopValue();
}vChild._resetRuntimeTop();
vChild._renderRuntimeBottom(vPos);
}else{vPos+=vWidget.getPaddingTop();
if(!vChild._computedTopTypeNull){vPos+=vChild.getTopValue();
}else if(!vChild._computedBottomTypeNull){vPos-=vChild.getBottomValue();
}vChild._resetRuntimeBottom();
vChild._renderRuntimeTop(vPos);
}}}});




/* ID: qx.ui.layout.HorizontalBoxLayout */
qx.Class.define("qx.ui.layout.HorizontalBoxLayout",
{extend:qx.ui.layout.BoxLayout});




/* ID: qx.ui.toolbar.ToolBar */
qx.Class.define("qx.ui.toolbar.ToolBar",
{extend:qx.ui.layout.HorizontalBoxLayout,
construct:function(){this.base(arguments);
this.addEventListener("keypress",
this._onkeypress);
this.initHeight();
},
properties:{appearance:{refine:true,
init:"toolbar"},
height:{refine:true,
init:"auto"},
openMenu:{check:"qx.ui.menu.Menu",
event:"changeOpenMenu",
nullable:true},
show:{init:"both",
check:["both",
"label",
"icon",
"none"],
nullable:true,
inheritable:true,
event:"changeShow"}},
members:{getAllButtons:function(){var vChildren=this.getChildren();
var vLength=vChildren.length;
var vDeepChildren=[];
var vCurrent;
for(var i=0;i<vLength;i++){vCurrent=vChildren[i];
if(vCurrent instanceof qx.ui.toolbar.MenuButton){vDeepChildren.push(vCurrent);
}else if(vCurrent instanceof qx.ui.toolbar.Part){vDeepChildren=vDeepChildren.concat(vCurrent.getChildren());
}}return vDeepChildren;
},
_onkeypress:function(e){switch(e.getKeyIdentifier()){case "Left":return this._onkeypress_left();
case "Right":return this._onkeypress_right();
}},
_onkeypress_left:function(){var vMenu=this.getOpenMenu();
if(!vMenu){return;
}var vOpener=vMenu.getOpener();
if(!vOpener){return;
}var vChildren=this.getAllButtons();
var vChildrenLength=vChildren.length;
var vIndex=vChildren.indexOf(vOpener);
var vCurrent;
var vPrevButton=null;
for(var i=vIndex-1;i>=0;i--){vCurrent=vChildren[i];
if(vCurrent instanceof qx.ui.toolbar.MenuButton&&vCurrent.getEnabled()){vPrevButton=vCurrent;
break;
}}if(!vPrevButton){for(var i=vChildrenLength-1;i>vIndex;i--){vCurrent=vChildren[i];
if(vCurrent instanceof qx.ui.toolbar.MenuButton&&vCurrent.getEnabled()){vPrevButton=vCurrent;
break;
}}}
if(vPrevButton){qx.ui.menu.Manager.getInstance().update();
vPrevButton._showMenu(true);
}},
_onkeypress_right:function(){var vMenu=this.getOpenMenu();
if(!vMenu){return;
}var vOpener=vMenu.getOpener();
if(!vOpener){return;
}var vChildren=this.getAllButtons();
var vChildrenLength=vChildren.length;
var vIndex=vChildren.indexOf(vOpener);
var vCurrent;
var vNextButton=null;
for(var i=vIndex+1;i<vChildrenLength;i++){vCurrent=vChildren[i];
if(vCurrent instanceof qx.ui.toolbar.MenuButton&&vCurrent.getEnabled()){vNextButton=vCurrent;
break;
}}if(!vNextButton){for(var i=0;i<vIndex;i++){vCurrent=vChildren[i];
if(vCurrent instanceof qx.ui.toolbar.MenuButton&&vCurrent.getEnabled()){vNextButton=vCurrent;
break;
}}}
if(vNextButton){qx.ui.menu.Manager.getInstance().update();
vNextButton._showMenu(true);
}}}});




/* ID: qx.ui.basic.Atom */
qx.Class.define("qx.ui.basic.Atom",
{extend:qx.ui.layout.BoxLayout,
construct:function(vLabel,
vIcon,
vIconWidth,
vIconHeight,
vFlash){this.base(arguments);
this.getLayoutImpl().setEnableFlexSupport(false);
if(vLabel!==undefined){this.setLabel(vLabel);
}if(qx.Class.isDefined("qx.ui.embed.Flash")&&vFlash!=null&&vIconWidth!=null&&vIconHeight!=null&&qx.ui.embed.Flash.getPlayerVersion().getMajor()>0){this._flashMode=true;
this.setIcon(vFlash);
}else if(vIcon!=null){this.setIcon(vIcon);
}
if(vIcon||vFlash){if(vIconWidth!=null){this.setIconWidth(vIconWidth);
}
if(vIconHeight!=null){this.setIconHeight(vIconHeight);
}}this.initWidth();
this.initHeight();
},
properties:{orientation:{refine:true,
init:"horizontal"},
allowStretchX:{refine:true,
init:false},
allowStretchY:{refine:true,
init:false},
appearance:{refine:true,
init:"atom"},
stretchChildrenOrthogonalAxis:{refine:true,
init:false},
width:{refine:true,
init:"auto"},
height:{refine:true,
init:"auto"},
horizontalChildrenAlign:{refine:true,
init:"center"},
verticalChildrenAlign:{refine:true,
init:"middle"},
spacing:{refine:true,
init:4},
label:{apply:"_applyLabel",
nullable:true,
dispose:true,
check:"Label"},
icon:{check:"String",
apply:"_applyIcon",
nullable:true,
themeable:true},
disabledIcon:{check:"String",
apply:"_applyDisabledIcon",
nullable:true,
themeable:true},
show:{init:"both",
check:["both",
"label",
"icon",
"none"],
themeable:true,
nullable:true,
inheritable:true,
apply:"_applyShow",
event:"changeShow"},
iconPosition:{init:"left",
check:["top",
"right",
"bottom",
"left"],
themeable:true,
apply:"_applyIconPosition"},
iconWidth:{check:"Integer",
themeable:true,
apply:"_applyIconWidth",
nullable:true},
iconHeight:{check:"Integer",
themeable:true,
apply:"_applyIconHeight",
nullable:true}},
members:{_flashMode:false,
_labelObject:null,
_iconObject:null,
_createLabel:function(){var l=this._labelObject=new qx.ui.basic.Label(this.getLabel());
l.setAnonymous(true);
l.setCursor("default");
this.addAt(l,
this._iconObject?1:0);
},
_createIcon:function(){if(this._flashMode&&qx.Class.isDefined("qx.ui.embed.Flash")){var i=this._iconObject=new qx.ui.embed.Flash(this.getIcon());
}else{var i=this._iconObject=new qx.ui.basic.Image();
}i.setAnonymous(true);
var width=this.getIconWidth();
if(width!==null){this._iconObject.setWidth(width);
}var height=this.getIconWidth();
if(height!==null){this._iconObject.setHeight(height);
}this._updateIcon();
this.addAt(i,
0);
},
_updateIcon:function(){var icon=this.getIcon();
if(this._iconObject&&this.getIcon&&this.getDisabledIcon){var disabledIcon=this.getDisabledIcon();
if(disabledIcon){if(this.getEnabled()){icon?this._iconObject.setSource(icon):this._iconObject.resetSource();
}else{disabledIcon?this._iconObject.setSource(disabledIcon):this._iconObject.resetSource();
}this._iconObject.setEnabled(true);
}else{icon?this._iconObject.setSource(icon):this._iconObject.resetSource();
this._iconObject.resetEnabled();
}}},
getLabelObject:function(){return this._labelObject;
},
getIconObject:function(){return this._iconObject;
},
_applyIconPosition:function(value,
old){switch(value){case "top":case "bottom":this.setOrientation("vertical");
this.setReverseChildrenOrder(value=="bottom");
break;
default:this.setOrientation("horizontal");
this.setReverseChildrenOrder(value=="right");
break;
}},
_applyShow:function(value,
old){this._handleIcon();
this._handleLabel();
},
_applyLabel:function(value,
old){if(this._labelObject){value?this._labelObject.setText(value):this._labelObject.resetText();
}this._handleLabel();
},
_applyIcon:function(value,
old){this._updateIcon();
this._handleIcon();
},
_applyDisabledIcon:function(value,
old){this._updateIcon();
this._handleIcon();
},
_applyIconWidth:function(value,
old){if(this._iconObject){this._iconObject.setWidth(value);
}},
_applyIconHeight:function(value,
old){if(this._iconObject){this._iconObject.setHeight(value);
}},
_iconIsVisible:false,
_labelIsVisible:false,
_handleLabel:function(){switch(this.getShow()){case "label":case "both":case "inherit":this._labelIsVisible=!!this.getLabel();
break;
default:this._labelIsVisible=false;
}
if(this._labelIsVisible){this._labelObject?this._labelObject.setDisplay(true):this._createLabel();
}else if(this._labelObject){this._labelObject.setDisplay(false);
}},
_handleIcon:function(){switch(this.getShow()){case "icon":case "both":case "inherit":this._iconIsVisible=!!this.getIcon();
break;
default:this._iconIsVisible=false;
}
if(this._iconIsVisible){this._iconObject?this._iconObject.setDisplay(true):this._createIcon();
}else if(this._iconObject){this._iconObject.setDisplay(false);
}}},
destruct:function(){this._disposeObjects("_iconObject",
"_labelObject");
}});




/* ID: qx.ui.basic.Label */
qx.Class.define("qx.ui.basic.Label",
{extend:qx.ui.basic.Terminator,
construct:function(text,
mnemonic,
mode){this.base(arguments);
if(mode!=null){this.setMode(mode);
}
if(text!=null){this.setText(text);
}
if(mnemonic!=null){this.setMnemonic(mnemonic);
}this.initWidth();
this.initHeight();
this.initSelectable();
this.initCursor();
this.initWrap();
},
statics:{_getMeasureNode:function(){var node=this._measureNode;
if(!node){node=document.createElement("div");
var style=node.style;
style.width=style.height="auto";
style.visibility="hidden";
style.position="absolute";
style.zIndex="-1";
document.body.appendChild(node);
this._measureNode=node;
}return node;
}},
properties:{appearance:{refine:true,
init:"label"},
width:{refine:true,
init:"auto"},
height:{refine:true,
init:"auto"},
allowStretchX:{refine:true,
init:false},
allowStretchY:{refine:true,
init:false},
selectable:{refine:true,
init:false},
cursor:{refine:true,
init:"default"},
text:{apply:"_applyText",
init:"",
dispose:true,
event:"changeText",
check:"Label"},
wrap:{check:"Boolean",
init:false,
nullable:true,
apply:"_applyWrap"},
textAlign:{check:["left",
"center",
"right",
"justify"],
nullable:true,
themeable:true,
apply:"_applyTextAlign"},
textOverflow:{check:"Boolean",
init:true,
apply:"_applyText"},
mode:{check:["html",
"text",
"auto"],
init:"auto",
apply:"_applyText"},
mnemonic:{check:"String",
nullable:true,
apply:"_applyMnemonic"}},
members:{_content:"",
_isHtml:false,
setHtml:function(html){qx.log.Logger.deprecatedMethodWarning(arguments.callee,
"please use setText() instead.");
this.setText(html);
},
getHtml:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee,
"please use getText() instead.");
return this.getText();
},
_applyTextAlign:function(value,
old){value===null?this.removeStyleProperty("textAlign"):this.setStyleProperty("textAlign",
value);
},
_applyFont:function(value,
old){qx.theme.manager.Font.getInstance().connect(this._styleFont,
this,
value);
},
_styleFont:function(font){this._invalidatePreferredInnerDimensions();
font?font.render(this):qx.ui.core.Font.reset(this);
},
_applyTextColor:function(value,
old){qx.theme.manager.Color.getInstance().connect(this._styleTextColor,
this,
value);
},
_styleTextColor:function(value){value?this.setStyleProperty("color",
value):this.removeStyleProperty("color");
},
_applyWrap:function(value,
old){value==null?this.removeStyleProperty("whiteSpace"):this.setStyleProperty("whiteSpace",
value?"normal":"nowrap");
},
_applyText:function(value,
old){qx.locale.Manager.getInstance().connect(this._syncText,
this,
this.getText());
},
_syncText:function(text){var mode=this.getMode();
if(mode==="auto"){mode=qx.util.Validation.isValidString(text)&&text.match(/<.*>/)?"html":"text";
}
switch(mode){case "text":var escapedText=qx.html.String.escape(text).replace(/(^ | $)/g,
"&nbsp;").replace(/  /g,
"&nbsp;&nbsp;");
this._isHtml=escapedText!==text;
this._content=escapedText;
break;
case "html":this._isHtml=true;
this._content=text;
break;
}
if(this._isCreated){this._renderContent();
}},
_applyMnemonic:function(value,
old){this._mnemonicTest=value?new RegExp("^(((<([^>]|"+value+")+>)|(&([^;]|"+value+")+;)|[^&"+value+"])*)("+value+")",
"i"):null;
if(this._isCreated){this._renderContent();
}},
_computeObjectNeededDimensions:function(){var element=this.self(arguments)._getMeasureNode();
var style=element.style;
var source=this._styleProperties;
style.fontFamily=source.fontFamily||"";
style.fontSize=source.fontSize||"";
style.fontWeight=source.fontWeight||"";
style.fontStyle=source.fontStyle||"";
if(this._isHtml){element.innerHTML=this._content;
}else{element.innerHTML="";
qx.dom.Element.setTextContent(element,
this._content);
}this._cachedPreferredInnerWidth=element.scrollWidth;
this._cachedPreferredInnerHeight=element.scrollHeight;
},
_computePreferredInnerWidth:function(){this._computeObjectNeededDimensions();
return this._cachedPreferredInnerWidth;
},
_computePreferredInnerHeight:function(){this._computeObjectNeededDimensions();
return this._cachedPreferredInnerHeight;
},
__patchTextOverflow:function(html,
inner){return ("<div style='float:left;width:"+(inner-14)+"px;overflow:hidden;white-space:nowrap'>"+html+"</div><span style='float:left'>&hellip;</span>");
},
_postApply:function(){var html=this._content;
var element=this._getTargetNode();
if(html==null){element.innerHTML="";
return;
}
if(this.getMnemonic()){if(this._mnemonicTest.test(html)){html=RegExp.$1+"<span style=\"text-decoration:underline\">"+RegExp.$7+"</span>"+RegExp.rightContext;
this._isHtml=true;
}else{html+=" ("+this.getMnemonic()+")";
}}var style=element.style;
if(this.getTextOverflow()&&!this.getWrap()){if(this.getInnerWidth()<this.getPreferredInnerWidth()){style.overflow="hidden";
if(qx.core.Variant.isSet("qx.client",
"mshtml|webkit")){style.textOverflow="ellipsis";
}else if(qx.core.Variant.isSet("qx.client",
"opera")){style.OTextOverflow="ellipsis";
}else{html=this.__patchTextOverflow(html,
this.getInnerWidth());
this._isHtml=true;
}}else{style.overflow="";
if(qx.core.Variant.isSet("qx.client",
"mshtml|webkit")){style.textOverflow="";
}else if(qx.core.Variant.isSet("qx.client",
"opera")){style.OTextOverflow="";
}}}
if(this._isHtml){element.innerHTML=html;
}else{element.innerHTML="";
qx.dom.Element.setTextContent(element,
html);
}}}});




/* ID: qx.locale.Manager */
qx.Class.define("qx.locale.Manager",
{type:"singleton",
extend:qx.util.manager.Value,
construct:function(){this.base(arguments);
this._translationCatalog={};
this.setLocale(qx.core.Client.getInstance().getLocale()||this._defaultLocale);
},
statics:{tr:function(messageId,
varargs){var args=qx.lang.Array.fromArguments(arguments);
args.splice(0,
1);
return new qx.locale.LocalizedString(messageId,
args);
},
trn:function(singularMessageId,
pluralMessageId,
count,
varargs){var args=qx.lang.Array.fromArguments(arguments);
args.splice(0,
3);
if(count>1){return new qx.locale.LocalizedString(pluralMessageId,
args);
}else{return new qx.locale.LocalizedString(singularMessageId,
args);
}},
trc:function(hint,
messageId,
varargs){var args=qx.lang.Array.fromArguments(arguments);
args.splice(0,
2);
return new qx.locale.LocalizedString(messageId,
args);
},
marktr:function(messageId){return messageId;
}},
properties:{locale:{check:"String",
nullable:true,
apply:"_applyLocale",
event:"changeLocale"}},
members:{_defaultLocale:"C",
getLanguage:function(){return this._language;
},
getTerritory:function(){return this.getLocale().split("_")[1]||"";
},
getAvailableLocales:function(){var locales=[];
for(var locale in this._translationCatalog){if(locale!=this._defaultLocale){locales.push(locale);
}}return locales;
},
_extractLanguage:function(locale){var language;
var pos=locale.indexOf("_");
if(pos==-1){language=locale;
}else{language=locale.substring(0,
pos);
}return language;
},
_applyLocale:function(value,
old){this._locale=value;
this._language=this._extractLanguage(value);
this._updateObjects();
},
addTranslation:function(languageCode,
translationMap){if(this._translationCatalog[languageCode]){for(var key in translationMap){this._translationCatalog[languageCode][key]=translationMap[key];
}}else{this._translationCatalog[languageCode]=translationMap;
}},
addTranslationFromClass:function(classname,
translationMap){this.addTranslation(classname.substring(classname.lastIndexOf(".")+1),
translationMap);
},
translate:function(messageId,
args,
locale){var txt;
if(locale){var language=this._extractLanguage(locale);
}else{locale=this._locale;
language=this._language;
}
if(!txt&&this._translationCatalog[locale]){txt=this._translationCatalog[locale][messageId];
}
if(!txt&&this._translationCatalog[language]){txt=this._translationCatalog[language][messageId];
}
if(!txt&&this._translationCatalog[this._defaultLocale]){txt=this._translationCatalog[this._defaultLocale][messageId];
}
if(!txt){txt=messageId;
}
if(args.length>0){txt=qx.lang.String.format(txt,
args);
}return txt;
},
isDynamic:function(text){return text instanceof qx.locale.LocalizedString;
},
resolveDynamic:function(text){return text.toString();
}},
destruct:function(){this._disposeFields("_translationCatalog");
}});




/* ID: qx.locale.LocalizedString */
qx.Class.define("qx.locale.LocalizedString",
{extend:qx.core.Object,
construct:function(messageId,
args,
locale){this.base(arguments);
this.setId(messageId);
this._locale=locale;
var storedArguments=[];
for(var i=0;i<args.length;i++){var arg=args[i];
if(arg instanceof qx.locale.LocalizedString){storedArguments.push(arg);
}else{storedArguments.push(arg+"");
}}this.setArgs(storedArguments);
},
properties:{id:{check:"String",
nullable:true},
args:{nullable:true,
dispose:true}},
members:{_autoDispose:false,
toString:function(){return qx.locale.Manager.getInstance().translate(this.getId(),
this.getArgs(),
this._locale);
}}});




/* ID: qx.dom.Element */
qx.Class.define("qx.dom.Element",
{statics:{cleanWhitespace:function(el){for(var i=0;i<el.childNodes.length;i++){var node=el.childNodes[i];
if(node.nodeType==qx.dom.Node.TEXT&&!/\S/.test(node.nodeValue)){el.removeChild(node);
}}},
isEmpty:function(el){return el.innerHTML.match(/^\s*$/);
},
getTextContent:qx.lang.Object.select(qx.core.Client.getInstance().supportsTextContent()?"textContent":qx.core.Client.getInstance().supportsInnerText()?"innerText":"default",
{innerText:function(el){return el.innerText||el.text;
},
textContent:function(el){return el.textContent;
},
"default":function(){throw new Error("This browser does not support any form of text content handling!");
}}),
setTextContent:qx.lang.Object.select(qx.core.Client.getInstance().supportsTextContent()?"textContent":qx.core.Client.getInstance().supportsInnerText()?"innerText":"default",
{innerText:function(el,
val){el.innerText=val;
},
textContent:function(el,
val){el.textContent=val;
},
"default":function(){throw new Error("This browser does not support any form of text content handling!");
}})}});




/* ID: qx.ui.basic.Image */
qx.Class.define("qx.ui.basic.Image",
{extend:qx.ui.basic.Terminator,
construct:function(vSource,
vWidth,
vHeight){this.base(arguments);
this._blank=qx.io.Alias.getInstance().resolve("static/image/blank.gif");
if(vSource!=null){this.setSource(vSource);
}if(vWidth!=null){this.setWidth(vWidth);
}else{this.initWidth();
}
if(vHeight!=null){this.setHeight(vHeight);
}else{this.initHeight();
}this.initSelectable();
},
events:{"error":"qx.event.type.Event"},
properties:{allowStretchX:{refine:true,
init:false},
allowStretchY:{refine:true,
init:false},
selectable:{refine:true,
init:false},
width:{refine:true,
init:"auto"},
height:{refine:true,
init:"auto"},
appearance:{refine:true,
init:"image"},
source:{check:"String",
apply:"_applySource",
event:"changeSource",
nullable:true,
themeable:true},
preloader:{check:"qx.io.image.Preloader",
apply:"_applyPreloader",
nullable:true},
loaded:{check:"Boolean",
init:false,
apply:"_applyLoaded"},
resizeToInner:{check:"Boolean",
init:false}},
members:{_onload:function(){this.setLoaded(true);
},
_onerror:function(){this.warn("Could not load: "+this.getSource());
this.setLoaded(false);
if(this.hasEventListeners("error")){this.dispatchEvent(new qx.event.type.Event("error"),
true);
}},
_beforeAppear:function(){var source=this.getSource();
if(source){qx.io.image.Manager.getInstance().show(source);
this._registeredAsVisible=true;
}return this.base(arguments);
},
_beforeDisappear:function(){var source=this.getSource();
if(source&&this._registeredAsVisible){qx.io.image.Manager.getInstance().hide(source);
delete this._registeredAsVisible;
}return this.base(arguments);
},
_applySource:function(value,
old){var imageMgr=qx.io.image.Manager.getInstance();
if(old){imageMgr.remove(old);
if(this._registeredAsVisible){imageMgr.hide(old);
delete this._registeredAsVisible;
}}
if(value){imageMgr.add(value);
if(this.isSeeable()){this._registeredAsVisible=true;
imageMgr.show(value);
}}
if(this.isCreated()){this._connect();
}},
_connect:function(){var aliasMgr=qx.io.Alias.getInstance();
aliasMgr.connect(this._syncSource,
this,
this.getSource());
},
_syncSource:function(value){if(value===null){this.setPreloader(null);
}else{var preloader=qx.io.image.PreloaderManager.getInstance().create(value);
this.setPreloader(preloader);
}},
_applyPreloader:function(value,
old){if(old){old.removeEventListener("load",
this._onload,
this);
old.removeEventListener("error",
this._onerror,
this);
}
if(value){this.setLoaded(false);
if(value.isErroneous()){this._onerror();
}else if(value.isLoaded()){this.setLoaded(true);
}else{value.addEventListener("load",
this._onload,
this);
value.addEventListener("error",
this._onerror,
this);
}}else{this.setLoaded(false);
}},
_applyLoaded:function(value,
old){if(value&&this.isCreated()){this._renderContent();
}else if(!value){this._invalidatePreferredInnerWidth();
this._invalidatePreferredInnerHeight();
}},
_applyElement:function(value,
old){if(value){if(!this._image){try{if(qx.core.Variant.isSet("qx.client",
"webkit")){this._image=document.createElement("img");
}else{this._image=new Image;
}this._image.style.border="0 none";
this._image.style.verticalAlign="top";
this._image.alt="";
this._image.title="";
}catch(ex){this.error("Failed while creating image #1",
ex);
}
if(qx.core.Variant.isSet("qx.client",
"gecko|opera|webkit")){this._styleEnabled();
}}value.appendChild(this._image);
}this.base(arguments,
value,
old);
if(value&&this.getSource()){this._connect();
}},
_postApply:function(){this._postApplyDimensions();
this._updateContent();
},
_applyEnabled:function(value,
old){if(this._image){this._styleEnabled();
}return this.base(arguments,
value,
old);
},
_updateContent:qx.core.Variant.select("qx.client",
{"mshtml":function(){var i=this._image;
var pl=this.getPreloader();
var source=pl&&pl.isLoaded()?pl.getSource():this._blank;
if(pl&&pl.getIsPng()&&this.getEnabled()){i.src=this._blank;
i.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+source+"',sizingMethod='scale')";
}else{i.src=source;
i.style.filter=this.getEnabled()?"":"Gray() Alpha(Opacity=30)";
}},
"default":function(){var pl=this.getPreloader();
var source=pl&&pl.isLoaded()?pl.getSource():this._blank;
this._image.src=source;
}}),
_resetContent:qx.core.Variant.select("qx.client",
{"mshtml":function(){this._image.src=this._blank;
this._image.style.filter="";
},
"default":function(){this._image.src=this._blank;
}}),
_styleEnabled:qx.core.Variant.select("qx.client",
{"mshtml":function(){this._updateContent();
},
"default":function(){if(this._image){var o=this.getEnabled()===false?0.3:"";
var s=this._image.style;
s.opacity=s.KhtmlOpacity=s.MozOpacity=o;
}}}),
_computePreferredInnerWidth:function(){var preloader=this.getPreloader();
return preloader?preloader.getWidth():0;
},
_computePreferredInnerHeight:function(){var preloader=this.getPreloader();
return preloader?preloader.getHeight():0;
},
_renderContent:function(){this.base(arguments);
qx.ui.core.Widget.flushGlobalQueues();
},
_postApplyDimensions:qx.core.Variant.select("qx.client",
{"mshtml":function(){try{var vImageStyle=this._image.style;
if(this.getResizeToInner()){vImageStyle.pixelWidth=this.getInnerWidth();
vImageStyle.pixelHeight=this.getInnerHeight();
}else{vImageStyle.pixelWidth=this.getPreferredInnerWidth();
vImageStyle.pixelHeight=this.getPreferredInnerHeight();
}}catch(ex){this.error("postApplyDimensions failed",
ex);
}},
"default":function(){try{var vImageNode=this._image;
if(this.getResizeToInner()){vImageNode.width=this.getInnerWidth();
vImageNode.height=this.getInnerHeight();
}else{vImageNode.width=this.getPreferredInnerWidth();
vImageNode.height=this.getPreferredInnerHeight();
}}catch(ex){this.error("postApplyDimensions failed",
ex);
}}}),
_changeInnerWidth:qx.core.Variant.select("qx.client",
{"mshtml":function(vNew,
vOld){if(this.getResizeToInner()){this._image.style.pixelWidth=vNew;
}},
"default":function(vNew,
vOld){if(this.getResizeToInner()){this._image.width=vNew;
}}}),
_changeInnerHeight:qx.core.Variant.select("qx.client",
{"mshtml":function(vNew,
vOld){if(this.getResizeToInner()){this._image.style.pixelHeight=vNew;
}},
"default":function(vNew,
vOld){if(this.getResizeToInner()){this._image.height=vNew;
}}})},
destruct:function(){if(this._image){this._image.style.filter="";
}this._disposeFields("_image");
}});




/* ID: qx.ui.form.Button */
qx.Class.define("qx.ui.form.Button",
{extend:qx.ui.basic.Atom,
construct:function(vText,
vIcon,
vIconWidth,
vIconHeight,
vFlash){this.base(arguments,
vText,
vIcon,
vIconWidth,
vIconHeight,
vFlash);
this.initTabIndex();
this.addEventListener("mouseover",
this._onmouseover);
this.addEventListener("mouseout",
this._onmouseout);
this.addEventListener("mousedown",
this._onmousedown);
this.addEventListener("mouseup",
this._onmouseup);
this.addEventListener("keydown",
this._onkeydown);
this.addEventListener("keyup",
this._onkeyup);
},
properties:{appearance:{refine:true,
init:"button"},
tabIndex:{refine:true,
init:1}},
members:{_onmouseover:function(e){if(e.getTarget()!=this){return;
}
if(this.hasState("abandoned")){this.removeState("abandoned");
this.addState("pressed");
}this.addState("over");
},
_onmouseout:function(e){if(e.getTarget()!=this){return;
}this.removeState("over");
if(this.hasState("pressed")){this.setCapture(true);
this.removeState("pressed");
this.addState("abandoned");
}},
_onmousedown:function(e){if(e.getTarget()!=this||!e.isLeftButtonPressed()){return;
}this.removeState("abandoned");
this.addState("pressed");
},
_onmouseup:function(e){this.setCapture(false);
var hasPressed=this.hasState("pressed");
var hasAbandoned=this.hasState("abandoned");
if(hasPressed){this.removeState("pressed");
}
if(hasAbandoned){this.removeState("abandoned");
}
if(!hasAbandoned){this.addState("over");
if(hasPressed){this.execute();
}}},
_onkeydown:function(e){switch(e.getKeyIdentifier()){case "Enter":case "Space":this.removeState("abandoned");
this.addState("pressed");
e.stopPropagation();
}},
_onkeyup:function(e){switch(e.getKeyIdentifier()){case "Enter":case "Space":if(this.hasState("pressed")){this.removeState("abandoned");
this.removeState("pressed");
this.execute();
e.stopPropagation();
}}}}});




/* ID: qx.ui.toolbar.Button */
qx.Class.define("qx.ui.toolbar.Button",
{extend:qx.ui.form.Button,
properties:{tabIndex:{refine:true,
init:-1},
appearance:{refine:true,
init:"toolbar-button"},
show:{refine:true,
init:"inherit"},
height:{refine:true,
init:null},
allowStretchY:{refine:true,
init:true}},
members:{_onkeydown:qx.lang.Function.returnTrue,
_onkeyup:qx.lang.Function.returnTrue}});




/* ID: qx.ui.toolbar.MenuButton */
qx.Class.define("qx.ui.toolbar.MenuButton",
{extend:qx.ui.toolbar.Button,
construct:function(vText,
vMenu,
vIcon,
vIconWidth,
vIconHeight,
vFlash){this.base(arguments,
vText,
vIcon,
vIconWidth,
vIconHeight,
vFlash);
if(vMenu!=null){this.setMenu(vMenu);
}},
properties:{menu:{check:"qx.ui.menu.Menu",
nullable:true,
apply:"_applyMenu",
event:"changeMenu"},
direction:{check:["up",
"down"],
init:"down",
event:"changeDirection"}},
members:{getParentToolBar:function(){var vParent=this.getParent();
if(vParent instanceof qx.ui.toolbar.Part){vParent=vParent.getParent();
}return vParent instanceof qx.ui.toolbar.ToolBar?vParent:null;
},
_showMenu:function(vFromKeyEvent){var vMenu=this.getMenu();
if(vMenu){var vButtonElement=this.getElement();
var buttonPos=qx.bom.element.Location.get(vButtonElement);
vMenu.setLeft(buttonPos.left);
switch(this.getDirection()){case "up":vMenu.setBottom(buttonPos.top);
vMenu.setTop(null);
break;
case "down":vMenu.setTop(buttonPos.bottom);
vMenu.setBottom(null);
break;
}this.addState("pressed");
if(vFromKeyEvent){vMenu.setHoverItem(vMenu.getFirstActiveChild());
}vMenu.show();
}},
_hideMenu:function(){var vMenu=this.getMenu();
if(vMenu){vMenu.hide();
}},
_applyMenu:function(value,
old){if(old){old.setOpener(null);
old.removeEventListener("appear",
this._onmenuappear,
this);
old.removeEventListener("disappear",
this._onmenudisappear,
this);
}
if(value){value.setOpener(this);
value.addEventListener("appear",
this._onmenuappear,
this);
value.addEventListener("disappear",
this._onmenudisappear,
this);
}},
_onmousedown:function(e){if(e.getTarget()!=this||!e.isLeftButtonPressed()){return;
}this.hasState("pressed")?this._hideMenu():this._showMenu();
},
_onmouseup:function(e){},
_onmouseout:function(e){if(e.getTarget()!=this){return;
}this.removeState("over");
},
_onmouseover:function(e){var vToolBar=this.getParentToolBar();
if(vToolBar){var vMenu=this.getMenu();
switch(vToolBar.getOpenMenu()){case null:case vMenu:break;
default:qx.ui.menu.Manager.getInstance().update();
this._showMenu();
}}return this.base(arguments,
e);
},
_onmenuappear:function(e){var vToolBar=this.getParentToolBar();
if(!vToolBar){return;
}var vMenu=this.getMenu();
vToolBar.setOpenMenu(vMenu);
},
_onmenudisappear:function(e){var vToolBar=this.getParentToolBar();
if(!vToolBar){return;
}var vMenu=this.getMenu();
if(vToolBar.getOpenMenu()==vMenu){vToolBar.setOpenMenu(null);
}}}});




/* ID: qx.ui.toolbar.Part */
qx.Class.define("qx.ui.toolbar.Part",
{extend:qx.ui.layout.HorizontalBoxLayout,
construct:function(){this.base(arguments);
this._handle=new qx.ui.toolbar.PartHandle;
this.add(this._handle);
this.initWidth();
},
properties:{appearance:{refine:true,
init:"toolbar-part"},
width:{refine:true,
init:"auto"},
show:{init:"inherit",
check:["both",
"label",
"icon",
"none"],
nullable:true,
inheritable:true,
event:"changeShow"}},
destruct:function(){this._disposeObjects("_handle");
}});




/* ID: qx.ui.toolbar.PartHandle */
qx.Class.define("qx.ui.toolbar.PartHandle",
{extend:qx.ui.layout.CanvasLayout,
construct:function(){this.base(arguments);
var l=new qx.ui.basic.Terminator;
l.setAppearance("toolbar-part-handle-line");
this.add(l);
},
properties:{appearance:{refine:true,
init:"toolbar-part-handle"}}});




/* ID: qx.bom.element.Location */
qx.Class.define("qx.bom.element.Location",
{statics:{__style:function(elem,
style){return qx.bom.element.Style.get(elem,
style,
qx.bom.element.Style.COMPUTED_MODE,
false);
},
__num:function(elem,
style){return parseInt(qx.bom.element.Style.get(elem,
style,
qx.bom.element.Style.COMPUTED_MODE,
false))||0;
},
__computeScroll:function(elem){var left=0,
top=0;
if(qx.core.Variant.isSet("qx.client",
"mshtml")&&elem.getBoundingClientRect){var win=qx.dom.Node.getWindow(elem);
left-=qx.bom.Viewport.getScrollLeft(win);
top-=qx.bom.Viewport.getScrollTop(win);
}else{var body=qx.dom.Node.getDocument(elem).body;
elem=elem.parentNode;
while(elem&&elem!=body){left+=elem.scrollLeft;
top+=elem.scrollTop;
elem=elem.parentNode;
}}return {left:left,
top:top};
},
__computeBody:qx.core.Variant.select("qx.client",
{"mshtml":function(elem){var doc=qx.dom.Node.getDocument(elem);
var body=doc.body;
var left=body.offsetLeft;
var top=body.offsetTop;
left-=this.__num(body,
"borderLeftWidth");
top-=this.__num(body,
"borderTopWidth");
if(doc.compatMode==="CSS1Compat"){left+=this.__num(body,
"marginLeft");
top+=this.__num(body,
"marginTop");
}return {left:left,
top:top};
},
"webkit":function(elem){var doc=qx.dom.Node.getDocument(elem);
var body=doc.body;
var left=body.offsetLeft;
var top=body.offsetTop;
left+=this.__num(body,
"borderLeftWidth");
top+=this.__num(body,
"borderTopWidth");
if(doc.compatMode==="CSS1Compat"){left+=this.__num(body,
"marginLeft");
top+=this.__num(body,
"marginTop");
}return {left:left,
top:top};
},
"gecko":function(elem){var body=qx.dom.Node.getDocument(elem).body;
var left=body.offsetLeft;
var top=body.offsetTop;
if(qx.bom.element.Dimension.getBoxSizing(body)!=="border-box"){left+=this.__num(body,
"borderLeftWidth");
top+=this.__num(body,
"borderTopWidth");
if(!elem.getBoundingClientRect){var hasAbs;
while(elem){if(this.__style(elem,
"position")==="absolute"||this.__style(elem,
"position")==="fixed"){hasAbs=true;
break;
}elem=elem.offsetParent;
}
if(!hasAbs){left+=this.__num(body,
"borderLeftWidth");
top+=this.__num(body,
"borderTopWidth");
}}}return {left:left,
top:top};
},
"default":function(elem){var body=qx.dom.Node.getDocument(elem).body;
var left=body.offsetLeft;
var top=body.offsetTop;
return {left:left,
top:top};
}}),
__computeOffset:qx.core.Variant.select("qx.client",
{"mshtml|webkit":function(elem){var doc=qx.dom.Node.getDocument(elem);
if(elem.getBoundingClientRect){var rect=elem.getBoundingClientRect();
var left=rect.left;
var top=rect.top;
if(doc.compatMode==="CSS1Compat"){left-=this.__num(elem,
"borderLeftWidth");
top-=this.__num(elem,
"borderTopWidth");
}}else{var left=elem.offsetLeft;
var top=elem.offsetTop;
elem=elem.offsetParent;
var body=doc.body;
while(elem&&elem!=body){left+=elem.offsetLeft;
top+=elem.offsetTop;
left+=this.__num(elem,
"borderLeftWidth");
top+=this.__num(elem,
"borderTopWidth");
elem=elem.offsetParent;
}}return {left:left,
top:top};
},
"gecko":function(elem){if(elem.getBoundingClientRect){var rect=elem.getBoundingClientRect();
var left=Math.round(rect.left);
var top=Math.round(rect.top);
}else{var left=0;
var top=0;
var body=qx.dom.Node.getDocument(elem).body;
var dim=qx.bom.element.Dimension;
if(dim.getBoxSizing(elem)!=="border-box"){left-=this.__num(elem,
"borderLeftWidth");
top-=this.__num(elem,
"borderTopWidth");
}
while(elem&&elem!==body){left+=elem.offsetLeft;
top+=elem.offsetTop;
if(dim.getBoxSizing(elem)!=="border-box"){left+=this.__num(elem,
"borderLeftWidth");
top+=this.__num(elem,
"borderTopWidth");
}if(elem.parentNode&&this.__style(elem.parentNode,
"overflow")!="visible"){left+=this.__num(elem.parentNode,
"borderLeftWidth");
top+=this.__num(elem.parentNode,
"borderTopWidth");
}elem=elem.offsetParent;
}}return {left:left,
top:top};
},
"default":function(elem){var left=0;
var top=0;
var body=qx.dom.Node.getDocument(elem).body;
while(elem&&elem!==body){left+=elem.offsetLeft;
top+=elem.offsetTop;
elem=elem.offsetParent;
}return {left:left,
top:top};
}}),
get:function(elem,
mode){var body=this.__computeBody(elem);
if(elem.tagName=="BODY"){var left=body.left;
var top=body.top;
}else{var offset=this.__computeOffset(elem);
var scroll=this.__computeScroll(elem);
var left=offset.left+body.left-scroll.left;
var top=offset.top+body.top-scroll.top;
}var right=left+elem.offsetWidth;
var bottom=top+elem.offsetHeight;
if(mode){switch(mode){case "margin":left-=this.__num(elem,
"marginLeft");
top-=this.__num(elem,
"marginTop");
right+=this.__num(elem,
"marginRight");
bottom+=this.__num(elem,
"marginBottom");
break;
case "box":break;
case "padding":left+=this.__num(elem,
"paddingLeft");
top+=this.__num(elem,
"paddingTop");
right-=this.__num(elem,
"paddingRight");
bottom-=this.__num(elem,
"paddingBottom");
case "scroll":left-=elem.scrollLeft;
top-=elem.scrollTop;
right+=elem.scrollLeft;
bottom+=elem.scrollTop;
case "border":left+=this.__num(elem,
"borderLeftWidth");
top+=this.__num(elem,
"borderTopWidth");
right-=this.__num(elem,
"borderRightWidth");
bottom-=this.__num(elem,
"borderBottomWidth");
break;
default:throw new Error("Invalid mode for location detection: "+mode);
}}return {left:left,
top:top,
right:right,
bottom:bottom};
},
getLeft:function(elem,
mode){return this.get(elem,
mode).left;
},
getTop:function(elem,
mode){return this.get(elem,
mode).top;
},
getRight:function(elem,
mode){return this.get(elem,
mode).right;
},
getBottom:function(elem,
mode){return this.get(elem,
mode).bottom;
},
getRelative:function(elem1,
elem2,
mode1,
mode2){var loc1=this.get(elem1,
mode1);
var loc2=this.get(elem2,
mode2);
return {left:loc1.left-loc2.left,
top:loc1.top-loc2.top,
right:loc1.right-loc2.right,
bottom:loc1.bottom-loc2.bottom};
}}});




/* ID: qx.bom.element.Style */
qx.Class.define("qx.bom.element.Style",
{statics:{__hints:{names:{"float":qx.core.Variant.isSet("qx.client",
"mshtml")?"styleFloat":"cssFloat",
"boxSizing":qx.core.Variant.isSet("qx.client",
"gecko")?"mozBoxSizing":"boxSizing"},
mshtmlPixel:{width:"pixelWidth",
height:"pixelHeight",
left:"pixelLeft",
right:"pixelRight",
top:"pixelTop",
bottom:"pixelBottom"},
special:{clip:true,
cursor:true,
opacity:true,
overflowX:true,
overflowY:true}},
setCss:qx.core.Variant.select("qx.client",
{"mshtml":function(element,
value){element.style.cssText=value;
},
"default":function(element,
value){element.setAttribute("style",
value);
}}),
getCss:qx.core.Variant.select("qx.client",
{"mshtml":function(element){return element.style.cssText.toLowerCase();
},
"default":function(element){return element.getAttribute("style");
}}),
COMPUTED_MODE:1,
CASCADED_MODE:2,
LOCAL_MODE:3,
set:function(element,
name,
value,
smart){var hints=this.__hints;
name=hints.names[name]||name;
element.style[name]=value||"";
},
reset:function(element,
name,
smart){var hints=this.__hints;
name=hints.names[name]||name;
element.style[name]="";
},
get:qx.core.Variant.select("qx.client",
{"mshtml":function(element,
name,
mode,
smart){var hints=this.__hints;
name=hints.names[name]||name;
switch(mode){case this.LOCAL_MODE:return element.style[name]||"";
case this.CASCADED_MODE:return element.currentStyle[name];
default:var currentStyle=element.currentStyle[name];
if(/^-?[\.\d]+(px)?$/i.test(currentStyle)){return currentStyle;
}var pixel=hints.mshtmlPixel[name];
if(pixel){var localStyle=element.style[name];
element.style[name]=currentStyle||0;
var value=element.style[pixel]+"px";
element.style[name]=localStyle;
return value;
}if(/^-?[\.\d]+(em|pt|%)?$/i.test(currentStyle)){throw new Error("Untranslated computed property value: "+name+". Only pixel values work well across different clients.");
}return currentStyle;
}},
"default":function(element,
name,
mode,
smart){var hints=this.__hints;
name=hints.names[name]||name;
switch(mode){case this.LOCAL_MODE:return element.style[name];
case this.CASCADED_MODE:if(element.currentStyle){return element.currentStyle[name];
}throw new Error("Cascaded styles are not supported in this browser!");
default:var doc=qx.dom.Node.getDocument(element);
var computed=doc.defaultView.getComputedStyle(element,
null);
return computed?computed[name]:null;
}}})}});




/* ID: qx.bom.element.Dimension */
qx.Class.define("qx.bom.element.Dimension",
{statics:{getWidth:function(element){return element.offsetWidth;
},
getHeight:function(element){return element.offsetHeight;
},
getClientWidth:function(element){return element.clientWidth;
},
getClientHeight:function(element){return element.clientHeight;
},
getScrollWidth:function(element){return element.scrollWidth;
},
getScrollHeight:function(element){return element.scrollHeight;
},
__nativeBorderBox:{tags:{button:true,
select:true},
types:{search:true,
button:true,
submit:true,
reset:true,
checkbox:true,
radio:true}},
__usesNativeBorderBox:function(element){var map=this.__nativeBorderBox;
return map.tags[element.tagName.toLowerCase()]||map.types[element.type];
},
setBoxSizing:qx.core.Variant.select("qx.client",
{"gecko":function(element,
sizing){element.style.MozBoxSizing=sizing||"";
},
"mshtml":function(element,
sizing){},
"default":function(element,
sizing){element.style.boxSizing=sizing||"";
}}),
getBoxSizing:qx.core.Variant.select("qx.client",
{"gecko":function(element){return qx.bom.element.Style.get(element,
"MozBoxSizing",
qx.bom.element.Style.COMPUTED_MODE,
false);
},
"mshtml":function(element){if(qx.bom.Document.isStandardMode(qx.dom.Node.getDocument(element))){if(!this.__usesNativeBorderBox(element)){return "content-box";
}}return "border-box";
},
"default":function(element){return qx.bom.element.Style.get(element,
"boxSizing",
qx.bom.element.Style.COMPUTED_MODE,
false);
}})}});




/* ID: qx.bom.Document */
qx.Class.define("qx.bom.Document",
{statics:{isQuirksMode:function(win){return (win||window).document.compatMode!=="CSS1Compat";
},
isStandardMode:function(win){return (win||window).document.compatMode==="CSS1Compat";
},
getWidth:function(win){var doc=(win||window).document;
var view=qx.bom.Viewport.getWidth(win);
var scroll=doc.compatMode==="CSS1Compat"?doc.documentElement.scrollWidth:doc.body.scrollWidth;
return Math.max(scroll,
view);
},
getHeight:function(win){var doc=(win||window).document;
var view=qx.bom.Viewport.getHeight(win);
var scroll=doc.compatMode==="CSS1Compat"?doc.documentElement.scrollHeight:doc.body.scrollHeight;
return Math.max(scroll,
view);
}}});




/* ID: qx.ui.menu.Manager */
qx.Class.define("qx.ui.menu.Manager",
{type:"singleton",
extend:qx.util.manager.Object,
construct:function(){this.base(arguments);
},
members:{update:function(vTarget,
vEventName){var vMenu,
vHashCode;
var vAll=this.getAll();
for(vHashCode in vAll){vMenu=vAll[vHashCode];
if(!vMenu.getAutoHide()){continue;
}
if(vTarget&&vTarget.getMenu&&vTarget.getMenu()){continue;
}if(!vTarget){vMenu.hide();
continue;
}var isMouseDown=vEventName=="mousedown";
var isMouseUp=vEventName=="mouseup";
if(vMenu.getOpener()!==
vTarget&&
(vTarget&&
(!vMenu.isSubElement(vTarget)&&isMouseDown)||
(vMenu.isSubElement(vTarget,
true)&&isMouseUp)||(!isMouseDown&&!isMouseUp))){vMenu.hide();
continue;
}}}}});




/* ID: qx.ui.menubar.MenuBar */
qx.Class.define("qx.ui.menubar.MenuBar",
{extend:qx.ui.toolbar.ToolBar});




/* ID: qx.ui.popup.Popup */
qx.Class.define("qx.ui.popup.Popup",
{extend:qx.ui.layout.CanvasLayout,
construct:function(){this.base(arguments);
this.setZIndex(this._minZIndex);
if(this._isFocusRoot){this.activateFocusRoot();
}this.initHeight();
this.initWidth();
},
properties:{appearance:{refine:true,
init:"popup"},
width:{refine:true,
init:"auto"},
height:{refine:true,
init:"auto"},
display:{refine:true,
init:false},
autoHide:{check:"Boolean",
init:true},
centered:{check:"Boolean",
init:false},
restrictToPageOnOpen:{check:"Boolean",
init:true},
restrictToPageLeft:{check:"Integer",
init:0},
restrictToPageRight:{check:"Integer",
init:0},
restrictToPageTop:{check:"Integer",
init:0},
restrictToPageBottom:{check:"Integer",
init:0}},
members:{_isFocusRoot:true,
_showTimeStamp:(new Date(0)).valueOf(),
_hideTimeStamp:(new Date(0)).valueOf(),
_beforeAppear:function(){this.base(arguments);
if(this.getRestrictToPageOnOpen()){this._wantedLeft=this.getLeft();
if(this._wantedLeft!=null){this.setLeft(10000);
if(this.getElement()!=null){this.getElement().style.left=10000;
}}}qx.ui.popup.PopupManager.getInstance().add(this);
qx.ui.popup.PopupManager.getInstance().update(this);
this._showTimeStamp=(new Date).valueOf();
this.bringToFront();
},
_beforeDisappear:function(){this.base(arguments);
qx.ui.popup.PopupManager.getInstance().remove(this);
this._hideTimeStamp=(new Date).valueOf();
},
_afterAppear:function(){this.base(arguments);
if(this.getRestrictToPageOnOpen()){var doc=qx.ui.core.ClientDocument.getInstance();
var docWidth=doc.getClientWidth();
var docHeight=doc.getClientHeight();
var scrollTop=qx.bom.Viewport.getScrollTop();
var scrollLeft=qx.bom.Viewport.getScrollLeft();
var restrictToPageLeft=this.getRestrictToPageLeft()+scrollLeft;
var restrictToPageRight=this.getRestrictToPageRight()-scrollLeft;
var restrictToPageTop=this.getRestrictToPageTop()+scrollTop;
var restrictToPageBottom=this.getRestrictToPageBottom()-scrollTop;
var left=(this._wantedLeft==null)?this.getLeft():this._wantedLeft;
var top=this.getTop();
var width=this.getBoxWidth();
var height=this.getBoxHeight();
var oldLeft=this.getLeft();
var oldTop=top;
if(left+width>docWidth-restrictToPageRight){left=docWidth-restrictToPageRight-width;
}
if(top+height>docHeight-restrictToPageBottom){top=docHeight-restrictToPageBottom-height;
}
if(left<restrictToPageLeft){left=restrictToPageLeft;
}
if(top<restrictToPageTop){top=restrictToPageTop;
}
if(left!=oldLeft||top!=oldTop){var self=this;
window.setTimeout(function(){self.setLeft(left);
self.setTop(top);
},
0);
}}},
_makeActive:function(){this.getFocusRoot().setActiveChild(this);
},
_makeInactive:function(){var vRoot=this.getFocusRoot();
var vCurrent=vRoot.getActiveChild();
if(vCurrent==this){vRoot.setActiveChild(vRoot);
}},
_minZIndex:1e6,
bringToFront:function(){this.setZIndex(this._minZIndex+1000000);
this._sendTo();
},
sendToBack:function(){this.setZIndex(this._minZIndex+1);
this._sendTo();
},
_sendTo:function(){var vPopups=qx.lang.Object.getValues(qx.ui.popup.PopupManager.getInstance().getAll());
if(qx.Class.isDefined("qx.ui.menu.Manager")){var vMenus=qx.lang.Object.getValues(qx.ui.menu.Manager.getInstance().getAll());
var vAll=vPopups.concat(vMenus).sort(qx.util.Compare.byZIndex);
}else{var vAll=vPopups.sort(qx.util.Compare.byZIndex);
}var vLength=vAll.length;
var vIndex=this._minZIndex;
for(var i=0;i<vLength;i++){vAll[i].setZIndex(vIndex++);
}},
getShowTimeStamp:function(){return this._showTimeStamp;
},
getHideTimeStamp:function(){return this._hideTimeStamp;
},
positionRelativeTo:function(el,
offsetX,
offsetY){if(el instanceof qx.ui.core.Widget){el=el.getElement();
}
if(el){var elementPos=qx.bom.element.Location.get(el);
this.setLocation(elementPos.left+(offsetX||0),
elementPos.top+(offsetY||0));
}else{this.warn('Missing reference element');
}},
centerToBrowser:function(){var d=qx.ui.core.ClientDocument.getInstance();
var left=(d.getClientWidth()-this.getBoxWidth())/2;
var top=(d.getClientHeight()-this.getBoxHeight())/2;
this.setLeft(left<0?0:left);
this.setTop(top<0?0:top);
}},
destruct:function(){qx.ui.popup.PopupManager.getInstance().remove(this);
this._disposeFields("_showTimeStamp",
"_hideTimeStamp");
}});




/* ID: qx.ui.popup.PopupManager */
qx.Class.define("qx.ui.popup.PopupManager",
{type:"singleton",
extend:qx.util.manager.Object,
construct:function(){this.base(arguments);
},
members:{update:function(vTarget){if(!(vTarget instanceof qx.ui.core.Widget)){vTarget=null;
}var vPopup,
vHashCode;
var vAll=this.getAll();
for(vHashCode in vAll){vPopup=vAll[vHashCode];
if(!vPopup.getAutoHide()||vTarget==vPopup||vPopup.contains(vTarget)){continue;
}
if(qx.Class.isDefined("qx.ui.popup.ToolTip")&&vTarget instanceof qx.ui.popup.ToolTip&&!(vPopup instanceof qx.ui.popup.ToolTip)){continue;
}vPopup.hide();
}}}});




/* ID: qx.util.Compare */
qx.Class.define("qx.util.Compare",
{statics:{byString:function(a,
b){return a==b?0:a>b?1:-1;
},
byStringCaseInsensitive:function(a,
b){return qx.util.Compare.byString(a.toLowerCase(),
b.toLowerCase());
},
byStringUmlautsShort:function(a,
b){return qx.util.Compare.byString(qx.util.Normalization.umlautsShort(a),
qx.util.Normalization.umlautsShort(b));
},
byStringUmlautsShortCaseInsensitive:function(a,
b){return qx.util.Compare.byString(qx.util.Normalization.umlautsShort(a).toLowerCase(),
qx.util.Normalization.umlautsShort(b).toLowerCase());
},
byStringUmlautsLong:function(a,
b){return qx.util.Compare.byString(qx.util.Normalization.umlautsLong(a),
qx.util.Normalization.umlautsLong(b));
},
byStringUmlautsLongCaseInsensitive:function(a,
b){return qx.util.Compare.byString(qx.util.Normalization.umlautsLong(a).toLowerCase(),
qx.util.Normalization.umlautsLong(b).toLowerCase());
},
byFloat:function(a,
b){return a-b;
},
byIntegerString:function(a,
b){return parseInt(a)-parseInt(b);
},
byFloatString:function(a,
b){return parseFloat(a)-parseFloat(b);
},
byIPv4:function(a,
b){var ipa=a.split(".",
4);
var ipb=b.split(".",
4);
for(var i=0;i<3;i++){a=parseInt(ipa[i]);
b=parseInt(ipb[i]);
if(a!=b){return a-b;
}}return parseInt(ipa[3])-parseInt(ipb[3]);
},
byZIndex:function(a,
b){return a.getZIndex()-b.getZIndex();
}},
defer:function(statics){statics.byInteger=statics.byNumber=statics.byFloat;
statics.byNumberString=statics.byFloatString;
}});




/* ID: qx.util.Normalization */
qx.Class.define("qx.util.Normalization",
{statics:{__umlautsRegExp:new RegExp("[\xE4\xF6\xFC\xDF\xC4\xD6\xDC]",
"g"),
__umlautsShortData:{"\xC4":"A",
"\xD6":"O",
"\xDC":"U",
"\xE4":"a",
"\xF6":"o",
"\xFC":"u",
"\xDF":"s"},
__umlautsShort:function(vChar){return qx.util.Normalization.__umlautsShortData[vChar];
},
umlautsShort:function(vString){return vString.replace(qx.util.Normalization.__umlautsRegExp,
qx.lang.Function.bind(this.__umlautsShort,
this));
},
__umlautsLongData:{"\xC4":"Ae",
"\xD6":"Oe",
"\xDC":"Ue",
"\xE4":"ae",
"\xF6":"oe",
"\xFC":"ue",
"\xDF":"ss"},
__umlautsLong:function(vChar){return qx.util.Normalization.__umlautsLongData[vChar];
},
umlautsLong:function(vString){return vString.replace(qx.util.Normalization.__umlautsRegExp,
qx.lang.Function.bind(this.__umlautsLong,
this));
}}});




/* ID: qx.ui.menu.Menu */
qx.Class.define("qx.ui.menu.Menu",
{extend:qx.ui.popup.Popup,
construct:function(){this.base(arguments);
var l=this._layout=new qx.ui.menu.Layout;
l.setEdge(0);
this.add(l);
this.initOpenInterval();
this.initCloseInterval();
this.addEventListener("mouseover",
this._onmouseover);
this.addEventListener("mousemove",
this._onmouseover);
this.addEventListener("mouseout",
this._onmouseout);
this.addEventListener("keydown",
this._onkeydown);
this.addEventListener("keypress",
this._onkeypress);
this.remapChildrenHandlingTo(this._layout);
this.initWidth();
this.initHeight();
},
properties:{appearance:{refine:true,
init:"menu"},
width:{refine:true,
init:"auto"},
height:{refine:true,
init:"auto"},
iconContentGap:{check:"Integer",
themeable:true,
init:4},
labelShortcutGap:{check:"Integer",
themeable:true,
init:10},
contentArrowGap:{check:"Integer",
themeable:true,
init:8},
contentNonIconPadding:{check:"Integer",
themeable:true,
init:20},
contentNonArrowPadding:{check:"Integer",
themeable:true,
init:8},
hoverItem:{check:"qx.ui.core.Widget",
nullable:true,
apply:"_applyHoverItem"},
openItem:{check:"qx.ui.core.Widget",
nullable:true,
apply:"_applyOpenItem"},
opener:{check:"qx.ui.core.Widget",
nullable:true},
parentMenu:{check:"qx.ui.menu.Menu",
nullable:true},
fastReopen:{check:"Boolean",
init:false},
openInterval:{check:"Integer",
themeable:true,
init:250,
apply:"_applyOpenInterval"},
closeInterval:{check:"Integer",
themeable:true,
init:250,
apply:"_applyCloseInterval"},
subMenuHorizontalOffset:{check:"Integer",
themeable:true,
init:-3},
subMenuVerticalOffset:{check:"Integer",
themeable:true,
init:-2},
indentShortcuts:{check:"Boolean",
init:true},
maxIconWidth:{_cached:true},
maxLabelWidth:{_cached:true},
maxLabelWidthIncShortcut:{_cached:true},
maxShortcutWidth:{_cached:true},
maxArrowWidth:{_cached:true},
maxContentWidth:{_cached:true},
iconPosition:{_cached:true,
defaultValue:0},
labelPosition:{_cached:true},
shortcutPosition:{_cached:true},
arrowPosition:{_cached:true},
menuButtonNeededWidth:{_cached:true}},
members:{_remappingChildTable:["add",
"remove",
"addAt",
"addAtBegin",
"addAtEnd",
"removeAt",
"addBefore",
"addAfter",
"removeAll",
"getFirstChild",
"getFirstActiveChild",
"getLastChild",
"getLastActiveChild"],
_isFocusRoot:false,
getLayout:function(){return this._layout;
},
isSubElement:function(vElement,
vButtonsOnly){if((vElement.getParent()===this._layout)||((!vButtonsOnly)&&(vElement===this))){return true;
}
for(var a=this._layout.getChildren(),
l=a.length,
i=0;i<l;i++){if(a[i].getMenu&&a[i].getMenu()&&a[i].getMenu().isSubElement(vElement,
vButtonsOnly)){return true;
}}return false;
},
_beforeAppear:function(){qx.ui.layout.CanvasLayout.prototype._beforeAppear.call(this);
qx.ui.menu.Manager.getInstance().add(this);
this.bringToFront();
this._makeActive();
},
_beforeDisappear:function(){qx.ui.layout.CanvasLayout.prototype._beforeDisappear.call(this);
qx.ui.menu.Manager.getInstance().remove(this);
this._makeInactive();
this.setHoverItem(null);
this.setOpenItem(null);
var vOpener=this.getOpener();
if(vOpener){vOpener.removeState("pressed");
}},
_applyOpenInterval:function(value,
old){if(!this._openTimer){this._openTimer=new qx.client.Timer(value);
this._openTimer.addEventListener("interval",
this._onopentimer,
this);
}else{this._openTimer.setInterval(value);
}},
_applyCloseInterval:function(value,
old){if(!this._closeTimer){this._closeTimer=new qx.client.Timer(this.getCloseInterval());
this._closeTimer.addEventListener("interval",
this._onclosetimer,
this);
}else{this._closeTimer.setInterval(value);
}},
_applyHoverItem:function(value,
old){if(old){old.removeState("over");
}
if(value){value.addState("over");
}},
_applyOpenItem:function(value,
old){if(old){var vOldSub=old.getMenu();
if(vOldSub){vOldSub.setParentMenu(null);
vOldSub.setOpener(null);
vOldSub.hide();
}}
if(value){var vSub=value.getMenu();
if(vSub){vSub.setOpener(value);
vSub.setParentMenu(this);
var pl=value.getElement();
var el=this.getElement();
vSub.setTop(qx.bom.element.Location.getTop(pl)+this.getSubMenuVerticalOffset());
vSub.setLeft(qx.bom.element.Location.getLeft(el)+qx.html.Dimension.getBoxWidth(el)+this.getSubMenuHorizontalOffset());
vSub.show();
}}},
_computeMaxIconWidth:function(){var ch=this.getLayout().getChildren(),
chl=ch.length,
chc,
m=0;
for(var i=0;i<chl;i++){chc=ch[i];
if(chc.hasIcon()){m=Math.max(m,
16);
}}return m;
},
_computeMaxLabelWidth:function(){var ch=this.getLayout().getChildren(),
chl=ch.length,
chc,
m=0;
for(var i=0;i<chl;i++){chc=ch[i];
if(chc.hasLabel()){m=Math.max(m,
chc.getLabelObject().getPreferredBoxWidth());
}}return m;
},
_computeMaxLabelWidthIncShortcut:function(){var ch=this.getLayout().getChildren(),
chl=ch.length,
chc,
m=0;
for(var i=0;i<chl;i++){chc=ch[i];
if(chc.hasLabel()&&chc.hasShortcut()){m=Math.max(m,
chc.getLabelObject().getPreferredBoxWidth());
}}return m;
},
_computeMaxShortcutWidth:function(){var ch=this.getLayout().getChildren(),
chl=ch.length,
chc,
m=0;
for(var i=0;i<chl;i++){chc=ch[i];
if(chc.hasShortcut()){m=Math.max(m,
chc.getShortcutObject().getPreferredBoxWidth());
}}return m;
},
_computeMaxArrowWidth:function(){var ch=this.getLayout().getChildren(),
chl=ch.length,
chc,
m=0;
for(var i=0;i<chl;i++){chc=ch[i];
if(chc.hasMenu()){m=Math.max(m,
4);
}}return m;
},
_computeMaxContentWidth:function(){var vSum;
var lw=this.getMaxLabelWidth();
var sw=this.getMaxShortcutWidth();
if(this.getIndentShortcuts()){var vTemp=sw+this.getMaxLabelWidthIncShortcut();
if(sw>0){vTemp+=this.getLabelShortcutGap();
}vSum=Math.max(lw,
vTemp);
}else{vSum=lw+sw;
if(lw>0&&sw>0){vSum+=this.getLabelShortcutGap();
}}return vSum;
},
_computeIconPosition:function(){return 0;
},
_computeLabelPosition:function(){var v=this.getMaxIconWidth();
return v>0?v+this.getIconContentGap():this.getContentNonIconPadding();
},
_computeShortcutPosition:function(){return this.getLabelPosition()+this.getMaxContentWidth()-this.getMaxShortcutWidth();
},
_computeArrowPosition:function(){var v=this.getMaxContentWidth();
return this.getLabelPosition()+(v>0?v+this.getContentArrowGap():v);
},
_invalidateMaxIconWidth:function(){this._cachedMaxIconWidth=null;
this._invalidateLabelPosition();
this._invalidateMenuButtonNeededWidth();
},
_invalidateMaxLabelWidth:function(){this._cachedMaxLabelWidth=null;
this._cachedMaxArrowWidth=null;
this._invalidateShortcutPosition();
this._invalidateMaxLabelWidthIncShortcut();
this._invalidateMaxContentWidth();
this._invalidateMenuButtonNeededWidth();
},
_invalidateMaxShortcutWidth:function(){this._cachedMaxShortcutWidth=null;
this._invalidateArrowPosition();
this._invalidateMaxContentWidth();
this._invalidateMenuButtonNeededWidth();
},
_invalidateLabelPosition:function(){this._cachedLabelPosition=null;
this._invalidateShortcutPosition();
},
_invalidateShortcutPosition:function(){this._cachedShortcutPosition=null;
this._invalidateArrowPosition();
},
_computeMenuButtonNeededWidth:function(){var vSum=0;
var vMaxIcon=this.getMaxIconWidth();
var vMaxContent=this.getMaxContentWidth();
var vMaxArrow=this.getMaxArrowWidth();
if(vMaxIcon>0){vSum+=vMaxIcon;
}else{vSum+=this.getContentNonIconPadding();
}
if(vMaxContent>0){if(vMaxIcon>0){vSum+=this.getIconContentGap();
}vSum+=vMaxContent;
}
if(vMaxArrow>0){if(vMaxIcon>0||vMaxContent>0){vSum+=this.getContentArrowGap();
}vSum+=vMaxArrow;
}else{vSum+=this.getContentNonArrowPadding();
}return vSum;
},
_onmouseover:function(e){var vParent=this.getParentMenu();
if(vParent){vParent._closeTimer.stop();
var vOpener=this.getOpener();
if(vOpener){vParent.setHoverItem(vOpener);
}}var t=e.getTarget();
if(t==this){this._openTimer.stop();
this._closeTimer.start();
this.setHoverItem(null);
return;
}var vOpen=this.getOpenItem();
if(vOpen){this.setHoverItem(t);
this._openTimer.stop();
if(t.hasMenu()){if(this.getFastReopen()){this.setOpenItem(t);
this._closeTimer.stop();
}else{this._openTimer.start();
}}else{this._closeTimer.start();
}}else{this.setHoverItem(t);
this._openTimer.stop();
if(t.hasMenu()){this._openTimer.start();
}}},
_onmouseout:function(e){this._openTimer.stop();
var t=e.getTarget();
if(t!=this&&t.hasMenu()){this._closeTimer.start();
}this.setHoverItem(null);
},
_onopentimer:function(e){this._openTimer.stop();
var vHover=this.getHoverItem();
if(vHover&&vHover.hasMenu()){this.setOpenItem(vHover);
}},
_onclosetimer:function(e){this._closeTimer.stop();
this.setOpenItem(null);
},
_onkeydown:function(e){if(e.getKeyIdentifier()=="Enter"){this._onkeydown_enter(e);
}e.preventDefault();
},
_onkeypress:function(e){switch(e.getKeyIdentifier()){case "Up":this._onkeypress_up(e);
break;
case "Down":this._onkeypress_down(e);
break;
case "Left":this._onkeypress_left(e);
break;
case "Right":this._onkeypress_right(e);
break;
default:return;
}e.preventDefault();
},
_onkeypress_up:function(e){var vHover=this.getHoverItem();
var vPrev=vHover?vHover.isFirstChild()?this.getLastActiveChild():vHover.getPreviousActiveSibling([qx.ui.menu.Separator]):this.getLastActiveChild();
this.setHoverItem(vPrev);
},
_onkeypress_down:function(e){var vHover=this.getHoverItem();
var vNext=vHover?vHover.isLastChild()?this.getFirstActiveChild():vHover.getNextActiveSibling([qx.ui.menu.Separator]):this.getFirstActiveChild();
this.setHoverItem(vNext);
},
_onkeypress_left:function(e){var vOpener=this.getOpener();
if(vOpener instanceof qx.ui.menu.Button){var vOpenerParent=this.getOpener().getParentMenu();
vOpenerParent.setOpenItem(null);
vOpenerParent.setHoverItem(vOpener);
vOpenerParent._makeActive();
}else if(vOpener instanceof qx.ui.toolbar.MenuButton){var vToolBar=vOpener.getParentToolBar();
this.getFocusRoot().setActiveChild(vToolBar);
vToolBar._onkeypress(e);
}},
_onkeypress_right:function(e){var vHover=this.getHoverItem();
if(vHover){var vMenu=vHover.getMenu();
if(vMenu){this.setOpenItem(vHover);
vMenu.setHoverItem(vMenu.getFirstActiveChild());
return;
}}else if(!this.getOpenItem()){var vFirst=this.getLayout().getFirstActiveChild();
if(vFirst){vFirst.hasMenu()?this.setOpenItem(vFirst):this.setHoverItem(vFirst);
}}var vOpener=this.getOpener();
if(vOpener instanceof qx.ui.toolbar.MenuButton){var vToolBar=vOpener.getParentToolBar();
this.getFocusRoot().setActiveChild(vToolBar);
vToolBar._onkeypress(e);
}else if(vOpener instanceof qx.ui.menu.Button&&vHover){var vOpenerParent=vOpener.getParentMenu();
while(vOpenerParent&&vOpenerParent instanceof qx.ui.menu.Menu){vOpener=vOpenerParent.getOpener();
if(vOpener instanceof qx.ui.menu.Button){vOpenerParent=vOpener.getParentMenu();
}else{if(vOpener){vOpenerParent=vOpener.getParent();
}break;
}}
if(vOpenerParent instanceof qx.ui.toolbar.Part){vOpenerParent=vOpenerParent.getParent();
}
if(vOpenerParent instanceof qx.ui.toolbar.ToolBar){this.getFocusRoot().setActiveChild(vOpenerParent);
vOpenerParent._onkeypress(e);
}}},
_onkeydown_enter:function(e){var vHover=this.getHoverItem();
if(vHover){vHover.execute();
}qx.ui.menu.Manager.getInstance().update();
}},
destruct:function(){this.hide();
this._disposeObjects("_openTimer",
"_closeTimer",
"_layout");
}});




/* ID: qx.ui.layout.VerticalBoxLayout */
qx.Class.define("qx.ui.layout.VerticalBoxLayout",
{extend:qx.ui.layout.BoxLayout,
properties:{orientation:{refine:true,
init:"vertical"}}});




/* ID: qx.ui.menu.Layout */
qx.Class.define("qx.ui.menu.Layout",
{extend:qx.ui.layout.VerticalBoxLayout,
properties:{anonymous:{refine:true,
init:true},
appearance:{refine:true,
init:"menu-layout"}},
members:{_createLayoutImpl:function(){return new qx.ui.menu.MenuLayoutImpl(this);
}}});




/* ID: qx.ui.menu.MenuLayoutImpl */
qx.Class.define("qx.ui.menu.MenuLayoutImpl",
{extend:qx.ui.layout.impl.VerticalBoxLayoutImpl,
construct:function(vWidget){this.base(arguments,
vWidget);
this.setEnableFlexSupport(false);
},
members:{updateChildrenOnJobQueueFlush:function(vQueue){var vWidget=this.getWidget();
var ch,
chc;
if(vQueue.preferredInnerWidth){var ch=vWidget.getChildren(),
chl=ch.length,
chc;
var sch,
schl;
for(var i=0;i<chl;i++){chc=ch[i];
sch=chc.getChildren();
schl=sch.length;
for(var j=0;j<schl;j++){sch[j].addToLayoutChanges("locationX");
}}}return this.base(arguments,
vQueue);
}}});




/* ID: qx.ui.menu.Separator */
qx.Class.define("qx.ui.menu.Separator",
{extend:qx.ui.layout.CanvasLayout,
construct:function(){this.base(arguments);
this.initHeight();
this.setStyleProperty("fontSize",
"0");
this.setStyleProperty("lineHeight",
"0");
this._line=new qx.ui.basic.Terminator;
this._line.setAnonymous(true);
this._line.setAppearance("menu-separator-line");
this.add(this._line);
this.addEventListener("mousedown",
this._onmousedown);
},
properties:{height:{refine:true,
init:"auto"},
appearance:{refine:true,
init:"menu-separator"}},
members:{hasIcon:qx.lang.Function.returnFalse,
hasLabel:qx.lang.Function.returnFalse,
hasShortcut:qx.lang.Function.returnFalse,
hasMenu:qx.lang.Function.returnFalse,
_onmousedown:function(e){e.stopPropagation();
}},
destruct:function(){this._disposeObjects("_line");
}});




/* ID: qx.ui.menu.Button */
qx.Class.define("qx.ui.menu.Button",
{extend:qx.ui.layout.HorizontalBoxLayout,
construct:function(vLabel,
vIcon,
vCommand,
vMenu){this.base(arguments);
var io=this._iconObject=new qx.ui.basic.Image;
io.setWidth(16);
io.setAnonymous(true);
var lo=this._labelObject=new qx.ui.basic.Label;
lo.setAnonymous(true);
lo.setSelectable(false);
var so=this._shortcutObject=new qx.ui.basic.Label;
so.setAnonymous(true);
so.setSelectable(false);
var ao=this._arrowObject=new qx.ui.basic.Image;
ao.setAppearance("menu-button-arrow");
ao.setAnonymous(true);
if(vLabel!=null){this.setLabel(vLabel);
}
if(vIcon!=null){this.setIcon(vIcon);
}
if(vCommand!=null){this.setCommand(vCommand);
qx.locale.Manager.getInstance().addEventListener("changeLocale",
function(e){this._applyCommand(vCommand,
vCommand);
},
this);
}
if(vMenu!=null){this.setMenu(vMenu);
}this.initMinWidth();
this.initHeight();
this.addEventListener("mouseup",
this._onmouseup);
},
properties:{allowStretchX:{refine:true,
init:true},
appearance:{refine:true,
init:"menu-button"},
minWidth:{refine:true,
init:"auto"},
height:{refine:true,
init:"auto"},
icon:{check:"String",
apply:"_applyIcon",
nullable:true,
themeable:true},
label:{apply:"_applyLabel",
nullable:true,
dispose:true},
menu:{check:"qx.ui.menu.Menu",
nullable:true,
apply:"_applyMenu"}},
members:{_hasIcon:false,
_hasLabel:false,
_hasShortcut:false,
_hasMenu:false,
hasIcon:function(){return this._hasIcon;
},
hasLabel:function(){return this._hasLabel;
},
hasShortcut:function(){return this._hasShortcut;
},
hasMenu:function(){return this._hasMenu;
},
getIconObject:function(){return this._iconObject;
},
getLabelObject:function(){return this._labelObject;
},
getShortcutObject:function(){return this._shortcutObject;
},
getArrowObject:function(){return this._arrowObject;
},
getParentMenu:function(){var vParent=this.getParent();
if(vParent){vParent=vParent.getParent();
if(vParent&&vParent instanceof qx.ui.menu.Menu){return vParent;
}}return null;
},
_createLayoutImpl:function(){return new qx.ui.menu.ButtonLayoutImpl(this);
},
_applyIcon:function(value,
old){this._iconObject.setSource(value);
if(value&&value!==""){this._hasIcon=true;
if(!old||old===""){this.addAtBegin(this._iconObject);
}}else{this._hasIcon=false;
this.remove(this._iconObject);
}},
_applyLabel:function(value,
old){this._labelObject.setText(value);
if(value&&value!==""){this._hasLabel=true;
if(!old||old===""){this.addAt(this._labelObject,
this.getFirstChild()==this._iconObject?1:0);
}}else{this._hasLabel=false;
this.remove(this._labelObject);
}},
_applyCommand:function(value,
old){var vHtml=value?value.toString():"";
this._shortcutObject.setText(vHtml);
if(qx.util.Validation.isValidString(vHtml)){this._hasShortcut=true;
var vOldHtml=old?old.toString():"";
if(qx.util.Validation.isInvalidString(vOldHtml)){if(this.getLastChild()==this._arrowObject){this.addBefore(this._shortcutObject,
this._arrowObject);
}else{this.addAtEnd(this._shortcutObject);
}}}else{this._hasShortcut=false;
this.remove(this._shortcutObject);
}},
_applyMenu:function(value,
old){if(value){this._hasMenu=true;
if(qx.util.Validation.isInvalidObject(old)){this.addAtEnd(this._arrowObject);
}}else{this._hasMenu=false;
this.remove(this._arrowObject);
}},
_onmouseup:function(e){this.execute();
}},
destruct:function(){this._disposeObjects("_iconObject",
"_labelObject",
"_shortcutObject",
"_arrowObject");
}});




/* ID: qx.ui.menu.ButtonLayoutImpl */
qx.Class.define("qx.ui.menu.ButtonLayoutImpl",
{extend:qx.ui.layout.impl.HorizontalBoxLayoutImpl,
construct:function(vWidget){this.base(arguments,
vWidget);
this.setEnableFlexSupport(false);
},
members:{computeChildrenNeededWidth:function(){var vWidget=this.getWidget();
var vMenu=vWidget.getParent().getParent();
return vMenu.getMenuButtonNeededWidth();
},
updateSelfOnChildOuterWidthChange:function(vChild){var vWidget=this.getWidget();
var vMenu=vWidget.getParent().getParent();
switch(vChild){case vWidget._iconObject:vMenu._invalidateMaxIconWidth();
break;
case vWidget._labelObject:vMenu._invalidateMaxLabelWidth();
break;
case vWidget._shortcutObject:vMenu._invalidateMaxShortcutWidth();
break;
case vWidget._arrowObject:vMenu._invalidateMaxArrowWidth();
break;
}return this.base(arguments,
vChild);
},
layoutChild_locationX:function(vChild,
vJobs){var vWidget=this.getWidget();
var vMenu=vWidget.getParent().getParent();
var vPos=null;
switch(vChild){case vWidget._iconObject:vPos=vMenu.getIconPosition();
break;
case vWidget._labelObject:vPos=vMenu.getLabelPosition();
break;
case vWidget._shortcutObject:vPos=vMenu.getShortcutPosition();
break;
case vWidget._arrowObject:vPos=vMenu.getArrowPosition();
break;
}
if(vPos!=null){vPos+=vWidget.getPaddingLeft();
vChild._renderRuntimeLeft(vPos);
}}}});




/* ID: qx.ui.resizer.MResizable */
qx.Mixin.define("qx.ui.resizer.MResizable",
{construct:function(child){this._frame=new qx.ui.basic.Terminator;
this._frame.setAppearance("resizer-frame");
this.addEventListener("mousedown",
this._onmousedown);
this.addEventListener("mouseup",
this._onmouseup);
this.addEventListener("mousemove",
this._onmousemove);
},
properties:{resizableWest:{check:"Boolean",
init:true,
apply:"_applyResizable"},
resizableNorth:{check:"Boolean",
init:true,
apply:"_applyResizable"},
resizableEast:{check:"Boolean",
init:true,
apply:"_applyResizable"},
resizableSouth:{check:"Boolean",
init:true,
apply:"_applyResizable"},
resizable:{group:["resizableNorth",
"resizableEast",
"resizableSouth",
"resizableWest"],
mode:"shorthand"},
resizeMethod:{init:"frame",
check:["opaque",
"lazyopaque",
"frame",
"translucent"],
event:"changeResizeMethod"}},
members:{isResizable:function(){return this.getResizableWest()||this.getResizableEast()||this.getResizableNorth()||this.getResizableSouth();
},
getResizable:function(){return this.isResizable();
},
_applyResizable:function(value,
old){},
_onmousedown:function(e){if(this._resizeNorth||this._resizeSouth||this._resizeWest||this._resizeEast){this.setCapture(true);
this.getTopLevelWidget().setGlobalCursor(this.getCursor());
var el=this.getElement();
var pa=this._getResizeParent();
var pl=pa.getElement();
var paLoc=qx.bom.element.Location.get(pl,
"scroll");
var elLoc=qx.bom.element.Location.get(el);
switch(this.getResizeMethod()){case "translucent":this.setOpacity(0.5);
break;
case "frame":var f=this._frame;
if(f.getParent()!=pa){f.setParent(pa);
qx.ui.core.Widget.flushGlobalQueues();
}f._renderRuntimeLeft(elLoc.left-paLoc.left);
f._renderRuntimeTop(elLoc.top-paLoc.top);
f._renderRuntimeWidth(el.offsetWidth);
f._renderRuntimeHeight(el.offsetHeight);
f.setZIndex(this.getZIndex()+1);
break;
}var s=this._resizeSession={};
var minRef=this._getMinSizeReference();
if(this._resizeWest){s.boxWidth=el.offsetWidth;
s.boxRight=elLoc.right;
}
if(this._resizeWest||this._resizeEast){s.boxLeft=elLoc.left;
s.parentContentLeft=paLoc.left;
s.parentContentRight=paLoc.right;
s.minWidth=minRef.getMinWidthValue();
s.maxWidth=minRef.getMaxWidthValue();
}
if(this._resizeNorth){s.boxHeight=el.offsetHeight;
s.boxBottom=elLoc.bottom;
}
if(this._resizeNorth||this._resizeSouth){s.boxTop=elLoc.top;
s.parentContentTop=paLoc.top;
s.parentContentBottom=paLoc.bottom;
s.minHeight=minRef.getMinHeightValue();
s.maxHeight=minRef.getMaxHeightValue();
}}else{delete this._resizeSession;
}e.stopPropagation();
},
_onmouseup:function(e){var s=this._resizeSession;
if(s){this.setCapture(false);
this.getTopLevelWidget().setGlobalCursor(null);
switch(this.getResizeMethod()){case "frame":var o=this._frame;
if(!(o&&o.getParent())){break;
}case "lazyopaque":if(s.lastLeft!=null){this.setLeft(s.lastLeft);
}
if(s.lastTop!=null){this.setTop(s.lastTop);
}
if(s.lastWidth!=null){this._changeWidth(s.lastWidth);
}
if(s.lastHeight!=null){this._changeHeight(s.lastHeight);
}
if(this.getResizeMethod()=="frame"){this._frame.setParent(null);
}break;
case "translucent":this.setOpacity(null);
break;
}delete this._resizeSession;
}e.stopPropagation();
},
_near:function(p,
e){return e>(p-5)&&e<(p+5);
},
_onmousemove:function(e){if(this._disableResize){return;
}var s=this._resizeSession;
if(s){if(this._resizeWest){s.lastWidth=qx.lang.Number.limit(s.boxWidth+s.boxLeft-Math.max(e.getPageX(),
s.parentContentLeft),
s.minWidth,
s.maxWidth);
s.lastLeft=s.boxRight-s.lastWidth-s.parentContentLeft;
}else if(this._resizeEast){s.lastWidth=qx.lang.Number.limit(Math.min(e.getPageX(),
s.parentContentRight)-s.boxLeft,
s.minWidth,
s.maxWidth);
}
if(this._resizeNorth){s.lastHeight=qx.lang.Number.limit(s.boxHeight+s.boxTop-Math.max(e.getPageY(),
s.parentContentTop),
s.minHeight,
s.maxHeight);
s.lastTop=s.boxBottom-s.lastHeight-s.parentContentTop;
}else if(this._resizeSouth){s.lastHeight=qx.lang.Number.limit(Math.min(e.getPageY(),
s.parentContentBottom)-s.boxTop,
s.minHeight,
s.maxHeight);
}
switch(this.getResizeMethod()){case "opaque":case "translucent":if(this._resizeWest||this._resizeEast){this.setWidth(s.lastWidth);
if(this._resizeWest){this.setLeft(s.lastLeft);
}}
if(this._resizeNorth||this._resizeSouth){this.setHeight(s.lastHeight);
if(this._resizeNorth){this.setTop(s.lastTop);
}}break;
default:var o=this.getResizeMethod()=="frame"?this._frame:this;
if(this._resizeWest||this._resizeEast){o._renderRuntimeWidth(s.lastWidth);
if(this._resizeWest){o._renderRuntimeLeft(s.lastLeft);
}}
if(this._resizeNorth||this._resizeSouth){o._renderRuntimeHeight(s.lastHeight);
if(this._resizeNorth){o._renderRuntimeTop(s.lastTop);
}}}}else{var resizeMode="";
var el=this.getElement();
this._resizeNorth=this._resizeSouth=this._resizeWest=this._resizeEast=false;
var elLoc=qx.bom.element.Location.get(el);
if(this._near(elLoc.top,
e.getPageY())){if(this.getResizableNorth()){resizeMode="n";
this._resizeNorth=true;
}}else if(this._near(elLoc.bottom,
e.getPageY())){if(this.getResizableSouth()){resizeMode="s";
this._resizeSouth=true;
}}
if(this._near(elLoc.left,
e.getPageX())){if(this.getResizableWest()){resizeMode+="w";
this._resizeWest=true;
}}else if(this._near(elLoc.right,
e.getPageX())){if(this.getResizableEast()){resizeMode+="e";
this._resizeEast=true;
}}
if(this._resizeNorth||this._resizeSouth||this._resizeWest||this._resizeEast){this.setCursor(resizeMode+"-resize");
}else{this.resetCursor();
}}e.stopPropagation();
}},
destruct:function(){this._disposeObjects("_frame");
}});




/* ID: qx.ui.resizer.IResizable */
qx.Interface.define("qx.ui.resizer.IResizable",
{members:{_changeWidth:function(newWidth){return true;
},
_changeHeight:function(newHeight){return true;
},
_getResizeParent:function(){return true;
},
_getMinSizeReference:function(){return true;
}}});




/* ID: qx.ui.resizer.ResizablePopup */
qx.Class.define("qx.ui.resizer.ResizablePopup",
{extend:qx.ui.popup.Popup,
include:qx.ui.resizer.MResizable,
implement:qx.ui.resizer.IResizable,
construct:function(){this.base(arguments);
this.initMinWidth();
this.initMinHeight();
this.initWidth();
this.initHeight();
},
properties:{appearance:{refine:true,
init:"resizer"},
minWidth:{refine:true,
init:"auto"},
minHeight:{refine:true,
init:"auto"},
width:{refine:true,
init:"auto"},
height:{refine:true,
init:"auto"}},
members:{_changeWidth:function(value){this.setWidth(value);
},
_changeHeight:function(value){this.setHeight(value);
},
_getResizeParent:function(){return this.getParent();
},
_getMinSizeReference:function(){return this;
}}});




/* ID: qx.ui.window.Window */
qx.Class.define("qx.ui.window.Window",
{extend:qx.ui.resizer.ResizablePopup,
construct:function(vCaption,
vIcon,
vWindowManager){this.base(arguments);
this.setWindowManager(vWindowManager||qx.ui.window.Window.getDefaultWindowManager());
var l=this._layout=new qx.ui.layout.VerticalBoxLayout;
l.setEdge(0);
this.add(l);
var cb=this._captionBar=new qx.ui.layout.HorizontalBoxLayout;
cb.setAppearance("window-captionbar");
cb.setHeight("auto");
cb.setOverflow("hidden");
l.add(cb);
var ci=this._captionIcon=new qx.ui.basic.Image;
ci.setAppearance("window-captionbar-icon");
cb.add(ci);
var ct=this._captionTitle=new qx.ui.basic.Label(vCaption);
ct.setAppearance("window-captionbar-title");
ct.setSelectable(false);
cb.add(ct);
var cf=this._captionFlex=new qx.ui.basic.HorizontalSpacer;
cb.add(cf);
var bm=this._minimizeButton=new qx.ui.form.Button;
bm.setAppearance("window-captionbar-minimize-button");
bm.setTabIndex(-1);
bm.addEventListener("execute",
this._onminimizebuttonclick,
this);
bm.addEventListener("mousedown",
this._onbuttonmousedown,
this);
cb.add(bm);
var br=this._restoreButton=new qx.ui.form.Button;
br.setAppearance("window-captionbar-restore-button");
br.setTabIndex(-1);
br.addEventListener("execute",
this._onrestorebuttonclick,
this);
br.addEventListener("mousedown",
this._onbuttonmousedown,
this);
var bx=this._maximizeButton=new qx.ui.form.Button;
bx.setAppearance("window-captionbar-maximize-button");
bx.setTabIndex(-1);
bx.addEventListener("execute",
this._onmaximizebuttonclick,
this);
bx.addEventListener("mousedown",
this._onbuttonmousedown,
this);
cb.add(bx);
var bc=this._closeButton=new qx.ui.form.Button;
bc.setAppearance("window-captionbar-close-button");
bc.setTabIndex(-1);
bc.addEventListener("execute",
this._onclosebuttonclick,
this);
bc.addEventListener("mousedown",
this._onbuttonmousedown,
this);
cb.add(bc);
var p=this._pane=new qx.ui.layout.CanvasLayout;
p.setHeight("1*");
p.setOverflow("hidden");
l.add(p);
var sb=this._statusBar=new qx.ui.layout.HorizontalBoxLayout;
sb.setAppearance("window-statusbar");
sb.setHeight("auto");
var st=this._statusText=new qx.ui.basic.Label("Ready");
st.setAppearance("window-statusbar-text");
st.setSelectable(false);
sb.add(st);
if(vCaption!=null){this.setCaption(vCaption);
}
if(vIcon!=null){this.setIcon(vIcon);
}this.setAutoHide(false);
this.addEventListener("mousedown",
this._onwindowmousedown);
this.addEventListener("click",
this._onwindowclick);
cb.addEventListener("mousedown",
this._oncaptionmousedown,
this);
cb.addEventListener("mouseup",
this._oncaptionmouseup,
this);
cb.addEventListener("mousemove",
this._oncaptionmousemove,
this);
cb.addEventListener("dblclick",
this._oncaptiondblblick,
this);
this.remapChildrenHandlingTo(this._pane);
},
statics:{getDefaultWindowManager:function(){if(!qx.ui.window.Window._defaultWindowManager){qx.ui.window.Window._defaultWindowManager=new qx.ui.window.Manager;
}return qx.ui.window.Window._defaultWindowManager;
}},
properties:{appearance:{refine:true,
init:"window"},
windowManager:{check:"qx.ui.window.Manager",
event:"changeWindowManager"},
active:{check:"Boolean",
init:false,
apply:"_applyActive",
event:"changeActive"},
modal:{check:"Boolean",
init:false,
apply:"_applyModal",
event:"changeModal"},
mode:{check:["minimized",
"maximized"],
init:null,
nullable:true,
apply:"_applyMode",
event:"changeMode"},
opener:{check:"qx.ui.core.Widget"},
caption:{apply:"_applyCaption",
event:"changeCaption",
dispose:true},
icon:{check:"String",
nullable:true,
apply:"_applyIcon",
event:"changeIcon"},
status:{check:"String",
init:"Ready",
apply:"_applyStatus",
event:"changeStatus"},
showClose:{check:"Boolean",
init:true,
apply:"_applyShowClose"},
showMaximize:{check:"Boolean",
init:true,
apply:"_applyShowMaximize"},
showMinimize:{check:"Boolean",
init:true,
apply:"_applyShowMinimize"},
showStatusbar:{check:"Boolean",
init:false,
apply:"_applyShowStatusbar"},
allowClose:{check:"Boolean",
init:true,
apply:"_applyAllowClose"},
allowMaximize:{check:"Boolean",
init:true,
apply:"_applyAllowMaximize"},
allowMinimize:{check:"Boolean",
init:true,
apply:"_applyAllowMinimize"},
showCaption:{check:"Boolean",
init:true,
apply:"_applyShowCaption"},
showIcon:{check:"Boolean",
init:true,
apply:"_applyShowIcon"},
moveable:{check:"Boolean",
init:true,
event:"changeMoveable"},
moveMethod:{check:["opaque",
"frame",
"translucent"],
init:"opaque",
event:"changeMoveMethod"}},
members:{getPane:function(){return this._pane;
},
getCaptionBar:function(){return this._captionBar;
},
getStatusBar:function(){return this._statusBar;
},
close:function(){this.hide();
},
open:function(vOpener){if(vOpener!=null){this.setOpener(vOpener);
}
if(this.getCentered()){this.centerToBrowser();
}this.show();
},
focus:function(){this.setActive(true);
},
blur:function(){this.setActive(false);
},
maximize:function(){this.setMode("maximized");
},
minimize:function(){this.setMode("minimized");
},
restore:function(){this.setMode(null);
},
_beforeAppear:function(){qx.ui.layout.CanvasLayout.prototype._beforeAppear.call(this);
qx.ui.popup.PopupManager.getInstance().update();
qx.event.handler.EventHandler.getInstance().setFocusRoot(this);
this.getWindowManager().add(this);
this._makeActive();
},
_beforeDisappear:function(){qx.ui.layout.CanvasLayout.prototype._beforeDisappear.call(this);
var vFocusRoot=qx.event.handler.EventHandler.getInstance().getFocusRoot();
if(vFocusRoot==this||this.contains(vFocusRoot)){qx.event.handler.EventHandler.getInstance().setFocusRoot(null);
}var vWidget=qx.event.handler.EventHandler.getInstance().getCaptureWidget();
if(vWidget&&this.contains(vWidget)){vWidget.setCapture(false);
}this.getWindowManager().remove(this);
this._makeInactive();
},
_minZIndex:1e5,
_sendTo:function(){var vAll=qx.lang.Object.getValues(this.getWindowManager().getAll()).sort(qx.util.Compare.byZIndex);
var vLength=vAll.length;
var vIndex=this._minZIndex;
for(var i=0;i<vLength;i++){vAll[i].setZIndex(vIndex++);
}},
_applyActive:function(value,
old){if(old){if(this.getFocused()){this.setFocused(false);
}
if(this.getWindowManager().getActiveWindow()==this){this.getWindowManager().setActiveWindow(null);
}this.removeState("active");
this._captionBar.removeState("active");
this._minimizeButton.removeState("active");
this._restoreButton.removeState("active");
this._maximizeButton.removeState("active");
this._closeButton.removeState("active");
}else{if(!this.getFocusedChild()){this.setFocused(true);
}this.getWindowManager().setActiveWindow(this);
this.bringToFront();
this.addState("active");
this._captionBar.addState("active");
this._minimizeButton.addState("active");
this._restoreButton.addState("active");
this._maximizeButton.addState("active");
this._closeButton.addState("active");
}},
_applyModal:function(value,
old){if(this._initialLayoutDone&&this.getVisibility()&&this.getDisplay()){var vTop=this.getTopLevelWidget();
value?vTop.block(this):vTop.release(this);
}},
_applyAllowClose:function(value,
old){this._closeButtonManager();
},
_applyAllowMaximize:function(value,
old){this._maximizeButtonManager();
},
_applyAllowMinimize:function(value,
old){this._minimizeButtonManager();
},
_applyMode:function(value,
old){switch(value){case "minimized":this._disableResize=true;
this._minimize();
break;
case "maximized":this._disableResize=true;
this._maximize();
break;
default:delete this._disableResize;
switch(old){case "maximized":this._restoreFromMaximized();
break;
case "minimized":this._restoreFromMinimized();
break;
}}},
_applyShowCaption:function(value,
old){if(value){this._captionBar.addAt(this._captionTitle,
this.getShowIcon()?1:0);
}else{this._captionBar.remove(this._captionTitle);
}},
_applyShowIcon:function(value,
old){if(value){this._captionBar.addAtBegin(this._captionIcon);
}else{this._captionBar.remove(this._captionIcon);
}},
_applyShowStatusbar:function(value,
old){if(value){this._layout.addAtEnd(this._statusBar);
}else{this._layout.remove(this._statusBar);
}},
_applyShowClose:function(value,
old){if(value){this._captionBar.addAtEnd(this._closeButton);
}else{this._captionBar.remove(this._closeButton);
}},
_applyShowMaximize:function(value,
old){if(value){var t=this.getMode()=="maximized"?this._restoreButton:this._maximizeButton;
if(this.getShowMinimize()){this._captionBar.addAfter(t,
this._minimizeButton);
}else{this._captionBar.addAfter(t,
this._captionFlex);
}}else{this._captionBar.remove(this._maximizeButton);
this._captionBar.remove(this._restoreButton);
}},
_applyShowMinimize:function(value,
old){if(value){this._captionBar.addAfter(this._minimizeButton,
this._captionFlex);
}else{this._captionBar.remove(this._minimizeButton);
}},
_minimizeButtonManager:function(){this.getAllowMinimize()===false?this._minimizeButton.setEnabled(false):this._minimizeButton.resetEnabled();
},
_closeButtonManager:function(){this.getAllowClose()===false?this._closeButton.setEnabled(false):this._closeButton.resetEnabled();
},
_maximizeButtonManager:function(){var b=this.getAllowMaximize()&&this.getResizable()&&this._computedMaxWidthTypeNull&&this._computedMaxHeightTypeNull;
if(this._maximizeButton){b===false?this._maximizeButton.setEnabled(false):this._maximizeButton.resetEnabled();
}
if(this._restoreButton){b===false?this._restoreButton.setEnabled(false):this._restoreButton.resetEnabled();
}},
_applyStatus:function(value,
old){this._statusText.setText(value);
},
_applyMaxWidth:function(value,
old){this.base(arguments,
value);
this._maximizeButtonManager();
},
_applyMaxHeight:function(value,
old){this.base(arguments,
value);
this._maximizeButtonManager();
},
_applyResizable:function(value,
old){this._maximizeButtonManager();
},
_applyCaption:function(value,
old){this._captionTitle.setText(value);
},
_applyIcon:function(value,
old){this._captionIcon.setSource(value);
},
_minimize:function(){this.blur();
this.hide();
},
_restoreFromMaximized:function(){this.setLeft(this._previousLeft?this._previousLeft:null);
this.setWidth(this._previousWidth?this._previousWidth:null);
this.setRight(this._previousRight?this._previousRight:null);
this.setTop(this._previousTop?this._previousTop:null);
this.setHeight(this._previousHeight?this._previousHeight:null);
this.setBottom(this._previousBottom?this._previousBottom:null);
this.removeState("maximized");
if(this.getShowMaximize()){var cb=this._captionBar;
var v=cb.indexOf(this._restoreButton);
cb.remove(this._restoreButton);
cb.addAt(this._maximizeButton,
v);
}this.focus();
},
_restoreFromMinimized:function(){if(this.hasState("maximized")){this.setMode("maximized");
}this.show();
this.focus();
},
_maximize:function(){if(this.hasState("maximized")){return;
}this._previousLeft=this.getLeft();
this._previousWidth=this.getWidth();
this._previousRight=this.getRight();
this._previousTop=this.getTop();
this._previousHeight=this.getHeight();
this._previousBottom=this.getBottom();
this.setWidth(null);
this.setLeft(0);
this.setRight(0);
this.setHeight(null);
this.setTop(0);
this.setBottom(0);
this.addState("maximized");
if(this.getShowMaximize()){var cb=this._captionBar;
var v=cb.indexOf(this._maximizeButton);
cb.remove(this._maximizeButton);
cb.addAt(this._restoreButton,
v);
}this.focus();
},
_onwindowclick:function(e){e.stopPropagation();
},
_onwindowmousedown:function(e){this.focus();
},
_onbuttonmousedown:function(e){e.stopPropagation();
},
_onminimizebuttonclick:function(e){this.minimize();
this._minimizeButton.removeState("pressed");
this._minimizeButton.removeState("abandoned");
this._minimizeButton.removeState("over");
e.stopPropagation();
},
_onrestorebuttonclick:function(e){this.restore();
this._restoreButton.removeState("pressed");
this._restoreButton.removeState("abandoned");
this._restoreButton.removeState("over");
e.stopPropagation();
},
_onmaximizebuttonclick:function(e){this.maximize();
this._maximizeButton.removeState("pressed");
this._maximizeButton.removeState("abandoned");
this._maximizeButton.removeState("over");
e.stopPropagation();
},
_onclosebuttonclick:function(e){this.close();
this._closeButton.removeState("pressed");
this._closeButton.removeState("abandoned");
this._closeButton.removeState("over");
e.stopPropagation();
},
_oncaptionmousedown:function(e){if(!e.isLeftButtonPressed()||!this.getMoveable()||this.getMode()!=null){return;
}this._captionBar.setCapture(true);
var el=this.getElement();
var pa=this.getParent();
var pl=pa.getElement();
var paLoc=qx.bom.element.Location.get(pl,
"scroll");
var elLoc=qx.bom.element.Location.get(el);
this._dragSession={offsetX:e.getPageX()-elLoc.left+paLoc.left,
offsetY:e.getPageY()-elLoc.top+paLoc.top,
parentAvailableAreaLeft:paLoc.left+5,
parentAvailableAreaTop:paLoc.top+5,
parentAvailableAreaRight:paLoc.right-5,
parentAvailableAreaBottom:paLoc.bottom-5};
switch(this.getMoveMethod()){case "translucent":this.setOpacity(0.5);
break;
case "frame":var f=this._frame;
if(f.getParent()!=this.getParent()){f.setParent(this.getParent());
qx.ui.core.Widget.flushGlobalQueues();
}f._renderRuntimeLeft(elLoc.left-paLoc.left);
f._renderRuntimeTop(elLoc.top-paLoc.top);
f._renderRuntimeWidth(el.offsetWidth);
f._renderRuntimeHeight(el.offsetHeight);
f.setZIndex(this.getZIndex()+1);
break;
}},
_oncaptionmouseup:function(e){var s=this._dragSession;
if(!s){return;
}this._captionBar.setCapture(false);
if(s.lastX!=null){this.setLeft(s.lastX);
}
if(s.lastY!=null){this.setTop(s.lastY);
}switch(this.getMoveMethod()){case "translucent":this.setOpacity(null);
break;
case "frame":this._frame.setParent(null);
break;
}delete this._dragSession;
},
_oncaptionmousemove:function(e){var s=this._dragSession;
if(!s||!this._captionBar.getCapture()){return;
}if(!qx.lang.Number.isBetweenRange(e.getPageX(),
s.parentAvailableAreaLeft,
s.parentAvailableAreaRight)||!qx.lang.Number.isBetweenRange(e.getPageY(),
s.parentAvailableAreaTop,
s.parentAvailableAreaBottom)){return;
}var o=this.getMoveMethod()=="frame"?this._frame:this;
o._renderRuntimeLeft(s.lastX=e.getPageX()-s.offsetX);
o._renderRuntimeTop(s.lastY=e.getPageY()-s.offsetY);
},
_oncaptiondblblick:function(e){if(!this._maximizeButton.getEnabled()){return;
}return this.getMode()=="maximized"?this.restore():this.maximize();
}},
destruct:function(){this._disposeObjects("_layout",
"_captionBar",
"_captionIcon",
"_captionTitle",
"_captionFlex",
"_closeButton",
"_minimizeButton",
"_maximizeButton",
"_restoreButton",
"_pane",
"_statusBar",
"_statusText");
}});




/* ID: qx.ui.basic.HorizontalSpacer */
qx.Class.define("qx.ui.basic.HorizontalSpacer",
{extend:qx.ui.basic.Terminator,
construct:function(){this.base(arguments);
this.initWidth();
},
properties:{width:{refine:true,
init:"1*"}}});




/* ID: qx.ui.window.Manager */
qx.Class.define("qx.ui.window.Manager",
{extend:qx.util.manager.Object,
properties:{activeWindow:{check:"Object",
nullable:true,
apply:"_applyActiveWindow"}},
members:{_applyActiveWindow:function(value,
old){qx.ui.popup.PopupManager.getInstance().update();
if(old){old.setActive(false);
}
if(value){value.setActive(true);
}
if(old&&old.getModal()){old.getTopLevelWidget().release(old);
}
if(value&&value.getModal()){value.getTopLevelWidget().block(value);
}},
update:function(){var vWindow,
vHashCode;
var vAll=this.getAll();
for(var vHashCode in vAll){vWindow=vAll[vHashCode];
if(!vWindow.getAutoHide()){continue;
}vWindow.hide();
}},
compareWindows:function(w1,
w2){switch(w1.getWindowManager().getActiveWindow()){case w1:return 1;
case w2:return -1;
}return w1.getZIndex()-w2.getZIndex();
},
add:function(vWindow){this.base(arguments,
vWindow);
this.setActiveWindow(vWindow);
},
remove:function(vWindow){this.base(arguments,
vWindow);
if(this.getActiveWindow()==vWindow){var a=[];
for(var i in this._objects){a.push(this._objects[i]);
}var l=a.length;
if(l==0){this.setActiveWindow(null);
}else if(l==1){this.setActiveWindow(a[0]);
}else if(l>1){a.sort(this.compareWindows);
this.setActiveWindow(a[l-1]);
}}}}});




/* ID: qx.ui.form.TextField */
qx.Class.define("qx.ui.form.TextField",
{extend:qx.ui.basic.Terminator,
construct:function(value){this.base(arguments);
if(value!=null){this.setValue(value);
}this.initHideFocus();
this.initWidth();
this.initHeight();
this.initTabIndex();
this.initSpellCheck();
this.__oninput=qx.lang.Function.bindEvent(this._oninputDom,
this);
this.addEventListener("blur",
this._onblur);
this.addEventListener("focus",
this._onfocus);
this.addEventListener("input",
this._oninput);
},
statics:{createRegExpValidator:function(vRegExp){return function(s){return vRegExp.test(s);
};
}},
events:{"input":"qx.event.type.DataEvent"},
properties:{allowStretchX:{refine:true,
init:true},
allowStretchY:{refine:true,
init:false},
appearance:{refine:true,
init:"text-field"},
tabIndex:{refine:true,
init:1},
hideFocus:{refine:true,
init:true},
width:{refine:true,
init:"auto"},
height:{refine:true,
init:"auto"},
selectable:{refine:true,
init:true},
value:{init:"",
nullable:true,
event:"changeValue",
apply:"_applyValue",
dispose:true},
textAlign:{check:["left",
"center",
"right",
"justify"],
nullable:true,
themeable:true,
apply:"_applyTextAlign"},
spellCheck:{check:"Boolean",
init:false,
apply:"_applySpellCheck"},
liveUpdate:{check:"Boolean",
init:false},
maxLength:{check:"Integer",
apply:"_applyMaxLength",
nullable:true},
readOnly:{check:"Boolean",
apply:"_applyReadOnly",
init:false},
validator:{check:"Function",
event:"changeValidator",
nullable:true}},
members:{_inputTag:"input",
_inputType:"text",
_inputOverflow:"hidden",
_applyElement:function(value,
old){this.base(arguments,
value,
old);
if(value){var inp=this._inputElement=document.createElement(this._inputTag);
if(this._inputType){inp.type=this._inputType;
}inp.autoComplete="off";
inp.setAttribute("autoComplete",
"off");
inp.disabled=this.getEnabled()===false;
inp.readOnly=this.getReadOnly();
inp.value=this.getValue()?this.getValue():"";
if(this.getMaxLength()!=null){inp.maxLength=this.getMaxLength();
}var istyle=inp.style;
istyle.padding=istyle.margin=0;
istyle.border="0 none";
istyle.background="transparent";
istyle.overflow=this._inputOverflow;
istyle.outline="none";
istyle.resize="none";
istyle.WebkitAppearance="none";
istyle.MozAppearance="none";
if(qx.core.Variant.isSet("qx.client",
"gecko|opera|webkit")){istyle.margin="1px 0";
}this._renderFont();
this._renderTextColor();
this._renderTextAlign();
this._renderCursor();
this._renderSpellCheck();
if(qx.core.Variant.isSet("qx.client",
"mshtml")){inp.onpropertychange=this.__oninput;
}else{inp.addEventListener("input",
this.__oninput,
false);
}value.appendChild(inp);
}},
_postApply:function(){this._syncFieldWidth();
this._syncFieldHeight();
},
_changeInnerWidth:function(value,
old){this._syncFieldWidth();
},
_changeInnerHeight:function(value,
old){this._syncFieldHeight();
},
_syncFieldWidth:function(){this._inputElement.style.width=this.getInnerWidth()+"px";
},
_syncFieldHeight:function(){this._inputElement.style.height=(this.getInnerHeight()-2)+"px";
},
_applyCursor:function(value,
old){if(this._inputElement){this._renderCursor();
}},
_renderCursor:function(){var style=this._inputElement.style;
var value=this.getCursor();
if(value){if(value=="pointer"&&qx.core.Client.getInstance().isMshtml()){style.cursor="hand";
}else{style.cursor=value;
}}else{style.cursor="";
}},
_applyTextAlign:function(value,
old){if(this._inputElement){this._renderTextAlign();
}},
_renderTextAlign:function(){this._inputElement.style.textAlign=this.getTextAlign()||"";
},
_applySpellCheck:function(value,
old){if(this._inputElement){this._renderSpellCheck();
}},
_renderSpellCheck:function(){this._inputElement.spellcheck=this.getSpellCheck();
},
_applyEnabled:function(value,
old){if(this._inputElement){this._inputElement.disabled=value===false;
}return this.base(arguments,
value,
old);
},
_applyValue:function(value,
old){this._inValueProperty=true;
if(this._inputElement){if(value===null){value="";
}
if(this._inputElement.value!==value){this._inputElement.value=value;
}}delete this._inValueProperty;
},
_applyMaxLength:function(value,
old){if(this._inputElement){this._inputElement.maxLength=value==null?"":value;
}},
_applyReadOnly:function(value,
old){if(this._inputElement){this._inputElement.readOnly=value;
}
if(value){this.addState("readonly");
}else{this.removeState("readonly");
}},
_applyTextColor:function(value,
old){qx.theme.manager.Color.getInstance().connect(this._styleTextColor,
this,
value);
},
_styleTextColor:function(value){this.__textColor=value;
this._renderTextColor();
},
_renderTextColor:function(){var inp=this._inputElement;
if(inp){inp.style.color=this.__textColor||"";
}},
_applyFont:function(value,
old){qx.theme.manager.Font.getInstance().connect(this._styleFont,
this,
value);
},
_styleFont:function(value){this.__font=value;
this._renderFont();
},
_renderFont:function(){var inp=this._inputElement;
if(inp){var value=this.__font;
value?value.renderElement(inp):qx.ui.core.Font.resetElement(inp);
}},
_visualizeFocus:function(){this.base(arguments);
if(!qx.event.handler.FocusHandler.mouseFocus&&this.getEnableElementFocus()){try{this._inputElement.focus();
}catch(ex){}}},
_visualizeBlur:function(){this.base(arguments);
if(!qx.event.handler.FocusHandler.mouseFocus){try{this._inputElement.blur();
}catch(ex){}}},
getComputedValue:function(){if(this._inputElement){return this._inputElement.value;
}return this.getValue();
},
getInputElement:function(){return this._inputElement||null;
},
isValid:function(){var vValidator=this.getValidator();
return !vValidator||vValidator(this.getValue());
},
isComputedValid:function(){var vValidator=this.getValidator();
return !vValidator||vValidator(this.getComputedValue());
},
_computePreferredInnerWidth:function(){return 120;
},
_computePreferredInnerHeight:function(){return 16;
},
_ieFirstInputFix:qx.core.Variant.select("qx.client",
{"mshtml":function(){this._inValueProperty=true;
this._inputElement.value=this.getValue()===null?"":this.getValue();
this._firstInputFixApplied=true;
delete this._inValueProperty;
},
"default":null}),
_afterAppear:qx.core.Variant.select("qx.client",
{"mshtml":function(){this.base(arguments);
if(!this._firstInputFixApplied&&this._inputElement){qx.client.Timer.once(this._ieFirstInputFix,
this,
1);
}},
"default":function(){this.base(arguments);
}}),
_firstInputFixApplied:false,
_textOnFocus:null,
_oninputDom:qx.core.Variant.select("qx.client",
{"mshtml":function(e){if(!this._inValueProperty&&e.propertyName==="value"){this.createDispatchDataEvent("input",
this.getComputedValue());
}},
"default":function(e){this.createDispatchDataEvent("input",
this.getComputedValue());
}}),
_ontabfocus:function(){this.selectAll();
},
_onfocus:function(){this._textOnFocus=this.getComputedValue();
},
_onblur:function(){var vValue=this.getComputedValue().toString();
if(this._textOnFocus!=vValue){this.setValue(vValue);
}this.setSelectionLength(0);
},
_oninput:function(){if(!this.isLiveUpdate()){return;
}var vValue=this.getComputedValue().toString();
this.setValue(vValue);
},
__getRange:qx.core.Variant.select("qx.client",
{"mshtml":function(){this._visualPropertyCheck();
return this._inputElement.createTextRange();
},
"default":null}),
__getSelectionRange:qx.core.Variant.select("qx.client",
{"mshtml":function(){this._visualPropertyCheck();
return this.getTopLevelWidget().getDocumentElement().selection.createRange();
},
"default":null}),
setSelectionStart:qx.core.Variant.select("qx.client",
{"mshtml":function(vStart){this._visualPropertyCheck();
var vText=this._inputElement.value;
var i=0;
while(i<vStart){i=vText.indexOf("\r\n",
i);
if(i==-1){break;
}vStart--;
i++;
}var vRange=this.__getRange();
vRange.collapse();
vRange.move("character",
vStart);
vRange.select();
},
"default":function(vStart){this._visualPropertyCheck();
this._inputElement.selectionStart=vStart;
}}),
getSelectionStart:qx.core.Variant.select("qx.client",
{"mshtml":function(){this._visualPropertyCheck();
var vSelectionRange=this.__getSelectionRange();
if(!this._inputElement.contains(vSelectionRange.parentElement())){return -1;
}var vRange=this.__getRange();
var len=this._inputElement.value.length;
vRange.moveToBookmark(vSelectionRange.getBookmark());
vRange.moveEnd('character',
len);
return len-vRange.text.length;
},
"default":function(){this._visualPropertyCheck();
return this._inputElement.selectionStart;
}}),
setSelectionLength:qx.core.Variant.select("qx.client",
{"mshtml":function(vLength){this._visualPropertyCheck();
var vSelectionRange=this.__getSelectionRange();
if(!this._inputElement.contains(vSelectionRange.parentElement())){return;
}vSelectionRange.collapse();
vSelectionRange.moveEnd("character",
vLength);
vSelectionRange.select();
},
"default":function(vLength){this._visualPropertyCheck();
var el=this._inputElement;
if(qx.util.Validation.isValidString(el.value)&&this.getVisibility()){el.selectionEnd=el.selectionStart+vLength;
}}}),
getSelectionLength:qx.core.Variant.select("qx.client",
{"mshtml":function(){this._visualPropertyCheck();
var vSelectionRange=this.__getSelectionRange();
if(!this._inputElement.contains(vSelectionRange.parentElement())){return 0;
}return vSelectionRange.text.length;
},
"default":function(){this._visualPropertyCheck();
var el=this._inputElement;
return el.selectionEnd-el.selectionStart;
}}),
setSelectionText:qx.core.Variant.select("qx.client",
{"mshtml":function(vText){this._visualPropertyCheck();
var vStart=this.getSelectionStart();
var vSelectionRange=this.__getSelectionRange();
if(!this._inputElement.contains(vSelectionRange.parentElement())){return;
}vSelectionRange.text=vText;
this.setValue(this._inputElement.value);
this.setSelectionStart(vStart);
this.setSelectionLength(vText.length);
},
"default":function(vText){this._visualPropertyCheck();
var el=this._inputElement;
var vOldText=el.value;
var vStart=el.selectionStart;
var vOldTextBefore=vOldText.substr(0,
vStart);
var vOldTextAfter=vOldText.substr(el.selectionEnd);
var vValue=el.value=vOldTextBefore+vText+vOldTextAfter;
el.selectionStart=vStart;
el.selectionEnd=vStart+vText.length;
this.setValue(vValue);
}}),
getSelectionText:qx.core.Variant.select("qx.client",
{"mshtml":function(){this._visualPropertyCheck();
var vSelectionRange=this.__getSelectionRange();
if(!this._inputElement.contains(vSelectionRange.parentElement())){return "";
}return vSelectionRange.text;
},
"default":function(){this._visualPropertyCheck();
return this._inputElement.value.substr(this.getSelectionStart(),
this.getSelectionLength());
}}),
selectAll:function(){this._visualPropertyCheck();
if(this.getValue()!=null){this.setSelectionStart(0);
this.setSelectionLength(this._inputElement.value.length);
}this._inputElement.select();
this._inputElement.focus();
},
selectFromTo:qx.core.Variant.select("qx.client",
{"mshtml":function(vStart,
vEnd){this._visualPropertyCheck();
this.setSelectionStart(vStart);
this.setSelectionLength(vEnd-vStart);
},
"default":function(vStart,
vEnd){this._visualPropertyCheck();
var el=this._inputElement;
el.selectionStart=vStart;
el.selectionEnd=vEnd;
}})},
destruct:function(){if(this._inputElement){if(qx.core.Variant.isSet("qx.client",
"mshtml")){this._inputElement.onpropertychange=null;
}else{this._inputElement.removeEventListener("input",
this.__oninput,
false);
}}this._disposeFields("_inputElement",
"__font",
"__oninput");
}});




/* ID: qx.ui.form.PasswordField */
qx.Class.define("qx.ui.form.PasswordField",
{extend:qx.ui.form.TextField,
members:{_inputType:"password"}});




/* ID: qx.ui.form.CheckBox */
qx.Class.define("qx.ui.form.CheckBox",
{extend:qx.ui.basic.Atom,
construct:function(vText,
vValue,
vName,
vChecked){this.base(arguments,
vText);
this.initTabIndex();
this._createIcon();
if(vValue!=null){this.setValue(vValue);
}
if(vName!=null){this.setName(vName);
}
if(vChecked!=null){this.setChecked(vChecked);
}else{this.initChecked();
}this.addEventListener("click",
this._onclick);
this.addEventListener("keydown",
this._onkeydown);
this.addEventListener("keyup",
this._onkeyup);
},
properties:{appearance:{refine:true,
init:"check-box"},
tabIndex:{refine:true,
init:1},
name:{check:"String",
event:"changeName"},
value:{check:"String",
event:"changeValue"},
checked:{check:"Boolean",
apply:"_applyChecked",
init:false,
event:"changeChecked"}},
members:{INPUT_TYPE:"checkbox",
_createIcon:function(){var i=this._iconObject=new qx.ui.form.InputCheckSymbol;
i.setType(this.INPUT_TYPE);
i.setChecked(this.getChecked());
i.setAnonymous(true);
this.addAtBegin(i);
},
_applyChecked:function(value,
old){if(this._iconObject){this._iconObject.setChecked(value);
}},
_applyIcon:null,
_applyDisabledIcon:null,
_handleIcon:function(){switch(this.getShow()){case "icon":case "both":this._iconIsVisible=true;
break;
default:this._iconIsVisible=false;
}
if(this._iconIsVisible){this._iconObject?this._iconObject.setDisplay(true):this._createIcon();
}else if(this._iconObject){this._iconObject.setDisplay(false);
}},
_onclick:function(e){this.toggleChecked();
},
_onkeydown:function(e){if(e.getKeyIdentifier()=="Enter"&&!e.isAltPressed()){this.toggleChecked();
}},
_onkeyup:function(e){if(e.getKeyIdentifier()=="Space"){this.toggleChecked();
}}}});




/* ID: qx.ui.form.InputCheckSymbol */
qx.Class.define("qx.ui.form.InputCheckSymbol",
{extend:qx.ui.basic.Terminator,
construct:function(){this.base(arguments);
this.setSelectable(false);
if(qx.core.Variant.isSet("qx.client",
"mshtml")){this.setWidth(13);
this.setHeight(13);
}else if(qx.core.Variant.isSet("qx.client",
"gecko")){this.setMargin(0);
}this.initTabIndex();
this.setChecked(false);
},
properties:{tabIndex:{refine:true,
init:-1},
name:{check:"String",
init:null,
nullable:true,
apply:"_applyName"},
value:{init:null,
nullable:true,
apply:"_applyValue"},
type:{init:null,
nullable:true,
apply:"_applyType"},
checked:{check:"Boolean",
init:false,
apply:"_applyChecked"}},
members:{_createElementImpl:function(){this.setElement(this.getTopLevelWidget().getDocumentElement().createElement("input"));
},
_applyName:function(value,
old){return this.setHtmlProperty("name",
value);
},
_applyValue:function(value,
old){return this.setHtmlProperty("value",
value);
},
_applyType:function(value,
old){return this.setHtmlProperty("type",
value);
},
_applyChecked:function(value,
old){return this.setHtmlProperty("checked",
value);
},
getPreferredBoxWidth:function(){return 13;
},
getPreferredBoxHeight:function(){return 13;
},
_afterAppear:qx.core.Variant.select("qx.client",
{"mshtml":function(){this.base(arguments);
var vElement=this.getElement();
vElement.checked=this.getChecked();
if(this.getEnabled()===false){vElement.disabled=true;
}},
"default":qx.lang.Function.returnTrue}),
_applyEnabled:function(value,
old){value===false?this.setHtmlProperty("disabled",
"disabled"):this.removeHtmlProperty("disabled");
return this.base(arguments,
value,
old);
}},
defer:function(statics,
members){members.getBoxWidth=members.getPreferredBoxWidth;
members.getBoxHeight=members.getPreferredBoxHeight;
members.getInnerWidth=members.getPreferredBoxWidth;
members.getInnerHeight=members.getPreferredBoxHeight;
}});




/* ID: qx.ui.popup.PopupAtom */
qx.Class.define("qx.ui.popup.PopupAtom",
{extend:qx.ui.popup.Popup,
construct:function(vLabel,
vIcon){this.base(arguments);
this._atom=new qx.ui.basic.Atom(vLabel,
vIcon);
this._atom.setParent(this);
},
members:{_isFocusRoot:false,
getAtom:function(){return this._atom;
}},
destruct:function(){this._disposeObjects("_atom");
}});




/* ID: qx.ui.popup.ToolTip */
qx.Class.define("qx.ui.popup.ToolTip",
{extend:qx.ui.popup.PopupAtom,
construct:function(vLabel,
vIcon){this.base(arguments,
vLabel,
vIcon);
this.setStyleProperty("filter",
"progid:DXImageTransform.Microsoft.Shadow(color='Gray', Direction=135, Strength=4)");
this._showTimer=new qx.client.Timer(this.getShowInterval());
this._showTimer.addEventListener("interval",
this._onshowtimer,
this);
this._hideTimer=new qx.client.Timer(this.getHideInterval());
this._hideTimer.addEventListener("interval",
this._onhidetimer,
this);
this.addEventListener("mouseover",
this._onmouseover);
this.addEventListener("mouseout",
this._onmouseover);
},
properties:{appearance:{refine:true,
init:"tool-tip"},
hideOnHover:{check:"Boolean",
init:true},
mousePointerOffsetX:{check:"Integer",
init:1},
mousePointerOffsetY:{check:"Integer",
init:20},
showInterval:{check:"Integer",
init:1000,
apply:"_applyShowInterval"},
hideInterval:{check:"Integer",
init:4000,
apply:"_applyHideInterval"},
boundToWidget:{check:"qx.ui.core.Widget",
apply:"_applyBoundToWidget"}},
members:{_minZIndex:1e7,
_applyHideInterval:function(value,
old){this._hideTimer.setInterval(value);
},
_applyShowInterval:function(value,
old){this._showTimer.setInterval(value);
},
_applyBoundToWidget:function(value,
old){if(value){this.setParent(value.getTopLevelWidget());
}else if(old){this.setParent(null);
}},
_beforeAppear:function(){this.base(arguments);
this._stopShowTimer();
this._startHideTimer();
},
_beforeDisappear:function(){this.base(arguments);
this._stopHideTimer();
},
_afterAppear:function(){this.base(arguments);
if(this.getRestrictToPageOnOpen()){var doc=qx.ui.core.ClientDocument.getInstance();
var docWidth=doc.getClientWidth();
var docHeight=doc.getClientHeight();
var restrictToPageLeft=parseInt(this.getRestrictToPageLeft());
var restrictToPageRight=parseInt(this.getRestrictToPageRight());
var restrictToPageTop=parseInt(this.getRestrictToPageTop());
var restrictToPageBottom=parseInt(this.getRestrictToPageBottom());
var left=(this._wantedLeft==null)?this.getLeft():this._wantedLeft;
var top=this.getTop();
var width=this.getBoxWidth();
var height=this.getBoxHeight();
var mouseX=qx.event.type.MouseEvent.getPageX();
var mouseY=qx.event.type.MouseEvent.getPageY();
var oldLeft=this.getLeft();
var oldTop=top;
if(left+width>docWidth-restrictToPageRight){left=docWidth-restrictToPageRight-width;
}
if(top+height>docHeight-restrictToPageBottom){top=docHeight-restrictToPageBottom-height;
}
if(left<restrictToPageLeft){left=restrictToPageLeft;
}
if(top<restrictToPageTop){top=restrictToPageTop;
}if(left<=mouseX&&mouseX<=left+width&&top<=mouseY&&mouseY<=top+height){var deltaYdown=mouseY-top;
var deltaYup=deltaYdown-height;
var deltaXright=mouseX-left;
var deltaXleft=deltaXright-width;
var violationUp=Math.max(0,
restrictToPageTop-(top+deltaYup));
var violationDown=Math.max(0,
top+height+deltaYdown-(docHeight-restrictToPageBottom));
var violationLeft=Math.max(0,
restrictToPageLeft-(left+deltaXleft));
var violationRight=Math.max(0,
left+width+deltaXright-(docWidth-restrictToPageRight));
var possibleMovements=[[0,
deltaYup,
violationUp],
[0,
deltaYdown,
violationDown],
[deltaXleft,
0,
violationLeft],
[deltaXright,
0,
violationRight]];
possibleMovements.sort(function(a,
b){return a[2]-b[2]||(Math.abs(a[0])+Math.abs(a[1]))-(Math.abs(b[0])+Math.abs(b[1]));
});
var minimalNonClippingMovement=possibleMovements[0];
left=left+minimalNonClippingMovement[0];
top=top+minimalNonClippingMovement[1];
}
if(left!=oldLeft||top!=oldTop){var self=this;
window.setTimeout(function(){self.setLeft(left);
self.setTop(top);
},
0);
}}},
_startShowTimer:function(){if(!this._showTimer.getEnabled()){this._showTimer.start();
}},
_startHideTimer:function(){if(!this._hideTimer.getEnabled()){this._hideTimer.start();
}},
_stopShowTimer:function(){if(this._showTimer.getEnabled()){this._showTimer.stop();
}},
_stopHideTimer:function(){if(this._hideTimer.getEnabled()){this._hideTimer.stop();
}},
_onmouseover:function(e){if(this.getHideOnHover()){this.hide();
}},
_onshowtimer:function(e){this.setLeft(qx.event.type.MouseEvent.getPageX()+this.getMousePointerOffsetX());
this.setTop(qx.event.type.MouseEvent.getPageY()+this.getMousePointerOffsetY());
this.show();
},
_onhidetimer:function(e){return this.hide();
}},
destruct:function(){var mgr=qx.ui.popup.ToolTipManager.getInstance();
mgr.remove(this);
if(mgr.getCurrentToolTip()==this){mgr.resetCurrentToolTip();
}this._disposeObjects("_showTimer",
"_hideTimer");
}});




/* ID: qx.ui.popup.ToolTipManager */
qx.Class.define("qx.ui.popup.ToolTipManager",
{type:"singleton",
extend:qx.util.manager.Object,
properties:{currentToolTip:{check:"qx.ui.popup.ToolTip",
nullable:true,
apply:"_applyCurrentToolTip"}},
members:{_applyCurrentToolTip:function(value,
old){if(old&&old.contains(value)){return;
}if(old&&!old.isDisposed()){old.hide();
old._stopShowTimer();
old._stopHideTimer();
}if(value){value._startShowTimer();
}},
handleMouseOver:function(e){var vTarget=e.getTarget();
var vToolTip;
if(!(vTarget instanceof qx.ui.core.Widget)&&vTarget.nodeType==1){vTarget=qx.event.handler.EventHandler.getTargetObject(vTarget);
}while(vTarget!=null&&!(vToolTip=vTarget.getToolTip())){vTarget=vTarget.getParent();
}if(vToolTip!=null){vToolTip.setBoundToWidget(vTarget);
}this.setCurrentToolTip(vToolTip);
},
handleMouseOut:function(e){var vTarget=e.getTarget();
var vRelatedTarget=e.getRelatedTarget();
var vToolTip=this.getCurrentToolTip();
if(vToolTip&&(vRelatedTarget==vToolTip||vToolTip.contains(vRelatedTarget))){return;
}if(vRelatedTarget&&vTarget&&vTarget.contains(vRelatedTarget)){return;
}if(vToolTip&&!vRelatedTarget){this.setCurrentToolTip(null);
}},
handleFocus:function(e){var vTarget=e.getTarget();
var vToolTip=vTarget.getToolTip();
if(vToolTip!=null){vToolTip.setBoundToWidget(vTarget);
this.setCurrentToolTip(vToolTip);
}},
handleBlur:function(e){var vTarget=e.getTarget();
if(!vTarget){return;
}var vToolTip=this.getCurrentToolTip();
if(vToolTip&&vToolTip==vTarget.getToolTip()){this.setCurrentToolTip(null);
}}}});




/* ID: qx.ui.pageview.AbstractPageView */
qx.Class.define("qx.ui.pageview.AbstractPageView",
{type:"abstract",
extend:qx.ui.layout.BoxLayout,
construct:function(vBarClass,
vPaneClass){this.base(arguments);
this._bar=new vBarClass;
this._pane=new vPaneClass;
this.add(this._bar,
this._pane);
},
members:{getPane:function(){return this._pane;
},
getBar:function(){return this._bar;
}},
destruct:function(){this._disposeObjects("_bar",
"_pane");
}});




/* ID: qx.ui.pageview.tabview.TabView */
qx.Class.define("qx.ui.pageview.tabview.TabView",
{extend:qx.ui.pageview.AbstractPageView,
construct:function(){this.base(arguments,
qx.ui.pageview.tabview.Bar,
qx.ui.pageview.tabview.Pane);
},
properties:{appearance:{refine:true,
init:"tab-view"},
orientation:{refine:true,
init:"vertical"},
alignTabsToLeft:{check:"Boolean",
init:true,
apply:"_applyAlignTabsToLeft"},
placeBarOnTop:{check:"Boolean",
init:true,
apply:"_applyPlaceBarOnTop"}},
members:{_applyAlignTabsToLeft:function(value,
old){var vBar=this._bar;
vBar.setHorizontalChildrenAlign(value?"left":"right");
vBar._addChildrenToStateQueue();
},
_applyPlaceBarOnTop:function(value,
old){var vBar=this._bar;
if(value){vBar.moveSelfToBegin();
}else{vBar.moveSelfToEnd();
}vBar._addChildrenToStateQueue();
}}});




/* ID: qx.ui.pageview.AbstractBar */
qx.Class.define("qx.ui.pageview.AbstractBar",
{type:"abstract",
extend:qx.ui.layout.BoxLayout,
construct:function(){this.base(arguments);
this._manager=new qx.ui.selection.RadioManager;
this.addEventListener("mousewheel",
this._onmousewheel);
},
members:{getManager:function(){return this._manager;
},
_lastDate:(new Date(0)).valueOf(),
_onmousewheel:function(e){var vDate=(new Date).valueOf();
if((vDate-50)<this._lastDate){return;
}this._lastDate=vDate;
var vManager=this.getManager();
var vItems=vManager.getEnabledItems();
var vPos=vItems.indexOf(vManager.getSelected());
if(this.getWheelDelta(e)>0){var vNext=vItems[vPos+1];
if(!vNext){vNext=vItems[0];
}}else if(vPos>0){var vNext=vItems[vPos-1];
if(!vNext){vNext=vItems[0];
}}else{vNext=vItems[vItems.length-1];
}vManager.setSelected(vNext);
},
getWheelDelta:function(e){return e.getWheelDelta();
}},
destruct:function(){this._disposeObjects("_manager");
}});




/* ID: qx.ui.selection.RadioManager */
qx.Class.define("qx.ui.selection.RadioManager",
{extend:qx.core.Target,
construct:function(vName,
vMembers){this.base(arguments);
this._items=[];
this.setName(vName!=null?vName:qx.ui.selection.RadioManager.AUTO_NAME_PREFIX+this.toHashCode());
if(vMembers!=null){this.add.apply(this,
vMembers);
}},
statics:{AUTO_NAME_PREFIX:"qx-radio-"},
properties:{selected:{nullable:true,
apply:"_applySelected",
event:"changeSelected",
check:"qx.core.Object"},
name:{check:"String",
nullable:true,
apply:"_applyName"}},
members:{getItems:function(){return this._items;
},
getEnabledItems:function(){var b=[];
for(var i=0,
a=this._items,
l=a.length;i<l;i++){if(a[i].getEnabled()){b.push(a[i]);
}}return b;
},
handleItemChecked:function(vItem,
vChecked){if(vChecked){this.setSelected(vItem);
}else if(this.getSelected()==vItem){this.setSelected(null);
}},
add:function(varargs){var vItems=arguments;
var vLength=vItems.length;
var vItem;
for(var i=0;i<vLength;i++){vItem=vItems[i];
if(qx.lang.Array.contains(this._items,
vItem)){return;
}this._items.push(vItem);
vItem.setManager(this);
if(vItem.getChecked()){this.setSelected(vItem);
}vItem.setName(this.getName());
}},
remove:function(vItem){qx.lang.Array.remove(this._items,
vItem);
vItem.setManager(null);
if(vItem.getChecked()){this.setSelected(null);
}},
_applySelected:function(value,
old){if(old){old.setChecked(false);
}
if(value){value.setChecked(true);
}},
_applyName:function(value,
old){for(var i=0,
vItems=this._items,
vLength=vItems.length;i<vLength;i++){vItems[i].setName(value);
}},
selectNext:function(vItem){var vIndex=this._items.indexOf(vItem);
if(vIndex==-1){return;
}var i=0;
var vLength=this._items.length;
vIndex=(vIndex+1)%vLength;
while(i<vLength&&!this._items[vIndex].getEnabled()){vIndex=(vIndex+1)%vLength;
i++;
}this._selectByIndex(vIndex);
},
selectPrevious:function(vItem){var vIndex=this._items.indexOf(vItem);
if(vIndex==-1){return;
}var i=0;
var vLength=this._items.length;
vIndex=(vIndex-1+vLength)%vLength;
while(i<vLength&&!this._items[vIndex].getEnabled()){vIndex=(vIndex-1+vLength)%vLength;
i++;
}this._selectByIndex(vIndex);
},
_selectByIndex:function(vIndex){if(this._items[vIndex].getEnabled()){this.setSelected(this._items[vIndex]);
this._items[vIndex].setFocused(true);
}}},
destruct:function(){this._disposeObjectDeep("_items",
1);
}});




/* ID: qx.ui.pageview.tabview.Bar */
qx.Class.define("qx.ui.pageview.tabview.Bar",
{extend:qx.ui.pageview.AbstractBar,
construct:function(){this.base(arguments);
this.initZIndex();
this.initHeight();
},
properties:{appearance:{refine:true,
init:"tab-view-bar"},
zIndex:{refine:true,
init:2},
height:{refine:true,
init:"auto"}}});




/* ID: qx.ui.pageview.AbstractPane */
qx.Class.define("qx.ui.pageview.AbstractPane",
{type:"abstract",
extend:qx.ui.layout.CanvasLayout});




/* ID: qx.ui.pageview.tabview.Pane */
qx.Class.define("qx.ui.pageview.tabview.Pane",
{extend:qx.ui.pageview.AbstractPane,
construct:function(){this.base(arguments);
this.initZIndex();
this.initHeight();
},
properties:{appearance:{refine:true,
init:"tab-view-pane"},
zIndex:{refine:true,
init:1},
height:{refine:true,
init:"1*"}}});




/* ID: qx.ui.pageview.AbstractButton */
qx.Class.define("qx.ui.pageview.AbstractButton",
{type:"abstract",
extend:qx.ui.basic.Atom,
construct:function(vText,
vIcon,
vIconWidth,
vIconHeight,
vFlash){this.base(arguments,
vText,
vIcon,
vIconWidth,
vIconHeight,
vFlash);
this.initChecked();
this.initTabIndex();
this.addEventListener("mouseover",
this._onmouseover);
this.addEventListener("mouseout",
this._onmouseout);
this.addEventListener("mousedown",
this._onmousedown);
this.addEventListener("keydown",
this._onkeydown);
this.addEventListener("keypress",
this._onkeypress);
},
properties:{tabIndex:{refine:true,
init:1},
checked:{check:"Boolean",
init:false,
apply:"_applyChecked",
event:"changeChecked"},
page:{check:"qx.ui.pageview.AbstractPage",
apply:"_applyPage",
nullable:true},
manager:{check:"qx.ui.selection.RadioManager",
nullable:true,
apply:"_applyManager"},
name:{check:"String",
apply:"_applyName"}},
members:{getView:function(){var pa=this.getParent();
return pa?pa.getParent():null;
},
_applyManager:function(value,
old){if(old){old.remove(this);
}
if(value){value.add(this);
}},
_applyParent:function(value,
old){this.base(arguments,
value,
old);
if(old){old.getManager().remove(this);
}
if(value){value.getManager().add(this);
}},
_applyPage:function(value,
old){if(old){old.setButton(null);
}
if(value){value.setButton(this);
this.getChecked()?value.show():value.hide();
}},
_applyChecked:function(value,
old){if(this._hasParent){var vManager=this.getManager();
if(vManager){vManager.handleItemChecked(this,
value);
}}value?this.addState("checked"):this.removeState("checked");
var vPage=this.getPage();
if(vPage){this.getChecked()?vPage.show():vPage.hide();
}},
_applyName:function(value,
old){if(this.getManager()){this.getManager().setName(value);
}},
_onmousedown:function(e){this.setChecked(true);
},
_onmouseover:function(e){this.addState("over");
},
_onmouseout:function(e){this.removeState("over");
},
_onkeydown:function(e){},
_onkeypress:function(e){}}});




/* ID: qx.ui.pageview.tabview.Button */
qx.Class.define("qx.ui.pageview.tabview.Button",
{extend:qx.ui.pageview.AbstractButton,
events:{"closetab":"qx.event.type.Event"},
properties:{appearance:{refine:true,
init:"tab-view-button"},
showCloseButton:{check:"Boolean",
init:false,
apply:"_applyShowCloseButton",
event:"changeShowCloseButton"},
closeButtonImage:{check:"String",
init:"icon/16/actions/dialog-cancel.png",
apply:"_applyCloseButtonImage"}},
members:{_onkeydown:function(e){var identifier=e.getKeyIdentifier();
if(identifier=="Enter"||identifier=="Space"){this.setChecked(true);
}},
_onkeypress:function(e){switch(e.getKeyIdentifier()){case "Left":var vPrev=this.getPreviousActiveSibling();
if(vPrev&&vPrev!=this){delete qx.event.handler.FocusHandler.mouseFocus;
vPrev.setFocused(true);
vPrev.setChecked(true);
}break;
case "Right":var vNext=this.getNextActiveSibling();
if(vNext&&vNext!=this){delete qx.event.handler.FocusHandler.mouseFocus;
vNext.setFocused(true);
vNext.setChecked(true);
}break;
}},
_ontabclose:function(e){this.createDispatchDataEvent("closetab",
this);
e.stopPropagation();
},
_applyChecked:function(value,
old){this.base(arguments,
value,
old);
this.setZIndex(value?1:0);
},
_applyShowCloseButton:function(value,
old){if(!this._closeButtonImage){this._closeButtonImage=new qx.ui.basic.Image(this.getCloseButtonImage());
}
if(value){this._closeButtonImage.addEventListener("click",
this._ontabclose,
this);
this.add(this._closeButtonImage);
}else{this.remove(this._closeButtonImage);
this._closeButtonImage.removeEventListener("click",
this._ontabclose,
this);
}},
_applyCloseButtonImage:function(value,
old){if(this._closeButtonImage){this._closeButtonImage.setSource(value);
}},
_renderAppearance:function(){if(this.getView()){this.isFirstVisibleChild()?this.addState("firstChild"):this.removeState("lastChild");
this.isLastVisibleChild()?this.addState("lastChild"):this.removeState("lastChild");
this.getView().getAlignTabsToLeft()?this.addState("alignLeft"):this.removeState("alignLeft");
!this.getView().getAlignTabsToLeft()?this.addState("alignRight"):this.removeState("alignRight");
this.getView().getPlaceBarOnTop()?this.addState("barTop"):this.removeState("barTop");
!this.getView().getPlaceBarOnTop()?this.addState("barBottom"):this.removeState("barBottom");
}this.base(arguments);
}},
destruct:function(){this._disposeObjects("_closeButtonImage");
}});




/* ID: qx.ui.pageview.AbstractPage */
qx.Class.define("qx.ui.pageview.AbstractPage",
{type:"abstract",
extend:qx.ui.layout.CanvasLayout,
construct:function(vButton){this.base(arguments);
if(vButton!==undefined){this.setButton(vButton);
}this.initTop();
this.initRight();
this.initBottom();
this.initLeft();
},
properties:{top:{refine:true,
init:0},
right:{refine:true,
init:0},
bottom:{refine:true,
init:0},
left:{refine:true,
init:0},
display:{refine:true,
init:false},
button:{check:"qx.ui.pageview.AbstractButton",
apply:"_applyButton"}},
members:{_applyButton:function(value,
old){if(old){old.setPage(null);
}
if(value){value.setPage(this);
}}}});




/* ID: qx.ui.pageview.tabview.Page */
qx.Class.define("qx.ui.pageview.tabview.Page",
{extend:qx.ui.pageview.AbstractPage,
properties:{appearance:{refine:true,
init:"tab-view-page"}}});




/* ID: qx.ui.tree.AbstractTreeElement */
qx.Class.define("qx.ui.tree.AbstractTreeElement",
{type:"abstract",
extend:qx.ui.layout.BoxLayout,
construct:function(treeRowStructure){this._indentObject=treeRowStructure._indentObject;
this._iconObject=treeRowStructure._iconObject;
this._labelObject=treeRowStructure._labelObject;
this._indentObject.setAnonymous(true);
this._iconObject.setAnonymous(true);
this._labelObject.setAnonymous(true);
this._labelObject.setSelectable(false);
this._labelObject.setStyleProperty("lineHeight",
"100%");
this._labelObject.setMode("text");
this.base(arguments);
if(qx.util.Validation.isValid(treeRowStructure._label)){this.setLabel(treeRowStructure._label);
}this.initSelectable();
this.BASE_URI=qx.io.Alias.getInstance().resolve("widget/tree/");
for(var i=0;i<treeRowStructure._fields.length;i++){this.add(treeRowStructure._fields[i]);
}if(treeRowStructure._icons.unselected!==undefined){this.setIcon(treeRowStructure._icons.unselected);
this.setIconSelected(treeRowStructure._icons.unselected);
}else{this.initIcon();
}
if(treeRowStructure._icons.selected!==undefined){this.setIconSelected(treeRowStructure._icons.selected);
}
if((treeRowStructure._icons.selected===undefined)&&(treeRowStructure._icons.unselected!==undefined)){this.initIconSelected();
}this._iconObject.setAppearance("tree-element-icon");
this._labelObject.setAppearance("tree-element-label");
this.addEventListener("mousedown",
this._onmousedown);
this.addEventListener("mouseup",
this._onmouseup);
},
properties:{orientation:{refine:true,
init:"horizontal"},
selectable:{refine:true,
init:false},
appearance:{refine:true,
init:"tree-element"},
icon:{check:"String",
nullable:true,
init:"icon/16/actions/document-new.png",
apply:"_applyIcon"},
iconSelected:{check:"String",
event:"iconSelected",
nullable:true,
init:null,
apply:"_applyIcon"},
label:{check:"Label",
apply:"_applyLabel",
dispose:true},
selected:{check:"Boolean",
init:false,
apply:"_applySelected",
event:"changeSelected"}},
members:{_applyLabel:function(value,
old){if(this._labelObject){this._labelObject.setText(value);
}},
_applyIcon:function(value,
old){var iconObject=this.getIconObject();
if(iconObject){var source=this._evalCurrentIcon();
if(!source){iconObject.setDisplay(false);
}else{iconObject.setDisplay(true);
iconObject.setSource(source);
}this.addToTreeQueue();
}},
_applySelected:function(value,
old){if(value){this.addState("selected");
this._labelObject.addState("selected");
}else{this.removeState("selected");
this._labelObject.removeState("selected");
}var vTree=this.getTree();
if(!vTree._fastUpdate||(old&&vTree._oldItem==this)){this._iconObject.setSource(this._evalCurrentIcon());
if(value){this._iconObject.addState("selected");
}else{this._iconObject.removeState("selected");
}}var vManager=this.getTree().getManager();
vManager.setItemSelected(this,
value);
},
_getRowStructure:function(labelOrTreeRowStructure,
icon,
iconSelected){if(labelOrTreeRowStructure instanceof qx.ui.tree.TreeRowStructure){return labelOrTreeRowStructure;
}else{return qx.ui.tree.TreeRowStructure.getInstance().standard(labelOrTreeRowStructure,
icon,
iconSelected);
}},
_evalCurrentIcon:function(){if(this.getSelected()&&this.getIconSelected()){return this.getIconSelected();
}else{return this.getIcon();
}},
getParentFolder:function(){if(this.getParent()&&typeof (this.getParent().getParent)=="function"){return this.getParent().getParent();
}return null;
},
getLevel:function(){var vParentFolder=this.getParentFolder();
return vParentFolder?vParentFolder.getLevel()+1:null;
},
getTree:function(){var vParentFolder=this.getParentFolder();
return vParentFolder?vParentFolder.getTree():null;
},
getIndentObject:function(){return this._indentObject;
},
getIconObject:function(){return this._iconObject;
},
getLabelObject:function(){return this._labelObject;
},
destroy:function(){var manager=this.getTree()?this.getTree().getManager():null;
if(manager){if(manager.getItemSelected(this)){if(manager.getMultiSelection()){manager.setItemSelected(this,
false);
}else{manager.deselectAll();
}}if(manager.getLeadItem()==this){manager.setLeadItem(null);
}if(manager.getAnchorItem()==this){manager.setAnchorItem(null);
}}if(this.destroyContent){this.destroyContent();
}this.disconnect();
var parentFolder=this.getParentFolder();
if(parentFolder){parentFolder.remove(this);
}qx.client.Timer.once(function(){this.dispose();
},
this,
0);
},
getHierarchy:function(vArr){if(this._labelObject){vArr.unshift(this._labelObject.getText());
}var parent=this.getParentFolder();
if(parent){parent.getHierarchy(vArr);
}return vArr;
},
addToTreeQueue:function(){var vTree=this.getTree();
if(vTree){vTree.addChildToTreeQueue(this);
}},
removeFromTreeQueue:function(){var vTree=this.getTree();
if(vTree){vTree.removeChildFromTreeQueue(this);
}},
addToCustomQueues:function(vHint){this.addToTreeQueue();
this.base(arguments,
vHint);
},
removeFromCustomQueues:function(vHint){this.removeFromTreeQueue();
this.base(arguments,
vHint);
},
_applyParent:function(value,
old){this.base(arguments,
value,
old);
if(old&&!old.isDisplayable()&&old.getParent()&&old.getParent().isDisplayable()){old.getParent().addToTreeQueue();
}if(value&&!value.isDisplayable()&&value.getParent()&&value.getParent().isDisplayable()){value.getParent().addToTreeQueue();
}},
_handleDisplayableCustom:function(vDisplayable,
vParent,
vHint){this.base(arguments,
vDisplayable,
vParent,
vHint);
if(vHint){var vParentFolder=this.getParentFolder();
var vPreviousParentFolder=this._previousParentFolder;
if(vPreviousParentFolder){if(this._wasLastVisibleChild){vPreviousParentFolder._updateIndent();
}else if(!vPreviousParentFolder.hasContent()){vPreviousParentFolder.addToTreeQueue();
}}
if(vParentFolder&&vParentFolder.isDisplayable()&&vParentFolder._initialLayoutDone){vParentFolder.addToTreeQueue();
}
if(this.isLastVisibleChild()){var vPrev=this.getPreviousVisibleSibling();
if(vPrev&&vPrev instanceof qx.ui.tree.AbstractTreeElement){vPrev._updateIndent();
}}
if(vDisplayable){this._updateIndent();
}}},
_onmousedown:function(e){if(e._treeProcessed){return;
}this.getTree().getManager().handleMouseDown(this,
e);
e._treeProcessed=true;
},
_onmouseup:function(e){if(e._treeProcessed){return;
}var vOriginalTarget=e.getOriginalTarget();
switch(vOriginalTarget){case this._indentObject:case this._containerObject:case this:break;
default:this.getTree().getManager().handleMouseUp(this,
e);
e._treeProcessed=true;
}},
flushTree:function(){this._previousParentFolder=this.getParentFolder();
this._wasLastVisibleChild=this.isLastVisibleChild();
var vLevel=this.getLevel();
var vTree=this.getTree();
if(!vTree){return;
}var vImage;
var vHtml=[];
var vCurrentObject=this;
var vMinLevel=0;
var vMaxLevel=vLevel;
if(vTree.getRootOpenClose()){vMaxLevel=vLevel+1;
}if(vTree.getHideNode()){vMinLevel=1;
}
for(var i=vMinLevel;i<vMaxLevel;i++){vImage=vCurrentObject.getIndentSymbol(vTree.getUseTreeLines(),
i,
vMinLevel,
vMaxLevel);
if(vImage){vHtml.push("<img style=\"position:absolute;top:0px;left:");
vHtml.push((vMaxLevel-i-1)*19);
vHtml.push("px\" src=\"");
vHtml.push(this.BASE_URI);
vHtml.push(vImage);
vHtml.push(".");
vHtml.push("gif");
vHtml.push("\" />");
}vCurrentObject=vCurrentObject.getParentFolder();
}this._indentObject.setHtml(vHtml.join(""));
this._indentObject.setWidth((vMaxLevel-vMinLevel)*19);
}},
destruct:function(){this._disposeObjects("_indentObject",
"_iconObject",
"_labelObject");
this._disposeFields("_previousParentFolder");
}});




/* ID: qx.ui.tree.TreeRowStructure */
qx.Class.define("qx.ui.tree.TreeRowStructure",
{type:"singleton",
extend:qx.core.Object,
construct:function(){this.base(arguments);
},
members:{newRow:function(){this._indentObject=new qx.ui.embed.HtmlEmbed;
this._iconObject=new qx.ui.basic.Image;
this._labelObject=new qx.ui.basic.Label;
this._fields=new Array;
this._icons=new Object;
this._fields.push(this._indentObject);
this._indentAdded=false;
this._iconAdded=false;
this._labelAdded=false;
return this;
},
standard:function(vLabel,
vIcon,
vIconSelected){this.newRow();
this.addIcon(vIcon,
vIconSelected);
this.addLabel(vLabel);
return this;
},
addIndent:function(){if(!this._indentAdded){this._fields.shift();
this._indentAdded=true;
}else{throw new Error("Indent object added more than once.");
}this._fields.push(this._indentObject);
},
addIcon:function(vIcon,
vIconSelected){if(!this._iconAdded){this._iconAdded=true;
}else{throw new Error("Icon object added more than once.");
}if(vIcon!==undefined){this._icons.unselected=vIcon;
}
if(vIconSelected!==undefined){this._icons.selected=vIconSelected;
}this._fields.push(this._iconObject);
},
addLabel:function(vLabel){if(!this._labelAdded){this._labelAdded=true;
}else{throw new Error("Label added more than once.");
}this._label=vLabel;
this._fields.push(this._labelObject);
},
addObject:function(vObj,
vAnonymous){if(typeof vAnonymous=="boolean"){vObj.setAnonymous(vAnonymous);
}this._fields.push(vObj);
},
getLabelObject:function(){return this._labelObject;
},
getIconObject:function(){return this._iconObject;
}},
destruct:function(){this._disposeFields("_icons");
this._disposeObjects('_indentObject',
'_iconObject',
'_labelObject');
this._disposeObjectDeep("_fields",
1);
}});




/* ID: qx.ui.embed.HtmlEmbed */
qx.Class.define("qx.ui.embed.HtmlEmbed",
{extend:qx.ui.basic.Terminator,
construct:function(vHtml){this.base(arguments);
if(vHtml!=null){this.setHtml(vHtml);
}},
properties:{html:{check:"String",
init:"",
apply:"_applyHtml",
event:"changeHtml"},
textAlign:{check:["left",
"center",
"right",
"justify"],
nullable:true,
themeable:true,
apply:"_applyTextAlign"},
font:{refine:true,
init:null},
textColor:{refine:true,
init:null}},
members:{_applyHtml:function(){if(this._isCreated){this._syncHtml();
}},
_applyTextAlign:function(value,
old){value===null?this.removeStyleProperty("textAlign"):this.setStyleProperty("textAlign",
value);
},
_applyFont:function(value,
old){qx.theme.manager.Font.getInstance().connect(this._styleFont,
this,
value);
},
_styleFont:function(value){value?value.render(this):qx.ui.core.Font.reset(this);
},
_applyTextColor:function(value,
old){qx.theme.manager.Color.getInstance().connect(this._styleTextColor,
this,
value);
},
_styleTextColor:function(value){value?this.setStyleProperty("color",
value):this.removeStyleProperty("color");
},
_applyElementData:function(){this._syncHtml();
},
_syncHtml:function(){this._getTargetNode().innerHTML=this.getHtml();
}}});




/* ID: qx.ui.tree.TreeFolder */
qx.Class.define("qx.ui.tree.TreeFolder",
{extend:qx.ui.tree.AbstractTreeElement,
construct:function(labelOrTreeRowStructure,
icon,
iconSelected){var treeRowStructure=this._getRowStructure(labelOrTreeRowStructure,
icon,
iconSelected);
this.base(arguments,
treeRowStructure);
this._treeRowStructureFields=treeRowStructure._fields;
this._iconObject.setAppearance("tree-folder-icon");
this._labelObject.setAppearance("tree-folder-label");
this.addEventListener("dblclick",
this._ondblclick);
this.add=this.addToFolder;
this.addBefore=this.addBeforeToFolder;
this.addAfter=this.addAfterToFolder;
this.addAt=this.addAtToFolder;
this.addAtBegin=this.addAtBeginToFolder;
this.addAtEnd=this.addAtEndToFolder;
},
events:{"treeOpenWithContent":"qx.event.type.DataEvent",
"treeOpenWhileEmpty":"qx.event.type.DataEvent",
"treeClose":"qx.event.type.DataEvent"},
properties:{appearance:{refine:true,
init:"tree-folder"},
icon:{refine:true,
init:"icon/16/places/folder.png"},
iconSelected:{refine:true,
init:"icon/16/status/folder-open.png"},
open:{check:"Boolean",
init:false,
apply:"_applyOpen",
event:"changeOpen"},
alwaysShowPlusMinusSymbol:{check:"Boolean",
init:false,
apply:"_applyAlwaysShowPlusMinusSymbol"}},
members:{hasContent:function(){return this._containerObject&&this._containerObject.getChildrenLength()>0;
},
open:function(){if(this.getOpen()){return;
}
if(this.hasContent()){if(this.getTree().hasEventListeners("treeOpenWithContent")){this.getTree().dispatchEvent(new qx.event.type.DataEvent("treeOpenWithContent",
this),
true);
}this.getTopLevelWidget().setGlobalCursor("progress");
qx.client.Timer.once(this._openCallback,
this,
0);
}else{if(this.getTree().hasEventListeners("treeOpenWhileEmpty")){this.getTree().dispatchEvent(new qx.event.type.DataEvent("treeOpenWhileEmpty",
this),
true);
}this.setOpen(true);
}},
close:function(){if(this.getTree().hasEventListeners("treeClose")){this.getTree().dispatchEvent(new qx.event.type.DataEvent("treeClose",
this),
true);
}if(this.getOpen()){if(qx.lang.Array.contains(this.getItems(true,
true),
this.getTree().getSelectedElement())){this.getTree().getManager().setSelectedItem(this);
}}this.setOpen(false);
},
toggle:function(){this.getOpen()?this.close():this.open();
},
_openCallback:function(){this.setOpen(true);
qx.ui.core.Widget.flushGlobalQueues();
this.getTopLevelWidget().setGlobalCursor(null);
},
_createChildrenStructure:function(){if(!(this instanceof qx.ui.tree.Tree)){this.setHeight("auto");
}this.setVerticalChildrenAlign("top");
if(!this._horizontalLayout){this.setOrientation("vertical");
this._horizontalLayout=new qx.ui.layout.HorizontalBoxLayout;
this._horizontalLayout.setWidth(null);
this._horizontalLayout.setParent(this);
this._horizontalLayout.setAnonymous(true);
this._horizontalLayout.setAppearance(this instanceof qx.ui.tree.Tree?"tree":"tree-folder");
this.setAppearance("widget");
for(var i=0;i<this._treeRowStructureFields.length;i++){this._treeRowStructureFields[i].setParent(this._horizontalLayout);
}this._treeRowStructureFields=null;
}
if(!this._containerObject){this._containerObject=new qx.ui.layout.VerticalBoxLayout;
this._containerObject.setWidth(null);
this._containerObject.setHeight("auto");
this._containerObject.setAnonymous(true);
this._containerObject.setDisplay(this.getOpen());
this._containerObject.setParent(this);
}},
_handleChildMove:function(vChild,
vRelationIndex,
vRelationChild){if(vChild.isDisplayable()){var vChildren=this._containerObject.getChildren();
var vOldChildIndex=vChildren.indexOf(vChild);
if(vOldChildIndex!=-1){if(vRelationChild){vRelationIndex=vChildren.indexOf(vRelationChild);
}
if(vRelationIndex==vChildren.length-1){vChild._updateIndent();
this._containerObject.getLastVisibleChild()._updateIndent();
}else if(vChild._wasLastVisibleChild){vChild._updateIndent();
var vPreviousSibling=vChild.getPreviousVisibleSibling();
if(vPreviousSibling){vPreviousSibling._updateIndent();
}}}}},
addToFolder:function(varargs){this._createChildrenStructure();
if(this._containerObject){return this._containerObject.add.apply(this._containerObject,
arguments);
}},
addBeforeToFolder:function(vChild,
vBefore){this._createChildrenStructure();
if(this._containerObject){this._handleChildMove(vChild,
null,
vBefore);
return this._containerObject.addBefore.apply(this._containerObject,
arguments);
}},
addAfterToFolder:function(vChild,
vAfter){this._createChildrenStructure();
if(this._containerObject){this._handleChildMove(vChild,
null,
vAfter);
return this._containerObject.addAfter.apply(this._containerObject,
arguments);
}},
addAtToFolder:function(vChild,
vIndex){this._createChildrenStructure();
if(this._containerObject){this._handleChildMove(vChild,
vIndex);
return this._containerObject.addAt.apply(this._containerObject,
arguments);
}},
addAtBeginToFolder:function(vChild){return this.addAtToFolder(vChild,
0);
},
addAtEndToFolder:function(vChild){this._createChildrenStructure();
if(this._containerObject){var vLast=this._containerObject.getLastChild();
if(vLast){this._handleChildMove(vChild,
null,
vLast);
return this._containerObject.addAfter.call(this._containerObject,
vChild,
vLast);
}else{return this.addAtBeginToFolder(vChild);
}}},
__saveSelectionBeforeRemove:function(){var tree=this.getTree();
if(tree){this.__oldSelection=tree.getSelectedElement();
tree.setSelectedElement(tree);
}},
__restoreSelectionAfterRemove:function(){var tree=this.getTree();
if(tree){if(!this.__oldSelection||!this.__oldSelection.getTree()){tree.setSelectedElement(tree);
}else{tree.setSelectedElement(this.__oldSelection);
}}},
remove:function(varargs){if(this._containerObject){this.__saveSelectionBeforeRemove();
this._containerObject.remove.apply(this._containerObject,
arguments);
this.__restoreSelectionAfterRemove();
}},
removeAt:function(vIndex){if(this._containerObject){this.__saveSelectionBeforeRemove();
this._containerObject.removeAt(vIndex);
this.__restoreSelectionAfterRemove();
}},
removeAll:function(){if(this._containerObject){this.__saveSelectionBeforeRemove();
this._containerObject.removeAll();
this.__restoreSelectionAfterRemove();
}},
getContainerObject:function(){return this._containerObject;
},
getHorizontalLayout:function(){return this._horizontalLayout;
},
getFirstVisibleChildOfFolder:function(){if(this._containerObject){return this._containerObject.getFirstChild();
}},
getLastVisibleChildOfFolder:function(){if(this._containerObject){return this._containerObject.getLastChild();
}},
getItems:function(recursive,
invisible){var a=[this];
if(this._containerObject){var ch=invisible==true?this._containerObject.getChildren():this._containerObject.getVisibleChildren();
if(recursive==false){a=a.concat(ch);
}else{for(var i=0,
chl=ch.length;i<chl;i++){a=a.concat(ch[i].getItems(recursive,
invisible));
}}}return a;
},
destroyContent:function(){if(!this.hasContent()){return;
}var manager=this.getTree()?this.getTree().getManager():null;
var leadItem;
var anchorItem;
if(manager){leadItem=manager.getLeadItem();
anchorItem=manager.getAnchorItem();
}this._containerObject.setDisplay(true);
var items=this._containerObject.getChildren();
var item;
for(var i=items.length-1;i>=0;--i){item=items[i];
if(item!=this){if(manager){if(leadItem==item){manager.setLeadItem(null);
}if(anchorItem==item){manager.setAnchorItem(null);
}if(manager.getItemSelected(item)){if(manager.getMultiSelection()){manager.setItemSelected(item,
false);
}else{manager.deselectAll();
}}if(item.destroyContent){item.destroyContent();
}}item.removeFromTreeQueue();
item.disconnect();
this._containerObject.remove(item);
qx.client.Timer.once(function(){item.dispose();
delete items[i];
},
this,
0);
}}},
_applyOpen:function(value,
old){var tree=this.getTree();
if(tree&&tree.getExcludeSpecificTreeLines().length>0){this._updateIndent();
}else{this._updateLastColumn();
}
if(this._containerObject){this._containerObject.setDisplay(value);
}},
_applyAlwaysShowPlusMinusSymbol:function(value,
old){var t=this.getTree();
if(t){if(t.getExcludeSpecificTreeLines().length>0){this._updateIndent();
}else{this._updateLastColumn();
}}},
_updateLastColumn:function(){if(this._indentObject){var vElement=this._indentObject.getElement();
if(vElement&&vElement.firstChild){vElement.firstChild.src=this.BASE_URI+this.getIndentSymbol(this.getTree().getUseTreeLines(),
0,
0,
0)+".gif";
}}},
_onmousedown:function(e){if(e._treeProcessed){return;
}var vOriginalTarget=e.getOriginalTarget();
switch(vOriginalTarget){case this._indentObject:if(this._indentObject.getElement().firstChild==e.getDomTarget()){this.toggle();
}break;
case this._containerObject:break;
case this:if(this._containerObject){break;
}default:this.getTree().getManager().handleMouseDown(this,
e);
}e._treeProcessed=true;
},
_onmouseup:function(e){if(e._treeProcessed){return;
}var vOriginalTarget=e.getOriginalTarget();
switch(vOriginalTarget){case this._indentObject:case this._containerObject:case this:break;
default:if(!this.getTree().getUseDoubleClick()){this.open();
this.getTree().getManager().handleMouseUp(this,
e);
e._treeProcessed=true;
}}},
_ondblclick:function(e){if(!this.getTree().getUseDoubleClick()){return;
}this.toggle();
e.stopPropagation();
},
getIndentSymbol:function(vUseTreeLines,
vColumn,
vFirstColumn,
vLastColumn){var vLevel=this.getLevel();
var vExcludeList=this.getTree().getExcludeSpecificTreeLines();
var vExclude=vExcludeList[vLastColumn-vColumn-1];
if(vColumn==vFirstColumn){if(this.hasContent()||this.getAlwaysShowPlusMinusSymbol()){if(!vUseTreeLines){return this.getOpen()?"minus":"plus";
}if(vLevel==1){var vParentFolder=this.getParentFolder();
if(vParentFolder&&!vParentFolder._horizontalLayout.getVisibility()&&this.isFirstChild()){if(this.isLastChild()||vExclude===true){return this.getOpen()?"only_minus":"only_plus";
}else{return this.getOpen()?"start_minus":"start_plus";
}}}
if(vExclude===true){return this.getOpen()?"only_minus":"only_plus";
}else if(this.isLastChild()){return this.getOpen()?"end_minus":"end_plus";
}else{return this.getOpen()?"cross_minus":"cross_plus";
}}else if(vUseTreeLines&&!(vExclude===true)){return this.isLastChild()?"end":"cross";
}}else{if(vUseTreeLines&&!this.isLastChild()){if(vExclude===true){return null;
}return "line";
}return null;
}},
_updateIndent:function(){qx.ui.tree.TreeFile.prototype._updateIndent.call(this);
if(!this._containerObject){return;
}var ch=this._containerObject.getVisibleChildren();
for(var i=0,
l=ch.length;i<l;i++){ch[i]._updateIndent();
}}},
destruct:function(){this._disposeFields('_treeRowStructureFields');
this._disposeObjects("_horizontalLayout",
"_containerObject");
}});




/* ID: qx.ui.tree.Tree */
qx.Class.define("qx.ui.tree.Tree",
{extend:qx.ui.tree.TreeFolder,
construct:function(labelOrTreeRowStructure,
icon,
iconSelected){this.base(arguments,
this._getRowStructure(labelOrTreeRowStructure,
icon,
iconSelected));
this._manager=new qx.ui.tree.SelectionManager(this);
this._iconObject.setAppearance("tree-icon");
this._labelObject.setAppearance("tree-label");
this.setOpen(true);
this.addToFolder();
this.addEventListener("keydown",
this._onkeydown);
this.addEventListener("keypress",
this._onkeypress);
this.addEventListener("keyup",
this._onkeyup);
},
statics:{isTreeFolder:function(vObject){return (vObject&&vObject instanceof qx.ui.tree.TreeFolder&&!(vObject instanceof qx.ui.tree.Tree));
},
isOpenTreeFolder:function(vObject){return (vObject instanceof qx.ui.tree.TreeFolder&&vObject.getOpen()&&vObject.hasContent());
}},
properties:{useDoubleClick:{check:"Boolean",
init:false},
useTreeLines:{check:"Boolean",
init:true,
apply:"_applyUseTreeLines"},
tabIndex:{refine:true,
init:1},
excludeSpecificTreeLines:{check:"Array",
init:[],
apply:"_applyExcludeSpecificTreeLines"},
hideNode:{check:"Boolean",
init:false,
apply:"_applyHideNode"},
rootOpenClose:{check:"Boolean",
init:false,
apply:"_applyRootOpenClose"}},
members:{useDoubleClick:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee,
"Use getUseDoubleClick instead");
return this.getUseDoubleClick();
},
useTreeLines:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee,
"Use getUseTreeLines instead");
return this.getUseTreeLines();
},
hideNode:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee,
"Use getHideNode instead");
return this.getHideNode();
},
getManager:function(){return this._manager;
},
getSelectedElement:function(){return this.getManager().getSelectedItems()[0];
},
getItems:function(recursive,
invisible){var a=[];
if(!this.getHideNode()){a.push(this);
}
if(this._containerObject){var ch=invisible==true?this._containerObject.getChildren():this._containerObject.getVisibleChildren();
if(recursive==false){a=a.concat(ch);
}else{for(var i=0,
chl=ch.length;i<chl;i++){a=a.concat(ch[i].getItems(recursive,
invisible));
}}}return a;
},
addChildToTreeQueue:function(vChild){if(!vChild._isInTreeQueue&&!vChild._isDisplayable){this.debug("Ignoring invisible child: "+vChild);
}
if(!vChild._isInTreeQueue&&vChild._isDisplayable){qx.ui.core.Widget.addToGlobalWidgetQueue(this);
if(!this._treeQueue){this._treeQueue={};
}this._treeQueue[vChild.toHashCode()]=vChild;
vChild._isInTreeQueue=true;
}},
removeChildFromTreeQueue:function(vChild){if(vChild._isInTreeQueue){if(this._treeQueue){delete this._treeQueue[vChild.toHashCode()];
}delete vChild._isInTreeQueue;
}},
flushWidgetQueue:function(){this.flushTreeQueue();
},
flushTreeQueue:function(){if(!qx.lang.Object.isEmpty(this._treeQueue)){for(var vHashCode in this._treeQueue){this._treeQueue[vHashCode].flushTree();
delete this._treeQueue[vHashCode]._isInTreeQueue;
}delete this._treeQueue;
}},
_applyUseTreeLines:function(value,
old){if(this._initialLayoutDone){this._updateIndent();
}},
_applyHideNode:function(value,
old){if(!value){this._horizontalLayout.setHeight(this._horizontalLayout.originalHeight);
this._horizontalLayout.show();
}else{this._horizontalLayout.originalHeight=this._horizontalLayout.getHeight();
this._horizontalLayout.setHeight(0);
this._horizontalLayout.hide();
}
if(this._initialLayoutDone){this._updateIndent();
}},
_applyRootOpenClose:function(value,
old){if(this._initialLayoutDone){this._updateIndent();
}},
getExcludeSpecificTreeLines:function(){return qx.lang.Array.clone(this["__user$excludeSpecificTreeLines"]);
},
_applyExcludeSpecificTreeLines:function(value,
old){if(this._initialLayoutDone){this._updateIndent();
}},
getTree:function(){return this;
},
getParentFolder:function(){return null;
},
getLevel:function(){return 0;
},
_onkeydown:function(e){var vManager=this.getManager();
vManager.getSelectedItem();
},
_onkeypress:function(e){var vManager=this.getManager();
var vSelectedItem=vManager.getSelectedItem();
switch(e.getKeyIdentifier()){case "Enter":e.preventDefault();
if(qx.ui.tree.Tree.isTreeFolder(vSelectedItem)){return vSelectedItem.toggle();
}break;
case "Left":e.preventDefault();
if(qx.ui.tree.Tree.isTreeFolder(vSelectedItem)){if(!vSelectedItem.getOpen()){var vParent=vSelectedItem.getParentFolder();
if(vParent instanceof qx.ui.tree.TreeFolder){if(vParent instanceof qx.ui.tree.Tree&&vParent.getHideNode()){return;
}
if(!(vParent instanceof qx.ui.tree.Tree)){vParent.close();
}this.setSelectedElement(vParent);
}}else{return vSelectedItem.close();
}}else if(vSelectedItem instanceof qx.ui.tree.TreeFile){var vParent=vSelectedItem.getParentFolder();
if(vParent instanceof qx.ui.tree.TreeFolder){if(!(vParent instanceof qx.ui.tree.Tree)){vParent.close();
}this.setSelectedElement(vParent);
}}break;
case "Right":e.preventDefault();
if(qx.ui.tree.Tree.isTreeFolder(vSelectedItem)){if(!vSelectedItem.getOpen()){return vSelectedItem.open();
}else if(vSelectedItem.hasContent()){var vFirst=vSelectedItem.getFirstVisibleChildOfFolder();
this.setSelectedElement(vFirst);
if(vFirst instanceof qx.ui.tree.TreeFolder){vFirst.open();
}return;
}}break;
default:if(!this._fastUpdate){this._fastUpdate=true;
this._oldItem=vSelectedItem;
}vManager.handleKeyPress(e);
}},
_onkeyup:function(e){if(this._fastUpdate){var vNewItem=this.getManager().getSelectedItem();
if(!vNewItem){return;
}vNewItem.getIconObject().addState("selected");
delete this._fastUpdate;
delete this._oldItem;
}},
getLastTreeChild:function(){var vLast=this;
while(vLast instanceof qx.ui.tree.AbstractTreeElement){if(!(vLast instanceof qx.ui.tree.TreeFolder)||!vLast.getOpen()){return vLast;
}vLast=vLast.getLastVisibleChildOfFolder();
}return null;
},
getFirstTreeChild:function(){return this;
},
setSelectedElement:function(vElement){var vManager=this.getManager();
vManager.setSelectedItem(vElement);
vManager.setLeadItem(vElement);
},
getHierarchy:function(vArr){if(!this.getHideNode()&&this._labelObject){vArr.unshift(this._labelObject.getText());
}return vArr;
},
getIndentSymbol:function(vUseTreeLines,
vColumn,
vLastColumn){if(vColumn==vLastColumn&&(this.hasContent()||this.getAlwaysShowPlusMinusSymbol())){if(!vUseTreeLines){return this.getOpen()?"minus":"plus";
}else{return this.getOpen()?"only_minus":"only_plus";
}}else{return null;
}}},
destruct:function(){this._disposeObjects("_manager");
}});




/* ID: qx.ui.selection.SelectionManager */
qx.Class.define("qx.ui.selection.SelectionManager",
{extend:qx.core.Target,
construct:function(vBoundedWidget){this.base(arguments);
this._selectedItems=new qx.ui.selection.Selection(this);
if(vBoundedWidget!=null){this.setBoundedWidget(vBoundedWidget);
}},
events:{"changeSelection":"qx.event.type.DataEvent"},
properties:{boundedWidget:{check:"qx.ui.core.Widget",
nullable:true},
multiSelection:{check:"Boolean",
init:true},
dragSelection:{check:"Boolean",
init:true},
canDeselect:{check:"Boolean",
init:true},
fireChange:{check:"Boolean",
init:true},
anchorItem:{check:"Object",
nullable:true,
apply:"_applyAnchorItem",
event:"changeAnchorItem"},
leadItem:{check:"Object",
nullable:true,
apply:"_applyLeadItem",
event:"changeLeadItem"},
multiColumnSupport:{check:"Boolean",
init:false}},
members:{_applyAnchorItem:function(value,
old){if(old){this.renderItemAnchorState(old,
false);
}
if(value){this.renderItemAnchorState(value,
true);
}},
_applyLeadItem:function(value,
old){if(old){this.renderItemLeadState(old,
false);
}
if(value){this.renderItemLeadState(value,
true);
}},
_getFirst:function(){return this.getBoundedWidget().getFirstVisibleChild();
},
_getLast:function(){return this.getBoundedWidget().getLastVisibleChild();
},
getFirst:function(){var vItem=this._getFirst();
if(vItem){return vItem.getEnabled()?vItem:this.getNext(vItem);
}},
getLast:function(){var vItem=this._getLast();
if(vItem){return vItem.getEnabled()?vItem:this.getPrevious(vItem);
}},
getItems:function(){return this.getBoundedWidget().getChildren();
},
getNextSibling:function(vItem){return vItem.getNextSibling();
},
getPreviousSibling:function(vItem){return vItem.getPreviousSibling();
},
getNext:function(vItem){while(vItem){vItem=this.getNextSibling(vItem);
if(!vItem){break;
}
if(this.getItemEnabled(vItem)){return vItem;
}}return null;
},
getPrevious:function(vItem){while(vItem){vItem=this.getPreviousSibling(vItem);
if(!vItem){break;
}
if(this.getItemEnabled(vItem)){return vItem;
}}return null;
},
isBefore:function(vItem1,
vItem2){var cs=this.getItems();
return cs.indexOf(vItem1)<cs.indexOf(vItem2);
},
isEqual:function(vItem1,
vItem2){return vItem1==vItem2;
},
getItemHashCode:function(vItem){return vItem.toHashCode();
},
scrollItemIntoView:function(vItem,
vTopLeft){vItem.scrollIntoView(vTopLeft);
},
getItemLeft:function(vItem){return vItem.getOffsetLeft();
},
getItemTop:function(vItem){return vItem.getOffsetTop();
},
getItemWidth:function(vItem){return vItem.getOffsetWidth();
},
getItemHeight:function(vItem){return vItem.getOffsetHeight();
},
getItemEnabled:function(vItem){return vItem.getEnabled();
},
renderItemSelectionState:function(vItem,
vIsSelected){vIsSelected?vItem.addState("selected"):vItem.removeState("selected");
if(vItem.handleStateChange){vItem.handleStateChange();
}},
renderItemAnchorState:function(vItem,
vIsAnchor){vIsAnchor?vItem.addState("anchor"):vItem.removeState("anchor");
if(vItem.handleStateChange!=null){vItem.handleStateChange();
}},
renderItemLeadState:function(vItem,
vIsLead){vIsLead?vItem.addState("lead"):vItem.removeState("lead");
if(vItem.handleStateChange!=null){vItem.handleStateChange();
}},
getItemSelected:function(vItem){return this._selectedItems.contains(vItem);
},
setItemSelected:function(vItem,
vSelected){switch(this.getMultiSelection()){case true:if(!this.getItemEnabled(vItem)){return;
}if(this.getItemSelected(vItem)==vSelected){return;
}this.renderItemSelectionState(vItem,
vSelected);
vSelected?this._selectedItems.add(vItem):this._selectedItems.remove(vItem);
this._dispatchChange();
break;
case false:var item0=this.getSelectedItems()[0];
if(vSelected){var old=item0;
if(this.isEqual(vItem,
old)){return;
}if(old!=null){this.renderItemSelectionState(old,
false);
}this.renderItemSelectionState(vItem,
true);
this._selectedItems.removeAll();
this._selectedItems.add(vItem);
this._dispatchChange();
}else{if(!this.isEqual(item0,
vItem)){this.renderItemSelectionState(vItem,
false);
this._selectedItems.removeAll();
this._dispatchChange();
}}break;
}},
getSelectedItems:function(){return this._selectedItems.toArray();
},
getSelectedItem:function(){return this._selectedItems.getFirst();
},
setSelectedItems:function(vItems){var oldVal=this._getChangeValue();
var oldFireChange=this.getFireChange();
this.setFireChange(false);
this._deselectAll();
var vItem;
var vItemLength=vItems.length;
for(var i=0;i<vItemLength;i++){vItem=vItems[i];
if(!this.getItemEnabled(vItem)){continue;
}this._selectedItems.add(vItem);
this.renderItemSelectionState(vItem,
true);
}this.setFireChange(oldFireChange);
if(oldFireChange&&this._hasChanged(oldVal)){this._dispatchChange();
}},
setSelectedItem:function(vItem){if(!vItem){return;
}
if(!this.getItemEnabled(vItem)){return;
}var oldVal=this._getChangeValue();
var oldFireChange=this.getFireChange();
this.setFireChange(false);
this._deselectAll();
this._selectedItems.add(vItem);
this.renderItemSelectionState(vItem,
true);
this.setFireChange(oldFireChange);
if(oldFireChange&&this._hasChanged(oldVal)){this._dispatchChange();
}},
selectAll:function(){var oldVal=this._getChangeValue();
var oldFireChange=this.getFireChange();
this.setFireChange(false);
this._selectAll();
this.setFireChange(oldFireChange);
if(oldFireChange&&this._hasChanged(oldVal)){this._dispatchChange();
}},
_selectAll:function(){if(!this.getMultiSelection()){return;
}var vItem;
var vItems=this.getItems();
var vItemsLength=vItems.length;
this._selectedItems.removeAll();
for(var i=0;i<vItemsLength;i++){vItem=vItems[i];
if(!this.getItemEnabled(vItem)){continue;
}this._selectedItems.add(vItem);
this.renderItemSelectionState(vItem,
true);
}return true;
},
deselectAll:function(){var oldVal=this._getChangeValue();
var oldFireChange=this.getFireChange();
this.setFireChange(false);
this._deselectAll();
this.setFireChange(oldFireChange);
if(oldFireChange&&this._hasChanged(oldVal))this._dispatchChange();
},
_deselectAll:function(){var items=this._selectedItems.toArray();
for(var i=0;i<items.length;i++){this.renderItemSelectionState(items[i],
false);
}this._selectedItems.removeAll();
return true;
},
selectItemRange:function(vItem1,
vItem2){var oldVal=this._getChangeValue();
var oldFireChange=this.getFireChange();
this.setFireChange(false);
this._selectItemRange(vItem1,
vItem2,
true);
this.setFireChange(oldFireChange);
if(oldFireChange&&this._hasChanged(oldVal)){this._dispatchChange();
}},
_selectItemRange:function(vItem1,
vItem2,
vDeselect){if(this.isBefore(vItem2,
vItem1)){return this._selectItemRange(vItem2,
vItem1,
vDeselect);
}if(vDeselect){this._deselectAll();
}var vCurrentItem=vItem1;
while(vCurrentItem!=null){if(this.getItemEnabled(vCurrentItem)){this._selectedItems.add(vCurrentItem);
this.renderItemSelectionState(vCurrentItem,
true);
}if(this.isEqual(vCurrentItem,
vItem2)){break;
}vCurrentItem=this.getNext(vCurrentItem);
}return true;
},
_deselectItemRange:function(vItem1,
vItem2){if(this.isBefore(vItem2,
vItem1)){return this._deselectItemRange(vItem2,
vItem1);
}var vCurrentItem=vItem1;
while(vCurrentItem!=null){this._selectedItems.remove(vCurrentItem);
this.renderItemSelectionState(vCurrentItem,
false);
if(this.isEqual(vCurrentItem,
vItem2)){break;
}vCurrentItem=this.getNext(vCurrentItem);
}},
_activeDragSession:false,
handleMouseDown:function(vItem,
e){e.stopPropagation();
if(!e.isLeftButtonPressed()&&!e.isRightButtonPressed()){return;
}if(e.isRightButtonPressed()&&this.getItemSelected(vItem)){return;
}if(e.isShiftPressed()||this.getDragSelection()||(!this.getItemSelected(vItem)&&!e.isCtrlPressed())){this._onmouseevent(vItem,
e);
}else{this.setLeadItem(vItem);
}this._activeDragSession=this.getDragSelection();
if(this._activeDragSession){this.getBoundedWidget().addEventListener("mouseup",
this._ondragup,
this);
this.getBoundedWidget().setCapture(true);
}},
_ondragup:function(e){this.getBoundedWidget().removeEventListener("mouseup",
this._ondragup,
this);
this.getBoundedWidget().setCapture(false);
this._activeDragSession=false;
},
handleMouseUp:function(vItem,
e){if(!e.isLeftButtonPressed()){return;
}
if(e.isCtrlPressed()||this.getItemSelected(vItem)&&!this._activeDragSession){this._onmouseevent(vItem,
e);
}
if(this._activeDragSession){this._activeDragSession=false;
this.getBoundedWidget().setCapture(false);
}},
handleMouseOver:function(oItem,
e){if(!this.getDragSelection()||!this._activeDragSession){return;
}this._onmouseevent(oItem,
e,
true);
},
handleClick:function(vItem,
e){},
handleDblClick:function(vItem,
e){},
_onmouseevent:function(oItem,
e,
bOver){if(!this.getItemEnabled(oItem)){return;
}var oldVal=this._getChangeValue();
var oldLead=this.getLeadItem();
var oldFireChange=this.getFireChange();
this.setFireChange(false);
var selectedItems=this.getSelectedItems();
var selectedCount=selectedItems.length;
this.setLeadItem(oItem);
var currentAnchorItem=this.getAnchorItem();
var vCtrlKey=e.isCtrlPressed();
var vShiftKey=e.isShiftPressed();
if(!currentAnchorItem||selectedCount==0||(vCtrlKey&&!vShiftKey&&this.getMultiSelection()&&!this.getDragSelection())){this.setAnchorItem(oItem);
currentAnchorItem=oItem;
}if((!vCtrlKey&&!vShiftKey&&!this._activeDragSession||!this.getMultiSelection())){if(!this.getItemEnabled(oItem)){return;
}this._deselectAll();
this.setAnchorItem(oItem);
if(this._activeDragSession){this.scrollItemIntoView((this.getBoundedWidget().getScrollTop()>(this.getItemTop(oItem)-1)?this.getPrevious(oItem):this.getNext(oItem))||oItem);
}
if(!this.getItemSelected(oItem)){this.renderItemSelectionState(oItem,
true);
}this._selectedItems.add(oItem);
this._addToCurrentSelection=true;
}else if(this._activeDragSession&&bOver){if(oldLead){this._deselectItemRange(currentAnchorItem,
oldLead);
}if(this.isBefore(currentAnchorItem,
oItem)){if(this._addToCurrentSelection){this._selectItemRange(currentAnchorItem,
oItem,
false);
}else{this._deselectItemRange(currentAnchorItem,
oItem);
}}else{if(this._addToCurrentSelection){this._selectItemRange(oItem,
currentAnchorItem,
false);
}else{this._deselectItemRange(oItem,
currentAnchorItem);
}}this.scrollItemIntoView((this.getBoundedWidget().getScrollTop()>(this.getItemTop(oItem)-1)?this.getPrevious(oItem):this.getNext(oItem))||oItem);
}else if(this.getMultiSelection()&&vCtrlKey&&!vShiftKey){if(!this._activeDragSession){this._addToCurrentSelection=!(this.getCanDeselect()&&this.getItemSelected(oItem));
}this.setItemSelected(oItem,
this._addToCurrentSelection);
this.setAnchorItem(oItem);
}else if(this.getMultiSelection()&&vCtrlKey&&vShiftKey){if(!this._activeDragSession){this._addToCurrentSelection=!(this.getCanDeselect()&&this.getItemSelected(oItem));
}
if(this._addToCurrentSelection){this._selectItemRange(currentAnchorItem,
oItem,
false);
}else{this._deselectItemRange(currentAnchorItem,
oItem);
}}else if(this.getMultiSelection()&&!vCtrlKey&&vShiftKey){if(this.getCanDeselect()){this._selectItemRange(currentAnchorItem,
oItem,
true);
}else{if(oldLead){this._deselectItemRange(currentAnchorItem,
oldLead);
}this._selectItemRange(currentAnchorItem,
oItem,
false);
}}this.setFireChange(oldFireChange);
if(oldFireChange&&this._hasChanged(oldVal)){this._dispatchChange();
}},
handleKeyDown:function(vDomEvent){this.warn("qx.ui.selection.SelectionManager.handleKeyDown is deprecated! "+"Use keypress insted and bind it to the onkeypress event.");
this.handleKeyPress(vDomEvent);
},
handleKeyPress:function(vDomEvent){var oldVal=this._getChangeValue();
var oldFireChange=this.getFireChange();
this.setFireChange(false);
if(vDomEvent.getKeyIdentifier()=="A"&&vDomEvent.isCtrlPressed()){if(this.getMultiSelection()){this._selectAll();
this.setLeadItem(this.getFirst());
}}else{var aIndex=this.getAnchorItem();
var itemToSelect=this.getItemToSelect(vDomEvent);
if(itemToSelect&&this.getItemEnabled(itemToSelect)){this.setLeadItem(itemToSelect);
this.scrollItemIntoView(itemToSelect);
vDomEvent.preventDefault();
if(vDomEvent.isShiftPressed()&&this.getMultiSelection()){if(aIndex==null){this.setAnchorItem(itemToSelect);
}this._selectItemRange(this.getAnchorItem(),
itemToSelect,
true);
}else if(!vDomEvent.isCtrlPressed()){this._deselectAll();
this.renderItemSelectionState(itemToSelect,
true);
this._selectedItems.add(itemToSelect);
this.setAnchorItem(itemToSelect);
}else if(vDomEvent.getKeyIdentifier()=="Space"){if(this._selectedItems.contains(itemToSelect)){this.renderItemSelectionState(itemToSelect,
false);
this._selectedItems.remove(itemToSelect);
this.setAnchorItem(this._selectedItems.getFirst());
}else{if(!vDomEvent.isCtrlPressed()||!this.getMultiSelection()){this._deselectAll();
}this.renderItemSelectionState(itemToSelect,
true);
this._selectedItems.add(itemToSelect);
this.setAnchorItem(itemToSelect);
}}}}this.setFireChange(oldFireChange);
if(oldFireChange&&this._hasChanged(oldVal)){this._dispatchChange();
}},
getItemToSelect:function(vKeyboardEvent){if(vKeyboardEvent.isAltPressed()){return null;
}switch(vKeyboardEvent.getKeyIdentifier()){case "Home":return this.getHome(this.getLeadItem());
case "End":return this.getEnd(this.getLeadItem());
case "Down":return this.getDown(this.getLeadItem());
case "Up":return this.getUp(this.getLeadItem());
case "Left":return this.getLeft(this.getLeadItem());
case "Right":return this.getRight(this.getLeadItem());
case "PageUp":return this.getPageUp(this.getLeadItem())||this.getHome(this.getLeadItem());
case "PageDown":return this.getPageDown(this.getLeadItem())||this.getEnd(this.getLeadItem());
case "Space":if(vKeyboardEvent.isCtrlPressed()){return this.getLeadItem();
}}return null;
},
_dispatchChange:function(){if(!this.getFireChange()){return;
}
if(this.hasEventListeners("changeSelection")){this.dispatchEvent(new qx.event.type.DataEvent("changeSelection",
this.getSelectedItems()),
true);
}},
_hasChanged:function(sOldValue){return sOldValue!=this._getChangeValue();
},
_getChangeValue:function(){return this._selectedItems.getChangeValue();
},
getHome:function(){return this.getFirst();
},
getEnd:function(){return this.getLast();
},
getDown:function(vItem){if(!vItem){return this.getFirst();
}return this.getMultiColumnSupport()?(this.getUnder(vItem)||this.getLast()):this.getNext(vItem);
},
getUp:function(vItem){if(!vItem){return this.getLast();
}return this.getMultiColumnSupport()?(this.getAbove(vItem)||this.getFirst()):this.getPrevious(vItem);
},
getLeft:function(vItem){if(!this.getMultiColumnSupport()){return null;
}return !vItem?this.getLast():this.getPrevious(vItem);
},
getRight:function(vItem){if(!this.getMultiColumnSupport()){return null;
}return !vItem?this.getFirst():this.getNext(vItem);
},
getAbove:function(vItem){throw new Error("getAbove(): Not implemented yet");
},
getUnder:function(vItem){throw new Error("getUnder(): Not implemented yet");
},
getPageUp:function(vItem){var vBoundedWidget=this.getBoundedWidget();
var vParentScrollTop=vBoundedWidget.getScrollTop();
var vParentClientHeight=vBoundedWidget.getClientHeight();
var nextItem=this.getLeadItem();
if(!nextItem){nextItem=this.getFirst();
}var tryLoops=0;
while(tryLoops<2){while(nextItem&&(this.getItemTop(nextItem)-this.getItemHeight(nextItem)>=vParentScrollTop)){nextItem=this.getUp(nextItem);
}if(nextItem==null){break;
}if(nextItem!=this.getLeadItem()){this.scrollItemIntoView(nextItem,
true);
break;
}vBoundedWidget.setScrollTop(vParentScrollTop-vParentClientHeight-this.getItemHeight(nextItem));
vParentScrollTop=vBoundedWidget.getScrollTop();
tryLoops++;
}return nextItem;
},
getPageDown:function(vItem){var vBoundedWidget=this.getBoundedWidget();
var vParentScrollTop=vBoundedWidget.getScrollTop();
var vParentClientHeight=vBoundedWidget.getClientHeight();
var nextItem=this.getLeadItem();
if(!nextItem){nextItem=this.getFirst();
}var tryLoops=0;
while(tryLoops<2){while(nextItem&&((this.getItemTop(nextItem)+(2*this.getItemHeight(nextItem)))<=(vParentScrollTop+vParentClientHeight))){nextItem=this.getDown(nextItem);
}if(nextItem==null){break;
}if(nextItem!=this.getLeadItem()){break;
}vBoundedWidget.setScrollTop(vParentScrollTop+vParentClientHeight-2*this.getItemHeight(nextItem));
vParentScrollTop=vBoundedWidget.getScrollTop();
tryLoops++;
}return nextItem;
}},
destruct:function(){this._disposeObjects("_selectedItems");
}});




/* ID: qx.ui.selection.Selection */
qx.Class.define("qx.ui.selection.Selection",
{extend:qx.core.Object,
construct:function(mgr){this.base(arguments);
this.__manager=mgr;
this.removeAll();
},
members:{add:function(item){this.__storage[this.getItemHashCode(item)]=item;
},
remove:function(item){delete this.__storage[this.getItemHashCode(item)];
},
removeAll:function(){this.__storage={};
},
contains:function(item){return this.getItemHashCode(item) in this.__storage;
},
toArray:function(){var res=[];
for(var key in this.__storage){res.push(this.__storage[key]);
}return res;
},
getFirst:function(){for(var key in this.__storage){return this.__storage[key];
}return null;
},
getChangeValue:function(){var sb=[];
for(var key in this.__storage){sb.push(key);
}sb.sort();
return sb.join(";");
},
getItemHashCode:function(item){return this.__manager.getItemHashCode(item);
},
isEmpty:function(){return qx.lang.Object.isEmpty(this.__storage);
}},
destruct:function(){this._disposeFields("__storage",
"__manager");
}});




/* ID: qx.ui.tree.SelectionManager */
qx.Class.define("qx.ui.tree.SelectionManager",
{extend:qx.ui.selection.SelectionManager,
construct:function(vBoundedWidget){this.base(arguments,
vBoundedWidget);
},
properties:{multiSelection:{refine:true,
init:false},
dragSelection:{refine:true,
init:false}},
members:{_getFirst:function(){return qx.lang.Array.getFirst(this.getItems());
},
_getLast:function(){return qx.lang.Array.getLast(this.getItems());
},
getItems:function(){return this.getBoundedWidget().getItems();
},
getNext:function(vItem){if(vItem){if(qx.ui.tree.Tree.isOpenTreeFolder(vItem)){return vItem.getFirstVisibleChildOfFolder();
}else if(vItem.isLastVisibleChild()){var vCurrent=vItem;
while(vCurrent&&vCurrent.isLastVisibleChild()){vCurrent=vCurrent.getParentFolder();
}
if(vCurrent&&vCurrent instanceof qx.ui.tree.AbstractTreeElement&&vCurrent.getNextVisibleSibling()&&vCurrent.getNextVisibleSibling() instanceof qx.ui.tree.AbstractTreeElement){return vCurrent.getNextVisibleSibling();
}}else{return vItem.getNextVisibleSibling();
}}else{return this.getBoundedWidget().getFirstTreeChild();
}},
getPrevious:function(vItem){if(vItem){if(vItem==this.getBoundedWidget()){return;
}else if(vItem.isFirstVisibleChild()){if(vItem.getParentFolder() instanceof qx.ui.tree.TreeFolder){if(vItem.getParentFolder() instanceof qx.ui.tree.Tree&&vItem.getParentFolder().getHideNode()){return vItem;
}return vItem.getParentFolder();
}}else{var vPrev=vItem.getPreviousVisibleSibling();
while(vPrev instanceof qx.ui.tree.AbstractTreeElement){if(qx.ui.tree.Tree.isOpenTreeFolder(vPrev)){vPrev=vPrev.getLastVisibleChildOfFolder();
}else{break;
}}return vPrev;
}}else{return this.getBoundedWidget().getLastTreeChild();
}},
getItemTop:function(vItem){var vBoundedWidget=this.getBoundedWidget();
var vElement=vItem.getElement();
var vOffset=0;
while(vElement&&vElement.qx_Widget!=vBoundedWidget){vOffset+=vElement.offsetTop;
vElement=vElement.parentNode;
}return vOffset;
},
getItemHeight:function(vItem){if(vItem instanceof qx.ui.tree.TreeFolder&&vItem._horizontalLayout){return vItem._horizontalLayout.getOffsetHeight();
}else{return vItem.getOffsetHeight();
}},
scrollItemIntoView:function(vItem){if(vItem instanceof qx.ui.tree.TreeFolder&&vItem._horizontalLayout){return vItem._horizontalLayout.scrollIntoView();
}else{return vItem.scrollIntoView();
}},
renderItemSelectionState:function(treeNode,
isSelected){if(isSelected&&!treeNode.isSeeable()){var treeFolder=treeNode;
var parentFolders=[];
while(treeFolder){treeFolder=treeFolder.getParentFolder();
parentFolders.push(treeFolder);
}parentFolders.pop();
while(parentFolders.length){parentFolders.pop().open();
}}
if(isSelected){if(treeNode.isCreated()){this.scrollItemIntoView(treeNode);
}else{treeNode.addEventListener("appear",
function(e){this.scrollItemIntoView(treeNode);
},
this);
}}treeNode.setSelected(isSelected);
}}});




/* ID: qx.ui.tree.TreeFile */
qx.Class.define("qx.ui.tree.TreeFile",
{extend:qx.ui.tree.AbstractTreeElement,
construct:function(labelOrTreeRowStructure,
icon,
iconSelected){this.base(arguments,
this._getRowStructure(labelOrTreeRowStructure,
icon,
iconSelected));
},
members:{getIndentSymbol:function(vUseTreeLines,
vColumn,
vFirstColumn,
vLastColumn){var vExcludeList=this.getTree().getExcludeSpecificTreeLines();
var vExclude=vExcludeList[vLastColumn-vColumn-1];
if(vUseTreeLines&&!(vExclude===true)){if(vColumn==vFirstColumn){return this.isLastChild()?"end":"cross";
}else{return "line";
}}return null;
},
_updateIndent:function(){this.addToTreeQueue();
},
getItems:function(){return [this];
}}});




/* ID: qx.ui.table.Table */
qx.Class.define("qx.ui.table.Table",
{extend:qx.ui.layout.VerticalBoxLayout,
construct:function(tableModel,
custom){this.base(arguments);
if(!custom){custom={};
}
if(custom.selectionManager){this.setNewSelectionManager(custom.selectionManager);
}
if(custom.selectionModel){this.setNewSelectionModel(custom.selectionModel);
}
if(custom.tableColumnModel){this.setNewTableColumnModel(custom.tableColumnModel);
}
if(custom.tablePane){this.setNewTablePane(custom.tablePane);
}
if(custom.tablePaneHeader){this.setNewTablePaneHeader(custom.tablePaneHeader);
}
if(custom.tablePaneScroller){this.setNewTablePaneScroller(custom.tablePaneScroller);
}
if(custom.tablePaneModel){this.setNewTablePaneModel(custom.tablePaneModel);
}this._scrollerParent=new qx.ui.layout.HorizontalBoxLayout;
this._scrollerParent.setDimension("100%",
"1*");
this._scrollerParent.setSpacing(1);
this._statusBar=new qx.ui.basic.Label;
this._statusBar.setAppearance("table-focus-statusbar");
this._statusBar.setDimension("100%",
"auto");
this.add(this._scrollerParent,
this._statusBar);
this._columnVisibilityBt=new qx.ui.form.Button;
this._columnVisibilityBt.setAppearance("table-menubar-button");
this._columnVisibilityBt.setHeight(null);
this._columnVisibilityBt.setWidth("auto");
this._columnVisibilityBt.setAllowStretchY(true);
this._columnVisibilityBt.addEventListener("execute",
this._onColumnVisibilityBtExecuted,
this);
this.setDataRowRenderer(new qx.ui.table.rowrenderer.Default(this));
this._selectionManager=this.getNewSelectionManager()(this);
this.setSelectionModel(this.getNewSelectionModel()(this));
this.setTableColumnModel(this.getNewTableColumnModel()(this));
if(tableModel!=null){this.setTableModel(tableModel);
}this.setMetaColumnCounts([-1]);
this.setTabIndex(1);
this.addEventListener("keydown",
this._onkeydown);
this.addEventListener("keypress",
this._onkeypress);
this.addEventListener("changeFocused",
this._onFocusChanged);
this._focusedCol=0;
this._focusedRow=0;
qx.locale.Manager.getInstance().addEventListener("changeLocale",
this._onChangeLocale,
this);
},
events:{"columnVisibilityMenuCreateStart":"qx.event.type.DataEvent",
"columnVisibilityMenuCreateEnd":"qx.event.type.DataEvent",
"tableWidthChanged":"qx.event.type.DataEvent",
"verticalScrollBarChanged":"qx.event.type.DataEvent",
"cellClick":"qx.ui.table.pane.CellEvent",
"cellDblclick":"qx.ui.table.pane.CellEvent",
"cellContextmenu":"qx.ui.table.pane.CellEvent"},
statics:{__redirectEvents:{cellClick:1,
cellDblclick:1,
cellContextmenu:1}},
properties:{selectionModel:{check:"qx.ui.table.selection.Model",
apply:"_applySelectionModel",
event:"changeSelectionModel"},
tableModel:{check:"qx.ui.table.ITableModel",
apply:"_applyTableModel",
event:"changeTableModel",
nullable:true},
tableColumnModel:{check:"qx.ui.table.columnmodel.Basic",
apply:"_applyTableColumnModel",
event:"changeTableColumnModel"},
rowHeight:{check:"Number",
init:20,
event:"changeRowHeight"},
statusBarVisible:{check:"Boolean",
init:true,
apply:"_applyStatusBarVisible"},
columnVisibilityButtonVisible:{check:"Boolean",
init:true,
apply:"_applyColumnVisibilityButtonVisible"},
metaColumnCounts:{check:"Object",
apply:"_applyMetaColumnCounts"},
focusCellOnMouseMove:{check:"Boolean",
init:false,
apply:"_applyFocusCellOnMouseMove"},
showCellFocusIndicator:{check:"Boolean",
init:true,
apply:"_applyShowCellFocusIndicator"},
keepFirstVisibleRowComplete:{check:"Boolean",
init:true,
apply:"_applyKeepFirstVisibleRowComplete"},
alwaysUpdateCells:{check:"Boolean",
init:false},
dataRowRenderer:{check:"qx.ui.table.IRowRenderer",
init:null,
nullable:true,
event:"changeDataRowRenderer"},
modalCellEditorPreOpenFunction:{check:"Function",
init:null,
nullable:true},
newSelectionManager:{check:"Function",
init:function(obj){return new qx.ui.table.selection.Manager(obj);
}},
newSelectionModel:{check:"Function",
init:function(obj){return new qx.ui.table.selection.Model(obj);
}},
newTableColumnModel:{check:"Function",
init:function(obj){return new qx.ui.table.columnmodel.Basic(obj);
}},
newTablePane:{check:"Function",
init:function(obj){return new qx.ui.table.pane.Pane(obj);
}},
newTablePaneHeader:{check:"Function",
init:function(obj){return new qx.ui.table.pane.Header(obj);
}},
newTablePaneScroller:{check:"Function",
init:function(obj){return new qx.ui.table.pane.Scroller(obj);
}},
newTablePaneModel:{check:"Function",
init:function(columnModel){return new qx.ui.table.pane.Model(columnModel);
}}},
members:{_applySelectionModel:function(value,
old){this._selectionManager.setSelectionModel(value);
if(old!=null){old.removeEventListener("changeSelection",
this._onSelectionChanged,
this);
}value.addEventListener("changeSelection",
this._onSelectionChanged,
this);
},
_applyTableModel:function(value,
old){this.getTableColumnModel().init(value.getColumnCount(),
this);
if(old!=null){old.removeEventListener(qx.ui.table.ITableModel.EVENT_TYPE_META_DATA_CHANGED,
this._onTableModelMetaDataChanged,
this);
old.removeEventListener(qx.ui.table.ITableModel.EVENT_TYPE_DATA_CHANGED,
this._onTableModelDataChanged,
this);
}value.addEventListener(qx.ui.table.ITableModel.EVENT_TYPE_META_DATA_CHANGED,
this._onTableModelMetaDataChanged,
this);
value.addEventListener(qx.ui.table.ITableModel.EVENT_TYPE_DATA_CHANGED,
this._onTableModelDataChanged,
this);
this._updateStatusBar();
},
_applyTableColumnModel:function(value,
old){if(old!=null){throw new Error("The table column model can only be set once per table.");
}value.addEventListener("visibilityChanged",
this._onColVisibilityChanged,
this);
value.addEventListener("widthChanged",
this._onColWidthChanged,
this);
value.addEventListener("orderChanged",
this._onColOrderChanged,
this);
var tm=this.getTableModel();
if(tm){value.init(tm.getColumnCount(),
this);
}var scrollerArr=this._getPaneScrollerArr();
for(var i=0;i<scrollerArr.length;i++){var paneScroller=scrollerArr[i];
var paneModel=paneScroller.getTablePaneModel();
paneModel._tableColumnModel=value;
}},
_applyStatusBarVisible:function(value,
old){this._statusBar.setDisplay(value);
if(value){this._updateStatusBar();
}},
_applyColumnVisibilityButtonVisible:function(value,
old){this._columnVisibilityBt.setDisplay(value);
},
_applyMetaColumnCounts:function(value,
old){var metaColumnCounts=value;
var scrollerArr=this._getPaneScrollerArr();
this._cleanUpMetaColumns(metaColumnCounts.length);
var leftX=0;
for(var i=0;i<scrollerArr.length;i++){var paneScroller=scrollerArr[i];
var paneModel=paneScroller.getTablePaneModel();
paneModel.setFirstColumnX(leftX);
paneModel.setMaxColumnCount(metaColumnCounts[i]);
leftX+=metaColumnCounts[i];
}if(metaColumnCounts.length>scrollerArr.length){var columnModel=this.getTableColumnModel();
for(var i=scrollerArr.length;i<metaColumnCounts.length;i++){var paneModel=this.getNewTablePaneModel()(columnModel);
paneModel.setFirstColumnX(leftX);
paneModel.setMaxColumnCount(metaColumnCounts[i]);
leftX+=metaColumnCounts[i];
var paneScroller=this.getNewTablePaneScroller()(this);
paneScroller.setTablePaneModel(paneModel);
paneScroller.addEventListener("changeScrollY",
this._onScrollY,
this);
this._scrollerParent.add(paneScroller);
}}for(var i=0;i<scrollerArr.length;i++){var paneScroller=scrollerArr[i];
var isLast=(i==(scrollerArr.length-1));
paneScroller.setTopRightWidget(isLast?this._columnVisibilityBt:null);
}this._updateScrollerWidths();
this._updateScrollBarVisibility();
},
_applyFocusCellOnMouseMove:function(value,
old){var scrollerArr=this._getPaneScrollerArr();
for(var i=0;i<scrollerArr.length;i++){scrollerArr[i].setFocusCellOnMouseMove(value);
}},
_applyShowCellFocusIndicator:function(value,
old){var scrollerArr=this._getPaneScrollerArr();
for(var i=0;i<scrollerArr.length;i++){scrollerArr[i].setShowCellFocusIndicator(value);
}},
_applyKeepFirstVisibleRowComplete:function(value,
old){var scrollerArr=this._getPaneScrollerArr();
for(var i=0;i<scrollerArr.length;i++){scrollerArr[i]._onKeepFirstVisibleRowCompleteChanged();
}},
_getSelectionManager:function(){return this._selectionManager;
},
_getPaneScrollerArr:function(){return this._scrollerParent.getChildren();
},
getPaneScroller:function(metaColumn){return this._getPaneScrollerArr()[metaColumn];
},
_cleanUpMetaColumns:function(fromMetaColumn){var scrollerArr=this._getPaneScrollerArr();
if(scrollerArr!=null){for(var i=scrollerArr.length-1;i>=fromMetaColumn;i--){scrollerArr[i].dispose();
}}},
_onChangeLocale:function(evt){this.postponedUpdateContent();
this._updateStatusBar();
},
_onSelectionChanged:function(evt){var scrollerArr=this._getPaneScrollerArr();
for(var i=0;i<scrollerArr.length;i++){scrollerArr[i]._onSelectionChanged(evt);
}this._updateStatusBar();
},
_onTableModelMetaDataChanged:function(evt){var scrollerArr=this._getPaneScrollerArr();
for(var i=0;i<scrollerArr.length;i++){scrollerArr[i]._onTableModelMetaDataChanged(evt);
}this._updateStatusBar();
},
_onTableModelDataChanged:function(evt){var scrollerArr=this._getPaneScrollerArr();
for(var i=0;i<scrollerArr.length;i++){scrollerArr[i]._onTableModelDataChanged(evt);
}var rowCount=this.getTableModel().getRowCount();
if(rowCount!=this._lastRowCount){this._lastRowCount=rowCount;
this._updateScrollBarVisibility();
this._updateStatusBar();
}},
_onScrollY:function(evt){if(!this._internalChange){this._internalChange=true;
var scrollerArr=this._getPaneScrollerArr();
for(var i=0;i<scrollerArr.length;i++){scrollerArr[i].setScrollY(evt.getValue());
}this._internalChange=false;
}},
_onkeydown:function(evt){if(!this.getEnabled()){return;
}var identifier=evt.getKeyIdentifier();
var consumed=false;
var oldFocusedRow=this._focusedRow;
if(this.isEditing()){if(evt.getModifiers()==0){consumed=true;
switch(identifier){case "Enter":this.stopEditing();
var oldFocusedRow=this._focusedRow;
this.moveFocusedCell(0,
1);
if(this._focusedRow!=oldFocusedRow){consumed=this.startEditing();
}break;
case "Escape":this.cancelEditing();
this.focus();
break;
default:consumed=false;
break;
}}}else{consumed=true;
switch(identifier){case "Home":this.setFocusedCell(this._focusedCol,
0,
true);
break;
case "End":var rowCount=this.getTableModel().getRowCount();
this.setFocusedCell(this._focusedCol,
rowCount-1,
true);
break;
default:consumed=false;
break;
}if(evt.getModifiers()==0){consumed=true;
switch(identifier){case "F2":case "Enter":consumed=this.startEditing();
break;
default:consumed=false;
break;
}}else if(evt.isCtrlPressed()){consumed=true;
switch(identifier){case "A":var rowCount=this.getTableModel().getRowCount();
if(rowCount>0){this.getSelectionModel().setSelectionInterval(0,
rowCount-1);
}break;
default:consumed=false;
break;
}}}
if(oldFocusedRow!=this._focusedRow){this._selectionManager.handleMoveKeyDown(this._focusedRow,
evt);
}
if(consumed){evt.preventDefault();
evt.stopPropagation();
}},
_onkeypress:function(evt){if(!this.getEnabled()){return;
}
if(this.isEditing()){return;
}var oldFocusedRow=this._focusedRow;
var consumed=true;
var identifier=evt.getKeyIdentifier();
switch(identifier){case "Space":this._selectionManager.handleSelectKeyDown(this._focusedRow,
evt);
break;
case "Left":this.moveFocusedCell(-1,
0);
break;
case "Right":this.moveFocusedCell(1,
0);
break;
case "Up":this.moveFocusedCell(0,
-1);
break;
case "Down":this.moveFocusedCell(0,
1);
break;
case "PageUp":case "PageDown":var scroller=this.getPaneScroller(0);
var pane=scroller.getTablePane();
var rowCount=pane.getVisibleRowCount()-1;
var rowHeight=this.getRowHeight();
var direction=(identifier=="PageUp")?-1:1;
scroller.setScrollY(scroller.getScrollY()+direction*rowCount*rowHeight);
this.moveFocusedCell(0,
direction*rowCount);
break;
default:consumed=false;
}
if(oldFocusedRow!=this._focusedRow){this._selectionManager.handleMoveKeyDown(this._focusedRow,
evt);
}
if(consumed){evt.preventDefault();
evt.stopPropagation();
}},
_onFocusChanged:function(evt){var scrollerArr=this._getPaneScrollerArr();
for(var i=0;i<scrollerArr.length;i++){scrollerArr[i]._onFocusChanged(evt);
}},
_onColVisibilityChanged:function(evt){var scrollerArr=this._getPaneScrollerArr();
for(var i=0;i<scrollerArr.length;i++){scrollerArr[i]._onColVisibilityChanged(evt);
}this._updateScrollerWidths();
this._updateScrollBarVisibility();
},
_onColWidthChanged:function(evt){var scrollerArr=this._getPaneScrollerArr();
for(var i=0;i<scrollerArr.length;i++){scrollerArr[i]._onColWidthChanged(evt);
}this._updateScrollerWidths();
this._updateScrollBarVisibility();
},
_onColOrderChanged:function(evt){var scrollerArr=this._getPaneScrollerArr();
for(var i=0;i<scrollerArr.length;i++){scrollerArr[i]._onColOrderChanged(evt);
}this._updateScrollerWidths();
this._updateScrollBarVisibility();
},
getTablePaneScrollerAtPageX:function(pageX){var metaCol=this._getMetaColumnAtPageX(pageX);
return (metaCol!=-1)?this.getPaneScroller(metaCol):null;
},
setFocusedCell:function(col,
row,
scrollVisible){if(!this.isEditing()&&(col!=this._focusedCol||row!=this._focusedRow)){this._focusedCol=col;
this._focusedRow=row;
var scrollerArr=this._getPaneScrollerArr();
for(var i=0;i<scrollerArr.length;i++){scrollerArr[i].setFocusedCell(col,
row);
}
if(scrollVisible){this.scrollCellVisible(col,
row);
}}},
getFocusedColumn:function(){return this._focusedCol;
},
getFocusedRow:function(){return this._focusedRow;
},
moveFocusedCell:function(deltaX,
deltaY){var col=this._focusedCol;
var row=this._focusedRow;
if(deltaX!=0){var columnModel=this.getTableColumnModel();
var x=columnModel.getVisibleX(col);
var colCount=columnModel.getVisibleColumnCount();
x=qx.lang.Number.limit(x+deltaX,
0,
colCount-1);
col=columnModel.getVisibleColumnAtX(x);
}
if(deltaY!=0){var tableModel=this.getTableModel();
row=qx.lang.Number.limit(row+deltaY,
0,
tableModel.getRowCount()-1);
}this.setFocusedCell(col,
row,
true);
},
scrollCellVisible:function(col,
row){var columnModel=this.getTableColumnModel();
var x=columnModel.getVisibleX(col);
var metaColumn=this._getMetaColumnAtColumnX(x);
if(metaColumn!=-1){this.getPaneScroller(metaColumn).scrollCellVisible(col,
row);
}},
isEditing:function(){if(this._focusedCol!=null){var x=this.getTableColumnModel().getVisibleX(this._focusedCol);
var metaColumn=this._getMetaColumnAtColumnX(x);
return this.getPaneScroller(metaColumn).isEditing();
}},
startEditing:function(){if(this._focusedCol!=null){var x=this.getTableColumnModel().getVisibleX(this._focusedCol);
var metaColumn=this._getMetaColumnAtColumnX(x);
return this.getPaneScroller(metaColumn).startEditing();
}return false;
},
stopEditing:function(){if(this._focusedCol!=null){var x=this.getTableColumnModel().getVisibleX(this._focusedCol);
var metaColumn=this._getMetaColumnAtColumnX(x);
this.getPaneScroller(metaColumn).stopEditing();
}},
cancelEditing:function(){if(this._focusedCol!=null){var x=this.getTableColumnModel().getVisibleX(this._focusedCol);
var metaColumn=this._getMetaColumnAtColumnX(x);
this.getPaneScroller(metaColumn).cancelEditing();
}},
postponedUpdateContent:function(){if(!this._updateContentPlanned){qx.client.Timer.once(function(){if(this.getDisposed()){return;
}this.updateContent();
this._updateContentPlanned=false;
qx.ui.core.Widget.flushGlobalQueues();
},
this,
0);
this._updateContentPlanned=true;
}},
updateContent:function(){var scrollerArr=this._getPaneScrollerArr();
for(var i=0;i<scrollerArr.length;i++){scrollerArr[i]._tablePane._updateContent();
}},
_getMetaColumnAtPageX:function(pageX){var scrollerArr=this._getPaneScrollerArr();
for(var i=0;i<scrollerArr.length;i++){var elem=scrollerArr[i].getElement();
if(pageX>=qx.bom.element.Location.getLeft(elem)&&pageX<=qx.bom.element.Location.getRight(elem)){return i;
}}return -1;
},
_getMetaColumnAtColumnX:function(visXPos){var metaColumnCounts=this.getMetaColumnCounts();
var rightXPos=0;
for(var i=0;i<metaColumnCounts.length;i++){var counts=metaColumnCounts[i];
rightXPos+=counts;
if(counts==-1||visXPos<rightXPos){return i;
}}return -1;
},
_updateStatusBar:function(){if(this.getStatusBarVisible()){var selectedRowCount=this.getSelectionModel().getSelectedCount();
var rowCount=this.getTableModel().getRowCount();
var text;
if(selectedRowCount==0){text=this.trn("one row",
"%1 rows",
rowCount,
rowCount);
}else{text=this.trn("one of one row",
"%1 of %2 rows",
rowCount,
selectedRowCount,
rowCount);
}this._statusBar.setText(text);
}},
_updateScrollerWidths:function(){var scrollerArr=this._getPaneScrollerArr();
for(var i=0;i<scrollerArr.length;i++){var isLast=(i==(scrollerArr.length-1));
var width=isLast?"1*":scrollerArr[i].getTablePaneModel().getTotalWidth();
scrollerArr[i].setWidth(width);
}},
_updateScrollBarVisibility:function(){if(this.isSeeable()){var horBar=qx.ui.table.pane.Scroller.HORIZONTAL_SCROLLBAR;
var verBar=qx.ui.table.pane.Scroller.VERTICAL_SCROLLBAR;
var scrollerArr=this._getPaneScrollerArr();
var horNeeded=false;
var verNeeded=false;
for(var i=0;i<scrollerArr.length;i++){var isLast=(i==(scrollerArr.length-1));
var bars=scrollerArr[i].getNeededScrollBars(horNeeded,
!isLast);
if(bars&horBar){horNeeded=true;
}
if(isLast&&(bars&verBar)){verNeeded=true;
}}for(var i=0;i<scrollerArr.length;i++){var isLast=(i==(scrollerArr.length-1));
var bHadVerticalScrollBar;
scrollerArr[i].setHorizontalScrollBarVisible(horNeeded);
if(isLast){bHadVerticalScrollBar=scrollerArr[i].getVerticalScrollBarVisible();
}scrollerArr[i].setVerticalScrollBarVisible(isLast&&verNeeded);
if(isLast&&verNeeded!=bHadVerticalScrollBar){this.createDispatchDataEvent("verticalScrollBarChanged",
verNeeded);
}}}},
_onColumnVisibilityBtExecuted:function(){if((this._columnVisibilityMenuCloseTime==null)||(new Date().getTime()>this._columnVisibilityMenuCloseTime+200)){this._toggleColumnVisibilityMenu();
}},
_toggleColumnVisibilityMenu:function(){if(!this.getEnabled()){return;
}var menu=new qx.ui.menu.Menu;
menu.addEventListener("disappear",
function(evt){this._cleanupColumnVisibilityMenu();
this._columnVisibilityMenuCloseTime=new Date().getTime();
},
this);
var tableModel=this.getTableModel();
var columnModel=this.getTableColumnModel();
var data={table:this,
menu:menu};
this.createDispatchDataEvent("columnVisibilityMenuCreateStart",
data,
true);
for(var x=0;x<columnModel.getOverallColumnCount();x++){var col=columnModel.getOverallColumnAtX(x);
var visible=columnModel.isColumnVisible(col);
var bt=new qx.ui.menu.CheckBox(tableModel.getColumnName(col),
null,
visible);
var handler=this._createColumnVisibilityCheckBoxHandler(col);
bt._handler=handler;
bt.addEventListener("execute",
handler,
this);
menu.add(bt);
}var data={table:this,
menu:menu};
this.createDispatchDataEvent("columnVisibilityMenuCreateEnd",
data,
true);
menu.setParent(this.getTopLevelWidget());
this._columnVisibilityMenu=menu;
var btElem=this._columnVisibilityBt.getElement();
menu.setRestrictToPageOnOpen(false);
menu.setTop(qx.bom.element.Location.getBottom(btElem));
menu.setLeft(-1000);
var self=this;
window.setTimeout(function(){if(self.getDisposed()){return;
}menu.show();
qx.ui.core.Widget.flushGlobalQueues();
menu.setLeft(qx.bom.element.Location.getRight(btElem)-menu.getOffsetWidth());
},
0);
},
_cleanupColumnVisibilityMenu:function(){if(this._columnVisibilityMenu!=null&&!this._columnVisibilityMenu.getDisposed()){var parent=this._columnVisibilityMenu.getParent();
if(parent){parent.remove(this._columnVisibilityMenu);
}this._columnVisibilityMenu.dispose();
this._columnVisibilityMenu=null;
}},
_createColumnVisibilityCheckBoxHandler:function(col){return function(evt){var columnModel=this.getTableColumnModel();
columnModel.setColumnVisible(col,
!columnModel.isColumnVisible(col));
};
},
setColumnWidth:function(col,
width){this.getTableColumnModel().setColumnWidth(col,
width);
},
_changeInnerWidth:function(vNew,
vOld){var self=this;
window.setTimeout(function(){if(self.getDisposed()){return;
}self.createDispatchEvent("tableWidthChanged");
self._updateScrollerWidths();
self._updateScrollBarVisibility();
qx.ui.core.Widget.flushGlobalQueues();
},
0);
return this.base(arguments,
vNew,
vOld);
},
_changeInnerHeight:function(vNew,
vOld){var self=this;
window.setTimeout(function(){if(self.getDisposed()){return;
}self._updateScrollBarVisibility();
qx.ui.core.Widget.flushGlobalQueues();
},
0);
return this.base(arguments,
vNew,
vOld);
},
_afterAppear:function(){this.base(arguments);
this._updateScrollBarVisibility();
},
addEventListener:function(type,
func,
obj){if(this.self(arguments).__redirectEvents[type]){for(var i=0,
arr=this._getPaneScrollerArr();i<arr.length;i++){arr[i].addEventListener.apply(arr[i],
arguments);
}}else{arguments.callee.base.apply(this,
arguments);
}},
removeEventListener:function(type,
func,
obj){if(this.self(arguments).__redirectEvents[type]){for(var i=0,
arr=this._getPaneScrollerArr();i<arr.length;i++){arr[i].removeEventListener.apply(arr[i],
arguments);
}}else{arguments.callee.base.apply(this,
arguments);
}}},
destruct:function(){var selectionModel=this.getSelectionModel();
if(selectionModel){selectionModel.dispose();
}var dataRowRenderer=this.getDataRowRenderer();
if(dataRowRenderer){dataRowRenderer.dispose();
}this._cleanUpMetaColumns(0);
this._disposeObjects("_selectionManager",
"_columnVisibilityMenu",
"_tableModel",
"_columnVisibilityBt",
"_scrollerParent",
"_statusBar");
}});




/* ID: qx.ui.table.IRowRenderer */
qx.Interface.define("qx.ui.table.IRowRenderer",
{members:{updateDataRowElement:function(rowInfo,
rowElement){return true;
},
createRowStyle:function(rowInfo){return true;
},
getRowClass:function(rowInfo){return true;
}}});




/* ID: qx.ui.table.rowrenderer.Default */
qx.Class.define("qx.ui.table.rowrenderer.Default",
{extend:qx.core.Target,
implement:qx.ui.table.IRowRenderer,
construct:function(table){this.base(arguments);
this._fontStyle={};
this._fontStyleString="";
this._colors={};
this._table=table;
qx.theme.manager.Font.getInstance().connect(this._styleFont,
this,
"default");
qx.theme.manager.Color.getInstance().connect(this._styleBgcolFocusedSelected,
this,
"table-row-background-focused-selected");
qx.theme.manager.Color.getInstance().connect(this._styleBgcolFocused,
this,
"table-row-background-focused");
qx.theme.manager.Color.getInstance().connect(this._styleBgcolSelected,
this,
"table-row-background-selected");
qx.theme.manager.Color.getInstance().connect(this._styleBgcolEven,
this,
"table-row-background-even");
qx.theme.manager.Color.getInstance().connect(this._styleBgcolOdd,
this,
"table-row-background-odd");
qx.theme.manager.Color.getInstance().connect(this._styleColSelected,
this,
"table-row-selected");
qx.theme.manager.Color.getInstance().connect(this._styleColNormal,
this,
"table-row");
},
properties:{highlightFocusRow:{check:"Boolean",
init:true}},
members:{_styleBgcolFocusedSelected:function(value,
old){this._colors.bgcolFocusedSelected=value;
this._postponedUpdateTableContent();
},
_styleBgcolFocused:function(value,
old){this._colors.bgcolFocused=value;
this._postponedUpdateTableContent();
},
_styleBgcolSelected:function(value,
old){this._colors.bgcolSelected=value;
this._postponedUpdateTableContent();
},
_styleBgcolEven:function(value,
old){this._colors.bgcolEven=value;
this._postponedUpdateTableContent();
},
_styleBgcolOdd:function(value,
old){this._colors.bgcolOdd=value;
this._postponedUpdateTableContent();
},
_styleColSelected:function(value,
old){this._colors.colSelected=value;
this._postponedUpdateTableContent();
},
_styleColNormal:function(value,
old){this._colors.colNormal=value;
this._postponedUpdateTableContent();
},
_styleFont:function(value){this.__font=value;
this._renderFont();
},
_renderFont:function(){var value=this.__font;
if(value){value.renderStyle(this._fontStyle);
this._fontStyleString=value.generateStyle();
}else{qx.ui.core.Font.resetStyle(this._fontStyle);
this._fontStyleString="";
}this._postponedUpdateTableContent();
},
updateDataRowElement:function(rowInfo,
rowElem){var fontStyle=this._fontStyle;
var style=rowElem.style;
style.fontFamily=fontStyle.fontFamily;
style.fontSize=fontStyle.fontSize;
style.fontWeight=fontStyle.fontWeight;
style.fontStyle=fontStyle.fontStyle;
style.textDecoration=fontStyle.textDecoration;
if(rowInfo.focusedRow&&this.getHighlightFocusRow()){style.backgroundColor=rowInfo.selected?this._colors.bgcolFocusedSelected:this._colors.bgcolFocused;
}else{if(rowInfo.selected){style.backgroundColor=this._colors.bgcolSelected;
}else{style.backgroundColor=(rowInfo.row%2==0)?this._colors.bgcolEven:this._colors.bgcolOdd;
}}style.color=rowInfo.selected?this._colors.colSelected:this._colors.colNormal;
},
createRowStyle:function(rowInfo){var rowStyle=[];
rowStyle.push(";");
rowStyle.push(this._fontStyleString);
rowStyle.push("background-color:");
if(rowInfo.focusedRow&&this.getHighlightFocusRow()){rowStyle.push(rowInfo.selected?this._colors.bgcolFocusedSelected:this._colors.bgcolFocused);
}else{if(rowInfo.selected){rowStyle.push(this._colors.bgcolSelected);
}else{rowStyle.push((rowInfo.row%2==0)?this._colors.bgcolEven:this._colors.bgcolOdd);
}}rowStyle.push(';color:');
rowStyle.push(rowInfo.selected?this._colors.colSelected:this._colors.colNormal);
return rowStyle.join("");
},
getRowClass:function(rowInfo){return "";
},
_postponedUpdateTableContent:function(){if(this._noTableContentUpdate){return;
}
if(!this._updateContentPlanned){qx.client.Timer.once(function(){if(this.getDisposed()){return;
}this._updateTableContent();
this._updateContentPlanned=false;
qx.ui.core.Widget.flushGlobalQueues();
},
this,
0);
this._updateContentPlanned=true;
}},
_updateTableContent:function(){if(this._noTableContentUpdate){return;
}
if(this._table){this._table.updateContent();
}}},
destruct:function(){this._disposeFields("_colors",
"_fontStyle",
"__font",
"_table");
}});




/* ID: qx.ui.table.selection.Manager */
qx.Class.define("qx.ui.table.selection.Manager",
{extend:qx.core.Object,
construct:function(){this.base(arguments);
},
properties:{selectionModel:{check:"qx.ui.table.selection.Model"}},
members:{handleMouseDown:function(index,
evt){if(evt.isLeftButtonPressed()){var selectionModel=this.getSelectionModel();
if(!selectionModel.isSelectedIndex(index)){this._handleSelectEvent(index,
evt);
this._lastMouseDownHandled=true;
}else{this._lastMouseDownHandled=false;
}}else if(evt.isRightButtonPressed()&&evt.getModifiers()==0){var selectionModel=this.getSelectionModel();
if(!selectionModel.isSelectedIndex(index)){selectionModel.setSelectionInterval(index,
index);
}}},
handleMouseUp:function(index,
evt){if(evt.isLeftButtonPressed()&&!this._lastMouseDownHandled){this._handleSelectEvent(index,
evt);
}},
handleClick:function(index,
evt){},
handleSelectKeyDown:function(index,
evt){this._handleSelectEvent(index,
evt);
},
handleMoveKeyDown:function(index,
evt){var selectionModel=this.getSelectionModel();
switch(evt.getModifiers()){case 0:selectionModel.setSelectionInterval(index,
index);
break;
case qx.event.type.DomEvent.SHIFT_MASK:var anchor=selectionModel.getAnchorSelectionIndex();
if(anchor==-1){selectionModel.setSelectionInterval(index,
index);
}else{selectionModel.setSelectionInterval(anchor,
index);
}break;
}},
_handleSelectEvent:function(index,
evt){var selectionModel=this.getSelectionModel();
var leadIndex=selectionModel.getLeadSelectionIndex();
var anchorIndex=selectionModel.getAnchorSelectionIndex();
if(evt.isShiftPressed()){if(index!=leadIndex||selectionModel.isSelectionEmpty()){if(anchorIndex==-1){anchorIndex=index;
}
if(evt.isCtrlOrCommandPressed()){selectionModel.addSelectionInterval(anchorIndex,
index);
}else{selectionModel.setSelectionInterval(anchorIndex,
index);
}}}else if(evt.isCtrlOrCommandPressed()){if(selectionModel.isSelectedIndex(index)){selectionModel.removeSelectionInterval(index,
index);
}else{selectionModel.addSelectionInterval(index,
index);
}}else{if(!(anchorIndex==leadIndex&&anchorIndex==index)||selectionModel.isSelectionEmpty()){selectionModel.setSelectionInterval(index,
index);
}}}}});




/* ID: qx.ui.table.selection.Model */
qx.Class.define("qx.ui.table.selection.Model",
{extend:qx.core.Target,
construct:function(){this.base(arguments);
this._selectedRangeArr=[];
this._anchorSelectionIndex=-1;
this._leadSelectionIndex=-1;
this.hasBatchModeRefCount=0;
this._hadChangeEventInBatchMode=false;
},
events:{"changeSelection":"qx.event.type.Event"},
statics:{NO_SELECTION:1,
SINGLE_SELECTION:2,
SINGLE_INTERVAL_SELECTION:3,
MULTIPLE_INTERVAL_SELECTION:4,
MULTIPLE_INTERVAL_SELECTION_TOGGLE:5},
properties:{selectionMode:{init:2,
check:[1,
2,
3,
4,
5],
apply:"_applySelectionMode"}},
members:{_applySelectionMode:function(selectionMode){if(selectionMode==qx.ui.table.selection.Model.NO_SELECTION){this.clearSelection();
}},
setBatchMode:function(batchMode){if(batchMode){this.hasBatchModeRefCount+=1;
}else{if(this.hasBatchModeRefCount==0){throw new Error("Try to turn off batch mode althoug it was not turned on.");
}this.hasBatchModeRefCount-=1;
if(this._hadChangeEventInBatchMode){this._hadChangeEventInBatchMode=false;
this._fireChangeSelection();
}}return this.hasBatchMode();
},
hasBatchMode:function(){return this.hasBatchModeRefCount>0;
},
getAnchorSelectionIndex:function(){return this._anchorSelectionIndex;
},
getLeadSelectionIndex:function(){return this._leadSelectionIndex;
},
clearSelection:function(){if(!this.isSelectionEmpty()){this._clearSelection();
this._fireChangeSelection();
}},
isSelectionEmpty:function(){return this._selectedRangeArr.length==0;
},
getSelectedCount:function(){var selectedCount=0;
for(var i=0;i<this._selectedRangeArr.length;i++){var range=this._selectedRangeArr[i];
selectedCount+=range.maxIndex-range.minIndex+1;
}return selectedCount;
},
isSelectedIndex:function(index){for(var i=0;i<this._selectedRangeArr.length;i++){var range=this._selectedRangeArr[i];
if(index>=range.minIndex&&index<=range.maxIndex){return true;
}}return false;
},
getSelectedRanges:function(){var retVal=[];
for(var i=0;i<this._selectedRangeArr.length;i++){retVal.push({minIndex:this._selectedRangeArr[i].minIndex,
maxIndex:this._selectedRangeArr[i].maxIndex});
}return retVal;
},
iterateSelection:function(iterator,
object){for(var i=0;i<this._selectedRangeArr.length;i++){for(var j=this._selectedRangeArr[i].minIndex;j<=this._selectedRangeArr[i].maxIndex;j++){iterator.call(object,
j);
}}},
setSelectionInterval:function(fromIndex,
toIndex){var me=this.self(arguments);
switch(this.getSelectionMode()){case me.NO_SELECTION:return;
case me.SINGLE_SELECTION:fromIndex=toIndex;
break;
case me.MULTIPLE_INTERVAL_SELECTION_TOGGLE:this.setBatchMode(true);
try{for(var i=fromIndex;i<=toIndex;i++){if(!this.isSelectedIndex(i)){this._addSelectionInterval(i,
i);
}else{this.removeSelectionInterval(i,
i);
}}}finally{this.setBatchMode(false);
}this._fireChangeSelection();
return;
}this._clearSelection();
this._addSelectionInterval(fromIndex,
toIndex);
this._fireChangeSelection();
},
addSelectionInterval:function(fromIndex,
toIndex){var SelectionModel=qx.ui.table.selection.Model;
switch(this.getSelectionMode()){case SelectionModel.NO_SELECTION:return;
case SelectionModel.MULTIPLE_INTERVAL_SELECTION:case SelectionModel.MULTIPLE_INTERVAL_SELECTION_TOGGLE:this._addSelectionInterval(fromIndex,
toIndex);
this._fireChangeSelection();
break;
default:this.setSelectionInterval(fromIndex,
toIndex);
break;
}},
removeSelectionInterval:function(fromIndex,
toIndex){this._anchorSelectionIndex=fromIndex;
this._leadSelectionIndex=toIndex;
var minIndex=Math.min(fromIndex,
toIndex);
var maxIndex=Math.max(fromIndex,
toIndex);
for(var i=0;i<this._selectedRangeArr.length;i++){var range=this._selectedRangeArr[i];
if(range.minIndex>maxIndex){break;
}else if(range.maxIndex>=minIndex){var minIsIn=(range.minIndex>=minIndex)&&(range.minIndex<=maxIndex);
var maxIsIn=(range.maxIndex>=minIndex)&&(range.maxIndex<=maxIndex);
if(minIsIn&&maxIsIn){this._selectedRangeArr.splice(i,
1);
i--;
}else if(minIsIn){range.minIndex=maxIndex+1;
}else if(maxIsIn){range.maxIndex=minIndex-1;
}else{var newRange={minIndex:maxIndex+1,
maxIndex:range.maxIndex};
this._selectedRangeArr.splice(i+1,
0,
newRange);
range.maxIndex=minIndex-1;
break;
}}}this._fireChangeSelection();
},
_clearSelection:function(){this._selectedRangeArr=[];
this._anchorSelectionIndex=-1;
this._leadSelectionIndex=-1;
},
_addSelectionInterval:function(fromIndex,
toIndex){this._anchorSelectionIndex=fromIndex;
this._leadSelectionIndex=toIndex;
var minIndex=Math.min(fromIndex,
toIndex);
var maxIndex=Math.max(fromIndex,
toIndex);
var newRangeIndex=0;
for(;newRangeIndex<this._selectedRangeArr.length;newRangeIndex++){var range=this._selectedRangeArr[newRangeIndex];
if(range.minIndex>minIndex){break;
}}this._selectedRangeArr.splice(newRangeIndex,
0,
{minIndex:minIndex,
maxIndex:maxIndex});
var lastRange=this._selectedRangeArr[0];
for(var i=1;i<this._selectedRangeArr.length;i++){var range=this._selectedRangeArr[i];
if(lastRange.maxIndex+1>=range.minIndex){lastRange.maxIndex=Math.max(lastRange.maxIndex,
range.maxIndex);
this._selectedRangeArr.splice(i,
1);
i--;
}else{lastRange=range;
}}},
_dumpRanges:function(){var text="Ranges:";
for(var i=0;i<this._selectedRangeArr.length;i++){var range=this._selectedRangeArr[i];
text+=" ["+range.minIndex+".."+range.maxIndex+"]";
}this.debug(text);
},
_fireChangeSelection:function(){if(this.hasBatchMode()){this._hadChangeEventInBatchMode=true;
}this.createDispatchEvent("changeSelection");
}},
destruct:function(){this._disposeFields("_selectedRangeArr");
}});




/* ID: qx.ui.table.IHeaderRenderer */
qx.Interface.define("qx.ui.table.IHeaderRenderer",
{members:{createHeaderCell:function(cellInfo){return true;
},
updateHeaderCell:function(cellInfo,
cellWidget){return true;
}}});




/* ID: qx.ui.table.headerrenderer.Default */
qx.Class.define("qx.ui.table.headerrenderer.Default",
{extend:qx.core.Object,
implement:qx.ui.table.IHeaderRenderer,
statics:{STATE_SORTED:"sorted",
STATE_SORTED_ASCENDING:"sortedAscending"},
properties:{toolTip:{check:"String",
init:null,
nullable:true}},
members:{createHeaderCell:function(cellInfo){var widget=new qx.ui.basic.Atom();
widget.setAppearance("table-header-cell");
widget.setSelectable(false);
this.updateHeaderCell(cellInfo,
widget);
return widget;
},
updateHeaderCell:function(cellInfo,
cellWidget){var DefaultHeaderCellRenderer=qx.ui.table.headerrenderer.Default;
cellWidget.setLabel(cellInfo.name);
var widgetToolTip=cellWidget.getToolTip();
if(this.getToolTip()!=null){if(widgetToolTip==null){widgetToolTip=new qx.ui.popup.ToolTip(this.getToolTip());
cellWidget.setToolTip(widgetToolTip);
}else{widgetToolTip.getAtom().setLabel(this.getToolTip());
}}cellInfo.sorted?cellWidget.addState(DefaultHeaderCellRenderer.STATE_SORTED):cellWidget.removeState(DefaultHeaderCellRenderer.STATE_SORTED);
cellInfo.sortedAscending?cellWidget.addState(DefaultHeaderCellRenderer.STATE_SORTED_ASCENDING):cellWidget.removeState(DefaultHeaderCellRenderer.STATE_SORTED_ASCENDING);
}}});




/* ID: qx.ui.table.ICellRenderer */
qx.Interface.define("qx.ui.table.ICellRenderer",
{members:{createDataCellHtml:function(cellInfo,
htmlArr){return true;
}}});




/* ID: qx.ui.table.cellrenderer.Abstract */
qx.Class.define("qx.ui.table.cellrenderer.Abstract",
{type:"abstract",
implement:qx.ui.table.ICellRenderer,
extend:qx.core.Object,
construct:function(){var clazz=this.self(arguments);
if(!clazz.stylesheet){clazz.stylesheet=qx.html.StyleSheet.createElement(".qooxdoo-table-cell {"+"  position: absolute;"+"  top: 0px;"+"  height: 100%;"+"  overflow:hidden;"+"  text-overflow:ellipsis;"+"  -o-text-overflow: ellipsis;"+"  white-space:nowrap;"+"  border-right:1px solid #eeeeee;"+"  border-bottom:1px solid #eeeeee;"+"  padding : 0px 6px;"+"  cursor:default;"+(qx.core.Variant.isSet("qx.client",
"mshtml")?'':';-moz-user-select:none;')+"}"+".qooxdoo-table-cell-right {"+"  text-align:right"+" }"+".qooxdoo-table-cell-italic {"+"  font-style:italic"+" }"+".qooxdoo-table-cell-bold {"+"  font-weight:bold"+" }");
}},
members:{_getCellClass:function(cellInfo){return "qooxdoo-table-cell";
},
_getCellStyle:function(cellInfo){return cellInfo.style||"";
},
_getContentHtml:function(cellInfo){return cellInfo.value||"";
},
createDataCellHtml:function(cellInfo,
htmlArr){htmlArr.push('<div class="',
this._getCellClass(cellInfo),
'" style="',
'left:',
cellInfo.styleLeft,
'px;',
'width:',
cellInfo.styleWidth,
'px;',
this._getCellStyle(cellInfo),
'">',
this._getContentHtml(cellInfo),
"</div>");
}}});




/* ID: qx.ui.table.cellrenderer.Default */
qx.Class.define("qx.ui.table.cellrenderer.Default",
{extend:qx.ui.table.cellrenderer.Abstract,
statics:{STYLEFLAG_ALIGN_RIGHT:1,
STYLEFLAG_BOLD:2,
STYLEFLAG_ITALIC:4},
properties:{useAutoAlign:{check:"Boolean",
init:true}},
members:{_getStyleFlags:function(cellInfo){if(this.getUseAutoAlign()){if(typeof cellInfo.value=="number"){return qx.ui.table.cellrenderer.Default.STYLEFLAG_ALIGN_RIGHT;
}}},
_getCellClass:function(cellInfo){var cellClass=this.base(arguments,
cellInfo);
if(!cellClass){return "";
}var stylesToApply=this._getStyleFlags(cellInfo);
if(stylesToApply&qx.ui.table.cellrenderer.Default.STYLEFLAG_ALIGN_RIGHT){cellClass+=" qooxdoo-table-cell-right";
}
if(stylesToApply&qx.ui.table.cellrenderer.Default.STYLEFLAG_BOLD){cellClass+=" qooxdoo-table-cell-bold";
}
if(stylesToApply&qx.ui.table.cellrenderer.Default.STYLEFLAG_ITALIC){cellClass+=" qooxdoo-table-cell-italic";
}return cellClass;
},
_getContentHtml:function(cellInfo){return qx.html.String.escape(this._formatValue(cellInfo));
},
_formatValue:function(cellInfo){var value=cellInfo.value;
if(value==null){return "";
}
if(typeof value=="string"){return value;
}else if(typeof value=="number"){if(!qx.ui.table.cellrenderer.Default._numberFormat){qx.ui.table.cellrenderer.Default._numberFormat=new qx.util.format.NumberFormat();
qx.ui.table.cellrenderer.Default._numberFormat.setMaximumFractionDigits(2);
}var res=qx.ui.table.cellrenderer.Default._numberFormat.format(value);
}else if(value instanceof Date){res=qx.util.format.DateFormat.getDateInstance().format(value);
}else{res=value;
}return res;
}}});




/* ID: qx.util.format.Format */
qx.Class.define("qx.util.format.Format",
{extend:qx.core.Object,
type:"abstract",
construct:function(){this.base(arguments);
},
members:{format:function(obj){throw new Error("format is abstract");
},
parse:function(str){throw new Error("parse is abstract");
}}});




/* ID: qx.util.format.NumberFormat */
qx.Class.define("qx.util.format.NumberFormat",
{extend:qx.util.format.Format,
construct:function(locale){this.base(arguments);
this._locale=locale;
},
statics:{getIntegerInstance:function(){var NumberFormat=qx.util.format.NumberFormat;
if(NumberFormat._integerInstance==null){NumberFormat._integerInstance=new NumberFormat();
NumberFormat._integerInstance.setMaximumFractionDigits(0);
}return NumberFormat._integerInstance;
},
getInstance:qx.lang.Function.returnInstance},
properties:{minimumIntegerDigits:{check:"Number",
init:0},
maximumIntegerDigits:{check:"Number",
nullable:true},
minimumFractionDigits:{check:"Number",
init:0},
maximumFractionDigits:{check:"Number",
nullable:true},
groupingUsed:{check:"Boolean",
init:true},
prefix:{check:"String",
init:""},
postfix:{check:"String",
init:""}},
members:{format:function(num){switch(num){case Infinity:return "Infinity";
case -Infinity:return "-Infinity";
case NaN:return "NaN";
}var negative=(num<0);
if(negative){num=-num;
}
if(this.getMaximumFractionDigits()!=null){var mover=Math.pow(10,
this.getMaximumFractionDigits());
num=Math.round(num*mover)/mover;
}var integerDigits=String(Math.floor(num)).length;
var numStr=""+num;
var integerStr=numStr.substring(0,
integerDigits);
while(integerStr.length<this.getMinimumIntegerDigits()){integerStr="0"+integerStr;
}
if(this.getMaximumIntegerDigits()!=null&&integerStr.length>this.getMaximumIntegerDigits()){integerStr=integerStr.substring(integerStr.length-this.getMaximumIntegerDigits());
}var fractionStr=numStr.substring(integerDigits+1);
while(fractionStr.length<this.getMinimumFractionDigits()){fractionStr+="0";
}
if(this.getMaximumFractionDigits()!=null&&fractionStr.length>this.getMaximumFractionDigits()){fractionStr=fractionStr.substring(0,
this.getMaximumFractionDigits());
}if(this.getGroupingUsed()){var origIntegerStr=integerStr;
integerStr="";
var groupPos;
for(groupPos=origIntegerStr.length;groupPos>3;groupPos-=3){integerStr=""+qx.locale.Number.getGroupSeparator(this._locale)+origIntegerStr.substring(groupPos-3,
groupPos)+integerStr;
}integerStr=origIntegerStr.substring(0,
groupPos)+integerStr;
}var prefix=this.getPrefix()?this.getPrefix():"";
var postfix=this.getPostfix()?this.getPostfix():"";
var str=prefix+(negative?"-":"")+integerStr;
if(fractionStr.length>0){str+=""+qx.locale.Number.getDecimalSeparator(this._locale)+fractionStr;
}str+=postfix;
return str;
},
parse:function(str){var groupSepEsc=qx.lang.String.escapeRegexpChars(qx.locale.Number.getGroupSeparator(this._locale)+"");
var decimalSepEsc=qx.lang.String.escapeRegexpChars(qx.locale.Number.getDecimalSeparator(this._locale)+"");
var regex=new RegExp("^"+qx.lang.String.escapeRegexpChars(this.getPrefix())+'([-+]){0,1}'+'([0-9]{1,3}(?:'+groupSepEsc+'{0,1}[0-9]{3}){0,})'+'('+decimalSepEsc+'\\d+){0,1}'+qx.lang.String.escapeRegexpChars(this.getPostfix())+"$");
var hit=regex.exec(str);
if(hit==null){throw new Error("Number string '"+str+"' does not match the number format");
}var negative=(hit[1]=="-");
var integerStr=hit[2];
var fractionStr=hit[3];
integerStr=integerStr.replace(new RegExp(groupSepEsc,
"g"),
"");
var asStr=(negative?"-":"")+integerStr;
if(fractionStr!=null&&fractionStr.length!=0){fractionStr=fractionStr.replace(new RegExp(decimalSepEsc),
"");
asStr+="."+fractionStr;
}return parseFloat(asStr);
}}});




/* ID: qx.locale.Number */
qx.Class.define("qx.locale.Number",
{statics:{getDecimalSeparator:function(locale){return new qx.locale.LocalizedString("cldr_number_decimal_separator",
[],
locale);
},
getGroupSeparator:function(locale){return new qx.locale.LocalizedString("cldr_number_group_separator",
[],
locale);
},
getPercentFormat:function(locale){return new qx.locale.LocalizedString("cldr_number_percent_format",
[],
locale);
}}});




/* ID: qx.util.format.DateFormat */
qx.Class.define("qx.util.format.DateFormat",
{extend:qx.util.format.Format,
construct:function(format,
locale){this.base(arguments);
if(!locale){this._locale=qx.locale.Manager.getInstance().getLocale();
}else{this._locale=locale;
}
if(format!=null){this._format=format.toString();
}else{this._format=qx.locale.Date.getDateFormat("long",
this._locale)+" "+qx.locale.Date.getDateTimeFormat("HHmmss",
"HH:mm:ss",
this._locale);
}},
statics:{getDateTimeInstance:function(){var DateFormat=qx.util.format.DateFormat;
var format=qx.locale.Date.getDateFormat("long")+" "+qx.locale.Date.getDateTimeFormat("HHmmss",
"HH:mm:ss");
if(DateFormat._dateInstance==null||DateFormat._format!=format){DateFormat._dateTimeInstance=new DateFormat();
}return DateFormat._dateTimeInstance;
},
getDateInstance:function(){var DateFormat=qx.util.format.DateFormat;
var format=qx.locale.Date.getDateFormat("short")+"";
if(DateFormat._dateInstance==null||DateFormat._format!=format){DateFormat._dateInstance=new DateFormat(format);
}return DateFormat._dateInstance;
},
ASSUME_YEAR_2000_THRESHOLD:30,
LOGGING_DATE_TIME_FORMAT:"yyyy-MM-dd HH:mm:ss",
AM_MARKER:"am",
PM_MARKER:"pm",
MEDIUM_TIMEZONE_NAMES:["GMT"],
FULL_TIMEZONE_NAMES:["Greenwich Mean Time"]},
members:{__fillNumber:function(number,
minSize){var str=""+number;
while(str.length<minSize){str="0"+str;
}return str;
},
__getDayInYear:function(date){var helpDate=new Date(date.getTime());
var day=helpDate.getDate();
while(helpDate.getMonth()!=0){helpDate.setDate(-1);
day+=helpDate.getDate()+1;
}return day;
},
__thursdayOfSameWeek:function(date){return new Date(date.getTime()+(3-((date.getDay()+6)%7))*86400000);
},
__getWeekInYear:function(date){var thursdayDate=this.__thursdayOfSameWeek(date);
var weekYear=thursdayDate.getFullYear();
var thursdayWeek1=this.__thursdayOfSameWeek(new Date(weekYear,
0,
4));
return Math.floor(1.5+(thursdayDate.getTime()-thursdayWeek1.getTime())/86400000/7);
},
format:function(date){var DateFormat=qx.util.format.DateFormat;
var locale=this._locale;
var fullYear=date.getFullYear();
var month=date.getMonth();
var dayOfMonth=date.getDate();
var dayOfWeek=date.getDay();
var hours=date.getHours();
var minutes=date.getMinutes();
var seconds=date.getSeconds();
var ms=date.getMilliseconds();
var timezone=date.getTimezoneOffset()/60;
this.__initFormatTree();
var output="";
for(var i=0;i<this.__formatTree.length;i++){var currAtom=this.__formatTree[i];
if(currAtom.type=="literal"){output+=currAtom.text;
}else{var wildcardChar=currAtom.character;
var wildcardSize=currAtom.size;
var replacement="?";
switch(wildcardChar){case 'y':if(wildcardSize==2){replacement=this.__fillNumber(fullYear%100,
2);
}else if(wildcardSize==4){replacement=fullYear;
}break;
case 'D':replacement=this.__fillNumber(this.__getDayInYear(date),
wildcardSize);
break;
case 'd':replacement=this.__fillNumber(dayOfMonth,
wildcardSize);
break;
case 'w':replacement=this.__fillNumber(this.__getWeekInYear(date),
wildcardSize);
break;
case 'E':if(wildcardSize==2){replacement=qx.locale.Date.getDayName("narrow",
dayOfWeek,
locale);
}else if(wildcardSize==3){replacement=qx.locale.Date.getDayName("abbreviated",
dayOfWeek,
locale);
}else if(wildcardSize==4){replacement=qx.locale.Date.getDayName("wide",
dayOfWeek,
locale);
}break;
case 'M':if(wildcardSize==1||wildcardSize==2){replacement=this.__fillNumber(month+1,
wildcardSize);
}else if(wildcardSize==3){replacement=qx.locale.Date.getMonthName("abbreviated",
month,
locale);
}else if(wildcardSize==4){replacement=qx.locale.Date.getMonthName("wide",
month,
locale);
}break;
case 'a':replacement=(hours<12)?qx.locale.Date.getAmMarker(locale):qx.locale.Date.getPmMarker(locale);
break;
case 'H':replacement=this.__fillNumber(hours,
wildcardSize);
break;
case 'k':replacement=this.__fillNumber((hours==0)?24:hours,
wildcardSize);
break;
case 'K':replacement=this.__fillNumber(hours%12,
wildcardSize);
break;
case 'h':replacement=this.__fillNumber(((hours%12)==0)?12:(hours%12),
wildcardSize);
break;
case 'm':replacement=this.__fillNumber(minutes,
wildcardSize);
break;
case 's':replacement=this.__fillNumber(seconds,
wildcardSize);
break;
case 'S':replacement=this.__fillNumber(ms,
wildcardSize);
break;
case 'z':if(wildcardSize==1){replacement="GMT"+((timezone<0)?"-":"+")+this.__fillNumber(timezone)+":00";
}else if(wildcardSize==2){replacement=DateFormat.MEDIUM_TIMEZONE_NAMES[timezone];
}else if(wildcardSize==3){replacement=DateFormat.FULL_TIMEZONE_NAMES[timezone];
}break;
case 'Z':replacement=((timezone<0)?"-":"+")+this.__fillNumber(timezone,
2)+"00";
}output+=replacement;
}}return output;
},
parse:function(dateStr){this.__initParseFeed();
var hit=this._parseFeed.regex.exec(dateStr);
if(hit==null){throw new Error("Date string '"+dateStr+"' does not match the date format: "+this._format);
}var dateValues={year:1970,
month:0,
day:1,
hour:0,
ispm:false,
min:0,
sec:0,
ms:0};
var currGroup=1;
for(var i=0;i<this._parseFeed.usedRules.length;i++){var rule=this._parseFeed.usedRules[i];
var value=hit[currGroup];
if(rule.field!=null){dateValues[rule.field]=parseInt(value,
10);
}else{rule.manipulator(dateValues,
value);
}currGroup+=(rule.groups==null)?1:rule.groups;
}var date=new Date(dateValues.year,
dateValues.month,
dateValues.day,
(dateValues.ispm)?(dateValues.hour+12):dateValues.hour,
dateValues.min,
dateValues.sec,
dateValues.ms);
if(dateValues.month!=date.getMonth()||dateValues.year!=date.getFullYear()){throw new Error("Error parsing date '"+dateStr+"': the value for day or month is too large");
}return date;
},
__initFormatTree:function(){if(this.__formatTree!=null){return;
}this.__formatTree=[];
var currWildcardChar;
var currWildcardSize=0;
var currLiteral="";
var format=this._format;
var state="default";
var i=0;
while(i<format.length){var currChar=format.charAt(i);
switch(state){case "quoted_literal":if(currChar=="'"){if(i+1>=format.length){i++;
break;
}var lookAhead=format.charAt(i+1);
if(lookAhead=="'"){currLiteral+=currChar;
i++;
}else{i++;
state="unkown";
}}else{currLiteral+=currChar;
i++;
}break;
case "wildcard":if(currChar==currWildcardChar){currWildcardSize++;
i++;
}else{this.__formatTree.push({type:"wildcard",
character:currWildcardChar,
size:currWildcardSize});
currWildcardChar=null;
currWildcardSize=0;
state="default";
}break;
default:if((currChar>='a'&&currChar<='z')||(currChar>='A'&&currChar<='Z')){currWildcardChar=currChar;
state="wildcard";
}else if(currChar=="'"){if(i+1>=format.length){currLiteral+=currChar;
i++;
break;
}var lookAhead=format.charAt(i+1);
if(lookAhead=="'"){currLiteral+=currChar;
i++;
}i++;
state="quoted_literal";
}else{state="default";
}
if(state!="default"){if(currLiteral.length>0){this.__formatTree.push({type:"literal",
text:currLiteral});
currLiteral="";
}}else{currLiteral+=currChar;
i++;
}break;
}}if(currWildcardChar!=null){this.__formatTree.push({type:"wildcard",
character:currWildcardChar,
size:currWildcardSize});
}else if(currLiteral.length>0){this.__formatTree.push({type:"literal",
text:currLiteral});
}},
__initParseFeed:function(){if(this._parseFeed!=null){return ;
}var format=this._format;
this.__initParseRules();
this.__initFormatTree();
var usedRules=[];
var pattern="^";
for(var atomIdx=0;atomIdx<this.__formatTree.length;atomIdx++){var currAtom=this.__formatTree[atomIdx];
if(currAtom.type=="literal"){pattern+=qx.lang.String.escapeRegexpChars(currAtom.text);
}else{var wildcardChar=currAtom.character;
var wildcardSize=currAtom.size;
var wildcardRule;
for(var ruleIdx=0;ruleIdx<this._parseRules.length;ruleIdx++){var rule=this._parseRules[ruleIdx];
if(wildcardChar==rule.pattern.charAt(0)&&wildcardSize==rule.pattern.length){wildcardRule=rule;
break;
}}if(wildcardRule==null){var wildcardStr="";
for(var i=0;i<wildcardSize;i++){wildcardStr+=wildcardChar;
}throw new Error("Malformed date format: "+format+". Wildcard "+wildcardStr+" is not supported");
}else{usedRules.push(wildcardRule);
pattern+=wildcardRule.regex;
}}}pattern+="$";
var regex;
try{regex=new RegExp(pattern);
}catch(exc){throw new Error("Malformed date format: "+format);
}this._parseFeed={regex:regex,
"usedRules":usedRules,
pattern:pattern};
},
__initParseRules:function(){var DateFormat=qx.util.format.DateFormat;
if(this._parseRules!=null){return ;
}this._parseRules=[];
var yearManipulator=function(dateValues,
value){value=parseInt(value,
10);
if(value<DateFormat.ASSUME_YEAR_2000_THRESHOLD){value+=2000;
}else if(value<100){value+=1900;
}dateValues.year=value;
};
var monthManipulator=function(dateValues,
value){dateValues.month=parseInt(value,
10)-1;
};
var ampmManipulator=function(dateValues,
value){dateValues.ispm=(value==DateFormat.PM_MARKER);
};
var noZeroHourManipulator=function(dateValues,
value){dateValues.hour=parseInt(value,
10)%24;
};
var noZeroAmPmHourManipulator=function(dateValues,
value){dateValues.hour=parseInt(value,
10)%12;
};
var ignoreManipulator=function(dateValues,
value){return;
};
var shortMonthNames=qx.locale.Date.getMonthNames("abbreviated",
this._locale);
for(var i=0;i<shortMonthNames.length;i++){shortMonthNames[i]=qx.lang.String.escapeRegexpChars(shortMonthNames[i].toString());
}var shortMonthNamesManipulator=function(dateValues,
value){value=qx.lang.String.escapeRegexpChars(value);
dateValues.month=shortMonthNames.indexOf(value);
};
var fullMonthNames=qx.locale.Date.getMonthNames("wide",
this._locale);
for(var i=0;i<fullMonthNames.length;i++){fullMonthNames[i]=qx.lang.String.escapeRegexpChars(fullMonthNames[i].toString());
}var fullMonthNamesManipulator=function(dateValues,
value){value=qx.lang.String.escapeRegexpChars(value);
dateValues.month=fullMonthNames.indexOf(value);
};
var narrowDayNames=qx.locale.Date.getDayNames("narrow",
this._locale);
for(var i=0;i<narrowDayNames.length;i++){narrowDayNames[i]=qx.lang.String.escapeRegexpChars(narrowDayNames[i].toString());
}var narrowDayNamesManipulator=function(dateValues,
value){value=qx.lang.String.escapeRegexpChars(value);
dateValues.month=narrowDayNames.indexOf(value);
};
var abbrDayNames=qx.locale.Date.getDayNames("abbreviated",
this._locale);
for(var i=0;i<abbrDayNames.length;i++){abbrDayNames[i]=qx.lang.String.escapeRegexpChars(abbrDayNames[i].toString());
}var abbrDayNamesManipulator=function(dateValues,
value){value=qx.lang.String.escapeRegexpChars(value);
dateValues.month=abbrDayNames.indexOf(value);
};
var fullDayNames=qx.locale.Date.getDayNames("wide",
this._locale);
for(var i=0;i<fullDayNames.length;i++){fullDayNames[i]=qx.lang.String.escapeRegexpChars(fullDayNames[i].toString());
}var fullDayNamesManipulator=function(dateValues,
value){value=qx.lang.String.escapeRegexpChars(value);
dateValues.month=fullDayNames.indexOf(value);
};
this._parseRules.push({pattern:"yyyy",
regex:"(\\d\\d(\\d\\d)?)",
groups:2,
manipulator:yearManipulator});
this._parseRules.push({pattern:"yy",
regex:"(\\d\\d)",
manipulator:yearManipulator});
this._parseRules.push({pattern:"M",
regex:"(\\d\\d?)",
manipulator:monthManipulator});
this._parseRules.push({pattern:"MM",
regex:"(\\d\\d?)",
manipulator:monthManipulator});
this._parseRules.push({pattern:"MMM",
regex:"("+shortMonthNames.join("|")+")",
manipulator:shortMonthNamesManipulator});
this._parseRules.push({pattern:"MMMM",
regex:"("+fullMonthNames.join("|")+")",
manipulator:fullMonthNamesManipulator});
this._parseRules.push({pattern:"dd",
regex:"(\\d\\d?)",
field:"day"});
this._parseRules.push({pattern:"d",
regex:"(\\d\\d?)",
field:"day"});
this._parseRules.push({pattern:"EE",
regex:"("+narrowDayNames.join("|")+")",
manipulator:narrowDayNamesManipulator});
this._parseRules.push({pattern:"EEE",
regex:"("+abbrDayNames.join("|")+")",
manipulator:abbrDayNamesManipulator});
this._parseRules.push({pattern:"EEEE",
regex:"("+fullDayNames.join("|")+")",
manipulator:fullDayNamesManipulator});
this._parseRules.push({pattern:"a",
regex:"("+DateFormat.AM_MARKER+"|"+DateFormat.PM_MARKER+")",
manipulator:ampmManipulator});
this._parseRules.push({pattern:"HH",
regex:"(\\d\\d?)",
field:"hour"});
this._parseRules.push({pattern:"H",
regex:"(\\d\\d?)",
field:"hour"});
this._parseRules.push({pattern:"kk",
regex:"(\\d\\d?)",
manipulator:noZeroHourManipulator});
this._parseRules.push({pattern:"k",
regex:"(\\d\\d?)",
manipulator:noZeroHourManipulator});
this._parseRules.push({pattern:"KK",
regex:"(\\d\\d?)",
field:"hour"});
this._parseRules.push({pattern:"K",
regex:"(\\d\\d?)",
field:"hour"});
this._parseRules.push({pattern:"hh",
regex:"(\\d\\d?)",
manipulator:noZeroAmPmHourManipulator});
this._parseRules.push({pattern:"h",
regex:"(\\d\\d?)",
manipulator:noZeroAmPmHourManipulator});
this._parseRules.push({pattern:"mm",
regex:"(\\d\\d?)",
field:"min"});
this._parseRules.push({pattern:"m",
regex:"(\\d\\d?)",
field:"min"});
this._parseRules.push({pattern:"ss",
regex:"(\\d\\d?)",
field:"sec"});
this._parseRules.push({pattern:"s",
regex:"(\\d\\d?)",
field:"sec"});
this._parseRules.push({pattern:"SSS",
regex:"(\\d\\d?\\d?)",
field:"ms"});
this._parseRules.push({pattern:"SS",
regex:"(\\d\\d?\\d?)",
field:"ms"});
this._parseRules.push({pattern:"S",
regex:"(\\d\\d?\\d?)",
field:"ms"});
this._parseRules.push({pattern:"Z",
regex:"((\\+|\\-)\\d\\d:?\\d\\d)",
manipulator:ignoreManipulator});
this._parseRules.push({pattern:"z",
regex:"([a-zA-Z]+)",
manipulator:ignoreManipulator});
}},
destruct:function(){this._disposeFields("_format",
"_locale",
"__formatTree",
"_parseFeed",
"_parseRules");
}});




/* ID: qx.locale.Date */
qx.Class.define("qx.locale.Date",
{statics:{getAmMarker:function(locale){return new qx.locale.LocalizedString("cldr_am",
[],
locale);
},
getPmMarker:function(locale){return new qx.locale.LocalizedString("cldr_pm",
[],
locale);
},
getDayNames:function(length,
locale){if(length!="abbreviated"&&length!="narrow"&&length!="wide"){throw new Error('format must be one of "abbreviated", "narrow", "wide"');
}var days=["sun",
"mon",
"tue",
"wed",
"thu",
"fri",
"sat"];
var names=[];
for(var i=0;i<days.length;i++){var key="cldr_day_"+length+"_"+days[i];
names.push(new qx.locale.LocalizedString(key,
[],
locale));
}return names;
},
getDayName:function(length,
day,
locale){if(length!="abbreviated"&&length!="narrow"&&length!="wide"){throw new Error('format must be one of "abbreviated", "narrow", "wide"');
}var days=["sun",
"mon",
"tue",
"wed",
"thu",
"fri",
"sat"];
var key="cldr_day_"+length+"_"+days[day];
return new qx.locale.LocalizedString(key,
[],
locale);
},
getMonthNames:function(length,
locale){if(length!="abbreviated"&&length!="narrow"&&length!="wide"){throw new Error('format must be one of "abbreviated", "narrow", "wide"');
}var names=[];
for(var i=0;i<12;i++){var key="cldr_month_"+length+"_"+(i+1);
names.push(new qx.locale.LocalizedString(key,
[],
locale));
}return names;
},
getMonthName:function(length,
month,
locale){if(length!="abbreviated"&&length!="narrow"&&length!="wide"){throw new Error('format must be one of "abbreviated", "narrow", "wide"');
}var key="cldr_month_"+length+"_"+(month+1);
return new qx.locale.LocalizedString(key,
[],
locale);
},
getDateFormat:function(size,
locale){if(size!="short"&&size!="medium"&&size!="long"&&size!="full"){throw new Error('format must be one of "short", "medium", "long", "full"');
}var key="cldr_date_format_"+size;
return new qx.locale.LocalizedString(key,
[],
locale);
},
getDateTimeFormat:function(canonical,
fallback,
locale){var key="cldr_date_time_format_"+canonical;
var localizedFormat=qx.locale.Manager.getInstance().translate(key,
[],
locale);
if(localizedFormat==key){localizedFormat=fallback;
}return localizedFormat;
},
getTimeFormat:function(size,
locale){if(size!="short"&&size!="medium"&&size!="long"&&size!="full"){throw new Error('format must be one of "short", "medium", "long", "full"');
}var key="cldr_time_format_"+size;
var localizedFormat=qx.locale.Manager.getInstance().translate(key,
[],
locale);
if(localizedFormat!=key){return localizedFormat;
}
switch(size){case "short":case "medium":return qx.locale.Date.getDateTimeFormat("HHmm",
"HH:mm");
case "long":return qx.locale.Date.getDateTimeFormat("HHmmss",
"HH:mm:ss");
case "full":return qx.locale.Date.getDateTimeFormat("HHmmsszz",
"HH:mm:ss zz");
default:throw new Error("This case should never happen.");
}},
getWeekStart:function(locale){var weekStart={"MV":5,
"AE":6,
"AF":6,
"BH":6,
"DJ":6,
"DZ":6,
"EG":6,
"ER":6,
"ET":6,
"IQ":6,
"IR":6,
"JO":6,
"KE":6,
"KW":6,
"LB":6,
"LY":6,
"MA":6,
"OM":6,
"QA":6,
"SA":6,
"SD":6,
"SO":6,
"TN":6,
"YE":6,
"AS":0,
"AU":0,
"AZ":0,
"BW":0,
"CA":0,
"CN":0,
"FO":0,
"GE":0,
"GL":0,
"GU":0,
"HK":0,
"IE":0,
"IL":0,
"IS":0,
"JM":0,
"JP":0,
"KG":0,
"KR":0,
"LA":0,
"MH":0,
"MN":0,
"MO":0,
"MP":0,
"MT":0,
"NZ":0,
"PH":0,
"PK":0,
"SG":0,
"TH":0,
"TT":0,
"TW":0,
"UM":0,
"US":0,
"UZ":0,
"VI":0,
"ZA":0,
"ZW":0,
"MW":0,
"NG":0,
"TJ":0};
var territory=qx.locale.Date._getTerritory(locale);
return weekStart[territory]!=null?weekStart[territory]:1;
},
getWeekendStart:function(locale){var weekendStart={"EG":5,
"IL":5,
"SY":5,
"IN":0,
"AE":4,
"BH":4,
"DZ":4,
"IQ":4,
"JO":4,
"KW":4,
"LB":4,
"LY":4,
"MA":4,
"OM":4,
"QA":4,
"SA":4,
"SD":4,
"TN":4,
"YE":4};
var territory=qx.locale.Date._getTerritory(locale);
return weekendStart[territory]!=null?weekendStart[territory]:6;
},
getWeekendEnd:function(locale){var weekendEnd={"AE":5,
"BH":5,
"DZ":5,
"IQ":5,
"JO":5,
"KW":5,
"LB":5,
"LY":5,
"MA":5,
"OM":5,
"QA":5,
"SA":5,
"SD":5,
"TN":5,
"YE":5,
"AF":5,
"IR":5,
"EG":6,
"IL":6,
"SY":6};
var territory=qx.locale.Date._getTerritory(locale);
return weekendEnd[territory]!=null?weekendEnd[territory]:0;
},
isWeekend:function(day,
locale){var weekendStart=qx.locale.Date.getWeekendStart(locale);
var weekendEnd=qx.locale.Date.getWeekendEnd(locale);
if(weekendEnd>weekendStart){return ((day>=weekendStart)&&(day<=weekendEnd));
}else{return ((day>=weekendStart)||(day<=weekendEnd));
}},
_getTerritory:function(locale){if(locale){var territory=locale.split("_")[1]||locale;
}else{territory=qx.locale.Manager.getInstance().getTerritory()||qx.locale.Manager.getInstance().getLanguage();
}return territory.toUpperCase();
}}});




/* ID: qx.ui.table.ICellEditorFactory */
qx.Interface.define("qx.ui.table.ICellEditorFactory",
{members:{createCellEditor:function(cellInfo){return true;
},
getCellEditorValue:function(cellEditor){return true;
}}});




/* ID: qx.ui.table.celleditor.TextField */
qx.Class.define("qx.ui.table.celleditor.TextField",
{extend:qx.core.Target,
implement:qx.ui.table.ICellEditorFactory,
construct:function(){this.base(arguments);
},
properties:{validationFunction:{check:"Function",
nullable:true,
init:null}},
members:{createCellEditor:function(cellInfo){var cellEditor=new qx.ui.form.TextField;
cellEditor.setAppearance("table-editor-textfield");
cellEditor.setLiveUpdate(true);
cellEditor.originalValue=cellInfo.value;
if(cellInfo.value===null){cellInfo.value="";
}cellEditor.setValue(""+cellInfo.value);
cellEditor.addEventListener("appear",
function(){this.selectAll();
});
return cellEditor;
},
getCellEditorValue:function(cellEditor){var value=cellEditor.getValue();
var validationFunc=this.getValidationFunction();
if(!this._done&&validationFunc){value=validationFunc(value,
cellEditor.originalValue);
this._done=true;
}
if(typeof cellEditor.originalValue=="number"){value=parseFloat(value);
}return value;
}}});




/* ID: qx.ui.table.columnmodel.Basic */
qx.Class.define("qx.ui.table.columnmodel.Basic",
{extend:qx.core.Target,
construct:function(){this.base(arguments);
},
events:{"widthChanged":"qx.event.type.DataEvent",
"visibilityChangedPre":"qx.event.type.DataEvent",
"visibilityChanged":"qx.event.type.DataEvent",
"orderChanged":"qx.event.type.DataEvent"},
statics:{DEFAULT_WIDTH:100,
DEFAULT_HEADER_RENDERER:new qx.ui.table.headerrenderer.Default,
DEFAULT_DATA_RENDERER:new qx.ui.table.cellrenderer.Default,
DEFAULT_EDITOR_FACTORY:new qx.ui.table.celleditor.TextField},
members:{init:function(colCount){this._columnDataArr=[];
var width=qx.ui.table.columnmodel.Basic.DEFAULT_WIDTH;
var headerRenderer=qx.ui.table.columnmodel.Basic.DEFAULT_HEADER_RENDERER;
var dataRenderer=qx.ui.table.columnmodel.Basic.DEFAULT_DATA_RENDERER;
var editorFactory=qx.ui.table.columnmodel.Basic.DEFAULT_EDITOR_FACTORY;
this._overallColumnArr=[];
this._visibleColumnArr=[];
for(var col=0;col<colCount;col++){this._columnDataArr[col]={width:width,
headerRenderer:headerRenderer,
dataRenderer:dataRenderer,
editorFactory:editorFactory};
this._overallColumnArr[col]=col;
this._visibleColumnArr[col]=col;
}this._colToXPosMap=null;
},
setColumnWidth:function(col,
width){var oldWidth=this._columnDataArr[col].width;
if(oldWidth!=width){this._columnDataArr[col].width=width;
var data={col:col,
newWidth:width,
oldWidth:oldWidth};
this.createDispatchDataEvent("widthChanged",
data);
}},
getColumnWidth:function(col){return this._columnDataArr[col].width;
},
setHeaderCellRenderer:function(col,
renderer){this._columnDataArr[col].headerRenderer=renderer;
},
getHeaderCellRenderer:function(col){return this._columnDataArr[col].headerRenderer;
},
setDataCellRenderer:function(col,
renderer){this._columnDataArr[col].dataRenderer=renderer;
},
getDataCellRenderer:function(col){return this._columnDataArr[col].dataRenderer;
},
setCellEditorFactory:function(col,
factory){this._columnDataArr[col].editorFactory=factory;
},
getCellEditorFactory:function(col){return this._columnDataArr[col].editorFactory;
},
_getColToXPosMap:function(){if(this._colToXPosMap==null){this._colToXPosMap={};
for(var overX=0;overX<this._overallColumnArr.length;overX++){var col=this._overallColumnArr[overX];
this._colToXPosMap[col]={overX:overX};
}
for(var visX=0;visX<this._visibleColumnArr.length;visX++){var col=this._visibleColumnArr[visX];
this._colToXPosMap[col].visX=visX;
}}return this._colToXPosMap;
},
getVisibleColumnCount:function(){return this._visibleColumnArr.length;
},
getVisibleColumnAtX:function(visXPos){return this._visibleColumnArr[visXPos];
},
getVisibleX:function(col){return this._getColToXPosMap()[col].visX;
},
getOverallColumnCount:function(){return this._overallColumnArr.length;
},
getOverallColumnAtX:function(overXPos){return this._overallColumnArr[overXPos];
},
getOverallX:function(col){return this._getColToXPosMap()[col].overX;
},
isColumnVisible:function(col){return (this._getColToXPosMap()[col].visX!=null);
},
setColumnVisible:function(col,
visible){if(visible!=this.isColumnVisible(col)){if(visible){var colToXPosMap=this._getColToXPosMap();
var overX=colToXPosMap[col].overX;
if(overX==null){throw new Error("Showing column failed: "+col+". The column is not added to this TablePaneModel.");
}var nextVisX;
for(var x=overX+1;x<this._overallColumnArr.length;x++){var currCol=this._overallColumnArr[x];
var currVisX=colToXPosMap[currCol].visX;
if(currVisX!=null){nextVisX=currVisX;
break;
}}if(nextVisX==null){nextVisX=this._visibleColumnArr.length;
}this._visibleColumnArr.splice(nextVisX,
0,
col);
}else{var visX=this.getVisibleX(col);
this._visibleColumnArr.splice(visX,
1);
}this._colToXPosMap=null;
if(!this._internalChange){var data={col:col,
visible:visible};
this.createDispatchDataEvent("visibilityChangedPre",
data);
this.createDispatchDataEvent("visibilityChanged",
data);
}}},
moveColumn:function(fromOverXPos,
toOverXPos){this._internalChange=true;
var col=this._overallColumnArr[fromOverXPos];
var visible=this.isColumnVisible(col);
if(visible){this.setColumnVisible(col,
false);
}this._overallColumnArr.splice(fromOverXPos,
1);
this._overallColumnArr.splice(toOverXPos,
0,
col);
this._colToXPosMap=null;
if(visible){this.setColumnVisible(col,
true);
}this._internalChange=false;
var data={col:col,
fromOverXPos:fromOverXPos,
toOverXPos:toOverXPos};
this.createDispatchDataEvent("orderChanged",
data);
}},
destruct:function(){this._disposeFields("_overallColumnArr",
"_visibleColumnArr",
"_columnDataArr",
"_colToXPosMap");
}});




/* ID: qx.ui.table.pane.Pane */
qx.Class.define("qx.ui.table.pane.Pane",
{extend:qx.ui.basic.Terminator,
construct:function(paneScroller){this.base(arguments);
this._paneScroller=paneScroller;
this._lastColCount=0;
this._lastRowCount=0;
},
properties:{appearance:{refine:true,
init:"table-pane"},
firstVisibleRow:{check:"Number",
init:0,
apply:"_applyFirstVisibleRow"},
visibleRowCount:{check:"Number",
init:0,
apply:"_applyVisibleRowCount"},
maxCacheLines:{check:"Number",
init:1000,
apply:"_applyMaxCacheLines"}},
members:{_applyFirstVisibleRow:function(value,
old){this._updateContent(false,
value-old);
},
_applyVisibleRowCount:function(value,
old){this._updateContent();
},
_afterAppear:function(){this.base(arguments);
if(this._updateWantedWhileInvisible){this._updateContent();
this._updateWantedWhileInvisible=false;
}},
getPaneScroller:function(){return this._paneScroller;
},
getTable:function(){return this._paneScroller.getTable();
},
setFocusedCell:function(col,
row,
massUpdate){if(col!=this._focusedCol||row!=this._focusedRow){var oldRow=this._focusedRow;
this._focusedCol=col;
this._focusedRow=row;
if(row!=oldRow&&!massUpdate){this._updateContent(false,
null,
oldRow,
true);
this._updateContent(false,
null,
row,
true);
}}},
_onSelectionChanged:function(evt){this._updateContent(false,
null,
null,
true);
},
_onFocusChanged:function(evt){this._updateContent(false,
null,
null,
true);
},
_onColWidthChanged:function(evt){this._updateContent(true);
},
_onColOrderChanged:function(evt){this._updateContent(true);
},
_onPaneModelChanged:function(evt){this._updateContent(true);
},
_onTableModelDataChanged:function(evt){var data=evt.getData?evt.getData():null;
this.__rowCacheClear();
var firstRow=this.getFirstVisibleRow();
var rowCount=this.getVisibleRowCount();
if(data==null||data.lastRow==-1||data.lastRow>=firstRow&&data.firstRow<firstRow+rowCount){this._updateContent();
}},
_onTableModelMetaDataChanged:function(evt){this._updateContent(true);
},
__rowCache:[],
__rowCacheCount:0,
_applyMaxCacheLines:function(value,
old){if(this.__rowCacheCount>=value&&value!==-1){this.__rowCacheClear();
}},
__rowCacheClear:function(){this.__rowCache=[];
this.__rowCacheCount=0;
},
__rowCacheGet:function(row,
selected,
focused){if(!selected&&!focused&&this.__rowCache[row]){return this.__rowCache[row];
}else{return null;
}},
__rowCacheSet:function(row,
rowString,
selected,
focused){if(!selected&&!focused&&!this.__rowCache[row]){this._applyMaxCacheLines(this.getMaxCacheLines());
this.__rowCache[row]=rowString;
this.__rowCacheCount+=1;
}},
_updateContent:function(completeUpdate,
scrollOffset,
onlyRow,
onlySelectionOrFocusChanged){if(completeUpdate){this.__rowCacheClear();
}
if(!this.isSeeable()){this._updateWantedWhileInvisible=true;
return;
}
if(this._layoutPending){window.clearTimeout(this._layoutPending);
this._updateAllRows();
return;
}if(scrollOffset&&Math.abs(scrollOffset)<=Math.min(10,
this.getVisibleRowCount())){this._scrollContent(scrollOffset);
}else if(onlySelectionOrFocusChanged&&!this.getTable().getAlwaysUpdateCells()){this._updateRowStyles(onlyRow);
}else{this._updateAllRows();
}},
_updateRowStyles:function(onlyRow){var elem=this.getElement();
if(!elem.firstChild){this._updateAllRows();
return;
}var table=this.getTable();
var selectionModel=table.getSelectionModel();
var tableModel=table.getTableModel();
var rowRenderer=table.getDataRowRenderer();
var rowNodes=elem.firstChild.childNodes;
var cellInfo={table:table};
var row=this.getFirstVisibleRow();
var y=0;
var end=rowNodes.length;
if(onlyRow!=null){var offset=onlyRow-row;
if(offset>=0&&offset<end){row=onlyRow;
y=offset;
end=offset+1;
}else return;
}
for(;y<end;y++,
row++){cellInfo.row=row;
cellInfo.selected=selectionModel.isSelectedIndex(row);
cellInfo.focusedRow=(this._focusedRow==row);
cellInfo.rowData=tableModel.getRowData(row);
rowRenderer.updateDataRowElement(cellInfo,
rowNodes[y]);
}},
_getRowsHtml:function(firstRow,
rowCount){var table=this.getTable();
var selectionModel=table.getSelectionModel();
var tableModel=table.getTableModel();
var columnModel=table.getTableColumnModel();
var paneModel=this.getPaneScroller().getTablePaneModel();
var rowRenderer=table.getDataRowRenderer();
tableModel.prefetchRows(firstRow,
firstRow+rowCount-1);
var rowHeight=table.getRowHeight();
var colCount=paneModel.getColumnCount();
var left=0;
var cols=[];
for(var x=0;x<colCount;x++){var col=paneModel.getColumnAtX(x);
var cellWidth=columnModel.getColumnWidth(col);
cols.push({col:col,
xPos:x,
editable:tableModel.isColumnEditable(col),
focusedCol:this._focusedCol==col,
styleLeft:left,
styleWidth:cellWidth});
left+=cellWidth;
}var rowsArr=[];
for(var row=firstRow;row<firstRow+rowCount;row++){var selected=selectionModel.isSelectedIndex(row);
var focusedRow=(this._focusedRow==row);
var cachedRow=this.__rowCacheGet(row,
selected,
focusedRow);
if(cachedRow){rowsArr.push(cachedRow);
continue;
}var rowHtml=[];
var cellInfo={table:table};
cellInfo.styleHeight=rowHeight;
cellInfo.row=row;
cellInfo.selected=selected;
cellInfo.focusedRow=focusedRow;
cellInfo.rowData=tableModel.getRowData(row);
rowHtml.push('<div ');
var rowClass=rowRenderer.getRowClass(cellInfo);
if(rowClass){rowHtml.push('class="',
rowClass,
'" ');
}var rowStyle=rowRenderer.createRowStyle(cellInfo);
rowStyle+=";position:relative;height:"+rowHeight+"px; width:"+paneModel.getTotalWidth()+"px;";
if(rowStyle){rowHtml.push('style="',
rowStyle,
'" ');
}rowHtml.push('>');
for(var x=0;x<colCount;x++){var col_def=cols[x];
for(var attr in col_def){cellInfo[attr]=col_def[attr];
}var col=cellInfo.col;
cellInfo.value=tableModel.getValue(col,
row);
var cellRenderer=columnModel.getDataCellRenderer(col);
cellRenderer.createDataCellHtml(cellInfo,
rowHtml);
}rowHtml.push('</div>');
var rowString=rowHtml.join("");
this.__rowCacheSet(row,
rowString,
selected,
focusedRow);
rowsArr.push(rowString);
}return rowsArr.join("");
},
_scrollContent:function(rowOffset){if(!this.getElement().firstChild){this._updateAllRows();
return;
}var tableBody=this.getElement().firstChild;
var tableChildNodes=tableBody.childNodes;
var rowCount=this.getVisibleRowCount();
var firstRow=this.getFirstVisibleRow();
var modelRowCount=this.getTable().getTableModel().getRowCount();
if(firstRow+rowCount>modelRowCount){this._updateAllRows();
return;
}var removeRowBase=rowOffset<0?rowCount+rowOffset:0;
var addRowBase=rowOffset<0?0:rowCount-rowOffset;
for(i=Math.abs(rowOffset)-1;i>=0;i--){var rowElem=tableChildNodes[removeRowBase];
try{tableBody.removeChild(rowElem);
}catch(e){break;
}}if(!this._tableContainer){this._tableContainer=document.createElement("div");
}var tableDummy='<div>';
tableDummy+=this._getRowsHtml(firstRow+addRowBase,
Math.abs(rowOffset));
tableDummy+='</div>';
this._tableContainer.innerHTML=tableDummy;
var newTableRows=this._tableContainer.firstChild.childNodes;
if(rowOffset>0){for(var i=newTableRows.length-1;i>=0;i--){var rowElem=newTableRows[0];
tableBody.appendChild(rowElem);
}}else{for(var i=newTableRows.length-1;i>=0;i--){var rowElem=newTableRows[newTableRows.length-1];
tableBody.insertBefore(rowElem,
tableBody.firstChild);
}}this._updateRowStyles(this._focusedRow-rowOffset);
this._updateRowStyles(this._focusedRow);
if(qx.core.Variant.isSet("qx.client",
"gecko")){rowElem.offsetHeight;
}},
_updateAllRows:function(){var table=this.getTable();
var tableModel=table.getTableModel();
var paneModel=this.getPaneScroller().getTablePaneModel();
var colCount=paneModel.getColumnCount();
var rowHeight=table.getRowHeight();
var firstRow=this.getFirstVisibleRow();
var rowCount=this.getVisibleRowCount();
var modelRowCount=tableModel.getRowCount();
if(firstRow+rowCount>modelRowCount){rowCount=Math.max(0,
modelRowCount-firstRow);
}var rowWidth=paneModel.getTotalWidth();
var htmlArr=["<div style='",
"width: ",
rowWidth,
"px;",
"line-height: ",
rowHeight,
"px;",
"overflow: hidden;",
"font-size: 11px;",
"font-family: 'Segoe UI', Corbel, Calibri, Tahoma, 'Lucida Sans Unicode', sans-serif;",
"'>",
this._getRowsHtml(firstRow,
rowCount),
"</div>"];
var elem=this.getElement();
var data=htmlArr.join("");
var self=this;
this._layoutPending=window.setTimeout(function(){elem.innerHTML=data;
if(qx.core.Variant.isSet("qx.client",
"gecko")){elem.childNodes[0].offsetHeight;
}self._layoutPending=null;
},
10);
this.setHeight(rowCount*rowHeight);
this._lastColCount=colCount;
this._lastRowCount=rowCount;
}},
destruct:function(){this._disposeObjects("_paneScroller");
}});




/* ID: qx.ui.table.pane.Header */
qx.Class.define("qx.ui.table.pane.Header",
{extend:qx.ui.layout.HorizontalBoxLayout,
construct:function(paneScroller){this.base(arguments);
this._paneScroller=paneScroller;
},
properties:{appearance:{refine:true,
init:"table-header"}},
members:{getPaneScroller:function(){return this._paneScroller;
},
getTable:function(){return this._paneScroller.getTable();
},
_onColWidthChanged:function(evt){var data=evt.getData();
this.setColumnWidth(data.col,
data.newWidth);
},
_onColOrderChanged:function(evt){this._updateContent(true);
},
_onPaneModelChanged:function(evt){this._updateContent(true);
},
_onTableModelMetaDataChanged:function(evt){this._updateContent();
},
setColumnWidth:function(col,
width){var x=this.getPaneScroller().getTablePaneModel().getX(col);
var children=this.getChildren();
if(children[x]!=null){children[x].setWidth(width);
}},
setMouseOverColumn:function(col){if(col!=this._lastMouseOverColumn){var paneModel=this.getPaneScroller().getTablePaneModel();
var children=this.getChildren();
if(this._lastMouseOverColumn!=null){var widget=children[paneModel.getX(this._lastMouseOverColumn)];
if(widget!=null){widget.removeState("mouseover");
}}
if(col!=null){children[paneModel.getX(col)].addState("mouseover");
}this._lastMouseOverColumn=col;
}},
showColumnMoveFeedback:function(col,
x){var elem=this.getElement();
if(this._moveFeedback==null){var xPos=this.getPaneScroller().getTablePaneModel().getX(col);
var cellWidget=this.getChildren()[xPos];
var tableModel=this.getTable().getTableModel();
var columnModel=this.getTable().getTableColumnModel();
var cellInfo={xPos:xPos,
col:col,
name:tableModel.getColumnName(col)};
var cellRenderer=columnModel.getHeaderCellRenderer(col);
var feedback=cellRenderer.createHeaderCell(cellInfo);
feedback.setWidth(cellWidget.getBoxWidth());
feedback.setHeight(cellWidget.getBoxHeight());
feedback.setZIndex(1000000);
feedback.setOpacity(0.8);
feedback.setTop(qx.html.Location.getClientBoxTop(elem));
this.getTopLevelWidget().add(feedback);
this._moveFeedback=feedback;
}this._moveFeedback.setLeft(qx.bom.element.Location.getLeft(elem)+x);
},
hideColumnMoveFeedback:function(){if(this._moveFeedback!=null){this.getTopLevelWidget().remove(this._moveFeedback);
this._moveFeedback.dispose();
this._moveFeedback=null;
}},
isShowingColumnMoveFeedback:function(){return this._moveFeedback!=null;
},
_updateContent:function(completeUpdate){var tableModel=this.getTable().getTableModel();
var columnModel=this.getTable().getTableColumnModel();
var paneModel=this.getPaneScroller().getTablePaneModel();
var children=this.getChildren();
var colCount=paneModel.getColumnCount();
var sortedColum=tableModel.getSortColumnIndex();
if(completeUpdate){this._cleanUpCells();
}var cellInfo={};
cellInfo.sortedAscending=tableModel.isSortAscending();
for(var x=0;x<colCount;x++){var col=paneModel.getColumnAtX(x);
var colWidth=columnModel.getColumnWidth(col);
var cellRenderer=columnModel.getHeaderCellRenderer(col);
cellInfo.xPos=x;
cellInfo.col=col;
cellInfo.name=tableModel.getColumnName(col);
cellInfo.editable=tableModel.isColumnEditable(col);
cellInfo.sorted=(col==sortedColum);
var cachedWidget=children[x];
if(cachedWidget==null){cachedWidget=cellRenderer.createHeaderCell(cellInfo);
cachedWidget.set({width:colWidth,
height:"100%"});
this.add(cachedWidget);
}else{cellRenderer.updateHeaderCell(cellInfo,
cachedWidget);
}}},
_cleanUpCells:function(){var children=this.getChildren();
for(var x=children.length-1;x>=0;x--){var cellWidget=children[x];
this.remove(cellWidget);
cellWidget.dispose();
}}},
destruct:function(){this._disposeObjects("_paneScroller");
}});




/* ID: qx.ui.table.pane.Scroller */
qx.Class.define("qx.ui.table.pane.Scroller",
{extend:qx.ui.layout.VerticalBoxLayout,
construct:function(table){this.base(arguments);
this._table=table;
this._verScrollBar=new qx.ui.basic.ScrollBar(false);
this._horScrollBar=new qx.ui.basic.ScrollBar(true);
var scrollBarWidth=this._verScrollBar.getPreferredBoxWidth();
this._verScrollBar.setWidth("auto");
this._horScrollBar.setHeight("auto");
this._horScrollBar.setPaddingRight(scrollBarWidth);
this._horScrollBar.addEventListener("changeValue",
this._onScrollX,
this);
this._verScrollBar.addEventListener("changeValue",
this._onScrollY,
this);
this._header=this.getTable().getNewTablePaneHeader()(this);
this._header.set({width:"auto",
height:"auto"});
this._headerClipper=new qx.ui.layout.CanvasLayout;
this._headerClipper.setDimension("1*",
"auto");
this._headerClipper.setOverflow("hidden");
this._headerClipper.add(this._header);
this._spacer=new qx.ui.basic.Terminator;
this._spacer.setWidth(scrollBarWidth);
this._top=new qx.ui.layout.HorizontalBoxLayout;
this._top.setHeight("auto");
this._top.add(this._headerClipper,
this._spacer);
this._tablePane=this.getTable().getNewTablePane()(this);
this._tablePane.set({width:"auto",
height:"auto"});
this._showCellFocusIndicator=this.getShowCellFocusIndicator();
this._focusIndicator=new qx.ui.table.pane.FocusIndicator(this);
this._paneClipper=new qx.ui.layout.CanvasLayout;
this._paneClipper.setWidth("1*");
this._paneClipper.setOverflow("hidden");
this._paneClipper.add(this._tablePane,
this._focusIndicator);
this._paneClipper.addEventListener("mousewheel",
this._onmousewheel,
this);
var scrollerBody=new qx.ui.layout.HorizontalBoxLayout;
scrollerBody.setHeight("1*");
scrollerBody.add(this._paneClipper,
this._verScrollBar);
this.add(this._top,
scrollerBody,
this._horScrollBar);
this._headerClipper.addEventListener("changeCapture",
this._onChangeCaptureHeader,
this);
this._headerClipper.addEventListener("mousemove",
this._onmousemoveHeader,
this);
this._paneClipper.addEventListener("mousemove",
this._onmousemovePane,
this);
this._headerClipper.addEventListener("mousedown",
this._onmousedownHeader,
this);
this._paneClipper.addEventListener("mousedown",
this._onmousedownPane,
this);
this._focusIndicator.addEventListener("mouseup",
this._onMouseupFocusIndicator,
this);
this._headerClipper.addEventListener("mouseup",
this._onmouseupHeader,
this);
this._paneClipper.addEventListener("mouseup",
this._onmouseupPane,
this);
this._headerClipper.addEventListener("click",
this._onclickHeader,
this);
this._paneClipper.addEventListener("click",
this._onclickPane,
this);
this._paneClipper.addEventListener("contextmenu",
this._onContextMenu,
this);
this._paneClipper.addEventListener("dblclick",
this._ondblclickPane,
this);
this.addEventListener("mouseout",
this._onmouseout,
this);
var tableModel=this.getTable().getTableModel();
this._lastRowCount=tableModel?tableModel.getRowCount():0;
this.initScrollTimeout();
},
statics:{MIN_COLUMN_WIDTH:10,
RESIZE_REGION_RADIUS:5,
CLICK_TOLERANCE:5,
HORIZONTAL_SCROLLBAR:1,
VERTICAL_SCROLLBAR:2,
CURSOR_RESIZE_HORIZONTAL:(qx.core.Client.getInstance().isGecko()&&(qx.core.Client.getInstance().getMajor()>1||qx.core.Client.getInstance().getMinor()>=8))?"ew-resize":"e-resize"},
events:{"changeScrollY":"qx.event.type.ChangeEvent",
"changeScrollX":"qx.event.type.ChangeEvent",
"cellClick":"qx.ui.table.pane.CellEvent",
"cellDblclick":"qx.ui.table.pane.CellEvent",
"cellContextmenu":"qx.ui.table.pane.CellEvent"},
properties:{horizontalScrollBarVisible:{check:"Boolean",
init:true,
apply:"_applyHorizontalScrollBarVisible",
event:"changeHorizontalScrollBarVisible"},
verticalScrollBarVisible:{check:"Boolean",
init:true,
apply:"_applyVerticalScrollBarVisible",
event:"changeVerticalScrollBarVisible"},
tablePaneModel:{check:"qx.ui.table.pane.Model",
apply:"_applyTablePaneModel",
event:"changeTablePaneModel"},
liveResize:{check:"Boolean",
init:false},
focusCellOnMouseMove:{check:"Boolean",
init:false},
selectBeforeFocus:{check:"Boolean",
init:false},
showCellFocusIndicator:{check:"Boolean",
init:true,
apply:"_applyShowCellFocusIndicator"},
scrollTimeout:{check:"Integer",
init:100,
apply:"_applyScrollTimeout"}},
members:{_applyHorizontalScrollBarVisible:function(value,
old){if(value){this._horScrollBar.setHeight("auto");
}else{this._horScrollBar.setHeight(0);
}this._horScrollBar.setVisibility(value);
this._updateContent();
},
_applyVerticalScrollBarVisible:function(value,
old){if(value){this._verScrollBar.setWidth("auto");
}else{this._verScrollBar.setWidth(0);
}this._verScrollBar.setVisibility(value);
var scrollBarWidth=value?this._verScrollBar.getPreferredBoxWidth():0;
this._horScrollBar.setPaddingRight(scrollBarWidth);
this._spacer.setWidth(scrollBarWidth);
},
_applyTablePaneModel:function(value,
old){if(old!=null){old.removeEventListener("modelChanged",
this._onPaneModelChanged,
this);
}value.addEventListener("modelChanged",
this._onPaneModelChanged,
this);
},
_applyShowCellFocusIndicator:function(value,
old){this._showCellFocusIndicator=value;
if(value){this._updateFocusIndicator();
}else{if(this._focusIndicator){this._focusIndicator.hide();
}}},
getScrollY:function(){return this._verScrollBar.getValue();
},
setScrollY:function(scrollY,
renderSync){this._ignoreScrollYEvent=renderSync;
this._verScrollBar.setValue(scrollY);
if(renderSync){this._updateContent();
}this._ignoreScrollYEvent=false;
},
getScrollX:function(){return this._horScrollBar.getValue();
},
setScrollX:function(scrollX){this._horScrollBar.setValue(scrollX);
},
getTable:function(){return this._table;
},
_onColVisibilityChanged:function(evt){this._updateHorScrollBarMaximum();
this._updateFocusIndicator();
},
_onColWidthChanged:function(evt){this._header._onColWidthChanged(evt);
this._tablePane._onColWidthChanged(evt);
var data=evt.getData();
var paneModel=this.getTablePaneModel();
var x=paneModel.getX(data.col);
if(x!=-1){this._updateHorScrollBarMaximum();
this._updateFocusIndicator();
}},
_onColOrderChanged:function(evt){this._header._onColOrderChanged(evt);
this._tablePane._onColOrderChanged(evt);
this._updateHorScrollBarMaximum();
},
_onTableModelDataChanged:function(evt){this._tablePane._onTableModelDataChanged(evt);
var rowCount=this.getTable().getTableModel().getRowCount();
if(rowCount!=this._lastRowCount){this._updateVerScrollBarMaximum();
var removedRows=this._lastRowCount-rowCount;
if(removedRows>0){this.getTable().getSelectionModel().removeSelectionInterval(this._lastRowCount-1,
rowCount);
}
if(this.getFocusedRow()>=rowCount){if(rowCount==0){this.setFocusedCell(null,
null);
}else{this.setFocusedCell(this.getFocusedColumn(),
rowCount-1);
}}this._lastRowCount=rowCount;
}},
_onSelectionChanged:function(evt){this._tablePane._onSelectionChanged(evt);
},
_onFocusChanged:function(evt){this._tablePane._onFocusChanged(evt);
},
_onTableModelMetaDataChanged:function(evt){this._header._onTableModelMetaDataChanged(evt);
this._tablePane._onTableModelMetaDataChanged(evt);
},
_onPaneModelChanged:function(evt){this._header._onPaneModelChanged(evt);
this._tablePane._onPaneModelChanged(evt);
},
_updateHorScrollBarMaximum:function(){this._horScrollBar.setMaximum(this.getTablePaneModel().getTotalWidth());
},
_updateVerScrollBarMaximum:function(){var rowCount=this.getTable().getTableModel().getRowCount();
var rowHeight=this.getTable().getRowHeight();
if(this.getTable().getKeepFirstVisibleRowComplete()){this._verScrollBar.setMaximum((rowCount+1)*rowHeight);
}else{this._verScrollBar.setMaximum(rowCount*rowHeight);
}},
_onKeepFirstVisibleRowCompleteChanged:function(){this._updateVerScrollBarMaximum();
this._updateContent();
},
_changeInnerHeight:function(vNew,
vOld){this._postponedUpdateContent();
return this.base(arguments,
vNew,
vOld);
},
_afterAppear:function(){this.base(arguments);
this.getElement().onselectstart=qx.lang.Function.returnFalse;
this._updateContent();
this._header._updateContent();
this._updateHorScrollBarMaximum();
this._updateVerScrollBarMaximum();
},
_onScrollX:function(evt){this.createDispatchChangeEvent("changeScrollX",
evt.getValue(),
evt.getOldValue());
var scrollLeft=evt.getValue();
this._header.setLeft(-scrollLeft);
this._paneClipper.__scrollLeft=scrollLeft;
this._paneClipper.setScrollLeft(scrollLeft);
},
_onScrollY:function(evt){this.createDispatchChangeEvent("changeScrollY",
evt.getValue(),
evt.getOldValue());
this._postponedUpdateContent();
},
_onmousewheel:function(evt){var table=this.getTable();
if(!table.getEnabled()){return;
}this._verScrollBar.setValue(this._verScrollBar.getValue()-(evt.getWheelDelta()*3)*table.getRowHeight());
if(this._lastMousePageX&&this.getFocusCellOnMouseMove()){this._focusCellAtPagePos(this._lastMousePageX,
this._lastMousePageY);
}},
__handleResizeColumn:function(pageX){var table=this.getTable();
var minColumnWidth=qx.ui.table.pane.Scroller.MIN_COLUMN_WIDTH;
var newWidth=Math.max(minColumnWidth,
this._lastResizeWidth+pageX-this._lastResizeMousePageX);
if(this.getLiveResize()){var columnModel=table.getTableColumnModel();
columnModel.setColumnWidth(this._resizeColumn,
newWidth);
}else{this._header.setColumnWidth(this._resizeColumn,
newWidth);
var paneModel=this.getTablePaneModel();
this._showResizeLine(paneModel.getColumnLeft(this._resizeColumn)+newWidth);
}this._lastResizeMousePageX+=newWidth-this._lastResizeWidth;
this._lastResizeWidth=newWidth;
},
__handleMoveColumn:function(pageX){var clickTolerance=qx.ui.table.pane.Scroller.CLICK_TOLERANCE;
if(this._header.isShowingColumnMoveFeedback()||pageX>this._lastMoveMousePageX+clickTolerance||pageX<this._lastMoveMousePageX-clickTolerance){this._lastMoveColPos+=pageX-this._lastMoveMousePageX;
this._header.showColumnMoveFeedback(this._moveColumn,
this._lastMoveColPos);
var targetScroller=this._table.getTablePaneScrollerAtPageX(pageX);
if(this._lastMoveTargetScroller&&this._lastMoveTargetScroller!=targetScroller){this._lastMoveTargetScroller.hideColumnMoveFeedback();
}
if(targetScroller!=null){this._lastMoveTargetX=targetScroller.showColumnMoveFeedback(pageX);
}else{this._lastMoveTargetX=null;
}this._lastMoveTargetScroller=targetScroller;
this._lastMoveMousePageX=pageX;
}},
_onmousemoveHeader:function(evt){var table=this.getTable();
if(!table.getEnabled()){return;
}var useResizeCursor=false;
var mouseOverColumn=null;
var pageX=evt.getPageX();
var pageY=evt.getPageY();
this._lastMousePageX=pageX;
this._lastMousePageY=pageY;
if(this._resizeColumn!=null){this.__handleResizeColumn(pageX);
useResizeCursor=true;
}else if(this._moveColumn!=null){this.__handleMoveColumn(pageX);
}else{var resizeCol=this._getResizeColumnForPageX(pageX);
if(resizeCol!=-1){useResizeCursor=true;
}else{var tableModel=table.getTableModel();
var col=this._getColumnForPageX(pageX);
if(col!=null&&tableModel.isColumnSortable(col)){mouseOverColumn=col;
}}}this.getTopLevelWidget().setGlobalCursor(useResizeCursor?qx.ui.table.pane.Scroller.CURSOR_RESIZE_HORIZONTAL:null);
this._header.setMouseOverColumn(mouseOverColumn);
},
_onmousemovePane:function(evt){var table=this.getTable();
if(!table.getEnabled()){return;
}var useResizeCursor=false;
var pageX=evt.getPageX();
var pageY=evt.getPageY();
this._lastMousePageX=pageX;
this._lastMousePageY=pageY;
if(this._resizeColumn!=null){this.__handleResizeColumn(pageX);
useResizeCursor=true;
}else if(this._moveColumn!=null){this.__handleMoveColumn(pageX);
}else{var row=this._getRowForPagePos(pageX,
pageY);
if(row!=null&&this._getColumnForPageX(pageX)!=null){if(this.getFocusCellOnMouseMove()){this._focusCellAtPagePos(pageX,
pageY);
}}}this.getTopLevelWidget().setGlobalCursor(useResizeCursor?qx.ui.table.pane.Scroller.CURSOR_RESIZE_HORIZONTAL:null);
this._header.setMouseOverColumn(null);
},
_onmousedownHeader:function(evt){if(!this.getTable().getEnabled()){return;
}var pageX=evt.getPageX();
var resizeCol=this._getResizeColumnForPageX(pageX);
if(resizeCol!=-1){this._startResizeHeader(resizeCol,
pageX);
}else{var moveCol=this._getColumnForPageX(pageX);
if(moveCol!=null){this._startMoveHeader(moveCol,
pageX);
}}},
_startResizeHeader:function(resizeCol,
pageX){var columnModel=this.getTable().getTableColumnModel();
this._resizeColumn=resizeCol;
this._lastResizeMousePageX=pageX;
this._lastResizeWidth=columnModel.getColumnWidth(this._resizeColumn);
this._headerClipper.setCapture(true);
},
_startMoveHeader:function(moveCol,
pageX){this._moveColumn=moveCol;
this._lastMoveMousePageX=pageX;
this._lastMoveColPos=this.getTablePaneModel().getColumnLeft(moveCol);
this._headerClipper.setCapture(true);
},
_onmousedownPane:function(evt){var table=this.getTable();
if(!table.getEnabled()){return;
}
if(this.isEditing()){this.stopEditing();
}var pageX=evt.getPageX();
var pageY=evt.getPageY();
var row=this._getRowForPagePos(pageX,
pageY);
var col=this._getColumnForPageX(pageX);
if(row!=null&&col!=null){this._lastMouseDownCell={row:row,
col:col};
var selectBeforeFocus=this.getSelectBeforeFocus();
if(selectBeforeFocus){table._getSelectionManager().handleMouseDown(row,
evt);
}if(!this.getFocusCellOnMouseMove()){this._focusIndicator.setAnonymous(false);
this._focusCellAtPagePos(pageX,
pageY);
}
if(!selectBeforeFocus){table._getSelectionManager().handleMouseDown(row,
evt);
}}},
_onMouseupFocusIndicator:function(e){if(this._lastMouseDownCell&&this._focusIndicator.getRow()==this._lastMouseDownCell.row&&this._focusIndicator.getColumn()==this._lastMouseDownCell.col){this._lastMouseDownCell={};
if(this.hasEventListeners("cellClick")){this.dispatchEvent(new qx.ui.table.pane.CellEvent(this,
"cellClick",
e),
true);
}}this._focusIndicator.setAnonymous(true);
},
_onmouseupHeader:function(evt){var table=this.getTable();
if(!table.getEnabled()){return;
}
if(this._resizeColumn!=null){this._stopResizeHeader();
}else if(this._moveColumn!=null){this._stopMoveHeader();
}},
_onChangeCaptureHeader:function(e){if(this._resizeColumn!=null&&e.getValue()==false){this._stopResizeHeader();
}
if(this._moveColumn!=null&&e.getValue()==false){this._stopMoveHeader();
}},
_stopResizeHeader:function(){var columnModel=this.getTable().getTableColumnModel();
if(!this.getLiveResize()){this._hideResizeLine();
columnModel.setColumnWidth(this._resizeColumn,
this._lastResizeWidth);
}this._resizeColumn=null;
this._headerClipper.setCapture(false);
this.getTopLevelWidget().setGlobalCursor(null);
},
_stopMoveHeader:function(){var columnModel=this.getTable().getTableColumnModel();
var paneModel=this.getTablePaneModel();
this._header.hideColumnMoveFeedback();
if(this._lastMoveTargetScroller){this._lastMoveTargetScroller.hideColumnMoveFeedback();
}
if(this._lastMoveTargetX!=null){var fromVisXPos=paneModel.getFirstColumnX()+paneModel.getX(this._moveColumn);
var toVisXPos=this._lastMoveTargetX;
if(toVisXPos!=fromVisXPos&&toVisXPos!=fromVisXPos+1){var fromCol=columnModel.getVisibleColumnAtX(fromVisXPos);
var toCol=columnModel.getVisibleColumnAtX(toVisXPos);
var fromOverXPos=columnModel.getOverallX(fromCol);
var toOverXPos=(toCol!=null)?columnModel.getOverallX(toCol):columnModel.getOverallColumnCount();
if(toOverXPos>fromOverXPos){toOverXPos--;
}columnModel.moveColumn(fromOverXPos,
toOverXPos);
}}this._moveColumn=null;
this._lastMoveTargetX=null;
this._headerClipper.setCapture(false);
},
_onmouseupPane:function(evt){var table=this.getTable();
if(!table.getEnabled()){return;
}var row=this._getRowForPagePos(evt.getPageX(),
evt.getPageY());
if(row!=-1&&row!=null&&this._getColumnForPageX(evt.getPageX())!=null){table._getSelectionManager().handleMouseUp(row,
evt);
}},
_onclickHeader:function(evt){var table=this.getTable();
if(!table.getEnabled()){return;
}var tableModel=table.getTableModel();
var pageX=evt.getPageX();
var resizeCol=this._getResizeColumnForPageX(pageX);
if(resizeCol==-1){var col=this._getColumnForPageX(pageX);
if(col!=null&&tableModel.isColumnSortable(col)){var sortCol=tableModel.getSortColumnIndex();
var ascending=(col!=sortCol)?true:!tableModel.isSortAscending();
tableModel.sortByColumn(col,
ascending);
table.getSelectionModel().clearSelection();
}}},
_onclickPane:function(evt){var table=this.getTable();
if(!table.getEnabled()){return;
}var pageX=evt.getPageX();
var pageY=evt.getPageY();
var row=this._getRowForPagePos(pageX,
pageY);
var col=this._getColumnForPageX(pageX);
if(row!=null&&col!=null){table._getSelectionManager().handleClick(row,
evt);
if(this._lastMouseDownCell&&row==this._lastMouseDownCell.row&&col==this._lastMouseDownCell.col){this._lastMouseDownCell={};
if(this.hasEventListeners("cellClick")){this.dispatchEvent(new qx.ui.table.pane.CellEvent(this,
"cellClick",
evt),
true);
}}}},
_onContextMenu:function(evt){var pageX=evt.getPageX();
var pageY=evt.getPageY();
var row=this._getRowForPagePos(pageX,
pageY);
var col=this._getColumnForPageX(pageX);
if(this._lastMouseDownCell&&row==this._lastMouseDownCell.row&&col==this._lastMouseDownCell.col){this._lastMouseDownCell={};
if(this.hasEventListeners("cellContextmenu")){this.dispatchEvent(new qx.ui.table.pane.CellEvent(this,
"cellContextmenu",
evt),
true);
}}},
_ondblclickPane:function(evt){var pageX=evt.getPageX();
var pageY=evt.getPageY();
this._focusCellAtPagePos(pageX,
pageY);
this.startEditing();
if(this.hasEventListeners("cellDblclick")){var row=this._getRowForPagePos(pageX,
pageY);
if(row!=-1&&row!=null){this.dispatchEvent(new qx.ui.table.pane.CellEvent(this,
"cellDblclick",
evt),
true);
}}},
_onmouseout:function(evt){var table=this.getTable();
if(!table.getEnabled()){return;
}if(this._resizeColumn==null){this.getTopLevelWidget().setGlobalCursor(null);
}this._header.setMouseOverColumn(null);
},
_showResizeLine:function(x){var resizeLine=this._resizeLine;
if(resizeLine==null){resizeLine=new qx.ui.basic.Terminator;
resizeLine.setBackgroundColor("#D6D5D9");
resizeLine.setWidth(3);
this._paneClipper.add(resizeLine);
qx.ui.core.Widget.flushGlobalQueues();
this._resizeLine=resizeLine;
}resizeLine._renderRuntimeLeft(x-2);
resizeLine._renderRuntimeHeight(this._paneClipper.getBoxHeight()+this._paneClipper.getScrollTop());
this._resizeLine.removeStyleProperty("visibility");
},
_hideResizeLine:function(){if(this._resizeLine){this._resizeLine.setStyleProperty("visibility",
"hidden");
}},
showColumnMoveFeedback:function(pageX){var paneModel=this.getTablePaneModel();
var columnModel=this.getTable().getTableColumnModel();
var paneLeftX=qx.bom.element.Location.getLeft(this._tablePane.getElement());
var colCount=paneModel.getColumnCount();
var targetXPos=0;
var targetX=0;
var currX=paneLeftX;
for(var xPos=0;xPos<colCount;xPos++){var col=paneModel.getColumnAtX(xPos);
var colWidth=columnModel.getColumnWidth(col);
if(pageX<currX+colWidth/2){break;
}currX+=colWidth;
targetXPos=xPos+1;
targetX=currX-paneLeftX;
}var clipperLeftX=qx.bom.element.Location.getLeft(this._paneClipper.getElement());
var clipperWidth=this._paneClipper.getBoxWidth();
var scrollX=clipperLeftX-paneLeftX;
targetX=qx.lang.Number.limit(targetX,
scrollX+2,
scrollX+clipperWidth-1);
this._showResizeLine(targetX);
return paneModel.getFirstColumnX()+targetXPos;
},
hideColumnMoveFeedback:function(){this._hideResizeLine();
},
_focusCellAtPagePos:function(pageX,
pageY){var row=this._getRowForPagePos(pageX,
pageY);
if(row!=-1&&row!=null){var col=this._getColumnForPageX(pageX);
if(col!=null){this._table.setFocusedCell(col,
row);
}}},
setFocusedCell:function(col,
row){if(!this.isEditing()){this._tablePane.setFocusedCell(col,
row,
this._updateContentPlanned);
this._focusedCol=col;
this._focusedRow=row;
if(!this._updateContentPlanned){this._updateFocusIndicator();
}}},
getFocusedColumn:function(){return this._focusedCol;
},
getFocusedRow:function(){return this._focusedRow;
},
scrollCellVisible:function(col,
row){var paneModel=this.getTablePaneModel();
var xPos=paneModel.getX(col);
if(xPos!=-1){var columnModel=this.getTable().getTableColumnModel();
var colLeft=paneModel.getColumnLeft(col);
var colWidth=columnModel.getColumnWidth(col);
var rowHeight=this.getTable().getRowHeight();
var rowTop=row*rowHeight;
var scrollX=this.getScrollX();
var scrollY=this.getScrollY();
var viewWidth=this._paneClipper.getBoxWidth();
var viewHeight=this._paneClipper.getBoxHeight();
var minScrollX=Math.min(colLeft,
colLeft+colWidth-viewWidth);
var maxScrollX=colLeft;
this.setScrollX(Math.max(minScrollX,
Math.min(maxScrollX,
scrollX)));
var minScrollY=rowTop+rowHeight-viewHeight;
if(this.getTable().getKeepFirstVisibleRowComplete()){minScrollY+=rowHeight-1;
}var maxScrollY=rowTop;
this.setScrollY(Math.max(minScrollY,
Math.min(maxScrollY,
scrollY)),
true);
}},
isEditing:function(){return this._cellEditor!=null;
},
startEditing:function(){var table=this.getTable();
var tableModel=table.getTableModel();
var col=this._focusedCol;
if(!this.isEditing()&&(col!=null)&&tableModel.isColumnEditable(col)){var row=this._focusedRow;
var xPos=this.getTablePaneModel().getX(col);
var value=tableModel.getValue(col,
row);
this._cellEditorFactory=table.getTableColumnModel().getCellEditorFactory(col);
var cellInfo={col:col,
row:row,
xPos:xPos,
value:value,
table:table};
this._cellEditor=this._cellEditorFactory.createCellEditor(cellInfo);
if(this._cellEditor===null){return false;
}else if(this._cellEditor instanceof qx.ui.window.Window){this._cellEditor.setModal(true);
this._cellEditor.setShowClose(false);
this._cellEditor.addToDocument();
this._cellEditor.addEventListener("disappear",
this._onCellEditorModalWindowClose,
this);
var f=table.getModalCellEditorPreOpenFunction();
if(f!=null){f(this._cellEditor,
cellInfo);
}this._cellEditor.open();
}else{this._cellEditor.set({width:"100%",
height:"100%"});
this._focusIndicator.addEventListener("mousedown",
function(e){e.stopPropagation();
});
this._focusIndicator.add(this._cellEditor);
this._focusIndicator.addState("editing");
qx.client.Timer.once(function(){if(this.getDisposed()){return;
}this._cellEditor.focus();
},
this,
0);
}return true;
}return false;
},
stopEditing:function(){this.flushEditor();
this.cancelEditing();
},
flushEditor:function(){if(this.isEditing()){var value=this._cellEditorFactory.getCellEditorValue(this._cellEditor);
this.getTable().getTableModel().setValue(this._focusedCol,
this._focusedRow,
value);
this._table.focus();
}},
cancelEditing:function(){if(this.isEditing()&&!this._cellEditor.pendingDispose){if(this._cellEditorIsModalWindow){qx.client.Timer.once(function(){var d=qx.ui.core.ClientDocument.getInstance();
d.remove(this._cellEditor);
this._cellEditor.removeEventListener("disappear",
this._onCellEditorModalWindowClose,
this);
this._cellEditor.dispose();
this._cellEditor=null;
this._cellEditorFactory=null;
},
this,
0);
this._cellEditor.pendingDispose=true;
}else{this._focusIndicator.remove(this._cellEditor);
this._focusIndicator.removeState("editing");
this._cellEditor.dispose();
this._cellEditor=null;
this._cellEditorFactory=null;
}}},
_onCellEditorModalWindowClose:function(evt){this.stopEditing();
},
_getColumnForPageX:function(pageX){var headerLeftX=qx.bom.element.Location.getLeft(this._header.getElement());
var columnModel=this.getTable().getTableColumnModel();
var paneModel=this.getTablePaneModel();
var colCount=paneModel.getColumnCount();
var currX=headerLeftX;
for(var x=0;x<colCount;x++){var col=paneModel.getColumnAtX(x);
var colWidth=columnModel.getColumnWidth(col);
currX+=colWidth;
if(pageX<currX){return col;
}}return null;
},
_getResizeColumnForPageX:function(pageX){var headerLeftX=qx.bom.element.Location.getLeft(this._header.getElement());
var columnModel=this.getTable().getTableColumnModel();
var paneModel=this.getTablePaneModel();
var colCount=paneModel.getColumnCount();
var currX=headerLeftX;
var regionRadius=qx.ui.table.pane.Scroller.RESIZE_REGION_RADIUS;
for(var x=0;x<colCount;x++){var col=paneModel.getColumnAtX(x);
var colWidth=columnModel.getColumnWidth(col);
currX+=colWidth;
if(pageX>=(currX-regionRadius)&&pageX<=(currX+regionRadius)){return col;
}}return -1;
},
_getRowForPagePos:function(pageX,
pageY){var paneClipperElem=this._paneClipper.getElement();
var paneClipperPos=qx.bom.element.Location.get(paneClipperElem);
if(pageX<paneClipperPos.left||pageX>paneClipperPos.right){return null;
}
if(pageY>=paneClipperPos.top&&pageY<=paneClipperPos.bottom){var rowHeight=this.getTable().getRowHeight();
var scrollY=this._verScrollBar.getValue();
if(this.getTable().getKeepFirstVisibleRowComplete()){scrollY=Math.floor(scrollY/rowHeight)*rowHeight;
}var tableY=scrollY+pageY-paneClipperPos.top;
var row=Math.floor(tableY/rowHeight);
var rowCount=this.getTable().getTableModel().getRowCount();
return (row<rowCount)?row:null;
}var headerPos=qx.bom.element.Location.get(this._headerClipper.getElement());
if(pageY>=headerPos.top&&pageY<=headerPos.bottom&&pageX<=headerPos.right){return -1;
}return null;
},
setTopRightWidget:function(widget){var oldWidget=this._topRightWidget;
if(oldWidget!=null){this._top.remove(oldWidget);
}
if(widget!=null){this._top.remove(this._spacer);
this._top.add(widget);
}else if(oldWidget!=null){this._top.add(this._spacer);
}this._topRightWidget=widget;
},
getHeader:function(){return this._header;
},
getTablePane:function(){return this._tablePane;
},
getNeededScrollBars:function(forceHorizontal,
preventVertical){var barWidth=this._verScrollBar.getPreferredBoxWidth();
var viewWidth=this._paneClipper.getInnerWidth();
if(this.getVerticalScrollBarVisible()){viewWidth+=barWidth;
}var viewHeight=this._paneClipper.getInnerHeight();
if(this.getHorizontalScrollBarVisible()){viewHeight+=barWidth;
}var paneWidth=this.getTablePaneModel().getTotalWidth();
var paneHeight=this.getTable().getRowHeight()*this.getTable().getTableModel().getRowCount();
var horNeeded=false;
var verNeeded=false;
if(paneWidth>viewWidth){horNeeded=true;
if(paneHeight>viewHeight-barWidth){verNeeded=true;
}}else if(paneHeight>viewHeight){verNeeded=true;
if(!preventVertical&&(paneWidth>viewWidth-barWidth)){horNeeded=true;
}}var horBar=qx.ui.table.pane.Scroller.HORIZONTAL_SCROLLBAR;
var verBar=qx.ui.table.pane.Scroller.VERTICAL_SCROLLBAR;
return ((forceHorizontal||horNeeded)?horBar:0)|((preventVertical||!verNeeded)?0:verBar);
},
_applyScrollTimeout:function(value,
old){if(this._updateInterval){window.clearInterval(this._updateInterval);
this._updateInterval=null;
}if(!this._onintervalWrapper){this._onintervalWrapper=qx.lang.Function.bind(this._oninterval,
this);
}if(value){this._updateInterval=window.setInterval(this._onintervalWrapper,
value);
}},
_postponedUpdateContent:function(){this._updateContentPlanned=true;
},
_oninterval:function(){if(this._updateContentPlanned&&!this._tablePane._layoutPending){this._updateContentPlanned=false;
this._updateContent();
}},
_updateContent:function(){if(!this.isSeeable()){return;
}var paneHeight=this._paneClipper.getInnerHeight();
var scrollX=this._horScrollBar.getValue();
var scrollY=this._verScrollBar.getValue();
var rowHeight=this.getTable().getRowHeight();
var firstRow=Math.floor(scrollY/rowHeight);
var oldFirstRow=this._tablePane.getFirstVisibleRow();
this._tablePane.setFirstVisibleRow(firstRow);
var rowCount=Math.ceil(paneHeight/rowHeight);
var paneOffset=0;
var firstVisibleRowComplete=this.getTable().getKeepFirstVisibleRowComplete();
if(!firstVisibleRowComplete){rowCount++;
paneOffset=scrollY%rowHeight;
}this._tablePane.setVisibleRowCount(rowCount);
if(firstRow!=oldFirstRow){this._updateFocusIndicator();
}this._header.setLeft(-scrollX);
if(this._paneClipper.__scrollLeft!=scrollX){this._paneClipper.__scrollLeft=scrollX;
this._paneClipper.setScrollLeft(scrollX);
}if(!firstVisibleRowComplete){this._paneClipper.setScrollTop(paneOffset);
}},
_updateFocusIndicator:function(){if(!this._showCellFocusIndicator){return;
}var table=this.getTable();
if(!table.getEnabled()){return;
}this._focusIndicator.moveToCell(this._focusedCol,
this._focusedRow);
}},
destruct:function(){if(this.getElement()!=null){this.getElement().onselectstart=null;
}
if(this._updateInterval){window.clearInterval(this._updateInterval);
this._updateInterval=null;
}var tablePaneModel=this.getTablePaneModel();
if(tablePaneModel){tablePaneModel.dispose();
}this._disposeObjects("_verScrollBar",
"_horScrollBar",
"_header",
"_headerClipper",
"_spacer",
"_top",
"_tablePane",
"_paneClipper",
"_resizeLine",
"_table",
"_focusIndicator",
"_topRightWidget");
}});




/* ID: qx.ui.basic.ScrollBar */
qx.Class.define("qx.ui.basic.ScrollBar",
{extend:qx.ui.layout.CanvasLayout,
construct:function(horizontal){this.base(arguments,
horizontal?"horizontal":"vertical");
this._horizontal=(horizontal==true);
this._scrollBar=new qx.ui.basic.ScrollArea;
if(qx.core.Variant.isSet("qx.client",
"gecko")){this._scrollBar.setStyleProperty("position",
"");
}this._scrollBar.setOverflow(horizontal?"scrollX":"scrollY");
this._scrollBar.addEventListener("scroll",
this._onscroll,
this);
this._scrollContent=new qx.ui.basic.Terminator;
if(qx.core.Variant.isSet("qx.client",
"gecko")){this._scrollContent.setStyleProperty("position",
"");
}this._scrollBar.add(this._scrollContent);
if(this._horizontal){this._scrollContent.setHeight(5);
this._scrollBar.setWidth("100%");
this._scrollBar.setHeight(this._getScrollBarWidth());
if(qx.core.Variant.isSet("qx.client",
"mshtml")){this.setHeight(this._getScrollBarWidth());
this.setOverflow("hidden");
this._scrollBar.setHeight(this._getScrollBarWidth()+1);
this._scrollBar.setTop(-1);
}}else{this._scrollContent.setWidth(5);
this._scrollBar.setHeight("100%");
this._scrollBar.setWidth(this._getScrollBarWidth());
if(qx.core.Variant.isSet("qx.client",
"mshtml")){this.setWidth(this._getScrollBarWidth());
this.setOverflow("hidden");
this._scrollBar.setWidth(this._getScrollBarWidth()+1);
this._scrollBar.setLeft(-1);
}}this.add(this._scrollBar);
this._blocker=new qx.ui.basic.Terminator();
this._blocker.set({left:0,
top:0,
height:"100%",
width:"100%",
display:!this.getEnabled()});
this._blocker.setAppearance("scrollbar-blocker");
this.add(this._blocker);
this.setMaximum(0);
},
statics:{EVENT_DELAY:250},
properties:{value:{check:"Number",
init:0,
apply:"_applyValue",
event:"changeValue",
transform:"_checkValue"},
maximum:{check:"Integer",
apply:"_applyMaximum"},
mergeEvents:{check:"Boolean",
init:false}},
members:{_checkValue:function(value){var innerSize=!this.getElement()?0:(this._horizontal?this.getInnerWidth():this.getInnerHeight());
return Math.max(0,
Math.min(this.getMaximum()-innerSize,
value));
},
_applyValue:function(value,
old){if(!this._internalValueChange&&this._isCreated){this._positionKnob(value);
}},
_applyMaximum:function(value,
old){if(this._horizontal){this._scrollContent.setWidth(value);
}else{this._scrollContent.setHeight(value);
}this.setValue(this._checkValue(this.getValue()));
},
_applyVisibility:function(value,
old){if(!value){this._positionKnob(0);
}else{this._positionKnob(this.getValue());
}return this.base(arguments,
value,
old);
},
_computePreferredInnerWidth:function(){return this._horizontal?0:this._getScrollBarWidth();
},
_computePreferredInnerHeight:function(){return this._horizontal?this._getScrollBarWidth():0;
},
_applyEnabled:function(isEnabled){this.base(arguments);
this._blocker.setDisplay(!this.getEnabled());
},
_getScrollBarWidth:function(){if(qx.ui.basic.ScrollBar._scrollBarWidth==null){var dummy=document.createElement("div");
dummy.style.width="100px";
dummy.style.height="100px";
dummy.style.overflow="scroll";
dummy.style.visibility="hidden";
document.body.appendChild(dummy);
qx.ui.basic.ScrollBar._scrollBarWidth=dummy.offsetWidth-dummy.clientWidth;
document.body.removeChild(dummy);
}return qx.ui.basic.ScrollBar._scrollBarWidth;
},
_onscroll:function(evt){var value=this._horizontal?this._scrollBar.getScrollLeft():this._scrollBar.getScrollTop();
if(this.getMergeEvents()){this._lastScrollEventValue=value;
window.clearTimeout(this._setValueTimerId);
var self=this;
this._setValueTimerId=window.setTimeout(function(){self._internalValueChange=true;
self.setValue(self._lastScrollEventValue);
self._internalValueChange=false;
qx.ui.core.Widget.flushGlobalQueues();
},
qx.ui.basic.ScrollBar.EVENT_DELAY);
}else{this._internalValueChange=true;
this.setValue(value);
this._internalValueChange=false;
qx.ui.core.Widget.flushGlobalQueues();
}},
_positionKnob:function(value){if(this.isCreated()){if(this._horizontal){this._scrollBar.setScrollLeft(value);
}else{this._scrollBar.setScrollTop(value);
}}},
_afterAppear:function(){this.base(arguments);
this._positionKnob(this.getValue());
}},
destruct:function(){this._disposeObjects("_scrollContent",
"_scrollBar",
"_blocker");
}});




/* ID: qx.ui.basic.ScrollArea */
qx.Class.define("qx.ui.basic.ScrollArea",
{extend:qx.ui.layout.CanvasLayout,
construct:function(){this.base(arguments);
this.__onscroll=qx.lang.Function.bindEvent(this._onscroll,
this);
},
events:{"scroll":"qx.event.type.Event"},
members:{_applyElement:function(value,
old){this.base(arguments,
value,
old);
if(value){if(qx.core.Variant.isSet("qx.client",
"mshtml")){value.attachEvent("onscroll",
this.__onscroll);
}else{value.addEventListener("scroll",
this.__onscroll,
false);
}}},
_onscroll:function(e){this.createDispatchEvent("scroll");
qx.event.handler.EventHandler.stopDomEvent(e);
}},
destruct:function(){var el=this.getElement();
if(el){if(qx.core.Variant.isSet("qx.client",
"mshtml")){el.detachEvent("onscroll",
this.__onscroll);
}else{el.removeEventListener("scroll",
this.__onscroll,
false);
}delete this.__onscroll;
}}});




/* ID: qx.ui.table.pane.FocusIndicator */
qx.Class.define("qx.ui.table.pane.FocusIndicator",
{extend:qx.ui.layout.HorizontalBoxLayout,
construct:function(scroller){this.base(arguments);
this._scroller=scroller;
this.setStyleProperty("fontSize",
"0px");
this.setStyleProperty("lineHeight",
"0px");
this.setAnonymous(true);
this.hide();
},
properties:{appearance:{refine:true,
init:"table-focus-indicator"},
row:{check:"Integer"},
column:{check:"Integer"}},
members:{moveToCell:function(col,
row){if(col==null){this.hide();
this.setRow(-1);
this.setColumn(-1);
}else{var xPos=this._scroller.getTablePaneModel().getX(col);
if(xPos==-1){this.hide();
this.setRow(-1);
this.setColumn(-1);
}else{var table=this._scroller.getTable();
var columnModel=table.getTableColumnModel();
var paneModel=this._scroller.getTablePaneModel();
var firstRow=this._scroller.getTablePane().getFirstVisibleRow();
var rowHeight=table.getRowHeight();
this.setHeight(rowHeight+3);
this.setWidth(columnModel.getColumnWidth(col)+3);
this.setTop((row-firstRow)*rowHeight-2);
this.setLeft(paneModel.getColumnLeft(col)-2);
this.show();
this.setRow(row);
this.setColumn(col);
}}}}});




/* ID: qx.ui.table.pane.CellEvent */
qx.Class.define("qx.ui.table.pane.CellEvent",
{extend:qx.event.type.MouseEvent,
construct:function(scroller,
type,
me){this.base(arguments,
type,
me.getDomEvent(),
me.getDomTarget(),
me.getTarget(),
me.getOriginalTarget(),
me.getRelatedTarget());
this._scroller=scroller;
},
properties:{row:{_fast:true,
readOnly:true},
column:{_fast:true,
readOnly:true}},
members:{_computeRow:function(){if(this._row==null){this._row=this._scroller._getRowForPagePos(this.getPageX(),
this.getPageY());
}return this._row;
},
_computeColumn:function(){if(this._column==null){this._column=this._scroller._getColumnForPageX(this.getPageX());
}return this._column;
}}});




/* ID: qx.ui.table.pane.Model */
qx.Class.define("qx.ui.table.pane.Model",
{extend:qx.core.Target,
construct:function(tableColumnModel){this.base(arguments);
tableColumnModel.addEventListener("visibilityChangedPre",
this._onColVisibilityChanged,
this);
this._tableColumnModel=tableColumnModel;
},
events:{"modelChanged":"qx.event.type.Event"},
statics:{EVENT_TYPE_MODEL_CHANGED:"modelChanged"},
properties:{firstColumnX:{check:"Integer",
init:0,
apply:"_applyFirstColumnX"},
maxColumnCount:{check:"Number",
init:-1,
apply:"_applyMaxColumnCount"}},
members:{_applyFirstColumnX:function(value,
old){this._columnCount=null;
this.createDispatchEvent(qx.ui.table.pane.Model.EVENT_TYPE_MODEL_CHANGED);
},
_applyMaxColumnCount:function(value,
old){this._columnCount=null;
this.createDispatchEvent(qx.ui.table.pane.Model.EVENT_TYPE_MODEL_CHANGED);
},
_onColVisibilityChanged:function(evt){this._columnCount=null;
this.createDispatchEvent(qx.ui.table.pane.Model.EVENT_TYPE_MODEL_CHANGED);
},
getColumnCount:function(){if(this._columnCount==null){var firstX=this.getFirstColumnX();
var maxColCount=this.getMaxColumnCount();
var totalColCount=this._tableColumnModel.getVisibleColumnCount();
if(maxColCount==-1||(firstX+maxColCount)>totalColCount){this._columnCount=totalColCount-firstX;
}else{this._columnCount=maxColCount;
}}return this._columnCount;
},
getColumnAtX:function(xPos){var firstX=this.getFirstColumnX();
return this._tableColumnModel.getVisibleColumnAtX(firstX+xPos);
},
getX:function(col){var firstX=this.getFirstColumnX();
var maxColCount=this.getMaxColumnCount();
var x=this._tableColumnModel.getVisibleX(col)-firstX;
if(x>=0&&(maxColCount==-1||x<maxColCount)){return x;
}else{return -1;
}},
getColumnLeft:function(col){var left=0;
var colCount=this.getColumnCount();
for(var x=0;x<colCount;x++){var currCol=this.getColumnAtX(x);
if(currCol==col){return left;
}left+=this._tableColumnModel.getColumnWidth(currCol);
}return -1;
},
getTotalWidth:function(){var totalWidth=0;
var colCount=this.getColumnCount();
for(var x=0;x<colCount;x++){var col=this.getColumnAtX(x);
totalWidth+=this._tableColumnModel.getColumnWidth(col);
}return totalWidth;
}},
destruct:function(){this._disposeObjects("_tableColumnModel");
}});




/* ID: qx.ui.table.ITableModel */
qx.Interface.define("qx.ui.table.ITableModel",
{events:{"dataChanged":"qx.event.type.DataEvent",
"metaDataChanged":"qx.event.type.DataEvent"},
statics:{EVENT_TYPE_DATA_CHANGED:"dataChanged",
EVENT_TYPE_META_DATA_CHANGED:"metaDataChanged"},
members:{getRowCount:function(){return true;
},
getRowData:function(rowIndex){return true;
},
getColumnCount:function(){return true;
},
getColumnId:function(columnIndex){return true;
},
getColumnIndexById:function(columnId){return true;
},
getColumnName:function(columnIndex){return true;
},
isColumnEditable:function(columnIndex){return true;
},
isColumnSortable:function(columnIndex){return true;
},
sortByColumn:function(columnIndex,
ascending){return true;
},
getSortColumnIndex:function(){return true;
},
isSortAscending:function(){return true;
},
prefetchRows:function(firstRowIndex,
lastRowIndex){return true;
},
getValue:function(columnIndex,
rowIndex){return true;
},
getValueById:function(columnId,
rowIndex){return true;
},
setValue:function(columnIndex,
rowIndex,
value){return true;
},
setValueById:function(columnId,
rowIndex,
value){return true;
}}});




/* ID: qx.ui.menu.CheckBox */
qx.Class.define("qx.ui.menu.CheckBox",
{extend:qx.ui.menu.Button,
construct:function(vLabel,
vCommand,
vChecked){this.base(arguments,
vLabel,
null,
vCommand);
if(vChecked!=null){this.setChecked(vChecked);
}},
properties:{appearance:{refine:true,
init:"menu-check-box"},
name:{check:"String"},
value:{check:"String",
event:"changeValue"},
checked:{check:"Boolean",
init:false,
apply:"_applyChecked"}},
members:{_applyChecked:function(value,
old){value===true?this.addState("checked"):this.removeState("checked");
},
execute:function(){this._processExecute();
this.base(arguments);
},
_processExecute:function(){this.toggleChecked();
}}});




/* ID: qx.ui.treevirtual.TreeVirtual */
qx.Class.define("qx.ui.treevirtual.TreeVirtual",
{extend:qx.ui.table.Table,
construct:function(headings,
custom){if(!custom){custom={};
}
if(!custom.dataModel){custom.dataModel=new qx.ui.treevirtual.SimpleTreeDataModel();
}
if(custom.treeColumn===undefined){custom.treeColumn=0;
custom.dataModel.setTreeColumn(custom.treeColumn);
}
if(!custom.treeDataCellRenderer){custom.treeDataCellRenderer=new qx.ui.treevirtual.SimpleTreeDataCellRenderer();
}
if(!custom.defaultDataCellRenderer){custom.defaultDataCellRenderer=new qx.ui.treevirtual.DefaultDataCellRenderer();
}
if(!custom.dataRowRenderer){custom.dataRowRenderer=new qx.ui.treevirtual.SimpleTreeDataRowRenderer();
}
if(!custom.selectionManager){custom.selectionManager=function(obj){return new qx.ui.treevirtual.SelectionManager(obj);
};
}
if(!custom.tableColumnModel){custom.tableColumnModel=function(obj){return new qx.ui.table.columnmodel.Resize(obj);
};
}if(typeof (headings)=="string"){headings=[headings];
}custom.dataModel.setColumns(headings);
custom.dataModel.setTreeColumn(custom.treeColumn);
custom.dataModel.setTree(this);
this.base(arguments,
custom.dataModel,
custom);
this.setColumnVisibilityButtonVisible(headings.length>1);
this.setRowHeight(16);
this.setMetaColumnCounts(headings.length>1?[1,
-1]:[1]);
this.setOverflow("hidden");
var stdcr=custom.treeDataCellRenderer;
var ddcr=custom.defaultDataCellRenderer;
var tcm=this.getTableColumnModel();
var treeCol=this.getTableModel().getTreeColumn();
for(var i=0;i<headings.length;i++){tcm.setDataCellRenderer(i,
i==treeCol?stdcr:ddcr);
}this.setDataRowRenderer(custom.dataRowRenderer);
this.setAlwaysUpdateCells(true);
this.setFocusCellOnMouseMove(true);
var lightblue="rgb("+qx.util.ExtendedColor.toRgb("lightblue")+")";
this.setCellFocusAttributes({backgroundColor:lightblue});
var scrollers=this._getPaneScrollerArr();
for(var i=0;i<scrollers.length;i++){scrollers[i]._focusIndicator.setAppearance("treevirtual-focus-indicator");
scrollers[i].setSelectBeforeFocus(true);
}},
events:{"treeOpenWithContent":"qx.event.type.DataEvent",
"treeOpenWhileEmpty":"qx.event.type.DataEvent",
"treeClose":"qx.event.type.DataEvent",
"changeSelection":"qx.event.type.DataEvent"},
statics:{SelectionMode:{NONE:qx.ui.table.selection.Model.NO_SELECTION,
SINGLE:qx.ui.table.selection.Model.SINGLE_SELECTION,
SINGLE_INTERVAL:qx.ui.table.selection.Model.SINGLE_INTERVAL_SELECTION,
MULTIPLE_INTERVAL:qx.ui.table.selection.Model.MULTIPLE_INTERVAL_SELECTION,
MULTIPLE_INTERVAL_TOGGLE:qx.ui.table.selection.Model.MULTIPLE_INTERVAL_SELECTION_TOGGLE}},
properties:{openCloseClickSelectsRow:{check:"Boolean",
init:false}},
members:{getDataModel:function(){return this.getTableModel();
},
setUseTreeLines:function(b){var stdcm=this.getTableModel();
var treeCol=stdcm.getTreeColumn();
var dcr=this.getTableColumnModel().getDataCellRenderer(treeCol);
dcr.setUseTreeLines(b);
if(stdcm.hasEventListeners("dataChanged")){var data={firstRow:0,
lastRow:stdcm._rowArr.length-1,
firstColumn:0,
lastColumn:stdcm.getColumnCount()-1};
stdcm.dispatchEvent(new qx.event.type.DataEvent("dataChanged",
data),
true);
}},
getUseTreeLines:function(){var treeCol=this.getTableModel().getTreeColumn();
var dcr=this.getTableColumnModel().getDataCellRenderer(treeCol);
return dcr.getUseTreeLines();
},
setAlwaysShowOpenCloseSymbol:function(b){var stdcm=this.getTableModel();
var treeCol=stdcm.getTreeColumn();
var dcr=this.getTableColumnModel().getDataCellRenderer(treeCol);
dcr.setAlwaysShowOpenCloseSymbol(b);
if(stdcm.hasEventListeners("dataChanged")){var data={firstRow:0,
lastRow:stdcm._rowArr.length-1,
firstColumn:0,
lastColumn:stdcm.getColumnCount()-1};
stdcm.dispatchEvent(new qx.event.type.DataEvent("dataChanged",
data),
true);
}},
setExcludeFirstLevelTreeLines:function(b){var stdcm=this.getTableModel();
var treeCol=stdcm.getTreeColumn();
var dcr=this.getTableColumnModel().getDataCellRenderer(treeCol);
dcr.setExcludeFirstLevelTreeLines(b);
if(stdcm.hasEventListeners("dataChanged")){var data={firstRow:0,
lastRow:stdcm._rowArr.length-1,
firstColumn:0,
lastColumn:stdcm.getColumnCount()-1};
stdcm.dispatchEvent(new qx.event.type.DataEvent("dataChanged",
data),
true);
}},
getExcludeFirstLevelTreeLines:function(){var treeCol=this.getTableModel().getTreeColumn();
var dcr=this.getTableColumnModel().getDataCellRenderer(treeCol);
return dcr.getExcludeFirstLevelTreeLines();
},
getAlwaysShowOpenCloseSymbol:function(){var treeCol=this.getTableModel().getTreeColumn();
var dcr=this.getTableColumnModel().getDataCellRenderer(treeCol);
return dcr.getAlwaysShowOpenCloseSymbol();
},
setSelectionMode:function(mode){this.getSelectionModel().setSelectionMode(mode);
},
getSelectionMode:function(mode){return this.getSelectionModel().getSelectionMode();
},
setCellFocusAttributes:function(attributes){if(!attributes.opacity){attributes.opacity=0.2;
}var scrollers=this._getPaneScrollerArr();
for(var i=0;i<scrollers.length;i++){scrollers[i]._focusIndicator.set(attributes);
}},
getHierarchy:function(nodeReference){var _this=this;
var components=[];
var nodeId,
node;
if(typeof (nodeReference)=="object"){node=nodeReference;
nodeId=node.nodeId;
}else if(typeof (nodeReference)=="number"){nodeId=nodeReference;
}else{throw new Error("Expected node object or node id");
}function addHierarchy(nodeId){if(!nodeId){return ;
}var node=_this.getTableModel().getData()[nodeId];
components.unshift(node.label);
addHierarchy(node.parentNodeId);
}addHierarchy(nodeId);
return components;
},
getSelectedNodes:function(){return this.getTableModel().getSelectedNodes();
},
_onkeydown:function(evt){if(!this.getEnabled()){return;
}var identifier=evt.getKeyIdentifier();
var consumed=false;
var modifiers=evt.getModifiers();
if(modifiers==0){switch(identifier){case "Enter":var dm=this.getTableModel();
var focusedCol=this.getFocusedColumn();
var treeCol=dm.getTreeColumn();
if(focusedCol==treeCol){var focusedRow=this.getFocusedRow();
var node=dm.getValue(treeCol,
focusedRow);
if(!node.bHideOpenClose){dm.setState(node,
{bOpened:!node.bOpened});
}consumed=true;
}break;
case "Left":this.moveFocusedCell(-1,
0);
break;
case "Right":this.moveFocusedCell(1,
0);
break;
}}else if(modifiers==qx.event.type.DomEvent.CTRL_MASK){switch(identifier){case "Left":var dm=this.getTableModel();
var focusedRow=this.getFocusedRow();
var treeCol=dm.getTreeColumn();
var node=dm.getValue(treeCol,
focusedRow);
if((node.type==qx.ui.treevirtual.SimpleTreeDataModel.Type.BRANCH)&&!node.bHideOpenClose&&node.bOpened){dm.setState(node,
{bOpened:!node.bOpened});
}this.setFocusedCell(treeCol,
focusedRow,
true);
consumed=true;
break;
case "Right":var dm=this.getTableModel();
var focusedRow=this.getFocusedRow();
var treeCol=dm.getTreeColumn();
var node=dm.getValue(treeCol,
focusedRow);
if((node.type==qx.ui.treevirtual.SimpleTreeDataModel.Type.BRANCH)&&!node.bHideOpenClose&&!node.bOpened){dm.setState(node,
{bOpened:!node.bOpened});
}this.setFocusedCell(treeCol,
focusedRow,
true);
consumed=true;
break;
}}else if(modifiers==qx.event.type.DomEvent.SHIFT_MASK){switch(identifier){case "Left":var dm=this.getTableModel();
var focusedRow=this.getFocusedRow();
var treeCol=dm.getTreeColumn();
var node=dm.getValue(treeCol,
focusedRow);
if(node.parentNodeId){var rowIndex=dm.getRowFromNode(node.parentNodeId);
this.setFocusedCell(this._focusedCol,
rowIndex,
true);
}consumed=true;
break;
case "Right":var dm=this.getTableModel();
var focusedRow=this.getFocusedRow();
var treeCol=dm.getTreeColumn();
var node=dm.getValue(treeCol,
focusedRow);
if((node.type==qx.ui.treevirtual.SimpleTreeDataModel.Type.BRANCH)&&!node.bHideOpenClose){if(!node.bOpened){dm.setState(node,
{bOpened:!node.bOpened});
}if(node.children.length>0){this.moveFocusedCell(0,
1);
}}consumed=true;
break;
}}if(consumed){evt.preventDefault();
evt.stopPropagation();
}else{this.base(arguments,
evt);
}},
_onkeypress:function(evt){if(!this.getEnabled()){return;
}var consumed=false;
var identifier=evt.getKeyIdentifier();
switch(identifier){case "Left":case "Right":consumed=true;
break;
}
if(consumed){evt.preventDefault();
evt.stopPropagation();
}else{this.base(arguments,
evt);
}},
_onSelectionChanged:function(evt){this.getTableModel()._clearSelections();
if(this.getSelectionMode()!=qx.ui.treevirtual.TreeVirtual.SelectionMode.NONE){var selectedNodes=this._calculateSelectedNodes();
this.createDispatchDataEvent("changeSelection",
selectedNodes);
}this.base(arguments,
evt);
},
_calculateSelectedNodes:function(){var stdcm=this.getTableModel();
var selectedRanges=this.getSelectionModel().getSelectedRanges();
var selectedNodes=[];
var node;
for(var i=0;i<selectedRanges.length;i++){for(var j=selectedRanges[i].minIndex;j<=selectedRanges[i].maxIndex;j++){node=stdcm.getValue(stdcm.getTreeColumn(),
j);
stdcm.setState(node,
{bSelected:true});
selectedNodes.push(node);
}}return selectedNodes;
},
setOverflow:function(s){if(s!="hidden"){throw new Error("Tree overflow must be hidden.  "+"The internal elements of it will scroll.");
}},
setState:function(nodeReference,
attributes){qx.log.Logger.deprecatedMethodWarning(arguments.callee,
"Replace with nodeSetState() in mixin MNode");
},
toggleOpened:function(nodeReference){qx.log.Logger.deprecatedMethodWarning(arguments.callee,
"Replace with nodeToggleOpened() or consider using "+"new method nodeSetOpened(), both in mixin "+"MNode.");
},
getFirstChild:function(nodeReference){qx.log.Logger.deprecatedMethodWarning(arguments.callee,
"Replace with familyGetFirstChild in mixin MFamily");
},
getLastChild:function(nodeReference){throw new Error("getLastChild is deprecated. "+"Replace with familyGetLastChild in mixin MFamily");
},
getNextSibling:function(nodeReference){qx.log.Logger.deprecatedMethodWarning(arguments.callee,
"Replace with familyGetNextSibling in mixin MFamily");
},
getPrevSibling:function(nodeReference){qx.log.Logger.deprecatedMethodWarning(arguments.callee,
"Replace with familyGetPrevSibling in mixin MFamily");
}}});




/* ID: qx.ui.table.model.Abstract */
qx.Class.define("qx.ui.table.model.Abstract",
{type:"abstract",
extend:qx.core.Target,
implement:qx.ui.table.ITableModel,
events:{"dataChanged":"qx.event.type.DataEvent",
"metaDataChanged":"qx.event.type.DataEvent"},
construct:function(){this.base(arguments);
this._columnIdArr=[];
this._columnNameArr=[];
this._columnIndexMap={};
},
members:{getRowCount:function(){throw new Error("getRowCount is abstract");
},
getRowData:function(rowIndex){return null;
},
isColumnEditable:function(columnIndex){return false;
},
isColumnSortable:function(columnIndex){return false;
},
sortByColumn:function(columnIndex,
ascending){},
getSortColumnIndex:function(){return -1;
},
isSortAscending:function(){return true;
},
prefetchRows:function(firstRowIndex,
lastRowIndex){},
getValue:function(columnIndex,
rowIndex){throw new Error("getValue is abstract");
},
getValueById:function(columnId,
rowIndex){return this.getValue(this.getColumnIndexById(columnId),
rowIndex);
},
setValue:function(columnIndex,
rowIndex,
value){throw new Error("setValue is abstract");
},
setValueById:function(columnId,
rowIndex,
value){return this.setValue(this.getColumnIndexById(columnId),
rowIndex,
value);
},
getColumnCount:function(){return this._columnIdArr.length;
},
getColumnIndexById:function(columnId){return this._columnIndexMap[columnId];
},
getColumnId:function(columnIndex){return this._columnIdArr[columnIndex];
},
getColumnName:function(columnIndex){return this._columnNameArr[columnIndex];
},
setColumnIds:function(columnIdArr){this._columnIdArr=columnIdArr;
this._columnIndexMap={};
for(var i=0;i<columnIdArr.length;i++){this._columnIndexMap[columnIdArr[i]]=i;
}this._columnNameArr=new Array(columnIdArr.length);
if(!this._internalChange){this.createDispatchEvent(qx.ui.table.ITableModel.EVENT_TYPE_META_DATA_CHANGED);
}},
setColumnNamesByIndex:function(columnNameArr){if(this._columnIdArr.length!=columnNameArr.length){throw new Error("this._columnIdArr and columnNameArr have different length: "+this._columnIdArr.length+" != "+columnNameArr.length);
}this._columnNameArr=columnNameArr;
this.createDispatchEvent(qx.ui.table.ITableModel.EVENT_TYPE_META_DATA_CHANGED);
},
setColumnNamesById:function(columnNameMap){this._columnNameArr=new Array(this._columnIdArr.length);
for(var i=0;i<this._columnIdArr.length;++i){this._columnNameArr[i]=columnNameMap[this._columnIdArr[i]];
}},
setColumns:function(columnNameArr,
columnIdArr){if(columnIdArr==null){columnIdArr=columnNameArr;
}
if(columnIdArr.length!=columnNameArr.length){throw new Error("columnIdArr and columnNameArr have different length: "+columnIdArr.length+" != "+columnNameArr.length);
}this._internalChange=true;
this.setColumnIds(columnIdArr);
this._internalChange=false;
this.setColumnNamesByIndex(columnNameArr);
}},
destruct:function(){this._disposeFields("_columnIdArr",
"_columnNameArr",
"_columnIndexMap");
}});




/* ID: qx.ui.table.model.Simple */
qx.Class.define("qx.ui.table.model.Simple",
{extend:qx.ui.table.model.Abstract,
construct:function(){this.base(arguments);
this._rowArr=[];
this._sortColumnIndex=-1;
this._sortAscending;
this._sortMethods=[];
this._editableColArr=null;
},
properties:{caseSensitiveSorting:{check:"Boolean",
init:true}},
statics:{_defaultSortComparatorAscending:function(row1,
row2){var obj1=row1[arguments.callee.columnIndex];
var obj2=row2[arguments.callee.columnIndex];
return (obj1>obj2)?1:((obj1==obj2)?0:-1);
},
_defaultSortComparatorInsensitiveAscending:function(row1,
row2){var obj1=(isNaN(row1[arguments.callee.columnIndex])?row1[arguments.callee.columnIndex].toLowerCase():row1[arguments.callee.columnIndex]);
var obj2=(isNaN(row2[arguments.callee.columnIndex])?row2[arguments.callee.columnIndex].toLowerCase():row2[arguments.callee.columnIndex]);
return (obj1>obj2)?1:((obj1==obj2)?0:-1);
},
_defaultSortComparatorDescending:function(row1,
row2){var obj1=row1[arguments.callee.columnIndex];
var obj2=row2[arguments.callee.columnIndex];
return (obj1<obj2)?1:((obj1==obj2)?0:-1);
},
_defaultSortComparatorInsensitiveDescending:function(row1,
row2){var obj1=(isNaN(row1[arguments.callee.columnIndex])?row1[arguments.callee.columnIndex].toLowerCase():row1[arguments.callee.columnIndex]);
var obj2=(isNaN(row2[arguments.callee.columnIndex])?row2[arguments.callee.columnIndex].toLowerCase():row2[arguments.callee.columnIndex]);
return (obj1<obj2)?1:((obj1==obj2)?0:-1);
}},
members:{getRowData:function(rowIndex){var rowData=this._rowArr[rowIndex];
if(rowData==null||rowData.originalData==null){return rowData;
}else{return rowData.originalData;
}},
getRowDataAsMap:function(rowIndex){var columnArr=this._rowArr[rowIndex];
var map={};
for(var col=0;col<this.getColumnCount();col++){map[this.getColumnId(col)]=columnArr[col];
}return map;
},
setEditable:function(editable){this._editableColArr=[];
for(var col=0;col<this.getColumnCount();col++){this._editableColArr[col]=editable;
}this.createDispatchEvent(qx.ui.table.ITableModel.EVENT_TYPE_META_DATA_CHANGED);
},
setColumnEditable:function(columnIndex,
editable){if(editable!=this.isColumnEditable(columnIndex)){if(this._editableColArr==null){this._editableColArr=[];
}this._editableColArr[columnIndex]=editable;
this.createDispatchEvent(qx.ui.table.ITableModel.EVENT_TYPE_META_DATA_CHANGED);
}},
isColumnEditable:function(columnIndex){return this._editableColArr?(this._editableColArr[columnIndex]==true):false;
},
setColumnSortable:function(columnIndex,
sortable){if(sortable!=this.isColumnSortable(columnIndex)){if(this._sortableColArr==null){this._sortableColArr=[];
}this._sortableColArr[columnIndex]=sortable;
this.createDispatchEvent(qx.ui.table.ITableModel.EVENT_TYPE_META_DATA_CHANGED);
}},
isColumnSortable:function(columnIndex){return this._sortableColArr?(this._sortableColArr[columnIndex]==true):true;
},
sortByColumn:function(columnIndex,
ascending){var comparator;
var sortMethods=this._sortMethods[columnIndex];
if(sortMethods){comparator=(ascending?sortMethods.ascending:sortMethods.descending);
}else{if(this.getCaseSensitiveSorting()){comparator=(ascending?qx.ui.table.model.Simple._defaultSortComparatorAscending:qx.ui.table.model.Simple._defaultSortComparatorDescending);
}else{comparator=(ascending?qx.ui.table.model.Simple._defaultSortComparatorInsensitiveAscending:qx.ui.table.model.Simple._defaultSortComparatorInsensitiveDescending);
}}comparator.columnIndex=columnIndex;
this._rowArr.sort(comparator);
this._sortColumnIndex=columnIndex;
this._sortAscending=ascending;
this.createDispatchEvent(qx.ui.table.ITableModel.EVENT_TYPE_META_DATA_CHANGED);
},
setSortMethods:function(columnIndex,
methods){this._sortMethods[columnIndex]=methods;
},
_clearSorting:function(){if(this._sortColumnIndex!=-1){this._sortColumnIndex=-1;
this._sortAscending=true;
this.createDispatchEvent(qx.ui.table.ITableModel.EVENT_TYPE_META_DATA_CHANGED);
}},
getSortColumnIndex:function(){return this._sortColumnIndex;
},
isSortAscending:function(){return this._sortAscending;
},
getRowCount:function(){return this._rowArr.length;
},
getValue:function(columnIndex,
rowIndex){if(rowIndex<0||rowIndex>=this._rowArr.length){throw new Error("this._rowArr out of bounds: "+rowIndex+" (0.."+this._rowArr.length+")");
}return this._rowArr[rowIndex][columnIndex];
},
setValue:function(columnIndex,
rowIndex,
value){if(this._rowArr[rowIndex][columnIndex]!=value){this._rowArr[rowIndex][columnIndex]=value;
if(this.hasEventListeners(qx.ui.table.ITableModel.EVENT_TYPE_DATA_CHANGED)){var data={firstRow:rowIndex,
lastRow:rowIndex,
firstColumn:columnIndex,
lastColumn:columnIndex};
this.createDispatchDataEvent(qx.ui.table.ITableModel.EVENT_TYPE_DATA_CHANGED,
data);
}
if(columnIndex==this._sortColumnIndex){this._clearSorting();
}}},
setData:function(rowArr,
clearSorting){this._rowArr=rowArr;
if(this.hasEventListeners(qx.ui.table.ITableModel.EVENT_TYPE_DATA_CHANGED)){this.createDispatchEvent(qx.ui.table.ITableModel.EVENT_TYPE_DATA_CHANGED);
}
if(clearSorting){this._clearSorting();
}},
getData:function(){return this._rowArr;
},
setDataAsMapArray:function(mapArr,
rememberMaps,
clearSorting){this.setData(this._mapArray2RowArr(mapArr,
rememberMaps),
clearSorting);
},
addRows:function(rowArr,
startIndex){if(startIndex==null){startIndex=this._rowArr.length;
}rowArr.splice(0,
0,
startIndex,
0);
Array.prototype.splice.apply(this._rowArr,
rowArr);
var data={firstRow:startIndex,
lastRow:this._rowArr.length-1,
firstColumn:0,
lastColumn:this.getColumnCount()-1};
this.createDispatchDataEvent(qx.ui.table.ITableModel.EVENT_TYPE_DATA_CHANGED,
data);
this._clearSorting();
},
addRowsAsMapArray:function(mapArr,
startIndex,
rememberMaps){this.addRows(this._mapArray2RowArr(mapArr,
rememberMaps),
startIndex);
},
removeRows:function(startIndex,
howMany){this._rowArr.splice(startIndex,
howMany);
var data={firstRow:startIndex,
lastRow:this._rowArr.length-1,
firstColumn:0,
lastColumn:this.getColumnCount()-1};
this.createDispatchDataEvent(qx.ui.table.ITableModel.EVENT_TYPE_DATA_CHANGED,
data);
this._clearSorting();
},
_mapArray2RowArr:function(mapArr,
rememberMaps){var rowCount=mapArr.length;
var columnCount=this.getColumnCount();
var dataArr=new Array(rowCount);
var columnArr;
var j;
for(var i=0;i<rowCount;++i){columnArr=[];
if(rememberMaps){columnArr.originalData=mapArr[i];
}
for(var j=0;j<columnCount;++j){columnArr[j]=mapArr[i][this.getColumnId(j)];
}dataArr[i]=columnArr;
}return dataArr;
}},
destruct:function(){this._disposeFields("_rowArr",
"_editableColArr",
"_sortMethods");
}});




/* ID: qx.ui.treevirtual.SimpleTreeDataModel */
qx.Class.define("qx.ui.treevirtual.SimpleTreeDataModel",
{extend:qx.ui.table.model.Simple,
construct:function(){this.base(arguments);
this._rowArr=[];
this._nodeArr=[];
this._nodeRowMap=[];
this._treeColumn=0;
this._selections={};
this._nodeArr.push(this.self(arguments).__getEmptyTree());
},
statics:{__tree:null,
__getEmptyTree:function(){return {label:"<virtual root>",
nodeId:0,
bOpened:true,
children:[]};
},
Type:{LEAF:1,
BRANCH:2}},
members:{setTree:function(tree){this.__tree=tree;
},
getTree:function(){return this.__tree;
},
setColumnEditable:function(columnIndex,
editable){this.base(arguments,
columnIndex,
editable);
},
isColumnSortable:function(columnIndex){return false;
},
sortByColumn:function(columnIndex,
ascending){throw new Error("Trees can not be sorted by column");
},
getSortColumnIndex:function(){return -1;
},
setTreeColumn:function(columnIndex){this._treeColumn=columnIndex;
},
getTreeColumn:function(){return this._treeColumn;
},
getRowCount:function(){return this._rowArr.length;
},
getRowData:function(rowIndex){return this._rowArr[rowIndex];
},
getValue:function(columnIndex,
rowIndex){if(rowIndex<0||rowIndex>=this._rowArr.length){throw new Error("this._rowArr row "+"("+rowIndex+") out of bounds: "+this._rowArr+" (0.."+(this._rowArr.length-1)+")");
}
if(columnIndex<0||columnIndex>=this._rowArr[rowIndex].length){throw new Error("this._rowArr column "+"("+columnIndex+") out of bounds: "+this._rowArr[rowIndex]+" (0.."+(this._rowArr[rowIndex].length-1)+")");
}return this._rowArr[rowIndex][columnIndex];
},
setValue:function(columnIndex,
rowIndex,
value){if(columnIndex==this._treeColumn){return ;
}var node=this.getNodeFromRow(rowIndex);
if(node.columnData[columnIndex]!=value){node.columnData[columnIndex]=value;
this.setData();
if(this.hasEventListeners("dataChanged")){var data={firstRow:node.nodeId,
lastRow:node.nodeId,
firstColumn:columnIndex,
lastColumn:columnIndex};
this.dispatchEvent(new qx.event.type.DataEvent("dataChanged",
data),
true);
}}},
_addNode:function(parentNodeId,
label,
bOpened,
bHideOpenCloseButton,
type,
icon,
iconSelected){var parentNode;
if(parentNodeId){parentNode=this._nodeArr[parentNodeId];
if(!parentNode){throw new Error("Request to add a child to a non-existent parent");
}if(parentNode.type==qx.ui.treevirtual.SimpleTreeDataModel.Type.LEAF){throw new Error("Sorry, a LEAF may not have children.");
}}else{parentNode=this._nodeArr[0];
parentNodeId=0;
}if(type==qx.ui.treevirtual.SimpleTreeDataModel.Type.LEAF){bOpened=false;
bHideOpenCloseButton=false;
}var nodeId=this._nodeArr.length;
var node={type:type,
nodeId:nodeId,
parentNodeId:parentNodeId,
label:label,
bSelected:false,
bOpened:bOpened,
bHideOpenClose:bHideOpenCloseButton,
icon:icon,
iconSelected:iconSelected,
children:[],
columnData:[]};
this._nodeArr.push(node);
parentNode.children.push(nodeId);
return nodeId;
},
addBranch:function(parentNodeId,
label,
bOpened,
bHideOpenCloseButton,
icon,
iconSelected){return this._addNode(parentNodeId,
label,
bOpened,
bHideOpenCloseButton,
qx.ui.treevirtual.SimpleTreeDataModel.Type.BRANCH,
icon,
iconSelected);
},
addLeaf:function(parentNodeId,
label,
icon,
iconSelected){return this._addNode(parentNodeId,
label,
false,
false,
qx.ui.treevirtual.SimpleTreeDataModel.Type.LEAF,
icon,
iconSelected);
},
prune:function(nodeReference,
bSelfAlso){var nodeId;
if(typeof (nodeReference)=="object"){node=nodeReference;
nodeId=node.nodeId;
}else if(typeof (nodeReference)=="number"){nodeId=nodeReference;
}else{throw new Error("Expected node object or node id");
}for(var i=this._nodeArr[nodeId].children.length-1;i>=0;i--){this.prune(this._nodeArr[nodeId].children[i],
true);
}if(bSelfAlso&&nodeId!=0){var node=this._nodeArr[nodeId];
qx.lang.Array.remove(this._nodeArr[node.parentNodeId].children,
nodeId);
if(this._selections[nodeId]){delete this._selections[nodeId];
}this._nodeArr[nodeId]=null;
}},
setData:function(nodeArr){var _this=this;
function render(){var inorder=function(nodeId,
level){var child=null;
var childNodeId;
var numChildren=_this._nodeArr[nodeId].children.length;
for(var i=0;i<numChildren;i++){childNodeId=_this._nodeArr[nodeId].children[i];
child=_this._nodeArr[childNodeId];
if(child==null){continue;
}child.level=level;
child.bFirstChild=(i==0);
child.lastChild=[i==numChildren-1];
var parent=_this._nodeArr[child.parentNodeId];
while(parent.nodeId){var bLast=parent.lastChild[parent.lastChild.length-1];
child.lastChild.unshift(bLast);
parent=_this._nodeArr[parent.parentNodeId];
}if(!child.columnData){child.columnData=[];
}
if(child.columnData.length<_this.getColumnCount()){child.columnData[_this.getColumnCount()-1]=null;
}var rowData=[];
if(child.columnData){for(var j=0;j<child.columnData.length;j++){if(j==_this._treeColumn){rowData.push(child);
}else{rowData.push(child.columnData[j]);
}}}else{rowData.push(child);
}if(child.bSelected){rowData.selected=true;
}_this._nodeRowMap[child.nodeId]=_this._rowArr.length;
_this._rowArr.push(rowData);
if(child.bOpened){inorder(childNodeId,
level+1);
}}};
_this._rowArr=[];
_this._nodeRowMap=[];
inorder(0,
1);
if(_this.hasEventListeners("dataChanged")){var data={firstRow:0,
lastRow:_this._rowArr.length-1,
firstColumn:0,
lastColumn:_this.getColumnCount()-1};
_this.dispatchEvent(new qx.event.type.DataEvent("dataChanged",
data),
true);
}}
if(nodeArr instanceof Array){for(var i=0;i<nodeArr.length;i++){if(nodeArr[i].selected){this._selections[i]=true;
}}this._nodeArr=nodeArr;
}else if(nodeArr!==null&&nodeArr!==undefined){throw new Error("Expected array of node objects or null/undefined; "+"got "+typeof (nodeArr));
}render();
},
getData:function(){return this._nodeArr;
},
clearData:function(){this._clearSelections();
this.setData([this.self(arguments).__getEmptyTree()]);
},
setColumnData:function(nodeId,
columnIndex,
data){this._nodeArr[nodeId].columnData[columnIndex]=data;
},
getColumnData:function(nodeId,
columnIndex){return this._nodeArr[nodeId].columnData[columnIndex];
},
setState:function(nodeReference,
attributes){var nodeId,
node;
if(typeof (nodeReference)=="object"){node=nodeReference;
nodeId=node.nodeId;
}else if(typeof (nodeReference)=="number"){nodeId=nodeReference;
node=this._nodeArr[nodeId];
}else{throw new Error("Expected node object or node id");
}
for(var attribute in attributes){switch(attribute){case "bSelected":if(attributes[attribute]){this._selections[nodeId]=true;
}else{delete this._selections[nodeId];
}break;
case "bOpened":if(attributes[attribute]==node.bOpened){break;
}var tree=this.__tree;
if(node.bOpened){tree.createDispatchDataEvent("treeClose",
node);
}else{if(node.children.length>0){tree.createDispatchDataEvent("treeOpenWithContent",
node);
}else{tree.createDispatchDataEvent("treeOpenWhileEmpty",
node);
}}if(!node.bHideOpenClose){node.bOpened=!node.bOpened;
tree.getSelectionModel()._clearSelection();
}this.setData();
break;
default:break;
}node[attribute]=attributes[attribute];
}},
getNodeRowMap:function(){return this._nodeRowMap;
},
getRowFromNodeId:function(nodeId){return this._nodeRowMap[nodeId];
},
getNodeFromRow:function(rowIndex){return this._nodeArr[this._rowArr[rowIndex][this._treeColumn].nodeId];
},
_clearSelections:function(){for(var selection in this._selections){this._nodeArr[selection].bSelected=false;
}this._selections={};
},
getSelectedNodes:function(){var nodes=[];
for(var nodeId in this._selections){nodes.push(this._nodeArr[nodeId]);
}return nodes;
}}});




/* ID: qx.ui.treevirtual.SimpleTreeDataCellRenderer */
qx.Class.define("qx.ui.treevirtual.SimpleTreeDataCellRenderer",
{extend:qx.ui.table.cellrenderer.Abstract,
construct:function(){this.base(arguments);
var Am=qx.io.Alias;
this.WIDGET_TREE_URI=Am.getInstance().resolve("widget/tree/");
this.STATIC_IMAGE_URI=Am.getInstance().resolve("static/image/");
var preloader=qx.io.image.PreloaderManager.getInstance();
var uri=this.WIDGET_TREE_URI;
preloader.create(uri+"line.gif");
preloader.create(uri+"minus.gif");
preloader.create(uri+"plus.gif");
preloader.create(uri+"only_minus.gif");
preloader.create(uri+"only_plus.gif");
preloader.create(uri+"start_minus.gif");
preloader.create(uri+"start_plus.gif");
preloader.create(uri+"end_minus.gif");
preloader.create(uri+"end_plus.gif");
preloader.create(uri+"cross_minus.gif");
preloader.create(uri+"cross_plus.gif");
preloader.create(uri+"end.gif");
preloader.create(uri+"cross.gif");
preloader.create(uri+"line.gif");
uri=this.STATIC_IMAGE_URI;
preloader.create(uri+"blank.gif");
},
statics:{MAIN_DIV_STYLE:';overflow:hidden;white-space:nowrap;border-right:1px solid #eeeeee;'+'padding-left:2px;padding-right:2px;cursor:default'+(qx.core.Variant.isSet("qx.client",
"mshtml")?'':';-moz-user-select:none;'),
IMG_START:'<img src="',
IMG_END:'"/>',
IMG_TITLE_START:'" title="'},
properties:{useTreeLines:{check:"Boolean",
init:true},
excludeFirstLevelTreeLines:{check:"Boolean",
init:false},
alwaysShowOpenCloseSymbol:{check:"Boolean",
init:false}},
members:{useTreeLines:function(){return this.getUseTreeLines();
},
_getCellStyle:function(cellInfo){var node=cellInfo.value;
var html=this.base(arguments,
cellInfo)+qx.ui.treevirtual.SimpleTreeDataCellRenderer.MAIN_DIV_STYLE+(node.cellStyle?node.cellStyle+";":"");
return html;
},
__addImage:function(urlAndToolTip){var Stdcr=qx.ui.treevirtual.SimpleTreeDataCellRenderer;
var html=Stdcr.IMG_START;
var Am=qx.io.Alias;
if(qx.core.Client.getInstance().isMshtml()&&/\.png$/i.test(urlAndToolTip.url)){html+=this.STATIC_IMAGE_URI+"blank.gif"+'" style="filter:'+"progid:DXImageTransform.Microsoft.AlphaImageLoader("+"  src='"+Am.getInstance().resolve(urlAndToolTip.url)+"',sizingMethod='scale')";
}else{var imageUrl=Am.getInstance().resolve(urlAndToolTip.url);
html+=imageUrl+'" style="';
}
if(urlAndToolTip.imageWidth&&urlAndToolTip.imageHeight){html+=';width:'+urlAndToolTip.imageWidth+'px'+';height:'+urlAndToolTip.imageHeight+'px';
}var tooltip=urlAndToolTip.tooltip;
if(tooltip!=null){html+=Stdcr.IMG_TITLE_START+tooltip;
}html+=Stdcr.IMG_END;
return html;
},
_addExtraContentBeforeIcon:function(cellInfo){return {html:'',
width:0};
},
_getContentHtml:function(cellInfo){var html="";
var node=cellInfo.value;
var imageUrl;
var bUseTreeLines=this.getUseTreeLines();
var bExcludeFirstLevelTreeLines=this.getExcludeFirstLevelTreeLines();
var bAlwaysShowOpenCloseSymbol=this.getAlwaysShowOpenCloseSymbol();
var pos=0;
for(var i=0;i<node.level;i++){imageUrl=this._getIndentSymbol(i,
node,
bUseTreeLines,
bAlwaysShowOpenCloseSymbol,
bExcludeFirstLevelTreeLines);
html+=this.__addImage({url:imageUrl,
imageWidth:19,
imageHeight:16});
pos+=19;
}var extra=this._addExtraContentBeforeIcon(cellInfo);
html+=extra.html;
pos+=extra.width;
imageUrl=(node.bSelected?node.iconSelected:node.icon);
if(!imageUrl){if(node.type==qx.ui.treevirtual.SimpleTreeDataModel.Type.LEAF){imageUrl=(node.bSelected?"icon/16/actions/document-open.png":"icon/16/actions/document-new.png");
}else{imageUrl=(node.bSelected?"icon/16/status/folder-open.png":"icon/16/places/folder.png");
}}html+=this.__addImage({url:imageUrl,
imageWidth:16,
imageHeight:16});
html+='<div style="position:absolute;'+'left:'+((node.level*19)+16+2+2)+'px;'+'top:0'+(node.labelStyle?";"+node.labelStyle:"")+';">'+node.label+'</div>';
return html;
},
_getIndentSymbol:function(column,
node,
bUseTreeLines,
bAlwaysShowOpenCloseSymbol,
bExcludeFirstLevelTreeLines){if(column==0&&bExcludeFirstLevelTreeLines){bUseTreeLines=false;
}if(column<node.level-1){return (bUseTreeLines&&!node.lastChild[column]?this.WIDGET_TREE_URI+"line.gif":this.STATIC_IMAGE_URI+"blank.gif");
}var bLastChild=node.lastChild[node.lastChild.length-1];
if(node.type==qx.ui.treevirtual.SimpleTreeDataModel.Type.BRANCH&&!node.bHideOpenClose){if(node.children.length>0||bAlwaysShowOpenCloseSymbol){if(!bUseTreeLines){return (node.bOpened?this.WIDGET_TREE_URI+"minus.gif":this.WIDGET_TREE_URI+"plus.gif");
}if(column==0&&node.bFirstChild){if(bLastChild){return (node.bOpened?this.WIDGET_TREE_URI+"only_minus.gif":this.WIDGET_TREE_URI+"only_plus.gif");
}else{return (node.bOpened?this.WIDGET_TREE_URI+"start_minus.gif":this.WIDGET_TREE_URI+"start_plus.gif");
}}if(bLastChild){return (node.bOpened?this.WIDGET_TREE_URI+"end_minus.gif":this.WIDGET_TREE_URI+"end_plus.gif");
}return (node.bOpened?this.WIDGET_TREE_URI+"cross_minus.gif":this.WIDGET_TREE_URI+"cross_plus.gif");
}}if(bUseTreeLines){if(node.parentNodeId==0){if(bLastChild&&node.bFirstChild){return this.STATIC_IMAGE_URI+"blank.gif";
}if(bLastChild){return this.WIDGET_TREE_URI+"end.gif";
}if(node.bFirstChild){return this.WIDGET_TREE_URI+"start.gif";
}}return (bLastChild?this.WIDGET_TREE_URI+"end.gif":this.WIDGET_TREE_URI+"cross.gif");
}return this.STATIC_IMAGE_URI+"blank.gif";
}}});




/* ID: qx.ui.treevirtual.DefaultDataCellRenderer */
qx.Class.define("qx.ui.treevirtual.DefaultDataCellRenderer",
{extend:qx.ui.table.cellrenderer.Default,
construct:function(){this.base(arguments);
},
members:{_getCellStyle:function(cellInfo){var html=this.base(arguments,
cellInfo)+qx.ui.treevirtual.SimpleTreeDataCellRenderer.MAIN_DIV_STYLE;
return html;
}}});




/* ID: qx.ui.treevirtual.SimpleTreeDataRowRenderer */
qx.Class.define("qx.ui.treevirtual.SimpleTreeDataRowRenderer",
{extend:qx.ui.table.rowrenderer.Default,
construct:function(){this.base(arguments);
},
members:{updateDataRowElement:function(rowInfo,
rowElem){var tree=rowInfo.table;
var rowData=rowInfo.rowData;
var tableModel=tree.getTableModel();
var treeCol=tableModel.getTreeColumn();
var node=rowData[treeCol];
rowInfo.selected=node.bSelected;
if(node.bSelected){var row=rowInfo.row;
tree.getSelectionModel()._addSelectionInterval(row,
row);
}this.base(arguments,
rowInfo,
rowElem);
}}});




/* ID: qx.ui.treevirtual.SelectionManager */
qx.Class.define("qx.ui.treevirtual.SelectionManager",
{extend:qx.ui.table.selection.Manager,
construct:function(table){this.base(arguments);
this._table=table;
},
members:{handleMoveKeyDown:function(index,
evt){var selectionModel=this.getSelectionModel();
switch(evt.getModifiers()){case 0:break;
case qx.event.type.DomEvent.SHIFT_MASK:var anchor=selectionModel.getAnchorSelectionIndex();
if(anchor==-1){selectionModel.setSelectionInterval(index,
index);
}else{selectionModel.setSelectionInterval(anchor,
index);
}break;
}},
_handleSelectEvent:function(index,
evt){function handleOpenCloseClick(table,
index,
evt){var treeCol=table.getTableModel().getTreeColumn();
var tableModel=table.getTableModel();
if(evt instanceof qx.event.type.MouseEvent){if(!table.getFocusCellOnMouseMove()){var scrollers=table._getPaneScrollerArr();
for(var i=0;i<scrollers.length;i++){scrollers[i]._focusCellAtPagePos(evt.getPageX(),
evt.getPageY());
}}}var node=tableModel.getValue(treeCol,
table.getFocusedRow());
if(!node){return false;
}if(evt instanceof qx.event.type.MouseEvent){var tcm=table.getTableColumnModel();
var columnPositions=tcm._getColToXPosMap();
var left=qx.bom.element.Location.getLeft(table.getElement());
for(i=0;i<columnPositions[treeCol].visX;i++){left+=tcm.getColumnWidth(columnPositions[i].visX);
}var x=evt.getClientX();
var latitude=2;
var buttonPos=left+(node.level-1)*19+2;
if(x>=buttonPos-latitude&&x<=buttonPos+19+latitude){tableModel.setState(node,
{bOpened:!node.bOpened});
return table.getOpenCloseClickSelectsRow()?false:true;
}else{return false;
}}else{var identifier=evt.getKeyIdentifier();
switch(identifier){case "Space":return false;
case "Enter":if(!node.bHideOpenClose){tableModel.setState(node,
{bOpened:!node.bOpened});
}return table.getOpenCloseClickSelectsRow()?false:true;
default:return true;
}}}var bNoSelect=handleOpenCloseClick(this._table,
index,
evt);
if(!bNoSelect){var Sm=qx.ui.table.selection.Manager;
Sm.prototype._handleSelectEvent.call(this,
index,
evt);
}}}});




/* ID: qx.ui.table.columnmodel.Resize */
qx.Class.define("qx.ui.table.columnmodel.Resize",
{extend:qx.ui.table.columnmodel.Basic,
construct:function(){this.base(arguments);
this._bInProgress=false;
this._bAppeared=false;
},
properties:{behavior:{check:"qx.ui.table.columnmodel.resizebehavior.Abstract",
init:null,
nullable:true,
apply:"_applyBehavior",
event:"changeBehavior"}},
members:{_applyBehavior:function(value,
old){if(old!=null){old.dispose();
old=null;
}this.getBehavior()._setNumColumns(this._columnDataArr.length);
},
init:function(numColumns,
table){this.base(arguments,
numColumns);
if(this.getBehavior()==null){this.setBehavior(new qx.ui.table.columnmodel.resizebehavior.Default());
}this._table=table;
table.addEventListener("appear",
this._onappear,
this);
table.addEventListener("tableWidthChanged",
this._ontablewidthchanged,
this);
table.addEventListener("verticalScrollBarChanged",
this._onverticalscrollbarchanged,
this);
this.addEventListener("widthChanged",
this._oncolumnwidthchanged,
this);
this.addEventListener("visibilityChanged",
this._onvisibilitychanged,
this);
this._table.addEventListener("columnVisibilityMenuCreateEnd",
this._addResetColumnWidthButton,
this);
this.getBehavior()._setNumColumns(numColumns);
},
_addResetColumnWidthButton:function(event){var data=event.getData();
var menu=data.menu;
var o;
var Am=qx.io.Alias;
var icon=Am.getInstance().resolve("icon/16/actions/view-refresh.png");
o=new qx.ui.menu.Separator();
menu.add(o);
o=new qx.ui.menu.Button("Reset column widths",
icon);
menu.add(o);
o.addEventListener("execute",
this._onappear,
this);
},
_onappear:function(event){if(this._bInProgress){return ;
}this._bInProgress=true;
{if(qx.core.Setting.get("qx.tableResizeDebug")){this.debug("onappear");
}};
this.getBehavior().onAppear(this,
event);
qx.client.Timer.once(function(){if(!this._table.getDisposed()){this._table._updateScrollerWidths();
this._table._updateScrollBarVisibility();
}},
this,
0);
this._bInProgress=false;
this._bAppeared=true;
},
_ontablewidthchanged:function(event){if(this._bInProgress||!this._bAppeared){return ;
}this._bInProgress=true;
{if(qx.core.Setting.get("qx.tableResizeDebug")){this.debug("ontablewidthchanged");
}};
this.getBehavior().onTableWidthChanged(this,
event);
this._bInProgress=false;
},
_onverticalscrollbarchanged:function(event){if(this._bInProgress||!this._bAppeared){return ;
}this._bInProgress=true;
{if(qx.core.Setting.get("qx.tableResizeDebug")){this.debug("onverticalscrollbarchanged");
}};
this.getBehavior().onVerticalScrollBarChanged(this,
event);
qx.client.Timer.once(function(){if(!this._table.getDisposed()){this._table._updateScrollerWidths();
this._table._updateScrollBarVisibility();
}},
this,
0);
this._bInProgress=false;
},
_oncolumnwidthchanged:function(event){if(this._bInProgress||!this._bAppeared){return ;
}this._bInProgress=true;
{if(qx.core.Setting.get("qx.tableResizeDebug")){this.debug("oncolumnwidthchanged");
}};
this.getBehavior().onColumnWidthChanged(this,
event);
this._bInProgress=false;
},
_onvisibilitychanged:function(event){if(this._bInProgress||!this._bAppeared){return ;
}this._bInProgress=true;
{if(qx.core.Setting.get("qx.tableResizeDebug")){this.debug("onvisibilitychanged");
}};
this.getBehavior().onVisibilityChanged(this,
event);
this._bInProgress=false;
}},
settings:{"qx.tableResizeDebug":false},
destruct:function(){this._disposeFields("_table");
}});




/* ID: qx.ui.table.columnmodel.resizebehavior.Abstract */
qx.Class.define("qx.ui.table.columnmodel.resizebehavior.Abstract",
{type:"abstract",
extend:qx.core.Object,
construct:function(){this.base(arguments);
this._resizeColumnData=[];
},
members:{_setNumColumns:function(numColumns){throw new Error("_setNumColumns is abstract");
},
onAppear:function(tableColumnModel,
event){throw new Error("onAppear is abstract");
},
onTableWidthChanged:function(tableColumnModel,
event){throw new Error("onTableWidthChanged is abstract");
},
onVerticalScrollBarChanged:function(tableColumnModel,
event){throw new Error("onVerticalScrollBarChanged is abstract");
},
onColumnWidthChanged:function(tableColumnModel,
event){throw new Error("onColumnWidthChanged is abstract");
},
onVisibilityChanged:function(tableColumnModel,
event){throw new Error("onVisibilityChanged is abstract");
},
_getAvailableWidth:function(tableColumnModel){var el=tableColumnModel._table.getElement();
var width=qx.html.Dimension.getInnerWidth(el);
var scrollers=tableColumnModel._table._getPaneScrollerArr();
var lastScroller=scrollers[scrollers.length-1];
tableColumnModel._table._updateScrollBarVisibility();
if(tableColumnModel._table.getColumnVisibilityButtonVisible()||(lastScroller._verScrollBar.getVisibility()&&lastScroller._verScrollBar.getWidth()=="auto")){return {width:width-qx.ui.core.Widget.SCROLLBAR_SIZE,
extraWidth:0};
}return {width:width-qx.ui.core.Widget.SCROLLBAR_SIZE,
extraWidth:qx.ui.core.Widget.SCROLLBAR_SIZE};
}},
destruct:function(){this._disposeFields("_resizeColumnData");
}});




/* ID: qx.ui.table.columnmodel.resizebehavior.Default */
qx.Class.define("qx.ui.table.columnmodel.resizebehavior.Default",
{extend:qx.ui.table.columnmodel.resizebehavior.Abstract,
construct:function(){this.base(arguments);
},
statics:{MIN_WIDTH:10},
properties:{newResizeBehaviorColumnData:{check:"Function",
init:function(obj){return new qx.ui.table.columnmodel.resizebehavior.ColumnData();
}},
initializeWidthsOnEveryAppear:{check:"Boolean",
init:false}},
members:{widthsInitialized:false,
setWidth:function(col,
width){if(col>=this._resizeColumnData.length){throw new Error("Column number out of range");
}this._resizeColumnData[col].setWidth(width);
},
setMinWidth:function(col,
width){if(col>=this._resizeColumnData.length){throw new Error("Column number out of range");
}this._resizeColumnData[col].setMinWidth(width);
},
setMaxWidth:function(col,
width){if(col>=this._resizeColumnData.length){throw new Error("Column number out of range");
}this._resizeColumnData[col].setMaxWidth(width);
},
set:function(col,
map){for(var prop in map){switch(prop){case "width":this.setWidth(col,
map[prop]);
break;
case "minWidth":this.setMinWidth(col,
map[prop]);
break;
case "maxWidth":this.setMaxWidth(col,
map[prop]);
break;
default:throw new Error("Unknown property: "+prop);
}}},
onAppear:function(tableColumnModel,
event){if(!this.widthsInitialized||this.getInitializeWidthsOnEveryAppear()){this._width=this._getAvailableWidth(tableColumnModel);
this._computeColumnsFlexWidth(tableColumnModel,
event);
this.widthsInitialized=true;
}},
onTableWidthChanged:function(tableColumnModel,
event){this._computeColumnsFlexWidth(tableColumnModel,
event);
},
onVerticalScrollBarChanged:function(tableColumnModel,
event){this._computeColumnsFlexWidth(tableColumnModel,
event);
},
onColumnWidthChanged:function(tableColumnModel,
event){this._extendNextColumn(tableColumnModel,
event);
},
onVisibilityChanged:function(tableColumnModel,
event){var data=event.getData();
if(data.visible){this._computeColumnsFlexWidth(tableColumnModel,
event);
return;
}this._extendLastColumn(tableColumnModel,
event);
},
_setNumColumns:function(numColumns){if(numColumns<=this._resizeColumnData.length){this._resizeColumnData.splice(numColumns);
return;
}for(var i=this._resizeColumnData.length;i<numColumns;i++){this._resizeColumnData[i]=this.getNewResizeBehaviorColumnData()();
this._resizeColumnData[i]._columnNumber=i;
}},
_computeColumnsFlexWidth:function(tableColumnModel,
event){{if(qx.core.Setting.get("qx.tableResizeDebug")){this.debug("computeColumnsFlexWidth");
}};
var visibleColumns=tableColumnModel._visibleColumnArr;
var visibleColumnsLength=visibleColumns.length;
var columnData;
var flexibleColumns=[];
var widthUsed=0;
var i;
var availableWidth=this._getAvailableWidth(tableColumnModel);
var width=availableWidth.width;
var extraWidth=availableWidth.extraWidth;
for(i=0;i<visibleColumnsLength;i++){columnData=this._resizeColumnData[visibleColumns[i]];
if(columnData._computedWidthTypeAuto){columnData._computedWidthTypeAuto=false;
columnData._computedWidthTypeFlex=true;
columnData._computedWidthParsed=1;
}if(columnData._computedWidthTypeFlex){flexibleColumns.push(columnData);
}else if(columnData._computedWidthTypePercent){columnData._computedWidthPercentValue=Math.round(width*(columnData._computedWidthParsed/100));
widthUsed+=columnData._computedWidthPercentValue;
}else{widthUsed+=columnData.getWidth();
}}{if(qx.core.Setting.get("qx.tableResizeDebug")){this.debug("Width: "+widthUsed+"/"+width);
this.debug("Flexible Count: "+flexibleColumns.length);
}};
var widthRemaining=width-widthUsed;
var flexibleColumnsLength=flexibleColumns.length;
var prioritySum=0;
for(i=0;i<flexibleColumnsLength;i++){prioritySum+=flexibleColumns[i]._computedWidthParsed;
}var partWidth=widthRemaining/prioritySum;
var bSomethingChanged=true;
for(flexibleColumnsLength=flexibleColumns.length;bSomethingChanged&&flexibleColumnsLength>0;flexibleColumnsLength=flexibleColumns.length){bSomethingChanged=false;
for(i=flexibleColumnsLength-1;i>=0;i--){columnData=flexibleColumns[i];
var computedFlexibleWidth=columnData._computedWidthFlexValue=columnData._computedWidthParsed*partWidth;
var min=columnData.getMinWidthValue();
var max=columnData.getMaxWidthValue();
if(min&&computedFlexibleWidth<min){columnData._computedWidthFlexValue=Math.round(min);
widthUsed+=columnData._computedWidthFlexValue;
qx.lang.Array.removeAt(flexibleColumns,
i);
bSomethingChanged=true;
columnData=null;
}else if(max&&computedFlexibleWidth>max){columnData._computedWidthFlexValue=Math.round(max);
widthUsed+=columnData._computedWidthFlexValue;
qx.lang.Array.removeAt(flexibleColumns,
i);
bSomethingChanged=true;
columnData=null;
}}}if(flexibleColumns.length>0){prioritySum=0;
for(i=0;i<flexibleColumnsLength;i++){prioritySum+=flexibleColumns[i]._computedWidthParsed;
}widthRemaining=width-widthUsed;
partWidth=widthRemaining/prioritySum;
if(widthRemaining<=0){for(i=0;i<flexibleColumnsLength;i++){columnData=flexibleColumns[i];
computedFlexibleWidth=columnData._computedWidthFlexValue=(qx.ui.table.columnmodel.resizebehavior.Default.MIN_WIDTH*flexibleColumns[i]._computedWidthParsed);
columnData._computedWidthFlexValue=Math.round(computedFlexibleWidth);
widthUsed+=columnData._computedWidthFlexValue;
}}else{for(i=0;i<flexibleColumnsLength;i++){columnData=flexibleColumns[i];
computedFlexibleWidth=columnData._computedWidthFlexValue=columnData._computedWidthParsed*partWidth;
if(computedFlexibleWidth<qx.ui.table.columnmodel.resizebehavior.Default.MIN_WIDTH){computedFlexibleWidth=qx.ui.table.columnmodel.resizebehavior.Default.MIN_WIDTH;
}columnData._computedWidthFlexValue=Math.round(computedFlexibleWidth);
widthUsed+=columnData._computedWidthFlexValue;
}}}if(columnData!=null&&widthRemaining>0){columnData._computedWidthFlexValue+=width-widthUsed;
}for(i=0;i<visibleColumnsLength;i++){var colWidth;
columnData=this._resizeColumnData[visibleColumns[i]];
if(columnData._computedWidthTypeFlex){colWidth=columnData._computedWidthFlexValue;
}else if(columnData._computedWidthTypePercent){colWidth=columnData._computedWidthPercentValue;
}else{colWidth=columnData.getWidth();
}if(i==visibleColumnsLength-1){colWidth+=extraWidth;
}tableColumnModel.setColumnWidth(visibleColumns[i],
colWidth);
{if(qx.core.Setting.get("qx.tableResizeDebug")){this.debug("col "+columnData._columnNumber+": width="+colWidth);
}};
}},
_extendNextColumn:function(tableColumnModel,
event){var data=event.getData();
var visibleColumns=tableColumnModel._visibleColumnArr;
var availableWidth=this._getAvailableWidth(tableColumnModel);
var width=availableWidth.width;
var numColumns=visibleColumns.length;
if(data.newWidth>data.oldWidth){return ;
}var i;
var nextCol;
var widthUsed=0;
for(i=0;i<numColumns;i++){widthUsed+=tableColumnModel.getColumnWidth(visibleColumns[i]);
}if(widthUsed<width){for(i=0;i<visibleColumns.length;i++){if(visibleColumns[i]==data.col){nextCol=visibleColumns[i+1];
break;
}}
if(nextCol){var newWidth=(width-(widthUsed-tableColumnModel.getColumnWidth(nextCol)));
tableColumnModel.setColumnWidth(nextCol,
newWidth);
}}},
_extendLastColumn:function(tableColumnModel,
event){var data=event.getData();
if(data.visible){return;
}var visibleColumns=tableColumnModel._visibleColumnArr;
var availableWidth=this._getAvailableWidth(tableColumnModel);
var width=availableWidth.width;
var numColumns=visibleColumns.length;
var i;
var lastCol;
var widthUsed=0;
for(i=0;i<numColumns;i++){widthUsed+=tableColumnModel.getColumnWidth(visibleColumns[i]);
}if(widthUsed<width){lastCol=visibleColumns[visibleColumns.length-1];
var newWidth=(width-(widthUsed-tableColumnModel.getColumnWidth(lastCol)));
tableColumnModel.setColumnWidth(lastCol,
newWidth);
}}},
destruct:function(){this._disposeFields("_resizeColumnData",
"_width");
}});




/* ID: qx.ui.table.columnmodel.resizebehavior.ColumnData */
qx.Class.define("qx.ui.table.columnmodel.resizebehavior.ColumnData",
{extend:qx.ui.core.Widget,
construct:function(){this.base(arguments);
this.setWidth("1*");
}});




/* ID: qx.util.ExtendedColor */
qx.Class.define("qx.util.ExtendedColor",
{statics:{EXTENDED:{transparent:[-1,
-1,
-1],
aliceblue:[240,
248,
255],
antiquewhite:[250,
235,
215],
aqua:[0,
255,
255],
aquamarine:[127,
255,
212],
azure:[240,
255,
255],
beige:[245,
245,
220],
bisque:[255,
228,
196],
black:[0,
0,
0],
blanchedalmond:[255,
235,
205],
blue:[0,
0,
255],
blueviolet:[138,
43,
226],
brown:[165,
42,
42],
burlywood:[222,
184,
135],
cadetblue:[95,
158,
160],
chartreuse:[127,
255,
0],
chocolate:[210,
105,
30],
coral:[255,
127,
80],
cornflowerblue:[100,
149,
237],
cornsilk:[255,
248,
220],
crimson:[220,
20,
60],
cyan:[0,
255,
255],
darkblue:[0,
0,
139],
darkcyan:[0,
139,
139],
darkgoldenrod:[184,
134,
11],
darkgray:[169,
169,
169],
darkgreen:[0,
100,
0],
darkgrey:[169,
169,
169],
darkkhaki:[189,
183,
107],
darkmagenta:[139,
0,
139],
darkolivegreen:[85,
107,
47],
darkorange:[255,
140,
0],
darkorchid:[153,
50,
204],
darkred:[139,
0,
0],
darksalmon:[233,
150,
122],
darkseagreen:[143,
188,
143],
darkslateblue:[72,
61,
139],
darkslategray:[47,
79,
79],
darkslategrey:[47,
79,
79],
darkturquoise:[0,
206,
209],
darkviolet:[148,
0,
211],
deeppink:[255,
20,
147],
deepskyblue:[0,
191,
255],
dimgray:[105,
105,
105],
dimgrey:[105,
105,
105],
dodgerblue:[30,
144,
255],
firebrick:[178,
34,
34],
floralwhite:[255,
250,
240],
forestgreen:[34,
139,
34],
fuchsia:[255,
0,
255],
gainsboro:[220,
220,
220],
ghostwhite:[248,
248,
255],
gold:[255,
215,
0],
goldenrod:[218,
165,
32],
gray:[128,
128,
128],
green:[0,
128,
0],
greenyellow:[173,
255,
47],
grey:[128,
128,
128],
honeydew:[240,
255,
240],
hotpink:[255,
105,
180],
indianred:[205,
92,
92],
indigo:[75,
0,
130],
ivory:[255,
255,
240],
khaki:[240,
230,
140],
lavender:[230,
230,
250],
lavenderblush:[255,
240,
245],
lawngreen:[124,
252,
0],
lemonchiffon:[255,
250,
205],
lightblue:[173,
216,
230],
lightcoral:[240,
128,
128],
lightcyan:[224,
255,
255],
lightgoldenrodyellow:[250,
250,
210],
lightgray:[211,
211,
211],
lightgreen:[144,
238,
144],
lightgrey:[211,
211,
211],
lightpink:[255,
182,
193],
lightsalmon:[255,
160,
122],
lightseagreen:[32,
178,
170],
lightskyblue:[135,
206,
250],
lightslategray:[119,
136,
153],
lightslategrey:[119,
136,
153],
lightsteelblue:[176,
196,
222],
lightyellow:[255,
255,
224],
lime:[0,
255,
0],
limegreen:[50,
205,
50],
linen:[250,
240,
230],
magenta:[255,
0,
255],
maroon:[128,
0,
0],
mediumaquamarine:[102,
205,
170],
mediumblue:[0,
0,
205],
mediumorchid:[186,
85,
211],
mediumpurple:[147,
112,
219],
mediumseagreen:[60,
179,
113],
mediumslateblue:[123,
104,
238],
mediumspringgreen:[0,
250,
154],
mediumturquoise:[72,
209,
204],
mediumvioletred:[199,
21,
133],
midnightblue:[25,
25,
112],
mintcream:[245,
255,
250],
mistyrose:[255,
228,
225],
moccasin:[255,
228,
181],
navajowhite:[255,
222,
173],
navy:[0,
0,
128],
oldlace:[253,
245,
230],
olive:[128,
128,
0],
olivedrab:[107,
142,
35],
orange:[255,
165,
0],
orangered:[255,
69,
0],
orchid:[218,
112,
214],
palegoldenrod:[238,
232,
170],
palegreen:[152,
251,
152],
paleturquoise:[175,
238,
238],
palevioletred:[219,
112,
147],
papayawhip:[255,
239,
213],
peachpuff:[255,
218,
185],
peru:[205,
133,
63],
pink:[255,
192,
203],
plum:[221,
160,
221],
powderblue:[176,
224,
230],
purple:[128,
0,
128],
red:[255,
0,
0],
rosybrown:[188,
143,
143],
royalblue:[65,
105,
225],
saddlebrown:[139,
69,
19],
salmon:[250,
128,
114],
sandybrown:[244,
164,
96],
seagreen:[46,
139,
87],
seashell:[255,
245,
238],
sienna:[160,
82,
45],
silver:[192,
192,
192],
skyblue:[135,
206,
235],
slateblue:[106,
90,
205],
slategray:[112,
128,
144],
slategrey:[112,
128,
144],
snow:[255,
250,
250],
springgreen:[0,
255,
127],
steelblue:[70,
130,
180],
tan:[210,
180,
140],
teal:[0,
128,
128],
thistle:[216,
191,
216],
tomato:[255,
99,
71],
turquoise:[64,
224,
208],
violet:[238,
130,
238],
wheat:[245,
222,
179],
white:[255,
255,
255],
whitesmoke:[245,
245,
245],
yellow:[255,
255,
0],
yellowgreen:[154,
205,
50]},
isExtendedColor:function(value){return this.EXTENDED[value]!==undefined;
},
toRgb:function(value){var ret=this.EXTENDED[value];
if(ret){return ret;
}throw new Error("Could not convert other than extended colors to RGB: "+value);
},
toRgbString:function(value){return qx.util.ColorUtil.rgbToRgbString(this.toRgb(value));
}}});




/* ID: qx.ui.treevirtual.MNode */
qx.Mixin.define("qx.ui.treevirtual.MNode",
{members:{nodeGet:function(nodeReference){if(typeof (nodeReference)=="object"){return nodeReference;
}else if(typeof (nodeReference)=="number"){return this.getTableModel().getData()[nodeReference];
}else{throw new Error("Expected node object or node id");
}},
nodeToggleOpened:function(nodeReference){var node;
var nodeId;
if(typeof (nodeReference)=="object"){node=nodeReference;
nodeId=node.nodeId;
}else if(typeof (nodeReference)=="number"){nodeId=nodeReference;
node=this.getTableModel().getData()[nodeId];
}else{throw new Error("Expected node object or node id");
}this.getTableModel().setState(nodeId,
{bOpened:!node.bOpened});
},
nodeSetState:function(nodeReference,
attributes){var nodeId;
if(typeof (nodeReference)=="object"){nodeId=nodeReference.nodeId;
}else if(typeof (nodeReference)=="number"){nodeId=nodeReference;
}else{throw new Error("Expected node object or node id");
}this.getTableModel().setState(nodeId,
attributes);
},
nodeSetLabel:function(nodeReference,
label){this.nodeSetState(nodeReference,
{label:label});
},
nodeGetLabel:function(nodeReference){var node=this.nodeGet(nodeReference);
return node.label;
},
nodeSetSelected:function(nodeReference,
b){this.nodeSetState(nodeReference,
{bSelected:b});
},
nodeGetSelected:function(nodeReference){var node=this.nodeGet(nodeReference);
return node.bSelected;
},
nodeSetOpened:function(nodeReference,
b){var node;
if(typeof (nodeReference)=="object"){node=nodeReference;
}else if(typeof (nodeReference)=="number"){node=this.getTableModel().getData()[nodeReference];
}else{throw new Error("Expected node object or node id");
}if(b!=node.bOpened){this.nodeToggleOpened(node);
}},
nodeGetOpened:function(nodeReference){var node=this.nodeGet(nodeReference);
return node.bOpened;
},
nodeSetHideOpenClose:function(nodeReference,
b){this.nodeSetState(nodeReference,
{bHideOpenClose:b});
},
nodeGetHideOpenClose:function(nodeReference){var node=this.nodeGet(nodeReference);
return node.bHideOpenClose;
},
nodeSetIcon:function(nodeReference,
path){this.nodeSetState(nodeReference,
{icon:path});
},
nodeGetIcon:function(nodeReference){var node=this.nodeGet(nodeReference);
return node.icon;
},
nodeSetSelectedIcon:function(nodeReference,
path){this.nodeSetState(nodeReference,
{iconSelected:path});
},
nodeGetSelectedIcon:function(nodeReference){var node=this.nodeGet(nodeReference);
return node.iconSelected;
},
nodeSetCellStyle:function(nodeReference,
style){this.nodeSetState(nodeReference,
{cellStyle:style});
},
nodeGetCellStyle:function(nodeReference){var node=this.nodeGet(nodeReference);
return node.cellStyle;
},
nodeSetLabelStyle:function(nodeReference,
style){this.nodeSetState(nodeReference,
{labelStyle:style});
},
nodeGetLabelStyle:function(nodeReference){var node=this.nodeGet(nodeReference);
return node.cellStyle;
}}});




/* ID: qx.ui.treevirtual.MDragAndDropSupport */
qx.Mixin.define("qx.ui.treevirtual.MDragAndDropSupport",
{construct:function(){this.setSupportsDropMethod(this._supportsDrop);
},
events:{"draghover":"qx.event.type.DataEvent"},
properties:{enableDragDrop:{check:"Boolean",
apply:"_applyEnableDragDrop",
init:false},
dragDataMimeType:{check:"String",
init:"treevirtualnode"},
allowDragTypes:{check:"Array",
nullable:true,
init:null},
allowDragOut:{check:"Boolean",
init:true},
dragAction:{nullable:false,
init:'move'},
dragHoverEventName:{check:"String",
nullable:true,
init:"draghover"},
dragHoverTimeout:{check:"Number",
nullable:true,
init:1000},
autoScrollInterval:{check:"Number",
nullable:true,
init:100},
allowDropBetweenNodes:{check:"Boolean",
init:false},
cellFocusIndicatorColor:{check:"String",
init:qx.util.ExtendedColor.toRgbString("lightblue")},
cellFocusIndicatorColorBetweenNodes:{check:"String",
init:"black"},
allowDropTypes:{check:"Array",
nullable:true,
init:null},
dropTarget:{check:"Object",
nullable:true,
init:null},
dropTargetRelativePosition:{check:[-1,
0,
1],
init:0},
sortChildNodesBy:{check:"Object",
nullable:true,
init:null},
sortAfterDrop:{check:"Boolean",
init:false}},
members:{_applyEnableDragDrop:function(value,
old){if(old&&!value){this.removeEventListener("dragstart",
this._handleDragStart);
this.removeEventListener("dragover",
this._handleDragOver);
this.removeEventListener("dragout",
this._handleDragOut);
this.removeEventListener("dragout",
this._handleDragDrop);
this.removeEventListener("dragend",
this._handleDragEnd);
}
if(value&&!old){var defaultMimeType=this.getDragDataMimeType();
var dropDataTypes=qx.lang.Array.copy(this.getDropDataTypes()||[]);
if(dropDataTypes.indexOf(defaultMimeType)<0){dropDataTypes.push(defaultMimeType);
this.setDropDataTypes(dropDataTypes);
}if(!this.hasEventListeners("dragstart")){this.addEventListener("dragstart",
this._handleDragStart,
this);
}
if(!this.hasEventListeners("dragover")){this.addEventListener("dragover",
this._handleDragOver,
this);
}
if(!this.hasEventListeners("dragout")){this.addEventListener("dragout",
this._handleDragOut,
this);
}
if(!this.hasEventListeners("dragdrop")){this.addEventListener("dragdrop",
this._handleDragDrop,
this);
}
if(!this.hasEventListeners("dragend")){this.addEventListener("dragend",
this._handleDragEnd,
this);
}}},
setShowRowFocusIndicator:function(value){this.getDataRowRenderer().setHighlightFocusRow(value);
},
getTreePaneScroller:function(){return this._getPaneScrollerArr()[this.getDataModel().getTreeColumn()];
},
getCellFocusIndicator:function(){return this.getTreePaneScroller()._focusIndicator;
},
_handleDragStart:function(event){var target=event.getTarget();
switch(target.getParent().classname){case "qx.ui.table.pane.Header":case "qx.ui.basic.ScrollBar":return;
}var selection=this.getDataModel().getSelectedNodes();
var types=this.getAllowDragTypes();
if(types===null)return false;
if(types[0]!="*"){for(var i=0;i<selection.length;i++){var type=null;
try{type=selection[i].data.MDragAndDropSupport.type;
}catch(e){}if(types.indexOf(type)<0)return false;
}}var dragData={'nodeData':selection,
'sourceWidget':this};
event.addData(this.getDragDataMimeType(),
dragData);
var action=this.getDragAction();
if(action instanceof Array){action.forEach(function(a){event.addAction(a);
});
}else{event.addAction(action);
}event.startDrag();
},
_handleDragOver:function(event){},
_handleDragHover:function(event){},
_handleDragOut:function(){this.getCellFocusIndicator().setBackgroundColor(this.getCellFocusIndicatorColor());
},
_handleDragDrop:function(){},
_handleDragEnd:function(){this.getCellFocusIndicator().setBackgroundColor(this.getCellFocusIndicatorColor());
},
getDropData:function(event){var dragData=event.getData(this.getDragDataMimeType());
return {'nodeData':dragData.nodeData,
'sourceWidget':dragData.sourceWidget,
'targetNode':this.getDropTarget(),
'position':this.getDropTargetRelativePosition(),
'action':event.getAction()};
},
_supportsDrop:function(dragCache){var result=this.checkDrop(dragCache);
if(typeof this.supportsDropCallback=="function"){result=result&&this.supportsDropCallback(dragCache);
}return result;
},
checkDrop:function(dragCache){var scroller=this.getTreePaneScroller();
var paneClipperElem=scroller._paneClipper.getElement();
var paneClipperTopY=qx.html.Location.getClientBoxTop(paneClipperElem);
var rowHeight=scroller.getTable().getRowHeight();
var scrollY=scroller._verScrollBar.getValue();
if(scroller.getTable().getKeepFirstVisibleRowComplete()){scrollY=Math.floor(scrollY/rowHeight)*rowHeight;
}var tableY=scrollY+dragCache.pageY-paneClipperTopY;
var row=Math.floor(tableY/rowHeight);
var deltaY=tableY%rowHeight;
scroller._focusCellAtPagePos(dragCache.pageX,
dragCache.pageY);
var firstRow=scroller._tablePane.getFirstVisibleRow();
var rowCount=scroller._tablePane.getVisibleRowCount();
var lastRow=firstRow+rowCount;
var scrollY=parseInt(scroller.getScrollY());
var topDelta=row-firstRow;
var bottomDelta=lastRow-row;
var interval=this.getAutoScrollInterval();
if(interval){if(!this.__scrollFunctionId&&(topDelta>-1&&topDelta<2)&&row!=0){this.__scrollFunctionId=window.setInterval(function(){scroller.setScrollY(parseInt(scroller.getScrollY())-rowHeight);
},
100);
}else if(!this.__scrollFunctionId&&(bottomDelta>0&&bottomDelta<3)){this.__scrollFunctionId=window.setInterval(function(){scroller.setScrollY(parseInt(scroller.getScrollY())+rowHeight);
},
100);
}else if(this.__scrollFunctionId){window.clearInterval(this.__scrollFunctionId);
this.__scrollFunctionId=null;
}}var dropTargetRelativePosition=0;
if(this.getAllowDropBetweenNodes()){var focusIndicator=this.getCellFocusIndicator();
if(deltaY<4||deltaY>(rowHeight-4)){focusIndicator.setBackgroundColor(this.getCellFocusIndicatorColorBetweenNodes());
focusIndicator.setHeight(2);
if(deltaY<4){focusIndicator.setTop((row-firstRow)*rowHeight-2);
dropTargetRelativePosition=-1;
}else{focusIndicator.setTop((row-firstRow+1)*rowHeight-2);
dropTargetRelativePosition=1;
}}else{focusIndicator.setBackgroundColor(this.getCellFocusIndicatorColor());
scroller._updateFocusIndicator();
}}var handler=qx.event.handler.DragAndDropHandler.getInstance();
var sourceData=handler.getData(this.getDragDataMimeType());
if(!sourceData){return false;
}var sourceNode=sourceData.nodeData[0];
if(!sourceNode){return false;
}var sourceWidget=sourceData.sourceWidget;
if(typeof sourceWidget.getAllowDragOut=="function"&&sourceWidget.getAllowDragOut())var targetWidget=this;
var targetRowData=this.getDataModel().getRowData(row);
if(!targetRowData){return false;
}var targetNode=targetRowData[0];
if(!targetNode){return false;
}var targetParentNode=this.nodeGet(targetNode.parentNodeId);
this.setDropTarget(targetNode);
this.setDropTargetRelativePosition(dropTargetRelativePosition);
if(sourceWidget==targetWidget){if(sourceNode.nodeId==targetNode.nodeId){return false;
}var traverseNode=targetNode;
while(traverseNode.parentNodeId){if(traverseNode.parentNodeId==sourceNode.nodeId){return false;
}traverseNode=this.nodeGet(traverseNode.parentNodeId);
}}var dragHoverTimeout=this.getDragHoverTimeout();
var dragHoverEventName=this.getDragHoverEventName();
if(dragHoverTimeout&&dragHoverEventName){if(this.__dragHoverTimeoutFunc){if(row!=this.__dragHoverRow||dropTargetRelativePosition){window.clearTimeout(this.__dragHoverTimeoutFunc);
this.__dragHoverTimeoutFunc=null;
}}
if(!this.__dragHoverTimeoutFunc&&!dropTargetRelativePosition){this.__dragHoverRow=row;
var self=this;
this.__dragHoverTimeoutFunc=window.setTimeout(function(){targetNode.row=row;
self.createDispatchDataEvent(dragHoverEventName,
targetNode);
},
dragHoverTimeout);
}}var sourceType=this.getNodeType(sourceNode);
var targetTypeNode=(dropTargetRelativePosition!=0)?targetParentNode:targetNode;
var targetType=this.getNodeType(targetTypeNode);
if(!targetType){return;
}var allowDropTypes=this.getAllowDropTypes();
if(!allowDropTypes||typeof allowDropTypes!="object"||allowDropTypes[0]=="*"){return true;
}for(var i=0;i<allowDropTypes.length;i++){if((allowDropTypes[i][0]==sourceType||allowDropTypes[i][0]=="*")&&(allowDropTypes[i][1]==targetType||allowDropTypes[i][1]=="*")){return true;
}}return false;
},
getNodeType:function(nodeReference){try{if(typeof nodeReference=="object"){return nodeReference.data.MDragAndDropSupport.type;
}else{return this.nodeGet(nodeReference).data.MDragAndDropSupport.type;
}}catch(e){return null;
}},
setNodeType:function(nodeReference,
type){if(typeof type!="string"){this.error("Drag Type must be a string, got "+(typeof type));
}var node=this.nodeGet(nodeReference);
if(!node.data)node.data={};
if(!node.data.MDragAndDropSupport)node.data.MDragAndDropSupport={};
node.data.MDragAndDropSupport.type=type;
},
moveNode:function(first,
sourceNodes,
targetNode,
position,
action){if(arguments.length==1){var sourceWidget=first.sourceWidget,
sourceNodes=first.nodeData,
targetNode=first.targetNode,
position=first.position,
action=first.action;
}else{var sourceWidget=first;
}
if(!sourceNodes){this.error("No source node(s) supplied. Aborting.");
}if(typeof sourceNodes=="object"&&sourceNodes.length){sourceNodes.forEach(function(sourceNode){this.moveNode(sourceWidget,
sourceNode,
targetNode,
position,
action);
},
this);
return true;
}sourceWidget.getSelectionModel().clearSelection();
var sourceNode=sourceNodes;
var sourceNodeId=sourceNode.nodeId;
var sourceParentNode=sourceWidget.nodeGet(sourceNode.parentNodeId);
var sourceNodeIndex=sourceParentNode.children.indexOf(sourceNodeId);
var targetNodeId=targetNode.nodeId;
var targetParentNodeId=targetNode.parentNodeId||0;
var targetParentNode=this.nodeGet(targetParentNodeId);
if(!targetParentNode){throw new Error("Request to move a child to a non-existent parent");
}var targetNodeIndex=targetParentNode.children.indexOf(targetNodeId);
if(targetParentNode.type==qx.ui.treevirtual.SimpleTreeDataModel.Type.LEAF){throw new Error("Sorry, a LEAF may not have children.");
}if(action=="copy"||sourceWidget!=this){var sourceNodeId=this.getDataModel()._nodeArr.length;
var sourceNode=qx.lang.Object.copy(sourceNode);
sourceNode.nodeId=sourceNodeId;
this.getDataModel()._nodeArr.push(sourceNode);
if(sourceNode.children.length){this.warn("Copying of node children not implemented yet!");
sourceNode.children=[];
}}if(action=="move"){qx.lang.Array.removeAt(sourceParentNode.children,
sourceNodeIndex);
sourceWidget.getDataModel().setData();
}if(position>0){sourceNode.level=targetNode.level;
sourceNode.parentNodeId=targetParentNodeId;
qx.lang.Array.insertAt(targetParentNode.children,
sourceNodeId,
targetNodeIndex+1);
if(this.getSortAfterDrop())this.sortChildNodes(targetParentNode);
}else if(position<0){sourceNode.level=targetNode.level;
sourceNode.parentNodeId=targetParentNodeId;
qx.lang.Array.insertAt(targetParentNode.children,
sourceNodeId,
targetNodeIndex);
if(this.getSortAfterDrop())this.sortChildNodes(targetParentNode);
}else if(targetNode.type!=qx.ui.treevirtual.SimpleTreeDataModel.Type.LEAF){sourceNode.level=targetNode.level+1;
sourceNode.parentNodeId=targetNodeId;
targetNode.children.push(sourceNodeId);
if(this.getSortAfterDrop())this.sortChildNodes(targetNode);
}this.getDataModel().setData();
return sourceNode;
},
sortChildNodes:function(nodeReference,
recurse){var sortMap=this.getSortChildNodesBy();
if(!sortMap||this.getAllowDropBetweenNodes())return;
var node=this.nodeGet(nodeReference);
var self=this;
node.children.sort(function(a,
b){for(var key in sortMap){var prop;
var sortHint=sortMap[key];
switch(key){case "dragType":prop="data.MDragAndDropSupport.type";
break;
default:prop=key;
}var nodeA=self.nodeGet(a);
var nodeB=self.nodeGet(b);
try{var valueA=eval("nodeA."+prop);
var valueB=eval("nodeB."+prop);
}catch(e){continue;
}if(typeof sortHint=="string"){if(valueA>valueB)return sortHint=="asc"?1:-1;
if(valueA<valueB)return sortHint=="asc"?-1:1;
}if(typeof sortHint=="object"&&sortHint.length){if(sortHint.indexOf(valueA)>sortHint.indexOf(valueB))return 1;
if(sortHint.indexOf(valueA)<sortHint.indexOf(valueB))return -1;
}}return 0;
});
if(recurse){node.children.forEach(function(nodeId){this.sortChildNodes(this.nodeGet(nodeId),
true);
},
this);
}this.getDataModel().setData();
}}});




/* ID: qx.event.handler.DragAndDropHandler */
qx.Class.define("qx.event.handler.DragAndDropHandler",
{type:"singleton",
extend:qx.util.manager.Object,
construct:function(){this.base(arguments);
this.__data={};
this.__actions={};
this.__cursors={};
var vCursor,
vAction;
var vActions=["move",
"copy",
"alias",
"nodrop"];
for(var i=0,
l=vActions.length;i<l;i++){vAction=vActions[i];
vCursor=this.__cursors[vAction]=new qx.ui.basic.Image;
vCursor.setAppearance("cursor-dnd-"+vAction);
vCursor.setZIndex(1e8);
}},
properties:{sourceWidget:{check:"qx.ui.core.Widget",
nullable:true},
destinationWidget:{check:"qx.ui.core.Widget",
nullable:true,
apply:"_applyDestinationWidget"},
currentAction:{check:"String",
nullable:true,
event:"changeCurrentAction"},
defaultCursorDeltaX:{check:"Integer",
init:5},
defaultCursorDeltaY:{check:"Integer",
init:15}},
members:{__lastDestinationEvent:null,
_applyDestinationWidget:function(value,
old){if(value){value.dispatchEvent(new qx.event.type.DragEvent("dragdrop",
this.__lastDestinationEvent,
value,
this.getSourceWidget()));
this.__lastDestinationEvent=null;
}},
addData:function(vMimeType,
vData){this.__data[vMimeType]=vData;
},
getData:function(vMimeType){return this.__data[vMimeType];
},
clearData:function(){this.__data={};
},
getDropDataTypes:function(){var vDestination=this.getDestinationWidget();
var vDropTypes=[];
if(!vDestination){return vDropTypes;
}var vDropDataTypes=vDestination.getDropDataTypes();
for(var i=0,
l=vDropDataTypes.length;i<l;i++){if(vDropDataTypes[i] in this.__data){vDropTypes.push(vDropDataTypes[i]);
}}return vDropTypes;
},
getDropTarget:qx.core.Variant.select("qx.client",
{"default":function(e){var vCurrent=e.getTarget();
while(vCurrent!=null){if(!vCurrent.supportsDrop(this.__dragCache)){return null;
}
if(this.supportsDrop(vCurrent)){return vCurrent;
}vCurrent=vCurrent.getParent();
}return null;
}}),
startDrag:function(){if(!this.__dragCache){throw new Error("Invalid usage of startDrag. Missing dragInfo!");
}this.__dragCache.dragHandlerActive=true;
this.setSourceWidget(this.__dragCache.sourceWidget);
if(this.__feedbackWidget){this.__feedbackWidget.setVisibility(false);
var doc=qx.ui.core.ClientDocument.getInstance();
doc.add(this.__feedbackWidget);
this.__feedbackWidget.setZIndex(1e8);
}},
_fireUserEvents:function(fromWidget,
toWidget,
e){if(fromWidget&&fromWidget!=toWidget&&fromWidget.hasEventListeners("dragout")){fromWidget.dispatchEvent(new qx.event.type.DragEvent("dragout",
e,
fromWidget,
toWidget),
true);
}
if(toWidget){if(fromWidget!=toWidget&&toWidget.hasEventListeners("dragover")){toWidget.dispatchEvent(new qx.event.type.DragEvent("dragover",
e,
toWidget,
fromWidget),
true);
}
if(toWidget.hasEventListeners("dragmove")){toWidget.dispatchEvent(new qx.event.type.DragEvent("dragmove",
e,
toWidget,
null),
true);
}}},
handleMouseEvent:function(e){switch(e.getType()){case "mousedown":return this._handleMouseDown(e);
case "mouseup":return this._handleMouseUp(e);
case "mousemove":return this._handleMouseMove(e);
}},
_handleMouseDown:function(e){if(e.getDefaultPrevented()||!e.isLeftButtonPressed()){return;
}this.__dragCache={startScreenX:e.getScreenX(),
startScreenY:e.getScreenY(),
pageX:e.getPageX(),
pageY:e.getPageY(),
sourceWidget:e.getTarget(),
sourceTopLevel:e.getTarget().getTopLevelWidget(),
dragHandlerActive:false,
hasFiredDragStart:false};
},
_handleMouseMove:function(e){if(!this.__dragCache){return;
}if(this.__dragCache.dragHandlerActive){this.__dragCache.pageX=e.getPageX();
this.__dragCache.pageY=e.getPageY();
var currentDropTarget=this.getDropTarget(e);
this.setCurrentAction(currentDropTarget?this._evalNewAction(e.isShiftPressed(),
e.isCtrlPressed(),
e.isAltPressed()):null);
this._fireUserEvents(this.__dragCache.currentDropWidget,
currentDropTarget,
e);
this.__dragCache.currentDropWidget=currentDropTarget;
this._renderCursor();
this._renderFeedbackWidget();
}else if(!this.__dragCache.hasFiredDragStart){if(Math.abs(e.getScreenX()-this.__dragCache.startScreenX)>5||Math.abs(e.getScreenY()-this.__dragCache.startScreenY)>5){this.__dragCache.sourceWidget.dispatchEvent(new qx.event.type.DragEvent("dragstart",
e,
this.__dragCache.sourceWidget),
true);
this.__dragCache.hasFiredDragStart=true;
if(this.__dragCache.dragHandlerActive){this._fireUserEvents(this.__dragCache.currentDropWidget,
this.__dragCache.sourceWidget,
e);
this.__dragCache.currentDropWidget=this.__dragCache.sourceWidget;
qx.ui.core.ClientDocument.getInstance().setCapture(true);
}}}},
_handleMouseUp:function(e){if(!this.__dragCache){return;
}
if(this.__dragCache.dragHandlerActive){this._endDrag(this.getDropTarget(e),
e);
}else{this.__dragCache=null;
}},
handleKeyEvent:function(e){if(!this.__dragCache){return;
}
switch(e.getType()){case "keydown":this._handleKeyDown(e);
return;
case "keyup":this._handleKeyUp(e);
return;
}},
_handleKeyDown:function(e){if(e.getKeyIdentifier()=="Escape"){this.cancelDrag(e);
}else if(this.getCurrentAction()!=null){switch(e.getKeyIdentifier()){case "Shift":case "Control":case "Alt":this.setAction(this._evalNewAction(e.isShiftPressed(),
e.isCtrlPressed(),
e.isAltPressed()));
this._renderCursor();
e.preventDefault();
}}},
_handleKeyUp:function(e){var bShiftPressed=e.getKeyIdentifier()=="Shift";
var bCtrlPressed=e.getKeyIdentifier()=="Control";
var bAltPressed=e.getKeyIdentifier()=="Alt";
if(bShiftPressed||bCtrlPressed||bAltPressed){if(this.getCurrentAction()!=null){this.setAction(this._evalNewAction(!bShiftPressed&&e.isShiftPressed(),
!bCtrlPressed&&e.isCtrlPressed(),
!bAltPressed&&e.isAltPressed()));
this._renderCursor();
e.preventDefault();
}}},
cancelDrag:function(e){if(!this.__dragCache){return;
}
if(this.__dragCache.dragHandlerActive){this._endDrag(null,
e);
}else{this.__dragCache=null;
}},
globalCancelDrag:function(){if(this.__dragCache&&this.__dragCache.dragHandlerActive){this._endDragCore();
}},
_endDrag:function(currentDestinationWidget,
e){if(currentDestinationWidget){this.__lastDestinationEvent=e;
this.setDestinationWidget(currentDestinationWidget);
}this.getSourceWidget().dispatchEvent(new qx.event.type.DragEvent("dragend",
e,
this.getSourceWidget(),
currentDestinationWidget),
true);
this._fireUserEvents(this.__dragCache&&this.__dragCache.currentDropWidget,
null,
e);
this._endDragCore();
},
_endDragCore:function(){if(this.__feedbackWidget){var doc=qx.ui.core.ClientDocument.getInstance();
doc.remove(this.__feedbackWidget);
if(this.__feedbackAutoDispose){this.__feedbackWidget.dispose();
}this.__feedbackWidget=null;
}var oldCursor=this.__cursor;
if(oldCursor){oldCursor._style.display="none";
this.__cursor=null;
}this._cursorDeltaX=null;
this._cursorDeltaY=null;
if(this.__dragCache){this.__dragCache.currentDropWidget=null;
this.__dragCache=null;
}qx.ui.core.ClientDocument.getInstance().setCapture(false);
this.clearData();
this.clearActions();
this.setSourceWidget(null);
this.setDestinationWidget(null);
},
setCursorPosition:function(deltaX,
deltaY){this._cursorDeltaX=deltaX;
this._cursorDeltaY=deltaY;
},
_renderCursor:function(){var vNewCursor;
var vOldCursor=this.__cursor;
switch(this.getCurrentAction()){case "move":vNewCursor=this.__cursors.move;
break;
case "copy":vNewCursor=this.__cursors.copy;
break;
case "alias":vNewCursor=this.__cursors.alias;
break;
default:vNewCursor=this.__cursors.nodrop;
}if(vNewCursor!=vOldCursor&&vOldCursor!=null){vOldCursor._style.display="none";
}if(!vNewCursor._initialLayoutDone){qx.ui.core.ClientDocument.getInstance().add(vNewCursor);
qx.ui.core.Widget.flushGlobalQueues();
}vNewCursor._renderRuntimeLeft(this.__dragCache.pageX+((this._cursorDeltaX!=null)?this._cursorDeltaX:this.getDefaultCursorDeltaX()));
vNewCursor._renderRuntimeTop(this.__dragCache.pageY+((this._cursorDeltaY!=null)?this._cursorDeltaY:this.getDefaultCursorDeltaY()));
if(vNewCursor!=vOldCursor){vNewCursor._style.display="";
}this.__cursor=vNewCursor;
},
supportsDrop:function(vWidget){var vTypes=vWidget.getDropDataTypes();
if(!vTypes){return false;
}
for(var i=0;i<vTypes.length;i++){if(vTypes[i] in this.__data){return true;
}}return false;
},
addAction:function(vAction,
vForce){this.__actions[vAction]=true;
if(vForce||this.getCurrentAction()==null){this.setCurrentAction(vAction);
}},
clearActions:function(){this.__actions={};
this.setCurrentAction(null);
},
removeAction:function(vAction){delete this.__actions[vAction];
if(this.getCurrentAction()==vAction){this.setCurrentAction(null);
}},
setAction:function(vAction){if(vAction!=null&&!(vAction in this.__actions)){this.addAction(vAction,
true);
}else{this.setCurrentAction(vAction);
}},
_evalNewAction:function(vKeyShift,
vKeyCtrl,
vKeyAlt){if(vKeyShift&&vKeyCtrl&&"alias" in this.__actions){return "alias";
}else if(vKeyShift&&vKeyAlt&&"copy" in this.__actions){return "copy";
}else if(vKeyShift&&"move" in this.__actions){return "move";
}else if(vKeyAlt&&"alias" in this.__actions){return "alias";
}else if(vKeyCtrl&&"copy" in this.__actions){return "copy";
}else{for(var vAction in this.__actions){return vAction;
}}return null;
},
setFeedbackWidget:function(widget,
deltaX,
deltaY,
autoDisposeWidget){this.__feedbackWidget=widget;
this.__feedbackDeltaX=(deltaX!=null)?deltaX:10;
this.__feedbackDeltaY=(deltaY!=null)?deltaY:10;
this.__feedbackAutoDispose=autoDisposeWidget?true:false;
},
_renderFeedbackWidget:function(){if(this.__feedbackWidget){this.__feedbackWidget.setVisibility(true);
this.__feedbackWidget._renderRuntimeLeft(this.__dragCache.pageX+this.__feedbackDeltaX);
this.__feedbackWidget._renderRuntimeTop(this.__dragCache.pageY+this.__feedbackDeltaY);
}}},
destruct:function(){this._disposeObjectDeep("__cursors",
1);
this._disposeObjects("__feedbackWidget");
this._disposeFields("__dragCache",
"__data",
"__actions",
"__lastDestinationEvent");
}});




/* ID: qx.event.type.DragEvent */
qx.Class.define("qx.event.type.DragEvent",
{extend:qx.event.type.MouseEvent,
construct:function(vType,
vMouseEvent,
vTarget,
vRelatedTarget){this._mouseEvent=vMouseEvent;
var vOriginalTarget=null;
switch(vType){case "dragstart":case "dragover":vOriginalTarget=vMouseEvent.getOriginalTarget();
}this.base(arguments,
vType,
vMouseEvent.getDomEvent(),
vTarget.getElement(),
vTarget,
vOriginalTarget,
vRelatedTarget);
},
members:{getMouseEvent:function(){return this._mouseEvent;
},
startDrag:function(){if(this.getType()!="dragstart"){throw new Error("qx.event.type.DragEvent startDrag can only be called during the dragstart event: "+this.getType());
}this.stopPropagation();
qx.event.handler.DragAndDropHandler.getInstance().startDrag();
},
addData:function(sType,
oData){qx.event.handler.DragAndDropHandler.getInstance().addData(sType,
oData);
},
getData:function(sType){return qx.event.handler.DragAndDropHandler.getInstance().getData(sType);
},
clearData:function(){qx.event.handler.DragAndDropHandler.getInstance().clearData();
},
getDropDataTypes:function(){return qx.event.handler.DragAndDropHandler.getInstance().getDropDataTypes();
},
addAction:function(sAction){qx.event.handler.DragAndDropHandler.getInstance().addAction(sAction);
},
removeAction:function(sAction){qx.event.handler.DragAndDropHandler.getInstance().removeAction(sAction);
},
getAction:function(){return qx.event.handler.DragAndDropHandler.getInstance().getCurrentAction();
},
clearActions:function(){qx.event.handler.DragAndDropHandler.getInstance().clearActions();
},
setFeedbackWidget:function(widget,
deltaX,
deltaY,
autoDisposeWidget){qx.event.handler.DragAndDropHandler.getInstance().setFeedbackWidget(widget,
deltaX,
deltaY,
autoDisposeWidget);
},
setCursorPosition:function(deltaX,
deltaY){qx.event.handler.DragAndDropHandler.getInstance().setCursorPosition(deltaX,
deltaY);
}},
destruct:function(){this._disposeFields("_mouseEvent");
}});




/* ID: qx.ui.table.cellrenderer.Icon */
qx.Class.define("qx.ui.table.cellrenderer.Icon",
{extend:qx.ui.table.cellrenderer.Abstract,
construct:function(){this.base(arguments);
this.IMG_BLANK_URL=qx.io.Alias.getInstance().resolve("static/image/blank.gif");
var clazz=this.self(arguments);
if(!clazz.stylesheet){clazz.stylesheet=qx.html.StyleSheet.createElement(".qooxdoo-table-cell-icon {"+"  text-align:center;"+"  padding-top:1px;"+"}");
}},
members:{_identifyImage:function(cellInfo){throw new Error("_identifyImage is abstract");
},
_getImageInfos:function(cellInfo){var urlAndTooltipMap=this._identifyImage(cellInfo);
if(urlAndTooltipMap==null||typeof urlAndTooltipMap=="string"){urlAndTooltipMap={url:urlAndTooltipMap,
tooltip:null};
}if(urlAndTooltipMap.url==null){urlAndTooltipMap.url=this.IMG_BLANK_URL;
}return urlAndTooltipMap;
},
_getCellClass:function(cellInfo){return this.base(arguments)+" qooxdoo-table-cell-icon";
},
_getContentHtml:function(cellInfo){var content=['<img '];
var urlAndToolTip=this._getImageInfos(cellInfo);
if(qx.core.Client.getInstance().isMshtml()&&/\.png$/i.test(urlAndToolTip.url)){content.push('src="',
this.IMG_BLANK_URL,
'" style="filter:',
"progid:DXImageTransform.Microsoft.AlphaImageLoader(src='",
urlAndToolTip.url,
"',sizingMethod='scale')",
'" ');
}else{content.push('src="',
urlAndToolTip.url,
'" ');
}
if(urlAndToolTip.imageWidth&&urlAndToolTip.imageHeight){content.push(' width="',
urlAndToolTip.imageWidth,
'px" height="',
urlAndToolTip.imageHeight,
'px" ');
}var tooltip=urlAndToolTip.tooltip;
if(tooltip!=null){content.push('title="',
tooltip,
'" ');
}content.push(">");
return content.join("");
}}});




/* ID: qx.ui.table.cellrenderer.Image */
qx.Class.define("qx.ui.table.cellrenderer.Image",
{extend:qx.ui.table.cellrenderer.Icon,
construct:function(width,
height){this.base(arguments);
if(width){this._imageWidth=width;
}else{this._imageWidth=16;
}
if(height){this._imageHeight=height;
}else{this._imageHeight=16;
}this._am=qx.io.Alias.getInstance();
},
members:{_identifyImage:function(cellInfo){var imageHints={imageWidth:this._imageWidth,
imageHeight:this._imageHeight};
if(cellInfo.value==""){imageHints.url=this.IMG_BLANK_URL;
}else{imageHints.url=this._am.resolve(cellInfo.value);
}return imageHints;
}}});




/* ID: qx.ui.splitpane.SplitPane */
qx.Class.define("qx.ui.splitpane.SplitPane",
{extend:qx.ui.layout.CanvasLayout,
construct:function(orientation,
firstSize,
secondSize){this.base(arguments);
var box=this._box=new qx.ui.layout.BoxLayout;
box.setEdge(0);
this.add(box);
this._slider=new qx.ui.splitpane.SplitPaneSlider(this);
this.add(this._slider);
this._splitter=new qx.ui.splitpane.SplitPaneSplitter(this);
this._knob=new qx.ui.splitpane.SplitPaneKnob;
this._splitter.add(this._knob);
this._firstArea=new qx.ui.layout.CanvasLayout;
this._secondArea=new qx.ui.layout.CanvasLayout;
box.add(this._firstArea,
this._splitter,
this._secondArea);
if(orientation!=null){this.setOrientation(orientation);
}if(firstSize!=null){this.setFirstSize(firstSize);
}else{this.initFirstSize();
}
if(secondSize!=null){this.setSecondSize(secondSize);
}else{this.initSecondSize();
}this.initShowKnob();
},
properties:{appearance:{refine:true,
init:"splitpane"},
showKnob:{check:"Boolean",
init:true,
apply:"_applyShowKnob",
themeable:true},
liveResize:{check:"Boolean",
init:false},
orientation:{check:["horizontal",
"vertical"],
apply:"_applyOrientation",
init:"horizontal",
nullable:true},
firstSize:{apply:"_applyFirstSize",
init:"1*"},
secondSize:{apply:"_applySecondSize",
init:"1*"},
splitterSize:{check:"Integer",
init:4,
apply:"_applySplitterSize",
themeable:true}},
members:{addLeft:function(){var c=this.getFirstArea();
return c.add.apply(c,
arguments);
},
addTop:function(){var c=this.getFirstArea();
return c.add.apply(c,
arguments);
},
addRight:function(){var c=this.getSecondArea();
return c.add.apply(c,
arguments);
},
addBottom:function(){var c=this.getSecondArea();
return c.add.apply(c,
arguments);
},
getSplitter:function(){return this._splitter;
},
getKnob:function(){return this._knob;
},
getLeftArea:function(){return this.getFirstArea();
},
getTopArea:function(){return this.getFirstArea();
},
getRightArea:function(){return this.getSecondArea();
},
getBottomArea:function(){return this.getSecondArea();
},
getFirstArea:function(){return this._firstArea;
},
getSecondArea:function(){return this._secondArea;
},
_applyShowKnob:function(value,
old){this._knob.setVisibility(value);
},
_applyOrientation:function(value,
old){this._box.setOrientation(value);
switch(old){case "horizontal":this._splitter.removeEventListener("mousedown",
this._onSplitterMouseDownX,
this);
this._splitter.removeEventListener("mousemove",
this._onSplitterMouseMoveX,
this);
this._splitter.removeEventListener("mouseup",
this._onSplitterMouseUpX,
this);
this._knob.removeEventListener("mousedown",
this._onSplitterMouseDownX,
this);
this._knob.removeEventListener("mousemove",
this._onSplitterMouseMoveX,
this);
this._knob.removeEventListener("mouseup",
this._onSplitterMouseUpX,
this);
this._splitter.removeState("horizontal");
this._knob.removeState("horizontal");
this._firstArea.setWidth(null);
this._secondArea.setWidth(null);
this._splitter.setWidth(null);
break;
case "vertical":this._splitter.removeEventListener("mousedown",
this._onSplitterMouseDownY,
this);
this._splitter.removeEventListener("mousemove",
this._onSplitterMouseMoveY,
this);
this._splitter.removeEventListener("mouseup",
this._onSplitterMouseUpY,
this);
this._knob.removeEventListener("mousedown",
this._onSplitterMouseDownY,
this);
this._knob.removeEventListener("mousemove",
this._onSplitterMouseMoveY,
this);
this._knob.removeEventListener("mouseup",
this._onSplitterMouseUpY,
this);
this._splitter.removeState("vertical");
this._knob.removeState("vertical");
this._firstArea.setHeight(null);
this._secondArea.setHeight(null);
this._splitter.setHeight(null);
break;
}
switch(value){case "horizontal":this._splitter.addEventListener("mousemove",
this._onSplitterMouseMoveX,
this);
this._splitter.addEventListener("mousedown",
this._onSplitterMouseDownX,
this);
this._splitter.addEventListener("mouseup",
this._onSplitterMouseUpX,
this);
this._knob.addEventListener("mousemove",
this._onSplitterMouseMoveX,
this);
this._knob.addEventListener("mousedown",
this._onSplitterMouseDownX,
this);
this._knob.addEventListener("mouseup",
this._onSplitterMouseUpX,
this);
this._splitter.addState("horizontal");
this._knob.addState("horizontal");
break;
case "vertical":this._splitter.addEventListener("mousedown",
this._onSplitterMouseDownY,
this);
this._splitter.addEventListener("mousemove",
this._onSplitterMouseMoveY,
this);
this._splitter.addEventListener("mouseup",
this._onSplitterMouseUpY,
this);
this._knob.addEventListener("mousedown",
this._onSplitterMouseDownY,
this);
this._knob.addEventListener("mousemove",
this._onSplitterMouseMoveY,
this);
this._knob.addEventListener("mouseup",
this._onSplitterMouseUpY,
this);
this._splitter.addState("vertical");
this._knob.addState("vertical");
break;
}this._syncFirstSize();
this._syncSecondSize();
this._syncSplitterSize();
},
_applyFirstSize:function(value,
old){this._syncFirstSize();
},
_applySecondSize:function(value,
old){this._syncSecondSize();
},
_applySplitterSize:function(value,
old){this._syncSplitterSize();
},
_syncFirstSize:function(){switch(this.getOrientation()){case "horizontal":this._firstArea.setWidth(this.getFirstSize());
break;
case "vertical":this._firstArea.setHeight(this.getFirstSize());
break;
}},
_syncSecondSize:function(){switch(this.getOrientation()){case "horizontal":this._secondArea.setWidth(this.getSecondSize());
break;
case "vertical":this._secondArea.setHeight(this.getSecondSize());
break;
}},
_syncSplitterSize:function(){switch(this.getOrientation()){case "horizontal":this._splitter.setWidth(this.getSplitterSize());
break;
case "vertical":this._splitter.setHeight(this.getSplitterSize());
break;
}},
_onSplitterMouseDownX:function(e){if(!e.isLeftButtonPressed()){return;
}this._commonMouseDown();
this.getTopLevelWidget().setGlobalCursor("col-resize");
this._slider.addState("dragging");
this._knob.addState("dragging");
this._dragMin=qx.bom.element.Location.getLeft(this._box.getElement(),
"border");
this._dragMax=this._dragMin+this._box.getInnerWidth()-this._splitter.getBoxWidth();
this._dragOffset=e.getPageX()-qx.bom.element.Location.getLeft(this._splitter.getElement());
},
_onSplitterMouseDownY:function(e){if(!e.isLeftButtonPressed()){return;
}this._commonMouseDown();
this.getTopLevelWidget().setGlobalCursor("row-resize");
this._slider.addState("dragging");
this._knob.addState("dragging");
this._dragMin=qx.bom.element.Location.getTop(this._box.getElement(),
"border");
this._dragMax=this._dragMin+this._box.getInnerHeight()-this._splitter.getBoxHeight();
this._dragOffset=e.getPageY()-qx.bom.element.Location.getTop(this._splitter.getElement());
},
_commonMouseDown:function(){this._splitter.setCapture(true);
if(!this.isLiveResize()){this._slider.setLeft(this._splitter.getOffsetLeft());
this._slider.setTop(this._splitter.getOffsetTop());
this._slider.setWidth(this._splitter.getBoxWidth());
this._slider.setHeight(this._splitter.getBoxHeight());
this._slider.show();
}},
_onSplitterMouseMoveX:function(e){if(!this._splitter.getCapture()){return;
}this.isLiveResize()?this._syncX(e):this._slider._renderRuntimeLeft(this._normalizeX(e));
e.preventDefault();
},
_onSplitterMouseMoveY:function(e){if(!this._splitter.getCapture()){return;
}this.isLiveResize()?this._syncY(e):this._slider._renderRuntimeTop(this._normalizeY(e));
e.preventDefault();
},
_onSplitterMouseUpX:function(e){if(!this._splitter.getCapture()){return;
}
if(!this.isLiveResize()){this._syncX(e);
}this._commonMouseUp();
},
_onSplitterMouseUpY:function(e){if(!this._splitter.getCapture()){return;
}
if(!this.isLiveResize()){this._syncY(e);
}this._commonMouseUp();
},
_commonMouseUp:function(){this._slider.hide();
this._splitter.setCapture(false);
this.getTopLevelWidget().setGlobalCursor(null);
this._slider.removeState("dragging");
this._knob.removeState("dragging");
},
_syncX:function(e){var first=this._normalizeX(e);
var second=this._box.getInnerWidth()-this._splitter.getBoxWidth()-first;
this._syncCommon(first,
second);
},
_syncY:function(e){var first=this._normalizeY(e);
var second=this._box.getInnerHeight()-this._splitter.getBoxHeight()-first;
this._syncCommon(first,
second);
},
_syncCommon:function(first,
second){this.setFirstSize(first+"*");
this.setSecondSize(second+"*");
},
_normalizeX:function(e){return qx.lang.Number.limit(e.getPageX()-this._dragOffset,
this._dragMin,
this._dragMax)-this._dragMin;
},
_normalizeY:function(e){return qx.lang.Number.limit(e.getPageY()-this._dragOffset,
this._dragMin,
this._dragMax)-this._dragMin;
}},
destruct:function(){this._disposeObjects("_box",
"_firstArea",
"_secondArea",
"_splitter",
"_slider",
"_knob");
}});




/* ID: qx.ui.splitpane.SplitPaneSlider */
qx.Class.define("qx.ui.splitpane.SplitPaneSlider",
{extend:qx.ui.layout.CanvasLayout,
construct:function(pane){this.base(arguments);
this.setAppearance("splitpane-slider");
this.setStyleProperty("fontSize",
"0px");
this.setStyleProperty("lineHeight",
"0px");
this.hide();
this._pane=pane;
this.initZIndex();
},
properties:{zIndex:{refine:true,
init:1e8}},
destruct:function(){this._disposeObjects("_pane");
}});




/* ID: qx.ui.splitpane.SplitPaneSplitter */
qx.Class.define("qx.ui.splitpane.SplitPaneSplitter",
{extend:qx.ui.layout.CanvasLayout,
construct:function(pane){this.base(arguments);
this.setZIndex(1000);
this.setStyleProperty("fontSize",
"0px");
this.setStyleProperty("lineHeight",
"0px");
this._pane=pane;
},
properties:{appearance:{refine:true,
init:"splitpane-splitter"}},
destruct:function(){this._disposeObjects("_pane");
}});




/* ID: qx.ui.splitpane.SplitPaneKnob */
qx.Class.define("qx.ui.splitpane.SplitPaneKnob",
{extend:qx.ui.basic.Image,
properties:{appearance:{refine:true,
init:"splitpane-knob"},
visibility:{refine:true,
init:false}}});




/* ID: qx.ui.splitpane.HorizontalSplitPane */
qx.Class.define("qx.ui.splitpane.HorizontalSplitPane",
{extend:qx.ui.splitpane.SplitPane,
construct:function(firstSize,
secondSize){this.base(arguments,
"horizontal",
firstSize,
secondSize);
}});




/* ID: qx.ui.splitpane.VerticalSplitPane */
qx.Class.define("qx.ui.splitpane.VerticalSplitPane",
{extend:qx.ui.splitpane.SplitPane,
construct:function(firstSize,
secondSize){this.base(arguments,
"vertical",
firstSize,
secondSize);
}});




/* ID: qx.ui.listview.ListView */
qx.Class.define("qx.ui.listview.ListView",
{extend:qx.ui.layout.VerticalBoxLayout,
construct:function(vData,
vColumns){this._data=vData;
this._columns=vColumns;
this.base(arguments);
this._header=new qx.ui.listview.Header(vColumns);
this._header.setParent(this);
this._frame=new qx.ui.layout.HorizontalBoxLayout;
this._frame.setParent(this);
this._frame.setHeight("1*");
this._frame.setWidth(null);
this._pane=new qx.ui.listview.ListViewPane(vData,
vColumns);
this._pane.setParent(this._frame);
this._scroll=new qx.ui.basic.ScrollBar(false);
this._scroll.setWidth("auto");
this._scroll.setParent(this._frame);
this._scroll.addEventListener("changeValue",
this._onscroll,
this);
this._resizeLine=new qx.ui.basic.Terminator;
this._resizeLine.setBackgroundColor("#D6D5D9");
this._resizeLine.setWidth(1);
this._resizeLine.setParent(this);
this.addEventListener("mousedown",
this._onmousedown);
this.initOverflow();
},
properties:{overflow:{refine:true,
init:"hidden"},
appearance:{refine:true,
init:"list-view"},
resizable:{check:"Boolean",
init:true},
liveResize:{check:"Boolean",
init:false},
sortBy:{check:"String",
apply:"_applySortBy",
nullable:true}},
members:{getData:function(){return this._data;
},
getColumns:function(){return this._columns;
},
getHeader:function(){return this._header;
},
getFrame:function(){return this._frame;
},
getPane:function(){return this._pane;
},
getScroll:function(){return this._scroll;
},
getResizeLine:function(){return this._resizeLine;
},
update:function(){this.updateScrollBar();
this.updateContent();
},
updateScrollBar:function(){this._scroll.setMaximum((this._data.length*this._pane._rowHeight)+this._pane._rowHeight);
},
updateContent:function(){this.getPane()._updateRendering(true);
},
updateLayout:function(){this.getPane()._updateLayout();
},
updateSort:function(){var vSortBy=this.getSortBy();
if(!vSortBy){return;
}var vCell=this._getHeaderCell(vSortBy);
if(vCell){vCell.updateSort();
}},
_getHeaderCell:function(vCellId){var vNewEntry=this._columns[vCellId];
return vNewEntry?vNewEntry.headerCell:null;
},
_applySortBy:function(value,
old){if(old){var vOldCell=this._getHeaderCell(old);
if(vOldCell){vOldCell.setSortOrder(null);
}}
if(value){var vNewCell=this._getHeaderCell(value);
if(vNewCell&&vNewCell.getSortOrder()==null){vNewCell.setSortOrder(qx.ui.listview.HeaderCell.C_SORT_ASCENDING);
}}},
_onscroll:function(e){this._pane._onscroll(e);
},
_onmousedown:function(e){this.getFocusRoot().setActiveChild(this.getPane());
},
_handleDisplayableCustom:function(vDisplayable,
vParent,
vHint){this.base(arguments,
vDisplayable,
vParent,
vHint);
if(vDisplayable){this.updateLayout();
this.updateScrollBar();
this.updateContent();
}}},
destruct:function(){this._disposeObjects("_header",
"_frame",
"_pane",
"_scroll",
"_resizeLine");
this._disposeFields("_columns",
"_data");
}});




/* ID: qx.ui.listview.Header */
qx.Class.define("qx.ui.listview.Header",
{extend:qx.ui.layout.HorizontalBoxLayout,
construct:function(vColumns){this.base(arguments);
this.initHeight();
this.initOverflow();
this.setPaddingRight(qx.ui.core.Widget.SCROLLBAR_SIZE);
this._columns=vColumns;
var vHeadCell,
vHeadSeparator;
for(var vCol in vColumns){vHeadCell=new qx.ui.listview.HeaderCell(vColumns[vCol],
vCol);
vHeadSeparator=new qx.ui.listview.HeaderSeparator;
this.add(vHeadCell,
vHeadSeparator);
if(vColumns[vCol].align){vHeadCell.setHorizontalChildrenAlign(vColumns[vCol].align);
if(vColumns[vCol].align=="right"){vHeadCell.setReverseChildrenOrder(true);
}}vColumns[vCol].contentClass=qx.Class.getByName("qx.ui.listview.ContentCell"+qx.lang.String.toFirstUp(vColumns[vCol].type||"text"));
vColumns[vCol].headerCell=vHeadCell;
}this.addEventListener("mousemove",
this._onmousemove);
this.addEventListener("mousedown",
this._onmousedown);
this.addEventListener("mouseup",
this._onmouseup);
this.addEventListener("mouseout",
this._onmouseout);
},
properties:{overflow:{refine:true,
init:"hidden"},
height:{refine:true,
init:"auto"},
appearance:{refine:true,
init:"list-view-header"}},
members:{_syncColumnWidth:function(vWidth){var vChildren=this.getChildren();
var vColumn=Math.ceil(vChildren.indexOf(this._resizeCell)/2);
this.getParent().getPane().setColumnWidth(vColumn,
vWidth);
},
_syncResizeLine:function(){qx.ui.core.Widget.flushGlobalQueues();
var vParent=this.getParent();
var vLine=vParent.getResizeLine();
var vLeft=qx.bom.element.Location.getLeft(this._resizeSeparator.getElement())-qx.bom.element.Location.getLeft(this.getElement(),
"border");
var vTop=qx.bom.element.Dimension.getHeight(vParent.getHeader().getElement());
var vHeight=qx.bom.element.Dimension.getHeight(vParent.getElement())-vTop;
vLine._renderRuntimeTop(vTop);
vLine._renderRuntimeHeight(vHeight);
vLine._renderRuntimeLeft(vLeft);
vLine.removeStyleProperty("visibility");
},
_onmousemove:function(e){if(!this.getParent().getResizable()){return;
}
if(this._resizingActive){if(qx.core.Variant.isSet("qx.client",
"mshtml")){if((new Date).valueOf()-this._last<50){return;
}this._last=(new Date).valueOf();
}var vNewLeft=e.getPageX();
var vSizeDiff=vNewLeft-this._resizeStart;
var vCell=this._resizeCell;
vCell.setWidth(Math.max(4,
vCell.getWidth()+vSizeDiff));
this._resizeStart=vNewLeft;
if(this.getParent().getLiveResize()){this._syncColumnWidth(vCell._computeBoxWidth());
}else{this._syncResizeLine();
}}else{var vTarget=e.getTarget();
var vEventPos=e.getPageX();
var vTargetPosLeft=qx.bom.element.Location.getLeft(vTarget.getElement());
var vTargetPosRight=vTargetPosLeft+qx.bom.element.Dimension.getWidth(vTarget.getElement());
var vResizeCursor=false;
var vResizeSeparator=null;
if(vTarget instanceof qx.ui.listview.HeaderSeparator){vResizeCursor=true;
vResizeSeparator=vTarget;
}else if((vEventPos-vTargetPosLeft)<=10){if(!vTarget.isFirstChild()){vResizeCursor=true;
vResizeSeparator=vTarget.getPreviousSibling();
}}else if((vTargetPosRight-vEventPos)<=10){vResizeCursor=true;
vResizeSeparator=vTarget.getNextSibling();
}
if(!(vResizeSeparator instanceof qx.ui.listview.HeaderSeparator)){vResizeSeparator=vTarget=vResizeCursor=null;
}else if(vResizeSeparator){var vResizeCell=vResizeSeparator.getPreviousSibling();
if(vResizeCell&&(vResizeCell._computedWidthTypePercent||vResizeCell._config.resizable==false)){vResizeSeparator=vTarget=vResizeCursor=null;
}}this.getTopLevelWidget().setGlobalCursor(vResizeCursor?"e-resize":null);
this._resizeSeparator=vResizeSeparator;
this._resizeTarget=vTarget;
}},
_onmousedown:function(e){if(!this._resizeSeparator){return;
}this._resizingActive=true;
this._resizeStart=e.getPageX();
this._resizeCell=this._resizeSeparator.getPreviousSibling();
if(!this.getParent().getLiveResize()){this._syncResizeLine();
}this.setCapture(true);
},
_onmouseup:function(e){if(!this._resizingActive){return;
}this._syncColumnWidth(this._resizeCell.getBoxWidth());
this.setCapture(false);
this.getTopLevelWidget().setGlobalCursor(null);
this._resizeTarget.removeState("over");
this.getParent().getResizeLine().setStyleProperty("visibility",
"hidden");
this._cleanupResizing();
},
_onmouseout:function(e){if(!this.getCapture()){this.getTopLevelWidget().setGlobalCursor(null);
}},
_cleanupResizing:function(){delete this._resizingActive;
delete this._resizeSeparator;
delete this._resizeTarget;
delete this._resizeStart;
delete this._resizeCell;
}},
destruct:function(){this._cleanupResizing();
this._columns=null;
}});




/* ID: qx.ui.listview.HeaderCell */
qx.Class.define("qx.ui.listview.HeaderCell",
{extend:qx.ui.basic.Atom,
construct:function(vConfig,
vId){this.base(arguments,
vConfig.label,
vConfig.icon,
vConfig.iconWidth||16,
vConfig.iconHeight||16,
vConfig.flash);
this.setStyleProperty("textOverflow",
"ellipsis");
this._config=vConfig;
this._id=vId;
this.setWidth(typeof vConfig.width==="undefined"?"auto":vConfig.width);
if(vConfig.minWidth!=null){this.setMinWidth(vConfig.minWidth);
}
if(vConfig.maxWidth!=null){this.setMaxWidth(vConfig.maxWidth);
}this.getLayoutImpl().setEnableFlexSupport(true);
this._spacer=new qx.ui.basic.HorizontalSpacer;
this._arrowup=new qx.ui.basic.Image;
this._arrowup.setAppearance("list-view-header-cell-arrow-up");
this._arrowup.setVerticalAlign("middle");
this._arrowup.setDisplay(false);
this._arrowdown=new qx.ui.basic.Image;
this._arrowdown.setAppearance("list-view-header-cell-arrow-down");
this._arrowdown.setVerticalAlign("middle");
this._arrowdown.setDisplay(false);
this.add(this._spacer,
this._arrowup,
this._arrowdown);
this.addEventListener("mouseup",
this._onmouseup);
this.addEventListener("mouseover",
this._onmouseover);
this.addEventListener("mouseout",
this._onmouseout);
this.initOverflow();
},
statics:{C_SORT_ASCENDING:"ascending",
C_SORT_DESCENDING:"descending"},
properties:{horizontalChildrenAlign:{refine:true,
init:"left"},
overflow:{refine:true,
init:"hidden"},
appearance:{refine:true,
init:"list-view-header-cell"},
sortOrder:{check:["ascending",
"descending"],
nullable:true,
apply:"_applySortOrder",
event:"changeSortOrder"}},
members:{getView:function(){return this.getParent().getParent();
},
getNextSortOrder:function(){var vCurrentSortOrder=this.getSortOrder();
switch(vCurrentSortOrder){case qx.ui.listview.HeaderCell.C_SORT_ASCENDING:return qx.ui.listview.HeaderCell.C_SORT_DESCENDING;
default:return qx.ui.listview.HeaderCell.C_SORT_ASCENDING;
}},
updateSort:function(){var vListView=this.getView();
var vData=vListView.getData();
var vFieldId=this._id;
var vSortProp=this._config.sortProp||"text";
var vSortMethod=this._config.sortMethod||qx.util.Compare.byString;
vData.sort(function(a,
b){return vSortMethod(a[vFieldId][vSortProp],
b[vFieldId][vSortProp]);
});
if(this.getSortOrder()==qx.ui.listview.HeaderCell.C_SORT_DESCENDING){vData.reverse();
}},
_applySortOrder:function(value,
old){var vListView=this.getView();
switch(value){case qx.ui.listview.HeaderCell.C_SORT_ASCENDING:this._arrowup.setDisplay(true);
this._arrowdown.setDisplay(false);
vListView.setSortBy(this._id);
break;
case qx.ui.listview.HeaderCell.C_SORT_DESCENDING:this._arrowup.setDisplay(false);
this._arrowdown.setDisplay(true);
vListView.setSortBy(this._id);
break;
default:this._arrowup.setDisplay(false);
this._arrowdown.setDisplay(false);
if(vListView.getSortBy()==this._id){vListView.setSortBy(null);
}}
if(value){this.updateSort();
vListView.update();
}},
_onmouseover:function(e){this.addState("over");
},
_onmouseout:function(e){this.removeState("over");
},
_onmouseup:function(e){if(!this._config.sortable||this.getParent()._resizeSeparator){return;
}this.setSortOrder(this.getNextSortOrder());
e.stopPropagation();
}},
destruct:function(){this._disposeObjects("_spacer",
"_arrowup",
"_arrowdown");
this._disposeFields("_config");
}});




/* ID: qx.ui.listview.HeaderSeparator */
qx.Class.define("qx.ui.listview.HeaderSeparator",
{extend:qx.ui.basic.Terminator,
properties:{appearance:{refine:true,
init:"list-view-header-separator"}}});




/* ID: qx.ui.layout.GridLayout */
qx.Class.define("qx.ui.layout.GridLayout",
{extend:qx.ui.core.Parent,
construct:function(){this.base(arguments);
this._columnData=[];
this._rowData=[];
this._spans=[];
},
properties:{horizontalSpacing:{check:"Integer",
init:0,
apply:"_applyHorizontalSpacing",
themeable:true},
verticalSpacing:{check:"Integer",
init:0,
apply:"_applyVerticalSpacing",
themeable:true},
horizontalChildrenAlign:{check:["left",
"center",
"right"],
init:"left",
apply:"_applyHorizontalChildrenAlign",
themeable:true},
verticalChildrenAlign:{check:["top",
"middle",
"bottom"],
init:"top",
apply:"_applyVerticalChildrenAlign",
themeable:true},
cellPaddingTop:{check:"Integer",
nullable:true},
cellPaddingRight:{check:"Integer",
nullable:true,
themeable:true},
cellPaddingBottom:{check:"Integer",
nullable:true,
themeable:true},
cellPaddingLeft:{check:"Integer",
nullable:true,
themeable:true}},
members:{_applyHorizontalSpacing:function(value,
old){this.addToQueueRuntime("horizontalSpacing");
this._invalidatePreferredInnerDimensions();
},
_applyVerticalSpacing:function(value,
old){this.addToQueueRuntime("verticalSpacing");
this._invalidatePreferredInnerDimensions();
},
_applyHorizontalChildrenAlign:function(value,
old){this.addToQueueRuntime("horizontalChildrenAlign");
this._invalidatePreferredInnerDimensions();
},
_applyVerticalChildrenAlign:function(value,
old){this.addToQueueRuntime("verticalChildrenAlign");
this._invalidatePreferredInnerDimensions();
},
_createLayoutImpl:function(){return new qx.ui.layout.impl.GridLayoutImpl(this);
},
add:function(vChild,
vCol,
vRow){vChild._col=vCol;
vChild._row=vRow;
if(this.isFillCell(vCol,
vRow)){throw new Error("Could not insert child "+vChild+" into a fill cell: "+vCol+"x"+vRow);
}this.base(arguments,
vChild);
},
_syncDataFields:function(vData,
vOldLength,
vNewLength){if(vNewLength>vOldLength){for(var i=vOldLength;i<vNewLength;i++){vData[i]={};
}}else if(vOldLength>vNewLength){vData.splice(vNewLength,
vOldLength-vNewLength);
}},
_columnCount:0,
setColumnCount:function(vCount){this._columnCount=vCount;
this._syncColumnDataFields();
},
getColumnCount:function(){return this._columnCount;
},
addColumn:function(){this._columnCount++;
this._syncColumnDataFields();
},
removeColumn:function(){if(this._columnCount>0){this._columnCount--;
this._syncColumnDataFields();
}},
_syncColumnDataFields:function(){var vData=this._columnData;
var vOldLength=vData.length;
var vNewLength=this._columnCount;
this._syncDataFields(vData,
vOldLength,
vNewLength);
},
_rowCount:0,
setRowCount:function(vCount){this._rowCount=vCount;
this._syncRowDataFields();
},
getRowCount:function(){return this._rowCount;
},
addRow:function(){this._rowCount++;
this._syncRowDataFields();
},
removeRow:function(){if(this._rowCount>0){this._rowCount--;
this._syncRowDataFields();
}},
_syncRowDataFields:function(){var vData=this._rowData;
var vOldLength=vData.length;
var vNewLength=this._rowCount;
this._syncDataFields(vData,
vOldLength,
vNewLength);
},
_getColumnProperty:function(vColumnIndex,
vProperty){try{return this._columnData[vColumnIndex][vProperty]||null;
}catch(ex){this.error("Error while getting column property ("+vColumnIndex+"|"+vProperty+")",
ex);
return null;
}},
_setupColumnProperty:function(vColumnIndex,
vProperty,
vValue){this._columnData[vColumnIndex][vProperty]=vValue;
this._invalidateColumnLayout();
},
_removeColumnProperty:function(vColumnIndex,
vProperty,
vValue){delete this._columnData[vColumnIndex][vProperty];
this._invalidateColumnLayout();
},
_invalidateColumnLayout:function(){if(!this._initialLayoutDone||!this._isDisplayable){return;
}this.forEachVisibleChild(function(){this.addToQueue("width");
});
},
_getRowProperty:function(vRowIndex,
vProperty){try{return this._rowData[vRowIndex][vProperty]||null;
}catch(ex){this.error("Error while getting row property ("+vRowIndex+"|"+vProperty+")",
ex);
return null;
}},
_setupRowProperty:function(vRowIndex,
vProperty,
vValue){this._rowData[vRowIndex][vProperty]=vValue;
this._invalidateRowLayout();
},
_removeRowProperty:function(vRowIndex,
vProperty,
vValue){delete this._rowData[vRowIndex][vProperty];
this._invalidateRowLayout();
},
_invalidateRowLayout:function(){if(!this._initialLayoutDone||!this._isDisplayable){return;
}this.forEachVisibleChild(function(){this.addToQueue("height");
});
},
setColumnWidth:function(vIndex,
vValue){this._setupColumnProperty(vIndex,
"widthValue",
vValue);
var vType=qx.ui.core.Parent.prototype._evalUnitsPixelPercentAutoFlex(vValue);
this._setupColumnProperty(vIndex,
"widthType",
vType);
var vParsed,
vComputed;
switch(vType){case qx.ui.core.Widget.TYPE_PIXEL:vParsed=vComputed=Math.round(vValue);
break;
case qx.ui.core.Widget.TYPE_PERCENT:case qx.ui.core.Widget.TYPE_FLEX:vParsed=parseFloat(vValue);
vComputed=null;
break;
case qx.ui.core.Widget.TYPE_AUTO:vParsed=vComputed=null;
break;
default:vParsed=vComputed=null;
}this._setupColumnProperty(vIndex,
"widthParsed",
vParsed);
this._setupColumnProperty(vIndex,
"widthComputed",
vComputed);
},
setRowHeight:function(vIndex,
vValue){this._setupRowProperty(vIndex,
"heightValue",
vValue);
var vType=qx.ui.core.Widget.prototype._evalUnitsPixelPercentAutoFlex(vValue);
this._setupRowProperty(vIndex,
"heightType",
vType);
var vParsed,
vComputed;
switch(vType){case qx.ui.core.Widget.TYPE_PIXEL:vParsed=vComputed=Math.round(vValue);
break;
case qx.ui.core.Widget.TYPE_PERCENT:case qx.ui.core.Widget.TYPE_FLEX:vParsed=parseFloat(vValue);
vComputed=null;
break;
case qx.ui.core.Widget.TYPE_AUTO:vParsed=vComputed=null;
break;
default:vParsed=vComputed=null;
}this._setupRowProperty(vIndex,
"heightParsed",
vParsed);
this._setupRowProperty(vIndex,
"heightComputed",
vComputed);
},
getColumnBoxWidth:function(vIndex){var vComputed=this._getColumnProperty(vIndex,
"widthComputed");
if(vComputed!=null){return vComputed;
}var vType=this._getColumnProperty(vIndex,
"widthType");
var vParsed=this._getColumnProperty(vIndex,
"widthParsed");
var vComputed=null;
switch(vType){case qx.ui.core.Widget.TYPE_PIXEL:vComputed=Math.max(0,
vParsed);
break;
case qx.ui.core.Widget.TYPE_PERCENT:vComputed=this.getInnerWidth()*Math.max(0,
vParsed)*0.01;
break;
case qx.ui.core.Widget.TYPE_AUTO:vComputed=null;
break;
case qx.ui.core.Widget.TYPE_FLEX:vComputed=null;
break;
}this._setupColumnProperty(vIndex,
"widthComputed",
vComputed);
return vComputed;
},
getRowBoxHeight:function(vIndex){var vComputed=this._getRowProperty(vIndex,
"heightComputed");
if(vComputed!=null){return vComputed;
}var vType=this._getRowProperty(vIndex,
"heightType");
var vParsed=this._getRowProperty(vIndex,
"heightParsed");
var vComputed=null;
switch(vType){case qx.ui.core.Widget.TYPE_PIXEL:vComputed=Math.max(0,
vParsed);
break;
case qx.ui.core.Widget.TYPE_PERCENT:vComputed=this.getInnerHeight()*Math.max(0,
vParsed)*0.01;
break;
case qx.ui.core.Widget.TYPE_AUTO:vComputed=null;
break;
case qx.ui.core.Widget.TYPE_FLEX:vComputed=null;
break;
}this._setupRowProperty(vIndex,
"heightComputed",
vComputed);
return vComputed;
},
getComputedCellPaddingLeft:function(vCol,
vRow){return this.getColumnPaddingLeft(vCol)||this.getRowPaddingLeft(vRow)||this.getCellPaddingLeft()||0;
},
getComputedCellPaddingRight:function(vCol,
vRow){return this.getColumnPaddingRight(vCol)||this.getRowPaddingRight(vRow)||this.getCellPaddingRight()||0;
},
getComputedCellPaddingTop:function(vCol,
vRow){return this.getRowPaddingTop(vRow)||this.getColumnPaddingTop(vCol)||this.getCellPaddingTop()||0;
},
getComputedCellPaddingBottom:function(vCol,
vRow){return this.getRowPaddingBottom(vRow)||this.getColumnPaddingBottom(vCol)||this.getCellPaddingBottom()||0;
},
getColumnInnerWidth:function(vCol,
vRow){return this.getColumnBoxWidth(vCol)-this.getComputedCellPaddingLeft(vCol,
vRow)-this.getComputedCellPaddingRight(vCol,
vRow);
},
getRowInnerHeight:function(vCol,
vRow){return this.getRowBoxHeight(vRow)-this.getComputedCellPaddingTop(vCol,
vRow)-this.getComputedCellPaddingBottom(vCol,
vRow);
},
setColumnHorizontalAlignment:function(vIndex,
vValue){this._setupColumnProperty(vIndex,
"horizontalAlignment",
vValue);
},
setColumnVerticalAlignment:function(vIndex,
vValue){this._setupColumnProperty(vIndex,
"verticalAlignment",
vValue);
},
setRowHorizontalAlignment:function(vIndex,
vValue){this._setupRowProperty(vIndex,
"horizontalAlignment",
vValue);
},
setRowVerticalAlignment:function(vIndex,
vValue){this._setupRowProperty(vIndex,
"verticalAlignment",
vValue);
},
getColumnHorizontalAlignment:function(vIndex){return this._getColumnProperty(vIndex,
"horizontalAlignment");
},
getColumnVerticalAlignment:function(vIndex){return this._getColumnProperty(vIndex,
"verticalAlignment");
},
getRowHorizontalAlignment:function(vIndex){return this._getRowProperty(vIndex,
"horizontalAlignment");
},
getRowVerticalAlignment:function(vIndex){return this._getRowProperty(vIndex,
"verticalAlignment");
},
setColumnPaddingTop:function(vIndex,
vValue){this._setupColumnProperty(vIndex,
"paddingTop",
vValue);
},
setColumnPaddingRight:function(vIndex,
vValue){this._setupColumnProperty(vIndex,
"paddingRight",
vValue);
},
setColumnPaddingBottom:function(vIndex,
vValue){this._setupColumnProperty(vIndex,
"paddingBottom",
vValue);
},
setColumnPaddingLeft:function(vIndex,
vValue){this._setupColumnProperty(vIndex,
"paddingLeft",
vValue);
},
setRowPaddingTop:function(vIndex,
vValue){this._setupRowProperty(vIndex,
"paddingTop",
vValue);
},
setRowPaddingRight:function(vIndex,
vValue){this._setupRowProperty(vIndex,
"paddingRight",
vValue);
},
setRowPaddingBottom:function(vIndex,
vValue){this._setupRowProperty(vIndex,
"paddingBottom",
vValue);
},
setRowPaddingLeft:function(vIndex,
vValue){this._setupRowProperty(vIndex,
"paddingLeft",
vValue);
},
getColumnPaddingTop:function(vIndex){return this._getColumnProperty(vIndex,
"paddingTop");
},
getColumnPaddingRight:function(vIndex){return this._getColumnProperty(vIndex,
"paddingRight");
},
getColumnPaddingBottom:function(vIndex){return this._getColumnProperty(vIndex,
"paddingBottom");
},
getColumnPaddingLeft:function(vIndex){return this._getColumnProperty(vIndex,
"paddingLeft");
},
getRowPaddingTop:function(vIndex){return this._getRowProperty(vIndex,
"paddingTop");
},
getRowPaddingRight:function(vIndex){return this._getRowProperty(vIndex,
"paddingRight");
},
getRowPaddingBottom:function(vIndex){return this._getRowProperty(vIndex,
"paddingBottom");
},
getRowPaddingLeft:function(vIndex){return this._getRowProperty(vIndex,
"paddingLeft");
},
_changeInnerWidth:function(vNew,
vOld){for(var i=0,
l=this.getColumnCount();i<l;i++){if(this._getColumnProperty(i,
"widthType")==qx.ui.core.Widget.TYPE_PERCENT){this._setupColumnProperty(i,
"widthComputed",
null);
}}this.base(arguments,
vNew,
vOld);
},
_changeInnerHeight:function(vNew,
vOld){for(var i=0,
l=this.getRowCount();i<l;i++){if(this._getRowProperty(i,
"heightType")==qx.ui.core.Widget.TYPE_PERCENT){this._setupRowProperty(i,
"heightComputed",
null);
}}this.base(arguments,
vNew,
vOld);
},
getInnerWidthForChild:function(vChild){return this._getColumnProperty(vChild._col,
"widthComputed");
},
getInnerHeightForChild:function(vChild){return this._getRowProperty(vChild._row,
"heightComputed");
},
mergeCells:function(vStartCol,
vStartRow,
vColLength,
vRowLength){var vSpans=this._spans;
var vEndCol=vStartCol+vColLength-1;
var vEndRow=vStartRow+vRowLength-1;
if(this._collidesWithSpans(vStartCol,
vStartRow,
vEndCol,
vEndRow)){this.debug("Span collision detected!");
return false;
}vSpans.push({startCol:vStartCol,
startRow:vStartRow,
endCol:vEndCol,
endRow:vEndRow,
colLength:vColLength,
rowLength:vRowLength});
return true;
},
hasSpans:function(){return this._spans.length>0;
},
getSpanEntry:function(vCol,
vRow){for(var i=0,
s=this._spans,
l=s.length,
c;i<l;i++){c=s[i];
if(vCol>=c.startCol&&vCol<=c.endCol&&vRow>=c.startRow&&vRow<=c.endRow){return c;
}}return null;
},
isSpanStart:function(vCol,
vRow){for(var i=0,
s=this._spans,
l=s.length,
c;i<l;i++){c=s[i];
if(c.startCol==vCol&&c.startRow==vRow){return true;
}}return false;
},
isSpanCell:function(vCol,
vRow){for(var i=0,
s=this._spans,
l=s.length,
c;i<l;i++){c=s[i];
if(vCol>=c.startCol&&vCol<=c.endCol&&vRow>=c.startRow&&vRow<=c.endRow){return true;
}}return false;
},
isFillCell:function(vCol,
vRow){for(var i=0,
s=this._spans,
l=s.length,
c;i<l;i++){c=s[i];
if(vCol>=c.startCol&&vCol<=c.endCol&&vRow>=c.startRow&&vRow<=c.endRow&&(vCol>c.startCol||vRow>c.startRow)){return true;
}}return false;
},
_collidesWithSpans:function(vStartCol,
vStartRow,
vEndCol,
vEndRow){for(var i=0,
s=this._spans,
l=s.length,
c;i<l;i++){c=s[i];
if(vEndCol>=c.startCol&&vStartCol<=c.endCol&&vEndRow>=c.startRow&&vStartRow<=c.endRow){return true;
}}return false;
}},
destruct:function(){this._disposeFields("_columnData",
"_rowData",
"_spans");
}});




/* ID: qx.ui.layout.impl.GridLayoutImpl */
qx.Class.define("qx.ui.layout.impl.GridLayoutImpl",
{extend:qx.ui.layout.impl.LayoutImpl,
construct:function(vWidget){this.base(arguments,
vWidget);
},
members:{computeChildBoxWidth:function(vChild){var vWidget=this.getWidget();
var vColWidth=vWidget.getColumnInnerWidth(vChild._col,
vChild._row);
if(vWidget.isSpanStart(vChild._col,
vChild._row)){var vEntry=vWidget.getSpanEntry(vChild._col,
vChild._row);
for(var i=1;i<vEntry.colLength;i++){vColWidth+=vWidget.getComputedCellPaddingRight(vChild._col+i-1,
vChild._row);
vColWidth+=vWidget.getComputedCellPaddingLeft(vChild._col+i,
vChild._row);
vColWidth+=vWidget.getHorizontalSpacing();
vColWidth+=vWidget.getColumnInnerWidth(vChild._col+i,
vChild._row);
}}return vChild.getAllowStretchX()?vColWidth:Math.min(vChild.getWidthValue(),
vColWidth);
},
computeChildBoxHeight:function(vChild){var vWidget=this.getWidget();
var vRowHeight=vWidget.getRowInnerHeight(vChild._col,
vChild._row);
if(vWidget.isSpanStart(vChild._col,
vChild._row)){var vEntry=vWidget.getSpanEntry(vChild._col,
vChild._row);
for(var i=1;i<vEntry.rowLength;i++){vRowHeight+=vWidget.getComputedCellPaddingBottom(vChild._col,
vChild._row+i-1);
vRowHeight+=vWidget.getComputedCellPaddingTop(vChild._col,
vChild._row+i);
vRowHeight+=vWidget.getVerticalSpacing();
vRowHeight+=vWidget.getRowInnerHeight(vChild._col,
vChild._row+i);
}}return vChild.getAllowStretchY()?vRowHeight:Math.min(vChild.getHeightValue(),
vRowHeight);
},
computeChildrenNeededWidth:function(){var vWidget=this.getWidget();
var vSpacingX=vWidget.getHorizontalSpacing();
var vSum=-vSpacingX;
for(var i=0,
l=vWidget.getColumnCount();i<l;i++){vSum+=vWidget.getColumnBoxWidth(i)+vSpacingX;
}return vSum;
},
computeChildrenNeededHeight:function(){var vWidget=this.getWidget();
var vSpacingY=vWidget.getVerticalSpacing();
var vSum=-vSpacingY;
for(var i=0,
l=vWidget.getRowCount();i<l;i++){vSum+=vWidget.getRowBoxHeight(i)+vSpacingY;
}return vSum;
},
updateChildOnInnerWidthChange:function(vChild){vChild._recomputePercentX();
vChild.addToLayoutChanges("locationX");
return true;
},
updateChildOnInnerHeightChange:function(vChild){vChild._recomputePercentY();
vChild.addToLayoutChanges("locationY");
return true;
},
layoutChild:function(vChild,
vJobs){this.layoutChild_sizeX(vChild,
vJobs);
this.layoutChild_sizeY(vChild,
vJobs);
this.layoutChild_sizeLimitX(vChild,
vJobs);
this.layoutChild_sizeLimitY(vChild,
vJobs);
this.layoutChild_marginX(vChild,
vJobs);
this.layoutChild_marginY(vChild,
vJobs);
this.layoutChild_locationX(vChild,
vJobs);
this.layoutChild_locationY(vChild,
vJobs);
},
layoutChild_sizeX:function(vChild,
vJobs){vChild._renderRuntimeWidth(vChild.getBoxWidth());
},
layoutChild_sizeY:function(vChild,
vJobs){vChild._renderRuntimeHeight(vChild.getBoxHeight());
},
layoutChild_locationX:function(vChild,
vJobs){var vWidget=this.getWidget();
var vSpacingX=vWidget.getHorizontalSpacing();
var vLocSumX=vWidget.getPaddingLeft()+vWidget.getComputedCellPaddingLeft(vChild._col,
vChild._row);
for(var i=0;i<vChild._col;i++){vLocSumX+=vWidget.getColumnBoxWidth(i)+vSpacingX;
}
switch(vChild.getHorizontalAlign()||vWidget.getColumnHorizontalAlignment(vChild._col)||vWidget.getRowHorizontalAlignment(vChild._row)||vWidget.getHorizontalChildrenAlign()){case "center":vLocSumX+=Math.round((vWidget.getColumnInnerWidth(vChild._col,
vChild._row)-vChild.getBoxWidth())/2);
break;
case "right":vLocSumX+=vWidget.getColumnInnerWidth(vChild._col,
vChild._row)-vChild.getBoxWidth();
break;
}vChild._renderRuntimeLeft(vLocSumX);
},
layoutChild_locationY:function(vChild,
vJobs){var vWidget=this.getWidget();
var vSpacingY=vWidget.getVerticalSpacing();
var vLocSumY=vWidget.getPaddingTop()+vWidget.getComputedCellPaddingTop(vChild._col,
vChild._row);
for(var i=0;i<vChild._row;i++){vLocSumY+=vWidget.getRowBoxHeight(i)+vSpacingY;
}
switch(vChild.getVerticalAlign()||vWidget.getRowVerticalAlignment(vChild._row)||vWidget.getColumnVerticalAlignment(vChild._col)||vWidget.getVerticalChildrenAlign()){case "middle":vLocSumY+=Math.round((vWidget.getRowInnerHeight(vChild._col,
vChild._row)-vChild.getBoxHeight())/2);
break;
case "bottom":vLocSumY+=vWidget.getRowInnerHeight(vChild._col,
vChild._row)-vChild.getBoxHeight();
break;
}vChild._renderRuntimeTop(vLocSumY);
}}});




/* ID: qx.ui.listview.ListViewPane */
qx.Class.define("qx.ui.listview.ListViewPane",
{extend:qx.ui.layout.GridLayout,
construct:function(vData,
vColumns){this.base(arguments);
this._data=vData;
this._columns=vColumns;
this._manager=new qx.ui.listview.SelectionManager(this);
this.addEventListener("mousewheel",
this._onmousewheel);
this.addEventListener("mouseover",
this._onmouseover);
this.addEventListener("mousedown",
this._onmousedown);
this.addEventListener("mouseup",
this._onmouseup);
this.addEventListener("click",
this._onclick);
this.addEventListener("dblclick",
this._ondblclick);
this.addEventListener("keypress",
this._onkeypress);
this.initWidth();
this.initOverflow();
},
properties:{width:{refine:true,
init:"1*"},
overflow:{refine:true,
init:"hidden"},
appearance:{refine:true,
init:"list-view-pane"}},
members:{_rowHeight:16,
getView:function(){return this.getParent().getParent();
},
_lastRowCount:0,
_updateLayout:function(vUpdate){if(qx.ui.core.Widget._inFlushGlobalQueues){qx.client.Timer.once(function(){this._updateLayoutReal(vUpdate);
this._updateRendering();
},
this,
0);
}else{this._updateLayoutReal(vUpdate);
}},
_updateLayoutReal:function(vUpdate){var vColumns=this._columns;
if(this._cachedInnerHeight){var vRowCount=Math.ceil(this._cachedInnerHeight/this._rowHeight);
}else{var vRowCount=0;
}var vCell;
if(vRowCount>this._lastRowCount){for(var i=this._lastRowCount,
j=0;i<vRowCount;i++,
j=0){for(var vCol in vColumns){vCell=new vColumns[vCol].contentClass;
this.add(vCell,
j++,
i);
if(vColumns[vCol].align){vCell.setStyleProperty("textAlign",
vColumns[vCol].align);
}}}}else if(this._lastRowCount>vRowCount){var vChildren=this.getChildren();
var vChildrenLength=vChildren.length-1;
for(var i=this._lastRowCount;i>vRowCount;i--){for(var vCol in vColumns){vCell=vChildren[vChildrenLength--];
this.remove(vCell);
vCell.dispose();
}}}this.setRowCount(vRowCount);
if(!vUpdate){this.setColumnCount(qx.lang.Object.getLength(vColumns));
}for(var i=0;i<vRowCount;i++){this.setRowHeight(i,
this._rowHeight);
}
if(!vUpdate){var vCount=0;
for(var vCol in vColumns){this.setColumnHorizontalAlignment(vCount,
vColumns[vCol].align);
this.setColumnWidth(vCount,
vColumns[vCol].width);
vCount++;
}}this._lastRowCount=vRowCount;
},
_currentScrollTop:-1,
_updateRendering:function(vForce){if(this._updatingRendering){return;
}var vScrollTop=(this._initialLayoutDone?this.getView().getScroll().getValue():0);
this._updatingRendering=true;
this._currentScrollTop=vScrollTop;
for(var i=0;i<this._rowCount;i++){this._updateRow(i);
}delete this._updatingRendering;
},
_updateRow:function(vRelativeRow){var vData=this._data;
var vRowOffset=Math.floor(this._currentScrollTop/this._rowHeight);
var vColumnCount=this.getColumnCount();
var vColumns=this._columns;
var vChildren=this.getVisibleChildren();
var vChild,
vEntry,
vCol;
var j=0;
for(vCol in vColumns){vEntry=vData[vRowOffset+vRelativeRow];
vChild=vChildren[vColumnCount*vRelativeRow+(j++)];
if(vChild){if(vEntry&&vEntry._selected){vChild.addState("selected");
}else{vChild.removeState("selected");
}
if(vEntry&&vEntry._lead){vChild.addState("lead");
}else{vChild.removeState("lead");
}vChild.set(vEntry?vEntry[vCol]:vColumns[vCol].empty||vColumns[vCol].contentClass.empty);
}}},
_onscroll:function(e){this._updateRendering();
},
_changeInnerHeight:function(vNew,
vOld){this._updateLayout(true);
this._updateRendering(true);
return this.base(arguments,
vNew,
vOld);
},
getManager:function(){return this._manager;
},
getListViewTarget:function(e){var vEventTop=e.getPageY();
var vPaneTop=qx.bom.element.Location.getTop(this.getElement(),
"border");
var vItemNo=Math.floor(this._currentScrollTop/this._rowHeight)+Math.floor((vEventTop-vPaneTop)/this._rowHeight);
return this._data[vItemNo];
},
getSelectedItem:function(){return this.getSelectedItems()[0];
},
getSelectedItems:function(){return this._manager.getSelectedItems();
},
getData:function(){return this._data;
},
getItemHeight:function(vItem){return this._rowHeight;
},
getItemWidth:function(vItem){return qx.html.Dimension.getInnerWidth(this.getElement());
},
getItemLeft:function(vItem){return 0;
},
getItemTop:function(vItem){return this._data.indexOf(vItem)*this._rowHeight;
},
_onmousewheel:function(e){var vScroll=this.getView().getScroll();
vScroll.setValue(vScroll.getValue()-(e.getWheelDelta()*20));
qx.event.handler.EventHandler.stopDomEvent(e);
},
_onmouseover:function(e){var vTarget=this.getListViewTarget(e);
if(vTarget){this._manager.handleMouseOver(vTarget,
e);
}},
_onmousedown:function(e){var vTarget=this.getListViewTarget(e);
if(vTarget){this._manager.handleMouseDown(vTarget,
e);
}},
_onmouseup:function(e){var vTarget=this.getListViewTarget(e);
if(vTarget){this._manager.handleMouseUp(vTarget,
e);
}},
_onclick:function(e){var vTarget=this.getListViewTarget(e);
if(vTarget){this._manager.handleClick(vTarget,
e);
}},
_ondblclick:function(e){var vTarget=this.getListViewTarget(e);
if(vTarget){this._manager.handleDblClick(vTarget,
e);
}},
_onkeypress:function(e){this._manager.handleKeyPress(e);
e.preventDefault();
},
_updateSelectionState:function(vItem,
vIsSelected){vItem._selected=vIsSelected;
this._updateItem(vItem);
},
_updateAnchorState:function(vItem,
vIsAnchor){vItem._anchor=vIsAnchor;
this._updateItem(vItem);
},
_updateLeadState:function(vItem,
vIsLead){vItem._lead=vIsLead;
this._updateItem(vItem);
},
scrollItemIntoView:function(vItem,
vAlignLeftTop){this.scrollItemIntoViewX(vItem,
vAlignLeftTop);
this.scrollItemIntoViewY(vItem,
vAlignLeftTop);
},
scrollItemIntoViewX:function(vItem,
vAlignLeft){},
scrollItemIntoViewY:function(vItem,
vAlignTop){var vItems=this._data;
var vOffset=vItems.indexOf(vItem)*this._rowHeight;
var vHeight=this._rowHeight;
var vParentHeight=(Math.floor(this.getClientHeight()/this._rowHeight)*this._rowHeight);
var vParentScrollTop=this._currentScrollTop;
var vNewScrollTop=null;
if(vAlignTop){vNewScrollTop=vOffset;
}else if(vAlignTop==false){vNewScrollTop=vOffset+vHeight-vParentHeight;
}else if(vHeight>vParentHeight||vOffset<vParentScrollTop){vNewScrollTop=vOffset;
}else if((vOffset+vHeight)>(vParentScrollTop+vParentHeight)){vNewScrollTop=vOffset+vHeight-vParentHeight;
}
if(vNewScrollTop!=null){this.getView().getScroll().setValue(vNewScrollTop);
}},
setScrollTop:function(vScrollTop){this.getView().getScroll().setValue(vScrollTop);
this._updateRendering();
},
getScrollTop:function(){return this._currentScrollTop;
},
setScrollLeft:function(){this.error("Not implemented in qx.ui.listview.ListViewPane!");
},
getScrollLeft:function(){return 0;
},
isItemVisible:function(vItem){var vIndex=this._data.indexOf(vItem);
var vRowStart=Math.floor(this._currentScrollTop/this._rowHeight);
var vRowLength=Math.ceil(this.getClientHeight()/this._rowHeight);
return vIndex>=vRowStart&&vIndex<=(vRowStart+vRowLength);
},
getRelativeItemPosition:function(vItem){var vIndex=this._data.indexOf(vItem);
var vRowStart=Math.floor(this._currentScrollTop/this._rowHeight);
return vIndex-vRowStart;
},
_updateItem:function(vItem){var vIndex=this._data.indexOf(vItem);
var vRowStart=Math.floor(this._currentScrollTop/this._rowHeight);
var vRowLength=Math.ceil(this.getClientHeight()/this._rowHeight);
if(vIndex<vRowStart||vIndex>(vRowStart+vRowLength)){return;
}this._updateRow(vIndex-vRowStart);
}},
destruct:function(){this._disposeObjects("_manager");
this._disposeFields("_data",
"_columns");
}});




/* ID: qx.ui.listview.SelectionManager */
qx.Class.define("qx.ui.listview.SelectionManager",
{extend:qx.ui.selection.SelectionManager,
construct:function(vBoundedWidget){this.base(arguments,
vBoundedWidget);
},
members:{getFirst:function(){return qx.lang.Array.getFirst(this.getItems());
},
getLast:function(){return qx.lang.Array.getLast(this.getItems());
},
getItems:function(){return this.getBoundedWidget().getData();
},
getNextSibling:function(vItem){var vData=this.getItems();
return vData[vData.indexOf(vItem)+1];
},
getPreviousSibling:function(vItem){var vData=this.getItems();
return vData[vData.indexOf(vItem)-1];
},
getItemHashCode:function(oItem){if(oItem._hash){return oItem._hash;
}return oItem._hash=qx.core.Object.toHashCode(oItem);
},
scrollItemIntoView:function(vItem,
vTopLeft){this.getBoundedWidget().scrollItemIntoView(vItem,
vTopLeft);
},
getItemLeft:function(vItem){return this.getBoundedWidget().getItemLeft(vItem);
},
getItemTop:function(vItem){return this.getBoundedWidget().getItemTop(vItem);
},
getItemWidth:function(vItem){return this.getBoundedWidget().getItemWidth(vItem);
},
getItemHeight:function(vItem){return this.getBoundedWidget().getItemHeight(vItem);
},
getItemEnabled:function(vItem){return true;
},
renderItemSelectionState:function(vItem,
vIsSelected){this.getBoundedWidget()._updateSelectionState(vItem,
vIsSelected);
},
renderItemAnchorState:function(vItem,
vIsAnchor){this.getBoundedWidget()._updateAnchorState(vItem,
vIsAnchor);
},
renderItemLeadState:function(vItem,
vIsLead){this.getBoundedWidget()._updateLeadState(vItem,
vIsLead);
}}});




/* ID: qx.ui.listview.ContentCellHtml */
qx.Class.define("qx.ui.listview.ContentCellHtml",
{extend:qx.ui.embed.HtmlEmbed,
construct:function(vHtml){this.base(arguments,
vHtml);
this.initSelectable();
},
statics:{empty:{html:""}},
properties:{selectable:{refine:true,
init:false},
appearance:{refine:true,
init:"list-view-content-cell-html"}}});




/* ID: qx.ui.embed.IconHtmlEmbed */
qx.Class.define("qx.ui.embed.IconHtmlEmbed",
{extend:qx.ui.embed.HtmlEmbed,
construct:function(vHtml,
vIcon,
vIconWidth,
vIconHeight){this.base(arguments,
vHtml);
if(vIcon!=null){this.setIcon(vIcon);
}
if(vIconWidth!=null){this.setIconWidth(vIconWidth);
}
if(vIconHeight!=null){this.setIconHeight(vIconHeight);
}},
properties:{icon:{check:"String",
init:"",
apply:"_applyHtml"},
iconWidth:{check:"Number",
init:0,
apply:"_applyHtml"},
iconHeight:{check:"Integer",
init:0,
apply:"_applyHtml"},
spacing:{check:"Number",
init:4,
apply:"_applyHtml"}},
members:{_syncHtml:function(){var vHtml=[];
var vIsPng=/\.png$/i.test(this.getIcon());
var vSource;
if(qx.util.Validation.isValidString(this.getIcon())){vHtml.push("<img src=\"");
if(qx.core.Variant.isSet("qx.client",
"mshtml")&&vIsPng){vSource="static/image/blank.gif";
}else{vSource=this.getIcon();
}vHtml.push(qx.io.Alias.getInstance().resolve(vSource));
vHtml.push("\" style=\"vertical-align:middle;");
if(this.getSpacing()!=null){vHtml.push("margin-right:");
vHtml.push(this.getSpacing());
vHtml.push("px;");
}
if(this.getIconWidth()!=null){vHtml.push("width:");
vHtml.push(this.getIconWidth());
vHtml.push("px;");
}
if(this.getIconHeight()!=null){vHtml.push("height:");
vHtml.push(this.getIconHeight());
vHtml.push("px;");
}
if(qx.core.Variant.isSet("qx.client",
"mshtml")){if(vIsPng){vHtml.push("filter:");
vHtml.push("progid:DXImageTransform.Microsoft.AlphaImageLoader(src='");
vHtml.push(qx.io.Alias.getInstance().resolve(this.getIcon()));
vHtml.push("',sizingMethod='scale')");
vHtml.push(";");
}}vHtml.push("\"/>");
}
if(qx.util.Validation.isValidString(this.getHtml())){vHtml.push(this.getHtml());
}this.getElement().innerHTML=vHtml.join("");
}}});




/* ID: qx.ui.listview.ContentCellIconHtml */
qx.Class.define("qx.ui.listview.ContentCellIconHtml",
{extend:qx.ui.embed.IconHtmlEmbed,
construct:function(vHtml,
vIcon,
vIconWidth,
vIconHeight){this.base(arguments,
vHtml,
vIcon,
vIconWidth,
vIconHeight);
this.initSelectable();
},
statics:{empty:{icon:"",
html:""}},
properties:{selectable:{refine:true,
init:false},
appearance:{refine:true,
init:"list-view-content-cell-icon-html"}}});




/* ID: qx.ui.listview.ContentCellImage */
qx.Class.define("qx.ui.listview.ContentCellImage",
{extend:qx.ui.basic.Image,
construct:function(vSource,
vWidth,
vHeight){this.base(arguments,
vSource,
vWidth,
vHeight);
},
statics:{empty:{source:"static/image/blank.gif"}},
properties:{appearance:{refine:true,
init:"list-view-content-cell-image"}},
members:{setSource:function(vSource){if(this._initialLayoutDone){return this._updateContent(qx.io.Alias.getInstance().resolve(vSource==""?"static/image/blank.gif":vSource));
}else{return qx.ui.basic.Image.prototype.setSource.call(this,
vSource);
}},
_postApplyDimensions:qx.lang.Function.returnTrue}});




/* ID: qx.ui.embed.LinkEmbed */
qx.Class.define("qx.ui.embed.LinkEmbed",
{extend:qx.ui.embed.HtmlEmbed,
construct:function(vHtml,
vUri,
vTarget){this.base(arguments,
vHtml);
if(vUri!=null){this.setUri(vUri);
}
if(vTarget!=null){this.setTarget(vTarget);
}},
properties:{uri:{check:"String",
init:"#",
apply:"_applyHtml"},
target:{check:"String",
init:"_blank",
apply:"_applyHtml"}},
members:{_syncHtml:function(){var vHtml=[];
vHtml.push("<a target='");
vHtml.push(this.getTarget());
vHtml.push("' href='");
vHtml.push(this.getUri());
vHtml.push("'>");
vHtml.push(this.getHtml());
vHtml.push("</a>");
this._getTargetNode().innerHTML=vHtml.join("");
}}});




/* ID: qx.ui.listview.ContentCellLink */
qx.Class.define("qx.ui.listview.ContentCellLink",
{extend:qx.ui.embed.LinkEmbed,
construct:function(vHtml){this.base(arguments,
vHtml);
this.initSelectable();
},
statics:{selectable:{refine:true,
init:true},
empty:{html:"",
uri:"#"}},
properties:{appearance:{refine:true,
init:"list-view-content-cell-link"}}});




/* ID: qx.ui.embed.TextEmbed */
qx.Class.define("qx.ui.embed.TextEmbed",
{extend:qx.ui.basic.Terminator,
construct:function(vText){this.base(arguments);
if(vText!=null){this.setText(vText);
}this.initWrap();
},
properties:{text:{check:"String",
init:"",
apply:"_applyText",
event:"changeText"},
textAlign:{check:["left",
"center",
"right",
"justify"],
nullable:true,
themeable:true,
apply:"_applyTextAlign"},
wrap:{check:"Boolean",
init:false,
nullable:true,
apply:"_applyWrap"}},
members:{_applyText:function(){if(this._isCreated){this._syncText();
}},
_applyTextAlign:function(value,
old){value===null?this.removeStyleProperty("textAlign"):this.setStyleProperty("textAlign",
value);
},
_applyFont:function(value,
old){qx.theme.manager.Font.getInstance().connect(this._styleFont,
this,
value);
},
_styleFont:function(value){value?value.render(this):qx.ui.core.Font.reset(this);
},
_applyTextColor:function(value,
old){qx.theme.manager.Color.getInstance().connect(this._styleTextColor,
this,
value);
},
_styleTextColor:function(value){value?this.setStyleProperty("color",
value):this.removeStyleProperty("color");
},
_applyWrap:function(value,
old){value==null?this.removeStyleProperty("whiteSpace"):this.setStyleProperty("whiteSpace",
value?"normal":"nowrap");
},
_applyElementData:function(){this._getTargetNode().appendChild(document.createTextNode(this.getText()));
},
_syncText:function(){this._getTargetNode().firstChild.nodeValue=this.getText();
}}});




/* ID: qx.ui.listview.ContentCellText */
qx.Class.define("qx.ui.listview.ContentCellText",
{extend:qx.ui.embed.TextEmbed,
construct:function(vText){this.base(arguments,
vText);
this.setStyleProperty("whiteSpace",
"nowrap");
this.setStyleProperty("textOverflow",
"ellipsis");
this.initSelectable();
},
statics:{empty:{text:""}},
properties:{selectable:{refine:true,
init:false},
appearance:{refine:true,
init:"list-view-content-cell-text"}}});




/* ID: qx.ui.groupbox.GroupBox */
qx.Class.define("qx.ui.groupbox.GroupBox",
{extend:qx.ui.layout.CanvasLayout,
construct:function(vLegend,
vIcon){this.base(arguments);
this._createFrameObject();
this._createLegendObject();
this.setLegend(vLegend||"");
if(vIcon!=null){this.setIcon(vIcon);
}this.remapChildrenHandlingTo(this._frameObject);
},
properties:{appearance:{refine:true,
init:"group-box"}},
members:{_createLegendObject:function(){this._legendObject=new qx.ui.basic.Atom;
this._legendObject.setAppearance("group-box-legend");
this.add(this._legendObject);
},
_createFrameObject:function(){this._frameObject=new qx.ui.layout.CanvasLayout;
this._frameObject.setAppearance("group-box-frame");
this.add(this._frameObject);
},
getFrameObject:function(){return this._frameObject;
},
getLegendObject:function(){return this._legendObject;
},
setLegend:function(vLegend){if(vLegend!==""&&vLegend!==null){this._legendObject.setLabel(vLegend);
this._legendObject.setDisplay(true);
}else{this._legendObject.setDisplay(false);
}},
getLegend:function(){return this._legendObject.getLabel();
},
setIcon:function(vIcon){this._legendObject.setIcon(vIcon);
},
getIcon:function(){this._legendObject.getIcon();
}},
destruct:function(){this._disposeObjects("_legendObject",
"_frameObject");
}});




/* ID: qx.ui.form.ComboBox */
qx.Class.define("qx.ui.form.ComboBox",
{extend:qx.ui.layout.HorizontalBoxLayout,
construct:function(){this.base(arguments);
var l=this._list=new qx.ui.form.List;
l.setAppearance("combo-box-list");
l.setTabIndex(-1);
l.setEdge(0);
var m=this._manager=this._list.getManager();
m.setMultiSelection(false);
m.setDragSelection(false);
var p=this._popup=new qx.ui.popup.Popup;
p.setAppearance("combo-box-popup");
p.setRestrictToPageLeft(-100000);
p.setRestrictToPageRight(-100000);
p.setAutoHide(false);
p.setHeight("auto");
p.add(l);
var f=this._field=new qx.ui.form.TextField;
f.setAppearance("combo-box-text-field");
f.setTabIndex(-1);
f.setWidth("1*");
f.setAllowStretchY(true);
f.setHeight(null);
this.add(f);
var b=this._button=new qx.ui.basic.Atom;
b.setAppearance("combo-box-button");
b.setAllowStretchY(true);
b.setTabIndex(-1);
b.setHeight(null);
this.add(b);
this.addEventListener("mousedown",
this._onmousedown);
this.addEventListener("mouseup",
this._onmouseup);
this.addEventListener("click",
this._onclick);
this.addEventListener("mouseover",
this._onmouseover);
this.addEventListener("mousewheel",
this._onmousewheel);
this.addEventListener("keydown",
this._onkeydown);
this.addEventListener("keypress",
this._onkeypress);
this.addEventListener("keyinput",
this._onkeyinput);
this.addEventListener("beforeDisappear",
this._onbeforedisappear);
this._popup.addEventListener("appear",
this._onpopupappear,
this);
this._field.addEventListener("input",
this._oninput,
this);
qx.locale.Manager.getInstance().addEventListener("changeLocale",
this._onlocalechange,
this);
var vDoc=qx.ui.core.ClientDocument.getInstance();
vDoc.addEventListener("windowblur",
this._testClosePopup,
this);
this.remapChildrenHandlingTo(l);
this.initEditable();
this.initTabIndex();
this.initWidth();
this.initHeight();
this.initMinWidth();
},
events:{"beforeInitialOpen":"qx.event.type.Event"},
properties:{appearance:{refine:true,
init:"combo-box"},
allowStretchY:{refine:true,
init:false},
width:{refine:true,
init:120},
height:{refine:true,
init:"auto"},
minWidth:{refine:true,
init:40},
tabIndex:{refine:true,
init:1},
editable:{check:"Boolean",
apply:"_applyEditable",
event:"changeEditable",
init:false},
selected:{check:"qx.ui.form.ListItem",
nullable:true,
apply:"_applySelected",
event:"changeSelected"},
value:{check:"String",
nullable:true,
apply:"_applyValue",
event:"changeValue"},
pagingInterval:{check:"Integer",
init:10}},
members:{getManager:function(){return this._manager;
},
getPopup:function(){return this._popup;
},
getList:function(){return this._list;
},
getField:function(){return this._field;
},
getButton:function(){return this._button;
},
_applySelected:function(value,
old){this._fromSelected=true;
if(!this._fromValue){this.setValue(value?value.getLabel().toString():"");
}this._manager.setLeadItem(value);
this._manager.setAnchorItem(value);
if(value){this._manager.setSelectedItem(value);
}else{this._manager.deselectAll();
}delete this._fromSelected;
},
_applyValue:function(value,
old){this._fromValue=true;
if(!this._fromInput){if(this._field.getValue()==value){this._field.setValue(null);
}this._field.setValue(value);
}if(!this._fromSelected){var vSelItem=this._list.findStringExact(value);
if(vSelItem!=null&&!vSelItem.getEnabled()){vSelItem=null;
}this.setSelected(vSelItem);
}delete this._fromValue;
},
_applyEditable:function(value,
old){var f=this._field;
f.setReadOnly(!value);
f.setCursor(value?null:"default");
f.setSelectable(value);
},
_oldSelected:null,
_openPopup:function(){var p=this._popup;
var el=this.getElement();
if(!p.isCreated()){this.createDispatchEvent("beforeInitialOpen");
}
if(this._list.getChildrenLength()==0){return;
}p.positionRelativeTo(el,
1,
qx.html.Dimension.getBoxHeight(el));
p.setWidth(this.getBoxWidth()-2);
p.setParent(this.getTopLevelWidget());
p.show();
this._oldSelected=this.getSelected();
this.setCapture(true);
},
_closePopup:function(){this._popup.hide();
this.setCapture(false);
},
_testClosePopup:function(){if(this._popup.isSeeable()){this._closePopup();
}},
_togglePopup:function(){this._popup.isSeeable()?this._closePopup():this._openPopup();
},
_onpopupappear:function(e){var vSelItem=this.getSelected();
if(vSelItem){vSelItem.scrollIntoView();
}},
_oninput:function(e){this._fromInput=true;
this.setValue(this._field.getComputedValue());
if(this.getPopup().isSeeable()&&this.getSelected()){this.getSelected().scrollIntoView();
}delete this._fromInput;
},
_onbeforedisappear:function(e){this._testClosePopup();
},
_onlocalechange:function(e){var selected=this.getSelected();
this._applySelected(selected,
selected);
},
_onmousedown:function(e){if(!e.isLeftButtonPressed()){return;
}var vTarget=e.getTarget();
switch(vTarget){case this._field:if(this.getEditable()){break;
}case this._button:this._button.addState("pressed");
this._togglePopup();
this.setCapture(true);
break;
default:break;
}e.stopPropagation();
},
_onclick:function(e){if(!e.isLeftButtonPressed()){return;
}var vTarget=e.getTarget();
switch(vTarget){case this._field:case this._button:case this:case this._list:break;
default:if(vTarget instanceof qx.ui.form.ListItem&&vTarget.getParent()==this._list){this._list._onmousedown(e);
this.setSelected(this._list.getSelectedItem());
this._closePopup();
this.setFocused(true);
}else if(this._popup.isSeeable()){this._popup.hide();
this.setCapture(false);
}}},
_onmouseup:function(e){this._button.removeState("pressed");
if(!this._popup.isSeeable()){this.setCapture(false);
}},
_onmouseover:function(e){var vTarget=e.getTarget();
if(vTarget instanceof qx.ui.form.ListItem){var vManager=this._manager;
vManager.deselectAll();
vManager.setLeadItem(vTarget);
vManager.setAnchorItem(vTarget);
vManager.setSelectedItem(vTarget);
}},
_onmousewheel:function(e){if(!this._popup.isSeeable()){var toSelect;
var isSelected=this.getSelected();
if(e.getWheelDelta()<0){toSelect=isSelected?this._manager.getNext(isSelected):this._manager.getFirst();
}else{toSelect=isSelected?this._manager.getPrevious(isSelected):this._manager.getLast();
}
if(toSelect){this.setSelected(toSelect);
}}else{var vTarget=e.getTarget();
if(vTarget!=this&&vTarget.getParent()!=this._list){this._popup.hide();
this.setCapture(false);
}}},
_onkeydown:function(e){var vManager=this._manager;
var vVisible=this._popup.isSeeable();
switch(e.getKeyIdentifier()){case "Enter":if(vVisible){this.setSelected(this._manager.getSelectedItem());
this._closePopup();
this.setFocused(true);
}else{this._openPopup();
}return;
case "Escape":if(vVisible){vManager.setLeadItem(this._oldSelected);
vManager.setAnchorItem(this._oldSelected);
vManager.setSelectedItem(this._oldSelected);
this._field.setValue(this._oldSelected?this._oldSelected.getLabel():"");
this._closePopup();
this.setFocused(true);
}return;
case "Down":if(e.isAltPressed()){this._togglePopup();
return;
}break;
}},
_onkeypress:function(e){var vVisible=this._popup.isSeeable();
var vManager=this._manager;
switch(e.getKeyIdentifier()){case "PageUp":if(!vVisible){var vPrevious;
var vTemp=this.getSelected();
if(vTemp){var vInterval=this.getPagingInterval();
do{vPrevious=vTemp;
}while(--vInterval&&(vTemp=vManager.getPrevious(vPrevious)));
}else{vPrevious=vManager.getLast();
}this.setSelected(vPrevious);
return;
}break;
case "PageDown":if(!vVisible){var vNext;
var vTemp=this.getSelected();
if(vTemp){var vInterval=this.getPagingInterval();
do{vNext=vTemp;
}while(--vInterval&&(vTemp=vManager.getNext(vNext)));
}else{vNext=vManager.getFirst();
}this.setSelected(vNext||null);
return;
}break;
}if(!this.isEditable()||vVisible){this._list._onkeypress(e);
var vSelected=this._manager.getSelectedItem();
if(!vVisible){this.setSelected(vSelected);
}else if(vSelected){this._field.setValue(vSelected.getLabel());
}}},
_onkeyinput:function(e){var vVisible=this._popup.isSeeable();
if(!this.isEditable()||vVisible){this._list._onkeyinput(e);
var vSelected=this._manager.getSelectedItem();
if(!vVisible){this.setSelected(vSelected);
}else if(vSelected){this._field.setValue(vSelected.getLabel());
}}},
_visualizeBlur:function(){this.getField()._visualizeBlur();
this.removeState("focused");
},
_visualizeFocus:function(){this.getField()._visualizeFocus();
this.getField().selectAll();
this.addState("focused");
}},
destruct:function(){if(this._popup&&!qx.core.Object.inGlobalDispose()){this._popup.setParent(null);
}var vDoc=qx.ui.core.ClientDocument.getInstance();
vDoc.removeEventListener("windowblur",
this._testClosePopup,
this);
var vMgr=qx.locale.Manager.getInstance();
vMgr.removeEventListener("changeLocale",
this._onlocalechange,
this);
this._disposeObjects("_popup",
"_list",
"_manager",
"_field",
"_button");
}});




/* ID: qx.ui.form.List */
qx.Class.define("qx.ui.form.List",
{extend:qx.ui.layout.VerticalBoxLayout,
construct:function(){this.base(arguments);
this._manager=new qx.ui.selection.SelectionManager(this);
this.addEventListener("mouseover",
this._onmouseover);
this.addEventListener("mousedown",
this._onmousedown);
this.addEventListener("mouseup",
this._onmouseup);
this.addEventListener("click",
this._onclick);
this.addEventListener("dblclick",
this._ondblclick);
this.addEventListener("keydown",
this._onkeydown);
this.addEventListener("keypress",
this._onkeypress);
this.addEventListener("keyinput",
this._onkeyinput);
this.initOverflow();
this.initTabIndex();
},
properties:{appearance:{refine:true,
init:"list"},
overflow:{refine:true,
init:"hidden"},
tabIndex:{refine:true,
init:1},
enableInlineFind:{check:"Boolean",
init:true},
markLeadingItem:{check:"Boolean",
init:false}},
members:{_pressedString:"",
getManager:function(){return this._manager;
},
getListItemTarget:function(vItem){while(vItem!=null&&vItem.getParent()!=this){vItem=vItem.getParent();
}return vItem;
},
getSelectedItem:function(){return this.getSelectedItems()[0]||null;
},
getSelectedItems:function(){return this._manager.getSelectedItems();
},
_onmouseover:function(e){var vItem=this.getListItemTarget(e.getTarget());
if(vItem){this._manager.handleMouseOver(vItem,
e);
}},
_onmousedown:function(e){var vItem=this.getListItemTarget(e.getTarget());
if(vItem){this._manager.handleMouseDown(vItem,
e);
}},
_onmouseup:function(e){var vItem=this.getListItemTarget(e.getTarget());
if(vItem){this._manager.handleMouseUp(vItem,
e);
}},
_onclick:function(e){var vItem=this.getListItemTarget(e.getTarget());
if(vItem){this._manager.handleClick(vItem,
e);
}},
_ondblclick:function(e){var vItem=this.getListItemTarget(e.getTarget());
if(vItem){this._manager.handleDblClick(vItem,
e);
}},
_onkeydown:function(e){if(e.getKeyIdentifier()=="Enter"&&!e.isAltPressed()){var items=this.getSelectedItems();
for(var i=0;i<items.length;i++){items[i].createDispatchEvent("action");
}}},
_onkeypress:function(e){this._manager.handleKeyPress(e);
},
_lastKeyPress:0,
_onkeyinput:function(e){if(!this.getEnableInlineFind()){return;
}if(((new Date).valueOf()-this._lastKeyPress)>1000){this._pressedString="";
}this._pressedString+=String.fromCharCode(e.getCharCode());
var matchedItem=this.findString(this._pressedString,
null);
if(matchedItem){var oldVal=this._manager._getChangeValue();
var oldFireChange=this._manager.getFireChange();
this._manager.setFireChange(false);
this._manager._deselectAll();
this._manager.setItemSelected(matchedItem,
true);
this._manager.setAnchorItem(matchedItem);
this._manager.setLeadItem(matchedItem);
matchedItem.scrollIntoView();
this._manager.setFireChange(oldFireChange);
if(oldFireChange&&this._manager._hasChanged(oldVal)){this._manager._dispatchChange();
}}this._lastKeyPress=(new Date).valueOf();
e.preventDefault();
},
_findItem:function(vUserValue,
vStartIndex,
vType){var vAllItems=this.getChildren();
if(vStartIndex==null){vStartIndex=vAllItems.indexOf(this.getSelectedItem());
if(vStartIndex==-1){vStartIndex=0;
}}var methodName="matches"+vType;
for(var i=vStartIndex;i<vAllItems.length;i++){if(vAllItems[i][methodName](vUserValue)){return vAllItems[i];
}}for(var i=0;i<vStartIndex;i++){if(vAllItems[i][methodName](vUserValue)){return vAllItems[i];
}}return null;
},
findString:function(vText,
vStartIndex){return this._findItem(vText,
vStartIndex||0,
"String");
},
findStringExact:function(vText,
vStartIndex){return this._findItem(vText,
vStartIndex||0,
"StringExact");
},
findValue:function(vText,
vStartIndex){return this._findItem(vText,
vStartIndex||0,
"Value");
},
findValueExact:function(vText,
vStartIndex){return this._findItem(vText,
vStartIndex||0,
"ValueExact");
},
_sortItemsCompare:function(a,
b){return a.key<b.key?-1:a.key==b.key?0:1;
},
sortItemsByString:function(vReverse){var sortitems=[];
var items=this.getChildren();
for(var i=0,
l=items.length;i<l;i++){sortitems[i]={key:items[i].getLabel(),
item:items[i]};
}sortitems.sort(this._sortItemsCompare);
if(vReverse){sortitems.reverse();
}
for(var i=0;i<l;i++){this.addAt(sortitems[i].item,
i);
}},
sortItemsByValue:function(vReverse){var sortitems=[];
var items=this.getChildren();
for(var i=0,
l=items.length;i<l;i++){sortitems[i]={key:items[i].getValue(),
item:items[i]};
}sortitems.sort(this._sortItemsCompare);
if(vReverse){sortitems.reverse();
}
for(var i=0;i<l;i++){this.addAt(sortitems[i].item,
i);
}}},
destruct:function(){this._disposeObjects("_manager");
}});




/* ID: qx.ui.form.ListItem */
qx.Class.define("qx.ui.form.ListItem",
{extend:qx.ui.basic.Atom,
construct:function(vText,
vIcon,
vValue){this.base(arguments,
vText,
vIcon);
if(vValue!=null){this.setValue(vValue);
}this.addEventListener("dblclick",
this._ondblclick);
this.initMinWidth();
},
events:{"action":"qx.event.type.Event"},
properties:{appearance:{refine:true,
init:"list-item"},
minWidth:{refine:true,
init:"auto"},
width:{refine:true,
init:null},
allowStretchX:{refine:true,
init:true},
value:{check:"String",
event:"changeValue"}},
members:{handleStateChange:function(){if(this.hasState("lead")){this.setStyleProperty("MozOutline",
"1px dotted invert");
this.setStyleProperty("outline",
"1px dotted invert");
}else{this.removeStyleProperty("MozOutline");
this.setStyleProperty("outline",
"0px none");
}},
_applyStateStyleFocus:function(vStates){},
matchesString:function(vText){vText=String(vText);
return vText!=""&&this.getLabel().toString().toLowerCase().indexOf(vText.toLowerCase())==0;
},
matchesStringExact:function(vText){vText=String(vText);
return vText!=""&&this.getLabel().toString().toLowerCase()==String(vText).toLowerCase();
},
matchesValue:function(vText){vText=String(vText);
return vText!=""&&this.getValue().toLowerCase().indexOf(vText.toLowerCase())==0;
},
matchesValueExact:function(vText){vText=String(vText);
return vText!=""&&this.getValue().toLowerCase()==String(vText).toLowerCase();
},
_ondblclick:function(e){var vCommand=this.getCommand();
if(vCommand){vCommand.execute();
}}}});




/* ID: qx.ui.form.RadioButton */
qx.Class.define("qx.ui.form.RadioButton",
{extend:qx.ui.form.CheckBox,
construct:function(vText,
vValue,
vName,
vChecked){this.base(arguments,
vText,
vValue,
vName,
vChecked);
this.addEventListener("keypress",
this._onkeypress);
},
properties:{appearance:{refine:true,
init:"radio-button"},
manager:{check:"qx.ui.selection.RadioManager",
nullable:true,
apply:"_applyManager"}},
members:{INPUT_TYPE:"radio",
_applyChecked:function(value,
old){if(this._iconObject){this._iconObject.setChecked(value);
}var vManager=this.getManager();
if(vManager){vManager.handleItemChecked(this,
value);
}},
_applyManager:function(value,
old){if(old){old.remove(this);
}
if(value){value.add(this);
}},
_applyName:function(value,
old){if(this._iconObject){this._iconObject.setName(value);
}
if(this.getManager()){this.getManager().setName(value);
}},
_applyValue:function(value,
old){if(this.isCreated()&&this._iconObject){this._iconObject.setValue(value);
}},
_onkeydown:function(e){if(e.getKeyIdentifier()=="Enter"&&!e.isAltPressed()){this.setChecked(true);
}},
_onkeypress:function(e){switch(e.getKeyIdentifier()){case "Left":case "Up":qx.event.handler.FocusHandler.mouseFocus=false;
qx.event.handler.FocusHandler.mouseFocus=false;
return this.getManager()?this.getManager().selectPrevious(this):true;
case "Right":case "Down":qx.event.handler.FocusHandler.mouseFocus=false;
return this.getManager()?this.getManager().selectNext(this):true;
}},
_onclick:function(e){this.setChecked(true);
},
_onkeyup:function(e){if(e.getKeyIdentifier()=="Space"){this.setChecked(true);
}}}});




/* ID: qx.ui.form.Spinner */
qx.Class.define("qx.ui.form.Spinner",
{extend:qx.ui.layout.HorizontalBoxLayout,
construct:function(vMin,
vValue,
vMax){this.base(arguments);
if(qx.core.Variant.isSet("qx.client",
"mshtml")){this.setStyleProperty("fontSize",
"0px");
}this._textfield=new qx.ui.form.TextField;
this._textfield.setBorder(null);
this._textfield.setWidth("1*");
this._textfield.setAllowStretchY(true);
this._textfield.setHeight(null);
this._textfield.setLiveUpdate(true);
this._textfield.setVerticalAlign("middle");
this._textfield.setAppearance("spinner-text-field");
this.add(this._textfield);
this._buttonlayout=new qx.ui.layout.VerticalBoxLayout;
this._buttonlayout.setWidth("auto");
this.add(this._buttonlayout);
this._upbutton=new qx.ui.basic.Image;
this._upbutton.setAppearance("spinner-button-up");
this._upbutton.setHeight("1*");
this._buttonlayout.add(this._upbutton);
this._downbutton=new qx.ui.basic.Image;
this._downbutton.setAppearance("spinner-button-down");
this._downbutton.setHeight("1*");
this._buttonlayout.add(this._downbutton);
this._timer=new qx.client.Timer(this.getInterval());
this.setManager(new qx.util.range.Range());
this.initWrap();
this.addEventListener("keypress",
this._onkeypress,
this);
this.addEventListener("keydown",
this._onkeydown,
this);
this.addEventListener("keyup",
this._onkeyup,
this);
this.addEventListener("mousewheel",
this._onmousewheel,
this);
this._textfield.addEventListener("changeValue",
this._ontextchange,
this);
this._textfield.addEventListener("input",
this._oninput,
this);
this._textfield.addEventListener("blur",
this._onblur,
this);
this._upbutton.addEventListener("mousedown",
this._onmousedown,
this);
this._downbutton.addEventListener("mousedown",
this._onmousedown,
this);
this._timer.addEventListener("interval",
this._oninterval,
this);
if(vMin!=null){this.setMin(vMin);
}
if(vMax!=null){this.setMax(vMax);
}
if(vValue!=null){this.setValue(vValue);
}this._checkValue=this.__checkValue;
this._numberFormat=null;
this.initWidth();
this.initHeight();
this._last_value="";
},
events:{"change":"qx.event.type.DataEvent"},
properties:{appearance:{refine:true,
init:"spinner"},
width:{refine:true,
init:60},
height:{refine:true,
init:22},
incrementAmount:{check:"Number",
init:1,
apply:"_applyIncrementAmount"},
wheelIncrementAmount:{check:"Number",
init:1},
pageIncrementAmount:{check:"Number",
init:10},
interval:{check:"Integer",
init:100},
firstInterval:{check:"Integer",
init:500},
minTimer:{check:"Integer",
init:20},
timerDecrease:{check:"Integer",
init:2},
amountGrowth:{check:"Number",
init:1.01},
wrap:{check:"Boolean",
init:false,
apply:"_applyWrap"},
editable:{check:"Boolean",
init:true,
apply:"_applyEditable"},
manager:{check:"qx.util.range.IRange",
apply:"_applyManager",
dispose:true},
checkValueFunction:{apply:"_applyCheckValueFunction"},
numberFormat:{check:"qx.util.format.NumberFormat",
apply:"_applyNumberFormat"},
selectTextOnInteract:{check:"Boolean",
init:true}},
members:{_applyIncrementAmount:function(value,
old){this._computedIncrementAmount=value;
},
_applyEditable:function(value,
old){if(this._textfield){this._textfield.setReadOnly(!value);
}},
_applyWrap:function(value,
old){this.getManager().setWrap(value);
this._onchange();
},
_applyManager:function(value,
old){if(old){old.removeEventListener("change",
this._onchange,
this);
}
if(value){value.addEventListener("change",
this._onchange,
this);
}this._onchange();
},
_applyCheckValueFunction:function(value,
old){this._checkValue=value;
},
_applyNumberFormat:function(value,
old){this._numberFormat=value;
this.getManager().setPrecision(value.getMaximumFractionDigits());
this._onchange();
},
_computePreferredInnerWidth:function(){return 50;
},
_computePreferredInnerHeight:function(){return 14;
},
_onkeypress:function(e){var vIdentifier=e.getKeyIdentifier();
if(vIdentifier=="Enter"&&!e.isAltPressed()){this._checkValue(true,
false);
if(this.getSelectTextOnInteract()){this._textfield.selectAll();
}}else{switch(vIdentifier){case "Up":case "Down":case "Left":case "Right":case "Shift":case "Control":case "Alt":case "Escape":case "Delete":case "Backspace":case "Insert":case "Home":case "End":case "PageUp":case "PageDown":case "NumLock":case "Tab":break;
default:if((vIdentifier>="0"&&vIdentifier<="9")||(vIdentifier=='-')){return;
}
if(this._numberFormat){var locale=this._numberFormat._locale;
if((vIdentifier==qx.locale.Number.getGroupSeparator(locale))||(vIdentifier==qx.locale.Number.getDecimalSeparator(locale)))return;
}if(e.getModifiers()==0){e.preventDefault();
}}}},
_onkeydown:function(e){var vIdentifier=e.getKeyIdentifier();
if(this._intervalIncrease==null){switch(vIdentifier){case "Up":case "Down":this._intervalIncrease=vIdentifier=="Up";
this._intervalMode="single";
this._resetIncrements();
this._checkValue(true,
false);
this._increment();
this._timer.startWith(this.getFirstInterval());
break;
case "PageUp":case "PageDown":this._intervalIncrease=vIdentifier=="PageUp";
this._intervalMode="page";
this._resetIncrements();
this._checkValue(true,
false);
this._pageIncrement();
this._timer.startWith(this.getFirstInterval());
break;
}}},
_onkeyup:function(e){if(this._intervalIncrease!=null){switch(e.getKeyIdentifier()){case "Up":case "Down":case "PageUp":case "PageDown":this._timer.stop();
this._intervalIncrease=null;
this._intervalMode=null;
}}},
_onmousedown:function(e){if(!e.isLeftButtonPressed()){return;
}this._checkValue(true);
var vButton=e.getCurrentTarget();
vButton.addState("pressed");
vButton.addEventListener("mouseup",
this._onmouseup,
this);
vButton.addEventListener("mouseout",
this._onmouseup,
this);
this._intervalIncrease=vButton==this._upbutton;
this._resetIncrements();
this._increment();
if(this.getSelectTextOnInteract()){this._textfield.selectAll();
}this._timer.setInterval(this.getFirstInterval());
this._timer.start();
},
_onmouseup:function(e){var vButton=e.getCurrentTarget();
vButton.removeState("pressed");
vButton.removeEventListener("mouseup",
this._onmouseup,
this);
vButton.removeEventListener("mouseout",
this._onmouseup,
this);
if(this.getSelectTextOnInteract()){this._textfield.selectAll();
}this._textfield.setFocused(true);
this._timer.stop();
this._intervalIncrease=null;
},
_onmousewheel:function(e){this._checkValue(true);
if(this.getManager().incrementValue){this.getManager().incrementValue(this.getWheelIncrementAmount()*e.getWheelDelta());
}else{var value=this.getManager().getValue()+(this.getWheelIncrementAmount()*e.getWheelDelta());
value=this.getManager().limit(value);
this.getManager().setValue(value);
}this._textfield.selectAll();
},
_ontextchange:function(e){this._last_value=e.getOldValue();
},
_oninput:function(e){this._checkValue(true,
true);
},
_onchange:function(e){var vValue=this.getManager().getValue();
if(this._numberFormat){this._textfield.setValue(this._numberFormat.format(vValue));
}else{this._textfield.setValue(String(vValue));
}
if(vValue==this.getMin()&&!this.getWrap()){this._downbutton.removeState("pressed");
this._downbutton.setEnabled(false);
this._timer.stop();
}else{this._downbutton.resetEnabled();
}
if(vValue==this.getMax()&&!this.getWrap()){this._upbutton.removeState("pressed");
this._upbutton.setEnabled(false);
this._timer.stop();
}else{this._upbutton.resetEnabled();
}this.createDispatchDataEvent("change",
vValue);
},
_onblur:function(e){this._checkValue(false);
},
setValue:function(nValue){this.getManager().setValue(this.getManager().limit(nValue));
},
getValue:function(){this._checkValue(true);
return this.getManager().getValue();
},
resetValue:function(){this.getManager().resetValue();
},
setMax:function(vMax){return this.getManager().setMax(vMax);
},
getMax:function(){return this.getManager().getMax();
},
setMin:function(vMin){return this.getManager().setMin(vMin);
},
getMin:function(){return this.getManager().getMin();
},
_intervalIncrease:null,
_oninterval:function(e){this._timer.stop();
this.setInterval(Math.max(this.getMinTimer(),
this.getInterval()-this.getTimerDecrease()));
if(this._intervalMode=="page"){this._pageIncrement();
}else{if(this.getInterval()==this.getMinTimer()){this._computedIncrementAmount=this.getAmountGrowth()*this._computedIncrementAmount;
}this._increment();
}var wrap=this.getManager().getWrap();
switch(this._intervalIncrease){case true:if(this.getValue()==this.getMax()&&!wrap){return;
}case false:if(this.getValue()==this.getMin()&&!wrap){return;
}}this._timer.restartWith(this.getInterval());
},
__checkValue:function(acceptEmpty,
acceptEdit){var el=this._textfield.getInputElement();
if(!el){return;
}
if((el.value=="")||(el.value=="-")){if(!acceptEmpty){this.resetValue();
return;
}}else{var str_val=el.value;
var parsable_str;
if(this._numberFormat){var groupSepEsc=qx.lang.String.escapeRegexpChars(qx.locale.Number.getGroupSeparator(this._numberFormat._locale)+"");
var decimalSepEsc=qx.lang.String.escapeRegexpChars(qx.locale.Number.getDecimalSeparator(this._numberFormat._locale)+"");
parsable_str=str_val.replace(new RegExp(decimalSepEsc),
".");
parsable_str=parsable_str.replace(new RegExp(groupSepEsc,
"g"),
"");
}else{parsable_str=str_val;
}var val=parseFloat(parsable_str);
var limitedVal=this.getManager().limit(val);
var oldValue=this.getManager().getValue();
var fixedVal=limitedVal;
if(isNaN(val)||(limitedVal!=val)||(val!=parsable_str)){if(acceptEdit){this._textfield.setValue(this._last_value);
}else{if(isNaN(limitedVal)){fixedVal=oldValue;
}else{fixedVal=limitedVal;
}}}
if(acceptEdit)return;
var formattedValue;
if(this._numberFormat){formattedValue=this._numberFormat.format(fixedVal);
}else{formattedValue=String(fixedVal);
}
if((fixedVal===oldValue)&&(str_val!==formattedValue)){this._textfield.setValue(formattedValue);
}this.getManager().setValue(fixedVal);
}},
_increment:function(){if(this.getManager().incrementValue){this.getManager().incrementValue((this._intervalIncrease?1:-1)*this._computedIncrementAmount);
}else{var value=this.getManager().getValue()+((this._intervalIncrease?1:-1)*this._computedIncrementAmount);
value=this.getManager().limit(value);
this.getManager().setValue(value);
}},
_pageIncrement:function(){if(this.getManager().pageIncrementValue){this.getManager().pageIncrementValue();
}else{var value=this.getManager().getValue()+((this._intervalIncrease?1:-1)*this.getPageIncrementAmount());
value=this.getManager().limit(value);
this.getManager().setValue(value);
}},
_resetIncrements:function(){this._computedIncrementAmount=this.getIncrementAmount();
this.resetInterval();
}},
destruct:function(){var mgr=this.getManager();
if(mgr){mgr.dispose();
}this._disposeObjects("_textfield",
"_buttonlayout",
"_upbutton",
"_downbutton",
"_timer");
}});




/* ID: qx.util.range.IRange */
qx.Interface.define("qx.util.range.IRange",
{properties:{value:{},
min:{},
max:{},
wrap:{}},
members:{limit:function(value){return true;
}}});




/* ID: qx.util.range.Range */
qx.Class.define("qx.util.range.Range",
{extend:qx.core.Target,
implement:[qx.util.range.IRange],
events:{"change":"qx.event.type.Event"},
properties:{value:{check:"!isNaN(value)&&value>=this.getMin()&&value<=this.getMax()",
nullable:true,
event:"change",
init:0},
precision:{check:"Integer",
nullable:true,
event:"change",
init:0},
min:{check:"Number",
apply:"_applyMin",
event:"change",
init:0},
max:{check:"Number",
apply:"_applyMax",
event:"change",
init:100},
wrap:{check:"Boolean",
init:false}},
members:{_applyMax:function(value,
old){this.setValue(Math.min(this.getValue(),
value));
},
_applyMin:function(value,
old){this.setValue(Math.max(this.getValue(),
value));
},
limit:function(value){var precision=this.getPrecision();
if(precision!=null)var mover=Math.pow(10,
precision);
if(this.getWrap()){if(precision!=null){var value=Math.round(value*mover)/mover;
}
if(value<this.getMin()){return (this.getMax()-(this.getMin()-value))+1;
}
if(value>this.getMax()){return (this.getMin()+(value-this.getMax()))-1;
}}
if(value<this.getMin()){return this.getMin();
}
if(value>this.getMax()){return this.getMax();
}
if(precision!=null){return Math.round(value*mover)/mover;
}else{return value;
}}}});




/* ID: qx.io.remote.Rpc */
qx.Class.define("qx.io.remote.Rpc",
{extend:qx.core.Target,
construct:function(url,
serviceName){this.base(arguments);
if(url!==undefined){this.setUrl(url);
}
if(serviceName!=null){this.setServiceName(serviceName);
}this._previousServerSuffix=null;
this._currentServerSuffix=null;
if(qx.core.ServerSettings){this._currentServerSuffix=qx.core.ServerSettings.serverPathSuffix;
}},
events:{"completed":"qx.event.type.Event",
"aborted":"qx.event.type.Event",
"failed":"qx.event.type.Event",
"timeout":"qx.event.type.Event"},
statics:{origin:{server:1,
application:2,
transport:3,
local:4},
localError:{timeout:1,
abort:2},
makeServerURL:function(instanceId){var retVal=null;
if(qx.core.ServerSettings){retVal=qx.core.ServerSettings.serverPathPrefix+"/.qxrpc"+qx.core.ServerSettings.serverPathSuffix;
if(instanceId!=null){retVal+="?instanceId="+instanceId;
}}return retVal;
}},
properties:{timeout:{check:"Integer",
nullable:true},
crossDomain:{check:"Boolean",
init:false},
url:{check:"String",
nullable:true},
serviceName:{check:"String",
nullable:true},
serverData:{check:"Object",
nullable:true},
username:{check:"String",
nullable:true},
password:{check:"String",
nullable:true},
useBasicHttpAuth:{check:"Boolean",
nullable:true}},
members:{_callInternal:function(args,
callType,
refreshSession){var self=this;
var offset=(callType==0?0:1);
var whichMethod=(refreshSession?"refreshSession":args[offset]);
var handler=args[0];
var argsArray=[];
var eventTarget=this;
for(var i=offset+1;i<args.length;++i){argsArray.push(args[i]);
}var req=new qx.io.remote.Request(this.getUrl(),
qx.net.Http.METHOD_POST,
qx.util.Mime.JSON);
var requestObject={"service":(refreshSession?null:this.getServiceName()),
"method":whichMethod,
"id":req.getSequenceNumber(),
"params":argsArray};
var serverData=this.getServerData();
if(serverData!==undefined){requestObject.server_data=serverData;
}req.setCrossDomain(this.getCrossDomain());
if(this.getUsername()){req.setUseBasicHttpAuth(this.getUseBasicHttpAuth());
req.setUsername(this.getUsername());
req.setPassword(this.getPassword());
}req.setTimeout(this.getTimeout());
var ex=null;
var id=null;
var result=null;
var response=null;
var handleRequestFinished=function(eventType,
eventTarget){switch(callType){case 0:break;
case 1:handler(result,
ex,
id);
break;
case 2:if(!ex){eventTarget.createDispatchDataEvent(eventType,
response);
}else{ex.id=id;
if(args[0]){eventTarget.createDispatchDataEvent("failed",
ex);
}else{eventTarget.createDispatchDataEvent(eventType,
ex);
}}}};
var addToStringToObject=function(obj){obj.toString=function(){switch(obj.origin){case qx.io.remote.Rpc.origin.server:return "Server error "+obj.code+": "+obj.message;
case qx.io.remote.Rpc.origin.application:return "Application error "+obj.code+": "+obj.message;
case qx.io.remote.Rpc.origin.transport:return "Transport error "+obj.code+": "+obj.message;
case qx.io.remote.Rpc.origin.local:return "Local error "+obj.code+": "+obj.message;
default:return ("UNEXPECTED origin "+obj.origin+" error "+obj.code+": "+obj.message);
}};
};
var makeException=function(origin,
code,
message){var ex=new Object();
ex.origin=origin;
ex.code=code;
ex.message=message;
addToStringToObject(ex);
return ex;
};
req.addEventListener("failed",
function(evt){var code=evt.getStatusCode();
ex=makeException(qx.io.remote.Rpc.origin.transport,
code,
qx.io.remote.Exchange.statusCodeToString(code));
id=this.getSequenceNumber();
handleRequestFinished("failed",
eventTarget);
});
req.addEventListener("timeout",
function(evt){this.debug("TIMEOUT OCCURRED");
ex=makeException(qx.io.remote.Rpc.origin.local,
qx.io.remote.Rpc.localError.timeout,
"Local time-out expired");
id=this.getSequenceNumber();
handleRequestFinished("timeout",
eventTarget);
});
req.addEventListener("aborted",
function(evt){ex=makeException(qx.io.remote.Rpc.origin.local,
qx.io.remote.Rpc.localError.abort,
"Aborted");
id=this.getSequenceNumber();
handleRequestFinished("aborted",
eventTarget);
});
req.addEventListener("completed",
function(evt){response=evt.getContent();
id=response["id"];
if(id!=this.getSequenceNumber()){this.warn("Received id ("+id+") does not match requested id "+"("+this.getSequenceNumber()+")!");
}var exTest=response["error"];
if(exTest!=null){result=null;
addToStringToObject(exTest);
ex=exTest;
}else{result=response["result"];
if(refreshSession){result=eval("("+result+")");
var newSuffix=qx.core.ServerSettings.serverPathSuffix;
if(self._currentServerSuffix!=newSuffix){self._previousServerSuffix=self._currentServerSuffix;
self._currentServerSuffix=newSuffix;
}self.setUrl(self.fixUrl(self.getUrl()));
}}handleRequestFinished("completed",
eventTarget);
});
req.setData(qx.io.Json.stringify(requestObject));
req.setAsynchronous(callType>0);
if(req.getCrossDomain()){req.setRequestHeader("Content-Type",
"application/x-www-form-urlencoded");
}else{req.setRequestHeader("Content-Type",
qx.util.Mime.JSON);
}req.send();
if(callType==0){if(ex!=null){var error=new Error(ex.toString());
error.rpcdetails=ex;
throw error;
}return result;
}else{return req;
}},
fixUrl:function(url){if(this._previousServerSuffix==null||this._currentServerSuffix==null||this._previousServerSuffix==""||this._previousServerSuffix==this._currentServerSuffix){return url;
}var index=url.indexOf(this._previousServerSuffix);
if(index==-1){return url;
}return (url.substring(0,
index)+this._currentServerSuffix+url.substring(index+this._previousServerSuffix.length));
},
callSync:function(methodName){return this._callInternal(arguments,
0);
},
callAsync:function(handler,
methodName){return this._callInternal(arguments,
1);
},
callAsyncListeners:function(coalesce,
methodName){return this._callInternal(arguments,
2);
},
refreshSession:function(handler){if(this.getCrossDomain()){if(qx.core.ServerSettings&&qx.core.ServerSettings.serverPathSuffix){var timeDiff=(new Date()).getTime()-qx.core.ServerSettings.lastSessionRefresh;
if(timeDiff/1000>(qx.core.ServerSettings.sessionTimeoutInSeconds-30)){this._callInternal([handler],
1,
true);
}else{handler(true);
}}else{handler(false);
}}else{handler(true);
}},
abort:function(opaqueCallRef){opaqueCallRef.abort();
}}});




/* ID: qx.net.Http */
qx.Class.define("qx.net.Http",
{statics:{METHOD_GET:"GET",
METHOD_POST:"POST",
METHOD_PUT:"PUT",
METHOD_HEAD:"HEAD",
METHOD_DELETE:"DELETE"}});




/* ID: qx.util.Mime */
qx.Class.define("qx.util.Mime",
{statics:{JAVASCRIPT:"text/javascript",
JSON:"application/json",
XML:"application/xml",
TEXT:"text/plain",
HTML:"text/html"}});




/* ID: qx.io.remote.Request */
qx.Class.define("qx.io.remote.Request",
{extend:qx.core.Target,
construct:function(vUrl,
vMethod,
vResponseType){this.base(arguments);
this._requestHeaders={};
this._parameters={};
this._formFields={};
if(vUrl!==undefined){this.setUrl(vUrl);
}
if(vMethod!==undefined){this.setMethod(vMethod);
}
if(vResponseType!==undefined){this.setResponseType(vResponseType);
}this.setProhibitCaching(true);
this.setRequestHeader("X-Requested-With",
"qooxdoo");
this.setRequestHeader("X-Qooxdoo-Version",
qx.core.Version.toString());
this._seqNum=++qx.io.remote.Request._seqNum;
},
events:{"created":"qx.event.type.Event",
"configured":"qx.event.type.Event",
"sending":"qx.event.type.Event",
"receiving":"qx.event.type.Event",
"completed":"qx.io.remote.Response",
"aborted":"qx.io.remote.Response",
"failed":"qx.io.remote.Response",
"timeout":"qx.io.remote.Response"},
statics:{_seqNum:0},
properties:{url:{check:"String",
init:""},
method:{check:[qx.net.Http.METHOD_GET,
qx.net.Http.METHOD_POST,
qx.net.Http.METHOD_PUT,
qx.net.Http.METHOD_HEAD,
qx.net.Http.METHOD_DELETE],
apply:"_applyMethod",
init:qx.net.Http.METHOD_GET},
asynchronous:{check:"Boolean",
init:true},
data:{check:"String",
nullable:true},
username:{check:"String",
nullable:true},
password:{check:"String",
nullable:true},
state:{check:["configured",
"queued",
"sending",
"receiving",
"completed",
"aborted",
"timeout",
"failed"],
init:"configured",
apply:"_applyState",
event:"changeState"},
responseType:{check:[qx.util.Mime.TEXT,
qx.util.Mime.JAVASCRIPT,
qx.util.Mime.JSON,
qx.util.Mime.XML,
qx.util.Mime.HTML],
init:qx.util.Mime.TEXT,
apply:"_applyResponseType"},
timeout:{check:"Integer",
nullable:true},
prohibitCaching:{check:"Boolean",
init:true,
apply:"_applyProhibitCaching"},
crossDomain:{check:"Boolean",
init:false},
fileUpload:{check:"Boolean",
init:false},
transport:{check:"qx.io.remote.Exchange",
nullable:true},
useBasicHttpAuth:{check:"Boolean",
init:false}},
members:{send:function(){qx.io.remote.RequestQueue.getInstance().add(this);
},
abort:function(){qx.io.remote.RequestQueue.getInstance().abort(this);
},
reset:function(){switch(this.getState()){case "sending":case "receiving":this.error("Aborting already sent request!");
case "queued":this.abort();
break;
}},
isConfigured:function(){return this.getState()==="configured";
},
isQueued:function(){return this.getState()==="queued";
},
isSending:function(){return this.getState()==="sending";
},
isReceiving:function(){return this.getState()==="receiving";
},
isCompleted:function(){return this.getState()==="completed";
},
isAborted:function(){return this.getState()==="aborted";
},
isTimeout:function(){return this.getState()==="timeout";
},
isFailed:function(){return this.getState()==="failed";
},
_onqueued:function(e){this.setState("queued");
this.dispatchEvent(e);
},
_onsending:function(e){this.setState("sending");
this.dispatchEvent(e);
},
_onreceiving:function(e){this.setState("receiving");
this.dispatchEvent(e);
},
_oncompleted:function(e){this.setState("completed");
this.dispatchEvent(e);
this.dispose();
},
_onaborted:function(e){this.setState("aborted");
this.dispatchEvent(e);
this.dispose();
},
_ontimeout:function(e){this.setState("timeout");
this.dispatchEvent(e);
this.dispose();
},
_onfailed:function(e){this.setState("failed");
this.dispatchEvent(e);
this.dispose();
},
_applyState:function(value,
old){{if(qx.core.Setting.get("qx.ioRemoteDebug")){this.debug("State: "+value);
}};
},
_applyProhibitCaching:function(value,
old){if(value){this.setParameter("nocache",
new Date().valueOf());
this.setRequestHeader("Pragma",
"no-cache");
this.setRequestHeader("Cache-Control",
"no-cache");
}else{this.removeParameter("nocache");
this.removeRequestHeader("Pragma");
this.removeRequestHeader("Cache-Control");
}},
_applyMethod:function(value,
old){if(value===qx.net.Http.METHOD_POST){this.setRequestHeader("Content-Type",
"application/x-www-form-urlencoded");
}else{this.removeRequestHeader("Content-Type");
}},
_applyResponseType:function(value,
old){this.setRequestHeader("X-Qooxdoo-Response-Type",
value);
},
setRequestHeader:function(vId,
vValue){this._requestHeaders[vId]=vValue;
},
removeRequestHeader:function(vId){delete this._requestHeaders[vId];
},
getRequestHeader:function(vId){return this._requestHeaders[vId]||null;
},
getRequestHeaders:function(){return this._requestHeaders;
},
setParameter:function(vId,
vValue){this._parameters[vId]=vValue;
},
removeParameter:function(vId){delete this._parameters[vId];
},
getParameter:function(vId){return this._parameters[vId]||null;
},
getParameters:function(){return this._parameters;
},
setFormField:function(vId,
vValue){this._formFields[vId]=vValue;
},
removeFormField:function(vId){delete this._formFields[vId];
},
getFormField:function(vId){return this._formFields[vId]||null;
},
getFormFields:function(){return this._formFields;
},
getSequenceNumber:function(){return this._seqNum;
}},
destruct:function(){this.setTransport(null);
this._disposeFields("_requestHeaders",
"_parameters",
"_formFields");
}});




/* ID: qx.io.remote.RequestQueue */
qx.Class.define("qx.io.remote.RequestQueue",
{type:"singleton",
extend:qx.core.Target,
construct:function(){this.base(arguments);
this._queue=[];
this._active=[];
this._totalRequests=0;
this._timer=new qx.client.Timer(500);
this._timer.addEventListener("interval",
this._oninterval,
this);
},
properties:{enabled:{init:true,
check:"Boolean",
apply:"_applyEnabled"},
maxTotalRequests:{check:"Integer",
nullable:true},
maxConcurrentRequests:{check:"Integer",
init:3},
defaultTimeout:{check:"Integer",
init:5000}},
members:{_debug:function(){var vText=this._active.length+"/"+(this._queue.length+this._active.length);
{if(qx.core.Setting.get("qx.ioRemoteDebug")){this.debug("Progress: "+vText);
window.status="Request-Queue Progress: "+vText;
}};
},
_check:function(){this._debug();
if(this._active.length==0&&this._queue.length==0){this._timer.stop();
}if(!this.getEnabled()){return;
}if(this._active.length>=this.getMaxConcurrentRequests()||this._queue.length==0){return;
}if(this.getMaxTotalRequests()!=null&&this._totalRequests>=this.getMaxTotalRequests()){return;
}var vRequest=this._queue.shift();
var vTransport=new qx.io.remote.Exchange(vRequest);
this._totalRequests++;
this._active.push(vTransport);
this._debug();
vTransport.addEventListener("sending",
vRequest._onsending,
vRequest);
vTransport.addEventListener("receiving",
vRequest._onreceiving,
vRequest);
vTransport.addEventListener("completed",
vRequest._oncompleted,
vRequest);
vTransport.addEventListener("aborted",
vRequest._onaborted,
vRequest);
vTransport.addEventListener("timeout",
vRequest._ontimeout,
vRequest);
vTransport.addEventListener("failed",
vRequest._onfailed,
vRequest);
vTransport.addEventListener("sending",
this._onsending,
this);
vTransport.addEventListener("completed",
this._oncompleted,
this);
vTransport.addEventListener("aborted",
this._oncompleted,
this);
vTransport.addEventListener("timeout",
this._oncompleted,
this);
vTransport.addEventListener("failed",
this._oncompleted,
this);
vTransport._start=(new Date).valueOf();
vTransport.send();
if(this._queue.length>0){this._check();
}},
_remove:function(vTransport){qx.lang.Array.remove(this._active,
vTransport);
vTransport.dispose();
this._check();
},
_activeCount:0,
_onsending:function(e){{if(qx.core.Setting.get("qx.ioRemoteDebug")){this._activeCount++;
e.getTarget()._counted=true;
this.debug("ActiveCount: "+this._activeCount);
}};
},
_oncompleted:function(e){{if(qx.core.Setting.get("qx.ioRemoteDebug")){if(e.getTarget()._counted){this._activeCount--;
this.debug("ActiveCount: "+this._activeCount);
}}};
this._remove(e.getTarget());
},
_oninterval:function(e){var vActive=this._active;
if(vActive.length==0){this._timer.stop();
return;
}var vCurrent=(new Date).valueOf();
var vTransport;
var vRequest;
var vDefaultTimeout=this.getDefaultTimeout();
var vTimeout;
var vTime;
for(var i=vActive.length-1;i>=0;i--){vTransport=vActive[i];
vRequest=vTransport.getRequest();
if(vRequest.isAsynchronous()){vTimeout=vRequest.getTimeout();
if(vTimeout==0){continue;
}
if(vTimeout==null){vTimeout=vDefaultTimeout;
}vTime=vCurrent-vTransport._start;
if(vTime>vTimeout){this.warn("Timeout: transport "+vTransport.toHashCode());
this.warn(vTime+"ms > "+vTimeout+"ms");
vTransport.timeout();
}}}},
_applyEnabled:function(value,
old){if(value){this._check();
}this._timer.setEnabled(value);
},
add:function(vRequest){vRequest.setState("queued");
this._queue.push(vRequest);
this._check();
if(this.getEnabled()){this._timer.start();
}},
abort:function(vRequest){var vTransport=vRequest.getTransport();
if(vTransport){vTransport.abort();
}else if(qx.lang.Array.contains(this._queue,
vRequest)){qx.lang.Array.remove(this._queue,
vRequest);
}}},
destruct:function(){this._disposeObjectDeep("_active",
1);
this._disposeObjects("_timer");
this._disposeFields("_queue");
}});




/* ID: qx.io.remote.Exchange */
qx.Class.define("qx.io.remote.Exchange",
{extend:qx.core.Target,
construct:function(vRequest){this.base(arguments);
this.setRequest(vRequest);
vRequest.setTransport(this);
},
events:{"sending":"qx.event.type.Event",
"receiving":"qx.event.type.Event",
"completed":"qx.io.remote.Response",
"aborted":"qx.io.remote.Response",
"failed":"qx.io.remote.Response",
"timeout":"qx.io.remote.Response"},
statics:{typesOrder:["qx.io.remote.XmlHttpTransport",
"qx.io.remote.IframeTransport",
"qx.io.remote.ScriptTransport"],
typesReady:false,
typesAvailable:{},
typesSupported:{},
registerType:function(vClass,
vId){qx.io.remote.Exchange.typesAvailable[vId]=vClass;
},
initTypes:function(){if(qx.io.remote.Exchange.typesReady){return;
}
for(var vId in qx.io.remote.Exchange.typesAvailable){var vTransporterImpl=qx.io.remote.Exchange.typesAvailable[vId];
if(vTransporterImpl.isSupported()){qx.io.remote.Exchange.typesSupported[vId]=vTransporterImpl;
}}qx.io.remote.Exchange.typesReady=true;
if(qx.lang.Object.isEmpty(qx.io.remote.Exchange.typesSupported)){throw new Error("No supported transport types were found!");
}},
canHandle:function(vImpl,
vNeeds,
vResponseType){if(!qx.lang.Array.contains(vImpl.handles.responseTypes,
vResponseType)){return false;
}
for(var vKey in vNeeds){if(!vImpl.handles[vKey]){return false;
}}return true;
},
_nativeMap:{0:"created",
1:"configured",
2:"sending",
3:"receiving",
4:"completed"},
wasSuccessful:function(vStatusCode,
vReadyState,
vIsLocal){if(vIsLocal){switch(vStatusCode){case null:case 0:return true;
case -1:return vReadyState<4;
default:return typeof vStatusCode==="undefined";
}}else{switch(vStatusCode){case -1:{if(qx.core.Setting.get("qx.ioRemoteDebug")&&vReadyState>3){qx.log.Logger.getClassLogger(qx.io.remote.Exchange).debug("Failed with statuscode: -1 at readyState "+vReadyState);
}};
return vReadyState<4;
case 200:case 304:return true;
case 201:case 202:case 203:case 204:case 205:return true;
case 206:{if(qx.core.Setting.get("qx.ioRemoteDebug")&&vReadyState===4){qx.log.Logger.getClassLogger(qx.io.remote.Exchange).debug("Failed with statuscode: 206 (Partial content while being complete!)");
}};
return vReadyState!==4;
case 300:case 301:case 302:case 303:case 305:case 400:case 401:case 402:case 403:case 404:case 405:case 406:case 407:case 408:case 409:case 410:case 411:case 412:case 413:case 414:case 415:case 500:case 501:case 502:case 503:case 504:case 505:{if(qx.core.Setting.get("qx.ioRemoteDebug")){qx.log.Logger.getClassLogger(qx.io.remote.Exchange).debug("Failed with typical HTTP statuscode: "+vStatusCode);
}};
return false;
case 12002:case 12029:case 12030:case 12031:case 12152:case 13030:{if(qx.core.Setting.get("qx.ioRemoteDebug")){qx.log.Logger.getClassLogger(qx.io.remote.Exchange).debug("Failed with MSHTML specific HTTP statuscode: "+vStatusCode);
}};
return false;
default:if(vStatusCode>206&&vStatusCode<300){return true;
}qx.log.Logger.getClassLogger(qx.io.remote.Exchange).debug("Unknown status code: "+vStatusCode+" ("+vReadyState+")");
return false;
}}},
statusCodeToString:function(vStatusCode){switch(vStatusCode){case -1:return "Not available";
case 200:return "Ok";
case 304:return "Not modified";
case 206:return "Partial content";
case 204:return "No content";
case 300:return "Multiple choices";
case 301:return "Moved permanently";
case 302:return "Moved temporarily";
case 303:return "See other";
case 305:return "Use proxy";
case 400:return "Bad request";
case 401:return "Unauthorized";
case 402:return "Payment required";
case 403:return "Forbidden";
case 404:return "Not found";
case 405:return "Method not allowed";
case 406:return "Not acceptable";
case 407:return "Proxy authentication required";
case 408:return "Request time-out";
case 409:return "Conflict";
case 410:return "Gone";
case 411:return "Length required";
case 412:return "Precondition failed";
case 413:return "Request entity too large";
case 414:return "Request-URL too large";
case 415:return "Unsupported media type";
case 500:return "Server error";
case 501:return "Not implemented";
case 502:return "Bad gateway";
case 503:return "Out of resources";
case 504:return "Gateway time-out";
case 505:return "HTTP version not supported";
case 12002:return "Server timeout";
case 12029:return "Connection dropped";
case 12030:return "Connection dropped";
case 12031:return "Connection dropped";
case 12152:return "Connection closed by server";
case 13030:return "MSHTML-specific HTTP status code";
default:return "Unknown status code";
}}},
properties:{request:{check:"qx.io.remote.Request",
nullable:true},
implementation:{check:"qx.io.remote.AbstractRemoteTransport",
nullable:true,
apply:"_applyImplementation"},
state:{check:["configured",
"sending",
"receiving",
"completed",
"aborted",
"timeout",
"failed"],
init:"configured",
event:"changeState",
apply:"_applyState"}},
members:{send:function(){var vRequest=this.getRequest();
if(!vRequest){return this.error("Please attach a request object first");
}qx.io.remote.Exchange.initTypes();
var vUsage=qx.io.remote.Exchange.typesOrder;
var vSupported=qx.io.remote.Exchange.typesSupported;
var vResponseType=vRequest.getResponseType();
var vNeeds={};
if(vRequest.getAsynchronous()){vNeeds.asynchronous=true;
}else{vNeeds.synchronous=true;
}
if(vRequest.getCrossDomain()){vNeeds.crossDomain=true;
}
if(vRequest.getFileUpload()){vNeeds.fileUpload=true;
}for(var field in vRequest.getFormFields()){vNeeds.programaticFormFields=true;
break;
}var vTransportImpl,
vTransport;
for(var i=0,
l=vUsage.length;i<l;i++){vTransportImpl=vSupported[vUsage[i]];
if(vTransportImpl){if(!qx.io.remote.Exchange.canHandle(vTransportImpl,
vNeeds,
vResponseType)){continue;
}
try{{if(qx.core.Setting.get("qx.ioRemoteDebug")){this.debug("Using implementation: "+vTransportImpl.classname);
}};
vTransport=new vTransportImpl;
this.setImplementation(vTransport);
vTransport.setUseBasicHttpAuth(vRequest.getUseBasicHttpAuth());
vTransport.send();
return true;
}catch(ex){return this.error("Request handler throws error",
ex);
}}}this.error("There is no transport implementation available to handle this request: "+vRequest);
},
abort:function(){var vImplementation=this.getImplementation();
if(vImplementation){{if(qx.core.Setting.get("qx.ioRemoteDebug")){this.debug("Abort: implementation "+vImplementation.toHashCode());
}};
vImplementation.abort();
}else{{if(qx.core.Setting.get("qx.ioRemoteDebug")){this.debug("Abort: forcing state to be aborted");
}};
this.setState("aborted");
}},
timeout:function(){var vImplementation=this.getImplementation();
if(vImplementation){this.warn("Timeout: implementation "+vImplementation.toHashCode());
vImplementation.timeout();
}else{this.warn("Timeout: forcing state to timeout");
this.setState("timeout");
}if(this.getRequest()){this.getRequest().setTimeout(0);
}},
_onsending:function(e){this.setState("sending");
},
_onreceiving:function(e){this.setState("receiving");
},
_oncompleted:function(e){this.setState("completed");
},
_onabort:function(e){this.setState("aborted");
},
_onfailed:function(e){this.setState("failed");
},
_ontimeout:function(e){this.setState("timeout");
},
_applyImplementation:function(value,
old){if(old){old.removeEventListener("sending",
this._onsending,
this);
old.removeEventListener("receiving",
this._onreceiving,
this);
old.removeEventListener("completed",
this._oncompleted,
this);
old.removeEventListener("aborted",
this._onabort,
this);
old.removeEventListener("timeout",
this._ontimeout,
this);
old.removeEventListener("failed",
this._onfailed,
this);
}
if(value){var vRequest=this.getRequest();
value.setUrl(vRequest.getUrl());
value.setMethod(vRequest.getMethod());
value.setAsynchronous(vRequest.getAsynchronous());
value.setUsername(vRequest.getUsername());
value.setPassword(vRequest.getPassword());
value.setParameters(vRequest.getParameters());
value.setFormFields(vRequest.getFormFields());
value.setRequestHeaders(vRequest.getRequestHeaders());
value.setData(vRequest.getData());
value.setResponseType(vRequest.getResponseType());
value.addEventListener("sending",
this._onsending,
this);
value.addEventListener("receiving",
this._onreceiving,
this);
value.addEventListener("completed",
this._oncompleted,
this);
value.addEventListener("aborted",
this._onabort,
this);
value.addEventListener("timeout",
this._ontimeout,
this);
value.addEventListener("failed",
this._onfailed,
this);
}},
_applyState:function(value,
old){{if(qx.core.Setting.get("qx.ioRemoteDebug")){this.debug("State: "+old+" => "+value);
}};
switch(value){case "sending":this.createDispatchEvent("sending");
break;
case "receiving":this.createDispatchEvent("receiving");
break;
case "completed":case "aborted":case "timeout":case "failed":var vImpl=this.getImplementation();
if(!vImpl){break;
}
if(this.hasEventListeners(value)){var vResponse=new qx.io.remote.Response(value);
if(value=="completed"){var vContent=vImpl.getResponseContent();
vResponse.setContent(vContent);
if(vContent===null){{if(qx.core.Setting.get("qx.ioRemoteDebug")){this.debug("Altered State: "+value+" => failed");
}};
value="failed";
}}vResponse.setStatusCode(vImpl.getStatusCode());
vResponse.setResponseHeaders(vImpl.getResponseHeaders());
this.dispatchEvent(vResponse);
}this.setImplementation(null);
vImpl.dispose();
break;
}}},
settings:{"qx.ioRemoteDebug":false,
"qx.ioRemoteDebugData":false},
destruct:function(){var vImpl=this.getImplementation();
if(vImpl){this.setImplementation(null);
vImpl.dispose();
}this.setRequest(null);
}});




/* ID: qx.io.remote.Response */
qx.Class.define("qx.io.remote.Response",
{extend:qx.event.type.Event,
construct:function(eventType){this.base(arguments,
eventType);
},
properties:{state:{check:"Integer",
nullable:true},
statusCode:{check:"Integer",
nullable:true},
content:{nullable:true},
responseHeaders:{check:"Object",
nullable:true}},
members:{getResponseHeader:function(vHeader){var vAll=this.getResponseHeaders();
if(vAll){return vAll[vHeader]||null;
}return null;
},
getData:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee,
"This method is no longer needed since the event object is now an instance of the Response class.");
return this;
}}});




/* ID: qx.io.remote.AbstractRemoteTransport */
qx.Class.define("qx.io.remote.AbstractRemoteTransport",
{type:"abstract",
extend:qx.core.Target,
construct:function(){this.base(arguments);
},
events:{"created":"qx.event.type.Event",
"configured":"qx.event.type.Event",
"sending":"qx.event.type.Event",
"receiving":"qx.event.type.Event",
"completed":"qx.event.type.Event",
"aborted":"qx.event.type.Event",
"failed":"qx.event.type.Event",
"timeout":"qx.event.type.Event"},
properties:{url:{check:"String",
nullable:true},
method:{check:"String",
nullable:true},
asynchronous:{check:"Boolean",
nullable:true},
data:{check:"String",
nullable:true},
username:{check:"String",
nullable:true},
password:{check:"String",
nullable:true},
state:{check:["created",
"configured",
"sending",
"receiving",
"completed",
"aborted",
"timeout",
"failed"],
init:"created",
event:"changeState",
apply:"_applyState"},
requestHeaders:{check:"Object",
nullable:true},
parameters:{check:"Object",
nullable:true},
formFields:{check:"Object",
nullable:true},
responseType:{check:"String",
nullable:true},
useBasicHttpAuth:{check:"Boolean",
nullable:true}},
members:{send:function(){throw new Error("send is abstract");
},
abort:function(){{if(qx.core.Setting.get("qx.ioRemoteDebug")){this.warn("Aborting...");
}};
this.setState("aborted");
},
timeout:function(){{if(qx.core.Setting.get("qx.ioRemoteDebug")){this.warn("Timeout...");
}};
this.setState("timeout");
},
failed:function(){{if(qx.core.Setting.get("qx.ioRemoteDebug")){this.warn("Failed...");
}};
this.setState("failed");
},
setRequestHeader:function(vLabel,
vValue){throw new Error("setRequestHeader is abstract");
},
getResponseHeader:function(vLabel){throw new Error("getResponseHeader is abstract");
},
getResponseHeaders:function(){throw new Error("getResponseHeaders is abstract");
},
getStatusCode:function(){throw new Error("getStatusCode is abstract");
},
getStatusText:function(){throw new Error("getStatusText is abstract");
},
getResponseText:function(){throw new Error("getResponseText is abstract");
},
getResponseXml:function(){throw new Error("getResponseXml is abstract");
},
getFetchedLength:function(){throw new Error("getFetchedLength is abstract");
},
_applyState:function(value,
old){{if(qx.core.Setting.get("qx.ioRemoteDebug")){this.debug("State: "+value);
}};
switch(value){case "created":this.createDispatchEvent("created");
break;
case "configured":this.createDispatchEvent("configured");
break;
case "sending":this.createDispatchEvent("sending");
break;
case "receiving":this.createDispatchEvent("receiving");
break;
case "completed":this.createDispatchEvent("completed");
break;
case "aborted":this.createDispatchEvent("aborted");
break;
case "failed":this.createDispatchEvent("failed");
break;
case "timeout":this.createDispatchEvent("timeout");
break;
}return true;
}}});




/* ID: qx.io.remote.XmlHttpTransport */
qx.Class.define("qx.io.remote.XmlHttpTransport",
{extend:qx.io.remote.AbstractRemoteTransport,
construct:function(){this.base(arguments);
this._req=qx.io.remote.XmlHttpTransport.createRequestObject();
this._req.onreadystatechange=qx.lang.Function.bind(this._onreadystatechange,
this);
},
events:{"created":"qx.event.type.Event",
"configured":"qx.event.type.Event",
"sending":"qx.event.type.Event",
"receiving":"qx.event.type.Event",
"completed":"qx.event.type.Event",
"aborted":"qx.event.type.Event",
"failed":"qx.event.type.Event",
"timeout":"qx.event.type.Event"},
statics:{handles:{synchronous:true,
asynchronous:true,
crossDomain:false,
fileUpload:false,
programaticFormFields:false,
responseTypes:[qx.util.Mime.TEXT,
qx.util.Mime.JAVASCRIPT,
qx.util.Mime.JSON,
qx.util.Mime.XML,
qx.util.Mime.HTML]},
requestObjects:[],
requestObjectCount:0,
isSupported:function(){return qx.net.HttpRequest.create()!=null?true:false;
},
createRequestObject:function(){return qx.net.HttpRequest.create();
},
__dummy:function(){}},
members:{_localRequest:false,
_lastReadyState:0,
getRequest:function(){return this._req;
},
send:function(){this._lastReadyState=0;
var vRequest=this.getRequest();
var vMethod=this.getMethod();
var vAsynchronous=this.getAsynchronous();
var vUrl=this.getUrl();
var vLocalRequest=(qx.core.Client.getInstance().getRunsLocally()&&!(/^http(s){0,1}\:/.test(vUrl)));
this._localRequest=vLocalRequest;
var vParameters=this.getParameters();
var vParametersList=[];
for(var vId in vParameters){var value=vParameters[vId];
if(value instanceof Array){for(var i=0;i<value.length;i++){vParametersList.push(encodeURIComponent(vId)+"="+encodeURIComponent(value[i]));
}}else{vParametersList.push(encodeURIComponent(vId)+"="+encodeURIComponent(value));
}}
if(vParametersList.length>0){vUrl+=(vUrl.indexOf("?")>=0?"&":"?")+vParametersList.join("&");
}var encode64=function(input){var keyStr="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
var output="";
var chr1,
chr2,
chr3;
var enc1,
enc2,
enc3,
enc4;
var i=0;
do{chr1=input.charCodeAt(i++);
chr2=input.charCodeAt(i++);
chr3=input.charCodeAt(i++);
enc1=chr1>>2;
enc2=((chr1&3)<<4)|(chr2>>4);
enc3=((chr2&15)<<2)|(chr3>>6);
enc4=chr3&63;
if(isNaN(chr2)){enc3=enc4=64;
}else if(isNaN(chr3)){enc4=64;
}output+=keyStr.charAt(enc1)+keyStr.charAt(enc2)+keyStr.charAt(enc3)+keyStr.charAt(enc4);
}while(i<input.length);
return output;
};
vRequest.onreadystatechange=qx.lang.Function.bind(this._onreadystatechange,
this);
if(this.getUsername()){if(this.getUseBasicHttpAuth()){vRequest.open(vMethod,
vUrl,
vAsynchronous);
vRequest.setRequestHeader('Authorization',
'Basic '+encode64(this.getUsername()+':'+this.getPassword()));
}else{vRequest.open(vMethod,
vUrl,
vAsynchronous,
this.getUsername(),
this.getPassword());
}}else{vRequest.open(vMethod,
vUrl,
vAsynchronous);
}vRequest.setRequestHeader('Referer',
window.location.href);
var vRequestHeaders=this.getRequestHeaders();
for(var vId in vRequestHeaders){vRequest.setRequestHeader(vId,
vRequestHeaders[vId]);
}try{{if(qx.core.Setting.get("qx.ioRemoteDebugData")){this.debug("Request: "+this.getData());
}};
vRequest.send(this.getData());
}catch(ex){if(vLocalRequest){this.failedLocally();
}else{this.error("Failed to send data: "+ex,
"send");
this.failed();
}return;
}if(!vAsynchronous){this._onreadystatechange();
}},
failedLocally:function(){if(this.getState()==="failed"){return;
}this.warn("Could not load from file: "+this.getUrl());
this.failed();
},
_onreadystatechange:function(e){switch(this.getState()){case "completed":case "aborted":case "failed":case "timeout":{if(qx.core.Setting.get("qx.ioRemoteDebug")){this.warn("Ignore Ready State Change");
}};
return;
}var vReadyState=this.getReadyState();
if(vReadyState==4){if(!qx.io.remote.Exchange.wasSuccessful(this.getStatusCode(),
vReadyState,
this._localRequest)){return this.failed();
}}while(this._lastReadyState<vReadyState){this.setState(qx.io.remote.Exchange._nativeMap[++this._lastReadyState]);
}},
getReadyState:function(){var vReadyState=null;
try{vReadyState=this._req.readyState;
}catch(ex){}return vReadyState;
},
setRequestHeader:function(vLabel,
vValue){this._req.setRequestHeader(vLabel,
vValue);
},
getResponseHeader:function(vLabel){var vResponseHeader=null;
try{this.getRequest().getResponseHeader(vLabel)||null;
}catch(ex){}return vResponseHeader;
},
getStringResponseHeaders:function(){var vSourceHeader=null;
try{var vLoadHeader=this._req.getAllResponseHeaders();
if(vLoadHeader){vSourceHeader=vLoadHeader;
}}catch(ex){}return vSourceHeader;
},
getResponseHeaders:function(){var vSourceHeader=this.getStringResponseHeaders();
var vHeader={};
if(vSourceHeader){var vValues=vSourceHeader.split(/[\r\n]+/g);
for(var i=0,
l=vValues.length;i<l;i++){var vPair=vValues[i].match(/^([^:]+)\s*:\s*(.+)$/i);
if(vPair){vHeader[vPair[1]]=vPair[2];
}}}return vHeader;
},
getStatusCode:function(){var vStatusCode=-1;
try{vStatusCode=this.getRequest().status;
}catch(ex){}return vStatusCode;
},
getStatusText:function(){var vStatusText="";
try{vStatusText=this.getRequest().statusText;
}catch(ex){}return vStatusText;
},
getResponseText:function(){var vResponseText=null;
var vStatus=this.getStatusCode();
var vReadyState=this.getReadyState();
if(qx.io.remote.Exchange.wasSuccessful(vStatus,
vReadyState,
this._localRequest)){try{vResponseText=this.getRequest().responseText;
}catch(ex){}}return vResponseText;
},
getResponseXml:function(){var vResponseXML=null;
var vStatus=this.getStatusCode();
var vReadyState=this.getReadyState();
if(qx.io.remote.Exchange.wasSuccessful(vStatus,
vReadyState,
this._localRequest)){try{vResponseXML=this.getRequest().responseXML;
}catch(ex){}}if(typeof vResponseXML=="object"&&vResponseXML!=null){if(!vResponseXML.documentElement){var s=String(this.getRequest().responseText).replace(/<\?xml[^\?]*\?>/,
"");
vResponseXML.loadXML(s);
}if(!vResponseXML.documentElement){throw new Error("Missing Document Element!");
}
if(vResponseXML.documentElement.tagName=="parseerror"){throw new Error("XML-File is not well-formed!");
}}else{throw new Error("Response was not a valid xml document ["+this.getRequest().responseText+"]");
}return vResponseXML;
},
getFetchedLength:function(){var vText=this.getResponseText();
return typeof vText=="string"?vText.length:0;
},
getResponseContent:function(){if(this.getState()!=="completed"){{if(qx.core.Setting.get("qx.ioRemoteDebug")){this.warn("Transfer not complete, ignoring content!");
}};
return null;
}{if(qx.core.Setting.get("qx.ioRemoteDebug")){this.debug("Returning content for responseType: "+this.getResponseType());
}};
var vText=this.getResponseText();
switch(this.getResponseType()){case qx.util.Mime.TEXT:case qx.util.Mime.HTML:{if(qx.core.Setting.get("qx.ioRemoteDebugData")){this.debug("Response: "+vText);
}};
return vText;
case qx.util.Mime.JSON:{if(qx.core.Setting.get("qx.ioRemoteDebugData")){this.debug("Response: "+vText);
}};
try{if(vText&&vText.length>0){return qx.io.Json.parseQx(vText)||null;
}else{return null;
}}catch(ex){this.error("Could not execute json: ["+vText+"]",
ex);
return "<pre>Could not execute json: \n"+vText+"\n</pre>";
}case qx.util.Mime.JAVASCRIPT:{if(qx.core.Setting.get("qx.ioRemoteDebugData")){this.debug("Response: "+vText);
}};
try{if(vText&&vText.length>0){return window.eval(vText)||null;
}else{return null;
}}catch(ex){this.error("Could not execute javascript: ["+vText+"]",
ex);
return null;
}case qx.util.Mime.XML:vText=this.getResponseXml();
{if(qx.core.Setting.get("qx.ioRemoteDebugData")){this.debug("Response: "+vText);
}};
return vText||null;
default:this.warn("No valid responseType specified ("+this.getResponseType()+")!");
return null;
}},
_applyState:function(value,
old){{if(qx.core.Setting.get("qx.ioRemoteDebug")){this.debug("State: "+value);
}};
switch(value){case "created":this.createDispatchEvent("created");
break;
case "configured":this.createDispatchEvent("configured");
break;
case "sending":this.createDispatchEvent("sending");
break;
case "receiving":this.createDispatchEvent("receiving");
break;
case "completed":this.createDispatchEvent("completed");
break;
case "failed":this.createDispatchEvent("failed");
break;
case "aborted":this.getRequest().abort();
this.createDispatchEvent("aborted");
break;
case "timeout":this.getRequest().abort();
this.createDispatchEvent("timeout");
break;
}}},
defer:function(statics,
members){qx.io.remote.Exchange.registerType(qx.io.remote.XmlHttpTransport,
"qx.io.remote.XmlHttpTransport");
},
destruct:function(){var vRequest=this.getRequest();
if(vRequest){vRequest.onreadystatechange=qx.io.remote.XmlHttpTransport.__dummy;
switch(vRequest.readyState){case 1:case 2:case 3:vRequest.abort();
}}this._disposeFields("_req");
}});




/* ID: qx.net.HttpRequest */
qx.Class.define("qx.net.HttpRequest",
{statics:{create:qx.core.Variant.select("qx.client",
{"default":function(){return new XMLHttpRequest;
},
"mshtml":qx.lang.Object.select(location.protocol!=="file:"&&window.XMLHttpRequest?"native":"activeX",
{"native":function(){return new XMLHttpRequest;
},
"activeX":function(){if(this.__server){return new ActiveXObject(this.__server);
}var servers=["MSXML2.XMLHTTP.3.0",
"MSXML2.XMLHTTP.6.0",
"MSXML2.XMLHTTP.4.0",
"MSXML2.XMLHTTP",
"Microsoft.XMLHTTP"];
var obj;
var server;
for(var i=0,
l=servers.length;i<l;i++){server=servers[i];
try{obj=new ActiveXObject(server);
break;
}catch(ex){obj=null;
}}
if(obj){this.__server=server;
}return obj;
}})})}});




/* ID: qx.io.Json */
qx.Class.define("qx.io.Json",
{statics:{BEAUTIFYING_INDENT:"  ",
BEAUTIFYING_LINE_END:"\n",
__map:{"function":"__convertFunction",
"boolean":"__convertBoolean",
"number":"__convertNumber",
"string":"__convertString",
"object":"__convertObject",
"undefined":"__convertUndefined"},
__convertFunction:function(incoming){return String(incoming);
},
__convertBoolean:function(incoming){return String(incoming);
},
__convertNumber:function(incoming){return isFinite(incoming)?String(incoming):"null";
},
__convertString:function(incoming){var result;
if(/["\\\x00-\x1f]/.test(incoming)){result=incoming.replace(/([\x00-\x1f\\"])/g,
qx.io.Json.__convertStringHelper);
}else{result=incoming;
}return '"'+result+'"';
},
__convertStringEscape:{'\b':'\\b',
'\t':'\\t',
'\n':'\\n',
'\f':'\\f',
'\r':'\\r',
'"':'\\"',
'\\':'\\\\'},
__convertStringHelper:function(a,
b){var result=qx.io.Json.__convertStringEscape[b];
if(result){return result;
}result=b.charCodeAt();
return '\\u00'+Math.floor(result/16).toString(16)+(result%16).toString(16);
},
__convertArray:function(incoming){var stringBuilder=[],
first=true,
func,
obj;
var beautify=qx.io.Json.__beautify;
stringBuilder.push("[");
if(beautify){qx.io.Json.__indent+=qx.io.Json.BEAUTIFYING_INDENT;
stringBuilder.push(qx.io.Json.__indent);
}
for(var i=0,
l=incoming.length;i<l;i++){obj=incoming[i];
func=this.__map[typeof obj];
if(func){obj=this[func](obj);
if(typeof obj=="string"){if(!first){stringBuilder.push(",");
if(beautify){stringBuilder.push(qx.io.Json.__indent);
}}stringBuilder.push(obj);
first=false;
}}}
if(beautify){qx.io.Json.__indent=qx.io.Json.__indent.substring(0,
qx.io.Json.__indent.length-qx.io.Json.BEAUTIFYING_INDENT.length);
stringBuilder.push(qx.io.Json.__indent);
}stringBuilder.push("]");
return stringBuilder.join("");
},
__convertDate:function(incoming){var dateParams=incoming.getUTCFullYear()+","+incoming.getUTCMonth()+","+incoming.getUTCDate()+","+incoming.getUTCHours()+","+incoming.getUTCMinutes()+","+incoming.getUTCSeconds()+","+incoming.getUTCMilliseconds();
return "new Date(Date.UTC("+dateParams+"))";
},
__convertMap:function(incoming){var stringBuilder=[],
first=true,
func,
obj;
var beautify=qx.io.Json.__beautify;
stringBuilder.push("{");
if(beautify){qx.io.Json.__indent+=qx.io.Json.BEAUTIFYING_INDENT;
stringBuilder.push(qx.io.Json.__indent);
}
for(var key in incoming){obj=incoming[key];
func=this.__map[typeof obj];
if(func){obj=this[func](obj);
if(typeof obj=="string"){if(!first){stringBuilder.push(",");
if(beautify){stringBuilder.push(qx.io.Json.__indent);
}}stringBuilder.push(this.__convertString(key),
":",
obj);
first=false;
}}}
if(beautify){qx.io.Json.__indent=qx.io.Json.__indent.substring(0,
qx.io.Json.__indent.length-qx.io.Json.BEAUTIFYING_INDENT.length);
stringBuilder.push(qx.io.Json.__indent);
}stringBuilder.push("}");
return stringBuilder.join("");
},
__convertObject:function(incoming){if(incoming){var constructorName=incoming.constructor.name;
if(incoming instanceof Array||constructorName=="Array"){return this.__convertArray(incoming);
}else if(incoming instanceof Date||constructorName=="Date"){return this.__convertDate(incoming);
}else if(incoming instanceof Object||constructorName=="Object"){return this.__convertMap(incoming);
}return "";
}return "null";
},
__convertUndefined:function(incoming){if(qx.core.Setting.get("qx.jsonEncodeUndefined")){return "null";
}},
stringify:function(obj,
beautify){this.__beautify=beautify;
this.__indent=this.BEAUTIFYING_LINE_END;
var result=this[this.__map[typeof obj]](obj);
if(typeof result!="string"){result=null;
}if(qx.core.Setting.get("qx.jsonDebugging")){qx.log.Logger.getClassLogger(qx.io.Json).debug("JSON request: "+result);
}return result;
},
parse:function(text){if(!(/[^,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]/.test(text.replace(/"(\\.|[^"\\])*"/g,
"")))){throw new Error("Could not parse JSON string!");
}
try{return eval("("+text+")");
}catch(ex){throw new Error("Could not evaluate JSON string: "+ex.message);
}},
parseQx:function(text){if(qx.core.Setting.get("qx.jsonDebugging")){qx.log.Logger.getClassLogger(qx.io.Json).debug("JSON response: "+text);
}var obj=(text&&text.length>0)?eval('('+text+')'):null;
return obj;
}},
settings:{"qx.jsonEncodeUndefined":true,
"qx.jsonDebugging":false}});




/* ID: qx.io.remote.IframeTransport */
qx.Class.define("qx.io.remote.IframeTransport",
{extend:qx.io.remote.AbstractRemoteTransport,
construct:function(){this.base(arguments);
var vUniqueId=(new Date).valueOf();
var vFrameName="frame_"+vUniqueId;
var vFormName="form_"+vUniqueId;
if(qx.core.Variant.isSet("qx.client",
"mshtml")){this._frame=document.createElement('<iframe name="'+vFrameName+'"></iframe>');
}else{this._frame=document.createElement("iframe");
}this._frame.src="javascript:void(0)";
this._frame.id=this._frame.name=vFrameName;
this._frame.onload=qx.lang.Function.bind(this._onload,
this);
this._frame.style.display="none";
document.body.appendChild(this._frame);
this._form=document.createElement("form");
this._form.target=vFrameName;
this._form.id=this._form.name=vFormName;
this._form.style.display="none";
document.body.appendChild(this._form);
this._data=document.createElement("textarea");
this._data.id=this._data.name="_data_";
this._form.appendChild(this._data);
this._frame.onreadystatechange=qx.lang.Function.bind(this._onreadystatechange,
this);
},
statics:{handles:{synchronous:false,
asynchronous:true,
crossDomain:false,
fileUpload:true,
programaticFormFields:true,
responseTypes:[qx.util.Mime.TEXT,
qx.util.Mime.JAVASCRIPT,
qx.util.Mime.JSON,
qx.util.Mime.XML,
qx.util.Mime.HTML]},
isSupported:function(){return true;
},
_numericMap:{"uninitialized":1,
"loading":2,
"loaded":2,
"interactive":3,
"complete":4}},
members:{_lastReadyState:0,
send:function(){var vMethod=this.getMethod();
var vUrl=this.getUrl();
var vParameters=this.getParameters();
var vParametersList=[];
for(var vId in vParameters){var value=vParameters[vId];
if(value instanceof Array){for(var i=0;i<value.length;i++){vParametersList.push(encodeURIComponent(vId)+"="+encodeURIComponent(value[i]));
}}else{vParametersList.push(encodeURIComponent(vId)+"="+encodeURIComponent(value));
}}
if(vParametersList.length>0){vUrl+=(vUrl.indexOf("?")>=0?"&":"?")+vParametersList.join("&");
}var vFormFields=this.getFormFields();
for(var vId in vFormFields){var vField=document.createElement("textarea");
vField.name=vId;
vField.appendChild(document.createTextNode(vFormFields[vId]));
this._form.appendChild(vField);
}this._form.action=vUrl;
this._form.method=vMethod;
this._data.appendChild(document.createTextNode(this.getData()));
this._form.submit();
this.setState("sending");
},
_onload:function(e){if(this._form.src){return;
}this._switchReadyState(qx.io.remote.IframeTransport._numericMap.complete);
},
_onreadystatechange:function(e){this._switchReadyState(qx.io.remote.IframeTransport._numericMap[this._frame.readyState]);
},
_switchReadyState:function(vReadyState){switch(this.getState()){case "completed":case "aborted":case "failed":case "timeout":this.warn("Ignore Ready State Change");
return;
}while(this._lastReadyState<vReadyState){this.setState(qx.io.remote.Exchange._nativeMap[++this._lastReadyState]);
}},
setRequestHeader:function(vLabel,
vValue){},
getResponseHeader:function(vLabel){return null;
},
getResponseHeaders:function(){return {};
},
getStatusCode:function(){return 200;
},
getStatusText:function(){return "";
},
getIframeWindow:function(){return qx.html.Iframe.getWindow(this._frame);
},
getIframeDocument:function(){return qx.html.Iframe.getDocument(this._frame);
},
getIframeBody:function(){return qx.html.Iframe.getBody(this._frame);
},
getIframeTextContent:function(){var vBody=this.getIframeBody();
if(!vBody){return null;
}
if(!vBody.firstChild){return "";
}if(vBody.firstChild.tagName&&vBody.firstChild.tagName.toLowerCase()=="pre"){return vBody.firstChild.innerHTML;
}else{return vBody.innerHTML;
}},
getIframeHtmlContent:function(){var vBody=this.getIframeBody();
return vBody?vBody.innerHTML:null;
},
getFetchedLength:function(){return 0;
},
getResponseContent:function(){if(this.getState()!=="completed"){{if(qx.core.Setting.get("qx.ioRemoteDebug")){this.warn("Transfer not complete, ignoring content!");
}};
return null;
}{if(qx.core.Setting.get("qx.ioRemoteDebug")){this.debug("Returning content for responseType: "+this.getResponseType());
}};
var vText=this.getIframeTextContent();
switch(this.getResponseType()){case qx.util.Mime.TEXT:{if(qx.core.Setting.get("qx.ioRemoteDebugData")){this.debug("Response: "+this._responseContent);
}};
return vText;
break;
case qx.util.Mime.HTML:vText=this.getIframeHtmlContent();
{if(qx.core.Setting.get("qx.ioRemoteDebugData")){this.debug("Response: "+this._responseContent);
}};
return vText;
break;
case qx.util.Mime.JSON:vText=this.getIframeHtmlContent();
{if(qx.core.Setting.get("qx.ioRemoteDebugData")){this.debug("Response: "+this._responseContent);
}};
try{return vText&&vText.length>0?qx.io.Json.parseQx(vText):null;
}catch(ex){return this.error("Could not execute json: ("+vText+")",
ex);
}case qx.util.Mime.JAVASCRIPT:vText=this.getIframeHtmlContent();
{if(qx.core.Setting.get("qx.ioRemoteDebugData")){this.debug("Response: "+this._responseContent);
}};
try{return vText&&vText.length>0?window.eval(vText):null;
}catch(ex){return this.error("Could not execute javascript: ("+vText+")",
ex);
}case qx.util.Mime.XML:vText=this.getIframeDocument();
{if(qx.core.Setting.get("qx.ioRemoteDebugData")){this.debug("Response: "+this._responseContent);
}};
return vText;
default:this.warn("No valid responseType specified ("+this.getResponseType()+")!");
return null;
}}},
defer:function(statics,
members,
properties){qx.io.remote.Exchange.registerType(qx.io.remote.IframeTransport,
"qx.io.remote.IframeTransport");
},
destruct:function(){if(this._frame){this._frame.onload=null;
this._frame.onreadystatechange=null;
if(qx.core.Variant.isSet("qx.client",
"gecko")){this._frame.src=qx.io.Alias.getInstance().resolve("static/image/blank.gif");
}document.body.removeChild(this._frame);
}
if(this._form){document.body.removeChild(this._form);
}this._disposeFields("_frame",
"_form");
}});




/* ID: qx.html.Iframe */
qx.Class.define("qx.html.Iframe",
{statics:{getWindow:qx.core.Variant.select("qx.client",
{"mshtml":function(vIframe){try{return vIframe.contentWindow;
}catch(ex){return null;
}},
"default":function(vIframe){try{var vDoc=qx.html.Iframe.getDocument(vIframe);
return vDoc?vDoc.defaultView:null;
}catch(ex){return null;
}}}),
getDocument:qx.core.Variant.select("qx.client",
{"mshtml":function(vIframe){try{var vWin=qx.html.Iframe.getWindow(vIframe);
return vWin?vWin.document:null;
}catch(ex){return null;
}},
"default":function(vIframe){try{return vIframe.contentDocument;
}catch(ex){return null;
}}}),
getBody:function(vIframe){var vDoc=qx.html.Iframe.getDocument(vIframe);
return vDoc?vDoc.getElementsByTagName("body")[0]:null;
}}});




/* ID: qx.io.remote.ScriptTransport */
qx.Class.define("qx.io.remote.ScriptTransport",
{extend:qx.io.remote.AbstractRemoteTransport,
construct:function(){this.base(arguments);
var vUniqueId=++qx.io.remote.ScriptTransport._uniqueId;
if(vUniqueId>=2000000000){qx.io.remote.ScriptTransport._uniqueId=vUniqueId=1;
}this._element=null;
this._uniqueId=vUniqueId;
},
statics:{_uniqueId:0,
_instanceRegistry:{},
ScriptTransport_PREFIX:"_ScriptTransport_",
ScriptTransport_ID_PARAM:"_ScriptTransport_id",
ScriptTransport_DATA_PARAM:"_ScriptTransport_data",
handles:{synchronous:false,
asynchronous:true,
crossDomain:true,
fileUpload:false,
programaticFormFields:false,
responseTypes:[qx.util.Mime.TEXT,
qx.util.Mime.JAVASCRIPT,
qx.util.Mime.JSON]},
isSupported:function(){return true;
},
_numericMap:{"uninitialized":1,
"loading":2,
"loaded":2,
"interactive":3,
"complete":4},
_requestFinished:function(id,
content){var vInstance=qx.io.remote.ScriptTransport._instanceRegistry[id];
if(vInstance==null){{if(qx.core.Setting.get("qx.ioRemoteDebug")){this.warn("Request finished for an unknown instance (probably aborted or timed out before)");
}};
}else{vInstance._responseContent=content;
vInstance._switchReadyState(qx.io.remote.ScriptTransport._numericMap.complete);
}}},
members:{_lastReadyState:0,
send:function(){var vUrl=this.getUrl();
vUrl+=(vUrl.indexOf("?")>=0?"&":"?")+qx.io.remote.ScriptTransport.ScriptTransport_ID_PARAM+"="+this._uniqueId;
var vParameters=this.getParameters();
var vParametersList=[];
for(var vId in vParameters){if(vId.indexOf(qx.io.remote.ScriptTransport.ScriptTransport_PREFIX)==0){this.error("Illegal parameter name. The following prefix is used internally by qooxdoo): "+qx.io.remote.ScriptTransport.ScriptTransport_PREFIX);
}var value=vParameters[vId];
if(value instanceof Array){for(var i=0;i<value.length;i++){vParametersList.push(encodeURIComponent(vId)+"="+encodeURIComponent(value[i]));
}}else{vParametersList.push(encodeURIComponent(vId)+"="+encodeURIComponent(value));
}}
if(vParametersList.length>0){vUrl+="&"+vParametersList.join("&");
}var vData=this.getData();
if(vData!=null){vUrl+="&"+qx.io.remote.ScriptTransport.ScriptTransport_DATA_PARAM+"="+encodeURIComponent(vData);
}qx.io.remote.ScriptTransport._instanceRegistry[this._uniqueId]=this;
this._element=document.createElement("script");
this._element.charset="utf-8";
this._element.src=vUrl;
{if(qx.core.Setting.get("qx.ioRemoteDebugData")){this.debug("Request: "+vUrl);
}};
document.body.appendChild(this._element);
},
_switchReadyState:function(vReadyState){switch(this.getState()){case "completed":case "aborted":case "failed":case "timeout":this.warn("Ignore Ready State Change");
return;
}while(this._lastReadyState<vReadyState){this.setState(qx.io.remote.Exchange._nativeMap[++this._lastReadyState]);
}},
setRequestHeader:function(vLabel,
vValue){},
getResponseHeader:function(vLabel){return null;
},
getResponseHeaders:function(){return {};
},
getStatusCode:function(){return 200;
},
getStatusText:function(){return "";
},
getFetchedLength:function(){return 0;
},
getResponseContent:function(){if(this.getState()!=="completed"){{if(qx.core.Setting.get("qx.ioRemoteDebug")){this.warn("Transfer not complete, ignoring content!");
}};
return null;
}{if(qx.core.Setting.get("qx.ioRemoteDebug")){this.debug("Returning content for responseType: "+this.getResponseType());
}};
switch(this.getResponseType()){case qx.util.Mime.TEXT:case qx.util.Mime.JSON:case qx.util.Mime.JAVASCRIPT:{if(qx.core.Setting.get("qx.ioRemoteDebugData")){this.debug("Response: "+this._responseContent);
}};
return this._responseContent||null;
default:this.warn("No valid responseType specified ("+this.getResponseType()+")!");
return null;
}}},
defer:function(statics,
members,
properties){qx.io.remote.Exchange.registerType(qx.io.remote.ScriptTransport,
"qx.io.remote.ScriptTransport");
},
destruct:function(){if(this._element){delete qx.io.remote.ScriptTransport._instanceRegistry[this._uniqueId];
document.body.removeChild(this._element);
}this._disposeFields("_element");
}});




/* ID: qx.util.ThemeList */
qx.Class.define("qx.util.ThemeList",
{statics:{__createButtons:function(parent,
x,
y,
list,
prefix,
callback){var theme,
button;
for(var i=0,
l=list.length;i<l;i++){theme=list[i];
if(theme.type==="abstract"){continue;
}button=new qx.ui.form.Button(prefix+theme.title,
"icon/16/actions/dialog-ok.png");
button.setUserData("theme",
theme);
button.setLocation(x,
y);
button.addEventListener("execute",
callback);
parent.add(button);
y+=30;
}},
createMetaButtons:function(parent,
x,
y){var mgr=qx.theme.manager.Meta.getInstance();
return this.__createButtons(parent,
x,
y,
mgr.getMetaThemes(),
"Theme: ",
function(e){qx.theme.manager.Meta.getInstance().setTheme(e.getTarget().getUserData("theme"));
});
},
createColorButtons:function(parent,
x,
y){var mgr=qx.theme.manager.Meta.getInstance();
return this.__createButtons(parent,
x,
y,
mgr.getColorThemes(),
"Color Theme: ",
function(e){qx.theme.manager.Color.getInstance().setColorTheme(e.getTarget().getUserData("theme"));
});
},
createBorderButtons:function(parent,
x,
y){var mgr=qx.theme.manager.Meta.getInstance();
return this.__createButtons(parent,
x,
y,
mgr.getBorderThemes(),
"Border Theme: ",
function(e){qx.theme.manager.Border.getInstance().setBorderTheme(e.getTarget().getUserData("theme"));
});
},
createFontButtons:function(parent,
x,
y){var mgr=qx.theme.manager.Meta.getInstance();
return this.__createButtons(parent,
x,
y,
mgr.getFontThemes(),
"Font Theme: ",
function(e){qx.theme.manager.Font.getInstance().setFontTheme(e.getTarget().getUserData("theme"));
});
},
createWidgetButtons:function(parent,
x,
y){var mgr=qx.theme.manager.Meta.getInstance();
return this.__createButtons(parent,
x,
y,
mgr.getWidgetThemes(),
"Widget Theme: ",
function(e){qx.theme.manager.Widget.getInstance().setWidgetTheme(e.getTarget().getUserData("theme"));
});
},
createIconButtons:function(parent,
x,
y){var mgr=qx.theme.manager.Meta.getInstance();
return this.__createButtons(parent,
x,
y,
mgr.getIconThemes(),
"Icon Theme: ",
function(e){qx.theme.manager.Icon.getInstance().setIconTheme(e.getTarget().getUserData("theme"));
});
},
createAppearanceButtons:function(parent,
x,
y){var mgr=qx.theme.manager.Meta.getInstance();
return this.__createButtons(parent,
x,
y,
mgr.getAppearanceThemes(),
"Appearance Theme: ",
function(e){qx.theme.manager.Appearance.getInstance().setAppearanceTheme(e.getTarget().getUserData("theme"));
});
}}});




/* ID: qx.client.Command */
qx.Class.define("qx.client.Command",
{extend:qx.core.Target,
events:{"execute":"qx.event.type.DataEvent"},
construct:function(shortcut,
keyCode){this.base(arguments);
this.__modifier={};
this.__key=null;
if(shortcut!=null){this.setShortcut(shortcut);
}
if(keyCode!=null){this.warn("The use of keyCode in command is deprecated. Use keyIdentifier instead.");
this.setKeyCode(keyCode);
}{if(this.__modifier.Alt&&this.__key&&this.__key.length==1){if((this.__key>="A"&&this.__key<="Z")||(this.__key>="0"&&this.__key<="9")){this.warn("A shortcut containing Alt and a letter or number will not work under OS X!");
}}};
qx.event.handler.EventHandler.getInstance().addCommand(this);
},
properties:{enabled:{init:true,
check:"Boolean",
event:"changeEnabled"},
shortcut:{check:"String",
apply:"_applyShortcut",
nullable:true},
keyCode:{check:"Number",
nullable:true},
keyIdentifier:{check:"String",
nullable:true}},
members:{getKeyCode:function(){return this._keyCode;
},
setKeyCode:function(code){qx.log.Logger.deprecatedMethodWarning(arguments.callee);
this._keyCode=code;
},
execute:function(vTarget){if(this.hasEventListeners("execute")){var event=new qx.event.type.DataEvent("execute",
vTarget);
this.dispatchEvent(event,
true);
}return false;
},
_applyShortcut:function(value,
old){if(value){this.__modifier={};
this.__key=null;
var a=value.split(/[-+\s]+/);
var al=a.length;
for(var i=0;i<al;i++){var identifier=this.__oldKeyNameToKeyIdentifier(a[i]);
switch(identifier){case "Control":case "Shift":case "Meta":case "Alt":this.__modifier[identifier]=true;
break;
case "Unidentified":var msg="Not a valid key name for a command: "+a[i];
this.error(msg);
throw msg;
default:if(this.__key){var msg="You can only specify one non modifier key!";
this.error(msg);
throw msg;
}this.__key=identifier;
}}}return true;
},
matchesKeyEvent:function(e){var key=this.__key||this.getKeyIdentifier();
if(!key&&!this.getKeyCode()){return ;
}if((this.__modifier.Shift&&!e.isShiftPressed())||
(this.__modifier.Control&&!e.isCtrlPressed())||
(this.__modifier.Alt&&!e.isAltPressed())){return false;
}
if(key){if(key==e.getKeyIdentifier()){return true;
}}else{if(this.getKeyCode()==e.getKeyCode()){return true;
}}return false;
},
__oldKeyNameToKeyIdentifierMap:{esc:"Escape",
ctrl:"Control",
print:"PrintScreen",
del:"Delete",
pageup:"PageUp",
pagedown:"PageDown",
numlock:"NumLock",
numpad_0:"0",
numpad_1:"1",
numpad_2:"2",
numpad_3:"3",
numpad_4:"4",
numpad_5:"5",
numpad_6:"6",
numpad_7:"7",
numpad_8:"8",
numpad_9:"9",
numpad_divide:"/",
numpad_multiply:"*",
numpad_minus:"-",
numpad_plus:"+"},
__oldKeyNameToKeyIdentifier:function(keyName){var keyHandler=qx.event.handler.KeyEventHandler.getInstance();
var keyIdentifier="Unidentified";
if(keyHandler.isValidKeyIdentifier(keyName)){return keyName;
}
if(keyName.length==1&&keyName>="a"&&keyName<="z"){return keyName.toUpperCase();
}keyName=keyName.toLowerCase();
if(!qx.event.type.KeyEvent.keys[keyName]){return "Unidentified";
}var keyIdentifier=this.__oldKeyNameToKeyIdentifierMap[keyName];
if(keyIdentifier){return keyIdentifier;
}else{return qx.lang.String.toFirstUp(keyName);
}},
toString:function(){var keyCode=this.getKeyCode();
var key=this.__key||this.getKeyIdentifier();
var str=[];
for(var modifier in this.__modifier){str.push(qx.locale.Key.getKeyName("short",
modifier));
}
if(key){str.push(qx.locale.Key.getKeyName("short",
key));
}
if(keyCode!=null){var vTemp=qx.event.type.KeyEvent.codes[keyCode];
str.push(vTemp?qx.lang.String.toFirstUp(vTemp):String(keyCode));
}return str.join("-");
}},
destruct:function(){var mgr=qx.event.handler.EventHandler.getInstance();
if(mgr){mgr.removeCommand(this);
}this._disposeFields("__modifier",
"__key");
}});




/* ID: qx.locale.Key */
qx.Class.define("qx.locale.Key",
{statics:{getKeyName:function(size,
keyIdentifier,
locale){if(size!="short"&&size!="full"){throw new Error('format must be one of: "short", "full"');
}var key="key_"+size+"_"+keyIdentifier;
var localizedKey=new qx.locale.LocalizedString(key,
[],
locale);
if(localizedKey==key){return qx.locale.Key._keyNames[key]||keyIdentifier;
}else{return localizedKey.toString();
}}},
defer:function(statics,
members,
properties){var keyNames={};
var Manager=qx.locale.Manager;
keyNames[Manager.marktr("key_short_Backspace")]="Backspace";
keyNames[Manager.marktr("key_short_Tab")]="Tab";
keyNames[Manager.marktr("key_short_Space")]="Space";
keyNames[Manager.marktr("key_short_Enter")]="Enter";
keyNames[Manager.marktr("key_short_Shift")]="Shift";
keyNames[Manager.marktr("key_short_Control")]="Ctrl";
keyNames[Manager.marktr("key_short_Alt")]="Alt";
keyNames[Manager.marktr("key_short_CapsLock")]="Caps";
keyNames[Manager.marktr("key_short_Meta")]="Meta";
keyNames[Manager.marktr("key_short_Escape")]="Esc";
keyNames[Manager.marktr("key_short_Left")]="Left";
keyNames[Manager.marktr("key_short_Up")]="Up";
keyNames[Manager.marktr("key_short_Right")]="Right";
keyNames[Manager.marktr("key_short_Down")]="Down";
keyNames[Manager.marktr("key_short_PageUp")]="PgUp";
keyNames[Manager.marktr("key_short_PageDown")]="PgDn";
keyNames[Manager.marktr("key_short_End")]="End";
keyNames[Manager.marktr("key_short_Home")]="Home";
keyNames[Manager.marktr("key_short_Insert")]="Ins";
keyNames[Manager.marktr("key_short_Delete")]="Del";
keyNames[Manager.marktr("key_short_NumLock")]="Num";
keyNames[Manager.marktr("key_short_PrintScreen")]="Print";
keyNames[Manager.marktr("key_short_Scroll")]="Scroll";
keyNames[Manager.marktr("key_short_Pause")]="Pause";
keyNames[Manager.marktr("key_short_Win")]="Win";
keyNames[Manager.marktr("key_short_Apps")]="Apps";
keyNames[Manager.marktr("key_full_Backspace")]="Backspace";
keyNames[Manager.marktr("key_full_Tab")]="Tabulator";
keyNames[Manager.marktr("key_full_Space")]="Space";
keyNames[Manager.marktr("key_full_Enter")]="Enter";
keyNames[Manager.marktr("key_full_Shift")]="Shift";
keyNames[Manager.marktr("key_full_Control")]="Control";
keyNames[Manager.marktr("key_full_Alt")]="Alt";
keyNames[Manager.marktr("key_full_CapsLock")]="CapsLock";
keyNames[Manager.marktr("key_full_Meta")]="Meta";
keyNames[Manager.marktr("key_full_Escape")]="Escape";
keyNames[Manager.marktr("key_full_Left")]="Left";
keyNames[Manager.marktr("key_full_Up")]="Up";
keyNames[Manager.marktr("key_full_Right")]="Right";
keyNames[Manager.marktr("key_full_Down")]="Down";
keyNames[Manager.marktr("key_full_PageUp")]="PageUp";
keyNames[Manager.marktr("key_full_PageDown")]="PageDown";
keyNames[Manager.marktr("key_full_End")]="End";
keyNames[Manager.marktr("key_full_Home")]="Home";
keyNames[Manager.marktr("key_full_Insert")]="Insert";
keyNames[Manager.marktr("key_full_Delete")]="Delete";
keyNames[Manager.marktr("key_full_NumLock")]="NumLock";
keyNames[Manager.marktr("key_full_PrintScreen")]="PrintScreen";
keyNames[Manager.marktr("key_full_Scroll")]="Scroll";
keyNames[Manager.marktr("key_full_Pause")]="Pause";
keyNames[Manager.marktr("key_full_Win")]="Win";
keyNames[Manager.marktr("key_full_Apps")]="Apps";
statics._keyNames=keyNames;
}});




/* ID: vhf.Main */
qx.Class.define("vhf.Main",
{extend:qx.application.Gui,
type:"singleton",
properties:{Version:{init:"0.1.0.1a"},
AppIcon:{init:"categories/applications-internet.png"},
Copyright:{init:"<div style=\"font-size: 8px;\">Copyright (c) 2007 Make A Byte, inc.</div>"},
Doc:{init:null},
Layout:{init:null},
Workspace:{init:new qx.ui.layout.CanvasLayout},
Toolbar:{init:new qx.ui.toolbar.ToolBar},
Menubar:{init:new qx.ui.menubar.MenuBar},
OpenMenu:{init:new qx.ui.menu.Menu},
OpenBtn:{init:new qx.ui.menu.Button},
PreferencesBtn:{init:new qx.ui.menu.Button},
SettingsBtn:{init:new qx.ui.menu.Button},
SoftwareUpdatesBtn:{init:new qx.ui.menu.Button},
LoginBtn:{init:new qx.ui.menu.Button},
LogoutBtn:{init:new qx.ui.menu.Button},
Statusbar:{init:new qx.ui.basic.Atom},
_LoadingWin:{init:new qx.ui.window.Window("Loading",
"icon/16/categories/applications-system.png")},
RpcTimeout:{init:15000},
RpcProtocol:{init:"http://"},
RpcServer:{init:"localhost"},
RpcUseHttpAuth:{init:false},
RpcCrossDomain:{init:false},
RpcUser:{init:null},
RpcPass:{init:null},
RpcSsl:{init:false},
UserAttribs:{init:[]},
UserPackages:{init:[]},
PackageRepositories:{init:[]},
LoadedPackages:{init:[]},
ExternalSites:{init:null}},
members:{main:function(){this.base(arguments);
qx.io.Alias.getInstance().add("vhf",
qx.core.Setting.get("vhf.resourceUri"));
qx.Class.include(qx.ui.core.Widget,
qx.ui.animation.MAnimation);
qx.Class.patch(qx.ui.treevirtual.TreeVirtual,
qx.ui.treevirtual.MDragAndDropSupport);
qx.Class.include(qx.ui.treevirtual.TreeVirtual,
qx.ui.treevirtual.MNode);
qx.html.StyleSheet.includeFile(qx.io.Alias.getInstance().resolve("vhf/css/style.css"));
qx.theme.manager.Meta.getInstance().setTheme(qx.theme.Ext);
var iconTheme=qx.theme.manager.Icon.getInstance();
this.setDoc(qx.ui.core.ClientDocument.getInstance());
this.setLayout(new qx.ui.layout.DockLayout);
this.getLayout().setLocation(0,
0);
this.getLayout().setRight(0);
this.getLayout().setBottom(0);
this.getLayout().set({height:"100%",
width:"100%"});
this.getDoc().add(this.getLayout());
var header=new qx.ui.embed.HtmlEmbed("<h1>Virtual Host Framework :: Control Panel</h1>");
header.setHtmlProperty("className",
"header");
header.setHeight(50);
this.getLayout().addTop(header);
this.getStatusbar().setLabel("Status");
this.getStatusbar().setIcon("icon/16/"+this.getAppIcon());
this.getStatusbar().setWidth(null);
this.getStatusbar().setBorder("inset-thin");
this.getStatusbar().setHorizontalChildrenAlign("left");
this.getStatusbar().setPadding(2,
4);
this.getStatusbar().setBackgroundColor("background");
this.getLayout().addBottom(this.getStatusbar());
this.getWorkspace().set({left:0,
top:98,
right:0,
bottom:23,
border:"inset"});
this.getWorkspace().setOverflow("hidden");
this.getDoc().add(this.getWorkspace());
this.__initMenubar();
this._initToolbar();
},
_initToolbar:function(){this.getLayout().addTop(this.getToolbar());
this.getToolbar().add(new qx.ui.toolbar.Part);
this._setToolbarButton("Home",
"http://vhf.makeabyte.com");
},
_setToolbarButton:function(name,
URL,
icon){var ico;
(icon==null)?ico="icon/16/categories/applications-internet.png":ico=icon;
var btn=new qx.ui.toolbar.Button(name,
ico);
btn.addEventListener("execute",
function(e){this._loadExternalSite(name,
URL);
},
this);
this.getToolbar().add(btn);
},
__initMenubar:function(){this.getLayout().addTop(this.getMenubar());
var filemnu=new qx.ui.menu.Menu;
var toolmnu=new qx.ui.menu.Menu;
var helpmnu=new qx.ui.menu.Menu;
this.getLoginBtn().setLabel("Login");
this.getLoginBtn().setIcon("icon/16/status/dialog-password.png");
this.getLoginBtn().addEventListener("execute",
function(e){this._loadPackage("packages.core.ui.window.Login");
},
this);
this.getOpenBtn().setLabel("Open");
this.getOpenBtn().setIcon("icon/16/actions/document-open.png");
this.getOpenBtn().setMenu(this.getOpenMenu());
this.getOpenBtn().setEnabled(false);
var prntBtn=new qx.ui.menu.Button("Print",
"icon/16/actions/document-print.png");
prntBtn.addEventListener("execute",
function(e){window.print();
});
this.getLogoutBtn().setLabel("Logout");
this.getLogoutBtn().setIcon("icon/16/actions/application-exit.png");
this.getLogoutBtn().addEventListener("execute",
function(e){this.__logout();
},
this);
this.getLogoutBtn().setEnabled(false);
filemnu.add(this.getLoginBtn());
filemnu.add(new qx.ui.menu.Separator);
filemnu.add(this.getOpenBtn());
filemnu.add(new qx.ui.menu.Separator);
filemnu.add(prntBtn);
filemnu.add(new qx.ui.menu.Separator);
filemnu.add(this.getLogoutBtn());
this.getPreferencesBtn().setLabel("Preferences");
this.getPreferencesBtn().setIcon("icon/16/categories/preferences.png");
this.getPreferencesBtn().setEnabled(false);
this.getPreferencesBtn().addEventListener("execute",
function(e){this._loadPackage("packages.core.ui.window.Preferences");
},
this);
this.getSettingsBtn().setLabel("Settings");
this.getSettingsBtn().setIcon("icon/16/categories/applications-utilities.png");
this.getSettingsBtn().addEventListener("execute",
function(e){this._loadPackage("packages.core.ui.window.Settings");
},
this);
this.getSettingsBtn().setEnabled(false);
toolmnu.add(this.getPreferencesBtn());
toolmnu.add(new qx.ui.menu.Separator);
toolmnu.add(this.getSettingsBtn());
var helpBtn=new qx.ui.menu.Button("Help",
"icon/16/actions/help-contents.png");
helpBtn.addEventListener("execute",
function(e){this._loadPackage("packages.core.ui.window.NewAccount");
},
this);
this.getSoftwareUpdatesBtn().setLabel("Software Updates");
this.getSoftwareUpdatesBtn().setIcon("icon/16/apps/system-software-update.png");
this.getSoftwareUpdatesBtn().setEnabled(false);
this.getSoftwareUpdatesBtn().addEventListener("execute",
function(e){this._loadPackage("packages.core.ui.window.SoftwareUpdates");
},
this);
var aboutBtn=new qx.ui.menu.Button("About",
"icon/16/actions/help-about.png");
aboutBtn.addEventListener("execute",
function(e){this.__showAboutWin();
},
this);
helpmnu.add(helpBtn);
helpmnu.add(new qx.ui.menu.Separator);
helpmnu.add(this.getSoftwareUpdatesBtn());
helpmnu.add(new qx.ui.menu.Separator);
helpmnu.add(aboutBtn);
var fileMenu=new qx.ui.menubar.Button("File",
filemnu);
var toolMenu=new qx.ui.menubar.Button("Tools",
toolmnu);
var helpMenu=new qx.ui.menubar.Button("Help",
helpmnu);
this.getMenubar().add(fileMenu,
toolMenu,
helpMenu);
this.getDoc().add(filemnu,
toolmnu,
helpmnu);
this.getDoc().add(this.getOpenMenu());
},
_loadPackage:function(classpath,
args){var arrLoadedPackages=this.getLoadedPackages();
if(arrLoadedPackages.length){if(arrLoadedPackages.indexOf(classpath)!=-1){var cls=eval(classpath);
if(args!=null)var obj=new cls(args);
else var obj=new cls();
return true;
}}var packagePath=classpath.replace(/\./g,
"/")+".js";
var req=new qx.io.remote.Request(packagePath,
"GET",
qx.util.Mime.JAVASCRIPT);
req.addEventListener("completed",
function(e){try{arrLoadedPackages.push(classpath);
var cls=eval(classpath);
if(args!=null)var obj=new cls(args);
else var obj=new cls();
}catch(e){this._showAlertDialog("error",
"Error instantiating package: "+packagePath+"\r\n"+e.toString(),
"Object Instantiation Error",
null);
}},
this);
req.addEventListener("failed",
function(e){this._showAlertDialog("error",
"Error loading source file: "+packagePath,
"Package Source Loading Error",
null);
},
this);
req.addEventListener("timeout",
function(e){this._showAlertDialog("error",
"Could not load the requested source file: "+packagePath+". Request timed out.",
"Package Source Loading Error",
null);
},
this);
req.send();
},
_callAsyncRpc:function(callback,
service,
method){var rpc=new qx.io.remote.Rpc;
rpc.setUrl(this.getRpcProtocol()+this.getRpcServer());
rpc.setServiceName(service);
rpc.setTimeout(this.getRpcTimeout());
rpc.setCrossDomain(this.getRpcCrossDomain());
if(this.getRpcUseHttpAuth()){rpc.setUseBasicHttpAuth(true);
rpc.setUsername(this.getRpcUser());
rpc.setPassword(this.getRpcPass());
}var rpcCall="rpc.callAsync( callback, method, ";
for(var i=0;i<arguments.length;i++){if(i>2){rpcCall+="'"+arguments[i]+"'";
if(i<arguments.length-1)rpcCall+=",";
}}rpcCall+=")";
eval(rpcCall);
},
_setStatusText:function(text){this.getStatusbar().setLabel(text);
},
_setModuleButton:function(objButton){this.getOpenMenu().add(objButton);
},
_addToWorkspace:function(obj){this.getWorkspace().add(obj);
},
__logout:function(){this.getWorkspace().removeAll();
this._showAlertDialog("security",
"You have been successfully logged out.",
"Logout Successful",
null);
},
__logoutHandler:function(){window.location.reload();
},
_loadExternalSite:function(name,
URL){var siteWin=new qx.ui.window.Window(name,
"icon/16/categories/applications-internet.png");
siteWin.set({showMinimize:false,
showMaximize:true,
allowMaximize:true,
width:'100%',
height:'100%'});
this._addToWorkspace(siteWin);
var w1=new qx.ui.layout.CanvasLayout;
w1.setWidth("100%");
w1.setHeight("100%");
w1.setBackgroundColor("white");
var iframe=new qx.ui.embed.Iframe(URL);
iframe.set({width:'100%',
height:'100%'});
w1.add(iframe);
siteWin.add(w1);
siteWin.addEventListener("appear",
siteWin.centerToBrowser,
siteWin);
siteWin.open();
},
__showAboutWin:function(){var aboutWin=new qx.ui.window.Window("About",
"icon/16/actions/help-about.png");
aboutWin.set({modal:true,
showMinimize:false,
showMaximize:false,
allowMaximize:false,
width:350,
height:270});
var w1=new qx.ui.layout.CanvasLayout;
w1.setWidth(329);
w1.setHeight(223);
w1.setLeft(10);
w1.setTop(10);
w1.setBackgroundColor("white");
var aboutHTML="<div style=\"padding-left: 5px;\"><h3>Virtual Host Framework :: Control Panel</h3></div>";
aboutHTML+="<div style=\"padding-left: 5px;\"><h5>Version "+this.getVersion()+"</h5></div>";
aboutHTML+="<div style=\"padding: 0 5px 0 5px;\"><hr></div>";
aboutHTML+="<div style=\"float: right;\"><a href=\"http://www.makeabyte.com\" target=\"_blank\"><img border=\"0\" src=\"resource/vhf/icon/mab.jpg\" width=\"150\" height=\"50\"></a> &nbsp; &nbsp; </div>";
aboutHTML+="<div style=\"padding: 15px 0 0 5px;\">Copyright &copy; 2007<br>All rights reserved</div>";
aboutHTML+="<div style=\"padding: 18px 0 0 5px;\">This program comes with ABSOLUTELY NO WARRANTY; This is free software, and you are welcome to ";
aboutHTML+="redistribute it under certain conditions; Please see the <a href=\"http://www.gnu.org/licenses\" target=\"_blank\">GNU Public License</a> for more details.</div>";
var at1=new qx.ui.basic.Label(aboutHTML,
null,
"html");
at1.set({width:330});
at1.setWrap(true);
w1.add(at1);
aboutWin.add(w1);
aboutWin.addEventListener("appear",
aboutWin.centerToBrowser,
aboutWin);
aboutWin.open();
aboutWin.addToDocument();
},
_showLoadingWin:function(){this._getLoadingWin().set({modal:true,
showMinimize:false,
showMaximize:false,
showClose:false,
width:200,
height:100});
this._getLoadingWin().addToDocument();
var at1=new qx.ui.basic.Label("<em><b>Processing Request...</b></em>",
null,
"html");
at1.set({top:30,
left:30,
width:"auto"});
at1.setWrap(true);
this._getLoadingWin().add(at1);
this._getLoadingWin().addEventListener("appear",
this._getLoadingWin().centerToBrowser,
this._getLoadingWin());
this._getLoadingWin().open();
},
_showAlertDialog:function(type,
msg,
title,
callback){var ICON;
var TYPE;
var infoIcon="status/dialog-information.png";
var warnIcon="status/dialog-warning.png";
var errIcon="status/dialog-error.png";
var secIcon="status/dialog-password.png";
switch(type){case "info":ICON=infoIcon;
TYPE="Information";
break;
case "warn":ICON=warnIcon;
TYPE="Warning";
break;
case "error":ICON=errIcon;
TYPE="Error";
break;
case "security":ICON=secIcon;
TYPE="Security";
break;
default:ICON=infoIcon;
break;
}var alertWin=new qx.ui.window.Window(title,
"icon/16/"+this.getAppIcon());
alertWin.set({modal:true,
showMinimize:false,
showMaximize:false,
allowMaximize:false,
width:"auto",
height:"auto"});
var at1=new qx.ui.basic.Atom(TYPE,
"icon/32/"+ICON);
at1.set({top:10,
left:10});
var lblMsg=new qx.ui.basic.Label(""+msg,
null,
null);
lblMsg.set({wrap:true,
left:30,
top:50,
width:"auto"});
lblMsg.setPadding(0,
20,
50,
0);
var btnOK=new qx.ui.form.Button("OK",
"icon/16/actions/dialog-ok.png");
btnOK.addEventListener("execute",
function(e){alertWin.close();
if(callback!=null)callback();
});
btnOK.set({bottom:10,
right:10});
alertWin.add(at1,
lblMsg,
btnOK);
alertWin.addEventListener("appear",
alertWin.centerToBrowser,
alertWin);
alertWin.open();
alertWin.addToDocument();
},
_showConfirmDialog:function(msg,
title,
callback,
args){var confirmWin=new qx.ui.window.Window("Confirm",
"icon/16/status/dialog-information.png");
confirmWin.set({modal:true,
showMinimize:false,
showMaximize:false,
allowMaximize:false,
width:"auto",
height:"auto"});
var at1=new qx.ui.basic.Atom("Confirm",
"icon/32/status/dialog-information.png");
at1.set({top:10,
left:10});
var lblMsg=new qx.ui.basic.Label(msg,
null,
null);
lblMsg.set({wrap:true,
left:30,
top:50,
width:"auto"});
lblMsg.setPadding(0,
20,
50,
0);
var btnCancel=new qx.ui.form.Button("Cancel",
"icon/16/actions/dialog-cancel.png");
btnCancel.addEventListener("execute",
function(e){confirmWin.close();
});
btnCancel.set({bottom:10,
right:65});
var btnOK=new qx.ui.form.Button("OK",
"icon/16/actions/dialog-ok.png");
if(args==null)btnOK.addEventListener("execute",
function(e){confirmWin.close();
if(callback!=null)callback();
});
else btnOK.addEventListener("execute",
function(e){confirmWin.close();
if(callback!=null)callback(args);
});
btnOK.set({bottom:10,
right:10});
confirmWin.add(at1,
lblMsg,
btnOK,
btnCancel);
confirmWin.addEventListener("appear",
confirmWin.centerToBrowser,
confirmWin);
confirmWin.open();
confirmWin.addToDocument();
},
_showPromptDialog:function(msg,
title,
callback,
icon){var ico;
(icon!=null&&icon!=undefined)?ico=icon:ico="icon/16/"+this.getAppIcon();
var promptWin=new qx.ui.window.Window(title,
ico);
promptWin.set({modal:true,
showMinimize:false,
showMaximize:false,
allowMaximize:false,
width:"auto",
height:"auto"});
var lblMsg=new qx.ui.basic.Label(msg,
null,
null);
lblMsg.set({wrap:true,
left:20,
top:20,
width:"auto"});
lblMsg.setPadding(0,
20,
50,
0);
var txtValue=new qx.ui.form.TextField();
txtValue.set({top:40,
left:20,
right:20,
bottom:50,
width:'80%'});
var btnOK=new qx.ui.form.Button("OK",
"icon/16/actions/dialog-ok.png");
btnOK.addEventListener("execute",
function(e){promptWin.close();
if(callback!=null)callback(txtValue.getValue());
else return txtValue.getValue();
});
btnOK.set({bottom:10,
right:10});
promptWin.add(lblMsg,
txtValue,
btnOK);
promptWin.addEventListener("appear",
promptWin.centerToBrowser,
promptWin);
promptWin.open();
promptWin.addToDocument();
},
propertiesToArray:function(obj){var objArray=[];
for(var i=0;i<obj.count;i++)objArray.push(obj[i]);
return objArray;
},
isArray:function(obj){if(obj.constructor.toString().indexOf("Array")==-1)return false;
else return true;
},
arrayToJson:function(array){var json="[";
for(var i=0;i<array.length;i++){json+='"'+array[i]+'"';
if(i<array.length-1)json+=",";
}json+=']';
return json;
},
close:function(){this.base(arguments);
},
terminate:function(){this.base(arguments);
}},
settings:{"vhf.resourceUri":"./resource"},
destruct:function(){}});




/* ID: qx.ui.animation.MAnimation */
qx.Mixin.define("qx.ui.animation.MAnimation",
{events:{"FADE_FINISHED":"qx.event.type.DataEvent"},
statics:{FADE_IN:'FADE_IN',
FADE_OUT:'FADE_OUT',
FADE_FINISHED:'FADE_FINISHED'},
properties:{fadeSteps:{check:"Integer",
init:10,
apply:"_applyFadeSteps"},
fadeTime:{check:"Integer",
init:400,
apply:"_applyFadeTime"},
fadeInterval:{check:"Integer",
init:40},
fadeCounter:{check:"Integer",
init:0},
fadeUnit:{check:"Integer",
init:10,
apply:"_applyFadeUnit"},
fadeMax:{check:"Integer",
init:100,
apply:"_applyFadeMax"}},
members:{fadeIn:function(vSteps,
vTime){if(vSteps)this.setFadeSteps(vSteps);
if(vTime)this.setFadeTime(vTime);
this._fadeMode=qx.ui.animation.MAnimation.FADE_IN;
this.setFadeCounter(0);
var timer=this.getFadeTimer();
timer.addEventListener("interval",
this._onInterval,
this);
timer.start();
},
fadeOut:function(vSteps,
vTime){if(vSteps)this.setFadeSteps(vSteps);
if(vTime)this.setFadeTime(vTime);
this._fadeMode=qx.ui.animation.MAnimation.FADE_OUT;
this.setFadeCounter(this.getFadeSteps());
var timer=this.getFadeTimer();
timer.addEventListener("interval",
this._onInterval,
this);
timer.start();
},
getFadeTimer:function(){if(this._fadeTimer){this._fadeTimer.setInterval(this.getFadeInterval());
}else{this._fadeTimer=new qx.client.Timer(this.getFadeInterval());
}return this._fadeTimer;
},
resetFader:function(){this.setFadeCounter(0);
if(this.getFadeTimer()){this._fadeTimer.stop();
this._fadeTimer.dispose();
}this._fadeTimer.dispose();
this._fadeTimer=null;
},
_onInterval:function(e){this.getFadeTimer().stop();
var counter=this.getFadeCounter();
switch(this._fadeMode){case qx.ui.animation.MAnimation.FADE_IN:this.setFadeCounter(++counter);
if(counter<=this.getFadeSteps()){this.setOpacity(this._computeFadeOpacity());
this.getFadeTimer().restart();
}else if(this.hasEventListeners(qx.ui.animation.MAnimation.FADE_FINISHED)){this.createDispatchDataEvent(qx.ui.animation.MAnimation.FADE_FINISHED,
qx.ui.animation.MAnimation.FADE_IN);
}break;
case qx.ui.animation.MAnimation.FADE_OUT:this.setFadeCounter(--counter);
if(counter>=0){this.setOpacity(this._computeFadeOpacity());
this.getFadeTimer().restart();
}else if(this.hasEventListeners(qx.ui.animation.MAnimation.FADE_FINISHED)){this.createDispatchDataEvent(qx.ui.animation.MAnimation.FADE_FINISHED,
qx.ui.animation.MAnimation.FADE_OUT);
}break;
}},
_applyFadeSteps:function(value,
old){if(value<1)return;
this.setFadeInterval(parseInt(this.getFadeTime()/value));
this.setFadeUnit(Math.round(this.getFadeMax()/value));
return true;
},
_applyFadeTime:function(value,
old){if(value<1)return;
this.setFadeInterval(parseInt(value/this.getFadeSteps()));
return true;
},
_applyFadeUnit:function(value,
old){this.setFadeSteps(Math.round(this.getFadeMax()/value));
return true;
},
_applyFadeMax:function(value,
old){this.setFadeUnit(Math.round(value/this.getFadeSteps()));
return true;
},
_computeFadeOpacity:function(){var op=this.getFadeUnit()*this.getFadeCounter()/100;
return (op);
}},
destruct:function(){this._disposeObjects("_fadeTimer");
}});




/* ID: qx.theme.ext.Color */
qx.Theme.define("qx.theme.ext.Color",
{title:"Ext",
extend:qx.theme.classic.color.Royale,
colors:{"document-background":[243,
248,
253],
"background":[229,
244,
254],
"border-light":[101,
147,
207],
"border-light-shadow":[253,
216,
137],
"border-dark":[0,
60,
116],
"border-dark-shadow":[101,
147,
207],
"effect":[188,
212,
247],
"selected":[188,
212,
247],
"text":[31,
62,
117],
"text-disabled":[170,
170,
170],
"text-selected":[31,
62,
117],
"tooltip":[253,
255,
180],
"tooltip-text":"black",
"tooltip-border":[252,
201,
13],
"menu":"white",
"list":[250,
251,
254],
"field":[188,
212,
247],
"button":[188,
212,
247],
"button-hover":[229,
244,
254],
"button-abandoned":[235,
233,
237],
"window-active-caption-text":[255,
255,
255],
"window-inactive-caption-text":[128,
128,
128],
"window-active-caption":[31,
62,
117],
"window-inactive-caption":[220,
220,
220],
"button-view-pane":[255,
255,
255],
"button-view-bar":[188,
212,
247],
"button-view-button":[188,
212,
247],
"button-view-button-border":[31,
62,
117],
"tab-view-pane":[255,
255,
255],
"tab-view-border":[101,
147,
207],
"tab-view-button":[210,
214,
216],
"tab-view-button-hover":[188,
212,
247],
"tab-view-button-checked":[188,
212,
247],
"tab-view-text":[30,
60,
115],
"tab-view-text-disabled":[102,
102,
102],
"radio-view-pane":[255,
255,
255],
"radio-view-border":[101,
147,
207],
"radio-view-bar":[188,
212,
247],
"radio-view-button-checked":[250,
251,
254],
"list-view":"white",
"list-view-border":[101,
147,
207],
"list-view-header":[235,
234,
219],
"list-view-header-border":[226,
226,
226],
"list-view-header-separator-border":[214,
213,
217],
"list-view-header-border-hover":[249,
177,
25],
"list-view-header-cell-hover":[250,
249,
244],
"list-view-content-cell":[90,
138,
211],
"date-chooser":"white",
"datec-chooser-title":[31,
62,
117],
"date-chooser-day":[31,
62,
117],
"table-pane":"white",
"table-header":[244,
248,
254],
"table-header-border":[176,
199,
230],
"table-header-border-hover":[101,
147,
207],
"table-header-cell":[244,
248,
254],
"table-header-cell-hover":[255,
255,
255],
"table-focus-indicator":[197,
200,
202],
"table-row-background-focused-selected":[90,
138,
211],
"table-row-background-focused":[221,
238,
255],
"table-row-background-selected":[101,
147,
207],
"table-row-background-even":[239,
245,
253],
"table-row-background-odd":[255,
255,
255],
"table-row-selected":[255,
255,
255],
"table-row":[0,
0,
0],
"general-border":[101,
147,
207],
"toolbar-background":[201,
222,
250],
"toolbar-border":[152,
192,
244],
"group-box-legend":[101,
147,
207],
"splitpane-slider-dragging":[0,
60,
116]}});




/* ID: qx.theme.ext.Border */
qx.Theme.define("qx.theme.ext.Border",
{title:"Ext",
extend:qx.theme.classic.Border,
borders:{"inset-thin":{width:1,
color:"border-light"},
"outset":{width:2,
color:"border-light",
innerColor:"border-light"},
"inset-button":{width:2,
color:"border-dark",
innerColor:"border-light-shadow"},
"outset-thin-button":{width:1,
color:"border-dark"},
"tooltip":{width:1,
color:"tooltip-border"},
"general":{width:1,
color:"general-border"},
"toolbar":{width:1,
color:"toolbar-border"},
"button-view-button":{width:1,
color:"button-view-button-border"},
"tab-view-pane":{width:1,
color:"tab-view-border"},
"list-view":{width:1,
color:"list-view-border"},
"line-left":{widthLeft:1,
colorLeft:"general-border"},
"line-right":{widthRight:1,
colorRight:"general-border"},
"line-top":{widthTop:1,
colorTop:"general-border"},
"line-bottom":{widthBottom:1,
colorBottom:"general-border"}}});




/* ID: qx.theme.ext.font.Default */
qx.Theme.define("qx.theme.ext.font.Default",
{title:"Ext",
fonts:{"default":{size:11,
family:["Verdana",
"Helvetica",
"Lucida Grande",
"Tahoma",
"Bitstream Vera Sans",
"Liberation Sans"]},
"bold":{size:11,
family:["Verdana",
"Helvetica",
"Lucida Grande",
"Tahoma",
"Bitstream Vera Sans",
"Liberation Sans"],
bold:true},
"large":{size:13,
family:["Verdana",
"Helvetica",
"Lucida Grande",
"Tahoma",
"Bitstream Vera Sans",
"Liberation Sans"]},
"bold-large":{size:13,
family:["Verdana",
"Helvetica",
"Lucida Grande",
"Tahoma",
"Bitstream Vera Sans",
"Liberation Sans"],
bold:true}}});




/* ID: qx.theme.ext.Widget */
qx.Theme.define("qx.theme.ext.Widget",
{title:"Ext",
widgets:{uri:qx.core.Setting.get("qx.resourceUri")+"/widget/Ext"}});




/* ID: qx.theme.ext.Appearance */
qx.Theme.define("qx.theme.ext.Appearance",
{title:"Ext",
appearances:{"empty":{},
"widget":{},
"image":{},
"atom":{},
"popup":{},
"cursor-dnd-move":{style:function(states){return {source:"widget/cursors/move.gif"};
}},
"cursor-dnd-copy":{style:function(states){return {source:"widget/cursors/copy.gif"};
}},
"cursor-dnd-alias":{style:function(states){return {source:"widget/cursors/alias.gif"};
}},
"cursor-dnd-nodrop":{style:function(states){return {source:"widget/cursors/nodrop.gif"};
}},
"label":{style:function(states){return {textColor:states.disabled?"text-disabled":"undefined"};
}},
"client-document":{style:function(states){return {backgroundColor:"document-background",
textColor:"text",
font:"default"};
}},
"client-document-blocker":{style:function(states){return {cursor:"default",
backgroundImage:"static/image/blank.gif"};
}},
"tool-tip":{include:"popup",
style:function(states){return {backgroundColor:"tooltip",
textColor:"tooltip-text",
border:"tooltip",
padding:[1,
3,
2,
3]};
}},
"iframe":{style:function(states){return {border:"general"};
}},
"check-box":{style:function(states){return {padding:[2,
3]};
}},
"radio-button":{include:"check-box"},
"button":{style:function(states){if(states.over){var border="inset-button";
}else{var border="outset-thin-button";
}
if(states.over){var padding=[2,
3,
2,
3];
}else if(states.pressed){var padding=[3,
2,
1,
4];
}else{var padding=[3,
4,
3,
4];
}return {backgroundImage:"widget/gradient/button_gradient.png",
backgroundColor:states.over?"button-hover":"button",
border:border,
padding:padding};
}},
"toolbar":{style:function(states){return {border:"toolbar",
backgroundColor:"toolbar-background",
backgroundImage:"widget/gradient/toolbar_gradient.png",
padding:1};
}},
"toolbar-part":{},
"toolbar-part-handle":{style:function(states){return {width:10};
}},
"toolbar-part-handle-line":{style:function(states){return {top:2,
left:3,
bottom:2,
width:4,
border:"general"};
}},
"toolbar-separator":{style:function(states){return {width:8};
}},
"toolbar-separator-line":{style:function(states){var border=new qx.ui.core.Border.fromConfig({left:[1,
"solid",
"general-border"]});
return {top:2,
left:3,
width:2,
bottom:2,
border:border};
}},
"toolbar-button":{style:function(states){if(states.pressed||states.checked||states.abandoned||states.over){var border="general";
}else{var border="undefined";
}
if(states.pressed||states.checked||states.abandoned){var padding=[3,
2,
1,
4];
}else if(states.over){var padding=[2,
3,
2,
3];
}else{var padding=[3,
4,
3,
4];
}return {border:border,
padding:padding,
backgroundColor:states.checked||states.pressed||states.over?"effect":"transparent"};
}},
"button-view":{style:function(states){return {backgroundColor:"white",
border:"general"};
}},
"button-view-pane":{style:function(states){return {backgroundColor:"button-view-pane",
padding:10};
}},
"button-view-page":{},
"button-view-bar":{style:function(states){var padding="undefined";
var border="undefined";
var clazz=qx.ui.core.Border;
if(states.barTop){padding=[1,
0];
border=clazz.fromConfig({bottom:[1,
"solid",
"general-border"]});
}else if(states.barBottom){padding=[1,
0];
border=clazz.fromConfig({top:[1,
"solid",
"general-border"]});
}else if(states.barLeft){padding=[0,
1];
border=clazz.fromConfig({right:[1,
"solid",
"general-border"]});
}else if(states.barRight){padding=[0,
1];
border=clazz.fromConfig({left:[1,
"solid",
"general-border"]});
}return {backgroundColor:"button-view-bar",
padding:padding||"undefined",
border:border||"undefined"};
}},
"button-view-button":{style:function(states){var margin,
width,
height,
padding,
border;
if(states.checked||states.over){border="button-view-button";
padding=[3,
6,
3,
6];
}else{border="undefined";
padding=[4,
7];
}
if(states.barTop||states.barBottom){margin=[0,
1];
width="auto";
height=null;
}else{margin=[1,
0];
height="auto";
width=null;
}return {backgroundColor:states.checked?"button-view-button":"undefined",
backgroundImage:states.checked?"widget/gradient/barbutton_gradient.png":null,
iconPosition:"top",
margin:margin,
width:width,
height:height,
border:border,
padding:padding||"undefined"};
}},
"tab-view":{style:function(states){return {spacing:-1};
}},
"tab-view-bar":{},
"tab-view-pane":{style:function(states){return {backgroundColor:"tab-view-pane",
border:"tab-view-pane",
padding:10};
}},
"tab-view-page":{textColor:"tab-view-text",
top:0,
right:0,
bottom:0,
left:0},
"tab-view-button":{style:function(states){var marginTop,
marginBottom;
marginTop=0;
marginBottom=0;
if(states.barTop){var border_top_default=qx.ui.core.Border.fromConfig({left:[1,
"solid",
"tab-view-border"],
top:[1,
"solid",
"tab-view-border"],
right:[1,
"solid",
"tab-view-border"]});
}
if(!states.barTop){var border_bottom_default=qx.ui.core.Border.fromConfig({right:[1,
"solid",
"tab-view-border"],
bottom:[1,
"solid",
"tab-view-border"],
left:[1,
"solid",
"tab-view-border"]});
}
if(states.checked){var vReturn={textColor:"tab-view-text",
backgroundImage:states.barTop?"widget/gradient/tabbutton_gradient.png":"widget/gradient/tabbutton_reverse_gradient.png",
backgroundColor:"tab-view-button-checked",
zIndex:1,
paddingTop:3,
paddingBottom:3,
paddingLeft:6,
paddingRight:7,
marginTop:states.barTop?3:0,
marginBottom:0,
marginRight:4,
marginLeft:(states.alignLeft&&states.firstChild)?4:0};
}else{vReturn={textColor:"tab-view-text-disabled",
backgroundImage:states.barTop?"widget/gradient/tabbutton_gradient.png":"widget/gradient/tabbutton_reverse_gradient.png",
backgroundColor:"tab-view-button",
zIndex:0,
paddingLeft:6,
paddingRight:7,
marginRight:4,
marginLeft:(states.alignLeft&&states.firstChild)?4:0};
if(states.barTop){vReturn.marginTop=3;
vReturn.marginBottom=1;
vReturn.paddingTop=2;
vReturn.paddingBottom=3;
}else{vReturn.marginTop=1;
vReturn.marginBottom=3;
vReturn.paddingTop=3;
vReturn.paddingBottom=2;
}}vReturn.border=states.barTop?border_top_default:border_bottom_default;
return vReturn;
}},
"radio-view-bar":{style:function(states){return {backgroundColor:"radio-view-bar",
padding:4,
border:states.barTop?qx.ui.core.Border.fromConfig({bottom:[1,
"solid",
"radio-view-border"]}):qx.ui.core.Border.fromConfig({top:[1,
"solid",
"radio-view-border"]})};
}},
"radio-view-button":{style:function(states){var border,
padding;
if(states.checked||states.over){border=new qx.ui.core.Border(1,
"solid",
"radio-view-border");
border.setWidthLeft(3);
padding=[2,
6,
2,
4];
}else{border="undefined";
padding=[3,
7];
}return {textColor:"tab-view-text",
backgroundColor:states.checked?"radio-view-button-checked":"undefined",
backgroundImage:states.checked?"widget/gradient/tabbutton_gradient.png":"undefined",
iconPosition:"left",
margin:[0,
1],
width:"auto",
opacity:states.checked?1.0:0.3,
border:border,
padding:padding};
}},
"window":{style:function(states){return {backgroundColor:"background",
padding:0,
border:states.maximized?"undefined":"general"};
}},
"window-captionbar":{style:function(states){return {padding:[4,
2,
5,
2],
verticalChildrenAlign:"middle",
height:24,
backgroundColor:states.active?"window-active-caption":"window-inactive-caption",
textColor:states.active?"window-active-caption-text":"window-inactive-caption-text"};
}},
"window-resize-frame":{style:function(states){return {border:"general"};
}},
"window-captionbar-icon":{style:function(states){return {marginRight:2};
}},
"window-captionbar-title":{style:function(states){return {cursor:"default",
font:"bold",
marginRight:2};
}},
"window-captionbar-button":{include:"button",
style:function(states){return {padding:[0,
1],
border:"undefined",
backgroundColor:"transparent",
backgroundImage:null};
}},
"window-captionbar-minimize-button":{include:"window-captionbar-button",
style:function(states){return {icon:states.active?"widget/window/minimize.gif":"widget/window/minimize_inactive.gif"};
}},
"window-captionbar-restore-button":{include:"window-captionbar-button",
style:function(states){return {marginLeft:2,
icon:states.active?"widget/window/restore.gif":"widget/window/restore_inactive.gif"};
}},
"window-captionbar-maximize-button":{include:"window-captionbar-button",
style:function(states){return {marginLeft:2,
icon:states.active?"widget/window/maximize.gif":"widget/window/maximize_inactive.gif"};
}},
"window-captionbar-close-button":{include:"window-captionbar-button",
style:function(states){return {marginLeft:2,
icon:states.active?"widget/window/close.gif":"widget/window/close_inactive.gif"};
}},
"window-statusbar":{style:function(states){var border=qx.ui.core.Border.fromConfig({top:[1,
"solid",
"general-border"]});
return {border:border};
}},
"window-statusbar-text":{style:function(states){return {padding:[1,
4]};
}},
"color-popup":{style:function(states){return {padding:4,
border:"general",
backgroundColor:"document-background"};
}},
"resizer":{style:function(states){return {border:"outset-thin"};
}},
"resizer-frame":{style:function(states){return {border:"general"};
}},
"menu":{style:function(states){return {backgroundColor:"menu",
border:"general",
padding:1};
}},
"menu-layout":{top:0,
right:0,
bottom:0,
left:0},
"menu-button":{style:function(states){return {minWidth:"auto",
height:"auto",
spacing:2,
padding:[2,
4],
verticalChildrenAlign:"middle",
backgroundColor:states.over?"selected":"undefined",
textColor:states.over?"text-selected":"undefined"};
}},
"menu-button-arrow":{style:function(states){return {source:"widget/arrows/next.gif"};
}},
"menu-check-box":{include:"menu-button",
style:function(states){return {icon:states.checked?"widget/menu/checkbox.gif":"static/image/blank.gif"};
}},
"menu-radio-button":{include:"menu-button",
style:function(states){return {icon:states.checked?"widget/menu/radiobutton.gif":"static/image/blank.gif"};
}},
"menu-separator":{style:function(states){return {marginTop:3,
marginBottom:2,
paddingLeft:3,
paddingRight:3};
}},
"menu-separator-line":{style:function(states){var border=qx.ui.core.Border.fromConfig({top:[1,
"solid",
"general-border"]});
return {right:0,
left:0,
height:"auto",
border:border};
}},
"list":{style:function(states){return {border:"general",
backgroundColor:"list"};
}},
"list-item":{style:function(states){return {height:"auto",
minWidth:"auto",
horizontalChildrenAlign:"left",
verticalChildrenAlign:"middle",
spacing:4,
padding:[3,
5],
backgroundColor:states.selected?"selected":"undefined",
textColor:states.selected?"text-selected":"undefined"};
}},
"text-field":{style:function(states){return {border:"general",
padding:[1,
3],
textColor:states.disabled?"text-disabled":"text",
backgroundColor:states.focused?"field":"white"};
}},
"text-area":{include:"text-field"},
"combo-box":{style:function(states){var border=qx.ui.core.Border.fromConfig({top:[1,
"solid",
"general-border"],
left:[1,
"solid",
"general-border"],
bottom:[1,
"solid",
"general-border"]});
return {border:border,
backgroundColor:states.focused?"field":"white"};
}},
"combo-box-list":{include:"list",
style:function(states){return {backgroundColor:"white",
textColor:"text",
edge:0,
border:"undefined",
overflow:"scrollY"};
}},
"combo-box-popup":{include:"list",
style:function(states){var border=qx.ui.core.Border.fromConfig({left:[1,
"solid",
"general-border"],
bottom:[1,
"solid",
"general-border"],
right:[1,
"solid",
"general-border"]});
return {maxHeight:150,
border:border,
paddingLeft:0,
paddingRight:0,
marginLeft:0,
marginRight:0};
}},
"combo-box-text-field":{include:"text-field",
style:function(states){return {border:"undefined",
backgroundColor:"transparent",
textColor:"text"};
}},
"combo-box-button":{include:"button",
style:function(states){var border=qx.ui.core.Border.fromConfig({right:[1,
"solid",
"general-border"]});
return {backgroundImage:null,
backgroundColor:"transparent",
border:border,
padding:[0,
3,
0,
2],
icon:"widget/arrows/down.gif"};
}},
"combo-box-ex":{include:"combo-box"},
"combo-box-ex-list":{style:function(states){return {backgroundColor:"white",
textColor:"text",
border:"undefined",
edge:0,
overflow:"hidden"};
}},
"combo-box-ex-text-field":{include:"combo-box-text-field",
style:function(states){return {minWidth:30,
width:100};
}},
"combo-box-ex-popup":{style:function(states){return {border:"resizer",
overflow:"hidden",
backgroundColor:"list"};
}},
"combo-box-ex-button":{include:"combo-box-button"},
"treevirtual-focus-indicator":{include:"empty"},
"tree-element":{style:function(states){return {height:16,
verticalChildrenAlign:"middle"};
}},
"tree-element-icon":{style:function(states){return {width:16,
height:16};
}},
"tree-element-label":{include:"label",
style:function(states){return {marginLeft:3,
height:15,
padding:2,
backgroundColor:states.selected?"selected":"undefined",
textColor:states.selected?"text-selected":"undefined"};
}},
"tree-folder":{include:"tree-element"},
"tree-folder-icon":{include:"tree-element-icon"},
"tree-folder-label":{include:"tree-element-label"},
"tree":{include:"tree-folder"},
"tree-icon":{include:"tree-folder-icon"},
"tree-label":{include:"tree-folder-label"},
"list-view":{style:function(states){return {border:"list-view",
backgroundColor:"list-view"};
}},
"list-view-pane":{style:function(states){return {horizontalSpacing:1};
}},
"list-view-header":{style:function(states){return {border:qx.ui.core.Border.fromConfig({bottom:[1,
"solid",
"list-view-header-border"]}),
backgroundColor:"list-view-header"};
}},
"list-view-header-cell":{style:function(states){return {padding:[2,
6],
spacing:4,
backgroundColor:states.over?"list-view-header-cell-hover":"undefined",
backgroundImage:"widget/gradient/button_gradient.png",
paddingBottom:states.over?0:2,
border:states.over?qx.ui.core.Border.fromConfig({bottom:[2,
"solid",
"list-view-header-border-hover"]}):"undefined"};
}},
"list-view-header-cell-arrow-up":{style:function(states){return {source:"widget/arrows/up.gif"};
}},
"list-view-header-cell-arrow-down":{style:function(states){return {source:"widget/arrows/down.gif"};
}},
"list-view-header-separator":{style:function(states){return {backgroundColor:"list-view-header-separator-border",
width:1,
marginTop:1,
marginBottom:1};
}},
"list-view-content-cell":{style:function(states){return {cursor:"default",
backgroundColor:states.selected?"list-view-content-cell":"undefined",
textColor:states.selected?"white":"undefined",
border:states.lead&&
!states.selected?
new qx.ui.core.Border.fromConfig({top:[1,
"solid",
"effect"],
bottom:[1,
"solid",
"effect"]}):"undefined",
marginTop:states.lead&&!states.selected?0:1,
marginBottom:states.lead&&!states.selected?0:1};
}},
"list-view-content-cell-image":{include:"list-view-content-cell",
style:function(states){return {paddingLeft:6,
paddingRight:6};
}},
"list-view-content-cell-text":{include:"list-view-content-cell",
style:function(states){return {overflow:"hidden",
paddingLeft:6,
paddingRight:6};
}},
"list-view-content-cell-html":{include:"list-view-content-cell-text"},
"list-view-content-cell-icon-html":{include:"list-view-content-cell-text"},
"list-view-content-cell-link":{include:"list-view-content-cell-text"},
"group-box":{style:function(states){return {backgroundColor:"transparent"};
}},
"group-box-legend":{style:function(states){return {location:[10,
1],
backgroundColor:"group-box-legend",
textColor:"white",
padding:[1,
3,
2,
4],
marginRight:10};
}},
"group-box-frame":{style:function(states){return {edge:[8,
0,
0],
padding:[20,
12,
9],
border:"general",
backgroundColor:"white"};
}},
"check-box-group-box-legend":{style:function(states){return {location:[10,
1],
backgroundColor:"document-background",
paddingRight:3};
}},
"radio-button-group-box-legend":{include:"check-box-group-box-legend"},
"spinner":{style:function(states){var border=qx.ui.core.Border.fromConfig({top:[1,
"solid",
"general-border"],
left:[1,
"solid",
"general-border"],
bottom:[1,
"solid",
"general-border"]});
return {border:border,
backgroundColor:"white"};
}},
"spinner-text-field":{include:"text-field",
style:function(states){return {padding:[2,
3]};
}},
"spinner-button":{style:function(states){return {height:"1*",
width:"auto"};
}},
"spinner-button-up":{include:"spinner-button",
style:function(states){var border=qx.ui.core.Border.fromConfig({left:[1,
"solid",
"general-border"],
bottom:[1,
"solid",
"general-border"],
right:[1,
"solid",
"general-border"]});
return {padding:[3,
4,
2],
border:border,
source:"widget/arrows/up_small.gif"};
}},
"spinner-button-down":{include:"spinner-button",
style:function(states){var border=qx.ui.core.Border.fromConfig({left:[1,
"solid",
"general-border"],
right:[1,
"solid",
"general-border"]});
return {padding:[4,
4,
1],
border:border,
source:"widget/arrows/down_small.gif"};
}},
"colorselector":{style:function(states){return {border:"general"};
}},
"datechooser-toolbar-button":{style:function(states){return {spacing:4,
width:"auto",
verticalChildrenAlign:"middle",
padding:2};
}},
"datechooser-monthyear":{style:function(states){return {font:"bold",
verticalAlign:"middle",
textAlign:"center",
textColor:"date-chooser-title"};
}},
"datechooser-datepane":{style:function(states){return {border:"general",
backgroundColor:"date-chooser"};
}},
"datechooser-weekday":{style:function(states){var border=new qx.ui.core.Border.fromConfig({bottom:[1,
"solid",
"general-border"]});
return {border:border,
font:"bold",
textAlign:"center",
textColor:states.weekend?"date-chooser":"date-chooser-title",
backgroundColor:states.weekend?"date-chooser-title":"date-chooser"};
}},
"datechooser-day":{style:function(states){var border_transparent=new qx.ui.core.Border(1,
"solid",
"transparent");
return {textAlign:"center",
verticalAlign:"middle",
border:states.today?"general":border_transparent,
textColor:states.selected?"text-selected":states.otherMonth?"text-disabled":"date-chooser-day",
backgroundColor:states.selected?"selected":"undefined"};
}},
"datechooser-week":{style:function(states){if(states.header){var border=qx.ui.core.Border.fromConfig({right:[1,
"solid",
"general-border"],
bottom:[1,
"solid",
"general-border"]});
}else{var border=qx.ui.core.Border.fromConfig({right:[1,
"solid",
"general-border"]});
}return {textAlign:"center",
textColor:"date-chooser-title",
padding:[2,
4],
border:border};
}},
"table-focus-statusbar":{style:function(states){return {border:qx.ui.core.Border.fromConfig({top:[1,
"solid",
"general-border"]}),
paddingLeft:2,
paddingRight:2};
}},
"table-focus-indicator":{style:function(states){return {border:new qx.ui.core.Border(2,
"solid",
"table-focus-indicator")};
}},
"table-pane":{style:function(states){return {backgroundColor:"table-pane"};
}},
"table-header":{style:function(states){return {backgroundColor:"table-header"};
}},
"table-menubar-button":{style:function(states){var border=qx.ui.core.Border.fromConfig({bottom:[1,
"solid",
"table-header-border"]});
return {cursor:"default",
verticalChildrenAlign:"middle",
icon:"widget/table/selectColumnOrder.png",
padding:[0,
4,
0,
3],
border:border};
}},
"table-header-cell":{style:function(states){var border,
backgroundColor;
if(states.mouseover){border=qx.ui.core.Border.fromConfig({right:[1,
"solid",
"table-header-border"],
bottom:[1,
"solid",
"table-header-border-hover"]});
backgroundColor="table-header-cell-hover";
}else{border=qx.ui.core.Border.fromConfig({right:[1,
"solid",
"table-header-border"],
bottom:[1,
"solid",
"table-header-border"]});
backgroundColor="table-header-cell";
}return {paddingLeft:6,
paddingRight:6,
paddingTop:4,
paddingBottom:3,
spacing:2,
overflow:"hidden",
iconPosition:"right",
verticalChildrenAlign:"middle",
border:border,
backgroundColor:backgroundColor,
icon:states.sorted?(states.sortedAscending?"widget/table/ascending.png":"widget/table/descending.png"):null,
horizontalChildrenAlign:"left"};
}},
"splitpane":{style:function(states){return {splitterSize:6};
}},
"splitpane-splitter":{style:function(states){return {backgroundColor:"general-border",
cursor:states.horizontal?"col-resize":"row-resize",
backgroundImage:states.horizontal?"widget/gradient/splitter_horizontal_gradient.png":"widget/gradient/splitter_vertical_gradient.png"};
}},
"splitpane-slider":{style:function(states){return {opacity:0.5,
backgroundColor:states.dragging?"splitpane-slider-dragging":"document-background"};
}},
"splitpane-knob":{style:function(states){var result={opacity:states.dragging?0.5:1.0};
if(states.horizontal){result.top="50%";
result.left="50%";
result.marginLeft=-1;
result.marginTop=-31;
result.cursor="col-resize";
result.source="widget/splitpane/knob-horizontal.png";
}else if(states.vertical){result.top="50%";
result.left="50%";
result.marginTop=-2;
result.marginLeft=-31;
result.cursor="row-resize";
result.source="widget/splitpane/knob-vertical.png";
}return result;
}},
"scrollbar-blocker":{style:function(states){return {backgroundColor:"black",
opacity:0.2};
}}}});




/* ID: qx.theme.icon.VistaInspirate */
qx.Theme.define("qx.theme.icon.VistaInspirate",
{title:"VistaInspirate",
icons:{uri:qx.core.Setting.get("qx.resourceUri")+"/icon/VistaInspirate"}});




/* ID: qx.theme.Ext */
qx.Theme.define("qx.theme.Ext",
{title:"Ext",
meta:{color:qx.theme.ext.Color,
border:qx.theme.ext.Border,
font:qx.theme.ext.font.Default,
widget:qx.theme.ext.Widget,
appearance:qx.theme.ext.Appearance,
icon:qx.theme.icon.VistaInspirate}});




/* ID: qx.ui.layout.DockLayout */
qx.Class.define("qx.ui.layout.DockLayout",
{extend:qx.ui.core.Parent,
construct:function(){this.base(arguments);
},
properties:{mode:{check:["vertical",
"horizontal",
"ordered"],
init:"vertical",
apply:"_applyMode",
themeable:true}},
members:{_applyMode:function(value,
old){this.addToQueueRuntime("mode");
},
_createLayoutImpl:function(){return new qx.ui.layout.impl.DockLayoutImpl(this);
},
addLeft:function(widget){this._addAlignedHorizontal("left",
arguments);
},
addRight:function(widget){this._addAlignedHorizontal("right",
arguments);
},
addTop:function(widget){this._addAlignedVertical("top",
arguments);
},
addBottom:function(widget){this._addAlignedVertical("bottom",
arguments);
},
_addAlignedVertical:function(vAlign,
vArgs){for(var i=0,
l=vArgs.length;i<l;i++){vArgs[i].setVerticalAlign(vAlign);
}this.add.apply(this,
vArgs);
},
_addAlignedHorizontal:function(vAlign,
vArgs){for(var i=0,
l=vArgs.length;i<l;i++){vArgs[i].setHorizontalAlign(vAlign);
}this.add.apply(this,
vArgs);
}}});




/* ID: qx.ui.layout.impl.DockLayoutImpl */
qx.Class.define("qx.ui.layout.impl.DockLayoutImpl",
{extend:qx.ui.layout.impl.LayoutImpl,
construct:function(vWidget){this.base(arguments,
vWidget);
},
statics:{METHOD_LOCATION:"layoutChild_location_",
_childRanking:{vertical:function(c){return c.getVerticalAlign()?1e6:c.getHorizontalAlign()?2e6:3e6;
},
horizontal:function(c){return c.getHorizontalAlign()?1e6:c.getVerticalAlign()?2e6:3e6;
},
ordered:function(c){return c.getHorizontalAlign()||c.getVerticalAlign()?1e6:2e6;
}},
_childCheck:{common:function(vChild){if(!(vChild._computedLeftTypeNull&&vChild._computedRightTypeNull&&vChild._computedTopTypeNull&&vChild._computedBottomTypeNull)){throw new Error("qx.ui.layout.impl.DockLayoutImpl: It is not allowed to define any location values for children: "+vChild+"!");
}},
horizontal:function(vChild){if(!(vChild._computedMinHeightTypeNull&&vChild._computedHeightTypeNull&&vChild._computedMaxHeightTypeNull)){throw new Error("qx.ui.layout.impl.DockLayoutImpl: It is not allowed to define any vertical dimension for 'horizontal' placed children: "+vChild+"!");
}},
vertical:function(vChild){if(!(vChild._computedMinWidthTypeNull&&vChild._computedWidthTypeNull&&vChild._computedMaxWidthTypeNull)){throw new Error("qx.ui.layout.impl.DockLayoutImpl: It is not allowed to define any horizontal dimension for 'vertical' placed children: "+vChild+"!");
}},
"default":function(vChild){qx.ui.layout.impl.DockLayoutImpl._childCheck.horizontal(vChild);
qx.ui.layout.impl.DockLayoutImpl._childCheck.vertical(vChild);
}}},
members:{computeChildBoxWidth:function(vChild){if(this.getChildAlignMode(vChild)=="horizontal"){return vChild.getWidthValue()||vChild._computeBoxWidthFallback();
}return this.getWidget().getInnerWidth()-this._lastLeft-this._lastRight;
},
computeChildBoxHeight:function(vChild){if(this.getChildAlignMode(vChild)=="vertical"){return vChild.getHeightValue()||vChild._computeBoxHeightFallback();
}return this.getWidget().getInnerHeight()-this._lastTop-this._lastBottom;
},
updateChildOnInnerWidthChange:function(vChild){vChild._recomputePercentX();
vChild.addToLayoutChanges("location");
return true;
},
updateChildOnInnerHeightChange:function(vChild){vChild._recomputePercentY();
vChild.addToLayoutChanges("location");
return true;
},
updateSelfOnJobQueueFlush:qx.lang.Function.returnFalse,
updateChildrenOnJobQueueFlush:function(vQueue){if(vQueue.mode||vQueue.addChild||vQueue.removeChild){this.getWidget()._addChildrenToLayoutQueue("location");
}},
flushChildrenQueue:function(vChildrenQueue){var vWidget=this.getWidget(),
vChildren=vWidget.getVisibleChildren(),
vChildrenLength=vChildren.length,
vMode=vWidget.getMode();
this._lastLeft=this._lastRight=this._lastTop=this._lastBottom=0;
var vRankImpl=qx.ui.layout.impl.DockLayoutImpl._childRanking[vMode];
var vOrderedChildren=qx.lang.Array.copy(vChildren).sort(function(c1,
c2){return (vRankImpl(c1)+vChildren.indexOf(c1))-(vRankImpl(c2)+vChildren.indexOf(c2));
});
for(var i=0;i<vChildrenLength;i++){vWidget._layoutChild(vOrderedChildren[i]);
}},
getChildAlign:function(vChild){return vChild.getVerticalAlign()||vChild.getHorizontalAlign()||"default";
},
getChildAlignMode:function(vChild){return vChild.getVerticalAlign()?"vertical":vChild.getHorizontalAlign()?"horizontal":"default";
},
layoutChild:function(vChild,
vJobs){qx.ui.layout.impl.DockLayoutImpl._childCheck.common(vChild);
qx.ui.layout.impl.DockLayoutImpl._childCheck[this.getChildAlignMode(vChild)](vChild);
this.layoutChild_sizeX_essentialWrapper(vChild,
vJobs);
this.layoutChild_sizeY_essentialWrapper(vChild,
vJobs);
this.layoutChild_sizeLimitX(vChild,
vJobs);
this.layoutChild_sizeLimitY(vChild,
vJobs);
this[qx.ui.layout.impl.DockLayoutImpl.METHOD_LOCATION+this.getChildAlign(vChild)](vChild,
vJobs);
},
layoutChild_location_top:function(vChild,
vJobs){vChild._renderRuntimeTop(this._lastTop);
vChild._renderRuntimeLeft(this._lastLeft);
this.layoutChild_location_horizontal(vChild);
this._lastTop+=vChild.getBoxHeight();
},
layoutChild_location_left:function(vChild,
vJobs){vChild._renderRuntimeLeft(this._lastLeft);
vChild._renderRuntimeTop(this._lastTop);
this.layoutChild_location_vertical(vChild);
this._lastLeft+=vChild.getBoxWidth();
},
_applyComputedWidth:qx.core.Variant.select("qx.client",
{"mshtml|opera":function(vChild){vChild._recomputeBoxWidth();
vChild._recomputeOuterWidth();
vChild._recomputeInnerWidth();
vChild._renderRuntimeWidth(vChild.getBoxWidth());
},
"default":function(vChild){vChild._recomputeBoxWidth();
vChild._recomputeOuterWidth();
vChild._recomputeInnerWidth();
}}),
_applyComputedHeight:qx.core.Variant.select("qx.client",
{"mshtml|opera":function(vChild){vChild._recomputeBoxHeight();
vChild._recomputeOuterHeight();
vChild._recomputeInnerHeight();
vChild._renderRuntimeHeight(vChild.getBoxHeight());
},
"default":function(vChild){vChild._recomputeBoxHeight();
vChild._recomputeOuterHeight();
vChild._recomputeInnerHeight();
}}),
layoutChild_sizeX:qx.core.Variant.select("qx.client",
{"mshtml|opera":function(vChild,
vJobs){if(vJobs.initial||vJobs.width||vJobs.minWidth||vJobs.maxWidth){vChild._computedWidthTypeNull&&vChild._computedMinWidthTypeNull&&vChild._computedMaxWidthTypeNull?vChild._resetRuntimeWidth():vChild._renderRuntimeWidth(vChild.getBoxWidth());
}},
"default":function(vChild,
vJobs){if(vJobs.initial||vJobs.width){vChild._computedWidthTypeNull?vChild._resetRuntimeWidth():vChild._renderRuntimeWidth(vChild.getWidthValue());
}}}),
layoutChild_sizeY:qx.core.Variant.select("qx.client",
{"mshtml|opera":function(vChild,
vJobs){if(vJobs.initial||vJobs.height||vJobs.minHeight||vJobs.maxHeight){vChild._computedHeightTypeNull&&vChild._computedMinHeightTypeNull&&vChild._computedMaxHeightTypeNull?vChild._resetRuntimeHeight():vChild._renderRuntimeHeight(vChild.getBoxHeight());
}},
"default":function(vChild,
vJobs){if(vJobs.initial||vJobs.height){vChild._computedHeightTypeNull?vChild._resetRuntimeHeight():vChild._renderRuntimeHeight(vChild.getHeightValue());
}}}),
layoutChild_location_horizontal:qx.core.Variant.select("qx.client",
{"mshtml|opera":function(vChild){this._applyComputedWidth(vChild);
},
"default":function(vChild){this._applyComputedWidth(vChild);
vChild._renderRuntimeRight(this._lastRight);
}}),
layoutChild_location_vertical:qx.core.Variant.select("qx.client",
{"mshtml|opera":function(vChild){this._applyComputedHeight(vChild);
},
"default":function(vChild){this._applyComputedHeight(vChild);
vChild._renderRuntimeBottom(this._lastBottom);
}}),
layoutChild_location_right:qx.core.Variant.select("qx.client",
{"mshtml|opera":function(vChild,
vJobs){vChild._renderRuntimeLeft(this.getWidget().getInnerWidth()-this._lastRight-vChild.getBoxWidth());
vChild._renderRuntimeTop(this._lastTop);
this.layoutChild_location_vertical(vChild);
this._lastRight+=vChild.getBoxWidth();
},
"default":function(vChild,
vJobs){vChild._renderRuntimeRight(this._lastRight);
vChild._renderRuntimeTop(this._lastTop);
this.layoutChild_location_vertical(vChild);
this._lastRight+=vChild.getBoxWidth();
}}),
layoutChild_location_bottom:qx.core.Variant.select("qx.client",
{"mshtml|opera":function(vChild,
vJobs){vChild._renderRuntimeTop(this.getWidget().getInnerHeight()-this._lastBottom-vChild.getBoxHeight());
vChild._renderRuntimeLeft(this._lastLeft);
this.layoutChild_location_horizontal(vChild);
this._lastBottom+=vChild.getBoxHeight();
},
"default":function(vChild,
vJobs){vChild._renderRuntimeBottom(this._lastBottom);
vChild._renderRuntimeLeft(this._lastLeft);
this.layoutChild_location_horizontal(vChild);
this._lastBottom+=vChild.getBoxHeight();
}}),
layoutChild_location_default:qx.core.Variant.select("qx.client",
{"mshtml|opera":function(vChild,
vJobs){vChild._resetRuntimeRight();
vChild._resetRuntimeBottom();
vChild._renderRuntimeTop(this._lastTop);
vChild._renderRuntimeLeft(this._lastLeft);
this._applyComputedWidth(vChild);
this._applyComputedHeight(vChild);
},
"default":function(vChild,
vJobs){vChild._resetRuntimeWidth();
vChild._resetRuntimeHeight();
vChild._renderRuntimeTop(this._lastTop);
vChild._renderRuntimeRight(this._lastRight);
vChild._renderRuntimeBottom(this._lastBottom);
vChild._renderRuntimeLeft(this._lastLeft);
this._applyComputedWidth(vChild);
this._applyComputedHeight(vChild);
}})}});




/* ID: qx.ui.menubar.Button */
qx.Class.define("qx.ui.menubar.Button",
{extend:qx.ui.toolbar.MenuButton});




/* ID: qx.ui.embed.Iframe */
qx.Class.define("qx.ui.embed.Iframe",
{extend:qx.ui.basic.Terminator,
construct:function(vSource){this.base(arguments);
this.initSelectable();
this.initTabIndex();
this.initScrolling();
if(vSource!=null){this.setSource(vSource);
}},
events:{"load":"qx.event.type.Event"},
statics:{load:function(obj){if(!obj){throw new Error("Could not find iframe which was loaded [A]!");
}if(obj.currentTarget){obj=obj.currentTarget;
}if(obj._QxIframe){obj._QxIframe._onload();
}else{throw new Error("Could not find iframe which was loaded [B]!");
}}},
properties:{tabIndex:{refine:true,
init:0},
selectable:{refine:true,
init:false},
appearance:{refine:true,
init:"iframe"},
source:{check:"String",
apply:"_applySource",
event:"changeSource",
nullable:true},
frameName:{check:"String",
init:"",
apply:"_applyFrameName"},
scrolling:{check:["yes",
"no",
"auto"],
init:"auto",
apply:"_applyScrolling"}},
members:{getIframeNode:function(){return this._iframeNode;
},
setIframeNode:function(vIframeNode){return this._iframeNode=vIframeNode;
},
getBlockerNode:function(){return this._blockerNode;
},
setBlockerNode:function(vBlockerNode){return this._blockerNode=vBlockerNode;
},
getContentWindow:function(){if(this.isCreated()){return qx.html.Iframe.getWindow(this.getIframeNode());
}else{return null;
}},
getContentDocument:function(){if(this.isCreated()){return qx.html.Iframe.getDocument(this.getIframeNode());
}else{return null;
}},
isLoaded:qx.core.Variant.select("qx.client",
{"mshtml":function(){var doc=this.getContentDocument();
return doc?doc.readyState=="complete":false;
},
"default":function(){return this._isLoaded;
}}),
reload:function(){if(this.isCreated()&&this.getContentWindow()){this._isLoaded=false;
var currentSource=this.queryCurrentUrl()||this.getSource();
try{try{this.getContentWindow().location.replace(currentSource);
}catch(ex){this.warn("Could not reload iframe using location.replace()!",
ex);
this.getIframeNode().src=currentSource;
}}catch(ex){this.warn("Iframe source could not be set! This may be related to AdBlock Plus Firefox Extension.");
}}},
queryCurrentUrl:function(){var doc=this.getContentDocument();
try{if(doc&&doc.location){return doc.location.href;
}}catch(ex){}return null;
},
block:function(){if(this._blockerNode){this._blockerNode.style.display="";
}},
release:function(){if(this._blockerNode){this._blockerNode.style.display="none";
}},
_generateIframeElement:function(vFrameName){if(qx.core.Variant.isSet("qx.client",
"mshtml")){var nameStr=vFrameName?'name="'+vFrameName+'"':'';
var frameEl=qx.ui.embed.Iframe._element=document.createElement('<iframe onload="parent.qx.ui.embed.Iframe.load(this)"'+nameStr+'></iframe>');
}else{var frameEl=qx.ui.embed.Iframe._element=document.createElement("iframe");
frameEl.onload=qx.ui.embed.Iframe.load;
if(vFrameName){frameEl.name=vFrameName;
}}frameEl._QxIframe=this;
frameEl.frameBorder="0";
frameEl.frameSpacing="0";
frameEl.marginWidth="0";
frameEl.marginHeight="0";
frameEl.width="100%";
frameEl.height="100%";
frameEl.hspace="0";
frameEl.vspace="0";
frameEl.border="0";
frameEl.unselectable="on";
frameEl.allowTransparency="true";
frameEl.style.position="absolute";
frameEl.style.top=0;
frameEl.style.left=0;
return frameEl;
},
_generateBlockerElement:function(){var blockerEl=qx.ui.embed.Iframe._blocker=document.createElement("div");
var blockerStyle=blockerEl.style;
if(qx.core.Variant.isSet("qx.client",
"mshtml")){blockerStyle.backgroundColor="white";
blockerStyle.filter="Alpha(Opacity=0)";
}blockerStyle.position="absolute";
blockerStyle.top=0;
blockerStyle.left=0;
blockerStyle.width="100%";
blockerStyle.height="100%";
blockerStyle.zIndex=1;
blockerStyle.display="none";
return blockerEl;
},
_applyElement:function(value,
old){var iframeNode=this.setIframeNode(this._generateIframeElement());
var blockerNode=this.setBlockerNode(this._generateBlockerElement());
this._syncSource();
this._syncScrolling();
value.appendChild(iframeNode);
value.appendChild(blockerNode);
this.base(arguments,
value,
old);
},
_beforeAppear:function(){this.base(arguments);
qx.ui.embed.IframeManager.getInstance().add(this);
},
_beforeDisappear:function(){this.base(arguments);
qx.ui.embed.IframeManager.getInstance().remove(this);
},
_applySource:function(value,
old){if(this.isCreated()){this._syncSource();
}},
_syncSource:function(){var currentSource=this.getSource();
if(currentSource==null||currentSource===""){currentSource=qx.io.Alias.getInstance().resolve("static/html/blank.html");
}this._isLoaded=false;
try{if(this.getContentWindow()){try{this.getContentWindow().location.replace(currentSource);
}catch(ex){this.getIframeNode().src=currentSource;
}}else{this.getIframeNode().src=currentSource;
}}catch(ex){this.warn("Iframe source could not be set! This may be related to AdBlock Plus Firefox Extension.");
}},
_applyScrolling:function(value,
old){if(this.isCreated()){this._syncScrolling();
}},
_syncScrolling:function(){this.getIframeNode().setAttribute("scrolling",
this.getScrolling());
},
_applyFrameName:function(value,
old,
propName,
uniqModIds){if(this.isCreated()){throw new Error("Not allowed to set frame name after it has been created");
}},
_onload:function(){if(!this._isLoaded){this._isLoaded=true;
this.createDispatchEvent("load");
}},
_isLoaded:false},
destruct:function(){if(this._iframeNode){this._iframeNode._QxIframe=null;
this._iframeNode.onload=null;
}this._disposeFields("__onload",
"_iframeNode",
"_blockerNode");
}});

