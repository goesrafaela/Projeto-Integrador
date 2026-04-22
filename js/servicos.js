
let servicoSelecionado = "";
let precoSelecionado = "";

function abrirModal(nome, preco) {
    console.log('Clicou no serviço:', nome); // O seu que já funciona
    
    servicoSelecionado = nome;
    precoSelecionado = preco;
    
    const modal = document.getElementById("modal-agendamento");
    
    // Forçamos o display para flex para o CSS acima centralizar tudo
    modal.style.display = "flex"; 
    
    document.getElementById("servico-nome").innerText = nome;
    document.getElementById("servico-preco").innerText = preco;
}

function fecharModal() {
    document.getElementById("modal-agendamento").style.display = "none";
}

window.confirmarAgendamento = function() {
    console.log("Botão confirmar clicado!")
};

window.fecharModal = function() {
    document.getElementById("modal-agendamento").style.display = "none";
};

async function carregarServicos() {
    const container = document.getElementById('container-servicos');
    
    try {
        const response = await fetch('http://127.0.0.1:8000/servicos');
        if (!response.ok) throw new Error('Falha ao carregar serviços');
        
        const servicos = await response.json();
        container.innerHTML = ""; 


        
        servicos.forEach(servico => {
    const caminhoImagem = `img/${servico.imagem}`;

    const cardHTML = `
        <div class="servico-card">
            <div class="card-thumb">
                <img src="${caminhoImagem}" 
                     alt="${servico.nome}" 
                     onerror="this.onerror=null;this.src='img/default.jpg';"/>
            </div>
            <div class="card-info">
                <h4>${servico.nome}</h4>
                <p>R$ ${servico.preco.toFixed(2).replace('.', ',')}</p>
                <button class="btn-action-full" 
                    onclick="abrirModal('${servico.nome}', 'R$ ${servico.preco}')" >
                    Reservar
                </button>
            </div>
        </div>
    `;
    container.innerHTML += cardHTML;
});
    } catch (error) {
        console.error("Erro ao carregar serviços:", error);
        container.innerHTML = "<p>Não foi possível carregar os serviços agora.</p>";
    }
}

document.addEventListener('DOMContentLoaded', carregarServicos);