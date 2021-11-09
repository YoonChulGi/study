package spb.ubooks.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import spb.ubooks.entity.FileEntity;

public interface FileRepository extends CrudRepository<FileEntity,Integer>{
	void deleteByBookId(@Param("bookId")int bookId);
}
