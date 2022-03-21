package spb.ubooks.mongoRepository;

import org.springframework.data.mongodb.repository.MongoRepository;

import spb.ubooks.mongoEntity.LoginLog;

public interface LoginLogRepository extends MongoRepository<LoginLog, Long>{
	
}
