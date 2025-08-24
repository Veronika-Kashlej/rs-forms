import convertToBase64 from '@/store/utils/convertToBase64';
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';
interface MockFileReader {
  readAsDataURL: Mock;
  onload: ((this: FileReader, ev: ProgressEvent<FileReader>) => void) | null;
  onerror: ((this: FileReader, ev: ProgressEvent<FileReader>) => void) | null;
  result: string | ArrayBuffer | null;
}
describe('convertToBase64', () => {
  let mockFileReader: MockFileReader;
  beforeEach(() => {
    mockFileReader = {
      readAsDataURL: vi.fn(),
      onload: null,
      onerror: null,
      result: null,
    };
    global.FileReader = vi.fn(
      () => mockFileReader as unknown as FileReader
    ) as unknown as typeof FileReader;
    vi.clearAllMocks();
  });
  it('should convert file to base64 string successfully', async () => {
    const mockFile = new File(['picture'], 'image.png', { type: 'image/png' });

    const promise = convertToBase64(mockFile);

    mockFileReader.result = 'data:image/png;base64,cGljdHVyZQ==';
    if (mockFileReader.onload) {
      mockFileReader.onload.call(
        mockFileReader as unknown as FileReader,
        {} as ProgressEvent<FileReader>
      );
    }

    await expect(promise).resolves.toBe('data:image/png;base64,cGljdHVyZQ==');
    expect(mockFileReader.readAsDataURL).toHaveBeenCalledWith(mockFile);
  });
  it('should reject with error when file reading fails', async () => {
    const mockFile = new File(['picture'], 'image.png', { type: 'image/png' });
    const mockError = new Error('File read error');

    const promise = convertToBase64(mockFile);

    if (mockFileReader.onerror) {
      mockFileReader.onerror.call(
        mockFileReader as unknown as FileReader,
        mockError as unknown as ProgressEvent<FileReader>
      );
    }

    await expect(promise).rejects.toBe(mockError);
    expect(mockFileReader.readAsDataURL).toHaveBeenCalledWith(mockFile);
  });
});
