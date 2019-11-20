import {Injectable} from "@angular/core";
import {Sort} from "@angular/material";

@Injectable()
export class TaskSortService {

    sortData(sort: Sort, sortedData: any[], unsortedData: any[]) {
        const data = sortedData.slice();

        if (!sort.active || sort.direction === '') {
            sortedData = unsortedData;

            return sortedData;
        }

        return data.sort((a, b) => {
            const isAsc = sort.direction === 'asc';
            switch (sort.active) {
                case 'subject': return this.compare(a.subject, b.subject, isAsc);
                case 'status': return this.compare(a.status, b.status, isAsc);
                case 'type': return this.compare(a.type, b.type, isAsc);
                case 'assignee': return this.compare(a.assigneeName, b.assigneeName, isAsc);
                case 'creationDateTime': return this.compare(a.creationDateTime, b.creationDateTime, isAsc);

                default: return null;
            }
        });
    }

    private compare(a: number | string, b: number | string, isAsc: boolean) {
        return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }

}
