/**
 * 媒体存储门面工厂。
 *
 * @author xiye
 * @date 2026-06-22
 * @since ISC-38
 */

import { ApiError } from "@/lib/api/errors";
import { getPlatformBackendConfig } from "@/lib/backend/config";
import { createLocalMediaRepository } from "./local";
import type { MediaRepository } from "./types";

export function getMediaRepository(): MediaRepository {
  const config = getPlatformBackendConfig();

  if (config.storageMode === "local") {
    return createLocalMediaRepository(config);
  }

  throw new ApiError({
    status: 501,
    code: "MEDIA.STORAGE_NOT_IMPLEMENTED",
    message: `Storage mode "${config.storageMode}" is not implemented yet`,
  });
}

export type { MediaRepository, OpenMediaResult, UploadMediaInput, UploadMediaResult } from "./types";
export { normalizeMediaKey } from "./local";

