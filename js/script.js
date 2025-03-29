class Calculator{
    constructor(){
        this.upperValue = document.querySelector('#upper-number');
        this.resultValue = document.querySelector('result-number');
        this.reset = false;
    }

    sum (n1, n2){
        return n1 + n2;
    }

    minus (n1, n2){
        return n1 - n2;
    }

    mult (n1, n2){
        return n1 * n2;
    }

    divide (n1, n2){
        try {
            if(n2 === 0) {
                throw new Error('Divisão por zero');
            }
            return n1 / n2;
        } catch (error) {
            return `Erro: ${error.message}`;
        }
    }

    btnPress(){

    }
}
// Istanciar a classe

const calc = new Calculator();

// Chamando soma
let resultado = calc.sum(82,85);
console.log(resultado);

// Chamando subtração
resultado = calc.minus (100,25);
console.log(resultado);

// Chamando multiplicação
resultado = calc.mult (5,6);
console.log(resultado);
document.querySelector('#upper-number').textContent = '5 X 6 =';
document.querySelector('#result-number').textContent = resultado;

// Chamando divisão
resultado = calc.divide (10,0);
console.log(resultado);

// Mapeando os botões
let button = document.querySelectorAll('.btn');

for (let i=0; button.length>i; i++) {
    button[i].addEventListener('click', calc.btnPress);
}

