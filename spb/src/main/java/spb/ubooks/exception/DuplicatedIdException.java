package spb.ubooks.exception;

public class DuplicatedIdException extends Exception{
	/**
	 * 사용자 정의 에러 - 아이디 중복 에러
	 */
	private static final long serialVersionUID = 1L;
	public DuplicatedIdException() {};
	public DuplicatedIdException(String message) {
		super(message);
	}
}
