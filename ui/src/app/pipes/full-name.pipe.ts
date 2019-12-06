import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: 'fullName'
})
export class FullNamePipe implements PipeTransform{
    transform(user: any, showPatronymic: boolean = true): any {
        if (!user.name || !user.surname) {
            return '';
        }

        if (showPatronymic) {
            const fullName = `${user.name} ${user.surname} ${user.patronymic ? user.patronymic : ''}`;
            return fullName.endsWith(' ') ? fullName.replace(/\s*$/,'') : fullName;
        }

        return `${user.name} ${user.surname}`;
    }
}
