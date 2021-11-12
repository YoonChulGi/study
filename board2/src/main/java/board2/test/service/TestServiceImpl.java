package board2.test.service;

import java.util.HashMap;
import java.util.Map;

import org.elasticsearch.action.admin.indices.delete.DeleteIndexRequest;
import org.elasticsearch.action.delete.DeleteRequest;
import org.elasticsearch.action.get.GetRequest;
import org.elasticsearch.action.get.GetResponse;
import org.elasticsearch.action.index.IndexRequest;
import org.elasticsearch.action.update.UpdateRequest;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.client.indices.CreateIndexRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class TestServiceImpl implements TestService{
	
	@Autowired
	RestHighLevelClient client;

	@Override
	public void createIndex() throws Exception {
		CreateIndexRequest request = new CreateIndexRequest("testindex");
		
		Map<String,Object> message = new HashMap<>();
		message.put("type", "text");
		Map<String,Object> properties = new HashMap<>();
		properties.put("message", message);
		Map<String,Object> mapping = new HashMap<>();
		mapping.put("properties", properties);
		
		request.mapping(mapping);
		
		client.indices().create(request, RequestOptions.DEFAULT);
		
		
	}

	@Override
	public void deleteIndex() throws Exception {
		DeleteIndexRequest request = new DeleteIndexRequest("testindex");
		client.indices().delete(request, RequestOptions.DEFAULT);
	}

	@Override
	public void insertDocument() throws Exception {
		IndexRequest request = new IndexRequest("testindex");
		Map<String,Object> doc = new HashMap<>();
		doc.put("message", "테스트입니다.");
		request.source(doc);
		client.index(request, RequestOptions.DEFAULT);
	}

	@Override
	public void getDocument() throws Exception {
		GetRequest request = new GetRequest("testindex", "Kf8NFH0BgwgVRf4nZwZL"); // 인덱스명, _id
		GetResponse response = client.get(request, RequestOptions.DEFAULT);
		if(response.isExists()) { // 문서있음
			Map<String,Object> sourceAsMap = response.getSourceAsMap();
			log.debug(sourceAsMap.toString());
		} else { // 문서없음
			log.debug("문서 없음!!");
		}
	}

	@Override
	public void deleteDocument() throws Exception {
		DeleteRequest request = new DeleteRequest("testindex","Kf8NFH0BgwgVRf4nZwZL");
		client.delete(request, RequestOptions.DEFAULT);
	}

	@Override
	public void updateDocument() throws Exception {
		UpdateRequest request = new UpdateRequest("testindex","zv8NFH0BgwgVRf4n8gY6");
		Map<String,Object> updatedDoc = new HashMap<>();
		updatedDoc.put("message", "업데이트된 문서입니다.");
		request.doc(updatedDoc);
		client.update(request, RequestOptions.DEFAULT);
	}

}
