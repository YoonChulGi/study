package board2.test.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import org.apache.lucene.search.TotalHits;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.core.TimeValue;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.SearchHits;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.elasticsearch.search.fetch.subphase.highlight.HighlightBuilder;
import org.elasticsearch.search.fetch.subphase.highlight.HighlightField;
import org.elasticsearch.search.sort.ScoreSortBuilder;
import org.elasticsearch.search.sort.SortOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class TestServiceImpl implements TestService{
	
	@Autowired
	RestHighLevelClient client;

	@Override
	public Map<String,Object> doSearch() throws Exception {
		Map<String,Object> resultMap = new HashMap<String,Object>();
		try {
			SearchRequest searchRequest = new SearchRequest("combook*"); // 인덱스명
			SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
			searchSourceBuilder.size(10000);
			searchSourceBuilder.timeout(new TimeValue(60,TimeUnit.SECONDS));
			
			
			searchSourceBuilder.query(QueryBuilders.matchQuery("title", "지구별")); // title 필드 검색
			searchSourceBuilder.sort(new ScoreSortBuilder().order(SortOrder.DESC));  // score 높은순 (default)
			
			HighlightBuilder highlightBuilder = new HighlightBuilder(); 
			HighlightBuilder.Field highlightTitle = new HighlightBuilder.Field("title"); 
			highlightTitle.highlighterType("unified");  // unified : 통일(default)
			highlightBuilder.field(highlightTitle);  
			searchSourceBuilder.highlighter(highlightBuilder);
			
			searchRequest.source(searchSourceBuilder);
			SearchResponse searchResponse = client.search(searchRequest, RequestOptions.DEFAULT); // 검색 요청
			SearchHits hits = searchResponse.getHits();
			TotalHits totalHits = hits.getTotalHits(); // total 검색 건수
			
			SearchHit[] searchHits = hits.getHits();
			List<Map<String,Object>> list = new ArrayList<Map<String,Object>>();
			list = new ArrayList<Map<String,Object>>();
			for (SearchHit hit : searchHits) {
				Map<String, Object> sourceAsMap = hit.getSourceAsMap(); // 검색 결과를 Map으로 한건 한건 받아서 list에 추가
				HighlightField field = hit.getHighlightFields().get("title");
				sourceAsMap.put("highlight", field);
				
				list.add(sourceAsMap);
			}
			resultMap.put("totalHits", totalHits.value);
			resultMap.put("searchResults", list);
//			resultMap.put("searchResponse", searchResponse);
		}catch (Exception e) {
			e.printStackTrace();
			resultMap.put("totalHits", -500);
			resultMap.put("exception", e);
		}
		return resultMap;
	}

	

}
