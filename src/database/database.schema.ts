import {
  PrAllocation,
  PrAllocationSchema,
} from '@app/components/pr-allocation/entities/pr-allocation.entity';
import {
  PurchasePlanDetail,
  PurchasePlanDetailSchema,
} from '@app/components/purchase-plan/entities/purchase-plan-detail.entity';
import {
  PurchasePlanItem,
  PurchasePlanItemSchema,
} from '@app/components/purchase-plan/entities/purchase-plan-item.entity';
import {
  PurchasePlan,
  PurchasePlanSchema,
} from '@app/components/purchase-plan/entities/purchase-plan.entity';
import {
  PurchasePlanAttachment,
  PurchasePlanAttachmentSchema,
} from '@app/components/purchase-plan/entities/purchased-plan-attachment.entity';
import {
  PurchasedRequestAttachment,
  PurchasedRequestAttachmentSchema,
} from '@app/components/purchased-request/entities/purchased-request-attachment.entity';
import {
  PurchasedRequestItem,
  PurchasedRequestItemSchema,
} from '@app/components/purchased-request/entities/purchased-request-item.entity';
import {
  PurchasedRequestMaterial,
  PurchasedRequestMaterialSchema,
} from '@app/components/purchased-request/entities/purchased-request-material.schema';
import {
  PurchasedRequest,
  PurchasedRequestSchema,
} from '@app/components/purchased-request/entities/purchased-request.entity';
import {
  RfqPreview,
  RfqPreviewSchema,
} from '@app/components/rfq-preview/entities/rfq-preview.entity';
import {
  File,
  FileSchema,
} from '@app/core/components/file/entities/file.entity';

export const databaseSchema = [
  { name: File.name, schema: FileSchema },
  { name: PurchasedRequest.name, schema: PurchasedRequestSchema },
  { name: PurchasedRequestItem.name, schema: PurchasedRequestItemSchema },
  {
    name: PurchasedRequestMaterial.name,
    schema: PurchasedRequestMaterialSchema,
  },
  {
    name: PurchasedRequestAttachment.name,
    schema: PurchasedRequestAttachmentSchema,
  },
  {
    name: PurchasePlan.name,
    schema: PurchasePlanSchema,
  },
  {
    name: PurchasePlanItem.name,
    schema: PurchasePlanItemSchema,
  },
  {
    name: PurchasePlanDetail.name,
    schema: PurchasePlanDetailSchema,
  },
  {
    name: PurchasePlanAttachment.name,
    schema: PurchasePlanAttachmentSchema,
  },
  {
    name: RfqPreview.name,
    schema: RfqPreviewSchema,
  },
  {
    name: PrAllocation.name,
    schema: PrAllocationSchema,
  },
];
