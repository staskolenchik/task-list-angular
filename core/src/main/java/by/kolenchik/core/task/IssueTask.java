package by.kolenchik.core.task;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;


@Entity
@DiscriminatorValue("issue")
@Data
@EqualsAndHashCode(callSuper = true)
public class IssueTask extends Task {
}
