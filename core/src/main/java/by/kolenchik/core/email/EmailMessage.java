package by.kolenchik.core.email;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EmailMessage {
    private String recipient;
    private String subject;
    private String text;
}
