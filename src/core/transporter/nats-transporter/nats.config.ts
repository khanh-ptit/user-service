import { NatsOptions, Transport } from '@nestjs/microservices';
import 'dotenv/config';

export const NatsService = {
  AUTH: process.env.NATS_AUTH_SERVICE || 'auth_service',
  USER: process.env.NATS_USER_SERVICE || 'user_service',
  WEBHOOK: process.env.NATS_WEBHOOK_SERVICE || 'webhook_service',
  WAREHOUSE: process.env.NATS_WAREHOUSE || 'warehouse_service',
  WAREHOUSE_LAYOUT: process.env.NATS_WAREHOUSE || 'warehouse_layout_service',
  COST_CENTER: process.env.NATS_COST_CENTER || 'cost_center_service',
  REPORT: process.env.NATS_REPORT_SERVICE || 'report_service',
  TICKET: process.env.NATS_TICKET_SERVICE || 'ticket_service',
  ITEM: process.env.NATS_ITEM_SERVICE || 'item_service',
  ITEM_STOCK: process.env.NATS_ITEM_STOCK_SERVICE || 'item_stock_service',
  ATTRIBUTE: process.env.NATS_ATTRIBUTE_SERVICE || 'attribute_service',
  PRODUCE: process.env.NATS_PRODUCE_SERVICE || 'produce_service',
  PURCHASED_REQUEST:
    process.env.NATS_PURCHASED_REQUEST_SERVICE || 'purchased_request_service',
  DATASYNC: process.env.NATS_DATASYNC_SERVICE || 'datasync_service',
  VENDOR: process.env.NATS_VENDOR_SERVICE || 'vendor_service',
  MASTER_DATA: process.env.NATS_MASTER_DATA_SERVICE || 'master_data_service',
  QUOTATION: process.env.NATS_QUOTATION_SERVICE || 'quotation_service',
  APPROVEMENT: process.env.NATS_APPROVEMENT_SERVICE || 'approvement_service',
};

export const NatsConfig: NatsOptions = {
  transport: Transport.NATS,
  options: {
    servers: process.env.NATS_SERVERS?.split(',') || ['nats://nats:4222'],
    headers: { 'x-version': '1.0.0' },
    queue: NatsService.PURCHASED_REQUEST,
  },
};
