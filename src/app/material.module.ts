import {NgModule} from '@angular/core';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIcon, MatIconModule} from '@angular/material/icon';
@NgModule({
  imports: [
    MatToolbarModule,
    MatIconModule
  ],
  exports: [
    MatToolbarModule,
    MatIconModule
  ]
})
export class MaterialModule {}