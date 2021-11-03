package board2.test.service;

import java.time.LocalDateTime;
import java.util.LinkedHashMap;

import org.elasticsearch.action.ActionListener;
import org.elasticsearch.action.index.IndexRequest;
import org.elasticsearch.action.index.IndexResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestHighLevelClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class TestServiceImpl implements TestService{
	
	@Autowired
	RestHighLevelClient client;

	@Override
	public void addIndex() throws Exception {
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
		LinkedHashMap<String, Object> doc = new LinkedHashMap<String, Object>();
		doc.put("book_id", 1000);
		doc.put("min_age", 5);
		doc.put("title", "피노키오");
		doc.put("pub_year", null);
		doc.put("seller_name", "철철");
		doc.put("reg_date", "20211102221313");
		doc.put("shipping_fee", "0");
		doc.put("images", "/images/73.jpg|/images/74.jpg|/images/75.jpg");
		doc.put("seller_contact", "010-1313-1313");
		doc.put("state", "S급입니다");
		doc.put("max_age", 10);
		doc.put("department", "예체능");
		doc.put("new_or_used", "u");
		doc.put("publisher", "도서출판 아람");
		doc.put("list_price", 100000);
		doc.put("price", 50000);
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
