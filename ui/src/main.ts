import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);

// if (module.hot) {
//        module.hot.accept('./print.js', function() {
//              console.log('Accepting the updated printMe module!');
//              printMe();
//            })
//      }
