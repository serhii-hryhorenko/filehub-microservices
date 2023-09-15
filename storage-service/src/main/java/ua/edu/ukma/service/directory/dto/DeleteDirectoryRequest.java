package ua.edu.ukma.service.directory.dto;

import ua.edu.ukma.common.model.user.UserId;
import ua.edu.ukma.persistent.directory.DirectoryId;

public record DeleteDirectoryRequest(UserId ownerId, DirectoryId toDelete) {
}
