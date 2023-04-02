class ErrorClass extends Error {
  errorCode: any;
  errorMsg: any;
  [key: string]: any;
  constructor(errorCode: any, errorMsg: any) {
    super(errorMsg);
    this.errorCode = errorCode;
    this.errorMsg = errorMsg;
  }

  static __ErrorMap(error: any) {
    // @ts-ignore
    return {
      /*@ts-ignore */
      [ErrorClass.InvalidParameters]: 2000,
      /*@ts-ignore */
      [ErrorClass.VerifyFailure]: 2001,
      /*@ts-ignore */
      [ErrorClass.InvalidFormatData]: 2002,
    }[error];
  }

  /**
   * @function isTypeOf
   * @param {*} error
   * @param {*} ErrorType
   */
  static isTypeOf(error: any, ErrorType: any) {
    if (!error) return false;
    return error.errorCode === ErrorClass.__ErrorMap(ErrorType);
  }

  /**
   * 非法参数
   */
  static InvalidParameters(errorMsg: any) {
    return new ErrorClass(2000, errorMsg || 'invalid parameters');
  }

  /**
   * 验证失败
   */
  static VerifyFailure(errorMsg: any) {
    return new ErrorClass(2001, errorMsg || 'verify failure');
  }

  /**
   * 数据格式不正确
   */
  static InvalidFormatData(errorMsg: any) {
    return new ErrorClass(2002, errorMsg || 'invalid format data');
  }
}

export default ErrorClass;
