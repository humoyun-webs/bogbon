 create database bogbon;
 
 CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
 
create type user_role as enum('admin','bogbon','nihol');

      create table users(
        user_id uuid primary key DEFAULT uuid_generate_v4() null,
        userg_id text,
        name varchar(255) not null,
        l_name varchar(255) not null,
        email varchar(64) not null unique,
        password varchar(64) default 'reitmanz' not null,
        image text,
        role  user_role not null,
        country varchar(64) not null,
        created_at timestamp default current_timestamp,
        updated_at timestamp default null,
        isDelete BOOLEAN NOT NULL DEFAULT FALSE
);
insert into users(
        name,
        l_name,
        email,
        password,
        role,
        country
)values(
     'Humoyun',
     'Eshpolatov',
     'humoyuneshpolatov5@gmail.com',
     '$2a$12$GV2rcbFJaGgSzvBK578D7u4F/8CsLdDGtYvouVROU.nSVx65KqRrC',
     'admin',
     'Russia'
);

create table contacts(
     id uuid primary key DEFAULT uuid_generate_v4() null,
     full_name varchar(255) not null,
     phone bigint not null,
     user_id uuid,
     message text not null,
     created_at timestamp default current_timestamp,
     foreign key(user_id) references users(user_id)
);


create table aids(
    id uuid primary key DEFAULT uuid_generate_v4() null,
    title varchar(64) not null,
    descr text not null,
    data_date timestamp default current_timestamp,
    aided BOOLEAN default false,
    created_at timestamp default current_timestamp,
    aided_user_id uuid default null,
    user_id uuid not null,
    foreign key(user_id)
    references users(user_id),
    foreign key(aided_user_id)
    references users(user_id)
);



create table home_title(
   id uuid primary key DEFAULT uuid_generate_v4() null,
   sura varchar(160) not null,
   title varchar(160) not null,
   desc varchar(255) not null
);

insert into home_title(
     sura, title, desc
)values(
     'Ehsonning mukofoti, faqat ehsondir.
(Ar-Rohman surasi, 60-oyat)',
'"Bog`bon" Ijtimoiy loyihasi',
'Ilmga investitsiya qiluvchi insonlarning faoliyatini yanada rivojlantirish va raqamlashtirish.'
);



