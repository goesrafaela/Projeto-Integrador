const limparTelefone = (tel) => tel.replace(/\D/g, '');

const validarDados = (dados, confirmarSenha) => {
    if (dados.senha !== confirmarSenha) return "As senhas não coincidem!";
    if (dados.telefone.length < 10 || dados.telefone.length > 11) return "Telefone inválido!";
    if (dados.senha.length < 6) return "A senha deve ter no mínimo 6 caracteres.";
    if (!dados.email.includes('@') || !dados.email.includes('.')) return "E-mail inválido!";
    return null;
};

document.getElementById('formCadastro').addEventListener('submit', async (event) => {
    event.preventDefault();

async function enviarCadastro(dadosUsuario) {
    const response = await fetch('http://127.0.0.1:8000/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dadosUsuario)
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.detail || "Erro ao realizar cadastro");
    }

    alert("Cadastro realizado com sucesso!");
    window.location.href = "login.html";
}
    
    // 1. Coleta (Usa o FormData para ser mais moderno e rápido)
    const formData = new FormData(event.target);
    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmarSenha').value;

    const dadosUsuario = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        senha: senha,
        telefone: limparTelefone(document.getElementById('telefone').value)
    };

    const erro = validarDados(dadosUsuario, confirmarSenha);
    if (erro) {
        alert(erro);
        return;
    }

    try {
        await enviarCadastro(dadosUsuario);
    } catch (error) {
        alert(error.message);
    }
});