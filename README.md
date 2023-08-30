# app_financas
 Aplicação para registrar receitas e despesas que usa apanas HTMl, CSS e JavaScript. Esse projeto pessoal 
 vai cadastrar receitas e despesas no LocalStorage e mostrar de uma forma simples como está a situação financeira 
 do usuário. 
 
# Página Home

O home é o index da aplicação e é onde poderemos cadastrar despesas ou receitas. Vamos ver a soma de 
todas as receitas e a soma das despesas, que será mostradas de acordo com o mês, não importando se está 
ou não resolvida. 

Resolver a transação vai fazer com que seu saldo atual altere. O saldo atual será a informação mais acima
da página home. Lá também mostrarar as transações que estão atrasadas. Caso uma transação esteja não resolvida 
e a data já estaja vencida ou no dia do vencimento, serão expostos quadrinhos com o a quantidade de despesas 
ou receitas vencidas ou vencendo. 

Para ser direcionado para essas pendências é necessário apenas clicar nessas 
informações.

Também teremos dois botões que irão diferenciar o cadastro da transação. Ao clicar a cor do botão do formulário 
mudará para que seja mais fácil indentificar qual foi a opção escolhida.

No formulário teremos que cadastrar o valor, o nome, a descrição, a data, a quantidade de vezes e se foi ou não 
já resolvida.

# Página Transações

A página Transações vai exibir o saldo atual, o balanço mensal e tadas as transações do mês escolhido.
Nessa parte da aplicação também teremos um filtro para mostrar apenas receitas, despesas ou todas as transações. Também
teremos um campo de pesquisa onde podemos escrever qual transação estamos procurando no mês atual. Esse compo irá 
mostrar todas as transações que tem o que está sendo digitado no nome ou na categoria da transação.

Essas transações são listadas de acordo com o dia que foram cadastradas. Em cada transação será possível apagar 
editar ou resolver. Resolver significa que a transação foi paga ou recebida. 

Todas as transaçõs estão sendo armazenadas no LocalStorage.

# Link do projeto em produção.

Está hospedado no GitHub Pages: https://humbertomonteiro.github.io/my_finans/
