package spb.ubooks.dto;

import java.util.List;

import lombok.Data;
import spb.ubooks.entity.CombookEntity;
import spb.ubooks.entity.FileEntity;

@Data
public class ComBookIndexDto {
	CombookEntity combook;
	List<FileEntity> images;
}
