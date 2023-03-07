export interface ZipFile {
    async(arg0: string): unknown;
    comment: string | null;
    date: Date;
    dir: boolean;
    dosPermissions: number | null;
    name: string;
    options: {
      compression: string | null;
      compressionOptions: any;
    };
    unixPermissions: number;
    unsafeOriginalName: string;
    _data: {
      compressedSize: number;
      uncompressedSize: number;
      crc32: number;
      compression: {
        magic: string;
        copySource: any;
      };
      compressedContent: Uint8Array;
    };
    _dataBinary: boolean;
  }
  