/*
 * jQuery Media Plugin for converting elements into rich media content.
 *
 * Examples and documentation at: http://malsup.com/jquery/media/
 * Copyright (c) 2007-2010 M. Alsup
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * @author: M. Alsup
 * @version: 0.98 (27-MAR-2013)
 * @requires jQuery v1.1.2 or later
 * $Id: jquery.media.js 2460 2007-07-23 02:53:15Z malsup $
 *
 * Supported Media Players:
 *	- Flash
 *	- Quicktime
 *	- Real Player
 *	- Silverlight
 *	- Windows Media Player
 *	- iframe
 *
 * Supported Media Formats:
 *	 Any types supported by the above players, such as:
 *	 Video: asf, avi, flv, mov, mpg, mpeg, mp4, qt, smil, swf, wmv, 3g2, 3gp
 *	 Audio: aif, aac, au, gsm, mid, midi, mov, mp3, m4a, snd, rm, wav, wma
 *	 Other: bmp, html, pdf, psd, qif, qtif, qti, tif, tiff, xaml
 *
 * Thanks to Mark Hicken and Brent Pedersen for helping me debug this on the Mac!
 * Thanks to Dan Rossi for numerous bug reports and code bits!
 * Thanks to Skye Giordano for several great suggestions!
 * Thanks to Richard Connamacher for excellent improvements to the non-IE behavior!
 */
