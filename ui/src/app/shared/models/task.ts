import {TaskStatus} from "./task-status";
import {TaskType} from "./task-type";

export interface Task {
    id: number;
    subject: string;
    description: string;
    status: TaskStatus;
    type: TaskType;
    createdById: number;
    assigneeId: number;
    creationDateTime: string;
    assigneeName: string;
    assigneeSurname: string;
}
