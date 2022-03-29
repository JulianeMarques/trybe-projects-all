const login = document.getElementById('input-login');
const senha = document.getElementById('input-senha');
const botao = document.getElementById('input-botao');
const botaoSubmeter = document.getElementById('submit-btn');
const checkboxAgreement = document.getElementById('agreement');
// const areaTexto = document.getElementById('textarea');
function mensagemFormulario() {
  if (login.value === 'tryber@teste.com' && senha.value === '123456') {
    alert('Olá, Tryber!');
  } else {
    alert('Login ou senha inválidos.');
  }
}
botao.addEventListener('click', mensagemFormulario);

const funcaoBotaoSubmit = (event) => {
  if (event.target.checked) {
    botaoSubmeter.disabled = false;
  } else {
    botaoSubmeter.disabled = true;
  }
};
checkboxAgreement.addEventListener('click', funcaoBotaoSubmit);

const textArea = document.querySelector('#textarea');
const pCounter = document.querySelector('#counter');

textArea.addEventListener('input', () => {
  pCounter.innerText = 500 - textArea.value.length;
});


const andleSubmit = (event) => {
  event.preventDefault();
  const data = new FormData(event.target);
  const value = Object.fromEntries(data.entries());
  value.techs = data.getAll('techs');
  value.rate = data.get('rate');
  console.log({ value });
};

const form = document.querySelector('#evaluation-form')