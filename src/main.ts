import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

  setTimeout(() => {
  document.body.addEventListener('mousedown', function (event: any) {

    const header = event.target.closest('[mat-dialog-title]');
    if (!header) return;

    const dialog = header.closest('.cdk-overlay-pane');
    if (!dialog) return;

    let shiftX = event.clientX - dialog.getBoundingClientRect().left;
    let shiftY = event.clientY - dialog.getBoundingClientRect().top;

    function moveAt(pageX: number, pageY: number) {
      dialog.style.position = 'absolute';
      dialog.style.left = pageX - shiftX + 'px';
      dialog.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(e: any) {
      moveAt(e.pageX, e.pageY);
    }

    document.addEventListener('mousemove', onMouseMove);

    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', onMouseMove);
    }, { once: true });

  });
}, 1000);
