package board2.board.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import board2.board.entity.BoardEntity;
import board2.board.entity.BoardFileEntity;

public interface JpaBoardRepository extends CrudRepository<BoardEntity,Integer>{ // 스프링 데이터 JPA에서 제공하는 CrudRepository 인터페이스를 상속받습니다. 
	// CrudRepository 인터페이스는 리포지터리에서 사용할 도메인 클래스와 도메인의 id 타입을 파라미터로 받습니다. 
	// 여기서는 도메인 클래스로 BoardEntity 클래스와 BoardENtity 클래스의 id 타입인 Integer를 사용합니다.
	List<BoardEntity> findAllByOrderByBoardIdxDesc(); // 게시글 번호로 정렬해서 전체 게시글을 조회합니다. 규칙에 맞도록 리포지터리에 메서드를 추가하면 실행 시 메서드의 이름에 따라 쿼리가 생성되어 실행됩니다.
	
	// @Query 어노테이션을 이용해서 첨부파일의 정보를 조회합니다. @Query 어노테이션을 사용하면 실행하고 싶은 쿼리를 직접 정의할 수 있습니다. 쿼리 메서드로도 개발할 수도 있습니다.  
	@Query("SELECT file FROM BoardFileENtity file WHERE board_idx = :boardIdx And idx = :idx")
	BoardFileEntity findBoardFile(@Param("boardIdx") int boardIdx, @Param("idx") int idx);

}
