import {TaskStatus} from "./task-status";
import {TaskType} from "./task-type";

export interface Task {
    id: number;
    subject: string;
    description: string;
    taskStatus: TaskStatus;
    creationDateTime: string;
    createdById: number;
    assigneeId: number;
    type: TaskType;
}
