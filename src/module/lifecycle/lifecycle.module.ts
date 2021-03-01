import { Module } from '@nestjs/common';
import { LifecycleService } from './lifecycle.service';
import { BeforeApplicationShutdownService } from './before-application-shutdown.service';

@Module({
  // imports: [ ConfigModule, ],
  providers: [LifecycleService, BeforeApplicationShutdownService]
})
export class LifecycleModule {}
