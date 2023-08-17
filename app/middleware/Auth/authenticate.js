const { Helper, constants, ApiError } = require("../../utils");
const { UserService } = require("../../services");
const { errorResponse } = Helper;
const { INVALID_CREDENTIALS, AUTH_REQUIRED } = constants;
/**
 * A collection of middleware used to verify a user before accessing protected resources
 */
class AuthenticateMiddleware {
  /**
   * compare password from request with the one in the DB
   * @static
   * @param { Object } req - The request from the endpoint
   * @param { Object } res - The response returned by the method
   * @param { Object } next - calls the next handler
   * @memberof AuthMiddleware
   * @returns {JSON || Null} - Returns error reponse if verification fails or Null if otherwise
   */
  static comparePassword(req, res, next) {
    const { body, user } = req;
    const isAuthenticateUser = Helper.comparePassword(
      body.password,
      user.password,
    );

    if (!isAuthenticateUser) {
      errorResponse(
        req,
        res,
        new ApiError({
          status: 401,
          message: INVALID_CREDENTIALS,
        }),
      );
    } else {
      next();
    }
  }

  /**
   * checks header for token
   * @static
   * @private
   * @memberof AuthenticationMiddleware
   * @returns { string || Null } - Returns token if present or Null otherwise
   */
  static checkAuthorization(authorization) {
    let bearerToken;
    authorization
      ? (bearerToken = authorization.split(" ")[1])
      : (bearerToken = authorization);

    return bearerToken;
  }

  /**
   * check the presence of a user's token
   * @static
   * @private
   * @memberof AuthenticateMiddleware
   * @returns { string || Null } - Returns token if present or Null otherwise
   */
  static checkToken(req) {
    const { authorization } = req.headers;

    const bearerToken =
      AuthenticateMiddleware.checkAuthorization(authorization);
    return (
      bearerToken ||
      req.headers["x-access-token"] ||
      req.headers.token ||
      req.body.token
    );
  }

  /**
   * Verify's an active token with the DB if user exists
   * @static
   * @param { Object } user - the user object
   * @memberof AuthenticateMiddleware
   * @returns { Object || Null } - Returns user if present or Null otherwise
   */
  static async verifyUser(user) {
    return await UserService.findUserByEmail(user.email);
  }

  /**
   * Verify's a user's token or presence or it
   * @static
   * @param { Object } req - the request object
   * @param { Object } res - the response returned by the method
   * @param  { Next } next - calls the next handle
   * @memberof AuthenticateMiddleware
   * @returns { JSON || Null } - Returns error response if verification fails or Null if otherwise
   */
  static async authenticate(req, res, next) {
    const bearerToken = AuthenticateMiddleware.checkToken(req);

    if (!bearerToken) {
      errorResponse(req, res, {
        status: 403,
        message: AUTH_REQUIRED,
      });
    }

    if (bearerToken) {
      try {
        const decodedToken = Helper.verifyToken(bearerToken);

        req.user = decodedToken.payload;

        const authUser = await AuthenticateMiddleware.verifyUser(req.user);

        const data = Helper.checkEmptyArray(authUser);

        data
          ? next()
          : errorResponse(req, res, {
              status: 403,
              message: INVALID_CREDENTIALS,
            });
      } catch (e) {
        Helper.moduleErrLogMessager(e);
        errorResponse(req, res, {
          status: 403,
          message: INVALID_CREDENTIALS,
        });
      }
    }
  }
}

module.exports = AuthenticateMiddleware;
