package spb.ubooks.service;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import spb.ubooks.entity.CartEntity;

public interface CartService {
	List<CartEntity> selectCartList(HttpServletRequest request) throws Exception;
	void addCart(Map<String,Object> searchResult,int qty, HttpServletRequest request, HttpServletResponse response) throws Exception;
	void deleteCart(String book_id, HttpServletRequest request, HttpServletResponse response) throws Exception;
	List<Map<String,Object>> getCartList(HttpServletRequest request) throws Exception;
}
