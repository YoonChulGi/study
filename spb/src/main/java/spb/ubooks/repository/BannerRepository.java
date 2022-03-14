package spb.ubooks.repository;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import spb.ubooks.entity.BannerEntity;

public interface BannerRepository extends CrudRepository<BannerEntity, Integer>{
	@Query(value="SELECT id,ad_title,ad_desc,url,bid FROM spb_banner WHERE end_date > :ymd AND deleted_yn = 'n' ORDER BY id ASC", nativeQuery=true)
	List<Map<String, Object>> findAllActive(@Param("ymd")String ymd) throws Exception; 
}
