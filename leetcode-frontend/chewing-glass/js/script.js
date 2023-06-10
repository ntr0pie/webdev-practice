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

const problems2 = [
    {
        title: '201. Lorem Ipsum A',
        dfc: 'Medium',
        ar8: '54%',
    },
    {
        title: '202. Lorem Ipsum B',
        dfc: 'Hard',
        ar8: '73%'
    },
    {
        title: '203. Lorem Ipsum C',
        dfc: 'Easy',
        ar8: '71%'
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
