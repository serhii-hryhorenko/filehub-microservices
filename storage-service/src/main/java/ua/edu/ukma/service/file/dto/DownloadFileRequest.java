package ua.edu.ukma.service.file.dto;

import ua.edu.ukma.common.model.user.UserId;
import ua.edu.ukma.persistent.file.FileId;

public record DownloadFileRequest(FileId fileId, UserId ownerId) {
}
