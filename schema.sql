drop schema if exists test cascade;

create schema test;

create type test.t as enum ('A','B');

create table test.r (
    id integer primary key,
    type test.t not null
);

comment on table test.r is '
    @interface mode:relational type:type
    @type A references:a
    @type B references:b
';

create table test.a (
    id integer primary key references test.r
);

create table test.b (
    id integer primary key references test.r
);

create function test.x() returns test.r language sql as $$
    SELECT * FROM test.r
$$;
