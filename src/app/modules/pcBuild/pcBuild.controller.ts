import { Request, RequestHandler, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { PcBuildService } from './pcBuild.service';
import { PcBuild } from './pcBuild.model';
import { IPCBuild } from './pcBuild.interface';
import pick from '../../../shared/pick';
import { pcBuildFilterableFields } from '../product/product.constant';

// create Order
const createPcBuild: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...pcBuildData } = req.body;
    console.log('order pro', pcBuildData);

    const result = await PcBuildService.createPcBuild(pcBuildData);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Order created successfully',
      data: result,
    });
  },
);

// get getPcBuild
 // get getPcBuild
 const getPcBuild = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, pcBuildFilterableFields);

  const { ...filtersData } = filters;
  const andCondition = [];

  if (Object.keys(filtersData).length) {
    andCondition.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};

  const result = await PcBuild.find(whereCondition).populate('product');

  sendResponse<IPCBuild[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'PcBuild retrieved successfully',
    data: result,
  });
});

export const PcBuildController = {
  createPcBuild,
  getPcBuild,
};
