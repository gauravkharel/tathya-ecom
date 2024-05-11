INSERT INTO roles (name) VALUES ('user'), ('admin'),('editor');

select u.email, r.name, r.id from users u full outer join roles r on u."roleId" = r.id where r.id = 1;