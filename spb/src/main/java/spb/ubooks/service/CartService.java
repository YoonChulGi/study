package spb.ubooks.service;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import spb.ubooks.entity.CartEntity;

public interface CartService {
	List<CartEntity> selectCartList(HttpServletRequest request) throws Exception;
	String addCart(Map<String,Object> searchResult,int qty, HttpServletRequest request) throws Exception;
}
