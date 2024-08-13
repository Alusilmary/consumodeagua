document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('waterForm');
    const pessoasInput = document.getElementById('pessoas');
    const banhosDiv = document.getElementById('banhos');
    const resultadoDiv = document.getElementById('resultado');
    const btnDicas = document.getElementById('btnDicas');
    const popupDicas = document.getElementById('popupDicas');
    const closeBtn = document.querySelector('.close');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const pessoas = parseInt(pessoasInput.value);

        if (isNaN(pessoas) || pessoas <= 0) {
            alert('Por favor, insira um número válido de pessoas.');
            return;
        }

        let totalConsumoLitros = 0;

        // Limpa o conteúdo anterior
        resultadoDiv.innerHTML = '';

        // Loop para calcular o consumo total de água
        for (let i = 1; i <= pessoas; i++) {
            const tempoInput = document.getElementById(`tempo${i}`);
            const tempo = parseFloat(tempoInput.value);

            if (isNaN(tempo) || tempo <= 0) {
                alert(`Por favor, insira um tempo válido para a pessoa ${i}.`);
                return;
            }

            const vazao = 6; // vazão média de 6 litros por minuto
            const consumoLitros = tempo * vazao * 30; // Consumo mensal em litros (considerando um mês de 30 dias)
            totalConsumoLitros += consumoLitros;

            // Mostra o tempo de banho inserido para cada pessoa
            const tempoLabel = tempo === 1 ? 'minuto' : 'minutos';
            resultadoDiv.innerHTML += `
                <p>Pessoa ${i}: ${tempo} ${tempoLabel}</p>
            `;
        }

        const consumoM3 = totalConsumoLitros / 1000; // Consumo mensal em metros cúbicos
        const tarifa = 5.50; // Exemplo de tarifa por metro cúbico (substitua pelo valor real)
        const valorConta = consumoM3 * tarifa; // Valor estimado da conta de água

        // Mostra o consumo total e o valor estimado da conta de água
        resultadoDiv.innerHTML += `
            <hr>
            <p>Consumo mensal estimado:</p>
            <p><strong>${consumoM3.toFixed(2)} m³</strong></p>
            <p>Valor estimado da conta de água: <strong>R$ ${valorConta.toFixed(2)}</strong></p>
        `;
    });

    // Adiciona campos dinâmicos de tempo de banho para cada pessoa
    pessoasInput.addEventListener('input', function() {
        const numPessoas = parseInt(pessoasInput.value);

        // Limpa o conteúdo anterior
        banhosDiv.innerHTML = '';

        // Cria novos campos de tempo de banho
        for (let i = 1; i <= numPessoas; i++) {
            banhosDiv.innerHTML += `
                <label for="tempo${i}">Tempo de banho da pessoa ${i} (minutos):</label>
                <input type="number" id="tempo${i}" name="tempo${i}" min="1" required>
            `;
        }
    });

    // Mostra a caixa pop-up de dicas ao clicar no botão "Como Economizar Água"
    btnDicas.addEventListener('click', function() {
        popupDicas.style.display = 'block';
    });

    // Fecha a caixa pop-up ao clicar no botão de fechar
    closeBtn.addEventListener('click', function() {
        popupDicas.style.display = 'none';
    });

    // Fecha a caixa pop-up ao clicar fora dela
    window.addEventListener('click', function(event) {
        if (event.target === popupDicas) {
            popupDicas.style.display = 'none';
        }
    });
});


