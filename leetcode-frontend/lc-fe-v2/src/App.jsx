import React, { useState } from 'react'
import './App.css'

function App() {
  const [problems, setProblems] = useState([
    {
      title: 'Init',
      dfc: 'Easy',
      ar8: '00%'
    }
  ]);  

  // Page 1
  const problems1 = [
    {
        title: '101. Lorem Ipsum 1',
        dfc: 'Medium',
        ar8: '54%',
    },
    {
        title: '102. Lorem Ipsum 2',
        dfc: 'Hard',
        ar8: '73%'
    },
    {
        title: '103. Lorem Ipsum 3',
        dfc: 'Hard',
        ar8: '43%'
    }
  ];

  // Page 2
  const problems2 = [
    {
        title: '201. Lorem Ipsum 1',
        dfc: 'Medium',
        ar8: '56%',
    },
    {
        title: '202. Lorem Ipsum 2',
        dfc: 'Easy',
        ar8: '72%'
    },
    {
        title: '203. Lorem Ipsum 3',
        dfc: 'Easy',
        ar8: '62%'
    }
  ];
  
  function handlePage1(){
    setProblems(problems1);
  }

  function handlePage2(){
    setProblems(problems2);
  }
  
  function autoGen(){
    let count = 1
    setInterval(() => {
      setProblems((oldProblems) => {
        let newProblems = [...oldProblems, {
          title: `New title ${count}`,
          dfc: `New dfc ${count}`,
          ar8: `New rate ${count}`
        }]
        return newProblems;
      });
      count += 1;
    },
    2000);
  }

  return(
  <>
      <form action="POST">
      <div>
          Login Form
      </div>

      <label className="form-label">
          Email: <input className="form-input" type="text" id="email" name="email" placeholder="email" />
      </label>

      <label className="form-label">
          Password: <input className="form-input" type="text" id="pw" name="pw" placeholder="password" />
      </label>

    </form>
    <div id="problems-table">
      {
        problems.map(
          p => <Problem key={p.title} title={p.title} dfc={p.dfc} ar8={p.ar8} />
        )
      }
    </div>
    <div className='pagination'>
      <button onClick={handlePage1}>1</button>
      <button onClick={handlePage2}>2</button>
      <button onClick={autoGen}>Auto Generate</button>
    </div>
  </>
  )
}

function Problem(props){
  const title = props.title;
  const dfc = props.dfc;
  const  ar8 = props.ar8;

  return(
    <table>
      <tbody>
      <tr>
        <td className='table-heading'>{title}</td>
        <td className='table-heading' style={
          {color: dfc === 'Medium' ? 'yellow' 
                  : dfc === 'Hard' ? 'red' 
                  : dfc === 'Easy' ? 'green' 
                  : 'purple'}}>
          {dfc}
        </td>
        <td className='table-heading'>{ar8}</td>
    </tr>
    </tbody>
    </table>
  );
}
export default App