;(function($) {

var mode = document.documentMode || 0;
var msie = /MSIE/.test(navigator.userAgent);
var lameIE = msie && (/MSIE (6|7|8)\.0/.test(navigator.userAgent) || mode < 9);

/**
 * Chainable method for converting elements into rich media.
 *
 * @param options
 * @param callback fn invoked for each matched element before conversion
 * @param callback fn invoked for each matched element after conversion
 */
$.fn.media = function(options, f1, f2) {
	if (options == 'undo') {
		return this.each(function() {
			var $this = $(this);
			var html = $this.data('media.origHTML');
			if (html)
				$this.replaceWith(html);
		});
	}
	
	return this.each(function() {
		if (typeof options == 'function') {
			f2 = f1;
			f1 = options;
			options = {};
		}
		var o = getSettings(this, options);
		// pre-conversion callback, passes original element and fully populated options
		if (typeof f1 == 'function') f1(this, o);

		var r = getTypesRegExp();
		var m = r.exec(o.src.toLowerCase()) || [''];

		o.type ? m[0] = o.type : m.shift();
		for (var i=0; i < m.length; i++) {
			fn = m[i].toLowerCase();
			if (isDigit(fn[0])) fn = 'fn' + fn; // fns can't begin with numbers
			if (!$.fn.media[fn])
				continue;  // unrecognized media type
			// normalize autoplay settings
			var player = $.fn.media[fn+'_player'];
			if (!o.params) o.params = {};
			if (player) {
				var num = player.autoplayAttr == 'autostart';
				o.params[player.autoplayAttr || 'autoplay'] = num ? (o.autoplay ? 1 : 0) : o.autoplay ? true : false;
			}
			var $div = $.fn.media[fn](this, o);

			$div.css('backgroundColor', o.bgColor).width(o.width);
			
			if (o.canUndo) {
				var $temp = $('<div></div>').append(this);
				$div.data('media.origHTML', $temp.html()); // store original markup
			}
			
			// post-conversion callback, passes original element, new div element and fully populated options
			if (typeof f2 == 'function') f2(this, $div[0], o, player.name);
			break;
		}
	});
};

/**
 * Non-chainable method for adding or changing file format / player mapping
 * @name mapFormat
 * @param String format File format extension (ie: mov, wav, mp3)
 * @param String player Player name to use for the format (one of: flash, quicktime, realplayer, winmedia, silverlight or iframe
 */
$.fn.media.mapFormat = function(format, player) {
	if (!format || !player || !$.fn.media.defaults.players[player]) return; // invalid
	format = format.toLowerCase();
	if (isDigit(format[0])) format = 'fn' + format;
	$.fn.media[format] = $.fn.media[player];
	$.fn.media[format+'_player'] = $.fn.media.defaults.players[player];
};

// global defautls; override as needed
$.fn.media.defaults = {
	standards:  true,       // use object tags only (no embeds for non-IE browsers)
	canUndo:    true,       // tells plugin to store the original markup so it can be reverted via: $(sel).mediaUndo()
	width:		400,
	height:		400,
	autoplay:	0,		   	// normalized cross-player setting
	bgColor:	'#ffffff', 	// background color
	params:		{ wmode: 'transparent'},	// added to object element as param elements; added to embed element as attrs
	attrs:		{},			// added to object and embed elements as attrs
	flvKeyName: 'file', 	// key used for object src param (thanks to Andrea Ercolino)
	flashvars:	{},			// added to flash content as flashvars param/attr
	flashVersion:	'7',	// required flash version
	expressInstaller: null,	// src for express installer

	// default flash video and mp3 player (@see: http://jeroenwijering.com/?item=Flash_Media_Player)
	flvPlayer:	 'mediaplayer.swf',
	mp3Player:	 'mediaplayer.swf',

	// @see http://msdn2.microsoft.com/en-us/library/bb412401.aspx
	silverlight: {
		inplaceInstallPrompt: 'true', // display in-place install prompt?
		isWindowless:		  'true', // windowless mode (false for wrapping markup)
		framerate:			  '24',	  // maximum framerate
		version:			  '0.9',  // Silverlight version
		onError:			  null,	  // onError callback
		onLoad:			      null,   // onLoad callback
		initParams:			  null,	  // object init params
		userContext:		  null	  // callback arg passed to the load callback
	}
};

// Media Players; think twice before overriding
$.fn.media.defaults.players = {
	flash: {
		name:		 'flash',
		title:		 'Flash',
		types:		 'flv,mp3,swf',
		mimetype:	 'application/x-shockwave-flash',
		pluginspage: 'http://www.adobe.com/go/getflashplayer',
		ieAttrs: {
			classid:  'clsid:d27cdb6e-ae6d-11cf-96b8-444553540000',
			type:	  'application/x-oleobject',
			codebase: 'http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=' + $.fn.media.defaults.flashVersion
		}
	},
	quicktime: {
		name:		 'quicktime',
		title:		 'QuickTime',
		mimetype:	 'video/quicktime',
		pluginspage: 'http://www.apple.com/quicktime/download/',
		types:		 'aif,aiff,aac,au,bmp,gsm,mov,mid,midi,mpg,mpeg,mp4,m4a,psd,qt,qtif,qif,qti,snd,tif,tiff,wav,3g2,3gp',
		ieAttrs: {
			classid:  'clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B',
			codebase: 'http://www.apple.com/qtactivex/qtplugin.cab'
		}
	},
	realplayer: {
		name:		  'real',
		title:		  'RealPlayer',
		types:		  'ra,ram,rm,rpm,rv,smi,smil',
		mimetype:	  'audio/x-pn-realaudio-plugin',
		pluginspage:  'http://www.real.com/player/',
		autoplayAttr: 'autostart',
		ieAttrs: {
			classid: 'clsid:CFCDAA03-8BE4-11cf-B84B-0020AFBBCCFA'
		}
	},
	winmedia: {
		name:		  'winmedia',
		title:		  'Windows Media',
		types:		  'asx,asf,avi,wma,wmv',
		mimetype:	  isFirefoxWMPPluginInstalled() ? 'application/x-ms-wmp' : 'application/x-mplayer2',
		pluginspage:  'http://www.microsoft.com/Windows/MediaPlayer/',
		autoplayAttr: 'autostart',
		oUrl:		  'url',
		ieAttrs: {
			classid:  'clsid:6BF52A52-394A-11d3-B153-00C04F79FAA6',
			type:	  'application/x-oleobject'
		}
	},
	// special cases
	img: {
		name:  'img',
		title: 'Image',
		types: 'gif,png,jpg'
	},
	iframe: {
		name:  'iframe',
		types: 'html,pdf'
	},
	silverlight: {
		name:  'silverlight',
		types: 'xaml'
	}
};

//
//	everything below here is private
//


// detection script for FF WMP plugin (http://www.therossman.org/experiments/wmp_play.html)
// (hat tip to Mark Ross for this script)
function isFirefoxWMPPluginInstalled() {
	var plugs = navigator.plugins || [];
	for (var i = 0; i < plugs.length; i++) {
		var plugin = plugs[i];
		if (plugin['filename'] == 'np-mswmp.dll')
			return true;
	}
	return false;
}

var counter = 1;

for (var player in $.fn.media.defaults.players) {
	var types = $.fn.media.defaults.players[player].types;
	$.each(types.split(','), function(i,o) {
		if (isDigit(o[0])) o = 'fn' + o;
		$.fn.media[o] = $.fn.media[player] = getGenerator(player);
		$.fn.media[o+'_player'] = $.fn.media.defaults.players[player];
	});
};

function getTypesRegExp() {
	var types = '';
	for (var player in $.fn.media.defaults.players) {
		if (types.length) types += ',';
		types += $.fn.media.defaults.players[player].types;
	};
	return new RegExp('\\.(' + types.replace(/,/ig,'|') + ')\\b');
};

function getGenerator(player) {
	return function(el, options) {
		return generate(el, options, player);
	};
};

function isDigit(c) {
	return '0123456789'.indexOf(c) > -1;
};

// flatten all possible options: global defaults, meta, option obj
function getSettings(el, options) {
	options = options || {};
	var $el = $(el);
	var cls = el.className || '';
	// support metadata plugin (v1.0 and v2.0)
	var meta = $.metadata ? $el.metadata() : $.meta ? $el.data() : {};
	meta = meta || {};
	var w = meta.width  || parseInt(((cls.match(/\bw:(\d+)/)||[])[1]||0)) || parseInt(((cls.match(/\bwidth:(\d+)/)||[])[1]||0));
	var h = meta.height || parseInt(((cls.match(/\bh:(\d+)/)||[])[1]||0)) || parseInt(((cls.match(/\bheight:(\d+)/)||[])[1]||0))

	if (w) meta.width	= w;
	if (h) meta.height = h;
	if (cls) meta.cls = cls;
	
	// crank html5 style data attributes
	var dataName = 'data-';
    for (var i=0; i < el.attributes.length; i++) {
        var a = el.attributes[i], n = $.trim(a.name);
        var index = n.indexOf(dataName);
        if (index === 0) {
        	n = n.substring(dataName.length);
        	meta[n] = a.value;
        }
    }

	var a = $.fn.media.defaults;
	var b = options;
	var c = meta;

	var p = { params: { bgColor: options.bgColor || $.fn.media.defaults.bgColor } };
	var opts = $.extend({}, a, b, c);
	$.each(['attrs','params','flashvars','silverlight'], function(i,o) {
		opts[o] = $.extend({}, p[o] || {}, a[o] || {}, b[o] || {}, c[o] || {});
	});

	if (typeof opts.caption == 'undefined') opts.caption = $el.text();

	// make sure we have a source!
	opts.src = opts.src || $el.attr('href') || $el.attr('src') || 'unknown';
	return opts;
};

//
//	Flash Player
//

// generate flash using SWFObject library if possible
$.fn.media.swf = function(el, opts) {
	if (!window.SWFObject && !window.swfobject) {
		// roll our own
		if (opts.flashvars) {
			var a = [];
			for (var f in opts.flashvars)
				a.push(f + '=' + opts.flashvars[f]);
			if (!opts.params) opts.params = {};
			opts.params.flashvars = a.join('&');
		}
		return generate(el, opts, 'flash');
	}

	var id = el.id ? (' id="'+el.id+'"') : '';
	var cls = opts.cls ? (' class="' + opts.cls + '"') : '';
	var $div = $('<div' + id + cls + '>');

	// swfobject v2+
	if (window.swfobject) {
		$(el).after($div).appendTo($div);
		if (!el.id) el.id = 'movie_player_' + counter++;

		// replace el with swfobject content
		swfobject.embedSWF(opts.src, el.id, opts.width, opts.height, opts.flashVersion,
			opts.expressInstaller, opts.flashvars, opts.params, opts.attrs);
	}
	// swfobject < v2
	else {
		$(el).after($div).remove();
		var so = new SWFObject(opts.src, 'movie_player_' + counter++, opts.width, opts.height, opts.flashVersion, opts.bgColor);
		if (opts.expressInstaller) so.useExpressInstall(opts.expressInstaller);

		for (var p in opts.params)
			if (p != 'bgColor') so.addParam(p, opts.params[p]);
		for (var f in opts.flashvars)
			so.addVariable(f, opts.flashvars[f]);
		so.write($div[0]);
	}

	if (opts.caption) $('<div>').appendTo($div).html(opts.caption);
	return $div;
};

// map flv and mp3 files to the swf player by default
$.fn.media.flv = $.fn.media.mp3 = function(el, opts) {
	var src = opts.src;
	var player = /\.mp3\b/i.test(src) ? opts.mp3Player : opts.flvPlayer;
	var key = opts.flvKeyName;
	src = encodeURIComponent(src);
	opts.src = player;
	opts.src = opts.src + '?'+key+'=' + (src);
	var srcObj = {};
	srcObj[key] = src;
	opts.flashvars = $.extend({}, srcObj, opts.flashvars );
	return $.fn.media.swf(el, opts);
};

//
//	Silverlight
//
$.fn.media.xaml = function(el, opts) {
	if (!window.Sys || !window.Sys.Silverlight) {
		if ($.fn.media.xaml.warning) return;
		$.fn.media.xaml.warning = 1;
		alert('You must include the Silverlight.js script.');
		return;
	}

	var props = {
		width: opts.width,
		height: opts.height,
		background: opts.bgColor,
		inplaceInstallPrompt: opts.silverlight.inplaceInstallPrompt,
		isWindowless: opts.silverlight.isWindowless,
		framerate: opts.silverlight.framerate,
		version: opts.silverlight.version
	};
	var events = {
		onError: opts.silverlight.onError,
		onLoad: opts.silverlight.onLoad
	};

	var id1 = el.id ? (' id="'+el.id+'"') : '';
	var id2 = opts.id || 'AG' + counter++;
	// convert element to div
	var cls = opts.cls ? (' class="' + opts.cls + '"') : '';
	var $div = $('<div' + id1 + cls + '>');
	$(el).after($div).remove();

	Sys.Silverlight.createObjectEx({
		source: opts.src,
		initParams: opts.silverlight.initParams,
		userContext: opts.silverlight.userContext,
		id: id2,
		parentElement: $div[0],
		properties: props,
		events: events
	});

	if (opts.caption) $('<div>').appendTo($div).html(opts.caption);
	return $div;
};

//
// generate object/embed markup
//
function generate(el, opts, player) {
	var $el = $(el);
	var o = $.fn.media.defaults.players[player];

	if (player == 'iframe') {
		o = $('<iframe' + ' width="' + opts.width + '" height="' + opts.height + '" >');
		o.attr('src', opts.src);
		o.css('backgroundColor', o.bgColor);
	}
	else if (player == 'img') {
		o = $('<img>');
		o.attr('src', opts.src);
		opts.width && o.attr('width', opts.width);
		opts.height && o.attr('height', opts.height);
		o.css('backgroundColor', o.bgColor);
	}
	else if (lameIE) {
		var a = ['<object width="' + opts.width + '" height="' + opts.height + '" '];
		for (var key in opts.attrs)
			a.push(key + '="'+opts.attrs[key]+'" ');
		for (var key in o.ieAttrs || {}) {
			var v = o.ieAttrs[key];
			if (key == 'codebase' && window.location.protocol == 'https:')
				v = v.replace('http','https');
			a.push(key + '="'+v+'" ');
		}
		a.push('></ob'+'ject'+'>');
		var p = ['<param name="' + (o.oUrl || 'src') +'" value="' + opts.src + '">'];
		for (var key in opts.params)
			p.push('<param name="'+ key +'" value="' + opts.params[key] + '">');
		var o = document.createElement(a.join(''));
		for (var i=0; i < p.length; i++)
			o.appendChild(document.createElement(p[i]));
	}
	else if (opts.standards) {
		// Rewritten to be standards compliant by Richard Connamacher
		var a = ['<object type="' + o.mimetype +'" width="' + opts.width + '" height="' + opts.height +'"'];
		if (opts.src) a.push(' data="' + opts.src + '" ');
		if (msie) {
			for (var key in o.ieAttrs || {}) {
				var v = o.ieAttrs[key];
				if (key == 'codebase' && window.location.protocol == 'https:')
					v = v.replace('http','https');
				a.push(key + '="'+v+'" ');
			}
		}
		a.push('>');
		a.push('<param name="' + (o.oUrl || 'src') +'" value="' + opts.src + '">');
		for (var key in opts.params) {
			if (key == 'wmode' && player != 'flash') // FF3/Quicktime borks on wmode
				continue;
			a.push('<param name="'+ key +'" value="' + opts.params[key] + '">');
		}
		// Alternate HTML
		a.push('<div><p><strong>'+o.title+' Required</strong></p><p>'+o.title+' is required to view this media. <a href="'+o.pluginspage+'">Download Here</a>.</p></div>');
		a.push('</ob'+'ject'+'>');
	}
	 else {
	        var a = ['<embed width="' + opts.width + '" height="' + opts.height + '" style="display:block"'];
	        if (opts.src) a.push(' src="' + opts.src + '" ');
	        for (var key in opts.attrs)
	            a.push(key + '="'+opts.attrs[key]+'" ');
	        for (var key in o.eAttrs || {})
	            a.push(key + '="'+o.eAttrs[key]+'" ');
	        for (var key in opts.params) {
	            if (key == 'wmode' && player != 'flash') // FF3/Quicktime borks on wmode
	            	continue;
	            a.push(key + '="'+opts.params[key]+'" ');
	        }
	        a.push('></em'+'bed'+'>');
	    }	
	// convert element to div
	var id = el.id ? (' id="'+el.id+'"') : '';
	var cls = opts.cls ? (' class="' + opts.cls + '"') : '';
	var $div = $('<div' + id + cls + '>');
	$el.after($div).remove();
	(lameIE || player == 'iframe' || player == 'img') ? $div.append(o) : $div.html(a.join(''));
	if (opts.caption) $('<div>').appendTo($div).html(opts.caption);
	return $div;
};


})(jQuery);


