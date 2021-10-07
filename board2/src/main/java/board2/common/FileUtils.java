package board2.common;

import java.io.File;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.springframework.stereotype.Component;
import org.springframework.util.ObjectUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import board2.board.dto.BoardFileDto;
import board2.board.entity.BoardFileEntity;

@Component // @Component 어노테이션을 이용해서 FileUtils클래스를 스프링의 빈으로 등록합니다. 
public class FileUtils {
	// JPA의 @OneToMany 어노테이션으로 연관고나계를 가지고 있기 때문에 첨부파일 클래스(BoardFileENtity)에 게시글 번호를 따로 저장할 필요가 없습니다. 
	public List<BoardFileEntity> parseFileInfo(MultipartHttpServletRequest multipartHttpServletRequest) throws Exception {
		if(ObjectUtils.isEmpty(multipartHttpServletRequest)) {
			return null;
		}
		
		List<BoardFileEntity> fileList = new ArrayList<>();
		DateTimeFormatter format = DateTimeFormatter.ofPattern("yyyyMMdd");
		ZonedDateTime current = ZonedDateTime.now();
		String path = "images/" + current.format(format);
		File file = new File(path);
		if(file.exists() == false) {
			file.mkdirs();
		} // 파일이 업로드될 폴더를 생성합니다. 파일이 업로드 될 때마다 images폴더 밑에 yyyyMMdd 형식으로 폴더를 생성합니다. (해당 경로가 없을경우에만)
		
		Iterator<String> iterator = multipartHttpServletRequest.getFileNames();
		
		String newFileName, originalFileExtension, contentType;
		
		while(iterator.hasNext()) {
			List<MultipartFile> list = multipartHttpServletRequest.getFiles(iterator.next());
			for(MultipartFile multipartFile : list) {
				if(multipartFile.isEmpty() == false) { // 파일이 존재할경우 
					contentType = multipartFile.getContentType(); 
					if(ObjectUtils.isEmpty(contentType)) {
						break;
					} else {
						// 파일의 형식을 확인합니다. 파일의 이름에서 형식을 가져 오는 방식은 사용자가 파일확장자를 쉽게 바꿀 수 있고, 파일의 위변조를 확인할 수 없어서 위험합니다.
						if(contentType.contains("image/jpeg")) {  
							originalFileExtension = ".jpg";
						} else if (contentType.contains("image/png")) {
							originalFileExtension = ".png";
						} else if (contentType.contains("image/gif")) {
							originalFileExtension = ".gif";
						} else {
							break;
						}
					}
					
					// 서버에 저장될 파일 이름을 생성합니다. 파일이 업로드된 나노초를 이용해서 새로운 파일 이름으로 지정했습니다. 밀리초를 이용할 경우 중복될 가능성이 있습니다. 
					newFileName = Long.toString(System.nanoTime()) + originalFileExtension;
					// 데이터베이스에 저장할 파일 정보를 앞에서 만든 BoardFileEntity에 저장합니다. 
					BoardFileEntity boardFile = new BoardFileEntity(); // BoardFileEntity 클래스로 변경합니다. 
					boardFile.setFileSize(multipartFile.getSize());
					boardFile.setOriginalFileName(multipartFile.getOriginalFilename());
					boardFile.setStoredFilePath(path + "/" + newFileName);
					boardFile.setCreatorId("admin");
					fileList.add(boardFile);
					
					file = new File(path + "/" + newFileName);
					multipartFile.transferTo(file); // 업로드된 파일을 새로운 이름으로 바꾸어 지정된 경로에 저장합니다. 
				}
			}
		}
		return fileList;
	}
}
