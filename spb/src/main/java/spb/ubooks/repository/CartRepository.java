package spb.ubooks.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import spb.ubooks.entity.CartEntity;

public interface CartRepository extends CrudRepository<CartEntity,Integer>{
	List<CartEntity> findAllByMemberId(@Param("memberId")String memberId);
}
