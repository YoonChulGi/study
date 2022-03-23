package spb.ubooks.mongoRepository;

import org.springframework.data.mongodb.repository.MongoRepository;

import spb.ubooks.mongoEntity.ErrorLog;

public interface ErrorLogRepository extends MongoRepository<ErrorLog, String>{
	
}
