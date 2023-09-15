package ua.edu.ukma.service.content.dto;

import ua.edu.ukma.common.dto.FileDto;
import ua.edu.ukma.service.directory.dto.DirectoryDto;

import java.util.List;

public record ContentDto(List<DirectoryDto> directories, List<FileDto> files) {
}
