package spb.ubooks.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import spb.ubooks.entity.CombookEntity;

public interface CombookRepository extends CrudRepository<CombookEntity, Integer>{

	@Query("SELECT reg_date FROM CombookEntity WHERE book_id = :bookId")
	String findRegDateById(@Param("bookId")int bookId) throws Exception;
	
}
