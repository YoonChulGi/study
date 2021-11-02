package spb.ubooks.service;

import org.springframework.web.multipart.MultipartHttpServletRequest;

import spb.ubooks.entity.CombookEntity;

public interface SellService {
	public void registProduct(CombookEntity combook, MultipartHttpServletRequest multipartHttpServletRequest ) throws Exception;
}
