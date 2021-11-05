package spb.ubooks.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface CombookMapper {
	List<String> selectDepartments() throws Exception;
	List<String> selectPublishers() throws Exception;
	List<String> selectAges() throws Exception;
	List<Integer> selectNextPrevBookIds(int bookId) throws Exception;
}
