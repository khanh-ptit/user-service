import { SuccessResponse } from '@app/utils/success.response.dto';

export class FileStaticResponse extends SuccessResponse {
  data: any;
}

export class FileStaticBufferResponse extends SuccessResponse {
  file: Buffer;
}
