package com.core.base.filter;

import java.util.Enumeration;

import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.ehcache.constructs.web.filter.GzipFilter;
//压缩页面
public class Gzipwebfilter extends GzipFilter {
	@Override
	protected boolean acceptsGzipEncoding(HttpServletRequest request) {
		boolean ie6 = headerContains(request, "User-Agent", "MSIE 6.0");
		boolean ie7 = headerContains(request, "User-Agent", "MSIE 7.0");
		return acceptsEncoding(request, "gzip") || ie6 || ie7;
	}

	@Override
	protected void doDestroy() {
		super.doDestroy();
	}

	@Override
	protected void doFilter(HttpServletRequest arg0, HttpServletResponse arg1,
			FilterChain arg2) throws Exception {
		String url = arg0.getRequestURI();
		//移除监控
		if (url.indexOf("/druid/") != -1) {
			arg2.doFilter(arg0, arg1);
		} else {
			super.doFilter(arg0, arg1, arg2);
		}
	}

	protected void doInit() throws Exception {
		super.doInit(filterConfig);
	}

	private boolean headerContains(final HttpServletRequest request,
			final String header, final String value) {
		logRequestHeaders(request);
		final Enumeration  accepted = request.getHeaders(header);
		while (accepted.hasMoreElements()) {
			final String headerValue = (String) accepted.nextElement();
			if (headerValue.indexOf(value) != -1) {
				return true;
			}
		}
		return false;
	}
}
