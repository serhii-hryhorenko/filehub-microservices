package ua.edu.ukma.service.content.dto;

import ua.edu.ukma.common.model.user.UserId;
import ua.edu.ukma.persistent.directory.DirectoryId;

public record GetContentRequest(UserId ownerId, DirectoryId directoryId, String searchParameter) {
}
