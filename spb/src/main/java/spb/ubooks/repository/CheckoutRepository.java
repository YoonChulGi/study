package spb.ubooks.repository;

import org.springframework.data.repository.CrudRepository;

import spb.ubooks.entity.CheckoutEntity;

public interface CheckoutRepository extends CrudRepository<CheckoutEntity,String>{

}
