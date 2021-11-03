package spb.ubooks.service;

import java.time.LocalDateTime;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.elasticsearch.action.ActionListener;
import org.elasticsearch.action.index.IndexRequest;
import org.elasticsearch.action.index.IndexResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestHighLevelClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.extern.slf4j.Slf4j;
import spb.common.FileUtils;
import spb.ubooks.dto.ComBookIndexDto;
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
	
	@Autowired
	RestHighLevelClient client;
	
	@Override
	public ComBookIndexDto registProduct(CombookEntity combook, MultipartHttpServletRequest multipartHttpServletRequest ) throws Exception {
		HttpSession session = multipartHttpServletRequest.getSession();
		String memberId = session.getAttribute("memberId").toString();
		String sellerName = session.getAttribute("memberName").toString();
		String sellerContact = memberMapper.selectMemberContactByMemberId(memberId);
		combook.setSellerName(sellerName);
		combook.setSellerContact(sellerContact);
		String minAge = combook.getMinAge();
		
		ComBookIndexDto combookIndexDto = null;
		
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
		
		Iterable<FileEntity> it = null;
		List<FileEntity> list = fileUtils.parseFileInfo(multipartHttpServletRequest,bookId);
		if(CollectionUtils.isEmpty(list)== false) {
			it = new Iterable<FileEntity>() {
				@Override
				public Iterator<FileEntity> iterator() {
					return list.iterator();
				}
			};
			fileRepository.saveAll(it);
		}
		combookIndexDto = new ComBookIndexDto();
		combookIndexDto.setCombook(ce);
		combookIndexDto.setImages(list);
		return combookIndexDto;
	}
	
	@Override
	public void indexProduct(ComBookIndexDto combookIndexDto) throws Exception {
		log.debug("addIndex");
		LocalDateTime now = LocalDateTime.now();
		String indexName = "combook_";
		indexName += now.getYear();
		indexName += ".";
		indexName += addZero(now.getMonthValue());
		indexName += ".";
		indexName += addZero(now.getDayOfMonth());
		
		IndexRequest request = new IndexRequest(indexName);
		request.id();
		
		CombookEntity combook = combookIndexDto.getCombook();
		List<FileEntity> images = combookIndexDto.getImages();
		String imagesValue = "";
		
		for(int i=0; i<images.size(); i++) {
			imagesValue += images.get(i).getStoredFilePath();
			if((i+1) != images.size()) {
				imagesValue += "|";
			}
		}
		
		ObjectMapper objectMapper = new ObjectMapper();
		Map doc = objectMapper.convertValue(combook, Map.class);
		doc.put("images", imagesValue);
		
		request.source(doc);
		
		client.indexAsync(request, RequestOptions.DEFAULT, new ActionListener<IndexResponse>() {

			@Override
			public void onResponse(IndexResponse response) {
				log.debug("index Success");
			}

			@Override
			public void onFailure(Exception e) {
				e.printStackTrace();
			}
			
		});
		
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
