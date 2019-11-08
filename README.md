# task-list-angular
Webapp for task managment.
Тема: "Список задач"
Описание: Yеобходимо создать приложение по менеджменту списка задач,
Админ aka Менеджер будет ставить задачи для пользователей aka подчиненных с последующем трекингом их выполнения и продуктивности работы.

# Сущности:
1. Admin (email, password, etc.)
2. User (email, password, etc.)
3. Task (subject, assignee, status, description, created_by)
4. Comment (text, etc.)

Task может быть двух типов Issue и Story - реализация через STI
Comment может относиться к Task, а также к другому Comment - реализация через polymorphic association

# Бизнес логика:
0. Приложение доступно только после входа в систему используя логин (email) и пароль.
1. Admin имеет полный доступ ко всем сущностям в системе за исключением других Admin (может создавать, редактировать и тд все, кроме записей Admin отличных от своей)
2. Admin создает Task и асайнит их на User
3. Task имеет 4 статуса: To Do, In Progress, In Review, Done
4. По умолчанию Task создается в To Do
5. User имеет доступ на чтения сущности Task, а также на изменение поля статус из To Do <-> In Progress -> In Review
6. User не может перевести Task из In Review в In Progress
7. User может перевести Task из To Do в In Progress и обратно
8. User может создавать Comment к Task или к другому Comment
9. Admin имеет Dashboard, где отображаются Task созданные им в статусе In Review (справа), а также таблицу с фильтрами для Task (слева)
10. Admin может отфильтровать данные в таблице слева по: assignee, created at, status
11. На каждое изменение статуса должно отправляться письмо на почту assignee либо created_by:
  a. Task создан в To Do -> assignee
  b. Task переведен в In Progress -> created by
  c. Task переведен в In Review -> created by
  d. Task переведен в Done -> created by
 Note*: текст письма в свободной форме
