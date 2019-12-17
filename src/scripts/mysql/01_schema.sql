create table filme (
    id bigint unique not null,
    nome varchar(255) not null,
    abertura text not null,
    lancamento date not null,

    primary key(id)
);

create table personagem (
    filme_id bigint not null,
    nome varchar(255) not null,
    altura integer not null,
    peso integer,
    genero varchar(255),
    nascimento varchar(10),


    foreign key(filme_id) references filme(id)
);