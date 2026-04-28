import { Boot, InjectBoot } from '@nestcloud/boot';
import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { KongGatewayServiceInterface } from './interface/kong-gateway.service.interface';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom, map, of, retry } from 'rxjs';
import { genericRetryStrategy } from '@app/utils/rxjs-util';

@Injectable()
export class KongGatewayService
  implements KongGatewayServiceInterface, OnApplicationBootstrap
{
  private host!: string;
  private port!: string;
  private upstreamName!: string;
  private servicePort!: string;
  private dns!: string;
  private serviceName!: string;
  private apiPath!: string;
  private readonly logger = new Logger(KongGatewayService.name);

  @InjectBoot()
  private readonly boot!: Boot;

  constructor(private httpClientService: HttpService) {}

  onApplicationBootstrap() {
    // Initialize properties here after boot is injected
    this.host = this.boot.get('kong.host') || 'localhost';
    this.port = this.boot.get('kong.port') || '8001';
    this.servicePort = this.boot.get('service.port') || '3001';
    this.upstreamName = this.boot.get('kong.upstream.name') || '';
    this.apiPath = this.boot.get('service.apiPath') || '';
    this.serviceName = this.boot.get('service.name') || '';
    this.dns = `${this.boot.get<string>('service.name')}.service.dc1.consul`;

    this.init();
  }

  async init(): Promise<any> {
    await this.createOrUpdateService();
    await this.createOrUpdateRoute();
  }

  async createOrUpdateService(): Promise<any> {
    const url = `${this.host}:${this.port}/services/${this.upstreamName}`;
    this.logger.log(`Upserting Kong Service: ${this.upstreamName} at ${url}`);

    const service = await firstValueFrom(
      this.httpClientService
        .put(url, {
          name: this.upstreamName,
          protocol: 'http',
          host: this.dns,
          port: parseInt(this.servicePort),
          path: '/',
        })
        .pipe(
          map((response) => response.data),
          retry(
            genericRetryStrategy({
              scalingDuration: 1000,
              excludedStatusCodes: [409],
            }),
          ),
          catchError((error) => {
            this.logger.error(
              `Failed to upsert Kong Service: ${error.message}`,
            );
            return of({ id: undefined });
          }),
        ),
    );

    if (service.id) {
      this.logger.log(`KONG SERVICE: ${service.id} registered!`);
    } else {
      this.logger.error(`KONG SERVICE registration failed!`);
    }
  }

  async createOrUpdateRoute(): Promise<any> {
    const url = `${this.host}:${this.port}/services/${this.upstreamName}/routes/${this.serviceName}`;
    // url = `http://localhost:8001/services/user-service/routes/user-service`;
    this.logger.log(`Upserting Kong Route: ${this.serviceName} at ${url}`);

    const route = await firstValueFrom(
      this.httpClientService
        .put(url, {
          name: this.serviceName,
          protocols: ['http', 'https'],
          paths: [this.apiPath],
          strip_path: false,
        })
        .pipe(
          map((response) => response.data),
          retry(
            genericRetryStrategy({
              scalingDuration: 1000,
              excludedStatusCodes: [409],
            }),
          ),
          catchError((error) => {
            this.logger.error(`Failed to upsert Kong Route: ${error.message}`);
            return of({ id: undefined });
          }),
        ),
    );

    if (route.id) {
      this.logger.log(`KONG ROUTE: ${route.id} registered!`);
    } else {
      this.logger.error(`KONG ROUTE registration failed!`);
    }
  }
}
