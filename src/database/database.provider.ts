// import { PurchasedRequestRepository } from '@app/components/purchased-request/repositories/purchased-request.repository';
import { DatabaseService } from './database.service';
// import { PurchasedRequestItemRepository } from '@app/components/purchased-request/repositories/purchased-request-item.repository';
// import { PurchasedRequestMaterialRepository } from '@app/components/purchased-request/repositories/purchased-request-material.repository';
import { FileRepository } from '@app/core/components/file/repositories/file.repository';
// import { PurchasedRequestAttachmentRepository } from '@app/components/purchased-request/repositories/purchased-request-attachment.repository';
import { PurchasePlanRepository } from '@app/components/purchase-plan/repositories/purchased-plan.repository';
import { PurchasePlanItemRepository } from '@app/components/purchase-plan/repositories/purchased-plan-item.repository';
import { PurchasePlanDetailRepository } from '@app/components/purchase-plan/repositories/purchased-plan-detail.repository';
import { PurchasePlanAttachmentRepository } from '@app/components/purchase-plan/repositories/purchased-plan-attachment.repository';
import { RfqPreviewRepository } from '@app/components/rfq-preview/repositories/rfq-preview.repositoty';
import { PrAllocationRepository } from '@app/components/pr-allocation/repository/pr-allocation.repository';

export const databaseProviders = [
  DatabaseService,
  FileRepository,
  PurchasedRequestRepository,
  PurchasedRequestItemRepository,
  PurchasedRequestMaterialRepository,
  PurchasedRequestAttachmentRepository,
  PurchasePlanRepository,
  PurchasePlanItemRepository,
  PurchasePlanDetailRepository,
  PurchasePlanAttachmentRepository,
  RfqPreviewRepository,
  PrAllocationRepository,
];
