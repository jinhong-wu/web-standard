import { HttpParams } from "@angular/common/http";

export interface Options {
  type?: OptionsType;
  params?: HttpParams;
}

export enum Type {
	EXCEL = "excel",
	FILE = "file",
}
export declare type OptionsType = Type.EXCEL | Type.FILE;