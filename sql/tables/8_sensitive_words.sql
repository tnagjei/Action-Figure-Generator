-- auto-generated definition
create table sensitive_words
(
    id    bigint generated by default as identity
        primary key,
    words varchar,
    level varchar
);

comment on table sensitive_words is 'sensitive';

comment on column sensitive_words.id is '自增id';

comment on column sensitive_words.words is 'words';

comment on column sensitive_words.level is 'level';
