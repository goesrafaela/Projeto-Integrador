
function salvarSessaoUsuario(dados) {
    localStorage.setItem("logado", "true");
    if (dados.usuario) {
        localStorage.setItem("usuario", JSON.stringify(dados.usuario));
        localStorage.setItem("nome_usuario", dados.usuario.nome);
    }
}

async function autenticarUsuario(dadosLogin) {
    const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dadosLogin)
    });

    if (!response.ok) {
        throw new Error('Usuário ou senha inválidos');
    }

    return await response.json();
}


async function fazerLogin(event) {
    event.preventDefault();

    const dadosLogin = {
        email: document.getElementById('email').value,
        senha: document.getElementById('password').value
    };

    try {
        const data = await autenticarUsuario(dadosLogin);
        
        salvarSessaoUsuario(data);
        // ASSIM QUE FICAR PRONTA A TELA DE DEPOIS Q A PESSOA FAZ LOGIN 
        // REDIRECIONAR PARA ELA
        // NO MOMENTO ESTÁ VOLTANDO PRA PÁGINA INICIAL
        alert("Bem-vinda de volta! ^^");
        window.location.href = "index.html";
        
    } catch (error) {
        console.error("Erro no login:", error);
        alert(error.message);
    }
}