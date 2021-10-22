package spb.ubooks.service;

import java.util.List;

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

}
