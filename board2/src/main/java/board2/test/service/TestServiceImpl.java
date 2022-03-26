package board2.test.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import board2.test.entity.TestDataEntity;
import board2.test.repository.TestDataRepository;

@Service
public class TestServiceImpl implements TestService{
	
	@Autowired
	TestDataRepository testDataRepository;
	
	@Override
	public void insertData() throws Exception {
		TestDataEntity entity = new TestDataEntity();
		entity.setName("chul");
		entity.setAge(20);
		entity.setScore(80);
		testDataRepository.save(entity);
	}

	@Override
	public List<TestDataEntity> findData() throws Exception {
		return testDataRepository.findAll(); 
	}

	@Override
	public void updateData() throws Exception {
		TestDataEntity entity = new TestDataEntity();
		entity.set_id("623f05026eafcd1a8ccb4678");
		entity.setName("updatedName");
		testDataRepository.save(entity);
	}

	@Override
	public void deleteData() throws Exception {
		testDataRepository.deleteById("623f05026eafcd1a8ccb4678");
	}

}
