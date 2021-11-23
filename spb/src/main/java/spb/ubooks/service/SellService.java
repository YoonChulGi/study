package spb.ubooks.service;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.multipart.MultipartHttpServletRequest;

import spb.ubooks.dto.ComBookIndexDto;
import spb.ubooks.entity.CheckoutEntity;
import spb.ubooks.entity.CombookEntity;

public interface SellService {
	public ComBookIndexDto registProduct(CombookEntity combook, MultipartHttpServletRequest multipartHttpServletRequest, int bid ) throws Exception;
	public void indexProduct(ComBookIndexDto combookIndexDto) throws Exception;
	public Map<String,Object> dataSettingForUpdateProduct(Map<String,Object> combookMap) throws Exception;
	public void updateIndexProduct(ComBookIndexDto combookIndexDto) throws Exception;
	public boolean deleteProduct(HttpServletRequest request, int bookId)throws Exception;
	public void deleteIndexProduct(int bookId) throws Exception;
	public List<Map<String, Object>> checkoutProduct(String checkoutValues) throws Exception;
	public Map<String,Object> calcProductsPrice(List<Map<String,Object>> products) throws Exception;
	public List<CheckoutEntity> orderProducts(CheckoutEntity orderInfo, HttpServletRequest request, HttpServletResponse response) throws Exception;
	public void indexOrderedProducts(List<CheckoutEntity> products) throws Exception;
}
