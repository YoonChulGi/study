package board2.board.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import board2.board.entity.BoardEntity;
import board2.board.entity.BoardFileEntity;
import board2.board.repository.JpaBoardRepository;
import board2.common.FileUtils;

@Service
public class jpaBoardServiceImpl implements JpaBoardService{
	
	@Autowired
	JpaBoardRepository jpaBoardRepository;
	
	@Autowired
	FileUtils fileUtils;
	
	@Override
	public List<BoardEntity> selectBoardList() throws Exception {
		// 게시글 번호로 정렬해서 전체 게시글 목록을 조회합니다.
		return jpaBoardRepository.findAllByOrderByBoardIdxDesc();
	}

	@Override
	public void saveBoard(BoardEntity board, MultipartHttpServletRequest multipartHttpServletRequest) throws Exception {
		board.setCreatorId("admin");
		// 첨부파일의 정보를 저장하는 클래스가 BoardFileDto 클래스에서 BoardFileEntity 클래스로 변경되었기 때문에,
		// FileUtils 클래스의 parseFileInfo 메서드를 새로 만들었습니다. 뒤에서 살펴보겠습니다. 
		List<BoardFileEntity> list = fileUtils.parseFileInfo(multipartHttpServletRequest);
		if(CollectionUtils.isEmpty(list)== false) {
			// 첨부파일 목록을 BoardFileEntity 클래스에 추가합니다. 앞에서는 첨부파일 정보를 저장하는 쿼리를 따로 실행했지만 
			// 여기서는 게시글을 저장할 때 그 게시글에 포함된 첨부파일의 목록도 자동으로 저장합니다. 
			// BoardEntity 클래스에는 첨부파일 목록이 @OneToMany 어노테이션으로 연관 관계가 있기 때문입니다. 
			board.setFileList(list);
		}
		// 리포지터리의 save 메서드는 insert와 update 두 가지 역할을 같이 수행합니다. 
		// 저장할 내용이 새로 생성되었을 경우면 insert, 기존의 내용에서 변경되었을 경우 update를 수행합니다. 
		jpaBoardRepository.save(board); 
		
	}

	@Override
	public BoardEntity selectBoardDetail(int boardIdx) throws Exception {
		Optional<BoardEntity> optional = jpaBoardRepository.findById(boardIdx);
		if(optional.isPresent()) {
			// JPA의 CrudRepository에서 제공하는 기능으로 주어진 id를 가진 엔티티를 조회합니다. JPA 2.0 이전에는 fineOne이라는 이름의 메서드였는데 
			// JPA 2.0부터는 fineById로 변경되고 결괏값도 Optional 클래스로 변경되었습니다. 
			// Optional 클래스는 JDK1.8에서 추가된 클래스로, Optional클래스는 절대로 Null이 아니기 때문에 NullPointerException이 발생하지 않습니다. 
			// 만약 객체의 값이 존재한다면 isPresent 메서드를는 true를 반환하고 get 메서드로 객체의 값을 가져올 수 있습니다. 
			BoardEntity board = optional.get();
			board.setHitCnt(board.getHitCnt() + 1);
			// 리포지터리의 save 메서드는 insert와 update 두 가지 역할을 같이 수행합니다. 
			// 저장할 내용이 새로 생성되었을 경우면 insert, 기존의 내용에서 변경되었을 경우 update를 수행합니다. 
			jpaBoardRepository.save(board);
			
			return board;
		} else {
			// 여기서는 게시글 번호를 이용해서 게시글을 조회합니다. 만약 게시글 번호가 잘못되었을 경우 조회된 게시글 내용이 없기 때문에
			// 그에 맞는 적절한 작업을 수행해야 합니다. 여기서는 단순히 NullPointerException을 발생시켰지만 해당 상황에 맞게 적절한 예외 처리가 필요합니다. 
			throw new NullPointerException();
		}
	}

	@Override
	public void deleteBoard(int boardIdx) {
		jpaBoardRepository.deleteById(boardIdx); // 주어진 id를 가진 엔티티를 삭제합니다. 
	}

	@Override
	public BoardFileEntity selectBoardFileInformation(int boardIdx, int idx) throws Exception {
		BoardFileEntity boardFile = jpaBoardRepository.findBoardFile(boardIdx,idx);
		return boardFile;
	}

}