/**
 * 控制pdf，word，swf,media等的展示控制类
 * 
 * @param param
 *            初始化参数对象
 * @return
 * @author 戴连春
 */
function controlWordOrPdf(param){
	 
  var This = this;
  // 展示插件的节点
  this.dom = "";
  // 鼠标滚动的相对对象，默认为document
  this.scrollDom = document;  
  // 滚动到的高度
  this.scrollHeight = null;
  // 滚动缓冲的高度
  this.bufferHeight = 20;
  // 插件节点的高度
  this.height = 500;
  // 插件节点的宽度
  this.width = "100%";        
  // word是否可编辑
  this.editAble = true;
  // 展示的类型
  this.type = "pdf";// word表示为展示word，pdf表示展示pdf
  // 展示的file(展示word传入id，展示pdf传入文件名)
  this.file = "";
  //自己定义的初始化按钮的函数
  this.initButtonSelf = function(obj){};
  // office对象
  var office = null;
  
  // 工程名
  var path = getContextPath();
  /**
	 * 初始化
	 */
  this.init = function(){
    // 对选项赋值
	getSetting(This,param);
	var showDom = jQuery(This.dom);
	// 设置高度
	showDom.height(This.height);
	// dom存在
	if(showDom && showDom.length){
      if(This.type == "word"){// 暂时内容为word的操作
          if(This.editAble){// 可编辑
    	    showDom.attr("src",path+"/ccapp/xtbg/public/util/jsp/iwebOffice2009.jsp?RecordID="+This.file+"&EditType=1,4&ShowType=1");
          }else{// 不可编辑
        	showDom.attr("src",path+"/ccapp/xtbg/public/util/jsp/iwebOffice2009.jsp?RecordID="+This.file+"&EditType=0,4&ShowType=1");
          }   
          // 初始化button
         intervalInitButton(This.getOffice());
      }else if(This.type == "pdf"){// PDF操作(暂时只支持到pdf)
        // 检测是否安装pdf插件
    	if(This.isAcrobatPluginInstall(path)){
    	  //传入的为id，则转换为文件
    	  if(This.file.indexOf(".pdf") == -1 && This.file){
    		  //路径写死
    		  This.file = path+"/uploadDocument/"+This.file+".pdf";
    	  }
         // 添加播放器
       	 showDom.media({   
            width: This.width,   
            height: This.height,   
            autoplay: true,   
            src: This.file,              
            caption: false 
         }); 
         
    	}
     }
    // 如果配置了滚动的高度，才添加事件
    if(null != This.scrollHeight){
      // 添加鼠标事件
      This.addMouseover();
    }
  }
  }

 
  /**
	 * 添加鼠标事件
	 */
  this.addMouseover = function(){

	  var showDom = jQuery(This.dom);
	  var scrollDom = jQuery(This.scrollDom);    	  
      // 添加鼠标moveon事件
      if(showDom && showDom.length){
    	  showDom.mouseover(function(a){
          // 执行窗口滚动
          This.scroll(This.scrollHeight,This.bufferHeight,scrollDom);
        });
      }
  }

  /**
	 * 定时执行窗口滚动程序
	 * 
	 * @top : 滚动到的高度
	 * @bufferHeight : 滚动缓冲的高度，滚动动画缓冲高度
	 * @dom : 进行滚动的dom【jquery对象，如 jQuery（window），jQuery("#dom")】
	 */
 this.scroll =  function(top,bufferHeight,dom){
	  // 当前滚动条所在的高度不等于要滚动到的高度，则进行滚动
      if(dom.scrollTop() != top){
          // 默认缓冲高度
          var i = bufferHeight;
          // 设置定时执行窗口滚动 ,从距离30的缓冲距离慢慢接近
          var interval = setInterval(function(){     
             // 隐式执行滚动函数
            (function(step,top,scroll){                     
                 scroll.scrollTop(top-step);
                 // 若滚动到指定位置，清除定时操作
                 if(step <= 0){    
                	 //滚动完后，如果发现滚动的高度小于top，top设置过高，将top设置为当前滚动高度
                	 if(dom.scrollTop()<top){
                	   This.scrollHeight = dom.scrollTop();
                	}
                    clearInterval(interval);
                 }
           })(i--,top,dom);
       }, 20);
      }
  }
  /**
	 * 判断浏览器是否安装adobe pdf插件.未安装则提供下载
	 */
 this.isAcrobatPluginInstall = function (path) {
      var flag = false;
      // 如果是firefox浏览器
      if (navigator.plugins && navigator.plugins.length) {
          for ( var x = 0; x < navigator.plugins.length; x++) {
              if (navigator.plugins[x].name == 'Adobe Acrobat')
                  flag = true;
          }
      }
      // 处理IE浏览器的情况
      else if (window.ActiveXObject) {
          for ( var x = 2; x < 10; x++) {
              try {
                  var oAcro = eval("new ActiveXObject('PDF.PdfCtrl." + x
                          + "');");
                  if (oAcro) {
                      flag = true;
                  }
              } catch (e) {
                  flag = false;
              }
          }
          try {
              var oAcro4 = new ActiveXObject('PDF.PdfCtrl.1');
              if (oAcro4) {
                  flag = true;
              }
          } catch (e) {
              flag = false;
          }
          try {
              var oAcro7 = new ActiveXObject('AcroPDF.PDF.1');
              if (oAcro7)
                  flag = true;
          } catch (e) {
              flag = false;
          }
      }
      if (flag) {
          return true;
      } else {
          alert("对不起,您还没有安装阅读器软件,无法浏览PDF文件。是否下载安装?", {
              headerText : '提示',
              okName : '下载',
              okFunction : function() {
                  location = path + "/ccapp/xtbg/resources/plug/"
                          + "adobeReaderPdf/AdobeReaderPdf_zh_CN.exe";
              },
              cancelName : '取消'
          });
      }
      return flag;
  }
 /**
	 * 提交word时候的表单
	 */
 this.submit = function(){
	 // 只有为word时，才提交表单
	if("word" == This.type){
		var dom = jQuery(This.dom);
		if(dom && dom.length){
	     var webformObj = dom.contents().find("#webform"); // 获取eWebEditor1中的webform对象;
         // form存在，则提交表单
	     webformObj && webformObj.length && webformObj.submit();
		}
	}
 }
 /**
	 * 获得word包含的内容
	 */
 this.getContent = function(){
	 var office = This.getOffice();
	 if(office){
		debugger;
		return office.WebObject.Content.Text;
	 }
	 return "";
 }
 
 /**
   * word赋值操作
   */
 this.setContent = function(str){
	 var office = This.getOffice();
	 if(office){
		office.WebObject.Content.Text = str ? str : "";
	 }
 }
 
 /**
  * 延时执行word赋值操作，防止因为word未加载完导致赋值不成功
  */
 this.intervalSetContent = function(str){	 
	     //如果已加载，直接赋值
	     if(This.getOffice()){
	    	 This.setContent(str);	
	    	 return;
	     }	 
		 var i = 100;
		 // 定时执行，直到word加载成功
		 var interval = setInterval(function(){
			 //得到office对象
			 var obj = This.getOffice();
			 if(obj){
				   clearInterval(interval);
				   This.setContent(str);	
			 }
			 //防止因为word不存在导致无限循环
			 if(!i--){
			   clearInterval(interval);
			 }			 
		 },100);	  
 }
 /**
   * 获得word文档对象
   */
 this.getOffice = function(){	 
	// 只有为word时，才存在office对象
	if("word" == This.type){
			var dom = jQuery(This.dom);
			if(dom && dom.length){
		     var office = dom.contents().find("#WebOffice"); // 获取eWebEditor1中的webform对象;
	         // 返回office对象
		     return office && office.length ? office[0] : null;
			}
		}	 
	 return null;
 }
 
 /**
   * 初始化按钮，由于使用的原先就弄好的金格控件的页面，故需要初始化button
   * 而且由于编码格式不统一，对中文进行转码
   */
 this.initButton = function(obj){
	if(!obj){
	   return;
	}	
	//添加按钮
	//obj.AppendTools("23","\u5957\u7ea2(&O)",23);//套红
	obj.AppendTools("16","\u6253\u5370\u6587\u6863(&P)",16);//打印文档
	//  隐藏button
	obj.VisibleTools('\u9690\u85cf\u75d5\u8ff9',false);//隐藏痕迹
	obj.VisibleTools('\u663e\u793a\u75d5\u8ff9',false);//显示痕迹
	obj.VisibleTools('\u6587\u4ef6\u6279\u6ce8',false);//文件批注
	obj.VisibleTools('\u624b\u5199\u6279\u6ce8',false);//手写批注
	obj.VisibleTools('\u91cd\u65b0\u6279\u6ce8',false);//重新批注
	obj.VisibleTools('\u6587\u6863\u6e05\u7a3f',false);//文档清稿
	obj.VisibleTools('\u6587\u5b57\u6279\u6ce8',false);//文字批注
	obj.VisibleTools('\u4fdd\u5b58',false);//保存
 }
 
 
 /**
	 * 参数赋值(私有函数)
	 */
 function getSetting(el,params){
   params = params || {};
   el = el || {};
   // 遍历属性
   for(var name in params){
      for(var elName in el){
          // 如果属性名相同，则对el赋值
         if(name == elName){
             el[elName] = params[name];
             break;   
         }
      }
   }
 }
  /**
	 * 获取当前应用上下文路径
	 */
 function getContextPath() { 
      var contextPath = document.location.pathname;

      if(contextPath.substr(0,1) != "/"){
          contextPath="/"+contextPath;
      }
      var index =contextPath.substr(1).indexOf("/"); contextPath = contextPath.substr(0,index+1); 
      delete index;
      return contextPath; 
  }
 /**
  * 定时执行button初始化操作
  */
 function intervalInitButton(){
	 var i = 100;
	 // 由于加载word比较慢，故定时执行，直到word加载成功
	 var interval = setInterval(function(){
		 //得到office对象
		 var obj = This.getOffice();
		 if(obj){
			   clearInterval(interval);
			   This.initButton(obj);		
			   //如果自己定义了初始化button函数，则执行
			   if(typeof This.initButtonSelf == "function"){
				This.initButtonSelf(obj);   
			   }
		 }
		 //防止无限循环
		 if(!i--){
		   clearInterval(interval);
		 }		 
	 },100);
  }
  // 初始化
  this.init();
}
