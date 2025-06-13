drop schema if exists app_public cascade;

create schema app_public;

create type app_public.t as enum ('A');

create table app_public.r (
    id integer primary key,
    type app_public.t not null
);

comment on table app_public.r is '
    @interface mode:relational type:type
    @type A references:a
';

create table app_public.a (
    id integer primary key references app_public.r
);

create function app_public.x() returns app_public.r language sql as $$
    SELECT * FROM app_public.r
$$;
