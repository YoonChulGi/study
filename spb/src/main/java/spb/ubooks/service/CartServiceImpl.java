package spb.ubooks.service;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;
import spb.ubooks.entity.CartEntity;
import spb.ubooks.repository.CartRepository;

@Slf4j
@Service
public class CartServiceImpl implements CartService{
	
	@Autowired
	CartRepository cartRepository;

	@Override
	public List<CartEntity> selectCartList(HttpServletRequest request) throws Exception {
		HttpSession session = request.getSession();
		String memberId = session.getAttribute("memberId").toString().trim();
		log.debug(memberId);
		return cartRepository.findAllByMemberId(memberId);
	}

	@Override
	public String addCart(Map<String, Object> searchResult,int qty, HttpServletRequest request) throws Exception {
		HttpSession session = request.getSession();
		CartEntity cartEntity = new CartEntity();
		
		cartEntity.setBookId(Integer.parseInt(searchResult.get("book_id").toString().trim()));
		cartEntity.setMemberId(session.getAttribute("memberId").toString().trim());
		cartEntity.setQty(qty);
		cartRepository.save(cartEntity);
		return "redirect:/cart";
	}

}
