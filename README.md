# Portfólio | Miqueias Santos

Portfólio profissional e responsivo criado com HTML, CSS e JavaScript puro. O projeto foi pensado para apresentar Miqueias Santos como desenvolvedor em formação, estudante de Engenharia da Computação na FACENS, com foco em projetos reais, serviços web e oportunidades profissionais.

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
    ├── project-v7.svg
    └── project-interativo.svg
```

## Funcionalidades

- Navbar fixa com blur e menu responsivo.
- Hero com efeito de digitação e card de código.
- Seções de sobre, projetos, tecnologias, serviços, experiência e contato.
- Cards de projetos com espaço para prints.
- Animações suaves ao rolar a página.
- Destaque automático no menu conforme a seção atual.
- Botão de voltar ao topo.
- Formulário visual com validação simples em JavaScript.

## Como editar

Troque os placeholders no `index.html`:

- `COLOCAR_LINK_GITHUB`
- `COLOCAR_LINK_LINKEDIN`
- `COLOCAR_LINK_WHATSAPP`
- `COLOCAR_EMAIL`
- `COLOCAR_LINK_ABATE_IMOB`
- `COLOCAR_LINK_SMARTWASTE`

Para substituir os prints dos projetos, coloque as imagens na pasta `assets/` e altere os caminhos dos `<img>` nos cards de projetos.

## Rodando localmente

Abra o arquivo `index.html` diretamente no navegador ou use um servidor local:

```bash
python -m http.server 4173
```

Depois acesse:

```text
http://127.0.0.1:4173
```

## Deploy na Vercel

1. Envie o projeto para um repositório no GitHub.
2. Importe o repositório na Vercel.
3. Use as configurações padrão para projeto estático.
4. Publique.
