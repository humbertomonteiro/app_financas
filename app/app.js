//-----tela inicial-----

//saldos, despesas e balanço
const saldoAtual = document.querySelector('#saldoAtual')
const receitasMes = document.querySelector('#receitasMes')
const despesasMes = document.querySelector('#despesasMes')

//botões para adicionar transações
const mostrarTransacoes = document.querySelector('#mostrarTransacoes')
const btnTransitions = document.querySelector('#btnTransitions')
const btnReceitas = document.querySelector('#btnReceitas')
const btnDespesas = document.querySelector('#btnDespesas')

//transações
const form = document.querySelector('#form')
const transacoesUl = document.querySelector('#transacoesUl')
const h2Form = document.querySelector('#h2Form')

//links nav
const btnTransacoes = document.querySelector('#btnTransacoes')
const home = document.querySelector('#home')
const transacoesLink = document.querySelector('#transacoes')

//inputs
const data = document.querySelector('#data')
const tipo = document.querySelector('#tipo')
const descricao = document.querySelector('#descricao')
const valor = document.querySelector('#valor')

//array das transações
let todasTransacoes = []

function funcoesDeBotoes() {

    function btnMostrar(btn, btn2, btn3) {
        btn.onclick = () => {
            btn2.classList.toggle('none')
            btn3.classList.add('none')
        }
    }

    function btnMostraRemove(btn, btn2, btn3, btn4) {
        btn.onclick = e => {
            e.preventDefault()
            btn2.classList.add('none')
            btn3.classList.remove('none')
            btn4.classList.add('none')
        }
    }

    function btnRemove(btn) {
        btn.classList.remove('none')
    }

    function receita(btn) {
        btn.onclick = () => {
            form.setAttribute('receita', true)
            form.removeAttribute('despesa')
            h2Form.innerHTML ='Reginstro de novas Receitas'
            tipo.innerHTML = `<option>Salario</option>
            <option>Renda Extra</option>
            <option>Presente</option>
            <option>Prêmio</option>
            <option>Direitos</option>
            <option>Para pagar cartão</option>
            <option>Bico</option>
            <option>Outros</option>`
            this.btnRemove(form)
        }
    }

    function despesa(btn) {
        btn.onclick = () => {
            form.setAttribute('despesa', true)
            form.removeAttribute('receita')
            h2Form.innerHTML ='Reginstro de novas Despesas'
            tipo.innerHTML = `<option>Alimentação</option>
            <option>Educação</option>
            <option>Lazer</option>
            <option>Saúde</option>
            <option>Transporte</option>
            <option>Assinaturas</option>
            <option>Compras</option>
            <option>Moradia</option>
            <option>Presente</option>
            <option>Outros</option>`
            this.btnRemove(form)
        }

    }

    return {
        btnMostrar,
        btnMostraRemove,
        btnRemove,
        receita,
        despesa
    }
}
const btn = funcoesDeBotoes()

btn.btnMostrar(mostrarTransacoes, btnTransitions, form)
btn.receita(btnReceitas)
btn.despesa(btnDespesas)
btn.btnMostraRemove(btnTransacoes, home, transacoesLink, form)

const transacoes = (data, tipo, descricao, valor) => {

    return {
        data,
        tipo,
        descricao,
        valor
    }

}

// const criaCartao = (nome, vencimento, feichamento) => {
//     return {
//         nome,
//         vencimento,
//         feichamento
//     }
// }

// const novoCartao = criaCartao()
// console.log(novoCartao)

//fução factory
function metodos(a) {

    function balanco(a) {
    
        const valores = a.map(e => parseInt(e.valor))
    
        const balancoTotal = valores
        .reduce((a, valores) => a + valores, 0)
        .toFixed(2)
    
        saldoAtual.innerHTML = `R$ ${balancoTotal}`
    
        const despesasTotais = valores.filter(e => e > 0)
        .reduce((e, a) => e + a, 0)
        .toFixed(2)
    
        const receitasTotais = valores.filter(e => e < 0)
        .reduce((e, a) => e + a, 0)
        .toFixed(2)
        
        receitasMes.innerHTML = ''
        receitasMes.innerHTML = `R$ ${despesasTotais}`

        despesasMes.innerHTML =''
        despesasMes.innerHTML = `R$ ${receitasTotais}`
    }

    function atualizaTransacoes() {

        const ids = localStorage.getItem('id')
        const todasTransacoesAtualizadas = []
    
        for(let i = 1; i <= ids; i++) {
        const transacoes = JSON.parse(localStorage.getItem(i))

        if(transacoes === null) {
            continue
        }
        
        transacoes.id = i
        todasTransacoesAtualizadas.push(transacoes)

        }

        todasTransacoes = todasTransacoesAtualizadas

    }

    function addTransacoes(x) {

        const li = document.createElement('li')
        const span = document.createElement('span')

        if(x.valor < 0) li.classList.add('despesa')
        else li.classList.add('receita')
    
        li.innerHTML = `
        <span class="span">${x.tipo}</span>
        <span class="span">${x.data}</span> 
        <span class="span spanDesc">${x.descricao}</span> 
        <span class="span">${x.valor}.00</span>
        `

        span.innerHTML = 'x'
        span.classList.add('apagar')
        span.id = x.id
        const idSpan = span.id

        span.onclick = () => {
            localStorage.removeItem(idSpan)
            li.classList.add('none')
        }

        li.append(span)
        transacoesUl.prepend(li)
    }

    return {
        balanco,
        atualizaTransacoes,
        addTransacoes
    }
    
}

const getNovoId = () => {
    const id = localStorage.getItem('id')

    if(id === null) {
        localStorage.setItem('id', 0)
    }
    
    return parseInt(localStorage.getItem('id')) + 1
}

const setarMovimentacao = () => {
    const id = getNovoId()
    const dataV = data.value
    const tipoV = tipo.value
    const descricaoV = descricao.value
    const valorV = valor.value

    if(dataV === '' || tipoV === '' || descricaoV === '' || valorV === '' || isNaN(valorV)) {
        alert('Verifique se todos os campos foram preenchidos corretamente.')
        return
    }

    const despesa = form.getAttribute('despesa')  

    if(despesa) {

        let transacao = transacoes(
            dataV,
            tipoV,
            descricaoV,
            -(valorV)
        )

        localStorage.setItem(id, JSON.stringify(transacao))
        localStorage.setItem('id', id)

    } else {

        let transacao = transacoes(
            dataV,
            tipoV,
            descricaoV,
            valorV
        )
        localStorage.setItem(id, JSON.stringify(transacao))
        localStorage.setItem('id', id)
    }

}

const movimentacoes = metodos()

function init() {
    movimentacoes.atualizaTransacoes()
    movimentacoes.balanco(todasTransacoes)
    transacoesUl.innerHTML = ''
    todasTransacoes.forEach(movimentacoes.addTransacoes)
}

init()

form.addEventListener('submit', e => {
    e.preventDefault()
    setarMovimentacao()
    init()
    data.value = ''
    tipo.value = ''
    descricao.value = ''
    valor.value = ''
})

const apagando = () => {
    
}