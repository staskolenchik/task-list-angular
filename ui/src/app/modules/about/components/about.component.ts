import {Component, OnInit} from "@angular/core";
import {ApplicationInfo} from "../../../shared/models/application-info";
import {AboutService} from "../about.service";

@Component({
    selector: "about-component",
    template: `
        <div>
            <div *ngIf="info.name; else Greetings">
                Welcome to Application {{info.name}}.{{info.version}}!
            </div>
            <ng-template #Greetings>Welcome!</ng-template>
        </div>
    `,
    providers: [AboutService]
})

export class AboutComponent implements OnInit{
    private info: ApplicationInfo = {} as ApplicationInfo;

    constructor(private aboutService: AboutService) {
    }

    ngOnInit(): void {
        this.aboutService
            .get()
            .subscribe(info => this.info = info);
    }
}
