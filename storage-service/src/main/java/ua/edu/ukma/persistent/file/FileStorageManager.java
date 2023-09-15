package ua.edu.ukma.persistent.file;

import jakarta.annotation.Nonnull;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import java.io.File;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;

/**
 * A service class that provides a mapping of a {@link ua.edu.ukma.persistent.file.File} records with a real files stored in the persistent layer.
 * Store files on the computer running the application in the directory specified by the <em>root</em> path.;
 * Always throw {@link IllegalStateException} on IO fail.
 */
@Repository
@RequiredArgsConstructor
public class FileStorageManager {
    private static final Logger logger = LoggerFactory.getLogger(FileStorageManager.class);

    private final Path root;

    /**
     * @param fileId an identifier of a file to download
     * @return file content
     */
    public InputStream get(@Nonnull FileId fileId) {
        try {
            return new FileInputStream(pathToFile(fileId).toString());
        } catch (IOException e) {
            throw new IllegalStateException(e.getMessage());
        }
    }

    /**
     * @param fileId an identifier of a file to save
     * @param content file content
     */
    public void save(@Nonnull FileId fileId, @Nonnull InputStream content) {
        File fileToWrite = pathToFile(fileId).toFile();

        try (OutputStream output = new FileOutputStream(fileToWrite)) {
            content.transferTo(output);
        } catch (IOException io) {
            logger.error("Failed to save {} fileId from {}", fileToWrite, fileId);
            throw new IllegalStateException(io.getMessage());
        }
    }

    /**
     * @param fileId an identifier of a file to delete
     */
    public void delete(@Nonnull FileId fileId) {
        try {
            Files.delete(pathToFile(fileId));
        } catch (IOException e) {
            throw new IllegalStateException(e.getMessage());
        }
    }

    /**
     * Util method to get a file path by its identifier
     */
    private Path pathToFile(@Nonnull FileId file) {
        return root.resolve(String.valueOf(file.getHashedName()));
    }
}
