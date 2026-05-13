# Portfólio | Miqueias Masuete

Portfólio profissional e responsivo criado com HTML, CSS e JavaScript puro. O projeto apresenta Miqueias Masuete como desenvolvedor full stack em formação, estudante de Engenharia de Computação na FACENS, com foco em desenvolvimento web, back-end, banco de dados, impressão 3D, soluções digitais e propostas comerciais.

## Estrutura

```text
.
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
    ├── project-abate-imob.svg
    ├── project-smartwaste.svg
    └── project-v7.svg
```

## Seções

- Início com apresentação, botões de ação e card visual de código.
- Sobre mim com formação, interesses e experiência prática.
- Formação acadêmica e experiência com loja, impressão 3D e desenvolvimento.
- Projetos em destaque: SmartWaste, ABATE IMOB e V7 Acessórios e Presentes.
- Tecnologias divididas por front-end, back-end, ferramentas e outras áreas.
- Diferenciais e seção “Por que trabalhar comigo?”.
- Serviços para clientes, projetos acadêmicos e presença digital.
- Contato com links e formulário com validação simples.

## Funcionalidades

- Navbar fixa com blur.
- Menu responsivo para celular.
- Efeito de digitação no título profissional.
- Animação ao rolar a página.
- Destaque automático no menu conforme a seção visível.
- Botão de voltar ao topo.
- Formulário com validação em JavaScript.

## Como personalizar

Troque os links e dados de contato no `index.html`:

- `COLOCAR_LINK_GITHUB`
- `COLOCAR_LINK_LINKEDIN`
- `COLOCAR_LINK_WHATSAPP`
- `COLOCAR_EMAIL`
- `COLOCAR_LINK_ABATE_IMOB`
- `COLOCAR_LINK_SMARTWASTE`

Para trocar as imagens dos projetos, coloque os prints na pasta `assets/` e atualize os caminhos dos `<img>` nos cards da seção de projetos.

## Rodando localmente

Abra o `index.html` diretamente no navegador ou rode um servidor local:

```bash
python -m http.server 4173
```

Acesse:

```text
http://127.0.0.1:4173
```

## Deploy na Vercel

1. Envie o projeto para um repositório no GitHub.
2. Importe o repositório na Vercel.
3. Use as configurações padrão de projeto estático.
4. Publique.
