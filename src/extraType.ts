export interface UploadResp {
  code: number;
  message: string;
  data: {
    urls: string[];
  };
}
