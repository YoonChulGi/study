package board.elastic.service;

import java.util.List;
import java.util.Map;

import board.elastic.document.선별진료소Dto;

public interface ElasticService {

	public Map<String, Object> sendGET() throws Exception;
	
	public List<선별진료소Dto> highLevelSendGet() throws Exception;
	
}
