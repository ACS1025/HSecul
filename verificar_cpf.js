document.getElementById('cpf').addEventListener('blur', function() {
    var cpf = document.getElementById('cpf').value;
    
    fetch('verificar_cpf.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cpf: cpf })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        if (data.cadastrado) {
            const resposta = confirm("CPF já cadastrado. Deseja fazer uma nova matrícula?");
            
            if (resposta) {
                // Novo cadastro
                document.getElementById('rematricula').style.display = 'none';
                document.getElementById('atualizacao').style.display = 'none';
                document.getElementById('nome').value = ''; // Limpar nome
                document.getElementById('dataNascimento').value = ''; // Limpar data de nascimento
                // Aqui você pode limpar outros campos de informações pessoais conforme necessário
            } else {
                // Rematrícula
                document.getElementById('rematricula').style.display = 'block';
                document.getElementById('atualizacao').style.display = 'block';
            }
        } else {
            // Primeira vez
            document.getElementById('rematricula').style.display = 'none';
            document.getElementById('atualizacao').style.display = 'none';
            // Aqui você pode iniciar o preenchimento automático dos campos de informações pessoais
            document.getElementById('nome').value = 'Nome Exemplo'; // Exemplo de preenchimento automático
            document.getElementById('dataNascimento').value = '2000-01-01'; // Exemplo de preenchimento automático
        }
    })
    .catch(error => {
        console.error('Erro ao verificar CPF:', error);
        alert(`Erro ao verificar CPF: ${error.message}`);
    });
});

document.getElementById('cep').addEventListener('blur', function() {
    var cep = document.getElementById('cep').value;
    if (cep.length === 8) {
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('logradouro').value = data.logradouro;
            document.getElementById('bairro').value = data.bairro;
            document.getElementById('cidade').value = data.localidade;
            document.getElementById('estado').value = data.uf;
        })
        .catch(error => {
            console.error('Erro ao buscar CEP:', error);
            alert('Erro ao buscar CEP. Por favor, verifique o CEP informado.');
        });
    } else {
        alert('Por favor, informe um CEP válido com 8 dígitos.');
    }
});
