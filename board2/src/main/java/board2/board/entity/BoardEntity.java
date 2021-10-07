package board2.board.entity;

import java.time.LocalDateTime;
import java.util.Collection;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity // @Entity 어노테이션은 해당 클래스가 JPA의 엔티티임을 나타냅니다. 엔티티 클래스는 테이블과 매핑됩니다. 
@Table(name="t_jpa_board") // t_jpa_board 테이블과 매핑되도록 나타냅니다. 
@NoArgsConstructor
@Data
public class BoardEntity {
	@Id // 엔티티의 기본키(Primary Key, PK) 임을 나타냅니다. 
	@GeneratedValue(strategy=GenerationType.AUTO) // 기본키의 생성 전략을 설정합니다. GenerationType.AUTO로 지정할 경우데이터베이스에서 제공하는 기본키 생성 전략을 따르게 됩니다. 
	private int boardIdx;
	
	@Column(nullable=false) // 컬럼에 Not Null 속성을 지정합니다. 
	private String title;
	
	@Column(nullable=false)
	private String contents;
	
	@Column(nullable=false)
	private int hitCnt = 0;
	
	@Column(nullable=false)
	private String creatorId;
	
	@Column(nullable=false)
	// 작성시간의 초깃값을 설정합니다. @Column 어노테이션을 이용해서 초깃값을 지정할 수도 있지만 사용하는 데이터베이스에 따라서 초깃값을 다르게 설정 해야 할 수도 있습니다. 
	//하지만 이렇게 하면 데이터베이스의 종류와 관계없이 사용할 수 있는 JPA의 장점이 퇴색되기 때문에 데이터베이스에 의존적인 초깃값은 사용하지 않는 것이 좋습니다.
	private LocalDateTime createdDatetime = LocalDateTime.now(); 
	
	private String updaterId;
	
	private LocalDateTime updatedDateTime;
	
	@OneToMany(fetch=FetchType.EAGER, cascade=CascadeType.ALL) // @OneToMany는 1:N의 관계를 표현하는 JPA어노테이션입니다. 
	@JoinColumn(name="board_idx") // 릴레이션 관계가 있는 테이블의 컬럼을 지정합니다. 
	private Collection<BoardFileEntity> fileList;
}
