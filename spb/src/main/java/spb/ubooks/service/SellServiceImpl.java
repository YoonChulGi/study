package spb.ubooks.service;

import java.time.LocalDateTime;
import java.util.Iterator;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import lombok.extern.slf4j.Slf4j;
import spb.common.FileUtils;
import spb.ubooks.entity.CombookEntity;
import spb.ubooks.entity.FileEntity;
import spb.ubooks.mapper.MemberMapper;
import spb.ubooks.repository.CombookRepository;
import spb.ubooks.repository.FileRepository;

@Slf4j
@Service
public class SellServiceImpl implements SellService{

	@Autowired
	CombookRepository combookRepository;
	
	@Autowired
	FileRepository fileRepository;
	
	@Autowired
	MemberMapper memberMapper;
	
	@Autowired
	FileUtils fileUtils;
	
	@Override
	public void registProduct(CombookEntity combook, MultipartHttpServletRequest multipartHttpServletRequest ) throws Exception {
		HttpSession session = multipartHttpServletRequest.getSession();
		String memberId = session.getAttribute("memberId").toString();
		String sellerName = session.getAttribute("memberName").toString();
		String sellerContact = memberMapper.selectMemberContactByMemberId(memberId);
		combook.setSellerName(sellerName);
		combook.setSellerContact(sellerContact);
		String minAge = combook.getMinAge();
		
		if("초등전학년".equals(minAge) || "초등3학년이상".equals(minAge)) {
			combook.setMaxAge(combook.getMinAge());
		} else {
			String[] minMaxAges = combook.getMinAge().split("-");
			combook.setMinAge(minMaxAges[0]);
			combook.setMaxAge(minMaxAges[1]);
		}
		LocalDateTime now = LocalDateTime.now();
		String regDate = ""; 
		
		regDate += now.getYear();
		regDate += addZero(now.getMonthValue());
		regDate += addZero(now.getDayOfMonth());
		regDate += addZero(now.getHour());
		regDate += addZero(now.getMinute());
		regDate += addZero(now.getSecond());
		combook.setRegDate(regDate);
		
		CombookEntity ce = combookRepository.save(combook);
		int bookId = ce.getBookId();
		List<FileEntity> list = fileUtils.parseFileInfo(multipartHttpServletRequest,bookId);
		if(CollectionUtils.isEmpty(list)== false) {
			Iterable<FileEntity> it = new Iterable<FileEntity>() {
				@Override
				public Iterator<FileEntity> iterator() {
					return list.iterator();
				}
			};
			fileRepository.saveAll(it);
		}
	}
	
	String addZero(int time) {
		String res = "";
		if(time<10) {
			res += "0"+time;
		} else {
			res += time;
		}
		return res;
	}

}
