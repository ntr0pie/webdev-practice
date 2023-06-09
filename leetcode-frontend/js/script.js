const problems = [
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

function renderProblems() {
    const parentEl = document.getElementById('problems-table');
    const tableTag = document.createElement('table');
    for (let p in problems) {
        const trTag = document.createElement('tr');
        for (let k in problems[p]) {
            const tdTag = document.createElement('td');
            tdTag.innerHTML = problems[p][k];
            trTag.appendChild(tdTag);
        }
        tableTag.appendChild(trTag);
    }
    parentEl.appendChild(tableTag);
}

renderProblems();