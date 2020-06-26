/*Exercício 1

function checaIdade(idade){
        return new Promise(function(maior, menor){
        if(idade > 18){
            maior();
        }else{
            menor();
        }
    });    
}

checaIdade(13)
    .then(function(maior){
        console.log("Maior que 18");
    })
    .catch(function(menor){
        console.warn("Menor que 18");
    })*/

//Exercício 2
var listElement = document .querySelector('#app ul');
var inputElement = document.querySelector('#app input');
var buttonElement = document.querySelector('#app button');
var todo = [];

function addTodo(){

    var todo = [];

    var minhaPromise = function(){

        return new Promise(function(resolve, reject){
            var xhr = new XMLHttpRequest();
            var todoText = 'https://api.github.com/users/'+inputElement.value+'/repos';
            xhr.open('GET', todoText);
            xhr.send(null);
    
            xhr.onreadystatechange = function(){
                if(xhr.readyState === 4){
                    if (xhr.status === 200){
                        var resposta = xhr.responseText;
                        var nomes = JSON.parse(resposta);
                        resolve(JSON.parse(xhr.responseText));
                        for (i=0; i < nomes.length; i++){
                            todo.push(nomes[i].name);
                        }
                    }else{
                        reject('Erro na requisição');
                    }
                }
            }
        });
    }

        minhaPromise()
            .then(function(response){
                console.log(response);
                console.log(todo);
                for (todos of todo){
                    var todoElement = document.createElement('li');
                    var textoLista = document.createTextNode(todos);
                    var link = "https://github.com/" + inputElement.value + "/" + todos;
                    var linkElement = document.createElement('a');
                    linkElement.setAttribute('href', link);
                    linkElement.appendChild(textoLista);
                    
                    todoElement.appendChild(linkElement);
                    listElement.appendChild(todoElement);
                }
            })
            .catch(function(error){
                console.warn(error);
            });
    }

buttonElement.onclick = addTodo;
