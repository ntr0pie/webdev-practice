import React, { useState } from 'react'
import './App.css'

function App() {
  const problems = [
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
  </>
  )
}

function Problem(props){
  const title = props.title;
  const dfc = props.dfc;
  const  ar8 = props.ar8;

  return(
    <tr>
      <td className='table-heading'>{title}</td>
      <td className='table-heading'>{dfc}</td>
      <td className='table-heading'>{ar8}</td>
    </tr>
  );
}
export default App
