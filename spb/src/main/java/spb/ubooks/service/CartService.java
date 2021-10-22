package spb.ubooks.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import spb.ubooks.entity.CartEntity;

public interface CartService {
	List<CartEntity> selectCartList(HttpServletRequest request) throws Exception;
}
