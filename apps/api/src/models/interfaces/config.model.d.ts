import { Config } from '@repo/types/config';
import { Document } from 'mongoose';
export interface IConfig extends Config, Document {}
