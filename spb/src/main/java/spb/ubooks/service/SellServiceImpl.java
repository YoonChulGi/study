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
	public ComBookIndexDto registProduct(CombookEntity combook, MultipartHttpServletRequest multipartHttpServletRequest,int bid ) throws Exception {
		HttpSession session = multipartHttpServletRequest.getSession();
		String memberId = session.getAttribute("memberId").toString();
		String sellerName = session.getAttribute("memberName").toString();
		String sellerContact = memberMapper.selectMemberContactByMemberId(memberId);
		String yyyymmddmiss = "";
		if(bid!=0) {
			combook.setBook_id(bid);
		}
		combook.setSeller_id(memberId);
		combook.setSeller_name(sellerName);
		combook.setSeller_contact(sellerContact);
		String minAge = combook.getMin_age();
		
		ComBookIndexDto combookIndexDto = null;
		
		if("초등전학년".equals(minAge) || "초등3학년이상".equals(minAge)) {
			combook.setMax_age(combook.getMin_age());
		} else {
			String[] minMaxAges = combook.getMin_age().split("-");
			combook.setMin_age(minMaxAges[0]);
			combook.setMax_age(minMaxAges[1]);
		}
		LocalDateTime now = LocalDateTime.now();
		
		
		yyyymmddmiss += now.getYear();
		yyyymmddmiss += addZero(now.getMonthValue());
		yyyymmddmiss += addZero(now.getDayOfMonth());
		yyyymmddmiss += addZero(now.getHour());
		yyyymmddmiss += addZero(now.getMinute());
		yyyymmddmiss += addZero(now.getSecond());
		if(bid==0) {
			combook.setReg_date(yyyymmddmiss);
		} else {
			String regDate = combookRepository.findRegDateById(bid);
			combook.setReg_date(regDate);
			combook.setUpdated_date(yyyymmddmiss);
		}
		
		CombookEntity ce = combookRepository.save(combook);
		int bookId = ce.getBook_id();
		
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
		String indexName = "combook";
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

	@Override
	public Map<String, Object> dataSettingForUpdateProduct(Map<String, Object> combookMap) throws Exception {
		
		String minAge = combookMap.get("min_age").toString();
		String maxAge = combookMap.get("max_age").toString();
		if(!("초등3학년이상".equals(minAge) || "초등전학년".equals(minAge))) {
			combookMap.put("min_age", minAge + "-" + maxAge);
		}
		
		String[] images =  combookMap.get("images").toString().split("|");
		String imagesRes = "";
		for(int i=0;i<images.length;i++) {
			if(i != images.length-1) {
				imagesRes += "/dev/workspace/spb/src/main/resources/static" + images[i] + "|";
			} else {
				imagesRes += "/dev/workspace/spb/src/main/resources/static" + images[i];
			}
		}
		combookMap.put("images", imagesRes);
		
		return combookMap;
	}


}
