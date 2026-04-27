import { ResponseCodeEnum } from '@app/constant/response-code.enum';
import { NatsClientService } from '@app/core/transporter/nats-transporter/nats-client.service';
import { NatsService } from '@app/core/transporter/nats-transporter/nats.config';
import { Injectable } from '@nestjs/common';
import { isEmpty } from 'lodash';
import { GetInternalItemRequest } from './dto/request/get-internal.item.request';
import { BasicItemDto } from './dto/response/basic-item.repsonse.dto';
import { ItemUnitDto } from './dto/response/item-unit.response.dto';
import { CurrencyUnitDto } from './dto/response/currency-unit.response.dto';
import { ItemGroupDto } from './dto/response/item-group.response.dto';
import {
  CheckDuplicateItemSupplierRequestDto,
  GetInternalItemSupplierRequest,
} from './dto/request/get-item-supplier-by-condition.request';
import { ItemSupplierDto } from './dto/response/item-supplier.response.dto';
import { GetPurchasedExchangeRatesRequestDto } from './dto/request/get-purchased-exchange-rates.request.dto';
import { PurchasedExchangeRateDto } from './dto/response/purchased-exchange-rate.response.dto';
import { CalculateUnitRequestDto } from './dto/request/calculate.item.request';
import { ListItemSupplierRequestDto } from './dto/request/list.item-supplier.request.dto';
import { GetItemUnitReqDto } from './dto/request/get-item-unit.request.dto';
import { ItemUnitAttrResDto } from './dto/response/item-unit-attribute.response.dto';
import { GetLatestPriceRequest } from './dto/request/get-latest-price.request';

@Injectable()
export class ItemService {
  constructor(private readonly natsService: NatsClientService) {}

  async getItemByIds(
    ids: number[],
    selectFields: string[] = [],
  ): Promise<BasicItemDto[]> {
    if (isEmpty(ids)) return [];
    const res = await this.natsService.send(
      `${NatsService.ITEM}.get_item_by_conditions`,
      {
        ids: ids,
        selectFields,
      },
    );

    if (res?.statusCode !== ResponseCodeEnum.SUCCESS) return [];
    return res?.data;
  }

  async getItemByConditions(
    conditions: GetInternalItemRequest,
  ): Promise<any[]> {
    const res = await this.natsService.send(
      `${NatsService.ITEM}.get_item_by_conditions`,
      conditions,
    );

    if (res?.statusCode !== ResponseCodeEnum.SUCCESS) return [];
    return res?.data;
  }

  async getItemUnitByIds(ids: number[]): Promise<ItemUnitDto[]> {
    if (isEmpty(ids)) return [];
    const res = await this.natsService.send(
      `${NatsService.ITEM}.get_item_unit_setting_by_ids`,
      { unitIds: ids },
    );

    if (res?.statusCode !== ResponseCodeEnum.SUCCESS) return [];
    return res?.data;
  }

  async getItemSupplierRelationByCondition(
    payload: ListItemSupplierRequestDto,
  ): Promise<any> {
    const res = await this.natsService.send(
      `${NatsService.ITEM}.get_item_supplier_relations`,
      payload,
    );

    if (res?.statusCode !== ResponseCodeEnum.SUCCESS) return [];
    return res?.data?.items;
  }

  async getCurrencyByIds(ids: number[]): Promise<CurrencyUnitDto[]> {
    if (isEmpty(ids)) return [];
    const res = await this.natsService.send(
      `${NatsService.ITEM}.get_currency_units_by_ids`,
      { ids: ids },
    );

    if (res?.statusCode !== ResponseCodeEnum.SUCCESS) return [];
    return res?.data;
  }

  async getCurrencyUnitByCodes(codes: string[]): Promise<CurrencyUnitDto[]> {
    if (isEmpty(codes)) return [];

    const response = await this.natsService.send(
      `${NatsService.ITEM}.get_currency_units_by_codes`,
      { codes },
    );

    if (response.statusCode !== ResponseCodeEnum.SUCCESS) {
      return [];
    }

    return response?.data || [];
  }

  async getItemGroupByIds(ids: number[]): Promise<ItemGroupDto[]> {
    if (isEmpty(ids)) return [];

    const res = await this.natsService.send(
      `${NatsService.ITEM}.get_item_group_by_ids`,
      { ids: ids },
    );

    if (res?.statusCode !== ResponseCodeEnum.SUCCESS) return [];
    return res?.data?.items;
  }

