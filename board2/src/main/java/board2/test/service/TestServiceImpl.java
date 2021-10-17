package board2.test.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.core.TimeValue;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.SearchHits;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.elasticsearch.search.sort.FieldSortBuilder;
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
	public List<Map<String, Object>> sendHighLevelApi(String indexName, String sort, String department, String publisher,
			String age) throws Exception {
		ArrayList<Map<String,Object>> list = null;
		if("".equals(sort)) sort = "date";
		log.debug("sort: "+sort);
		log.debug("publisher: " + publisher);
		log.debug("department: " + department);
		log.debug("age: " + age);
		
		try {
			SearchRequest searchRequest = new SearchRequest(indexName);
			SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
			searchSourceBuilder.size(10000);
			searchSourceBuilder.timeout(new TimeValue(60,TimeUnit.SECONDS));
			
			BoolQueryBuilder query = new BoolQueryBuilder();
			
			if(!"".equals(publisher)) {
				query.must(QueryBuilders.matchQuery("publisher.keyword",publisher));
			}
			
			if(!"".equals(department)) {
				query.must(QueryBuilders.matchQuery("department.keyword", department));
			}
			
			if(!"".equals(age)) {
				if("초등3학년이상".equals(age) || "초등전학년".equals(age)) {
					age = age.concat("-"+age);
				}
				String minAge = age.split("-")[0];
				String maxAge = age.split("-")[1].replaceAll("세", "");
				query.must(QueryBuilders.matchQuery("min_age.keyword", minAge));
				query.must(QueryBuilders.matchQuery("max_age.keyword", maxAge));
			}
			
			if("".equals(publisher) && "".equals(department) && "".equals(age) ) {
				searchSourceBuilder.query(QueryBuilders.matchAllQuery());
			} else {
				searchSourceBuilder.query(query);
			}
			
			// sort
			if("date".equals(sort)) {
				searchSourceBuilder.sort(new FieldSortBuilder("reg_date.keyword").order(SortOrder.ASC)); // 등록일순 정렬
			} else if("cheap".equals(sort) ) {
				searchSourceBuilder.sort(new FieldSortBuilder("price").order(SortOrder.ASC)); // 등록일순 정렬
			} else if("expensive".equals(sort) ) {
				searchSourceBuilder.sort(new FieldSortBuilder("price").order(SortOrder.DESC)); // 등록일순 정렬
			}
			searchSourceBuilder.sort(new ScoreSortBuilder().order(SortOrder.DESC));  // score 높은순 (default)
			searchRequest.source(searchSourceBuilder);
			
			SearchResponse searchResponse = client.search(searchRequest, RequestOptions.DEFAULT);
			
			
			SearchHits hits = searchResponse.getHits();
			SearchHit[] searchHits = hits.getHits();
			list = new ArrayList<Map<String,Object>>();
			for (SearchHit hit : searchHits) {
				Map<String, Object> sourceAsMap = hit.getSourceAsMap();
				// log.debug("sourceAsMap: " + sourceAsMap);
				list.add(sourceAsMap);
			}
		}catch (Exception e) {
			e.printStackTrace();
		}
		
		return list;
	}
}
