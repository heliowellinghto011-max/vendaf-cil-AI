# VendaFácil AI

Aplicativo SaaS para pequenos comerciantes organizarem oportunidades de venda, priorizar atendimentos e acompanhar conversões.

## Stack
- React + Vite
- React Router
- Supabase Auth e banco de dados (configuração opcional)

## Como rodar localmente
1. Instale as dependências:
   npm install
2. Inicie o projeto:
   npm run dev

## Configuração real do backend
Crie um arquivo `.env` na raiz com:

```bash
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-publica
```

A aplicação usa esse ambiente para autenticação real, mas mantém um fallback local para desenvolvimento sem credenciais.

## Banco e isolamento por empresa
O modelo de banco recomendado inclui:
- empresas
- membros
- clientes
- oportunidades
- historico_atividades

Cada tabela deve ter `empresa_id` e o RLS deve garantir que um usuário só acesse dados da própria empresa.

## Arquivo SQL de referência
O projeto inclui a referência em `supabase/schema.sql` para criar as tabelas e as políticas RLS.

## Observações
- O app preserva a identidade visual da versão atual.
- O backend real depende de credenciais do projeto Lovable/Supabase.
- Nenhuma senha ou token deve ser exposto no frontend.
- A autenticação local no navegador é apenas um fallback de desenvolvimento.
