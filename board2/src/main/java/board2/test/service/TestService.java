package board2.test.service;

import java.util.List;

import board2.test.entity.TestDataEntity;

public interface TestService {
	void insertData() throws Exception;
	List<TestDataEntity> findData() throws Exception;
	void updateData() throws Exception;
	void deleteData() throws Exception;
}
