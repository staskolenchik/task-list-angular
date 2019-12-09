import {TaskStatus} from "./task-status";

export interface TaskFilter {
    createdBy: string,
    statuses: TaskStatus[],
    employeeIds: number[],
    dateFrom: Date,
    dateTo: Date
}
