import { ChangeDetectionStrategy, Component } from '@angular/core';
import {AddInfoMessages} from "../types";
import {addInfo} from "./data";
import {CommonModule} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-additional-info',
  imports: [CommonModule, MatButtonModule],
  templateUrl: './additional-info.component.html',
  styleUrl: './additional-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdditionalInfoComponent {

  additionalInfo: AddInfoMessages[] = addInfo;

}
