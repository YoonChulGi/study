package spb.ubooks.service;

import org.springframework.web.multipart.MultipartHttpServletRequest;

import spb.ubooks.dto.ComBookIndexDto;
import spb.ubooks.entity.CombookEntity;

public interface SellService {
	public ComBookIndexDto registProduct(CombookEntity combook, MultipartHttpServletRequest multipartHttpServletRequest ) throws Exception;
	public void indexProduct(ComBookIndexDto combookIndexDto) throws Exception;
}
