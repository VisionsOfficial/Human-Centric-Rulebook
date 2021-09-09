import { Model } from '@rawmodel/core';
import messages from '../config/messages';

/**
 * Handled system error.
 */
export class SystemError extends Error {
  public code: number;
  public details: any;
  public readonly status: number;

  /**
   * Class constructor.
   * @param code Error identification code.
   * @param details Debug information for administrator.
   */
  public constructor(code: number, details?: any) {
    super(messages[code]);

    this.name = this.constructor.name;
    this.code = code;
    this.details = details;
    this.status = 500;

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Handled invalid resources or resource not found error.
 */
export class ResourceError extends Error {
  public code: number;
  public details: any;
  public readonly status: number;

  /**
   * Class constructor.
   * @param code Error identification code.
   * @param details Debug information for administrator.
   */
  public constructor(code: number, details?: any) {
    super(messages[code]);

    this.name = this.constructor.name;
    this.code = code;
    this.details = details;
    this.status = 400;

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Not authenticated access error.
 */
export class UnauthenticatedError extends Error {
  public code: number;
  public details: any;
  public readonly status: number;

  /**
   * Class constructor.
   * @param code Error identification code.
   * @param details Debug information for administrator.
   */
  public constructor(code: number, details?: any) {
    super(messages[code]);

    this.name = this.constructor.name;
    this.code = code;
    this.details = details;
    this.status = 401;

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Not authorized access error.
 */
export class UnauthorizedError extends Error {
  public code: number;
  public details: any;
  public readonly status: number;

  /**
   * Class constructor.
   * @param code Error identification code.
   * @param details Debug information for administrator.
   */
  public constructor(code: number, details?: any) {
    super(messages[code]);

    this.name = this.constructor.name;
    this.code = code;
    this.details = details;
    this.status = 403;

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Model validation error.
 */
export class ValidationError extends Error {
  public model: Model;
  public readonly status: number;

  /**
   * Class constructor.
   * @param model Model instance.
   */
  public constructor(model: Model) {
    super();

    this.name = this.constructor.name;
    this.model = model;
    this.status = 422;

    Error.captureStackTrace(this, this.constructor);
  }
}
