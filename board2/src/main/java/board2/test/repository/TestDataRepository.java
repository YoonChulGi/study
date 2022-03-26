package board2.test.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import board2.test.entity.TestDataEntity;

public interface TestDataRepository extends MongoRepository<TestDataEntity, String>{

}
