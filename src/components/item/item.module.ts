import { Global, Module } from '@nestjs/common';
import { ItemService } from './item.service';

@Global()
@Module({
  imports: [],
  providers: [ItemService],
  exports: [ItemService],
})
export class ItemModule {}
