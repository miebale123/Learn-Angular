import { Routes } from '@angular/router';
import { Houses } from './components/houses.component';
import { UploadHouse } from './components/upload-house.component';

export const HOUSES_ROUTES: Routes = [
  { path: '', component: Houses },
  { path: 'upload-house', component: UploadHouse },
  // { path: 'update/:id', component: UpdateHouseComponent },
  // { path: ':id', component: HouseDetailsComponent },
];
