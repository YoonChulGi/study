package board2.board.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import board2.board.dto.BoardDto;
import board2.board.service.BoardService;

// @RestController 어노테이션은 @Controller 어노테이션과 @ResponseBody 어노테이션을 합친 기능을 합니다.
// @RestController 어노테이션을 사용하면 해당 API의 응답 결과를 웹 응답 바디를 이용해서 보내줍니다. 
// 일반적으로는 서버와 클라이언트의 통신에 JSON 형식을 사용합니다. 
// @RestController 어노테이션을 이용하면 결괏값을 JSON형식으로 만들어줍니다. 
@RestController  
public class RestBoardApiController {

	@Autowired
	private BoardService boardService;
	
	@RequestMapping(value="/api/board", method=RequestMethod.GET)
	public List<BoardDto> openBoardList() throws Exception {
		// 게시글의 목록을 조회하고 그 결과를 반환합니다. 
		// 기존에는 ModelAndView클래스에 게시글 목록 조회 결과를 담아 뷰에 보냈던 것과 달리 
		// 조회 결과를 바로 API의 응답 결과로 사용합니다.
		// 게시글 목록 조회는 List<BoardDto> 형식이고 이를 바로 JSON 형태로 반환합니다. 
		return boardService.selectBoardList();
	}
	
	@RequestMapping(value="/api/board/write", method=RequestMethod.POST)
	public void insertBoard(@RequestBody BoardDto board) throws Exception {
		// GET과 POST의 주요한 차이점 중 하나는 GET은 요청 주소에 파라미터를 같이 보내는 것이고
		// POST는 GET과 달리 파라미터를 HTTP 패킷의 바디에 담아서 전송합니다. 
		// @RequestBody 어노테이션은 메서드의 파라미터가 반드시 HTTP 패킷의 바디에 담겨 있어야합니다. 
		// POST나 PUT을 사용하는 메서드에는 @RequestBody 어노테이션을 사용해야 합니다. 
		// GET메서드는 @RequestParam 어노테이션을 사용합니다. 
		boardService.insertBoard(board, null); // REST API의 기본 사양을 알아보는 중이므로 첨부파일은 받지 않습니다.  
	}
	
	@RequestMapping(value="/api/board/{boardIdx}", method=RequestMethod.GET)
	public BoardDto openBoardDetail(@PathVariable("boardIdx")int boardIdx) throws Exception {
		return boardService.selectBoardDetail(boardIdx);
	}
	
	@RequestMapping(value="/api/board/{boardIdx}", method=RequestMethod.PUT)
	public String updateBoard(@RequestBody BoardDto board) throws Exception {
		boardService.updateBoard(board);
		return "redirect:/board";
	}
	
	@RequestMapping(value="/api/board/{boardIdx}", method=RequestMethod.DELETE)
	public String deleteBoard(@PathVariable("boardIdx")int boardIdx) throws Exception {
		boardService.deleteBoard(boardIdx);
		return "redirect:/board";
	}
}
