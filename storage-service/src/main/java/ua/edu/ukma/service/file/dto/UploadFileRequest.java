package ua.edu.ukma.service.file.dto;

import ua.edu.ukma.common.model.user.UserId;
import ua.edu.ukma.persistent.directory.DirectoryId;

import java.io.InputStream;

public record UploadFileRequest(UserId ownerId,
                                DirectoryId directory,
                                String name,
                                long size,
                                String mimetype,
                                InputStream content) {
}
