package spb.ubooks.service;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.multipart.MultipartHttpServletRequest;

import spb.ubooks.dto.ComBookIndexDto;
import spb.ubooks.entity.CombookEntity;

public interface SellService {
	public ComBookIndexDto registProduct(CombookEntity combook, MultipartHttpServletRequest multipartHttpServletRequest, int bid ) throws Exception;
	public void indexProduct(ComBookIndexDto combookIndexDto) throws Exception;
	public Map<String,Object> dataSettingForUpdateProduct(Map<String,Object> combookMap) throws Exception;
	public void updateIndexProduct(ComBookIndexDto combookIndexDto) throws Exception;
	public boolean deleteProduct(HttpServletRequest request, int bookId)throws Exception;
	public void deleteIndexProduct(int bookId) throws Exception;;
}