  async getItemSupplierByIds(ids: number[]): Promise<ItemSupplierDto[]> {
    if (isEmpty(ids)) return [];

    const res = await this.natsService.send(
      `${NatsService.ITEM}.get_item_detail_by_conditions`,
      { ids },
    );

    if (res?.statusCode !== ResponseCodeEnum.SUCCESS) return [];
    return res?.data;
  }

  async getItemSupplierByCondition(
    req: GetInternalItemSupplierRequest,
  ): Promise<ItemSupplierDto[]> {
    if (isEmpty(req)) return [];
    const res = await this.natsService.send(
      `${NatsService.ITEM}.get_item_detail_by_conditions`,
      req,
    );

    if (res?.statusCode !== ResponseCodeEnum.SUCCESS) return [];
    return res?.data;
  }

  async getItemSupplierByConditionGroup(
    req: CheckDuplicateItemSupplierRequestDto,
  ): Promise<ItemSupplierDto[]> {
    if (isEmpty(req)) return [];
    const res = await this.natsService.send(
      `${NatsService.ITEM}.check_duplicate_item_supplier_by_composite_keys`,
      req,
    );

    if (res?.statusCode !== ResponseCodeEnum.SUCCESS) return [];
    return res?.data;
  }

  async findChildrenWithParent(ids: number[]): Promise<any[]> {
    if (isEmpty(ids)) return [];
    const res = await this.natsService.send(
      `${NatsService.ITEM}.find_children_with_parent_by_child_ids`,
      { ids: ids },
    );

    if (res?.statusCode !== ResponseCodeEnum.SUCCESS) return [];
    return res?.data;
  }

  async getPurchasedExchangeRates(
    req: GetPurchasedExchangeRatesRequestDto,
  ): Promise<PurchasedExchangeRateDto[]> {
    if (isEmpty(req.conditions)) return [];
    const res = await this.natsService.send(
      `${NatsService.ITEM}.get_purchased_exchange_rates`,
      req,
    );

    if (res?.statusCode !== ResponseCodeEnum.SUCCESS) return [];
    return res?.data;
  }

  async calculateItemUnit(payload: CalculateUnitRequestDto): Promise<any[]> {
    if (isEmpty(payload.items)) return [];

    const res = await this.natsService.send(
      `${NatsService.ITEM}.calculate_unit_item`,
      payload,
    );

    if (res?.statusCode !== ResponseCodeEnum.SUCCESS) return [];
    return res?.data?.items || [];
  }

  async getItemUnitsByConditions(
    payload: GetItemUnitReqDto,
  ): Promise<ItemUnitAttrResDto[]> {
    if (isEmpty(payload.conditions)) return [];

    const res = await this.natsService.send(
      `${NatsService.ITEM}.get_item_units`,
      payload,
    );

    if (res?.statusCode !== ResponseCodeEnum.SUCCESS) return [];
    return res?.data || [];
  }

  async getItemSupplierRelationByIds(request: {
    ids: number[];
    toCurrencyId?: number;
    supplierId: string;
  }): Promise<any[]> {
    const { ids, toCurrencyId, supplierId } = request;
    if (isEmpty(ids)) return [];
    const req: any = {
      filter: [
        { column: 'itemStatus', text: '1' },
        { column: 'id', text: ids.join(','), operator: 'IN' },
      ],
      limit: ids.length,
    };

    if (toCurrencyId) {
      req.toCurrencyId = toCurrencyId?.toString();
    }

    if (supplierId) {
      req.supplierId = supplierId;
    }

    const res = await this.natsService.send(
      `${NatsService.ITEM}.get_item_supplier_relations`,
      req,
    );

    if (res?.statusCode !== ResponseCodeEnum.SUCCESS) return [];
    return res?.data?.items || [];
  }

  async getLatestPrice(payload: GetLatestPriceRequest): Promise<any> {
    const res = await this.natsService.send(
      `${NatsService.ITEM}.get_latest_price`,
      payload,
    );

    if (res?.statusCode !== ResponseCodeEnum.SUCCESS) return [];
    return res?.data;
  }
}
