/*
 *	JQuery UI tabs 分页插件
 *
 *	@author li.zhu@chinacreator.com
 *
 * 	依赖于:jquery.ui.core.js, jquery.ui.widget.js, jquery.ui.tabs.js
 */

(function($) {

//  重写 ui.tabs functions
var uiTabsFuncs = { 
	refresh: $.ui.tabs.prototype.refresh, 
	option: $.ui.tabs.prototype.option
};

if ( $.uiBackCompat !== false ) {
	uiTabsFuncs = $.extend(
			uiTabsFuncs, {
				add: $.ui.tabs.prototype.add, 
				remove: $.ui.tabs.prototype.remove 
			}
	);
}
	
$.extend($.ui.tabs.prototype, {
	paging: function(options) {
		var opts = {
			tabsPerPage: 0,       
			nextButton: '&#187;', 
			prevButton: '&#171;', 
			follow: false,        
			cycle: false,         
			activeOnAdd: false,   
			followOnActive: false 
		};
		
		opts = $.extend(opts, options);

		var self = this, initialized = false, currentPage, 
			buttonWidth, containerWidth, allTabsWidth, tabWidths, 
			maxPageWidth, pages, resizeTimer = null, 
			windowHeight, windowWidth;
		
		// 初始化
		function init() {
			destroy();
			
			windowHeight = $(window).height();
			windowWidth = $(window).width();
			
			allTabsWidth = 0, currentPage = 0, maxPageWidth = 0, buttonWidth = 0,
				pages = new Array(), tabWidths = new Array(), selectedTabWidths = new Array();
			
			containerWidth = self.element.width();
			
			var maxDiff = 0;  
			self.tabs.each(function(i) {			
				if (i == self.options.active) {
					selectedTabWidths[i] = $(this).outerWidth(true);
					tabWidths[i] = self.tabs.eq(i).removeClass('ui-tabs-active').outerWidth(true);
					self.tabs.eq(i).addClass('ui-tabs-active');
					maxDiff = Math.min(maxDiff, Math.abs(selectedTabWidths[i] - tabWidths[i]));
					allTabsWidth += tabWidths[i];
				} else {
					tabWidths[i] = $(this).outerWidth(true);
					selectedTabWidths[i] = self.tabs.eq(i).addClass('ui-tabs-active').outerWidth(true);
					self.tabs.eq(i).removeClass('ui-tabs-active');
					maxDiff = Math.max(maxDiff, Math.abs(selectedTabWidths[i] - tabWidths[i]));
					allTabsWidth += tabWidths[i];
				}
			});
			
			allTabsWidth += maxDiff + 9;  

			if (allTabsWidth > containerWidth) {
				// 右按钮
				li = $('<li></li>')
					.addClass('ui-state-default ui-tabs-paging-next')
					.append($('<a href="#"></a>')
							.click(function() { page('next'); return false; })
							.html(opts.nextButton));
				
				self.tablist.append(li);
				buttonWidth = li.outerWidth(true);
				
				// 左按钮
				li = $('<li></li>')
					.addClass('ui-state-default ui-tabs-paging-prev')
					.append($('<a href="#"></a>')
							.click(function() { page('prev'); return false; })
							.html(opts.prevButton));
				self.tablist.prepend(li);
				buttonWidth += li.outerWidth(true);
				
				buttonWidth += 19; 
								
				var pageIndex = 0, pageWidth = 0, maxTabPadding = 0;
				
				for (var i = 0; i < tabWidths.length; i++) {
					if (pageWidth == 0 || selectedTabWidths[i] - tabWidths[i] > maxTabPadding)
						maxTabPadding = (selectedTabWidths[i] - tabWidths[i]);
					
					if (pages[pageIndex] == null) {
						pages[pageIndex] = { start: i };
					
					} else if ((i > 0 && (i % opts.tabsPerPage) == 0) || (tabWidths[i] + pageWidth + buttonWidth + 12) > containerWidth) {
						if ((pageWidth + maxTabPadding) > maxPageWidth)	
							maxPageWidth = (pageWidth + maxTabPadding);
						pageIndex++;
						pages[pageIndex] = { start: i };			
						pageWidth = 0;
					}
					pages[pageIndex].end = i+1;
					pageWidth += tabWidths[i];
					if (i == self.options.active) currentPage = pageIndex;
				}
				if ((pageWidth + maxTabPadding) > maxPageWidth)	
					maxPageWidth = (pageWidth + maxTabPadding);				

				self.tabs.hide().slice(pages[currentPage].start, pages[currentPage].end).show();
				if (currentPage == (pages.length - 1) && !opts.cycle) 
					disableButton('next');			
				if (currentPage == 0 && !opts.cycle) 
					disableButton('prev');
				
				buttonPadding = containerWidth - maxPageWidth - buttonWidth;
				if (buttonPadding > 0) 
					$('.ui-tabs-paging-next', self.element).css({ paddingRight: buttonPadding + 'px' });
			} else {
				destroy();
			}
			
			$(window).bind('resize', handleResize);
			
			initialized = true;
		}
		
		// 分页方法
		function page(direction) {
			currentPage = currentPage + (direction == 'prev'?-1:1);
			
			if ((direction == 'prev' && currentPage < 0 && opts.cycle) ||
				(direction == 'next' && currentPage >= pages.length && !opts.cycle))
				currentPage = pages.length - 1;
			else if ((direction == 'prev' && currentPage < 0) || 
					 (direction == 'next' && currentPage >= pages.length && opts.cycle))
				currentPage = 0;
			
			var start = pages[currentPage].start;
			var end = pages[currentPage].end;
			
			self.tabs.hide().slice(start, end).show();
			
			if (direction == 'prev') {
				enableButton('next');
				if (opts.follow && (self.options.active < start || self.options.active > (end-1))) self.option('active', end-1);
				if (!opts.cycle && start <= 0) disableButton('prev');
			} else {
				enableButton('prev');
				if (opts.follow && (self.options.active < start || self.options.active > (end-1))) self.option('active', start);
				if (!opts.cycle && end >= self.tabs.length) disableButton('next');
			}
		}
		
		function disableButton(direction) {
			$('.ui-tabs-paging-'+direction, self.element).addClass('ui-tabs-paging-disabled');
		}
		
		function enableButton(direction) {
			$('.ui-tabs-paging-'+direction, self.element).removeClass('ui-tabs-paging-disabled');
		}
		
		function handleResize() {
			if (resizeTimer) clearTimeout(resizeTimer);
			
			if (windowHeight != $(window).height() || windowWidth != $(window).width()) {
				resizeTimer = setTimeout(init, 100);
			}
		}
		
		function destroy() {
			// 删除左右按钮
			$('.ui-tabs-paging-next', self.element).remove();
			$('.ui-tabs-paging-prev', self.element).remove();
			
			// 显示所有
			self.tabs.show();
			
			initialized = false;
			
			$(window).unbind('resize', handleResize);
		}
		
		
		
		self.option = function(optionName, value) {
			var retVal = uiTabsFuncs.option.apply(this, [optionName, value]);

			if (optionName == "active") {
				if (!initialized || !opts.followOnActive)
					return retVal;

				for (var i in pages) {
					var start = pages[i].start;
					var end = pages[i].end;
					if (value >= start && value < end) {
						if (i != currentPage) {
							this.tabs.hide().slice(start, end).show();

							currentPage = parseInt(i);
							if (currentPage == 0) {
								enableButton('next');
								if (!opts.cycle && start <= 0) disableButton('prev');
							} else {
								enableButton('prev');
								if (!opts.cycle && end >= this.tabs.length) disableButton('next');
							}
						}
						break;
					}
				}
			}
			
			return retVal;
		}
		
		self.refresh = function() {
			if (initialized) {
				destroy();
				uiTabsFuncs.refresh.apply(this);
				init();
			}
			
			uiTabsFuncs.refresh.apply(this);
		}
		
		
		if ( $.uiBackCompat !== false ) {
			self.add = function(url, label, index) {
				if (initialized) {
					destroy();

					uiTabsFuncs.add.apply(this, [url, label, index]);

					if (opts.activeOnAdd) {
						if (index == undefined) index = this.tabs.length-1;
						this.option('active', index);
					}
					init();

					return this;
				}

				return uiTabsFuncs.add.apply(this, [url, label, index]);
			}

			self.remove = function(index) {
				if (initialized) {
					destroy();
					uiTabsFuncs.remove.apply(this, [index]);
					init();

					return this;
				}

				return uiTabsFuncs.remove.apply(this, [index]);
			}
		}


		$.extend($.ui.tabs.prototype, {
			pagingDestroy: function() {
				destroy();
				return this;
			},

			pagingResize: function() {
				init();
				return this;
			}
		});
		
		init();
	}
});


})(jQuery);