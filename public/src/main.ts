/**
 * Created by ranwahle on 07/09/2016.
 */
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';
import {enableProdMode} from "@angular/core";
const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);
