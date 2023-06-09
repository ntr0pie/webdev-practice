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

function renderProblems1() {
    const parentEl = document.getElementById('problems-table');
    parentEl.innerHTML = null;
    const tableTag = document.createElement('table');
    for (let p in problems1) {
        const trTag = document.createElement('tr');
        for (let k in problems1[p]) {
            const tdTag = document.createElement('td');
            tdTag.innerHTML = problems1[p][k];
            trTag.appendChild(tdTag);
        }
        tableTag.appendChild(trTag);
    }
    parentEl.appendChild(tableTag);
}

function renderProblems2() {
    const parentEl = document.getElementById('problems-table');
    parentEl.innerHTML = null;
    const tableTag = document.createElement('table');
    for (let p in problems2) {
        const trTag = document.createElement('tr');
        for (let k in problems2[p]) {
            const tdTag = document.createElement('td');
            tdTag.innerHTML = problems2[p][k];
            trTag.appendChild(tdTag);
        }
        tableTag.appendChild(trTag);
    }
    parentEl.appendChild(tableTag);
}

// renderProblems1();