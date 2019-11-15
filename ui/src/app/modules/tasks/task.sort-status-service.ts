import {Injectable} from "@angular/core";
import {Task} from "../../shared/models/task";
import {TaskStatus} from "../../shared/models/task-status";

@Injectable()
export class TaskSortStatusService {

    constructor() {}

    filterByReviewStatus(array: Task[]): Task[] {
        return array.filter(this.isTaskInReview);
    }

    filterByTodoOrInProgressStatus(array: Task[]): Task[] {
        return array.filter(this.isTaskToDoOrInProgress)
    }

    private isTaskInReview(element: Task) {
        return element.status === TaskStatus.INREVIEW.valueOf();
    }

    private isTaskToDoOrInProgress(element: Task) {
        return element.status === TaskStatus.TODO || element.status === TaskStatus.INPROGRESS;
    }


    updateInReviewTasks(task: Task, updatedTask: Task, tasks: Task[]): Task[] {

        tasks = this.removeOldTask(task, tasks);
        let updatedTasks: Task[] = tasks;

        if (updatedTask.status === TaskStatus.INREVIEW) {
            updatedTasks = [].concat(updatedTask).concat(tasks);
        }

        return updatedTasks;
    }

    updateCurrentTasks(task: Task, updatedTask: Task, tasks: Task[]) {
        tasks = this.removeOldTask(task, tasks);
        let updatedTasks: Task[] = tasks;

        if (updatedTask.status === TaskStatus.TODO || updatedTask.status === TaskStatus.INPROGRESS) {
            updatedTasks = [].concat(updatedTask).concat(tasks);
        }

        return updatedTasks;
    }

    private removeOldTask(task: Task, tasks: Task[]): Task[] {
        let index: number = tasks.indexOf(task);
        let updatedTasks = [].concat(tasks);

        if (index > -1) {
            updatedTasks.splice(index, 1);
        }

        return updatedTasks;
    }
}
