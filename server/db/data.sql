drop table if exists city ;
create table city
(
    id   integer primary key,
    cityname varchar,
    country varchar
);

insert into city (cityname,country)
values ('Dundalk','Ireland'),
       ('Lodz','Poland'),
       ('Lens','France');

drop table if exists user ;
create table user
(
    id   integer primary key,
    username varchar,
    password varchar
);
insert into user (username,password)
values ('toto','123');
