package board2.board.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import board2.board.dto.BoardDto;
import board2.board.dto.BoardFileDto;
import board2.board.mapper.BoardMapper;
import board2.common.FileUtils;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class BoardServiceImpl implements BoardService{
	@Autowired
	private BoardMapper boardMapper;
	
	@Autowired
	private FileUtils fileUtils;
	
	@Override
	public List<BoardDto> selectBoardList() throws Exception {
		return boardMapper.selectBoardList();
	}
	
	@Override
	public void insertBoard(BoardDto board, MultipartHttpServletRequest multipartHttpServletRequest) throws Exception {
		boardMapper.insertBoard(board); // 업로드된 파일의 정보를 확인하는 목적이기 때문에 게시글이 저장되지 않도록 주석 처리합니다. 
		List<BoardFileDto> list = fileUtils.parseFileInfo(board.getBoardIdx(), multipartHttpServletRequest);
		if(CollectionUtils.isEmpty(list) == false) {
			boardMapper.insertBoardFileList(list);
		}
	}

	@Override
	public BoardDto selectBoardDetail(int boardIdx) throws Exception {
		BoardDto board = boardMapper.selectBoardDetail(boardIdx); // 게시글의 내용을 조회합니다. 
		// 게시글 번호로 게시글의 첨부파일 목록을 조회하고 게시글의 정보를 담고있는 BoardDto 클래스에 조회된 첨부파일 목록을 저장합니다.
		List<BoardFileDto> fileList = boardMapper.selectBoardFileList(boardIdx);  
		board.setFileList(fileList);
		
		boardMapper.updateHitCount(boardIdx); // 게시글의 조회수를 증가시킵니다. 
		return board;
	}

	@Override
	public void updateBoard(BoardDto board) throws Exception {
		boardMapper.updateBoard(board);
	}

	@Override
	public void deleteBoard(int boardIdx) throws Exception {
		boardMapper.deleteBoard(boardIdx);
	}
	
}
