package spb.ubooks.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.thymeleaf.util.StringUtils;

import lombok.extern.slf4j.Slf4j;
import spb.ubooks.entity.CartEntity;
import spb.ubooks.repository.CartRepository;
import spb.ubooks.repository.CombookRepository;

@Slf4j
@Service
public class CartServiceImpl implements CartService{
	
	@Autowired
	CartRepository cartRepository;
	
	@Autowired
	CombookRepository combookRepository;
	
	@Autowired
	SearchService searchService;

	@Override
	public List<CartEntity> selectCartList(HttpServletRequest request) throws Exception {
		HttpSession session = request.getSession();
		if(session.getAttribute("memberId")!=null) {
			return cartRepository.findAllByMemberId(session.getAttribute("memberId").toString().trim());
		} else {
			Cookie[] myCookies = request.getCookies();
			List<CartEntity> list = null;
			CartEntity cartEntity = null;
			if(myCookies!=null) {
				for(Cookie c : myCookies) {
					if("cartInfo".equals(c.getName())) {
						list = new ArrayList<CartEntity>();
						String val = c.getValue();
						String[] cartLists = val.split("@");
						for(String s : cartLists) {
							if(!"".equals(s)) {
								cartEntity = new CartEntity();
								cartEntity.setBookId(Integer.parseInt(s.split("\\|")[0]));
								cartEntity.setQty(Integer.parseInt(s.split("\\|")[1]));
								list.add(cartEntity);
							}
						}
					}
				}
			}
			return list;
		}
	}

	@Override
	public void addCart(Map<String, Object> searchResult,int qty, HttpServletRequest request, HttpServletResponse response) throws Exception {
		HttpSession session = request.getSession();
		if(session.getAttribute("memberId")!=null) { // 로그인시
			CartEntity cartEntity = new CartEntity();
			cartEntity.setBookId(Integer.parseInt(searchResult.get("book_id").toString().trim()));
			cartEntity.setMemberId(session.getAttribute("memberId").toString().trim());
			cartEntity.setQty(qty);
			cartRepository.save(cartEntity);
		} else {
			Cookie[] myCookies = request.getCookies();
			for(Cookie c : myCookies) {
				if("cartInfo".equals(c.getName()) && !c.getValue().equals("")) { // 이미 존재 하는경우
					String val = c.getValue();
					if("@".equals(val.charAt(c.getValue().length()-1)+"")) {
						val = StringUtils.substring(val, 0, val.length()-1);
					}
					Cookie cookie = new Cookie(c.getName(), c.getValue() + "@" + searchResult.get("book_id").toString().trim() + "|" + qty);
					cookie.setMaxAge(60*60*24*365);
					cookie.setPath("/");
					response.addCookie(cookie);
					return;
				}
			}
			Cookie cookie = new Cookie("cartInfo", searchResult.get("book_id").toString().trim() + "|" + qty);
			cookie.setMaxAge(60*60*24*365); // 1년
			cookie.setPath("/"); // 모든 경로에서 접근 가능 하도록 설정
			response.addCookie(cookie);
		}
		
	}

	@Override
	public void deleteCart(String book_id, HttpServletRequest request, HttpServletResponse response) throws Exception {
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
		} else {
			Cookie[] myCookies = request.getCookies();
			for(Cookie c : myCookies) {
				if("cartInfo".equals(c.getName())) {
					String[] values = c.getValue().split("@");
					for(int i=0; i < values.length; i++) {
						for(String bid : bookIds) {
							if(bid.equals(values[i].split("\\|")[0])) {
								values[i] = "";
							}
						}
					}
					String newCookieValue = "";
					for(String s : values) {
						if(!"".equals(s)) {
							newCookieValue += s+"@";
						}
					}
					
					Cookie cookie = new Cookie("cartInfo",newCookieValue);
					cookie.setMaxAge(60*60*24*365); // 1년
					cookie.setPath("/"); // 모든 경로에서 접근 가능 하도록 설정
					response.addCookie(cookie);
					return;
				}
			}
		}
	}

	@Override
	public List<Map<String, Object>> getCartList(HttpServletRequest request) throws Exception {
		List<CartEntity> cartList = this.selectCartList(request);
		List<Map<String,Object>> resultList = new ArrayList<Map<String,Object>>();
		if(cartList!=null) {
			for(CartEntity c : cartList) {
				Map<String,Object> m = searchService.searchOneAsMap("combook*", c.getBookId());
				if(m!=null) {
					m.put("qty", c.getQty());
					resultList.add(m);
				}
			}
		}
		return resultList;
	}

}
