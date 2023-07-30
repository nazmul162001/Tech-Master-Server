import { Schema, Types, model } from 'mongoose';
import { IPCBuild, PcBuildModel } from './pcBuild.interface';

const PCBuildSchema: Schema<IPCBuild> = new Schema<IPCBuild>({
  product: { type: Types.ObjectId, ref: 'products', required: true },
  userEmail: { type: String, required: true },
});

export const PcBuild = model<IPCBuild, PcBuildModel>('PcBuild', PCBuildSchema);
