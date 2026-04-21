function fazerLogin(event) {
    event.preventDefault();

    const campoEmail = document.getElementById('email');
    const campoSenha = document.getElementById('password');

    const dadosLogin = {
        email: campoEmail.value,
        senha: campoSenha.value
    };

    console.log("Tentando login com:", dadosLogin);

    fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosLogin)
    })
    
// Dentro do seu fetch de login
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Usuário ou senha inválidos');
    })
    .then(data => {
    console.log("Dados recebidos do servidor:", data); // Isso aqui vai te mostrar o que o Python enviou

    // SALVANDO NO LOCAL STORAGE
    localStorage.setItem("logado", "true");
    
    // Se o seu Python retorna o usuário, salve assim:
    if (data.usuario) {
    localStorage.setItem("usuario", JSON.stringify(data.usuario));
    localStorage.setItem("nome_usuario", data.usuario.nome);
    }
    
    console.log("LocalStorage após gravar:", localStorage.getItem("logado"));

    alert("Login realizado com sucesso!");
    window.location.href = "index.html"; 
    })
    .catch(error => {
        console.error("Erro no login:", error);
    });
}
