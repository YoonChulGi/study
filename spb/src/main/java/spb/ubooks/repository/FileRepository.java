package spb.ubooks.repository;

import org.springframework.data.repository.CrudRepository;
import spb.ubooks.entity.FileEntity;

public interface FileRepository extends CrudRepository<FileEntity,Integer>{
	
}
