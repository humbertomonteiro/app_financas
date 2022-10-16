//links nav
const home = document.querySelector('#home')
const registros = document.querySelector('#registros')
const transacoesLink = document.querySelector('#transacoes')

//saldos, despesas e balanço
const saldoAtual = document.querySelector('#saldoAtual')
const receitasMes = document.querySelector('#receitasMes')
const despesasMes = document.querySelector('#despesasMes')

//botões para adicionar transações
const btnReceitas = document.querySelector('#btnReceitas')
const btnDespesas = document.querySelector('#btnDespesas')

//transações
// const transacoesUl = document.querySelector('#transacoesUl')

//btns transações
const btnTransacoes = document.querySelector('#btnTransacoes')

//inputs
const form = document.querySelector('#form')
const h2Form = document.querySelector('#h2Form')
const data = document.querySelector('#data')
const tipo = document.querySelector('#tipo')
const descricao = document.querySelector('#descricao')
const valor = document.querySelector('#valor')

const dataAtual = new Date
let anoAtual = dataAtual.getFullYear()
let mesAtual = dataAtual.getMonth() + 1
let diaAtual = dataAtual.getDay()

//funções para todos os botoes
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
            btn3.classList.add('none')
            btn4.classList.remove('none')
        }
    }

    function btnRemove(btn) {
        btn.classList.remove('none')
    }

    function receita(btn) {
        btn.onclick = () => {
            form.setAttribute('receita', true)
            form.removeAttribute('despesa')
            h2Form.innerHTML ='<h4>Reginstro de novas Receitas</h4>'
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
            h2Form.innerHTML ='<h4>Reginstro de novas Despesas</h4>'
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

//factory para criar transação
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

    const getNovoId = () => {
        const id = localStorage.getItem('id')
    
        if(id === null) {
            localStorage.setItem('id', 0)
        }
        
        return parseInt(localStorage.getItem('id')) + 1
    }
    
    const setarMovimentacao = () => {

        const id = getNovoId()
        //valor inputs
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

    function addAno() {

        for(let i = 0; i < 5; i++) {
            const ano = document.createElement('div')
            ano.setAttribute('ano', `${anoAtual++}`)
            ano.innerText = `${anoAtual - 1}`
            ano.classList.add('none')
            ano.classList.add(`a${anoAtual - 1}`)

            const jan = document.createElement('ul')
            jan.setAttribute(`jan${anoAtual - 1}`, 'true')
            jan.classList.add('mes')
            jan.innerText = 'Janeiro'
            jan.classList.add('none')

            const fev = document.createElement('ul')
            fev.setAttribute(`fev${anoAtual - 1}`, 'true')
            fev.classList.add('mes')
            fev.innerText = 'Fevereiro'
            fev.classList.add('none')

            const mar = document.createElement('ul')
            mar.setAttribute(`mar${anoAtual - 1}`, 'true')
            mar.classList.add('mes')
            mar.innerText = 'Março'
            mar.classList.add('none')

            const abr = document.createElement('ul')
            abr.setAttribute(`abr${anoAtual - 1}`, 'true')
            abr.classList.add('mes')
            abr.innerText = 'Abril'
            abr.classList.add('none')

            const mai = document.createElement('ul')
            mai.setAttribute(`mai${anoAtual - 1}`, 'true')
            mai.classList.add('mes')
            mai.innerText = 'Maio'
            mai.classList.add('none')

            const jun = document.createElement('ul')
            jun.setAttribute(`jun${anoAtual - 1}`, 'true')
            jun.classList.add('mes')
            jun.innerText = 'Junho'
            jun.classList.add('none')

            const jul = document.createElement('ul')
            jul.setAttribute(`jul${anoAtual - 1}`, 'true')
            jul.classList.add('mes')
            jul.innerText = 'Julho'
            jul.classList.add('none')

            const ago = document.createElement('ul')
            ago.setAttribute(`ago${anoAtual - 1}`, 'true')
            ago.classList.add('mes')
            ago.innerText = 'Agosto'
            ago.classList.add('none')
            
            const set = document.createElement('ul')
            set.setAttribute(`set${anoAtual - 1}`, 'true')
            set.classList.add('mes')
            set.innerText = 'Setembro'
            set.classList.add('none')

            const out = document.createElement('ul')
            out.setAttribute(`out${anoAtual - 1}`, 'true')
            out.classList.add('mes')
            out.innerText = 'Outubro'
            out.classList.add('none')

            const nov = document.createElement('ul')
            nov.setAttribute(`nov${anoAtual - 1}`, 'true')
            nov.classList.add('mes')
            nov.innerText = 'Novembro'
            nov.classList.add('none')

            const dez = document.createElement('ul')
            dez.setAttribute(`dez${anoAtual - 1}`, 'true')
            dez.classList.add('mes')
            dez.innerText = 'Dezembro'
            dez.classList.add('none')

            ano.append(jan)
            ano.append(fev)
            ano.append(mar)
            ano.append(abr)
            ano.append(mai)
            ano.append(jun)
            ano.append(jul)
            ano.append(ago)
            ano.append(set)
            ano.append(out)
            ano.append(nov)
            ano.append(dez)

            transacoesLink.append(ano)
        }

    }

    function addTransacoes(x) {
     
        const dia = document.createElement('ul')
        const li = document.createElement('li')
        const apagar = document.createElement('span')
        const resolver = document.createElement('span')


        if(x.valor < 0) {
            li.classList.add('despesa')
        } else { 
            li.classList.add('receita')
        } 
    
        li.innerHTML = `
        <span class="span">${x.tipo}</span>
        <span class="span spanDesc">${x.descricao}</span> 
        <span class="span">${x.valor}.00</span>`

        const dataSetada = x.data.split('-')
        let anoSetado = parseInt(dataSetada[0])
        let mesSetado = parseInt(dataSetada[1])
        let diaSetado = parseInt(dataSetada[2])
        
        li.setAttribute('Setado', `${anoSetado}`)
        li.setAttribute('mes', `${mesSetado}`)
        li.setAttribute('dia', `${diaSetado}`)

        apagar.innerHTML = '<i class="fa-solid fa-trash-can"></i>'
        apagar.classList.add('apagar')
        apagar.id = x.id
        const idApagar = apagar.id

        apagar.onclick = () => {
            localStorage.removeItem(idApagar)
            li.classList.add('none')
        }

        resolver.innerHTML = '<i class="fa-solid fa-circle-check"></i>'
        resolver.classList.add('resolver')

        li.append(resolver)
        li.append(apagar)

        switch(mesSetado) {
            case 1:
                mesSetado = 'jan'
                break
            case 2:
                mesSetado = 'fev'
                break
            case 3:
                mesSetado = 'mar'
                break
            case 4:
                mesSetado = 'abr'
                break
            case 5:
                mesSetado = 'mai'
                break
            case 6:
                mesSetado = 'jun'
                break
            case 7:
                mesSetado = 'jul'
                break
            case 8:
                mesSetado = 'ago'
                break
            case 9:
                mesSetado = 'set'
                break
            case 10:
                mesSetado = 'out'
                break
            case 11:
                mesSetado = 'nov'
                break
            case 12:
                mesSetado = 'dez'
                break
        }

        const ano = document.querySelector(`.a${anoSetado}`)
        ano.classList.remove('none')

        const mes = document.querySelector(`[${mesSetado}${anoSetado}]`)
        mes.classList.remove('none')
        mes.append(li)
    }
    return {
        balanco,
        atualizaTransacoes,
        addAno,
        addTransacoes,
        setarMovimentacao,
    }
    
}

//array das transações
let todasTransacoes = []

const btn = funcoesDeBotoes()

btn.receita(btnReceitas)
btn.despesa(btnDespesas)
btn.btnMostraRemove(btnTransacoes, home, registros, transacoesLink)

const movimentacoes = metodos()

function init() {
    movimentacoes.atualizaTransacoes()
    movimentacoes.balanco(todasTransacoes)
    movimentacoes.addAno()
    const transacoesMes = document.querySelectorAll('.mes')
    transacoesMes.forEach(e => e.innerHTML = '')
    todasTransacoes.forEach(movimentacoes.addTransacoes)
}

init()

form.addEventListener('submit', e => {
    e.preventDefault()
    movimentacoes.setarMovimentacao()
    init()
    data.value = ''
    tipo.value = ''
    descricao.value = ''
    valor.value = ''
})