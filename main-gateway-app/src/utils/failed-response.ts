import {
  AppErrorException,
  AppErrorForbiddenException,
  AppErrorNotFoundException,
  AppErrorUnauthorizedException,
} from 'src/exceptions/app-exception';

export async function failedResponse(error: any, error_code: number) {
  switch (error_code) {
    case 400:
      throw new AppErrorException(error.message);

    case 401:
      throw new AppErrorUnauthorizedException(error.message);

    case 403:
      throw new AppErrorForbiddenException(error.message);

    case 404:
      throw new AppErrorNotFoundException(error.message);

    default:
      throw new AppErrorException(error.message);
  }
}
