export interface RabbitMqServiceInterface {
  connect(): Promise<any>;

  close(data: any): Promise<any>;

  createConsumer(queueName: string, callback): Promise<any>;

  addToQueue(queueName: string, message: object): Promise<any>;
}
