# Jhow da Marquezim Tintas: cartão de visitas digital

Site estático (HTML, CSS e JavaScript). Não precisa instalar nada nem configurar build.

## Arquivos

- `index.html`: o conteúdo e as seções
- `style.css`: cores e visual (laranja, preto e branco)
- `script.js`: **suas configurações** (WhatsApp, endereço, parceiros, galeria, formulário)
- `img/`: pasta para suas fotos (crie esta pasta)

## O que editar

Tudo fica no começo do `script.js`:

1. **Endereço**: preencha `endereco` com o endereço da loja. O botão de localização passa a abrir o ponto exato no Google Maps.
2. **Sua foto**: crie a pasta `img` e coloque a foto com o nome `jhow.jpg`. Enquanto não existir, aparece o espaço "Sua foto aqui".
3. **Fotos da galeria**: coloque o arquivo em `img/` e preencha o campo `foto` do item, por exemplo `foto: "fachada1.jpg"`. Sem foto, aparece uma ilustração.
4. **Parceiros**: a lista `PARTNERS` começa vazia. Para adicionar, siga o exemplo comentado no arquivo. Use `demo: true` apenas para exemplos de teste.
5. **Links das marcas**: confira em `index.html` (seção Escolha de cores) se os endereços de Suvinil, Futura e Anjo ainda estão corretos.

## Como receber as solicitações de parceiros

**Opção 1 (já funciona):** sem configurar nada, ao enviar o formulário abre o WhatsApp com os dados já escritos para o número configurado. O profissional só toca em enviar.

**Opção 2 (por e-mail, com Formspree):**
1. Crie uma conta gratuita em formspree.io e um novo formulário.
2. Copie a URL que ele gera (parece `https://formspree.io/f/xxxxxxx`).
3. Cole em `formEndpoint` no `script.js`.
4. As solicitações passam a chegar no seu e-mail.

Depois de receber, você confere os dados e adiciona o profissional na lista `PARTNERS`.

## Publicar na Vercel pelo celular Android

1. Crie uma conta gratuita no **github.com** (pelo navegador do celular).
2. Crie um repositório novo, por exemplo `jhow-site`.
3. Toque em **Add file → Upload files** e envie `index.html`, `style.css` e `script.js` (e a pasta `img`, se tiver fotos).
   Dica: no navegador, ative "Site para computador" para facilitar.
4. Toque em **Commit changes**.
5. Entre em **vercel.com**, escolha **Continue with GitHub** e autorize.
6. Toque em **Add New → Project**, escolha o repositório `jhow-site` e toque em **Deploy**. Não mude nenhuma configuração.
7. Em cerca de um minuto você recebe o link, no formato `jhow-site.vercel.app`. Envie esse link pelo WhatsApp.

Para atualizar depois: edite o arquivo no GitHub e faça o commit. A Vercel republica sozinha.

Dica: você pode trocar o endereço em **Settings → Domains** na Vercel, ou usar um domínio próprio.
