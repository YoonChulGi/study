package board.elastic.service;

//import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Autowired;

public class ElasticServiceImpl implements ElasticService{
	
	private Logger log = LoggerFactory.getLogger(this.getClass());
	
//	@Autowired
//	ElasticApi elasticApi;
	
	private final String ELASTIC_INDEX = "선별진료소";
	private final String ELASTIC_TYPE = "_doc";
	

	@Override
	public void sendGET() throws Exception {
		String id = "DfbtunsBcW0Djpftabvh";
		String url = ELASTIC_INDEX + "/" + ELASTIC_TYPE+"/"+id;
//		Map<String, Object> result = elasticApi.callElasticApi("GET", url, null, null);
//		System.out.println(result.get("resultCode"));
//		System.out.println(result.get("resultBody"));
		log.debug("sendGet() called !!");
	}
	
}
