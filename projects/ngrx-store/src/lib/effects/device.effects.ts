// import { Injectable } from '@angular/core';
// import { Actions, ofType } from '@ngrx/effects';
// import { createEffect } from '@ngrx/effects';
// import { map, switchMap } from 'rxjs/operators';
// import { DeviceService } from 'core';
// import * as DeviceActions from '../actions/device.actions';

// @Injectable()
// export class DeviceEffects {
//   constructor(
//     private actions$: Actions, // Ensure this is correctly injected
//     private deviceService: DeviceService // Ensure service is provided and functioning
//   ) {}

//   loadDevices$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(DeviceActions.loadDevices),
//       switchMap(() =>
//         this.deviceService.getDevices().pipe(
//           map((devices) => DeviceActions.loadDevicesSuccess({ devices }))
//         )
//       )
//     )
//   );
// }

