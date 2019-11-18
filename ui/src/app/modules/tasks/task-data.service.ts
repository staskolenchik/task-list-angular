import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {Task} from "../../shared/models/task";

@Injectable()
export class TaskDataService {

    private taskData = new BehaviorSubject<Task>({} as Task);
    private task = this.taskData.asObservable();

    private updatableData = new BehaviorSubject<boolean>(false);
    private updatable = this.updatableData.asObservable();

    constructor() { }

    setTask(task: Task) {
        this.taskData.next(task);
    }

    getTask(): Observable<Task> {
        return this.task;
    }

    setUpdatable(updatable: boolean) {
        this.updatableData.next(updatable);
    }


    isUpdatable(): Observable<boolean> {
        return this.updatable;
    }
}
