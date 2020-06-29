/*Exercício 1

function TimeOut (){
    function checaIdade(idade){
            return new Promise(function(maior, menor){
            if(idade > 18){
                maior();
            }else{
                menor();
            }
        });    
    }


    checaIdade(20)
        .then(function(maior){
            console.log("Maior que 18");
        })
        .catch(function(menor){
            console.warn("Menor que 18");
        })
}

setTimeout(TimeOut,2000);*/

//Exercício 2
var listElement = document .querySelector('#app ul');
var inputElement = document.querySelector('#app input');
var buttonElement = document.querySelector('#app button');
var nomes = "";
var todo = [];
var linkRef = "";

function coletaValor (){

    todo = [];
    nomes = 0;

    var minhaPromise = function(){

        linkRef = 'https://api.github.com/users/'+inputElement.value+'/repos';

            return new Promise(function(resolve, reject){
                var xhr = new XMLHttpRequest();
                xhr.open('GET', linkRef);
                xhr.send(null);
        
                xhr.onreadystatechange = function(){
                    if(xhr.readyState === 4){
                        if (xhr.status === 200){
                            resolve(JSON.parse(xhr.responseText));
                        }else{
                            reject('Erro na requisição');
                        }
                    }
                }
            });
    }

    minhaPromise ()
        .then(function(resolve){
            nomes = resolve;
        })
        .catch(function(reject){
            nomes = 1;
        })
        
    listElement.innerHTML = '<li>Carregando.......</li>';

    //delTodo();

    setTimeout(validador,2000);
}

    /*function delTodo(){
        todo = [];        
    }*/

    function validador(){
        if (nomes === 1){
            alert("Repositório Inexistente");
            listElement.innerHTML = '';
        }else{
            setTimeout(gravaTodos);
            setTimeout(renderTodos);
        }
    }

    function gravaTodos(){
        for (i=0; i < nomes.length; i++){
            todo.push(nomes[i].name);
        }
    } 

    function renderTodos(){

        listElement.innerHTML = '';
    
        for (todos of todo){
            var todoElement = document.createElement('li');
            var textoLista = document.createTextNode(todos);
            var link = "https://github.com/" + inputElement.value + "/" + todos;
            var linkElement = document.createElement('a');
            linkElement.setAttribute('href', link);
            linkElement.appendChild(textoLista);
            
            todoElement.appendChild(linkElement);
            listElement.appendChild(todoElement);
            inputElement.value = '';
        }
    }

buttonElement.onclick = coletaValor;