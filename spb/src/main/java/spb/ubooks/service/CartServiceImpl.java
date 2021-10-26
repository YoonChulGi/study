package spb.ubooks.service;

import java.util.ArrayList;
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
	
	@Autowired
	SearchService searchService;

	@Override
	public List<CartEntity> selectCartList(HttpServletRequest request) throws Exception {
		HttpSession session = request.getSession();
		if(session.getAttribute("memberId")!=null) {
			String memberId = session.getAttribute("memberId").toString().trim();
			log.debug(memberId);
			return cartRepository.findAllByMemberId(memberId);
		} else {
			return null;
		}
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

	@Override
	public void deleteCart(String book_id, HttpServletRequest request) throws Exception {
		log.debug("book_id: "+book_id);
		String [] bookIds = book_id.split(",");
		int[] bookIdsInt = new int[bookIds.length];
		for(int i=0;i<bookIds.length;i++) {
			bookIdsInt[i] = Integer.parseInt(bookIds[i]);
		}
		
		HttpSession session = request.getSession();
		if(session.getAttribute("memberId")!=null) {
			String memberId = session.getAttribute("memberId").toString();
			cartRepository.deleteAllByMemberIdAndBookIdIn(memberId, bookIdsInt);
		}
	}

	@Override
	public List<Map<String, Object>> getCartList(HttpServletRequest request) throws Exception {
		List<CartEntity> cartList = this.selectCartList(request);
		List<Map<String,Object>> resultList = new ArrayList<Map<String,Object>>();
		HttpSession session = request.getSession();
		if(session.getAttribute("memberId")!=null) { // 로그인시
			if(cartList!=null) {
				for(CartEntity c : cartList) {
					Map<String,Object> m = searchService.searchOneAsMap("combook_*", c.getBookId());
					m.put("qty", c.getQty());
					resultList.add(m);
				}
			}
		} else { // 비로그인시
			
		}
		return resultList;
	}

}
