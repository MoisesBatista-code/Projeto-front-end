const alunos = [];

    const app = document.querySelector("#app");
    const botoesMenu = document.querySelectorAll("nav button");

    function marcarMenuAtivo(rota) {
      botoesMenu.forEach(botao => {
        botao.classList.toggle("ativo", botao.dataset.rota === rota);
      });
    }

    function irPara(rota) {
      marcarMenuAtivo(rota);

      if (rota === "inicio") mostrarInicio();
      if (rota === "cadastro") mostrarCadastro();
      if (rota === "lista") mostrarLista();
      if (rota === "sobre") mostrarSobre();
    }

    function mostrarInicio() {
      app.innerHTML = `
        <h1>Bem vindo a MZ GAMES</h1>
        <p>
          Somos uma empresa especializada downloads de Games na nuvem.
        </p>

        <p>
          
        </p>

        <div class="contador">
          Jogos cadastrados nesta sessão: <strong>${alunos.length}</strong>
        </div>

        <div class="acoes">
          <button class="botao" id="btnCadastrar">Cadastrar Jogos</button>
          <button class="botao secundario" id="btnVerAlunos">Ver Jogos</button>
        </div>
      `;

      document.querySelector("#btnCadastrar")
        .addEventListener("click", () => irPara("cadastro"));

      document.querySelector("#btnVerAlunos")
        .addEventListener("click", () => irPara("lista"));
    }

    function mostrarCadastro() {
      app.innerHTML = `
        <h1>Cadastrar Jogos</h1>

        <form id="formAluno">
          <div class="campo">
            <label for="nome">Nome</label>
            <input id="nome" type="text" placeholder="Digite o nome do jogo" required />
          </div>

          <div class="campo">
            <label for="curso">Tamanho</label>
            <input id="curso" type="text" placeholder="Digite o tamanho" required />
          </div>

          <div class="campo">
            <label for="matricula">Plataforma</label>
            <input id="matricula" type="text" placeholder="Digite a Plataforma" required />
          </div>

          <button class="botao" type="submit">Salvar Jogo</button>
          <div id="mensagem"></div>
        </form>
      `;

      document.querySelector("#formAluno").addEventListener("submit", function(evento) {
        evento.preventDefault();

        const nome = document.querySelector("#nome").value.trim();
        const curso = document.querySelector("#curso").value.trim();
        const matricula = document.querySelector("#matricula").value.trim();

        alunos.push({
          nome,
          curso,
          matricula
        });

        document.querySelector("#mensagem").innerHTML =
          `<div class="mensagem">Jogo cadastrado com sucesso!!</div>`;

        evento.target.reset();
      });
    }

    function mostrarLista() {
      app.innerHTML = `
        <h1>Lista de Jogos</h1>
        <p>Aqui está seus jogos adicionados até agora.</p>
        <div id="conteudoLista"></div>
      `;

      renderizarTabela();
    }

    function renderizarTabela() {
      const conteudo = document.querySelector("#conteudoLista");

      if (alunos.length === 0) {
        conteudo.innerHTML = `
          <div class="vazio">
            Nenhum Jogo cadastrado ainda.
          </div>
        `;
        return;
      }

      let linhas = "";

      alunos.forEach((aluno, indice) => {
        linhas += `
          <tr>
            <td>${aluno.nome}</td>
            <td>${aluno.curso}</td>
            <td>${aluno.matricula}</td>
            <td>
              <button class="excluir" data-indice="${indice}">Download</button>
            </td>
          </tr>
        `;
      });

      conteudo.innerHTML = `
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Tamanho</th>
              <th>Plataforma</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            ${linhas}
          </tbody>
        </table>
      `;

      document.querySelectorAll(".excluir").forEach(botao => {
        botao.addEventListener("click", function() {
          const indice = Number(this.dataset.indice);
          alunos.splice(indice, 1);
          renderizarTabela();
        });
      });
    }

    function mostrarSobre() {
      app.innerHTML = `
        <h1>Sobre o projeto</h1>
        <p>
          Seja muito bem vindo a nossa empresa, aqui vai um pouco da nossa história.
        </p>
        <p> A mz games foi criado em 2026 com o intuito de ser um armazenamento em nuvem para os seus games, mais segurança e espaço para suas gameplays </p>
      `;
    }

    botoesMenu.forEach(botao => {
      botao.addEventListener("click", () => {
        irPara(botao.dataset.rota);
      });
    });

    mostrarInicio();