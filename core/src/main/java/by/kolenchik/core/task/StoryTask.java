package by.kolenchik.core.task;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;


@Entity
@DiscriminatorValue("story")
@Data
@EqualsAndHashCode(callSuper = true)
public class StoryTask extends Task {
}
