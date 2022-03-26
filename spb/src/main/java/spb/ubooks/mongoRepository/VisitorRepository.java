package spb.ubooks.mongoRepository;

import org.springframework.data.mongodb.repository.MongoRepository;

import spb.ubooks.mongoEntity.VisitorEntity;

public interface VisitorRepository extends MongoRepository<VisitorEntity, String>{

}
