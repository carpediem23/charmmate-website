import EHttpCodes from '@/enums/http-codes.enum';
import Error from 'next/error';

export type TServiceResponse = {
  status?: EHttpCodes;
  message?: string;
  error?: Error;
};
