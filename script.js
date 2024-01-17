document.addEventListener('DOMContentLoaded', function() {
    // Função para converter fala em texto
    window.converterFala = function() {
        const audioFileInput = document.getElementById('audioFile');
        const resultadoElemento = document.getElementById('resultado');

        const file = audioFileInput.files[0];

        if (file) {
            const formData = new FormData();
            formData.append('audio', file);

            fetch('/processar_fala', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    resultadoElemento.innerText = `Erro: ${data.error}`;
                } else {
                    resultadoElemento.innerText = `Resultado: ${data.texto}`;
                }
            })
            .catch(error => {
                resultadoElemento.innerText = `Erro na requisição: ${error}`;
            });
        } else {
            resultadoElemento.innerText = 'Por favor, selecione um arquivo de áudio.';
        }
    };
});
