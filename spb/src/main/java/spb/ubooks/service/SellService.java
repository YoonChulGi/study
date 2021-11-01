package spb.ubooks.service;

import javax.servlet.http.HttpServletRequest;

import spb.ubooks.entity.CombookEntity;

public interface SellService {
	public String RegistProduct(HttpServletRequest request, CombookEntity book) throws Exception;
}
