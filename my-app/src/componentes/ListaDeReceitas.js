import React, { useState, useEffect } from 'react';
import InformacaoDaReceita from './InformacaoDaReceita';

export default function ListaDeReceitas() {
  const [receitas, setReceitas] = useState([]);

  useEffect(() => {
    async function buscarReceitas() {
      try {
        const resposta = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        if (!resposta.ok) {
          throw new Error('Erro ao buscar receitas');
        }
        const dados = await resposta.json();
        setReceitas(dados.meals || []);
      } catch (error) {
        console.error('Erro ao buscar receitas:', error);
      }
    }

    buscarReceitas();
  }, []);


  return (
    <div> 
      <ul className="lista-de-receitas">
        {receitas.map((receita) => (
          <li key={receita.idMeal}>
            <img src={receita.strMealThumb} alt={receita.strMeal} />
            <h3>{receita.strMeal}</h3>
            <InformacaoDaReceita receita={receita} />
          </li>
        ))}
      </ul>
    </div>
  );
}