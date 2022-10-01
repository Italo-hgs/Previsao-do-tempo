import './Search.css';
import {useState} from 'react';

function Search(props) {

    const [cidade, setCidade] = useState("");
  
    function searchInput(e){
        e.preventDefault();
        setCidade('');
        let currentValue = document.querySelector('[name=searchInput]').value
        /*
            Fazer requisição API depois.

        */

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${currentValue}&appid=4d8fb5b93d4af21d66a2948710284366&units=metric`;
        
        fetch(url)
        .then(Response=> Response.json())
        .then(data=>{
            const {main, name, sys, weather} = data;
            if(sys != undefined){
                
            if(weather != undefined){
                
                const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`;

                setCidade(`
                <div class="resultado-cidade2">
                    <p>Temperatura: ${main.temp}</p>
                    <p>Pais: ${sys.country}</p>
                    <p>Cidade: ${name}</p>
                    <img src="${icon}"/>
                </div>
                `)
            }

            }else{
                setCidade("");
            }
        })
    };

    return (
        <div className="wrapper">
            <div className="search">
                <h2>Digite a cidade que você quer saber a previsão ⛅</h2>
                <form onSubmit={(e) => searchInput(e)}>
                    <input type="text" name="searchInput" placeholder={props.placeholder}/><br />
                    <input type="submit" value="Pesquisar" />
                </form>
            </div>

            {
                (cidade != '')?
                <div dangerouslySetInnerHTML={{__html: cidade}} />:
                <div>Pesquise por algo acima</div> 
            }
        </div>
  )
}

export default Search