declare class Config {
  init(conf: Object): void;

  get(parameter: string | string[], def?: any): string;

  getT(parameter: any, type: string, def?: any): any;

  getInt(parameter: string | any[], def?: any): number;
}

declare class Utils {
  get(obj: object, path: string | string[], def?: any): any;

  set(obj: object, path: string | string[], value: any): object;

  empty(val: any, def?: any): boolean | any;

  isset(val: any, def?: any): boolean | any;

  clear(obj: any): void;

  tickCount(): number;

  uniqueId(prefix?: string): string;

  random(min: number, max: number): number;

  validEmail(email: string): boolean;

  validUrl(url: string): boolean;

  validFilename(fname: string, trim?: boolean): boolean;

  trimLeft(str: string, chr?: string): string;

  trimRight(str: string, chr?: string): string;

  trim(str: string, chr?: string): string;

  appendSubString(str: string, pattern: string, separator?: string, caseSens?: boolean): string;

  removeSubString(str: string, pattern: string, separator?: string, caseSens?: boolean): string;

  strRepeat(str: string, num: number, length: number): string;

  strPad(input: string, padLength: number, padString: string, padType?: 'STR_PAD_LEFT' | 'STR_PAD_RIGHT' | 'STR_PAD_BOTH'): string;

  endsWith(str: string, suffix: string): boolean;

  mixedTo(val: any, type: string, opts?: object): any;

  mobileBrowser(): boolean;

  arrMove(arr: any[], from: number, to: number): any[];

  arrInsert(arr: any[], what: any, where: number): any[];

  arrRemove(arr: any[], idx: number): any[];

  dateFormat(dt: Date, format?: string): string;
}

interface Request {
  signedCookie: object;
  cookies: object;
}

interface Response {
  cookies: object;
}

declare class Cookies {
  get(req: Request, name: string, def?: any): string;

  set(res: Response, name: string, val: string, opts?: any): void;

  clear(res: Response, name: string, opts?: any): void;
}

declare class ReqVars {
  get(req: Request, name: string, opts?: any): any;
}

export var config: Config;
export var utils: Utils;
export var cookies: Cookies;
export var vars: ReqVars;

export function aws(modules?: string | string[]): any;
