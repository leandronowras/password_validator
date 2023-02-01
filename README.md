# password_validator
Essa aplicação tem o objetivo de ser uma API para validar uma senha digitada pelo usuário a partir das seguintes regras: 
- minSize: tem pelo menos x caracteres.
- minUppercase: tem pelo menos x caracteres maiúsculos
- minLowercase: tem pelo menos x caracteres minúsculos
- minDigit: tem pelo menos x dígitos (0-9)
- minSpecialChars: tem pelo menos x caracteres especiais ( Os caracteres especiais são os
caracteres da seguinte string: "!@#$%^&*()-+\/{}[]" )
- noRepeted: não tenha nenhum caractere repetido em sequência ( ou seja, "aab" viola esta
condição, mas "aba" não)

Todas as regras são opcionais e o retorno da API será em formato JSON informando se a senha foi aceita e um array contendo quais regras não foram atendidas. Caso a senha seja aceita, o array de erros retornará um array vazio.

## Table of Contents
- [Getting Started](#getting_started)
- [Architecture](#architecture)
- [Tests](#tests)

<a name="getting_started"></a>
## Getting Started
Install the dependencies
```
npm i
```
Start the server
```
npm run server
```
Isso fará com que a aplicação seja iniciada em sua máquina na porta 8080 e com a rota /verify para validar o input
Para acessar, é necessário fazer uma requisição POST no formato json passando a senha para ser validada e as regras desejadas no modelo abaixo
```
curl -X POST -H 'Content-Type: application/json' "http://localhost:8080/verify" -d '{
"password": "TesteSenhaForte!123&",
"rules": [
{"rule": "minSize","value": 8},
{"rule": "minSpecialChars","value": 2},
{"rule": "noRepeted","value": 0},
{"rule": "minDigit","value": 2}
]
}'
```
Caso a senha seja aceita, o resultado será um json com duas chaves: 
- verify: que deve retornar um boolean dizendo se a senha foi validada por todas as regras
- noMatch: que deve retornar uma lista de strings que deve conter quais as regras a senha não
passou ou uma lista vazia caso verify seja true.

No caso do exemplo anterior, a resposta seria a seguinte:
```
{"verify":true,"noMatch":[]}
```
<a name="architecture"></a>
## Architecture
&nbsp;&nbsp;&nbsp;&nbsp;Seguindo os princípios de Clean Architecture, a entidade Password é uma classe que tem dentro de si as regras de negócio para sua criação.
Dentro do arquivo é declarado uma interface com as possíveis regras exigidas pelo usuário, e no construtor, cada regra é validada através de um loop que mapeia a regra com seu respectivo método de tratamento
&nbsp;&nbsp;&nbsp;&nbsp;Em cada iteração é armazenado o nome da regra que não foi atendida ( caso exista ), e por fim, o valor da senha é salvo na variável value ( caso todas as regras passem ).

&emsp;O arquivo Server.ts inicia o servidor declarando a porta da aplicação assim como a sua rota e o tratamento do input para então retornar a resposta.


<a name="tests"></a>
## Tests
Cada regra foi testada individualmente, tanto no caso em que a senha está de acordo com a regra quanto no caso em que a senha não atende alguma regra. Também é feito o teste em que todas as regras são usadas em conjunto. Totalizando 22 testes e atingindo 100% de cobertura de testes
<p align="center">
<img width="527" alt="image" src="https://user-images.githubusercontent.com/56269786/216042516-ce6882fe-01b3-4da6-872d-55b297c76ce1.png">
</p>
