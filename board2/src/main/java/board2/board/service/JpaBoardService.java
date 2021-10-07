package board2.board.service;

import java.util.List;

import org.springframework.web.multipart.MultipartHttpServletRequest;

import board2.board.entity.BoardEntity;
import board2.board.entity.BoardFileEntity;

public interface JpaBoardService {
	
	List<BoardEntity> selectBoardList() throws Exception;
	
	void saveBoard(BoardEntity board, MultipartHttpServletRequest multipartHttpServletRequest) throws Exception;
	
	BoardEntity selectBoardDetail(int boardIdx) throws Exception;
	
	void deleteBoard(int boardIdx);
	
	BoardFileEntity selectBoardFileInformation(int boardIdx, int idx) throws Exception;
}
