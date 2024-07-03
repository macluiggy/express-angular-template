// src/types/custom.d.ts
import 'express';

declare module 'express' {
  export interface Response {
    success?: (data: any) => void;
    error?: (error: any) => void;
  }
}
