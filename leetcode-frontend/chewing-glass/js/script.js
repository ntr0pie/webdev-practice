const problems1 = [
    {
        title: '201. Lorem Ipsum',
        dfc: 'Medium',
        ar8: '54%',
    },
    {
        title: '101 Lorem Ipsum',
        dfc: 'Hard',
        ar8: '73%'
    },
    {
        title: '101 Lorem Ipsum',
        dfc: 'Hard',
        ar8: '73%'
    }
];

const problems2 = [
    {
        title: '201. Lorem Ipsum',
        dfc: 'Medium',
        ar8: '54%',
    },
    {
        title: '101 Lorem Ipsum',
        dfc: 'Hard',
        ar8: '71%'
    },
    {
        title: '101 Lorem Ipsum',
        dfc: 'Hard',
        ar8: '70%'
    }
];

function renderProblem1(){
    renderProblem(problems1);
}

function renderProblem2(){
    renderProblem(problems2);
}

function renderProblem(Problem) {
    const parentEl = document.getElementById('problems-table');
    parentEl.innerHTML = null;
    const tableTag = document.createElement('table');
    for (let p in Problem) {
        const trTag = document.createElement('tr');
        for (let k in Problem[p]) {
            const tdTag = document.createElement('td');
            tdTag.innerHTML = Problem[p][k];
            trTag.appendChild(tdTag);
        }
        tableTag.appendChild(trTag);
    }
    parentEl.appendChild(tableTag);
}
