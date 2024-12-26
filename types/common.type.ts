import EHttpCodes from '@/enums/common.enum';
import Error from 'next/error';

export type TServiceResponse = {
  status?: EHttpCodes;
  message?: string;
  error?: Error;
};
