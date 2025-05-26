create table if not exists mcp_servers (
    id uuid not null,
    name text not null,
    url text null,
    primary key(id)
);

create table if not exists tools (
    id uuid not null,
    name text not null,
    mcp_server_id uuid not null references mcp_servers(id),
    primary key(id)
);

create table if not exists logs (
    id uuid not null,
    api_key text null,
    tool_id uuid not null references tools(id),
    tool_input text,
    tool_response text null,
    duration integer,
    status text null,
    created_at timestamp with time zone default now() not null, 
    mcp_server_id uuid not null references mcp_servers(id),
    primary key (id)
);


