import message from '../constants/message'
import { ResponseCode } from '../constants/status'
import logger from '../logger'

interface IResponseBody<T = unknown> {
  code: number
  data?: T
  msg?: string
}

export default class Response {
  public static UnknownError(error: Error, msg?: string): IResponseBody {
    logger.error(error)
    return {
      code: ResponseCode.Internal_Server_Error,
      msg: msg || message['UNKNOWN_ERR']
    }
  }

  public static Success<T = unknown>({
    data,
    msg
  }: { data?: T; msg?: string } = {}): IResponseBody<T> {
    return {
      code: ResponseCode.OK,
      msg: msg || message['SUCCESS'],
      data: data
    }
  }

  public static InValidId(msg?: string): IResponseBody {
    return {
      code: ResponseCode.Bad_Request,
      msg: msg || message['INVALID_ID']
    }
  }

  public static InValidChapter(msg?: string): IResponseBody {
    return {
      code: ResponseCode.Bad_Request,
      msg: msg || message['INVALID_CHAPTER']
    }
  }

  public static NoComic(msg?: string): IResponseBody {
    return {
      code: ResponseCode.Bad_Request,
      msg: msg || message['NO_COMIC']
    }
  }

  public static NoUser(msg?: string): IResponseBody {
    return {
      code: ResponseCode.Unauthorized,
      msg: msg || message['NO_USER']
    }
  }

  public static NoToken(msg?: string): IResponseBody {
    return {
      code: ResponseCode.Unauthorized,
      msg: msg || message['NO_TOKEN']
    }
  }

  public static InvalidCredentials(msg?: string): IResponseBody {
    return {
      code: ResponseCode.Unauthorized,
      msg: msg || message['INVALID_CREDENTIALS']
    }
  }

  public static InvalidToken(msg?: string): IResponseBody {
    return {
      code: ResponseCode.Unauthorized,
      msg: msg || message['INVALID_TOKEN']
    }
  }

  public static UserAlreadyExists(msg?: string): IResponseBody {
    return {
      code: ResponseCode.Conflict,
      msg: msg || message['USER_ALREADY_EXISTS']
    }
  }
}
