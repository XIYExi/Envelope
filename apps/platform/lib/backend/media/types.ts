/**
 * 媒体（图片/附件）存储门面的类型定义。
 *
 * 目标：
 * - 让 API Route 只关心“上传/读取媒体”，不直接耦合具体存储实现；
 * - 与 projects / project-resources 的门面模式保持一致，便于后续接入 Supabase Storage / S3。
 *
 * @author xiye
 * @date 2026-06-22
 * @since ISC-38
 */

export type UploadMediaInput = {
  fileName: string;
  contentType?: string;
  bytes: Uint8Array;
};

export type UploadMediaResult = {
  key: string;
  contentType?: string;
  contentLength: number;
};

export type OpenMediaResult = {
  stream: ReadableStream<Uint8Array>;
  contentType: string;
  contentLength: number;
};

export interface MediaRepository {
  upload(input: UploadMediaInput): Promise<UploadMediaResult>;
  open(key: string): Promise<OpenMediaResult>;
}

