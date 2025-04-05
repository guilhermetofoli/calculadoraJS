class Calculator {
    constructor() {
        this.upperValue = document.querySelector('#upper-number');
        this.resultValue = document.querySelector('#result-number');
        this.reset = false;
    }

    // Métodos de operação
    sum(a, b) {
        return a + b;
    }

    minus(a, b) {
        return a - b;
    }

    multiplication(a, b) {
        return a * b;
    }

    divide(a, b) {
        if (b === 0) return "Erro: divisão por zero!";
        return a / b;
    }

    // Resolver a expressão
    resolve(expression) {
        // Substitui "x" por "*" e separa os tokens de números e operadores
        const tokens = expression.replace(/x/g, '*').match(/(\d+\.?\d*|\+|\-|\*|\/)/g);
        if (!tokens) {
            return 'Erro';
        }
        let stack = [];

        // Processando multiplicação e divisão primeiro
        for (let i = 0; i < tokens.length; i++) {
            let token = tokens[i];

            if (token === '*' || token === '/') {   
                const n1 = parseFloat(stack.pop());
                const n2 = parseFloat(tokens[++i]);

                let result = token === '*' ? this.multiplication(n1, n2) : this.divide(n1, n2);

                if (typeof result === 'string') {
                    return result; // Retorna erro em caso de divisão por zero ou outros
                }
                stack.push(result);
            } else {
                stack.push(token);
            }
        }

        // Calculando a parte restante da expressão (soma e subtração)
        let result = parseFloat(stack[0]);
        for (let i = 1; i < stack.length; i += 2) {
            const operator = stack[i];
            const num = parseFloat(stack[i + 1]);
            if (operator === '+') result = this.sum(result, num);
            else if (operator === '-') result = this.minus(result, num);
        }

        return result;
    }

    // Função chamada ao pressionar um botão
    btnPress = (event) => {
        const input = event.target.textContent;
        let currentExpression = this.upperValue.textContent;

        if (input === 'AC') {
            this.clearValues();
            return;
        }

        if (input === '=') {
            // Quando pressionado "=", resolve a expressão atual
            const result = this.resolve(currentExpression);
            this.resultValue.textContent = result; // Exibe o resultado
            this.upperValue.textContent = currentExpression; // Exibe a expressão original
            this.reset = true; // Permite reiniciar a expressão
            return;
        }

        // Se a expressão foi resetada, reinicia
        if (this.reset) {
            currentExpression = '';
            this.reset = false;
        }

        // Adiciona o valor do botão pressionado à expressão
        currentExpression += input;
        this.upperValue.textContent = currentExpression;
    }

    // Limpar valores (quando pressiona "AC")
    clearValues() {
        this.upperValue.textContent = '';
        this.resultValue.textContent = '';
        this.reset = false;
    }
}

// Instancia a calculadora
const calc = new Calculator();

// Mapeando os botões
let buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('click', calc.btnPress);
});
