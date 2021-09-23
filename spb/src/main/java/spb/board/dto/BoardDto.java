package spb.board.dto;

public class BoardDto {

	private int boardIdx;
	private String title;
	private int hitCnt;
	public BoardDto(int boardIdx, String title, int hitCnt) {
		this.boardIdx = boardIdx;
		this.title = title;
		this.hitCnt = hitCnt;
	}
	public int getBoardIdx() {
		return boardIdx;
	}
	public void setBoardIdx(int boardIdx) {
		this.boardIdx = boardIdx;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public int getHitCnt() {
		return hitCnt;
	}
	public void setHitCnt(int hitCnt) {
		this.hitCnt = hitCnt;
	}

	
	
}
